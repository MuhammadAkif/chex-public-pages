'use client'
/* eslint-disable @next/next/no-img-element */

type SouthCarolinaDiagnosticsProps = {
  title: string
  description: string
  items: ReadonlyArray<{
    city: string
    description: string
    image: string
  }>
}

export function SouthCarolinaDiagnostics({
  title,
  description,
  items,
}: SouthCarolinaDiagnosticsProps) {
  return (
    <section className="relative bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="type-location-heading text-[#1b2f4b]">{title}</h2>
          <p className="type-location-body mt-6 text-[#41546e]">{description}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {items.map((item) => (
            <article key={item.city} className="grid overflow-hidden rounded-[16px] bg-[#f0f6ff] sm:grid-cols-[0.9fr_1fr]">
              <img src={item.image} alt={item.city} className="h-full min-h-[220px] w-full object-cover" />
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <h3 className="font-display text-[36px] font-bold leading-tight text-[#1b1c20] sm:text-[40px]">
                  {item.city}
                </h3>
                <p className="type-location-body mt-4 text-[#41546e]">{item.description}</p>
                <a href="#south-carolina-demo" className="type-location-body mt-5 font-medium underline">
                  Learn more
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
