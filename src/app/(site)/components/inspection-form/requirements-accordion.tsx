"use client";

import { useState } from "react";

export type RequirementGroup = {
  title: string;
  intro?: string;
  twoColumn?: boolean;
  bullets: ReadonlyArray<string>;
};

export type RequirementsAccordionProps = {
  eyebrow: string;
  title: string;
  description: string;
  groups: ReadonlyArray<RequirementGroup>;
  /** When true, drop the full-bleed section chrome so it can sit inside the sticky-form band. */
  embedded?: boolean;
};

export function RequirementsAccordion({
  eyebrow,
  title,
  description,
  groups,
  embedded = false,
}: RequirementsAccordionProps) {
  const [openSet, setOpenSet] = useState<ReadonlySet<number>>(new Set([0]));

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const allOpen = openSet.size === groups.length;
  const toggleAll = () => {
    setOpenSet(
      allOpen ? new Set() : new Set(groups.map((_, index) => index)),
    );
  };

  return (
    <section
      className={
        embedded
          ? "scroll-mt-28 py-14"
          : "bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
      }
    >
      <div className={embedded ? "" : "mx-auto max-w-[900px]"}>
        <div className="mx-auto mb-8 max-w-[760px] text-center">
          <p className="type-ui-label text-[#ff7a01]">{eyebrow}</p>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-tight tracking-[-0.01em] text-[#1b2f4b] sm:text-[36px]">
            {title}
          </h2>
          <p className="mt-4 font-ui text-[16px] leading-7 text-[#41546e] sm:text-[17px]">
            {description}
          </p>
        </div>

        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={toggleAll}
            className="cursor-pointer rounded-full border border-[#d7e1df] bg-white px-4 py-2 font-ui text-[13.5px] font-semibold text-[#1b2f4b] transition hover:border-[#ff7a01] hover:text-[#ff7a01]"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <div className="space-y-3">
          {groups.map((group, index) => {
            const isOpen = openSet.has(index);
            return (
              <div
                key={group.title}
                className="overflow-hidden rounded-[14px] border border-[#e5edf7] bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#f4f8ff] sm:px-6"
                >
                  <span className="font-display text-[16px] font-semibold text-[#1b2f4b] sm:text-[17px]">
                    {group.title}
                  </span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-[8px] text-[18px] transition ${
                      isOpen
                        ? "rotate-45 bg-[#ff7a01] text-white"
                        : "bg-[#fff1e6] text-[#ff7a01]"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <div className="px-5 pb-6 sm:px-6">
                    {group.intro ? (
                      <p className="mb-3 font-ui text-[14.5px] leading-6 text-[#63757f]">
                        {group.intro}
                      </p>
                    ) : null}
                    <ul
                      className={`font-ui text-[15px] text-[#243642] ${
                        group.twoColumn ? "sm:columns-2 sm:gap-x-9" : ""
                      }`}
                    >
                      {group.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="relative break-inside-avoid py-1.5 pl-6"
                        >
                          <span className="absolute left-0 top-[0.85rem] h-1.5 w-1.5 rounded-full bg-[#ff7a01]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
