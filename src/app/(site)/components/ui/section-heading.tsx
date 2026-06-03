'use client'

import { RichText } from '@/app/(site)/components/shared/rich-text'

type SectionHeadingProps = {
  title: string
  description?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({
  title,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}: SectionHeadingProps) {
  const alignmentClass =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'
  const titleClass = theme === 'dark' ? 'text-white' : 'text-[#1b2f4b]'
  const descriptionClass = theme === 'dark' ? 'text-white/78' : 'text-[#41546e]'
  const linkClass =
    theme === 'dark'
      ? '[&_a]:font-semibold [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white/80'
      : '[&_a]:font-semibold [&_a]:text-[#1368b9] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#3d8fd9]'

  return (
    <div className={`flex flex-col gap-4 ${alignmentClass} ${className}`}>
      <RichText
        as="h2"
        className={`type-section-heading ${titleClass} ${linkClass}`}
        html={title}
      />
      {description ? (
        <RichText
          as="p"
          className={`type-body-lg max-w-3xl ${descriptionClass} ${linkClass}`}
          html={description}
        />
      ) : null}
    </div>
  )
}
