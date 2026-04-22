import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type PageArgs = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<Record<string, string | string[]>>
}

const configPromise = Promise.resolve(config)

export const generateMetadata = ({
  params,
  searchParams,
}: PageArgs): Promise<Metadata> =>
  generatePageMetadata({
    config: configPromise,
    params,
    searchParams,
  })

export default function PayloadAdminPage({
  params,
  searchParams,
}: PageArgs) {
  return RootPage({
    config: configPromise,
    importMap,
    params,
    searchParams,
  })
}
