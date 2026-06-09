import { RichText } from '@/app/(site)/components/shared/rich-text'
import { SiteImage } from '@/app/(site)/components/shared/site-image'

import { LandingDemoButton } from './landing-demo-button'

type LandingHeroProps = {
  ratingText: string
  titleAccent: string
  title: string
  description: string
  buttonLabel: string
  image: string
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]" aria-hidden>
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

export function LandingHero({
  ratingText,
  titleAccent,
  title,
  description,
  buttonLabel,
  image,
}: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#403d96_0%,#343083_55%,#2f2c72_100%)] text-white">
      {/* faint car silhouette accent, echoing the Figma hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-4%] top-1/2 hidden h-[520px] w-[680px] -translate-y-1/2 opacity-[0.07] lg:block"
        style={{
          backgroundImage:
            'radial-gradient(closest-side, rgba(255,255,255,0.9), transparent)',
        }}
      />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:gap-10 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#ff9900]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <span className="font-ui text-[15px] text-white/90">{ratingText}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[11px] font-semibold">
              G
            </span>
          </div>

          <h1 className="max-w-[640px] font-display text-[34px] font-bold leading-[1.12] tracking-[-1px] sm:text-[40px] lg:text-[46px]">
            <span className="text-[#ff7a01]">{titleAccent}</span> {title}
          </h1>

          <RichText
            as="p"
            html={description}
            className="max-w-[520px] font-ui text-[16px] leading-8 text-white/85 [&_strong]:font-semibold [&_strong]:text-[#ff7a01]"
          />

          <div className="pt-1">
            <LandingDemoButton>{buttonLabel}</LandingDemoButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px]">
          <div
            aria-hidden
            className="absolute inset-0 -z-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,122,1,0.22),transparent)] blur-2xl"
          />
          <SiteImage
            src={image}
            alt="Chex.AI mobile vehicle inspection app"
            priority
            className="relative z-10 mx-auto w-full max-w-[360px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>
    </section>
  )
}
