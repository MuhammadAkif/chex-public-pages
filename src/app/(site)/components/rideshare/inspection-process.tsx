"use client";

import { useState } from "react";

import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { Button } from "@/app/(site)/components/ui/button";

export type InspectionProcessProps = {
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  steps: ReadonlyArray<{
    step: string;
    title: string;
    description: string;
    icon: SiteImageSource;
    iconAlt: string;
    image: SiteImageSource;
    imageAlt: string;
  }>;
};

export function InspectionProcess({
  eyebrow,
  title,
  ctaLabel,
  ctaHref,
  steps,
}: InspectionProcessProps) {
  const [active, setActive] = useState(0);
  const activeStep = steps[active] ?? steps[0];

  if (!activeStep) return null;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
        <div className="mx-auto w-full max-w-[420px] lg:mx-0">
          <SiteImage
            src={activeStep.image}
            alt={activeStep.imageAlt}
            className="h-auto w-full max-h-[620px] object-contain"
          />
        </div>

        <div>
          <p className="inline-flex rounded-full bg-[#f68b1f] px-3 py-1 font-ui text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
            {eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[30px] font-bold leading-[1.16] text-[#1b2f4b] sm:text-[38px] lg:text-[44px]">
            {title}
          </h2>

          <div className="relative mt-8">
            {steps.length > 1 ? (
              <div
                aria-hidden="true"
                className="absolute left-[34px] top-[70px] bottom-[92px] hidden border-l-2 border-dashed border-[#aec0ce] sm:block"
              />
            ) : null}

            <div className="space-y-3">
              {steps.map((item, index) => (
                <button
                  key={`${item.step}-${item.title}`}
                  type="button"
                  onFocus={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={[
                    "group grid w-full grid-cols-[56px_1fr] gap-5 rounded-[8px] p-3 text-left transition-colors sm:grid-cols-[68px_1fr] sm:gap-7",
                    index === active
                      ? "bg-[#1468ba]/10"
                      : "hover:bg-[#1468ba]/8",
                  ].join(" ")}
                >
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#1468ba] shadow-[0_12px_30px_-18px_rgba(20,104,186,0.95)] sm:h-[60px] sm:w-[60px]">
                    <SiteImage
                      src={item.icon}
                      alt={item.iconAlt}
                      className="h-8 w-8 object-contain brightness-0 invert sm:h-9 sm:w-9"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-ui text-[13px] font-bold leading-5 text-[#7d8da3]">
                      {item.step}
                    </span>
                    <span className="mt-1 block font-display text-[22px] font-bold leading-[1.2] text-[#1b2f4b] sm:text-[24px]">
                      {item.title}
                    </span>
                    <span className="mt-2 block font-ui text-[15px] leading-7 text-[#41546e] sm:text-[17px]">
                      {item.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-center sm:justify-start sm:pl-[100px]">
              <Button
                href={ctaHref}
                className="min-h-12 w-full max-w-[420px] rounded-[10px] text-[16px] sm:text-[18px]"
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
