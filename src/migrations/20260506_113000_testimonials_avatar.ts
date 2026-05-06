import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "locations_testimonials_items" ADD COLUMN IF NOT EXISTS "avatar" varchar;
    ALTER TABLE "_locations_v_version_testimonials_items" ADD COLUMN IF NOT EXISTS "avatar" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "locations_testimonials_items" DROP COLUMN IF EXISTS "avatar";
    ALTER TABLE "_locations_v_version_testimonials_items" DROP COLUMN IF EXISTS "avatar";
  `)
}

