import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

export const southCarolinaContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_9%,#ffffff_22%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'Chex.Ai: The Professional Choice For Automotive Diagnostics AI in SC.',
    description:
      "CHEX.AI's Car Damage Recognition is an advanced AI solution that instantly detects dents, scratches, and body defects in vehicles using smartphone photos.",
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#south-carolina-demo',
    layoutClassName: 'lg:grid-cols-[0.98fr_1fr] lg:gap-14',
    ratingContainerClassName:
      'rounded-full bg-white/80 px-5 py-2 shadow-[0_20px_60px_-36px_rgba(19,104,185,0.35)]',
    titleClassName: 'type-location-hero max-w-3xl',
    descriptionClassName: 'max-w-2xl',
    stats: [
      { value: '1000+', label: 'Customers' },
      { value: '5+', label: 'Years of Experience' },
      { value: '20+', label: 'Companies' },
    ],
    locations: [
      { label: 'South Carolina', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-south-carolina.png", featured: true },
      { label: 'New Mexico', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-new-mexico.png", featured: false },
      { label: 'California', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-california-580863c8.png", featured: false },
      { label: 'Nebraska', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-nebraska.png", featured: false },
      { label: 'Alabama', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-alabama.png", featured: false },
      { label: 'Iowa', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-iowa-155a803a.png", featured: false },
      { label: 'Colorado', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-colorado.png", featured: false },
    ],
  },
  overview: {
    title: 'Reliable Vehicle Data for Charleston, Columbia, and Greenville Teams',
    paragraphs: [
      'If you are running a business, you know that bad data costs money. At Chex.ai, we have moved away from the old way of doing inspections. Instead of waiting at a shop for a manual check that might be biased, we use artificial intelligence vehicle detection to give you a clear, high-resolution report.',
      'We have focused on integrating smart diagnostics into a simple process that removes human variability, so you get the facts you need to keep your work moving across Charleston, Columbia, and Greenville.',
    ],
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/overview-vehicle.png",
    imageAlt: 'South Carolina vehicle diagnostics',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#south-carolina-demo',
    items: [
      {
        title: 'Fleet Management: Automated Compliance That Keeps You Moving',
        description:
          'Managing a fleet across the I-85 corridor or the Port of Charleston requires a forensic level of detail. Our inspection reporting software is engineered to provide exactly that, without the downtime of a traditional garage.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/service-fleet.png",
      },
      {
        title: 'Rideshare: Certified and Ready to Drive in Minutes',
        description:
          "For drivers in Charleston, Columbia, and Greenville, getting your car cleared should not be a problem. Our car inspection app is the straightest line to getting back on the app. We run a 19-point digital scan that checks exactly what South Carolina regulators require.",
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/service-rideshare.png",
        reverse: true,
      },
      {
        title: 'Uber Inspection Online: Your Driveway Is the New Shop',
        description:
          'Keeping your Uber status in South Carolina should not cost you a day of earnings. Our artificial intelligence vehicle detection walks you through a full 19-point scan using just your phone. We make sure you are road-ready from the Upstate to the Lowcountry.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/service-uber.png",
      },
    ],
  },
  showcase: {
    title: 'Experience the Future of Automotive Intelligence.',
    description:
      'From the busy logistics hubs in Greenville to the coastal delivery routes in Charleston, Chex.ai is more than just a tool, it is a complete automated system for maintaining vehicle health and 2026 compliance.',
    buttonLabel: 'Book a demo',
    demoHref: '#south-carolina-demo',
    items: [
      {
        number: '01',
        title: 'AI automotive diagnostics',
        description:
          'Our automotive diagnostics AI was built to solve that specific problem. We provide a bridge between strict state regulations and your need for operational speed.',
      },
      {
        number: '02',
        title: 'Seamless Integration',
        description:
          'By integrating deep-learning technology with a simple smartphone interface, we have made it possible to get a professional-grade inspection without the logistical headache of traditional garages.',
      },
      {
        number: '03',
        title: 'Continuous Improvement',
        description:
          'We are committed to keeping the Palmetto State moving by providing the data you need to stay safe, stay legal, and stay on the road.',
      },
      {
        number: '04',
        title: 'Efficiency at Scale',
        description:
          'Built for high-demand industries, our AI processes thousands of claims daily while also identifying salvaged parts for repair. Scalable across global markets, it transforms workflows.',
      },
    ],
    visual: {
      variant: 'preview',
      label: 'Automotive Intelligence Preview',
    },
  },
  regions: {
    title: 'South Carolina Environmental Diagnostics',
    description:
      'Vehicle wear is not uniform across the state. Chex.ai uses automotive diagnostics AI to analyze your vehicle based on the specific environmental stressors of your region.',
    demoHref: '#south-carolina-demo',
    sectionClassName: 'relative',
    headingClassName: 'max-w-4xl',
    articleClassName: 'sm:grid-cols-[0.9fr_1fr]',
    items: [
      {
        city: 'Columbia',
        description: 'Fleet inspections for corporate clients bookings, and rescheduling.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/diagnostics-columbia.png",
      },
      {
        city: 'Greenville',
        description: 'Insurance claims & compliance checks, focus on rideshare & tourism rentals',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/diagnostics-greenville.png",
      },
    ],
  },
  manage: {
    title: 'Manage & Inspect Your Car Online',
    bullets: [
      'Mobile application with easy to use self inspection guide & tools for users.',
      'Highly scalable technology enabling businesses to expand quicker.',
      'Reduces business overhead & operations cost.',
      'Easily integratable allowing businesses to perform and manage repeatable tasks.',
    ],
    buttonLabel: 'Request a demo',
    demoHref: '#south-carolina-demo',
    frameImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/manage-phone-frame.png",
    screenImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/key-differentiators.png",
    checkIconColor: '#1368b9',
    illustration: {
      variant: 'offset-screen',
    },
  },
  caseStudies: {
    title: 'Case Studies',
    items: [
      {
        metric: '66%',
        title: 'Rental Car',
        caption: 'Inspect level',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-rental.png",
        linkHref: '#south-carolina-demo',
        linkLabel: 'Read more...',
      },
      {
        metric: '55%',
        title: 'Rideshare Compliance',
        caption: 'faster onboarding',
        description:
          'Uber drivers in South Carolina using Chex.ai for instant onboarding inspections. Our AI-powered vehicle inspection system.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/manage-inspection.png",
        linkHref: '#south-carolina-demo',
        linkLabel: 'Read more...',
      },
      {
        metric: '40%',
        title: 'Fleet Rentals',
        caption: 'fewer disputes',
        description:
          'Local rental company reduced claims disputes by 40% using AI damage detection.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-fleet.png",
        linkHref: '#south-carolina-demo',
        linkLabel: 'Read more...',
      },
      {
        metric: '78%',
        title: 'Insurance Partner',
        caption: 'Faster payouts',
        description:
          'Regional insurer integrated Chex.ai SDK for faster claims processing. Our AI-powered vehicle inspection system automatically.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-insurance.png",
        linkHref: '#south-carolina-demo',
        linkLabel: 'Read more...',
      },
    ],
    arrowImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/arrow-circle.png",
    sectionClassName: 'bg-[#010e2b] px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-28',
    scrollClassName: 'mt-14 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    articleClassName:
      'group relative h-[485px] w-[320px] overflow-hidden rounded-[12px] border border-white sm:w-[388px]',
    imageClassName:
      'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
    arrowClassName:
      'pointer-events-none absolute right-8 top-[44%] h-16 w-16 -rotate-90 object-contain opacity-95 sm:h-20 sm:w-20',
    metricClassName: 'font-display text-[64px] font-bold leading-[70.4px] tracking-[-0.05em]',
    captionClassName: 'mt-5 max-w-[8rem] font-display text-[20px] font-medium leading-5',
    titleClassName: 'font-display text-[28px] font-medium leading-[1.2]',
    descriptionClassName: 'type-body-md mt-4 max-w-[21rem] text-white/92',
    linkClassName: 'mt-4 font-display text-[18px] font-bold text-[#ff7a01]',
  },
  testimonials: {
    title: 'Feedback from our Verified Clients',
    description: 'We are happy when our customers are too.',
    label: 'What our client say about us?',
    items: [
      {
        name: 'Mousa Naseer',
        role: 'Regional Markets Executive',
        quote:
          'The app was easy to follow, the pictures showing what was required of me to take made it simple. Upload was fast. They responded quickly and had the inspection back within a half hour! Thank you. Well worth the money.',
        featured: true,
      },
      {
        name: 'Andressa Amorim',
        role: 'Regional Markets Executive',
        quote: 'Chexai was really easy to use, better than going to the mechanic!',
        featured: false,
      },
    ],
  },
  faq: {
    idBase: 'south-carolina',
    title: 'Frequently asked questions',
    description:
      'Ask everything you need to know about our product and services. We are here to answer your questions.',
    items: [
      {
        question: 'What Are The 2026 EDVIR Standards For South Carolina Fleets?',
        answer:
          'As of March 2026, federal and state mandates require electronic Driver Vehicle Inspection Reports to include time-stamped, high-resolution visual evidence of vehicle health. Chex.ai automates this by integrating artificial intelligence vehicle detection directly into your reporting software.',
      },
      {
        question: 'Can An AI Car Inspection App Detect Hidden Structural Damage?',
        answer:
          'Chex.ai analyzes guided photo evidence for visual indicators such as panel misalignment, inconsistent paint, unusual gaps, surface deformation, and prior repair patterns. It is not a substitute for teardown diagnostics, but it gives buyers, fleets, and claims teams a stronger evidence layer before they commit to a vehicle decision.',
      },
      {
        question: 'Is The Chex.Ai App Compliant With The SC Hands-Free Act?',
        answer:
          'Yes. The inspection flow is designed to be completed while the vehicle is parked and the user is safely outside active driving conditions. Chex.ai uses step-by-step prompts so drivers can capture required evidence without handling the phone while operating the vehicle.',
      },
      {
        question: 'How Does The AI Car Buying Assistant Work For Used Vehicles?',
        answer:
          'The assistant reviews vehicle photos and inspection inputs to flag visible damage, repair concerns, and condition inconsistencies before purchase. For South Carolina buyers, it helps compare exterior condition, documentation quality, and potential risk signals before finalizing a used vehicle acquisition.',
      },
      {
        question: 'How Does Chex.Ai Meet 2026 South Carolina Rideshare Requirements?',
        answer:
          'Chex.ai supports rideshare readiness with a guided 19-point digital inspection, timestamped image capture, and structured reporting. Drivers can complete the required documentation remotely, while operators receive consistent inspection records for onboarding, renewals, and compliance review.',
      },
    ],
  },
  cta: {
    sectionId: 'south-carolina-demo',
    title: 'A Tool for Informed Acquisition',
    description:
      'Evaluating a pre-owned vehicle in the Upstate requires more than a test drive. Use our AI car buying assistant to uncover hidden structural repairs or mechanical inconsistencies before finalizing any investment.',
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/cta-background.png",
    imageOpacityClassName: 'opacity-35',
  },
} as const satisfies LocationPageContent
