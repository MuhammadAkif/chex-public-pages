import type { Metadata } from 'next'

import { HomePage } from '@/app/(site)/components/home/home-page'

export const metadata: Metadata = {
  title: 'Home | Chex.AI',
  description:
    'Modern vehicle inspections powered by AI with customer-friendly capture flows and partner analytics.',
}

export default function HomeRoutePage() {
  return <HomePage />
}
