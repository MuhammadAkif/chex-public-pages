import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations_register_ride_share_section_steps" ADD COLUMN "review_name" varchar;
  ALTER TABLE "locations_register_ride_share_section_steps" ADD COLUMN "review_stars" numeric;
  ALTER TABLE "locations_register_ride_share_section_steps" ADD COLUMN "review_quote" varchar;
  ALTER TABLE "locations_register_ride_share_section_steps" ADD COLUMN "review_avatar" varchar;
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" ADD COLUMN "review_name" varchar;
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" ADD COLUMN "review_stars" numeric;
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" ADD COLUMN "review_quote" varchar;
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" ADD COLUMN "review_avatar" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations_register_ride_share_section_steps" DROP COLUMN "review_name";
  ALTER TABLE "locations_register_ride_share_section_steps" DROP COLUMN "review_stars";
  ALTER TABLE "locations_register_ride_share_section_steps" DROP COLUMN "review_quote";
  ALTER TABLE "locations_register_ride_share_section_steps" DROP COLUMN "review_avatar";
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" DROP COLUMN "review_name";
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" DROP COLUMN "review_stars";
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" DROP COLUMN "review_quote";
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" DROP COLUMN "review_avatar";`)
}
