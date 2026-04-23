'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import { SectionHeading } from '@/app/(site)/components/ui/section-heading'
import { SurfaceCard } from '@/app/(site)/components/ui/surface-card'

type HomeHowItWorksProps = {
  title: string
  description: string
  steps: ReadonlyArray<{
    title: string
    description: string
    image: StaticImageData
  }>
}

export function HomeHowItWorks({
  title,
  description,
  steps,
}: HomeHowItWorksProps) {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading title={title} description={description} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <SurfaceCard key={step.title} className="overflow-hidden p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1e5] text-sm font-semibold text-[#ff7a01]">
                  0{index + 1}
                </span>
                <span className="type-ui-label text-[#41546e]">Step</span>
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] bg-[#f4f8ff]">
                <Image
                  src={step.image}
                  alt={step.title}
                  className="h-56 w-full object-cover"
                />
              </div>

              <h3 className="mt-6 font-display text-[28px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1b2f4b]">
                {step.title}
              </h3>
              <p className="type-body-md mt-3 text-[#41546e]">{step.description}</p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  )
}
