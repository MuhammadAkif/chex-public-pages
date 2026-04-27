import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

export const coloradoContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'The Safest Car Inspection System for Colorado Families',
    description:
      "Our vehicle inspection SaaS is designed for Colorado's unique climate. Use Chex AI to show you care about the long-term health of mountain-driven SUVs and trucks.",
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#colorado-demo',
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
      { label: 'South Carolina', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-south-carolina.png" },
      { label: 'New Mexico', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-new-mexico.png" },
      { label: 'California', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-california-580863c8.png" },
      { label: 'Nebraska', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-nebraska.png" },
      { label: 'Alabama', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-alabama.png" },
      { label: 'Iowa', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-iowa-155a803a.png" },
      { label: 'Colorado', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-colorado.png", featured: true },
    ],
  },
  overview: {
    title: 'Accurate AI-Based Vehicle Assessment for Colorado Rideshare Drivers',
    paragraphs: [
      "Mileage piles up fast on I-70, and we all know that kills a car's value. But what kills it even faster is undocumented wear and tear. Whether you're commuting between Denver and Boulder or taking weekend trips down to Colorado Springs, your vehicle is constantly exposed to gravel, debris, and that brutal mountain salt. Our self-service vehicle inspection lets you track your car's health like a pro right from your driveway.",
      "In a place like Denver, where the weather changes in minutes, having a consistent digital record is a lifesaver. When you eventually go to sell that car, you aren't just saying it's in good shape, you're showing a full history of digital check-ups. It's the easiest way for a Colorado driver to prove they actually took care of their ride. Whether you're navigating the busy streets of Colorado Springs or parking in tight spots in Boulder, you'll have the evidence needed to justify a higher asking price. It's about transparency and helping you get every penny you deserve when it's time for an upgrade.",
    ],
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/overview-rideshare-record.png",
    imageAlt: 'Colorado rideshare inspection history preview',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#colorado-demo',
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
    title: 'Why Your Business Needs a Cloud-Based Vehicle Inspection Tool',
    description:
      "Get a bird's-eye view of your entire inventory with our car inspection app, accessible from any device, anywhere.",
    buttonLabel: 'Book a demo',
    demoHref: '#colorado-demo',
    items: [
      {
        number: '01',
        title: 'Uber Inspection',
        description:
          "By using our app, every inspection is precisely time-stamped and geo-tagged, providing you with ironclad proof of your car's condition.",
      },
      {
        number: '02',
        title: 'Fleet & DSP',
        description:
          'Whether your vans are moving through Denver, Colorado Springs, or out in Boulder, you can oversee your entire operation from a single dashboard.',
      },
      {
        number: '03',
        title: 'Rideshare',
        description:
          'Documenting every shift with high-resolution photos and 360-degree scans usually eats up phone storage, but our service handles the heavy lifting in the cloud.',
      },
      {
        number: '04',
        title: 'Protect Your Frame',
        description:
          "Detect early warning signs of corrosion to stop mountain road salt and magnesium chloride from destroying your vehicle's long-term structural integrity.",
      },
    ],
    visual: {
      variant: 'wave',
      showGlow: true,
    },
  },
  regions: {
    title: 'Stop Rust in Denver, Colorado Springs & Boulder with Smart Car Damage Detection',
    description:
      "Every driver needs an AI-based vehicle assessment. Smart car damage detection provides a forensic view of your car's exterior, helping protect your largest mobile asset.",
    demoHref: '#colorado-demo',
    headingClassName: 'max-w-5xl',
    articleClassName: 'sm:grid-cols-[0.92fr_1fr]',
    items: [
      {
        city: 'Denver',
        description: 'Keep your inventory frontline-ready with Chex AI.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/region-denver.png",
      },
      {
        city: 'Boulder',
        description: "Maintain your vehicle's resale value and structural integrity.",
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/region-boulder.png",
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
    demoHref: '#colorado-demo',
    frameImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/manage-phone-frame.png",
    screenImage: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/key-differentiators.png",
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
    title: 'Feedback from our Verified Clients',
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
    idBase: 'colorado',
    title: 'Frequently asked questions',
    description:
      'Ask vereything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'Does The App Help Identify Safety Issues After A Colorado Hail Storm?',
        answer:
          "Our automated car damage detection is perfect for post-storm triage, instantly spotting thousands of tiny hail dents. This allows you to document the damage immediately for insurance, ensuring your vehicle's safety features aren't compromised.",
      },
      {
        question: "How Does Chex Ai Protect My Teen Driver's First Car?",
        answer:
          'Chex.ai creates a clear baseline record of the vehicle before regular use, then helps document new dents, tire concerns, or visible damage over time. Parents can use the report to catch issues early and decide when a professional repair check is needed.',
      },
      {
        question: 'What Makes This The "Safest" Choice For Families In Colorado Springs?',
        answer:
          'The guided inspection focuses attention on visible safety concerns such as tires, lights, glass, body damage, and leaks. Families get a consistent digital report instead of relying on memory or a rushed driveway check.',
      },
      {
        question: 'Does The System Check For Fluid Leaks That Could Lead To Mountain Breakdowns?',
        answer:
          'The photo workflow helps document visible fluid spots, underbody signs, and related exterior evidence that may indicate a leak. If the report flags a concern, the next step is to have a qualified technician inspect the vehicle mechanically.',
      },
      {
        question: 'Does The Ai Help With Visibility Issues Common In Boulder Winters?',
        answer:
          'Yes. The inspection prompts drivers to capture glass, lights, mirrors, and exterior condition so visibility-related damage is easier to document. Clear photos help identify cracks, clouding, broken lighting, or other issues before winter driving.',
      },
    ],
  },
  cta: {
    sectionId: 'colorado-demo',
    title: 'Colorado Springs Car Sales Made Easy with AI Vehicle Diagnostics',
    description:
      'Use car damage detection AI to justify your asking price in Colorado Springs, showing buyers exactly why your car is worth the investment.',
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/cta-background.png",
    imageOpacityClassName: 'opacity-100',
  },
} as const satisfies LocationPageContent
