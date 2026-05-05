'use client'
/* eslint-disable @next/next/no-img-element */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { SectionHeading } from '@/app/(site)/components/ui/section-heading'

type TestimonialAsset = string

const QUOTE_IMAGE =
  'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/testimonial-quotes.svg'

const AUTO_ADVANCE_MS = 3000
const GAP_PX = 32
const SM_MIN_PX = 640
const TRANSITION_MS = 480
const TRANSITION_EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

export type LocationTestimonialsProps = {
  title: string
  description: string
  label: string
  quoteImage?: TestimonialAsset
  starImage?: TestimonialAsset
  items: ReadonlyArray<{
    name: string
    quote: string
    stars: number
  }>
}

type Item = LocationTestimonialsProps['items'][number]

type TrackEntry = {
  item: Item
  key: string
}

function buildTrack(items: ReadonlyArray<Item>, visible: 1 | 2): TrackEntry[] {
  const n = items.length
  if (n === 0) return []
  if (visible === 1) {
    return [
      ...items.map((item, i) => ({ item, key: `c-${i}` })),
      { item: items[0]!, key: 'c-clone' },
    ]
  }
  return [
    ...items.map((item, i) => ({ item, key: `c-${i}` })),
    { item: items[0]!, key: 'c-h0' },
    { item: items[1 % n]!, key: 'c-h1' },
  ]
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function useSmUp() {
  const [smUp, setSmUp] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SM_MIN_PX}px)`)
    const sync = () => setSmUp(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return smUp
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduced
}

export function LocationTestimonials({
  title,
  description,
  label,
  quoteImage: customQuoteImage,
  items,
}: LocationTestimonialsProps) {
  const count = items.length
  const smUp = useSmUp()
  const reducedMotion = useReducedMotion()

  const visible: 1 | 2 = smUp && count >= 2 ? 2 : 1
  const track = buildTrack(items, visible)
  const maxSlide = count

  const viewportRef = useRef<HTMLDivElement>(null)
  const [stepPx, setStepPx] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [transitionOn, setTransitionOn] = useState(true)
  const [hoverPaused, setHoverPaused] = useState(false)

  const busyRef = useRef(false)
  const slideIndexRef = useRef(0)
  slideIndexRef.current = slideIndex

  const measure = useCallback(() => {
    const el = viewportRef.current
    if (!el || count < 1) {
      setStepPx(0)
      return
    }
    const w = el.getBoundingClientRect().width
    if (w <= 0) {
      setStepPx(0)
      return
    }
    if (visible === 2) {
      const card = (w - GAP_PX) / 2
      setStepPx(card + GAP_PX)
    } else {
      setStepPx(w + GAP_PX)
    }
  }, [count, visible])

  useLayoutEffect(() => {
    measure()
  }, [measure, track.length])

  useEffect(() => {
    const el = viewportRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => measure())
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  useEffect(() => {
    setSlideIndex(0)
  }, [visible, count])

  const resolvedQuoteImage = customQuoteImage ?? QUOTE_IMAGE

  const canSlide = count > 1 && stepPx > 0
  const transitionMs = reducedMotion ? 0 : TRANSITION_MS
  const transitionStyle =
    transitionOn && transitionMs > 0
      ? `transform ${transitionMs}ms ${TRANSITION_EASE}`
      : 'none'

  const goNext = useCallback(() => {
    const idx = slideIndexRef.current
    if (!canSlide || busyRef.current || idx >= maxSlide) return
    busyRef.current = true
    setTransitionOn(true)
    const next = idx + 1
    setSlideIndex(next)
    if (reducedMotion) {
      queueMicrotask(() => {
        if (next >= maxSlide) {
          setSlideIndex(0)
        }
        busyRef.current = false
      })
    }
  }, [canSlide, maxSlide, reducedMotion])

  const goPrev = useCallback(() => {
    const idx = slideIndexRef.current
    if (!canSlide || busyRef.current) return
    busyRef.current = true
    if (idx === 0) {
      setTransitionOn(false)
      setSlideIndex(maxSlide)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionOn(true)
          setSlideIndex(maxSlide - 1)
          if (reducedMotion) {
            queueMicrotask(() => {
              busyRef.current = false
            })
          }
        })
      })
      return
    }
    setTransitionOn(true)
    setSlideIndex(idx - 1)
    if (reducedMotion) {
      queueMicrotask(() => {
        busyRef.current = false
      })
    }
  }, [canSlide, maxSlide, reducedMotion])

  const handleTrackTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (reducedMotion) return
      if (e.propertyName !== 'transform' || e.target !== e.currentTarget) return
      const idx = slideIndexRef.current
      if (idx === maxSlide && maxSlide > 0) {
        setTransitionOn(false)
        setSlideIndex(0)
        requestAnimationFrame(() => {
          setTransitionOn(true)
        })
      }
      busyRef.current = false
    },
    [maxSlide, reducedMotion],
  )

  const goNextRef = useRef(goNext)
  goNextRef.current = goNext

  useEffect(() => {
    if (!canSlide || hoverPaused) return
    const id = window.setInterval(() => {
      goNextRef.current()
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [canSlide, hoverPaused])

  const translatePx = slideIndex * stepPx
  const cardWidthPx = stepPx > GAP_PX ? stepPx - GAP_PX : undefined

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading title={title} description={description} />

        <div className="relative mt-16 overflow-hidden bg-white px-2 py-8 sm:px-6 lg:px-8">
          <img
            src={resolvedQuoteImage}
            alt=""
            className="pointer-events-none absolute right-[12%] top-6 h-20 w-auto opacity-10 sm:h-28"
          />

          {count > 0 ? (
            <div
              className="relative mx-auto w-full max-w-[880px] lg:max-w-[1040px] xl:max-w-[1180px]"
              role="region"
              aria-roledescription="carousel"
              aria-label={label}
            >
              <div className="flex items-start gap-6 sm:gap-10 lg:gap-14">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!canSlide}
                  aria-label="Previous testimonials"
                  className="mt-16 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#e8e8e8] bg-white text-[#1b2f4b] shadow-[0_12px_32px_0_rgba(21,21,21,0.08)] transition hover:border-[#1368b9] hover:text-[#1368b9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1368b9] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35 sm:mt-20 sm:h-12 sm:w-12"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>

                <div
                  ref={viewportRef}
                  className="min-w-0 flex-1 overflow-hidden bg-white"
                  onMouseEnter={() => setHoverPaused(true)}
                  onMouseLeave={() => setHoverPaused(false)}
                >
                  {count === 1 ? (
                    <TestimonialCard item={items[0]!} />
                  ) : (
                    <div
                      className="flex bg-white"
                      style={{
                        gap: GAP_PX,
                        transform: `translate3d(-${translatePx}px,0,0)`,
                        transition: transitionStyle,
                      }}
                      onTransitionEnd={handleTrackTransitionEnd}
                    >
                      {track.map(({ item, key }) => (
                        <div
                          key={key}
                          className="shrink-0"
                          style={{
                            width: cardWidthPx,
                          }}
                        >
                          <TestimonialCard item={item} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canSlide}
                  aria-label="Next testimonials"
                  className="mt-16 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#e8e8e8] bg-white text-[#1b2f4b] shadow-[0_12px_32px_0_rgba(21,21,21,0.08)] transition hover:border-[#1368b9] hover:text-[#1368b9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1368b9] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35 sm:mt-20 sm:h-12 sm:w-12"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function TestimonialStarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={['text-[#ff9900]', className].filter(Boolean).join(' ')}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

function TestimonialStars({ stars }: { stars: number }) {
  const total = Math.max(1, Math.min(5, stars))
  return (
    <div className="flex gap-1" aria-label={`${total} out of 5 stars`}>
      {Array.from({ length: total }).map((_, i) => (
        <TestimonialStarIcon key={i} className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
      ))}
    </div>
  )
}

function TestimonialCard({ item }: { item: Item }) {
  const avatarLetter = item.name.trim().charAt(0).toUpperCase() || 'R'
  return (
    <div className="group h-full min-h-0 cursor-default rounded-[16px] bg-[#e8e8e8] p-px transition-colors duration-200 ease-out group-hover:bg-[#1368b9] sm:rounded-[20px]">
      <div className="isolate flex h-full min-h-0 flex-col overflow-hidden rounded-[15px] bg-white p-6 text-left shadow-none transition-colors duration-200 ease-out [backface-visibility:hidden] [transform:translateZ(0)] group-hover:bg-[#1368b9] sm:rounded-[19px] sm:p-7">
        <TestimonialStars stars={item.stars} />
        <p className="font-ui mt-8 min-h-[5rem] flex-1 text-pretty text-[15px] font-normal leading-[1.55] text-[#666666] transition-colors duration-200 group-hover:text-white/90 sm:min-h-[5.5rem] sm:text-base sm:leading-[1.6]">
          {item.quote}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1368b9] font-ui text-[16px] font-bold text-white">
            {avatarLetter}
          </div>
          <p className="font-ui text-[18px] font-bold leading-snug text-black transition-colors duration-200 group-hover:text-white sm:text-[20px]">
            {item.name}
          </p>
        </div>
      </div>
    </div>
  )
}
