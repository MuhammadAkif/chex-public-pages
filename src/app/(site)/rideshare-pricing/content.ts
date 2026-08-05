import type { SiteImageSource } from "@/app/(site)/components/shared/site-image";
import type { LocationTestimonialsProps } from "@/app/(site)/components/locations/location-testimonials";
import type { LocationFaqProps } from "@/app/(site)/components/locations/location-faq";
import { pricingContent as dspPricingContent } from "@/app/(site)/dsp-fleet-pricing/content";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RidesharePillIcon =
  | "star"
  | "car"
  | "globe"
  | "check"
  | "savings";
export type RidesharePricingTrustPill = {
  icon: RidesharePillIcon;
  label: string;
};

export type RidesharePricingTitleSegment = {
  text: string;
  accent?: boolean;
  /** Force this segment onto a new line (renders a line break before it). */
  newLine?: boolean;
};

export type RidesharePricingHeroContent = {
  eyebrow: string;
  /** Hero title split into segments so accented words render in the brand orange. */
  title: ReadonlyArray<RidesharePricingTitleSegment>;
  subtitle: string;
  trustPills: ReadonlyArray<RidesharePricingTrustPill>;
};

/**
 * "Certified inspections accepted by" — matches the inspection-form page's
 * `trust` section shape, so it can be sourced from the same Payload global.
 */
export type RidesharePricingAcceptedBy = {
  title: string;
  logos: ReadonlyArray<{ src: string; alt: string; className?: string }>;
};

/** Matches the HomeHowItWorks component props (rideshare-inspection-service). */
export type RidesharePricingHowItWorks = {
  title: string;
  description: string;
  steps: ReadonlyArray<{
    title: string;
    description: string;
    image: SiteImageSource;
  }>;
};

export type RidesharePricingBandItem = {
  icon: "clock" | "calendar" | "scan" | "refresh";
  title: string;
  subtitle: string;
};

export type RidesharePricingBandContent = {
  title: string;
  items: ReadonlyArray<RidesharePricingBandItem>;
};

export type RidesharePricingCard = {
  id: string;
  badge: string;
  price: string;
  priceSuffix: string;
  subLabel: string;
  features: ReadonlyArray<string>;
  footnote?: string;
  ctaLabel: string;
  ctaHref: string;
  tone: "accent" | "dark";
  ribbon?: string;
};

export type RidesharePricingPlansContent = {
  eyebrow: string;
  title: string;
  cards: ReadonlyArray<RidesharePricingCard>;
  note: string;
  additionalCompanyBadge: { amount: string; label: string };
};

export type RidesharePricingCtaContent = {
  title: string;
  description: string;
  secondaryLabel: string;
  helperText?: string;
};

export type RidesharePricingSchedule = {
  image: SiteImageSource;
  imageAlt: string;
  formTitle: string;
  formSubtitle: string;
  /** Overlay copy on the image card; `bold` segments render heavier. */
  textSegments: ReadonlyArray<{ text: string; bold?: boolean }>;
};

export type RidesharePricingContent = {
  hero: RidesharePricingHeroContent;
  acceptedBy: RidesharePricingAcceptedBy;
  howItWorks: RidesharePricingHowItWorks;
  band: RidesharePricingBandContent;
  plans: RidesharePricingPlansContent;
  schedule: RidesharePricingSchedule;
  testimonials: LocationTestimonialsProps;
  faq: LocationFaqProps;
  cta: RidesharePricingCtaContent;
};

// ─── Content ────────────────────────────────────────────────────────────────────

export const ridesharePricingContent: RidesharePricingContent = {
  hero: {
    eyebrow: "Rideshare Inspection Pricing",
    title: [
      { text: "Transparent " },
      { text: "pricing for Uber & Lyft", accent: true },
      { text: "driver inspections", newLine: true },
    ],
    subtitle:
      "No appointments. No garage visits. Complete your inspection from your phone and get certified the same day.",
    trustPills: [
      { icon: "star", label: "4.8 · 1667+ reviews" },
      { icon: "globe", label: "All 50 states" },
      { icon: "check", label: "Uber · Lyft · Turo certified" },
      { icon: "car", label: "50K+ inspections" },
      { icon: "savings", label: "$5M+ saved in inspection costs" },
    ],
  },

  // Logo strip right after the hero — "Certified inspections accepted by".
  // Held static here for now (mirrors the inspection-form page's `trust`
  // section); move to a Payload global when the pricing pages are CMS-managed.
  acceptedBy: {
    title: "Certified inspections accepted by",
    logos: [
      {
        src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-uber.png",
        alt: "Uber",
      },
      {
        src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-lyft.png",
        alt: "Lyft",
      },
      {
        src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-turo.png",
        alt: "Turo",
        className: "h-14 sm:h-16",
      },
      { src: "/logo-hopskipdrive.svg", alt: "HopSkipDrive" },
    ],
  },

  // "How it works" — reuse the section from the rideshare inspection service
  // screen (HomeHowItWorks): 4-card layout, same copy as that page.
  howItWorks: {
    title: "How it works",
    description:
      "With a user-friendly app and comprehensive dashboard, Get your certified rideshare vehicle inspection done in four simple steps — no appointments, no paperwork, no delays",
    steps: [
      {
        title: "Register",
        description:
          "Please register your account by filling out the form above to get started",
        image:
          "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/step-1.png",
      },
      {
        title: "Complete Inspection",
        description:
          "Follow the instructions for each inspection point within our app and upload photo and video clips",
        image:
          "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/step-2.png",
      },
      {
        title: "Complete Payment",
        description:
          "Enter payment details. If you don't pass, your first re-inspection is free",
        image:
          "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/step-3.png",
      },
      {
        title: "Same-day Certification",
        description:
          "All certifications completed within 4 hours or less. Downloadable verification in-app",
        image:
          "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/step-4.png",
      },
    ],
  },

  band: {
    title: "Every inspection includes",
    items: [
      {
        icon: "clock",
        title: "Same-day results",
        subtitle: "Certified in 4 hours or less",
      },
      {
        icon: "calendar",
        title: "No appointments",
        subtitle: "Inspect anytime, anywhere",
      },
      {
        icon: "scan",
        title: "AI damage detection",
        subtitle: "Machine-learning accuracy",
      },
      {
        icon: "refresh",
        title: "Free re-inspection",
        subtitle: "If you don't pass the first time",
      },
    ],
  },

  plans: {
    eyebrow: "rideshare vehicle inspection plans",
    title: "Choose the plan that fits your driving",
    cards: [
      {
        id: "basic",
        badge: "BASIC INSPECTION",
        price: "$29.99",
        priceSuffix: "/ inspection",
        subLabel: "Single inspection for one company",
        features: [
          "Results within 4 hours",
          "Verified certification in-app",
          "First re-inspection free",
        ],
        ctaLabel: "Apply for Inspection",
        ctaHref: "#signup",
        tone: "accent",
      },
      {
        id: "plus",
        badge: "PLUS INSPECTION",
        ribbon: "MOST POPULAR",
        price: "$47.98",
        priceSuffix: "/ bundle",
        subLabel: "Any two companies, same inspection",
        features: [
          "Everything in Basic",
          "Covers two companies at once",
          "$17.99 per additional company",
          "Priority support",
        ],
        footnote: "Save $12 vs. two separate inspections",
        ctaLabel: "Apply for Inspection",
        ctaHref: "#signup",
        tone: "dark",
      },
    ],
    note: "All plans include a downloadable certificate accepted by major rideshare companies.",
    additionalCompanyBadge: { amount: "$17.99", label: "for additional company" },
  },

  // Schedule section — blue image card (overlay copy) on the left, the
  // "Start My Inspection" signup form (reused from the inspection-form page) on
  // the right.
  schedule: {
    image: "/rideshare-schedule-bg.jpg",
    imageAlt: "Rideshare vehicle inspection",
    formTitle: "Start My Inspection",
    formSubtitle: "Create your free account — get certified the same day.",
    textSegments: [
      { text: "To schedule your inspection, " },
      { text: "fill out this form", bold: true },
      {
        text: " and specify the type of inspection you need (i.e. Lyft or Uber, or both)",
      },
    ],
  },

  // "Feedback from our verified clients" — reuse the DSP fleet pricing page's
  // testimonials section. The route overrides this with the shared landing
  // testimonials at request time (same as the DSP page).
  testimonials: dspPricingContent.testimonials,

  // FAQ — same UI as the DSP fleet pricing page (LocationFaq), rideshare copy.
  faq: {
    idBase: "rideshare-pricing",
    title: "Frequently asked questions",
    description:
      "Everything you need to know about rideshare inspections, pricing and certification. Still have a question? We're here to help.",
    items: [
      {
        question: "How often should I get my rideshare vehicle inspected?",
        answer:
          "As of March 2026, federal and state mandates require electronic Driver Vehicle Inspection Reports (eDVIRs) to include time-stamped, high-resolution visual evidence of vehicle health. Chex.ai automates this by integrating artificial intelligence vehicle detection directly into your reporting software, ensuring every fleet vehicle in the I-85 corridor is audit-ready and 100% compliant.",
      },
      {
        question: "What items are checked during inspection?",
        answer:
          "The inspection covers all the standard rideshare safety points — brakes, tires, steering and suspension, lights and signals, seat belts, windshield and wipers, horn, mirrors, and overall body condition. You capture guided photos and short clips of each point from your phone.",
      },
      {
        question: "Can I fail a rideshare inspection?",
        answer:
          "Yes. If a required item doesn't meet the safety standard, your vehicle won't pass — but you'll get a clear list of what needs attention, and your first re-inspection is free once it's fixed.",
      },
      {
        question: "What documents do I need for inspection?",
        answer:
          "You'll need your vehicle's basic details and a valid registration. No printed forms or appointments are required — everything is submitted digitally through the Chex.AI app.",
      },
      {
        question: "What happens after I pass inspection?",
        answer:
          "Once you pass, your certificate is generated automatically and stored in your Chex.AI account. Download it or screenshot it and upload it to your Uber, Lyft or Turo driver profile — usually within 4 hours of submitting.",
      },
    ],
  },

  // Closing CTA — reuse the "Ready to modernize your inspections?" section from
  // the rideshare-inspection-service (home) page (HomeCallToAction).
  cta: {
    title: "Ready to modernize your inspections?",
    description:
      "Join the hundreds of automotive brands leading the AI revolution. Start your risk-free 14-day trial today.",
    secondaryLabel: "Start My Inspection",
  },
};
