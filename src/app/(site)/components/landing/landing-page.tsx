import { LocationTestimonials } from '@/app/(site)/components/locations/location-testimonials'
import { Reveal } from '@/app/(site)/components/shared/reveal'
import type { LandingPageContent } from '@/app/(site)/landing-page/content'

import { LandingAchievements } from './landing-achievements'
import { LandingArticles } from './landing-articles'
import { LandingFaq } from './landing-faq'
import { LandingHero } from './landing-hero'
import { LandingInspectCta } from './landing-inspect-cta'
import { LandingSolutions } from './landing-solutions'
import { LandingTransform } from './landing-transform'
import { LandingTrusted } from './landing-trusted'

type LandingPageProps = {
  content: LandingPageContent
}

export function LandingPage({ content }: LandingPageProps) {
  return (
    <div className="bg-white text-[#1b2f4b]">
      <main className="overflow-hidden">
        <Reveal>
          <LandingHero
            ratingText={content.hero.ratingText}
            titleAccent={content.hero.titleAccent}
            title={content.hero.title}
            description={content.hero.description}
            buttonLabel={content.hero.buttonLabel}
            image={content.hero.image}
          />
        </Reveal>

        <Reveal>
          <LandingTrusted title={content.trusted.title} logos={content.trusted.logos} />
        </Reveal>

        <Reveal>
          <LandingTransform
            title={content.transform.title}
            description={content.transform.description}
            image={content.transform.image}
            features={content.transform.features}
          />
        </Reveal>

        <Reveal>
          <LandingSolutions
            title={content.solutions.title}
            description={content.solutions.description}
            blocks={content.solutions.blocks}
          />
        </Reveal>

        <Reveal>
          <LocationTestimonials
            title={content.testimonials.title}
            description={content.testimonials.description}
            label={content.testimonials.label}
            items={content.testimonials.items}
          />
        </Reveal>

        <Reveal>
          <LandingFaq title={content.faq.title} items={content.faq.items} />
        </Reveal>

        <Reveal>
          <LandingAchievements
            title={content.achievements.title}
            description={content.achievements.description}
            backgroundImage={content.achievements.backgroundImage}
            stats={content.achievements.stats}
            note={content.achievements.note}
            buttonLabel={content.achievements.buttonLabel}
          />
        </Reveal>

        <Reveal>
          <LandingInspectCta
            eyebrow={content.inspect.eyebrow}
            titleAccentA={content.inspect.titleAccentA}
            titleMid={content.inspect.titleMid}
            titleAccentB={content.inspect.titleAccentB}
            titleTail={content.inspect.titleTail}
            subtitle={content.inspect.subtitle}
            description={content.inspect.description}
            buttonLabel={content.inspect.buttonLabel}
            testimonial={content.inspect.testimonial}
          />
        </Reveal>

        <Reveal>
          <LandingArticles
            eyebrow={content.articles.eyebrow}
            title={content.articles.title}
            items={content.articles.items}
          />
        </Reveal>
      </main>
    </div>
  )
}
