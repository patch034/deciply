import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "AdminContent" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "type" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "locale" TEXT NOT NULL DEFAULT 'tr',
      "title" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'DRAFT',
      "featured" BOOLEAN NOT NULL DEFAULT false,
      "payload" TEXT NOT NULL DEFAULT '{}',
      "relations" TEXT NOT NULL DEFAULT '{}',
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "AdminContent_type_slug_locale_key"
    ON "AdminContent"("type", "slug", "locale")
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "AdminContent_type_status_idx"
    ON "AdminContent"("type", "status")
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "AdminContent_locale_idx"
    ON "AdminContent"("locale")
  `);
}

main()
  .then(() => {
    console.log("[admin-db] AdminContent table ready.");
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
