import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the `landing-page` Payload global (and its array sub-tables) used by the
 * /landing-page route. Purely additive and idempotent — it only creates new
 * `landing_page*` tables and never touches existing collections.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_landing_page_solutions_blocks_variant" AS ENUM('full', 'card-light', 'card-peach');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "landing_page" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "meta_title" varchar NOT NULL,
      "meta_description" varchar NOT NULL,
      "hero_rating_text" varchar NOT NULL,
      "hero_title_accent" varchar NOT NULL,
      "hero_title" varchar NOT NULL,
      "hero_description" varchar NOT NULL,
      "hero_button_label" varchar NOT NULL,
      "hero_image_id" uuid,
      "hero_image_fallback_url" varchar,
      "trusted_title" varchar NOT NULL,
      "transform_title" varchar NOT NULL,
      "transform_description" varchar NOT NULL,
      "transform_image_id" uuid,
      "transform_image_fallback_url" varchar,
      "solutions_title" varchar NOT NULL,
      "solutions_description" varchar NOT NULL,
      "testimonials_title" varchar NOT NULL,
      "testimonials_description" varchar NOT NULL,
      "testimonials_label" varchar NOT NULL,
      "faq_title" varchar NOT NULL,
      "achievements_title" varchar NOT NULL,
      "achievements_description" varchar NOT NULL,
      "achievements_background_image_id" uuid,
      "achievements_background_image_fallback_url" varchar,
      "achievements_note" varchar NOT NULL,
      "achievements_button_label" varchar NOT NULL,
      "inspect_eyebrow" varchar NOT NULL,
      "inspect_title_accent_a" varchar NOT NULL,
      "inspect_title_mid" varchar NOT NULL,
      "inspect_title_accent_b" varchar NOT NULL,
      "inspect_title_tail" varchar NOT NULL,
      "inspect_subtitle" varchar NOT NULL,
      "inspect_description" varchar NOT NULL,
      "inspect_button_label" varchar NOT NULL,
      "inspect_testimonial_name" varchar NOT NULL,
      "inspect_testimonial_quote" varchar NOT NULL,
      "inspect_testimonial_role" varchar NOT NULL,
      "inspect_testimonial_image_id" uuid,
      "inspect_testimonial_image_fallback_url" varchar,
      "articles_eyebrow" varchar NOT NULL,
      "articles_title" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "landing_page_trusted_logos" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" uuid,
      "image_fallback_url" varchar,
      "label" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "landing_page_transform_features" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "landing_page_solutions_blocks" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "button_label" varchar NOT NULL,
      "image_id" uuid,
      "image_fallback_url" varchar,
      "variant" "public"."enum_landing_page_solutions_blocks_variant" DEFAULT 'card-light' NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "landing_page_solutions_blocks_bullets" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "landing_page_testimonials_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "quote" varchar NOT NULL,
      "stars" numeric DEFAULT 5 NOT NULL,
      "avatar" varchar
    );

    CREATE TABLE IF NOT EXISTS "landing_page_faq_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar NOT NULL,
      "answer" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "landing_page_achievements_stats" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "landing_page_articles_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "tag" varchar NOT NULL,
      "title" varchar NOT NULL,
      "image_id" uuid,
      "image_fallback_url" varchar,
      "href" varchar
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS "landing_page_hero_image_idx" ON "landing_page" ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "landing_page_transform_image_idx" ON "landing_page" ("transform_image_id");
    CREATE INDEX IF NOT EXISTS "landing_page_achievements_background_image_idx" ON "landing_page" ("achievements_background_image_id");
    CREATE INDEX IF NOT EXISTS "landing_page_inspect_testimonial_image_idx" ON "landing_page" ("inspect_testimonial_image_id");

    CREATE INDEX IF NOT EXISTS "landing_page_trusted_logos_order_idx" ON "landing_page_trusted_logos" ("_order");
    CREATE INDEX IF NOT EXISTS "landing_page_trusted_logos_parent_id_idx" ON "landing_page_trusted_logos" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "landing_page_trusted_logos_image_idx" ON "landing_page_trusted_logos" ("image_id");

    CREATE INDEX IF NOT EXISTS "landing_page_transform_features_order_idx" ON "landing_page_transform_features" ("_order");
    CREATE INDEX IF NOT EXISTS "landing_page_transform_features_parent_id_idx" ON "landing_page_transform_features" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "landing_page_solutions_blocks_order_idx" ON "landing_page_solutions_blocks" ("_order");
    CREATE INDEX IF NOT EXISTS "landing_page_solutions_blocks_parent_id_idx" ON "landing_page_solutions_blocks" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "landing_page_solutions_blocks_image_idx" ON "landing_page_solutions_blocks" ("image_id");

    CREATE INDEX IF NOT EXISTS "landing_page_solutions_blocks_bullets_order_idx" ON "landing_page_solutions_blocks_bullets" ("_order");
    CREATE INDEX IF NOT EXISTS "landing_page_solutions_blocks_bullets_parent_id_idx" ON "landing_page_solutions_blocks_bullets" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "landing_page_testimonials_items_order_idx" ON "landing_page_testimonials_items" ("_order");
    CREATE INDEX IF NOT EXISTS "landing_page_testimonials_items_parent_id_idx" ON "landing_page_testimonials_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "landing_page_faq_items_order_idx" ON "landing_page_faq_items" ("_order");
    CREATE INDEX IF NOT EXISTS "landing_page_faq_items_parent_id_idx" ON "landing_page_faq_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "landing_page_achievements_stats_order_idx" ON "landing_page_achievements_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "landing_page_achievements_stats_parent_id_idx" ON "landing_page_achievements_stats" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "landing_page_articles_items_order_idx" ON "landing_page_articles_items" ("_order");
    CREATE INDEX IF NOT EXISTS "landing_page_articles_items_parent_id_idx" ON "landing_page_articles_items" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "landing_page_articles_items_image_idx" ON "landing_page_articles_items" ("image_id");

    -- Foreign keys (DO blocks skip if the constraint already exists)
    DO $$ BEGIN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_transform_image_id_media_id_fk" FOREIGN KEY ("transform_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_achievements_background_image_id_media_id_fk" FOREIGN KEY ("achievements_background_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_inspect_testimonial_image_id_media_id_fk" FOREIGN KEY ("inspect_testimonial_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "landing_page_trusted_logos" ADD CONSTRAINT "landing_page_trusted_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_trusted_logos" ADD CONSTRAINT "landing_page_trusted_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_transform_features" ADD CONSTRAINT "landing_page_transform_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_solutions_blocks" ADD CONSTRAINT "landing_page_solutions_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_solutions_blocks" ADD CONSTRAINT "landing_page_solutions_blocks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_solutions_blocks_bullets" ADD CONSTRAINT "landing_page_solutions_blocks_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page_solutions_blocks"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_testimonials_items" ADD CONSTRAINT "landing_page_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_faq_items" ADD CONSTRAINT "landing_page_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_achievements_stats" ADD CONSTRAINT "landing_page_achievements_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_articles_items" ADD CONSTRAINT "landing_page_articles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "landing_page_articles_items" ADD CONSTRAINT "landing_page_articles_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "landing_page_articles_items" CASCADE;
    DROP TABLE IF EXISTS "landing_page_achievements_stats" CASCADE;
    DROP TABLE IF EXISTS "landing_page_faq_items" CASCADE;
    DROP TABLE IF EXISTS "landing_page_testimonials_items" CASCADE;
    DROP TABLE IF EXISTS "landing_page_solutions_blocks_bullets" CASCADE;
    DROP TABLE IF EXISTS "landing_page_solutions_blocks" CASCADE;
    DROP TABLE IF EXISTS "landing_page_transform_features" CASCADE;
    DROP TABLE IF EXISTS "landing_page_trusted_logos" CASCADE;
    DROP TABLE IF EXISTS "landing_page" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_landing_page_solutions_blocks_variant";
  `)
}
