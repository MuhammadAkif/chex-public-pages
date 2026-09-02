import { rentalDefaultContent } from '@/app/(site)/rental-inspection-service/content'

import { buildServicePageGlobal } from './buildServicePageGlobal'

/**
 * Editable content for the Car Rental service page
 * (`/rental-inspection-service`). Additive global — introduces its own
 * `rental_page*` tables only.
 */
export const RentalPage = buildServicePageGlobal({
  slug: 'rental-page',
  label: 'Car Rental Service',
  d: rentalDefaultContent,
})
