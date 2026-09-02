import type { Metadata } from 'next'

import { CommercialFleetPage } from '@/app/(site)/components/commercial-fleet/commercial-fleet-page'

import { getInsurancePage, insuranceMetadata } from './payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getInsurancePage()
  return insuranceMetadata(content)
}

export default async function InsuranceInspectionServicePage() {
  const content = await getInsurancePage()
  return <CommercialFleetPage content={content} />
}
