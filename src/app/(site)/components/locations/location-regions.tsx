/* eslint-disable @next/next/no-img-element */

import { RichText } from "@/app/(site)/components/shared/rich-text";

const LINK_CLASS =
  "[&_a]:font-semibold [&_a]:text-[#1368b9] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#3d8fd9]";

export type LocationRegionsProps = {
  title: string;
  description: string;
  demoHref: string;
  sectionClassName?: string;
  headingClassName: string;
  titleClassName?: string;
  articleClassName: string;
  items: ReadonlyArray<{
    city: string;
    description: string;
    image: string;
  }>;
};

export function LocationRegions({
  title,
  description,
  demoHref: _demoHref,
  sectionClassName = "",
  headingClassName,
  titleClassName = "",
  articleClassName,
  items,
}: LocationRegionsProps) {
  return (
    <section
      className={[
        "bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-24",
        sectionClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto max-w-[1240px]">
        <div
          className={["mx-auto text-center", headingClassName]
            .filter(Boolean)
            .join(" ")}
        >
          <RichText
            as="h2"
            className={[
              "type-location-heading text-[#1b2f4b]",
              LINK_CLASS,
              titleClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            html={title}
          />
          <RichText
            as="p"
            className={`type-location-body mt-6 text-[#41546e] ${LINK_CLASS}`}
            html={description}
          />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.city}
              className={[
                "grid overflow-hidden rounded-[16px] bg-[#f0f6ff]",
                articleClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <img
                src={item.image}
                alt={item.city}
                className="h-[280px] w-full object-cover sm:h-[310px] lg:h-[350px]"
              />
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <h3 className="font-display text-[36px] font-bold leading-tight text-[#1b1c20] sm:text-[40px]">
                  {item.city}
                </h3>
                <RichText
                  as="p"
                  className={`type-location-body mt-4 text-[#41546e] ${LINK_CLASS}`}
                  html={item.description}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
