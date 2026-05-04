import { Reveal } from "@/app/(site)/components/shared/reveal";

import {
  LocationCaseStudies,
  type LocationCaseStudiesProps,
} from "./location-case-studies";
import { LocationCta, type LocationCtaProps } from "./location-cta";
import { LocationFaq, type LocationFaqProps } from "./location-faq";
import { LocationHero, type LocationHeroProps } from "./location-hero";
import { LocationManage, type LocationManageProps } from "./location-manage";
import {
  LocationOverview,
  type LocationOverviewProps,
} from "./location-overview";
import { LocationRegions, type LocationRegionsProps } from "./location-regions";
import {
  LocationServices,
  type LocationServicesProps,
} from "./location-services";
import {
  LocationComparison,
  type LocationComparisonProps,
} from "./location-comparison";
import {
  PricingRideShareSection,
  type PricingRideShareSectionProps,
} from "./pricing-rideshare-section";
import {
  RegisterRideShareSection,
  type RegisterRideShareSectionProps,
} from "./register-rideshare-section";
import {
  LocationShowcase,
  type LocationShowcaseProps,
} from "./location-showcase";
import {
  LocationTestimonials,
  type LocationTestimonialsProps,
} from "./location-testimonials";
import { type LocationPricingProps } from "./location-pricing";

export type LocationPageContent = {
  pageClassName: string;
  hero: LocationHeroProps;
  overview: LocationOverviewProps;
  services: LocationServicesProps;
  comparison: LocationComparisonProps;
  registerRideShareSection: RegisterRideShareSectionProps;
  pricingRideShareSection: PricingRideShareSectionProps;
  pricing: LocationPricingProps;
  showcase: LocationShowcaseProps;
  regions: LocationRegionsProps;
  manage: LocationManageProps;
  caseStudies: LocationCaseStudiesProps;
  testimonials: LocationTestimonialsProps;
  faq: LocationFaqProps;
  cta: LocationCtaProps;
};

export function LocationPage({ content }: { content: LocationPageContent }) {
  return (
    <div id="top" className={content.pageClassName}>
      <main className="overflow-hidden">
        <Reveal>
          <LocationHero {...content.hero} />
        </Reveal>
        <Reveal>
          <LocationShowcase {...content.showcase} />
        </Reveal>
        <Reveal>
          <LocationOverview {...content.overview} />
        </Reveal>
        <Reveal>
          <LocationServices {...content.services} />
        </Reveal>
        <Reveal>
          <LocationComparison {...content.comparison} />
        </Reveal>
        <Reveal>
          <RegisterRideShareSection {...content.registerRideShareSection} />
        </Reveal>
        <Reveal>
          <PricingRideShareSection {...content.pricingRideShareSection} />
        </Reveal>
        <Reveal>
          <LocationRegions {...content.regions} />
        </Reveal>
        <Reveal>
          <LocationManage {...content.manage} />
        </Reveal>
       {/* <LocationCaseStudies {...content.caseStudies} /> */}
        <Reveal>
          <LocationTestimonials {...content.testimonials} />
        </Reveal>
        <Reveal>
          <LocationFaq {...content.faq} />
        </Reveal>
        <Reveal>
          <LocationCta {...content.cta} />
        </Reveal>
      </main>
    </div>
  );
}
