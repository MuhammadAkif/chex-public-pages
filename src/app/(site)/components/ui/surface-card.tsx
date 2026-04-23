'use client'

import type { ReactNode } from 'react'

type SurfaceCardProps = {
  children: ReactNode
  tone?: 'light' | 'muted' | 'accent' | 'dark'
  className?: string
}

const toneClasses: Record<NonNullable<SurfaceCardProps['tone']>, string> = {
  light: 'border border-white/70 bg-white shadow-[0_40px_120px_-60px_rgba(17,24,39,0.3)]',
  muted: 'bg-[#eef5ff] text-[#41546e]',
  accent: 'bg-[#1368b9] text-white',
  dark: 'border border-white/10 bg-white/6 text-white',
}

export function SurfaceCard({
  children,
  tone = 'light',
  className = '',
}: SurfaceCardProps) {
  return (
    <div className={`rounded-[32px] ${toneClasses[tone]} ${className}`.trim()}>{children}</div>
  )
}
