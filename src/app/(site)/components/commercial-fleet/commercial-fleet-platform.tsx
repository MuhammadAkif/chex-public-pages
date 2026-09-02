import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

import { fleetAssets } from './assets'

type PlatformProps = CommercialFleetContent['platform']
type Feature = PlatformProps['features'][number]

function FeatureCard({ feature }: { feature: Feature }) {
  const highlighted = feature.highlighted

  return (
    <article
      className={`flex flex-col gap-4 rounded-[16px] p-6 ${
        highlighted
          ? 'bg-[#1368b9] text-white shadow-[0_24px_50px_-30px_rgba(19,104,185,0.7)]'
          : 'bg-[#f5f8fd] text-[#1b2f4b]'
      }`}
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-[10px] ${
          highlighted ? 'bg-white' : 'bg-[#1368b9]'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fleetAssets.platformGlyphs[feature.icon]} alt="" className="h-5 w-5" />
      </span>
      <h3 className={`font-display text-[20px] font-bold ${highlighted ? 'text-white' : 'text-[#1b2f4b]'}`}>
        {feature.title}
      </h3>
      <p className={`font-ui text-[14px] leading-relaxed ${highlighted ? 'text-white/85' : 'text-[#5a6e67]'}`}>
        {feature.description}
      </p>
    </article>
  )
}

export function CommercialFleetPlatform({ title, description, features }: PlatformProps) {
  return (
    <section className="bg-white px-4 pt-8 pb-20 sm:px-6 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[896px] text-center">
          <h2 className="font-display text-[32px] font-bold leading-[1.14] tracking-[-0.03em] text-[#1b2f4b] sm:text-[44px] lg:text-[56px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[842px] font-display text-[16px] font-normal leading-relaxed text-[#41546e] sm:text-[18px]">
            {description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
