import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { newMexicoContent } from '@/app/(site)/locations/new-mexico/content'

export const metadata: Metadata = {
  title: 'New Mexico AI Damage Detection | Chex.AI',
  description:
    'AI-powered damage detection, automated diagnostics, and vehicle inspection workflows for New Mexico fleets, rideshare drivers, and operators.',
}

export default function NewMexicoRoutePage() {
  return <LocationPage content={newMexicoContent} />
}
