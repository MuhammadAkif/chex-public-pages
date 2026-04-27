import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

export const nebraskaContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'Nebraska’s Standard for United States AI Vehicle Damage Detection',
    description:
      'From Omaha to Lincoln, we are uniting Nebraska businesses with the best tech in the United States. Experience the value of artificial-intelligence vehicle detection for yourself.',
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#nebraska-demo',
    sectionClassName: 'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_100%)]',
    layoutClassName: 'lg:grid-cols-[0.98fr_1fr] lg:gap-14',
    titleClassName:
      'max-w-[684px] font-display text-[36px] font-bold leading-[1.18] sm:text-[40px]',
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
      { label: 'Nebraska', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-nebraska-7bc6f5fd.png", featured: true },
      { label: 'Alabama', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-alabama.png" },
      { label: 'Iowa', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-iowa-155a803a.png" },
      { label: 'Colorado', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-colorado.png" },
    ],
  },
  overview: {
    title: 'Advanced Vehicle Inspection Technology: Beyond Baseline Compliance',
    paragraphs: [
      'If you’re only doing enough to pass an inspection, you’re already behind. We believe in building safety into every scan, which is why we’ve integrated comprehensive Vehicle Inspection Technology into our daily routine. It starts with a user-friendly fleet inspection app that actually makes sense for the people using it. Instead of a tedious chore, it becomes a streamlined part of the workflow that drivers actually trust.',
      'Through automated vehicle inspection, we’ve effectively removed the "human error" factor. Our AI car inspection system uses advanced AI dent detection to catch subtle issues, the kind of hairline fractures or structural stress points that a tired eye might miss but could eventually lead to significant downtime.',
      'Having remote car inspection and remote vehicle inspection tech ready to go means we can make smart, data-driven decisions on the fly, regardless of where the asset is located. It’s about being proactive rather than reactive, ensuring that every vehicle is genuinely road-ready every single time it starts up.',
    ],
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/overview-vehicle-inspection-technology-4b257d50.png",
    imageAlt: 'Nebraska advanced vehicle inspection technology',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#nebraska-demo',
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
    title: 'Nebraska Truck Scanning Software for Busy Freight Places',
    description:
      'Our digital inspection software is designed to keep freight moving at lightning speed. Chex, as a car inspection app, allows freight carriers to complete inspections quickly, so they don’t disrupt the fast-paced supply chain.',
    buttonLabel: 'Book a demo',
    demoHref: '#nebraska-demo',
    items: [
      {
        number: '01',
        title: 'Error-Correction & Data Validation',
        description:
          'Accuracy matters, and our system is always on guard. If a photo is unclear or an angle is missed, the software will alert the inspector immediately.',
      },
      {
        number: '02',
        title: 'Remote Access and Management',
        description:
          'Manage your Omaha fleet from anywhere. Our cloud architecture allows stakeholders to review live inspection data from Lincoln or beyond the Nebraska border in real-time.',
      },
      {
        number: '03',
        title: 'Super Speedy Scans',
        description:
          'Time is super important for the trucks in Omaha. Our software works fast, checking the whole truck as fast as you can walk around it!',
      },
      {
        number: '04',
        title: 'Automated Categorization & Sorting',
        description:
          'Neatness is efficiency. We automatically categorize every scan by VIN and date, creating a tidy Nebraska database that is ready for any internal or external audit.',
      },
    ],
    visual: {
      variant: 'wave',
      showGlow: true,
    },
  },
  regions: {
    title: 'Car Inspection App For Municipal And Public Works',
    description:
      'Providing public services requires a mindset of total accountability. We give agencies the tools to maintain public trust through impeccable vehicle documentation and safety standards.',
    demoHref: '#nebraska-demo',
    headingClassName: 'max-w-5xl',
    articleClassName: 'sm:grid-cols-[0.92fr_1fr]',
    items: [
      {
        city: 'Lincoln',
        description: 'Prove the safety of Lincoln’s public transport and service vehicles.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/region-lincoln.png",
      },
      {
        city: 'Omaha',
        description: 'Helping Omaha planners make smarter procurement decisions.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/region-omaha.png",
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
    demoHref: '#nebraska-demo',
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
    idBase: 'nebraska',
    title: 'Frequently asked questions',
    description:
      'Ask vereything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'Can Your Automotive Diagnostics Ai Predict Maintenance For My Nebraska Fleet?',
        answer:
          'We track the "health patterns" of your vehicles, identifying things like tire wear or structural stress before they turn into a breakdown. It’s about giving Omaha managers the data to fix small issues now, rather than paying for a tow truck later.',
      },
      {
        question: 'Is The Uber Inspection Online Valid For Omaha And Lincoln Drivers On Chex?',
        answer:
          'Chex.ai helps Omaha and Lincoln drivers prepare a structured digital inspection report for rideshare onboarding or renewal. Drivers should still confirm the latest Uber and local requirements before submitting documentation.',
      },
      {
        question: 'How Do Lincoln Dealers Benefit From Chex, The Virtual Vehicle Inspection App?',
        answer:
          'Dealers can use Chex.ai to create consistent condition records for trade-ins, used inventory, and customer-facing disclosures. The visual report helps sales and service teams discuss vehicle condition with less back-and-forth.',
      },
      {
        question: 'Why Is An Online Vehicle Inspection Faster Than A Traditional Shop Check?',
        answer:
          'The online workflow removes scheduling delays by guiding the driver through photo capture from a phone. It is faster for visual documentation, while mechanical repairs or diagnostics can still be routed to a shop when needed.',
      },
      {
        question: 'What Makes Your Technology "Safety-First"?',
        answer:
          'The inspection flow prioritizes evidence around vehicle condition, visible damage, tires, lights, glass, and other safety-related areas. It helps teams find problems early and keep a clearer record before a vehicle returns to the road.',
      },
    ],
  },
  cta: {
    sectionId: 'nebraska-demo',
    title: 'High-Stakes Accuracy for the High-Speed Nebraska Market',
    description:
      'Chex AI provides the technical grit needed to document assets with 99% accuracy in record time.',
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/cta-background.png",
    imageOpacityClassName: 'opacity-100',
  },
} as const satisfies LocationPageContent
