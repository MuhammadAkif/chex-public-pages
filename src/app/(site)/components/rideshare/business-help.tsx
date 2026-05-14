import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { Button } from "@/app/(site)/components/ui/button";

export type BusinessHelpProps = {
  titleLead: string;
  titleHighlight: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  image: SiteImageSource;
  imageAlt: string;
};

export function BusinessHelp({
  titleLead,
  titleHighlight,
  description,
  buttonLabel,
  buttonHref,
  image,
  imageAlt,
}: BusinessHelpProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-[32px] font-bold leading-tight text-[#1b2f4b] sm:text-[42px] lg:text-[48px]">
            {titleLead}{" "}
            <span className="text-[#ff9900]">{titleHighlight}</span>
          </h2>
          <p className="mt-5 max-w-xl font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px]">
            {description}
          </p>
          <div className="mt-7">
            <Button href={buttonHref} size="lg" className="rounded-[8px] px-8">
              {buttonLabel}
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <SiteImage
            src={image}
            alt={imageAlt}
            className="h-auto w-full max-w-[520px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
