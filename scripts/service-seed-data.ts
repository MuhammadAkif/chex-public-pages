import type { CommercialFleetContent } from '../src/app/(site)/commercial-fleet-inspection-service/content'

/**
 * Shapes a {@link CommercialFleetContent} object into the `updateGlobal` data
 * payload used by every service-page seed (commercial fleet, insurance, …).
 */
export function serviceSeedData(d: CommercialFleetContent) {
  return {
    meta: { ...d.meta },
    hero: {
      rating: d.hero.rating,
      title: d.hero.title,
      description: d.hero.description,
      primaryCta: { ...d.hero.primaryCta },
      secondaryCta: { ...d.hero.secondaryCta },
      media: d.hero.media,
    },
    flow: {
      title: d.flow.title,
      description: d.flow.description,
      steps: d.flow.steps.map((s) => ({
        number: s.number,
        title: s.title,
        description: s.description,
        metricLabel: s.metricLabel,
        metric: s.metric,
        pills: s.pills.map((text) => ({ text })),
      })),
    },
    platform: {
      title: d.platform.title,
      description: d.platform.description,
      features: d.platform.features.map((f) => ({
        title: f.title,
        description: f.description,
        icon: f.icon,
        highlighted: Boolean(f.highlighted),
      })),
    },
    community: {
      trendingTitle: d.community.trendingTitle,
      stats: d.community.stats.map((s) => ({ value: s.value, label: s.label })),
      inspectTitle: d.community.inspectTitle,
      inspectHighlight: d.community.inspectHighlight,
      manageTitle: d.community.manageTitle,
      manageBullets: d.community.manageBullets.map((b) => ({ label: b.label, text: b.text })),
      manageImage: d.community.manageImage,
      manageBadge: d.community.manageBadge,
      trustedTitle: d.community.trustedTitle,
      trustedLogos: d.community.trustedLogos.map((label) => ({ label })),
    },
    howItWorks: {
      title: d.howItWorks.title,
      description: d.howItWorks.description,
      steps: d.howItWorks.steps.map((s) => ({
        step: s.step,
        title: s.title,
        description: s.description,
        image: s.image,
      })),
    },
    benefits: {
      title: d.benefits.title,
      items: d.benefits.items.map((b) => ({
        title: b.title,
        description: b.description,
        icon: b.icon,
        highlighted: Boolean(b.highlighted),
        wide: Boolean(b.wide),
      })),
    },
    fleetOperators: {
      eyebrow: d.fleetOperators.eyebrow,
      title: d.fleetOperators.title,
      description: d.fleetOperators.description,
      primaryCta: { ...d.fleetOperators.primaryCta },
      secondaryCta: { ...d.fleetOperators.secondaryCta },
      background: d.fleetOperators.background,
      stats: d.fleetOperators.stats.map((s) => ({ value: s.value, label: s.label })),
      features: d.fleetOperators.features.map((f) => ({
        icon: f.icon,
        title: f.title,
        description: f.description,
      })),
    },
    testimonials: {
      title: d.testimonials.title,
      description: d.testimonials.description,
      label: d.testimonials.label,
      items: d.testimonials.items.map((t) => ({
        name: t.name,
        quote: t.quote,
        stars: t.stars,
        avatar: t.avatar ?? null,
      })),
    },
    faq: {
      title: d.faq.title,
      description: d.faq.description,
      items: d.faq.items.map((f) => ({ question: f.question, answer: f.answer })),
    },
    cta: {
      title: d.cta.title,
      description: d.cta.description,
      primaryCta: { ...d.cta.primaryCta },
      secondaryCta: { ...d.cta.secondaryCta },
      note: d.cta.note,
      background: d.cta.background,
    },
  }
}
