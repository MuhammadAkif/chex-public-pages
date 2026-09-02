import type { Metadata } from 'next'
import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'
import { mapServicePageDoc, type Loose } from '@/app/(site)/components/commercial-fleet/map-service-content'
import { rentalDefaultContent as fallback } from './content'

/** Reads the `rental-page` global, falling back to {@link rentalDefaultContent}. */
async function fetchRentalPage(): Promise<CommercialFleetContent> {
  try {
    const payload = await getPayload({ config })
    const doc = (await payload.findGlobal({
      slug: 'rental-page',
      depth: 1,
      overrideAccess: false,
    })) as unknown as Loose
    return mapServicePageDoc(doc, fallback)
  } catch {
    return fallback
  }
}

export const getRentalPage: () => Promise<CommercialFleetContent> = cache(fetchRentalPage)

export function rentalMetadata(content: CommercialFleetContent): Metadata {
  return { title: content.meta.title, description: content.meta.description }
}
