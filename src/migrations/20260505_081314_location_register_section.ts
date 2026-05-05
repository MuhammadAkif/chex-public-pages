import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "locations_register_section_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_locations_v_version_register_section_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "locations" ADD COLUMN "register_section_section_id" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_background_image_id" uuid;
  ALTER TABLE "locations" ADD COLUMN "register_section_background_image_fallback_url" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_background_image_alt" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_form_heading_accent" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_form_heading_rest" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_first_name_placeholder" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_last_name_placeholder" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_email_placeholder" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_phone_placeholder" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_password_placeholder" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_terms_prefix" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_terms_link_label" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_terms_link_href" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_register_button_label" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_register_button_href" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_login_prefix" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_login_link_label" varchar;
  ALTER TABLE "locations" ADD COLUMN "register_section_login_link_href" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_section_id" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_background_image_id" uuid;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_background_image_fallback_url" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_background_image_alt" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_form_heading_accent" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_form_heading_rest" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_first_name_placeholder" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_last_name_placeholder" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_email_placeholder" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_phone_placeholder" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_password_placeholder" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_terms_prefix" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_terms_link_label" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_terms_link_href" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_register_button_label" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_register_button_href" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_login_prefix" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_login_link_label" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_register_section_login_link_href" varchar;
  ALTER TABLE "locations_register_section_headline_lines" ADD CONSTRAINT "locations_register_section_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_register_section_headline_lines" ADD CONSTRAINT "_locations_v_version_register_section_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "locations_register_section_headline_lines_order_idx" ON "locations_register_section_headline_lines" USING btree ("_order");
  CREATE INDEX "locations_register_section_headline_lines_parent_id_idx" ON "locations_register_section_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_register_section_headline_lines_order_idx" ON "_locations_v_version_register_section_headline_lines" USING btree ("_order");
  CREATE INDEX "_locations_v_version_register_section_headline_lines_parent_id_idx" ON "_locations_v_version_register_section_headline_lines" USING btree ("_parent_id");
  ALTER TABLE "locations" ADD CONSTRAINT "locations_register_section_background_image_id_media_id_fk" FOREIGN KEY ("register_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_register_section_background_image_id_media_id_fk" FOREIGN KEY ("version_register_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "locations_register_section_register_section_background_i_idx" ON "locations" USING btree ("register_section_background_image_id");
  CREATE INDEX "_locations_v_version_register_section_version_register_s_idx" ON "_locations_v" USING btree ("version_register_section_background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations_register_section_headline_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_register_section_headline_lines" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "locations_register_section_headline_lines" CASCADE;
  DROP TABLE "_locations_v_version_register_section_headline_lines" CASCADE;
  ALTER TABLE "locations" DROP CONSTRAINT "locations_register_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_locations_v" DROP CONSTRAINT "_locations_v_version_register_section_background_image_id_media_id_fk";
  
  DROP INDEX "locations_register_section_register_section_background_i_idx";
  DROP INDEX "_locations_v_version_register_section_version_register_s_idx";
  ALTER TABLE "locations" DROP COLUMN "register_section_section_id";
  ALTER TABLE "locations" DROP COLUMN "register_section_background_image_id";
  ALTER TABLE "locations" DROP COLUMN "register_section_background_image_fallback_url";
  ALTER TABLE "locations" DROP COLUMN "register_section_background_image_alt";
  ALTER TABLE "locations" DROP COLUMN "register_section_form_heading_accent";
  ALTER TABLE "locations" DROP COLUMN "register_section_form_heading_rest";
  ALTER TABLE "locations" DROP COLUMN "register_section_first_name_placeholder";
  ALTER TABLE "locations" DROP COLUMN "register_section_last_name_placeholder";
  ALTER TABLE "locations" DROP COLUMN "register_section_email_placeholder";
  ALTER TABLE "locations" DROP COLUMN "register_section_phone_placeholder";
  ALTER TABLE "locations" DROP COLUMN "register_section_password_placeholder";
  ALTER TABLE "locations" DROP COLUMN "register_section_terms_prefix";
  ALTER TABLE "locations" DROP COLUMN "register_section_terms_link_label";
  ALTER TABLE "locations" DROP COLUMN "register_section_terms_link_href";
  ALTER TABLE "locations" DROP COLUMN "register_section_register_button_label";
  ALTER TABLE "locations" DROP COLUMN "register_section_register_button_href";
  ALTER TABLE "locations" DROP COLUMN "register_section_login_prefix";
  ALTER TABLE "locations" DROP COLUMN "register_section_login_link_label";
  ALTER TABLE "locations" DROP COLUMN "register_section_login_link_href";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_section_id";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_background_image_id";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_background_image_fallback_url";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_background_image_alt";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_form_heading_accent";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_form_heading_rest";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_first_name_placeholder";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_last_name_placeholder";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_email_placeholder";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_phone_placeholder";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_password_placeholder";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_terms_prefix";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_terms_link_label";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_terms_link_href";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_register_button_label";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_register_button_href";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_login_prefix";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_login_link_label";
  ALTER TABLE "_locations_v" DROP COLUMN "version_register_section_login_link_href";`)
}
