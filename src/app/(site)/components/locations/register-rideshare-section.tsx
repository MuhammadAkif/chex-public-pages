'use client'

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react'

import { Button } from '@/app/(site)/components/ui/button'

export type RegisterRideShareSectionProps = {
  eyebrow: string
  title: string
  ctaLabel: string
  ctaHref: string
  initialImage?: string
  initialImageAlt?: string
  steps: ReadonlyArray<{
    step: string
    title: string
    description: string
    icon: string
    iconAlt: string
    image: string
    imageAlt: string
  }>
}

export function RegisterRideShareSection({
  eyebrow,
  title,
  ctaLabel,
  ctaHref,
  initialImage,
  initialImageAlt,
  steps,
}: RegisterRideShareSectionProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const activeStep = steps[activeStepIndex] ?? steps[0]
  const activeImage = activeStep?.image || initialImage
  const activeImageAlt = activeStep?.imageAlt || initialImageAlt || title

  const timelineBounds = useMemo(() => {
    if (steps.length <= 1) {
      return 'hidden'
    }

    return 'absolute left-[34px] top-[70px] bottom-[92px] hidden border-l-2 border-dashed border-[#aec0ce] sm:block'
  }, [steps.length])

  if (!steps.length) {
    return null
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
        {activeImage ? (
          <div className="flex justify-center lg:justify-start">
            <img
              src={activeImage}
              alt={activeImageAlt}
              className="w-full max-w-[320px] object-contain sm:max-w-[380px] lg:max-w-[430px]"
            />
          </div>
        ) : null}

        <div>
          <p className="inline-flex rounded-full bg-[#f68b1f] px-3 py-1 font-ui text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
            {eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[30px] font-bold leading-[1.16] text-[#1b2f4b] sm:text-[38px] lg:text-[44px]">
            {title}
          </h2>

          <div className="relative mt-8">
            <div aria-hidden="true" className={timelineBounds} />

            <div className="space-y-3">
              {steps.map((item, index) => (
                <button
                  key={`${item.step}-${item.title}`}
                  type="button"
                  onFocus={() => setActiveStepIndex(index)}
                  onMouseEnter={() => setActiveStepIndex(index)}
                  onClick={() => setActiveStepIndex(index)}
                  className={[
                    'group grid w-full grid-cols-[56px_1fr] gap-5 rounded-[8px] p-3 text-left transition-colors sm:grid-cols-[68px_1fr] sm:gap-7',
                    index === activeStepIndex ? 'bg-[#1468ba]/10' : 'hover:bg-[#1468ba]/8',
                  ].join(' ')}
                >
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#1468ba] shadow-[0_12px_30px_-18px_rgba(20,104,186,0.95)] sm:h-[60px] sm:w-[60px]">
                    <img
                      src={item.icon}
                      alt={item.iconAlt}
                      className="h-8 w-8 object-contain brightness-0 invert sm:h-9 sm:w-9"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-ui text-[13px] font-bold leading-5 text-[#7d8da3]">
                      {item.step}
                    </span>
                    <span className="mt-1 block font-display text-[22px] font-bold leading-[1.2] text-[#1b2f4b] sm:text-[24px]">
                      {item.title}
                    </span>
                    <span className="mt-2 block font-ui text-[15px] leading-7 text-[#41546e] sm:text-[17px]">
                      {item.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-center sm:justify-start sm:pl-[100px]">
              <Button href={ctaHref} className="min-h-12 w-full max-w-[420px] rounded-[10px] text-[16px] sm:text-[18px]">
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
