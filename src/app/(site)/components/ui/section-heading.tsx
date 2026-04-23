'use client'

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

  return (
    <div className={`flex flex-col gap-4 ${alignmentClass} ${className}`}>
      <h2
        className={`type-section-heading ${titleClass}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`type-body-lg max-w-3xl ${descriptionClass}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
