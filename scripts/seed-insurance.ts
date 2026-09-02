/**
 * seed-insurance.ts
 *
 * Seeds the InsurancePage global (slug `insurance-page`, which powers
 * /insurance-inspection-service) from the bundled default content. Additive —
 * only writes the global, never touches existing data.
 *
 * Run via:  node --import tsx scripts/seed-insurance.ts
 */

import nextEnv from '@next/env'
import { getPayload } from 'payload'

import { insuranceDefaultContent } from '../src/app/(site)/insurance-inspection-service/content'
import { serviceSeedData } from './service-seed-data'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'insurance-page',
    data: serviceSeedData(insuranceDefaultContent),
    overrideAccess: true,
  })

  console.log('\n✓ InsurancePage global seeded.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
