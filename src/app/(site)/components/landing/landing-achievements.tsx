import { LandingDemoButton } from './landing-demo-button'

type LandingAchievementsProps = {
  title: string
  description: string
  backgroundImage: string
  stats: ReadonlyArray<{ value: string; label: string }>
  note: string
  buttonLabel: string
}

export function LandingAchievements({
  title,
  description,
  backgroundImage,
  stats,
  note,
  buttonLabel,
}: LandingAchievementsProps) {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="relative overflow-hidden rounded-[24px] bg-[#1b1c20] px-6 py-12 text-white sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,21,25,0.92)_0%,rgba(20,21,25,0.62)_45%,rgba(20,21,25,0.86)_100%)]"
          />

          <div className="relative">
            <h2 className="font-display text-[34px] font-bold tracking-[-1px] sm:text-[48px]">
              {title}
            </h2>
            <p className="mt-3 max-w-[640px] font-ui text-[15px] text-white/80 sm:text-[18px]">
              {description}
            </p>

            <div className="mt-12 flex flex-wrap gap-x-20 gap-y-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[44px] font-bold leading-none sm:text-[64px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-ui text-[15px] text-white/85 sm:text-[18px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-[640px] font-ui text-[12px] capitalize leading-5 text-white/70 sm:text-[13px]">
                {note}
              </p>
              <LandingDemoButton>{buttonLabel}</LandingDemoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
