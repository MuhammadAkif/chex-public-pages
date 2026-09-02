import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

import { ArrowUpRight, FleetButton } from './fleet-ui'

type CtaProps = CommercialFleetContent['cta']

export function CommercialFleetCta({ title, description, primaryCta, secondaryCta, note, background }: CtaProps) {
  return (
    <section className="bg-white px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[24px] px-6 py-16 text-center sm:px-10 lg:py-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={background} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#1b1c20]/75" />

          <div className="relative mx-auto max-w-[814px]">
            <h2 className="font-display text-[32px] font-black leading-[1.14] text-white sm:text-[44px] lg:text-[56px]">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-[754px] font-ui text-[16px] leading-[1.8] text-white sm:text-[18px]">
              {description}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <FleetButton link={primaryCta} variant="outline" className="w-[210px]">
                <ArrowUpRight className="h-4 w-4" />
              </FleetButton>
              <FleetButton link={secondaryCta} variant="primary" className="w-[173px]" />
            </div>
            <p className="mt-6 font-ui text-[14px] capitalize text-white">{note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
