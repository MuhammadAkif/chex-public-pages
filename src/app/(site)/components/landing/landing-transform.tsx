'use client'

import { useState } from 'react'

import { SiteImage } from '@/app/(site)/components/shared/site-image'

type Feature = { title: string; description: string }

type LandingTransformProps = {
  title: string
  description: string
  image: string
  features: ReadonlyArray<Feature>
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  )
}

// Per-feature icons exported from the Figma Transform section (in feature
// order), replacing the previous numbered circles. `box` matches each icon's
// Figma display size so stroke weights read the same (the scan glyph is a
// filled 32px icon, so it must not be up-scaled to 36px).
const featureIcons = [
  { src: '/transform-icons/icon-1-report.svg', box: 'h-9 w-9' },
  { src: '/transform-icons/icon-2-fraud.svg', box: 'h-8 w-8' },
  { src: '/transform-icons/icon-3-analyse.svg', box: 'h-9 w-9' },
  { src: '/transform-icons/icon-4-claim.svg', box: 'h-9 w-9' },
  { src: '/transform-icons/icon-5-scan.svg', box: 'h-8 w-8' },
]

export function LandingTransform({ title, description, image, features }: LandingTransformProps) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-[840px]">
          <h2 className="font-display text-[32px] font-bold leading-[1.1] tracking-[-1px] text-[#1b2f4b] sm:text-[44px]">
            {title}
          </h2>
          <p className="mt-5 max-w-[760px] font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px]">
            {description}
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_0.78fr] lg:gap-16">
          <ul className="flex flex-col gap-3">
            {features.map((feature, index) => {
              const open = openIndex === index
              return (
                <li
                  key={feature.title}
                  className={`rounded-[14px] border transition-colors ${
                    open
                      ? 'border-transparent bg-white shadow-[0_24px_60px_-34px_rgba(27,47,75,0.5)]'
                      : 'border-b border-x-0 border-t-0 border-[#e7edf5]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-1 py-4 text-left sm:px-5"
                  >
                    <span className="flex items-center gap-4">
                      {featureIcons[index] ? (
                        // Rendered as a CSS mask so the icon recolours with the
                        // open/closed state (orange when open, ink when closed),
                        // matching the Figma "Transform" accordion.
                        <span
                          aria-hidden
                          className={`${featureIcons[index].box} shrink-0`}
                          style={{
                            backgroundColor: open ? '#ff7a01' : '#1b2f4b',
                            WebkitMaskImage: `url(${featureIcons[index].src})`,
                            maskImage: `url(${featureIcons[index].src})`,
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            maskPosition: 'center',
                            WebkitMaskSize: 'contain',
                            maskSize: 'contain',
                          }}
                        />
                      ) : (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1e6] text-[15px] font-semibold text-[#ff7a01]">
                          {index + 1}
                        </span>
                      )}
                      <span
                        className={`font-display text-[18px] font-bold capitalize leading-snug sm:text-[22px] ${
                          open ? 'text-[#ff7a01]' : 'text-[#1b2f4b]'
                        }`}
                      >
                        {feature.title}
                      </span>
                    </span>
                    <span className={open ? 'text-[#ff7a01]' : 'text-[#9babc2]'}>
                      <Chevron open={open} />
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden px-1 transition-[grid-template-rows] duration-300 sm:px-5 ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="pb-5 pl-[52px] font-ui text-[15px] leading-7 text-[#41546e]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="relative mx-auto w-full max-w-[420px]">
            <SiteImage
              src={image}
              alt="Chex.AI AI inspection technology"
              className="w-full rounded-[32px] object-cover shadow-[0_40px_90px_-50px_rgba(27,47,75,0.55)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
