import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { nebraskaContent } from '@/app/(site)/locations/nebraska/content'

export const metadata: Metadata = {
  title: 'Nebraska Vehicle Inspection AI | Chex.AI',
  description:
    'AI-powered vehicle inspections, damage detection, and fleet workflows for Nebraska operators, dealers, municipal teams, and freight carriers.',
}

export default function NebraskaRoutePage() {
  return <LocationPage content={nebraskaContent} />
}
