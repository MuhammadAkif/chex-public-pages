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
      review: {
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjWyIPzxO6QX_Mfz0v9EI-OE_8c2CTdEP5YTGBmuSbp7R14UzS8=w90-h90-p-rp-mo-br100",
        name: "Brian & Jenni Cox",
        quote:
          "The app was easy to follow, the pictures showing what was required of me to take made is simple. Upload was fast. They responded quickly and had the inspection back within a half hour! Thank you. Well worth the money.",
        reviewLinkHref:
          "https://www.google.com/maps/contrib/101482175237927923921/reviews?hl=en",
        stars: 5,
      },
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
      review: {
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjUgkiaa3QnV0V_Bmr5NIIWb9Iln_qzC6MGn2oyWPKPrUn_iQcWX=w90-h90-p-rp-mo-br100",
        name: "Kelsey Proofreads",
        quote:
          "Process was simple, quick, and informative. They make sure you have an explanation and an example photo/video for what they're looking for. I got my results (certificate) about 20 minutes after completing my inspection. Thanks Chex.AI for making this quick and affordable without needing to leave my house.",
        reviewLinkHref:
          "https://www.google.com/maps/contrib/118299616300006148329/reviews?hl=en-US",
        stars: 5,
      },
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
      review: {
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjVJFsUnjoXM97k0bm-NFDyB3MFddxCZ7o8XCJVg-tP1tPU8qNzR=w90-h90-p-rp-mo-br100",
        name: "Eddie",
        quote:
          "Excellent! Turnaround time was quick. Inspection process is easy but thorough. Vehicle safety is ensured without cutting corners.",
        reviewLinkHref:
          "https://www.google.com/maps/contrib/114345880571708700297/reviews?hl=en-US",
        stars: 5,
      },
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
      review: {
        avatar:
          "https://lh3.googleusercontent.com/a-/ALV-UjUWwMwXd7KE3Vw6mCNL_5FX3BltwQ3WtTIsFuV1eOSyhb1JWpe8Dg=w90-h90-p-rp-mo-br100",
        name: "Paco Jacobo",
        quote:
          "Great fast service! Beats going all over town when you can have your inspection immediately from home and have an answer in less than an hour. Thanks CHEX for making my life easier",
        reviewLinkHref:
          "https://www.google.com/maps/contrib/117979325473418864616/reviews?hl=en",
        stars: 5,
      },
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
