import {
  commercialFleetDefaultContent as base,
  type CommercialFleetContent,
} from '@/app/(site)/commercial-fleet-inspection-service/content'

/**
 * Content for the Insurance service page (Figma node 2668-6451). Its layout is
 * identical to the Commercial Fleet page, so it reuses the same section
 * components and icon assets — only the copy and a few photos differ. Sections
 * that are identical (four-step flow, benefits, how-it-works, FAQ) are
 * inherited from {@link commercialFleetDefaultContent}.
 */
export const insuranceDefaultContent: CommercialFleetContent = {
  ...base,
  meta: {
    title: 'AI-Powered Insurance Vehicle Inspections',
    description:
      'Chex.AI turns any smartphone into a remote vehicle inspection — AI damage detection across 163 parts at 95–99% accuracy and a standardized, fraud-checked report in minutes. Settle claims and underwrite without sending an adjuster.',
  },
  hero: {
    rating: '4.9 (1667+ reviews)',
    title: 'Settle claims and underwrite\nwithout sending an adjuster.',
    description:
      'Chex.AI turns any smartphone into a remote vehicle inspection. AI detects damage across 163 parts at 95–99% accuracy and returns a standardized, fraud-checked report in minutes — so decisions happen faster, at lower cost.',
    // primaryCta renders as the outline button on the left, secondaryCta as the
    // orange button on the right (see CommercialFleetHero).
    primaryCta: { label: '', href: '/contact-us' },
    secondaryCta: { label: 'Request a demo', href: '/contact-us' },
    media: '/commercial-fleet/617a17e5ce45fce2983dfc1cbf7cf35c80d75494.png',
  },
  platform: {
    title: 'Standardized evidence, built for insurance',
    description:
      'Most tools do one or the other. Chex.AI runs your compliance workflow and your damage documentation from the same 360° capture.',
    features: [
      {
        title: '163-part damage detection',
        description:
          '21 damage types, scored consistently on every file no inspector-to-inspector variance.',
        icon: 'check',
        highlighted: true,
      },
      {
        title: 'Built-in fraud detection',
        description: 'Flags manipulated, duplicate, or stale images before they enter a claim.',
        icon: 'doc',
      },
      {
        title: 'Instant claim estimates',
        description: 'Detected damage converts to a line-item cost estimate automatically.',
        icon: 'shield',
      },
      {
        title: 'Auto-read VIN, plate & odometer',
        description: 'Key policy data captured from images no manual entry, no transcription errors.',
        icon: 'plate',
      },
      {
        title: 'Underwriting condition reports',
        description: 'A documented baseline at inception to verify condition and cut renewal disputes.',
        icon: 'chart',
      },
      {
        title: 'API & workflow integration',
        description: 'Push standardized reports into your systems, or run as a hosted policyholder link.',
        icon: 'code',
      },
    ],
  },
  community: {
    ...base.community,
    inspectTitle: 'Instant claim estimates: detected damage converts to a line-item',
    inspectHighlight: 'cost estimate automatically.',
    manageTitle: 'See Chex.AI on your own claims',
    manageImage: '/commercial-fleet/06b140aa07fafc2734e81c947fd674da0b9abacb.png',
  },
  fleetOperators: {
    ...base.fleetOperators,
    eyebrow: 'Insurance service',
    title: 'Chex.AI gives insurers remote vehicle inspections.',
    background: '/commercial-fleet/384e797befc2dcde451fb43de001075455146565.png',
    secondaryCta: { label: '', href: '/contact-us' },
  },
  cta: {
    ...base.cta,
    title: 'Chex.AI gives insurers remote vehicle inspections.',
  },
}
