'use client'
/* eslint-disable @next/next/no-img-element */

import { Button } from '@/app/(site)/components/ui/button'

type SouthCarolinaServicesProps = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  items: ReadonlyArray<{
    title: string
    description: string
    image: string
    reverse?: boolean
  }>
}

export function SouthCarolinaServices({
  eyebrow,
  title,
  description,
  ctaLabel,
  items,
}: SouthCarolinaServicesProps) {
  return (
    <section id="services" className="relative bg-[#1b1c20] px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute left-[8%] top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.18)_0%,_rgba(255,122,1,0)_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[36%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.2)_0%,_rgba(255,122,1,0)_72%)] blur-3xl" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-5xl text-center">
          <p className="type-ui-label text-white">{eyebrow}</p>
          <h2 className="mt-6 font-display text-[44px] font-bold leading-[1.12] tracking-[-2.4px] text-white sm:text-[56px] lg:text-[64px] lg:leading-[70.4px] lg:tracking-[-3.2px]">
            {title}
          </h2>
          <p className="type-location-body-relaxed mx-auto mt-6 max-w-5xl text-white/82">
            {description}
          </p>
        </div>

        <div className="mt-16 space-y-9">
          {items.map((item) => (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_50%_112%,#ff7a01_0%,#994901_22%,#000_54%)] p-6 shadow-[0_34px_100px_-72px_rgba(255,122,1,0.75)] sm:p-10 lg:p-[60px]"
            >
              <div
                className={`grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center ${
                  item.reverse ? 'lg:grid-cols-[1fr_0.9fr]' : ''
                }`}
              >
                <div className={item.reverse ? 'lg:order-2' : ''}>
                  <h3 className="type-location-card-title max-w-xl text-white">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-xl font-display text-[16px] leading-8 tracking-[-0.16px] text-white/84">
                    {item.description}
                  </p>
                  <div className="mt-9">
                    <Button href="#south-carolina-demo">{'Read more'}</Button>
                  </div>
                </div>

                <div className={item.reverse ? 'lg:order-1' : ''}>
                  <div className="overflow-hidden rounded-[28px] border border-[#f0f6ff] bg-[#f0f6ff] p-5">
                    <div className="overflow-hidden rounded-[24px] border border-[#2563eb]/30 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-[515/262] w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="#south-carolina-demo" className="min-w-[260px]">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
