
import type { RideshareInspectionPageContent } from "@/app/(site)/components/rideshare/rideshare-inspection-page";
import {
  baseBackedCompanyLogos,
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
    variant: "uber-lyft",
    backgroundImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-bg-9eff7a5f.png",
    previewImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-preview.png",
    previewImageAlt: "Rideshare vehicle inspection preview",
    titleLead: "INSPECTION PLATFORM",
    titleHighlight: "Vehicle",
    description:
      "Our solution is designed for convenience.\nComplete inspection requirement online\nthrough your phone",
    ctaLabel: "Register your Inspection Today",
    ctaHref: "#signup",
    counterIcon: sharedAssets.counterIcon,
    counterIconAlt: "Inspections counter",
    counterLabel: "Rideshare",
    counterDescription:
      "drivers who have successfully completed their vehicle inspection with us!",
    partnerLogos: [
      { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-uber.png", alt: "Uber" },
      { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-lyft.png", alt: "Lyft" },
      { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-turo.png", alt: "Turo" },
    ],
  },
  inspectionProcess: sharedInspectionProcess,
  pricing: {
    title: "Pricing",
    description:
      "Convenience isn't the only benefit of using Chex.AI. We offer best pricing for all the Inspections along with best in class customer support",
    plans: [
      {
        name: "INSPECTION",
        price: "29.99",
        description: "Single Inspection",
        buttonLabel: "Apply for Inspection",
        buttonHref: "#signup",
        tone: "primary",
        logos: [
          {
            src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/pricing-logo-secondary.png",
            alt: "Inspection",
            className: "h-10 w-auto object-contain sm:h-11",
          },
        ],
      },
      {
        name: "INSPECTION",
        price: "29.99",
        description: "Single Inspection",
        buttonLabel: "Apply for Inspection",
        buttonHref: "#signup",
        tone: "primary",
        logos: [
          {
            src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/pricing-logo-chex.png",
            alt: "Chex inspection",
            className: "h-10 w-auto object-contain sm:h-11",
          },
        ],
      },
      {
        name: "PLUS INSPECTION",
        price: "47.98",
        description: "Bundle Inspection",
        buttonLabel: "Apply for Inspection",
        buttonHref: "#signup",
        tone: "accent",
        logos: [
          {
            src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/pricing-logo-secondary.png",
            alt: "Inspection",
            className: "h-10 w-auto object-contain sm:h-11",
          },
          {
            src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/pricing-logo-chex.png",
            alt: "Chex inspection",
            className: "h-10 w-auto object-contain sm:h-11",
          },
        ],
        showPlusBetweenLogos: true,
      },
    ],
    highlights: sharedPricingHighlights(sharedAssets.pricingCheck),
  },
  registration: sharedRegistrationForm,
  backedCompanies: {
    techstarsImage: sharedAssets.techstarsText,
    techstarsImageAlt: "techstars",
    logos: [
      ...baseBackedCompanyLogos,
      { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/backed-uber-extra-1.png", alt: "Partner" },
      { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/backed-uber-extra-2.png", alt: "Partner" },
      { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/backed-uber-extra-3.png", alt: "Partner" },
    ],
  },
  featureBadges: sharedFeatureBadges,
  reviews: sharedReviews,
  faq: sharedFaq,
  community: sharedCommunityBanner,
  businessHelp: sharedBusinessHelp,
  about: sharedAbout,
};
