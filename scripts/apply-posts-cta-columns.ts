import nextEnv from '@next/env'
import pkg from 'pg'

const repoRoot = process.cwd()
const { loadEnvConfig } = nextEnv
loadEnvConfig(repoRoot)

const { Pool } = pkg

// Applies ONLY the additive per-post CTA columns. Uses ADD COLUMN IF NOT EXISTS
// so it is idempotent and never touches existing rows or other tables — safe to
// run against a push-managed database without going through the full migration
// chain (which would trip Payload's dev-mode data-loss guard).
const STATEMENTS = [
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cta_title" varchar`,
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cta_description" varchar`,
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cta_secondary_label" varchar`,
  `ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_cta_title" varchar`,
  `ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_cta_description" varchar`,
  `ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_cta_secondary_label" varchar`,
]

async function main() {
  const connectionString =
    process.env.DATABASE_URL ||
    'postgresql://payload:payload@localhost:5433/payload_app'
  const pool = new Pool({ connectionString })

  try {
    for (const statement of STATEMENTS) {
      await pool.query(statement)
      console.log(`- ok: ${statement}`)
    }
    console.log('\nDone. CTA columns are present.')
  } finally {
    await pool.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
