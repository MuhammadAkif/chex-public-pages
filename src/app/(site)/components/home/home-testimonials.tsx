'use client'
/* eslint-disable @next/next/no-img-element */

import quoteImage from '@/app/(site)/assets/home/quotes.svg'
import starImage from '@/app/(site)/assets/home/star.svg'
import { SectionHeading } from '@/app/(site)/components/ui/section-heading'
import { SurfaceCard } from '@/app/(site)/components/ui/surface-card'

type HomeTestimonialsProps = {
  title: string
  description: string
  label: string
  items: ReadonlyArray<{
    name: string
    role: string
    quote: string
    featured: boolean
  }>
}

export function HomeTestimonials({
  title,
  description,
  label,
  items,
}: HomeTestimonialsProps) {
  const [featured, secondary] = items

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading title={title} description={description} />

        <div className="relative mt-16 min-h-[34rem] overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_50%_0%,rgba(19,104,185,0.12)_0%,rgba(255,255,255,1)_44%)] px-4 py-8 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute left-[14%] top-20 h-[420px] w-[240px] rounded-[16px] bg-white shadow-[0_94px_200px_0_rgba(21,21,21,0.1)]" />
          <img
            src={String(quoteImage)}
            alt=""
            className="pointer-events-none absolute right-[20%] top-10 h-24 w-auto opacity-12 sm:h-32"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="pt-10 lg:w-[220px]">
              <div className="inline-flex max-w-[172px] rounded-none bg-[#ff7a01] px-6 py-7 font-display text-[18px] font-bold leading-[1.166] tracking-[0.04em] text-white shadow-[0_50px_120px_-80px_rgba(255,122,1,0.85)]">
                {label}
              </div>
            </div>

            <div className="relative lg:flex-1">
              <SurfaceCard className="mx-auto max-w-[440px] rounded-[12px] p-8 lg:mt-12">
                <h3 className="type-testimonial-name text-black">
                  {featured?.name}
                </h3>
                <p className="font-ui mt-2 text-[14px] font-normal leading-[19px] text-[#505050]">
                  {featured?.role}
                </p>
                <p className="type-body-md mt-6 text-black">{featured?.quote}</p>
              </SurfaceCard>

              <div className="mx-auto mt-4 flex max-w-max items-center gap-2 rounded-[12px] bg-white px-6 py-5 shadow-[0_58px_124px_0_rgba(21,21,21,0.15)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <img key={index} src={String(starImage)} alt="" className="h-8 w-8" />
                ))}
              </div>
            </div>

            <div className="lg:w-[340px] lg:pt-20">
              <SurfaceCard className="rounded-[12px] p-8">
                <h3 className="type-testimonial-name text-[34px] text-black sm:text-[40px]">
                  {secondary?.name}
                </h3>
                <p className="font-ui mt-2 text-[14px] font-normal leading-[19px] text-[#505050]">
                  {secondary?.role}
                </p>
                <p className="type-body-md mt-6 text-black">{secondary?.quote}</p>
              </SurfaceCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
