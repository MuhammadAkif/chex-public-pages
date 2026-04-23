'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import logoChex from '@/app/(site)/assets/shared/logo-chex.png'
import heroRatingBadge from '@/app/(site)/assets/south-carolina/hero-rating-badge.png'
import { Button } from '@/app/(site)/components/ui/button'

type SouthCarolinaHeroProps = {
  rating: string
  title: string
  description: string
  primaryLabel: string
  secondaryLabel: string
  helperText: string
  stats: ReadonlyArray<{
    value: string
    label: string
  }>
  locations: ReadonlyArray<{
    label: string
    image: StaticImageData
  }>
}

function StarIcon() {
  return (
    <svg viewBox="0 0 14 14" className="h-[14px] w-[14px]" aria-hidden="true">
      <path
        d="M7 1.05l1.77 3.58 3.95.57-2.86 2.79.68 3.94L7 10.07l-3.54 1.86.68-3.94L1.28 5.2l3.95-.57L7 1.05Z"
        fill="#ff7a01"
      />
    </svg>
  )
}

function OrbitMap({ locations }: { locations: SouthCarolinaHeroProps['locations'] }) {
  const positions = [
    'left-[52%] top-[4%]',
    'left-[8%] top-[18%]',
    'left-[70%] top-[28%]',
    'left-[7%] top-[50%]',
    'left-[58%] top-[58%]',
    'left-[30%] top-[78%]',
  ]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-0 rounded-full bg-[#1368b9]/5" />
      <div className="absolute inset-[16%] rounded-full border border-[#1368b9]/15" />
      <div className="absolute inset-[28%] rounded-full border border-[#1368b9]/15" />
      <div className="absolute inset-[40%] rounded-full border border-[#1368b9]/15" />

      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_20px_70px_-36px_rgba(19,104,185,0.45)] sm:h-32 sm:w-32">
        <Image src={logoChex} alt="Chex.AI" className="h-7 w-auto sm:h-9" priority />
      </div>

      {locations.map((location, index) => (
        <div
          key={location.label}
          className={`absolute ${positions[index]} flex items-center gap-2`}
        >
          <span className="relative h-[61px] w-[61px] shrink-0">
            <span className="absolute inset-0 rounded-full bg-[#ff7a01]" />
            <span className="absolute inset-[6px] rounded-full bg-white" />
            <Image
              src={location.image}
              alt=""
              className="absolute inset-[6px] h-[49px] w-[49px] rounded-full object-cover"
            />
          </span>
          <span className="rounded-full border border-white bg-[#fff0e8] px-3 py-1 font-display text-[10px] font-medium text-[#1b2f4b]/65 shadow-sm">
            {location.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export function SouthCarolinaHero({
  rating,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  helperText,
  stats,
  locations,
}: SouthCarolinaHeroProps) {
  return (
    <section className="px-4 pb-16 pt-14 sm:px-6 lg:px-10 lg:pb-24 lg:pt-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[0.92fr_1fr] lg:gap-16">
        <OrbitMap locations={locations} />

        <div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-5 py-2 shadow-[0_20px_60px_-36px_rgba(19,104,185,0.35)]">
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </span>
            <span className="font-ui text-[14px] font-normal leading-[21px] text-[#41546e]">
              {rating}
            </span>
            <span className="relative inline-flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#fff1e5]" />
              <Image src={heroRatingBadge} alt="" className="relative h-[18px] w-[18px]" />
            </span>
          </div>

          <h1 className="type-location-hero mt-8 max-w-3xl text-[#1b2f4b]">
            {title}
          </h1>
          <p className="type-body-lg mt-6 max-w-2xl text-[#41546e]">{description}</p>

          <div className="mt-8 grid max-w-2xl gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-[32px] font-bold leading-none text-[#111]">
                  {stat.value}
                </div>
                <div className="mt-2 font-display text-[18px] font-medium leading-tight text-[#111] sm:text-[22px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#services" variant="outline" className="bg-white">
              {primaryLabel}
              <span aria-hidden="true">↗</span>
            </Button>
            <Button href="#south-carolina-demo">{secondaryLabel}</Button>
          </div>
          <p className="type-body-sm mt-4 capitalize text-[#010e2b]/80">{helperText}</p>
        </div>
      </div>
    </section>
  )
}
