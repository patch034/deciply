import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const locales = ["tr", "en", "ar", "ru", "zh", "ja", "ko", "el", "da", "fa"];

const coverageFiles = [
  "src/lib/blog.ts",
  "src/components/blog/blog-card.tsx",
  "src/app/[locale]/alternatives/[tool]/page.tsx",
  "src/data/home.ts",
  "src/data/category-directory.ts",
  "src/lib/tool-content.ts",
  "src/lib/static-pages.ts",
  "src/components/home/home-directory-shell.tsx",
  "src/components/home/home-discovery-hub.tsx",
  "src/app/[locale]/news/page.tsx",
  "src/app/[locale]/news/[slug]/page.tsx"
];

const forbiddenPatterns = [
  { file: "src/components/blog/blog-card.tsx", pattern: /locale === "tr"/, label: "tr-only blog card label" },
  { file: "src/data/home.ts", pattern: /locale === "tr"\s*\?/, label: "tr-only homepage section branch" },
  { file: "src/app/[locale]/alternatives/[tool]/page.tsx", pattern: /safeLocale === "tr"\s*\?/, label: "tr-only alternatives heading" }
];

const errors = [];

for (const file of coverageFiles) {
  const fullPath = path.join(root, file);

  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing critical i18n file: ${file}`);
    continue;
  }

  const source = fs.readFileSync(fullPath, "utf8");

  for (const locale of locales) {
    const localePattern = new RegExp(`\\b${locale}\\b`, "g");
    if (!localePattern.test(source)) {
      errors.push(`Locale key "${locale}" not found in ${file}`);
    }
  }
}

for (const check of forbiddenPatterns) {
  const fullPath = path.join(root, check.file);
  if (!fs.existsSync(fullPath)) {
    continue;
  }

  const source = fs.readFileSync(fullPath, "utf8");
  if (check.pattern.test(source)) {
    errors.push(`Forbidden fallback pattern "${check.label}" still present in ${check.file}`);
  }
}

if (errors.length) {
  console.error("i18n verification failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`i18n verification passed for ${coverageFiles.length} critical files across ${locales.length} locales.`);
