import type { Metadata } from 'next'
import { Manrope, Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'

import './globals.css'

const satoshi = localFont({
  src: [
    {
      path: './fonts/satoshi-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/satoshi-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/satoshi-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '800'],
  display: 'swap',
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
      <body
        className={`${satoshi.variable} ${poppins.variable} ${manrope.variable} bg-mist font-body text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
