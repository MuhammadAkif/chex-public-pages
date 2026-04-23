import type { Metadata } from 'next'

import { SouthCarolinaPage } from '@/app/(site)/components/south-carolina/south-carolina-page'

export const metadata: Metadata = {
  title: 'South Carolina Automotive Diagnostics AI | Chex.AI',
  description:
    'AI-powered vehicle inspections, diagnostics, rideshare compliance, and fleet reporting for South Carolina teams.',
}

export default function SouthCarolinaRoutePage() {
  return <SouthCarolinaPage />
}
