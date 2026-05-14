import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";

export type KeyBenefitsProps = {
  titleLead: string;
  titleTail: string;
  intro: string;
  highlight: string;
  details: ReadonlyArray<string>;
  image: SiteImageSource;
  imageAlt: string;
};

export function KeyBenefits({
  titleLead,
  titleTail,
  intro,
  highlight,
  details,
  image,
  imageAlt,
}: KeyBenefitsProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex justify-center">
          <SiteImage
            src={image}
            alt={imageAlt}
            className="h-auto w-full max-w-[520px] object-contain"
          />
        </div>
        <div>
          <h2 className="font-display text-[32px] font-bold leading-tight text-[#1b2f4b] sm:text-[42px] lg:text-[48px]">
            <span className="text-[#ff9900]">{titleLead}</span> {titleTail}
          </h2>
          <p className="mt-5 font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px]">
            {intro}
          </p>
          <div className="mt-6 rounded-[16px] bg-[#f4f8ff] p-6 sm:p-7">
            <p className="font-ui text-[16px] font-medium leading-7 text-[#1b2f4b] sm:text-[18px]">
              {highlight}
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {details.map((detail) => (
              <li
                key={detail}
                className="font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px]"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
