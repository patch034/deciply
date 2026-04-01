import fs from "node:fs";
import path from "node:path";
import { repairSuspiciousEncoding, walkContentFiles, writeUtf8File, turkishSentinel } from "./encoding-guard.mjs";
import { repairTurkishAsciiFallback } from "./turkish-repair.mjs";

function repairContentText(value) {
  return repairTurkishAsciiFallback(repairSuspiciousEncoding(value)).normalize("NFC");
}

const root = process.cwd();
const files = walkContentFiles(root);
const repairedFiles = [];

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const repaired = repairContentText(original);
  const relativeFile = path.relative(root, file).replace(/\\/g, "/");

  if (repaired !== original) {
    writeUtf8File(file, repaired);
    repairedFiles.push(relativeFile);
  }
}

const sentinelCheck = repairContentText(turkishSentinel);
if (sentinelCheck !== turkishSentinel) {
  console.error(`[encoding] Sentinel failed: expected ${turkishSentinel}, got ${sentinelCheck}`);
  process.exit(1);
}

if (repairedFiles.length) {
  console.log("[encoding] repaired suspicious mojibake files:");
  for (const file of repairedFiles) {
    console.log(`- ${file}`);
  }
} else {
  console.log("[encoding] No suspicious encoding found.");
}
