import type { Metadata } from 'next'
import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { LocationPageContent } from '@/app/(site)/components/locations/location-page'
import type { Location, Media } from '@/payload-types'

type MediaRelationship = Media | string | null | undefined
type LocationPagePayload = {
  content: LocationPageContent
  metadata: Metadata
}

const DEFAULT_SHOWCASE_VIDEO =
  'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/chex-ai-location.mp4'

const textItems = (items?: Array<{ text?: string | null }> | null) =>
  (items ?? []).map((item) => item.text ?? '').filter(Boolean)

const mediaURL = (media: MediaRelationship, fallback?: string | null) => {
  if (media && typeof media === 'object' && media.url) {
    return media.url
  }

  return fallback ?? ''
}

const optionalMediaURL = (media: MediaRelationship, fallback?: string | null) => {
  const url = mediaURL(media, fallback)

  return url || undefined
}

const optionalString = (value?: string | null) => value || undefined

export const getLocationDocumentBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'locations',
    depth: 1,
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] ?? null
})

export async function getLocationPageBySlug(slug: string): Promise<LocationPagePayload | null> {
  const location = await getLocationDocumentBySlug(slug)

  if (!location) {
    return null
  }

  const content = toLocationPageContent(location)

  return {
    content,
    metadata: {
      description: location.meta.description,
      title: location.meta.title,
    },
  }
}

function toLocationPageContent(location: Location): LocationPageContent {
  const heroRatingBadgeImage = optionalMediaURL(
    location.hero.ratingBadgeImage,
    location.hero.ratingBadgeImageFallbackUrl,
  )
  const testimonialsQuoteImage = optionalMediaURL(
    location.testimonials.quoteImage,
    location.testimonials.quoteImageFallbackUrl,
  )
  const testimonialsStarImage = optionalMediaURL(
    location.testimonials.starImage,
    location.testimonials.starImageFallbackUrl,
  )
  const manageIllustrationVariant = location.manage.illustration.variant
  const manageIllustration =
    manageIllustrationVariant === 'offset-screen'
      ? ({
          variant: 'offset-screen',
        } as const)
      : ({
          variant: 'framed-screen',
          notchImage: mediaURL(
            location.manage.illustration.notchImage,
            location.manage.illustration.notchImageFallbackUrl,
          ),
        } as const)

  return {
    pageClassName: location.pageClassName ?? '',
    hero: {
      ...(heroRatingBadgeImage ? { ratingBadgeImage: heroRatingBadgeImage } : {}),
      description: location.hero.description,
      descriptionClassName: location.hero.style?.descriptionClassName ?? '',
      demoHref: location.hero.demoHref,
      helperText: location.hero.helperText,
      layoutClassName: location.hero.style?.layoutClassName ?? '',
      locations: (location.hero.locations ?? []).map((item) => ({
        featured: Boolean(item.featured),
        image: mediaURL(item.image, item.imageFallbackUrl),
        label: item.label,
      })),
      primaryLabel: location.hero.primaryLabel,
      rating: location.hero.rating,
      ratingContainerClassName: optionalString(location.hero.style?.ratingContainerClassName),
      secondaryLabel: location.hero.secondaryLabel,
      sectionClassName: optionalString(location.hero.style?.sectionClassName),
      stats: (location.hero.stats ?? []).map((stat) => ({
        label: stat.label,
        value: stat.value,
      })),
      title: location.hero.title,
      titleClassName: location.hero.style?.titleClassName ?? '',
    },
    overview: {
      image: mediaURL(location.overview.image, location.overview.imageFallbackUrl),
      imageAlt: location.overview.imageAlt,
      paragraphs: textItems(location.overview.paragraphs),
      title: location.overview.title,
    },
    services: {
      ctaLabel: location.services.ctaLabel,
      demoHref: location.services.demoHref,
      description: location.services.description,
      eyebrow: location.services.eyebrow,
      items: (location.services.items ?? []).map((item) => ({
        description: item.description,
        image: mediaURL(item.image, item.imageFallbackUrl),
        reverse: Boolean(item.reverse),
        title: item.title,
      })),
      title: location.services.title,
    },
    showcase: {
      buttonLabel: location.showcase.buttonLabel,
      demoHref: location.showcase.demoHref,
      description: location.showcase.description,
      items: (location.showcase.items ?? []).map((item) => ({
        description: item.description,
        number: item.number,
        title: item.title,
      })),
      title: location.showcase.title,
      video: mediaURL(location.showcase.video, location.showcase.videoFallbackUrl) || DEFAULT_SHOWCASE_VIDEO,
      visual: {
        showGlow: Boolean(location.showcase.visual?.showGlow),
        variant: location.showcase.visual?.variant ?? 'organic-frame',
      },
    },
    regions: {
      articleClassName: location.regions.style?.articleClassName ?? '',
      demoHref: location.regions.demoHref,
      description: location.regions.description,
      headingClassName: location.regions.style?.headingClassName ?? '',
      items: (location.regions.items ?? []).map((item) => ({
        city: item.city,
        description: item.description,
        image: mediaURL(item.image, item.imageFallbackUrl),
      })),
      sectionClassName: optionalString(location.regions.style?.sectionClassName),
      title: location.regions.title,
      titleClassName: optionalString(location.regions.style?.titleClassName),
    },
    manage: {
      bullets: textItems(location.manage.bullets),
      buttonLabel: location.manage.buttonLabel,
      checkIconColor: location.manage.checkIconColor,
      demoHref: location.manage.demoHref,
      frameImage: mediaURL(location.manage.frameImage, location.manage.frameImageFallbackUrl),
      illustration: manageIllustration,
      screenClassName: optionalString(location.manage.screenClassName),
      screenImage: mediaURL(location.manage.screenImage, location.manage.screenImageFallbackUrl),
      title: location.manage.title,
    },
    caseStudies: {
      arrowClassName: location.caseStudies.style?.arrowClassName ?? '',
      arrowImage: mediaURL(location.caseStudies.arrowImage, location.caseStudies.arrowImageFallbackUrl),
      articleClassName: location.caseStudies.style?.articleClassName ?? '',
      captionClassName: optionalString(location.caseStudies.style?.captionClassName),
      descriptionClassName: location.caseStudies.style?.descriptionClassName ?? '',
      imageClassName: location.caseStudies.style?.imageClassName ?? '',
      items: (location.caseStudies.items ?? []).map((item) => ({
        caption: optionalString(item.caption),
        description: item.description,
        image: mediaURL(item.image, item.imageFallbackUrl),
        linkHref: optionalString(item.linkHref),
        linkLabel: optionalString(item.linkLabel),
        metric: item.metric,
        title: item.title,
      })),
      linkClassName: optionalString(location.caseStudies.style?.linkClassName),
      metricClassName: location.caseStudies.style?.metricClassName ?? '',
      scrollClassName: location.caseStudies.style?.scrollClassName ?? '',
      sectionClassName: location.caseStudies.style?.sectionClassName ?? '',
      title: location.caseStudies.title,
      titleClassName: location.caseStudies.style?.titleClassName ?? '',
    },
    testimonials: {
      description: location.testimonials.description,
      items: (location.testimonials.items ?? []).map((item) => ({
        featured: Boolean(item.featured),
        name: item.name,
        quote: item.quote,
        role: item.role,
      })),
      label: location.testimonials.label,
      ...(testimonialsQuoteImage ? { quoteImage: testimonialsQuoteImage } : {}),
      ...(testimonialsStarImage ? { starImage: testimonialsStarImage } : {}),
      title: location.testimonials.title,
    },
    faq: {
      description: location.faq.description,
      idBase: location.faq.idBase,
      items: (location.faq.items ?? []).map((item) => ({
        answer: item.answer,
        question: item.question,
      })),
      title: location.faq.title,
    },
    cta: {
      description: location.cta.description,
      helperText: location.cta.helperText,
      image: mediaURL(location.cta.image, location.cta.imageFallbackUrl),
      imageOpacityClassName: location.cta.imageOpacityClassName ?? '',
      primaryLabel: location.cta.primaryLabel,
      secondaryLabel: location.cta.secondaryLabel,
      sectionId: location.cta.sectionId,
      title: location.cta.title,
    },
  }
}
