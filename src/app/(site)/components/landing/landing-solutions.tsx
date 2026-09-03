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
  overlayImage?: string
  variant: LandingSolutionVariant
}

type LandingSolutionsProps = {
  title: string
  description: string
  blocks: ReadonlyArray<Block>
}

// Orange circular check badge imported from the Figma landing design
// (node 1511-753): a solid #FF7A01 disc with the tick knocked out in white.
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 h-6 w-6 shrink-0"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#FF7A01" />
      <path
        d="M12.0001 20C7.58892 20 4 16.4113 4 12C4 7.58874 7.58892 4 12.0001 4C14.5289 4 16.8553 5.15788 18.3828 7.17679C18.6662 7.55115 18.63 8.07682 18.2979 8.40894L11.8168 14.8902C11.4498 15.2573 10.8541 15.2573 10.4872 14.8902L8.22576 12.6287C7.85837 12.2616 7.85837 11.6663 8.22576 11.2991C8.59291 10.9319 9.18844 10.9319 9.55536 11.2991L11.1521 12.8956L16.3517 7.69574C15.2077 6.53345 13.6609 5.88036 12.0001 5.88036C8.62587 5.88036 5.88056 8.6257 5.88056 12C5.88056 15.3743 8.62587 18.1196 12.0001 18.1196C15.3744 18.1196 18.1197 15.3743 18.1197 12C18.1197 11.4808 18.5407 11.0598 19.0598 11.0598C19.579 11.0598 20 11.4808 20 12C20 16.4113 16.4113 20 12.0001 20Z"
        fill="white"
      />
    </svg>
  )
}

const cardClasses: Record<LandingSolutionVariant, string> = {
  full: 'overflow-hidden rounded-[24px]',
  'card-light':
    'rounded-[24px] bg-[linear-gradient(145deg,#f4f6f9_0%,#eef1f6_100%)] p-6 sm:p-10',
  'card-peach':
    'rounded-[24px] bg-[linear-gradient(180deg,#F1F1F1_0%,rgba(255,122,1,0.30)_100%)] p-6 sm:p-10',
}

// Every solution panel renders inside a fixed 550×511 box (aspect-ratio
// 127/118) so the image div is the same size across sections regardless of the
// illustration's own aspect.
const PANEL_FRAME = 'relative mx-auto aspect-[127/118] w-full max-w-[550px]'

function FeatureImage({
  image,
  overlayImage,
  title,
  variant,
}: {
  image: string
  overlayImage?: string
  title: string
  variant: LandingSolutionVariant
}) {
  const picture = (
    <SiteImage
      src={image}
      alt={title}
      className={
        variant === 'full'
          ? 'h-full w-full object-cover'
          : 'h-full w-full object-contain'
      }
    />
  )

  // The image stays clipped to rounded corners inside the panel, while the
  // overlay card is a sibling of the panel so it can overhang the left edge.
  // Each overlay section uses a distinct variant, so positioning is keyed off
  // the variant:
  //  - full (Fleet): wide status strip, bottom-left, ~half out on desktop
  //  - card-light (Insurance): tall document card, ~55% out, lower-left
  //  - card-peach (Rental): wide health strip, ~20% out, lower area
  const overlayClassName: Record<LandingSolutionVariant, string> = {
    full: 'absolute bottom-[6%] left-[5%] w-[64%] max-w-[320px] drop-shadow-[0_22px_45px_rgba(13,27,52,0.32)] lg:left-0 lg:w-[60%] lg:-translate-x-1/2',
    'card-light':
      'absolute bottom-[2%] left-[2%] w-[42%] max-w-[230px] drop-shadow-[0_22px_45px_rgba(13,27,52,0.32)] lg:left-0 lg:-translate-x-[55%]',
    'card-peach':
      'absolute bottom-[10%] left-[3%] w-[88%] max-w-[440px] drop-shadow-[0_22px_45px_rgba(13,27,52,0.32)] lg:left-0 lg:-translate-x-[20%]',
  }

  return (
    <div className={PANEL_FRAME}>
      <div className={`h-full w-full ${cardClasses[variant]}`}>{picture}</div>
      {overlayImage ? (
        <SiteImage src={overlayImage} alt="" className={overlayClassName[variant]} />
      ) : null}
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

      <FeatureImage
        image={block.image}
        overlayImage={block.overlayImage}
        title={block.title}
        variant={block.variant}
      />
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
