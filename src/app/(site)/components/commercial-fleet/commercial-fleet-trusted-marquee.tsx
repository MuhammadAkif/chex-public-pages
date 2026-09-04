'use client'

import { useEffect, useRef } from 'react'

import { trustedLogoStyle } from './commercial-fleet-community'

const ITEM_GAP = 16 // gap-4

type ImageLogo = { image: string; label: string }

/**
 * Animated, infinitely-scrolling "Trusted by …" row — the same marquee
 * treatment as the home/rideshare page. Renders image-logo cards when
 * `imageLogos` are provided (matching the rideshare card UI), otherwise falls
 * back to the commercial-fleet wordmark cards.
 */
export function CommercialFleetTrustedMarquee({
  logos,
  imageLogos,
}: {
  logos: ReadonlyArray<string>
  imageLogos?: ReadonlyArray<ImageLogo>
}) {
  const imgs = imageLogos ?? []
  const useImages = imgs.length > 0
  const count = useImages ? imgs.length : logos.length
  const loopImages = useImages ? [...imgs, ...imgs] : []
  const loopWordmarks = useImages ? [] : [...logos, ...logos]

  const innerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const halfWidthRef = useRef(0)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    function measureHalfWidth() {
      const children = Array.from(el!.children) as HTMLElement[]
      let w = 0
      for (let i = 0; i < count; i++) {
        w += children[i]?.offsetWidth ?? 0
      }
      halfWidthRef.current = w + count * ITEM_GAP
    }

    measureHalfWidth()
    const ro = new ResizeObserver(measureHalfWidth)
    ro.observe(el)

    let progress = 0
    let lastTime: number | null = null
    const totalMs = 22000

    function frame(now: number) {
      if (lastTime === null) lastTime = now
      const dt = Math.min(now - lastTime, 100)
      lastTime = now

      progress = (progress + dt / totalMs) % 1

      const w = halfWidthRef.current
      if (w > 0) {
        el!.style.transform = `translateX(${-progress * w}px)`
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [count])

  return (
    <div className="relative mt-10 overflow-hidden">
      <div ref={innerRef} className="flex gap-4 will-change-transform">
        {useImages
          ? loopImages.map((logo, index) => (
              <div
                key={`${logo.label}-${index}`}
                className="flex h-24 w-[180px] flex-none items-center justify-center rounded-[12px] bg-white px-6 py-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.image} alt={logo.label} className="h-12 w-auto object-contain" />
              </div>
            ))
          : loopWordmarks.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex h-[100px] w-[200px] flex-none items-center justify-center rounded-[16px] bg-white px-4 lg:h-[120px]"
              >
                <span className={`font-display font-bold ${trustedLogoStyle(logo)}`}>{logo}</span>
              </div>
            ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1b1c20] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1b1c20] to-transparent" />
    </div>
  )
}
