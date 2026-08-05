"use client";

import Link from "next/link";
import type { Route } from "next";

/** Smooth-scroll to a same-page section, re-firing even if the hash is unchanged. */
function scrollToHash(hash: string) {
  const el = document.getElementById(hash.slice(1));
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", hash);
}

import type {
  RidesharePricingCard,
  RidesharePricingPlansContent,
} from "@/app/(site)/rideshare-pricing/content";

function CheckIcon({ dark }: { dark: boolean }) {
  return (
    <span
      className={`mt-0.5 inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${
        dark ? "bg-[#ff7a01]" : "bg-white/25"
      }`}
      aria-hidden="true"
    >
      <svg
        className="h-3 w-3 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 12.5 5 5 9-11" />
      </svg>
    </span>
  );
}

function PlanCard({ card }: { card: RidesharePricingCard }) {
  const isDark = card.tone === "dark";

  return (
    <div
      className={`relative flex w-full max-w-[400px] flex-col rounded-[24px] px-8 py-9 text-white shadow-[0_30px_70px_-38px_rgba(9,44,88,0.7)] ${
        isDark
          ? "bg-[#12294d] bg-[linear-gradient(160deg,#1b3a6e_0%,#12294d_55%,#0d1f3c_100%)]"
          : "bg-[linear-gradient(160deg,#ff8a2b_0%,#ff7a01_55%,#f26a00_100%)]"
      }`}
    >
      {card.ribbon ? (
        <span className="absolute -top-[18px] left-1/2 z-10 inline-flex -translate-x-1/2 items-center whitespace-nowrap rounded-full bg-[#ff7a01] px-5 py-2 text-[12.5px] font-bold uppercase tracking-wide text-white shadow-[0_12px_26px_-10px_rgba(255,122,1,0.9)]">
          {card.ribbon}
        </span>
      ) : null}

      <span className="inline-flex w-fit rounded-full bg-white/[0.32] px-4 py-1.5 text-[13.5px] font-bold uppercase tracking-wide text-white">
        {card.badge}
      </span>

      <div className="mt-6 flex items-end gap-2">
        <span className="font-display text-[52px] font-bold leading-none tracking-[-0.02em]">
          {card.price}
        </span>
        <span className="mb-2 font-ui text-[16px] text-white/85">
          {card.priceSuffix}
        </span>
      </div>

      <span
        className={`mt-4 inline-flex w-fit rounded-full px-4 py-1.5 font-ui text-[15px] font-medium ${
          isDark ? "bg-white/10 text-[#ff9a4d]" : "bg-white/95 text-[#ff6b1a]"
        }`}
      >
        {card.subLabel}
      </span>

      <div className="mt-6 h-px w-full bg-white/20" />

      <ul className="mt-6 flex flex-1 flex-col gap-4">
        {card.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 font-ui text-[16px] text-white/95"
          >
            <CheckIcon dark={isDark} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {card.footnote ? (
        <p className="mt-5 font-ui text-[14px] text-white/75">{card.footnote}</p>
      ) : null}

      {card.ctaHref.startsWith("#") ? (
        // Same-page anchor (e.g. #signup) — native scroll to the form section.
        <a
          href={card.ctaHref}
          onClick={(event) => {
            event.preventDefault();
            scrollToHash(card.ctaHref);
          }}
          className="type-button mt-7 inline-flex min-h-[54px] w-full items-center justify-center rounded-[14px] bg-white px-6 text-[#1b2f4b] transition hover:brightness-95"
          style={{ color: "#1b2f4b" }}
        >
          {card.ctaLabel}
        </a>
      ) : (
        <Link
          href={card.ctaHref as Route}
          className="type-button mt-7 inline-flex min-h-[54px] w-full items-center justify-center rounded-[14px] bg-white px-6 text-[#1b2f4b] transition hover:brightness-95"
          style={{ color: "#1b2f4b" }}
        >
          {card.ctaLabel}
        </Link>
      )}
    </div>
  );
}

export function RidesharePricingPlans({
  plans,
}: {
  plans: RidesharePricingPlansContent;
}) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center">
          <p className="type-ui-label font-bold uppercase tracking-wide text-[#ff7a01]">
            {plans.eyebrow}
          </p>
          <h2 className="type-section-heading mt-3 text-[#1b2f4b] lg:whitespace-nowrap">
            {plans.title}
          </h2>
        </div>

        <div className="mx-auto mt-14 flex max-w-[840px] flex-col items-stretch justify-center gap-6 sm:flex-row">
          {plans.cards.map((card) => (
            <PlanCard key={card.id} card={card} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl font-ui text-[15px] text-[#41546e]">
            {plans.note}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#ffc59e] bg-[#fff4ea] px-5 py-2.5 font-ui text-[15px]">
            <span className="font-bold text-[#ff7a01]">
              {plans.additionalCompanyBadge.amount}
            </span>
            <span className="text-[#5b6b82]">
              {plans.additionalCompanyBadge.label}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
