import { SiteImage } from '@/app/(site)/components/shared/site-image'

type LandingTrustedProps = {
  title: string
  logos: ReadonlyArray<{ image: string; label: string }>
}

export function LandingTrusted({ title, logos }: LandingTrustedProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="text-center font-display text-[26px] font-bold tracking-[-0.5px] text-[#1b2f4b] sm:text-[32px]">
          {title}
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
          {logos.map((logo) => (
            <SiteImage
              key={logo.label}
              src={logo.image}
              alt={logo.label}
              className="h-9 w-auto object-contain opacity-90 grayscale-[0.15] transition hover:opacity-100 sm:h-11"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
