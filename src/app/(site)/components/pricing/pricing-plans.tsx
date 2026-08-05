"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import type { Route } from "next";

import { CreateCompanyModal } from "@/app/(site)/components/pricing/create-company-modal";
import {
  ThankYouModal,
  type ThankYouPlan,
} from "@/app/(site)/components/pricing/thank-you-modal";
import {
  type PricingHeroContent,
  type PricingTier,
  type PricingTiersContent,
} from "@/app/(site)/dsp-fleet-pricing/content";

const tierCtaClasses: Record<PricingTier["ctaVariant"], string> = {
  outline: "border border-[#d7e3f4] hover:border-[#1368b9]",
  dark: "hover:brightness-110",
  accent:
    "shadow-[0_20px_50px_-24px_rgba(255,122,1,0.85)] hover:brightness-105",
};

// Background AND text colors are set inline: globals.css has an unlayered
// `a { color: inherit }` rule that, in Tailwind v4, overrides text-* utilities
// on anchors — so the text color must be inlined to win the cascade.
const tierCtaStyle: Record<PricingTier["ctaVariant"], CSSProperties> = {
  outline: { backgroundColor: "#ffffff", color: "#1b2f4b" },
  dark: { backgroundColor: "#1b2f4b", color: "#ffffff" },
  accent: { backgroundColor: "#ff7a01", color: "#ffffff" },
};

function TierCta({
  tier,
  onChoose,
}: {
  tier: PricingTier;
  onChoose: (tier: PricingTier) => void;
}) {
  const className = `type-button mt-7 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] px-6 transition ${tierCtaClasses[tier.ctaVariant]}`;
  const style = tierCtaStyle[tier.ctaVariant];

  // Plan signups (#signup) open the Create Company modal; other CTAs navigate.
  if (tier.ctaHref.startsWith("#")) {
    return (
      <button
        type="button"
        className={className}
        style={style}
        onClick={() => onChoose(tier)}
      >
        {tier.ctaLabel}
      </button>
    );
  }
  return (
    <Link href={tier.ctaHref as Route} className={className} style={style}>
      {tier.ctaLabel}
    </Link>
  );
}

type PricingPlansProps = {
  hero: PricingHeroContent;
  plans: PricingTiersContent;
};

// The chosen plan is stashed here before redirecting to the payment provider, so
// the Thank You modal can restore its details after the user returns (full page
// reload). Cleared once the modal is shown.
const PENDING_PLAN_KEY = "chex:pending-plan";
// The signup token is stashed alongside the plan so the Thank You modal can
// fetch the Stripe receipt after the user returns from checkout.
const PENDING_TOKEN_KEY = "chex:pending-token";
// Query flag the payment provider's success_url returns to, e.g.
// `${origin}/dsp-fleet-pricing?payment=success&session_id=…`. Triggers the Thank You modal.
const PAYMENT_SUCCESS_FLAG = "payment";


function TierCard({
  tier,
  onChoose,
}: {
  tier: PricingTier;
  onChoose: (tier: PricingTier) => void;
}) {
  const isCustom = tier.monthlyPrice === null;
  const displayPrice = tier.monthlyPrice;
  const highlighted = Boolean(tier.recommended);

  return (
    <div
      className={`relative flex h-full flex-col rounded-[18px] px-6 py-7 ${
        highlighted
          ? "border-[5px] border-[#fce7d4] bg-[#172a4a] text-white shadow-[0_30px_70px_-34px_rgba(255,122,1,0.55)] lg:z-10 lg:origin-center lg:scale-[1.04]"
          : "border border-[#e7edf6] bg-white text-[#1b2f4b] shadow-[0_18px_55px_-40px_rgba(20,104,186,0.55)]"
      }`}
    >
      {highlighted ? (
        <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#ff7a01] px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_12px_24px_-10px_rgba(255,122,1,0.9)]">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3.5 14.6 9l6 .6-4.5 4 1.3 5.9L12 16.6 6.6 19.5 7.9 13.6l-4.5-4 6-.6L12 3.5Z" />
          </svg>
          Recommended
        </span>
      ) : null}

      <span
        className={`inline-flex w-fit rounded-[8px] px-3 py-1 text-[12px] font-bold uppercase tracking-wide ${
          highlighted ? "bg-[#ff7a01] text-white" : "bg-[#fff1e6] text-[#ff7a01]"
        }`}
      >
        {tier.badge}
      </span>

      <h3
        className={`mt-5 font-display text-[26px] font-bold ${
          highlighted ? "text-white" : "text-[#1b2f4b]"
        }`}
      >
        {tier.name}
      </h3>

      <div className="mt-3 min-h-[84px]">
        {isCustom ? (
          <>
            <p
              className={`font-display text-[40px] font-bold leading-none ${
                highlighted ? "text-white" : "text-[#1b2f4b]"
              }`}
            >
              {tier.customLabel}
            </p>
            {tier.customSubLabel ? (
              <p
                className={`mt-3 font-ui text-[14px] ${
                  highlighted ? "text-white/70" : "text-[#5b6b82]"
                }`}
              >
                {tier.customSubLabel}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <div className="flex items-end gap-1">
              <span
                className={`font-display text-[52px] font-bold leading-none tracking-[-0.02em] ${
                  highlighted ? "text-white" : "text-[#1b2f4b]"
                }`}
              >
                ${displayPrice}
              </span>
              <span
                className={`mb-2 font-ui text-[15px] ${
                  highlighted ? "text-white/70" : "text-[#5b6b82]"
                }`}
              >
                /month
              </span>
            </div>
            {/* Spacer to keep custom and priced cards the same height. */}
            <p className="mt-2 h-4" />
          </>
        )}
      </div>

      <div
        className={`mt-1 rounded-[10px] px-4 py-3 text-center font-ui text-[14px] font-semibold ${
          highlighted ? "bg-[#ff7a01] text-white" : "bg-[#fff4ea] text-[#ff7a01]"
        }`}
      >
        {tier.includedLabel}
      </div>

      <div
        className={`mt-6 h-px w-full ${
          highlighted ? "bg-white/15" : "bg-[#eef2f8]"
        }`}
      />

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2.5 font-ui text-[15px] ${
              highlighted ? "text-white/85" : "text-[#41546e]"
            }`}
          >
            <svg
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                highlighted ? "text-white" : "text-[#1b2f4b]"
              }`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m4 10.5 4 4 8-9" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <TierCta tier={tier} onChoose={onChoose} />
    </div>
  );
}

export function PricingPlans({ hero, plans }: PricingPlansProps) {
  const [modalTier, setModalTier] = useState<PricingTier | null>(null);
  // The paid plan to celebrate — set only after returning from payment.
  const [paidPlan, setPaidPlan] = useState<ThankYouPlan | null>(null);
  // Stripe session id + signup token, used by the modal to fetch the receipt.
  const [receiptSessionId, setReceiptSessionId] = useState<string | null>(null);
  const [receiptToken, setReceiptToken] = useState<string | null>(null);

  // A tier's display fields — prices are the monthly rate.
  function planSummary(tier: PricingTier): ThankYouPlan {
    return {
      name: tier.name,
      priceLabel:
        tier.monthlyPrice === null ? "Custom" : `$${tier.monthlyPrice}/month`,
      includedLabel: tier.includedLabel,
    };
  }

  // On returning from the payment provider (`?payment=success`), restore the
  // pending plan and show the Thank You modal, then strip the flag so a refresh
  // doesn't reopen it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get(PAYMENT_SUCCESS_FLAG) !== "success") return;

    const stored = sessionStorage.getItem(PENDING_PLAN_KEY);
    if (stored) {
      try {
        setPaidPlan(JSON.parse(stored) as ThankYouPlan);
      } catch {
        // ignore malformed payload
      }
    }

    // Stripe appends ?session_id=…; pair it with the stashed token so the modal
    // can fetch the receipt.
    setReceiptSessionId(params.get("session_id"));
    setReceiptToken(sessionStorage.getItem(PENDING_TOKEN_KEY));

    sessionStorage.removeItem(PENDING_PLAN_KEY);
    sessionStorage.removeItem(PENDING_TOKEN_KEY);

    params.delete(PAYMENT_SUCCESS_FLAG);
    params.delete("session_id");
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      window.location.pathname + (qs ? `?${qs}` : ""),
    );
  }, []);

  // After the company is created: if Stripe checkout is required, stash the plan
  // and signup token (so the Thank You modal can restore details + fetch the
  // receipt after the user returns via the provider's success_url →
  // `${origin}/dsp-fleet-pricing?payment=success`) and redirect to Stripe. Otherwise no
  // payment is needed — show the Thank You modal right away.
  function handleCreated(
    tier: PricingTier,
    result?: { checkoutUrl: string; token?: string },
  ) {
    setModalTier(null);
    if (result?.checkoutUrl) {
      sessionStorage.setItem(PENDING_PLAN_KEY, JSON.stringify(planSummary(tier)));
      if (result.token) sessionStorage.setItem(PENDING_TOKEN_KEY, result.token);
      window.location.href = result.checkoutUrl;
    } else {
      setPaidPlan(planSummary(tier));
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0a2c58] px-4 pb-20 pt-16 text-white sm:px-6 lg:px-10 lg:pb-28 lg:pt-20">
        {/* Base blue gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_110%_at_50%_38%,#2f80d6_0%,#1c66ba_32%,#11447f_62%,#0a2c58_100%)]" />
        {/* Horizontal grid lines */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_63px,rgba(255,255,255,0.05)_63px,rgba(255,255,255,0.05)_64px)]" />
        {/* Soft glow circles */}
        <div className="pointer-events-none absolute -left-24 top-[6%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_55%,transparent_72%)] ring-1 ring-white/5 lg:h-[560px] lg:w-[560px]" />
        <div className="pointer-events-none absolute right-[12%] top-[14%] h-[210px] w-[210px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_55%,transparent_72%)] ring-1 ring-white/5 lg:h-[290px] lg:w-[290px]" />

        <div className="relative mx-auto flex max-w-[860px] flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ff7a01] bg-white/10 px-4 py-1.5 font-ui text-[14px] font-semibold tracking-wide text-white backdrop-blur">
            <svg
              className="h-4 w-4 text-[#ff7a01]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6 2h12l4 6-10 14L2 8l4-6Zm.6 2L4 7.8 12 19l8-11.2L17.4 4H6.6Z" />
              <path d="M8.5 3 12 8l3.5-5h-7ZM3 8h18l-9 12L3 8Z" opacity=".55" />
            </svg>
            {hero.eyebrow}
          </span>

          <h1 className="type-hero mt-6 text-white">
            {hero.title.map((segment, index) => (
              <span
                key={index}
                className={segment.accent ? "text-[#ff7a01]" : undefined}
              >
                {segment.text}
              </span>
            ))}
          </h1>

          <p className="type-body-lg mt-6 max-w-2xl text-white/85">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* ── Tier cards ── */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="type-ui-label uppercase tracking-wide text-[#ff7a01]">
              {plans.eyebrow}
            </p>
            <h2 className="type-section-heading mt-3 text-[#1b2f4b]">
              {plans.title}
            </h2>
            <p className="type-body-lg mt-4 text-[#41546e]">
              {plans.description}
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-[920px] items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} onChoose={setModalTier} />
            ))}
          </div>
        </div>
      </section>

      {modalTier ? (
        <CreateCompanyModal
          plan={planSummary(modalTier)}
          planKey={modalTier.id}
          onClose={() => setModalTier(null)}
          onCreated={(result) => handleCreated(modalTier, result)}
        />
      ) : null}

      {paidPlan ? (
        <ThankYouModal
          plan={paidPlan}
          sessionId={receiptSessionId ?? undefined}
          receiptToken={receiptToken ?? undefined}
          onClose={() => setPaidPlan(null)}
        />
      ) : null}
    </>
  );
}
