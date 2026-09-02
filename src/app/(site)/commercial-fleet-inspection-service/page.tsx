import type { Metadata } from 'next'

import { CommercialFleetPage } from '@/app/(site)/components/commercial-fleet/commercial-fleet-page'

import { commercialFleetMetadata, getCommercialFleetPage } from './payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCommercialFleetPage()
  return commercialFleetMetadata(content)
}

export default async function CommercialFleetInspectionServicePage() {
  const content = await getCommercialFleetPage()
  return <CommercialFleetPage content={content} />
}
