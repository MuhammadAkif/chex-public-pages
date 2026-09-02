import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

import { fleetAssets } from './assets'
import { ArrowUpRight, FleetButton } from './fleet-ui'

type HeroProps = CommercialFleetContent['hero']

/**
 * Keeps the final word of the headline on its own line at desktop widths so it
 * reads "AI-Powered Commercial Fleet" / "Inspections" as in the Figma design.
 */
function HeroTitle({ title }: { title: string }) {
  // An explicit newline in the title forces the desktop two-line break exactly
  // where the design wants it; otherwise the final word drops to line two.
  if (title.includes('\n')) {
    const idx = title.indexOf('\n')
    const first = title.slice(0, idx)
    const rest = title.slice(idx + 1).replace(/\n/g, ' ')
    return (
      <>
        {first} <br className="hidden lg:block" />
        {rest}
      </>
    )
  }
  const words = title.trim().split(' ')
  if (words.length < 2) return <>{title}</>
  const head = words.slice(0, -1).join(' ')
  const last = words[words.length - 1]
  return (
    <>
      <span className="lg:whitespace-nowrap">{head}</span> <br className="hidden lg:block" />
      {last}
    </>
  )
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#ff9900]" aria-hidden="true">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

export function CommercialFleetHero({
  rating,
  title,
  description,
  primaryCta,
  secondaryCta,
  media,
}: HeroProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_100%)] px-4 pt-12 pb-16 sm:px-6 lg:px-10 lg:pt-16 lg:pb-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <span className="font-ui text-[16px] text-[#41546e]">{rating}</span>
            <span className="relative ml-1 inline-flex h-7 w-7 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fleetAssets.ratingAvatarRing} alt="" className="absolute inset-0 h-full w-full" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fleetAssets.ratingAvatar}
                alt="Verified reviewer"
                className="relative h-[18px] w-[18px] rounded-full object-cover"
              />
            </span>
          </div>

          <h1 className="mt-6 font-display text-[40px] font-bold leading-[1.08] tracking-[-0.02em] text-[#1b2f4b] sm:text-[56px] lg:text-[76px] lg:leading-[1.02]">
            <HeroTitle title={title} />
          </h1>

          <p className="mt-6 max-w-[781px] font-ui text-[16px] leading-relaxed text-[#5a6e67] sm:text-[17px]">
            {description}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
            <FleetButton link={primaryCta} variant="outline">
              <ArrowUpRight className="h-4 w-4" />
            </FleetButton>
            <FleetButton link={secondaryCta} variant="primary" className="w-[173px]" />
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mx-auto mt-12 aspect-[1183/652] w-full max-w-[1183px] overflow-hidden rounded-[24px] shadow-[0_40px_80px_-40px_rgba(27,47,75,0.45)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}
