import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { alabamaContent } from '@/app/(site)/locations/alabama/content'

export const metadata: Metadata = {
  title: 'Alabama Vehicle Damage Assessment AI | Chex.AI',
  description:
    'Remote vehicle damage assessment, mobile car inspections, and AI-powered compliance workflows for Birmingham, Montgomery, and Huntsville drivers.',
}

export default function AlabamaRoutePage() {
  return <LocationPage content={alabamaContent} />
}
