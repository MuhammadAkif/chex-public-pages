# Graph Report - /Users/apple/Desktop/Techling/Chex/chex-public-pages  (2026-04-27)

## Corpus Check
- Graphify build uses AST extraction plus repo-aware semantic augmentation for routes, content modules, and shared component composition.

## Summary
- 146 nodes · 251 edges · 22 communities detected
- Extraction: 67% EXTRACTED · 33% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.5)
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
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]

## God Nodes (most connected - your core abstractions)
1. `src/app/(site)/components/locations/location-page.tsx` - 34 edges
2. `LocationPage()` - 23 edges
3. `src/app/(site)/components/home/home-page.tsx` - 13 edges
4. `LocationCaseStudies()` - 12 edges
5. `LocationCta()` - 12 edges
6. `LocationOverview()` - 12 edges
7. `LocationShowcase()` - 12 edges
8. `src/app/(site)/components/shared/site-image.tsx` - 11 edges
9. `src/app/(site)/components/ui/button.tsx` - 9 edges
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
Cohesion: 0.09
Nodes (27): HomeBenefits(), HomeBusinessHelp(), HomeCallToAction(), HomeHero(), HomeHowItWorks(), HomeKeyDifferentiators(), Reveal(), useReveal() (+19 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (10): src/app/(site)/components/locations/location-hero.tsx, src/app/(site)/components/locations/location-manage.tsx, src/app/(site)/components/locations/location-services.tsx, src/app/(site)/components/shared/announcement-header.tsx, src/app/(site)/components/shared/footer.tsx, src/app/(site)/components/shared/navbar.tsx, src/app/(site)/components/ui/button.tsx, src/app/(site)/content.ts (+2 more)

### Community 2 - "Community 2"
Cohesion: 0.36
Nodes (8): AlabamaRoutePage(), src/app/(site)/components/locations/location-page.tsx, src/app/(site)/components/locations/location-regions.tsx, src/app/(site)/locations/alabama/content.ts, alabamaContent, src/app/(site)/locations/alabama/page.tsx, src/app/(site)/locations/new-mexico/content.ts, src/app/(site)/locations/new-mexico/page.tsx

### Community 3 - "Community 3"
Cohesion: 0.25
Nodes (4): src/migrations/20260422_162945_initial_schema.ts, src/migrations/20260427_111031_media_collection.ts, src/migrations/index.ts, migrations

### Community 4 - "Community 4"
Cohesion: 0.43
Nodes (7): LocationPage(), ColoradoRoutePage(), NewMexicoRoutePage(), src/app/(site)/locations/colorado/content.ts, coloradoContent, src/app/(site)/locations/colorado/page.tsx, newMexicoContent

### Community 5 - "Community 5"
Cohesion: 0.33
Nodes (6): src/app/(payload)/api/[...slug]/route.ts, DELETE, GET, OPTIONS, PATCH, POST

### Community 6 - "Community 6"
Cohesion: 0.4
Nodes (6): LocationOverview(), NevadaRoutePage(), src/app/(site)/components/locations/location-overview.tsx, src/app/(site)/locations/nevada/content.ts, nevadaContent, src/app/(site)/locations/nevada/page.tsx

### Community 7 - "Community 7"
Cohesion: 0.4
Nodes (6): LocationCta(), ArizonaRoutePage(), src/app/(site)/components/locations/location-cta.tsx, src/app/(site)/locations/arizona/content.ts, arizonaContent, src/app/(site)/locations/arizona/page.tsx

### Community 8 - "Community 8"
Cohesion: 0.4
Nodes (6): LocationShowcase(), CaliforniaRoutePage(), src/app/(site)/components/locations/location-showcase.tsx, src/app/(site)/locations/california/content.ts, californiaContent, src/app/(site)/locations/california/page.tsx

### Community 9 - "Community 9"
Cohesion: 0.4
Nodes (5): LocationCaseStudies(), OhioRoutePage(), src/app/(site)/locations/ohio/content.ts, ohioContent, src/app/(site)/locations/ohio/page.tsx

### Community 10 - "Community 10"
Cohesion: 0.4
Nodes (3): src/collections/Media.ts, src/collections/Posts.ts, src/collections/Users.ts

### Community 11 - "Community 11"
Cohesion: 0.5
Nodes (2): src/app/(payload)/admin/[[...segments]]/page.tsx, generateMetadata

### Community 12 - "Community 12"
Cohesion: 0.67
Nodes (4): ArkansasRoutePage(), src/app/(site)/locations/arkansas/content.ts, arkansasContent, src/app/(site)/locations/arkansas/page.tsx

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (4): IowaRoutePage(), src/app/(site)/locations/iowa/content.ts, iowaContent, src/app/(site)/locations/iowa/page.tsx

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (4): SouthCarolinaRoutePage(), src/app/(site)/locations/south-carolina/content.ts, southCarolinaContent, src/app/(site)/locations/south-carolina/page.tsx

### Community 15 - "Community 15"
Cohesion: 0.67
Nodes (4): NebraskaRoutePage(), src/app/(site)/locations/nebraska/content.ts, nebraskaContent, src/app/(site)/locations/nebraska/page.tsx

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (1): src/app/(payload)/layout.tsx

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (1): src/app/(site)/components/locations/location-faq.tsx

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (1): src/app/(site)/page.tsx

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (1): src/app/layout.tsx

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (1): src/types/env.d.ts

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (1): src/types/payload-import-map.d.ts

## Knowledge Gaps
- **16 isolated node(s):** `src/app/(site)/components/locations/location-regions.tsx`, `src/app/(site)/page.tsx`, `src/app/layout.tsx`, `src/collections/Media.ts`, `src/collections/Posts.ts` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 11`** (4 nodes): `generateMetadata()`, `PayloadAdminPage()`, `src/app/(payload)/admin/[[...segments]]/page.tsx`, `generateMetadata`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (3 nodes): `PayloadLayout()`, `serverFunction()`, `src/app/(payload)/layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (2 nodes): `ChevronIcon()`, `src/app/(site)/components/locations/location-faq.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `SitePage()`, `src/app/(site)/page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `RootLayout()`, `src/app/layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (1 nodes): `src/types/env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `src/types/payload-import-map.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `src/app/(site)/components/locations/location-page.tsx` connect `Community 2` to `Community 0`, `Community 1`, `Community 4`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 17`?**
  _High betweenness centrality (0.320) - this node is a cross-community bridge._
- **Why does `src/app/(site)/components/shared/site-image.tsx` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `src/app/(site)/components/shared/reveal.tsx` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Are the 22 inferred relationships involving `LocationPage()` (e.g. with `alabamaContent` and `AlabamaRoutePage()`) actually correct?**
  _`LocationPage()` has 22 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `LocationCaseStudies()` (e.g. with `alabamaContent` and `arizonaContent`) actually correct?**
  _`LocationCaseStudies()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `LocationCta()` (e.g. with `alabamaContent` and `arizonaContent`) actually correct?**
  _`LocationCta()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `src/app/(site)/components/locations/location-regions.tsx`, `src/app/(site)/page.tsx`, `src/app/layout.tsx` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._