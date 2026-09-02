import type { Metadata } from 'next'
import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'
import { mapServicePageDoc, type Loose } from '@/app/(site)/components/commercial-fleet/map-service-content'
import { insuranceDefaultContent as fallback } from './content'

/**
 * Reads the `insurance-page` global and maps it to the render model, falling
 * back to {@link insuranceDefaultContent} so the page renders before seeding.
 */
async function fetchInsurancePage(): Promise<CommercialFleetContent> {
  try {
    const payload = await getPayload({ config })
    const doc = (await payload.findGlobal({
      slug: 'insurance-page',
      depth: 1,
      overrideAccess: false,
    })) as unknown as Loose
    return mapServicePageDoc(doc, fallback)
  } catch {
    return fallback
  }
}

export const getInsurancePage: () => Promise<CommercialFleetContent> = cache(fetchInsurancePage)

export function insuranceMetadata(content: CommercialFleetContent): Metadata {
  return { title: content.meta.title, description: content.meta.description }
}
