/* eslint-disable @next/next/no-img-element */

import { Button } from "@/app/(site)/components/ui/button";

export type LocationServicesProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  demoHref: string;
  items: ReadonlyArray<{
    title: string;
    description: string;
    image: string;
    reverse?: boolean;
  }>;
};

const BR_TAG_PATTERN = /<br\s*\/?>/gi;
const BULLET_PREFIX_PATTERN = /^(?:[-*]\s+|✅\s*|•\s*)/;
const TABLE_BLOCK_PATTERN = /\[TABLE\]([\s\S]*?)\[\/TABLE\]/i;

type ParsedTable = {
  headers: string[];
  rows: string[][];
};

function parseServiceDescription(description: string) {
  const tableMatch = description.match(TABLE_BLOCK_PATTERN);
  let parsedTable: ParsedTable | null = null;
  let normalizedDescription = description;

  if (tableMatch?.[1]) {
    const lines = tableMatch[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const matrix = lines
      .map((line) => line.split("|").map((cell) => cell.trim()))
      .filter((cells) => cells.length >= 3);

    if (matrix.length >= 2) {
      parsedTable = {
        headers: matrix[0] ?? [],
        rows: matrix.slice(1),
      };
    }

    normalizedDescription = description.replace(tableMatch[0], "").trim();
  }

  const paragraphs: string[] = [];
  const bullets: string[] = [];
  const normalizedLines = normalizedDescription
    .replace(BR_TAG_PATTERN, "\n")
    .split("\n")
    .map((line) => line.trim());
  let currentParagraph = "";

  const flushParagraph = () => {
    if (!currentParagraph) return;
    paragraphs.push(currentParagraph.trim());
    currentParagraph = "";
  };

  for (const line of normalizedLines) {
    if (!line) {
      flushParagraph();
      continue;
    }

    if (BULLET_PREFIX_PATTERN.test(line)) {
      flushParagraph();
      bullets.push(line.replace(BULLET_PREFIX_PATTERN, "").trim());
      continue;
    }

    if (line.includes("•")) {
      flushParagraph();
      const parts = line
        .split("•")
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length) {
        const [lead, ...rest] = parts;
        if (lead) {
          currentParagraph = lead;
          flushParagraph();
        }
        for (const item of rest) {
          if (item)
            bullets.push(item.replace(BULLET_PREFIX_PATTERN, "").trim());
        }
      }
      continue;
    }

    currentParagraph = currentParagraph ? `${currentParagraph} ${line}` : line;
  }

  flushParagraph();
  return { bullets, paragraphs, table: parsedTable };
}

// ─── Sentiment helpers (reused from comparison section) ──────────────────────

const POSITIVE_SIGNALS = [
  "instant",
  "digital",
  "handled",
  "same day",
  "half hour",
  "always",
  "yes",
  "statewide",
  "full",
  "auto",
  "confirmed",
  "correct",
  "flexible",
  "anytime",
  "stored",
  "covered",
];
const NEGATIVE_SIGNALS = [
  "usually yes",
  "paper",
  "you handle",
  "you do it",
  "1–3 days",
  "1-3 days",
  "not always",
  "limited",
  "business hours",
  "inconsistent",
  "generic",
  "rejection",
  "sometimes",
  "easy to lose",
];
const isPositiveCell = (v: string) =>
  POSITIVE_SIGNALS.some((s) => v.toLowerCase().includes(s));
const isNegativeCell = (v: string) =>
  NEGATIVE_SIGNALS.some((s) => v.toLowerCase().includes(s));

/** Body copy: 17px ui-sans stack (color applied per context) */
const bodySansBase =
  "font-[ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif] text-[17px] leading-[1.65]";
const bodySans = `${bodySansBase} text-slate-600`;

// ─── Component ───────────────────────────────────────────────────────────────

export function LocationServices({
  eyebrow,
  title,
  description,
  ctaLabel,
  demoHref,
  items,
}: LocationServicesProps) {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50/90 via-white to-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,122,1,0.06),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(19,104,185,0.06)_0%,transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1240px]">
        {/* ── Section heading ── */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#ff7a01]">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[34px] font-bold leading-[1.1] tracking-[-1.6px] text-[#0f172a] sm:text-[44px] lg:text-[52px]">
            {title}
          </h2>
          <p className={`mx-auto mt-6 max-w-3xl ${bodySans}`}>{description}</p>
        </div>

        {/* ── Service cards ── */}
        <div className="mt-14 space-y-10">
          {items.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.12)] backdrop-blur-sm ring-1 ring-slate-900/5 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.15)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff7a01]/40 to-transparent" />

              <div className="p-6 sm:p-9 lg:p-12">
                <h3 className="text-center font-display text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0f172a] sm:text-[28px] lg:text-[32px]">
                  {item.title}
                </h3>

                {(() => {
                  const { bullets, paragraphs, table } =
                    parseServiceDescription(item.description);

                  return (
                    <>
                      <div
                        className={`mx-auto mt-6 max-w-3xl space-y-4 text-center ${bodySans}`}
                      >
                        {paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

                      <div className="mx-auto mt-8 max-w-4xl">
                        <div className="overflow-hidden rounded-[24px] border border-slate-200/90 bg-gradient-to-br from-slate-50 to-blue-50/50 p-1 shadow-inner shadow-slate-200/60 ring-1 ring-slate-900/5">
                          <div className="overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_12px_40px_-16px_rgba(37,99,235,0.2)]">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-auto transition duration-500"
                            />
                          </div>
                        </div>
                      </div>

                      {bullets.length ? (
                        <ul
                          className={`mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3 ${bodySans} text-left`}
                        >
                          {bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 shadow-sm shadow-slate-200/40 transition-colors hover:bg-slate-50"
                            >
                              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#ff7a01]/12 ring-1 ring-[#ff7a01]/15">
                                <svg
                                  className="h-3.5 w-3.5 text-[#ea580c]"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="2.5 6 5 8.5 9.5 3.5" />
                                </svg>
                              </span>
                              <span className="min-w-0 flex-1">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {table ? (
                        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.08)]">
                          <div
                            className="grid border-b border-slate-200 bg-slate-50/90"
                            style={{
                              gridTemplateColumns: `repeat(${table.headers.length}, 1fr)`,
                            }}
                          >
                            {table.headers.map((header, hi) => (
                              <div
                                key={header}
                                className={[
                                  "px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em]",
                                  hi === 0 ? "text-slate-500" : "",
                                  hi === 1
                                    ? "border-x border-orange-200 bg-orange-50/80 text-[#b45309]"
                                    : "",
                                  hi === table.headers.length - 1
                                    ? "border-x border-emerald-200 bg-emerald-50/80 text-emerald-700"
                                    : "",
                                ].join(" ")}
                              >
                                {header}
                              </div>
                            ))}
                          </div>

                          {table.rows.map((row, ri) => {
                            const isEven = ri % 2 === 0;
                            return (
                              <div
                                key={row.join("|")}
                                className={`grid border-b border-slate-100 last:border-0 ${isEven ? "bg-white" : "bg-slate-50/40"}`}
                                style={{
                                  gridTemplateColumns: `repeat(${row.length}, 1fr)`,
                                }}
                              >
                                {row.map((cell, ci) => {
                                  const isChex = ci === row.length - 1;
                                  const isTrad = ci === 1;
                                  const showCheck =
                                    isChex && isPositiveCell(cell);
                                  const showCross =
                                    isTrad && isNegativeCell(cell);

                                  return (
                                    <div
                                      key={`${ci}-${cell}`}
                                      className={[
                                        `${bodySansBase} flex items-center gap-2.5 px-4 py-3.5`,
                                        ci === 0
                                          ? "font-semibold text-slate-900"
                                          : "text-slate-600",
                                        isTrad
                                          ? `border-x border-orange-200 bg-orange-50/35 ${showCross ? "text-[#9a3412]" : "text-[#b45309]"}`
                                          : "",
                                        isChex
                                          ? "border-x border-emerald-200 bg-emerald-50/40 font-semibold text-emerald-950"
                                          : "",
                                      ].join(" ")}
                                    >
                                      {showCheck && (
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                          <svg
                                            className="h-3 w-3 text-emerald-600"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <polyline points="2,6 5,9 10,3" />
                                          </svg>
                                        </span>
                                      )}
                                      {showCross && (
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50">
                                          <svg
                                            className="h-3 w-3 text-red-400"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                          >
                                            <line x1="3" y1="3" x2="9" y2="9" />
                                            <line x1="9" y1="3" x2="3" y2="9" />
                                          </svg>
                                        </span>
                                      )}
                                      <span>{cell}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </>
                  );
                })()}

                <div className="mt-10 flex justify-center">
                  <Button href={demoHref}>Read more</Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 flex justify-center">
          <Button href={demoHref} className="min-w-[260px]">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
