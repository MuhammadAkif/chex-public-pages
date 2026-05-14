# Graph Report - chex-public-pages  (2026-05-14)

## Corpus Check
- 99 files · ~43,412 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 294 nodes · 342 edges · 11 communities detected
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.67)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]

## God Nodes (most connected - your core abstractions)
1. `rebuild_graph()` - 16 edges
2. `generateMetadata()` - 14 edges
3. `getLocationPageBySlug()` - 14 edges
4. `LocationPage()` - 12 edges
5. `main()` - 10 edges
6. `ensureLocalDockerPostgres()` - 8 edges
7. `main()` - 7 edges
8. `parseDatabaseURL()` - 7 edges
9. `rewriteContentImports()` - 6 edges
10. `redactDatabaseURL()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `getLocationPageBySlug()` --uses_symbol--> `generateMetadata()`  [INFERRED]
  src/app/(site)/locations/payload.ts → src/app/(payload)/admin/[[...segments]]/page.tsx
- `HomeCallToAction()` --calls--> `useRegisterModal()`  [INFERRED]
  src/app/(site)/components/home/home-call-to-action.tsx → src/app/(site)/components/home/register-modal.tsx
- `handleSubmit()` --calls--> `submitContactUs()`  [INFERRED]
  src/app/(site)/contact-us/page.tsx → src/app/(site)/components/shared/auth-client.ts
- `LocationPage()` --renders--> `AlabamaRoutePage()`  [INFERRED]
  src/app/(site)/components/locations/location-page.tsx → src/app/(site)/locations/alabama/page.tsx
- `LocationPage()` --renders--> `ArizonaRoutePage()`  [INFERRED]
  src/app/(site)/components/locations/location-page.tsx → src/app/(site)/locations/arizona/page.tsx

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

### Community 6 - "Community 6"
Cohesion: 0.31
Nodes (9): getErrorMessage(), loginAndPersist(), persistAuthToken(), pickStringFromField(), postJSON(), requiredApiBase(), signupThenLogin(), submitContactUs() (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (2): HomeCallToAction(), useRegisterModal()

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (2): Reveal(), useReveal()

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (3): buildRows(), main(), patchViaSql()

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (1): formatDate()

## Knowledge Gaps
- **Thin community `Community 9`** (6 nodes): `HomeCallToAction()`, `handler()`, `onKey()`, `useRegisterModal()`, `home-call-to-action.tsx`, `register-modal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (5 nodes): `Reveal()`, `revealClassName()`, `revealStyle()`, `useReveal()`, `reveal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (4 nodes): `formatDate()`, `renderNode()`, `page.tsx`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `generateMetadata()` connect `Community 0` to `Community 13`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `getLocationPageBySlug()` (e.g. with `generateMetadata()` and `AlabamaRoutePage()`) actually correct?**
  _`getLocationPageBySlug()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `LocationPage()` (e.g. with `AlabamaRoutePage()` and `ArizonaRoutePage()`) actually correct?**
  _`LocationPage()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._