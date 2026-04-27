import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { getLocationPageBySlug } from '@/app/(site)/locations/payload'

const LOCATION_SLUG = 'arkansas'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLocationPageBySlug(LOCATION_SLUG)

  return page?.metadata ?? {}
}

export default async function ArkansasRoutePage() {
  const page = await getLocationPageBySlug(LOCATION_SLUG)

  if (!page) {
    notFound()
  }

  return <LocationPage content={page.content} />
}
