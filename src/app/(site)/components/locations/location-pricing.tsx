export type LocationPricingProps = {
  title: string
  description: string
  plans: ReadonlyArray<{
    buttonHref: string
    buttonLabel: string
    caption?: string
    name: string
    price: string
    priceTone?: 'accent' | 'primary'
    subtitle: string
  }>
  highlights: ReadonlyArray<{
    text: string
  }>
}

export function LocationPricing({
  title,
  description,
  plans,
  highlights,
}: LocationPricingProps) {
  if (!plans.length) {
    return null
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="type-location-heading text-[#1b2f4b]">{title}</h2>
          <p className="type-location-body mt-6 text-[#41546e]">{description}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {plans.map((plan) => {
            const isAccent = plan.priceTone === 'accent'
            const priceClassName = isAccent ? 'text-[#ff8a1f]' : 'text-[#1368b9]'
            const buttonClassName = isAccent
              ? 'bg-[#ff8a1f] text-white hover:bg-[#eb7a12]'
              : 'bg-[#1368b9] text-white hover:bg-[#0f5ca4]'

            return (
              <article
                key={`${plan.name}-${plan.price}`}
                className="rounded-[20px] border border-[#e6eef8] bg-white px-6 py-8 text-center shadow-[0_20px_55px_-35px_rgba(19,104,185,0.35)] sm:px-8 sm:py-10"
              >
                <h3 className="font-display text-[40px] font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-[#1b2f4b] sm:text-[46px]">
                  {plan.name}
                </h3>
                <p className={['mt-5 font-display text-[64px] font-bold leading-none sm:text-[72px]', priceClassName].join(' ')}>
                  {plan.price}
                </p>
                <p className="mt-4 font-display text-[36px] font-semibold leading-[1.2] text-[#1b2f4b] sm:text-[42px]">
                  {plan.subtitle}
                </p>
                {plan.caption ? (
                  <p className="mt-1 font-ui text-[16px] leading-[1.5] text-[#6b7f96]">{plan.caption}</p>
                ) : null}
                <a
                  href={plan.buttonHref}
                  className={[
                    'mt-8 inline-flex min-h-12 min-w-[230px] items-center justify-center rounded-[10px] px-6 font-ui text-[17px] font-semibold transition-colors',
                    buttonClassName,
                  ].join(' ')}
                >
                  {plan.buttonLabel}
                </a>
              </article>
            )
          })}
        </div>

        {highlights.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {highlights.map((highlight) => (
              <div
                key={highlight.text}
                className="flex items-center gap-3 rounded-[12px] border border-[#e6eef8] bg-[#f9fcff] px-5 py-4"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#fff1e5] text-[#ff8a1f]"
                >
                  ▸
                </span>
                <p className="font-ui text-[18px] font-medium leading-[1.35] text-[#1b2f4b]">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
