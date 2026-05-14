import { Reveal } from "@/app/(site)/components/shared/reveal";

import {
  AboutChex,
  type AboutChexProps,
} from "@/app/(site)/components/rideshare/about-chex";
import {
  BackedCompanies,
  type BackedCompaniesProps,
} from "@/app/(site)/components/rideshare/backed-companies";
import {
  BusinessHelp,
  type BusinessHelpProps,
} from "@/app/(site)/components/rideshare/business-help";
import {
  CommunityBanner,
  type CommunityBannerProps,
} from "@/app/(site)/components/rideshare/community-banner";
import {
  CustomerReviews,
  type CustomerReviewsProps,
} from "@/app/(site)/components/rideshare/customer-reviews";
import {
  FeatureBadges,
  type FeatureBadgesProps,
} from "@/app/(site)/components/rideshare/feature-badges";
import {
  InspectionProcess,
  type InspectionProcessProps,
} from "@/app/(site)/components/rideshare/inspection-process";
import {
  RegistrationForm,
  type RegistrationFormProps,
} from "@/app/(site)/components/rideshare/registration-form";
import {
  RideshareFaq,
  type RideshareFaqProps,
} from "@/app/(site)/components/rideshare/rideshare-faq";
import {
  RideshareHero,
  type RideshareHeroProps,
} from "@/app/(site)/components/rideshare/rideshare-hero";
import {
  RidesharePricing,
  type RidesharePricingProps,
} from "@/app/(site)/components/rideshare/rideshare-pricing";

export type RideshareInspectionPageContent = {
  hero: RideshareHeroProps;
  inspectionProcess: InspectionProcessProps;
  pricing: RidesharePricingProps;
  registration: RegistrationFormProps;
  backedCompanies: BackedCompaniesProps;
  featureBadges: FeatureBadgesProps;
  reviews: CustomerReviewsProps;
  faq: RideshareFaqProps;
  community: CommunityBannerProps;
  businessHelp: BusinessHelpProps;
  about: AboutChexProps;
};

export function RideshareInspectionPage({
  content,
}: {
  content: RideshareInspectionPageContent;
}) {
  return (
    <main className="overflow-hidden">
      <RideshareHero {...content.hero} />
      <Reveal>
        <InspectionProcess {...content.inspectionProcess} />
      </Reveal>
      <Reveal>
        <RidesharePricing {...content.pricing} />
      </Reveal>
      <Reveal>
        <RegistrationForm {...content.registration} />
      </Reveal>
      <Reveal>
        <BackedCompanies {...content.backedCompanies} />
      </Reveal>
      <Reveal>
        <FeatureBadges {...content.featureBadges} />
      </Reveal>
      <Reveal>
        <CustomerReviews {...content.reviews} />
      </Reveal>
      <Reveal>
        <RideshareFaq {...content.faq} />
      </Reveal>
      <Reveal>
        <CommunityBanner {...content.community} />
      </Reveal>
      <Reveal>
        <BusinessHelp {...content.businessHelp} />
      </Reveal>
      <Reveal>
        <AboutChex {...content.about} />
      </Reveal>
    </main>
  );
}
