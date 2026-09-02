/**
 * seed-towing-valet.ts — seeds the TowingValetPage global (slug
 * `towing-valet-page`, powers /towing-valet-inspection-service). Additive.
 * Run: node --import tsx scripts/seed-towing-valet.ts
 */

import nextEnv from '@next/env'
import { getPayload } from 'payload'

import { towingValetDefaultContent } from '../src/app/(site)/towing-valet-inspection-service/content'
import { serviceSeedData } from './service-seed-data'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'towing-valet-page',
    data: serviceSeedData(towingValetDefaultContent),
    overrideAccess: true,
  })

  console.log('\n✓ TowingValetPage global seeded.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
