import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Swaps the `home_page` and `landing_page` global tables so the Payload slugs
 * line up with the new site structure — WITHOUT losing any data:
 *
 *   old `home_page*`    (legacy Home content)   ->  `service_page*`  (now /service)
 *   old `landing_page*` (new landing design)    ->  `home_page*`     (now /)
 *
 * This is a pure rename of tables, indexes, constraints and the solutions
 * `variant` enum — there is no DROP/CREATE — so all seeded and admin-edited
 * content carries over untouched. The renames run in two ordered passes
 * (home -> service first, freeing the `home_page` name, then landing -> home)
 * and are idempotent: once the tables already carry their new names the LIKE
 * filters match nothing and the migration is a no-op.
 */

// Renames every table, standalone index and constraint whose identifier starts
// with `from` so it starts with `to` instead. Constraints are renamed before
// the tables they belong to (a PK rename also carries its backing index), then
// standalone CREATE INDEX indexes, then the tables themselves (FK targets follow
// table renames automatically).
const renamePrefix = (from: string, to: string) => sql.raw(`
  DO $$
  DECLARE r record;
  BEGIN
    FOR r IN
      SELECT con.conname, rel.relname AS tbl
      FROM pg_constraint con
      JOIN pg_class rel ON rel.oid = con.conrelid
      JOIN pg_namespace ns ON ns.oid = rel.relnamespace
      WHERE ns.nspname = 'public' AND con.conname LIKE '${from}%'
    LOOP
      EXECUTE format('ALTER TABLE public.%I RENAME CONSTRAINT %I TO %I',
        r.tbl, r.conname, replace(r.conname, '${from}', '${to}'));
    END LOOP;

    FOR r IN
      SELECT indexname FROM pg_indexes
      WHERE schemaname = 'public' AND indexname LIKE '${from}%'
    LOOP
      EXECUTE format('ALTER INDEX public.%I RENAME TO %I',
        r.indexname, replace(r.indexname, '${from}', '${to}'));
    END LOOP;

    FOR r IN
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public' AND tablename LIKE '${from}%'
    LOOP
      EXECUTE format('ALTER TABLE public.%I RENAME TO %I',
        r.tablename, replace(r.tablename, '${from}', '${to}'));
    END LOOP;
  END $$;
`)

const renameEnum = (from: string, to: string) => sql.raw(`
  DO $$ BEGIN
    ALTER TYPE "public"."${from}" RENAME TO "${to}";
  EXCEPTION WHEN undefined_object THEN NULL; END $$;
`)

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1) legacy Home -> Service (frees the `home_page` identifier)
  await db.execute(renamePrefix('home_page', 'service_page'))
  // 2) landing design -> Home
  await db.execute(renamePrefix('landing_page', 'home_page'))
  await db.execute(
    renameEnum(
      'enum_landing_page_solutions_blocks_variant',
      'enum_home_page_solutions_blocks_variant',
    ),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse order: Home (landing design) -> landing first (frees `home_page`),
  // then Service -> Home.
  await db.execute(
    renameEnum(
      'enum_home_page_solutions_blocks_variant',
      'enum_landing_page_solutions_blocks_variant',
    ),
  )
  await db.execute(renamePrefix('home_page', 'landing_page'))
  await db.execute(renamePrefix('service_page', 'home_page'))
}
