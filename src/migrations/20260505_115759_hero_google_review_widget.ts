import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" ADD COLUMN "hero_google_review_logo_id" uuid;
  ALTER TABLE "locations" ADD COLUMN "hero_google_review_logo_fallback_url" varchar;
  ALTER TABLE "locations" ADD COLUMN "hero_google_review_label" varchar DEFAULT 'Google Rating';
  ALTER TABLE "locations" ADD COLUMN "hero_google_review_score" varchar DEFAULT '4.8';
  ALTER TABLE "locations" ADD COLUMN "hero_google_review_stars" numeric DEFAULT 5;
  ALTER TABLE "locations" ADD COLUMN "hero_google_review_review_link_label" varchar DEFAULT 'See all our reviews';
  ALTER TABLE "locations" ADD COLUMN "hero_google_review_review_link_href" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_hero_google_review_logo_id" uuid;
  ALTER TABLE "_locations_v" ADD COLUMN "version_hero_google_review_logo_fallback_url" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_hero_google_review_label" varchar DEFAULT 'Google Rating';
  ALTER TABLE "_locations_v" ADD COLUMN "version_hero_google_review_score" varchar DEFAULT '4.8';
  ALTER TABLE "_locations_v" ADD COLUMN "version_hero_google_review_stars" numeric DEFAULT 5;
  ALTER TABLE "_locations_v" ADD COLUMN "version_hero_google_review_review_link_label" varchar DEFAULT 'See all our reviews';
  ALTER TABLE "_locations_v" ADD COLUMN "version_hero_google_review_review_link_href" varchar;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_hero_google_review_logo_id_media_id_fk" FOREIGN KEY ("hero_google_review_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_hero_google_review_logo_id_media_id_fk" FOREIGN KEY ("version_hero_google_review_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "locations_hero_google_review_hero_google_review_logo_idx" ON "locations" USING btree ("hero_google_review_logo_id");
  CREATE INDEX "_locations_v_version_hero_google_review_version_hero_goo_idx" ON "_locations_v" USING btree ("version_hero_google_review_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" DROP CONSTRAINT "locations_hero_google_review_logo_id_media_id_fk";
  
  ALTER TABLE "_locations_v" DROP CONSTRAINT "_locations_v_version_hero_google_review_logo_id_media_id_fk";
  
  DROP INDEX "locations_hero_google_review_hero_google_review_logo_idx";
  DROP INDEX "_locations_v_version_hero_google_review_version_hero_goo_idx";
  ALTER TABLE "locations" DROP COLUMN "hero_google_review_logo_id";
  ALTER TABLE "locations" DROP COLUMN "hero_google_review_logo_fallback_url";
  ALTER TABLE "locations" DROP COLUMN "hero_google_review_label";
  ALTER TABLE "locations" DROP COLUMN "hero_google_review_score";
  ALTER TABLE "locations" DROP COLUMN "hero_google_review_stars";
  ALTER TABLE "locations" DROP COLUMN "hero_google_review_review_link_label";
  ALTER TABLE "locations" DROP COLUMN "hero_google_review_review_link_href";
  ALTER TABLE "_locations_v" DROP COLUMN "version_hero_google_review_logo_id";
  ALTER TABLE "_locations_v" DROP COLUMN "version_hero_google_review_logo_fallback_url";
  ALTER TABLE "_locations_v" DROP COLUMN "version_hero_google_review_label";
  ALTER TABLE "_locations_v" DROP COLUMN "version_hero_google_review_score";
  ALTER TABLE "_locations_v" DROP COLUMN "version_hero_google_review_stars";
  ALTER TABLE "_locations_v" DROP COLUMN "version_hero_google_review_review_link_label";
  ALTER TABLE "_locations_v" DROP COLUMN "version_hero_google_review_review_link_href";`)
}
