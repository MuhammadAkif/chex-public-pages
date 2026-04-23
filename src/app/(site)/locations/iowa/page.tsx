import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { iowaContent } from '@/app/(site)/locations/iowa/content'

export const metadata: Metadata = {
  title: 'Iowa Vehicle Inspection AI | Chex.AI',
  description:
    'AI-powered vehicle inspections, damage detection, and digital compliance workflows for Iowa rideshare drivers, fleets, and mobility operators.',
}

export default function IowaRoutePage() {
  return <LocationPage content={iowaContent} />
}
