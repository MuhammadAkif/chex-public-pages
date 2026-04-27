# Agent Instructions

## Graphify

This repository uses graphify as a persistent knowledge graph for codebase navigation.

Graph outputs live in `graphify-out/`:

- `graphify-out/GRAPH_REPORT.md` is the human-readable architecture report.
- `graphify-out/graph.json` is the GraphRAG-ready graph data.
- `graphify-out/graph.html` is the interactive browser visualization.

Before answering architecture, dependency, cross-module, or "how does X relate to Y" questions, consult `graphify-out/GRAPH_REPORT.md` first. Use the God Nodes, Community Hubs, Surprising Connections, and Suggested Questions sections to orient the investigation before reading raw source files.

For graph traversal questions, prefer the graphify workflow over broad text search:

- `/graphify query "<question>"` for broad neighborhood context.
- `/graphify path "<A>" "<B>"` for shortest paths between concepts.
- `/graphify explain "<concept>"` for one node and its direct relationships.

Use source files to verify behavior before making code changes. Graph edges are audit-tagged:

- `EXTRACTED` means the relationship was explicit in source.
- `INFERRED` means the relationship is model-reasoned and should be checked.
- `AMBIGUOUS` means the relationship is uncertain.

After modifying code, keep the graph current with `/graphify . --update`. If the graph is missing, stale, or structurally wrong, run `/graphify .` to rebuild it.

Do not add secrets, build outputs, dependency folders, or generated graph artifacts to the corpus. `.graphifyignore` already excludes `.env`, build output, `node_modules/`, `graphify-out/`, and assistant configuration files.

## Project Notes

This is a Next.js and Payload CMS public pages project. The current graph highlights these major areas:

- App and Payload configuration.
- Home marketing page content and reusable sections.
- Location CMS model, state routes, and location page UI.
- Payload database migrations.
- Media import and location seed scripts.

When changing the site, prefer existing component and content patterns under `src/app/(site)/` and the Payload collection contracts under `src/collections/`.
