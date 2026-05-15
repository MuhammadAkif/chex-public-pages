import { Button } from "@/app/(site)/components/ui/button";

export type FleetPricingProps = {
  title: string;
  description: string;
  priceValue: string;
  priceCadence: string;
  features: ReadonlyArray<string>;
  ctaLabel: string;
  ctaHref: string;
};

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-[#ff9900]"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FleetPricing({
  title,
  description,
  priceValue,
  priceCadence,
  features,
  ctaLabel,
  ctaHref,
}: FleetPricingProps) {
  const half = Math.ceil(features.length / 2);
  const left = features.slice(0, half);
  const right = features.slice(half);

  return (
    <section
      id="pricingSectionComplete"
      className="bg-[#f4f8ff] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px] text-center">
        <h2 className="font-display text-[34px] font-bold leading-tight text-[#1b2f4b] sm:text-[44px]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px]">
          {description}
        </p>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex justify-center lg:justify-end">
            <div className="rounded-[20px] bg-white px-10 py-10 text-left shadow-[0_28px_80px_-40px_rgba(20,104,186,0.5)] sm:px-14 sm:py-14">
              <p className="font-display leading-none text-[#ff7a01]">
                <span className="align-top text-[20px] font-bold sm:text-[28px]">$</span>
                <span className="text-[48px] font-bold tracking-tight sm:text-[80px]">
                  {priceValue}
                </span>
              </p>
              <p className="mt-3 font-ui text-[16px] text-[#41546e] sm:text-[18px]">
                {priceCadence}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ul className="space-y-3">
              {left.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-left font-ui text-[16px] text-[#1b2f4b] sm:text-[17px]"
                >
                  <PlusIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {right.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-left font-ui text-[16px] text-[#1b2f4b] sm:text-[17px]"
                >
                  <PlusIcon />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={ctaHref} size="lg" className="rounded-[8px] px-8">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
