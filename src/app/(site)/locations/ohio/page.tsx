import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { ohioContent } from '@/app/(site)/locations/ohio/content'

export const metadata: Metadata = {
  title: 'Ohio Vehicle Inspection AI | Chex.AI',
  description:
    'Remote vehicle inspections, AI-powered damage detection, and fleet workflows for Columbus, Cleveland, and Cincinnati teams.',
}

export default function OhioRoutePage() {
  return <LocationPage content={ohioContent} />
}
