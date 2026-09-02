import {
  commercialFleetDefaultContent as base,
  type CommercialFleetContent,
} from '@/app/(site)/commercial-fleet-inspection-service/content'

/**
 * Content for the Towing & Valet service page (Figma node 2765-2476). Same
 * layout as the Commercial Fleet page; reuses the section components + icon
 * assets. Identical sections (benefits, how-it-works, FAQ, insurers
 * stats/features) are inherited from {@link commercialFleetDefaultContent}.
 *
 * The four-step cards have no metric/pills in this design, so they render as
 * number + title + description. The card descriptions in Figma were leftover
 * placeholders, so short copy matching each step title is used instead.
 */
export const towingValetDefaultContent: CommercialFleetContent = {
  ...base,
  meta: {
    title: 'AI Vehicle Inspections for Towing & Valet',
    description:
      'Chex.AI documents a vehicle’s condition the moment it enters your custody — a quick AI scan creates a reliable, timestamped record of pre-existing damage to defend against false claims.',
  },
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'Prove the damage was already\nthere before the false claim.',
    description:
      "Chex.AI helps towing companies and valet operators document a vehicle's condition the moment it's taken into custody. A quick AI scan creates a reliable, timestamped record of pre-existing damage.",
    primaryCta: { label: '', href: '/contact-us' },
    secondaryCta: { label: 'Request a demo', href: '/contact-us' },
    media: '/commercial-fleet/4f56fd038f394d04052a5962dfd427ddcd6c9dbe.png',
  },
  flow: {
    title: 'A record of condition at the moment of custody',
    description: 'Any operator can capture a vehicle from a phone — no shop visit, no paper form.',
    steps: [
      {
        number: '01',
        title: 'Take custody',
        description:
          "Log the vehicle the moment it's hooked, loaded or handed over — straight from the operator's phone.",
        metricLabel: '',
        metric: '',
        pills: ['No account setup', 'State rules pre-loaded', 'Pay once, no subscription'],
      },
      {
        number: '02',
        title: 'Quick AI scan',
        description:
          'A guided walkaround captures every panel; AI checks 163 parts and flags existing damage in minutes.',
        metricLabel: '',
        metric: '',
        pills: ['12 guided captures', 'Live quality coaching', 'VIN, plate & odometer auto-read'],
      },
      {
        number: '03',
        title: 'Condition report',
        description:
          'A timestamped, geotagged report documents the exact condition at intake — no paper form.',
        metricLabel: '',
        metric: '',
        pills: ['95–99% detection accuracy', 'Fraud & tampering checks', 'Certified human sign-off'],
      },
      {
        number: '04',
        title: 'Stay protected',
        description:
          'The signed record is stored permanently as defensible evidence against false or inflated claims.',
        metricLabel: '',
        metric: '',
        pills: ['Platform-ready PDF', 'Permanent audit trail', 'Free re-capture if rejected'],
      },
    ],
  },
  platform: {
    title: 'A reliable digital record you can stand behind',
    description:
      'Most tools do one or the other. Chex.AI runs your compliance workflow and your damage documentation from the same 360° capture.',
    features: [
      {
        title: 'Intake condition documentation',
        description: "Capture the vehicle's exact state at the moment it enters your custody.",
        icon: 'check',
        highlighted: true,
      },
      {
        title: 'Pre-existing damage record',
        description: 'Flags manipulated, duplicate, or stale images before they enter a claim.',
        icon: 'doc',
      },
      {
        title: 'Timestamped, geotagged evidence',
        description: 'Detected damage converts to a line-item cost estimate automatically.',
        icon: 'shield',
      },
      {
        title: 'Reliable digital audit trail',
        description: 'Key policy data captured from images no manual entry, no transcription errors.',
        icon: 'plate',
      },
      {
        title: 'Fast, consistent scans',
        description: 'A documented baseline at inception to verify condition and cut renewal disputes.',
        icon: 'chart',
      },
      {
        title: 'Multi-lot standardization',
        description: 'Push standardized reports into your systems, or run as a hosted policyholder link.',
        icon: 'code',
      },
    ],
  },
  community: {
    ...base.community,
    inspectTitle: 'The same standard applied to every vehicle taken into custody,',
    inspectHighlight: 'in minutes.',
    manageTitle: 'See Chex.AI at intake, no shop visit, no paper form.',
    manageImage: '/commercial-fleet/32260b5682bc1e88fb18c5337888c55dff4168c3.png',
  },
  fleetOperators: {
    ...base.fleetOperators,
    eyebrow: 'Towing & valet service',
    title: 'Smart AI inspections for towing and valet operations.',
    background: '/commercial-fleet/97562718904b151f9acd557cddf49d48944d269e.png',
    secondaryCta: { label: '', href: '/contact-us' },
  },
  cta: {
    ...base.cta,
    title: 'Secure Every Hand-Off with AI Inspection',
  },
}
