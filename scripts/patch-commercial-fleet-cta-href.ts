/**
 * patch-commercial-fleet-cta-href.ts
 *
 * Surgical patch: sets ONLY the final CTA's primary button href on the
 * `commercial-fleet-page` global to /dsp-fleet-pricing. Reads the current
 * global and writes back the `cta` group with just `primaryCta.href` changed,
 * so every other CMS-edited field is preserved (unlike the full seed script).
 *
 * Run via:  node --import tsx scripts/patch-commercial-fleet-cta-href.ts
 */

import nextEnv from '@next/env'
import { getPayload } from 'payload'

const TARGET_HREF = '/dsp-fleet-pricing'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

async function main() {
  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  // depth 0 -> relationships come back as plain IDs, safe to write straight back.
  const current = (await payload.findGlobal({
    slug: 'commercial-fleet-page',
    depth: 0,
    overrideAccess: true,
  })) as { cta?: Record<string, unknown> }

  const cta = (current.cta ?? {}) as Record<string, unknown>
  const primaryCta = (cta.primaryCta ?? {}) as Record<string, unknown>
  const before = primaryCta.href

  await payload.updateGlobal({
    slug: 'commercial-fleet-page',
    data: {
      cta: {
        ...cta,
        primaryCta: { ...primaryCta, href: TARGET_HREF },
      },
    },
    overrideAccess: true,
  })

  console.log(`\n✓ commercial-fleet-page cta.primaryCta.href: ${String(before)} -> ${TARGET_HREF}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
