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
import serviceFleet from '@/app/(site)/assets/locations/service-fleet.png'
import serviceRideshare from '@/app/(site)/assets/locations/service-rideshare.png'
import serviceUber from '@/app/(site)/assets/locations/service-uber.png'
import managePhoneScreen from '@/app/(site)/assets/california/manage-phone-screen.png'
import overviewMobileVehicleInspectionApp from '@/app/(site)/assets/arizona/overview-mobile-vehicle-inspection-app.png'
import regionScottsdale from '@/app/(site)/assets/arizona/region-scottsdale.png'
import regionTucson from '@/app/(site)/assets/arizona/region-tucson.png'
import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

export const arizonaContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: "Chex Ai: Arizona's Most Convenient Mobile Vehicle Inspection App",
    description:
      "Take control of your automotive data with our mobile auto inspection software. This car inspection app gives Arizona users a clear overview of their vehicle's health through detailed analytics.",
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#arizona-demo',
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
      { label: 'Iowa', image: heroPinIowa, featured: true },
      { label: 'Colorado', image: heroPinColorado },
    ],
  },
  overview: {
    title: "Phoenix, Tucson & Scottsdale's Mobile Vehicle Inspection App - Quick & Easy",
    paragraphs: [
      `Getting your car inspected shouldn't feel like a hurdle you want to procrastinate on for a month. Using our car inspection app is actually kind of satisfying. You walk around, snap the shots, and watch the app check off the boxes. Our mobile auto inspection software is like a helpful assistant, ensuring you don't miss anything important. It's perfect for the "do-it-yourself" crowd in Arizona who likes to stay on top of things.`,
      `Whether you're prepping for a long road trip across the desert or just need to renew your registration, this is the tool you need. It's fast, it's secure, and it's built by people who actually understand cars. We've focused on making the user experience as smooth as possible, with no glitches or confusing menus. Just a clear path from "start" to "certified". It's the kind of technology that makes you wonder why we ever did things any other way.`,
    ],
    image: overviewMobileVehicleInspectionApp.src,
    imageAlt: 'Arizona mobile vehicle inspection app overview',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#arizona-demo',
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
    title: 'The Most User-Friendly Mobile Vehicle Inspection App In The State',
    description:
      'Skip the mechanic and inspect your car from home. Our app makes Arizona vehicle certifications fast, simple, and totally digital.',
    buttonLabel: 'Book a demo',
    demoHref: '#arizona-demo',
    items: [
      {
        number: '01',
        title: 'Ride Share',
        description:
          'Get back on the road and start earning faster. Complete your mandatory safety checks in minutes using just your smartphone.',
      },
      {
        number: '02',
        title: 'Fleet & DSP',
        description:
          'Manage your entire delivery team with ease. Track vehicle health and compliance across Arizona without ever leaving your main dashboard.',
      },
      {
        number: '03',
        title: 'Uber Inspection Online',
        description:
          'Finalize your Uber safety requirements without the shop visit. Upload photos, pass the AI review, and get driving today.',
      },
      {
        number: '04',
        title: 'Go-To App',
        description:
          "The most trusted tool for Arizona drivers. We've turned a complex chore into a quick, stress-free task for every vehicle.",
      },
    ],
    visual: {
      variant: 'wave',
      showGlow: true,
    },
  },
  regions: {
    title: 'Speed Up Your Onboarding With Smartphone Vehicle Inspection',
    description:
      'Skip the trip to the service centre. Our digital process lets you complete your onboarding inspection right from your Arizona driveway in minutes.',
    demoHref: '#arizona-demo',
    headingClassName: 'max-w-5xl',
    articleClassName: 'sm:grid-cols-[0.92fr_1fr]',
    items: [
      {
        city: 'Tucson',
        description: 'Skip the shop; get certified using just your phone.',
        image: regionTucson.src,
      },
      {
        city: 'Scottsdale',
        description: 'The premium, digital way to handle your vehicle safety.',
        image: regionScottsdale.src,
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
    demoHref: '#arizona-demo',
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
    idBase: 'arizona',
    title: 'Frequently asked questions',
    description:
      'Ask vereything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'Is My Personal Data And Vehicle Information Secure?',
        answer:
          'We use bank-level encryption to ensure that your photos, VIN, and personal details are stored safely and never shared without your consent.',
      },
      {
        question: 'Can I Inspect A Fleet Of Vehicles With One Account?',
      },
      {
        question: 'Can I Use The App If I Have A Poor Internet Connection?',
      },
      {
        question: 'What Happens If My Car Fails The Inspection?',
      },
      {
        question: 'Can I Use The App For A Pre-Purchase Inspection?',
      },
    ],
  },
  cta: {
    sectionId: 'arizona-demo',
    title: 'Chex AI: Arizona Chooses Car Damage Detection Software',
    description:
      'Professional car damage detection software is now available in Phoenix Tucson, & Scottsdale, helping local drivers identify hidden issues after any minor fender-bender.',
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: ctaBackground.src,
    imageOpacityClassName: 'opacity-100',
  },
} as const satisfies LocationPageContent
