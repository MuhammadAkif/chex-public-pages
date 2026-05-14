/**
 * clear-helper-text.ts
 *
 * Clears `hero.helperText` and `cta.helperText` on every Location document.
 * Run via:  node --import tsx scripts/clear-helper-text.ts
 *
 * Strategy:
 *  1. Try payload.update() per-doc (covers drafts + hooks).
 *  2. If Payload validation rejects (older docs missing other required fields),
 *     fall back to direct SQL against the configured Postgres DB.
 */

import nextEnv from '@next/env'
import { getPayload } from 'payload'
import pg from 'pg'

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

async function patchViaSql(client: pg.Client, docId: string) {
  await client.query(
    `UPDATE locations
       SET hero_helper_text = '',
           cta_helper_text  = ''
     WHERE id = $1`,
    [docId],
  )
}

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'locations',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
  })

  console.log(`Found ${docs.length} location document(s).`)

  const sqlFallback = new pg.Client({ connectionString: process.env.DATABASE_URL })
  let sqlConnected = false

  let updated = 0
  let sqlPatched = 0

  for (const doc of docs) {
    const slug = (doc as { slug?: string }).slug ?? doc.id
    try {
      await payload.update({
        collection: 'locations',
        id: doc.id,
        data: {
          hero: { helperText: '' },
          cta: { helperText: '' },
        } as never,
        overrideAccess: true,
      })
      updated += 1
      console.log(`✓ ${slug} — cleared via Payload`)
    } catch (err) {
      if (!sqlConnected) {
        await sqlFallback.connect()
        sqlConnected = true
      }
      await patchViaSql(sqlFallback, String(doc.id))
      sqlPatched += 1
      console.log(
        `✓ ${slug} — cleared via raw SQL (Payload validation skipped: ${(err as Error).message})`,
      )
    }
  }

  if (sqlConnected) {
    await sqlFallback.end()
  }

  console.log(`\nDone. Payload-updated: ${updated}. SQL-patched: ${sqlPatched}.`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
