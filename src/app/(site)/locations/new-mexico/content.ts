import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

export const newMexicoContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'AI Damage Detection: Spot Problems Before They Become Big in New Mexico',
    description:
      'Use Chex.ai for AI-powered damage detection and automated diagnostics AI in Albuquerque and Santa Fe. Spot potential issues instantly.',
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#new-mexico-demo',
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
      { label: 'South Carolina', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-south-carolina.png", featured: false },
      { label: 'New Mexico', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-new-mexico-aa79eae5.png", featured: true },
      { label: 'California', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-california-580863c8.png", featured: false },
      { label: 'Nebraska', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-nebraska.png", featured: false },
      { label: 'Alabama', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-alabama.png", featured: false },
      { label: 'Iowa', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-iowa-155a803a.png", featured: false },
      { label: 'Colorado', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-colorado.png", featured: false },
    ],
  },
  overview: {
    title: 'Instant Edge Processing for Immediate Triage in New Mexico',
    paragraphs: [
      'Chex AI uses edge computing to instantly analyze data, allowing immediate triage. It flags damaged vehicles for repairs and clears healthy ones to keep moving, saving time in New Mexico, Albuquerque, and Santa Fe. With automated triage, you no longer have to deal with waiting around for manual inspections or long repair delays. Whether you are managing just a few vehicles or an entire fleet,',
      'Chex AI keeps everything running smoothly. It is the efficient and straightforward way to take care of your vehicles and make sure they are always ready to hit the road without any complications. Chex AI is the easy, smart way to keep your fleet ready and in top shape. It is designed to help you maintain your vehicles efficiently, reducing stress and making sure you are always prepared for what is next. Instead of worrying about vehicle inspections, you can focus on your operations, knowing that Chex AI is taking care of the rest.'
    ],
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/overview-edge-processing.png",
    imageAlt: 'AI based instant edge processing',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#new-mexico-demo',
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
    title: 'Processing 100+ Assets In Under An Hour',
    description:
      'No more walking around with pen and paper; Chex AI does the full lap for you instantly and digitally. It is fast, fair, and built for the way we work today, completely digital and ready whenever you are.',
    buttonLabel: 'Book a demo',
    demoHref: '#new-mexico-demo',
    items: [
      {
        number: '01',
        title: 'Detection Across 100+ Asset',
        description:
          'Chex AI maintains 100% consistency, applying the same algorithmic rigor to every scan. The system identifies micron-level surface defects.',
      },
      {
        number: '02',
        title: 'Eliminating The "Manual Work"',
        description:
          'Chex AI transforms vehicle inspections in New Mexico with high-speed sensors and 360-degree imaging, boosting your yard capacity.',
      },
      {
        number: '03',
        title: 'Automated CRM & ERP',
        description:
          'With Chex AI automated CRM and ERP data sync, customer records, orders, and inventory update instantly across platforms.',
      },
      {
        number: '04',
        title: 'Instant Edge Processing',
        description:
          'Chex AI uses edge computing to instantly analyze data, allowing immediate triage. It flags damaged vehicles for repairs and clears healthy ones.',
      },
    ],
    visual: {
      variant: 'processing',
      showGlow: true,
    },
  },
  regions: {
    title: "Chex.AI's Impact On New Mexico's Rural And Urban Areas",
    description:
      "Chex.ai is making a real difference in New Mexico, whether you're in the city or the countryside. It helps keep vehicles running smoothly by quickly spotting issues and saving time on repairs, no matter where you are.",
    demoHref: '#new-mexico-demo',
    headingClassName: 'max-w-5xl',
    titleClassName: 'capitalize',
    articleClassName: 'sm:grid-cols-[0.95fr_1fr]',
    items: [
      {
        city: 'Albuquerque',
        description: 'Chex.ai speeds up the process using LiDAR technology.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/impact-albuquerque.png",
      },
      {
        city: 'Santa Fe',
        description: 'Chex.ai checks makes sure your fleet stays in great shape.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/impact-santa-fe.png",
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
    demoHref: '#new-mexico-demo',
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
    metricClassName: 'font-display text-[54px] font-bold leading-[1.1] tracking-[-0.05em] sm:text-[64px]',
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
    idBase: 'new-mexico',
    title: 'Frequently asked questions',
    description:
      'Ask everything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'How Does Chex Help Catch "Hidden" Damage Caused By New Mexico?',
        answer:
          'The high-desert wind carries fine grit that acts like sandpaper on your car finish and glass. Our AI spots that early "pitting" and paint erosion before it turns into a full-blown rust issue or a costly repaint.',
      },
      {
        question: 'How Does This Technology Help With Insurance Claims In New Mexico?',
        answer:
          'Chex.ai creates a time-stamped visual record of dents, scratches, glass damage, and other visible issues that can support a claim conversation. The report helps owners share clearer evidence with insurers, repair shops, or fleet managers.',
      },
      {
        question: 'Can The Mobile Auto Inspection Software Detect Internal Engine Problems?',
        answer:
          'The mobile inspection is focused on guided visual evidence, so it is not a replacement for hands-on engine diagnostics. It can document visible warning signs, leaks, or exterior condition issues that may point to the need for a mechanic review.',
      },
      {
        question: 'Is The AI Damage Detection Technology Easy For Non-Technical Users To Use?',
        answer:
          'Yes. The app walks users through each required photo angle with simple prompts, so drivers do not need inspection training or special technical knowledge. Clear instructions help produce a consistent report from any supported smartphone.',
      },
      {
        question: 'How Does The Software Help With I-25 And I-40 Long-Haul Fleet Inspections?',
        answer:
          'Fleet teams can use Chex.ai to document vehicle condition before and after long routes, making damage changes easier to spot. The shared report helps managers review issues quickly across busy I-25 and I-40 operations.',
      },
    ],
  },
  cta: {
    sectionId: 'new-mexico-demo',
    title: "Chex.ai's 360-Degree Imaging for Detailed Vehicle Inspections",
    description:
      "Quick and thorough inspections are now possible with Chex.ai's 360-degree imaging, making fleet maintenance more efficient and accurate.",
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/cta-background.png",
    imageOpacityClassName: 'opacity-55',
  },
} as const satisfies LocationPageContent
