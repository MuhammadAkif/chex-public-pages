import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { southCarolinaContent } from '@/app/(site)/locations/south-carolina/content'

export const metadata: Metadata = {
  title: 'South Carolina Automotive Diagnostics AI | Chex.AI',
  description:
    'AI-powered vehicle inspections, diagnostics, rideshare compliance, and fleet reporting for South Carolina teams.',
}

export default function SouthCarolinaRoutePage() {
  return <LocationPage content={southCarolinaContent} />
}
