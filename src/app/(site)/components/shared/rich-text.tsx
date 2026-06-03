import type { ElementType } from "react";

/**
 * Renders CMS-authored text that may contain a small allowlist of inline HTML
 * (most importantly `<a href="…">` links) authored directly in the Payload
 * admin text fields.
 *
 * The content is sanitized with a conservative allowlist before being passed to
 * `dangerouslySetInnerHTML`, so a plain string renders exactly as before and an
 * accidental `<script>`/`onerror=…`/`javascript:` payload is stripped. The
 * sanitizer is pure string work (no DOM), so it runs the same in server and
 * client components.
 */

const ALLOWED_TAGS = new Set([
  "a",
  "b",
  "strong",
  "i",
  "em",
  "u",
  "br",
  "span",
  "sup",
  "sub",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "target", "rel", "title"]),
};

// Only allow links that point somewhere safe — blocks `javascript:`, `data:`, etc.
const SAFE_HREF = /^(?:https?:\/\/|mailto:|tel:|\/|#)/i;

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function sanitizeRichText(input: string): string {
  // Drop <script>/<style> blocks together with their contents.
  const withoutBlocks = input.replace(
    /<(script|style)\b[\s\S]*?<\/\1>/gi,
    "",
  );

  return withoutBlocks.replace(
    /<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g,
    (full, rawName: string, attrs: string) => {
      const name = rawName.toLowerCase();

      // Unknown tag: strip the tag markers but keep any inner text.
      if (!ALLOWED_TAGS.has(name)) return "";

      const isClosing = full.startsWith("</");
      if (isClosing) return `</${name}>`;
      if (name === "br") return "<br />";

      const allowed = ALLOWED_ATTRS[name];
      if (!allowed) return `<${name}>`;

      const kept: string[] = [];
      const attrPattern = /([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
      let match: RegExpExecArray | null;
      while ((match = attrPattern.exec(attrs)) !== null) {
        const attr = match[1].toLowerCase();
        const value = match[3] ?? match[4] ?? "";
        if (!allowed.has(attr)) continue;
        if (attr === "href" && !SAFE_HREF.test(value.trim())) continue;
        kept.push(`${attr}="${escapeAttr(value)}"`);
      }

      // Harden new-tab links against reverse-tabnabbing.
      if (
        name === "a" &&
        /target\s*=\s*["']_blank["']/i.test(attrs) &&
        !kept.some((a) => a.startsWith("rel="))
      ) {
        kept.push('rel="noopener noreferrer"');
      }

      return `<${name}${kept.length ? ` ${kept.join(" ")}` : ""}>`;
    },
  );
}

export type RichTextProps = {
  html: string;
  /** Element to render. Defaults to `span`. */
  as?: ElementType;
  className?: string;
};

export function RichText({ html, as: Tag = "span", className }: RichTextProps) {
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }}
    />
  );
}
