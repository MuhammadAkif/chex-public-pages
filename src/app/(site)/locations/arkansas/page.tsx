import type { Metadata } from 'next'

import { LocationPage } from '@/app/(site)/components/locations/location-page'
import { arkansasContent } from '@/app/(site)/locations/arkansas/content'

export const metadata: Metadata = {
  title: 'Arkansas Auto Inspection AI | Chex.AI',
  description:
    'AI-powered vehicle inspections, auction fraud screening, and resale-ready condition reports for Arkansas dealerships, auctions, and private sellers.',
}

export default function ArkansasRoutePage() {
  return <LocationPage content={arkansasContent} />
}
