/**
 * One-off: upload the landing-page image assets extracted from Figma
 * (stored locally in .figma-assets/) to the public S3 bucket under the
 * `landing-page/` prefix, then print the resulting public URLs.
 *
 * Run with: node --env-file=.env --import tsx scripts/upload-landing-assets.ts
 */
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const ASSET_DIR = path.resolve(process.cwd(), '.figma-assets')
const PREFIX = 'landing-page'

const bucket = process.env.S3_BUCKET ?? ''
const region = process.env.S3_REGION ?? 'us-east-1'
const accessKeyId = process.env.S3_ACCESS_KEY_ID ?? ''
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY ?? ''
const publicBase =
  process.env.S3_PUBLIC_URL || `https://${bucket}.s3.${region}.amazonaws.com`

if (!bucket || !accessKeyId || !secretAccessKey) {
  throw new Error('Missing S3 env vars (S3_BUCKET / S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY)')
}

const contentTypeFor = (buf: Buffer): string => {
  if (buf.length >= 8 && buf.toString('hex', 0, 8) === '89504e470d0a1a0a') return 'image/png'
  if (buf.length >= 3 && buf.toString('hex', 0, 3) === 'ffd8ff') return 'image/jpeg'
  if (buf.toString('utf8', 0, 5) === '<?xml' || buf.toString('utf8', 0, 4) === '<svg') {
    return 'image/svg+xml'
  }
  return 'application/octet-stream'
}

const client = new S3Client({
  credentials: { accessKeyId, secretAccessKey },
  region,
})

async function main() {
  const files = readdirSync(ASSET_DIR).filter(
    (f) => !f.startsWith('_') && /\.(png|jpe?g|svg)$/i.test(f),
  )

  const results: Record<string, string> = {}

  for (const file of files) {
    const buf = readFileSync(path.join(ASSET_DIR, file))
    const contentType = contentTypeFor(buf)
    const key = `${PREFIX}/${file}`

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buf,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    )

    const url = `${publicBase.replace(/\/$/, '')}/${key}`
    results[file] = url
    const hash = createHash('sha256').update(buf).digest('hex').slice(0, 8)
    console.log(`✓ ${file.padEnd(24)} ${(buf.length / 1024).toFixed(0).padStart(5)}KB  ${contentType.padEnd(10)} ${hash}  ${url}`)
  }

  console.log('\nJSON map:\n' + JSON.stringify(results, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
