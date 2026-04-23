'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'

type HomeKeyDifferentiatorsProps = {
  title: string
  items: ReadonlyArray<string>
  image: StaticImageData
}

export function HomeKeyDifferentiators({
  title,
  items,
  image,
}: HomeKeyDifferentiatorsProps) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_50%_120%,rgba(19,104,185,1)_0%,rgba(19,104,185,0.9)_28%,rgba(255,122,1,0.58)_62%,rgba(6,19,40,0.98)_100%)] px-6 py-8 text-white shadow-[0_40px_120px_-80px_rgba(255,122,1,0.9)] sm:px-10 sm:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="type-section-title text-white sm:text-[44px] sm:leading-[52.8px]">
              {title}
            </h2>

            <ul className="mt-8 space-y-5">
              {items.map((item) => (
                <li key={item} className="type-body-md flex items-start gap-4 text-white/86">
                  <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white text-xs text-[#1368b9]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)]">
            <div className="rounded-[24px] border border-[#2563eb]/30 p-4">
              <Image
                src={image}
                alt="Chex.AI key differentiators"
                className="h-auto w-full rounded-[20px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
