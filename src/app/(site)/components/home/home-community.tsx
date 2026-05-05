"use client";

import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { SurfaceCard } from "@/app/(site)/components/ui/surface-card";

const COMMUNITY_RIGHT_IMAGE =
  "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/Group%2048095685.png";

type HomeCommunityProps = {
  title: string;
  subtitle: string;
  stats: ReadonlyArray<{
    value: string;
    label: string;
    tone: string;
  }>;
  manageTitle: string;
  manageBullets: ReadonlyArray<string>;
  manageImage: SiteImageSource;
  trustedTitle: string;
  trustedLogos: ReadonlyArray<{
    image: SiteImageSource;
    label: string;
  }>;
};

export function HomeCommunity({
  title,
  subtitle,
  stats,
  manageTitle,
  manageBullets,
  manageImage,
  trustedTitle,
  trustedLogos,
}: HomeCommunityProps) {
  const toneClasses: Record<string, string> = {
    sky: "bg-[#bad9f7] text-[#111111]",
    sand: "bg-[#f8e4d2] text-[#111111]",
    ice: "bg-[#eef5ff] text-[#111111]",
  };
  const [titlePrefix, titleSuffix = ""] = title.split("Chex.AI");

  return (
    <section className="bg-[#1b1c20] px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="type-section-heading">
            {titlePrefix}
            <span>
              Chex.<span className="text-[#ff7a01]">AI</span>
            </span>
            {titleSuffix}
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <SurfaceCard
                key={stat.label}
                className={`px-6 py-8 text-center ${toneClasses[stat.tone] ?? toneClasses.ice}`}
              >
                <div className="font-display text-[44px] font-bold leading-none">
                  {stat.value}
                </div>
                <div className="type-body-md mt-2 leading-normal">
                  {stat.label}
                </div>
              </SurfaceCard>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-4xl text-balance font-display text-3xl font-bold leading-[1.28] tracking-[-0.04em] text-white sm:text-4xl lg:text-[56px] lg:leading-[1.257]">
            {subtitle.split("mobility industry")[0]}
          </p>
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h3 className="type-section-title max-w-xl text-white">
              {manageTitle}
            </h3>

            <ul className="mt-8 space-y-5">
              {manageBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="type-body-md flex items-start gap-4 text-white/78"
                >
                  <span className="mt-2 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-[#ff7a01]/40 bg-[#ff7a01]/15 text-[10px] text-[#ff7a01]">
                    ✓
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[650px]">
            <div className="absolute -left-6 top-6 rounded-[12px] border border-[#fb7b04]/80 bg-[linear-gradient(123deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.04)_100%)] p-4 shadow-[0_20px_50px_-20px_rgba(69,69,69,0.55)] backdrop-blur-xl sm:-left-10 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ff7a01] text-white">
                  ✓
                </span>
                <p className="font-ui max-w-[200px] text-[16px] font-medium leading-6 text-[#1b1c20]">
                  <span className="font-semibold">AI-powered</span> scan
                  complete exterior condition verified with high precision.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border-8 border-[#d5d5d5] bg-white p-4 shadow-[0_50px_120px_-70px_rgba(0,0,0,0.65)]">
              <SiteImage
                src={COMMUNITY_RIGHT_IMAGE || manageImage}
                alt="Chex.AI mobile and desktop inspection interfaces"
                className="h-auto w-full rounded-[22px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 rounded-[28px] bg-[radial-gradient(circle_at_50%_88%,rgba(19,104,185,0.95)_0%,rgba(19,104,185,0.25)_28%,rgba(255,122,1,0.48)_56%,rgba(8,14,28,0.92)_100%)] px-6 py-10 shadow-[0_40px_120px_-80px_rgba(255,122,1,0.7)] sm:px-10">
          <h3 className="mx-auto max-w-3xl text-center font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
            Trusted by{" "}
            <span className="text-white/70">
              {trustedTitle.replace("Trusted by ", "")}
            </span>
          </h3>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {trustedLogos.map((logo, index) => (
              <div
                key={`${logo.label}-${index}`}
                className="flex min-h-24 items-center justify-center rounded-[12px] bg-white px-6 py-5"
              >
                <SiteImage
                  src={logo.image}
                  alt={logo.label}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
