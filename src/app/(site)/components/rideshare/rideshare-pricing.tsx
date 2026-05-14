import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";

type Tone = "primary" | "accent";

type PricingCardLogo = {
  src: SiteImageSource;
  alt: string;
  className?: string;
};

export type RidesharePricingPlan = {
  name: string;
  price: string;
  description: string;
  subDescription?: string;
  buttonLabel: string;
  buttonHref: string;
  tone?: Tone;
  logos?: ReadonlyArray<PricingCardLogo>;
  showPlusBetweenLogos?: boolean;
};

export type RidesharePricingHighlight = {
  icon: SiteImageSource;
  iconAlt: string;
  emphasis?: string;
  emphasisTone?: Tone;
  text: string;
};

export type RidesharePricingProps = {
  title: string;
  description: string;
  plans: ReadonlyArray<RidesharePricingPlan>;
  highlights: ReadonlyArray<RidesharePricingHighlight>;
};

const toneClasses: Record<Tone, { button: string; price: string }> = {
  accent: {
    button: "bg-[#f68b1f] text-white hover:bg-[#df780f]",
    price: "text-[#f68b1f]",
  },
  primary: {
    button: "bg-[#1468ba] text-white hover:bg-[#105da7]",
    price: "text-[#1468ba]",
  },
};

export function RidesharePricing({
  title,
  description,
  plans,
  highlights,
}: RidesharePricingProps) {
  if (!plans.length) return null;

  const columnsClass =
    plans.length >= 3
      ? "md:grid-cols-2 lg:grid-cols-3"
      : "md:grid-cols-2 lg:grid-cols-2 lg:max-w-[820px] lg:mx-auto";

  return (
    <section className="bg-white px-4 pb-16 pt-4 sm:px-6 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[1180px] text-center">
        <h2 className="font-display text-[36px] font-bold leading-[1.15] text-[#1b2f4b] sm:text-[44px]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-4xl font-ui text-[16px] leading-8 text-[#41546e] sm:text-[18px]">
          {description}
        </p>

        <div className={`mt-11 grid gap-5 lg:gap-6 ${columnsClass}`}>
          {plans.map((plan) => {
            const tone: Tone = plan.tone ?? "primary";
            const ctaHref = (plan.buttonHref || "").trim() || "#signup";
            const hasLogos = plan.logos && plan.logos.length > 0;

            return (
              <article
                key={`${plan.name}-${plan.price}`}
                className="flex min-h-[360px] flex-col items-center rounded-[8px] border border-[#e5edf7] bg-[#f7f9fc] px-5 py-7 shadow-[0_18px_55px_-36px_rgba(20,104,186,0.5)] sm:px-7"
              >
                {hasLogos ? (
                  <div className="flex min-h-[70px] flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-3">
                      {plan.logos!.map((logo, index) => (
                        <div
                          key={`${logo.alt}-${index}`}
                          className="flex items-center gap-3"
                        >
                          <SiteImage
                            src={logo.src}
                            alt={logo.alt}
                            className={
                              logo.className ??
                              "h-10 w-auto object-contain sm:h-11"
                            }
                          />
                          {plan.showPlusBetweenLogos &&
                          index === 0 &&
                          plan.logos!.length === 2 ? (
                            <span className="font-display text-[28px] font-bold leading-none text-[#1468ba]">
                              +
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 font-ui text-[26px] font-semibold tracking-[0.02em] text-[#20242c] sm:text-[30px]">
                      {plan.name}
                    </p>
                  </div>
                ) : (
                  <h3 className="max-w-[13ch] whitespace-pre-line font-display text-[30px] font-semibold uppercase leading-[1.18] text-[#20242c] sm:text-[34px]">
                    {plan.name}
                  </h3>
                )}

                <div className="mt-7 flex items-start justify-center leading-none">
                  <span
                    className={`mt-2 font-display text-[38px] font-bold ${toneClasses[tone].price}`}
                  >
                    $
                  </span>
                  <span
                    className={`font-display text-[72px] font-bold tracking-[-0.02em] ${toneClasses[tone].price}`}
                  >
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
                  className={`mt-auto inline-flex min-h-12 w-full max-w-[300px] items-center justify-center rounded-[8px] px-6 font-ui text-[16px] font-semibold text-white transition-colors hover:text-white visited:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1368b9] focus-visible:ring-offset-2 ${toneClasses[tone].button}`}
                >
                  {plan.buttonLabel}
                </a>
              </article>
            );
          })}
        </div>

        {highlights.length ? (
          <div className="mx-auto mt-9 grid max-w-[925px] gap-4 rounded-[8px] bg-[#f5f7fa] p-5 text-left sm:grid-cols-2 sm:p-6">
            {highlights.map((highlight, index) => {
              const emphasisTone: Tone =
                highlight.emphasisTone ?? "accent";
              return (
                <div
                  key={`${highlight.emphasis ?? ""}-${highlight.text}-${index}`}
                  className="flex items-center gap-4"
                >
                  <SiteImage
                    src={highlight.icon}
                    alt={highlight.iconAlt}
                    className="h-7 w-7 flex-none object-contain"
                  />
                  <p className="font-ui text-[16px] leading-7 text-[#1b2f4b] sm:text-[18px] lg:text-[20px]">
                    {highlight.emphasis ? (
                      <span
                        className={`font-bold ${toneClasses[emphasisTone].price}`}
                      >
                        {highlight.emphasis}{" "}
                      </span>
                    ) : null}
                    {highlight.text}
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
