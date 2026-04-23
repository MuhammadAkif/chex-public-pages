import { Button } from '@/app/(site)/components/ui/button'

type LocationShowcaseVisual =
  | {
      variant: 'processing'
      showGlow?: boolean
    }
  | {
      variant: 'preview'
      label: string
    }

export type LocationShowcaseProps = {
  title: string
  description: string
  buttonLabel: string
  demoHref: string
  items: ReadonlyArray<{
    number: string
    title: string
    description: string
  }>
  visual: LocationShowcaseVisual
}

function ProcessingVisual() {
  return (
    <div className="mt-16 overflow-hidden rounded-[38px] border border-[#2563eb]/30 bg-[#d8e0e7] shadow-[0_22px_64px_0_rgba(30,27,75,0.08)]">
      <div className="relative min-h-[360px] overflow-hidden rounded-[38px] bg-[#d8e0e7] sm:min-h-[500px] lg:min-h-[644px]">
        <div className="absolute -left-[10%] top-[4%] h-[74%] w-[72%] rounded-[55%_45%_52%_48%] bg-[#3d5f84]" />
        <div className="absolute left-[5%] top-[8%] h-[82%] w-[88%] rounded-[46%_54%_58%_42%] bg-[#d8e0e7]" />
        <div className="absolute right-[-8%] top-[10%] h-[78%] w-[58%] rounded-[48%_52%_58%_42%] bg-[#3d5f84]" />
        <div className="absolute right-[8%] top-[16%] h-[70%] w-[56%] rounded-[54%_46%_48%_52%] bg-[#d8e0e7]" />
      </div>
    </div>
  )
}

function PreviewVisual({ label }: { label: string }) {
  return (
    <div className="mt-16 overflow-hidden rounded-[38px] border border-[#2563eb]/30 bg-[#f0f6ff] p-5 shadow-[0_22px_64px_0_rgba(30,27,75,0.08)]">
      <div className="grid min-h-[22rem] place-items-center rounded-[30px] bg-[radial-gradient(circle_at_34%_26%,rgba(19,104,185,0.9)_0%,rgba(19,104,185,0.18)_24%,rgba(255,122,1,0.35)_58%,rgba(27,28,32,0.96)_100%)] p-8 text-center text-white">
        <div>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#ff7a01] shadow-[0_20px_60px_-30px_rgba(255,122,1,0.9)]">
            ▶
          </div>
          <p className="type-ui-label mt-6 text-white/78">{label}</p>
        </div>
      </div>
    </div>
  )
}

export function LocationShowcase({
  title,
  description,
  buttonLabel,
  demoHref,
  items,
  visual,
}: LocationShowcaseProps) {
  return (
    <section className="relative bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      {visual.variant === 'processing' && visual.showGlow ? (
        <div className="pointer-events-none absolute right-[4%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(255,122,1,0.15)_0%,_rgba(255,122,1,0)_72%)] blur-3xl" />
      ) : null}
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="type-location-heading text-[#1b2f4b]">{title}</h2>
          <p className="type-location-body mt-6 text-[#41546e]">{description}</p>
        </div>

        <div className="mt-14 grid gap-x-20 gap-y-12 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.number}>
              <div className="font-display text-[40px] font-bold leading-none text-[#ff7a01]">
                {item.number}
              </div>
              <h3 className="mt-5 font-display text-[28px] font-bold capitalize leading-normal text-[#41546e] sm:text-[32px]">
                {item.title}
              </h3>
              <p className="type-location-body mt-5 max-w-xl text-[#41546e]">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href={demoHref} className="min-w-[305px]">
            {buttonLabel}
          </Button>
        </div>

        {visual.variant === 'processing' ? (
          <ProcessingVisual />
        ) : (
          <PreviewVisual label={visual.label} />
        )}
      </div>
    </section>
  )
}
