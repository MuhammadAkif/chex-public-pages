import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { Button } from "@/app/(site)/components/ui/button";

export type FleetHeroProps = {
  backgroundImage: SiteImageSource;
  previewImage: SiteImageSource;
  previewImageAlt: string;
  titleHighlight: string;
  titleTail: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
};

export function FleetHero({
  backgroundImage,
  previewImage,
  previewImageAlt,
  titleHighlight,
  titleTail,
  description,
  ctaLabel,
  ctaHref,
}: FleetHeroProps) {
  const bgSrc =
    typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src;

  return (
    <section
      className="px-4 pb-16 pt-14 sm:px-6 lg:px-10 lg:pb-24 lg:pt-20 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgSrc})` }}
    >
      <div className="absolute inset-0 bg-white/70" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10 lg:pb-24 lg:pt-24">
        <div>
          <h1 className="font-display text-[36px] font-bold leading-[1.12] text-[#1b2f4b] sm:text-[48px] lg:text-[58px]">
            <span className="text-[#1368b9]">{titleHighlight}</span>{" "}
            <span className="text-[#1b2f4b]">{titleTail}</span>
          </h1>
          {description ? (
            <p className="mt-5 max-w-xl font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px]">
              {description}
            </p>
          ) : null}
          <div className="mt-9">
            <Button href={ctaHref} size="lg" className="rounded-[8px] px-8">
              {ctaLabel}
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <SiteImage
            src={previewImage}
            alt={previewImageAlt}
            className="h-auto w-full max-w-[600px] object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
