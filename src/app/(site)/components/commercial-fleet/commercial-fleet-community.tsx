import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

import { fleetAssets } from './assets'

type CommunityProps = CommercialFleetContent['community']

/**
 * Per-brand wordmark styling for the trusted-logos row, matching the Figma
 * treatment (some brands appear bolder/darker, others lighter/greyed).
 */
function trustedLogoStyle(label: string): string {
  // Figma sizes preserved; all wordmarks rendered in solid black per request.
  switch (label) {
    case 'Fleetio':
    case 'Zurich':
    case 'Samsara':
      return 'text-[30px] text-black lg:text-[40px]'
    case 'HolidayCars':
      return 'text-[24px] text-black lg:text-[30px]'
    case 'Unique Track':
      return 'text-[20px] text-black lg:text-[26px]'
    default:
      return 'text-[24px] text-black lg:text-[30px]'
  }
}

/** Renders "Our Community of Chex.AI is Trending Fast" with ".AI" in ember. */
function TrendingTitle({ text }: { text: string }) {
  const marker = '.AI'
  const idx = text.indexOf(marker)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-[#ff7a01]">{marker}</span>
      {text.slice(idx + marker.length)}
    </>
  )
}

export function CommercialFleetCommunity({
  trendingTitle,
  stats,
  inspectTitle,
  inspectHighlight,
  manageTitle,
  manageBullets,
  manageImage,
  manageBadge,
  trustedTitle,
  trustedLogos,
}: CommunityProps) {
  return (
    <section className="relative overflow-hidden bg-[#1b1c20] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      {/* Ambient ember glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0 h-[703px] w-[703px] rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,122,1,0.28) 0%, rgba(255,122,1,0) 70%)' }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Trending + stats */}
        <h2 className="mx-auto max-w-[720px] text-center font-display text-[32px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[56px]">
          <TrendingTitle text={trendingTitle} />
        </h2>

        <div className="mx-auto mt-12 grid max-w-[920px] grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex h-[179px] flex-col items-center justify-center rounded-[32px] bg-white px-4 text-center text-[#111]"
            >
              <p className="font-display text-[36px] font-bold sm:text-[44px]">{stat.value}</p>
              <p className="mt-1 font-ui text-[14px] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Inspect headline */}
        <h3 className="mx-auto mt-20 max-w-[800px] text-center font-display text-[32px] font-bold leading-[1.14] text-white sm:text-[44px] lg:text-[56px]">
          {inspectTitle} <span className="text-[#848484]">{inspectHighlight}</span>
        </h3>

        {/* Manage & inspect */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h4 className="max-w-[515px] font-display text-[28px] font-bold leading-[1.15] text-white sm:text-[36px] lg:text-[40px]">
              {manageTitle}
            </h4>
            <ul className="mt-8 space-y-5">
              {manageBullets.map((bullet) => (
                <li key={bullet.label} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={fleetAssets.manageBulletIcon} alt="" className="mt-1 h-5 w-5 shrink-0" />
                  <p className="font-ui text-[16px] leading-relaxed text-white sm:text-[18px]">
                    <span className="font-semibold">{bullet.label}</span> {bullet.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[24px] border-4 border-[#ff7a01]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={manageImage} alt="Chex.AI fleet inspection dashboard" className="aspect-[1264/843] w-full object-cover" />
            </div>
            {/* Floating verification badge */}
            <div className="absolute -top-6 left-0 flex w-[269px] max-w-[85%] flex-col items-start gap-3 rounded-[12px] border border-[#fb7b04] bg-gradient-to-br from-white/60 to-white/10 px-4 py-3 shadow-[0_4px_4px_rgba(69,69,69,0.25)] backdrop-blur-xl lg:-left-8">
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fleetAssets.manageBadgeRing} alt="" className="absolute inset-0 h-full w-full" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fleetAssets.manageBadgeSeal} alt="" className="h-[21px] w-[21px]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fleetAssets.manageBadgeCheck} alt="" className="absolute h-[9px] w-[12px]" />
              </span>
              <p className="font-ui text-[13px] leading-snug text-[#1b1c20]">
                {manageBadge.startsWith('AI-powered') ? (
                  <>
                    <span className="font-semibold">AI-powered</span>
                    {manageBadge.slice('AI-powered'.length)}
                  </>
                ) : (
                  manageBadge
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Trusted by … */}
        <div className="relative mt-20 overflow-hidden rounded-[24px] px-6 py-14 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fleetAssets.gradientBackdrop} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#1b1c20]/25" />

          <div className="relative mx-auto max-w-[1200px]">
            <h2 className="mx-auto max-w-[908px] font-display text-[28px] font-bold leading-[1.2] text-white sm:text-[36px] lg:text-[48px]">
              {trustedTitle}
            </h2>
            <div className="mx-auto mt-10 grid max-w-[1130px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {trustedLogos.map((logo) => (
                <div
                  key={logo}
                  className="flex h-[100px] items-center justify-center rounded-[16px] bg-white px-4 lg:h-[120px]"
                >
                  <span className={`font-display font-bold ${trustedLogoStyle(logo)}`}>{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
