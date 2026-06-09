'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { useRef } from 'react'

import { SiteImage } from '@/app/(site)/components/shared/site-image'

type Article = { tag: string; title: string; image: string; href?: string }

type LandingArticlesProps = {
  eyebrow: string
  title: string
  items: ReadonlyArray<Article>
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === 'left' ? 'M19 12H5m0 0 6 6m-6-6 6-6' : 'M5 12h14m0 0-6-6m6 6-6 6'}
      />
    </svg>
  )
}

function ArticleCard({ article }: { article: Article }) {
  const inner = (
    <>
      <div className="h-[230px] w-full overflow-hidden rounded-[16px] bg-[#e4ebf5] sm:h-[260px]">
        {article.image ? (
          <SiteImage
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1368b9]/15 to-[#ff7a01]/10">
            <span className="font-display text-[48px] font-bold text-[#1368b9]/30">
              {article.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {article.tag ? (
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a01]" />
            <span className="font-ui text-[14px] font-medium text-[#ff7a01]">{article.tag}</span>
          </span>
        ) : null}
        <p className="font-display text-[18px] font-medium leading-snug text-[#111827] sm:text-[20px]">
          {article.title}
        </p>
      </div>
    </>
  )

  const className =
    'group block w-[300px] shrink-0 snap-start sm:w-[360px] lg:w-auto lg:shrink'

  return article.href ? (
    <Link href={article.href as Route} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  )
}

export function LandingArticles({ eyebrow, title, items }: LandingArticlesProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (amount: number) => {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-6 border-b border-[#e7e7e7] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <p className="font-ui text-[12px] font-medium tracking-[0.04em] text-[#ff7a01]">
              {eyebrow}
            </p>
            <h2 className="max-w-[680px] font-display text-[30px] font-bold leading-[1.1] tracking-[-1px] text-[#1b2f4b] sm:text-[44px]">
              {title}
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-380)}
              aria-label="Previous articles"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#1b2f4b] text-white transition hover:bg-[#26405f]"
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(380)}
              aria-label="Next articles"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#ff7a01] text-white transition hover:bg-[#eb7200]"
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x gap-6 overflow-x-auto pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {items.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
