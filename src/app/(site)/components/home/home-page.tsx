"use client";

import type { HomePageContent } from "@/app/(site)/home/payload";

import { HomeBusinessHelp } from "./home-business-help";
import { HomeCallToAction } from "./home-call-to-action";
import { HomeCommunity } from "./home-community";
import { HomeHero } from "./home-hero";
import { HomeHowItWorks } from "./home-how-it-works";
import { HomeBenefits } from "./home-benefits";
import { LocationTestimonials } from "../locations/location-testimonials";
import { Reveal } from "../shared/reveal";

type HomePageProps = {
  content: HomePageContent;
};

export function HomePage({ content }: HomePageProps) {
  return (
    <div
      id="top"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_18%,#ffffff_100%)] text-[#1b2f4b]"
    >
      <main className="overflow-hidden">
        <Reveal>
          <HomeHero
            rating={content.hero.rating}
            title={content.hero.title}
            description={content.hero.description}
            secondaryLabel={content.hero.secondaryLabel}
            media={content.hero.media}
          />
        </Reveal>

        <Reveal>
          <HomeCommunity
            title={content.community.title}
            subtitle={content.community.subtitle}
            stats={content.community.stats}
            manageTitle={content.community.manageTitle}
            manageBullets={content.community.manageBullets}
            manageImage={content.community.manageImage}
            trustedTitle={content.community.trustedTitle}
            trustedLogos={content.community.trustedLogos}
          />
        </Reveal>

        <Reveal>
          <HomeHowItWorks
            title={content.howItWorks.title}
            description={content.howItWorks.description}
            steps={content.howItWorks.steps}
          />
        </Reveal>

        <Reveal>
          <HomeBenefits
            title={content.benefits.title}
            items={content.benefits.items}
          />
        </Reveal>

        <section className="bg-[linear-gradient(180deg,#07132d_0%,#03112a_100%)]">
          <Reveal>
            <HomeBusinessHelp
              title={content.businessHelp.title}
              description={content.businessHelp.description}
              buttonLabel={content.businessHelp.buttonLabel}
              image={content.businessHelp.image}
            />
          </Reveal>
        </section>

        <Reveal>
          <LocationTestimonials
            title={content.testimonials.title}
            description={content.testimonials.description}
            label={content.testimonials.label}
            items={content.testimonials.items}
          />
        </Reveal>

        <Reveal>
          <HomeCallToAction
            title={content.cta.title}
            description={content.cta.description}
            secondaryLabel={content.cta.secondaryLabel}
          />
        </Reveal>
      </main>
    </div>
  );
}
