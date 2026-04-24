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
import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'

const overviewVehicle =
  'http://localhost:3845/assets/2940aaf1feafbaf831cf39f0436a6e4a6ae8a768.png'
const regionLittleRock =
  'http://localhost:3845/assets/5e93349d750cb0388ec1b718df9a6a7b6163ff19.png'
const regionFayetteville =
  'http://localhost:3845/assets/f77b47f7ead108d47e27bd4361883d14dea6169d.png'

export const arkansasContent = {
  pageClassName:
    'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'Arkansas’s Premier Auto Inspection Platform for Car Auctions',
    description:
      'Protect your Arkansas dealership from intake fraud with Chex AI. Our software cross-references images to identify digital tampering, ensuring every report you receive is authentic and accurate.',
    primaryLabel: 'Register your Inspection Today',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required',
    demoHref: '#arkansas-demo',
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
    title: 'EV Resale Protection with our Vehicle Inspection Tool',
    paragraphs: [
      'The used EV market in Fayetteville is officially gaining serious momentum, but as any local Tesla or Rivian owner knows, Arkansas weather can be a bit of a wildcard for long-term value. Between the gravel roads leading out to the Ozarks and the intense summer humidity, your car’s exterior takes a quiet beating every single day. When it’s time to trade in or sell, "good condition" is a hard thing to prove with just a few smartphone photos.',
      'That’s where our vehicle inspection tool changes the game for local owners. We’ve built a system that doesn’t just take pictures, it builds a forensic "health certificate" for your EV. Our car damage detection software picks up on the tiny things that humans usually miss, like micro-pitting from road grit or the very first signs of paint oxidation from sun exposure. In a tech-heavy city like Little Rock, buyers expect data, and having a professional-grade report ensures you get every penny of your EV’s true worth without the typical back-and-forth haggling.',
    ],
    image: overviewVehicle,
    imageAlt: 'Arkansas EV resale protection inspection preview',
  },
  services: {
    eyebrow: 'Services',
    title: 'AI-Powered Vehicle Inspection & Damage Detection',
    description:
      'Chex.AI delivers instant, automated car inspections using advanced artificial intelligence. From dents and scratches to safety checks, our system analyzes vehicle photos in real time, generates detailed reports, and streamlines documentation for the mobility industry.',
    ctaLabel: 'Read more our services',
    demoHref: '#arkansas-demo',
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
          "Keeping your Uber status in South Carolina shouldn’t cost you a day of earnings. Our artificial intelligence vehicle detection walks you through a full 19-point scan using just your phone. We make sure you’re road-ready from the Upstate to the Lowcountry.",
        image: serviceUber.src,
      },
    ],
  },
  showcase: {
    title: 'Chex AI: The All-in-One Vehicle Inspection Tool',
    description:
      'Chex AI captures 360-degree views to provide a comprehensive exterior health report, leaving no panel or corner unexamined.',
    buttonLabel: 'Book a demo',
    demoHref: '#arkansas-demo',
    items: [
      {
        number: '01',
        title: 'GPS-Verified',
        description:
          'Every scan is anchored with location data and timestamps, creating a secure, unalterable audit trail that proves exactly when and where your inspection occurred.',
      },
      {
        number: '02',
        title: 'Microscopic Defect',
        description:
          'Our high-resolution AI identifies flaws as small as 0.2mm, capturing subtle dings and structural shifts that human eyes consistently overlook.',
      },
      {
        number: '03',
        title: 'Resale Valuations',
        description:
          "Generate objective, data-backed condition reports that eliminate haggling and justify your asking price with forensic evidence of your vehicle's integrity.",
      },
      {
        number: '04',
        title: 'Forensic Paint',
        description:
          'Detect subtle oxidation, chemical etching, and overspray with advanced sensors that analyze surface texture and color consistency across every panel.',
      },
    ],
    visual: {
      variant: 'organic-frame',
      showGlow: true,
    },
  },
  regions: {
    title: 'Private Seller Transparency with Chex AI',
    description:
      'Build immediate buyer trust by sharing a certified AI vehicle condition analysis that justifies your asking price with data.',
    demoHref: '#arkansas-demo',
    headingClassName: 'max-w-4xl',
    articleClassName: 'sm:grid-cols-[0.92fr_1fr]',
    items: [
      {
        city: 'Little Rock',
        description: 'Detect urban smog damage and protect metropolitan resale value.',
        image: regionLittleRock,
      },
      {
        city: 'Fayetteville',
        description: 'Track Ozark road grit wear and ensure EV safety.',
        image: regionFayetteville,
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
    demoHref: '#arkansas-demo',
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
    idBase: 'arkansas',
    title: 'Frequently asked questions',
    description:
      'Ask vereything you need to know about our product and services. we are here to answer of your questions.',
    items: [
      {
        question: 'Why Is Chex Ai The Favorite For Arkansas Auctioneers?',
        answer:
          'It combines the speed of Silicon Valley tech with local market compliance, making it the most trusted way to manage risk and maximize auction revenue.',
      },
      {
        question: 'How Accurate Is The Ai In Identifying Hail Damage Common In Arkansas?',
        answer:
          'Chex.ai uses guided photos and computer vision to flag small dents, panel patterns, and surface changes that are easy to miss during a quick walkaround. The result is faster triage and clearer documentation for auction, insurance, or repair review.',
      },
      {
        question: 'Does The Software Track Tire Tread Depth And Sidewall Safety?',
        answer:
          'The inspection flow captures tire and sidewall condition as part of the vehicle record, helping teams spot visible wear, damage, or safety concerns. For exact tread measurements, the digital report can be paired with a manual gauge reading.',
      },
      {
        question: 'Is There A Way To Triage "Yellow Light" Caution Vehicles Automatically?',
        answer:
          'Yes. Chex.ai can help separate clean units from vehicles that need closer review by flagging visible condition concerns and organizing them in a structured report. That makes it easier to prioritize repairs, disclosures, or manager approval.',
      },
      {
        question: 'Does Chex Ai Support "As-Is" Sales For Units Under $3,000?',
        answer:
          'Chex.ai helps document the condition of lower-value units with clear photos and inspection notes before sale. It does not replace your sales terms, but it gives buyers and sellers a more transparent record for as-is decisions.',
      },
    ],
  },
  cta: {
    sectionId: 'arkansas-demo',
    title: 'Commercial Safety and Auto Inspection Platform',
    description:
      'Chex AI offers DSPs a dashboard for monitoring vehicle health, reducing annual repair costs through improved damage tracking.',
    primaryLabel: 'Verify Your Next Vehicle',
    secondaryLabel: 'Request a demo',
    helperText: 'No credit card required, cancel anytime.',
    image: ctaBackground.src,
    imageOpacityClassName: 'opacity-100',
  },
} as const satisfies LocationPageContent
