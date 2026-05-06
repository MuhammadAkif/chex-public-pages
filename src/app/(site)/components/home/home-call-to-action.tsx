"use client";

import { Button } from "@/app/(site)/components/ui/button";

type HomeCallToActionProps = {
  title: string;
  description: string;
  secondaryLabel: string;
  helperText: string;
};

export function HomeCallToAction({
  title,
  description,
  secondaryLabel,
  helperText,
}: HomeCallToActionProps) {
  return (
    <section className="px-4 pt-20 pb-20 sm:px-6 lg:px-10 lg:pt-28 lg:pb-28">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_50%_100%,rgba(19,104,185,0.9)_0%,rgba(19,104,185,0.2)_26%,rgba(255,122,1,0.35)_58%,rgba(27,28,32,1)_100%)] shadow-[0_40px_120px_-70px_rgba(19,104,185,0.8)]">
        <div className="absolute inset-0 bg-[#1b1c20]/60" />
        <div className="relative z-10 px-6 py-16 text-center text-white sm:px-12 lg:py-20">
          <h2 className="type-section-heading mx-auto max-w-4xl text-white lg:text-[64px] lg:leading-[1.18]">
            {title}
          </h2>
          <p className="type-body-lg mx-auto mt-8 max-w-3xl text-white/90">
            {description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#footer">{secondaryLabel}</Button>
          </div>

          <p className="type-body-lg mt-6 text-white/90">{helperText}</p>
        </div>
      </div>
    </section>
  );
}
