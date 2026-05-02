import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const openNextDir = path.join(root, ".open-next");
const workerSource = path.join(openNextDir, "worker.js");
const workerTarget = path.join(openNextDir, "_worker.js");
const assetsDir = path.join(openNextDir, "assets");

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function copyTreeContents(sourceDir, destinationDir) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);
    await fs.cp(sourcePath, destinationPath, { recursive: true, force: true });
  }
}

if (!(await exists(workerSource))) {
  console.error("[cloudflare] Missing .open-next/worker.js");
  process.exit(1);
}

if (!(await exists(assetsDir))) {
  console.error("[cloudflare] Missing .open-next/assets");
  process.exit(1);
}

await fs.copyFile(workerSource, workerTarget);
console.log("[cloudflare] Copied .open-next/worker.js -> .open-next/_worker.js");

await copyTreeContents(assetsDir, openNextDir);
console.log("[cloudflare] Mirrored .open-next/assets contents into .open-next root");

console.log("[cloudflare] Pages preparation complete");
