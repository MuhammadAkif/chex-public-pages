import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the `commercial-fleet-page` Payload global (and its array sub-tables)
 * used by the /commercial-fleet-inspection-service route. Purely additive and
 * idempotent — it only creates new `commercial_fleet_page*` tables/enums and
 * never touches existing collections or globals (home_page, service_page,
 * landing_page, inspection_form_page, locations, posts, media, users are all
 * left untouched).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_commercial_fleet_page_platform_features_icon" AS ENUM('check', 'doc', 'shield', 'plate', 'chart', 'code');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_commercial_fleet_page_benefits_items_icon" AS ENUM('fast', 'cost', 'accuracy', 'experience', 'risk');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "meta_title" varchar,
      "meta_description" varchar,
      "hero_rating" varchar,
      "hero_title" varchar,
      "hero_description" varchar,
      "hero_primary_cta_label" varchar,
      "hero_primary_cta_href" varchar,
      "hero_secondary_cta_label" varchar,
      "hero_secondary_cta_href" varchar,
      "hero_media" varchar,
      "flow_title" varchar,
      "flow_description" varchar,
      "platform_title" varchar,
      "platform_description" varchar,
      "community_trending_title" varchar,
      "community_inspect_title" varchar,
      "community_inspect_highlight" varchar,
      "community_manage_title" varchar,
      "community_manage_image" varchar,
      "community_manage_badge" varchar,
      "community_trusted_title" varchar,
      "how_it_works_title" varchar,
      "how_it_works_description" varchar,
      "benefits_title" varchar,
      "testimonials_title" varchar,
      "testimonials_description" varchar,
      "testimonials_label" varchar,
      "faq_title" varchar,
      "faq_description" varchar,
      "cta_title" varchar,
      "cta_description" varchar,
      "cta_primary_cta_label" varchar,
      "cta_primary_cta_href" varchar,
      "cta_secondary_cta_label" varchar,
      "cta_secondary_cta_href" varchar,
      "cta_note" varchar,
      "cta_background" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_flow_steps" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "step" varchar,
      "title" varchar,
      "description" varchar
    );

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_platform_features" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "icon" "public"."enum_commercial_fleet_page_platform_features_icon" DEFAULT 'check',
      "highlighted" boolean DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_community_stats" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar
    );

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_community_manage_bullets" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "text" varchar
    );

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_community_trusted_logos" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_how_it_works_steps" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "step" varchar,
      "title" varchar,
      "description" varchar,
      "image" varchar
    );

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_benefits_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "icon" "public"."enum_commercial_fleet_page_benefits_items_icon" DEFAULT 'fast',
      "highlighted" boolean DEFAULT false,
      "wide" boolean DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_testimonials_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "quote" varchar,
      "stars" numeric DEFAULT 5,
      "avatar" varchar
    );

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_faq_items" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar,
      "answer" varchar
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_flow_steps_order_idx" ON "commercial_fleet_page_flow_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_flow_steps_parent_id_idx" ON "commercial_fleet_page_flow_steps" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_platform_features_order_idx" ON "commercial_fleet_page_platform_features" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_platform_features_parent_id_idx" ON "commercial_fleet_page_platform_features" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_community_stats_order_idx" ON "commercial_fleet_page_community_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_community_stats_parent_id_idx" ON "commercial_fleet_page_community_stats" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_community_manage_bullets_order_idx" ON "commercial_fleet_page_community_manage_bullets" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_community_manage_bullets_parent_id_idx" ON "commercial_fleet_page_community_manage_bullets" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_community_trusted_logos_order_idx" ON "commercial_fleet_page_community_trusted_logos" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_community_trusted_logos_parent_id_idx" ON "commercial_fleet_page_community_trusted_logos" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_how_it_works_steps_order_idx" ON "commercial_fleet_page_how_it_works_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_how_it_works_steps_parent_id_idx" ON "commercial_fleet_page_how_it_works_steps" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_benefits_items_order_idx" ON "commercial_fleet_page_benefits_items" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_benefits_items_parent_id_idx" ON "commercial_fleet_page_benefits_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_testimonials_items_order_idx" ON "commercial_fleet_page_testimonials_items" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_testimonials_items_parent_id_idx" ON "commercial_fleet_page_testimonials_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_faq_items_order_idx" ON "commercial_fleet_page_faq_items" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_faq_items_parent_id_idx" ON "commercial_fleet_page_faq_items" ("_parent_id");

    -- Foreign keys (DO blocks skip if the constraint already exists)
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_flow_steps" ADD CONSTRAINT "commercial_fleet_page_flow_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_platform_features" ADD CONSTRAINT "commercial_fleet_page_platform_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_community_stats" ADD CONSTRAINT "commercial_fleet_page_community_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_community_manage_bullets" ADD CONSTRAINT "commercial_fleet_page_community_manage_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_community_trusted_logos" ADD CONSTRAINT "commercial_fleet_page_community_trusted_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_how_it_works_steps" ADD CONSTRAINT "commercial_fleet_page_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_benefits_items" ADD CONSTRAINT "commercial_fleet_page_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_testimonials_items" ADD CONSTRAINT "commercial_fleet_page_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_faq_items" ADD CONSTRAINT "commercial_fleet_page_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "commercial_fleet_page_faq_items" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page_testimonials_items" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page_benefits_items" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page_how_it_works_steps" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page_community_trusted_logos" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page_community_manage_bullets" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page_community_stats" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page_platform_features" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page_flow_steps" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_commercial_fleet_page_benefits_items_icon";
    DROP TYPE IF EXISTS "public"."enum_commercial_fleet_page_platform_features_icon";
  `)
}
