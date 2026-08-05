import { Fragment } from "react";

import type { RidesharePillIcon } from "@/app/(site)/rideshare-pricing/content";
import type { RidesharePricingHeroContent } from "@/app/(site)/rideshare-pricing/content";

function PillIcon({ icon }: { icon: RidesharePillIcon }) {
  switch (icon) {
    case "star":
      return (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3.5 14.6 9l6 .6-4.5 4 1.3 5.9L12 16.6 6.6 19.5 7.9 13.6l-4.5-4 6-.6L12 3.5Z" />
        </svg>
      );
    case "car":
      return (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 11.2 6.4 7A2.2 2.2 0 0 1 8.5 5.5h7A2.2 2.2 0 0 1 17.6 7L19 11.2l.9.8a1.6 1.6 0 0 1 .6 1.2V17a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-.7H6.5V17a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3.8c0-.46.2-.9.6-1.2l.9-.8Zm2.3-1.2h9.4l-1-3.1a.6.6 0 0 0-.6-.4H8.9a.6.6 0 0 0-.6.4l-1 3.1ZM7 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
        </svg>
      );
    case "globe":
      return (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
        </svg>
      );
    case "savings":
      return (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v18M8.5 7.5h5.25a2.25 2.25 0 0 1 0 4.5H9.75a2.25 2.25 0 0 0 0 4.5h5.75" />
        </svg>
      );
    case "check":
    default:
      return (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m4 12.5 5 5 11-11" />
        </svg>
      );
  }
}

export function RidesharePricingHero({
  hero,
}: {
  hero: RidesharePricingHeroContent;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0a2c58] px-4 pb-20 pt-16 text-white sm:px-6 lg:px-10 lg:pb-28 lg:pt-20">
      {/* Base blue gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_110%_at_50%_38%,#2f80d6_0%,#1c66ba_32%,#11447f_62%,#0a2c58_100%)]" />
      {/* Horizontal grid lines */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_63px,rgba(255,255,255,0.05)_63px,rgba(255,255,255,0.05)_64px)]" />
      {/* Soft glow circles */}
      <div className="pointer-events-none absolute -left-24 top-[6%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_55%,transparent_72%)] ring-1 ring-white/5 lg:h-[560px] lg:w-[560px]" />
      <div className="pointer-events-none absolute right-[12%] top-[14%] h-[210px] w-[210px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_55%,transparent_72%)] ring-1 ring-white/5 lg:h-[290px] lg:w-[290px]" />

      <div className="relative mx-auto flex max-w-[1040px] flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#ff7a01] bg-white/10 px-4 py-1.5 font-ui text-[14px] font-semibold tracking-wide text-white backdrop-blur">
          <svg
            className="h-4 w-4 text-[#ff7a01]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 2h12l4 6-10 14L2 8l4-6Zm.6 2L4 7.8 12 19l8-11.2L17.4 4H6.6Z" />
          </svg>
          {hero.eyebrow}
        </span>

        <h1 className="type-hero mt-6 text-white lg:whitespace-nowrap">
          {hero.title.map((segment, index) => (
            <Fragment key={index}>
              {segment.newLine ? <br /> : null}
              <span className={segment.accent ? "text-[#ff7a01]" : undefined}>
                {segment.text}
              </span>
            </Fragment>
          ))}
        </h1>

        <p className="type-body-lg mt-6 max-w-2xl text-white/85">
          {hero.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {hero.trustPills.map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-ui text-[14px] text-white/90"
            >
              <span className="text-[#ffb066]">
                <PillIcon icon={pill.icon} />
              </span>
              {pill.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
