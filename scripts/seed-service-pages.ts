/**
 * seed-service-pages.ts
 *
 * Seeds the four service-page globals (commercial-fleet, insurance, rental,
 * towing-valet) from scripts/service-page-content.json — a snapshot of the live
 * CMS content captured by build-service-snapshots.ts. Run this on a fresh env
 * (e.g. prod) after `payload migrate` to reproduce the content the SEO team
 * maintains in staging.
 *
 * Additive: only writes these four globals, never touches other collections or
 * globals. It DOES overwrite whatever is already in these four globals on the
 * target DB — so only run it against an env you intend to (re)seed.
 *
 * Refresh the snapshot first if staging changed:
 *   node --import tsx scripts/dump-service-globals.ts
 *   node --import tsx scripts/build-service-snapshots.ts
 *
 * Then seed the target env (DATABASE_URL points at it):
 *   node --import tsx scripts/seed-service-pages.ts
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import nextEnv from '@next/env'
import { getPayload } from 'payload'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const SLUGS = [
  'commercial-fleet-page',
  'insurance-page',
  'rental-page',
  'towing-valet-page',
] as const

async function main() {
  const snapshot = JSON.parse(
    readFileSync(join(process.cwd(), 'scripts', 'service-page-content.json'), 'utf8'),
  ) as Record<string, Record<string, unknown>>

  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  for (const slug of SLUGS) {
    const data = snapshot[slug]
    if (!data) {
      console.warn(`! ${slug}: missing from snapshot — skipped`)
      continue
    }
    await payload.updateGlobal({ slug, data, overrideAccess: true })
    console.log(`✓ seeded ${slug}`)
  }

  console.log('\n✓ Service-page globals seeded from snapshot.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
