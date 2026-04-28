import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const s3Bucket = process.env.S3_BUCKET
const s3Region = process.env.S3_REGION

const nextConfig: NextConfig = {
  images:
    s3Bucket && s3Region
      ? {
          remotePatterns: [
            {
              hostname: `${s3Bucket}.s3.${s3Region}.amazonaws.com`,
              protocol: 'https',
            },
          ],
        }
      : undefined,
  turbopack: {
    root: dirname,
  },
  typedRoutes: true,
}

export default withPayload(nextConfig)
