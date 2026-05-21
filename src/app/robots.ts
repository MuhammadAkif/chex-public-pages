import type { MetadataRoute } from 'next'

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

const toUrl = (pathname: string) => new URL(pathname, SITE_URL).toString()
const siteHost = () => new URL(SITE_URL).host

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: toUrl('/sitemap.xml'),
    host: siteHost(),
  }
}
