'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useCallback, useRef } from 'react'

type RevealVariant = 'fade-up' | 'fade-in' | 'scale-in'

type RevealBaseProps = {
  children: ReactNode
  className?: string
  delayMs?: number
  variant?: RevealVariant
}

function useReveal() {
  const cleanupRef = useRef<(() => void) | null>(null)

  const setElement = useCallback((element: HTMLElement | null) => {
    cleanupRef.current?.()
    cleanupRef.current = null

    if (!element) {
      return
    }

    element.dataset.revealReady = 'true'

    const cleanup = () => {
      delete element.dataset.revealReady
      delete element.dataset.revealVisible
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      element.dataset.revealVisible = 'true'
      cleanupRef.current = cleanup
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.dataset.revealVisible = 'true'
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    )

    observer.observe(element)

    cleanupRef.current = () => {
      observer.disconnect()
      cleanup()
    }
  }, [])

  return setElement
}

function revealClassName(className: string) {
  return ['motion-reveal', className].filter(Boolean).join(' ')
}

function revealStyle(delayMs: number): CSSProperties {
  return {
    '--reveal-delay': `${delayMs}ms`,
  } as CSSProperties
}

export function Reveal({
  children,
  className = '',
  delayMs = 0,
  variant = 'fade-up',
}: RevealBaseProps) {
  const setElement = useReveal()

  return (
    <div
      ref={setElement}
      className={revealClassName(className)}
      data-reveal-ready="false"
      data-reveal-variant={variant}
      style={revealStyle(delayMs)}
    >
      {children}
    </div>
  )
}

export function RevealArticle({
  children,
  className = '',
  delayMs = 0,
  variant = 'fade-up',
}: RevealBaseProps) {
  const setElement = useReveal()

  return (
    <article
      ref={setElement}
      className={revealClassName(className)}
      data-reveal-ready="false"
      data-reveal-variant={variant}
      style={revealStyle(delayMs)}
    >
      {children}
    </article>
  )
}
