
import type { FleetPageContent } from "@/app/(site)/components/fleet/fleet-page";
import {
  sharedAbout,
} from "@/app/(site)/components/rideshare/shared-content";

export const pageContent: FleetPageContent = {
  hero: {
    backgroundImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-bg.png",
    previewImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-image.png",
    previewImageAlt: "Fleet & DSP vehicles",
    titleHighlight: "Fleet & DSP",
    titleTail: "Vehicle inspections and Management Platform",
    ctaLabel: "Get Started",
    ctaHref: "/contact-us",
  },
  featureBadges: {
    badges: [
      {
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/badge-easy.png",
        imageAlt: "Easy and convenient",
        heading: "Easy & Convenient",
        description:
          "Chex.AI's fleet management solution modernizes operations and is easy to use",
      },
      {
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/badge-advanced.png",
        imageAlt: "Advanced and efficient",
        heading: "Advanced & Efficient",
        description:
          "Our system uses machine learning technology to identify any vehicle issues. Digital copy of reports is auto generated",
      },
      {
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/badge-cost.png",
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
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/why-mobile.png",
        imageAlt: "Mobile application",
      },
      {
        heading: "Digital Record Keeping",
        description:
          "DVI Reports and Certificates are stored in app for easy access",
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/why-records.png",
        imageAlt: "Digital record keeping",
      },
      {
        heading: "Partner Dashboard",
        description:
          "Chex.AI dashboard updates in real-time and is a great tool for asset management, data storage and analytics",
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/why-dashboard.png",
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
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/key-benefits.png",
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
    detailsLabel: "View detailed pricing",
    detailsHref: "/dsp-fleet-pricing",
  },
  about: sharedAbout,
  techstarsLine: {
    leading: "A",
    word: "techstars",
    trailingHighlight: "_",
    trailing: "backed company",
  },
};
