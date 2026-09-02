import type { Metadata } from 'next'
import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import {
  commercialFleetDefaultContent as fallback,
  type CommercialFleetContent,
} from './content'
import { mapServicePageDoc, type Loose } from '@/app/(site)/components/commercial-fleet/map-service-content'

/**
 * Reads the `commercial-fleet-page` global and maps it to the render model.
 * Every field falls back to {@link commercialFleetDefaultContent} so the page
 * renders correctly even before the global has been seeded.
 */
async function fetchCommercialFleetPage(): Promise<CommercialFleetContent> {
  try {
    const payload = await getPayload({ config })
    const doc = (await payload.findGlobal({
      slug: 'commercial-fleet-page',
      depth: 1,
      overrideAccess: false,
    })) as unknown as Loose
    return mapServicePageDoc(doc, fallback)
  } catch {
    // Global not migrated/seeded yet — render from bundled defaults.
    return fallback
  }
}

export const getCommercialFleetPage: () => Promise<CommercialFleetContent> = cache(
  fetchCommercialFleetPage,
)

export function commercialFleetMetadata(content: CommercialFleetContent): Metadata {
  return { title: content.meta.title, description: content.meta.description }
}
