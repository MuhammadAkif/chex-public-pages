/**
 * diff-service-globals.ts  (READ-ONLY)
 *
 * Deep-compares what each service-page seed WOULD write (serviceSeedData of the
 * static content.ts) against the live global content dumped from the DB, and
 * prints every field that differs. Shows exactly where the static/seed files are
 * stale vs the CMS edits, so nothing gets clobbered on the next seed.
 *
 * Run (after dump-service-globals.ts):  node --import tsx scripts/diff-service-globals.ts
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { commercialFleetDefaultContent } from '../src/app/(site)/commercial-fleet-inspection-service/content'
import { insuranceDefaultContent } from '../src/app/(site)/insurance-inspection-service/content'
import { rentalDefaultContent } from '../src/app/(site)/rental-inspection-service/content'
import { towingValetDefaultContent } from '../src/app/(site)/towing-valet-inspection-service/content'
import { serviceSeedData } from './service-seed-data'

const dump = JSON.parse(
  readFileSync(join(process.cwd(), 'scripts', '_service-globals-dump.json'), 'utf8'),
) as Record<string, Record<string, unknown>>

const PAGES = [
  { slug: 'commercial-fleet-page', content: commercialFleetDefaultContent },
  { slug: 'insurance-page', content: insuranceDefaultContent },
  { slug: 'rental-page', content: rentalDefaultContent },
  { slug: 'towing-valet-page', content: towingValetDefaultContent },
] as const

const IGNORE = new Set(['id', '_order', 'createdAt', 'updatedAt', 'globalType', '_parent_id'])

// Compare only the fields the seed writes; recurse arrays/objects. Ignore DB
// bookkeeping keys and array-row ids.
function diff(path: string, seed: unknown, db: unknown, out: string[]) {
  if (Array.isArray(seed)) {
    const dbArr = Array.isArray(db) ? db : []
    if (seed.length !== dbArr.length) {
      out.push(`${path}: length seed=${seed.length} db=${dbArr.length}`)
    }
    const n = Math.max(seed.length, dbArr.length)
    for (let i = 0; i < n; i++) diff(`${path}[${i}]`, seed[i], dbArr[i], out)
    return
  }
  if (seed && typeof seed === 'object') {
    const s = seed as Record<string, unknown>
    const d = (db && typeof db === 'object' ? db : {}) as Record<string, unknown>
    for (const k of Object.keys(s)) {
      if (IGNORE.has(k)) continue
      diff(path ? `${path}.${k}` : k, s[k], d[k], out)
    }
    return
  }
  // primitive
  const sv = JSON.stringify(seed ?? '')
  const dv = JSON.stringify(db ?? '')
  if (sv !== dv) {
    out.push(`${path}:\n    SEED(static): ${sv}\n    DB(live):     ${dv}`)
  }
}

for (const { slug, content } of PAGES) {
  const seed = serviceSeedData(content)
  const db = dump[slug]
  const out: string[] = []
  diff('', seed, db, out)
  console.log(`\n================ ${slug} ================`)
  if (out.length === 0) console.log('  (no differences — static matches DB)')
  else out.forEach((line) => console.log('• ' + line))
}
