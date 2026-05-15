# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Next.js 16 (App Router, Turbopack, React 19) + Payload CMS 3 + PostgreSQL 17 with **UUID primary keys**. TypeScript with `strict` on, ESLint typed lint (`recommendedTypeChecked`). Tailwind 4 (via `@theme inline` in [globals.css](src/app/globals.css)) + Sass for the Payload admin. Yarn 4 / Berry (see `.yarn/`).

## Commands

```bash
# Dev loop
yarn db:up                      # docker compose up -d postgres (port 5433)
yarn dev                        # Next dev with Turbopack
yarn typecheck                  # tsc --noEmit
yarn lint                       # eslint .
yarn lint:fix

# Payload CMS
yarn payload:generate:types     # regenerate src/payload-types.ts after collection edits
yarn payload:generate:importmap # regenerate src/app/(payload)/admin/importMap.{ts,js}
yarn payload:migrate:create <name>
yarn payload:migrate
yarn payload:migrate:status
yarn payload:migrate:refresh

# Seed / one-off (run with tsx)
yarn media:import               # de-duping S3 upload pass over src/app/(site)/assets/
yarn locations:seed             # seed/update the Locations collection from legacy content.ts files
yarn locations:seed-rideshare   # seed the rideshare sections
yarn locations:patch-comparison # patch the Comparison section across locations
yarn db:migrate:local-to-env --yes  # pg_dump local -> restore into DATABASE_URL
```

Run any TS script ad-hoc: `node --import tsx scripts/<name>.ts`. There is **no test runner**.

## Architecture

### Route groups

[src/app](src/app) has two Next.js route groups:

- **`(site)`** — public marketing pages. The root `/` redirects to `/home` ([src/app/(site)/page.tsx](<src/app/(site)/page.tsx>)). Shared chrome (announcement, navbar, footer) is in [src/app/(site)/layout.tsx](<src/app/(site)/layout.tsx>), wrapped in a client-side [SiteShell](<src/app/(site)/components/shared/site-shell.tsx>) that hosts the `RegisterModalProvider` context for the registration modal.
- **`(payload)`** — Payload admin at `/admin` and REST/GraphQL at `/api/*`, mounted by `@payloadcms/next` ([admin page](<src/app/(payload)/admin/[[...segments]]/page.tsx>), [api route](<src/app/(payload)/api/[...slug]/route.ts>)). Never edit `src/payload-types.ts` or `src/app/(payload)/admin/importMap.{ts,js}` — they are generated.

### Content sources

Three coexisting content patterns — picking the right one matters:

1. **Static TS content** for the site shell and home page — [src/app/(site)/content.ts](<src/app/(site)/content.ts>) (nav, footer, announcement) and [src/app/(site)/home/content.ts](<src/app/(site)/home/content.ts>). The home page composition is in [home-page.tsx](<src/app/(site)/components/home/home-page.tsx>); several sections (`HomeKeyDifferentiators`, `HomeTestimonials`, `CaseStudies`) are imported but currently commented out — be aware before "fixing" dead imports.
2. **Payload-driven** for location pages. The `Locations` collection ([src/collections/Locations.ts](src/collections/Locations.ts), ~1300 lines, drafts enabled) is the source of truth. Each US-state route ([src/app/(site)/locations/<state>/page.tsx](<src/app/(site)/locations>)) is a thin wrapper that calls `getLocationPageBySlug(slug)` from [src/app/(site)/locations/payload.ts](<src/app/(site)/locations/payload.ts>), then renders `<LocationPage>`. All 11 state routes use `export const dynamic = 'force-dynamic'`. `LocationDocumentBySlug` is wrapped in `React.cache()` for request-level deduping.
3. **Payload-driven** for blog posts. [src/app/(site)/blogs/page.tsx](<src/app/(site)/blogs/page.tsx>) reads from the `posts` collection (drafts enabled, sorted by `-publishedAt`); the dynamic `[slug]` route reads a single post.

### Location page composition

[src/app/(site)/components/locations/location-page.tsx](<src/app/(site)/components/locations/location-page.tsx>) orchestrates per-section components: `LocationHero`, `LocationShowcase`, `LocationOverview`, `LocationServices`, `LocationComparison`, `RegisterRideShareSection`, `PricingRideShareSection`, `LocationRegions`, `LocationManage`, `LocationTestimonials`, `LocationRegister`, `LocationFaq`, `LocationCta`. Note that `LocationCaseStudies` is commented out and `LocationPricing` is in the `LocationPageContent` type but **not rendered** (the rideshare variants render instead). The `Locations` collection mirrors these sections one-to-one and exposes className overrides — see the `classNameField` / `mediaFields` helpers at the top of `Locations.ts`. Media fields always pair a Payload `upload` relationship with a `*FallbackUrl` text field (migration shim); the frontend prefers the relationship.

When adding a new state page: copy an existing `locations/<state>/page.tsx`, change `LOCATION_SLUG`, add the entry to the location dropdown in [content.ts](<src/app/(site)/content.ts>), and create the matching `Location` doc in the CMS or via a seed script.

### Payload config

[payload.config.ts](payload.config.ts) registers `[Users, Posts, Media, Locations]`, uses `postgresAdapter({ idType: 'uuid' })`, points `migrationDir` at [src/migrations/](src/migrations), and conditionally enables `s3Storage` only when **all four** of `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` are set. In `NODE_ENV=development`, schema **push** is on (`push: process.env.NODE_ENV === 'development'`) — destructive schema changes can auto-apply without a migration, so verify the diff before committing.

Migrations are loaded via a hand-maintained static import list in [src/migrations/index.ts](src/migrations/index.ts). `yarn payload:migrate:create` updates it for you; if you author a migration file by hand, also add it there.

The `Media` collection uses a unique `sourceHash` (SHA-256) for de-duped imports, and `staticDir: 'media'` — in Docker, `public/media` is mounted as a named volume `media-uploads`.

### Auth: two unrelated systems

- **Payload users** ([src/collections/Users.ts](src/collections/Users.ts)) are admin/CMS accounts only.
- **Site visitor auth** flows through an external API in [src/app/(site)/components/shared/auth-client.ts](<src/app/(site)/components/shared/auth-client.ts>): `POST` to `${NEXT_PUBLIC_BACKEND_BASE_URL}/auth/...` for `login`, `signup`, `contactUs`. Token is stored in `localStorage` **and** a 7-day `token=` cookie. After signup, the page hard-redirects to `${NEXT_PUBLIC_RIDESHAIR_APP_BASE_LINK}/selectoption`. These two env vars are **not** declared in [.env.example](.env.example) or [src/types/env.d.ts](src/types/env.d.ts) — add them when you next touch either file.

### Path aliases and TS quirks

- `@/*` → `./src/*`, `@payload-config` → `./payload.config.ts`.
- `allowImportingTsExtensions` is on, so internal Payload imports use explicit `.ts` extensions (see top of [payload.config.ts](payload.config.ts)).
- `next.config.ts` has `typedRoutes: true` — new routes affect the `Route` union; a typecheck failure after adding a route may just mean the build cache is stale.

### Styling

[src/app/globals.css](src/app/globals.css) defines Tailwind theme tokens (`--color-ink`, `--color-mist`, `--color-ember`, `--color-tide`), three font families bound via `next/font` (local Satoshi, Google Poppins/Manrope), and a set of `type-*` typography utility classes (`type-hero`, `type-section-heading`, `type-location-*`, etc.) that responsive-scale at `min-width: 1024px`. Prefer these utility classes over re-deriving sizes.

The [Reveal](<src/app/(site)/components/shared/reveal.tsx>) wrapper uses `IntersectionObserver` for scroll-triggered fade-up animations and respects `prefers-reduced-motion`. Page sections are typically wrapped in `<Reveal>`.

### Environment

Local DB falls back to `postgresql://payload:payload@localhost:5433/payload_app` (matches [docker-compose.yml](docker-compose.yml)). `DATABASE_URL` overrides this. Required env: `PAYLOAD_SECRET`. Optional S3 group, optional `NEXT_PUBLIC_BACKEND_BASE_URL` + `NEXT_PUBLIC_RIDESHAIR_APP_BASE_LINK` for visitor auth. See [.env.example](.env.example).

### Docker

Multi-stage [Dockerfile](Dockerfile): deps → build → runner. The runner keeps full `node_modules` because `payload migrate` parses `payload.config.ts` at runtime. [docker-entrypoint.sh](docker-entrypoint.sh) runs `payload migrate` then `next start`. `NEXT_PUBLIC_SERVER_URL` is a build-time `ARG` baked into the client bundle — override via `--build-arg` for non-localhost builds.

## Workflow notes

- After editing any file in [src/collections/](src/collections): run `yarn payload:generate:types`. For schema changes also run `yarn payload:migrate:create <name>` (in dev, `push: true` may have already auto-applied — capture the diff into a migration before committing).
- After adding admin components or anything that changes the Payload admin import map, run `yarn payload:generate:importmap`.
- The `Locations` collection is large (~1300 lines, ~14 grouped sections). When adding a new section: update the collection, the migration, [LocationPageContent](<src/app/(site)/components/locations/location-page.tsx>), the per-section component, and the mapping in [locations/payload.ts](<src/app/(site)/locations/payload.ts>) — all five must match.
- ESLint enforces `@typescript-eslint/no-floating-promises` and `no-misused-promises` — server components and event handlers calling async work must handle the promise (await, `void`, or `.catch`).
- [src/migrations/](src/migrations) and `src/payload-types.ts` are excluded from some lint rules / ignored entirely; don't reformat them.
- [app-chex-ai-snippets/](app-chex-ai-snippets/) is **not** part of the Next build — it's a sibling CRA/Redux snippet folder kept as a reference for the cross-domain auth-bridge pattern. Don't import from it.
- [AGENTS.md](AGENTS.md) carries parallel guidance for non-Claude agents; keep the two in sync when conventions change.
