import nextEnv from '@next/env'
import { getPayload } from 'payload'

import { slugifyOrFallback } from '../src/lib/slugify.ts'

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

const uniqueSlug = (baseSlug: string, usedSlugs: Set<string>) => {
  let slug = baseSlug
  let index = 2

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${index}`
    index += 1
  }

  usedSlugs.add(slug)
  return slug
}

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
    sort: 'createdAt',
  })

  const usedSlugs = new Set<string>()
  let updated = 0

  for (const post of result.docs) {
    const baseSlug = slugifyOrFallback(post.slug || post.title, `post-${post.id}`)
    const nextSlug = uniqueSlug(baseSlug, usedSlugs)

    if (post.slug === nextSlug) {
      console.log(`- ${post.title}: already clean (${post.slug})`)
      continue
    }

    await payload.update({
      collection: 'posts',
      id: post.id,
      data: {
        slug: nextSlug,
      },
      overrideAccess: true,
    })

    updated += 1
    console.log(`- ${post.title}: ${post.slug} -> ${nextSlug}`)
  }

  console.log(`\nDone. Updated ${updated} post slug(s).`)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
