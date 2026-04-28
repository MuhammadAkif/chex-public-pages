# Graph Report - .  (2026-04-28)

## Corpus Check
- Corpus is ~22,465 words - fits in a single context window. You may not need a graph.

## Summary
- 261 nodes · 324 edges · 37 communities detected
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_State Location Routes|State Location Routes]]
- [[_COMMUNITY_Graph Build Utilities|Graph Build Utilities]]
- [[_COMMUNITY_Asset Processing|Asset Processing]]
- [[_COMMUNITY_Location Data Seeding|Location Data Seeding]]
- [[_COMMUNITY_Payload Field Builders|Payload Field Builders]]
- [[_COMMUNITY_Project Tech Stack|Project Tech Stack]]
- [[_COMMUNITY_Reveal Animation|Reveal Animation]]
- [[_COMMUNITY_Media Migration|Media Migration]]
- [[_COMMUNITY_Initial Schema Migration|Initial Schema Migration]]
- [[_COMMUNITY_Home Benefits Section|Home Benefits Section]]
- [[_COMMUNITY_Locations Migration|Locations Migration]]
- [[_COMMUNITY_Payload Admin Layout|Payload Admin Layout]]
- [[_COMMUNITY_Root HTML Layout|Root HTML Layout]]
- [[_COMMUNITY_Site Shell Layout|Site Shell Layout]]
- [[_COMMUNITY_Root Page Routing|Root Page Routing]]
- [[_COMMUNITY_Home Route Page|Home Route Page]]
- [[_COMMUNITY_Surface Card UI|Surface Card UI]]
- [[_COMMUNITY_Section Heading UI|Section Heading UI]]
- [[_COMMUNITY_Button UI|Button UI]]
- [[_COMMUNITY_Home Key Differentiators|Home Key Differentiators]]
- [[_COMMUNITY_Home Business Help|Home Business Help]]
- [[_COMMUNITY_Home How It Works|Home How It Works]]
- [[_COMMUNITY_Home Hero Section|Home Hero Section]]
- [[_COMMUNITY_Home CTA|Home CTA]]
- [[_COMMUNITY_Site Navigation|Site Navigation]]
- [[_COMMUNITY_Site Footer|Site Footer]]
- [[_COMMUNITY_Site Image|Site Image]]
- [[_COMMUNITY_Announcement Header|Announcement Header]]
- [[_COMMUNITY_Shared Case Studies|Shared Case Studies]]
- [[_COMMUNITY_Location Hero Section|Location Hero Section]]
- [[_COMMUNITY_Location Showcase|Location Showcase]]
- [[_COMMUNITY_Location Overview|Location Overview]]
- [[_COMMUNITY_Location Manage Section|Location Manage Section]]
- [[_COMMUNITY_Location FAQ|Location FAQ]]
- [[_COMMUNITY_Location Page Wrapper|Location Page Wrapper]]
- [[_COMMUNITY_Location CTA|Location CTA]]
- [[_COMMUNITY_Location Case Studies|Location Case Studies]]

## God Nodes (most connected - your core abstractions)
1. `generateMetadata()` - 25 edges
2. `rebuild_graph()` - 17 edges
3. `getLocationPageBySlug()` - 15 edges
4. `Chex Public Pages` - 11 edges
5. `main()` - 8 edges
6. `rewriteContentImports()` - 7 edges
7. `toLocationPageContent()` - 7 edges
8. `relative_path()` - 6 edges
9. `file_node_id()` - 6 edges
10. `symbol_node_id()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `getLocationPageBySlug()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(payload)/admin/[[...segments]]/page.tsx → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/payload.ts
- `AlabamaRoutePage()` --calls--> `getLocationPageBySlug()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/alabama/page.tsx → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/payload.ts
- `NewMexicoRoutePage()` --calls--> `getLocationPageBySlug()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/new-mexico/page.tsx → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/payload.ts
- `ColoradoRoutePage()` --calls--> `getLocationPageBySlug()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/colorado/page.tsx → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/payload.ts
- `OhioRoutePage()` --calls--> `getLocationPageBySlug()`  [INFERRED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/ohio/page.tsx → /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/locations/payload.ts

## Communities

### Community 0 - "State Location Routes"
Cohesion: 0.08
Nodes (19): AlabamaRoutePage(), ArizonaRoutePage(), ArkansasRoutePage(), CaliforniaRoutePage(), ColoradoRoutePage(), generateMetadata(), IowaRoutePage(), NebraskaRoutePage() (+11 more)

### Community 1 - "Graph Build Utilities"
Cohesion: 0.32
Nodes (18): add_edge(), add_node(), build_detection_result(), file_node_id(), find_block(), function_bodies(), gather_files(), import_statements() (+10 more)

### Community 2 - "Asset Processing"
Cohesion: 0.36
Nodes (13): collectAssetImports(), dedupeAssets(), escapeRegExp(), getContentFiles(), hashFile(), main(), publicURLFor(), removeImportDeclarations() (+5 more)

### Community 3 - "Location Data Seeding"
Cohesion: 0.37
Nodes (12): buildLocationData(), createMediaFromURL(), filenameFromURL(), findMediaByField(), loadContent(), main(), mediaField(), mediaSourceURL() (+4 more)

### Community 4 - "Payload Field Builders"
Cohesion: 0.18
Nodes (4): classNameField(), mediaFields(), textItemField(), getS3PublicURL()

### Community 5 - "Project Tech Stack"
Cohesion: 0.24
Nodes (12): Chex Public Pages, Docker, Environment Variables, Next.js 16 (App Router, Turbopack), Node.js >= 20.9.0, Payload CMS 3, PostgreSQL 17, Sass (+4 more)

### Community 6 - "Reveal Animation"
Cohesion: 0.6
Nodes (4): Reveal(), revealClassName(), revealStyle(), useReveal()

### Community 7 - "Media Migration"
Cohesion: 0.67
Nodes (2): down(), up()

### Community 8 - "Initial Schema Migration"
Cohesion: 0.67
Nodes (2): down(), up()

### Community 9 - "Home Benefits Section"
Cohesion: 0.67
Nodes (2): BenefitIcon(), HomeBenefits()

### Community 10 - "Locations Migration"
Cohesion: 0.67
Nodes (2): down(), up()

### Community 11 - "Payload Admin Layout"
Cohesion: 0.67
Nodes (2): PayloadLayout(), serverFunction()

### Community 12 - "Root HTML Layout"
Cohesion: 0.67
Nodes (1): RootLayout()

### Community 13 - "Site Shell Layout"
Cohesion: 0.67
Nodes (1): SiteLayout()

### Community 14 - "Root Page Routing"
Cohesion: 0.67
Nodes (1): SitePage()

### Community 15 - "Home Route Page"
Cohesion: 0.67
Nodes (1): HomeRoutePage()

### Community 16 - "Surface Card UI"
Cohesion: 0.67
Nodes (1): SurfaceCard()

### Community 17 - "Section Heading UI"
Cohesion: 0.67
Nodes (1): SectionHeading()

### Community 18 - "Button UI"
Cohesion: 0.67
Nodes (1): Button()

### Community 19 - "Home Key Differentiators"
Cohesion: 0.67
Nodes (1): HomeKeyDifferentiators()

### Community 20 - "Home Business Help"
Cohesion: 0.67
Nodes (1): HomeBusinessHelp()

### Community 21 - "Home How It Works"
Cohesion: 0.67
Nodes (1): HomeHowItWorks()

### Community 22 - "Home Hero Section"
Cohesion: 0.67
Nodes (1): HomeHero()

### Community 23 - "Home CTA"
Cohesion: 0.67
Nodes (1): HomeCallToAction()

### Community 24 - "Site Navigation"
Cohesion: 0.67
Nodes (1): updateScrollState()

### Community 25 - "Site Footer"
Cohesion: 0.67
Nodes (1): Footer()

### Community 26 - "Site Image"
Cohesion: 0.67
Nodes (1): SiteImage()

### Community 27 - "Announcement Header"
Cohesion: 0.67
Nodes (1): AnnouncementHeader()

### Community 28 - "Shared Case Studies"
Cohesion: 0.67
Nodes (1): CaseStudyBackgroundImage()

### Community 29 - "Location Hero Section"
Cohesion: 0.67
Nodes (1): StarIcon()

### Community 30 - "Location Showcase"
Cohesion: 0.67
Nodes (1): LocationShowcase()

### Community 31 - "Location Overview"
Cohesion: 0.67
Nodes (1): LocationOverview()

### Community 32 - "Location Manage Section"
Cohesion: 0.67
Nodes (1): CheckIcon()

### Community 33 - "Location FAQ"
Cohesion: 0.67
Nodes (1): ChevronIcon()

### Community 34 - "Location Page Wrapper"
Cohesion: 0.67
Nodes (1): LocationPage()

### Community 35 - "Location CTA"
Cohesion: 0.67
Nodes (1): LocationCta()

### Community 36 - "Location Case Studies"
Cohesion: 0.67
Nodes (1): LocationCaseStudies()

## Knowledge Gaps
- **6 isolated node(s):** `Next.js 16 (App Router, Turbopack)`, `TypeScript`, `Tailwind CSS 4`, `Sass`, `Yarn` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Media Migration`** (4 nodes): `down()`, `up()`, `20260427_111031_media_collection.ts`, `20260427_111031_media_collection.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Initial Schema Migration`** (4 nodes): `down()`, `up()`, `20260422_162945_initial_schema.ts`, `20260422_162945_initial_schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Benefits Section`** (4 nodes): `BenefitIcon()`, `HomeBenefits()`, `home-benefits.tsx`, `home-benefits.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Locations Migration`** (4 nodes): `down()`, `up()`, `20260427_122450_locations_collection.ts`, `20260427_122450_locations_collection.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Payload Admin Layout`** (4 nodes): `PayloadLayout()`, `serverFunction()`, `layout.tsx`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root HTML Layout`** (3 nodes): `RootLayout()`, `layout.tsx`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Site Shell Layout`** (3 nodes): `SiteLayout()`, `layout.tsx`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Page Routing`** (3 nodes): `SitePage()`, `page.tsx`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Route Page`** (3 nodes): `HomeRoutePage()`, `page.tsx`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Surface Card UI`** (3 nodes): `surface-card.tsx`, `SurfaceCard()`, `surface-card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Section Heading UI`** (3 nodes): `SectionHeading()`, `section-heading.tsx`, `section-heading.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button UI`** (3 nodes): `Button()`, `button.tsx`, `button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Key Differentiators`** (3 nodes): `HomeKeyDifferentiators()`, `home-key-differentiators.tsx`, `home-key-differentiators.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Business Help`** (3 nodes): `HomeBusinessHelp()`, `home-business-help.tsx`, `home-business-help.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home How It Works`** (3 nodes): `HomeHowItWorks()`, `home-how-it-works.tsx`, `home-how-it-works.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Hero Section`** (3 nodes): `HomeHero()`, `home-hero.tsx`, `home-hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home CTA`** (3 nodes): `HomeCallToAction()`, `home-call-to-action.tsx`, `home-call-to-action.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Site Navigation`** (3 nodes): `updateScrollState()`, `navbar.tsx`, `navbar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Site Footer`** (3 nodes): `Footer()`, `footer.tsx`, `footer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Site Image`** (3 nodes): `SiteImage()`, `site-image.tsx`, `site-image.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Announcement Header`** (3 nodes): `AnnouncementHeader()`, `announcement-header.tsx`, `announcement-header.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shared Case Studies`** (3 nodes): `CaseStudyBackgroundImage()`, `case-studies.tsx`, `case-studies.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Location Hero Section`** (3 nodes): `StarIcon()`, `location-hero.tsx`, `location-hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Location Showcase`** (3 nodes): `LocationShowcase()`, `location-showcase.tsx`, `location-showcase.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Location Overview`** (3 nodes): `LocationOverview()`, `location-overview.tsx`, `location-overview.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Location Manage Section`** (3 nodes): `CheckIcon()`, `location-manage.tsx`, `location-manage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Location FAQ`** (3 nodes): `ChevronIcon()`, `location-faq.tsx`, `location-faq.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Location Page Wrapper`** (3 nodes): `LocationPage()`, `location-page.tsx`, `location-page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Location CTA`** (3 nodes): `LocationCta()`, `location-cta.tsx`, `location-cta.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Location Case Studies`** (3 nodes): `LocationCaseStudies()`, `location-case-studies.tsx`, `location-case-studies.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 12 inferred relationships involving `getLocationPageBySlug()` (e.g. with `generateMetadata()` and `AlabamaRoutePage()`) actually correct?**
  _`getLocationPageBySlug()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Next.js 16 (App Router, Turbopack)`, `TypeScript`, `Tailwind CSS 4` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `State Location Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._