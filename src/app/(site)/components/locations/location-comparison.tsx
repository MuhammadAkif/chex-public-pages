import { Button } from "@/app/(site)/components/ui/button";

export type LocationComparisonRow = {
  featureLabel: string;
  traditionalValue: string;
  chexValue: string;
};

export type LocationComparisonProps = {
  title: string;
  description: string;
  winnerLabel?: string;
  footerText?: string;
  columnHeaders: string[];
  rows: LocationComparisonRow[];
  ctaLabel?: string;
  ctaHref?: string;
};

/** Table + intro body: 17px ui-sans (matches location-services) */
const tableSans =
  "font-[ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif] text-[17px] leading-[1.65]";

// ─── SVG icons ───────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 shadow-sm">
      <svg
        className="h-3.5 w-3.5 text-emerald-600"
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
  );
}

function CrossIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 shadow-sm">
      <svg
        className="h-3.5 w-3.5 text-red-400"
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
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LocationComparison({
  title,
  description,
  columnHeaders,
  rows,
  ctaLabel,
  ctaHref,
}: LocationComparisonProps) {
  const colCount = columnHeaders.length;
  const gridCols = `repeat(${colCount}, 1fr)`;

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,122,1,0.06),transparent)]" />

      <div className="relative mx-auto max-w-[1240px]">
        {/* ── Heading ── */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[32px] font-bold leading-[1.15] tracking-[-1.6px] text-[#0f172a] sm:text-[40px] lg:text-[48px]">
            {title}
          </h2>
          <p className={`mt-4 text-[#475569] ${tableSans}`}>
            {description}
          </p>
        </div>

        {/* ── Table ── */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
          {/* Column headers */}
          <div
            className="grid border-b border-slate-200 bg-slate-50"
            style={{ gridTemplateColumns: gridCols }}
          >
            {columnHeaders.map((header, hi) => (
              <div
                key={`header-${header}`}
                className={[
                  `${tableSans} px-5 py-4 font-bold`,
                  hi === 0 ? "text-[#0f172a]" : "",
                  hi === 1 ? "text-[#0f172a] border-x border-slate-200" : "",
                  hi === colCount - 1
                    ? "bg-[#fff7ed] text-[#c2540a] border-x border-[#ff7a01]/15"
                    : "",
                ].join(" ")}
              >
                {header}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row, ri) => {
            const cells = [
              row.featureLabel,
              row.traditionalValue,
              row.chexValue,
            ];
            const chexPos = row.chexValue.trim().length > 0;
            const isEven = ri % 2 === 0;

            return (
              <div
                key={`row-${ri}`}
                className={`grid border-b border-slate-100 last:border-0 ${isEven ? "bg-white" : "bg-slate-50/50"}`}
                style={{ gridTemplateColumns: gridCols }}
              >
                {cells.map((cell, ci) => {
                  const isFeature = ci === 0;
                  const isTrad = ci === 1;
                  const isChex = ci === colCount - 1;
                  const showCross = isTrad;
                  const showCheck = isChex && chexPos;

                  return (
                    <div
                      key={`cell-${ci}`}
                      className={[
                        `${tableSans} flex items-center gap-2.5 px-5 py-4`,
                        isFeature ? "font-bold text-[#0f172a]" : "",
                        isTrad
                          ? "border-x border-slate-100 text-[#334155]"
                          : "",
                        isChex
                          ? "bg-[#fff7ed]/60 border-x border-[#ff7a01]/10 font-semibold text-[#1e293b]"
                          : "",
                      ].join(" ")}
                    >
                      {showCross && <CrossIcon />}
                      {showCheck && <CheckIcon />}
                      <span>{cell}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* ── Optional CTA ── */}
        {ctaLabel && ctaHref && (
          <div className="mt-10 flex justify-center">
            <Button href={ctaHref} className="min-w-[240px]">
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
