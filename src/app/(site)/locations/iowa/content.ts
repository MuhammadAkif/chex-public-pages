import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

export const iowaContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'Total Peace of Mind for Every Mile Driven in Lowa',
    description:
      "Don't let a small mechanical issue ruin your Iowa road trip. Our automotive diagnostics AI detects subtle anomalies, giving you the peace of mind you deserve for every single mile.",
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#iowa-demo',
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
      { label: 'Nebraska', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-nebraska.png" },
      { label: 'Alabama', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-alabama.png" },
      { label: 'Iowa', image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/hero-pin-iowa-85b0ec2c.png", featured: true },
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
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/overview-vehicle-inspection-technology.png",
    imageAlt: 'Iowa advanced vehicle inspection technology',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#iowa-demo',
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
    title: 'Capital City Convenience: 100% Digital Digital Inspection Software',
    description:
      'Why waste a Saturday at a mechanic? Our online vehicle inspection offers workers a 100% digital path to passing their mandatory yearly safety requirements with ease.',
    buttonLabel: 'Book a demo',
    demoHref: '#iowa-demo',
    items: [
      {
        number: '01',
        title: 'Des Moines Ride-Hailing',
        description:
          'Our artificial intelligence vehicle detection smoothens your certification process, using ai automotive diagnostics to verify your car’s safety.',
      },
      {
        number: '02',
        title: 'DSP Delivery Fleets',
        description:
          'Keep your DSP fleet moving with advanced automotive diagnostics ai. Our platform uses detect auto technology to flag maintenance issues.',
      },
      {
        number: '03',
        title: '24/7 Rideshare Inspection',
        description:
          'Access our Rideshare inspection anytime across Iowa. Our artificial intelligence vehicle detection provides instant results.',
      },
      {
        number: '04',
        title: 'One Inspection For Uber',
        description:
          'Skip the mechanic and complete your uber inspection online. Our ai car buying assistant tech is repurposed for safety.',
      },
    ],
    visual: {
      variant: 'wave',
      showGlow: true,
    },
  },
  regions: {
    title: 'The Smart Way To Handle Online Vehicle Inspection',
    description:
      'Chex AI’s vehicle condition assessment AI simplifies online inspections. Using car damage recognition software and automated damage inspection, it delivers quick, precise results to commuters without the wait.',
    demoHref: '#iowa-demo',
    headingClassName: 'max-w-5xl',
    articleClassName: 'sm:grid-cols-[0.92fr_1fr]',
    items: [
      {
        city: 'Des Moines',
        description: 'Chex AI makes vehicle inspections simple and quick.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/region-des-moines.png",
      },
      {
        city: 'Cedar Rapids',
        description: 'Chex AI helps drivers stay on top of their vehicle’s condition.',
        image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/region-cedar-rapids.png",
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
    demoHref: '#iowa-demo',
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
    idBase: 'iowa',
    title: 'Frequently asked questions',
    description:
      'Ask vereything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'Can I Use Your Online Vehicle Inspection For Both Uber And Lyft In Des Moines?',
        answer:
          'Yes, our online vehicle inspection provides a universal safety certificate accepted by major platforms across Iowa. One digital session covers all your compliance needs, saving you time and inspection fees.',
      },
      {
        question: 'What Makes Your Ai Car Inspection Different From A Traditional Mechanic Visit?',
        answer:
          'Chex.ai gives drivers a fast visual condition report from a guided mobile workflow, while a mechanic visit is still best for hands-on mechanical diagnostics. The app helps document visible issues quickly so you know what needs attention before scheduling service.',
      },
      {
        question: 'What Is The Turnaround Time For A Remote Vehicle Inspection In Des Moines?',
        answer:
          'Most users can complete the photo capture process in minutes, and the digital report is generated without waiting for a shop appointment. Timing can vary based on photo quality, connection speed, and the type of review required.',
      },
      {
        question: 'Do I Need To Buy Special Equipment To Use The Car Inspection App?',
        answer:
          'No special equipment is required for the standard inspection flow. You only need a smartphone with a working camera, enough lighting, and space to safely capture the required vehicle angles.',
      },
      {
        question: 'How Does The "Multi-Marker" Annotation Feature Work?',
        answer:
          'Multi-marker annotations let the report call out several visible issues on the same vehicle image, such as dents, scratches, tire wear, or glass damage. This keeps each concern tied to its exact photo location for easier review.',
      },
    ],
  },
  cta: {
    sectionId: 'iowa-demo',
    title: 'QR-Code Asset Tracking for Error-Free Services',
    description:
      'Our QR-code solution and Vehicle Inspection Technology automatically categorize your assets, giving you personalized reports for everything from vans and cars to heavy-duty trucks.',
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/cta-background.png",
    imageOpacityClassName: 'opacity-100',
  },
} as const satisfies LocationPageContent
