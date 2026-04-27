# Graph Report - chex-public-pages  (2026-04-28)

## Corpus Check
- 72 files · ~22,465 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 233 nodes · 315 edges · 14 communities detected
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.8)
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

## God Nodes (most connected - your core abstractions)
1. `Get Location Page By Slug` - 14 edges
2. `HomePage Component` - 13 edges
3. `LocationPage Component` - 12 edges
4. `Location Page Content Contract` - 12 edges
5. `Home Marketing Content` - 11 edges
6. `Locations Collection` - 11 edges
7. `Home Content Section Contract` - 9 edges
8. `Payload Runtime Config` - 8 edges
9. `Locations Table` - 8 edges
10. `CaseStudies Component` - 8 edges

## Surprising Connections (you probably didn't know these)
- `S3 Public URL Generation` --semantically_similar_to--> `Imported Media Public URL`  [INFERRED] [semantically similar]
  payload.config.ts → scripts/import-site-media.ts
- `Payload Postgres Adapter` --references--> `Next Payload PostgreSQL Application Stack`  [EXTRACTED]
  payload.config.ts → README.md
- `Font And Metadata System` --references--> `Next Payload PostgreSQL Application Stack`  [EXTRACTED]
  src/app/layout.tsx → README.md
- `Payload Server Function Bridge` --references--> `Payload Runtime Config`  [EXTRACTED]
  src/app/(payload)/layout.tsx → payload.config.ts
- `Payload Admin Catchall Page` --references--> `Payload Runtime Config`  [EXTRACTED]
  src/app/(payload)/admin/[[...segments]]/page.tsx → payload.config.ts

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

### Community 0 - "Community 0"
Cohesion: 0.1
Nodes (34): CaseStudies Component, Case Study Background Image Resolver, Horizontal Reveal Case Study Gallery, Case Study Optional Caption and Link Rendering, Footer Menus Contact and Social Links, Footer Component, Site Footer Navigation, Home Conversion Panel (+26 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (31): LocationCaseStudies Component, LocationCta Component, Location FAQ Accessible Panel IDs, Location FAQ Accordion State, Location FAQ Chevron Icon, LocationFaq Component, LocationHero Component, Location Hero Orbit Map (+23 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (30): Authenticated or Published Read Access, Class Name Override Pattern, Location Draft Versions, Location FAQ and CTA Content Groups, Location Hero Content Group, Locations Collection, Location Manage Case Studies and Testimonials Groups, Location SEO Metadata Group (+22 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (27): Font And Metadata System, Root App Layout, Generated Artifact Ignores, Repository ESLint Config, Type Checked TypeScript Rules, Payload Admin Metadata Generation, Payload Admin Catchall Page, Payload REST Route Handlers (+19 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (26): Draft Published Post Status, Initial Payload Schema Migration, Payload Locked Documents Relations Table, Payload Migrations Table, Posts Table, Posts Versions Table, Idempotent Media Schema Guards, Media Deduplication Indexes (+18 more)

### Community 5 - "Community 5"
Cohesion: 0.1
Nodes (23): Content Asset Import Rewrite To URLs, Source Hash Prevents Duplicate Uploads Rationale, Asset Hash Deduplication, Payload Media Upload Or Reuse, Site Media Import Pipeline, Imported Media Public URL, Next Application Config, Payload Next Wrapper (+15 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (17): Button Component, Button Variant System, Focus Visible Accessibility, Polymorphic Href Button Behavior, AI Damage Findings Workflow, AI Vehicle Inspection Value Proposition, Benefits and Differentiators, Case Study Metrics (+9 more)

### Community 7 - "Community 7"
Cohesion: 0.16
Nodes (14): Graphify Report JSON HTML Exports, Repo Aware Graphify Pipeline, Route Content To Component Mapping, Repo Aware Semantic Augmentation, AST Plus Repo Aware Augmentation Rationale, Benefit Surface Card Grid, Benefit Icon Switch, Home Benefits Section (+6 more)

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (11): Location Media Fields Pattern, Migration Fallback URL Pattern, Media Alternative Text, Media Collection, Media Import Deduplication, Media Upload Policy, Default Showcase Video, Media Fallback Resolution (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.38
Nodes (7): Payload Preferences Relations Table, Users Sessions Table, Users Table, Email Admin Title, Required Name Text Field, Payload Auth Collection, Users Collection

### Community 10 - "Community 10"
Cohesion: 0.47
Nodes (6): Intersection Observer Reveal Trigger, Motion Reveal Dataset Contract, Reduced Motion Reveal Fallback, Reveal Article Component, Reveal Component, useReveal Hook

### Community 11 - "Community 11"
Cohesion: 0.67
Nodes (3): Admin Import Map Module, Payload Import Map Declarations, Root Import Map Module

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (2): SectionHeading Component, Theme and Alignment Controls

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (2): AnnouncementHeader Component, Site Announcement Message Bar

## Knowledge Gaps
- **63 isolated node(s):** `Do Not Edit Generated Next Env Rationale`, `PostCSS Tailwind Pipeline`, `Type Checked TypeScript Rules`, `Payload Next Wrapper`, `Content Asset Import Rewrite To URLs` (+58 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 12`** (2 nodes): `SectionHeading Component`, `Theme and Alignment Controls`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `AnnouncementHeader Component`, `Site Announcement Message Bar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Location Page Content Contract` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `Home Marketing Content` connect `Community 6` to `Community 8`, `Community 2`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Location Page Payload Adapter` connect `Community 2` to `Community 6`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Home Marketing Content` (e.g. with `Home Metadata` and `SiteImage Component`) actually correct?**
  _`Home Marketing Content` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Do Not Edit Generated Next Env Rationale`, `PostCSS Tailwind Pipeline`, `Type Checked TypeScript Rules` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._