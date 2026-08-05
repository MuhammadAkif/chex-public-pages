import Link from "next/link";
import type { Route } from "next";

import type {
  OverageCard,
  PricingOverageContent,
} from "@/app/(site)/dsp-fleet-pricing/content";

const cardTone: Record<OverageCard["tone"], string> = {
  light:
    "border border-[#e7edf6] bg-white text-[#1b2f4b] shadow-[0_18px_55px_-40px_rgba(20,104,186,0.55)]",
  accent:
    "border border-transparent bg-[linear-gradient(135deg,#FFAC61_0%,#FF7A01_100%)] text-white shadow-[0_28px_70px_-36px_rgba(255,122,1,0.7)]",
  blue: "border border-transparent bg-[linear-gradient(331deg,#1B2F4B_-23.5%,#1368B9_60.81%)] text-white shadow-[0_28px_70px_-36px_rgba(19,104,185,0.7)]",
  dark: "border border-transparent bg-[#172a4a] text-white",
};

function Card({ card }: { card: OverageCard }) {
  const dark = card.tone !== "light";
  const muted = dark ? "text-white/85" : "text-[#5b6b82]";

  return (
    <div className={`flex h-full flex-col rounded-[16px] px-7 py-7 ${cardTone[card.tone]}`}>
      <span
        className={`inline-flex w-fit rounded-[8px] px-3 py-1 text-[12px] font-bold uppercase tracking-wide ${
          card.tone === "light"
            ? "bg-[#fff1e6] text-[#ff7a01]"
            : card.tone === "accent"
              ? "bg-white text-[#f3700a]"
              : card.tone === "blue"
                ? "bg-white text-[#1368b9]"
                : "bg-[#ff7a01] text-white"
        }`}
      >
        {card.badge}
      </span>

      <p className={`mt-5 font-ui text-[16px] font-semibold ${dark ? "text-white" : "text-[#1b2f4b]"}`}>
        {card.range}
      </p>

      <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="font-display text-[44px] font-bold leading-none tracking-[-0.02em]">
          {card.price}
        </span>
        {card.priceSuffix ? (
          <span className={`mb-1.5 font-ui text-[14px] ${muted}`}>
            {card.priceSuffix}
          </span>
        ) : null}
        {card.ctaLabel ? (
          <Link
            href={(card.ctaHref ?? "#") as Route}
            style={{ color: "#ff7a01" }}
            className="mb-1.5 cursor-pointer font-ui text-[15px] font-semibold hover:opacity-80"
          >
            {card.ctaLabel}
          </Link>
        ) : null}
      </div>

      <p className={`mt-auto pt-6 font-ui text-[14px] ${muted}`}>{card.note}</p>
    </div>
  );
}

export function PricingOverage({
  eyebrow,
  title,
  description,
  cards,
}: PricingOverageContent) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center">
          <p className="type-ui-label uppercase tracking-wide text-[#ff7a01]">
            {eyebrow}
          </p>
          <h2 className="type-section-heading mt-3 text-[#1b2f4b] lg:whitespace-nowrap">
            {title}
          </h2>
          <p className="type-body-lg mx-auto mt-4 max-w-3xl text-[#41546e]">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[760px] items-stretch gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <Card key={card.badge} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
