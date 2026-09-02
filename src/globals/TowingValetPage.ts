import { towingValetDefaultContent } from '@/app/(site)/towing-valet-inspection-service/content'

import { buildServicePageGlobal } from './buildServicePageGlobal'

/**
 * Editable content for the Towing & Valet service page
 * (`/towing-valet-inspection-service`). Additive global — introduces its own
 * `towing_valet_page*` tables only.
 */
export const TowingValetPage = buildServicePageGlobal({
  slug: 'towing-valet-page',
  label: 'Towing & Valet Service',
  d: towingValetDefaultContent,
})
