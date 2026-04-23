'use client'

import { southCarolinaContent } from '@/app/(site)/locations/south-carolina/content'
import { CaseStudies } from '@/app/(site)/components/shared/case-studies'
import { Reveal } from '@/app/(site)/components/shared/reveal'

import { SouthCarolinaDiagnostics } from './south-carolina-diagnostics'
import { SouthCarolinaFaq } from './south-carolina-faq'
import { SouthCarolinaHero } from './south-carolina-hero'
import { SouthCarolinaIntelligence } from './south-carolina-intelligence'
import { SouthCarolinaManage } from './south-carolina-manage'
import { SouthCarolinaOverview } from './south-carolina-overview'
import { SouthCarolinaServices } from './south-carolina-services'
import { SouthCarolinaTestimonials } from './south-carolina-testimonials'
import { SouthCarolinaCta } from './south-carolina-cta'

export function SouthCarolinaPage() {
  return (
    <div
      id="top"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_9%,#ffffff_22%,#ffffff_100%)] text-[#1b2f4b]"
    >
      <main className="overflow-hidden">
        <Reveal>
          <SouthCarolinaHero
            rating={southCarolinaContent.hero.rating}
            title={southCarolinaContent.hero.title}
            description={southCarolinaContent.hero.description}
            primaryLabel={southCarolinaContent.hero.primaryLabel}
            secondaryLabel={southCarolinaContent.hero.secondaryLabel}
            helperText={southCarolinaContent.hero.helperText}
            stats={southCarolinaContent.hero.stats}
            locations={southCarolinaContent.hero.locations}
          />
        </Reveal>
        <Reveal>
          <SouthCarolinaOverview
            title={southCarolinaContent.overview.title}
            paragraphs={southCarolinaContent.overview.paragraphs}
            image={southCarolinaContent.overview.image}
          />
        </Reveal>
        <Reveal>
          <SouthCarolinaServices
            eyebrow={southCarolinaContent.services.eyebrow}
            title={southCarolinaContent.services.title}
            description={southCarolinaContent.services.description}
            items={southCarolinaContent.services.items}
            ctaLabel={southCarolinaContent.services.ctaLabel}
          />
        </Reveal>
        <Reveal>
          <SouthCarolinaIntelligence
            title={southCarolinaContent.intelligence.title}
            description={southCarolinaContent.intelligence.description}
            buttonLabel={southCarolinaContent.intelligence.buttonLabel}
            items={southCarolinaContent.intelligence.items}
          />
        </Reveal>
        <Reveal>
          <SouthCarolinaDiagnostics
            title={southCarolinaContent.diagnostics.title}
            description={southCarolinaContent.diagnostics.description}
            items={southCarolinaContent.diagnostics.items}
          />
        </Reveal>
        <Reveal>
          <SouthCarolinaManage
            title={southCarolinaContent.manage.title}
            bullets={southCarolinaContent.manage.bullets}
            buttonLabel={southCarolinaContent.manage.buttonLabel}
            frameImage={southCarolinaContent.manage.frameImage}
            screenImage={southCarolinaContent.manage.screenImage}
          />
        </Reveal>
        <CaseStudies
          title={southCarolinaContent.caseStudies.title}
          items={southCarolinaContent.caseStudies.items.map((item) => ({
            ...item,
            linkHref: '#south-carolina-demo',
            linkLabel: 'Read more...',
          }))}
          arrowImage={southCarolinaContent.caseStudies.arrowImage}
          sectionClassName="bg-[#010e2b] px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-28"
          scrollClassName="mt-14 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          articleClassName="group relative h-[485px] w-[320px] overflow-hidden rounded-[12px] border border-white sm:w-[388px]"
          imageClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          arrowClassName="pointer-events-none absolute right-8 top-[44%] h-16 w-16 -rotate-90 object-contain opacity-95 sm:h-20 sm:w-20"
          metricClassName="font-display text-[64px] font-bold leading-[70.4px] tracking-[-0.05em]"
          captionClassName="mt-5 max-w-[8rem] font-display text-[20px] font-medium leading-5"
          titleClassName="font-display text-[28px] font-medium leading-[1.2]"
          descriptionClassName="type-body-md mt-4 max-w-[21rem] text-white/92"
          linkClassName="mt-4 font-display text-[18px] font-bold text-[#ff7a01]"
        />
        <Reveal>
          <SouthCarolinaTestimonials
            title={southCarolinaContent.testimonials.title}
            description={southCarolinaContent.testimonials.description}
            label={southCarolinaContent.testimonials.label}
            items={southCarolinaContent.testimonials.items}
          />
        </Reveal>
        <Reveal>
          <SouthCarolinaFaq
            title={southCarolinaContent.faq.title}
            description={southCarolinaContent.faq.description}
            items={southCarolinaContent.faq.items}
          />
        </Reveal>
        <Reveal>
          <SouthCarolinaCta
            title={southCarolinaContent.cta.title}
            description={southCarolinaContent.cta.description}
            primaryLabel={southCarolinaContent.cta.primaryLabel}
            secondaryLabel={southCarolinaContent.cta.secondaryLabel}
            helperText={southCarolinaContent.cta.helperText}
            image={southCarolinaContent.cta.image}
          />
        </Reveal>
      </main>
    </div>
  )
}
