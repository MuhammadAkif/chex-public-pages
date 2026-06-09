import { SiteImage } from '@/app/(site)/components/shared/site-image'

import { LandingDemoButton } from './landing-demo-button'

type LandingInspectCtaProps = {
  eyebrow: string
  titleAccentA: string
  titleMid: string
  titleAccentB: string
  titleTail: string
  subtitle: string
  description: string
  buttonLabel: string
  testimonial: { name: string; quote: string; role: string; image: string }
}

export function LandingInspectCta({
  eyebrow,
  titleAccentA,
  titleMid,
  titleAccentB,
  titleTail,
  subtitle,
  description,
  buttonLabel,
  testimonial,
}: LandingInspectCtaProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="max-w-[960px] font-display text-[32px] font-bold leading-[1.1] tracking-[-1px] text-[#1b2f4b] sm:text-[52px]">
          <span className="text-[#ff7a01]">{titleAccentA}</span>
          {titleMid}
          <span className="text-[#ff7a01]">{titleAccentB}</span>
          {titleTail}
        </h2>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="font-ui text-[16px] text-[#41546e] sm:text-[18px]">{eyebrow}</p>
            <h3 className="max-w-[520px] font-display text-[26px] font-bold leading-tight text-[#1b2f4b] sm:text-[32px]">
              {subtitle}
            </h3>
            <p className="max-w-[520px] font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px]">
              {description}
            </p>
            <div className="pt-1">
              <LandingDemoButton>{buttonLabel}</LandingDemoButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[600px]">
            <div className="flex overflow-hidden rounded-[16px] bg-white shadow-[0_30px_80px_-40px_rgba(46,33,61,0.45)]">
              <SiteImage
                src={testimonial.image}
                alt={testimonial.name}
                className="h-auto w-[42%] shrink-0 object-cover"
              />
              <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                <p className="font-display text-[26px] font-medium tracking-[-1px] text-black sm:text-[34px]">
                  {testimonial.name}
                </p>
                <p className="font-ui text-[15px] leading-7 text-black/80 sm:text-[16px]">
                  {testimonial.quote}
                </p>
                <div className="font-ui text-[13px] text-[#888]">
                  <p>{testimonial.name}</p>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
