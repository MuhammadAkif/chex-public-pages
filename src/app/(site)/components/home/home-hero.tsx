'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import { Button } from '@/app/(site)/components/ui/button'

type HomeHeroProps = {
  rating: string
  title: string
  description: string
  primaryLabel: string
  secondaryLabel: string
  helperText: string
  media: StaticImageData
}

export function HomeHero({
  rating,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  helperText,
  media,
}: HomeHeroProps) {
  return (
    <section className="px-4 pb-16 pt-14 sm:px-6 lg:px-10 lg:pb-24 lg:pt-20">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center">
        <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-5 py-2 shadow-[0_20px_60px_-36px_rgba(19,104,185,0.35)]">
          <span className="tracking-[0.3em] text-[#ff7a01]">★★★★★</span>
          <span className="font-ui text-[14px] font-normal leading-[21px] text-[#41546e]">
            {rating}
          </span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fff1e5] text-xs text-[#ff7a01]">
            ✦
          </span>
        </div>

        <h1 className="type-hero mt-8 max-w-5xl text-center text-[#1b2f4b]">
          {title}
        </h1>

        <p className="type-body-lg mt-8 max-w-2xl text-center text-[#41546e]">
          {description}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button href="#how-it-works" variant="outline">
            {primaryLabel}
            <span aria-hidden="true">↗</span>
          </Button>
          <Button href="#business-help">{secondaryLabel}</Button>
        </div>

        <p className="type-body-sm mt-4 text-[#41546e]">{helperText}</p>

        <div className="relative mt-16 w-full max-w-[1200px]">
          <div className="pointer-events-none absolute inset-x-20 top-0 h-14 rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.18)_0%,_rgba(19,104,185,0)_72%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white p-3 shadow-[0_60px_140px_-70px_rgba(19,104,185,0.65)] sm:p-6">
            <div className="pointer-events-none absolute inset-x-14 top-3 h-px bg-white/90 sm:inset-x-24 sm:top-5" />
            <Image
              src={media}
              alt="Chex.AI inspection vehicle preview"
              className="h-auto w-full rounded-[22px] object-cover"
              priority
            />

            <div className="pointer-events-none absolute inset-0 hidden sm:block">
              <div className="absolute left-[22%] top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/25 text-3xl text-white/95">
                ‹10
              </div>
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
                <span className="h-9 w-3 rounded-full bg-white" />
                <span className="h-9 w-3 rounded-full bg-white" />
              </div>
              <div className="absolute right-[22%] top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/25 text-3xl text-white/95">
                10›
              </div>
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-[24px] bg-[#2d2d2d]/78 px-4 py-3 text-white backdrop-blur md:inset-x-8 md:bottom-8 md:px-6">
              <div className="flex items-center gap-4 text-xs sm:text-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2d2d2d]">
                  ▶
                </div>
                <span>0:51</span>
                <div className="relative h-2 flex-1 rounded-full bg-white/30">
                  <div className="absolute inset-y-0 left-0 w-[48%] rounded-full bg-white" />
                  <div className="absolute left-[48%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white" />
                </div>
                <span className="hidden sm:inline">2:31</span>
                <div className="ml-auto hidden items-center gap-4 sm:flex">
                  <span>⏭</span>
                  <span>🔊</span>
                  <span>⚙</span>
                  <span>⤢</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button href="#how-it-works" variant="outline" size="sm" className="border-[#252525]">
              Watch video
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2d2d2d] text-[10px] text-white">
                ▶
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
