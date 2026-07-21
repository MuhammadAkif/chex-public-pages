import nextEnv from '@next/env'
import { getPayload } from 'payload'

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

// Default CTA copy — mirrors the site-wide "Ready to modernize your inspections?"
// section (see scripts/seed-home.ts). Applied only to posts that don't already
// have a CTA, so re-running never clobbers per-post edits made in the CMS.
const DEFAULT_CTA = {
  title: 'Ready to modernize your inspections?',
  description:
    'Join the hundreds of automotive brands leading the AI revolution. Start your risk-free 14-day trial today.',
  secondaryLabel: 'Start My Inspection',
} as const

const hasCta = (cta: unknown): boolean => {
  if (typeof cta !== 'object' || cta === null) return false
  const { title, description, secondaryLabel } = cta as Record<string, unknown>
  return Boolean(title || description || secondaryLabel)
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

  let updated = 0

  for (const post of result.docs) {
    if (hasCta(post.cta)) {
      console.log(`- ${post.title}: already has a CTA, skipping`)
      continue
    }

    // Only the `cta` field is passed, so title/slug/content/image/meta/_status
    // are all left untouched.
    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { cta: { ...DEFAULT_CTA } },
      overrideAccess: true,
    })

    updated += 1
    console.log(`- ${post.title}: seeded default CTA`)
  }

  console.log(`\nDone. Seeded CTA on ${updated} post(s).`)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
