import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations_register_ride_share_section_steps" ADD COLUMN "review_review_link_href" varchar;
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" ADD COLUMN "review_review_link_href" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations_register_ride_share_section_steps" DROP COLUMN "review_review_link_href";
  ALTER TABLE "_locations_v_version_register_ride_share_section_steps" DROP COLUMN "review_review_link_href";`)
}
