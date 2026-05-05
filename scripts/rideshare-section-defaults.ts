import type { PricingRideShareSectionProps } from "../src/app/(site)/components/locations/pricing-rideshare-section";
import type { RegisterRideShareSectionProps } from "../src/app/(site)/components/locations/register-rideshare-section";

export const rideshareAssetURLs = {
  certificateIcon:
    "https://res.cloudinary.com/dgjordf6e/image/upload/v1741678084/certificate_1_1_jblg3b.png",
  completeInspectionIcon:
    "https://res.cloudinary.com/dgjordf6e/image/upload/v1741678085/consultation_1_d9xhv0.png",
  completeInspectionImage:
    "https://res.cloudinary.com/dgjordf6e/image/upload/v1741852203/Group_425_wruwdl.png",
  paymentImage:
    "https://res.cloudinary.com/dgjordf6e/image/upload/v1741928461/Group_429_1_f2i3xb.png",
  pricingHighlightIcon:
    "https://res.cloudinary.com/dgjordf6e/image/upload/v1741690512/Group_1000004770_d3sqac.png",
  registerIcon:
    "https://res.cloudinary.com/dgjordf6e/image/upload/v1741678085/registered_1_ympyrw.png",
  registerImage:
    "https://res.cloudinary.com/dgjordf6e/image/upload/v1741678085/Group_424_hurqzv.png",
  sameDayCertificationImage:
    "https://res.cloudinary.com/dgjordf6e/image/upload/v1741928461/Group_431_1_wfpb9p.png",
} as const;

export const defaultRegisterRideShareSection = {
  ctaHref: "#signup",
  ctaLabel: "Register your Inspection Today",
  eyebrow: "ride share",
  initialImage: rideshareAssetURLs.registerImage,
  initialImageAlt: "Chex.AI inspection registration preview",
  steps: [
    {
      description:
        "Please Register your account by filling out the form above to get started",
      icon: rideshareAssetURLs.registerIcon,
      iconAlt: "Registration icon",
      image: rideshareAssetURLs.registerImage,
      imageAlt: "Registration step preview",
      step: "Step 1",
      title: "Register",
    },
    {
      description:
        "Follow the instructions for each inspection point within our app and upload photo and video clips",
      icon: rideshareAssetURLs.completeInspectionIcon,
      iconAlt: "Inspection checklist icon",
      image: rideshareAssetURLs.completeInspectionImage,
      imageAlt: "Inspection completion step preview",
      step: "Step 2",
      title: "Complete Inspection",
    },
    {
      description:
        "Enter payment details. If you don't pass, your first re-inspection is free",
      icon: rideshareAssetURLs.certificateIcon,
      iconAlt: "Payment certification icon",
      image: rideshareAssetURLs.paymentImage,
      imageAlt: "Payment step preview",
      step: "Step 3",
      title: "Complete Payment",
    },
    {
      description:
        "All certifications completed within 4 hours or less. Downloadable verification in-app",
      icon: rideshareAssetURLs.certificateIcon,
      iconAlt: "Same-day certification icon",
      image: rideshareAssetURLs.sameDayCertificationImage,
      imageAlt: "Same-day certification step preview",
      step: "Step 4",
      title: "Same-day Certification",
    },
  ],
  title: "How Chex.ai Works Step by Step",
} satisfies RegisterRideShareSectionProps;

export const defaultPricingRideShareSection = {
  currencySymbol: "$",
  description:
    "Convenience isn't the only benefit of using Chex.AI. We offer best pricing for all the Inspections along with best in class customer support",
  highlightIcon: rideshareAssetURLs.pricingHighlightIcon,
  highlightIconAlt: "Inspection pricing highlight icon",
  highlights: [
    {
      text: "Inspection results within 4 hours",
    },
    {
      text: "Verified certification in-app",
    },
    {
      emphasis: "$17.99",
      emphasisTone: "accent",
      text: "for additional company",
    },
    {
      text: "No appointments needed",
    },
  ],
  plans: [
    {
      buttonHref: "#signup",
      buttonLabel: "Apply for Inspection",
      description: "Single Inspection",
      name: "Uber",
      price: "29.99",
      tone: "primary",
    },
    {
      buttonHref: "#signup",
      buttonLabel: "Apply for Inspection",
      description: "Single Inspection",
      name: "Lyft",
      price: "29.99",
      tone: "primary",
    },
    {
      buttonHref: "#signup",
      buttonLabel: "Apply for Inspection",
      description: "Bundle Inspection",
      name: "Uber + Lyft",
      price: "47.98",
      subDescription: "Any two companies for the same inspection",
      tone: "accent",
    },
  ],
  title: "Pricing",
} satisfies PricingRideShareSectionProps;
