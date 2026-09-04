/**
 * dump-service-globals.ts  (READ-ONLY)
 *
 * Reads the four service-page globals from whatever DB `DATABASE_URL` points at
 * and writes them to scripts/_service-globals-dump.json for inspection. Does NOT
 * write to the DB. Used to sync the static content.ts / seed files with the
 * content the SEO team has edited in the CMS before seeding another environment.
 *
 * Run:  node --import tsx scripts/dump-service-globals.ts
 */

import { writeFileSync } from 'node:fs'
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
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  const out: Record<string, unknown> = {}
  for (const slug of SLUGS) {
    const doc = await payload.findGlobal({ slug, depth: 0, overrideAccess: true })
    out[slug] = doc
    const updatedAt = (doc as { updatedAt?: string }).updatedAt ?? 'unknown'
    console.log(`✓ ${slug}  (updatedAt: ${updatedAt})`)
  }

  const target = join(process.cwd(), 'scripts', '_service-globals-dump.json')
  writeFileSync(target, JSON.stringify(out, null, 2), 'utf8')
  console.log(`\nWrote ${target}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
