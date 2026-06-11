/**
 * seed-home.ts
 *
 * Seeds the ServicePage global (slug `service-page`, which powers /service) from
 * the legacy Home content embedded below. Mirrors the conventions of
 * scripts/seed-locations.ts (mediaField helper, fallback URLs,
 * dynamic config import inside main()).
 *
 * Run via:  node --import tsx scripts/seed-home.ts
 */

import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import nextEnv from '@next/env'
import { getPayload } from 'payload'

import type { Media } from '../src/payload-types'

type PayloadClient = Awaited<ReturnType<typeof getPayload>>
type MediaFieldData = Record<string, string | null>

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

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
      [field]: { equals: value },
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

  const tempDir = path.join('/tmp', 'chex-home-media-seed')
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

async function resolveMediaID(payload: PayloadClient, url: string) {
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

    if (process.env.HOME_SEED_DOWNLOAD_MEDIA === '1' && filename) {
      return createMediaFromURL(payload, url, filename)
    }

    mediaStats.fallbackOnly += 1
    return null
  })()

  mediaCache.set(url, promise)
  return promise
}

async function mediaField(
  payload: PayloadClient,
  name: string,
  url: string,
): Promise<MediaFieldData> {
  const mediaID = await resolveMediaID(payload, url)
  return {
    [name]: mediaID,
    [`${name}FallbackUrl`]: url || null,
  }
}

function textRows(items: ReadonlyArray<string>) {
  return items.map((text) => ({ text }))
}

// Source data — kept here so the seeder is self-contained and runnable
// after the legacy src/app/(site)/home/content.ts is removed.
const homeContent = {
  hero: {
    rating: '4.8 (1667+ reviews)',
    title: 'AI Powered Rideshare Vehicle Inspection & Instant Approval',
    description:
      'Chex.ai is the only certified AI inspection service accepted by Uber, Lyft, Turo, HopSkipDrive, Zum, Adroit, and Tribur. Complete your vehicle inspection from your phone in 30 minutes.',
    secondaryLabel: 'Start My Inspection',
    media:
      'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/chex-video.mp4',
  },
  community: {
    title: 'Our Community of Chex.AI Drivers Is Growing Fast',
    subtitle:
      'Our AI rideshare inspection solution simplifies vehicle inspections for every rideshare driver on every major platform',
    stats: [
      { value: '50k+', label: 'Inspections', tone: 'sky' },
      { value: '5+', label: 'Years of Experience', tone: 'sand' },
      { value: '4.8*', label: 'Average Driver Rating', tone: 'ice' },
      { value: '5 min', label: 'Average Inspection Time', tone: 'ice' },
    ],
    manageTitle: 'You can manage & inspect your car online',
    manageBullets: [
      'A Chex Verified Ecosystem interconnecting all of the various stakeholders',
      'User-friendly app',
      'Powered by advanced AI, allowing for real-time reporting on every inspected vehicle',
      'AI based reviews for pinpoint damage and safety items reporting',
    ],
    manageImage:
      'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/manage-inspection.png',
    trustedTitle: 'Trusted by drivers on every major rideshare platforms',
    trustedLogos: [
      {
        image:
          'https://res.cloudinary.com/dgjordf6e/image/upload/v1742288544/image_23_1_acixly.png',
        label: 'Uber',
      },
      {
        image:
          'https://res.cloudinary.com/dgjordf6e/image/upload/v1742288544/image_69_hajt9n.png',
        label: 'Lyft',
      },
      {
        image:
          'https://res.cloudinary.com/dgjordf6e/image/upload/v1742288649/image_80_jlmrcm.png',
        label: 'Turo',
      },
      {
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-adroit.png',
        label: 'Adroit',
      },
      {
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-zum.png',
        label: 'Zum',
      },
      {
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/images.png',
        label: 'HopSkipDrive',
      },
      {
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/Asset%201.png',
        label: 'Triburs',
      },
    ],
  },
  howItWorks: {
    title: 'How it works',
    description:
      'With a user-friendly app and comprehensive dashboard, Get your certified rideshare vehicle inspection done in four simple steps — no appointments, no paperwork, no delays',
    steps: [
      {
        title: 'Register',
        description:
          'Please register your account by filling out the form above to get started',
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/step-1.png',
      },
      {
        title: 'Complete Inspection',
        description:
          'Follow the instructions for each inspection point within our app and upload photo and video clips',
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/step-2.png',
      },
      {
        title: 'Complete Payment',
        description:
          "Enter payment details. If you don't pass, your first re-inspection is free",
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/step-3.png',
      },
      {
        title: 'Same-day Certification',
        description:
          'All certifications completed within 4 hours or less. Downloadable verification in-app',
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/step-4.png',
      },
    ],
  },
  benefits: {
    title: 'Benefits we propose',
    items: [
      {
        title: 'Fast and convenient',
        description:
          'No appointments. No waiting rooms. No shop visits Complete your entire rideshare vehicle inspection from your phone in 30 minutes or less — anytime, anywhere across all 50 states.',
        tone: 'accent',
        icon: 'spark',
      },
      {
        title: 'Cost-effective',
        description:
          'One inspection starting at $24.99 covers every platform you drive.',
        tone: 'muted',
        icon: 'cost',
      },
      {
        title: 'Increased accuracy',
        description:
          "Chex.ai's AI inspection detects damage, lighting failures, and safety issues with precision",
        tone: 'muted',
        icon: 'target',
      },
      {
        title: 'Improved customer experience',
        description:
          ' Drivers report faster platform approval times with Chex.ai compared to traditional mechanic inspections. Stay active on your platform without losing earning days to slow inspection processes',
        tone: 'muted',
        icon: 'people',
      },
      {
        title: 'Better risk management',
        description:
          " Chex.ai's annual renewal reminders and inspection history storage ensure you never miss a deadline",
        tone: 'muted',
        icon: 'shield',
      },
    ],
  },
  keyDifferentiators: {
    title: 'Key Differentiators',
    items: [
      'Easily integratable allowing businesses to perform and manage repeatable tasks.',
      'Mobile application with easy to use self inspection guide & tools for users.',
      'Highly scalable technology enabling businesses to expand quicker.',
      'Reduces business overhead & operations cost.',
    ],
    image:
      'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/key-differentiators.png',
  },
  businessHelp: {
    title: 'How we help Rideshare Drivers?',
    description:
      'We help drivers to optimize their inspection process. Feedback from Our Verified Drivers!',
    buttonLabel: 'Contact us',
    image:
      'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/analytics-dashboard.png',
  },
  caseStudies: {
    title: 'Case Studies',
    items: [
      {
        metric: '98.5%',
        title: 'Accuracy',
        description:
          'Our AI-powered vehicle inspection system automatically detects and highlights visible damages such as dents, scratches, cracks, and broken parts from vehicle images.',
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-accuracy.png',
      },
      {
        metric: '95.3%',
        title: 'AI Detection',
        description:
          'The system inspects every side of the vehicle and detects damage on each body part individually by comparing current and previous inspections.',
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-detection.png',
      },
      {
        metric: '93.6%',
        title: 'Reliability',
        description:
          'Automated condition assessments give operations teams a dependable, repeatable decisioning baseline.',
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-reliability.png',
      },
      {
        metric: '92.5%',
        title: 'Growth Rate',
        description:
          'Actionable inspection data creates smoother customer handoffs and supports higher program throughput.',
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-growth.png',
      },
      {
        metric: '81.5%',
        title: 'Coverage',
        description:
          'Multi-angle inspection capture keeps more of the vehicle lifecycle visible across distributed fleets.',
        image:
          'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/case-coverage.png',
      },
    ],
    arrowImage:
      'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/arrow-circle.png',
  },
  testimonials: {
    title: 'Feedback from our verified clients',
    description: 'We are happy when our customers are too.',
    label: 'What Our Client Say About Us?',
    items: [
      { name: 'Mark Melancon', quote: 'The support team helped me when Uber was not accepting my inspection. Resolved it quickly and professionally.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=11' },
      { name: 'Kelsey Proofreads', quote: "Process was simple, quick, and informative. They make sure you have an explanation and an example photo/video for what they're looking for. I got my results (certificate) about 20 minutes after completing my inspection. Thanks Chex.AI for making this quick and affordable without needing to leave my house.", stars: 5, avatar: 'https://i.pravatar.cc/100?img=5' },
      { name: 'Mary Lugo', quote: 'Quick and easy to use. The interface made everything straightforward from start to finish.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=9' },
      { name: 'Mubarak Behi', quote: 'Quick and efficient! Great price and easy to upload all photos and videos required. Will definitely recommend and use it next year!', stars: 5, avatar: 'https://i.pravatar.cc/100?img=15' },
      { name: 'Angela Bishop', quote: 'Chex.ai was really easy to use, better than going to the mechanic!', stars: 5, avatar: 'https://i.pravatar.cc/100?img=23' },
      { name: 'Ali Alshammari', quote: "Rideshare for five years now I have tried other services and this is by far the best! Easiest to complete and lowest price that I've seen out there.", stars: 5, avatar: 'https://i.pravatar.cc/100?img=33' },
      { name: 'Hovannss Kupelyan', quote: 'Positive Value. Got my inspection done in under 10 minutes. Highly recommend to any rideshare driver.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=52' },
      { name: 'Slamnjamin Dio', quote: 'Excellent customer service!!! They walked me through every step and made sure I was fully certified before the end of the day.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=60' },
      { name: 'Mousa Naseer', quote: 'The app was easy to follow, the pictures showing what was required of me to take made it simple. Upload was fast. They responded quickly and had the inspection back within a half hour! Thank you. Well worth the money.', stars: 5, avatar: 'https://i.pravatar.cc/100?img=67' },
      { name: 'Andressa Amorim', quote: 'Chexai was really easy to use, better than going to the mechanic!', stars: 5, avatar: 'https://i.pravatar.cc/100?img=44' },
      { name: 'James Tillman', quote: "It beats scheduling an appointment with a mechanic. A handful of snapshots and a few minutes of your time and you're done.", stars: 5, avatar: 'https://i.pravatar.cc/100?img=70' },
      { name: 'Sofia Reyes', quote: "I've been using Chex.AI for two years straight. Every renewal is just as smooth as the first time.", stars: 5, avatar: 'https://i.pravatar.cc/100?img=47' },
    ],
  },
  cta: {
    title: 'Ready to modernize your inspections?',
    description:
      'Join the hundreds of automotive brands leading the AI revolution. Start your risk-free 14-day trial today.',
    secondaryLabel: 'Start My Inspection',
  },
} as const

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  const data = {
    meta: {
      title: 'Home | Chex.AI',
      description:
        'Modern vehicle inspections powered by AI with customer-friendly capture flows and partner analytics.',
    },
    hero: {
      rating: homeContent.hero.rating,
      title: homeContent.hero.title,
      description: homeContent.hero.description,
      secondaryLabel: homeContent.hero.secondaryLabel,
      ...(await mediaField(payload, 'media', homeContent.hero.media)),
    },
    community: {
      title: homeContent.community.title,
      subtitle: homeContent.community.subtitle,
      stats: homeContent.community.stats.map((stat) => ({
        value: stat.value,
        label: stat.label,
        tone: stat.tone,
      })),
      manageTitle: homeContent.community.manageTitle,
      manageBullets: textRows(homeContent.community.manageBullets),
      ...(await mediaField(payload, 'manageImage', homeContent.community.manageImage)),
      trustedTitle: homeContent.community.trustedTitle,
      trustedLogos: await Promise.all(
        homeContent.community.trustedLogos.map(async (logo) => ({
          ...(await mediaField(payload, 'image', logo.image)),
          label: logo.label,
        })),
      ),
    },
    howItWorks: {
      title: homeContent.howItWorks.title,
      description: homeContent.howItWorks.description,
      steps: await Promise.all(
        homeContent.howItWorks.steps.map(async (step) => ({
          title: step.title,
          description: step.description,
          ...(await mediaField(payload, 'image', step.image)),
        })),
      ),
    },
    benefits: {
      title: homeContent.benefits.title,
      items: homeContent.benefits.items.map((item) => ({
        title: item.title,
        description: item.description,
        tone: item.tone,
        icon: item.icon,
      })),
    },
    keyDifferentiators: {
      title: homeContent.keyDifferentiators.title,
      items: textRows(homeContent.keyDifferentiators.items),
      ...(await mediaField(payload, 'image', homeContent.keyDifferentiators.image)),
    },
    businessHelp: {
      title: homeContent.businessHelp.title,
      description: homeContent.businessHelp.description,
      buttonLabel: homeContent.businessHelp.buttonLabel,
      ...(await mediaField(payload, 'image', homeContent.businessHelp.image)),
    },
    caseStudies: {
      title: homeContent.caseStudies.title,
      items: await Promise.all(
        homeContent.caseStudies.items.map(async (item) => ({
          metric: item.metric,
          title: item.title,
          description: item.description,
          ...(await mediaField(payload, 'image', item.image)),
          caption: (item as { caption?: string }).caption ?? null,
        })),
      ),
      ...(await mediaField(payload, 'arrowImage', homeContent.caseStudies.arrowImage)),
    },
    testimonials: {
      title: homeContent.testimonials.title,
      description: homeContent.testimonials.description,
      label: homeContent.testimonials.label,
      items: homeContent.testimonials.items.map((item) => ({
        name: item.name,
        quote: item.quote,
        stars: item.stars ?? 5,
        avatar: item.avatar ?? null,
      })),
    },
    cta: {
      title: homeContent.cta.title,
      description: homeContent.cta.description,
      secondaryLabel: homeContent.cta.secondaryLabel,
    },
  }

  await payload.updateGlobal({
    slug: 'service-page',
    data,
    overrideAccess: true,
  })

  console.log('\n✓ ServicePage global seeded.')
  console.log(
    `  Media — resolved: ${mediaStats.resolved}, downloaded: ${mediaStats.downloaded}, fallback-only: ${mediaStats.fallbackOnly}`,
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
