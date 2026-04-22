import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const nextConfig: NextConfig = {
  turbopack: {
    root: dirname,
  },
  typedRoutes: true,
}

export default withPayload(nextConfig)
