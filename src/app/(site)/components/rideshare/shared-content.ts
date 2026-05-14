import type { ReactNode } from "react";
import { createElement, Fragment } from "react";

import type { SiteImageSource } from "@/app/(site)/components/shared/site-image";

import aboutPoster from "@/app/(site)/assets/rideshare/about-poster.png";
import backed1 from "@/app/(site)/assets/rideshare/backed-1.png";
import backed2 from "@/app/(site)/assets/rideshare/backed-2.png";
import backedCarepool from "@/app/(site)/assets/rideshare/backed-carepool.png";
import backed4 from "@/app/(site)/assets/rideshare/backed-4.png";
import badgeAdvanced from "@/app/(site)/assets/rideshare/badge-advanced.png";
import badgeCost from "@/app/(site)/assets/rideshare/badge-cost.png";
import badgeEasy from "@/app/(site)/assets/rideshare/badge-easy.png";
import businessHelpImage from "@/app/(site)/assets/rideshare/business-help.png";
import counterIcon from "@/app/(site)/assets/rideshare/counter-icon.png";
import pricingCheck from "@/app/(site)/assets/rideshare/pricing-check.png";
import registrationFormBg from "@/app/(site)/assets/rideshare/registration-form-bg.png";
import step1Image from "@/app/(site)/assets/rideshare/step1-image.png";
import step1Icon from "@/app/(site)/assets/rideshare/step1-register-icon.png";
import step2Image from "@/app/(site)/assets/rideshare/step2-image.png";
import step2Icon from "@/app/(site)/assets/rideshare/step2-inspect-icon.png";
import step3Image from "@/app/(site)/assets/rideshare/step3-image.png";
import step3Icon from "@/app/(site)/assets/rideshare/step3-certificate-icon.png";
import step4Image from "@/app/(site)/assets/rideshare/step4-image.png";
import techstarsText from "@/app/(site)/assets/rideshare/techstars-text.png";

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
  counterIcon,
  registrationFormBg,
  aboutPoster,
  techstarsText,
  businessHelpImage,
  pricingCheck,
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
      icon: step1Icon,
      iconAlt: "Register icon",
      image: step1Image,
      imageAlt: "Register your account",
    },
    {
      step: "Step 2",
      title: "Complete Inspection",
      description:
        "Follow the instructions for each inspection point within our app and upload photo and video clips",
      icon: step2Icon,
      iconAlt: "Inspection icon",
      image: step2Image,
      imageAlt: "Complete your inspection",
    },
    {
      step: "Step 3",
      title: "Complete Payment",
      description:
        "Enter payment details. If you don't pass, your first re-inspection is free",
      icon: step3Icon,
      iconAlt: "Payment icon",
      image: step3Image,
      imageAlt: "Complete your payment",
    },
    {
      step: "Step 4",
      title: "Same-day Certification ",
      description:
        "All certifications completed within 4 hours or less. Downloadable verification in-app",
      icon: step3Icon,
      iconAlt: "Certification icon",
      image: step4Image,
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
  backgroundImage: registrationFormBg,
  backgroundImageAlt: "Car inspection background",
};

export const sharedFeatureBadges: FeatureBadgesProps = {
  title: "Benefits we Propose",
  badges: [
    {
      image: badgeEasy,
      imageAlt: "Easy and convenient",
      heading: "Easy & Convenient",
      description:
        "Chex.AI's mobile web app is designed for you to conduct inspections at your convenience",
    },
    {
      image: badgeAdvanced,
      imageAlt: "Advanced and efficient",
      heading: "Advanced & Efficient",
      description:
        "Our system uses machine learning technology which gives you results instantly",
    },
    {
      image: badgeCost,
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
  image: businessHelpImage,
  imageAlt: "Business help",
};

export const sharedAbout: AboutChexProps = {
  title: "About Chex.AI",
  description:
    "Chex.AI revolutionizes vehicle safety inspection with its cutting-edge platform, employing advanced damage detection technology. Businesses benefit from real-time insights, spotting any new vehicle damage instantly. With a user-friendly app and comprehensive dashboard, Chex.AI streamlines inspection reviews and provides detailed insights, enhancing operational efficiency and safety standards.",
  videoPoster: aboutPoster,
  videoPosterAlt: "Chex.AI demo video",
  videoSrc: ABOUT_VIDEO_SRC,
};

export const baseBackedCompanyLogos: BackedCompaniesProps["logos"] = [
  { src: backed1, alt: "Backing partner 1" },
  { src: backed2, alt: "Backing partner 2" },
  { src: backedCarepool, alt: "Carepool" },
  { src: backed4, alt: "Backing partner 4" },
];

export const baseBackedCompanies: BackedCompaniesProps = {
  techstarsImage: techstarsText,
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
