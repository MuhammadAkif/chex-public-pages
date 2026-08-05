import { Reveal } from "@/app/(site)/components/shared/reveal";
import { HomeCallToAction } from "@/app/(site)/components/home/home-call-to-action";
import { HomeHowItWorks } from "@/app/(site)/components/home/home-how-it-works";
import { LocationFaq } from "@/app/(site)/components/locations/location-faq";
import { LocationTestimonials } from "@/app/(site)/components/locations/location-testimonials";

import { CertifiedAcceptedBy } from "@/app/(site)/components/rideshare-pricing/certified-accepted-by";
import { ScheduleInspection } from "@/app/(site)/components/rideshare-pricing/schedule-inspection";

import { EveryInspectionIncludes } from "@/app/(site)/components/rideshare-pricing/every-inspection-includes";
import { RidesharePricingHero } from "@/app/(site)/components/rideshare-pricing/rideshare-pricing-hero";
import { RidesharePricingPlans } from "@/app/(site)/components/rideshare-pricing/rideshare-pricing-plans";
import type { RidesharePricingContent } from "@/app/(site)/rideshare-pricing/content";

export function RidesharePricingPage({
  content,
}: {
  content: RidesharePricingContent;
}) {
  return (
    <main className="overflow-hidden">
      <RidesharePricingHero hero={content.hero} />

      <CertifiedAcceptedBy acceptedBy={content.acceptedBy} />

      <Reveal>
        <div className="bg-white">
          <HomeHowItWorks
            title={content.howItWorks.title}
            description={content.howItWorks.description}
            steps={content.howItWorks.steps}
          />
        </div>
      </Reveal>

      <Reveal>
        <EveryInspectionIncludes band={content.band} />
      </Reveal>

      <Reveal>
        <RidesharePricingPlans plans={content.plans} />
      </Reveal>

      <Reveal>
        <ScheduleInspection schedule={content.schedule} />
      </Reveal>

      <Reveal>
        <LocationTestimonials {...content.testimonials} />
      </Reveal>

      <Reveal>
        <LocationFaq {...content.faq} />
      </Reveal>

      <Reveal>
        <HomeCallToAction
          title={content.cta.title}
          description={content.cta.description}
          secondaryLabel={content.cta.secondaryLabel}
          helperText={content.cta.helperText}
        />
      </Reveal>
    </main>
  );
}
