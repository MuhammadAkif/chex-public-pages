# Graph Report - chex-public-pages  (2026-04-28)

## Corpus Check
- 75 files · ~3,072,913 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 142 nodes · 107 edges · 3 communities detected
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]

## God Nodes (most connected - your core abstractions)
1. `rebuild_graph()` - 16 edges
2. `LocationPage()` - 12 edges
3. `relative_path()` - 5 edges
4. `file_node_id()` - 5 edges
5. `symbol_node_id()` - 4 edges
6. `line_number()` - 4 edges
7. `function_bodies()` - 4 edges
8. `build_detection_result()` - 4 edges
9. `slugify()` - 3 edges
10. `read_text()` - 3 edges

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
Cohesion: 0.08
Nodes (12): LocationPage(), AlabamaRoutePage(), ArizonaRoutePage(), ArkansasRoutePage(), CaliforniaRoutePage(), ColoradoRoutePage(), IowaRoutePage(), NebraskaRoutePage() (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (18): add_edge(), add_node(), build_detection_result(), file_node_id(), find_block(), function_bodies(), gather_files(), import_statements() (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.5
Nodes (2): Reveal(), useReveal()

## Knowledge Gaps
- **Thin community `Community 2`** (5 nodes): `Reveal()`, `revealClassName()`, `revealStyle()`, `useReveal()`, `reveal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 11 inferred relationships involving `LocationPage()` (e.g. with `AlabamaRoutePage()` and `ArizonaRoutePage()`) actually correct?**
  _`LocationPage()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._