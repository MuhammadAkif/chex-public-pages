# Project: chex-public-pages

This is a Next.js and Payload CMS public pages project.

## Architecture

- App routes and UI live under `src/app/(site)/`.
- Payload collections and config are under `src/collections/` and `payload.config.ts`.
- Content is managed via Payload CMS (not local `content.ts` files).

## Graphify

This repository uses graphify as a persistent knowledge graph for codebase navigation.

Graph outputs live in `graphify-out/`:

- `graphify-out/GRAPH_REPORT.md` — human-readable architecture report
- `graphify-out/graph.json` — GraphRAG-ready graph data
- `graphify-out/graph.html` — interactive browser visualization

Before answering architecture, dependency, cross-module, or "how does X relate to Y" questions, consult `graphify-out/GRAPH_REPORT.md` first.

After modifying code, keep the graph current with `/graphify . --update`. If the graph is missing or stale, run `/graphify .` to rebuild it.

## Key Conventions

- Prefer existing component and content patterns under `src/app/(site)/`.
- Follow Payload collection contracts under `src/collections/`.
- Do not commit secrets, `node_modules/`, build outputs, or `graphify-out/` artifacts.
