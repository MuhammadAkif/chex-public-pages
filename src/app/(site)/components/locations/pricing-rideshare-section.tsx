/* eslint-disable @next/next/no-img-element */

type Tone = 'accent' | 'primary'

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

        <div className="mt-11 grid gap-6 md:grid-cols-2 lg:gap-8">
          {plans.map((plan) => {
            const tone = plan.tone === 'accent' ? 'accent' : 'primary'

            return (
              <article
                key={`${plan.name}-${plan.price}`}
                className="flex min-h-[392px] flex-col items-center rounded-[8px] border border-[#e5edf7] bg-[#f7f9fc] px-6 py-8 shadow-[0_18px_55px_-36px_rgba(20,104,186,0.5)] sm:px-9"
              >
                <h3 className="max-w-[13ch] whitespace-pre-line font-display text-[30px] font-semibold uppercase leading-[1.18] text-[#20242c] sm:text-[34px]">
                  {plan.name}
                </h3>

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
                  href={plan.buttonHref}
                  className={`mt-auto inline-flex min-h-12 w-full max-w-[300px] items-center justify-center rounded-[8px] px-6 font-ui text-[16px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1368b9] focus-visible:ring-offset-2 ${toneClasses[tone].button}`}
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
