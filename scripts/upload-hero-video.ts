/**
 * upload-hero-video.ts
 *
 * Uploads a local video file into the Media collection (S3 when configured),
 * de-duping on SHA-256 via the `sourceHash` field. Prints the resulting media
 * id and public URL so it can be wired into the Home hero background.
 *
 * Run:  node --import tsx scripts/upload-hero-video.ts "<absolute path to .mp4>"
 */
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import nextEnv from '@next/env'
import { getPayload } from 'payload'

import type { Media } from '../src/payload-types'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const DEFAULT_PATH = 'C:\\Users\\saada\\OneDrive\\Desktop\\Chex.ai hero section video.mp4'

async function main() {
  const filePath = process.argv[2] || DEFAULT_PATH
  const buffer = await fs.readFile(filePath)
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')

  const { default: config } = await import('../payload.config.ts')
  const payload = await getPayload({ config })

  // De-dupe: reuse an existing upload with the same content hash.
  const existing = await payload.find({
    collection: 'media',
    limit: 1,
    overrideAccess: true,
    where: { sourceHash: { equals: hash } },
  })

  let doc = existing.docs[0] as Media | undefined

  if (doc) {
    console.log('• Existing media reused (same sourceHash).')
  } else {
    doc = await payload.create({
      collection: 'media',
      data: {
        alt: 'Chex.AI hero background video',
        sourceHash: hash,
        sourcePath: filePath,
      },
      filePath,
      overrideAccess: true,
      overwriteExistingFiles: true,
    })
    console.log('• Uploaded new media.')
  }

  console.log('  id  :', doc.id)
  console.log('  url :', doc.url)
  console.log('  mime:', doc.mimeType)
  process.exit(0)
}

main().catch((err) => {
  console.error('\n✗ Upload failed:', err)
  process.exit(1)
})
