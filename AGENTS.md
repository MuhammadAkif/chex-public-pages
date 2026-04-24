# Chex Public Pages Agent Guide

This repository is a Next.js 16 App Router project with two distinct surfaces:

- `src/app/(site)`: public marketing pages, including the home page and state/location landing pages
- `src/app/(payload)`: Payload CMS admin and REST endpoints backed by PostgreSQL

Prefer targeted edits inside the correct surface. Do not mix site-page changes with Payload schema changes unless the task explicitly requires both.

## Working Model

- Route entry files are intentionally thin. Most route files only export `metadata` and render one page component.
- Public page copy and imagery are primarily driven by co-located `content.ts` modules.
- Shared layout, navigation, footer, and UI primitives live under `src/app/(site)/components/shared` and `src/app/(site)/components/ui`.
- Location pages are composed by `src/app/(site)/components/locations/location-page.tsx`, which renders a fixed sequence of reusable sections.
- Payload collections are defined in `src/collections`, wired in `payload.config.ts`, and persisted through migrations in `src/migrations`.

## Repo Map

- `src/app/layout.tsx`: global fonts, metadata, and `globals.css`
- `src/app/globals.css`: Tailwind v4 theme tokens, typography utilities, motion reveal styles
- `src/app/(site)/layout.tsx`: site chrome using shared announcement, navbar, and footer content
- `src/app/(site)/content.ts`: global site navigation and footer content
- `src/app/(site)/home/content.ts`: home page content model
- `src/app/(site)/home/page.tsx`: thin route for the home page
- `src/app/(site)/components/home/*`: home page sections
- `src/app/(site)/locations/<state>/content.ts`: state-specific content objects
- `src/app/(site)/locations/<state>/page.tsx`: thin route for each state page
- `src/app/(site)/components/locations/*`: reusable section components for all location pages
- `src/app/(payload)/admin/[[...segments]]/page.tsx`: Payload admin entrypoint
- `src/app/(payload)/api/[...slug]/route.ts`: Payload REST bindings
- `payload.config.ts`: Payload configuration, Postgres adapter, type generation

## Editing Rules

- For home page copy/layout updates, start with `src/app/(site)/home/content.ts` and `src/app/(site)/components/home`.
- For a location page update, check whether the change belongs in:
  - the route metadata file in `src/app/(site)/locations/<state>/page.tsx`
  - the state content object in `src/app/(site)/locations/<state>/content.ts`
  - a shared section component in `src/app/(site)/components/locations`
- Keep route files thin. Do not move large content objects into `page.tsx`.
- Reuse existing shared UI components before adding new primitives.
- Preserve the existing content-driven pattern. If one location needs new section behavior, prefer extending the shared section API rather than hardcoding that behavior in one route.
- Only edit `payload.config.ts`, `src/collections/*`, generated import maps, or migrations for tasks that explicitly involve CMS or schema work.
- Treat generated files carefully:
  - `src/payload-types.ts`
  - `src/app/(payload)/admin/importMap.ts`
  - `src/app/(payload)/admin/importMap.js`
  Update them only when the related Payload workflow requires regeneration.

## Architecture Notes

- The site side is mostly static and asset-heavy. Images are imported directly from `src/app/(site)/assets/...`.
- The project uses Next.js path aliasing via `@/* -> ./src/*`.
- Tailwind v4 is configured through `@theme inline` tokens in `src/app/globals.css`.
- Reveal-on-scroll behavior is implemented in `src/app/(site)/components/shared/reveal.tsx`.
- `src/app/(site)/page.tsx` redirects `/` to `/home`.

## Verification

Use the smallest relevant checks after edits:

- `yarn typecheck`
- `yarn lint`
- `yarn build`

For Payload changes, verify the database workflow as needed:

- `yarn payload:migrate:status`
- `yarn payload:migrate`

## Graphify Notes

If `graphify-out/GRAPH_REPORT.md` exists, read it before broad file searches when the task is architectural, cross-cutting, or ambiguous.

Useful Graphify commands from repo root:

- `graphify .`
- `graphify query "how are Nevada location pages assembled?"`
- `graphify explain "LocationPage"`
- `graphify path "src/app/(site)/locations/nevada/page.tsx" "src/app/(site)/components/locations/location-showcase.tsx"`

When Graphify and raw files disagree, treat source files as ground truth and regenerate the graph.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
