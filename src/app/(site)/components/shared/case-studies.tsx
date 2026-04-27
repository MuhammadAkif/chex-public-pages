'use client'
/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from 'react'

import { Reveal, RevealArticle } from '@/app/(site)/components/shared/reveal'
import { SiteImage, type SiteImageSource } from '@/app/(site)/components/shared/site-image'

type CaseStudyImage = SiteImageSource

type CaseStudy = {
  metric: string
  title: string
  description: string
  image: CaseStudyImage
  caption?: string
  linkHref?: string
  linkLabel?: string
}

type CaseStudiesProps = {
  title: string
  heading?: ReactNode
  items: ReadonlyArray<CaseStudy>
  arrowImage: SiteImageSource
  sectionClassName: string
  scrollClassName: string
  articleClassName: string
  imageClassName: string
  arrowClassName: string
  metricClassName: string
  titleClassName: string
  descriptionClassName: string
  captionClassName?: string
  linkClassName?: string
}

function CaseStudyBackgroundImage({
  image,
  title,
  className,
}: {
  image: CaseStudyImage
  title: string
  className: string
}) {
  if (typeof image === 'string') {
    return <img src={image} alt={title} className={className} />
  }

  return <SiteImage src={image} alt={title} className={className} />
}

export function CaseStudies({
  title,
  heading,
  items,
  arrowImage,
  sectionClassName,
  scrollClassName,
  articleClassName,
  imageClassName,
  arrowClassName,
  metricClassName,
  titleClassName,
  descriptionClassName,
  captionClassName = '',
  linkClassName = '',
}: CaseStudiesProps) {
  return (
    <section id="case-studies" className={sectionClassName}>
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          {heading ?? <h2 className="type-section-heading text-center text-white">{title}</h2>}
        </Reveal>

        <div className={scrollClassName}>
          <div className="flex min-w-max gap-6 px-1">
            {items.map((item, index) => (
              <RevealArticle
                key={`${item.metric}-${item.title}`}
                className={`${articleClassName} ${index % 2 === 1 ? 'mt-16' : ''}`}
                delayMs={Math.min(index, 5) * 90}
                variant="scale-in"
              >
                <CaseStudyBackgroundImage
                  image={item.image}
                  title={item.title}
                  className={imageClassName}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(102,102,102,0)_18%,rgba(19,104,185,0.92)_100%)]" />

                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <SiteImage src={arrowImage} alt="" className={arrowClassName} />

                  {item.caption ? (
                    <div className="flex items-start gap-4">
                      <div className={metricClassName}>{item.metric}</div>
                      <p className={captionClassName}>{item.caption}</p>
                    </div>
                  ) : (
                    <div className={metricClassName}>{item.metric}</div>
                  )}

                  <div className={titleClassName}>{item.title}</div>
                  <p className={descriptionClassName}>{item.description}</p>

                  {item.linkHref && item.linkLabel ? (
                    <a href={item.linkHref} className={linkClassName}>
                      {item.linkLabel}
                    </a>
                  ) : null}
                </div>
              </RevealArticle>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
