import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the `inspection-form-page` Payload global (and its array sub-tables) used
 * by the /inspection-form route. Purely additive and idempotent — it only
 * creates new `inspection_form_page*` tables/enums and never touches existing
 * collections or globals (home_page, service_page, landing_page, locations,
 * posts, media, users are all left untouched).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_inspection_form_page_states_rows_uber" AS ENUM('form', 'none', 'note');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_inspection_form_page_states_rows_lyft" AS ENUM('form', 'none', 'note');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "inspection_form_page" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "meta_title" varchar NOT NULL,
      "meta_description" varchar NOT NULL,
      "hero_eyebrow" varchar NOT NULL,
      "hero_title_lead" varchar NOT NULL,
      "hero_title_highlight" varchar NOT NULL,
      "hero_description" varchar NOT NULL,
      "hero_primary_cta_label" varchar NOT NULL,
      "hero_primary_cta_href" varchar NOT NULL,
      "hero_secondary_cta_label" varchar NOT NULL,
      "hero_secondary_cta_href" varchar NOT NULL,
      "hero_note" varchar NOT NULL,
      "hero_image_id" uuid,
      "hero_image_fallback_url" varchar,
      "hero_image_alt" varchar NOT NULL,
      "trust_title" varchar NOT NULL,
      "online_eyebrow" varchar NOT NULL,
      "online_title" varchar NOT NULL,
      "online_description" varchar NOT NULL,
      "online_cta_label" varchar NOT NULL,
      "online_cta_href" varchar NOT NULL,
      "online_image_id" uuid,
      "online_image_fallback_url" varchar,
      "online_image_alt" varchar NOT NULL,
      "local_prep_eyebrow" varchar NOT NULL,
      "local_prep_title" varchar NOT NULL,
      "local_prep_cta_label" varchar NOT NULL,
      "local_prep_cta_href" varchar NOT NULL,
      "local_prep_panel_title" varchar NOT NULL,
      "requirements_eyebrow" varchar NOT NULL,
      "requirements_title" varchar NOT NULL,
      "requirements_description" varchar NOT NULL,
      "states_eyebrow" varchar NOT NULL,
      "states_title" varchar NOT NULL,
      "states_description" varchar NOT NULL,
      "states_cta_href" varchar NOT NULL,
      "states_footnote" varchar NOT NULL,
      "compare_eyebrow" varchar NOT NULL,
      "compare_title" varchar NOT NULL,
      "compare_description" varchar NOT NULL,
      "compare_cta_label" varchar NOT NULL,
      "compare_cta_href" varchar NOT NULL,
      "compare_local_tag" varchar NOT NULL,
      "compare_local_title" varchar NOT NULL,
      "compare_local_foot" varchar NOT NULL,
      "compare_chex_badge" varchar NOT NULL,
      "compare_chex_tag" varchar NOT NULL,
      "compare_chex_title" varchar NOT NULL,
      "compare_chex_foot" varchar NOT NULL,
      "reviews_title" varchar NOT NULL,
      "reviews_description" varchar NOT NULL,
      "reviews_label" varchar NOT NULL,
      "faq_title" varchar NOT NULL,
      "cta_title" varchar NOT NULL,
      "cta_description" varchar NOT NULL,
      "cta_cta_label" varchar NOT NULL,
      "cta_cta_href" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_trust_logos" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" uuid,
      "image_fallback_url" varchar,
      "alt" varchar NOT NULL,
      "class_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_online_steps" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_local_prep_paragraphs" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_local_prep_panel_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_requirements_groups" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "intro" varchar,
      "two_column" boolean DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_requirements_groups_bullets" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_states_rows" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "uber" "public"."enum_inspection_form_page_states_rows_uber" DEFAULT 'none' NOT NULL,
      "lyft" "public"."enum_inspection_form_page_states_rows_lyft" DEFAULT 'none' NOT NULL,
      "note" varchar
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_compare_local_steps" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_compare_chex_steps" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_reviews_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "quote" varchar NOT NULL,
      "stars" numeric DEFAULT 5 NOT NULL,
      "avatar" varchar
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_faq_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar NOT NULL,
      "answer" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "inspection_form_page_cta_stats" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS "inspection_form_page_hero_image_idx" ON "inspection_form_page" ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_online_image_idx" ON "inspection_form_page" ("online_image_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_trust_logos_order_idx" ON "inspection_form_page_trust_logos" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_trust_logos_parent_id_idx" ON "inspection_form_page_trust_logos" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_trust_logos_image_idx" ON "inspection_form_page_trust_logos" ("image_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_online_steps_order_idx" ON "inspection_form_page_online_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_online_steps_parent_id_idx" ON "inspection_form_page_online_steps" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_local_prep_paragraphs_order_idx" ON "inspection_form_page_local_prep_paragraphs" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_local_prep_paragraphs_parent_id_idx" ON "inspection_form_page_local_prep_paragraphs" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_local_prep_panel_items_order_idx" ON "inspection_form_page_local_prep_panel_items" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_local_prep_panel_items_parent_id_idx" ON "inspection_form_page_local_prep_panel_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_requirements_groups_order_idx" ON "inspection_form_page_requirements_groups" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_requirements_groups_parent_id_idx" ON "inspection_form_page_requirements_groups" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_requirements_groups_bullets_order_idx" ON "inspection_form_page_requirements_groups_bullets" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_requirements_groups_bullets_parent_id_idx" ON "inspection_form_page_requirements_groups_bullets" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_states_rows_order_idx" ON "inspection_form_page_states_rows" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_states_rows_parent_id_idx" ON "inspection_form_page_states_rows" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_compare_local_steps_order_idx" ON "inspection_form_page_compare_local_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_compare_local_steps_parent_id_idx" ON "inspection_form_page_compare_local_steps" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_compare_chex_steps_order_idx" ON "inspection_form_page_compare_chex_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_compare_chex_steps_parent_id_idx" ON "inspection_form_page_compare_chex_steps" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_reviews_items_order_idx" ON "inspection_form_page_reviews_items" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_reviews_items_parent_id_idx" ON "inspection_form_page_reviews_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_faq_items_order_idx" ON "inspection_form_page_faq_items" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_faq_items_parent_id_idx" ON "inspection_form_page_faq_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "inspection_form_page_cta_stats_order_idx" ON "inspection_form_page_cta_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "inspection_form_page_cta_stats_parent_id_idx" ON "inspection_form_page_cta_stats" ("_parent_id");

    -- Foreign keys (DO blocks skip if the constraint already exists)
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page" ADD CONSTRAINT "inspection_form_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page" ADD CONSTRAINT "inspection_form_page_online_image_id_media_id_fk" FOREIGN KEY ("online_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_trust_logos" ADD CONSTRAINT "inspection_form_page_trust_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_trust_logos" ADD CONSTRAINT "inspection_form_page_trust_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_online_steps" ADD CONSTRAINT "inspection_form_page_online_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_local_prep_paragraphs" ADD CONSTRAINT "inspection_form_page_local_prep_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_local_prep_panel_items" ADD CONSTRAINT "inspection_form_page_local_prep_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_requirements_groups" ADD CONSTRAINT "inspection_form_page_requirements_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_requirements_groups_bullets" ADD CONSTRAINT "inspection_form_page_requirements_groups_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page_requirements_groups"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_states_rows" ADD CONSTRAINT "inspection_form_page_states_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_compare_local_steps" ADD CONSTRAINT "inspection_form_page_compare_local_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_compare_chex_steps" ADD CONSTRAINT "inspection_form_page_compare_chex_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_reviews_items" ADD CONSTRAINT "inspection_form_page_reviews_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_faq_items" ADD CONSTRAINT "inspection_form_page_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "inspection_form_page_cta_stats" ADD CONSTRAINT "inspection_form_page_cta_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "inspection_form_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "inspection_form_page_cta_stats" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_faq_items" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_reviews_items" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_compare_chex_steps" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_compare_local_steps" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_states_rows" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_requirements_groups_bullets" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_requirements_groups" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_local_prep_panel_items" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_local_prep_paragraphs" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_online_steps" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page_trust_logos" CASCADE;
    DROP TABLE IF EXISTS "inspection_form_page" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_inspection_form_page_states_rows_lyft";
    DROP TYPE IF EXISTS "public"."enum_inspection_form_page_states_rows_uber";
  `)
}
