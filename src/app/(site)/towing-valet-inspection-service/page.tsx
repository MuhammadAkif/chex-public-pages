import type { Metadata } from 'next'

import { CommercialFleetPage } from '@/app/(site)/components/commercial-fleet/commercial-fleet-page'

import { getTowingValetPage, towingValetMetadata } from './payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTowingValetPage()
  return towingValetMetadata(content)
}

export default async function TowingValetInspectionServicePage() {
  const content = await getTowingValetPage()
  return <CommercialFleetPage content={content} />
}
