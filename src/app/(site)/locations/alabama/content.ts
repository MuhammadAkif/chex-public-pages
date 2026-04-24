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
import overviewVehicleDamageAssessment from '@/app/(site)/assets/alabama/overview-vehicle-damage-assessment.png'
import regionBirmingham from '@/app/(site)/assets/alabama/region-birmingham.png'
import regionHuntsville from '@/app/(site)/assets/alabama/region-huntsville.png'
import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

export const alabamaContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'Remote Vehicle Damage Assessment For Alabama Commuters',
    description:
      'Birmingham, Montgomery & Huntsville commuters trust our mobile auto inspection software to keep their vehicles compliant and safe for long daily drives.',
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#alabama-demo',
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
      { label: 'Alabama', image: heroPinAlabama, featured: true },
      { label: 'Iowa', image: heroPinIowa },
      { label: 'Colorado', image: heroPinColorado },
    ],
  },
  overview: {
    title: 'Why Chex.Ai Is The Top Vehicle Damage Assessment Tool Across Alabama',
    paragraphs: [
      `If you've ever dealt with a fender-bender in the Birmingham humidity or a gravel chip on a long drive to Mobile, you know the traditional inspection process is an issue. Chex.ai has become the favorite across Alabama because it replaces the "wait-and-see" mechanic visit with an intelligent, auto-damage-detection system right on your phone.`,
      `What sets it apart for Alabama drivers is the precision of our scratch detection AI. Whether it's a minor scuff from a tight Montgomery parking spot or more significant structural damage, the AI doesn't just see "a mark", it analyses the depth and severity with professional accuracy. This is a game-changer for the state's growing fleet industry and rideshare community, where getting back on the road safely and quickly is the top priority.`,
      `You get a clear, unbiased report that documents every detail, making it the most trusted tool for anyone buying, selling, or simply maintaining a vehicle. It's not just about tech; it's about giving Alabamians their time back without compromising on safety.`,
    ],
    image: overviewVehicleDamageAssessment.src,
    imageAlt: 'Vehicle damage assessment preview for Alabama drivers',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#alabama-demo',
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
    title: 'Chex AI: The Fastest Vehicle Damage Assessment Tool On The Market',
    description:
      'Alabama drivers are saving money with our app for car inspection, the most cost-effective way to handle routine vehicle checks.',
    buttonLabel: 'Book a demo',
    demoHref: '#alabama-demo',
    items: [
      {
        number: '01',
        title: 'Fleet & DSP',
        description:
          'Automate your daily vehicle logs. Our system identifies damage instantly, keeping your delivery vans safe and your repair costs low.',
      },
      {
        number: '02',
        title: 'Uber Inspection Online',
        description:
          'The fastest way to activate your account. Simply upload photos through the app and receive your professional Uber-ready inspection report.',
      },
      {
        number: '03',
        title: 'Ride Share',
        description:
          'Pass your annual safety check from your driveway. We help gig workers get certified quickly so they never miss a shift.',
      },
      {
        number: '04',
        title: 'Mobile-First Maintenance',
        description:
          'Our software is optimized for speed and reliability, providing a high-performance inspection experience specifically for busy people on the go.',
      },
    ],
    visual: {
      variant: 'organic-frame',
      showGlow: true,
    },
  },
  regions: {
    title: "App For Car Inspection For Birmingham's, Montgomery's & Huntsville's Residents",
    description:
      'Get an expert remote vehicle damage assessment in Alabama without ever leaving your home or wasting time at a mechanic.',
    demoHref: '#alabama-demo',
    headingClassName: 'max-w-5xl',
    articleClassName: 'sm:grid-cols-[0.92fr_1fr]',
    items: [
      {
        city: 'Birmingham',
        description: 'Skip Magic City traffic with easy, digital vehicle checks.',
        image: regionBirmingham.src,
      },
      {
        city: 'Huntsville',
        description: 'Rocket City tech for your next mobile vehicle inspection.',
        image: regionHuntsville.src,
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
    demoHref: '#alabama-demo',
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
    idBase: 'alabama',
    title: 'Frequently asked questions',
    description:
      'Ask vereything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'Is The Remote Report Accepted By Local Alabama Authorities?',
        answer:
          'Our reports are designed to meet specific platform and insurance standards used throughout Alabama, including city-specific requirements for Birmingham and Huntsville.',
      },
      {
        question: "Can I Use The App If It's Raining In Huntsville?",
        answer:
          'Yes. The guided capture flow works in light rain as long as photos are clear and the vehicle is safely parked. If visibility is poor, retake the inspection when the surface and lighting allow accurate damage detection.',
      },
      {
        question: 'What If My Birmingham Commute Has Caused Heavy Tire Wear?',
        answer:
          'Chex.ai helps document visible tire wear, sidewall concerns, and related vehicle condition notes so you can act before the issue becomes a roadside problem. The report gives owners and fleet managers a clear record to review with a service provider.',
      },
      {
        question: 'How Do I Submit My Completed Form To Uber In Montgomery?',
        answer:
          'After completing the inspection, you can download or share the finished report from your account and upload it through the required Uber driver portal. Always confirm the latest platform instructions before submitting, since requirements can change.',
      },
      {
        question: 'Is There A Specific App For Car Inspection For Huntsville Fleets?',
        answer:
          'Fleet teams in Huntsville can use the same Chex.ai inspection workflow to standardize vehicle photos, condition notes, and digital reports across multiple drivers. The dashboard keeps inspections organized so managers can review issues without chasing paper forms.',
      },
    ],
  },
  cta: {
    sectionId: 'alabama-demo',
    title: 'Your Go-To Car Damage Detection Software For Fast Results',
    description:
      'Document every dent and scratch instantly with our AI. Get professional, high-speed damage reports without ever visiting an Alabama shop.',
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: ctaBackground.src,
    imageOpacityClassName: 'opacity-100',
  },
} as const satisfies LocationPageContent
