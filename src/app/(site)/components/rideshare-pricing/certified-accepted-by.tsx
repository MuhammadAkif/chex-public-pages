import { SiteImage } from "@/app/(site)/components/shared/site-image";
import type { RidesharePricingAcceptedBy } from "@/app/(site)/rideshare-pricing/content";

export function CertifiedAcceptedBy({
  acceptedBy,
}: {
  acceptedBy: RidesharePricingAcceptedBy;
}) {
  return (
    <section className="bg-white px-4 pb-8 pt-12 sm:px-6 lg:px-10 lg:pb-10 lg:pt-14">
      <div className="mx-auto max-w-[1160px]">
        <p className="text-center font-ui text-[13px] font-semibold uppercase tracking-[0.08em] text-[#63757f]">
          {acceptedBy.title}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 sm:gap-x-16">
          {acceptedBy.logos.map((logo) => (
            <SiteImage
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className={`w-auto object-contain opacity-90 ${
                logo.className ?? "h-10 sm:h-12"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
