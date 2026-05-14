import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";

export type BackedCompaniesProps = {
  techstarsImage: SiteImageSource;
  techstarsImageAlt: string;
  logos: ReadonlyArray<{
    src: SiteImageSource;
    alt: string;
  }>;
};

export function BackedCompanies({
  techstarsImage,
  techstarsImageAlt,
  logos,
}: BackedCompaniesProps) {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-center justify-center gap-2 font-display text-[20px] font-semibold text-[#1b2f4b] sm:text-[26px] lg:text-[28px]">
          <span>A</span>
          <SiteImage
            src={techstarsImage}
            alt={techstarsImageAlt}
            className="h-6 w-auto object-contain sm:h-8"
          />
          <span>backed company</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex h-16 items-center justify-center"
            >
              <SiteImage
                src={logo.src}
                alt={logo.alt}
                className="max-h-12 w-auto object-contain sm:max-h-14"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
