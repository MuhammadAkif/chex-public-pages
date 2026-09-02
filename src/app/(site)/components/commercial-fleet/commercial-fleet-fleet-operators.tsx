import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

import { fleetAssets } from './assets'
import { ArrowUpRight, FleetButton } from './fleet-ui'

type FleetOperatorsProps = CommercialFleetContent['fleetOperators']

export function CommercialFleetOperators({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  background,
  stats,
  features,
}: FleetOperatorsProps) {
  return (
    <section className="bg-white px-4 pt-0 pb-10 sm:px-6 lg:px-10 lg:pb-16">
      <div className="mx-auto max-w-[1216px]">
        <div className="relative overflow-hidden rounded-[40px] border border-[rgba(16,24,39,0.2)] p-8 sm:p-12 lg:p-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={background} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(106deg, rgb(7,13,24) 8%, rgba(7,13,24,0.82) 52%, rgba(17,55,117,0.55) 100%)',
            }}
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left column */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,122,1,0.3)] bg-[rgba(255,122,1,0.05)] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a01]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fleetAssets.fleetOperators.lock} alt="" className="h-3 w-3" />
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                  {eyebrow}
                </span>
              </span>

              <h2 className="mt-6 max-w-[560px] font-display text-[28px] font-black leading-[1.2] tracking-[-0.015em] text-white sm:text-[36px] lg:text-[40px]">
                {title}
              </h2>
              <p className="mt-5 max-w-[560px] font-display text-[16px] leading-[26px] text-white/90">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <FleetButton link={primaryCta} variant="primary" className="w-[173px]" />
                <FleetButton link={secondaryCta} variant="outline">
                  <ArrowUpRight className="h-4 w-4" />
                </FleetButton>
              </div>

              <div className="mt-10 grid max-w-[480px] grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-[26px] font-black text-white sm:text-[30px]">{stat.value}</p>
                    <p className="mt-1 font-display text-[12px] leading-tight text-white/80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — feature cards */}
            <div className="space-y-4 lg:pt-1">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 rounded-[26px] border border-[rgba(16,24,39,0.11)] bg-white/95 p-6 backdrop-blur-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[22px] bg-[rgba(255,122,1,0.12)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={fleetAssets.fleetOperators.featureIcons[feature.icon]}
                      alt=""
                      className="h-5 w-5"
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-[18px] font-black tracking-[-0.03em] text-[#1b2f4b]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 font-display text-[14px] leading-[22px] text-[#41546e]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
