import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_locations_showcase_visual_variant" AS ENUM('organic-frame', 'wave', 'processing', 'preview');
  CREATE TYPE "public"."enum_locations_manage_illustration_variant" AS ENUM('framed-screen', 'offset-screen');
  CREATE TYPE "public"."enum_locations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__locations_v_version_showcase_visual_variant" AS ENUM('organic-frame', 'wave', 'processing', 'preview');
  CREATE TYPE "public"."enum__locations_v_version_manage_illustration_variant" AS ENUM('framed-screen', 'offset-screen');
  CREATE TYPE "public"."enum__locations_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "locations_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "locations_hero_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" uuid,
  	"image_fallback_url" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "locations_overview_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "locations_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"image_fallback_url" varchar,
  	"reverse" boolean DEFAULT false
  );
  
  CREATE TABLE "locations_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "locations_regions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"city" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"image_fallback_url" varchar
  );
  
  CREATE TABLE "locations_manage_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "locations_case_studies_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"metric" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"image_fallback_url" varchar,
  	"caption" varchar,
  	"link_href" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "locations_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"quote" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "locations_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "locations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"page_class_name" varchar DEFAULT 'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  	"hero_rating" varchar,
  	"hero_rating_badge_image_id" uuid,
  	"hero_rating_badge_image_fallback_url" varchar,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"hero_primary_label" varchar,
  	"hero_secondary_label" varchar,
  	"hero_helper_text" varchar,
  	"hero_demo_href" varchar,
  	"hero_style_section_class_name" varchar DEFAULT 'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_100%)]',
  	"hero_style_layout_class_name" varchar DEFAULT 'lg:grid-cols-[0.98fr_1fr] lg:gap-14',
  	"hero_style_rating_container_class_name" varchar,
  	"hero_style_title_class_name" varchar DEFAULT 'max-w-[684px] font-display text-[36px] font-bold leading-[1.15] tracking-[-1.6px] sm:text-[40px]',
  	"hero_style_description_class_name" varchar DEFAULT 'max-w-[672px]',
  	"overview_title" varchar,
  	"overview_image_id" uuid,
  	"overview_image_fallback_url" varchar,
  	"overview_image_alt" varchar,
  	"services_eyebrow" varchar,
  	"services_title" varchar,
  	"services_description" varchar,
  	"services_cta_label" varchar,
  	"services_demo_href" varchar,
  	"showcase_title" varchar,
  	"showcase_description" varchar,
  	"showcase_button_label" varchar,
  	"showcase_demo_href" varchar,
  	"showcase_video_id" uuid,
  	"showcase_video_fallback_url" varchar,
  	"showcase_visual_variant" "enum_locations_showcase_visual_variant" DEFAULT 'organic-frame',
  	"showcase_visual_show_glow" boolean DEFAULT true,
  	"regions_title" varchar,
  	"regions_description" varchar,
  	"regions_demo_href" varchar,
  	"regions_style_section_class_name" varchar,
  	"regions_style_heading_class_name" varchar DEFAULT 'max-w-5xl',
  	"regions_style_title_class_name" varchar,
  	"regions_style_article_class_name" varchar DEFAULT 'sm:grid-cols-[0.92fr_1fr]',
  	"manage_title" varchar,
  	"manage_button_label" varchar,
  	"manage_demo_href" varchar,
  	"manage_frame_image_id" uuid,
  	"manage_frame_image_fallback_url" varchar,
  	"manage_screen_image_id" uuid,
  	"manage_screen_image_fallback_url" varchar,
  	"manage_screen_class_name" varchar,
  	"manage_check_icon_color" varchar DEFAULT '#ff7a01',
  	"manage_illustration_variant" "enum_locations_manage_illustration_variant" DEFAULT 'framed-screen',
  	"manage_illustration_notch_image_id" uuid,
  	"manage_illustration_notch_image_fallback_url" varchar,
  	"case_studies_title" varchar,
  	"case_studies_arrow_image_id" uuid,
  	"case_studies_arrow_image_fallback_url" varchar,
  	"case_studies_style_section_class_name" varchar DEFAULT 'bg-[#010e2b] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-20',
  	"case_studies_style_scroll_class_name" varchar DEFAULT 'mt-14 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  	"case_studies_style_article_class_name" varchar DEFAULT 'group relative h-[485px] w-[320px] overflow-hidden rounded-[12px] border border-white sm:w-[388px]',
  	"case_studies_style_image_class_name" varchar DEFAULT 'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
  	"case_studies_style_arrow_class_name" varchar DEFAULT 'pointer-events-none absolute right-8 top-[43%] h-16 w-16 -rotate-90 object-contain opacity-95 sm:h-24 sm:w-24',
  	"case_studies_style_metric_class_name" varchar DEFAULT 'font-display text-[54px] font-bold leading-[1.1] tracking-[-0.05em] sm:text-[64px]',
  	"case_studies_style_title_class_name" varchar DEFAULT 'mt-1 font-display text-[28px] font-medium leading-[1.2]',
  	"case_studies_style_description_class_name" varchar DEFAULT 'type-body-md mt-5 max-w-[21rem] text-white/92',
  	"case_studies_style_caption_class_name" varchar,
  	"case_studies_style_link_class_name" varchar,
  	"testimonials_title" varchar,
  	"testimonials_description" varchar,
  	"testimonials_label" varchar,
  	"testimonials_quote_image_id" uuid,
  	"testimonials_quote_image_fallback_url" varchar,
  	"testimonials_star_image_id" uuid,
  	"testimonials_star_image_fallback_url" varchar,
  	"faq_id_base" varchar,
  	"faq_title" varchar,
  	"faq_description" varchar,
  	"cta_section_id" varchar,
  	"cta_title" varchar,
  	"cta_description" varchar,
  	"cta_primary_label" varchar,
  	"cta_secondary_label" varchar,
  	"cta_helper_text" varchar,
  	"cta_image_id" uuid,
  	"cta_image_fallback_url" varchar,
  	"cta_image_opacity_class_name" varchar DEFAULT 'opacity-100',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_locations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_locations_v_version_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_hero_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"image_id" uuid,
  	"image_fallback_url" varchar,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_overview_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"image_fallback_url" varchar,
  	"reverse" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_showcase_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_regions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"city" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"image_fallback_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_manage_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_case_studies_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"metric" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"image_fallback_url" varchar,
  	"caption" varchar,
  	"link_href" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"quote" varchar,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_locations_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_page_class_name" varchar DEFAULT 'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_8%,#ffffff_20%,#ffffff_100%)] text-[#1b2f4b]',
  	"version_hero_rating" varchar,
  	"version_hero_rating_badge_image_id" uuid,
  	"version_hero_rating_badge_image_fallback_url" varchar,
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_hero_primary_label" varchar,
  	"version_hero_secondary_label" varchar,
  	"version_hero_helper_text" varchar,
  	"version_hero_demo_href" varchar,
  	"version_hero_style_section_class_name" varchar DEFAULT 'bg-[linear-gradient(180deg,#ffffff_0%,#f0f6ff_100%)]',
  	"version_hero_style_layout_class_name" varchar DEFAULT 'lg:grid-cols-[0.98fr_1fr] lg:gap-14',
  	"version_hero_style_rating_container_class_name" varchar,
  	"version_hero_style_title_class_name" varchar DEFAULT 'max-w-[684px] font-display text-[36px] font-bold leading-[1.15] tracking-[-1.6px] sm:text-[40px]',
  	"version_hero_style_description_class_name" varchar DEFAULT 'max-w-[672px]',
  	"version_overview_title" varchar,
  	"version_overview_image_id" uuid,
  	"version_overview_image_fallback_url" varchar,
  	"version_overview_image_alt" varchar,
  	"version_services_eyebrow" varchar,
  	"version_services_title" varchar,
  	"version_services_description" varchar,
  	"version_services_cta_label" varchar,
  	"version_services_demo_href" varchar,
  	"version_showcase_title" varchar,
  	"version_showcase_description" varchar,
  	"version_showcase_button_label" varchar,
  	"version_showcase_demo_href" varchar,
  	"version_showcase_video_id" uuid,
  	"version_showcase_video_fallback_url" varchar,
  	"version_showcase_visual_variant" "enum__locations_v_version_showcase_visual_variant" DEFAULT 'organic-frame',
  	"version_showcase_visual_show_glow" boolean DEFAULT true,
  	"version_regions_title" varchar,
  	"version_regions_description" varchar,
  	"version_regions_demo_href" varchar,
  	"version_regions_style_section_class_name" varchar,
  	"version_regions_style_heading_class_name" varchar DEFAULT 'max-w-5xl',
  	"version_regions_style_title_class_name" varchar,
  	"version_regions_style_article_class_name" varchar DEFAULT 'sm:grid-cols-[0.92fr_1fr]',
  	"version_manage_title" varchar,
  	"version_manage_button_label" varchar,
  	"version_manage_demo_href" varchar,
  	"version_manage_frame_image_id" uuid,
  	"version_manage_frame_image_fallback_url" varchar,
  	"version_manage_screen_image_id" uuid,
  	"version_manage_screen_image_fallback_url" varchar,
  	"version_manage_screen_class_name" varchar,
  	"version_manage_check_icon_color" varchar DEFAULT '#ff7a01',
  	"version_manage_illustration_variant" "enum__locations_v_version_manage_illustration_variant" DEFAULT 'framed-screen',
  	"version_manage_illustration_notch_image_id" uuid,
  	"version_manage_illustration_notch_image_fallback_url" varchar,
  	"version_case_studies_title" varchar,
  	"version_case_studies_arrow_image_id" uuid,
  	"version_case_studies_arrow_image_fallback_url" varchar,
  	"version_case_studies_style_section_class_name" varchar DEFAULT 'bg-[#010e2b] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-20',
  	"version_case_studies_style_scroll_class_name" varchar DEFAULT 'mt-14 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  	"version_case_studies_style_article_class_name" varchar DEFAULT 'group relative h-[485px] w-[320px] overflow-hidden rounded-[12px] border border-white sm:w-[388px]',
  	"version_case_studies_style_image_class_name" varchar DEFAULT 'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
  	"version_case_studies_style_arrow_class_name" varchar DEFAULT 'pointer-events-none absolute right-8 top-[43%] h-16 w-16 -rotate-90 object-contain opacity-95 sm:h-24 sm:w-24',
  	"version_case_studies_style_metric_class_name" varchar DEFAULT 'font-display text-[54px] font-bold leading-[1.1] tracking-[-0.05em] sm:text-[64px]',
  	"version_case_studies_style_title_class_name" varchar DEFAULT 'mt-1 font-display text-[28px] font-medium leading-[1.2]',
  	"version_case_studies_style_description_class_name" varchar DEFAULT 'type-body-md mt-5 max-w-[21rem] text-white/92',
  	"version_case_studies_style_caption_class_name" varchar,
  	"version_case_studies_style_link_class_name" varchar,
  	"version_testimonials_title" varchar,
  	"version_testimonials_description" varchar,
  	"version_testimonials_label" varchar,
  	"version_testimonials_quote_image_id" uuid,
  	"version_testimonials_quote_image_fallback_url" varchar,
  	"version_testimonials_star_image_id" uuid,
  	"version_testimonials_star_image_fallback_url" varchar,
  	"version_faq_id_base" varchar,
  	"version_faq_title" varchar,
  	"version_faq_description" varchar,
  	"version_cta_section_id" varchar,
  	"version_cta_title" varchar,
  	"version_cta_description" varchar,
  	"version_cta_primary_label" varchar,
  	"version_cta_secondary_label" varchar,
  	"version_cta_helper_text" varchar,
  	"version_cta_image_id" uuid,
  	"version_cta_image_fallback_url" varchar,
  	"version_cta_image_opacity_class_name" varchar DEFAULT 'opacity-100',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__locations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "locations_id" uuid;
  ALTER TABLE "locations_hero_stats" ADD CONSTRAINT "locations_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_hero_locations" ADD CONSTRAINT "locations_hero_locations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_hero_locations" ADD CONSTRAINT "locations_hero_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_overview_paragraphs" ADD CONSTRAINT "locations_overview_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_services_items" ADD CONSTRAINT "locations_services_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_services_items" ADD CONSTRAINT "locations_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_showcase_items" ADD CONSTRAINT "locations_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_regions_items" ADD CONSTRAINT "locations_regions_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_regions_items" ADD CONSTRAINT "locations_regions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_manage_bullets" ADD CONSTRAINT "locations_manage_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_case_studies_items" ADD CONSTRAINT "locations_case_studies_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_case_studies_items" ADD CONSTRAINT "locations_case_studies_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_testimonials_items" ADD CONSTRAINT "locations_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_faq_items" ADD CONSTRAINT "locations_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_hero_rating_badge_image_id_media_id_fk" FOREIGN KEY ("hero_rating_badge_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_overview_image_id_media_id_fk" FOREIGN KEY ("overview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_showcase_video_id_media_id_fk" FOREIGN KEY ("showcase_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_manage_frame_image_id_media_id_fk" FOREIGN KEY ("manage_frame_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_manage_screen_image_id_media_id_fk" FOREIGN KEY ("manage_screen_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_manage_illustration_notch_image_id_media_id_fk" FOREIGN KEY ("manage_illustration_notch_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_case_studies_arrow_image_id_media_id_fk" FOREIGN KEY ("case_studies_arrow_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_testimonials_quote_image_id_media_id_fk" FOREIGN KEY ("testimonials_quote_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_testimonials_star_image_id_media_id_fk" FOREIGN KEY ("testimonials_star_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_version_hero_stats" ADD CONSTRAINT "_locations_v_version_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_hero_locations" ADD CONSTRAINT "_locations_v_version_hero_locations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_version_hero_locations" ADD CONSTRAINT "_locations_v_version_hero_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_overview_paragraphs" ADD CONSTRAINT "_locations_v_version_overview_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_services_items" ADD CONSTRAINT "_locations_v_version_services_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_version_services_items" ADD CONSTRAINT "_locations_v_version_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_showcase_items" ADD CONSTRAINT "_locations_v_version_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_regions_items" ADD CONSTRAINT "_locations_v_version_regions_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_version_regions_items" ADD CONSTRAINT "_locations_v_version_regions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_manage_bullets" ADD CONSTRAINT "_locations_v_version_manage_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_case_studies_items" ADD CONSTRAINT "_locations_v_version_case_studies_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_version_case_studies_items" ADD CONSTRAINT "_locations_v_version_case_studies_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_testimonials_items" ADD CONSTRAINT "_locations_v_version_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_faq_items" ADD CONSTRAINT "_locations_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_hero_rating_badge_image_id_media_id_fk" FOREIGN KEY ("version_hero_rating_badge_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_overview_image_id_media_id_fk" FOREIGN KEY ("version_overview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_showcase_video_id_media_id_fk" FOREIGN KEY ("version_showcase_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_manage_frame_image_id_media_id_fk" FOREIGN KEY ("version_manage_frame_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_manage_screen_image_id_media_id_fk" FOREIGN KEY ("version_manage_screen_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_manage_illustration_notch_image_id_media_id_fk" FOREIGN KEY ("version_manage_illustration_notch_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_case_studies_arrow_image_id_media_id_fk" FOREIGN KEY ("version_case_studies_arrow_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_testimonials_quote_image_id_media_id_fk" FOREIGN KEY ("version_testimonials_quote_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_testimonials_star_image_id_media_id_fk" FOREIGN KEY ("version_testimonials_star_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_cta_image_id_media_id_fk" FOREIGN KEY ("version_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "locations_hero_stats_order_idx" ON "locations_hero_stats" USING btree ("_order");
  CREATE INDEX "locations_hero_stats_parent_id_idx" ON "locations_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "locations_hero_locations_order_idx" ON "locations_hero_locations" USING btree ("_order");
  CREATE INDEX "locations_hero_locations_parent_id_idx" ON "locations_hero_locations" USING btree ("_parent_id");
  CREATE INDEX "locations_hero_locations_image_idx" ON "locations_hero_locations" USING btree ("image_id");
  CREATE INDEX "locations_overview_paragraphs_order_idx" ON "locations_overview_paragraphs" USING btree ("_order");
  CREATE INDEX "locations_overview_paragraphs_parent_id_idx" ON "locations_overview_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "locations_services_items_order_idx" ON "locations_services_items" USING btree ("_order");
  CREATE INDEX "locations_services_items_parent_id_idx" ON "locations_services_items" USING btree ("_parent_id");
  CREATE INDEX "locations_services_items_image_idx" ON "locations_services_items" USING btree ("image_id");
  CREATE INDEX "locations_showcase_items_order_idx" ON "locations_showcase_items" USING btree ("_order");
  CREATE INDEX "locations_showcase_items_parent_id_idx" ON "locations_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "locations_regions_items_order_idx" ON "locations_regions_items" USING btree ("_order");
  CREATE INDEX "locations_regions_items_parent_id_idx" ON "locations_regions_items" USING btree ("_parent_id");
  CREATE INDEX "locations_regions_items_image_idx" ON "locations_regions_items" USING btree ("image_id");
  CREATE INDEX "locations_manage_bullets_order_idx" ON "locations_manage_bullets" USING btree ("_order");
  CREATE INDEX "locations_manage_bullets_parent_id_idx" ON "locations_manage_bullets" USING btree ("_parent_id");
  CREATE INDEX "locations_case_studies_items_order_idx" ON "locations_case_studies_items" USING btree ("_order");
  CREATE INDEX "locations_case_studies_items_parent_id_idx" ON "locations_case_studies_items" USING btree ("_parent_id");
  CREATE INDEX "locations_case_studies_items_image_idx" ON "locations_case_studies_items" USING btree ("image_id");
  CREATE INDEX "locations_testimonials_items_order_idx" ON "locations_testimonials_items" USING btree ("_order");
  CREATE INDEX "locations_testimonials_items_parent_id_idx" ON "locations_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "locations_faq_items_order_idx" ON "locations_faq_items" USING btree ("_order");
  CREATE INDEX "locations_faq_items_parent_id_idx" ON "locations_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "locations_slug_idx" ON "locations" USING btree ("slug");
  CREATE INDEX "locations_hero_hero_rating_badge_image_idx" ON "locations" USING btree ("hero_rating_badge_image_id");
  CREATE INDEX "locations_overview_overview_image_idx" ON "locations" USING btree ("overview_image_id");
  CREATE INDEX "locations_showcase_showcase_video_idx" ON "locations" USING btree ("showcase_video_id");
  CREATE INDEX "locations_manage_manage_frame_image_idx" ON "locations" USING btree ("manage_frame_image_id");
  CREATE INDEX "locations_manage_manage_screen_image_idx" ON "locations" USING btree ("manage_screen_image_id");
  CREATE INDEX "locations_manage_illustration_manage_illustration_notch__idx" ON "locations" USING btree ("manage_illustration_notch_image_id");
  CREATE INDEX "locations_case_studies_case_studies_arrow_image_idx" ON "locations" USING btree ("case_studies_arrow_image_id");
  CREATE INDEX "locations_testimonials_testimonials_quote_image_idx" ON "locations" USING btree ("testimonials_quote_image_id");
  CREATE INDEX "locations_testimonials_testimonials_star_image_idx" ON "locations" USING btree ("testimonials_star_image_id");
  CREATE INDEX "locations_cta_cta_image_idx" ON "locations" USING btree ("cta_image_id");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "locations__status_idx" ON "locations" USING btree ("_status");
  CREATE INDEX "_locations_v_version_hero_stats_order_idx" ON "_locations_v_version_hero_stats" USING btree ("_order");
  CREATE INDEX "_locations_v_version_hero_stats_parent_id_idx" ON "_locations_v_version_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_hero_locations_order_idx" ON "_locations_v_version_hero_locations" USING btree ("_order");
  CREATE INDEX "_locations_v_version_hero_locations_parent_id_idx" ON "_locations_v_version_hero_locations" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_hero_locations_image_idx" ON "_locations_v_version_hero_locations" USING btree ("image_id");
  CREATE INDEX "_locations_v_version_overview_paragraphs_order_idx" ON "_locations_v_version_overview_paragraphs" USING btree ("_order");
  CREATE INDEX "_locations_v_version_overview_paragraphs_parent_id_idx" ON "_locations_v_version_overview_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_services_items_order_idx" ON "_locations_v_version_services_items" USING btree ("_order");
  CREATE INDEX "_locations_v_version_services_items_parent_id_idx" ON "_locations_v_version_services_items" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_services_items_image_idx" ON "_locations_v_version_services_items" USING btree ("image_id");
  CREATE INDEX "_locations_v_version_showcase_items_order_idx" ON "_locations_v_version_showcase_items" USING btree ("_order");
  CREATE INDEX "_locations_v_version_showcase_items_parent_id_idx" ON "_locations_v_version_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_regions_items_order_idx" ON "_locations_v_version_regions_items" USING btree ("_order");
  CREATE INDEX "_locations_v_version_regions_items_parent_id_idx" ON "_locations_v_version_regions_items" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_regions_items_image_idx" ON "_locations_v_version_regions_items" USING btree ("image_id");
  CREATE INDEX "_locations_v_version_manage_bullets_order_idx" ON "_locations_v_version_manage_bullets" USING btree ("_order");
  CREATE INDEX "_locations_v_version_manage_bullets_parent_id_idx" ON "_locations_v_version_manage_bullets" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_case_studies_items_order_idx" ON "_locations_v_version_case_studies_items" USING btree ("_order");
  CREATE INDEX "_locations_v_version_case_studies_items_parent_id_idx" ON "_locations_v_version_case_studies_items" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_case_studies_items_image_idx" ON "_locations_v_version_case_studies_items" USING btree ("image_id");
  CREATE INDEX "_locations_v_version_testimonials_items_order_idx" ON "_locations_v_version_testimonials_items" USING btree ("_order");
  CREATE INDEX "_locations_v_version_testimonials_items_parent_id_idx" ON "_locations_v_version_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_version_faq_items_order_idx" ON "_locations_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_locations_v_version_faq_items_parent_id_idx" ON "_locations_v_version_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_locations_v_parent_idx" ON "_locations_v" USING btree ("parent_id");
  CREATE INDEX "_locations_v_version_version_slug_idx" ON "_locations_v" USING btree ("version_slug");
  CREATE INDEX "_locations_v_version_hero_version_hero_rating_badge_imag_idx" ON "_locations_v" USING btree ("version_hero_rating_badge_image_id");
  CREATE INDEX "_locations_v_version_overview_version_overview_image_idx" ON "_locations_v" USING btree ("version_overview_image_id");
  CREATE INDEX "_locations_v_version_showcase_version_showcase_video_idx" ON "_locations_v" USING btree ("version_showcase_video_id");
  CREATE INDEX "_locations_v_version_manage_version_manage_frame_image_idx" ON "_locations_v" USING btree ("version_manage_frame_image_id");
  CREATE INDEX "_locations_v_version_manage_version_manage_screen_image_idx" ON "_locations_v" USING btree ("version_manage_screen_image_id");
  CREATE INDEX "_locations_v_version_manage_illustration_version_manage__idx" ON "_locations_v" USING btree ("version_manage_illustration_notch_image_id");
  CREATE INDEX "_locations_v_version_case_studies_version_case_studies_a_idx" ON "_locations_v" USING btree ("version_case_studies_arrow_image_id");
  CREATE INDEX "_locations_v_version_testimonials_version_testimonials_q_idx" ON "_locations_v" USING btree ("version_testimonials_quote_image_id");
  CREATE INDEX "_locations_v_version_testimonials_version_testimonials_s_idx" ON "_locations_v" USING btree ("version_testimonials_star_image_id");
  CREATE INDEX "_locations_v_version_cta_version_cta_image_idx" ON "_locations_v" USING btree ("version_cta_image_id");
  CREATE INDEX "_locations_v_version_version_updated_at_idx" ON "_locations_v" USING btree ("version_updated_at");
  CREATE INDEX "_locations_v_version_version_created_at_idx" ON "_locations_v" USING btree ("version_created_at");
  CREATE INDEX "_locations_v_version_version__status_idx" ON "_locations_v" USING btree ("version__status");
  CREATE INDEX "_locations_v_created_at_idx" ON "_locations_v" USING btree ("created_at");
  CREATE INDEX "_locations_v_updated_at_idx" ON "_locations_v" USING btree ("updated_at");
  CREATE INDEX "_locations_v_latest_idx" ON "_locations_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_hero_locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_overview_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_services_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_regions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_manage_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_case_studies_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_hero_locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_overview_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_services_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_regions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_manage_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_case_studies_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_version_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "locations_hero_stats" CASCADE;
  DROP TABLE "locations_hero_locations" CASCADE;
  DROP TABLE "locations_overview_paragraphs" CASCADE;
  DROP TABLE "locations_services_items" CASCADE;
  DROP TABLE "locations_showcase_items" CASCADE;
  DROP TABLE "locations_regions_items" CASCADE;
  DROP TABLE "locations_manage_bullets" CASCADE;
  DROP TABLE "locations_case_studies_items" CASCADE;
  DROP TABLE "locations_testimonials_items" CASCADE;
  DROP TABLE "locations_faq_items" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "_locations_v_version_hero_stats" CASCADE;
  DROP TABLE "_locations_v_version_hero_locations" CASCADE;
  DROP TABLE "_locations_v_version_overview_paragraphs" CASCADE;
  DROP TABLE "_locations_v_version_services_items" CASCADE;
  DROP TABLE "_locations_v_version_showcase_items" CASCADE;
  DROP TABLE "_locations_v_version_regions_items" CASCADE;
  DROP TABLE "_locations_v_version_manage_bullets" CASCADE;
  DROP TABLE "_locations_v_version_case_studies_items" CASCADE;
  DROP TABLE "_locations_v_version_testimonials_items" CASCADE;
  DROP TABLE "_locations_v_version_faq_items" CASCADE;
  DROP TABLE "_locations_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_locations_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_locations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "locations_id";
  DROP TYPE "public"."enum_locations_showcase_visual_variant";
  DROP TYPE "public"."enum_locations_manage_illustration_variant";
  DROP TYPE "public"."enum_locations_status";
  DROP TYPE "public"."enum__locations_v_version_showcase_visual_variant";
  DROP TYPE "public"."enum__locations_v_version_manage_illustration_variant";
  DROP TYPE "public"."enum__locations_v_version_status";`)
}
