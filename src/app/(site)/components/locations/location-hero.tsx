import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import logoChex from '@/app/(site)/assets/shared/logo-chex.png'
import heroRatingBadge from '@/app/(site)/assets/south-carolina/hero-rating-badge.png'
import { Button } from '@/app/(site)/components/ui/button'

export type LocationHeroProps = {
  rating: string
  title: string
  description: string
  primaryLabel: string
  secondaryLabel: string
  helperText: string
  demoHref: string
  stats: ReadonlyArray<{
    value: string
    label: string
  }>
  locations: ReadonlyArray<{
    label: string
    image: StaticImageData
    featured?: boolean
  }>
  sectionClassName?: string
  layoutClassName: string
  ratingContainerClassName?: string
  titleClassName: string
  descriptionClassName: string
  orbit: {
    mapClassName: string
    backgroundClassName: string
    ringClassNames: ReadonlyArray<string>
    centerClassName: string
    logoClassName: string
    positions: ReadonlyArray<string>
  }
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

function OrbitMap({
  locations,
  orbit,
}: Pick<LocationHeroProps, 'locations' | 'orbit'>) {
  return (
    <div
      className={['relative mx-auto aspect-square w-full', orbit.mapClassName]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={['absolute inset-0 rounded-full', orbit.backgroundClassName]
          .filter(Boolean)
          .join(' ')}
      />
      {orbit.ringClassNames.map((ringClassName) => (
        <div
          key={ringClassName}
          className={['absolute rounded-full', ringClassName].filter(Boolean).join(' ')}
        />
      ))}

      <div
        className={[
          'absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-32 sm:w-32',
          orbit.centerClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Image src={logoChex} alt="Chex.AI" className={orbit.logoClassName} priority />
      </div>

      {locations.map((location, index) => {
        const position = orbit.positions[index] ?? orbit.positions[orbit.positions.length - 1] ?? ''
        const isFeatured = Boolean(location.featured)

        return (
          <div key={location.label} className={['absolute flex items-center gap-2', position].join(' ')}>
            <span className={['relative shrink-0', isFeatured ? 'h-[82px] w-[82px]' : 'h-[61px] w-[61px]'].join(' ')}>
              <span className="absolute inset-0 rounded-full bg-[#ff7a01]" />
              <span className="absolute inset-[6px] rounded-full bg-white" />
              <Image
                src={location.image}
                alt=""
                className={[
                  'absolute rounded-full object-cover',
                  isFeatured
                    ? 'inset-[8px] h-[66px] w-[66px]'
                    : 'inset-[6px] h-[49px] w-[49px]',
                ].join(' ')}
              />
            </span>
            <span
              className={[
                'rounded-full border border-white bg-[#fff0e8] font-display text-[#1b2f4b]/65 shadow-sm',
                isFeatured ? 'px-4 py-1.5 text-[14px] font-bold' : 'px-3 py-1 text-[10px] font-medium',
              ].join(' ')}
            >
              {location.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function LocationHero({
  rating,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  helperText,
  demoHref,
  stats,
  locations,
  sectionClassName = '',
  layoutClassName,
  ratingContainerClassName = '',
  titleClassName,
  descriptionClassName,
  orbit,
}: LocationHeroProps) {
  return (
    <section
      className={['px-4 pb-16 pt-14 sm:px-6 lg:px-10 lg:pb-24 lg:pt-20', sectionClassName]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'mx-auto grid max-w-[1240px] items-center gap-10',
          layoutClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <OrbitMap locations={locations} orbit={orbit} />

        <div>
          <div
            className={[
              'inline-flex items-center gap-3',
              ratingContainerClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
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

          <h1
            className={['mt-8 text-[#1b2f4b]', titleClassName].filter(Boolean).join(' ')}
          >
            {title}
          </h1>
          <p
            className={[
              'type-body-lg mt-6 text-[#41546e]',
              descriptionClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {description}
          </p>

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
            <Button href={demoHref}>{secondaryLabel}</Button>
          </div>
          <p className="type-body-sm mt-4 capitalize text-[#010e2b]/80">{helperText}</p>
        </div>
      </div>
    </section>
  )
}
