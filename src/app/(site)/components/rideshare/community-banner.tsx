export type CommunityBannerProps = {
  title: string;
  stats: ReadonlyArray<{
    value: string;
    label: string;
  }>;
};

export function CommunityBanner({ title, stats }: CommunityBannerProps) {
  return (
    <section className="bg-[#1468ba] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1240px] text-center">
        <h2 className="font-display text-[28px] font-bold leading-tight text-white sm:text-[36px]">
          {title}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              className={`flex flex-col items-center ${
                index === 1
                  ? "sm:border-x sm:border-white/30 sm:px-6"
                  : "sm:px-6"
              }`}
            >
              <p className="font-display text-[48px] font-bold leading-none text-white sm:text-[56px]">
                {stat.value}
              </p>
              <p className="mt-2 font-ui text-[16px] text-white/85 sm:text-[18px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
