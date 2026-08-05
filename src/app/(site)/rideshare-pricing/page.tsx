import type { Metadata } from "next";

import { RidesharePricingPage } from "@/app/(site)/components/rideshare-pricing/rideshare-pricing-page";
import { getLandingPage } from "@/app/(site)/landing-page/payload";
import { ridesharePricingContent } from "@/app/(site)/rideshare-pricing/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rideshare Pricing | Chex.AI",
  description:
    "Transparent pricing for Uber & Lyft driver inspections. No appointments, no garage visits — complete your inspection from your phone and get certified the same day.",
};

export default async function RidesharePricing() {
  // Source the "Feedback from our verified clients" section from the same place
  // the DSP fleet pricing / home pages do (the `home-page` global) so the
  // testimonials stay identical across pages. Everything else (incl. the
  // "Certified inspections accepted by" logos) is held static in content.ts
  // until the pricing pages are moved into Payload.
  const { content: landing } = await getLandingPage();

  const content = {
    ...ridesharePricingContent,
    testimonials: landing.testimonials,
  };

  return <RidesharePricingPage content={content} />;
}
