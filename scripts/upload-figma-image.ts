/**
 * upload-figma-image.ts
 *
 * Uploads one or more local image files into the Media collection (S3 when
 * configured), de-duping on SHA-256 via `sourceHash`. Prints `filename -> url`
 * for each so the URLs can be wired into content.ts + the Payload globals.
 *
 * Run:  node --import tsx scripts/upload-figma-image.ts <path1> [path2] ...
 */
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import nextEnv from '@next/env'
import { getPayload } from 'payload'

import type { Media } from '../src/payload-types'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

function altFromName(filename: string) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

async function main() {
  const files = process.argv.slice(2)
  if (files.length === 0) {
    console.error('Usage: node --import tsx scripts/upload-figma-image.ts <path>...')
    process.exit(1)
  }

  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  const results: Record<string, string> = {}

  for (const file of files) {
    const buffer = await fs.readFile(file)
    const hash = crypto.createHash('sha256').update(buffer).digest('hex')
    const filename = path.basename(file)

    const existing = await payload.find({
      collection: 'media',
      limit: 1,
      overrideAccess: true,
      where: { sourceHash: { equals: hash } },
    })

    let doc = existing.docs[0] as Media | undefined
    if (!doc) {
      doc = await payload.create({
        collection: 'media',
        data: {
          alt: altFromName(filename),
          sourceHash: hash,
          sourcePath: file,
        },
        filePath: file,
        overrideAccess: true,
        overwriteExistingFiles: true,
      })
    }

    results[filename] = doc.url ?? ''
    console.log(`${filename} -> ${doc.url}`)
  }

  console.log('\nJSON:', JSON.stringify(results))
  process.exit(0)
}

main().catch((err) => {
  console.error('\n✗ Upload failed:', err)
  process.exit(1)
})
