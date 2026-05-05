"use client";

import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { Button } from "@/app/(site)/components/ui/button";

const REVIEW_CARD_IMAGE =
  "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/review%20card.png";

type HomeBusinessHelpProps = {
  title: string;
  description: string;
  buttonLabel: string;
  image: SiteImageSource;
};

export function HomeBusinessHelp({
  title,
  description,
  buttonLabel,
  image,
}: HomeBusinessHelpProps) {
  return (
    <section
      id="business-help"
      className="px-4 pb-16 pt-20 sm:px-6 lg:px-10 lg:pb-24 lg:pt-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative">
            <div className="pointer-events-none absolute -left-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.3)_0%,_rgba(255,122,1,0)_72%)] blur-2xl" />
            <h2 className="type-section-heading max-w-md text-white">
              {title}
            </h2>
            <p className="type-body-lg mt-8 max-w-lg text-white/80">
              {description}
            </p>
            <div className="mt-10">
              <Button href="#footer">{buttonLabel}</Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative translate-y-6 overflow-hidden rounded-[16px]  border-white/10 p-4 shadow-[0_40px_120px_-60px_rgba(19,104,185,0.6)]">
              <SiteImage
                src={REVIEW_CARD_IMAGE || image}
                alt="Chex analytics dashboard"
                className="h-auto w-full rounded-[12px] object-cover"
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[12px] bg-gradient-to-t from-black/80 via-black/55 to-transparent px-11 pb-12 pt-7 text-white sm:px-12 sm:pb-14 sm:pt-8">
                <p className="font-ui text-[22px] leading-[1.2] sm:text-[24px]">
                  Fast and easy!... Received my certificate{" "}
                  <span className="text-[#1488ff]">within 5 minutes</span> after
                  submitting the inspection.
                </p>
                <p className="font-ui mt-4 text-[34px] font-semibold leading-none">
                  Cary Gillies
                </p>
                <p className="font-ui mt-2 text-[24px] leading-none text-white/82">
                  Founder: @XYZ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
