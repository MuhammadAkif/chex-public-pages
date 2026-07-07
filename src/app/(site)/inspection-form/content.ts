import type { InspectionFormContent } from "@/app/(site)/components/inspection-form/inspection-form-page";

const S3 = "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com";

// The state table lists the official Uber & Lyft inspection form for each state
// (mirrored onto our S3 under `inspection-forms/`). Per platform a state is one
// of: `form` (downloadable PDF/image at `*FormUrl`), `none` (not required), or
// `note` (obtained elsewhere — text in `*Note`). The uniform Chex online path is
// still offered via the CTA under the table (#signup).
export const pageContent: InspectionFormContent = {
  hero: {
    eyebrow: "Uber & Lyft · State Inspection Forms",
    titleLead: "Your Uber & Lyft vehicle inspection form",
    titleHighlight: "for any state",
    description:
      "Need the official Uber or Lyft inspection form? Check your state's requirement below and take it to a local mechanic — or skip the paperwork entirely and complete your inspection online with Chex.AI in about 30 minutes, with same-day certification.",
    primaryCtaLabel: "Start My Inspection",
    primaryCtaHref: "#signup",
    secondaryCtaLabel: "Jump to state forms",
    secondaryCtaHref: "#forms",
    note: "No appointment · Results in 4 hours or less · Pay only when you pass",
    image: `${S3}/inspection-form-hero-preview.png`,
    imageAlt: "Uber vehicle inspection report preview",
  },
  trust: {
    title: "Certified inspections accepted by",
    logos: [
      { src: `${S3}/logo-uber.png`, alt: "Uber" },
      { src: `${S3}/logo-lyft.png`, alt: "Lyft" },
      { src: `${S3}/logo-turo.png`, alt: "Turo", className: "h-14 sm:h-16" },
      { src: "/logo-hopskipdrive.svg", alt: "HopSkipDrive" },
    ],
  },
  online: {
    eyebrow: "The faster way",
    title: "Skip the shop — get inspected online with Chex.AI",
    description:
      "Instead of printing a PDF and driving to a shop, capture your car from your phone. Our AI checks every angle and returns a certified inspection you can upload straight to your driver profile.",
    ctaLabel: "Start My Inspection",
    ctaHref: "#signup",
    image: `${S3}/vehicle-inspection-report.png`,
    imageAlt: "Certified Chex.AI vehicle inspection report",
    steps: [
      {
        title: "Register",
        description:
          "Create your account and tell us your car's basics — takes a minute.",
      },
      {
        title: "Capture your car",
        description:
          "Follow the on-screen prompts to take guided photos and short clips of each inspection point.",
      },
      {
        title: "Pay only if you pass",
        description:
          "Enter payment after your car clears. If it doesn't, your first re-inspection is free.",
      },
      {
        title: "Same-day certificate",
        description:
          "Get a verified certificate in about 4 hours — download it in-app and upload to Uber or Lyft.",
      },
    ],
  },
  localPrep: {
    eyebrow: "Prefer a local shop?",
    title: "The same form works at any local mechanic",
    paragraphs: [
      "If you'd rather use a local mechanic like Pep Boys or Jiffy Lube, bring the inspection form with you — the shop won't have it on hand. The form is the same across every state, so any Staples or Office Depot can print it if you don't have a printer.",
      "Remember, Uber and Lyft require a fresh inspection every year or 50,000 miles, whichever comes first — and again whenever you add a new vehicle to your profile.",
    ],
    ctaLabel: "Browse state requirements",
    ctaHref: "#forms",
    panelTitle: "What you'll need at the shop",
    panelItems: [
      "The printed inspection form (same for every state & platform)",
      "Valid vehicle registration and insurance",
      "Your car, reasonably clean, with all lights working",
      "Roughly 30–60 minutes of wait time",
      "Payment — most shops charge whether you pass or fail",
    ],
  },
  requirements: {
    eyebrow: "Before you inspect",
    title: "Uber & Lyft driver, vehicle & inspection requirements",
    description:
      "Getting approved has two parts: you qualify as a driver, and your car passes inspection. Some rules are universal; others are state-specific.",
    groups: [
      {
        title: "Driver requirements",
        bullets: [
          "At least 21 years old (18+ for Uber Eats)",
          "Pass a background check",
          "One year of U.S. driving experience — three years if you're under 23",
          "A valid Social Security number",
          "A driver's license for the state you'll drive in (some exceptions apply, e.g. military drivers)",
        ],
      },
      {
        title: "Vehicle requirements",
        bullets: [
          "4 doors",
          "5–8 seats with seatbelts, including the driver's",
          "Valid insurance listing you as a driver",
          "In-state registration (your name doesn't have to be on it)",
          "Passes a vehicle inspection",
          "No salvaged title",
        ],
      },
      {
        title: "The standard inspection points",
        intro:
          "Most states require these core checks. Some go further with 22-point, 25-point or stricter inspections, and a few require a newer car, no commercial branding, or a TNC/business license.",
        twoColumn: true,
        bullets: [
          "Headlights",
          "Tail lights",
          "Turn indicator lights",
          "Brake (stop) lights",
          "Foot brakes",
          "Emergency / parking brake",
          "Steering mechanism",
          "Windshield",
          "Driver & passenger seatbelts",
          "Rear window & other glass",
          "Windshield wipers",
          "Front seat adjustment",
          "Doors (open / close / lock)",
          "Horn",
          "Speedometer",
          "Bumpers",
          "Muffler & exhaust system",
          "Tires, including tread depth",
          "Interior & exterior mirrors",
        ],
      },
    ],
  },
  states: {
    eyebrow: "All 50 states + D.C.",
    title: "Download your Uber & Lyft state inspection form",
    description:
      "Planning to use a local mechanic? Find your state below and download the official Uber or Lyft inspection form — print it and take it with you, as the shop won’t have it on hand. The form is the same at any Staples or Office Depot if you don’t have a printer. Or skip the printout entirely and inspect online with Chex.AI.",
    ctaHref: "#signup",
    footnote:
      "Forms are provided for reference and requirements can change; always confirm the current form with Uber or Lyft before your inspection.",
    rows: [
    { name: "Alabama", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form-alabama.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-alabama.pdf` },
    { name: "Alaska", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Arizona", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form.pdf` },
    { name: "Arkansas", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form-arkansas-texas.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-arkansas.pdf` },
    { name: "California", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-california.pdf` },
    { name: "Colorado", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-colorado.pdf` },
    { name: "Connecticut", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Delaware", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form.pdf` },
    { name: "District of Columbia", uber: "note", uberNote: "Obtain inspection form from a licensed facility.", lyft: "note", lyftNote: "Obtain inspection form from a licensed facility." },
    { name: "Florida", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form.pdf` },
    { name: "Georgia", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form.pdf` },
    { name: "Hawaii", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "note", lyftNote: "In Honolulu, obtain inspection form. Anywhere else in Hawaii, an inspection is not required." },
    { name: "Idaho", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Illinois", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-illinois-minnesota-washington.pdf` },
    { name: "Indiana", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form.pdf` },
    { name: "Iowa", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form-2.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-iowa-nebraska.pdf` },
    { name: "Kansas", uber: "none", lyft: "none" },
    { name: "Kentucky", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form.pdf` },
    { name: "Louisiana", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "note", lyftNote: "Drivers are required to submit their Brake Tag sticker" },
    { name: "Maine", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Maryland", uber: "note", uberNote: "Form needs to be obtained from a state licensed facility. Must be a Virginia, Maryland, or Pennsylvania state inspection.", lyft: "note", lyftNote: "Form needs to be obtained from a state licensed facility. Must be a Virginia, Maryland, or Pennsylvania state inspection." },
    { name: "Massachusetts", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "note", lyftNote: "Get inspection form through a TNC registered inspection center." },
    { name: "Michigan", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-michigan.pdf` },
    { name: "Minnesota", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form-2.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-st-paul-minneapolis-minnesota.pdf` },
    { name: "Mississippi", uber: "none", lyft: "none" },
    { name: "Missouri", uber: "none", lyft: "none" },
    { name: "Montana", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Nebraska", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-iowa-nebraska.pdf` },
    { name: "Nevada", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form-nevada.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-nevada.jpg` },
    { name: "New Hampshire", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "note", lyftNote: "Obtain form through state Inspection center." },
    { name: "New Jersey", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "New Mexico", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-new-mexico.pdf` },
    { name: "New York", uber: "note", uberNote: "Receive inspection form at a TLC’s Safety & Emissions Facility.", lyft: "note", lyftNote: "Receive inspection form at a TLC’s Safety & Emissions Facility." },
    { name: "North Carolina", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form-north-carolina-south-carolina.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-north-carolina.pdf` },
    { name: "North Dakota", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Ohio", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form.pdf` },
    { name: "Oklahoma", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Oregon", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form.pdf` },
    { name: "Pennsylvania", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-pennsylvania.pdf` },
    { name: "Rhode Island", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "South Carolina", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form-north-carolina-south-carolina.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-south-carolina.pdf` },
    { name: "South Dakota", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Tennessee", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form-tennessee.png`, lyft: "none" },
    { name: "Texas", uber: "none", lyft: "none" },
    { name: "Utah", uber: "none", lyft: "none" },
    { name: "Vermont", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Virginia", uber: "note", uberNote: "Form needs to be obtained from a state licensed facility. Safety inspections from Virginia or Maryland are accepted.", lyft: "note", lyftNote: "Your vehicle inspection can be from Virginia, Maryland, or D.C." },
    { name: "Washington", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "form", lyftFormUrl: `${S3}/inspection-forms/lyft/lyft-vehicle-inspection-form-illinois-minnesota-washington.pdf` },
    { name: "West Virginia", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    { name: "Wisconsin", uber: "none", lyft: "none" },
    { name: "Wyoming", uber: "form", uberFormUrl: `${S3}/inspection-forms/uber/uber-vehicle-inspection-form.pdf`, lyft: "none" },
    ],
  },
  compare: {
    eyebrow: "Two ways to get it done",
    title: "Local mechanic vs. Chex.AI online",
    description:
      "Both get you a valid inspection. One means a printer, a drive and a wait — the other happens wherever your car is parked.",
    ctaLabel: "Start My Inspection",
    ctaHref: "#signup",
    local: {
      tag: "Local mechanic",
      title: "The shop route",
      steps: [
        "Call ahead to confirm they do rideshare inspections",
        "Check hours, address and walk-in policy",
        "Print the inspection form and book a time",
        "Drive over and wait while they inspect",
        "Pay — usually whether you pass or fail",
        "Photograph the form and upload it to your profile",
      ],
      foot: "Expect extra “recommendations” that aren't part of the rideshare inspection.",
    },
    chex: {
      badge: "Faster",
      tag: "Chex.AI online",
      title: "The phone route",
      steps: [
        "Register and enter your car's basics",
        "Follow guided prompts to capture each point on your phone",
        "AI reviews every angle and flags anything unclear",
        "Pay only if your car passes",
        "Get your certified inspection in about 4 hours",
        "Upload the certificate to Uber or Lyft — done",
      ],
      foot: "Done from your driveway, 7 days a week, no risk — you only pay when you pass.",
    },
  },
  reviews: {
    title: "Feedback from our verified clients",
    description: "We are happy when our customers are too.",
    label: "What Our Client Say About Us?",
    items: [
      {
        name: "Mark Melancon",
        quote:
          "The support team helped me when Uber was not accepting my inspection. Resolved it quickly and professionally.",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=11",
      },
      {
        name: "Kelsey Proofreads",
        quote:
          "Process was simple, quick, and informative. They make sure you have an explanation and an example photo/video for what they're looking for. I got my results (certificate) about 20 minutes after completing my inspection. Thanks Chex.AI for making this quick and affordable without needing to leave my house.",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=5",
      },
      {
        name: "Mary Lugo",
        quote:
          "Quick and easy to use. The interface made everything straightforward from start to finish.",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=9",
      },
      {
        name: "Mubarak Behi",
        quote:
          "Quick and efficient! Great price and easy to upload all photos and videos required. Will definitely recommend and use it next year!",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=15",
      },
      {
        name: "Angela Bishop",
        quote:
          "Chex.ai was really easy to use, better than going to the mechanic!",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=23",
      },
      {
        name: "Ali Alshammari",
        quote:
          "Rideshare for five years now I have tried other services and this is by far the best! Easiest to complete and lowest price that I've seen out there.",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=33",
      },
      {
        name: "Hovannss Kupelyan",
        quote:
          "Positive Value. Got my inspection done in under 10 minutes. Highly recommend to any rideshare driver.",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=52",
      },
      {
        name: "Slamnjamin Dio",
        quote:
          "Excellent customer service!!! They walked me through every step and made sure I was fully certified before the end of the day.",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=60",
      },
      {
        name: "Mousa Naseer",
        quote:
          "The app was easy to follow, the pictures showing what was required of me to take made it simple. Upload was fast. They responded quickly and had the inspection back within a half hour! Thank you. Well worth the money.",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=67",
      },
      {
        name: "Andressa Amorim",
        quote:
          "Chexai was really easy to use, better than going to the mechanic!",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=44",
      },
      {
        name: "James Tillman",
        quote:
          "It beats scheduling an appointment with a mechanic. A handful of snapshots and a few minutes of your time and you're done.",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=70",
      },
      {
        name: "Sofia Reyes",
        quote:
          "I've been using Chex.AI for two years straight. Every renewal is just as smooth as the first time.",
        stars: 5,
        avatar: "https://i.pravatar.cc/100?img=47",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Do I download a form, or inspect online?",
        answer:
          "Either works. The inspection form is the same for every state — if you're going to a local mechanic, print it and take it along. If you'd rather stay home, register with Chex.AI and complete the whole inspection from your phone with no printout needed.",
      },
      {
        question: "Does my state require an inspection?",
        answer:
          "Find your state in the table above and choose the Uber or Lyft column. Some states — like Texas, Utah and Mississippi — don't require an inspection at all, and a few use a state facility or TLC/TNC center instead of a form.",
      },
      {
        question: "How much does a Chex.AI inspection cost?",
        answer:
          "A single inspection is $29.99. The bundle covers any two companies for the same inspection at $47.98, with additional companies at $17.99 each. You only pay once your car passes.",
      },
      {
        question: "Is a Chex.AI inspection accepted by Uber and Lyft?",
        answer:
          "Yes. Chex.AI produces standardized, timestamped certificates accepted by major rideshare platforms — including Uber, Lyft, Turo and HopSkipDrive — in supported states. You'll get a downloadable certificate to upload to your driver profile.",
      },
      {
        question: "How long does the inspection take?",
        answer:
          "Capturing your car takes about 30 minutes, and your certified result is ready in 4 hours or less — with no appointment required.",
      },
      {
        question: "How often do I need an inspection?",
        answer:
          "Uber and Lyft require a new inspection every year or 50,000 miles, whichever comes first, and whenever you add a new vehicle to your profile.",
      },
    ],
  },
  cta: {
    title: "Ready to get certified from your phone?",
    description:
      "Take the same inspection form to a local shop — or skip the trip and inspect online with Chex.AI. Same-day certification, and you only pay when you pass.",
    ctaLabel: "Start My Inspection",
    ctaHref: "#signup",
    stats: [
      { value: "50k+", label: "Inspections conducted" },
      { value: "4hrs", label: "Or less to certify" },
      { value: "$5M+", label: "Saved for drivers" },
    ],
  },
};
