import { Reveal } from "@/app/(site)/components/shared/reveal";
import { LocationFaq } from "@/app/(site)/components/locations/location-faq";
import { PricingComparison } from "@/app/(site)/components/pricing/pricing-comparison";
import { PricingOverage } from "@/app/(site)/components/pricing/pricing-overage";
import { PricingPlans } from "@/app/(site)/components/pricing/pricing-plans";
import type { PricingContent } from "@/app/(site)/dsp-fleet-pricing/content";

type PricingPageProps = {
  content: PricingContent;
};

export function PricingPage({ content }: PricingPageProps) {
  return (
    <main className="overflow-hidden">
      <PricingPlans hero={content.hero} plans={content.plans} />

      <Reveal>
        <PricingComparison {...content.comparison} />
      </Reveal>

      <Reveal>
        <PricingOverage {...content.overage} />
      </Reveal>

      <Reveal>
        <LocationFaq {...content.faq} />
      </Reveal>
    </main>
  );
}
