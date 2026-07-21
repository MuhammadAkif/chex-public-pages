/**
 * seed-inspection-form.ts
 *
 * Seeds the InspectionFormPage global (slug `inspection-form-page`, which powers
 * /inspection-form) from the static content in
 * src/app/(site)/inspection-form/content.ts.
 *
 * Images are stored as `*FallbackUrl` values (existing S3 / public URLs); the
 * frontend prefers a Media relationship when one is attached in the admin, and
 * falls back to these URLs otherwise. No media is downloaded.
 *
 * Run via:  yarn inspection:seed
 *       or: node --import tsx scripts/seed-inspection-form.ts
 */

import nextEnv from '@next/env'
import { getPayload } from 'payload'

import { pageContent } from '../src/app/(site)/inspection-form/content'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const textRows = (items: ReadonlyArray<string>) => items.map((text) => ({ text }))

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  const c = pageContent

  const data = {
    meta: {
      title: 'Uber & Lyft Vehicle Inspection Forms by State | Chex.AI',
      description:
        "Check your state's Uber or Lyft vehicle inspection requirement — or skip the printout and complete your inspection online with Chex.AI in about 30 minutes with same-day certification.",
    },
    hero: {
      eyebrow: c.hero.eyebrow,
      titleLead: c.hero.titleLead,
      titleHighlight: c.hero.titleHighlight,
      description: c.hero.description,
      primaryCtaLabel: c.hero.primaryCtaLabel,
      primaryCtaHref: c.hero.primaryCtaHref,
      secondaryCtaLabel: c.hero.secondaryCtaLabel,
      secondaryCtaHref: c.hero.secondaryCtaHref,
      note: c.hero.note,
      image: null,
      imageFallbackUrl: c.hero.image,
      imageAlt: c.hero.imageAlt,
    },
    trust: {
      title: c.trust.title,
      logos: c.trust.logos.map((logo) => ({
        image: null,
        imageFallbackUrl: logo.src,
        alt: logo.alt,
        className: logo.className ?? null,
      })),
    },
    online: {
      eyebrow: c.online.eyebrow,
      title: c.online.title,
      description: c.online.description,
      ctaLabel: c.online.ctaLabel,
      ctaHref: c.online.ctaHref,
      image: null,
      imageFallbackUrl: c.online.image,
      imageAlt: c.online.imageAlt,
      steps: c.online.steps.map((step) => ({
        title: step.title,
        description: step.description,
      })),
    },
    localPrep: {
      eyebrow: c.localPrep.eyebrow,
      title: c.localPrep.title,
      paragraphs: textRows(c.localPrep.paragraphs),
      ctaLabel: c.localPrep.ctaLabel,
      ctaHref: c.localPrep.ctaHref,
      panelTitle: c.localPrep.panelTitle,
      panelItems: textRows(c.localPrep.panelItems),
    },
    requirements: {
      eyebrow: c.requirements.eyebrow,
      title: c.requirements.title,
      description: c.requirements.description,
      groups: c.requirements.groups.map((group) => ({
        title: group.title,
        intro: group.intro ?? null,
        twoColumn: group.twoColumn ?? false,
        bullets: textRows(group.bullets),
      })),
    },
    states: {
      eyebrow: c.states.eyebrow,
      title: c.states.title,
      description: c.states.description,
      ctaHref: c.states.ctaHref,
      footnote: c.states.footnote,
      rows: c.states.rows.map((row) => ({
        name: row.name,
        uber: row.uber,
        uberFormUrl: row.uberFormUrl ?? null,
        uberNote: row.uberNote ?? null,
        lyft: row.lyft,
        lyftFormUrl: row.lyftFormUrl ?? null,
        lyftNote: row.lyftNote ?? null,
      })),
    },
    compare: {
      eyebrow: c.compare.eyebrow,
      title: c.compare.title,
      description: c.compare.description,
      ctaLabel: c.compare.ctaLabel,
      ctaHref: c.compare.ctaHref,
      local: {
        tag: c.compare.local.tag,
        title: c.compare.local.title,
        steps: textRows(c.compare.local.steps),
        foot: c.compare.local.foot,
      },
      chex: {
        badge: c.compare.chex.badge,
        tag: c.compare.chex.tag,
        title: c.compare.chex.title,
        steps: textRows(c.compare.chex.steps),
        foot: c.compare.chex.foot,
      },
    },
    reviews: {
      title: c.reviews.title,
      description: c.reviews.description,
      label: c.reviews.label,
      items: c.reviews.items.map((item) => ({
        name: item.name,
        quote: item.quote,
        stars: item.stars ?? 5,
        avatar: item.avatar ?? null,
      })),
    },
    faq: {
      title: c.faq.title,
      items: c.faq.items.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    },
    cta: {
      title: c.cta.title,
      description: c.cta.description,
      ctaLabel: c.cta.ctaLabel,
      ctaHref: c.cta.ctaHref,
      stats: c.cta.stats.map((stat) => ({
        value: stat.value,
        label: stat.label,
      })),
    },
  }

  await payload.updateGlobal({
    slug: 'inspection-form-page',
    data,
    overrideAccess: true,
  })

  console.log('\n✓ InspectionFormPage global seeded (slug: inspection-form-page).')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
