import type {
  ComparisonCell,
  PricingComparisonContent,
} from "@/app/(site)/pricing/content";

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-[#22a45d]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="h-5 w-5 text-[#e5564b]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

function Cell({ value, highlight }: { value: ComparisonCell; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return value ? <CheckIcon /> : <CrossIcon />;
  }
  return (
    <span
      className={`font-ui text-[15px] ${
        highlight ? "font-bold text-[#1b2f4b]" : "text-[#41546e]"
      }`}
    >
      {value}
    </span>
  );
}

export function PricingComparison({
  eyebrow,
  title,
  description,
  featureColumnLabel,
  columns,
  rows,
}: PricingComparisonContent) {
  const gridCols = `minmax(150px,1.4fr) repeat(${columns.length}, minmax(110px,1fr))`;

  return (
    <section className="bg-[#f6f8fc] px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="type-ui-label uppercase tracking-wide text-[#ff7a01]">
            {eyebrow}
          </p>
          <h2 className="type-section-heading mt-3 text-[#1b2f4b]">{title}</h2>
          <p className="type-body-lg mt-4 text-[#41546e]">{description}</p>
        </div>

        {/* Table (sm and up) */}
        <div className="mt-12 hidden overflow-hidden rounded-[20px] bg-white shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)] sm:block">
          {/* Header */}
          <div
            className="grid bg-[#1b2f4b] text-white"
            style={{ gridTemplateColumns: gridCols }}
          >
            <div className="px-6 py-5 font-ui text-[15px] font-bold">
              {featureColumnLabel}
            </div>
            {columns.map((col) => (
              <div
                key={col.name}
                className={`px-4 py-4 text-center ${
                  col.highlight ? "bg-[#ff7a01]" : ""
                }`}
              >
                <div className="font-display text-[18px] font-bold text-white">
                  {col.name}
                </div>
                <div className="font-ui text-[13px] text-white/70">
                  {col.price}
                </div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid border-b border-slate-100 last:border-0"
              style={{ gridTemplateColumns: gridCols }}
            >
              <div className="px-6 py-4 font-ui text-[15px] font-semibold text-[#1b2f4b]">
                {row.label}
              </div>
              {row.values.map((value, ci) => (
                <div
                  key={`${row.label}-${ci}`}
                  className={`flex items-center justify-center px-4 py-4 ${
                    columns[ci]?.highlight ? "bg-[#fff4ea]" : ""
                  }`}
                >
                  <Cell value={value} highlight={columns[ci]?.highlight} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Card stack (below sm) */}
        <div className="mt-10 flex flex-col gap-4 sm:hidden">
          {columns.map((col, ci) => (
            <div
              key={col.name}
              className="overflow-hidden rounded-[16px] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
            >
              <div
                className={`flex items-baseline justify-between px-4 py-3 ${
                  col.highlight ? "bg-[#ff7a01]" : "bg-[#1b2f4b]"
                }`}
              >
                <span className="font-display text-[18px] font-bold text-white">
                  {col.name}
                </span>
                <span className="font-ui text-[13px] text-white/70">
                  {col.price}
                </span>
              </div>
              <dl className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <div
                    key={`${col.name}-${row.label}`}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <dt className="font-ui text-[14px] font-semibold text-[#334155]">
                      {row.label}
                    </dt>
                    <dd>
                      <Cell value={row.values[ci] ?? false} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
