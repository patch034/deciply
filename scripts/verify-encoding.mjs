import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const fixMode = process.argv.includes("--fix");
const exts = new Set([".ts", ".tsx", ".json", ".md"]);
const ignoreDirs = new Set([".git", ".next", "node_modules", "public"]);
const suspiciousEncodingPattern = /(?:[\u00C2\u00C3\u00C4\u00C5\uFFFD]|\u00E2\u20AC|\u00E2\u20AC\u2122|\u00E2\u20AC\u0153|\u00E2\u20AC\u009D|\u00E2\u20AC\u00A2|\u00E2\u20AC\u201C|\u00E2\u20AC\u201D)/;
const turkishUpper = "A-Z\\u00C7\\u011E\\u0130\\u00D6\\u015E\\u00DC";
const turkishLower = "a-z\\u00E7\\u011F\\u0131\\u00F6\\u015F\\u00FC";
const suspiciousAsciiFallbackPattern = new RegExp(
  `\\b(?:[${turkishUpper}]?[${turkishLower}]*[1_][${turkishLower}]+(?:[1_][${turkishLower}]+)*|0[${turkishUpper}${turkishLower}]{2,})\\b`,
  "gu"
);
const sentinel = "\u015E\u011F\u0130\u00E7\u00F6\u00FC";
const ignoredAsciiFallbackTokens = new Set(["_blank", "1fr_auto"]);
const blogAsciiFallbackScopes = [
  "src/data/blog.ts",
  "src/data/blog-playbooks.ts",
  "src/data/blog-generated.ts",
  "src/lib/blog.ts",
  "src/lib/seo.ts",
  "src/app/[locale]/blog/",
  "src/components/blog/"
];

function hasSuspiciousEncoding(value) {
  return suspiciousEncodingPattern.test(value);
}

function hasSuspiciousAsciiFallback(value) {
  const matches = value.match(suspiciousAsciiFallbackPattern);

  if (!matches) {
    return false;
  }

  return matches.some((token) => !ignoredAsciiFallbackTokens.has(token));
}

function decodeLatin1Utf8(value) {
  return Buffer.from(value, "latin1").toString("utf8");
}

function repairSuspiciousEncoding(value) {
  let current = value.normalize("NFC");

  for (let index = 0; index < 4 && hasSuspiciousEncoding(current); index += 1) {
    const decoded = decodeLatin1Utf8(current).normalize("NFC");
    if (decoded === current) break;
    current = decoded;
  }

  return current;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }
    if (exts.has(path.extname(entry.name))) files.push(fullPath);
  }
  return files;
}

const files = walk(root);
const changedFiles = [];
const asciiFallbackFiles = [];

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const repaired = repairSuspiciousEncoding(original);
  const relativeFile = path.relative(root, file).replace(/\\/g, "/");

  if (repaired !== original) {
    changedFiles.push(relativeFile);
    if (fixMode) fs.writeFileSync(file, repaired, "utf8");
  }

  if (
    blogAsciiFallbackScopes.some((scope) => relativeFile === scope || relativeFile.startsWith(scope)) &&
    hasSuspiciousAsciiFallback(repaired)
  ) {
    asciiFallbackFiles.push(relativeFile);
  }
}

const sentinelCheck = repairSuspiciousEncoding(sentinel);
if (sentinelCheck !== sentinel) {
  console.error(`[encoding] Sentinel failed: expected ${sentinel}, got ${sentinelCheck}`);
  process.exit(1);
}

if (changedFiles.length) {
  const label = fixMode ? "repaired" : "detected";
  console.log(`[encoding] ${label} suspicious mojibake files:`);
  for (const file of changedFiles) console.log(`- ${file}`);
  if (!fixMode) process.exit(1);
}

if (asciiFallbackFiles.length) {
  console.log("[encoding] detected Turkish ASCII fallback files:");
  for (const file of asciiFallbackFiles) console.log(`- ${file}`);
  process.exit(1);
}

if (!changedFiles.length) {
  console.log("[encoding] No suspicious encoding found.");
}