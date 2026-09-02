import type { Metadata } from 'next'
import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'
import { mapServicePageDoc, type Loose } from '@/app/(site)/components/commercial-fleet/map-service-content'
import { towingValetDefaultContent as fallback } from './content'

/** Reads the `towing-valet-page` global, falling back to {@link towingValetDefaultContent}. */
async function fetchTowingValetPage(): Promise<CommercialFleetContent> {
  try {
    const payload = await getPayload({ config })
    const doc = (await payload.findGlobal({
      slug: 'towing-valet-page',
      depth: 1,
      overrideAccess: false,
    })) as unknown as Loose
    return mapServicePageDoc(doc, fallback)
  } catch {
    return fallback
  }
}

export const getTowingValetPage: () => Promise<CommercialFleetContent> = cache(fetchTowingValetPage)

export function towingValetMetadata(content: CommercialFleetContent): Metadata {
  return { title: content.meta.title, description: content.meta.description }
}
