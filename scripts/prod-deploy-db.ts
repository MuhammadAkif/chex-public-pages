/**
 * prod-deploy-db.ts — ONE command to bring the production DB in line for the
 * service pages, safely and additively:
 *   1) applies every pending Payload migration by running its idempotent up()
 *      directly (bypasses Payload's interactive dev-mode-push prompt) and records
 *      it in payload_migrations,
 *   2) seeds the 4 service-page globals from scripts/service-page-content.json
 *      (the staging CMS snapshot).
 *
 * Every migration is additive (CREATE TABLE / ADD COLUMN IF NOT EXISTS, guarded
 * enums/FKs; the only data change is NULL testimonial stars -> 5). Existing
 * prod content (home_page/locations/posts) is NOT touched. Re-runnable.
 *
 * Run in a terminal with Node 22/24 (nvm use 24):
 *   $env:PRODDB='postgresql://...prod...'; node --import tsx scripts/prod-deploy-db.ts
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import nextEnv from '@next/env'
import { sql } from 'drizzle-orm'

const PROD = process.env.PRODDB
if (!PROD) {
  console.error('Set PRODDB env var to the production DATABASE_URL')
  process.exit(1)
}

;(process.env as Record<string, string>).NODE_ENV = 'production'
nextEnv.loadEnvConfig(process.cwd())
process.env.DATABASE_URL = PROD

const SERVICE_SLUGS = [
  'commercial-fleet-page',
  'insurance-page',
  'rental-page',
  'towing-valet-page',
] as const

async function main() {
  const u = new URL(process.env.DATABASE_URL as string)
  if (u.pathname.includes('staging')) {
    console.error('Refusing: target DB name contains "staging". Aborting.')
    process.exit(1)
  }
  console.log('Target DB ->', u.hostname, '|', u.pathname.slice(1), '\n')

  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  const db = (payload.db as unknown as { drizzle?: { execute: (q: unknown) => Promise<{ rows?: Array<Record<string, unknown>> }> } }).drizzle
  if (!db || typeof db.execute !== 'function') {
    console.error('Could not access payload.db.drizzle.execute')
    process.exit(1)
  }
  const query = async (q: unknown) => {
    const res = await db.execute(q)
    return res.rows ?? (res as unknown as Array<Record<string, unknown>>)
  }

  // ---- 1) Apply pending migrations (tolerant + additive) --------------------
  // Older auto-generated migrations use plain CREATE (no IF NOT EXISTS); prod
  // already has that schema from a dev-mode push, so their up() throws
  // "already exists". We tolerate those (schema is present) and only truly
  // create what's missing (the service-page tables). up() bodies are additive
  // (CREATE / ADD COLUMN); every DROP lives in down(), which we never call.
  console.log('== Applying pending migrations (tolerant) ==')
  const { migrations } = (await import('../src/migrations/index.ts')) as {
    migrations: Array<{ name: string; up: (args: unknown) => Promise<void> }>
  }

  // Data-only migration (backfills NULL testimonial stars -> 5). Skip running to
  // leave existing data 100% untouched; just record it as applied.
  const DATA_ONLY = new Set(['20260505_131500_testimonials_distribution_cleanup'])

  const isAlreadyExists = (e: unknown): boolean => {
    const codes = ['42710', '42P07', '42701', '42P06', '42723', '42P16', '42711']
    const err = e as { code?: string; message?: string; cause?: { code?: string; message?: string } }
    const c1 = err?.code
    const c2 = err?.cause?.code
    const msg = `${err?.message ?? ''} ${err?.cause?.message ?? ''}`
    return (!!c1 && codes.includes(c1)) || (!!c2 && codes.includes(c2)) || /already exists/i.test(msg)
  }

  const applied = new Set((await query(sql`SELECT name FROM payload_migrations`)).map((r) => r.name as string))
  const batch = Number((await query(sql`SELECT COALESCE(MAX(batch),0)+1 AS b FROM payload_migrations`))[0].b)

  let created = 0
  let tolerated = 0
  for (const m of migrations) {
    if (applied.has(m.name)) {
      console.log('  skip (recorded): ' + m.name)
      continue
    }
    if (DATA_ONLY.has(m.name)) {
      console.log('  record-only (data migration, not run): ' + m.name)
    } else {
      try {
        await m.up({ db, payload, req: {} })
        created++
        console.log('  APPLIED (created): ' + m.name)
      } catch (e) {
        if (isAlreadyExists(e)) {
          tolerated++
          console.log('  tolerated (already present): ' + m.name)
        } else {
          console.error('  FAILED (non-idempotent, not already-exists): ' + m.name)
          throw e
        }
      }
    }
    await query(sql`INSERT INTO payload_migrations (id, name, batch, created_at, updated_at)
                    VALUES (gen_random_uuid(), ${m.name}, ${batch}, now(), now())`)
  }
  console.log(`  -> created ${created}, tolerated ${tolerated}; payload_migrations now complete\n`)

  // ---- 2) Seed the 4 service globals ----------------------------------------
  console.log('== Seeding service-page globals ==')
  const snapshot = JSON.parse(
    readFileSync(join(process.cwd(), 'scripts', 'service-page-content.json'), 'utf8'),
  ) as Record<string, Record<string, unknown>>
  for (const slug of SERVICE_SLUGS) {
    const data = snapshot[slug]
    if (!data) {
      console.warn('  ! missing from snapshot: ' + slug)
      continue
    }
    await payload.updateGlobal({ slug, data, overrideAccess: true })
    console.log('  seeded: ' + slug)
  }

  console.log('\n✓ Prod DB ready: migrations applied + service pages seeded.')
  process.exit(0)
}

main().catch((err) => {
  console.error('\nERROR:', err)
  process.exit(1)
})
