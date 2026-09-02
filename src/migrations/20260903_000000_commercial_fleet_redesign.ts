import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Redesign of the Commercial Fleet page four-step flow + new fleet-operators
 * section (Figma node 2728-4278). Additive/idempotent apart from dropping the
 * now-unused `flow_steps.step` column:
 *  - flow steps gain `number`, `metric_label`, `metric` + a nested `pills` array
 *  - new `fleet_operators` group columns on the parent table
 *  - new `fleet_operators` stats/features array tables (+ features icon enum)
 * Only touches `commercial_fleet_page*` objects.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "commercial_fleet_page_flow_steps" ADD COLUMN IF NOT EXISTS "number" varchar;
    ALTER TABLE "commercial_fleet_page_flow_steps" ADD COLUMN IF NOT EXISTS "metric_label" varchar;
    ALTER TABLE "commercial_fleet_page_flow_steps" ADD COLUMN IF NOT EXISTS "metric" varchar;
    -- Legacy "step" column is left in place (kept as a hidden field) so the
    -- dev-mode schema push stays additive.

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_flow_steps_pills" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar
    );
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_flow_steps_pills_order_idx" ON "commercial_fleet_page_flow_steps_pills" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_flow_steps_pills_parent_id_idx" ON "commercial_fleet_page_flow_steps_pills" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_flow_steps_pills" ADD CONSTRAINT "commercial_fleet_page_flow_steps_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page_flow_steps"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "commercial_fleet_page" ADD COLUMN IF NOT EXISTS "fleet_operators_eyebrow" varchar;
    ALTER TABLE "commercial_fleet_page" ADD COLUMN IF NOT EXISTS "fleet_operators_title" varchar;
    ALTER TABLE "commercial_fleet_page" ADD COLUMN IF NOT EXISTS "fleet_operators_description" varchar;
    ALTER TABLE "commercial_fleet_page" ADD COLUMN IF NOT EXISTS "fleet_operators_primary_cta_label" varchar;
    ALTER TABLE "commercial_fleet_page" ADD COLUMN IF NOT EXISTS "fleet_operators_primary_cta_href" varchar;
    ALTER TABLE "commercial_fleet_page" ADD COLUMN IF NOT EXISTS "fleet_operators_secondary_cta_label" varchar;
    ALTER TABLE "commercial_fleet_page" ADD COLUMN IF NOT EXISTS "fleet_operators_secondary_cta_href" varchar;
    ALTER TABLE "commercial_fleet_page" ADD COLUMN IF NOT EXISTS "fleet_operators_background" varchar;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_commercial_fleet_page_fleet_operators_features_icon" AS ENUM('onboard', 'api', 'condition');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_fleet_operators_stats" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar
    );
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_fleet_operators_stats_order_idx" ON "commercial_fleet_page_fleet_operators_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_fleet_operators_stats_parent_id_idx" ON "commercial_fleet_page_fleet_operators_stats" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_fleet_operators_stats" ADD CONSTRAINT "commercial_fleet_page_fleet_operators_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "commercial_fleet_page_fleet_operators_features" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" "public"."enum_commercial_fleet_page_fleet_operators_features_icon" DEFAULT 'onboard',
      "title" varchar,
      "description" varchar
    );
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_fleet_operators_features_order_idx" ON "commercial_fleet_page_fleet_operators_features" ("_order");
    CREATE INDEX IF NOT EXISTS "commercial_fleet_page_fleet_operators_features_parent_id_idx" ON "commercial_fleet_page_fleet_operators_features" ("_parent_id");
    DO $$ BEGIN
      ALTER TABLE "commercial_fleet_page_fleet_operators_features" ADD CONSTRAINT "commercial_fleet_page_fleet_operators_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "commercial_fleet_page"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "commercial_fleet_page_fleet_operators_features" CASCADE;
    DROP TABLE IF EXISTS "commercial_fleet_page_fleet_operators_stats" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_commercial_fleet_page_fleet_operators_features_icon";
    DROP TABLE IF EXISTS "commercial_fleet_page_flow_steps_pills" CASCADE;
    ALTER TABLE "commercial_fleet_page" DROP COLUMN IF EXISTS "fleet_operators_eyebrow";
    ALTER TABLE "commercial_fleet_page" DROP COLUMN IF EXISTS "fleet_operators_title";
    ALTER TABLE "commercial_fleet_page" DROP COLUMN IF EXISTS "fleet_operators_description";
    ALTER TABLE "commercial_fleet_page" DROP COLUMN IF EXISTS "fleet_operators_primary_cta_label";
    ALTER TABLE "commercial_fleet_page" DROP COLUMN IF EXISTS "fleet_operators_primary_cta_href";
    ALTER TABLE "commercial_fleet_page" DROP COLUMN IF EXISTS "fleet_operators_secondary_cta_label";
    ALTER TABLE "commercial_fleet_page" DROP COLUMN IF EXISTS "fleet_operators_secondary_cta_href";
    ALTER TABLE "commercial_fleet_page_flow_steps" DROP COLUMN IF EXISTS "number";
    ALTER TABLE "commercial_fleet_page_flow_steps" DROP COLUMN IF EXISTS "metric_label";
    ALTER TABLE "commercial_fleet_page_flow_steps" DROP COLUMN IF EXISTS "metric";
  `)
}
