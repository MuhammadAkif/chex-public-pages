import type { Metadata } from 'next'
import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { HomePage, Media } from '@/payload-types'

type MediaRelationship = Media | string | null | undefined

const mediaURL = (media: MediaRelationship, fallback?: string | null) => {
  if (media && typeof media === 'object' && media.url) {
    return media.url
  }

  return fallback ?? ''
}

const textItems = (items?: Array<{ text?: string | null }> | null) =>
  (items ?? []).map((item) => item.text ?? '').filter(Boolean)

export type HomePageContent = {
  hero: {
    rating: string
    title: string
    description: string
    secondaryLabel: string
    media: string
  }
  community: {
    title: string
    subtitle: string
    stats: ReadonlyArray<{ value: string; label: string; tone: string }>
    manageTitle: string
    manageBullets: ReadonlyArray<string>
    manageImage: string
    trustedTitle: string
    trustedLogos: ReadonlyArray<{ image: string; label: string }>
  }
  howItWorks: {
    title: string
    description: string
    steps: ReadonlyArray<{ title: string; description: string; image: string }>
  }
  benefits: {
    title: string
    items: ReadonlyArray<{
      title: string
      description: string
      tone: string
      icon: string
    }>
  }
  keyDifferentiators: {
    title: string
    items: ReadonlyArray<string>
    image: string
  }
  businessHelp: {
    title: string
    description: string
    buttonLabel: string
    image: string
  }
  caseStudies: {
    title: string
    items: ReadonlyArray<{
      metric: string
      title: string
      description: string
      image: string
      caption?: string
    }>
    arrowImage: string
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
  cta: {
    title: string
    description: string
    secondaryLabel: string
  }
}

type HomePagePayload = {
  content: HomePageContent
  metadata: Metadata
}

export const getHomePageDocument = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'home-page',
    depth: 1,
    overrideAccess: false,
  })
})

export async function getHomePage(): Promise<HomePagePayload> {
  const doc = await getHomePageDocument()

  return {
    content: toHomePageContent(doc),
    metadata: {
      description: doc.meta.description,
      title: doc.meta.title,
    },
  }
}

function toHomePageContent(doc: HomePage): HomePageContent {
  return {
    hero: {
      rating: doc.hero.rating,
      title: doc.hero.title,
      description: doc.hero.description,
      secondaryLabel: doc.hero.secondaryLabel,
      media: mediaURL(doc.hero.media, doc.hero.mediaFallbackUrl),
    },
    community: {
      title: doc.community.title,
      subtitle: doc.community.subtitle,
      stats: (doc.community.stats ?? []).map((stat) => ({
        value: stat.value,
        label: stat.label,
        tone: stat.tone,
      })),
      manageTitle: doc.community.manageTitle,
      manageBullets: textItems(doc.community.manageBullets),
      manageImage: mediaURL(
        doc.community.manageImage,
        doc.community.manageImageFallbackUrl,
      ),
      trustedTitle: doc.community.trustedTitle,
      trustedLogos: (doc.community.trustedLogos ?? []).map((logo) => ({
        image: mediaURL(logo.image, logo.imageFallbackUrl),
        label: logo.label,
      })),
    },
    howItWorks: {
      title: doc.howItWorks.title,
      description: doc.howItWorks.description,
      steps: (doc.howItWorks.steps ?? []).map((step) => ({
        title: step.title,
        description: step.description,
        image: mediaURL(step.image, step.imageFallbackUrl),
      })),
    },
    benefits: {
      title: doc.benefits.title,
      items: (doc.benefits.items ?? []).map((item) => ({
        title: item.title,
        description: item.description,
        tone: item.tone,
        icon: item.icon,
      })),
    },
    keyDifferentiators: {
      title: doc.keyDifferentiators.title,
      items: textItems(doc.keyDifferentiators.items),
      image: mediaURL(
        doc.keyDifferentiators.image,
        doc.keyDifferentiators.imageFallbackUrl,
      ),
    },
    businessHelp: {
      title: doc.businessHelp.title,
      description: doc.businessHelp.description,
      buttonLabel: doc.businessHelp.buttonLabel,
      image: mediaURL(doc.businessHelp.image, doc.businessHelp.imageFallbackUrl),
    },
    caseStudies: {
      title: doc.caseStudies.title,
      items: (doc.caseStudies.items ?? []).map((item) => ({
        metric: item.metric,
        title: item.title,
        description: item.description,
        image: mediaURL(item.image, item.imageFallbackUrl),
        caption: item.caption ?? undefined,
      })),
      arrowImage: mediaURL(
        doc.caseStudies.arrowImage,
        doc.caseStudies.arrowImageFallbackUrl,
      ),
    },
    testimonials: {
      title: doc.testimonials.title,
      description: doc.testimonials.description,
      label: doc.testimonials.label,
      items: (doc.testimonials.items ?? []).map((item) => ({
        name: item.name,
        quote: item.quote,
        stars: item.stars ?? 5,
        avatar: item.avatar ?? undefined,
      })),
    },
    cta: {
      title: doc.cta.title,
      description: doc.cta.description,
      secondaryLabel: doc.cta.secondaryLabel,
    },
  }
}
