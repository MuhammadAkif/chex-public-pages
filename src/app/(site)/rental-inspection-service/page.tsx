import type { Metadata } from 'next'

import { CommercialFleetPage } from '@/app/(site)/components/commercial-fleet/commercial-fleet-page'

import { getRentalPage, rentalMetadata } from './payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getRentalPage()
  return rentalMetadata(content)
}

export default async function RentalInspectionServicePage() {
  const content = await getRentalPage()
  return <CommercialFleetPage content={content} />
}
