import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the optional overlay image to each `home-page` solutions block
 * (solutions.blocks[].overlayImage). Pairs a media relationship column with the
 * migration-shim `*_fallback_url` text column, matching the convention used by
 * the existing `image` field on this table. Used to render the "Fleet Status"
 * card as a separate overlay on top of the full-bleed block illustration.
 * Additive and idempotent.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page_solutions_blocks" ADD COLUMN IF NOT EXISTS "overlay_image_id" uuid;
    ALTER TABLE "home_page_solutions_blocks" ADD COLUMN IF NOT EXISTS "overlay_image_fallback_url" varchar;

    CREATE INDEX IF NOT EXISTS "home_page_solutions_blocks_overlay_image_idx"
      ON "home_page_solutions_blocks" ("overlay_image_id");

    DO $$ BEGIN
      ALTER TABLE "home_page_solutions_blocks" ADD CONSTRAINT "home_page_solutions_blocks_overlay_image_id_media_id_fk"
        FOREIGN KEY ("overlay_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page_solutions_blocks" DROP CONSTRAINT IF EXISTS "home_page_solutions_blocks_overlay_image_id_media_id_fk";
    DROP INDEX IF EXISTS "home_page_solutions_blocks_overlay_image_idx";
    ALTER TABLE "home_page_solutions_blocks" DROP COLUMN IF EXISTS "overlay_image_fallback_url";
    ALTER TABLE "home_page_solutions_blocks" DROP COLUMN IF EXISTS "overlay_image_id";
  `)
}
