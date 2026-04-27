# Graph Report - .  (2026-04-27)

## Corpus Check
- Corpus is ~22,465 words - fits in a single context window. You may not need a graph.

## Summary
- 409 nodes · 502 edges · 17 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Repository Tooling|Repository Tooling]]
- [[_COMMUNITY_Location CMS Model|Location CMS Model]]
- [[_COMMUNITY_Shared Marketing Sections|Shared Marketing Sections]]
- [[_COMMUNITY_Payload Database Migrations|Payload Database Migrations]]
- [[_COMMUNITY_State Location Routes|State Location Routes]]
- [[_COMMUNITY_Location Page UI|Location Page UI]]
- [[_COMMUNITY_Home Marketing Model|Home Marketing Model]]
- [[_COMMUNITY_Graphify Builder Script|Graphify Builder Script]]
- [[_COMMUNITY_Media Import Script|Media Import Script]]
- [[_COMMUNITY_Graphify Documentation|Graphify Documentation]]
- [[_COMMUNITY_Location Seed Script|Location Seed Script]]
- [[_COMMUNITY_App Configuration|App Configuration]]
- [[_COMMUNITY_Reveal Accessibility|Reveal Accessibility]]
- [[_COMMUNITY_Reveal Utilities|Reveal Utilities]]
- [[_COMMUNITY_Payload Import Map|Payload Import Map]]
- [[_COMMUNITY_Announcement Message Bar|Announcement Message Bar]]
- [[_COMMUNITY_Section Heading Controls|Section Heading Controls]]

## God Nodes (most connected - your core abstractions)
1. `rebuild_graph()` - 16 edges
2. `getLocationPageBySlug()` - 14 edges
3. `Get Location Page By Slug` - 14 edges
4. `generateMetadata()` - 13 edges
5. `HomePage Component` - 13 edges
6. `LocationPage Component` - 12 edges
7. `Location Page Content Contract` - 12 edges
8. `Home Marketing Content` - 11 edges
9. `Locations Collection` - 11 edges
10. `Home Content Section Contract` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Imported Media Public URL` --semantically_similar_to--> `S3 Public URL Generation`  [INFERRED] [semantically similar]
  scripts/import-site-media.ts → payload.config.ts
- `Payload Postgres Adapter` --references--> `Next Payload PostgreSQL Application Stack`  [EXTRACTED]
  payload.config.ts → README.md
- `Font And Metadata System` --references--> `Next Payload PostgreSQL Application Stack`  [EXTRACTED]
  src/app/layout.tsx → README.md
- `Media Fallback Resolution` --semantically_similar_to--> `String Image Source Fallback`  [INFERRED] [semantically similar]
  src/app/(site)/locations/payload.ts → src/app/(site)/components/shared/site-image.tsx
- `Footer()` --implements--> `Footer Menus Contact and Social Links`  [EXTRACTED]
  /Users/apple/Desktop/Techling/Chex/chex-public-pages/src/app/(site)/components/shared/footer.tsx → src/app/(site)/components/shared/footer.tsx

## Hyperedges (group relationships)
- **Payload Runtime Surface** — payload_config_runtime, payload_layout_shell, payload_admin_page, payload_api_routes, payload_import_map_typed_bridge [INFERRED 0.86]
- **Media Storage And Migration Flow** — payload_config_s3_storage, import_media_hash_deduplication, import_media_payload_upload, payload_types_media_model, seed_locations_media_resolution, seed_locations_media_fallback_fields [INFERRED 0.88]
- **Site Shell Composition** — site_content_single_source, site_layout_shell, site_sticky_header_and_footer, site_root_home_redirect [EXTRACTED 1.00]
- **Home Page Content Driven Landing Flow** — home_page_home_page, home_page_home_content_contract, home_hero_home_hero, home_community_home_community, home_how_it_works_home_how_it_works, home_key_differentiators_home_key_differentiators, case_studies_case_studies, home_testimonials_home_testimonials, home_call_to_action_home_call_to_action [EXTRACTED 1.00]
- **Location Page Content Driven City Landing Flow** — location_page_location_page, location_page_content_contract, location_hero_location_hero, location_overview_location_overview, location_services_location_services, location_showcase_location_showcase, location_regions_location_regions, location_manage_location_manage, location_case_studies_location_case_studies, location_testimonials_location_testimonials, location_faq_location_faq, location_cta_location_cta [EXTRACTED 1.00]
- **Reusable Social Proof Surfaces** — home_community_trusted_logo_cloud, home_testimonials_featured_secondary_layout, location_testimonials_featured_secondary_layout, case_studies_horizontal_reveal_gallery [INFERRED 0.82]
- **State Location Route Contract** — route_AlabamaLocationRoute, route_ArizonaLocationRoute, route_ArkansasLocationRoute, route_CaliforniaLocationRoute, route_ColoradoLocationRoute, route_IowaLocationRoute, route_NebraskaLocationRoute, route_NevadaLocationRoute, route_NewMexicoLocationRoute, route_OhioLocationRoute, route_SouthCarolinaLocationRoute, payload_GetLocationPageBySlug, payload_ToLocationPageContent [EXTRACTED 1.00]
- **Payload CMS Location Content Contract** — locations_LocationsCollection, locations_MediaFieldsPattern, locations_MigrationFallbackURLPattern, media_MediaCollection, payload_LocationPagePayloadAdapter, payload_MediaFallbackResolution [EXTRACTED 1.00]
- **Home Marketing Conversion Model** — content_HomeMarketingContent, content_AIVehicleInspectionValueProp, content_GuidedEvidenceCaptureFlow, content_PartnerDashboardAnalytics, content_AIDamageFindingsWorkflow, content_BenefitsAndDifferentiators, content_CaseStudyMetrics, content_ClientTestimonials, content_HomeConversionCTA [EXTRACTED 1.00]
- **Payload Versioned Publication Pattern** — 20260422_162945_initial_schema_posts_table, 20260422_162945_initial_schema_posts_versions_table, 20260422_162945_initial_schema_draft_published_post_status, 20260427_122450_locations_collection_locations_table, 20260427_122450_locations_collection_locations_version_tables, 20260427_122450_locations_collection_locations_status_enums [INFERRED 0.88]
- **Media Backed Locations Content** — 20260427_111031_media_collection_media_table, 20260427_122450_locations_collection_locations_table, 20260427_122450_locations_collection_locations_section_child_tables, 20260427_122450_locations_collection_locations_media_fields [EXTRACTED 1.00]
- **Payload Locked Document Relation Targets** — 20260422_162945_initial_schema_payload_locked_documents_rels, 20260422_162945_initial_schema_users_table, 20260422_162945_initial_schema_posts_table, 20260427_111031_media_collection_media_table, 20260427_122450_locations_collection_locations_table [INFERRED 0.85]

## Communities

### Community 0 - "Repository Tooling"
Cohesion: 0.06
Nodes (40): Generated Artifact Ignores, Repository ESLint Config, Type Checked TypeScript Rules, Content Asset Import Rewrite To URLs, Source Hash Prevents Duplicate Uploads Rationale, Asset Hash Deduplication, Payload Media Upload Or Reuse, Site Media Import Pipeline (+32 more)

### Community 1 - "Location CMS Model"
Cohesion: 0.06
Nodes (38): Authenticated or Published Read Access, Class Name Override Pattern, Location Draft Versions, Location FAQ and CTA Content Groups, Location Hero Content Group, Locations Collection, Location Manage Case Studies and Testimonials Groups, Location Media Fields Pattern (+30 more)

### Community 2 - "Shared Marketing Sections"
Cohesion: 0.09
Nodes (34): CaseStudies Component, Case Study Background Image Resolver, Horizontal Reveal Case Study Gallery, Case Study Optional Caption and Link Rendering, Footer Menus Contact and Social Links, Footer(), Site Footer Navigation, Home Conversion Panel (+26 more)

### Community 3 - "Payload Database Migrations"
Cohesion: 0.09
Nodes (33): Draft Published Post Status, Initial Payload Schema Migration, Payload Locked Documents Relations Table, Payload Migrations Table, Payload Preferences Relations Table, Posts Table, Posts Versions Table, Users Sessions Table (+25 more)

### Community 4 - "State Location Routes"
Cohesion: 0.1
Nodes (18): AlabamaRoutePage(), ArizonaRoutePage(), ArkansasRoutePage(), CaliforniaRoutePage(), ColoradoRoutePage(), generateMetadata(), IowaRoutePage(), NebraskaRoutePage() (+10 more)

### Community 5 - "Location Page UI"
Cohesion: 0.11
Nodes (31): LocationCaseStudies Component, LocationCta Component, Location FAQ Accessible Panel IDs, Location FAQ Accordion State, Location FAQ Chevron Icon, LocationFaq Component, LocationHero Component, Location Hero Orbit Map (+23 more)

### Community 6 - "Home Marketing Model"
Cohesion: 0.13
Nodes (20): Button Component, Button Variant System, Focus Visible Accessibility, Polymorphic Href Button Behavior, AI Damage Findings Workflow, AI Vehicle Inspection Value Proposition, Benefits and Differentiators, Case Study Metrics (+12 more)

### Community 7 - "Graphify Builder Script"
Cohesion: 0.25
Nodes (18): add_edge(), add_node(), build_detection_result(), file_node_id(), find_block(), function_bodies(), gather_files(), import_statements() (+10 more)

### Community 8 - "Media Import Script"
Cohesion: 0.27
Nodes (11): collectAssetImports(), dedupeAssets(), escapeRegExp(), getContentFiles(), main(), publicURLFor(), removeImportDeclarations(), requiredEnv() (+3 more)

### Community 9 - "Graphify Documentation"
Cohesion: 0.16
Nodes (14): Graphify Report JSON HTML Exports, Repo Aware Graphify Pipeline, Route Content To Component Mapping, Repo Aware Semantic Augmentation, AST Plus Repo Aware Augmentation Rationale, Benefit Surface Card Grid, Benefit Icon Switch, Home Benefits Section (+6 more)

### Community 10 - "Location Seed Script"
Cohesion: 0.28
Nodes (11): buildLocationData(), createMediaFromURL(), findMediaByField(), loadContent(), main(), mediaField(), mediaSourceURL(), resolveMediaID() (+3 more)

### Community 11 - "App Configuration"
Cohesion: 0.2
Nodes (10): Font And Metadata System, Root App Layout, Payload Postgres Adapter, PostCSS Tailwind Pipeline, Next Payload PostgreSQL Application Stack, Chex Public Pages, Docker Defaults Work Out Of The Box Rationale, Environment Variable Contract (+2 more)

### Community 13 - "Reveal Accessibility"
Cohesion: 0.47
Nodes (6): Intersection Observer Reveal Trigger, Motion Reveal Dataset Contract, Reduced Motion Reveal Fallback, Reveal Article Component, Reveal Component, useReveal Hook

### Community 14 - "Reveal Utilities"
Cohesion: 0.5
Nodes (2): Reveal(), useReveal()

### Community 20 - "Payload Import Map"
Cohesion: 0.67
Nodes (3): Admin Import Map Module, Payload Import Map Declarations, Root Import Map Module

### Community 45 - "Announcement Message Bar"
Cohesion: 1.0
Nodes (2): AnnouncementHeader Component, Site Announcement Message Bar

### Community 46 - "Section Heading Controls"
Cohesion: 1.0
Nodes (2): SectionHeading Component, Theme and Alignment Controls

## Knowledge Gaps
- **63 isolated node(s):** `Chex Public Pages`, `Docker Defaults Work Out Of The Box Rationale`, `Type Checked TypeScript Rules`, `Do Not Edit Generated Next Env Rationale`, `Payload Next Wrapper` (+58 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Reveal Utilities`** (5 nodes): `Reveal()`, `revealClassName()`, `revealStyle()`, `useReveal()`, `reveal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Announcement Message Bar`** (2 nodes): `AnnouncementHeader Component`, `Site Announcement Message Bar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Section Heading Controls`** (2 nodes): `SectionHeading Component`, `Theme and Alignment Controls`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Location Page Content Contract` connect `Location Page UI` to `Shared Marketing Sections`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `Home Marketing Content` connect `Home Marketing Model` to `Location CMS Model`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Location Page Payload Adapter` connect `Location CMS Model` to `Home Marketing Model`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `getLocationPageBySlug()` (e.g. with `generateMetadata()` and `AlabamaRoutePage()`) actually correct?**
  _`getLocationPageBySlug()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Chex Public Pages`, `Docker Defaults Work Out Of The Box Rationale`, `Type Checked TypeScript Rules` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Repository Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Location CMS Model` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._