import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'

import { Locations } from './src/collections/Locations.ts'
import { Posts } from './src/collections/Posts.ts'
import { Media } from './src/collections/Media.ts'
import { Users } from './src/collections/Users.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const databaseURL =
  process.env.DATABASE_URL || 'postgresql://payload:payload@localhost:5433/payload_app'
const s3Bucket = process.env.S3_BUCKET || ''
const s3Region = process.env.S3_REGION || ''
const s3Enabled = Boolean(
  s3Bucket &&
    s3Region &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
)
const s3PublicBaseURL =
  process.env.S3_PUBLIC_URL || (s3Bucket && s3Region
    ? `https://${s3Bucket}.s3.${s3Region}.amazonaws.com`
    : '')

const getS3PublicURL = (filename: string) =>
  `${s3PublicBaseURL.replace(/\/$/, '')}/${encodeURIComponent(filename)}`

export default buildConfig({
  admin: {
    importMap: {
      baseDir: dirname,
    },
    user: Users.slug,
  },
  collections: [Users, Posts, Media, Locations],
  cors: [serverURL],
  csrf: [serverURL],
  db: postgresAdapter({
    idType: 'uuid',
    migrationDir: path.resolve(dirname, 'src/migrations'),
    pool: {
      connectionString: databaseURL,
    },
    push: process.env.NODE_ENV === 'development',
  }),
  editor: lexicalEditor(),
  plugins: [
    s3Storage({
      bucket: s3Bucket,
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) => getS3PublicURL(filename),
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: s3Region,
      },
      enabled: s3Enabled,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
