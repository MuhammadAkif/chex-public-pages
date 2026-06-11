import type { Metadata } from 'next'

import { HomePage } from '@/app/(site)/components/home/home-page'
import { getHomePage } from '@/app/(site)/home/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await getHomePage()
  return metadata
}

export default async function ServicePage() {
  const { content } = await getHomePage()
  return <HomePage content={content} />
}
