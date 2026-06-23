import type { Metadata } from "next";

import { PricingPage } from "@/app/(site)/components/pricing/pricing-page";
import { getLandingPage } from "@/app/(site)/landing-page/payload";
import { pricingContent } from "@/app/(site)/pricing/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing | Chex.AI",
  description:
    "Transparent pricing that scales with your fleet — from individual vehicles to enterprise fleets. No hidden fees, 14-day free trial, cancel anytime.",
};

export default async function Pricing() {
  // Source the feedback section from the same place the home page does (the
  // `home-page` global, with the static landing defaults as fallback) so the
  // testimonials always stay identical to the home screen.
  const { content: landing } = await getLandingPage();

  const content = {
    ...pricingContent,
    testimonials: landing.testimonials,
  };

  return <PricingPage content={content} />;
}
