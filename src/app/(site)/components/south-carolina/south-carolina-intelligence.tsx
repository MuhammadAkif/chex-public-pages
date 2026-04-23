'use client'

import { Button } from '@/app/(site)/components/ui/button'

type SouthCarolinaIntelligenceProps = {
  title: string
  description: string
  buttonLabel: string
  items: ReadonlyArray<{
    number: string
    title: string
    description: string
  }>
}

export function SouthCarolinaIntelligence({
  title,
  description,
  buttonLabel,
  items,
}: SouthCarolinaIntelligenceProps) {
  return (
    <section className="relative bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="type-location-heading text-[#1b2f4b]">{title}</h2>
          <p className="type-location-body mt-6 text-[#41546e]">{description}</p>
        </div>

        <div className="mt-14 grid gap-x-20 gap-y-12 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.number}>
              <div className="font-display text-[40px] font-bold leading-none text-[#ff7a01]">
                {item.number}
              </div>
              <h3 className="mt-5 font-display text-[28px] font-bold capitalize leading-normal text-[#41546e] sm:text-[32px]">
                {item.title}
              </h3>
              <p className="type-location-body mt-5 max-w-xl text-[#41546e]">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="#south-carolina-demo" className="min-w-[305px]">
            {buttonLabel}
          </Button>
        </div>

        <div className="mt-16 overflow-hidden rounded-[38px] border border-[#2563eb]/30 bg-[#f0f6ff] p-5 shadow-[0_22px_64px_0_rgba(30,27,75,0.08)]">
          <div className="grid min-h-[22rem] place-items-center rounded-[30px] bg-[radial-gradient(circle_at_34%_26%,rgba(19,104,185,0.9)_0%,rgba(19,104,185,0.18)_24%,rgba(255,122,1,0.35)_58%,rgba(27,28,32,0.96)_100%)] p-8 text-center text-white">
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#ff7a01] shadow-[0_20px_60px_-30px_rgba(255,122,1,0.9)]">
                ▶
              </div>
              <p className="type-ui-label mt-6 text-white/78">Automotive Intelligence Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
