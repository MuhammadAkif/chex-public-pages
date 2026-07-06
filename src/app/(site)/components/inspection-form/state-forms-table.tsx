"use client";

import { useMemo, useState } from "react";

export type StateStatus = "form" | "none" | "note";

export type StateRow = {
  name: string;
  uber: StateStatus;
  lyft: StateStatus;
  note?: string;
};

export type StateFormsTableProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Where the uniform "Start online" action points (the form is the same for every state). */
  ctaHref: string;
  footnote: string;
  rows: ReadonlyArray<StateRow>;
  /** When true, drop the full-bleed section chrome so it can sit inside the sticky-form band. */
  embedded?: boolean;
};

type Platform = "all" | "uber" | "lyft";

const TABS: ReadonlyArray<{ id: Platform; label: string }> = [
  { id: "all", label: "All" },
  { id: "uber", label: "Uber" },
  { id: "lyft", label: "Lyft" },
];

function StatusCell({
  status,
  ctaHref,
}: {
  status: StateStatus;
  ctaHref: string;
}) {
  if (status === "form") {
    return (
      <a
        href={ctaHref}
        className="inline-flex items-center gap-1.5 font-ui text-[14px] font-semibold text-[#1368b9] transition-colors hover:text-[#ff7a01]"
      >
        Start online
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    );
  }
  if (status === "note") {
    return <span className="font-ui text-[14px] text-[#63757f]">See notes</span>;
  }
  return <span className="font-ui text-[14px] text-[#63757f]">Not required</span>;
}

export function StateFormsTable({
  eyebrow,
  title,
  description,
  ctaHref,
  footnote,
  rows,
  embedded = false,
}: StateFormsTableProps) {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<Platform>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? rows.filter((r) => r.name.toLowerCase().includes(q)) : rows;
  }, [query, rows]);

  const showUber = platform === "all" || platform === "uber";
  const showLyft = platform === "all" || platform === "lyft";

  return (
    <section
      id="forms"
      className={
        embedded
          ? "scroll-mt-28 py-14"
          : "scroll-mt-24 bg-[#f4f8ff] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
      }
    >
      <div className={embedded ? "" : "mx-auto max-w-[1080px]"}>
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <p className="type-ui-label text-[#ff7a01]">{eyebrow}</p>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-tight tracking-[-0.01em] text-[#1b2f4b] sm:text-[36px]">
            {title}
          </h2>
          <p className="mt-4 font-ui text-[16px] leading-7 text-[#41546e] sm:text-[17px]">
            {description}
          </p>
        </div>

        {/* Tools: search + platform tabs */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="relative min-w-[220px] max-w-[360px] flex-1">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#63757f]"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your state…"
              aria-label="Search states"
              className="w-full rounded-[12px] border border-[#d7e1df] bg-white py-3 pl-11 pr-4 font-ui text-[15px] text-[#243642] outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#ff7a01]"
            />
          </div>
          <div
            role="tablist"
            aria-label="Filter by platform"
            className="inline-flex gap-1 rounded-full bg-[#e5edf7] p-1"
          >
            {TABS.map((tab) => {
              const active = platform === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPlatform(tab.id)}
                  className={`cursor-pointer rounded-full px-5 py-2 font-ui text-[14px] font-semibold transition ${
                    active
                      ? "bg-white text-[#1b2f4b] shadow-[0_4px_14px_rgba(10,27,42,0.08)]"
                      : "text-[#63757f] hover:text-[#1b2f4b]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-[#e4ebea] bg-white shadow-[0_4px_14px_rgba(10,27,42,0.06)]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#010e2b] text-white">
                <th className="px-4 py-4 font-display text-[13.5px] font-semibold sm:px-5">
                  State
                </th>
                {showUber ? (
                  <th className="px-4 py-4 font-display text-[13.5px] font-semibold sm:px-5">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      Uber
                    </span>
                  </th>
                ) : null}
                {showLyft ? (
                  <th className="px-4 py-4 font-display text-[13.5px] font-semibold sm:px-5">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ea0b8c]" />
                      Lyft
                    </span>
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.name}
                  className="border-t border-[#eef2f1] transition-colors hover:bg-[#f7faff]"
                >
                  <td className="px-4 py-3.5 align-top sm:px-5">
                    <span className="font-display text-[15px] font-semibold text-[#1b2f4b]">
                      {row.name}
                    </span>
                    {row.note ? (
                      <span className="mt-1 block max-w-[22rem] font-ui text-[12.5px] leading-5 text-[#63757f]">
                        {row.note}
                      </span>
                    ) : null}
                  </td>
                  {showUber ? (
                    <td className="px-4 py-3.5 align-top sm:px-5">
                      <StatusCell status={row.uber} ctaHref={ctaHref} />
                    </td>
                  ) : null}
                  {showLyft ? (
                    <td className="px-4 py-3.5 align-top sm:px-5">
                      <StatusCell status={row.lyft} ctaHref={ctaHref} />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center font-ui text-[15px] text-[#63757f]">
              No state matches that search.
            </p>
          ) : null}
        </div>

        <p className="mt-4 text-center font-ui text-[13px] leading-5 text-[#63757f]">
          {footnote}
        </p>
      </div>
    </section>
  );
}
