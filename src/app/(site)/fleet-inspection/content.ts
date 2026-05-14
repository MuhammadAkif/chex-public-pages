import fleetHeroBg from "@/app/(site)/assets/fleet/hero-bg.png";
import fleetHeroImage from "@/app/(site)/assets/fleet/hero-image.png";
import fleetBadgeAdvanced from "@/app/(site)/assets/fleet/badge-advanced.png";
import fleetBadgeCost from "@/app/(site)/assets/fleet/badge-cost.png";
import fleetBadgeEasy from "@/app/(site)/assets/fleet/badge-easy.png";
import whyMobile from "@/app/(site)/assets/fleet/why-mobile.png";
import whyRecords from "@/app/(site)/assets/fleet/why-records.png";
import whyDashboard from "@/app/(site)/assets/fleet/why-dashboard.png";
import keyBenefitsImage from "@/app/(site)/assets/fleet/key-benefits.png";

import type { FleetPageContent } from "@/app/(site)/components/fleet/fleet-page";
import {
  sharedAbout,
} from "@/app/(site)/components/rideshare/shared-content";

export const pageContent: FleetPageContent = {
  hero: {
    backgroundImage: fleetHeroBg,
    previewImage: fleetHeroImage,
    previewImageAlt: "Fleet & DSP vehicles",
    titleHighlight: "Fleet & DSP",
    titleTail: "Vehicle inspections and Management Platform",
    ctaLabel: "Get Started",
    ctaHref: "/contact-us",
  },
  featureBadges: {
    badges: [
      {
        image: fleetBadgeEasy,
        imageAlt: "Easy and convenient",
        heading: "Easy & Convenient",
        description:
          "Chex.AI's fleet management solution modernizes operations and is easy to use",
      },
      {
        image: fleetBadgeAdvanced,
        imageAlt: "Advanced and efficient",
        heading: "Advanced & Efficient",
        description:
          "Our system uses machine learning technology to identify any vehicle issues. Digital copy of reports is auto generated",
      },
      {
        image: fleetBadgeCost,
        imageAlt: "Cost effective",
        heading: "Cost Effective",
        description:
          "We provide the best service at a lower cost when compared to competition",
      },
    ],
  },
  whyChex: {
    titleLead: "Why",
    titleHighlight: "Chex.AI",
    rows: [
      {
        heading: "Mobile Application",
        description:
          "Customizable app allows drivers to self inspect vehicles for annual safety, pre and post rides and for DVIR inspections",
        image: whyMobile,
        imageAlt: "Mobile application",
      },
      {
        heading: "Digital Record Keeping",
        description:
          "DVI Reports and Certificates are stored in app for easy access",
        image: whyRecords,
        imageAlt: "Digital record keeping",
      },
      {
        heading: "Partner Dashboard",
        description:
          "Chex.AI dashboard updates in real-time and is a great tool for asset management, data storage and analytics",
        image: whyDashboard,
        imageAlt: "Partner dashboard",
      },
    ],
  },
  keyBenefits: {
    titleLead: "Key",
    titleTail: "Benefits",
    intro: "Application with easy to use self inspection guide & tools for users.",
    highlight:
      "Easily integratable allowing businesses to perform and manage repeatable tasks.",
    details: [
      "Highly scalable technology enabling businesses to expand quicker.",
      "Reduces business overhead & operations cost.",
    ],
    image: keyBenefitsImage,
    imageAlt: "Key benefits",
  },
  pricing: {
    title: "Pricing",
    description: "Get the solution your business needs for an affordable price",
    priceValue: "5.49",
    priceCadence: "Per Vehicle Monthly",
    features: [
      "Unlimited Users",
      "Document Storage",
      "Customized Forms",
      "Reminders & Notifications",
      "ML Based Reviews",
      "Dashboard Access",
    ],
    ctaLabel: "Request a Demo",
    ctaHref: "/contact-us",
  },
  about: sharedAbout,
  techstarsLine: {
    leading: "A",
    word: "techstars",
    trailingHighlight: "_",
    trailing: "backed company",
  },
};
