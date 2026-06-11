import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the optional Hero background video to the `home-page` global
 * (hero.backgroundVideo). Pairs a media relationship column with the
 * migration-shim `*_fallback_url` text column, matching the convention used by
 * every other media field on this table. Additive and idempotent.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "hero_background_video_id" uuid;
    ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "hero_background_video_fallback_url" varchar;

    CREATE INDEX IF NOT EXISTS "home_page_hero_hero_background_video_idx"
      ON "home_page" ("hero_background_video_id");

    DO $$ BEGIN
      ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_background_video_id_media_id_fk"
        FOREIGN KEY ("hero_background_video_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page" DROP CONSTRAINT IF EXISTS "home_page_hero_background_video_id_media_id_fk";
    DROP INDEX IF EXISTS "home_page_hero_hero_background_video_idx";
    ALTER TABLE "home_page" DROP COLUMN IF EXISTS "hero_background_video_fallback_url";
    ALTER TABLE "home_page" DROP COLUMN IF EXISTS "hero_background_video_id";
  `)
}
