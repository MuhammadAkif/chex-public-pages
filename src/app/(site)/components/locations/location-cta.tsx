/* eslint-disable @next/next/no-img-element */

import { Button } from '@/app/(site)/components/ui/button'

export type LocationCtaProps = {
  sectionId: string
  title: string
  description: string
  primaryLabel: string
  secondaryLabel: string
  helperText: string
  image: string
  imageOpacityClassName: string
}

export function LocationCta({
  sectionId,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  helperText,
  image,
  imageOpacityClassName,
}: LocationCtaProps) {
  return (
    <section id={sectionId} className="bg-white px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[24px] bg-[#1b1c20] px-6 py-16 text-center text-white sm:px-12 lg:py-20">
        <img
          src={image}
          alt=""
          className={['absolute inset-0 h-full w-full object-cover', imageOpacityClassName]
            .filter(Boolean)
            .join(' ')}
        />
        <div className="absolute inset-0 bg-[#1b1c20]/75" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="font-display text-[40px] font-black leading-[1.18] text-white sm:text-[48px] lg:leading-[64px]">
            {title}
          </h2>
          <p className="type-body-lg mx-auto mt-6 max-w-4xl text-white/90">{description}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#services" variant="light">
              {primaryLabel}
              <span aria-hidden="true">↗</span>
            </Button>
            <Button href="#footer">{secondaryLabel}</Button>
          </div>

          <p className="type-body-sm mt-6 capitalize text-white/86">{helperText}</p>
        </div>
      </div>
    </section>
  )
}
