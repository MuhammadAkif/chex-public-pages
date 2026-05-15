# Agent Instructions

Guidance for any coding agent (Codex, Cursor, Aider, etc.) working in this repository. Claude Code reads [CLAUDE.md](CLAUDE.md) as well — keep the two in sync when conventions change.

## Stack at a glance

Next.js 16 (App Router, Turbopack, React 19) + Payload CMS 3 + PostgreSQL 17 with **UUID primary keys**. TypeScript `strict`, ESLint typed lint. Tailwind 4 (via `@theme inline` in [globals.css](src/app/globals.css)) + Sass for the admin. Yarn 4 / Berry.

## Common commands

```bash
yarn db:up                      # start Postgres (Docker, port 5433)
yarn dev                        # Next dev server
yarn typecheck                  # tsc --noEmit
yarn lint
yarn lint:fix

yarn payload:generate:types         # after editing src/collections/*
yarn payload:generate:importmap     # after touching admin components
yarn payload:migrate:create <name>
yarn payload:migrate
yarn payload:migrate:status

yarn media:import                   # de-duping S3 upload pass
yarn locations:seed
yarn locations:seed-rideshare
yarn locations:patch-comparison
yarn db:migrate:local-to-env --yes  # local DB -> DATABASE_URL via pg_dump/restore
```

Run any TS script ad-hoc: `node --import tsx scripts/<name>.ts`. There is no test runner configured.

## Architecture orientation

### Route groups

[src/app](src/app) has two Next.js route groups:

- **`(site)`** — public pages. The root `/` redirects to `/home`. Shared chrome lives in [layout.tsx](<src/app/(site)/layout.tsx>), wrapped by a client [SiteShell](<src/app/(site)/components/shared/site-shell.tsx>) that hosts the `RegisterModalProvider` context.
- **`(payload)`** — Payload admin at `/admin` and REST/GraphQL at `/api/*`, mounted by `@payloadcms/next`. Generated files (`src/payload-types.ts`, `src/app/(payload)/admin/importMap.{ts,js}`) must not be hand-edited.

### Three content patterns

1. **Static TS content** — site chrome ([src/app/(site)/content.ts](<src/app/(site)/content.ts>)) and the home page ([src/app/(site)/home/content.ts](<src/app/(site)/home/content.ts>)). The home composition in [home-page.tsx](<src/app/(site)/components/home/home-page.tsx>) has several sections commented out (`HomeKeyDifferentiators`, `HomeTestimonials`, `CaseStudies`) — preserve those before "cleaning up" dead imports.
2. **Payload-driven location pages** — the `Locations` collection ([src/collections/Locations.ts](src/collections/Locations.ts), ~1300 lines, drafts enabled) is the source of truth. Each US-state route ([src/app/(site)/locations/<state>/page.tsx](<src/app/(site)/locations>)) is a thin wrapper calling `getLocationPageBySlug(slug)` from [locations/payload.ts](<src/app/(site)/locations/payload.ts>). All 11 state routes use `export const dynamic = 'force-dynamic'`.
3. **Payload-driven blog** — [src/app/(site)/blogs/page.tsx](<src/app/(site)/blogs/page.tsx>) reads from the `posts` collection (drafts enabled, sorted by `-publishedAt`).

### Location page composition

[location-page.tsx](<src/app/(site)/components/locations/location-page.tsx>) orchestrates per-section components: `LocationHero`, `LocationShowcase`, `LocationOverview`, `LocationServices`, `LocationComparison`, `RegisterRideShareSection`, `PricingRideShareSection`, `LocationRegions`, `LocationManage`, `LocationTestimonials`, `LocationRegister`, `LocationFaq`, `LocationCta`. `LocationCaseStudies` is intentionally commented out and `LocationPricing` exists in the type but is **not rendered** (the rideshare variant takes its slot). The `Locations` collection mirrors these one-to-one and exposes className override fields — see the `classNameField` / `mediaFields` helpers at the top of `Locations.ts`. Media fields always pair a Payload `upload` relationship with a `*FallbackUrl` text field for migration; the frontend prefers the relationship.

Adding a new state page requires changes in five places: the collection, a migration, [LocationPageContent](<src/app/(site)/components/locations/location-page.tsx>), the per-section component(s), and the mapping in [locations/payload.ts](<src/app/(site)/locations/payload.ts>). All five must agree.

### Payload config

[payload.config.ts](payload.config.ts) registers `[Users, Posts, Media, Locations]`, uses `postgresAdapter({ idType: 'uuid' })`, points `migrationDir` at [src/migrations/](src/migrations), and conditionally enables `s3Storage` only when **all four** of `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` are set. In `NODE_ENV=development`, `push: true` is on — schema changes can auto-apply without a migration. Always capture the diff into a real migration before committing.

Migrations are loaded via a hand-maintained static import list in [src/migrations/index.ts](src/migrations/index.ts). `yarn payload:migrate:create` updates it; if you author a file by hand, add it there too.

The `Media` collection uses a unique `sourceHash` (SHA-256) for de-duped imports and `staticDir: 'media'` (mounted as the `media-uploads` Docker volume when S3 is disabled).

### Auth: two separate systems

- **Payload users** ([src/collections/Users.ts](src/collections/Users.ts)) are admin/CMS accounts only.
- **Site visitor auth** lives in [auth-client.ts](<src/app/(site)/components/shared/auth-client.ts>) and posts to an external API: `${NEXT_PUBLIC_BACKEND_BASE_URL}/auth/{login,signup,contactUs}`. Token is stored in `localStorage` **and** a 7-day `token=` cookie. Signup hard-redirects to `${NEXT_PUBLIC_RIDESHAIR_APP_BASE_LINK}/selectoption`. Both env vars are missing from [.env.example](.env.example) and [src/types/env.d.ts](src/types/env.d.ts) — add them when next touching either file.

### Path aliases and TS quirks

- `@/*` → `./src/*`, `@payload-config` → `./payload.config.ts`.
- `allowImportingTsExtensions` is on; the Payload entry imports use explicit `.ts` extensions.
- `typedRoutes: true` — new routes affect the `Route` union; a typecheck failure after adding a route may be a stale `.next/types` cache.

### Styling

[globals.css](src/app/globals.css) defines Tailwind theme tokens (`--color-ink`, `--color-mist`, `--color-ember`, `--color-tide`), three font families via `next/font` (local Satoshi + Google Poppins/Manrope), and `type-*` typography utility classes (`type-hero`, `type-section-heading`, `type-location-*`, …) that responsive-scale at `≥1024px`. Prefer the utility classes over re-deriving sizes. Sections are typically wrapped in [Reveal](<src/app/(site)/components/shared/reveal.tsx>) — an IntersectionObserver wrapper that respects `prefers-reduced-motion`.

### Environment

Local DB defaults to `postgresql://payload:payload@localhost:5433/payload_app` (matches [docker-compose.yml](docker-compose.yml)). `DATABASE_URL` overrides this. Required: `PAYLOAD_SECRET`. Optional S3 group; optional `NEXT_PUBLIC_BACKEND_BASE_URL` + `NEXT_PUBLIC_RIDESHAIR_APP_BASE_LINK` for visitor auth.

### Docker

Multi-stage [Dockerfile](Dockerfile): deps → build → runner. The runner keeps full `node_modules` because `payload migrate` parses `payload.config.ts` at runtime. [docker-entrypoint.sh](docker-entrypoint.sh) runs `payload migrate` then `next start`. `NEXT_PUBLIC_SERVER_URL` is a build-time `ARG` baked into the client bundle.

## Conventions

- Prefer existing patterns under `src/app/(site)/` and `src/collections/` over inventing parallel ones.
- ESLint enforces `@typescript-eslint/no-floating-promises` and `no-misused-promises`. Server components and event handlers calling async work must handle the promise.
- [src/migrations/](src/migrations) and `src/payload-types.ts` are excluded from some lint rules / ignored entirely — don't reformat them.
- After editing collections: regenerate types and create a migration. After touching admin components: regenerate the import map.
- Don't commit secrets, `node_modules/`, build outputs, or local DB dumps.
- [app-chex-ai-snippets/](app-chex-ai-snippets/) is a sibling CRA/Redux snippet folder for the cross-domain auth-bridge pattern. It is **not** part of the Next build — don't import from it.
