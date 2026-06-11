import type { Metadata } from 'next'

import { LandingPage } from '@/app/(site)/components/landing/landing-page'
import { getLandingArticles, getLandingPage } from '@/app/(site)/landing-page/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await getLandingPage()
  return metadata
}

export default async function SitePage() {
  const [{ content }, articles] = await Promise.all([
    getLandingPage(),
    getLandingArticles(),
  ])

  // Prefer real posts from the `posts` collection for the blog carousel; keep
  // the CMS-configured eyebrow/title and fall back to its items if none exist.
  const merged = articles.length
    ? { ...content, articles: { ...content.articles, items: articles } }
    : content

  return <LandingPage content={merged} />
}
