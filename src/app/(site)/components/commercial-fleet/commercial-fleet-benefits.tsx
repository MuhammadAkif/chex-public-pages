import Link from 'next/link'
import type { Route } from 'next'

import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

import { fleetAssets } from './assets'

type BenefitsProps = CommercialFleetContent['benefits'] & {
  /** Optional CTA link rendered below the grid (e.g. a link to the pricing page). */
  ctaLink?: { label: string; href: string }
}
type Benefit = BenefitsProps['items'][number]

function BenefitCard({ benefit, isLast }: { benefit: Benefit; isLast?: boolean }) {
  const highlighted = benefit.highlighted
  return (
    <article
      className={`flex flex-col justify-center rounded-[20px] p-8 ${benefit.wide ? 'lg:col-span-3' : 'lg:col-span-2'} ${
        // The final wide card sits alone on its row — cap its width so it reads a
        // touch narrower than a full 3-column span.
        isLast && benefit.wide ? 'lg:max-w-[86%]' : ''
      } ${
        highlighted ? 'bg-[#1368b9] text-white shadow-[0_24px_50px_-30px_rgba(19,104,185,0.7)]' : 'bg-[#f0f6ff] text-[#1b2f4b]'
      }`}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-[14px] ${
          highlighted ? 'bg-white' : 'bg-[#1368b9]'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fleetAssets.benefitIcons[benefit.icon]} alt="" className="h-7 w-7" />
      </span>
      <h3 className={`mt-5 font-display text-[24px] font-bold ${highlighted ? 'text-white' : 'text-[#1b2f4b]'}`}>
        {benefit.title}
      </h3>
      <p className={`mt-3 max-w-[420px] font-ui text-[15px] leading-relaxed ${highlighted ? 'text-white/85' : 'text-[#5a6e67]'}`}>
        {benefit.description}
      </p>
    </article>
  )
}

export function CommercialFleetBenefits({ title, items, ctaLink }: BenefitsProps) {
  return (
    <section className="bg-white px-4 pt-4 pb-20 sm:px-6 lg:px-10 lg:pt-6 lg:pb-28">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="font-display text-[32px] font-bold tracking-[-0.03em] text-[#1b2f4b] sm:text-[44px] lg:text-[56px]">
          {title}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} isLast={index === items.length - 1} />
          ))}
        </div>

        {ctaLink ? (
          <div className="mt-12 flex justify-center">
            <Link
              href={ctaLink.href as Route}
              className="type-button inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[14px] bg-[#1368b9] px-7 text-white shadow-[0_20px_50px_-24px_rgba(19,104,185,0.85)] transition hover:brightness-105"
              style={{ color: '#ffffff' }}
            >
              {ctaLink.label}
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
