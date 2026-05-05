import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";
import { Button } from "@/app/(site)/components/ui/button";

const LOGO_CHEX_IMAGE =
  "https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/logo-chex.png";
const GOOGLE_REVIEW_LOGO =
  "https://www.gstatic.com/images/branding/product/1x/googleg_64dp.png";
const GOOGLE_REVIEW_LINK =
  "https://www.google.com/search?q=chex.ai&sca_esv=393fe94135c43729&gl=us&hl=en&pws=0&sxsrf=ANbL-n4obf_WmJWKaa4aVCOwo7ZKvKblzw%3A1777974250419&ei=6rv5aaWjGdymkdUPlbbi0Ac&biw=1536&bih=730&ved=0ahUKEwilwPac7qGUAxVcU6QEHRWbGHoQ4dUDCBM&uact=5&oq=chex.ai&gs_lp=Egxnd3Mtd2l6LXNlcnAiB2NoZXguYWkyBBAAGB4yBBAAGB4yBBAAGB4yBBAAGB4yBBAAGB4yBBAAGB4yBBAAGB4yBBAAGB4yBBAAGB4yBBAAGB5IiAlQvwNYoQdwAXgAkAEAmAH5AaABzQOqAQMyLTK4AQPIAQD4AQGYAgOgAtsDwgIMEAAYgAQYDRiwAxgKwgIJEAAYBxgeGLADwgIKEAAYgAQYDRiwA8ICBBAjGCfCAgsQABiABBiKBRiRAsICBRAuGIAEwgIFEAAYgASYAwCIBgGQBgiSBwUxLjAuMqAH1w-yBwMyLTK4B9cDwgcFMC4yLjHIBwmACAE&sclient=gws-wiz-serp";

export type LocationHeroProps = {
  rating: string;
  ratingBadgeImage?: SiteImageSource;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  helperText: string;
  demoHref: string;
  stats: ReadonlyArray<{
    value: string;
    label: string;
  }>;
  locations: ReadonlyArray<{
    label: string;
    image: SiteImageSource;
    featured?: boolean;
  }>;
  sectionClassName?: string;
  layoutClassName: string;
  ratingContainerClassName?: string;
  titleClassName: string;
  descriptionClassName: string;
  googleReview?: {
    label: string;
    reviewLinkHref: string;
    reviewLinkLabel: string;
    score: string;
    stars: number;
    logo?: SiteImageSource;
  };
};

function StarIcon() {
  return (
    <svg viewBox="0 0 14 14" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
      <path
        d="M7 1.05l1.77 3.58 3.95.57-2.86 2.79.68 3.94L7 10.07l-3.54 1.86.68-3.94L1.28 5.2l3.95-.57L7 1.05Z"
        fill="#ff7a01"
      />
    </svg>
  );
}

function GoogleReviewWidget({
  googleReview,
  ratingContainerClassName,
}: Pick<LocationHeroProps, "googleReview" | "ratingContainerClassName">) {
  const review = {
    label: googleReview?.label || "Google Rating",
    logo: googleReview?.logo || GOOGLE_REVIEW_LOGO,
    reviewLinkHref: googleReview?.reviewLinkHref || GOOGLE_REVIEW_LINK,
    reviewLinkLabel: googleReview?.reviewLinkLabel || "See all our reviews",
    score: googleReview?.score || "4.8",
    stars: Math.max(1, Math.min(5, googleReview?.stars ?? 5)),
  };

  return (
    <div
      className={[
        "inline-flex w-fit min-h-[64px] items-center gap-2 rounded-[10px] border border-[#e4e9f2] bg-white/90 px-2 py-1.5 shadow-[0_18px_45px_-30px_rgba(27,47,75,0.5)] sm:min-h-[72px] sm:px-2.5 sm:py-2",
        ratingContainerClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SiteImage
        src={review.logo}
        alt="Google"
        className="mx-2 h-10 w-10 object-contain sm:mx-3 sm:h-12 sm:w-12"
      />
      <div className="min-w-0">
        <p className="font-ui text-[16px] font-semibold leading-none text-[#5f6368] sm:text-[18px]">
          {review.label}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <span className="font-display text-[20px] font-bold leading-none text-[#f6a300] sm:text-[24px]">
            {review.score}
          </span>
          <span className="flex items-center gap-1">
            {Array.from({ length: review.stars }).map((_, index) => (
              <StarIcon key={index} />
            ))}
          </span>
        </div>
        <a
          href={review.reviewLinkHref}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block font-ui text-[10px] text-[#6d7178] underline decoration-[#6d7178]/40 underline-offset-2 hover:text-[#1b2f4b] sm:text-[11px]"
        >
          {review.reviewLinkLabel}
        </a>
      </div>
    </div>
  );
}

function OrbitMap({ locations }: Pick<LocationHeroProps, "locations">) {
  const positions = [
    "left-[56%] top-[7%]",
    "left-[16%] top-[22%]",
    "left-[72%] top-[30%]",
    "left-[16%] top-[52%]",
    "left-[58%] top-[58%]",
    "left-[42%] top-[35%]",
    "left-[35%] top-[80%]",
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[650px]">
      <div className="absolute inset-0 rounded-full bg-[#ff7a01]/5" />
      <div className="absolute inset-[15%] rounded-full border border-dashed border-[#ff7a01]/25" />
      <div className="absolute inset-[27%] rounded-full border border-dashed border-[#ff7a01]/25" />
      <div className="absolute inset-[39%] rounded-full border border-dashed border-[#ff7a01]/25" />

      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#fff1e5] shadow-[0_20px_70px_-36px_rgba(255,122,1,0.55)] sm:h-32 sm:w-32">
        <SiteImage
          src={LOGO_CHEX_IMAGE}
          alt="Chex.AI"
          className="h-7 w-auto sm:h-8"
          priority
        />
      </div>

      {locations.map((location, index) => {
        const position =
          positions[index] ?? positions[positions.length - 1] ?? "";
        const isFeatured = Boolean(location.featured);

        return (
          <div
            key={location.label}
            className={["absolute flex items-center gap-2", position].join(" ")}
          >
            <span
              className={[
                "relative shrink-0",
                isFeatured ? "h-[82px] w-[82px]" : "h-[61px] w-[61px]",
              ].join(" ")}
            >
              <span className="absolute inset-0 rounded-full bg-[#ff7a01]" />
              <span className="absolute inset-[6px] rounded-full bg-white" />
              <SiteImage
                src={location.image}
                alt=""
                className={[
                  "absolute rounded-full object-cover",
                  isFeatured
                    ? "inset-[8px] h-[66px] w-[66px]"
                    : "inset-[6px] h-[49px] w-[49px]",
                ].join(" ")}
              />
            </span>
            <span
              className={[
                "rounded-full border border-white bg-[#fff0e8] font-display text-[#1b2f4b]/65 shadow-sm",
                isFeatured
                  ? "px-4 py-1.5 text-[14px] font-bold"
                  : "px-3 py-1 text-[10px] font-medium",
              ].join(" ")}
            >
              {location.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function LocationHero({
  title,
  description,
  primaryLabel,
  secondaryLabel: _secondaryLabel,
  helperText,
  demoHref,
  stats,
  locations,
  sectionClassName = "",
  layoutClassName,
  ratingContainerClassName = "",
  titleClassName,
  descriptionClassName,
  googleReview,
}: LocationHeroProps) {
  return (
    <section
      className={[
        "px-4 pb-16 pt-14 sm:px-6 lg:px-10 lg:pb-24 lg:pt-20",
        sectionClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "mx-auto grid max-w-[1240px] items-center gap-10",
          layoutClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <OrbitMap locations={locations} />

        <div>
          <GoogleReviewWidget
            googleReview={googleReview}
            ratingContainerClassName={ratingContainerClassName}
          />

          <h1
            className={["mt-8 text-[#1b2f4b]", titleClassName]
              .filter(Boolean)
              .join(" ")}
          >
            {title}
          </h1>
          <p
            className={[
              "type-body-lg mt-6 text-[#41546e]",
              descriptionClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {description}
          </p>

          <div className="mt-8 grid max-w-2xl gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-[32px] font-bold leading-none text-[#111]">
                  {stat.value}
                </div>
                <div className="mt-2 font-display text-[18px] font-medium leading-tight text-[#111] sm:text-[22px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={demoHref || "#signup"}>{primaryLabel}</Button>
          </div>
          <p className="type-body-sm mt-4 capitalize text-[#010e2b]/80">
            {helperText}
          </p>
        </div>
      </div>
    </section>
  );
}
