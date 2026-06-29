import type { MetadataRoute } from 'next'
import config from '@payload-config'
import { getPayload } from 'payload'
import { slugify } from '@/lib/slugify'

type SitemapEntry = MetadataRoute.Sitemap[number]

const getSiteUrl = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

  if (
    !serverUrl ||
    (process.env.NODE_ENV === 'production' &&
      (serverUrl.includes('localhost') || serverUrl.includes('127.0.0.1')))
  ) {
    return 'https://chex.ai'
  }

  return serverUrl
}

const SITE_URL = getSiteUrl()

export const dynamic = 'force-dynamic'

const STATIC_ROUTES = [
  '/',
  '/blogs',
  '/contact-us',
  '/fleet-inspection',
  '/lyft-inspection',
  '/privacy-policy',
  '/ride-share',
  '/rideshare-inspection-service',
  '/terms-of-use',
  '/uber-inspection',
] as const

const FALLBACK_LOCATION_SLUGS = [
  'alabama',
  'arizona',
  'arkansas',
  'california',
  'colorado',
  'iowa',
  'nebraska',
  'nevada',
  'new-mexico',
  'ohio',
  'south-carolina',
] as const

const toUrl = (pathname: string) => new URL(pathname, SITE_URL).toString()

const staticEntries = (): MetadataRoute.Sitemap => {
  const lastModified = new Date()

  return STATIC_ROUTES.map((route) => ({
    url: toUrl(route),
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}

async function getLocationEntries(): Promise<MetadataRoute.Sitemap> {
  const fallbackEntries = FALLBACK_LOCATION_SLUGS.map<SitemapEntry>((slug) => ({
    url: toUrl(`/locations/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'locations',
      depth: 0,
      draft: false,
      limit: 100,
      overrideAccess: true,
      select: {
        slug: true,
        updatedAt: true,
      },
      sort: 'slug',
    })

    if (result.docs.length === 0) {
      return fallbackEntries
    }

    return result.docs.map((location) => ({
      url: toUrl(`/locations/${location.slug}`),
      lastModified: new Date(location.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  } catch {
    return fallbackEntries
  }
}

async function getBlogPostEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      depth: 0,
      draft: false,
      limit: 1000,
      overrideAccess: true,
      select: {
        slug: true,
        updatedAt: true,
      },
      sort: '-publishedAt',
    })

    return result.docs.map((post) => ({
      url: toUrl(`/blogs/${encodeURIComponent(slugify(post.slug))}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [locations, posts] = await Promise.all([
    getLocationEntries(),
    getBlogPostEntries(),
  ])

  return [...staticEntries(), ...locations, ...posts]
}
