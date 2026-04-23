'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import { SectionHeading } from '@/app/(site)/components/ui/section-heading'

type HomeCaseStudiesProps = {
  title: string
  items: ReadonlyArray<{
    metric: string
    title: string
    description: string
    image: StaticImageData
  }>
  arrowImage: StaticImageData
}

export function HomeCaseStudies({
  title,
  items,
  arrowImage,
}: HomeCaseStudiesProps) {
  return (
    <section id="case-studies" className="px-4 pb-24 pt-10 sm:px-6 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading title={title} theme="dark" />

        <div className="mt-14 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-6 px-1">
            {items.map((item, index) => (
              <article
                key={`${item.metric}-${item.title}`}
                className={`group relative h-[485px] w-[320px] overflow-hidden rounded-[12px] border border-white/70 ${
                  index % 2 === 1 ? 'mt-16' : ''
                } sm:w-[388px]`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(102,102,102,0)_18%,rgba(19,104,185,0.92)_100%)]" />

                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <Image
                    src={arrowImage}
                    alt=""
                    className="pointer-events-none absolute right-8 top-[44%] h-20 w-20 -rotate-90 object-contain opacity-95 sm:h-28 sm:w-28"
                  />
                  <div className="font-display text-5xl font-bold tracking-[-0.05em] sm:text-[64px] sm:leading-[70.4px]">
                    {item.metric}
                  </div>
                  <div className="mt-1 font-display text-[28px] font-medium leading-[1.1] tracking-[-0.03em]">
                    {item.title}
                  </div>
                  <p className="type-body-md mt-5 max-w-[18rem] text-white/92">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
