import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "locations_testimonials_items" ADD COLUMN IF NOT EXISTS "stars" numeric DEFAULT 5;
    UPDATE "locations_testimonials_items" SET "stars" = 5 WHERE "stars" IS NULL;
    ALTER TABLE "locations_testimonials_items" ALTER COLUMN "stars" SET NOT NULL;
    ALTER TABLE "locations_testimonials_items" DROP COLUMN IF EXISTS "role";
    ALTER TABLE "locations_testimonials_items" DROP COLUMN IF EXISTS "featured";

    ALTER TABLE "_locations_v_version_testimonials_items" ADD COLUMN IF NOT EXISTS "stars" numeric DEFAULT 5;
    UPDATE "_locations_v_version_testimonials_items" SET "stars" = 5 WHERE "stars" IS NULL;
    ALTER TABLE "_locations_v_version_testimonials_items" ALTER COLUMN "stars" SET NOT NULL;
    ALTER TABLE "_locations_v_version_testimonials_items" DROP COLUMN IF EXISTS "role";
    ALTER TABLE "_locations_v_version_testimonials_items" DROP COLUMN IF EXISTS "featured";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "locations_testimonials_items" ADD COLUMN IF NOT EXISTS "role" varchar;
    ALTER TABLE "locations_testimonials_items" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false;
    ALTER TABLE "locations_testimonials_items" DROP COLUMN IF EXISTS "stars";

    ALTER TABLE "_locations_v_version_testimonials_items" ADD COLUMN IF NOT EXISTS "role" varchar;
    ALTER TABLE "_locations_v_version_testimonials_items" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false;
    ALTER TABLE "_locations_v_version_testimonials_items" DROP COLUMN IF EXISTS "stars";
  `)
}

