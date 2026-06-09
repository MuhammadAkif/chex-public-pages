/**
 * Applies ONLY the landing-page global DDL to the database in DATABASE_URL.
 *
 * Why this exists instead of `payload migrate`: on the shared Neon database most
 * migrations are tracked as "No" (the schema was synced via dev `push`), so the
 * standard runner would try to re-run older, non-idempotent migrations and fail
 * before reaching this one. This script runs the new migration's `up` SQL — and
 * nothing else — so it only ever creates the isolated, additive `landing_page*`
 * tables. The SQL is read straight from the migration file (no duplication).
 *
 * Run with: node --env-file=.env --import tsx scripts/apply-landing-migration.ts
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { Client } from 'pg'

const MIGRATION = path.resolve(
  process.cwd(),
  'src/migrations/20260609_000000_landing_page_global.ts',
)

function extractUpSql(source: string): string {
  const start = source.indexOf('sql`')
  const end = source.indexOf('`)', start)
  if (start === -1 || end === -1) {
    throw new Error('Could not locate the up() SQL template in the migration file')
  }
  return source.slice(start + 'sql`'.length, end)
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new Error('DATABASE_URL is not set')

  const ddl = extractUpSql(readFileSync(MIGRATION, 'utf8'))

  const client = new Client({ connectionString: databaseUrl })
  await client.connect()
  try {
    console.log('Applying landing_page DDL (transactional)…')
    await client.query('BEGIN')
    await client.query(ddl)
    await client.query('COMMIT')
    console.log('✓ Committed.')

    const { rows } = await client.query<{ table_name: string }>(
      `SELECT table_name FROM information_schema.tables
       WHERE table_schema = 'public' AND table_name LIKE 'landing_page%'
       ORDER BY table_name`,
    )
    console.log(`\nlanding_page* tables now present (${rows.length}):`)
    for (const r of rows) console.log('  -', r.table_name)
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {})
    throw err
  } finally {
    await client.end()
  }
}

main().catch((err) => {
  console.error('\n✗ Failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
