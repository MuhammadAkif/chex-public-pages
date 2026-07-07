import type { Metadata } from 'next'
import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { InspectionFormPage as InspectionFormDoc, Media } from '@/payload-types'
import type { InspectionFormContent } from '@/app/(site)/components/inspection-form/inspection-form-page'

import { pageContent } from './content'

export type { InspectionFormContent } from '@/app/(site)/components/inspection-form/inspection-form-page'

type MediaRelationship = Media | string | null | undefined

type InspectionFormPayload = {
  content: InspectionFormContent
  metadata: Metadata
}

function mediaURL(media: MediaRelationship, fallback?: string | null): string {
  if (media && typeof media === 'object' && typeof media.url === 'string' && media.url) {
    return media.url
  }
  return fallback ?? ''
}

function textItems(items?: Array<{ text?: string | null }> | null): string[] {
  return (items ?? []).map((item) => item.text ?? '').filter((text) => text.length > 0)
}

const optional = (value?: string | null) => value || undefined

/** SEO defaults used when the global has not been seeded yet. */
const FALLBACK_META: Metadata = {
  title: 'Uber & Lyft Vehicle Inspection Forms by State | Chex.AI',
  description:
    "Check your state's Uber or Lyft vehicle inspection requirement — or skip the printout and complete your inspection online with Chex.AI in about 30 minutes with same-day certification.",
}

async function fetchInspectionFormDocument(): Promise<InspectionFormDoc | null> {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({
      slug: 'inspection-form-page',
      depth: 1,
      overrideAccess: false,
    })
  } catch {
    return null
  }
}

const getInspectionFormDocument: () => Promise<InspectionFormDoc | null> = cache(
  fetchInspectionFormDocument,
)

/**
 * Returns the inspection-form page content + route metadata, sourced from the
 * `inspection-form-page` Payload global. Falls back to the static
 * {@link pageContent} defaults when the global has not been seeded yet, so the
 * route always renders.
 */
export const getInspectionFormPage: () => Promise<InspectionFormPayload> = cache(
  async (): Promise<InspectionFormPayload> => {
    const doc = await getInspectionFormDocument()

    if (!doc || !doc.hero?.titleLead) {
      return {
        content: pageContent,
        metadata: FALLBACK_META,
      }
    }

    const content: InspectionFormContent = {
      hero: {
        eyebrow: doc.hero.eyebrow,
        titleLead: doc.hero.titleLead,
        titleHighlight: doc.hero.titleHighlight,
        description: doc.hero.description,
        primaryCtaLabel: doc.hero.primaryCtaLabel,
        primaryCtaHref: doc.hero.primaryCtaHref,
        secondaryCtaLabel: doc.hero.secondaryCtaLabel,
        secondaryCtaHref: doc.hero.secondaryCtaHref,
        note: doc.hero.note,
        image: mediaURL(doc.hero.image, doc.hero.imageFallbackUrl),
        imageAlt: doc.hero.imageAlt,
      },
      trust: {
        title: doc.trust.title,
        logos: (doc.trust.logos ?? []).map((logo) => ({
          src: mediaURL(logo.image, logo.imageFallbackUrl),
          alt: logo.alt,
          className: optional(logo.className),
        })),
      },
      online: {
        eyebrow: doc.online.eyebrow,
        title: doc.online.title,
        description: doc.online.description,
        ctaLabel: doc.online.ctaLabel,
        ctaHref: doc.online.ctaHref,
        image: mediaURL(doc.online.image, doc.online.imageFallbackUrl),
        imageAlt: doc.online.imageAlt,
        steps: (doc.online.steps ?? []).map((step) => ({
          title: step.title,
          description: step.description,
        })),
      },
      localPrep: {
        eyebrow: doc.localPrep.eyebrow,
        title: doc.localPrep.title,
        paragraphs: textItems(doc.localPrep.paragraphs),
        ctaLabel: doc.localPrep.ctaLabel,
        ctaHref: doc.localPrep.ctaHref,
        panelTitle: doc.localPrep.panelTitle,
        panelItems: textItems(doc.localPrep.panelItems),
      },
      requirements: {
        eyebrow: doc.requirements.eyebrow,
        title: doc.requirements.title,
        description: doc.requirements.description,
        groups: (doc.requirements.groups ?? []).map((group) => ({
          title: group.title,
          intro: optional(group.intro),
          twoColumn: group.twoColumn ?? false,
          bullets: textItems(group.bullets),
        })),
      },
      states: {
        eyebrow: doc.states.eyebrow,
        title: doc.states.title,
        description: doc.states.description,
        ctaHref: doc.states.ctaHref,
        footnote: doc.states.footnote,
        rows: (doc.states.rows ?? []).map((row) => ({
          name: row.name,
          uber: row.uber,
          lyft: row.lyft,
          note: optional(row.note),
        })),
      },
      compare: {
        eyebrow: doc.compare.eyebrow,
        title: doc.compare.title,
        description: doc.compare.description,
        ctaLabel: doc.compare.ctaLabel,
        ctaHref: doc.compare.ctaHref,
        local: {
          tag: doc.compare.local.tag,
          title: doc.compare.local.title,
          steps: textItems(doc.compare.local.steps),
          foot: doc.compare.local.foot,
        },
        chex: {
          badge: doc.compare.chex.badge,
          tag: doc.compare.chex.tag,
          title: doc.compare.chex.title,
          steps: textItems(doc.compare.chex.steps),
          foot: doc.compare.chex.foot,
        },
      },
      reviews: {
        title: doc.reviews.title,
        description: doc.reviews.description,
        label: doc.reviews.label,
        items: (doc.reviews.items ?? []).map((item) => ({
          name: item.name,
          quote: item.quote,
          stars: item.stars,
          avatar: optional(item.avatar),
        })),
      },
      faq: {
        title: doc.faq.title,
        items: (doc.faq.items ?? []).map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      },
      cta: {
        title: doc.cta.title,
        description: doc.cta.description,
        ctaLabel: doc.cta.ctaLabel,
        ctaHref: doc.cta.ctaHref,
        stats: (doc.cta.stats ?? []).map((stat) => ({
          value: stat.value,
          label: stat.label,
        })),
      },
    }

    return {
      content,
      metadata: {
        title: doc.meta.title,
        description: doc.meta.description,
      },
    }
  },
)
