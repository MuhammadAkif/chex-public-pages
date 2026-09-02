/**
 * seed-rental.ts — seeds the RentalPage global (slug `rental-page`, powers
 * /rental-inspection-service). Additive.  Run: node --import tsx scripts/seed-rental.ts
 */

import nextEnv from '@next/env'
import { getPayload } from 'payload'

import { rentalDefaultContent } from '../src/app/(site)/rental-inspection-service/content'
import { serviceSeedData } from './service-seed-data'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'rental-page',
    data: serviceSeedData(rentalDefaultContent),
    overrideAccess: true,
  })

  console.log('\n✓ RentalPage global seeded.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
