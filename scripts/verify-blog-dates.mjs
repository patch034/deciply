import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "src/data/blog.ts",
  "src/data/blog-generated.ts",
  "src/data/blog-generated-seo.ts"
].map((relativePath) => path.join(root, relativePath));

const forbiddenPatterns = [
  { label: "auto-publish date helper", pattern: /getAutoPublishDate\s*\(/ },
  { label: "publishDate fallback to createdAt", pattern: /publishDate\s*\?\?\s*entry\.createdAt/ },
  { label: "publishDate fallback to createdAt in resolver", pattern: /publishDate\s*\?\?\s*createdAt/ }
];

const errors = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const relativeFile = path.relative(root, file).replace(/\\/g, "/");

  for (const forbidden of forbiddenPatterns) {
    if (forbidden.pattern.test(content)) {
      errors.push(`${relativeFile}: contains ${forbidden.label}`);
    }
  }

  const lines = content.split(/\r?\n/);
  let currentSlug = null;
  let hasPublishDate = false;

  const flushCurrent = () => {
    if (currentSlug && !hasPublishDate) {
      errors.push(`${relativeFile}: missing explicit publishDate for "${currentSlug}"`);
    }
  };

  for (const line of lines) {
    const slugMatch = line.match(/^    slug:\s*"([^"]+)"/);
    if (slugMatch) {
      flushCurrent();
      currentSlug = slugMatch[1];
      hasPublishDate = false;
      continue;
    }

    if (currentSlug && /^    publishDate:\s*"\d{4}-\d{2}-\d{2}"[,]?\s*$/.test(line)) {
      hasPublishDate = true;
      continue;
    }

    if (currentSlug && /^    publishDate:\s*/.test(line)) {
      errors.push(`${relativeFile}: publishDate for "${currentSlug}" must be a literal YYYY-MM-DD string`);
    }
  }

  flushCurrent();
}

if (errors.length) {
  console.error("[dates] Content date validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("[dates] All blog publish dates are explicit and locked.");
