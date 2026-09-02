import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

type HowItWorksProps = CommercialFleetContent['howItWorks']

export function CommercialFleetHowItWorks({ title, description, steps }: HowItWorksProps) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[960px]">
        <div className="mx-auto max-w-[803px] text-center">
          <h2 className="font-display text-[32px] font-bold leading-[1.26] tracking-[-0.057em] text-[#1b2f4b] sm:text-[44px] lg:text-[56px]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-[787px] font-display text-[16px] font-normal leading-normal text-[#41546e] sm:text-[18px]">
            {description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((item) => (
            <div key={item.title} className="flex flex-col">
              {/* Fixed-height box; the phone extends past the bottom and is
                  clipped, matching the Figma how-it-works cards. */}
              <div className="relative h-[299px] overflow-hidden rounded-[24px] bg-[#f0f6ff]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={`${item.title} step in the Chex.AI app`}
                  className="absolute left-1/2 top-6 w-[68%] max-w-[205px] -translate-x-1/2 object-contain drop-shadow-[0_0_16px_rgba(0,0,0,0.16)]"
                />
              </div>
              <div className="mt-4 flex items-end gap-4">
                <span className="font-display text-[14px] font-bold tracking-[-0.02em] text-[#41546e]">
                  {item.step}
                </span>
                <span className="font-display text-[20px] font-bold text-[#1b2f4b]">{item.title}</span>
              </div>
              <p className="mt-3 font-display text-[15px] font-normal leading-normal tracking-[-0.01em] text-[#41546e]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
