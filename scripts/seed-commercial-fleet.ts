/**
 * seed-commercial-fleet.ts
 *
 * Seeds the CommercialFleetPage global (slug `commercial-fleet-page`, which
 * powers /commercial-fleet-inspection-service) from the bundled default
 * content. Additive — only writes the global, never touches existing data.
 *
 * Run via:  node --import tsx scripts/seed-commercial-fleet.ts
 */

import nextEnv from '@next/env'
import { getPayload } from 'payload'

import { commercialFleetDefaultContent } from '../src/app/(site)/commercial-fleet-inspection-service/content'
import { serviceSeedData } from './service-seed-data'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'commercial-fleet-page',
    data: serviceSeedData(commercialFleetDefaultContent),
    overrideAccess: true,
  })

  console.log('\n✓ CommercialFleetPage global seeded.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
