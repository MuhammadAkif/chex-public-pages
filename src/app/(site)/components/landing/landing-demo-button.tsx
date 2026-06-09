'use client'

import { useRegisterModal } from '@/app/(site)/components/home/register-modal'

type LandingDemoButtonProps = {
  children?: React.ReactNode
  className?: string
  tone?: 'accent' | 'light'
}

const toneClasses: Record<NonNullable<LandingDemoButtonProps['tone']>, string> = {
  accent: 'bg-[#ff7a01] text-white hover:bg-[#eb7200]',
  light: 'bg-white text-[#1b2f4b] hover:bg-[#f4f7fb]',
}

/**
 * The design's recurring "Request a demo" CTA. Opens the shared registration
 * modal (RegisterModalProvider) hosted by the site shell.
 */
export function LandingDemoButton({
  children = 'Request a demo',
  className = '',
  tone = 'accent',
}: LandingDemoButtonProps) {
  const { openModal } = useRegisterModal()

  return (
    <button
      type="button"
      onClick={openModal}
      className={[
        'type-button inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-[4px] px-6',
        'shadow-[0_20px_50px_-24px_rgba(255,122,1,0.85)] transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2',
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
}
