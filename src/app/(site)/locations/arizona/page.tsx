import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { arizonaContent } from '@/app/(site)/locations/arizona/content'

export const metadata: Metadata = {
  title: 'Arizona Mobile Vehicle Inspection App | Chex.AI',
  description:
    'Mobile auto inspection software, smartphone vehicle certifications, and car damage detection workflows for Phoenix, Tucson, and Scottsdale.',
}

export default function ArizonaRoutePage() {
  return <LocationPage content={arizonaContent} />
}
