# Graph Report - chex-public-pages  (2026-04-28)

## Corpus Check
- 72 files · ~22,465 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 189 nodes · 203 edges · 6 communities detected
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 6|Community 6]]

## God Nodes (most connected - your core abstractions)
1. `rebuild_graph()` - 16 edges
2. `getLocationPageBySlug()` - 14 edges
3. `generateMetadata()` - 13 edges
4. `Chex Public Pages` - 11 edges
5. `main()` - 7 edges
6. `rewriteContentImports()` - 6 edges
7. `toLocationPageContent()` - 6 edges
8. `relative_path()` - 5 edges
9. `file_node_id()` - 5 edges
10. `symbol_node_id()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `getLocationPageBySlug()` --calls--> `AlabamaRoutePage()`  [INFERRED]
  src/app/(site)/locations/payload.ts → src/app/(site)/locations/alabama/page.tsx
- `getLocationPageBySlug()` --calls--> `NewMexicoRoutePage()`  [INFERRED]
  src/app/(site)/locations/payload.ts → src/app/(site)/locations/new-mexico/page.tsx
- `getLocationPageBySlug()` --calls--> `ColoradoRoutePage()`  [INFERRED]
  src/app/(site)/locations/payload.ts → src/app/(site)/locations/colorado/page.tsx
- `getLocationPageBySlug()` --calls--> `OhioRoutePage()`  [INFERRED]
  src/app/(site)/locations/payload.ts → src/app/(site)/locations/ohio/page.tsx
- `getLocationPageBySlug()` --calls--> `ArkansasRoutePage()`  [INFERRED]
  src/app/(site)/locations/payload.ts → src/app/(site)/locations/arkansas/page.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.1
Nodes (18): AlabamaRoutePage(), ArizonaRoutePage(), ArkansasRoutePage(), CaliforniaRoutePage(), ColoradoRoutePage(), generateMetadata(), IowaRoutePage(), NebraskaRoutePage() (+10 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (18): add_edge(), add_node(), build_detection_result(), file_node_id(), find_block(), function_bodies(), gather_files(), import_statements() (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.27
Nodes (11): collectAssetImports(), dedupeAssets(), escapeRegExp(), getContentFiles(), main(), publicURLFor(), removeImportDeclarations(), requiredEnv() (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.28
Nodes (11): buildLocationData(), createMediaFromURL(), findMediaByField(), loadContent(), main(), mediaField(), mediaSourceURL(), resolveMediaID() (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.24
Nodes (12): Chex Public Pages, Docker, Environment Variables, Next.js 16 (App Router, Turbopack), Node.js >= 20.9.0, Payload CMS 3, PostgreSQL 17, Sass (+4 more)

### Community 6 - "Community 6"
Cohesion: 0.5
Nodes (2): Reveal(), useReveal()

## Knowledge Gaps
- **6 isolated node(s):** `Next.js 16 (App Router, Turbopack)`, `TypeScript`, `Tailwind CSS 4`, `Sass`, `Yarn` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 6`** (5 nodes): `Reveal()`, `revealClassName()`, `revealStyle()`, `useReveal()`, `reveal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 12 inferred relationships involving `getLocationPageBySlug()` (e.g. with `generateMetadata()` and `AlabamaRoutePage()`) actually correct?**
  _`getLocationPageBySlug()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Next.js 16 (App Router, Turbopack)`, `TypeScript`, `Tailwind CSS 4` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._