import caseAccuracyAlt from '@/app/(site)/assets/locations/case-accuracy-alt.png'
import caseAccuracy from '@/app/(site)/assets/locations/case-accuracy.png'
import caseArrow from '@/app/(site)/assets/locations/case-arrow.png'
import caseDetection from '@/app/(site)/assets/locations/case-detection.png'
import caseGrowth from '@/app/(site)/assets/locations/case-growth.png'
import caseReliability from '@/app/(site)/assets/locations/case-reliability.png'
import ctaBackground from '@/app/(site)/assets/locations/cta-background.png'
import heroPinAlabama from '@/app/(site)/assets/locations/hero-pin-alabama.png'
import heroPinCalifornia from '@/app/(site)/assets/locations/hero-pin-california.png'
import heroPinColorado from '@/app/(site)/assets/locations/hero-pin-colorado.png'
import heroPinIowa from '@/app/(site)/assets/locations/hero-pin-iowa.png'
import heroPinNebraska from '@/app/(site)/assets/locations/hero-pin-nebraska.png'
import heroPinNewMexico from '@/app/(site)/assets/locations/hero-pin-new-mexico.png'
import heroPinSouthCarolina from '@/app/(site)/assets/locations/hero-pin-south-carolina.png'
import managePhoneFrame from '@/app/(site)/assets/locations/manage-phone-frame.png'
import managePhoneNotch from '@/app/(site)/assets/locations/manage-phone-notch.png'
import managePhoneScreen from '@/app/(site)/assets/locations/manage-phone-screen.png'
import serviceFleet from '@/app/(site)/assets/locations/service-fleet.png'
import serviceRideshare from '@/app/(site)/assets/locations/service-rideshare.png'
import serviceUber from '@/app/(site)/assets/locations/service-uber.png'
import overviewCarriers from '@/app/(site)/assets/nevada/overview-carriers.png'
import regionLasVegas from '@/app/(site)/assets/nevada/region-las-vegas.png'
import regionReno from '@/app/(site)/assets/nevada/region-reno.png'
import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

export const nevadaContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'Protecting Every Mile on the Nevada Strip with Chex AI Technology',
    description:
      'Chex AI is the reliable partner for the city’s high-volume rental market. We automate the damage-tracking process, letting you never miss a billable scratch or a safety issue.',
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#nevada-demo',
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
      { label: 'South Carolina', image: heroPinSouthCarolina },
      { label: 'New Mexico', image: heroPinNewMexico },
      { label: 'California', image: heroPinCalifornia },
      { label: 'Nebraska', image: heroPinNebraska },
      { label: 'Alabama', image: heroPinAlabama },
      { label: 'Iowa', image: heroPinIowa },
      { label: 'Colorado', image: heroPinColorado },
    ],
  },
  overview: {
    title: 'Damage Detection for Commercial Carriers In Reno & Las Vegas',
    paragraphs: [
      'Operating a commercial fleet through the high-desert corridors of Reno and Las Vegas demands extreme precision. The Nevada heat and grit accelerate wear on tires, brake systems, and structural components. Chex.ai replaces the slow, error-prone manual walk-around with high-speed digital analysis. Our system captures thousands of data points across your fleet, pinpointing small cracks or dashboard warnings before they trigger a catastrophic breakdown on I-15 or I-80.',
      'Traditional inspections often result in inconsistent reporting and administrative bottlenecks. Our digital solution standardizes every audit, providing a timestamped, visual record of vehicle health. By catching structural damage early, carriers avoid the heavy fines and out-of-service orders issued at Nevada Highway Patrol enforcement sites. Instead of reacting to failures, Reno logistics teams use our platform to identify patterns in vehicle degradation. This transparency builds trust with insurance providers and protects the long-term resale value of every asset. From heavy-duty haulers to last-mile delivery vans, our technology delivers the objective facts required to keep Nevada’s supply chain moving without interruption. Every mile stays protected by the most advanced digital safety net available.',
    ],
    image: overviewCarriers.src,
    imageAlt: 'Nevada commercial fleet inspection overview',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#nevada-demo',
    items: [
      {
        title: 'Fleet Management: Automated Compliance That Keeps You Moving',
        description:
          'Managing a fleet across the I-85 corridor or the Port of Charleston requires a forensic level of detail. Our inspection reporting software is engineered to provide exactly that, without the downtime of a traditional garage.',
        image: serviceFleet.src,
      },
      {
        title: 'Rideshare: Certified and Ready to Drive in Minutes',
        description:
          "For drivers in Charleston, Columbia, and Greenville, getting your car cleared shouldn't be a problem. Our car inspection app is the straightest line to getting back on the app. We run a 19-point digital scan that checks exactly what South Carolina regulators require.",
        image: serviceRideshare.src,
        reverse: true,
      },
      {
        title: 'Uber Inspection Online: Your Driveway Is the New Shop',
        description:
          "Keeping your Uber status in South Carolina shouldn't cost you a day of earnings. Our artificial intelligence vehicle detection walks you through a full 19-point scan using just your phone. We make sure you're road-ready from the Upstate to the Lowcountry.",
        image: serviceUber.src,
      },
    ],
  },
  showcase: {
    title: 'From Sign-up to First Inspection in Under Two Minutes',
    description:
      'We believe in "clean and neat" records. Our reports are designed for clarity, making it easy for anyone to understand an asset\'s condition in a few seconds.',
    buttonLabel: 'Book a demo',
    demoHref: '#nevada-demo',
    items: [
      {
        number: '01',
        title: 'Visual Asset Lifecycle Management',
        description:
          'Track a vehicle from its first day in your fleet to its last. Our chronological data helps you understand exactly how your assets depreciate, making your future much smarter.',
      },
      {
        number: '02',
        title: 'Transparent Maintenance',
        description:
          'Chex AI identifies wear-and-tear trends over time, helping you schedule preventive maintenance before a small scratch turns into a major repair bill.',
      },
      {
        number: '03',
        title: '"Zero-Argument" Lease Returns',
        description:
          'Whether it’s a long-term lease or a car being shipped between Reno and Vegas, disagreements over "who caused the dent" are common.',
      },
      {
        number: '04',
        title: '24/7 Strip Inspections',
        description:
          'In a city that never sleeps, vehicle handovers happen at 3:00 AM just as often as 3:00 PM. Chex AI eliminates the struggle of inspecting cars in dark parking garages or under neon lights.',
      },
    ],
    visual: {
      variant: 'wave',
      showGlow: true,
    },
  },
  regions: {
    title: 'Nevada’s Seasonal Demand Scaling',
    description:
      'Nevada’s market fluctuates with the seasons. Chex AI allows you to scale your inspection volume up or down instantly without the need for expensive new hardware or additional staff.',
    demoHref: '#nevada-demo',
    headingClassName: 'max-w-5xl',
    articleClassName: 'sm:grid-cols-[0.92fr_1fr]',
    items: [
      {
        city: 'Las Vegas',
        description: 'Chex AI allows for a five-second "pre-park" scan.',
        image: regionLasVegas.src,
      },
      {
        city: 'Reno',
        description: 'Chex AI helps you track corrosion and salt damage.',
        image: regionReno.src,
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
    demoHref: '#nevada-demo',
    frameImage: managePhoneFrame.src,
    screenImage: managePhoneScreen.src,
    checkIconColor: '#ff7a01',
    illustration: {
      variant: 'framed-screen',
      notchImage: managePhoneNotch.src,
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
        image: caseAccuracy.src,
      },
      {
        metric: '95.3%',
        title: 'AI Detection',
        description:
          'The system inspects every side of the vehicle and detects damage on each body part individually. By comparing current and previous inspections.',
        image: caseDetection.src,
      },
      {
        metric: '93.6%',
        title: 'Reliability',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks, and broken parts from vehicle images.',
        image: caseReliability.src,
      },
      {
        metric: '92.5%',
        title: 'Growth Rate',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks, and broken parts from vehicle images.',
        image: caseGrowth.src,
      },
      {
        metric: '81.5%',
        title: 'Accuracy',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks, and broken parts from vehicle images.',
        image: caseAccuracyAlt.src,
      },
    ],
    arrowImage: caseArrow,
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
    idBase: 'nevada',
    title: 'Frequently asked questions',
    description:
      'Ask vereything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'Is Chex Ai Compatible With Nevada’s Rideshare And Dot Inspection Standards?',
        answer:
          'Absolutely. We designed Chex AI to be a high-velocity tool for Nevada-based rideshare drivers, Uber drivers and fleet operators who need to meet strict safety compliance.',
      },
      {
        question: 'How Does The Nevada Desert Climate Affect Chex Ai’s Inspection Accuracy?',
        answer:
          'Desert dust, glare, and heat can make vehicle surfaces harder to inspect, so Chex.ai uses guided capture prompts to improve photo consistency. If an image is unclear, the user can retake it before the report is finalized.',
      },
      {
        question: 'Can I Integrate Chex Ai With My Existing Nevada Logistics Workflow?',
        answer:
          'Yes. Chex.ai reports can support fleet intake, driver handoff, maintenance review, and compliance workflows by keeping inspection evidence organized in one digital record. Teams can use the dashboard to standardize how vehicle condition is reviewed.',
      },
      {
        question: 'Why Is Chex.Ai Considered The Professional Choice For Nevada Transportation?',
        answer:
          'Transportation teams need speed, consistency, and clear records across many vehicles. Chex.ai gives operators a repeatable inspection process that reduces manual paperwork and makes condition issues easier to review.',
      },
      {
        question: 'How Does The System Handle The Dust And Sand Common In Rural Nevada?',
        answer:
          'The app guides users to capture clean, well-lit angles and retake photos when dust or sand blocks a clear view. That helps the AI evaluate the actual vehicle surface instead of relying on a single unclear image.',
      },
    ],
  },
  cta: {
    sectionId: 'nevada-demo',
    title: 'The End of "Planning Mode" for Your Vehicle Inspections',
    description:
      'Why wait days for a garage check? Chex AI prioritise progress over perfection, getting you back on the road instantly.',
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: ctaBackground.src,
    imageOpacityClassName: 'opacity-100',
  },
} as const satisfies LocationPageContent
