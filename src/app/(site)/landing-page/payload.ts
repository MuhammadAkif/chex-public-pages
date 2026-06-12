import type { Metadata } from 'next'
import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { HomePage as LandingPageDoc, Media } from '@/payload-types'

import {
  landingContent,
  type LandingPageContent,
  type LandingSolutionVariant,
} from './content'

export type { LandingPageContent } from './content'

type MediaRelationship = Media | string | null | undefined

type LandingPagePayload = {
  content: LandingPageContent
  metadata: Metadata
}

export type LandingArticleItem = {
  tag: string
  title: string
  image: string
  href: string
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * The latest published posts from the `posts` collection, shaped for the landing
 * page blog carousel. Mirrors the /blogs listing (newest first, date as the tag,
 * links to /blogs/[slug]). Returns [] on error so the section can fall back to
 * the CMS-configured articles.
 */
export const getLandingArticles: () => Promise<LandingArticleItem[]> = cache(
  async (): Promise<LandingArticleItem[]> => {
    try {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'posts',
        depth: 0,
        draft: false,
        limit: 6,
        overrideAccess: true,
        sort: '-publishedAt',
        where: { _status: { equals: 'published' } },
      })

      return result.docs.map((post) => ({
        tag: formatDate(post.publishedAt),
        title: post.title,
        image: post.postImage ?? '',
        href: `/blogs/${encodeURIComponent(post.slug)}`,
      }))
    } catch {
      return []
    }
  },
)

function mediaURL(media: MediaRelationship, fallback?: string | null): string {
  if (media && typeof media === 'object' && typeof media.url === 'string' && media.url) {
    return media.url
  }
  return fallback ?? ''
}

function textItems(items?: Array<{ text?: string | null }> | null): string[] {
  return (items ?? []).map((item) => item.text ?? '').filter((text) => text.length > 0)
}

const variant = (value?: string | null): LandingSolutionVariant =>
  value === 'full' || value === 'card-peach' ? value : 'card-light'

const optional = (value?: string | null) => value || undefined

async function fetchLandingPageDocument(): Promise<LandingPageDoc | null> {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({
      slug: 'home-page',
      depth: 1,
      overrideAccess: false,
    })
  } catch {
    return null
  }
}

const getLandingPageDocument: () => Promise<LandingPageDoc | null> = cache(
  fetchLandingPageDocument,
)

/**
 * Returns the landing page content + route metadata, sourced from the
 * `landing-page` Payload global. Falls back to the static {@link landingContent}
 * defaults when the global has not been seeded yet, so the route always renders.
 */
export const getLandingPage: () => Promise<LandingPagePayload> = cache(
  async (): Promise<LandingPagePayload> => {
    const doc = await getLandingPageDocument()

    if (!doc || !doc.hero?.title) {
      return {
        content: landingContent,
        metadata: {
          title: landingContent.meta.title,
          description: landingContent.meta.description,
        },
      }
    }

    const content: LandingPageContent = {
      meta: {
        title: doc.meta.title,
        description: doc.meta.description,
      },
      hero: {
        ratingText: doc.hero.ratingText,
        titleAccent: doc.hero.titleAccent,
        title: doc.hero.title,
        description: doc.hero.description,
        buttonLabel: doc.hero.buttonLabel,
        image: mediaURL(doc.hero.image, doc.hero.imageFallbackUrl),
        backgroundVideo: mediaURL(
          doc.hero.backgroundVideo,
          doc.hero.backgroundVideoFallbackUrl,
        ),
      },
      trusted: {
        title: doc.trusted.title,
        logos: (doc.trusted.logos ?? []).map((logo) => ({
          image: mediaURL(logo.image, logo.imageFallbackUrl),
          label: logo.label,
        })),
      },
      transform: {
        title: doc.transform.title,
        description: doc.transform.description,
        image: mediaURL(doc.transform.image, doc.transform.imageFallbackUrl),
        features: (doc.transform.features ?? []).map((feature) => ({
          title: feature.title,
          description: feature.description,
        })),
      },
      solutions: {
        title: doc.solutions.title,
        description: doc.solutions.description,
        blocks: (doc.solutions.blocks ?? []).map((block) => ({
          label: block.label,
          title: block.title,
          description: block.description,
          bullets: textItems(block.bullets),
          buttonLabel: block.buttonLabel,
          image: mediaURL(block.image, block.imageFallbackUrl),
          overlayImage:
            optional(mediaURL(block.overlayImage, block.overlayImageFallbackUrl)),
          variant: variant(block.variant),
        })),
      },
      testimonials: {
        title: doc.testimonials.title,
        description: doc.testimonials.description,
        label: doc.testimonials.label,
        items: (doc.testimonials.items ?? []).map((item) => ({
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
      achievements: {
        title: doc.achievements.title,
        description: doc.achievements.description,
        backgroundImage: mediaURL(
          doc.achievements.backgroundImage,
          doc.achievements.backgroundImageFallbackUrl,
        ),
        stats: (doc.achievements.stats ?? []).map((stat) => ({
          value: stat.value,
          label: stat.label,
        })),
        note: doc.achievements.note,
        buttonLabel: doc.achievements.buttonLabel,
      },
      inspect: {
        eyebrow: doc.inspect.eyebrow,
        titleLead: doc.inspect.titleAccentA,
        titleAccentA: doc.inspect.titleAccentA,
        titleMid: doc.inspect.titleMid,
        titleAccentB: doc.inspect.titleAccentB,
        titleTail: doc.inspect.titleTail,
        subtitle: doc.inspect.subtitle,
        description: doc.inspect.description,
        buttonLabel: doc.inspect.buttonLabel,
        testimonial: {
          name: doc.inspect.testimonial.name,
          quote: doc.inspect.testimonial.quote,
          role: doc.inspect.testimonial.role,
          image: mediaURL(
            doc.inspect.testimonial.image,
            doc.inspect.testimonial.imageFallbackUrl,
          ),
        },
      },
      articles: {
        eyebrow: doc.articles.eyebrow,
        title: doc.articles.title,
        items: (doc.articles.items ?? []).map((item) => ({
          tag: item.tag,
          title: item.title,
          image: mediaURL(item.image, item.imageFallbackUrl),
          href: optional(item.href),
        })),
      },
    }

    return {
      content,
      metadata: {
        title: content.meta.title,
        description: content.meta.description,
      },
    }
  },
)
