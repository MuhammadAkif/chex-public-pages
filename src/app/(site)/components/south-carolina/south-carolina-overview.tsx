'use client'
/* eslint-disable @next/next/no-img-element */

type SouthCarolinaOverviewProps = {
  title: string
  paragraphs: ReadonlyArray<string>
  image: string
}

export function SouthCarolinaOverview({
  title,
  paragraphs,
  image,
}: SouthCarolinaOverviewProps) {
  return (
    <section className="relative bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute right-[7%] top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.18)_0%,_rgba(255,122,1,0)_72%)] blur-3xl" />
      <div className="pointer-events-none absolute left-[3%] bottom-6 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(19,104,185,0.18)_0%,_rgba(19,104,185,0)_72%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1240px] rounded-t-[48px] bg-[#f0f6ff] px-6 py-10 sm:px-10 lg:px-14 lg:py-20">
        <h2 className="max-w-4xl font-display text-[34px] font-bold leading-normal tracking-[-1.76px] text-[#1b1c20] sm:text-[40px]">
          {title}
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_0.75fr] lg:items-start">
          <div className="type-location-body-relaxed space-y-6 text-justify text-[#1b1c20]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="overflow-hidden rounded-[16px] shadow-[0_22px_64px_0_rgba(30,27,75,0.08)]">
            <img
              src={image}
              alt="South Carolina vehicle diagnostics"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
