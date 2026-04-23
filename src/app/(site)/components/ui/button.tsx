'use client'

import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'accent' | 'outline' | 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  accent:
    'bg-[#ff7a01] text-white shadow-[0_20px_50px_-24px_rgba(255,122,1,0.85)] hover:bg-[#eb7200]',
  outline:
    'border border-[#d7e3f4] bg-white text-[#1b2f4b] hover:border-[#1368b9] hover:text-[#1368b9]',
  dark: 'bg-[#2d2d2d] text-white hover:bg-[#1f1f1f]',
  light: 'bg-white text-[#1b2f4b] hover:bg-[#f4f7fb]',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'min-h-10 px-4',
  md: 'min-h-10 px-6',
  lg: 'min-h-12 px-6',
}

export function Button({
  children,
  href,
  variant = 'accent',
  size = 'md',
  className = '',
  fullWidth = false,
  type = 'button',
}: ButtonProps) {
  const classes = [
    'type-button inline-flex items-center justify-center gap-2 rounded-[4px] transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1368b9] focus-visible:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  )
}
