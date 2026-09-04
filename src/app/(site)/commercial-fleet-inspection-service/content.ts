import type {
  BenefitIconKey,
  FleetFeatureIconKey,
  PlatformGlyph,
} from '@/app/(site)/components/commercial-fleet/assets'

/**
 * Content model for the Commercial Fleet Inspection service page.
 *
 * This object is the single source of truth for the page copy. It is used
 * as the seed payload for the `commercial-fleet-page` Payload global and as
 * the render-time fallback when the global has not been populated yet, so the
 * page always renders even before the CMS is seeded.
 */

export type CtaLink = { label: string; href: string }

export type CommercialFleetContent = {
  meta: { title: string; description: string }
  hero: {
    rating: string
    title: string
    description: string
    primaryCta: CtaLink
    secondaryCta: CtaLink
    /** Poster image / video still shown in the hero player. */
    media: string
  }
  flow: {
    title: string
    description: string
    steps: ReadonlyArray<{
      number: string
      title: string
      description: string
      metricLabel: string
      metric: string
      pills: ReadonlyArray<string>
    }>
  }
  platform: {
    title: string
    description: string
    features: ReadonlyArray<{
      title: string
      description: string
      icon: PlatformGlyph
      highlighted?: boolean
    }>
  }
  community: {
    trendingTitle: string
    stats: ReadonlyArray<{ value: string; label: string }>
    inspectTitle: string
    inspectHighlight: string
    manageTitle: string
    manageBullets: ReadonlyArray<{ label: string; text: string }>
    manageImage: string
    manageBadge: string
    trustedTitle: string
    trustedLogos: ReadonlyArray<string>
    /** Optional image logos for the trusted marquee. When set, the marquee
     * renders these images instead of the wordmark `trustedLogos` strings. */
    trustedLogoImages?: ReadonlyArray<{ image: string; label: string }>
  }
  howItWorks: {
    title: string
    description: string
    steps: ReadonlyArray<{ step: string; title: string; description: string; image: string }>
  }
  benefits: {
    title: string
    items: ReadonlyArray<{
      title: string
      description: string
      icon: BenefitIconKey
      highlighted?: boolean
      wide?: boolean
    }>
  }
  fleetOperators: {
    eyebrow: string
    title: string
    description: string
    primaryCta: CtaLink
    secondaryCta: CtaLink
    background: string
    stats: ReadonlyArray<{ value: string; label: string }>
    features: ReadonlyArray<{ icon: FleetFeatureIconKey; title: string; description: string }>
  }
  testimonials: {
    title: string
    description: string
    label: string
    items: ReadonlyArray<{ name: string; quote: string; stars: number; avatar?: string }>
  }
  faq: {
    title: string
    description: string
    items: ReadonlyArray<{ question: string; answer: string }>
  }
  cta: {
    title: string
    description: string
    primaryCta: CtaLink
    secondaryCta: CtaLink
    note: string
    background: string
  }
}

export const commercialFleetDefaultContent: CommercialFleetContent = {
  meta: {
    title: 'AI-Powered Commercial Fleet Inspections',
    description:
      'Chex.AI turns any driver’s phone into an AI inspector: guided DVIR capture, AI damage detection across 163 parts, and a defensible report in minutes. No hardware.',
  },
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'AI-Powered Commercial Fleet Inspections',
    description:
      "Chex.AI turns any driver's phone into an AI inspector guided DVIR capture, AI damage detection across 163 parts, and a defensible report in minutes. No hardware.",
    primaryCta: { label: 'See Fleet Pricing', href: '/dsp-fleet-pricing' },
    secondaryCta: { label: 'Request a demo', href: '/contact-us' },
    media: '/commercial-fleet/3ba442eb827e222ce951bd45a0b2e52d6e16ac5a.png',
  },
  flow: {
    title: 'Four steps. About five minutes. Zero shop visits.',
    description:
      'Most drivers lose half a working day to an inspection appointment. This is the same standard, done in your own parking spot — and it never fails you for a blurry photo.',
    steps: [
      {
        number: '01',
        title: 'Tell us your platform',
        description:
          'Pick Uber, Lyft, Turo or HopSkipDrive and your state. We load the exact inspection form your platform requires — nothing generic.',
        metricLabel: 'STEP 1 / 4',
        metric: '≈ 0.8 seconds',
        pills: ['No account setup', 'State rules pre-loaded', 'Pay once, no subscription'],
      },
      {
        number: '02',
        title: 'Capture the guided walkaround',
        description:
          'On-screen framing guides walk you around the car shot by shot. Blurry, dark or incomplete frames get flagged instantly so you never fail on a bad photo.',
        metricLabel: 'STEP 2 / 4',
        metric: '≈ 1.2 minutes',
        pills: ['12 guided captures', 'Live quality coaching', 'VIN, plate & odometer auto-read'],
      },
      {
        number: '03',
        title: 'AI inspects, a human verifies',
        description:
          'Our models check 163 vehicle parts for 21 damage types, then a certified reviewer signs off on the safety items your platform cares about.',
        metricLabel: 'STEP 3 / 4',
        metric: '≈ 2 minutes',
        pills: ['95–99% detection accuracy', 'Fraud & tampering checks', 'Certified human sign-off'],
      },
      {
        number: '04',
        title: 'Certificate, same day',
        description:
          'Your signed inspection report lands in your inbox and dashboard, formatted for upload. Stored permanently for audits, disputes and renewals.',
        metricLabel: 'STEP 4 / 4',
        metric: 'Same day',
        pills: ['Platform-ready PDF', 'Permanent audit trail', 'Free re-capture if rejected'],
      },
    ],
  },
  platform: {
    title: 'DVIR compliance and AI damage detection in one platform.',
    description:
      'Most tools do one or the other. Chex.AI runs your compliance workflow and your damage documentation from the same 360° capture.',
    features: [
      {
        title: '163-part detection 95–99%',
        description: 'Detects dents, scratches, cracks, rust, missing parts across 163 parts and 21 damage types.',
        icon: 'check',
        highlighted: true,
      },
      {
        title: 'eDVIR & DOT compliance',
        description: 'Digital DVIRs with driver sign-off, timestamps, and photo evidence — audit-ready for 2026 & FMCSA.',
        icon: 'doc',
      },
      {
        title: 'Fraud & tamper detection',
        description: 'Flags manipulated, duplicate, or stale photos before they enter a report so the evidence holds up.',
        icon: 'shield',
      },
      {
        title: 'Auto VIN, plate & odometer',
        description: 'Reads the VIN, plate, and odometer from the capture — no manual data entry, no transcription errors.',
        icon: 'plate',
      },
      {
        title: 'Real-time fleet dashboard',
        description: "Monitor compliance, spot new damage the instant it's logged, and track condition trends fleet-wide.",
        icon: 'chart',
      },
      {
        title: 'API & telematics integration',
        description: 'Plug AI inspection into Samsara, Fleetio, and your own stack via a documented API and SDK.',
        icon: 'code',
      },
    ],
  },
  community: {
    trendingTitle: 'Our Community of Chex.AI is Trending Fast',
    stats: [
      { value: '50K+', label: 'Inspections' },
      { value: '5+', label: 'Years of Experience' },
      { value: '4.8*', label: 'Average Driver Rating' },
      { value: '5 min', label: 'Average Inspection Time' },
    ],
    inspectTitle: 'Inspect the whole fleet from a phone and catch the damage a',
    inspectHighlight: 'walkaround misses.',
    manageTitle: 'Manage and inspect your entire fleet online with precision.',
    manageBullets: [
      { label: 'Smart Fleet Dashboard:', text: 'Monitor inspection results and vehicle health instantly.' },
      { label: 'AI Damage Detection:', text: 'Identify exterior and interior issues with pinpoint accuracy.' },
      { label: 'Compliance Reports:', text: 'Generate automated reports for safety and operational standards.' },
      { label: 'Multi-Vehicle Management:', text: 'Handle multiple fleets from one unified dashboard.' },
    ],
    manageImage: '/commercial-fleet/b1d7b5685868d2762573f486d2fec142a606e556.png',
    manageBadge: 'AI-powered scan complete exterior condition verified with high precision.',
    trustedTitle: 'Trusted by fleets, insurers & telematics platforms',
    trustedLogos: ['HolidayCars', 'Zurich', 'Fleetio', 'Unique Track', 'Samsara'],
  },
  howItWorks: {
    title: 'How it works',
    description:
      'With a user-friendly app and comprehensive dashboard, Chex.AI streamlines inspection reviews and provides detailed insights, enhancing operational efficiency',
    steps: [
      {
        step: 'Step 01',
        title: 'Login',
        description: 'Please Login your account by filling out the form above to get started',
        image: '/commercial-fleet/0f814ad6bd4775a47d46bd3d74adb743c7054299.png',
      },
      {
        step: 'Step 02',
        title: 'Vehicle Inspection',
        description: 'Follow the instructions for each inspection point within our app and upload photo and video clips',
        image: '/commercial-fleet/37a478a44aa2d49d38f49e889be80d330e7ff61d.png',
      },
      {
        step: 'Step 03',
        title: 'Inspection Reviewed',
        description: "Enter payment details. If you don't pass, your first re-inspection is free",
        image: '/commercial-fleet/e0101486936bcb5f21f13f9a0642e8312b08c000.png',
      },
    ],
  },
  benefits: {
    title: 'Benefits we propose',
    items: [
      {
        title: 'Fast And Convenient',
        description: "Chex.AI's Inspection solution modernizes operations and is easy to use",
        icon: 'fast',
        highlighted: true,
        wide: true,
      },
      {
        title: 'Cost-Effective',
        description: 'We provide the best service at a lower cost when compared to competition',
        icon: 'cost',
      },
      {
        title: 'Increased Accuracy',
        description: 'High accuracy levels and advanced machine vision technology to accurately pinpoint the damage',
        icon: 'accuracy',
      },
      {
        title: 'Improved Customer Experience',
        description: 'With Easy To Follow Guidelines Provided In App, customers can complete inspection in minutes',
        icon: 'experience',
        wide: true,
      },
      {
        title: 'Better Risk Management',
        description: 'Visibility allows for strategic loss mitigation, allowing partners to higher profitability',
        icon: 'risk',
        wide: true,
      },
    ],
  },
  fleetOperators: {
    eyebrow: 'Platforms & fleet operators',
    title: "Running 50 cars or 5,000? Certify the whole fleet from the drivers' phones.",
    description:
      'The same inspection your drivers complete in thirty minutes becomes a standardised compliance record for your operation — with volume pricing, SSO and a dashboard your ops team actually uses.',
    primaryCta: { label: 'Request a demo', href: '/contact-us' },
    secondaryCta: { label: 'See Fleet Pricing', href: '/dsp-fleet-pricing' },
    background: '/commercial-fleet/34a0caa8752cac8f84aaca8dc1a482a4eb18193f.png',
    stats: [
      { value: '$5M+', label: 'Inspection costs saved' },
      { value: '72%', label: 'Faster driver approval' },
      { value: '5+', label: 'Years in production' },
    ],
    features: [
      {
        icon: 'onboard',
        title: 'Onboard drivers in hours',
        description:
          'Bulk invite links, driver-level status tracking and automatic reminders until every vehicle is certified.',
      },
      {
        icon: 'api',
        title: 'API & telematics ready',
        description:
          'Push inspections and results into your own onboarding flow, TMS or fleet system with one integration.',
      },
      {
        icon: 'condition',
        title: 'Condition data you can act on',
        description:
          'Fleet-wide damage trends, repair estimates and compliance status in a single operations dashboard.',
      },
    ],
  },
  testimonials: {
    title: 'Feedback from our verified clients',
    description:
      'Fleet operators, insurers, and DSPs rely on Chex.AI to keep every vehicle inspected, compliant, and audit-ready.',
    label: 'Client testimonials',
    items: [
      {
        name: 'Marcus Reed',
        quote:
          'We cut our DVIR turnaround from days to minutes. Every truck is audit-ready and the damage evidence holds up with our insurer.',
        stars: 5,
      },
      {
        name: 'Danielle Ortiz',
        quote:
          'The AI catches fresh damage the second a driver logs it. Our claims disputes dropped noticeably in the first quarter.',
        stars: 5,
      },
      {
        name: 'Priya Nair',
        quote:
          'Rolling it out took no hardware and almost no training. Drivers just open the app and the guided capture does the rest.',
        stars: 5,
      },
      {
        name: 'James Whitfield',
        quote:
          'One dashboard for the whole fleet. I can see compliance and condition trends at a glance instead of chasing paper reports.',
        stars: 5,
      },
      {
        name: 'Sofia Alvarez',
        quote:
          'The API dropped straight into our Samsara stack. Inspections now flow into the same system we already run on.',
        stars: 5,
      },
      {
        name: 'Tom Becker',
        quote:
          'Fraud and tamper detection alone paid for it. Duplicate and stale photos never make it into a report anymore.',
        stars: 5,
      },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    description:
      'Ask everything you need to know about our product and services. We are here to answer all of your questions.',
    items: [
      {
        question: 'What Are The 2026 eDVIR Standards For South Carolina Fleets?',
        answer:
          'As of March 2026, federal and state mandates require electronic Driver Vehicle Inspection Reports (eDVIRs) to include time-stamped, high-resolution visual evidence of vehicle health. Chex.AI automates this by integrating artificial intelligence vehicle detection directly into your reporting software, ensuring every fleet vehicle in the I-85 corridor is audit-ready and 100% compliant.',
      },
      {
        question: 'Can An AI Car Inspection App Detect Hidden Structural Damage?',
        answer:
          'Chex.AI’s machine vision scans 163 parts and 21 damage types, surfacing dents, scratches, cracks, rust, and missing parts at 95–99% confidence. Guided 360° capture ensures the angles needed to reveal damage a quick walkaround typically misses.',
      },
      {
        question: 'Is The Chex.AI App Compliant With The SC Hands-Free Act?',
        answer:
          'Yes. Inspections are captured while the vehicle is parked and drivers follow on-screen prompts, keeping the workflow fully compliant with hands-free requirements.',
      },
      {
        question: 'How Does The AI Damage Assistant Work For Used Vehicles?',
        answer:
          'For any vehicle, the driver completes a guided capture and Chex.AI generates a standardized, photo-backed condition report in minutes — documenting existing damage before it enters or leaves your fleet.',
      },
      {
        question: 'How Does Chex.AI Meet 2026 Commercial Fleet Requirements?',
        answer:
          'Chex.AI produces digital DVIRs with driver sign-off, timestamps, and photo evidence that are audit-ready for 2026 and FMCSA, and integrates with telematics platforms so compliance stays continuous across the fleet.',
      },
    ],
  },
  cta: {
    title: "See what your fleet's been missing.",
    description:
      'Book a 15-minute demo and watch Chex.AI inspect a vehicle, flag the damage, and generate a DOT-ready DVIR — from a single phone.',
    primaryCta: { label: 'Start free Inspection', href: '/dsp-fleet-pricing' },
    secondaryCta: { label: 'Talk to an expert', href: '/contact-us' },
    note: 'No credit card required, cancel anytime.',
    background: '/commercial-fleet/e6f8b26ad7224dbe8d69c22da29e32143ec9fc30.png',
  },
}
