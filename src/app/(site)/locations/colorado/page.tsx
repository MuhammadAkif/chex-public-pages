import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { coloradoContent } from '@/app/(site)/locations/colorado/content'

export const metadata: Metadata = {
  title: 'Colorado Smart Car Damage Detection | Chex.AI',
  description:
    'AI-powered vehicle inspections, damage detection, and resale-ready inspection workflows for Colorado families, rideshare drivers, and fleet operators.',
}

export default function ColoradoRoutePage() {
  return <LocationPage content={coloradoContent} />
}
