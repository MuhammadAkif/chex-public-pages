import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the per-post `cta` group (title + description + secondaryLabel) to the
 * Posts collection. Because drafts are enabled the columns are mirrored onto the
 * `_posts_v` version table. Purely additive and idempotent — uses ADD COLUMN IF
 * NOT EXISTS so it is safe even when dev `push: true` has already created the
 * columns. No existing rows are modified.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cta_title" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cta_description" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cta_secondary_label" varchar;
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_cta_title" varchar;
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_cta_description" varchar;
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_cta_secondary_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "cta_title";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "cta_description";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "cta_secondary_label";
    ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_cta_title";
    ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_cta_description";
    ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_cta_secondary_label";
  `)
}
