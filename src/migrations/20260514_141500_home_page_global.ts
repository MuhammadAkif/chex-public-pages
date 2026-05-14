import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "home_page" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "meta_title" varchar NOT NULL,
      "meta_description" varchar NOT NULL,
      "hero_rating" varchar NOT NULL,
      "hero_title" varchar NOT NULL,
      "hero_description" varchar NOT NULL,
      "hero_secondary_label" varchar NOT NULL,
      "hero_media_id" uuid,
      "hero_media_fallback_url" varchar,
      "community_title" varchar NOT NULL,
      "community_subtitle" varchar NOT NULL,
      "community_manage_title" varchar NOT NULL,
      "community_manage_image_id" uuid,
      "community_manage_image_fallback_url" varchar,
      "community_trusted_title" varchar NOT NULL,
      "how_it_works_title" varchar NOT NULL,
      "how_it_works_description" varchar NOT NULL,
      "benefits_title" varchar NOT NULL,
      "key_differentiators_title" varchar NOT NULL,
      "key_differentiators_image_id" uuid,
      "key_differentiators_image_fallback_url" varchar,
      "business_help_title" varchar NOT NULL,
      "business_help_description" varchar NOT NULL,
      "business_help_button_label" varchar NOT NULL,
      "business_help_image_id" uuid,
      "business_help_image_fallback_url" varchar,
      "case_studies_title" varchar NOT NULL,
      "case_studies_arrow_image_id" uuid,
      "case_studies_arrow_image_fallback_url" varchar,
      "testimonials_title" varchar NOT NULL,
      "testimonials_description" varchar NOT NULL,
      "testimonials_label" varchar NOT NULL,
      "cta_title" varchar NOT NULL,
      "cta_description" varchar NOT NULL,
      "cta_secondary_label" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "home_page_community_stats" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL,
      "tone" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "home_page_community_manage_bullets" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "home_page_community_trusted_logos" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" uuid,
      "image_fallback_url" varchar,
      "label" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "home_page_how_it_works_steps" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "image_id" uuid,
      "image_fallback_url" varchar
    );

    CREATE TABLE IF NOT EXISTS "home_page_benefits_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "tone" varchar NOT NULL,
      "icon" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "home_page_key_differentiators_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "home_page_case_studies_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "metric" varchar NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "image_id" uuid,
      "image_fallback_url" varchar,
      "caption" varchar
    );

    CREATE TABLE IF NOT EXISTS "home_page_testimonials_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "quote" varchar NOT NULL,
      "stars" numeric DEFAULT 5 NOT NULL,
      "avatar" varchar
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS "home_page_hero_hero_media_idx" ON "home_page" ("hero_media_id");
    CREATE INDEX IF NOT EXISTS "home_page_community_community_manage_image_idx" ON "home_page" ("community_manage_image_id");
    CREATE INDEX IF NOT EXISTS "home_page_key_differentiators_key_differentiators_image_idx" ON "home_page" ("key_differentiators_image_id");
    CREATE INDEX IF NOT EXISTS "home_page_business_help_business_help_image_idx" ON "home_page" ("business_help_image_id");
    CREATE INDEX IF NOT EXISTS "home_page_case_studies_case_studies_arrow_image_idx" ON "home_page" ("case_studies_arrow_image_id");

    CREATE INDEX IF NOT EXISTS "home_page_community_stats_order_idx" ON "home_page_community_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "home_page_community_stats_parent_id_idx" ON "home_page_community_stats" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "home_page_community_manage_bullets_order_idx" ON "home_page_community_manage_bullets" ("_order");
    CREATE INDEX IF NOT EXISTS "home_page_community_manage_bullets_parent_id_idx" ON "home_page_community_manage_bullets" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "home_page_community_trusted_logos_order_idx" ON "home_page_community_trusted_logos" ("_order");
    CREATE INDEX IF NOT EXISTS "home_page_community_trusted_logos_parent_id_idx" ON "home_page_community_trusted_logos" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "home_page_community_trusted_logos_image_idx" ON "home_page_community_trusted_logos" ("image_id");

    CREATE INDEX IF NOT EXISTS "home_page_how_it_works_steps_order_idx" ON "home_page_how_it_works_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "home_page_how_it_works_steps_parent_id_idx" ON "home_page_how_it_works_steps" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "home_page_how_it_works_steps_image_idx" ON "home_page_how_it_works_steps" ("image_id");

    CREATE INDEX IF NOT EXISTS "home_page_benefits_items_order_idx" ON "home_page_benefits_items" ("_order");
    CREATE INDEX IF NOT EXISTS "home_page_benefits_items_parent_id_idx" ON "home_page_benefits_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "home_page_key_differentiators_items_order_idx" ON "home_page_key_differentiators_items" ("_order");
    CREATE INDEX IF NOT EXISTS "home_page_key_differentiators_items_parent_id_idx" ON "home_page_key_differentiators_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "home_page_case_studies_items_order_idx" ON "home_page_case_studies_items" ("_order");
    CREATE INDEX IF NOT EXISTS "home_page_case_studies_items_parent_id_idx" ON "home_page_case_studies_items" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "home_page_case_studies_items_image_idx" ON "home_page_case_studies_items" ("image_id");

    CREATE INDEX IF NOT EXISTS "home_page_testimonials_items_order_idx" ON "home_page_testimonials_items" ("_order");
    CREATE INDEX IF NOT EXISTS "home_page_testimonials_items_parent_id_idx" ON "home_page_testimonials_items" ("_parent_id");

    -- Foreign keys (DO blocks skip if the constraint already exists)
    DO $$ BEGIN
      ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page" ADD CONSTRAINT "home_page_community_manage_image_id_media_id_fk" FOREIGN KEY ("community_manage_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page" ADD CONSTRAINT "home_page_key_differentiators_image_id_media_id_fk" FOREIGN KEY ("key_differentiators_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page" ADD CONSTRAINT "home_page_business_help_image_id_media_id_fk" FOREIGN KEY ("business_help_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page" ADD CONSTRAINT "home_page_case_studies_arrow_image_id_media_id_fk" FOREIGN KEY ("case_studies_arrow_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "home_page_community_stats" ADD CONSTRAINT "home_page_community_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_community_manage_bullets" ADD CONSTRAINT "home_page_community_manage_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_community_trusted_logos" ADD CONSTRAINT "home_page_community_trusted_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_community_trusted_logos" ADD CONSTRAINT "home_page_community_trusted_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_how_it_works_steps" ADD CONSTRAINT "home_page_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_how_it_works_steps" ADD CONSTRAINT "home_page_how_it_works_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_benefits_items" ADD CONSTRAINT "home_page_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_key_differentiators_items" ADD CONSTRAINT "home_page_key_differentiators_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_case_studies_items" ADD CONSTRAINT "home_page_case_studies_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_case_studies_items" ADD CONSTRAINT "home_page_case_studies_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "home_page_testimonials_items" ADD CONSTRAINT "home_page_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "home_page_testimonials_items" CASCADE;
    DROP TABLE IF EXISTS "home_page_case_studies_items" CASCADE;
    DROP TABLE IF EXISTS "home_page_key_differentiators_items" CASCADE;
    DROP TABLE IF EXISTS "home_page_benefits_items" CASCADE;
    DROP TABLE IF EXISTS "home_page_how_it_works_steps" CASCADE;
    DROP TABLE IF EXISTS "home_page_community_trusted_logos" CASCADE;
    DROP TABLE IF EXISTS "home_page_community_manage_bullets" CASCADE;
    DROP TABLE IF EXISTS "home_page_community_stats" CASCADE;
    DROP TABLE IF EXISTS "home_page" CASCADE;
  `)
}
