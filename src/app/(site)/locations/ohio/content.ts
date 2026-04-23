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
import heroRatingBadge from '@/app/(site)/assets/locations/hero-rating-badge.png'
import managePhoneFrame from '@/app/(site)/assets/locations/manage-phone-frame.png'
import managePhoneNotch from '@/app/(site)/assets/locations/manage-phone-notch.png'
import managePhoneScreen from '@/app/(site)/assets/locations/manage-phone-screen.png'
import overviewVehicle from '@/app/(site)/assets/locations/damage-inspection-scene.png'
import regionsCincinnati from '@/app/(site)/assets/ohio/regions-cincinnati.png'
import regionsCleveland from '@/app/(site)/assets/ohio/regions-cleveland.png'
import serviceFleet from '@/app/(site)/assets/locations/service-fleet.png'
import serviceRideshare from '@/app/(site)/assets/locations/service-rideshare.png'
import serviceUber from '@/app/(site)/assets/locations/service-uber.png'
import testimonialQuotes from '@/app/(site)/assets/locations/testimonial-quotes.svg'
import testimonialStar from '@/app/(site)/assets/locations/testimonial-star.svg'
import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

function resolveAssetSrc(asset: unknown): string {
  if (typeof asset === 'string') {
    return asset
  }

  if (
    typeof asset === 'object' &&
    asset !== null &&
    'src' in asset &&
    typeof asset.src === 'string'
  ) {
    return asset.src
  }

  return ''
}

export const ohioContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    ratingBadgeImage: heroRatingBadge,
    title: 'Automated Vehicle Inspections in Ohio—Get It Done with a Tap!',
    description:
      "Schedule car inspections when it's convenient for YOU. With Chex.ai's online vehicle inspections, you don't need to arrange in-person visits. Get your car inspected from wherever you are in Columbus, Cleveland, or Cincinnati, Ohio.",
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#ohio-demo',
    sectionClassName: 'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_100%)]',
    layoutClassName: 'lg:grid-cols-[0.98fr_1fr] lg:gap-14',
    titleClassName:
      'max-w-[684px] font-display text-[36px] font-bold leading-[1.15] tracking-[-1.6px] sm:text-[40px]',
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
    title: 'Catch Damage Before It Spreads with Automated Damage Inspection',
    paragraphs: [
      "With Chex.ai, your car gets its very own smart helper! Our self-service vehicle inspection is like giving your car a special power to tell you when something's wrong. It looks for scratches, dents, or even tiny problems that might turn into big ones. It's like having a secret agent checking your car and giving you all the info you need to keep it running smoothly. And the best part? Automated damage inspection does everything for you, making sure your car stays happy and healthy!",
      "The app transforms your smartphone into a professional-grade diagnostic tool. Our car inspection app uses sophisticated OCR technology to instantly recognize your number plate and VIN, while a built-in camera overlay guides you to capture the perfect 360-degree view. Our AI automotive diagnostics don't just find surface scratches; they identify over 6,000 types of defects with 99% accuracy. Chex.ai provides a transparent, objective health report in under four hours. It's a completely digital, 24/7 solution that removes the stress of shop visits.",
    ],
    image: overviewVehicle.src,
    imageAlt: 'Automated Ohio damage inspection overview',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#ohio-demo',
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
    title: "Ohio's Top Choice for Remote Car Inspections, Fleet Management & Uber Inspections",
    description:
      'We know you care about your car, and keeping it in top condition is a priority. Chex.ai comes in, your personal AI-powered vehicle diagnostic tool.',
    buttonLabel: 'Book a demo',
    demoHref: '#ohio-demo',
    items: [
      {
        number: '01',
        title: 'Uber Inspections Online',
        description:
          "For rideshare drivers in Ohio, keeping your vehicle in top condition is not just about safety, it's about compliance and maximizing your earning potential.",
      },
      {
        number: '02',
        title: 'AI-Powered Fleet Inspections',
        description:
          'For business owners managing a fleet of vehicles in Ohio, keeping track of inspections can feel like a daunting task. Whether you operate in Columbus, Cleveland, or Cincinnati.',
      },
      {
        number: '03',
        title: 'Effortless Car Inspection System',
        description:
          "Driving for a rideshare service means you're always on the move, whether you're zipping through the city or taking a new route.",
      },
      {
        number: '04',
        title: 'Car Inspections At Your Fingertips',
        description:
          "Chex AI makes car inspections super easy in Ohio! Just a few taps, and you'll know if your car's good to go, all from your phone. Simple, quick, and stress-free!",
      },
    ],
    visual: {
      variant: 'wave',
      showGlow: true,
    },
  },
  regions: {
    title: 'Keep Your Car Safe with Scratch Detection AI',
    description:
      "Don't wait for damage to get worse! Chex.ai's scratch detection AI spots scratches early, saving you money with our handy vehicle damage assessment tool.",
    demoHref: '#ohio-demo',
    headingClassName: 'max-w-5xl',
    articleClassName: 'sm:grid-cols-[0.92fr_1fr]',
    items: [
      {
        city: 'Cleveland',
        description: "Chex.ai's vehicle condition assessment AI analyzes your car for dents.",
        image: regionsCleveland.src,
      },
      {
        city: 'Cincinnati',
        description: "AI's automated damage inspection monitors brakes and suspension.",
        image: regionsCincinnati.src,
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
    demoHref: '#ohio-demo',
    frameImage: managePhoneFrame.src,
    screenImage: managePhoneScreen.src,
    screenClassName: 'object-right',
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
    label: 'What Our Client Say About Us?',
    quoteImage: resolveAssetSrc(testimonialQuotes),
    starImage: resolveAssetSrc(testimonialStar),
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
    idBase: 'ohio',
    title: 'Frequently asked questions',
    description:
      'Ask verything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'Can A Virtual Vehicle Inspection Identify Sun Glare Damage During Ohio Springs?',
        answer:
          `The high-desert wind carries fine grit that acts like sandpaper on your car's finish and glass. Our AI spots that early "pitting" and paint erosion before it turns into a full-blown rust issue or a costly repaint.`,
      },
      {
        question:
          'How Can Ohio-Based Delivery Fleets Automate Their Daily Vehicle Condition Reports (Dvcr)?',
      },
      {
        question:
          'Is The Uber Inspection Online Valid For Rideshare Drivers In Columbus, Cleveland, Cincinnati?',
      },
      {
        question: 'Can The Car Inspection App Assist With Ohio Salvage Title Inspections?',
      },
      {
        question: 'How Does Automotive Diagnostics Ai Protect Trucks In Ohio Construction Zones?',
      },
    ],
  },
  cta: {
    sectionId: 'ohio-demo',
    title: 'No More Waiting Rooms: Mobile Auto Inspection Software Does It All',
    description:
      "Don't wait for a mechanic; get your car inspected in minutes with Chex.ai's self-service vehicle inspection tool.",
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: ctaBackground.src,
    imageOpacityClassName: 'opacity-100',
  },
} as const satisfies LocationPageContent
