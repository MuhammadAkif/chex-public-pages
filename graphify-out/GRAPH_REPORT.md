# Graph Report - /Users/apple/Desktop/Techling/Chex/chex-public-pages  (2026-04-24)

## Corpus Check
- Graphify build uses AST extraction plus repo-aware semantic augmentation for routes, content modules, and shared component composition.

## Summary
- 144 nodes · 240 edges · 18 communities detected
- Extraction: 65% EXTRACTED · 35% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)
1. `src/app/(site)/components/locations/location-page.tsx` - 34 edges
2. `LocationPage()` - 23 edges
3. `src/app/(site)/components/home/home-page.tsx` - 13 edges
4. `LocationCaseStudies()` - 12 edges
5. `LocationCta()` - 12 edges
6. `LocationOverview()` - 12 edges
7. `LocationShowcase()` - 12 edges
8. `src/app/(site)/components/ui/button.tsx` - 10 edges
9. `src/app/(site)/components/locations/location-showcase.tsx` - 7 edges
10. `src/app/(site)/components/shared/reveal.tsx` - 7 edges

## Surprising Connections (you probably didn't know these)
- `homeContent` --provides_props_for--> `HomeBenefits()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/home/content.ts → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/home/home-benefits.tsx
- `homeContent` --provides_props_for--> `HomeBusinessHelp()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/home/content.ts → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/home/home-business-help.tsx
- `homeContent` --provides_props_for--> `HomeCallToAction()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/home/content.ts → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/home/home-call-to-action.tsx
- `homeContent` --provides_props_for--> `HomeHero()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/home/content.ts → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/home/home-hero.tsx
- `homeContent` --provides_props_for--> `HomeHowItWorks()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/home/content.ts → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/home/home-how-it-works.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (29): LocationCta(), LocationOverview(), LocationPage(), LocationShowcase(), AlabamaRoutePage(), ArizonaRoutePage(), ArkansasRoutePage(), CaliforniaRoutePage() (+21 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (21): HomeBenefits(), HomeBusinessHelp(), HomeCallToAction(), HomeHero(), HomeHowItWorks(), HomeKeyDifferentiators(), src/app/(site)/components/home/home-benefits.tsx, src/app/(site)/components/home/home-business-help.tsx (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (17): SouthCarolinaRoutePage(), src/app/(site)/components/locations/location-cta.tsx, src/app/(site)/components/locations/location-faq.tsx, src/app/(site)/components/locations/location-hero.tsx, src/app/(site)/components/locations/location-manage.tsx, src/app/(site)/components/locations/location-page.tsx, src/app/(site)/components/locations/location-regions.tsx, src/app/(site)/components/locations/location-services.tsx (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.2
Nodes (6): src/app/(site)/components/shared/announcement-header.tsx, src/app/(site)/components/shared/footer.tsx, src/app/(site)/components/shared/navbar.tsx, src/app/(site)/content.ts, siteContent, src/app/(site)/layout.tsx

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (6): LocationCaseStudies(), Reveal(), useReveal(), src/app/(site)/components/locations/location-case-studies.tsx, src/app/(site)/components/shared/case-studies.tsx, src/app/(site)/components/shared/reveal.tsx

### Community 5 - "Community 5"
Cohesion: 0.33
Nodes (6): src/app/(payload)/api/[...slug]/route.ts, DELETE, GET, OPTIONS, PATCH, POST

### Community 6 - "Community 6"
Cohesion: 0.4
Nodes (3): src/migrations/20260422_162945_initial_schema.ts, src/migrations/index.ts, migrations

### Community 7 - "Community 7"
Cohesion: 0.5
Nodes (2): src/app/(payload)/admin/[[...segments]]/page.tsx, generateMetadata

### Community 8 - "Community 8"
Cohesion: 0.67
Nodes (4): NevadaRoutePage(), src/app/(site)/locations/nevada/content.ts, nevadaContent, src/app/(site)/locations/nevada/page.tsx

### Community 9 - "Community 9"
Cohesion: 0.67
Nodes (4): ColoradoRoutePage(), src/app/(site)/locations/colorado/content.ts, coloradoContent, src/app/(site)/locations/colorado/page.tsx

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (4): IowaRoutePage(), src/app/(site)/locations/iowa/content.ts, iowaContent, src/app/(site)/locations/iowa/page.tsx

### Community 11 - "Community 11"
Cohesion: 0.67
Nodes (2): src/collections/Posts.ts, src/collections/Users.ts

### Community 12 - "Community 12"
Cohesion: 0.67
Nodes (1): src/app/(payload)/layout.tsx

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (1): src/app/(site)/page.tsx

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (1): src/app/layout.tsx

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (1): src/types/env.d.ts

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (1): src/types/payload-import-map.d.ts

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (1): src/types/static-assets.d.ts

## Knowledge Gaps
- **16 isolated node(s):** `src/app/(site)/components/locations/location-regions.tsx`, `src/app/(site)/page.tsx`, `src/app/layout.tsx`, `src/collections/Posts.ts`, `src/collections/Users.ts` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 7`** (4 nodes): `generateMetadata()`, `PayloadAdminPage()`, `src/app/(payload)/admin/[[...segments]]/page.tsx`, `generateMetadata`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (3 nodes): `payload.config.ts`, `src/collections/Posts.ts`, `src/collections/Users.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (3 nodes): `PayloadLayout()`, `serverFunction()`, `src/app/(payload)/layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `SitePage()`, `src/app/(site)/page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `RootLayout()`, `src/app/layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `src/types/env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (1 nodes): `src/types/payload-import-map.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `src/types/static-assets.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `src/app/(site)/components/locations/location-page.tsx` connect `Community 2` to `Community 0`, `Community 1`, `Community 4`, `Community 8`, `Community 9`, `Community 10`?**
  _High betweenness centrality (0.352) - this node is a cross-community bridge._
- **Why does `src/app/(site)/components/ui/button.tsx` connect `Community 2` to `Community 1`, `Community 3`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `src/app/(site)/components/home/home-page.tsx` connect `Community 1` to `Community 4`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Are the 22 inferred relationships involving `LocationPage()` (e.g. with `alabamaContent` and `AlabamaRoutePage()`) actually correct?**
  _`LocationPage()` has 22 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `LocationCaseStudies()` (e.g. with `alabamaContent` and `arizonaContent`) actually correct?**
  _`LocationCaseStudies()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `LocationCta()` (e.g. with `alabamaContent` and `arizonaContent`) actually correct?**
  _`LocationCta()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `src/app/(site)/components/locations/location-regions.tsx`, `src/app/(site)/page.tsx`, `src/app/layout.tsx` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._