import { commercialFleetDefaultContent } from '@/app/(site)/commercial-fleet-inspection-service/content'

import { buildServicePageGlobal } from './buildServicePageGlobal'

/**
 * Editable content for the Commercial Fleet Inspection service page
 * (`/commercial-fleet-inspection-service`). Additive global — introduces its
 * own `commercial_fleet_page*` tables only.
 */
export const CommercialFleetPage = buildServicePageGlobal({
  slug: 'commercial-fleet-page',
  label: 'Commercial Fleet Inspection Service',
  d: commercialFleetDefaultContent,
})
