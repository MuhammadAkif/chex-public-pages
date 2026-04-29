import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import nextEnv from '@next/env'
import { getPayload } from 'payload'

import type { LocationPageContent } from '../src/app/(site)/components/locations/location-page'
import type { Location, Media } from '../src/payload-types'

type PayloadClient = Awaited<ReturnType<typeof getPayload>>
type LocationSeedData = Omit<Location, 'createdAt' | 'id' | 'updatedAt'>
type MediaFieldData = Record<string, string | null>
type LegacyShowcase = {
  buttonLabel: string
  demoHref: string
  description: string
  items: Array<{
    description: string
    number: string
    title: string
  }>
  title: string
  visual?: {
    showGlow?: boolean
    variant?: 'organic-frame' | 'preview' | 'processing' | 'wave'
  }
}
type LegacyLocationContent = Omit<LocationPageContent, 'showcase'> & {
  showcase: LegacyShowcase
}

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

const SHOWCASE_VIDEO_URL =
  'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/chex-ai-location.mp4'

const seedDefinitions = [
  {
    contentPath: '../src/app/(site)/locations/alabama/content.ts',
    exportName: 'alabamaContent',
    meta: {
      description:
        'Remote vehicle damage assessment, mobile car inspections, and AI-powered compliance workflows for Birmingham, Montgomery, and Huntsville drivers.',
      title: 'Alabama Vehicle Damage Assessment AI | Chex.AI',
    },
    slug: 'alabama',
    title: 'Alabama',
  },
  {
    contentPath: '../src/app/(site)/locations/arizona/content.ts',
    exportName: 'arizonaContent',
    meta: {
      description:
        'Mobile auto inspection software, smartphone vehicle certifications, and car damage detection workflows for Phoenix, Tucson, and Scottsdale.',
      title: 'Arizona Mobile Vehicle Inspection App | Chex.AI',
    },
    slug: 'arizona',
    title: 'Arizona',
  },
  {
    contentPath: '../src/app/(site)/locations/arkansas/content.ts',
    exportName: 'arkansasContent',
    meta: {
      description:
        'AI-powered vehicle inspections, auction fraud screening, and resale-ready condition reports for Arkansas dealerships, auctions, and private sellers.',
      title: 'Arkansas Auto Inspection AI | Chex.AI',
    },
    slug: 'arkansas',
    title: 'Arkansas',
  },
  {
    contentPath: '../src/app/(site)/locations/california/content.ts',
    exportName: 'californiaContent',
    meta: {
      description:
        'AI-powered vehicle inspections, car damage recognition, and fast valuation workflows for California fleets, dealerships, and rideshare operators.',
      title: 'California Car Inspection AI | Chex.AI',
    },
    slug: 'california',
    title: 'California',
  },
  {
    contentPath: '../src/app/(site)/locations/colorado/content.ts',
    exportName: 'coloradoContent',
    meta: {
      description:
        'AI-powered vehicle inspections, damage detection, and resale-ready inspection workflows for Colorado families, rideshare drivers, and fleet operators.',
      title: 'Colorado Smart Car Damage Detection | Chex.AI',
    },
    slug: 'colorado',
    title: 'Colorado',
  },
  {
    contentPath: '../src/app/(site)/locations/iowa/content.ts',
    exportName: 'iowaContent',
    meta: {
      description:
        'AI-powered vehicle inspections, damage detection, and digital compliance workflows for Iowa rideshare drivers, fleets, and mobility operators.',
      title: 'Iowa Vehicle Inspection AI | Chex.AI',
    },
    slug: 'iowa',
    title: 'Iowa',
  },
  {
    contentPath: '../src/app/(site)/locations/nebraska/content.ts',
    exportName: 'nebraskaContent',
    meta: {
      description:
        'AI-powered vehicle inspections, damage detection, and fleet workflows for Nebraska operators, dealers, municipal teams, and freight carriers.',
      title: 'Nebraska Vehicle Inspection AI | Chex.AI',
    },
    slug: 'nebraska',
    title: 'Nebraska',
  },
  {
    contentPath: '../src/app/(site)/locations/nevada/content.ts',
    exportName: 'nevadaContent',
    meta: {
      description:
        'AI-powered vehicle inspections, damage tracking, and fleet workflows for Nevada carriers, rental operators, and rideshare teams.',
      title: 'Nevada Fleet Inspection AI | Chex.AI',
    },
    slug: 'nevada',
    title: 'Nevada',
  },
  {
    contentPath: '../src/app/(site)/locations/new-mexico/content.ts',
    exportName: 'newMexicoContent',
    meta: {
      description:
        'AI-powered damage detection, automated diagnostics, and vehicle inspection workflows for New Mexico fleets, rideshare drivers, and operators.',
      title: 'New Mexico AI Damage Detection | Chex.AI',
    },
    slug: 'new-mexico',
    title: 'New Mexico',
  },
  {
    contentPath: '../src/app/(site)/locations/ohio/content.ts',
    exportName: 'ohioContent',
    meta: {
      description:
        'Remote vehicle inspections, AI-powered damage detection, and fleet workflows for Columbus, Cleveland, and Cincinnati teams.',
      title: 'Ohio Vehicle Inspection AI | Chex.AI',
    },
    slug: 'ohio',
    title: 'Ohio',
  },
  {
    contentPath: '../src/app/(site)/locations/south-carolina/content.ts',
    exportName: 'southCarolinaContent',
    meta: {
      description:
        'AI-powered vehicle inspections, diagnostics, rideshare compliance, and fleet reporting for South Carolina teams.',
      title: 'South Carolina Automotive Diagnostics AI | Chex.AI',
    },
    slug: 'south-carolina',
    title: 'South Carolina',
  },
] as const

const mediaCache = new Map<string, Promise<string | null>>()
const mediaStats = {
  downloaded: 0,
  fallbackOnly: 0,
  resolved: 0,
}

function titleFromFilename(filename: string) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function filenameFromURL(url: string) {
  try {
    const pathname = new URL(url).pathname
    const filename = pathname.split('/').filter(Boolean).pop()

    return filename ? decodeURIComponent(filename) : ''
  } catch {
    return path.basename(url)
  }
}

function mediaSourceURL(value: unknown) {
  if (typeof value === 'string') {
    return value
  }

  if (
    typeof value === 'object' &&
    value !== null &&
    'src' in value &&
    typeof value.src === 'string'
  ) {
    return value.src
  }

  return ''
}

async function findMediaByField(
  payload: PayloadClient,
  field: 'filename' | 'sourceHash',
  value: string,
) {
  const result = await payload.find({
    collection: 'media',
    limit: 1,
    overrideAccess: true,
    where: {
      [field]: {
        equals: value,
      },
    },
  })

  return (result.docs[0] as Media | undefined) ?? null
}

async function createMediaFromURL(payload: PayloadClient, url: string, filename: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Unable to download ${url}: ${response.status} ${response.statusText}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  const existing = await findMediaByField(payload, 'sourceHash', hash)

  if (existing) {
    return existing.id
  }

  const tempDir = path.join('/tmp', 'chex-location-media-seed')
  const tempPath = path.join(tempDir, filename)

  await fs.mkdir(tempDir, { recursive: true })
  await fs.writeFile(tempPath, buffer)

  const doc = await payload.create({
    collection: 'media',
    data: {
      alt: titleFromFilename(filename),
      sourceHash: hash,
      sourcePath: url,
    },
    filePath: tempPath,
    overrideAccess: true,
    overwriteExistingFiles: true,
  })

  mediaStats.downloaded += 1

  return doc.id
}

async function resolveMediaID(payload: PayloadClient, source: unknown) {
  const url = mediaSourceURL(source)

  if (!url) {
    return null
  }

  const cached = mediaCache.get(url)

  if (cached) {
    return cached
  }

  const promise = (async () => {
    const filename = filenameFromURL(url)

    if (filename) {
      const existing = await findMediaByField(payload, 'filename', filename)

      if (existing) {
        mediaStats.resolved += 1

        return existing.id
      }
    }

    if (process.env.LOCATION_SEED_DOWNLOAD_MEDIA === '1' && filename) {
      return createMediaFromURL(payload, url, filename)
    }

    mediaStats.fallbackOnly += 1

    return null
  })()

  mediaCache.set(url, promise)

  return promise
}

async function mediaField(payload: PayloadClient, name: string, source: unknown): Promise<MediaFieldData> {
  const url = mediaSourceURL(source)
  const mediaID = await resolveMediaID(payload, source)

  return {
    [name]: mediaID,
    [`${name}FallbackUrl`]: url || null,
  }
}

function textRows(items: ReadonlyArray<string>) {
  return items.map((text) => ({ text }))
}

async function loadContent(seed: (typeof seedDefinitions)[number]) {
  const mod = (await import(seed.contentPath)) as Record<string, LegacyLocationContent>
  const content = mod[seed.exportName]

  if (!content) {
    throw new Error(`Missing ${seed.exportName} in ${seed.contentPath}`)
  }

  return content
}

async function buildLocationData(
  payload: PayloadClient,
  seed: (typeof seedDefinitions)[number],
  content: LegacyLocationContent,
): Promise<LocationSeedData> {
  return {
    _status: 'published',
    caseStudies: {
      ...(await mediaField(payload, 'arrowImage', content.caseStudies.arrowImage)),
      items: await Promise.all(
        content.caseStudies.items.map(async (item) => ({
          ...(await mediaField(payload, 'image', item.image)),
          caption: item.caption ?? null,
          description: item.description,
          linkHref: item.linkHref ?? null,
          linkLabel: item.linkLabel ?? null,
          metric: item.metric,
          title: item.title,
        })),
      ),
      style: {
        arrowClassName: content.caseStudies.arrowClassName,
        articleClassName: content.caseStudies.articleClassName,
        captionClassName: content.caseStudies.captionClassName ?? null,
        descriptionClassName: content.caseStudies.descriptionClassName,
        imageClassName: content.caseStudies.imageClassName,
        linkClassName: content.caseStudies.linkClassName ?? null,
        metricClassName: content.caseStudies.metricClassName,
        scrollClassName: content.caseStudies.scrollClassName,
        sectionClassName: content.caseStudies.sectionClassName,
        titleClassName: content.caseStudies.titleClassName,
      },
      title: content.caseStudies.title,
    },
    cta: {
      ...(await mediaField(payload, 'image', content.cta.image)),
      description: content.cta.description,
      helperText: content.cta.helperText,
      imageOpacityClassName: content.cta.imageOpacityClassName,
      primaryLabel: content.cta.primaryLabel,
      secondaryLabel: content.cta.secondaryLabel,
      sectionId: content.cta.sectionId,
      title: content.cta.title,
    },
    faq: {
      description: content.faq.description,
      idBase: content.faq.idBase,
      items: content.faq.items.map((item) => ({
        answer: item.answer,
        question: item.question,
      })),
      title: content.faq.title,
    },
    hero: {
      ...(await mediaField(payload, 'ratingBadgeImage', content.hero.ratingBadgeImage)),
      demoHref: content.hero.demoHref,
      description: content.hero.description,
      helperText: content.hero.helperText,
      locations: await Promise.all(
        content.hero.locations.map(async (item) => ({
          ...(await mediaField(payload, 'image', item.image)),
          featured: Boolean(item.featured),
          label: item.label,
        })),
      ),
      primaryLabel: content.hero.primaryLabel,
      rating: content.hero.rating,
      secondaryLabel: content.hero.secondaryLabel,
      stats: content.hero.stats.map((stat) => ({
        label: stat.label,
        value: stat.value,
      })),
      style: {
        descriptionClassName: content.hero.descriptionClassName,
        layoutClassName: content.hero.layoutClassName,
        ratingContainerClassName: content.hero.ratingContainerClassName ?? null,
        sectionClassName: content.hero.sectionClassName ?? null,
        titleClassName: content.hero.titleClassName,
      },
      title: content.hero.title,
    },
    manage: {
      ...(await mediaField(payload, 'frameImage', content.manage.frameImage)),
      ...(await mediaField(payload, 'screenImage', content.manage.screenImage)),
      bullets: textRows(content.manage.bullets),
      buttonLabel: content.manage.buttonLabel,
      checkIconColor: content.manage.checkIconColor,
      demoHref: content.manage.demoHref,
      illustration: {
        ...(await mediaField(
          payload,
          'notchImage',
          content.manage.illustration.variant === 'framed-screen'
            ? content.manage.illustration.notchImage
            : null,
        )),
        variant: content.manage.illustration.variant,
      },
      screenClassName: content.manage.screenClassName ?? null,
      title: content.manage.title,
    },
    meta: seed.meta,
    overview: {
      ...(await mediaField(payload, 'image', content.overview.image)),
      imageAlt: content.overview.imageAlt,
      paragraphs: textRows(content.overview.paragraphs),
      title: content.overview.title,
    },
    pageClassName: content.pageClassName,
    regions: {
      demoHref: content.regions.demoHref,
      description: content.regions.description,
      items: await Promise.all(
        content.regions.items.map(async (item) => ({
          ...(await mediaField(payload, 'image', item.image)),
          city: item.city,
          description: item.description,
        })),
      ),
      style: {
        articleClassName: content.regions.articleClassName,
        headingClassName: content.regions.headingClassName,
        sectionClassName: content.regions.sectionClassName ?? null,
        titleClassName: content.regions.titleClassName ?? null,
      },
      title: content.regions.title,
    },
    services: {
      ctaLabel: content.services.ctaLabel,
      demoHref: content.services.demoHref,
      description: content.services.description,
      eyebrow: content.services.eyebrow,
      items: await Promise.all(
        content.services.items.map(async (item) => ({
          ...(await mediaField(payload, 'image', item.image)),
          description: item.description,
          reverse: Boolean(item.reverse),
          title: item.title,
        })),
      ),
      title: content.services.title,
    },
    pricing: {
      description: content.pricing.description,
      highlights:
        content.pricing.highlights?.map((item) => ({
          text: item.text,
        })) ?? [],
      plans:
        content.pricing.plans?.map((plan) => ({
          buttonHref: plan.buttonHref,
          buttonLabel: plan.buttonLabel,
          caption: plan.caption ?? null,
          name: plan.name,
          price: plan.price,
          priceTone: plan.priceTone ?? 'primary',
          subtitle: plan.subtitle,
        })) ??
        ((content.pricing as {
          rows?: Array<{
            notes?: string | null
            price: string
            service: string
            turnaround?: string | null
          }>
        }).rows ?? []).map((row, index) => ({
          buttonHref: content.services.demoHref,
          buttonLabel: content.services.ctaLabel,
          caption: row.notes ?? null,
          name: row.service,
          price: row.price,
          priceTone: index === 1 ? 'accent' : 'primary',
          subtitle: row.turnaround ?? 'Inspection',
        })),
      title: content.pricing.title,
    },
    showcase: {
      ...(await mediaField(payload, 'video', SHOWCASE_VIDEO_URL)),
      buttonLabel: content.showcase.buttonLabel,
      demoHref: content.showcase.demoHref,
      description: content.showcase.description,
      items: content.showcase.items.map((item) => ({
        description: item.description,
        number: item.number,
        title: item.title,
      })),
      title: content.showcase.title,
      visual: {
        showGlow: Boolean(content.showcase.visual?.showGlow),
        variant: content.showcase.visual?.variant ?? 'organic-frame',
      },
    },
    slug: seed.slug,
    testimonials: {
      ...(await mediaField(payload, 'quoteImage', content.testimonials.quoteImage)),
      ...(await mediaField(payload, 'starImage', content.testimonials.starImage)),
      description: content.testimonials.description,
      items: content.testimonials.items.map((item) => ({
        featured: Boolean(item.featured),
        name: item.name,
        quote: item.quote,
        role: item.role,
      })),
      label: content.testimonials.label,
      title: content.testimonials.title,
    },
    title: seed.title,
  }
}

async function upsertLocation(
  payload: PayloadClient,
  seed: (typeof seedDefinitions)[number],
  data: LocationSeedData,
) {
  const existing = await payload.find({
    collection: 'locations',
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: seed.slug,
      },
    },
  })

  const doc = existing.docs[0]

  if (doc) {
    await payload.update({
      collection: 'locations',
      data,
      id: doc.id,
      overrideAccess: true,
    })

    return 'updated'
  }

  await payload.create({
    collection: 'locations',
    data,
    overrideAccess: true,
  })

  return 'created'
}

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })
  let created = 0
  let updated = 0

  try {
    for (const seed of seedDefinitions) {
      const content = await loadContent(seed)
      const data = await buildLocationData(payload, seed, content)
      const action = await upsertLocation(payload, seed, data)

      if (action === 'created') {
        created += 1
      } else {
        updated += 1
      }
    }

    console.log(
      JSON.stringify(
        {
          created,
          media: mediaStats,
          updated,
        },
        null,
        2,
      ),
    )
  } finally {
    await payload.destroy()
  }
}

try {
  await main()
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
