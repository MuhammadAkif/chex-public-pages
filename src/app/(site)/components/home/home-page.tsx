'use client'

import { homeContent } from '@/app/(site)/home/content'

import { HomeBusinessHelp } from './home-business-help'
import { HomeCallToAction } from './home-call-to-action'
import { HomeCaseStudies } from './home-case-studies'
import { HomeCommunity } from './home-community'
import { HomeHero } from './home-hero'
import { HomeHowItWorks } from './home-how-it-works'
import { HomeKeyDifferentiators } from './home-key-differentiators'
import { HomeBenefits } from './home-benefits'
import { HomeTestimonials } from './home-testimonials'

export function HomePage() {
  return (
    <div
      id="top"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_18%,#ffffff_100%)] text-[#1b2f4b]"
    >
      <main className="overflow-hidden">
        <HomeHero
          rating={homeContent.hero.rating}
          title={homeContent.hero.title}
          description={homeContent.hero.description}
          primaryLabel={homeContent.hero.primaryLabel}
          secondaryLabel={homeContent.hero.secondaryLabel}
          helperText={homeContent.hero.helperText}
          media={homeContent.hero.media}
        />

        <HomeCommunity
          title={homeContent.community.title}
          subtitle={homeContent.community.subtitle}
          stats={homeContent.community.stats}
          manageTitle={homeContent.community.manageTitle}
          manageBullets={homeContent.community.manageBullets}
          manageImage={homeContent.community.manageImage}
          trustedTitle={homeContent.community.trustedTitle}
          trustedLogos={homeContent.community.trustedLogos}
        />

        <HomeHowItWorks
          title={homeContent.howItWorks.title}
          description={homeContent.howItWorks.description}
          steps={homeContent.howItWorks.steps}
        />

        <HomeBenefits title={homeContent.benefits.title} items={homeContent.benefits.items} />

        <HomeKeyDifferentiators
          title={homeContent.keyDifferentiators.title}
          items={homeContent.keyDifferentiators.items}
          image={homeContent.keyDifferentiators.image}
        />

        <section className="bg-[linear-gradient(180deg,#07132d_0%,#03112a_100%)]">
          <HomeBusinessHelp
            title={homeContent.businessHelp.title}
            description={homeContent.businessHelp.description}
            buttonLabel={homeContent.businessHelp.buttonLabel}
            image={homeContent.businessHelp.image}
          />

          <HomeCaseStudies
            title={homeContent.caseStudies.title}
            items={homeContent.caseStudies.items}
            arrowImage={homeContent.caseStudies.arrowImage}
          />
        </section>

        <HomeTestimonials
          title={homeContent.testimonials.title}
          description={homeContent.testimonials.description}
          label={homeContent.testimonials.label}
          items={homeContent.testimonials.items}
        />

        <HomeCallToAction
          title={homeContent.cta.title}
          description={homeContent.cta.description}
          primaryLabel={homeContent.cta.primaryLabel}
          secondaryLabel={homeContent.cta.secondaryLabel}
          helperText={homeContent.cta.helperText}
        />
      </main>
    </div>
  )
}
