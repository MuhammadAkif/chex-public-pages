#!/usr/bin/env python3

from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

from graphify.analyze import god_nodes, suggest_questions, surprising_connections
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.export import to_html, to_json
from graphify.extract import extract
from graphify.report import generate

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "graphify-out"
CODE_EXTENSIONS = {".ts", ".tsx", ".js", ".mjs", ".css", ".md"}
ROOT_FILES = (
    "README.md",
    "payload.config.ts",
    "next.config.ts",
    "tailwind.config.ts",
    "eslint.config.mjs",
    "postcss.config.js",
    "tsconfig.json",
)
EXCLUDED_RELATIVE_PATHS = {
    "src/payload-types.ts",
    "src/app/(payload)/admin/importMap.ts",
    "src/app/(payload)/admin/importMap.js",
}
LOCATION_SECTION_COMPONENTS = {
    "hero": "LocationHero",
    "overview": "LocationOverview",
    "services": "LocationServices",
    "showcase": "LocationShowcase",
    "regions": "LocationRegions",
    "manage": "LocationManage",
    "caseStudies": "LocationCaseStudies",
    "testimonials": "LocationTestimonials",
    "faq": "LocationFaq",
    "cta": "LocationCta",
}
HOME_SECTION_COMPONENTS = {
    "hero": "HomeHero",
    "community": "HomeCommunity",
    "howItWorks": "HomeHowItWorks",
    "benefits": "HomeBenefits",
    "keyDifferentiators": "HomeKeyDifferentiators",
    "businessHelp": "HomeBusinessHelp",
    "testimonials": "HomeTestimonials",
    "cta": "HomeCallToAction",
}
SYMBOL_EDGE_CONFIDENCE = "INFERRED"
WORD_RE = re.compile(r"\b\w+\b", re.UNICODE)
EXPORT_CONST_RE = re.compile(r"^\s*export\s+const\s+([A-Za-z_]\w*)\s*=", re.MULTILINE)
FUNCTION_RE = re.compile(r"(?:export\s+default\s+|export\s+)?function\s+([A-Za-z_]\w*)\s*\(")
ARROW_FUNCTION_RE = re.compile(
    r"(?:export\s+)?const\s+([A-Za-z_]\w*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>"
)


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", value.lower()).strip("_")


def relative_path(path: Path) -> str:
    return path.resolve().relative_to(ROOT).as_posix()


def file_node_id(path: Path) -> str:
    return slugify(relative_path(path))


def symbol_node_id(path: Path, symbol_name: str) -> str:
    return f"{file_node_id(path)}_{slugify(symbol_name)}"


def normalize_symbol(symbol_name: str) -> str:
    return symbol_name.replace("()", "").strip()


def line_number(text: str, index: int) -> int:
    return text.count("\n", 0, index) + 1


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def gather_files() -> list[Path]:
    files: list[Path] = []

    for relative in ROOT_FILES:
        path = ROOT / relative
        if path.exists():
            files.append(path)

    for path in sorted((ROOT / "src").rglob("*")):
        if not path.is_file():
            continue

        rel = relative_path(path)
        if rel in EXCLUDED_RELATIVE_PATHS:
            continue

        if path.suffix in CODE_EXTENSIONS:
            files.append(path)

    deduped: list[Path] = []
    seen: set[Path] = set()
    for path in files:
        resolved = path.resolve()
        if resolved in seen:
            continue
        seen.add(resolved)
        deduped.append(resolved)

    return deduped


def import_statements(text: str) -> list[tuple[str, int]]:
    statements: list[tuple[str, int]] = []

    for match in re.finditer(
        r"^\s*import\s+(?:[\s\S]*?)\s+from\s+['\"][^'\"]+['\"]",
        text,
        re.MULTILINE,
    ):
        statements.append((match.group(0), line_number(text, match.start())))

    for match in re.finditer(r"^\s*import\s+['\"][^'\"]+['\"]", text, re.MULTILINE):
        statements.append((match.group(0), line_number(text, match.start())))

    statements.sort(key=lambda item: item[1])
    return statements


def parse_import_clause(clause: str) -> list[tuple[str, str]]:
    clause = clause.strip()
    if clause.startswith("type "):
        clause = clause[5:].strip()

    symbols: list[tuple[str, str]] = []

    if clause.startswith("* as "):
        namespace = clause[len("* as ") :].strip()
        if namespace:
            symbols.append((namespace, namespace))
        return symbols

    default_part = ""
    named_part = ""

    if "{" in clause and "}" in clause:
        before, after = clause.split("{", 1)
        default_part = before.strip().rstrip(",")
        named_part = after.split("}", 1)[0]
    elif clause.startswith("{"):
        named_part = clause[1:].split("}", 1)[0]
    else:
        default_part = clause

    if default_part:
        symbols.append((default_part.strip(), default_part.strip()))

    if named_part:
        for item in named_part.split(","):
            piece = item.strip()
            if not piece:
                continue
            piece = re.sub(r"^type\s+", "", piece)
            if " as " in piece:
                imported_name, local_name = [part.strip() for part in piece.split(" as ", 1)]
            else:
                imported_name = piece
                local_name = piece
            symbols.append((local_name, imported_name))

    return [(local, imported) for local, imported in symbols if local]


def resolve_internal_import(source_path: Path, specifier: str) -> Path | None:
    if specifier.startswith("@/"):
        base = ROOT / "src" / specifier[2:]
    elif specifier.startswith("."):
        base = source_path.parent / specifier
    else:
        return None

    if base.suffix:
        candidate_paths = [base]
    else:
        candidate_paths = [base.with_suffix(ext) for ext in (".ts", ".tsx", ".js", ".mjs", ".md", ".css")]
        candidate_paths.extend(
            [
                base / "index.ts",
                base / "index.tsx",
                base / "index.js",
                base / "index.mjs",
            ]
        )

    for candidate in candidate_paths:
        if candidate.exists() and candidate.is_file():
            return candidate.resolve()

    return None


def find_block(text: str, brace_index: int) -> str:
    depth = 0
    block_start = brace_index + 1

    for index in range(brace_index, len(text)):
        character = text[index]
        if character == "{":
            depth += 1
        elif character == "}":
            depth -= 1
            if depth == 0:
                return text[block_start:index]

    return ""


def function_bodies(text: str) -> list[tuple[str, str, int]]:
    results: list[tuple[str, str, int]] = []

    for pattern in (FUNCTION_RE, ARROW_FUNCTION_RE):
        for match in pattern.finditer(text):
            name = match.group(1)
            open_brace = text.find("{", match.end())
            if open_brace == -1:
                continue
            body = find_block(text, open_brace)
            if not body:
                continue
            results.append((name, body, line_number(text, match.start())))

    return results


def add_node(
    extraction: dict,
    node_lookup: dict[str, dict],
    *,
    node_id: str,
    label: str,
    source_file: Path,
    source_location: str,
) -> None:
    if node_id in node_lookup:
        return

    node = {
        "id": node_id,
        "label": label,
        "file_type": "code",
        "source_file": str(source_file.resolve()),
        "source_location": source_location,
    }
    extraction["nodes"].append(node)
    node_lookup[node_id] = node


def add_edge(
    extraction: dict,
    edge_lookup: set[tuple[str, str, str]],
    *,
    source: str,
    target: str,
    relation: str,
    confidence: str,
    source_file: Path,
    source_location: str,
) -> None:
    key = (source, target, relation)
    if key in edge_lookup:
        return

    edge_lookup.add(key)
    extraction["edges"].append(
        {
            "source": source,
            "target": target,
            "relation": relation,
            "confidence": confidence,
            "source_file": str(source_file.resolve()),
            "source_location": source_location,
            "weight": 1.0,
        }
    )


def build_detection_result(files: list[Path]) -> dict:
    code_files = [relative_path(path) for path in files if path.suffix in {".ts", ".tsx", ".js", ".mjs"}]
    document_files = [relative_path(path) for path in files if path.suffix in {".md", ".css"}]
    total_words = sum(len(WORD_RE.findall(read_text(path))) for path in files)

    return {
        "total_files": len(files),
        "total_words": total_words,
        "files": {
            "code": code_files,
            "document": document_files,
            "paper": [],
            "image": [],
            "video": [],
        },
        "skipped_sensitive": [],
        "warning": "Graphify build uses AST extraction plus repo-aware semantic augmentation for routes, content modules, and shared component composition.",
    }


def rebuild_graph() -> dict:
    files = gather_files()
    detection_result = build_detection_result(files)
    extraction = extract(files, cache_root=ROOT)

    node_lookup = {node["id"]: node for node in extraction["nodes"]}
    edge_lookup = {(edge["source"], edge["target"], edge["relation"]) for edge in extraction["edges"]}

    file_nodes: dict[Path, str] = {}
    symbols_by_file: dict[Path, dict[str, str]] = defaultdict(dict)
    symbols_by_name: dict[str, list[str]] = defaultdict(list)

    for node in extraction["nodes"]:
        source = node.get("source_file")
        if not source:
            continue

        source_path = Path(source).resolve()
        if node["id"] == file_node_id(source_path):
            node["label"] = relative_path(source_path)
            file_nodes[source_path] = node["id"]
            continue

        symbol_name = normalize_symbol(node["label"])
        symbols_by_file[source_path][symbol_name] = node["id"]
        symbols_by_name[symbol_name].append(node["id"])

    file_text: dict[Path, str] = {path: read_text(path) for path in files}

    for path, text in file_text.items():
        file_id = file_nodes.get(path)
        if not file_id:
            continue

        for match in EXPORT_CONST_RE.finditer(text):
            symbol_name = match.group(1)
            symbol_id = symbol_node_id(path, symbol_name)
            add_node(
                extraction,
                node_lookup,
                node_id=symbol_id,
                label=symbol_name,
                source_file=path,
                source_location=f"L{line_number(text, match.start())}",
            )
            add_edge(
                extraction,
                edge_lookup,
                source=file_id,
                target=symbol_id,
                relation="contains",
                confidence="EXTRACTED",
                source_file=path,
                source_location=f"L{line_number(text, match.start())}",
            )
            symbols_by_file[path][symbol_name] = symbol_id
            symbols_by_name[symbol_name].append(symbol_id)

    for path, text in file_text.items():
        source_file_id = file_nodes.get(path)
        if not source_file_id:
            continue

        import_bindings: dict[str, tuple[Path, str]] = {}

        for statement, statement_line in import_statements(text):
            side_effect_match = re.match(r"^\s*import\s+['\"]([^'\"]+)['\"]", statement, re.DOTALL)
            if side_effect_match:
                continue

            match = re.match(
                r"^\s*import\s+(.*?)\s+from\s+['\"]([^'\"]+)['\"]",
                statement,
                re.DOTALL,
            )
            if not match:
                continue

            clause, specifier = match.groups()
            resolved = resolve_internal_import(path, specifier)
            if not resolved:
                continue

            target_file_id = file_nodes.get(resolved)
            if target_file_id:
                add_edge(
                    extraction,
                    edge_lookup,
                    source=source_file_id,
                    target=target_file_id,
                    relation="imports_internal",
                    confidence="EXTRACTED",
                    source_file=path,
                    source_location=f"L{statement_line}",
                )

            for local_name, imported_name in parse_import_clause(clause):
                import_bindings[local_name] = (resolved, imported_name)

        for function_name, body, start_line in function_bodies(text):
            source_symbol_id = symbols_by_file[path].get(function_name)
            if not source_symbol_id:
                continue

            for local_name, (target_path, imported_name) in import_bindings.items():
                target_symbol_id = (
                    symbols_by_file[target_path].get(imported_name)
                    or symbols_by_file[target_path].get(local_name)
                )

                if re.search(rf"<{re.escape(local_name)}\b", body):
                    if target_symbol_id:
                        add_edge(
                            extraction,
                            edge_lookup,
                            source=source_symbol_id,
                            target=target_symbol_id,
                            relation="renders",
                            confidence=SYMBOL_EDGE_CONFIDENCE,
                            source_file=path,
                            source_location=f"L{start_line}",
                        )
                    continue

                if not target_symbol_id:
                    continue

                if re.search(rf"\b{re.escape(local_name)}\b", body):
                    relation = "uses_symbol"
                    if local_name.endswith("Content") or imported_name.endswith("Content"):
                        relation = "uses_content"
                    add_edge(
                        extraction,
                        edge_lookup,
                        source=source_symbol_id,
                        target=target_symbol_id,
                        relation=relation,
                        confidence=SYMBOL_EDGE_CONFIDENCE,
                        source_file=path,
                        source_location=f"L{start_line}",
                    )

        relative = relative_path(path)

        if relative.endswith("/locations/nevada/content.ts") or "/locations/" in relative and relative.endswith("/content.ts"):
            content_ids = [
                symbol_id for symbol_name, symbol_id in symbols_by_file[path].items() if symbol_name.endswith("Content")
            ]
            location_page_id = symbols_by_name.get("LocationPage", [])
            if content_ids and location_page_id:
                for content_id in content_ids:
                    add_edge(
                        extraction,
                        edge_lookup,
                        source=content_id,
                        target=location_page_id[0],
                        relation="supplies_props_for",
                        confidence=SYMBOL_EDGE_CONFIDENCE,
                        source_file=path,
                        source_location="L1",
                    )

                    for section_key, component_name in LOCATION_SECTION_COMPONENTS.items():
                        if not re.search(rf"\b{re.escape(section_key)}\s*:", text):
                            continue
                        target_ids = symbols_by_name.get(component_name, [])
                        if not target_ids:
                            continue
                        add_edge(
                            extraction,
                            edge_lookup,
                            source=content_id,
                            target=target_ids[0],
                            relation="provides_props_for",
                            confidence=SYMBOL_EDGE_CONFIDENCE,
                            source_file=path,
                            source_location="L1",
                        )

        if relative.endswith("/home/content.ts"):
            content_ids = [
                symbol_id for symbol_name, symbol_id in symbols_by_file[path].items() if symbol_name.endswith("Content")
            ]
            for content_id in content_ids:
                for section_key, component_name in HOME_SECTION_COMPONENTS.items():
                    if not re.search(rf"\b{re.escape(section_key)}\s*:", text):
                        continue
                    target_ids = symbols_by_name.get(component_name, [])
                    if not target_ids:
                        continue
                    add_edge(
                        extraction,
                        edge_lookup,
                        source=content_id,
                        target=target_ids[0],
                        relation="provides_props_for",
                        confidence=SYMBOL_EDGE_CONFIDENCE,
                        source_file=path,
                        source_location="L1",
                    )

    graph = build_from_json(extraction)
    communities = cluster(graph)
    cohesion = score_all(graph, communities)
    community_labels = {community_id: f"Community {community_id}" for community_id in communities}
    gods = god_nodes(graph)
    surprises = surprising_connections(graph, communities)
    questions = suggest_questions(graph, communities, community_labels)
    token_cost = {
        "input": extraction.get("input_tokens", 0),
        "output": extraction.get("output_tokens", 0),
    }
    report = generate(
        graph,
        communities,
        cohesion,
        community_labels,
        gods,
        surprises,
        detection_result,
        token_cost,
        str(ROOT),
        suggested_questions=questions,
    )

    OUT_DIR.mkdir(exist_ok=True)
    (OUT_DIR / "GRAPH_REPORT.md").write_text(report, encoding="utf-8")
    (ROOT / ".graphify_detect.json").write_text(json.dumps(detection_result, indent=2), encoding="utf-8")
    (ROOT / ".graphify_ast.json").write_text(json.dumps(extraction, indent=2), encoding="utf-8")
    to_json(graph, communities, str(OUT_DIR / "graph.json"), force=True)
    to_html(graph, communities, str(OUT_DIR / "graph.html"), community_labels=community_labels)

    return {
        "files": len(files),
        "words": detection_result["total_words"],
        "nodes": graph.number_of_nodes(),
        "edges": graph.number_of_edges(),
        "communities": len(communities),
        "god_nodes": [item.get("label") for item in gods[:5]],
    }


def main() -> None:
    summary = rebuild_graph()
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
