import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'
import type { BenefitIconKey, FleetFeatureIconKey, PlatformGlyph } from './assets'

/**
 * Maps a Payload service-page global document onto {@link CommercialFleetContent},
 * falling back to a bundled default per field. Shared by every page that reuses
 * the commercial-fleet section components (commercial-fleet, insurance, …) so
 * they render correctly even before their global is seeded.
 */

export type Loose = Record<string, unknown>

const str = (value: unknown, fb: string): string =>
  typeof value === 'string' && value.trim().length > 0 ? value : fb

const num = (value: unknown, fb: number): number => (typeof value === 'number' ? value : fb)

/** Uses the CMS array when it has rows, otherwise the bundled default. */
function rows(value: unknown, fb: ReadonlyArray<unknown>): Loose[] {
  return Array.isArray(value) && value.length > 0 ? (value as Loose[]) : (fb as unknown as Loose[])
}

function cta(value: unknown, fb: { label: string; href: string }) {
  const v = (value ?? {}) as Loose
  return { label: str(v.label, fb.label), href: str(v.href, fb.href) }
}

export function mapServicePageDoc(
  doc: Loose,
  fallback: CommercialFleetContent,
): CommercialFleetContent {
  const g = (key: keyof CommercialFleetContent): Loose => (doc[key] ?? {}) as Loose

  const hero = g('hero')
  const flow = g('flow')
  const platform = g('platform')
  const community = g('community')
  const howItWorks = g('howItWorks')
  const benefits = g('benefits')
  const fleetOperators = g('fleetOperators')
  const testimonials = g('testimonials')
  const faq = g('faq')
  const ctaG = g('cta')
  const meta = g('meta')

  return {
    meta: {
      title: str(meta.title, fallback.meta.title),
      description: str(meta.description, fallback.meta.description),
    },
    hero: {
      rating: str(hero.rating, fallback.hero.rating),
      title: str(hero.title, fallback.hero.title),
      description: str(hero.description, fallback.hero.description),
      primaryCta: cta(hero.primaryCta, fallback.hero.primaryCta),
      secondaryCta: cta(hero.secondaryCta, fallback.hero.secondaryCta),
      media: str(hero.media, fallback.hero.media),
    },
    flow: {
      title: str(flow.title, fallback.flow.title),
      description: str(flow.description, fallback.flow.description),
      steps: rows(flow.steps, fallback.flow.steps).map((s, i) => {
        const fb = fallback.flow.steps[i]
        return {
          number: str(s.number, fb?.number ?? ''),
          title: str(s.title, fb?.title ?? ''),
          description: str(s.description, fb?.description ?? ''),
          metricLabel: str(s.metricLabel, fb?.metricLabel ?? ''),
          metric: str(s.metric, fb?.metric ?? ''),
          pills:
            Array.isArray(s.pills) && s.pills.length > 0
              ? (s.pills as Loose[]).map((p, j) => str(p.text, fb?.pills[j] ?? ''))
              : [...(fb?.pills ?? [])],
        }
      }),
    },
    platform: {
      title: str(platform.title, fallback.platform.title),
      description: str(platform.description, fallback.platform.description),
      features: rows(platform.features, fallback.platform.features).map((f, i) => ({
        title: str(f.title, fallback.platform.features[i]?.title ?? ''),
        description: str(f.description, fallback.platform.features[i]?.description ?? ''),
        icon: str(f.icon, fallback.platform.features[i]?.icon ?? 'check') as PlatformGlyph,
        highlighted: Boolean(f.highlighted ?? fallback.platform.features[i]?.highlighted),
      })),
    },
    community: {
      trendingTitle: str(community.trendingTitle, fallback.community.trendingTitle),
      stats: rows(community.stats, fallback.community.stats).map((s, i) => ({
        value: str(s.value, fallback.community.stats[i]?.value ?? ''),
        label: str(s.label, fallback.community.stats[i]?.label ?? ''),
      })),
      inspectTitle: str(community.inspectTitle, fallback.community.inspectTitle),
      inspectHighlight: str(community.inspectHighlight, fallback.community.inspectHighlight),
      manageTitle: str(community.manageTitle, fallback.community.manageTitle),
      manageBullets: rows(community.manageBullets, fallback.community.manageBullets).map((b, i) => ({
        label: str(b.label, fallback.community.manageBullets[i]?.label ?? ''),
        text: str(b.text, fallback.community.manageBullets[i]?.text ?? ''),
      })),
      manageImage: str(community.manageImage, fallback.community.manageImage),
      manageBadge: str(community.manageBadge, fallback.community.manageBadge),
      trustedTitle: str(community.trustedTitle, fallback.community.trustedTitle),
      trustedLogos: rows(community.trustedLogos, fallback.community.trustedLogos).map((l, i) =>
        str(l.label, fallback.community.trustedLogos[i] ?? ''),
      ),
      // Image logos are not a CMS field — carried straight from the static
      // per-page content so the marquee renders them without any seeding.
      trustedLogoImages: fallback.community.trustedLogoImages,
    },
    howItWorks: {
      title: str(howItWorks.title, fallback.howItWorks.title),
      description: str(howItWorks.description, fallback.howItWorks.description),
      steps: rows(howItWorks.steps, fallback.howItWorks.steps).map((s, i) => ({
        step: str(s.step, fallback.howItWorks.steps[i]?.step ?? ''),
        title: str(s.title, fallback.howItWorks.steps[i]?.title ?? ''),
        description: str(s.description, fallback.howItWorks.steps[i]?.description ?? ''),
        image: str(s.image, fallback.howItWorks.steps[i]?.image ?? ''),
      })),
    },
    benefits: {
      title: str(benefits.title, fallback.benefits.title),
      items: rows(benefits.items, fallback.benefits.items).map((b, i) => ({
        title: str(b.title, fallback.benefits.items[i]?.title ?? ''),
        description: str(b.description, fallback.benefits.items[i]?.description ?? ''),
        icon: str(b.icon, fallback.benefits.items[i]?.icon ?? 'fast') as BenefitIconKey,
        highlighted: Boolean(b.highlighted ?? fallback.benefits.items[i]?.highlighted),
        wide: Boolean(b.wide ?? fallback.benefits.items[i]?.wide),
      })),
    },
    fleetOperators: {
      eyebrow: str(fleetOperators.eyebrow, fallback.fleetOperators.eyebrow),
      title: str(fleetOperators.title, fallback.fleetOperators.title),
      description: str(fleetOperators.description, fallback.fleetOperators.description),
      primaryCta: cta(fleetOperators.primaryCta, fallback.fleetOperators.primaryCta),
      secondaryCta: cta(fleetOperators.secondaryCta, fallback.fleetOperators.secondaryCta),
      background: str(fleetOperators.background, fallback.fleetOperators.background),
      stats: rows(fleetOperators.stats, fallback.fleetOperators.stats).map((s, i) => ({
        value: str(s.value, fallback.fleetOperators.stats[i]?.value ?? ''),
        label: str(s.label, fallback.fleetOperators.stats[i]?.label ?? ''),
      })),
      features: rows(fleetOperators.features, fallback.fleetOperators.features).map((f, i) => ({
        icon: str(f.icon, fallback.fleetOperators.features[i]?.icon ?? 'onboard') as FleetFeatureIconKey,
        title: str(f.title, fallback.fleetOperators.features[i]?.title ?? ''),
        description: str(f.description, fallback.fleetOperators.features[i]?.description ?? ''),
      })),
    },
    testimonials: {
      title: str(testimonials.title, fallback.testimonials.title),
      description: str(testimonials.description, fallback.testimonials.description),
      label: str(testimonials.label, fallback.testimonials.label),
      items: rows(testimonials.items, fallback.testimonials.items).map((t, i) => ({
        name: str(t.name, fallback.testimonials.items[i]?.name ?? ''),
        quote: str(t.quote, fallback.testimonials.items[i]?.quote ?? ''),
        stars: num(t.stars, fallback.testimonials.items[i]?.stars ?? 5),
        avatar: typeof t.avatar === 'string' && t.avatar ? t.avatar : undefined,
      })),
    },
    faq: {
      title: str(faq.title, fallback.faq.title),
      description: str(faq.description, fallback.faq.description),
      items: rows(faq.items, fallback.faq.items).map((f, i) => ({
        question: str(f.question, fallback.faq.items[i]?.question ?? ''),
        answer: str(f.answer, fallback.faq.items[i]?.answer ?? ''),
      })),
    },
    cta: {
      title: str(ctaG.title, fallback.cta.title),
      description: str(ctaG.description, fallback.cta.description),
      primaryCta: cta(ctaG.primaryCta, fallback.cta.primaryCta),
      secondaryCta: cta(ctaG.secondaryCta, fallback.cta.secondaryCta),
      note: str(ctaG.note, fallback.cta.note),
      background: str(ctaG.background, fallback.cta.background),
    },
  }
}
