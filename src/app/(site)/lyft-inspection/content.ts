import heroBg from "@/app/(site)/assets/rideshare/hero-bg.png";
import heroPreview from "@/app/(site)/assets/rideshare/hero-preview.png";
import logoLyft from "@/app/(site)/assets/rideshare/logo-lyft.png";
import logoTuro from "@/app/(site)/assets/rideshare/logo-turo.png";
import logoUber from "@/app/(site)/assets/rideshare/logo-uber.png";
import pricingLogoChex from "@/app/(site)/assets/rideshare/pricing-logo-chex.png";
import pricingLogoSecondary from "@/app/(site)/assets/rideshare/pricing-logo-secondary.png";
import backedUberExtra1 from "@/app/(site)/assets/rideshare/backed-uber-extra-1.png";
import backedUberExtra2 from "@/app/(site)/assets/rideshare/backed-uber-extra-2.png";
import backedUberExtra3 from "@/app/(site)/assets/rideshare/backed-uber-extra-3.png";

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
    backgroundImage: heroBg,
    previewImage: heroPreview,
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
      { src: logoUber, alt: "Uber" },
      { src: logoLyft, alt: "Lyft" },
      { src: logoTuro, alt: "Turo" },
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
            src: pricingLogoSecondary,
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
            src: pricingLogoChex,
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
            src: pricingLogoSecondary,
            alt: "Inspection",
            className: "h-10 w-auto object-contain sm:h-11",
          },
          {
            src: pricingLogoChex,
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
      { src: backedUberExtra1, alt: "Partner" },
      { src: backedUberExtra2, alt: "Partner" },
      { src: backedUberExtra3, alt: "Partner" },
    ],
  },
  featureBadges: sharedFeatureBadges,
  reviews: sharedReviews,
  faq: sharedFaq,
  community: sharedCommunityBanner,
  businessHelp: sharedBusinessHelp,
  about: sharedAbout,
};
