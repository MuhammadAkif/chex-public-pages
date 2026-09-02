import type { CommercialFleetContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

import { LocationFaq } from '../locations/location-faq'
import { Reveal } from '../shared/reveal'
import { CommercialFleetBenefits } from './commercial-fleet-benefits'
import { CommercialFleetCommunity } from './commercial-fleet-community'
import { CommercialFleetCta } from './commercial-fleet-cta'
import { CommercialFleetOperators } from './commercial-fleet-fleet-operators'
import { CommercialFleetFlow } from './commercial-fleet-flow'
import { CommercialFleetHero } from './commercial-fleet-hero'
import { CommercialFleetHowItWorks } from './commercial-fleet-how-it-works'
import { CommercialFleetPlatform } from './commercial-fleet-platform'

export function CommercialFleetPage({ content }: { content: CommercialFleetContent }) {
  return (
    <div className="bg-white text-[#1b2f4b]">
      {/* overflow-x-clip (not hidden) so horizontal glows are clipped without
          disabling the sticky-stacking flow cards. */}
      <main className="overflow-x-clip">
        <Reveal>
          <CommercialFleetHero {...content.hero} />
        </Reveal>

        <Reveal>
          <CommercialFleetFlow {...content.flow} />
        </Reveal>

        <Reveal>
          <CommercialFleetPlatform {...content.platform} />
        </Reveal>

        <Reveal>
          <CommercialFleetCommunity {...content.community} />
        </Reveal>

        <Reveal>
          <CommercialFleetHowItWorks {...content.howItWorks} />
        </Reveal>

        <Reveal>
          <CommercialFleetBenefits {...content.benefits} />
        </Reveal>

        <Reveal>
          <CommercialFleetOperators {...content.fleetOperators} />
        </Reveal>

        <Reveal>
          <LocationFaq
            idBase="commercial-fleet"
            title={content.faq.title}
            description={content.faq.description}
            items={content.faq.items}
          />
        </Reveal>

        <Reveal>
          <CommercialFleetCta {...content.cta} />
        </Reveal>
      </main>
    </div>
  )
}
