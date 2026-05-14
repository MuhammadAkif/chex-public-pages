import type { ReactNode } from "react";
import { createElement, Fragment } from "react";

import type { SiteImageSource } from "@/app/(site)/components/shared/site-image";


import type { AboutChexProps } from "@/app/(site)/components/rideshare/about-chex";
import type { BackedCompaniesProps } from "@/app/(site)/components/rideshare/backed-companies";
import type { BusinessHelpProps } from "@/app/(site)/components/rideshare/business-help";
import type { CommunityBannerProps } from "@/app/(site)/components/rideshare/community-banner";
import type { CustomerReviewsProps } from "@/app/(site)/components/rideshare/customer-reviews";
import type { FeatureBadgesProps } from "@/app/(site)/components/rideshare/feature-badges";
import type { InspectionProcessProps } from "@/app/(site)/components/rideshare/inspection-process";
import type { RegistrationFormProps } from "@/app/(site)/components/rideshare/registration-form";
import type { RideshareFaqProps } from "@/app/(site)/components/rideshare/rideshare-faq";

export const sharedAssets = {
  counterIcon: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/counter-icon.png",
  registrationFormBg: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/registration-form-bg.png",
  aboutPoster: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/about-poster.png",
  techstarsText: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/techstars-text.png",
  businessHelpImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/business-help.png",
  pricingCheck: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/group-1000004770-d3sqac.png",
};

export const ABOUT_VIDEO_SRC =
  "https://res.cloudinary.com/dgjordf6e/video/upload/v1695888050/CHex_ai_je0una.mp4";

export const sharedInspectionProcess: InspectionProcessProps = {
  eyebrow: "ride share",
  title: "All You Need to Know About the Chex.AI Inspection Process",
  ctaLabel: "Register your Inspection Today",
  ctaHref: "#signup",
  steps: [
    {
      step: "Step 1",
      title: "Register",
      description:
        "Please Register your account by filling out the form above to get started",
      icon: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/registered-1-ympyrw.png",
      iconAlt: "Register icon",
      image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/group-424-hurqzv.png",
      imageAlt: "Register your account",
    },
    {
      step: "Step 2",
      title: "Complete Inspection",
      description:
        "Follow the instructions for each inspection point within our app and upload photo and video clips",
      icon: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/consultation-1-d9xhv0.png",
      iconAlt: "Inspection icon",
      image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/group-425-wruwdl.png",
      imageAlt: "Complete your inspection",
    },
    {
      step: "Step 3",
      title: "Complete Payment",
      description:
        "Enter payment details. If you don't pass, your first re-inspection is free",
      icon: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/certificate-1-1-jblg3b.png",
      iconAlt: "Payment icon",
      image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/group-429-1-f2i3xb.png",
      imageAlt: "Complete your payment",
    },
    {
      step: "Step 4",
      title: "Same-day Certification ",
      description:
        "All certifications completed within 4 hours or less. Downloadable verification in-app",
      icon: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/certificate-1-1-jblg3b.png",
      iconAlt: "Certification icon",
      image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/group-431-1-wfpb9p.png",
      imageAlt: "Same-day certification",
    },
  ],
};

export const sharedRegistrationForm: RegistrationFormProps = {
  heading: "You Can Manage & Inspect Your Car Online",
  formHeadingLead: "Sign up",
  formHeadingHighlight: "and start",
  formHeadingTail: "vehicle inspection",
  submitLabel: "Register",
  termsLabel: "By checking the box, you accept our",
  termsLinkLabel: "Terms of Use.",
  termsHref: "/termsAndPolicy?uber=true",
  loginPrompt: "Already have an account?",
  loginLinkLabel: "Login.",
  loginHref: "/login",
  backgroundImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/registration-form-bg.png",
  backgroundImageAlt: "Car inspection background",
};

export const sharedFeatureBadges: FeatureBadgesProps = {
  title: "Benefits we Propose",
  badges: [
    {
      image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/badge-easy-2b57d2a4.png",
      imageAlt: "Easy and convenient",
      heading: "Easy & Convenient",
      description:
        "Chex.AI's mobile web app is designed for you to conduct inspections at your convenience",
    },
    {
      image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/badge-advanced-7fc01220.png",
      imageAlt: "Advanced and efficient",
      heading: "Advanced & Efficient",
      description:
        "Our system uses machine learning technology which gives you results instantly",
    },
    {
      image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/badge-cost-822fde0a.png",
      imageAlt: "Cost effective",
      heading: "Cost Effective",
      description:
        "We provide the best service at a lower cost when compared to competition",
    },
  ],
};

export const sharedReviews: CustomerReviewsProps = {
  title: "Feedback from our Verified Clients",
  subtitle: "We are happy when our customers are too.",
  reviews: [
    {
      reviewText:
        "The app was easy to follow, the pictures showing what was required of me to take made is simple. Upload was fast. They responded quickly and had the inspection back within a half hour! Thank you. Well worth the money.",
      reviewerName: "Mousa Naseer",
      ratingStar: 5,
    },
    {
      reviewText:
        "Chex.ai was really easy to use, better than going to the mechanic!",
      reviewerName: "Andressa Amorim",
      ratingStar: 5,
    },
    {
      reviewText:
        "Quick and efficient! Great price and easy to upload all photos and videos required. Will definitely recommend and use it next year!",
      reviewerName: "Mubarak Behi",
      ratingStar: 5,
    },
    {
      reviewText:
        "This is an awesome service. They have made it so easy that a child could do it. I’ve been doing Rideshare for five years now I have tried other services and this is by far the best! Easiest to complete and lowest price that I’ve seen out there.",
      reviewerName: "Ali Alshammari",
      ratingStar: 5,
    },
    {
      reviewText:
        "Easy, app based Turo vehicle inspection. I had an issue and had to call support. The phone was picked up immediately by a person. Excellent service. I would definitely use Chex.AI again!",
      reviewerName: "Sal Villa",
      ratingStar: 5,
    },
  ],
};

const faqRegisterLink: ReactNode = createElement(
  "a",
  {
    href: "https://www.chex.ai/register",
    className: "text-[#1368b9] underline",
  },
  "https://www.chex.ai/register",
);

const firstFaqAnswer: ReactNode = createElement(
  Fragment,
  null,
  "You can use our online platform for your Uber and Lyft inspection. Please register your account at ",
  faqRegisterLink,
  " and follow the instructions to upload photos and videos from your phone. Once you submit, we'll prepare the certificate for you to upload to your Uber/Lyft account.",
);

export const sharedFaq: RideshareFaqProps = {
  title: "Frequently asked questions",
  items: [
    {
      question: "I need car inspection for Uber/Lyft?",
      answer: firstFaqAnswer,
    },
    {
      question: "How much does an inspection cost through Chex.AI?",
      answer:
        "We charge $29.99 for a single inspection. If you want to bundle it with multiple inspections it will be additional $17.99 for each. You can find details on service fee on our website.",
    },
    {
      question: "Is your inspection accepted by ridesharing companies?",
      answer:
        "Yes, we are certified to conduct vehicle inspections for rideshare and car-sharing companies and have completed thousands of inspections.",
    },
    {
      question: "I don't see my state in the inspection states list.",
      answer:
        "Unfortunately, we are not authorized to conduct inspections in all 50 states. States missing from the list are the ones where we don’t operate. We update the list regularly and may add states as we get approvals.",
    },
    {
      question: "Do I need to set up an appointment to get my car inspected?",
      answer:
        "No, all inspections are done through your smartphone. All you need to do is register your account, start an inspection and upload photos and short video clips at your convenience, from any location of your choice.",
    },
    {
      question:
        "What happens after I upload all the inspection items (Photos and Videos)?",
      answer:
        "Once you upload all the inspection items, our inspectors review those and our system automatically generates certificates for you.",
    },
    {
      question: "How do I get my certificate?",
      answer:
        "You will receive an email confirming that the certificate is ready. All certificates are stored in your Chex.AI account and can be accessed in the “Certificates” section of the homepage.",
    },
    {
      question: "What should I do after I get my certificate?",
      answer:
        "You will have to either download the PDF or take a screenshot of the certificate and upload it into your rideshare company account. We also send a copy of the certificate in an email directly to some of our ride sharing partners.",
    },
  ],
};

export const sharedCommunityBanner: CommunityBannerProps = {
  title: "Our Community of Chex.AI is Trending Fast",
  stats: [
    { value: "1000+", label: "Customers" },
    { value: "5+", label: "Years Of Experience" },
    { value: "20+", label: "Companies" },
  ],
};

export const sharedBusinessHelp: BusinessHelpProps = {
  titleLead: "How can we help your?",
  titleHighlight: "business?",
  description:
    "We can help your business optimize asset inspection process. Our interactive dashboard allows you to review data in real time and provide feedback to your customers instantaneously!",
  buttonLabel: "Contact Us",
  buttonHref: "/contact-us",
  image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/business-help.png",
  imageAlt: "Business help",
};

export const sharedAbout: AboutChexProps = {
  title: "About Chex.AI",
  description:
    "Chex.AI revolutionizes vehicle safety inspection with its cutting-edge platform, employing advanced damage detection technology. Businesses benefit from real-time insights, spotting any new vehicle damage instantly. With a user-friendly app and comprehensive dashboard, Chex.AI streamlines inspection reviews and provides detailed insights, enhancing operational efficiency and safety standards.",
  videoPoster: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/about-poster.png",
  videoPosterAlt: "Chex.AI demo video",
  videoSrc: ABOUT_VIDEO_SRC,
};

export const baseBackedCompanyLogos: BackedCompaniesProps["logos"] = [
  { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-adroit.png", alt: "Backing partner 1" },
  { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-oxo.png", alt: "Backing partner 2" },
  { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-carepool.png", alt: "Carepool" },
  { src: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-zum.png", alt: "Backing partner 4" },
];

export const baseBackedCompanies: BackedCompaniesProps = {
  techstarsImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/techstars-text.png",
  techstarsImageAlt: "techstars",
  logos: baseBackedCompanyLogos,
};

export const sharedPricingHighlights = (icon: SiteImageSource) =>
  [
    {
      icon,
      iconAlt: "Inspection check",
      text: "Inspection results within 4 hours",
    },
    {
      icon,
      iconAlt: "Inspection check",
      emphasis: "$17.99",
      emphasisTone: "accent" as const,
      text: "for additional company",
    },
    {
      icon,
      iconAlt: "Inspection check",
      text: "Verified certification in-app",
    },
    {
      icon,
      iconAlt: "Inspection check",
      text: "No appointments needed",
    },
  ];
