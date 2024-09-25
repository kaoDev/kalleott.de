import {
	type MigrateDownArgs,
	type MigrateUpArgs,
	sql,
} from "@payloadcms/db-postgres";

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   ALTER TABLE "books" ADD COLUMN "summary" jsonb;
  ALTER TABLE "books" DROP COLUMN IF EXISTS "description";`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   ALTER TABLE "books" ADD COLUMN "description" jsonb;
  ALTER TABLE "books" DROP COLUMN IF EXISTS "summary";`);
}
