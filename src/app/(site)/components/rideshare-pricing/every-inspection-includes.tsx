import type {
  RidesharePricingBandContent,
  RidesharePricingBandItem,
} from "@/app/(site)/rideshare-pricing/content";

function BandIcon({ icon }: { icon: RidesharePricingBandItem["icon"] }) {
  switch (icon) {
    case "clock":
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "calendar":
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
        </svg>
      );
    case "scan":
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
          <path d="M7.5 12h9" />
        </svg>
      );
    case "refresh":
    default:
      return (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 11a8 8 0 0 0-13.6-4.6L4 8M4 4v4h4M4 13a8 8 0 0 0 13.6 4.6L20 16M20 20v-4h-4" />
        </svg>
      );
  }
}

export function EveryInspectionIncludes({
  band,
}: {
  band: RidesharePricingBandContent;
}) {
  return (
    <section className="bg-[#1368b9] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-center font-display text-[28px] font-bold tracking-[-0.03em] text-white lg:text-[40px]">
          {band.title}
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {band.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-5 rounded-[18px] border-[1.5px] border-[#e2e9f7] bg-white/50 px-6 py-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-white text-[#1368b9] shadow-[0_6px_16px_-8px_rgba(9,44,88,0.5)]">
                <BandIcon icon={item.icon} />
              </span>
              <div>
                <p className="font-display text-[18px] font-bold text-[#1b2f4b]">
                  {item.title}
                </p>
                <p className="mt-1 font-ui text-[14.5px] text-[#1b2f4b]/70">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
