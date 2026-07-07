import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds per-platform inspection-form fields to the `inspection-form-page` global's
 * state rows so each state can carry a downloadable Uber/Lyft form URL (or a
 * per-platform note) instead of the old shared free-text `note`.
 *
 * Strictly scoped to `inspection_form_page_states_rows`. Defensive (IF [NOT]
 * EXISTS) so it is a no-op if `push: true` in dev already applied the columns.
 * No other collections/globals are touched.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "inspection_form_page_states_rows" ADD COLUMN IF NOT EXISTS "uber_form_url" varchar;
    ALTER TABLE "inspection_form_page_states_rows" ADD COLUMN IF NOT EXISTS "uber_note" varchar;
    ALTER TABLE "inspection_form_page_states_rows" ADD COLUMN IF NOT EXISTS "lyft_form_url" varchar;
    ALTER TABLE "inspection_form_page_states_rows" ADD COLUMN IF NOT EXISTS "lyft_note" varchar;
    ALTER TABLE "inspection_form_page_states_rows" DROP COLUMN IF EXISTS "note";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "inspection_form_page_states_rows" ADD COLUMN IF NOT EXISTS "note" varchar;
    ALTER TABLE "inspection_form_page_states_rows" DROP COLUMN IF EXISTS "uber_form_url";
    ALTER TABLE "inspection_form_page_states_rows" DROP COLUMN IF EXISTS "uber_note";
    ALTER TABLE "inspection_form_page_states_rows" DROP COLUMN IF EXISTS "lyft_form_url";
    ALTER TABLE "inspection_form_page_states_rows" DROP COLUMN IF EXISTS "lyft_note";
  `)
}
