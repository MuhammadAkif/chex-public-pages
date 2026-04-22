import type { ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'
import React from 'react'

import '@payloadcms/next/css'
import './custom.scss'
import { importMap } from './admin/importMap'

type PayloadLayoutProps = {
  children: ReactNode
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'

  const { handleServerFunctions } = await import('@payloadcms/next/layouts')
  const config = await import('@payload-config')

  return handleServerFunctions({
    ...args,
    config: Promise.resolve(config.default),
    importMap,
  })
}

export default async function PayloadLayout({ children }: PayloadLayoutProps) {
  const { RootLayout } = await import('@payloadcms/next/layouts')
  const config = await import('@payload-config')

  return (
    <RootLayout
      config={Promise.resolve(config.default)}
      htmlProps={{
        suppressHydrationWarning: true,
      }}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}
