import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import nextEnv from '@next/env'
import { Client } from 'pg'
import { getPayload } from 'payload'

import {
  defaultPricingRideShareSection,
  defaultRegisterRideShareSection,
} from './rideshare-section-defaults'

type PayloadClient = Awaited<ReturnType<typeof getPayload>>
type MediaFieldData<Name extends string> = Record<Name, string | null> &
  Record<`${Name}FallbackUrl`, string | null>

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)
const databaseURL =
  process.env.DATABASE_URL || 'postgresql://payload:payload@localhost:5433/payload_app'

const mediaCache = new Map<string, Promise<string | null>>()

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

function safeFilename(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  const name = path
    .basename(filename, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${name || 'rideshare-asset'}${ext || '.png'}`
}

async function findMediaByHash(payload: PayloadClient, hash: string) {
  const result = await payload.find({
    collection: 'media',
    limit: 1,
    overrideAccess: true,
    where: {
      sourceHash: {
        equals: hash,
      },
    },
  })

  return result.docs[0] ?? null
}

async function createMediaFromURL(payload: PayloadClient, url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Unable to download ${url}: ${response.status} ${response.statusText}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  const existing = await findMediaByHash(payload, hash)

  if (existing) {
    return existing.id
  }

  const tempDir = path.join('/tmp', 'chex-rideshare-section-media')
  const filename = safeFilename(filenameFromURL(url))
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

  return doc.id
}

async function resolveMediaID(payload: PayloadClient, url: string | undefined) {
  if (!url) {
    return null
  }

  const cached = mediaCache.get(url)

  if (cached) {
    return cached
  }

  const promise = createMediaFromURL(payload, url)
  mediaCache.set(url, promise)

  return promise
}

async function mediaField<Name extends string>(
  payload: PayloadClient,
  name: Name,
  url: string | undefined,
): Promise<MediaFieldData<Name>> {
  return {
    [name]: await resolveMediaID(payload, url),
    [`${name}FallbackUrl`]: url ?? null,
  } as MediaFieldData<Name>
}

async function buildSectionData(payload: PayloadClient) {
  return {
    pricingRideShareSection: {
      ...(await mediaField(payload, 'highlightIcon', defaultPricingRideShareSection.highlightIcon)),
      currencySymbol: defaultPricingRideShareSection.currencySymbol,
      description: defaultPricingRideShareSection.description,
      highlightIconAlt: defaultPricingRideShareSection.highlightIconAlt ?? null,
      highlights: defaultPricingRideShareSection.highlights.map((highlight) => ({
        emphasis: highlight.emphasis ?? null,
        emphasisTone: highlight.emphasisTone ?? 'accent',
        text: highlight.text,
      })),
      plans: defaultPricingRideShareSection.plans.map((plan) => ({
        buttonHref: plan.buttonHref,
        buttonLabel: plan.buttonLabel,
        description: plan.description,
        name: plan.name,
        price: plan.price,
        subDescription: plan.subDescription ?? null,
        tone: plan.tone ?? 'primary',
      })),
      title: defaultPricingRideShareSection.title,
    },
    registerRideShareSection: {
      ...(await mediaField(payload, 'initialImage', defaultRegisterRideShareSection.initialImage)),
      ctaHref: defaultRegisterRideShareSection.ctaHref,
      ctaLabel: defaultRegisterRideShareSection.ctaLabel,
      eyebrow: defaultRegisterRideShareSection.eyebrow,
      initialImageAlt: defaultRegisterRideShareSection.initialImageAlt ?? null,
      steps: await Promise.all(
        defaultRegisterRideShareSection.steps.map(async (step) => ({
          ...(await mediaField(payload, 'icon', step.icon)),
          ...(await mediaField(payload, 'image', step.image)),
          description: step.description,
          iconAlt: step.iconAlt,
          imageAlt: step.imageAlt,
          step: step.step,
          title: step.title,
        })),
      ),
      title: defaultRegisterRideShareSection.title,
    },
  }
}

async function patchLocationDocuments(data: Awaited<ReturnType<typeof buildSectionData>>) {
  const client = new Client({ connectionString: databaseURL })

  await client.connect()

  try {
    await client.query('begin')

    const locations = await client.query<{ id: string }>('select id from locations')

    for (const location of locations.rows) {
      await client.query(
        `
          update locations
          set
            register_ride_share_section_eyebrow = $2,
            register_ride_share_section_title = $3,
            register_ride_share_section_cta_label = $4,
            register_ride_share_section_cta_href = $5,
            register_ride_share_section_initial_image_id = $6,
            register_ride_share_section_initial_image_fallback_url = $7,
            register_ride_share_section_initial_image_alt = $8,
            pricing_ride_share_section_title = $9,
            pricing_ride_share_section_description = $10,
            pricing_ride_share_section_currency_symbol = $11,
            pricing_ride_share_section_highlight_icon_id = $12,
            pricing_ride_share_section_highlight_icon_fallback_url = $13,
            pricing_ride_share_section_highlight_icon_alt = $14,
            updated_at = now()
          where id = $1
        `,
        [
          location.id,
          data.registerRideShareSection.eyebrow,
          data.registerRideShareSection.title,
          data.registerRideShareSection.ctaLabel,
          data.registerRideShareSection.ctaHref,
          data.registerRideShareSection.initialImage,
          data.registerRideShareSection.initialImageFallbackUrl,
          data.registerRideShareSection.initialImageAlt,
          data.pricingRideShareSection.title,
          data.pricingRideShareSection.description,
          data.pricingRideShareSection.currencySymbol,
          data.pricingRideShareSection.highlightIcon,
          data.pricingRideShareSection.highlightIconFallbackUrl,
          data.pricingRideShareSection.highlightIconAlt,
        ],
      )

      await client.query(
        'delete from locations_register_ride_share_section_steps where _parent_id = $1',
        [location.id],
      )
      await client.query(
        'delete from locations_pricing_ride_share_section_plans where _parent_id = $1',
        [location.id],
      )
      await client.query(
        'delete from locations_pricing_ride_share_section_highlights where _parent_id = $1',
        [location.id],
      )

      for (const [index, step] of data.registerRideShareSection.steps.entries()) {
        await client.query(
          `
            insert into locations_register_ride_share_section_steps
              (_order, _parent_id, id, step, title, description, icon_id, icon_fallback_url, icon_alt, image_id, image_fallback_url, image_alt)
            values
              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          `,
          [
            index + 1,
            location.id,
            crypto.randomUUID(),
            step.step,
            step.title,
            step.description,
            step.icon,
            step.iconFallbackUrl,
            step.iconAlt,
            step.image,
            step.imageFallbackUrl,
            step.imageAlt,
          ],
        )
      }

      for (const [index, plan] of data.pricingRideShareSection.plans.entries()) {
        await client.query(
          `
            insert into locations_pricing_ride_share_section_plans
              (_order, _parent_id, id, name, price, description, sub_description, button_label, button_href, tone)
            values
              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          `,
          [
            index + 1,
            location.id,
            crypto.randomUUID(),
            plan.name,
            plan.price,
            plan.description,
            plan.subDescription,
            plan.buttonLabel,
            plan.buttonHref,
            plan.tone,
          ],
        )
      }

      for (const [index, highlight] of data.pricingRideShareSection.highlights.entries()) {
        await client.query(
          `
            insert into locations_pricing_ride_share_section_highlights
              (_order, _parent_id, id, emphasis, text, emphasis_tone)
            values
              ($1, $2, $3, $4, $5, $6)
          `,
          [
            index + 1,
            location.id,
            crypto.randomUUID(),
            highlight.emphasis,
            highlight.text,
            highlight.emphasisTone,
          ],
        )
      }
    }

    await client.query('commit')

    return locations.rows.length
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    await client.end()
  }
}

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  try {
    const data = await buildSectionData(payload)
    const locationsUpdated = await patchLocationDocuments(data)

    console.log(
      JSON.stringify(
        {
          locationsUpdated,
          mediaResolved: mediaCache.size,
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
