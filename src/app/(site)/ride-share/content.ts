
import type { RideshareInspectionPageContent } from "@/app/(site)/components/rideshare/rideshare-inspection-page";
import {
  baseBackedCompanies,
  sharedAbout,
  sharedAssets,
  sharedBusinessHelp,
  sharedCommunityBanner,
  sharedFaq,
  sharedFeatureBadges,
  sharedInspectionProcess,
  sharedPricingHighlights,
  sharedRegistrationForm,
  sharedReviews,
} from "@/app/(site)/components/rideshare/shared-content";

export const pageContent: RideshareInspectionPageContent = {
  hero: {
    variant: "rideshare",
    backgroundImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-bg-9eff7a5f.png",
    previewImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-preview.png",
    previewImageAlt: "Rideshare vehicle inspection preview",
    titleLead: "INSPECTION PLATFORM",
    titleHighlight: "Vehicle",
    description:
      "Our solution is designed for convenience. Complete inspection requirement online through your phone",
    ctaLabel: "Register your Inspection Today",
    ctaHref: "#signup",
    counterIcon: sharedAssets.counterIcon,
    counterIconAlt: "Inspections counter",
    counterLabel: "Rideshare",
    counterDescription:
      "drivers who have successfully completed their vehicle inspection with us!",
  },
  inspectionProcess: sharedInspectionProcess,
  pricing: {
    title: "Pricing",
    description:
      "Convenience isn't the only benefit of using Chex.AI. We offer best pricing for all the Inspections along with best in class customer support",
    plans: [
      {
        name: "BASIC\nINSPECTION",
        price: "29.99",
        description: "Single Inspection",
        buttonLabel: "Apply for Inspection",
        buttonHref: "#signup",
        tone: "primary",
      },
      {
        name: "PLUS\nINSPECTION",
        price: "47.98",
        description: "Bundle Inspection",
        subDescription: "Any two companies for the same inspection",
        buttonLabel: "Apply for Inspection",
        buttonHref: "#signup",
        tone: "accent",
      },
    ],
    highlights: sharedPricingHighlights(sharedAssets.pricingCheck),
  },
  registration: sharedRegistrationForm,
  backedCompanies: baseBackedCompanies,
  featureBadges: sharedFeatureBadges,
  reviews: sharedReviews,
  faq: sharedFaq,
  community: sharedCommunityBanner,
  businessHelp: sharedBusinessHelp,
  about: sharedAbout,
};
