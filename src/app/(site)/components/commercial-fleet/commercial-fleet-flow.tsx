'use client'

import { useEffect, useRef } from 'react'

import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

import { fleetAssets } from './assets'

type FlowProps = CommercialFleetContent['flow']
type Step = FlowProps['steps'][number]

// Vertical offset (px) added per card so each pins a little lower than the one
// before it — the peek that makes the stacked deck visible.
const PEEK = 30

function StepCard({
  step,
  index,
  cardRef,
}: {
  step: Step
  index: number
  cardRef: (el: HTMLElement | null) => void
}) {
  return (
    <article
      ref={cardRef}
      // Sticky stacking: cards pin around the middle of the viewport; a small
      // running JS effect scales each covered card down (see the parent) so the
      // deck tapers like the Tidio reference.
      style={{ top: `calc(26vh + ${index * PEEK}px)`, transformOrigin: 'center top', willChange: 'transform' }}
      className="sticky overflow-hidden rounded-[32px] border border-[#d9dfe6] bg-[#f8fafd] p-6 shadow-[0_40px_90px_-40px_rgba(14,22,36,0.35)] sm:p-10"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {/* Icon + big index */}
        <div className="flex items-center gap-4 lg:w-[84px] lg:flex-col lg:items-start lg:gap-2">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] bg-[#1368b9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fleetAssets.flowIcons[index]} alt="" className="h-6 w-6" />
          </span>
          <span className="font-display text-[48px] font-black leading-none tracking-[-1.5px] text-black lg:text-[60px]">
            {step.number}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1">
          <h3 className="font-display text-[24px] font-black tracking-[-0.9px] text-[#1b2f4b] lg:text-[30px]">
            {step.title}
          </h3>
          <p className="mt-2 max-w-[620px] font-display text-[16px] leading-[26px] text-black">
            {step.description}
          </p>
          {step.pills.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {step.pills.map((pill) => (
                <li
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d9dfe6] bg-[rgba(14,22,36,0.03)] px-3 py-1.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={fleetAssets.flowPillCheck} alt="" className="h-3.5 w-3.5" />
                  <span className="font-display text-[12px] font-medium text-black">{pill}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Step label + metric (omitted when the design has none) */}
        {step.metricLabel || step.metric ? (
          <div className="lg:w-[140px] lg:shrink-0 lg:text-right">
            {step.metricLabel ? (
              <p className="font-display text-[11px] font-bold uppercase tracking-[2.2px] text-black">
                {step.metricLabel}
              </p>
            ) : null}
            {step.metric ? (
              <p className="mt-1 font-display text-[18px] font-black text-[#ff7a01]">{step.metric}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function CommercialFleetFlow({ title, description, steps }: FlowProps) {
  const cardsRef = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const cards = cardsRef.current.filter((c): c is HTMLElement => c !== null)
    if (cards.length < 2) return

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
    let raf = 0

    const update = () => {
      raf = 0
      const vh = window.innerHeight
      cards.forEach((card, i) => {
        const ri = card.getBoundingClientRect()
        // Sum how far each later card has come up to cover this one (0..1 each),
        // so a card sitting behind two others shrinks roughly twice as much.
        let covered = 0
        for (let j = i + 1; j < cards.length; j++) {
          const rj = cards[j].getBoundingClientRect()
          const start = ri.top + vh * 0.55 // next card is half a screen below → 0
          const end = ri.top + (j - i) * PEEK // next card fully stacked → 1
          covered += clamp((start - rj.top) / (start - end), 0, 1)
        }
        const scale = 1 - covered * 0.05
        card.style.transform = covered > 0.001 ? `scale(${scale})` : ''
      })
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [steps.length])

  return (
    <section className="bg-white px-4 pt-20 pb-20 sm:px-6 lg:px-10 lg:pt-28 lg:pb-28">
      <div className="mx-auto max-w-[1080px]">
        <div className="mx-auto max-w-[842px] text-center">
          <h2 className="font-display text-[32px] font-bold leading-[1.14] tracking-[-0.043em] text-[#1b2f4b] sm:text-[44px] lg:text-[56px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[842px] font-display text-[16px] font-normal leading-relaxed text-[#41546e] sm:text-[18px]">
            {description}
          </p>
        </div>

        <div className="mt-14 space-y-6">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              cardRef={(el) => {
                cardsRef.current[index] = el
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
