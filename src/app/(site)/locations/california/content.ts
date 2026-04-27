import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

export const californiaContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: "California's Favorite Car Inspection System for Fast Valuations",
    description:
      'Trust the most advanced car damage recognition software in California to provide a fair, data-driven assessment for every trade-in you handle.',
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#california-demo',
    sectionClassName: 'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_100%)]',
    layoutClassName: 'lg:grid-cols-[0.98fr_1fr] lg:gap-14',
    titleClassName:
      'max-w-[684px] font-display text-[36px] font-bold leading-[1.18] tracking-[-1.76px] sm:text-[40px]',
    descriptionClassName: 'max-w-[672px]',
    stats: [
      { value: '1000+', label: 'Customers' },
      { value: '5+', label: 'Years of Experience' },
      { value: '20+', label: 'Companies' },
    ],
    locations: [
      { label: 'California', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-california.png", featured: true },
      { label: 'New Mexico', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-new-mexico.png" },
      { label: 'Alabama', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-alabama.png" },
      { label: 'Nebraska', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-nebraska.png" },
      { label: 'South Carolina', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-south-carolina.png" },
      { label: 'Iowa', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-iowa.png" },
      { label: 'Colorado', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-colorado.png" },
    ],
  },
  overview: {
    title: 'High-Resolution Car Damage Detection AI Now Serving California',
    paragraphs: [
      "California's automotive market moves faster than just about anywhere else, and whether you're managing a massive fleet in Los Angeles or selling a car in San Francisco, you can't afford to be slowed down by old-school appraisals. That's why we're bringing our high-resolution technology to the Golden State.",
      "In a state where your car is often your biggest asset, having a reliable vehicle damage assessment tool right on your phone is a game-changer. It's not just about finding dings from tight San Diego parking; it's about establishing a baseline of truth. With our remote vehicle damage assessment capabilities, you can get a professional-grade report without ever having to set foot in a shop or wait for an adjuster to fight through traffic. Whether you're dealing with coastal salt air in Sacramento or the desert heat of the Inland Empire, this technology captures the subtle signs of paint oxidation and structural wear that a tired eye might miss. It's about transparency, speed, and making sure that every California driver has the data they need to protect their investment.",
    ],
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/overview-high-resolution-damage-detection.png",
    imageAlt: 'High-resolution California vehicle inspection preview',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#california-demo',
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
          "For drivers in Charleston, Columbia, and Greenville, getting your car cleared shouldn't be a problem. Our car inspection app is the straightest line to getting back on the app. We run a 19-point digital scan that checks exactly what South Carolina regulators require.",
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/service-rideshare.png",
        reverse: true,
      },
      {
        title: 'Uber Inspection Online: Your Driveway Is the New Shop',
        description:
          "Keeping your Uber status in South Carolina shouldn't cost you a day of earnings. Our artificial intelligence vehicle detection walks you through a full 19-point scan using just your phone. We make sure you're road-ready from the Upstate to the Lowcountry.",
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/service-uber.png",
      },
    ],
  },
  showcase: {
    title: 'Top-Rated AI-Based Vehicle Assessment for State Fleets, Uber Inspection Online & Rideshare',
    description:
      'From high-traffic state fleets to the non-stop rideshare hustle in Los Angeles, maintaining a baseline of safety and value is a massive undertaking.',
    buttonLabel: 'Book a demo',
    demoHref: '#california-demo',
    items: [
      {
        number: '01',
        title: 'Mobile-First Inspections',
        description:
          'Turn any smartphone into a professional vehicle inspection tool, allowing your team to perform high-speed, digital-first audits from any location.',
      },
      {
        number: '02',
        title: 'Detecting 0.2mm Defects',
        description:
          'Our advanced car damage recognition software identifies microscopic paint chips and structural flaws that the naked eye consistently misses during walk-arounds.',
      },
      {
        number: '03',
        title: 'Timestamped Transparency',
        description:
          'Create an unalterable digital audit trail with every AI-based vehicle assessment, featuring GPS tags and time-stamped proof for total liability protection.',
      },
      {
        number: '04',
        title: 'Eliminating "Pencil Whipping"',
        description:
          'Stop lazy manual checklists with our auto inspection platform, requiring real-time photo evidence to ensure every safety check is performed.',
      },
    ],
    visual: {
      variant: 'wave',
      showGlow: true,
    },
  },
  regions: {
    title: 'Stop Sun & Salt Damage In California Cities with Smart Car Damage Detection',
    description:
      "Use our vehicle inspection tool to catch early signs of coastal salt air corrosion before it ruins your car's frame.",
    demoHref: '#california-demo',
    headingClassName: 'max-w-5xl',
    articleClassName: 'sm:grid-cols-[0.92fr_1fr]',
    items: [
      {
        city: 'Los Angeles',
        description: 'Detect urban oxidation and smog damage with AI diagnostics.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/region-los-angeles.png",
      },
      {
        city: 'San Francisco',
        description: 'Monitor coastal salt corrosion and hill-climbing structural wear easily.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/region-san-francisco.png",
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
    demoHref: '#california-demo',
    frameImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/manage-phone-frame.png",
    screenImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/manage-phone-screen.png",
    checkIconColor: '#ff7a01',
    illustration: {
      variant: 'framed-screen',
      notchImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/manage-phone-notch.png",
    },
  },
  caseStudies: {
    title: 'Case Studies',
    items: [
      {
        metric: '98.5%',
        title: 'Accuracy',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks, and broken parts from vehicle images.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-accuracy.png",
      },
      {
        metric: '95.3%',
        title: 'AI Detection',
        description:
          'The system inspects every side of the vehicle and detects damage on each body part individually. By comparing current and previous inspections.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-detection.png",
      },
      {
        metric: '93.6%',
        title: 'Reliability',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks, and broken parts from vehicle images.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-reliability.png",
      },
      {
        metric: '92.5%',
        title: 'Growth Rate',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks, and broken parts from vehicle images.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-growth.png",
      },
      {
        metric: '81.5%',
        title: 'Accuracy',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks, and broken parts from vehicle images.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-coverage.png",
      },
    ],
    arrowImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/arrow-circle.png",
    sectionClassName: 'bg-[#010e2b] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-20',
    scrollClassName: 'mt-14 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    articleClassName:
      'group relative h-[485px] w-[320px] overflow-hidden rounded-[12px] border border-white sm:w-[388px]',
    imageClassName:
      'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
    arrowClassName:
      'pointer-events-none absolute right-8 top-[43%] h-16 w-16 -rotate-90 object-contain opacity-95 sm:h-24 sm:w-24',
    metricClassName:
      'font-display text-[54px] font-bold leading-[1.1] tracking-[-0.05em] sm:text-[64px]',
    titleClassName: 'mt-1 font-display text-[28px] font-medium leading-[1.2]',
    descriptionClassName: 'type-body-md mt-5 max-w-[21rem] text-white/92',
  },
  testimonials: {
    title: 'Feedback from our verified clients',
    description: 'We are happy when our customers are too.',
    label: 'What our client say about us?',
    items: [
      {
        name: 'Mousa Naseer',
        role: 'Regional Markets Executive',
        quote:
          'The app was easy to follow, the pictures showing what was equired of me to take made is simple. Upload was fast. They responded quickly and had the inspection back within a half hour! Thank you. Well worth the money.',
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
    idBase: 'california',
    title: 'Frequently asked questions',
    description:
      'Ask vereything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'Can The System Identify Damage From California Hail Storms?',
        answer:
          'The automated car damage detection scans thousands of surface points simultaneously, instantly triaging hail dents for faster insurance claims and repair estimates.',
      },
      {
        question: 'Does The Software Support High-Volume Fleet Inspections For Dsps?',
        answer:
          'Yes. Chex.ai is built for repeat inspections across many vehicles, with guided capture, consistent reporting, and dashboard review for DSP and fleet teams. It helps managers spot damage trends and keep records organized at scale.',
      },
      {
        question: "Why Is This The Favorite System For California's Tech-Savvy Drivers?",
        answer:
          'Drivers like that the inspection process is mobile, fast, and easy to complete without a shop visit. The AI-assisted report also gives them a clearer digital record of vehicle condition for resale, insurance, rideshare, or fleet use.',
      },
      {
        question: "Is My Vehicle's Data Stored Securely In The Cloud?",
        answer:
          'Yes. Vehicle photos, inspection details, and account data are stored in secure cloud systems with access controls designed to protect sensitive information. Your report remains available when you need to review or share it.',
      },
      {
        question: 'How Does The Ai Distinguish Between Simple Dirt And Actual Damage?',
        answer:
          'The system compares surface patterns, lighting, panel shape, and repeated visual signals across guided photos. If dirt or glare affects the result, users can retake photos so the final report is based on clearer evidence.',
      },
    ],
  },
  cta: {
    sectionId: 'california-demo',
    title: 'Maintain a Pristine History with AI Vehicle Diagnostics',
    description:
      "Keep your vehicle's history immaculate by using Chex's advanced diagnostics to catch invisible wear and ensure maximum resale value for everyone.",
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/cta-background.png",
    imageOpacityClassName: 'opacity-100',
  },
} as const satisfies LocationPageContent
