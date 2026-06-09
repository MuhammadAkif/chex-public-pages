import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the SEO `meta` group (title + description) to the Posts collection.
 * Because drafts are enabled the columns are mirrored onto the `_posts_v`
 * version table. Purely additive and idempotent — uses ADD COLUMN IF NOT EXISTS
 * so it is safe even when dev `push: true` has already created the columns.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_title";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_description";
    ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_title";
    ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_description";
  `)
}
