/**
 * patch-comparison.ts
 *
 * Patches the `comparison` field on every Location document.
 * Runs via:  node --import tsx scripts/patch-comparison.ts
 *
 * Strategy:
 *  1. Try payload.update() — works for fully-seeded locations.
 *  2. If Payload validation rejects (older locations missing other required
 *     fields), fall back to direct SQL against the Neon/Postgres DB.
 */

import nextEnv from '@next/env'
import { getPayload } from 'payload'
import pg from 'pg'

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

// ─── Comparison content ───────────────────────────────────────────────────────

const COMPARISON_TITLE = 'Uber Inspection Online: Your Driveway Is the New Shop'
const COMPARISON_DESCRIPTION =
  'The term "Uber online inspection" refers to completing your inspection through a digital platform rather than walking into a shop with a paper form. Chex.ai was built specifically for this — same-day results, correct platform forms, and automatic submission to Uber and Lyft.'
const WINNER_LABEL = 'Best Choice'
const FOOTER_TEXT = '✓ Faster · Easier · More Reliable'
const CTA_LABEL = 'Book Your Inspection'
const CTA_HREF = 'https://chex.ai/book'

const COLUMN_HEADERS = [
  { label: 'Feature' },
  { label: 'Traditional Shop' },
  { label: 'Chex.ai' },
]

function buildRows(stateTitle: string) {
  return [
    { featureLabel: 'Appointment needed',         traditionalValue: 'Usually yes',          chexValue: 'Instant' },
    { featureLabel: 'Uber inspection form',        traditionalValue: 'Paper — easy to lose', chexValue: 'Digital — stored in app' },
    { featureLabel: 'Report submitted to Uber',    traditionalValue: 'You do it yourself',   chexValue: 'Handled for you' },
    { featureLabel: 'Turnaround time',             traditionalValue: '1–3 days',             chexValue: 'Same Day' },
    { featureLabel: 'Works for Lyft too',          traditionalValue: 'Sometimes',            chexValue: 'Always' },
    { featureLabel: `Available statewide in ${stateTitle}`, traditionalValue: 'Limited',    chexValue: 'Yes' },
  ]
}

// ─── Raw SQL patch (for locations that fail Payload validation) ───────────────

async function patchViaSql(client: pg.Client, docId: string, stateTitle: string) {
  const rows = buildRows(stateTitle)

  // 1. Update scalar columns on the main locations table
  await client.query(
    `UPDATE locations SET
       comparison_title        = $1,
       comparison_description  = $2,
       comparison_winner_label = $3,
       comparison_footer_text  = $4,
       comparison_cta_label    = $5,
       comparison_cta_href     = $6,
       updated_at              = NOW()
     WHERE id = $7`,
    [COMPARISON_TITLE, COMPARISON_DESCRIPTION, WINNER_LABEL, FOOTER_TEXT, CTA_LABEL, CTA_HREF, docId],
  )

  // 2. Replace column headers (main table)
  await client.query(`DELETE FROM locations_comparison_column_headers WHERE _parent_id = $1`, [docId])
  for (let i = 0; i < COLUMN_HEADERS.length; i++) {
    await client.query(
      `INSERT INTO locations_comparison_column_headers (_order, _parent_id, id, label)
       VALUES ($1, $2, gen_random_uuid(), $3)`,
      [i + 1, docId, COLUMN_HEADERS[i]!.label],
    )
  }

  // 3. Replace rows (main table)
  await client.query(`DELETE FROM locations_comparison_rows WHERE _parent_id = $1`, [docId])
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!
    await client.query(
      `INSERT INTO locations_comparison_rows (_order, _parent_id, id, feature_label, traditional_value, chex_value)
       VALUES ($1, $2, gen_random_uuid(), $3, $4, $5)`,
      [i + 1, docId, row.featureLabel, row.traditionalValue, row.chexValue],
    )
  }

  // 4. Also patch the latest published version snapshot so CMS admin stays consistent
  const versionResult = await client.query(
    `SELECT id FROM _locations_v WHERE parent_id = $1 AND version__status = 'published' ORDER BY updated_at DESC LIMIT 1`,
    [docId],
  )
  const versionId = versionResult.rows[0]?.id as string | undefined
  if (versionId) {
    await client.query(`DELETE FROM _locations_v_version_comparison_column_headers WHERE _parent_id = $1`, [versionId])
    for (let i = 0; i < COLUMN_HEADERS.length; i++) {
      await client.query(
        `INSERT INTO _locations_v_version_comparison_column_headers (_order, _parent_id, id, label, _uuid)
         VALUES ($1, $2, gen_random_uuid(), $3, gen_random_uuid())`,
        [i + 1, versionId, COLUMN_HEADERS[i]!.label],
      )
    }
    await client.query(`DELETE FROM _locations_v_version_comparison_rows WHERE _parent_id = $1`, [versionId])
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]!
      await client.query(
        `INSERT INTO _locations_v_version_comparison_rows (_order, _parent_id, id, feature_label, traditional_value, chex_value, _uuid)
         VALUES ($1, $2, gen_random_uuid(), $3, $4, $5, gen_random_uuid())`,
        [i + 1, versionId, row.featureLabel, row.traditionalValue, row.chexValue],
      )
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  const { docs, totalDocs } = await payload.find({
    collection: 'locations',
    limit: 200,
    overrideAccess: true,
    pagination: false,
  })

  console.log(`Found ${totalDocs} location(s). Patching comparison data…\n`)

  // Pre-connect the SQL client (reused across all SQL fallbacks)
  const databaseUrl =
    process.env.DATABASE_URL ??
    'postgresql://payload:payload@localhost:5433/payload_app'
  const sqlClient = new pg.Client({ connectionString: databaseUrl })
  await sqlClient.connect()

  let patched = 0
  let failed = 0

  for (const doc of docs) {
    const stateTitle = doc.title ?? doc.slug ?? 'this state'

    // ── Try Payload API first ─────────────────────────────────────────────────
    try {
      await payload.update({
        collection: 'locations',
        id: doc.id,
        overrideAccess: true,
        data: {
          comparison: {
            title: COMPARISON_TITLE,
            description: COMPARISON_DESCRIPTION,
            winnerLabel: WINNER_LABEL,
            footerText: FOOTER_TEXT,
            columnHeaders: COLUMN_HEADERS,
            rows: buildRows(stateTitle),
            ctaLabel: CTA_LABEL,
            ctaHref: CTA_HREF,
          },
        },
      })
      console.log(`  ✅  ${stateTitle} (${doc.slug}) — patched via Payload`)
      patched += 1
      continue
    } catch {
      // Fall through to SQL
    }

    // ── SQL fallback ──────────────────────────────────────────────────────────
    try {
      await patchViaSql(sqlClient, doc.id, stateTitle)
      console.log(`  ✅  ${stateTitle} (${doc.slug}) — patched via SQL`)
      patched += 1
    } catch (sqlErr) {
      console.error(`  ❌  ${stateTitle} (${doc.slug}) — FAILED:`, sqlErr)
      failed += 1
    }
  }

  await sqlClient.end()

  console.log(`\nDone. ${patched} patched, ${failed} failed.`)
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
