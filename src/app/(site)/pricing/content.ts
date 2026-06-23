import type { LocationFaqProps } from "@/app/(site)/components/locations/location-faq";
import type { LocationTestimonialsProps } from "@/app/(site)/components/locations/location-testimonials";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PricingTrustPill = { icon: PricingPillIcon; label: string };
export type PricingPillIcon = "star" | "car" | "globe" | "check";

export type PricingTitleSegment = { text: string; accent?: boolean };

export type PricingHeroContent = {
  eyebrow: string;
  /** Hero title split into segments so accented words render in the brand orange. */
  title: ReadonlyArray<PricingTitleSegment>;
  subtitle: string;
  monthlyLabel: string;
  annualLabel: string;
  annualBadge: string;
  trialPoints: ReadonlyArray<string>;
  trustPills: ReadonlyArray<PricingTrustPill>;
};

export type PricingTier = {
  id: string;
  badge: string;
  name: string;
  /** Monthly price in USD, or null for a custom-priced tier. */
  monthlyPrice: number | null;
  customLabel?: string;
  customSubLabel?: string;
  includedLabel: string;
  features: ReadonlyArray<string>;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "accent" | "outline" | "dark";
  recommended?: boolean;
};

export type PricingTiersContent = {
  eyebrow: string;
  title: string;
  description: string;
  tiers: ReadonlyArray<PricingTier>;
};

/** A comparison cell is either a check (true) / cross (false) or free text. */
export type ComparisonCell = boolean | string;
export type ComparisonColumn = { name: string; price: string; highlight?: boolean };
export type ComparisonRow = { label: string; values: ReadonlyArray<ComparisonCell> };

export type PricingComparisonContent = {
  eyebrow: string;
  title: string;
  description: string;
  featureColumnLabel: string;
  columns: ReadonlyArray<ComparisonColumn>;
  rows: ReadonlyArray<ComparisonRow>;
};

export type OverageCard = {
  badge: string;
  range: string;
  price: string;
  priceSuffix?: string;
  note: string;
  ctaLabel?: string;
  ctaHref?: string;
  tone: "light" | "accent" | "dark";
};

export type PricingOverageContent = {
  eyebrow: string;
  title: string;
  description: string;
  cards: ReadonlyArray<OverageCard>;
};

export type PricingCtaContent = {
  title: string;
  description: string;
  secondaryLabel: string;
  helperText?: string;
};

export type PricingContent = {
  hero: PricingHeroContent;
  plans: PricingTiersContent;
  comparison: PricingComparisonContent;
  overage: PricingOverageContent;
  testimonials: LocationTestimonialsProps;
  faq: LocationFaqProps;
  cta: PricingCtaContent;
};

/** Annual per-month price = monthly − 20%, rounded to the nearest dollar. */
export function annualPrice(monthly: number): number {
  return Math.round(monthly * 0.8);
}

// ─── Content ────────────────────────────────────────────────────────────────────

export const pricingContent: PricingContent = {
  hero: {
    eyebrow: "Transparent Pricing",
    title: [
      { text: "Pricing", accent: true },
      { text: " that scales with " },
      { text: "your fleet", accent: true },
    ],
    subtitle:
      "From individual vehicles to enterprise fleets — choose a plan that fits your inspection volume. No hidden fees, ever.",
    monthlyLabel: "Monthly",
    annualLabel: "Annual",
    annualBadge: "-20%",
    trialPoints: [
      "14-day free trial",
      "No credit card required",
      "Cancel anytime",
    ],
    trustPills: [
      { icon: "star", label: "4.8 · 1667+ reviews" },
      { icon: "car", label: "50K+ inspections" },
      { icon: "globe", label: "All 50 states" },
      { icon: "check", label: "Uber · Lyft · Turo certified" },
    ],
  },

  plans: {
    eyebrow: "Commercial fleet plans",
    title: "Commercial Fleet Pricing Tiers",
    description: "Pay for the inspections you need. Upgrade as you grow.",
    tiers: [
      {
        id: "free",
        badge: "FREE",
        name: "Free",
        monthlyPrice: 0,
        includedLabel: "25 inspections/month",
        features: [
          "Mobile inspections",
          "Basic reporting",
          "Driver management",
          "Limited AI detection",
        ],
        ctaLabel: "Get Started Free",
        ctaHref: "#signup",
        ctaVariant: "outline",
      },
      {
        id: "starter",
        badge: "STARTER",
        name: "Starter",
        monthlyPrice: 99,
        includedLabel: "250 inspections included",
        features: [
          "AI damage detection",
          "Driver scoring",
          "Custom checklists",
          "Alerts & analytics",
        ],
        ctaLabel: "Choose Starter",
        ctaHref: "#signup",
        ctaVariant: "dark",
      },
      {
        id: "growth",
        badge: "GROWTH",
        name: "Growth",
        monthlyPrice: 399,
        includedLabel: "1,500 inspections included",
        recommended: true,
        features: [
          "API integrations",
          "White labeling",
          "SSO authentication",
          "Dedicated support",
        ],
        ctaLabel: "Choose Growth →",
        ctaHref: "#signup",
        ctaVariant: "accent",
      },
      {
        id: "enterprise",
        badge: "ENTERPRISE",
        name: "Enterprise",
        monthlyPrice: null,
        customLabel: "Custom",
        customSubLabel: "Tailored to your needs",
        includedLabel: "High-volume + integrations",
        features: [
          "API integrations",
          "White labeling",
          "SSO authentication",
          "Dedicated support",
        ],
        ctaLabel: "Contact Sales",
        ctaHref: "/contact-us",
        ctaVariant: "accent",
      },
    ],
  },

  comparison: {
    eyebrow: "Feature Breakdown",
    title: "Compare Features Side-By-Side",
    description:
      "Everything you need to make the right choice for your fleet.",
    featureColumnLabel: "Features",
    columns: [
      { name: "Free", price: "$0/mo" },
      { name: "Starter", price: "$99/mo" },
      { name: "Growth", price: "$399/mo", highlight: true },
      { name: "Enterprise", price: "Custom" },
    ],
    rows: [
      { label: "Inspections/month", values: ["25", "250", "1,500", "Unlimited"] },
      { label: "Mobile inspections", values: [true, true, true, true] },
      { label: "AI damage detection", values: ["Limited", false, true, true] },
      { label: "Dashboard analytics", values: [false, true, true, true] },
      { label: "Custom checklists", values: [false, true, true, true] },
      { label: "Driver scoring", values: [false, false, true, true] },
      { label: "API integrations", values: [false, false, false, true] },
    ],
  },

  overage: {
    eyebrow: "Overage Pricing",
    title: "Need More Inspections?",
    description:
      "Predictable per-inspection pricing — the more you do, the less you pay.",
    cards: [
      {
        badge: "SMALL",
        range: "251 — 1,500 inspections",
        price: "$0.45",
        priceSuffix: "per inspection",
        note: "Above your plan's included limit",
        tone: "light",
      },
      {
        badge: "⭐ MEDIUM",
        range: "1,500 — 10,000 inspections",
        price: "$0.30",
        priceSuffix: "per inspection",
        note: "Save 33% at higher volume",
        tone: "accent",
      },
      {
        badge: "ENTERPRISE",
        range: "10,000+ inspections",
        price: "Custom",
        note: "Maximum savings on bulk volume",
        ctaLabel: "Talk to sales →",
        ctaHref: "/contact-us",
        tone: "dark",
      },
    ],
  },

  testimonials: {
    title: "Feedback from our verified clients",
    description:
      "Drivers, fleets and rental operators trust Chex.AI to certify their vehicles faster — here is what they have to say.",
    label: "Customer testimonials",
    items: [
      { name: "Mark Melancon", quote: "The support team helped me when Uber was not accepting my inspection. Resolved it quickly and professionally.", stars: 5, avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Kelsey Proofreads", quote: "Process was simple, quick, and informative. They make sure you have an explanation and an example photo/video for what they're looking for. I got my results about 20 minutes after completing my inspection.", stars: 5, avatar: "https://i.pravatar.cc/100?img=5" },
      { name: "Mary Lugo", quote: "Quick and easy to use. The interface made everything straightforward from start to finish.", stars: 5, avatar: "https://i.pravatar.cc/100?img=9" },
      { name: "Mubarak Behi", quote: "Quick and efficient! Great price and easy to upload all photos and videos required. Will definitely recommend and use it next year!", stars: 5, avatar: "https://i.pravatar.cc/100?img=15" },
      { name: "Angela Bishop", quote: "Chex.ai was really easy to use, better than going to the mechanic!", stars: 5, avatar: "https://i.pravatar.cc/100?img=23" },
      { name: "Ali Alshammari", quote: "Rideshare for five years now and I have tried other services — this is by far the best! Easiest to complete and lowest price I've seen out there.", stars: 5, avatar: "https://i.pravatar.cc/100?img=33" },
      { name: "Hovannss Kupelyan", quote: "Positive value. Got my inspection done in under 10 minutes. Highly recommend to any rideshare driver.", stars: 5, avatar: "https://i.pravatar.cc/100?img=52" },
      { name: "Slamnjamin Dio", quote: "Excellent customer service! They walked me through every step and made sure I was fully certified before the end of the day.", stars: 5, avatar: "https://i.pravatar.cc/100?img=60" },
      { name: "Mousa Naseer", quote: "The app was easy to follow, the pictures showing what was required made it simple. Upload was fast and they had the inspection back within a half hour. Well worth the money.", stars: 5, avatar: "https://i.pravatar.cc/100?img=67" },
      { name: "Andressa Amorim", quote: "Chex.ai was really easy to use, better than going to the mechanic!", stars: 5, avatar: "https://i.pravatar.cc/100?img=44" },
      { name: "James Tillman", quote: "It beats scheduling an appointment with a mechanic. A handful of snapshots and a few minutes of your time and you're done.", stars: 5, avatar: "https://i.pravatar.cc/100?img=70" },
      { name: "Sofia Reyes", quote: "I've been using Chex.AI for two years straight. Every renewal is just as smooth as the first time.", stars: 5, avatar: "https://i.pravatar.cc/100?img=47" },
    ],
  },

  faq: {
    idBase: "pricing",
    title: "Frequently asked questions",
    description:
      "Ask everything you need to know about our plans and pricing. We're here to answer all of your questions.",
    items: [
      {
        question: "What's included in the free plan?",
        answer:
          "The Free plan covers 25 inspections per month with mobile inspections, basic reporting, driver management, and limited AI detection — everything you need to evaluate Chex.AI at no cost.",
      },
      {
        question: "How does overage pricing work?",
        answer:
          "Once you exceed your plan's included inspections, each additional inspection is billed at a predictable per-inspection rate that drops as your volume grows — $0.45 for small volume, $0.30 at higher volume, and custom rates for enterprise.",
      },
      {
        question: "Can I switch between monthly and annual billing?",
        answer:
          "Yes. You can switch to annual billing at any time to lock in a 20% discount on the same features. Annual commitments are billed yearly with no hidden fees.",
      },
      {
        question: "Do you offer a free trial?",
        answer:
          "Every paid plan starts with a 14-day free trial. No credit card is required to get started, and you can cancel anytime.",
      },
      {
        question: "What if my fleet outgrows the Growth plan?",
        answer:
          "The Enterprise plan is tailored to high-volume fleets and includes API integrations, white labeling, SSO authentication, and dedicated support. Contact our sales team and we'll build a plan around your needs.",
      },
    ],
  },

  cta: {
    title: "Ready to modernize your inspections?",
    description:
      "Join the fleets and rideshare operators running faster, AI-powered inspections with Chex.AI.",
    secondaryLabel: "Start My Inspection",
    helperText: "No credit card required, cancel anytime.",
  },
};
