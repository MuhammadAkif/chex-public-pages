# Graph Report - chex-public-pages  (2026-04-29)

## Corpus Check
- 79 files · ~28,651 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 220 nodes · 274 edges · 7 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.66)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 7|Community 7]]

## God Nodes (most connected - your core abstractions)
1. `rebuild_graph()` - 16 edges
2. `getLocationPageBySlug()` - 14 edges
3. `generateMetadata()` - 13 edges
4. `LocationPage()` - 12 edges
5. `main()` - 10 edges
6. `ensureLocalDockerPostgres()` - 8 edges
7. `main()` - 7 edges
8. `parseDatabaseURL()` - 7 edges
9. `rewriteContentImports()` - 6 edges
10. `redactDatabaseURL()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `LocationPage()` --renders--> `AlabamaRoutePage()`  [INFERRED]
  src/app/(site)/components/locations/location-page.tsx → src/app/(site)/locations/alabama/page.tsx
- `LocationPage()` --renders--> `ArizonaRoutePage()`  [INFERRED]
  src/app/(site)/components/locations/location-page.tsx → src/app/(site)/locations/arizona/page.tsx
- `LocationPage()` --renders--> `ArkansasRoutePage()`  [INFERRED]
  src/app/(site)/components/locations/location-page.tsx → src/app/(site)/locations/arkansas/page.tsx
- `LocationPage()` --renders--> `CaliforniaRoutePage()`  [INFERRED]
  src/app/(site)/components/locations/location-page.tsx → src/app/(site)/locations/california/page.tsx
- `LocationPage()` --renders--> `ColoradoRoutePage()`  [INFERRED]
  src/app/(site)/components/locations/location-page.tsx → src/app/(site)/locations/colorado/page.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.1
Nodes (19): LocationPage(), AlabamaRoutePage(), ArizonaRoutePage(), ArkansasRoutePage(), CaliforniaRoutePage(), ColoradoRoutePage(), generateMetadata(), IowaRoutePage() (+11 more)

### Community 1 - "Community 1"
Cohesion: 0.21
Nodes (20): buildDumpCommand(), buildRestoreCommand(), captureCommand(), cliValue(), commandExists(), dockerContainerRunning(), dockerSourceURL(), ensureLocalDockerPostgres() (+12 more)

### Community 2 - "Community 2"
Cohesion: 0.25
Nodes (18): add_edge(), add_node(), build_detection_result(), file_node_id(), find_block(), function_bodies(), gather_files(), import_statements() (+10 more)

### Community 3 - "Community 3"
Cohesion: 0.27
Nodes (11): collectAssetImports(), dedupeAssets(), escapeRegExp(), getContentFiles(), main(), publicURLFor(), removeImportDeclarations(), requiredEnv() (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.28
Nodes (11): buildLocationData(), createMediaFromURL(), findMediaByField(), loadContent(), main(), mediaField(), mediaSourceURL(), resolveMediaID() (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.35
Nodes (10): buildSectionData(), createMediaFromURL(), filenameFromURL(), findMediaByHash(), main(), mediaField(), patchLocationDocuments(), resolveMediaID() (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.5
Nodes (2): Reveal(), useReveal()

## Knowledge Gaps
- **Thin community `Community 7`** (5 nodes): `Reveal()`, `revealClassName()`, `revealStyle()`, `useReveal()`, `reveal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 12 inferred relationships involving `getLocationPageBySlug()` (e.g. with `generateMetadata()` and `AlabamaRoutePage()`) actually correct?**
  _`getLocationPageBySlug()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `LocationPage()` (e.g. with `AlabamaRoutePage()` and `ArizonaRoutePage()`) actually correct?**
  _`LocationPage()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._