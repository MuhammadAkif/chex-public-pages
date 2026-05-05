"use client";

import { homeContent } from "@/app/(site)/home/content";

import { HomeBusinessHelp } from "./home-business-help";
import { HomeCallToAction } from "./home-call-to-action";
import { HomeCommunity } from "./home-community";
import { HomeHero } from "./home-hero";
import { HomeHowItWorks } from "./home-how-it-works";
import { HomeKeyDifferentiators } from "./home-key-differentiators";
import { HomeBenefits } from "./home-benefits";
import { HomeTestimonials } from "./home-testimonials";
import { CaseStudies } from "../shared/case-studies";
import { Reveal } from "../shared/reveal";
import { SectionHeading } from "../ui/section-heading";

export function HomePage() {
  return (
    <div
      id="top"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_18%,#ffffff_100%)] text-[#1b2f4b]"
    >
      <main className="overflow-hidden">
        <Reveal>
          <HomeHero
            rating={homeContent.hero.rating}
            title={homeContent.hero.title}
            description={homeContent.hero.description}
            primaryLabel={homeContent.hero.primaryLabel}
            secondaryLabel={homeContent.hero.secondaryLabel}
            helperText={homeContent.hero.helperText}
            media={homeContent.hero.media}
          />
        </Reveal>

        <Reveal>
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
        </Reveal>

        <Reveal>
          <HomeHowItWorks
            title={homeContent.howItWorks.title}
            description={homeContent.howItWorks.description}
            steps={homeContent.howItWorks.steps}
          />
        </Reveal>

        <Reveal>
          <HomeBenefits
            title={homeContent.benefits.title}
            items={homeContent.benefits.items}
          />
        </Reveal>

        {/* <Reveal>
          <HomeKeyDifferentiators
            title={homeContent.keyDifferentiators.title}
            items={homeContent.keyDifferentiators.items}
            image={homeContent.keyDifferentiators.image}
          />
        </Reveal> */}

        <section className="bg-[linear-gradient(180deg,#07132d_0%,#03112a_100%)]">
          <Reveal>
            <HomeBusinessHelp
              title={homeContent.businessHelp.title}
              description={homeContent.businessHelp.description}
              buttonLabel={homeContent.businessHelp.buttonLabel}
              image={homeContent.businessHelp.image}
            />
          </Reveal>

          {/* <CaseStudies
            title={homeContent.caseStudies.title}
            heading={
              <SectionHeading
                title={homeContent.caseStudies.title}
                theme="dark"
              />
            }
            items={homeContent.caseStudies.items}
            arrowImage={homeContent.caseStudies.arrowImage}
            sectionClassName="px-4 pb-24 pt-10 sm:px-6 lg:px-10 lg:pb-28"
            scrollClassName="mt-14 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            articleClassName="group relative h-[485px] w-[320px] overflow-hidden rounded-[12px] border border-white/70 sm:w-[388px]"
            imageClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            arrowClassName="pointer-events-none absolute right-8 top-[44%] h-20 w-20 -rotate-90 object-contain opacity-95 sm:h-28 sm:w-28"
            metricClassName="font-display text-5xl font-bold tracking-[-0.05em] sm:text-[64px] sm:leading-[70.4px]"
            titleClassName="mt-1 font-display text-[28px] font-medium leading-[1.1] tracking-[-0.03em]"
            descriptionClassName="type-body-md mt-5 max-w-[18rem] text-white/92"
          /> */}
        </section>

        {/* <Reveal>
          <HomeTestimonials
            title={homeContent.testimonials.title}
            description={homeContent.testimonials.description}
            label={homeContent.testimonials.label}
            items={homeContent.testimonials.items}
          />
        </Reveal> */}

        <Reveal>
          <HomeCallToAction
            title={homeContent.cta.title}
            description={homeContent.cta.description}
            primaryLabel={homeContent.cta.primaryLabel}
            secondaryLabel={homeContent.cta.secondaryLabel}
            helperText={homeContent.cta.helperText}
          />
        </Reveal>
      </main>
    </div>
  );
}
