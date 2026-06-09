/**
 * Canonical content for the AI-Vehicle-Inspection landing page (/landing-page).
 *
 * This object is the single source of truth for the page copy and the S3 image
 * URLs that were imported from the Figma "Chex.ai Revamp" design. It is consumed
 * directly by the route while seeding, and it mirrors the shape of the
 * `landing-page` Payload global (see src/globals/LandingPage.ts) so it can also
 * be used to seed the CMS.
 */

const S3 = 'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/landing-page'

export type LandingSolutionVariant = 'full' | 'card-light' | 'card-peach'

export type LandingPageContent = {
  meta: {
    title: string
    description: string
  }
  hero: {
    ratingText: string
    titleAccent: string
    title: string
    description: string
    buttonLabel: string
    image: string
  }
  trusted: {
    title: string
    logos: ReadonlyArray<{ image: string; label: string }>
  }
  transform: {
    title: string
    description: string
    image: string
    features: ReadonlyArray<{ title: string; description: string }>
  }
  solutions: {
    title: string
    description: string
    blocks: ReadonlyArray<{
      label: string
      title: string
      description: string
      bullets: ReadonlyArray<string>
      buttonLabel: string
      image: string
      variant: LandingSolutionVariant
    }>
  }
  testimonials: {
    title: string
    description: string
    label: string
    items: ReadonlyArray<{
      name: string
      quote: string
      stars: number
      avatar?: string
    }>
  }
  faq: {
    title: string
    items: ReadonlyArray<{ question: string; answer: string }>
  }
  achievements: {
    title: string
    description: string
    backgroundImage: string
    stats: ReadonlyArray<{ value: string; label: string }>
    note: string
    buttonLabel: string
  }
  inspect: {
    eyebrow: string
    titleLead: string
    titleAccentA: string
    titleMid: string
    titleAccentB: string
    titleTail: string
    subtitle: string
    description: string
    buttonLabel: string
    testimonial: { name: string; quote: string; role: string; image: string }
  }
  articles: {
    eyebrow: string
    title: string
    items: ReadonlyArray<{ tag: string; title: string; image: string; href?: string }>
  }
}

export const landingContent: LandingPageContent = {
  meta: {
    title: 'AI Vehicle Inspection Software — Automate Damage Detection & Claims | Chex.AI',
    description:
      'Chex.AI replaces physical inspections with AI-powered vehicle inspection software. Detect damage across 163 vehicle parts with 95–99% accuracy and get a detailed report in minutes.',
  },
  hero: {
    ratingText: '4.9 (1667+ reviews)',
    titleAccent: 'AI Vehicle Inspection',
    title: 'Software — Automate Damage Detection & Claims',
    description:
      'Eliminate the need for physical inspections with <strong>Chex</strong>’ “<strong>AI-powered</strong>” vehicle inspection solutions. Get a detailed inspection report within a few minutes. Most people require digital vehicle inspection solutions to claim their insurance.',
    buttonLabel: 'Request a demo',
    image: `${S3}/feat-rideshare-b.png`,
  },
  trusted: {
    title: 'Trusted By Leading Insurance & Automotive Brands',
    logos: [
      { image: `${S3}/logo-fleetmgmt.png`, label: 'Fleet Management Systems' },
      { image: `${S3}/logo-uniquetrack.png`, label: 'Unique Track' },
      { image: `${S3}/logo-samsara.png`, label: 'Samsara' },
      { image: `${S3}/logo-fleetio.png`, label: 'Fleetio' },
      { image: `${S3}/logo-holidaycars.png`, label: 'HolidayCars.com' },
      { image: `${S3}/logo-zurich.png`, label: 'Zurich' },
    ],
  },
  transform: {
    title: 'Transform Vehicle Inspections With AI Technology',
    description:
      'Chex.AI delivers AI-powered vehicle inspection solutions that reduce inspection time from hours to seconds. Our technology detects damage across 163 vehicle parts with 95-99% accuracy.',
    image: `${S3}/transform.png`,
    features: [
      {
        title: 'Generate Inspection Reports Within Seconds',
        description:
          'Our proprietary AI is trained to detect 21 types of damages on all vehicle types and generate a detailed report in just a few seconds.',
      },
      {
        title: 'Real-Time Fraud Detection',
        description:
          'Timestamped, geotagged capture and AI image analysis flag manipulated or reused media before it ever reaches a claim.',
      },
      {
        title: "Analyse Your Vehicle's Image Quality",
        description:
          'Live guidance checks lighting, framing and blur as the driver records, so every submission is audit-ready the first time.',
      },
      {
        title: 'Automate Inspections With Fixed Cameras',
        description:
          'Connect lot and gate cameras to run unattended check-in and check-out inspections at scale.',
      },
      {
        title: 'Claim Estimates, Calculated In Seconds',
        description:
          'Detected damage is mapped to parts and labour to return a defensible repair estimate instantly.',
      },
      {
        title: 'Auto-Scan Important Information',
        description:
          'VIN, odometer and licence plate are read automatically and attached to every inspection record.',
      },
    ],
  },
  solutions: {
    title: 'Chex AI: The Fastest Vehicle Damage Assessment Tool On The Market',
    description:
      'Drivers and fleets are saving money with our app for vehicle inspection — the most cost-effective way to handle routine vehicle checks.',
    blocks: [
      {
        label: 'Fleet Management',
        title: 'Commercial Fleet Inspections (DVIR & Damage Detection)',
        description:
          '<strong>Chex.AI</strong> helps fleets digitize Driver Vehicle Inspection Reports (DVIR) and automate damage documentation for trucks, vans, and commercial vehicles. Fleet operators can configure inspection workflows while monitoring compliance and vehicle health through a centralized dashboard.',
        bullets: [
          'Improved safety and DOT compliance',
          'Reduced vehicle damage disputes',
          'Increased driver accountability',
          'Faster maintenance issue identification',
          'Elimination of paper-based inspections',
        ],
        buttonLabel: 'Request a demo',
        image: `${S3}/feat-fleet.png`,
        variant: 'full',
      },
      {
        label: 'Insurance Claims',
        title: 'Insurance — Underwriting & Claims Processing',
        description:
          '<strong>Chex.AI</strong> supports insurance carriers with remote vehicle inspections used for underwriting, policy verification, and claims processing. AI-assisted damage detection and timestamped evidence collection create a standardized and scalable inspection process.',
        bullets: [
          'Faster underwriting and claims decisions',
          'Standardized vehicle condition documentation',
          'Improved customer experience',
          'Lower field inspection costs',
          'Reduced fraud risk',
        ],
        buttonLabel: 'Request a demo',
        image: `${S3}/feat-insurance.png`,
        variant: 'card-light',
      },
      {
        label: 'Rental Vehicles',
        title: 'Rental Car Companies',
        description:
          '<strong>Chex.AI</strong> enables rental operators to conduct digital check-in and check-out inspections with AI-powered damage detection and condition reporting. The platform supports both employee-assisted and self-service workflows.',
        bullets: [
          'Reduced renter damage disputes',
          'Faster vehicle turnaround',
          'Better documentation for repairs and claims',
          'Improved operational transparency',
          'Lower inspection overhead',
        ],
        buttonLabel: 'Request a demo',
        image: `${S3}/feat-rental.png`,
        variant: 'card-peach',
      },
      {
        label: 'Towing & Valet',
        title: 'Towing & Valet Services',
        description:
          '<strong>Chex.AI</strong> allows towing companies and valet operators to document vehicle condition before transport, storage, or parking. Digital inspection records help protect businesses against false claims and liability disputes.',
        bullets: [
          'Reduced liability exposure',
          'Improved customer transparency',
          'Faster and more consistent inspections',
          'Reliable digital audit trail',
          'Simplified dispute resolution',
        ],
        buttonLabel: 'Request a demo',
        image: `${S3}/feat-towing.png`,
        variant: 'card-light',
      },
      {
        label: 'Rideshare Inspections Service',
        title: 'Rideshare Inspections',
        description:
          "<strong>Chex.AI</strong> helps rideshare platforms and fleet partners run fast, standardized vehicle inspections at driver onboarding and on a recurring schedule. Drivers complete guided self-service inspections from their phone, while operators get consistent, verifiable records of every vehicle's condition and compliance status.",
        bullets: [
          'Faster driver onboarding and approval',
          'Verified vehicle safety and compliance',
          'Consistent, repeatable inspection standards',
          'Reliable records for audits and disputes',
          'Lower inspection cost at fleet scale',
        ],
        buttonLabel: 'Request a demo',
        image: `${S3}/feat-rideshare-b.png`,
        variant: 'card-peach',
      },
    ],
  },
  testimonials: {
    title: 'Feedback from our verified clients',
    description:
      'Drivers, fleets and rental operators trust Chex.AI to certify their vehicles faster — here is what they have to say.',
    label: 'Customer testimonials',
    items: [
      { name: 'Mark Melancon', quote: 'The support team helped me when Uber was not accepting my inspection. Resolved it quickly and professionally.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=11' },
      { name: 'Kelsey Proofreads', quote: "Process was simple, quick, and informative. They make sure you have an explanation and an example photo/video for what they're looking for. I got my results about 20 minutes after completing my inspection.", stars: 5, avatar: 'https://i.pravatar.cc/100?img=5' },
      { name: 'Mary Lugo', quote: 'Quick and easy to use. The interface made everything straightforward from start to finish.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=9' },
      { name: 'Mubarak Behi', quote: 'Quick and efficient! Great price and easy to upload all photos and videos required. Will definitely recommend and use it next year!', stars: 5, avatar: 'https://i.pravatar.cc/100?img=15' },
      { name: 'Angela Bishop', quote: 'Chex.ai was really easy to use, better than going to the mechanic!', stars: 5, avatar: 'https://i.pravatar.cc/100?img=23' },
      { name: 'Ali Alshammari', quote: "Rideshare for five years now and I have tried other services — this is by far the best! Easiest to complete and lowest price I've seen out there.", stars: 5, avatar: 'https://i.pravatar.cc/100?img=33' },
      { name: 'Hovannss Kupelyan', quote: 'Positive value. Got my inspection done in under 10 minutes. Highly recommend to any rideshare driver.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=52' },
      { name: 'Slamnjamin Dio', quote: 'Excellent customer service! They walked me through every step and made sure I was fully certified before the end of the day.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=60' },
      { name: 'Mousa Naseer', quote: 'The app was easy to follow, the pictures showing what was required made it simple. Upload was fast and they had the inspection back within a half hour. Well worth the money.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=67' },
      { name: 'Andressa Amorim', quote: 'Chex.ai was really easy to use, better than going to the mechanic!', stars: 5, avatar: 'https://i.pravatar.cc/100?img=44' },
      { name: 'James Tillman', quote: "It beats scheduling an appointment with a mechanic. A handful of snapshots and a few minutes of your time and you're done.", stars: 5, avatar: 'https://i.pravatar.cc/100?img=70' },
      { name: 'Sofia Reyes', quote: "I've been using Chex.AI for two years straight. Every renewal is just as smooth as the first time.", stars: 5, avatar: 'https://i.pravatar.cc/100?img=47' },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        question: 'What are the 2026 eDVIR standards for commercial fleets?',
        answer:
          'As of 2026, federal and state mandates require electronic Driver Vehicle Inspection Reports (eDVIRs) to include time-stamped, high-resolution visual evidence of vehicle health. Chex.AI automates this by integrating AI vehicle detection directly into your reporting software, ensuring every fleet vehicle is audit-ready and 100% compliant.',
      },
      {
        question: 'Can an AI car inspection app detect hidden structural damage?',
        answer:
          'Chex.AI is trained on millions of vehicle images to detect 21 types of damage across 163 parts, including subtle panel misalignment and prior-repair indicators that signal underlying structural damage. Flagged areas are highlighted in the report so a human reviewer can confirm severity.',
      },
      {
        question: 'Is the Chex.AI app compliant with hands-free driving laws?',
        answer:
          'Yes. Inspections are completed while the vehicle is parked and the engine is off, using a guided capture flow. Nothing about the workflow requires a driver to interact with a device while operating the vehicle.',
      },
      {
        question: 'How does the AI inspection assistant work for used vehicles?',
        answer:
          'Capture a short guided video of any used vehicle and Chex.AI returns a condition report with detected damage, estimated repair cost and an AI-verified record you can share with buyers, sellers or insurers in minutes.',
      },
      {
        question: 'How does Chex.AI meet 2026 rideshare inspection requirements?',
        answer:
          'Chex.AI produces standardized, timestamped inspection certificates accepted by major rideshare platforms. Drivers complete a self-service inspection from their phone and receive a compliant certificate the same day — no garage visit required.',
      },
    ],
  },
  achievements: {
    title: 'Our Achievements',
    description: 'Our success says everything about our digital vehicle inspection',
    backgroundImage: `${S3}/achievements-bg.png`,
    stats: [
      { value: '0.56M+', label: 'Inspections Conducted' },
      { value: '10+', label: 'Countries' },
      { value: '$5M+', label: 'saved in Inspection costs' },
    ],
    note: 'Any customer can capture a 360° video of a vehicle using our guidance system on a smartphone, and we will deliver a comprehensive inspection report including damage details, $ claim value etc. within seconds.',
    buttonLabel: 'Request a demo',
  },
  inspect: {
    eyebrow: 'For companies looking to',
    titleLead: 'Inspect',
    titleAccentA: 'Inspect',
    titleMid: ' every vehicle ',
    titleAccentB: 'in minutes',
    titleTail: ', not hours.',
    subtitle: 'Transform Vehicle Inspections with AI Technology',
    description:
      "Chex.AI delivers AI-powered vehicle inspections that cut inspection time from hours to minutes. Our technology detects every vehicle damage and the results are documented automatically, so your team stops chasing paperwork. Whether you're a rideshare driver, managing a rental or car-share fleet, or running a dealership lot, you get faster throughput and a defensible record for every inspection.",
    buttonLabel: 'Request a demo',
    testimonial: {
      name: 'Becky Nelson',
      quote:
        'Positive value. Got my inspection done in under 10 minutes. Highly recommend to any rideshare driver.',
      role: '@ fleet manager spot',
      image: `${S3}/becky.png`,
    },
  },
  articles: {
    eyebrow: 'BLOG',
    title: 'Articles on faster, AI-powered inspection processes.',
    items: [
      { tag: 'Uber Inspection', title: 'Vehicle Inspections For Uber Turo — pass online in minutes', image: `${S3}/article-uber.png`, href: '/blogs' },
      { tag: 'Lyft Inspection', title: 'Vehicle Inspections For Lyft Turo — pass online in minutes', image: `${S3}/article-lyft.png`, href: '/blogs' },
      { tag: 'AI Vehicle Inspection', title: 'AI powered car inspection through the Chex.AI mobile app', image: `${S3}/article-ai.png`, href: '/blogs' },
      { tag: 'Turo', title: 'From idea to launch: building digital inspection products', image: `${S3}/article-turo.png`, href: '/blogs' },
    ],
  },
}
