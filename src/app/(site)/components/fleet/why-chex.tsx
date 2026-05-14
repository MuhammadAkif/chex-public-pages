import {
  SiteImage,
  type SiteImageSource,
} from "@/app/(site)/components/shared/site-image";

export type WhyChexProps = {
  titleLead: string;
  titleHighlight: string;
  rows: ReadonlyArray<{
    heading: string;
    description: string;
    image: SiteImageSource;
    imageAlt: string;
  }>;
};

export function WhyChex({ titleLead, titleHighlight, rows }: WhyChexProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="text-center font-display text-[34px] font-bold leading-tight text-[#1b2f4b] sm:text-[44px]">
          <span className="text-[#ff9900]">{titleLead}</span> {titleHighlight}
        </h2>

        <div className="mt-12 space-y-16 lg:space-y-24">
          {rows.map((row, index) => {
            const reverse = index % 2 === 1;
            return (
              <div
                key={row.heading}
                className={`grid items-center gap-8 lg:gap-16 ${
                  reverse ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1fr_1fr]"
                }`}
              >
                <div className={reverse ? "lg:order-2" : "lg:order-1"}>
                  <div className="mx-auto max-w-md rounded-[24px] bg-[#f4f8ff] p-8 sm:p-10">
                    <h3 className="font-display text-[24px] font-bold leading-tight text-[#1b2f4b] sm:text-[28px]">
                      {row.heading}
                    </h3>
                    <p className="mt-4 font-ui text-[16px] leading-7 text-[#41546e] sm:text-[17px]">
                      {row.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex justify-center ${
                    reverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <SiteImage
                    src={row.image}
                    alt={row.imageAlt}
                    className="h-auto w-full max-w-[320px] object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
