import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const types = ["TOOL", "BLOG_POST", "NEWS_ITEM", "CATEGORY", "COMPARISON"];

async function main() {
  for (const type of types) {
    const slug = `smoke-${type.toLowerCase().replaceAll("_", "-")}`;
    const item = await prisma.adminContent.upsert({
      where: {
        type_slug_locale: {
          type,
          slug,
          locale: "tr"
        }
      },
      create: {
        type,
        slug,
        locale: "tr",
        title: `Smoke ${type}`,
        status: "DRAFT",
        payload: "{}",
        relations: "{}"
      },
      update: {
        title: `Smoke updated ${type}`
      }
    });

    await prisma.adminContent.update({
      where: { id: item.id },
      data: { status: "PUBLISHED" }
    });

    await prisma.adminContent.delete({
      where: { id: item.id }
    });
  }
}

main()
  .then(() => {
    console.log("[admin-smoke] CRUD smoke test passed for all admin content types.");
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
