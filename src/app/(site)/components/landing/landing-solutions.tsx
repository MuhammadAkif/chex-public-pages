import { RichText } from '@/app/(site)/components/shared/rich-text'
import { SiteImage } from '@/app/(site)/components/shared/site-image'

import { LandingDemoButton } from './landing-demo-button'
import type { LandingSolutionVariant } from '@/app/(site)/landing-page/content'

type Block = {
  label: string
  title: string
  description: string
  bullets: ReadonlyArray<string>
  buttonLabel: string
  image: string
  variant: LandingSolutionVariant
}

type LandingSolutionsProps = {
  title: string
  description: string
  blocks: ReadonlyArray<Block>
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff1e6]">
      <svg viewBox="0 0 24 24" fill="none" className="h-[14px] w-[14px]" aria-hidden>
        <path
          d="m5 12 4.5 4.5L19 7"
          stroke="#ff7a01"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

const cardClasses: Record<LandingSolutionVariant, string> = {
  full: 'overflow-hidden rounded-[24px]',
  'card-light':
    'rounded-[24px] bg-[linear-gradient(145deg,#f4f6f9_0%,#eef1f6_100%)] p-6 sm:p-10',
  'card-peach':
    'rounded-[24px] bg-[radial-gradient(120%_120%_at_70%_20%,#ffe9d6_0%,#fff6ef_55%,#fbeede_100%)] p-6 sm:p-10',
}

function FeatureImage({ image, title, variant }: { image: string; title: string; variant: LandingSolutionVariant }) {
  return (
    <div className={cardClasses[variant]}>
      <SiteImage
        src={image}
        alt={title}
        className={
          variant === 'full'
            ? 'h-full w-full object-cover'
            : 'mx-auto w-full max-w-[460px] object-contain'
        }
      />
    </div>
  )
}

function FeatureBlock({ block }: { block: Block }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-5">
        <p className="font-display text-[14px] font-medium text-[#ff6b1a]">{block.label}</p>
        <h3 className="font-display text-[28px] font-bold leading-[1.15] tracking-[-0.8px] text-[#1b2f4b] sm:text-[40px]">
          {block.title}
        </h3>
        <RichText
          as="p"
          html={block.description}
          className="max-w-[560px] font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px] [&_strong]:font-semibold [&_strong]:text-[#1b2f4b] [&_strong]:underline [&_strong]:decoration-[#ff7a01]/40 [&_strong]:underline-offset-4"
        />
        <ul className="mt-1 flex flex-col gap-4">
          {block.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <CheckIcon />
              <span className="font-ui text-[16px] leading-6 text-[#41546e] sm:text-[18px]">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <LandingDemoButton>{block.buttonLabel}</LandingDemoButton>
        </div>
      </div>

      <FeatureImage image={block.image} title={block.title} variant={block.variant} />
    </div>
  )
}

export function LandingSolutions({ title, description, blocks }: LandingSolutionsProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="font-display text-[30px] font-bold leading-[1.12] tracking-[-1px] text-[#1b2f4b] sm:text-[46px]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] font-ui text-[16px] leading-7 text-[#41546e] sm:text-[18px]">
            {description}
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {blocks.map((block) => (
            <FeatureBlock key={block.title} block={block} />
          ))}
        </div>
      </div>
    </section>
  )
}
