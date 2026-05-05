/* eslint-disable @next/next/no-img-element */

type Tone = 'accent' | 'primary'
const UBER_LOGO = 'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/uber-logo.png'
const LYFT_LOGO = 'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/lyft-logo.png'

export type PricingRideShareSectionProps = {
  title: string
  description: string
  currencySymbol: string
  highlightIcon?: string
  highlightIconAlt?: string
  plans: ReadonlyArray<{
    name: string
    price: string
    description: string
    subDescription?: string
    buttonLabel: string
    buttonHref: string
    tone?: Tone
  }>
  highlights: ReadonlyArray<{
    emphasis?: string
    emphasisTone?: Tone
    text: string
  }>
}

const toneClasses: Record<Tone, { button: string; price: string }> = {
  accent: {
    button: 'bg-[#f68b1f] text-white hover:bg-[#df780f]',
    price: 'text-[#f68b1f]',
  },
  primary: {
    button: 'bg-[#1468ba] text-white hover:bg-[#105da7]',
    price: 'text-[#1468ba]',
  },
}

const logoRowForPlan = (planName: string) => {
  const normalized = planName.toLowerCase()
  const hasUber = normalized.includes('uber')
  const hasLyft = normalized.includes('lyft')

  return {
    hasLogo: hasUber || hasLyft,
    logos: [
      ...(hasUber ? [{ alt: 'Uber', src: UBER_LOGO }] : []),
      ...(hasLyft ? [{ alt: 'Lyft', src: LYFT_LOGO }] : []),
    ],
    label: hasUber && hasLyft ? 'PLUS INSPECTION' : hasUber || hasLyft ? 'INSPECTION' : planName.toUpperCase(),
  }
}

export function PricingRideShareSection({
  title,
  description,
  currencySymbol,
  highlightIcon,
  highlightIconAlt = '',
  plans,
  highlights,
}: PricingRideShareSectionProps) {
  if (!plans.length) {
    return null
  }

  return (
    <section className="bg-white px-4 pb-16 pt-4 sm:px-6 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[1180px] text-center">
        <h2 className="font-display text-[36px] font-bold leading-[1.15] text-[#1b2f4b] sm:text-[44px]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-4xl font-ui text-[16px] leading-8 text-[#41546e] sm:text-[18px]">
          {description}
        </p>

        <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => {
            const tone = plan.tone === 'accent' ? 'accent' : 'primary'
            const logoRow = logoRowForPlan(plan.name)
            const ctaHref = (plan.buttonHref || '').trim() || '#signup'

            return (
              <article
                key={`${plan.name}-${plan.price}`}
                className="flex min-h-[360px] flex-col items-center rounded-[8px] border border-[#e5edf7] bg-[#f7f9fc] px-5 py-7 shadow-[0_18px_55px_-36px_rgba(20,104,186,0.5)] sm:px-7"
              >
                {logoRow.hasLogo ? (
                  <div className="flex min-h-[70px] flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-3">
                      {logoRow.logos.map((logo, index) => (
                        <div key={logo.alt} className="flex items-center gap-3">
                          <img
                            src={logo.src}
                            alt={`${logo.alt} logo`}
                            className={
                              logo.alt === 'Lyft'
                                ? 'h-14 w-auto object-contain sm:h-[60px]'
                                : 'h-10 w-auto object-contain sm:h-11'
                            }
                          />
                          {logoRow.logos.length === 2 && index === 0 ? (
                            <span className="font-display text-[28px] font-bold leading-none text-[#1468ba]">+</span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 font-ui text-[28px] font-semibold tracking-[0.02em] text-[#20242c] sm:text-[32px]">
                      {logoRow.label}
                    </p>
                  </div>
                ) : (
                  <h3 className="max-w-[13ch] whitespace-pre-line font-display text-[30px] font-semibold uppercase leading-[1.18] text-[#20242c] sm:text-[34px]">
                    {plan.name}
                  </h3>
                )}

                <div className="mt-7 flex items-start justify-center leading-none">
                  <span className={`mt-2 font-display text-[38px] font-bold ${toneClasses[tone].price}`}>
                    {currencySymbol}
                  </span>
                  <span className={`font-display text-[72px] font-bold tracking-[-0.02em] ${toneClasses[tone].price}`}>
                    {plan.price}
                  </span>
                </div>

                <p className="mt-4 font-display text-[22px] font-bold leading-tight text-[#20242c]">
                  {plan.description}
                </p>
                {plan.subDescription ? (
                  <p className="mt-2 min-h-5 font-ui text-[13px] leading-5 text-[#66758a]">
                    {plan.subDescription}
                  </p>
                ) : (
                  <span className="mt-2 min-h-5" aria-hidden="true" />
                )}

                <a
                  href={ctaHref}
                  className={`mt-auto inline-flex min-h-12 w-full max-w-[300px] items-center justify-center rounded-[8px] px-6 font-ui text-[16px] font-semibold text-white visited:text-white hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1368b9] focus-visible:ring-offset-2 ${toneClasses[tone].button}`}
                >
                  {plan.buttonLabel}
                </a>
              </article>
            )
          })}
        </div>

        {highlights.length ? (
          <div className="mx-auto mt-9 grid max-w-[925px] gap-4 rounded-[8px] bg-[#f5f7fa] p-5 text-left sm:grid-cols-2 sm:p-6">
            {highlights.map((highlight) => {
              const emphasisTone = highlight.emphasisTone === 'primary' ? 'primary' : 'accent'

              return (
                <div key={`${highlight.emphasis ?? ''}-${highlight.text}`} className="flex items-center gap-4">
                  {highlightIcon ? (
                    <img
                      src={highlightIcon}
                      alt={highlightIconAlt}
                      className="h-7 w-7 flex-none object-contain"
                    />
                  ) : null}
                  <p className="font-ui text-[16px] leading-7 text-[#1b2f4b] sm:text-[18px] lg:text-[20px]">
                    {highlight.emphasis ? (
                      <span className={`font-bold ${toneClasses[emphasisTone].price}`}>
                        {highlight.emphasis}{' '}
                      </span>
                    ) : null}
                    {highlight.text}
                  </p>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
