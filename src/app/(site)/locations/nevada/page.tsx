import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { nevadaContent } from '@/app/(site)/locations/nevada/content'

export const metadata: Metadata = {
  title: 'Nevada Fleet Inspection AI | Chex.AI',
  description:
    'AI-powered vehicle inspections, damage tracking, and fleet workflows for Nevada carriers, rental operators, and rideshare teams.',
}

export default function NevadaRoutePage() {
  return <LocationPage content={nevadaContent} />
}
