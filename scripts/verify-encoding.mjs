import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const fixMode = process.argv.includes("--fix");
const exts = new Set([".ts", ".tsx", ".json", ".md"]);
const ignoreDirs = new Set([".git", ".next", "node_modules", "public"]);
const suspiciousEncodingPattern = /[\u00C2\u00C3\u00C4\u00C5\u00E2\uFFFD]/;
const sentinel = "Şğİçöü";

function hasSuspiciousEncoding(value) {
  return suspiciousEncodingPattern.test(value);
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

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const repaired = repairSuspiciousEncoding(original);
  if (repaired !== original) {
    changedFiles.push(path.relative(root, file).replace(/\\/g, "/"));
    if (fixMode) fs.writeFileSync(file, repaired, "utf8");
  }
}

const sentinelCheck = repairSuspiciousEncoding(sentinel);
if (sentinelCheck !== sentinel) {
  console.error(`[encoding] Sentinel failed: expected ${sentinel}, got ${sentinelCheck}`);
  process.exit(1);
}

if (changedFiles.length) {
  const label = fixMode ? "repaired" : "detected";
  console.log(`[encoding] ${label} suspicious files:`);
  for (const file of changedFiles) console.log(`- ${file}`);
  if (!fixMode) process.exit(1);
} else {
  console.log("[encoding] No suspicious encoding found.");
}
