/* eslint-disable @next/next/no-img-element */

import { SectionHeading } from '@/app/(site)/components/ui/section-heading'
import { SurfaceCard } from '@/app/(site)/components/ui/surface-card'

type TestimonialAsset = string

const QUOTE_IMAGE =
  'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/testimonial-quotes.svg'
const STAR_IMAGE =
  'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/testimonial-star.svg'

export type LocationTestimonialsProps = {
  title: string
  description: string
  label: string
  quoteImage?: TestimonialAsset
  starImage?: TestimonialAsset
  items: ReadonlyArray<{
    name: string
    role: string
    quote: string
    featured: boolean
  }>
}

export function LocationTestimonials({
  title,
  description,
  label,
  quoteImage: customQuoteImage,
  starImage: customStarImage,
  items,
}: LocationTestimonialsProps) {
  const [featured, secondary] = items
  const resolvedQuoteImage = customQuoteImage ?? QUOTE_IMAGE
  const resolvedStarImage = customStarImage ?? STAR_IMAGE

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading title={title} description={description} />

        <div className="relative mt-16 min-h-[34rem] overflow-hidden bg-white px-4 py-8 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute left-[14%] top-20 h-[420px] w-[240px] bg-white shadow-[0_94px_200px_0_rgba(21,21,21,0.15)]" />
          <img
            src={resolvedQuoteImage}
            alt=""
            className="pointer-events-none absolute right-[20%] top-10 h-24 w-auto opacity-12 sm:h-32"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="pt-10 lg:w-[220px]">
              <div className="inline-flex max-w-[172px] bg-[#ff7a01] px-6 py-7 font-display text-[18px] font-bold capitalize leading-[1.166] tracking-[0.04em] text-white shadow-[0_94px_200px_0_rgba(21,21,21,0.15)]">
                {label}
              </div>
            </div>

            <div className="relative lg:flex-1">
              <SurfaceCard className="mx-auto max-w-[440px] rounded-[12px] p-8 lg:mt-12">
                <h3 className="type-testimonial-name text-black">{featured?.name}</h3>
                <p className="font-ui mt-2 text-[14px] font-normal leading-[19px] text-[#505050]">
                  {featured?.role}
                </p>
                <p className="type-body-md mt-6 text-black">{featured?.quote}</p>
              </SurfaceCard>

              <div className="mx-auto mt-4 flex max-w-max items-center gap-2 rounded-[12px] bg-white px-6 py-5 shadow-[0_58px_124px_0_rgba(21,21,21,0.15)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <img key={index} src={resolvedStarImage} alt="" className="h-8 w-8" />
                ))}
              </div>
            </div>

            <div className="lg:w-[360px] lg:pt-20">
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
