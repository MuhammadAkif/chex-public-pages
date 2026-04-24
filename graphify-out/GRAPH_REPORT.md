# Graph Report - /Users/apple/Desktop/Techling/Chex/chex-public-pages  (2026-04-24)

## Corpus Check
- Graphify build uses AST extraction plus repo-aware semantic augmentation for routes, content modules, and shared component composition.

## Summary
- 139 nodes · 235 edges · 18 communities detected
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
- [[_COMMUNITY_Community 15|Community 15]]
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
8. `src/app/(site)/components/ui/button.tsx` - 9 edges
9. `src/app/(site)/components/shared/reveal.tsx` - 7 edges
10. `homeContent` - 7 edges

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
Cohesion: 0.08
Nodes (26): HomeBenefits(), HomeBusinessHelp(), HomeCallToAction(), HomeHero(), HomeHowItWorks(), HomeKeyDifferentiators(), src/app/(site)/components/home/home-benefits.tsx, src/app/(site)/components/home/home-business-help.tsx (+18 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (26): LocationCta(), LocationOverview(), LocationPage(), LocationShowcase(), AlabamaRoutePage(), ArkansasRoutePage(), ColoradoRoutePage(), IowaRoutePage() (+18 more)

### Community 2 - "Community 2"
Cohesion: 0.23
Nodes (11): NebraskaRoutePage(), src/app/(site)/components/locations/location-faq.tsx, src/app/(site)/components/locations/location-page.tsx, src/app/(site)/components/locations/location-regions.tsx, src/app/(site)/locations/alabama/content.ts, src/app/(site)/locations/alabama/page.tsx, src/app/(site)/locations/colorado/content.ts, src/app/(site)/locations/colorado/page.tsx (+3 more)

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
Cohesion: 0.5
Nodes (4): OhioRoutePage(), src/app/(site)/locations/ohio/content.ts, ohioContent, src/app/(site)/locations/ohio/page.tsx

### Community 7 - "Community 7"
Cohesion: 0.4
Nodes (3): src/migrations/20260422_162945_initial_schema.ts, src/migrations/index.ts, migrations

### Community 8 - "Community 8"
Cohesion: 0.5
Nodes (2): src/app/(payload)/admin/[[...segments]]/page.tsx, generateMetadata

### Community 9 - "Community 9"
Cohesion: 0.67
Nodes (4): ArizonaRoutePage(), src/app/(site)/locations/arizona/content.ts, arizonaContent, src/app/(site)/locations/arizona/page.tsx

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (4): CaliforniaRoutePage(), src/app/(site)/locations/california/content.ts, californiaContent, src/app/(site)/locations/california/page.tsx

### Community 11 - "Community 11"
Cohesion: 0.67
Nodes (4): SouthCarolinaRoutePage(), src/app/(site)/locations/south-carolina/content.ts, southCarolinaContent, src/app/(site)/locations/south-carolina/page.tsx

### Community 12 - "Community 12"
Cohesion: 0.67
Nodes (2): src/collections/Posts.ts, src/collections/Users.ts

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (1): src/app/(payload)/layout.tsx

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (1): src/app/(site)/page.tsx

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (1): src/app/layout.tsx

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (1): src/types/env.d.ts

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (1): src/types/payload-import-map.d.ts

## Knowledge Gaps
- **15 isolated node(s):** `src/app/(site)/components/locations/location-regions.tsx`, `src/app/(site)/page.tsx`, `src/app/layout.tsx`, `src/collections/Posts.ts`, `src/collections/Users.ts` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 8`** (4 nodes): `generateMetadata()`, `PayloadAdminPage()`, `src/app/(payload)/admin/[[...segments]]/page.tsx`, `generateMetadata`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (3 nodes): `payload.config.ts`, `src/collections/Posts.ts`, `src/collections/Users.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (3 nodes): `PayloadLayout()`, `serverFunction()`, `src/app/(payload)/layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `SitePage()`, `src/app/(site)/page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (2 nodes): `RootLayout()`, `src/app/layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (1 nodes): `src/types/env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `src/types/payload-import-map.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `src/app/(site)/components/locations/location-page.tsx` connect `Community 2` to `Community 0`, `Community 1`, `Community 4`, `Community 6`, `Community 9`, `Community 10`, `Community 11`?**
  _High betweenness centrality (0.360) - this node is a cross-community bridge._
- **Why does `src/app/(site)/components/ui/button.tsx` connect `Community 0` to `Community 3`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `src/app/(site)/components/home/home-page.tsx` connect `Community 0` to `Community 4`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Are the 22 inferred relationships involving `LocationPage()` (e.g. with `alabamaContent` and `AlabamaRoutePage()`) actually correct?**
  _`LocationPage()` has 22 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `LocationCaseStudies()` (e.g. with `alabamaContent` and `arizonaContent`) actually correct?**
  _`LocationCaseStudies()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `LocationCta()` (e.g. with `alabamaContent` and `arizonaContent`) actually correct?**
  _`LocationCta()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `src/app/(site)/components/locations/location-regions.tsx`, `src/app/(site)/page.tsx`, `src/app/layout.tsx` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._