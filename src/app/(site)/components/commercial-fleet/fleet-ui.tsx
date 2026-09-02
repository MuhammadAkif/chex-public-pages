import Link from 'next/link'
import type { Route } from 'next'
import type { ReactNode } from 'react'

import type { CtaLink } from '@/app/(site)/commercial-fleet-inspection-service/content'

/** Small up-right arrow used on the outline "pricing" button. */
export function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.5 11.5 11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type FleetButtonProps = {
  link: CtaLink
  variant: 'primary' | 'outline'
  className?: string
  children?: ReactNode
}

/**
 * Shared CTA button. Internal hrefs from the CMS are cast to `Route` so the
 * project's `typedRoutes` setting stays satisfied without hard-coding paths.
 */
export function FleetButton({ link, variant, className = '', children }: FleetButtonProps) {
  // An empty label hides the button entirely (used to drop CTAs per page).
  if (!link.label.trim()) return null

  const base =
    'inline-flex h-10 items-center justify-center gap-2 rounded-[4px] px-6 text-[14px] font-medium transition-colors'
  // NOTE: globals.css sets an unlayered `a { color: inherit }`, which beats
  // Tailwind's layered text-color utilities on <a>. Use the important modifier
  // so the button label colour actually applies.
  const styles =
    variant === 'primary'
      ? 'bg-[#ff7a01] font-semibold !text-white hover:bg-[#e96e00]'
      : 'border border-[rgba(201,221,248,0.75)] bg-white !text-[#1b2f4b] hover:border-[#c9ddf8] hover:bg-[#f6faff]'

  return (
    <Link href={link.href as Route} className={`${base} ${styles} ${className}`}>
      {link.label}
      {children}
    </Link>
  )
}
