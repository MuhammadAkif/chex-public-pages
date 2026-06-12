/**
 * One-off: upload the split "Commercial Fleet" solution assets to the public S3
 * bucket under the `landing-page/` prefix, then print the resulting public URLs.
 *
 * The original `solution-fleet.png` baked the device mockup and the "Fleet
 * Status" card into a single image. These two files split them so the card can
 * be rendered as a separate overlay:
 *   - Rectangle 6766.png -> landing-page/solution-fleet-device.png
 *   - Group.png          -> landing-page/solution-fleet-status.png
 *
 * Run with: node --import tsx scripts/upload-fleet-split-assets.ts
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

import nextEnv from '@next/env'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

nextEnv.loadEnvConfig(process.cwd())

const PREFIX = 'landing-page'

const UPLOADS: ReadonlyArray<{ file: string; key: string }> = [
  { file: 'Rectangle 6766.png', key: 'solution-fleet-device.png' },
  { file: 'Group.png', key: 'solution-fleet-status.png' },
  { file: 'insurance-underwriting-cl_tfAh1YEmZJ 1.png', key: 'solution-insurance-illustration.png' },
  { file: 'claim-docs.png', key: 'solution-insurance-claim.png' },
  { file: 'magnific_chex.ai-enables-rental-op_tfAEvzgmZJ 1.png', key: 'solution-rental-illustration.png' },
  { file: 'Group 48095754.png', key: 'solution-rental-health.png' },
]

const bucket = process.env.S3_BUCKET ?? ''
const region = process.env.S3_REGION ?? 'us-east-1'
const accessKeyId = process.env.S3_ACCESS_KEY_ID ?? ''
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY ?? ''
const publicBase =
  process.env.S3_PUBLIC_URL || `https://${bucket}.s3.${region}.amazonaws.com`

if (!bucket || !accessKeyId || !secretAccessKey) {
  throw new Error('Missing S3 env vars (S3_BUCKET / S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY)')
}

const client = new S3Client({ credentials: { accessKeyId, secretAccessKey }, region })

async function main() {
  const results: Record<string, string> = {}

  for (const { file, key } of UPLOADS) {
    const absolute = path.resolve(process.cwd(), file)
    if (!existsSync(absolute)) {
      console.log(`• skip ${file.padEnd(20)} (not found locally — already uploaded)`)
      continue
    }
    const buf = readFileSync(absolute)
    const objectKey = `${PREFIX}/${key}`

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: buf,
        ContentType: 'image/png',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    )

    const url = `${publicBase.replace(/\/$/, '')}/${objectKey}`
    results[file] = url
    console.log(`✓ ${file.padEnd(20)} ${(buf.length / 1024).toFixed(0).padStart(5)}KB  ${url}`)
  }

  console.log('\nJSON map:\n' + JSON.stringify(results, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
