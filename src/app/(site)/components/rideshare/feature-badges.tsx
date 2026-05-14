import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";

export type FeatureBadgesProps = {
  title?: string;
  badges: ReadonlyArray<{
    image: SiteImageSource;
    imageAlt: string;
    heading: string;
    description: string;
  }>;
};

export function FeatureBadges({ title, badges }: FeatureBadgesProps) {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      {title ? (
        <h2 className="text-center font-display text-[32px] font-semibold leading-tight text-[#1b2f4b] sm:text-[40px]">
          {title}
        </h2>
      ) : null}
      <div className="mx-auto mt-10 grid max-w-[1300px] gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {badges.map((badge) => (
          <article
            key={badge.heading}
            className="flex flex-col items-center text-center"
          >
            <SiteImage
              src={badge.image}
              alt={badge.imageAlt}
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />
            <h3 className="mt-5 font-display text-[22px] font-semibold leading-tight text-[#1b2f4b] sm:text-[24px]">
              {badge.heading}
            </h3>
            <p className="mt-3 max-w-sm font-ui text-[15px] leading-7 text-[#41546e] sm:text-[16px]">
              {badge.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
