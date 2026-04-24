import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { californiaContent } from '@/app/(site)/locations/california/content'

export const metadata: Metadata = {
  title: 'California Car Inspection AI | Chex.AI',
  description:
    'AI-powered vehicle inspections, car damage recognition, and fast valuation workflows for California fleets, dealerships, and rideshare operators.',
}

export default function CaliforniaRoutePage() {
  return <LocationPage content={californiaContent} />
}
