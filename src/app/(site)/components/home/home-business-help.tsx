'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import { Button } from '@/app/(site)/components/ui/button'

type HomeBusinessHelpProps = {
  title: string
  description: string
  buttonLabel: string
  image: StaticImageData
}

export function HomeBusinessHelp({
  title,
  description,
  buttonLabel,
  image,
}: HomeBusinessHelpProps) {
  return (
    <section id="business-help" className="px-4 pb-16 pt-20 sm:px-6 lg:px-10 lg:pb-24 lg:pt-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative">
            <div className="pointer-events-none absolute -left-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.3)_0%,_rgba(255,122,1,0)_72%)] blur-2xl" />
            <h2 className="type-section-heading max-w-md text-white">
              {title}
            </h2>
            <p className="type-body-lg mt-8 max-w-lg text-white/80">
              {description}
            </p>
            <div className="mt-10">
              <Button href="#footer">{buttonLabel}</Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-6 top-0 h-full rounded-[18px] bg-[#1368b9]" />
            <div className="relative translate-y-6 overflow-hidden rounded-[16px] border border-white/10 bg-white/5 p-4 shadow-[0_40px_120px_-60px_rgba(19,104,185,0.6)] backdrop-blur">
              <Image
                src={image}
                alt="Chex analytics dashboard"
                className="h-auto w-full rounded-[12px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
