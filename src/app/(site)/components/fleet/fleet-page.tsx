import { Reveal } from "@/app/(site)/components/shared/reveal";

import {
  AboutChex,
  type AboutChexProps,
} from "@/app/(site)/components/rideshare/about-chex";
import {
  FeatureBadges,
  type FeatureBadgesProps,
} from "@/app/(site)/components/rideshare/feature-badges";
import {
  FleetHero,
  type FleetHeroProps,
} from "@/app/(site)/components/fleet/fleet-hero";
import {
  FleetPricing,
  type FleetPricingProps,
} from "@/app/(site)/components/fleet/fleet-pricing";
import {
  KeyBenefits,
  type KeyBenefitsProps,
} from "@/app/(site)/components/fleet/key-benefits";
import {
  WhyChex,
  type WhyChexProps,
} from "@/app/(site)/components/fleet/why-chex";

export type FleetPageContent = {
  hero: FleetHeroProps;
  featureBadges: FeatureBadgesProps;
  whyChex: WhyChexProps;
  keyBenefits: KeyBenefitsProps;
  pricing: FleetPricingProps;
  about: AboutChexProps;
  techstarsLine: {
    leading: string;
    word: string;
    trailingHighlight: string;
    trailing: string;
  };
};

export function FleetPage({ content }: { content: FleetPageContent }) {
  return (
    <main className="overflow-hidden">
      <FleetHero {...content.hero} />
      <Reveal>
        <FeatureBadges {...content.featureBadges} />
      </Reveal>
      <Reveal>
        <WhyChex {...content.whyChex} />
      </Reveal>
      <Reveal>
        <KeyBenefits {...content.keyBenefits} />
      </Reveal>
      <Reveal>
        <FleetPricing {...content.pricing} />
      </Reveal>
      <Reveal>
        <AboutChex {...content.about} />
      </Reveal>
      <p className="bg-white px-4 pb-12 text-center font-display text-[18px] font-extrabold text-[#1b2f4b] sm:text-[20px]">
        {content.techstarsLine.leading}{" "}
        <span className="text-[28px] sm:text-[32px]">
          {content.techstarsLine.word}
        </span>
        <span className="text-[#58c569]">
          {content.techstarsLine.trailingHighlight}
        </span>{" "}
        {content.techstarsLine.trailing}
      </p>
    </main>
  );
}
