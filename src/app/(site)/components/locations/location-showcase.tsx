'use client'

import { useEffect, useRef } from 'react'

const SHOWCASE_VIDEO_SRC =
  'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/chex-ai-location.mp4'

export type LocationShowcaseProps = Record<string, unknown>

export function LocationShowcase(_: LocationShowcaseProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const shouldPlayRef = useRef(false)
  const isPlayingRef = useRef(false)
  const hasUnlockedAudioRef = useRef(false)
  const playRequestRef = useRef<Promise<void> | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current

    if (!container || !video) {
      return
    }

    video.pause()
    video.currentTime = 0
    video.muted = true
    video.volume = 1
    shouldPlayRef.current = false
    isPlayingRef.current = false
    hasUnlockedAudioRef.current = false

    const playVideo = async () => {
      if (!shouldPlayRef.current || isPlayingRef.current || playRequestRef.current) {
        return
      }

      const playPromise = video.play()
      playRequestRef.current = playPromise

      try {
        await playPromise

        if (shouldPlayRef.current) {
          isPlayingRef.current = true
          return
        }

        video.pause()
      } catch {
        isPlayingRef.current = false
      } finally {
        playRequestRef.current = null
      }
    }

    const pauseVideo = () => {
      if (!isPlayingRef.current && video.paused) {
        return
      }

      video.pause()
      isPlayingRef.current = false
    }

    const unlockAudio = () => {
      if (hasUnlockedAudioRef.current) {
        return
      }

      hasUnlockedAudioRef.current = true
      video.muted = false

      if (shouldPlayRef.current) {
        void playVideo()
      }
    }

    const handlePointerDown = () => {
      unlockAudio()
    }

    const handleKeyDown = () => {
      unlockAudio()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.5)

        if (isVisible === shouldPlayRef.current) {
          return
        }

        shouldPlayRef.current = isVisible

        if (isVisible) {
          void playVideo()
          return
        }

        pauseVideo()
      },
      {
        threshold: [0, 0.5, 1],
      },
    )

    observer.observe(container)
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      observer.disconnect()
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
      shouldPlayRef.current = false
      pauseVideo()
    }
  }, [])

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div
        ref={containerRef}
        className="mx-auto min-h-[256px] max-w-[1240px] overflow-hidden rounded-[38px] border border-[#2563eb]/30 bg-[#d8e0e7] shadow-[0_22px_64px_0_rgba(30,27,75,0.08)] sm:min-h-[400px] lg:min-h-[515px]"
      >
        <video
          ref={videoRef}
          src={SHOWCASE_VIDEO_SRC}
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
        />
      </div>
    </section>
  )
}
