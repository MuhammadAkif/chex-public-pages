import {
  commercialFleetDefaultContent as base,
  type CommercialFleetContent,
} from '@/app/(site)/commercial-fleet-inspection-service/content'

/**
 * Content for the Car Rental service page (Figma node 2748-6601). Same layout
 * as the Commercial Fleet page, so it reuses the section components and icon
 * assets. Sections that are identical (benefits, how-it-works, FAQ, insurers
 * stats/features) are inherited from {@link commercialFleetDefaultContent}.
 *
 * The Figma four-step cards for this page have no metric/pills (those were
 * leftover placeholders in the design), so they render as number + title +
 * description only.
 */
export const rentalDefaultContent: CommercialFleetContent = {
  ...base,
  meta: {
    title: 'AI Car Rental Vehicle Inspections',
    description:
      'Automate vehicle inspections for car rental and leasing companies — AI damage detection, accurate cost allocation, and a standardized condition report in minutes.',
  },
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'Car Rental: Allocate damage\ncosts accurately with AI',
    description:
      'Automate vehicle inspections for car rental & leasing companies to help cut down on inspection time, improve accuracy, and protect vehicle value.',
    primaryCta: { label: '', href: '/contact-us' },
    secondaryCta: { label: 'Request a demo', href: '/contact-us' },
    media: '/commercial-fleet/bbeffa7e93b224bd73996c4f2d3e1e5b20253a78.png',
  },
  flow: {
    title: 'Use Cases for AI in Car Rental',
    description:
      'Streamline damage assessments and cost allocation with AI-powered vehicle inspections.',
    steps: [
      {
        number: '01',
        title: 'Vehicle Delivery Inspection',
        description:
          'New cars are received at the location, inspected for damage, registered, and prepared for use.',
        metricLabel: '',
        metric: '',
        pills: ['No account setup', 'State rules pre-loaded', 'Pay once, no subscription'],
      },
      {
        number: '02',
        title: 'Check-In/Check-Out Inspection',
        description:
          "Inspection and documentation of a vehicle's condition, mileage, and fuel level during customer pickup and return.",
        metricLabel: '',
        metric: '',
        pills: ['12 guided captures', 'Live quality coaching', 'VIN, plate & odometer auto-read'],
      },
      {
        number: '03',
        title: 'De-Fleeting Inspection',
        description:
          "The removal of vehicles from the active fleet, typically for resale, retirement, or to optimize the fleet's size and condition.",
        metricLabel: '',
        metric: '',
        pills: ['95–99% detection accuracy', 'Fraud & tampering checks', 'Certified human sign-off'],
      },
      {
        number: '04',
        title: 'Off-Leasing Inspection',
        description: 'The return of leased vehicles to the leasing company at the end of their term.',
        metricLabel: '',
        metric: '',
        pills: ['Platform-ready PDF', 'Permanent audit trail', 'Free re-capture if rejected'],
      },
    ],
  },
  platform: {
    title: 'A consistent damage check, every time',
    description:
      'Most tools do one or the other. Chex.AI runs your compliance workflow and your damage documentation from the same 360° capture.',
    features: [
      {
        title: 'Pickup vs return comparison',
        description:
          '21 damage types, scored consistently on every file no inspector-to-inspector variance.',
        icon: 'check',
        highlighted: true,
      },
      {
        title: 'Timestamped photo evidence',
        description: 'Flags manipulated, duplicate, or stale images before they enter a claim.',
        icon: 'doc',
      },
      {
        title: 'Auto damage documentation',
        description: 'Detected damage converts to a line-item cost estimate automatically.',
        icon: 'shield',
      },
      {
        title: 'VIN, plate & odometer capture',
        description: 'Key policy data captured from images no manual entry, no transcription errors.',
        icon: 'plate',
      },
      {
        title: 'Faster turnaround',
        description: 'A documented baseline at inception to verify condition and cut renewal disputes.',
        icon: 'chart',
      },
      {
        title: 'Fleet & rental system integration',
        description: 'Push standardized reports into your systems, or run as a hosted policyholder link.',
        icon: 'code',
      },
    ],
  },
  community: {
    ...base.community,
    inspectTitle: 'A check at pickup, a check at return,',
    inspectHighlight: 'at every location, in minutes.',
    manageTitle: 'See Chex.AI at your rental counter',
    manageImage: '/commercial-fleet/7ef2bfb7c953854614134194d64b5d2cfe0ff3e2.png',
  },
  fleetOperators: {
    ...base.fleetOperators,
    eyebrow: 'Car rental service',
    title: 'Chex.AI gives car rental remote vehicle inspections.',
    background: '/commercial-fleet/ba97b26d6479cf5e1277840eff52f744df2494c6.png',
    secondaryCta: { label: '', href: '/contact-us' },
  },
  cta: {
    ...base.cta,
    title: 'Fewer disputes, faster turnaround, less leakage',
  },
}
