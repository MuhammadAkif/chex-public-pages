# Graph Report - /Users/apple/Desktop/Techling/Chex/chex-public-pages  (2026-04-27)

## Corpus Check
- Graphify build uses AST extraction plus repo-aware semantic augmentation for routes, content modules, and shared component composition.

## Summary
- 171 nodes · 294 edges · 25 communities detected
- Extraction: 71% EXTRACTED · 29% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.54)
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
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]

## God Nodes (most connected - your core abstractions)
1. `src/app/(site)/components/locations/location-page.tsx` - 35 edges
2. `LocationPage()` - 23 edges
3. `src/app/(site)/locations/payload.ts` - 19 edges
4. `getLocationPageBySlug()` - 14 edges
5. `generateMetadata()` - 13 edges
6. `src/app/(site)/components/home/home-page.tsx` - 13 edges
7. `LocationCaseStudies()` - 12 edges
8. `LocationCta()` - 12 edges
9. `LocationOverview()` - 12 edges
10. `LocationShowcase()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --uses_symbol--> `getLocationPageBySlug()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/south-carolina/page.tsx → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/payload.ts
- `homeContent` --provides_props_for--> `HomeBenefits()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/home/content.ts → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/home/home-benefits.tsx
- `homeContent` --provides_props_for--> `HomeBusinessHelp()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/home/content.ts → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/home/home-business-help.tsx
- `homeContent` --provides_props_for--> `HomeCallToAction()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/home/content.ts → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/home/home-call-to-action.tsx
- `homeContent` --provides_props_for--> `HomeHero()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/home/content.ts → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/home/home-hero.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (24): HomeBenefits(), HomeBusinessHelp(), HomeCallToAction(), HomeHero(), HomeHowItWorks(), HomeKeyDifferentiators(), src/app/(site)/components/home/home-benefits.tsx, src/app/(site)/components/home/home-business-help.tsx (+16 more)

### Community 1 - "Community 1"
Cohesion: 0.16
Nodes (29): LocationCaseStudies(), LocationCta(), LocationOverview(), LocationPage(), LocationShowcase(), src/app/(site)/components/locations/location-overview.tsx, src/app/(site)/components/locations/location-showcase.tsx, src/app/(site)/locations/alabama/content.ts (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.21
Nodes (8): src/app/(site)/components/locations/location-cta.tsx, src/app/(site)/components/locations/location-faq.tsx, src/app/(site)/components/locations/location-hero.tsx, src/app/(site)/components/locations/location-manage.tsx, src/app/(site)/components/locations/location-page.tsx, src/app/(site)/components/locations/location-regions.tsx, src/app/(site)/components/locations/location-services.tsx, src/app/(site)/components/ui/button.tsx

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (5): src/migrations/20260422_162945_initial_schema.ts, src/migrations/20260427_111031_media_collection.ts, src/migrations/20260427_122450_locations_collection.ts, src/migrations/index.ts, migrations

### Community 4 - "Community 4"
Cohesion: 0.2
Nodes (6): src/app/(site)/components/shared/announcement-header.tsx, src/app/(site)/components/shared/footer.tsx, src/app/(site)/components/shared/navbar.tsx, src/app/(site)/content.ts, siteContent, src/app/(site)/layout.tsx

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (4): src/collections/Locations.ts, src/collections/Media.ts, src/collections/Posts.ts, src/collections/Users.ts

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (6): ColoradoRoutePage(), generateMetadata(), src/app/(payload)/admin/[[...segments]]/page.tsx, generateMetadata, src/app/(site)/locations/colorado/page.tsx, dynamic

### Community 7 - "Community 7"
Cohesion: 0.52
Nodes (7): mediaURL(), optionalMediaURL(), optionalString(), textItems(), toLocationPageContent(), src/app/(site)/locations/payload.ts, getLocationDocumentBySlug

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (6): src/app/(payload)/api/[...slug]/route.ts, DELETE, GET, OPTIONS, PATCH, POST

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (3): Reveal(), useReveal(), src/app/(site)/components/shared/reveal.tsx

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (4): ArizonaRoutePage(), getLocationPageBySlug(), src/app/(site)/locations/arizona/page.tsx, dynamic

### Community 11 - "Community 11"
Cohesion: 0.67
Nodes (1): src/app/(payload)/layout.tsx

### Community 12 - "Community 12"
Cohesion: 0.67
Nodes (3): OhioRoutePage(), src/app/(site)/locations/ohio/page.tsx, dynamic

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (3): CaliforniaRoutePage(), src/app/(site)/locations/california/page.tsx, dynamic

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (3): AlabamaRoutePage(), src/app/(site)/locations/alabama/page.tsx, dynamic

### Community 15 - "Community 15"
Cohesion: 0.67
Nodes (3): NewMexicoRoutePage(), src/app/(site)/locations/new-mexico/page.tsx, dynamic

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (3): ArkansasRoutePage(), src/app/(site)/locations/arkansas/page.tsx, dynamic

### Community 17 - "Community 17"
Cohesion: 0.67
Nodes (3): IowaRoutePage(), src/app/(site)/locations/iowa/page.tsx, dynamic

### Community 18 - "Community 18"
Cohesion: 0.67
Nodes (3): NevadaRoutePage(), src/app/(site)/locations/nevada/page.tsx, dynamic

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (3): SouthCarolinaRoutePage(), src/app/(site)/locations/south-carolina/page.tsx, dynamic

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (3): NebraskaRoutePage(), src/app/(site)/locations/nebraska/page.tsx, dynamic

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (1): src/app/(site)/page.tsx

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (1): src/app/layout.tsx

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (1): src/types/env.d.ts

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (1): src/types/payload-import-map.d.ts

## Knowledge Gaps
- **28 isolated node(s):** `src/app/(site)/components/locations/location-regions.tsx`, `src/app/(site)/page.tsx`, `src/app/layout.tsx`, `src/collections/Media.ts`, `src/collections/Posts.ts` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 11`** (3 nodes): `PayloadLayout()`, `serverFunction()`, `src/app/(payload)/layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `SitePage()`, `src/app/(site)/page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `RootLayout()`, `src/app/layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (1 nodes): `src/types/env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (1 nodes): `src/types/payload-import-map.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `src/app/(site)/components/locations/location-page.tsx` connect `Community 2` to `Community 0`, `Community 1`, `Community 6`, `Community 7`, `Community 9`, `Community 10`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 20`?**
  _High betweenness centrality (0.366) - this node is a cross-community bridge._
- **Why does `src/app/(site)/components/shared/site-image.tsx` connect `Community 0` to `Community 2`, `Community 4`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `src/app/(site)/components/shared/reveal.tsx` connect `Community 9` to `Community 0`, `Community 2`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Are the 22 inferred relationships involving `LocationPage()` (e.g. with `alabamaContent` and `AlabamaRoutePage()`) actually correct?**
  _`LocationPage()` has 22 INFERRED edges - model-reasoned connections that need verification._
- **Are the 12 inferred relationships involving `getLocationPageBySlug()` (e.g. with `generateMetadata()` and `AlabamaRoutePage()`) actually correct?**
  _`getLocationPageBySlug()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **What connects `src/app/(site)/components/locations/location-regions.tsx`, `src/app/(site)/page.tsx`, `src/app/layout.tsx` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._