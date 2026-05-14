"use client";

import { useEffect, useRef, useState } from "react";

import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { Button } from "@/app/(site)/components/ui/button";

export type RideshareHeroProps = {
  variant: "uber-lyft" | "rideshare";
  backgroundImage: SiteImageSource;
  previewImage: SiteImageSource;
  previewImageAlt: string;
  titleLead: string;
  titleHighlight: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  counterIcon: SiteImageSource;
  counterIconAlt: string;
  counterLabel: string;
  counterDescription: string;
  partnerLogos?: ReadonlyArray<{
    src: SiteImageSource;
    alt: string;
  }>;
};

const TARGET_INSPECTION_COUNT = 123321;
const COUNT_ANIMATION_MS = 2000;

function easeOutQuad(t: number) {
  return t * (2 - t);
}

export function RideshareHero({
  backgroundImage,
  previewImage,
  previewImageAlt,
  titleLead,
  titleHighlight,
  description,
  ctaLabel,
  ctaHref,
  counterIcon,
  counterIconAlt,
  counterLabel,
  counterDescription,
  partnerLogos,
}: RideshareHeroProps) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / COUNT_ANIMATION_MS, 1);
      setCount(Math.floor(TARGET_INSPECTION_COUNT * easeOutQuad(progress)));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setCount(TARGET_INSPECTION_COUNT);
        setIsAnimating(false);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const bgSrc =
    typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src;

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgSrc})` }}
    >
      <div className="absolute inset-0 bg-white/40" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10 lg:pb-20 lg:pt-16">
        <div>
          {partnerLogos && partnerLogos.length > 0 ? (
            <div className="mb-7 flex flex-wrap items-center gap-5">
              {partnerLogos.map((logo) => (
                <SiteImage
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-9 w-auto object-contain sm:h-10"
                />
              ))}
            </div>
          ) : null}

          <h1 className="font-display text-[40px] font-bold uppercase leading-[1.08] text-[#1b2f4b] sm:text-[52px] lg:text-[64px]">
            <span className="text-[#ff7a01]">{titleHighlight}</span>{" "}
            <span className="text-[#1b2f4b]">{titleLead}</span>
          </h1>

          <p className="mt-5 max-w-xl whitespace-pre-line font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px]">
            {description}
          </p>

          <div className="mt-8">
            <Button href={ctaHref} size="lg" className="rounded-[8px] px-8">
              {ctaLabel}
            </Button>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/90 px-5 py-2 shadow-[0_18px_40px_-26px_rgba(19,104,185,0.55)]">
              <SiteImage
                src={counterIcon}
                alt={counterIconAlt}
                className="h-6 w-6 object-contain"
              />
              <span
                className={`font-display text-[24px] font-bold leading-none text-[#1b2f4b] ${
                  isAnimating ? "transition-opacity" : ""
                }`}
              >
                {count.toLocaleString()}
              </span>
            </div>
            <p className="max-w-md font-ui text-[14px] leading-6 text-[#41546e] sm:text-[15px]">
              <span className="font-semibold text-[#1b2f4b]">
                {counterLabel}
              </span>{" "}
              {counterDescription}
            </p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <SiteImage
            src={previewImage}
            alt={previewImageAlt}
            className="h-auto w-full max-w-[560px] object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
