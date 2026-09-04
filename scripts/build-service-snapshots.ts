/**
 * build-service-snapshots.ts  (reads DB, writes a repo file — no DB writes)
 *
 * Captures the CURRENT content of the four service-page globals from the DB that
 * `DATABASE_URL` points at, normalizes it through the same mapper + serviceSeedData
 * the app already uses, and writes scripts/service-page-content.json.
 *
 * That snapshot becomes the source the prod seed writes from, so deploying to a
 * fresh DB reproduces exactly what the SEO team has in the CMS today — instead of
 * the stale static content.ts. Re-run this before a prod deploy to refresh it.
 *
 * Run:  node --import tsx scripts/build-service-snapshots.ts
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { commercialFleetDefaultContent } from '../src/app/(site)/commercial-fleet-inspection-service/content'
import { insuranceDefaultContent } from '../src/app/(site)/insurance-inspection-service/content'
import { rentalDefaultContent } from '../src/app/(site)/rental-inspection-service/content'
import { towingValetDefaultContent } from '../src/app/(site)/towing-valet-inspection-service/content'
import {
  mapServicePageDoc,
  type Loose,
} from '../src/app/(site)/components/commercial-fleet/map-service-content'
import { serviceSeedData } from './service-seed-data'

const dump = JSON.parse(
  readFileSync(join(process.cwd(), 'scripts', '_service-globals-dump.json'), 'utf8'),
) as Record<string, Loose>

const PAGES = [
  { slug: 'commercial-fleet-page', fallback: commercialFleetDefaultContent },
  { slug: 'insurance-page', fallback: insuranceDefaultContent },
  { slug: 'rental-page', fallback: rentalDefaultContent },
  { slug: 'towing-valet-page', fallback: towingValetDefaultContent },
] as const

const snapshot: Record<string, unknown> = {}
for (const { slug, fallback } of PAGES) {
  // DB doc -> render model (missing fields fall back) -> clean seed payload.
  const content = mapServicePageDoc(dump[slug] ?? {}, fallback)
  snapshot[slug] = serviceSeedData(content)
  console.log(`✓ ${slug}`)
}

const target = join(process.cwd(), 'scripts', 'service-page-content.json')
writeFileSync(target, JSON.stringify(snapshot, null, 2), 'utf8')
console.log(`\nWrote ${target}`)
