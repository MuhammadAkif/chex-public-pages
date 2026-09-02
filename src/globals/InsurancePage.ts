import { insuranceDefaultContent } from '@/app/(site)/insurance-inspection-service/content'

import { buildServicePageGlobal } from './buildServicePageGlobal'

/**
 * Editable content for the Insurance service page
 * (`/insurance-inspection-service`). Additive global — introduces its own
 * `insurance_page*` tables only. Shares the field structure with the
 * Commercial Fleet global via {@link buildServicePageGlobal}.
 */
export const InsurancePage = buildServicePageGlobal({
  slug: 'insurance-page',
  label: 'Insurance Service',
  d: insuranceDefaultContent,
})
