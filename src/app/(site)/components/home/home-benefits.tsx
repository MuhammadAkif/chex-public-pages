'use client'

import { SurfaceCard } from '@/app/(site)/components/ui/surface-card'

type HomeBenefitsProps = {
  title: string
  items: ReadonlyArray<{
    title: string
    description: string
    tone: string
    icon: string
  }>
}

function BenefitIcon({ icon, inverted }: { icon: string; inverted: boolean }) {
  const stroke = inverted ? '#1368b9' : '#ffffff'

  if (icon === 'cost') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke={stroke} strokeWidth="1.8">
        <path d="M4 19h16M6 16V5m6 11V8m6 8v-5" />
        <circle cx="7" cy="4.5" r="2.5" />
        <path d="M15 4h5m-2.5-2.5v5" />
      </svg>
    )
  }

  if (icon === 'target') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke={stroke} strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M20 4l-3 3M17 4h3v3" />
      </svg>
    )
  }

  if (icon === 'people') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke={stroke} strokeWidth="1.8">
        <path d="M6 18c0-2 2.5-3.5 6-3.5s6 1.5 6 3.5" />
        <circle cx="12" cy="8" r="3" />
        <path d="M4.5 15c.4-1.1 1.4-2 2.8-2.5M19.5 15c-.4-1.1-1.4-2-2.8-2.5" />
      </svg>
    )
  }

  if (icon === 'shield') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke={stroke} strokeWidth="1.8">
        <path d="M12 3l7 3v5c0 4.4-2.6 8.4-7 10-4.4-1.6-7-5.6-7-10V6l7-3Z" />
        <path d="m9.5 12 1.7 1.7L14.8 10" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke={stroke} strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="M8 12h8M12 8v8" />
      <path d="m16 8 4-4" />
    </svg>
  )
}

export function HomeBenefits({ title, items }: HomeBenefitsProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="type-section-heading text-[#1b2f4b]">
          {title}
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {items.map((item, index) => {
            const accent = item.tone === 'accent'

            return (
              <SurfaceCard
                key={item.title}
                tone={accent ? 'accent' : 'muted'}
                className={[
                  'p-8',
                  index === 0 ? 'lg:col-span-3' : '',
                  index === 3 ? 'lg:col-span-3' : '',
                  index === 4 ? 'lg:col-span-3' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-[8px] ${
                    accent ? 'bg-white text-[#1368b9]' : 'bg-[#1368b9] text-white'
                  }`}
                >
                  <BenefitIcon icon={item.icon} inverted={accent} />
                </div>

                <h3
                  className={`mt-7 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] ${
                    accent ? 'text-white' : 'text-[#41546e]'
                  }`}
                >
                  {item.title}
                </h3>
                <p className={`type-body-lg mt-4 max-w-2xl ${accent ? 'text-[#eef5ff]' : 'text-[#41546e]'}`}>
                  {item.description}
                </p>
              </SurfaceCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
