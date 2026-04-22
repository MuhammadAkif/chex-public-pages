import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import type { ReactNode } from 'react'

import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Chex Public Pages',
  description: 'Next.js 16, React 19, Tailwind 4, and Payload 3 on PostgreSQL.',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${manrope.variable} bg-mist font-[family-name:var(--font-body)] text-ink antialiased`}>
        {children}
      </body>
    </html>
  )
}

