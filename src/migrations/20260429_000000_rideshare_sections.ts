import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."loc_rs_plan_tone" AS ENUM('primary', 'accent');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."loc_rs_highlight_tone" AS ENUM('primary', 'accent');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "register_ride_share_section_eyebrow" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "register_ride_share_section_title" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "register_ride_share_section_cta_label" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "register_ride_share_section_cta_href" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "register_ride_share_section_initial_image_id" uuid;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "register_ride_share_section_initial_image_fallback_url" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "register_ride_share_section_initial_image_alt" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "pricing_ride_share_section_title" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "pricing_ride_share_section_description" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "pricing_ride_share_section_currency_symbol" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "pricing_ride_share_section_highlight_icon_id" uuid;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "pricing_ride_share_section_highlight_icon_fallback_url" varchar;
    ALTER TABLE "locations" ADD COLUMN IF NOT EXISTS "pricing_ride_share_section_highlight_icon_alt" varchar;

    CREATE TABLE IF NOT EXISTS "locations_register_ride_share_section_steps" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "step" varchar,
      "title" varchar,
      "description" varchar,
      "icon_id" uuid,
      "icon_fallback_url" varchar,
      "icon_alt" varchar,
      "image_id" uuid,
      "image_fallback_url" varchar,
      "image_alt" varchar
    );

    CREATE TABLE IF NOT EXISTS "locations_pricing_ride_share_section_plans" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "price" varchar,
      "description" varchar,
      "sub_description" varchar,
      "button_label" varchar,
      "button_href" varchar,
      "tone" "public"."loc_rs_plan_tone" DEFAULT 'primary'
    );

    CREATE TABLE IF NOT EXISTS "locations_pricing_ride_share_section_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "emphasis" varchar,
      "text" varchar,
      "emphasis_tone" "public"."loc_rs_highlight_tone" DEFAULT 'accent'
    );

    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_register_ride_share_section_eyebrow" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_register_ride_share_section_title" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_register_ride_share_section_cta_label" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_register_ride_share_section_cta_href" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_register_ride_share_section_initial_image_id" uuid;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_register_ride_share_section_initial_image_fallback_url" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_register_ride_share_section_initial_image_alt" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_pricing_ride_share_section_title" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_pricing_ride_share_section_description" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_pricing_ride_share_section_currency_symbol" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_pricing_ride_share_section_highlight_icon_id" uuid;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_pricing_ride_share_section_highlight_icon_fallback_url" varchar;
    ALTER TABLE "_locations_v" ADD COLUMN IF NOT EXISTS "version_pricing_ride_share_section_highlight_icon_alt" varchar;

    CREATE TABLE IF NOT EXISTS "_locations_v_version_register_ride_share_section_steps" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "step" varchar,
      "title" varchar,
      "description" varchar,
      "icon_id" uuid,
      "icon_fallback_url" varchar,
      "icon_alt" varchar,
      "image_id" uuid,
      "image_fallback_url" varchar,
      "image_alt" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_locations_v_version_pricing_ride_share_section_plans" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "name" varchar,
      "price" varchar,
      "description" varchar,
      "sub_description" varchar,
      "button_label" varchar,
      "button_href" varchar,
      "tone" "public"."loc_rs_plan_tone" DEFAULT 'primary',
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_locations_v_version_pricing_ride_share_section_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "emphasis" varchar,
      "text" varchar,
      "emphasis_tone" "public"."loc_rs_highlight_tone" DEFAULT 'accent',
      "_uuid" varchar
    );

    ALTER TABLE "locations" ADD CONSTRAINT "loc_reg_init_img_media_fk" FOREIGN KEY ("register_ride_share_section_initial_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "locations" ADD CONSTRAINT "loc_price_hi_icon_media_fk" FOREIGN KEY ("pricing_ride_share_section_highlight_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "locations_register_ride_share_section_steps" ADD CONSTRAINT "loc_reg_steps_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "locations_register_ride_share_section_steps" ADD CONSTRAINT "loc_reg_steps_icon_media_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "locations_register_ride_share_section_steps" ADD CONSTRAINT "loc_reg_steps_image_media_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "locations_pricing_ride_share_section_plans" ADD CONSTRAINT "loc_price_plans_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "locations_pricing_ride_share_section_highlights" ADD CONSTRAINT "loc_price_hi_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "_locations_v" ADD CONSTRAINT "loc_v_reg_init_img_media_fk" FOREIGN KEY ("version_register_ride_share_section_initial_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_locations_v" ADD CONSTRAINT "loc_v_price_hi_icon_media_fk" FOREIGN KEY ("version_pricing_ride_share_section_highlight_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_locations_v_version_register_ride_share_section_steps" ADD CONSTRAINT "loc_v_reg_steps_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_locations_v_version_register_ride_share_section_steps" ADD CONSTRAINT "loc_v_reg_steps_icon_media_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_locations_v_version_register_ride_share_section_steps" ADD CONSTRAINT "loc_v_reg_steps_image_media_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_locations_v_version_pricing_ride_share_section_plans" ADD CONSTRAINT "loc_v_price_plans_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_locations_v_version_pricing_ride_share_section_highlights" ADD CONSTRAINT "loc_v_price_hi_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "loc_reg_steps_order_idx" ON "locations_register_ride_share_section_steps" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "loc_reg_steps_parent_idx" ON "locations_register_ride_share_section_steps" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "loc_reg_steps_icon_idx" ON "locations_register_ride_share_section_steps" USING btree ("icon_id");
    CREATE INDEX IF NOT EXISTS "loc_reg_steps_image_idx" ON "locations_register_ride_share_section_steps" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "loc_price_plans_order_idx" ON "locations_pricing_ride_share_section_plans" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "loc_price_plans_parent_idx" ON "locations_pricing_ride_share_section_plans" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "loc_price_hi_order_idx" ON "locations_pricing_ride_share_section_highlights" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "loc_price_hi_parent_idx" ON "locations_pricing_ride_share_section_highlights" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "loc_reg_init_img_idx" ON "locations" USING btree ("register_ride_share_section_initial_image_id");
    CREATE INDEX IF NOT EXISTS "loc_price_hi_icon_idx" ON "locations" USING btree ("pricing_ride_share_section_highlight_icon_id");

    CREATE INDEX IF NOT EXISTS "loc_v_reg_steps_order_idx" ON "_locations_v_version_register_ride_share_section_steps" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "loc_v_reg_steps_parent_idx" ON "_locations_v_version_register_ride_share_section_steps" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "loc_v_reg_steps_icon_idx" ON "_locations_v_version_register_ride_share_section_steps" USING btree ("icon_id");
    CREATE INDEX IF NOT EXISTS "loc_v_reg_steps_image_idx" ON "_locations_v_version_register_ride_share_section_steps" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "loc_v_price_plans_order_idx" ON "_locations_v_version_pricing_ride_share_section_plans" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "loc_v_price_plans_parent_idx" ON "_locations_v_version_pricing_ride_share_section_plans" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "loc_v_price_hi_order_idx" ON "_locations_v_version_pricing_ride_share_section_highlights" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "loc_v_price_hi_parent_idx" ON "_locations_v_version_pricing_ride_share_section_highlights" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "loc_v_reg_init_img_idx" ON "_locations_v" USING btree ("version_register_ride_share_section_initial_image_id");
    CREATE INDEX IF NOT EXISTS "loc_v_price_hi_icon_idx" ON "_locations_v" USING btree ("version_pricing_ride_share_section_highlight_icon_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_locations_v_version_pricing_ride_share_section_highlights" CASCADE;
    DROP TABLE IF EXISTS "_locations_v_version_pricing_ride_share_section_plans" CASCADE;
    DROP TABLE IF EXISTS "_locations_v_version_register_ride_share_section_steps" CASCADE;
    DROP TABLE IF EXISTS "locations_pricing_ride_share_section_highlights" CASCADE;
    DROP TABLE IF EXISTS "locations_pricing_ride_share_section_plans" CASCADE;
    DROP TABLE IF EXISTS "locations_register_ride_share_section_steps" CASCADE;

    ALTER TABLE "locations" DROP CONSTRAINT IF EXISTS "loc_reg_init_img_media_fk";
    ALTER TABLE "locations" DROP CONSTRAINT IF EXISTS "loc_price_hi_icon_media_fk";
    ALTER TABLE "_locations_v" DROP CONSTRAINT IF EXISTS "loc_v_reg_init_img_media_fk";
    ALTER TABLE "_locations_v" DROP CONSTRAINT IF EXISTS "loc_v_price_hi_icon_media_fk";

    ALTER TABLE "locations" DROP COLUMN IF EXISTS "register_ride_share_section_eyebrow";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "register_ride_share_section_title";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "register_ride_share_section_cta_label";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "register_ride_share_section_cta_href";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "register_ride_share_section_initial_image_id";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "register_ride_share_section_initial_image_fallback_url";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "register_ride_share_section_initial_image_alt";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "pricing_ride_share_section_title";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "pricing_ride_share_section_description";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "pricing_ride_share_section_currency_symbol";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "pricing_ride_share_section_highlight_icon_id";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "pricing_ride_share_section_highlight_icon_fallback_url";
    ALTER TABLE "locations" DROP COLUMN IF EXISTS "pricing_ride_share_section_highlight_icon_alt";

    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_register_ride_share_section_eyebrow";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_register_ride_share_section_title";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_register_ride_share_section_cta_label";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_register_ride_share_section_cta_href";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_register_ride_share_section_initial_image_id";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_register_ride_share_section_initial_image_fallback_url";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_register_ride_share_section_initial_image_alt";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_pricing_ride_share_section_title";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_pricing_ride_share_section_description";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_pricing_ride_share_section_currency_symbol";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_pricing_ride_share_section_highlight_icon_id";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_pricing_ride_share_section_highlight_icon_fallback_url";
    ALTER TABLE "_locations_v" DROP COLUMN IF EXISTS "version_pricing_ride_share_section_highlight_icon_alt";

    DROP TYPE IF EXISTS "public"."loc_rs_highlight_tone";
    DROP TYPE IF EXISTS "public"."loc_rs_plan_tone";
  `)
}
