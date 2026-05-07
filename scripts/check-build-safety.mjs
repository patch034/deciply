import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const MAX_OUT_FILES = 2000;
const MAX_SERVER_APP_FILES = 2000;
const MAX_TRACKED_FILE_BYTES = 25 * 1024 * 1024;
const ALLOWED_LARGE_FILES = new Set(
  (process.env.BUILD_SAFETY_ALLOWED_LARGE_FILES ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
);
const GENERATED_PREFIXES = [
  ".next/",
  "out/",
  ".open-next/",
  ".vercel/",
  ".next-standalone/",
  "dist/",
  "build/"
];

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function countFiles(targetPath) {
  let count = 0;
  const entries = await fs.readdir(targetPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(targetPath, entry.name);

    if (entry.isDirectory()) {
      count += await countFiles(entryPath);
    } else {
      count += 1;
    }
  }

  return count;
}

function isGeneratedTrackedPath(filePath) {
  return GENERATED_PREFIXES.some((prefix) => filePath === prefix.slice(0, -1) || filePath.startsWith(prefix));
}

async function getTrackedFiles() {
  const indexPath = path.join(root, ".git", "index");

  if (!(await pathExists(indexPath))) {
    throw new Error("Git index not found; cannot inspect tracked files for build safety.");
  }

  const buffer = await fs.readFile(indexPath);
  const signature = buffer.subarray(0, 4).toString("utf8");

  if (signature !== "DIRC") {
    throw new Error(`Unsupported git index signature: ${signature}`);
  }

  const version = buffer.readUInt32BE(4);

  if (version !== 2) {
    throw new Error(`Unsupported git index version: ${version}. Expected version 2 for build safety checks.`);
  }

  const entryCount = buffer.readUInt32BE(8);
  const paths = [];
  let offset = 12;

  for (let index = 0; index < entryCount; index += 1) {
    const entryStart = offset;
    const entryHeaderLength = 62;
    const pathStart = entryStart + entryHeaderLength;
    const pathEnd = buffer.indexOf(0, pathStart);

    if (pathEnd === -1) {
      throw new Error(`Malformed git index entry at position ${index}`);
    }

    const filePath = buffer.subarray(pathStart, pathEnd).toString("utf8");
    paths.push(filePath);

    const entryLength = pathEnd - entryStart + 1;
    const padding = (8 - (entryLength % 8)) % 8;
    offset = entryStart + entryLength + padding;
  }

  return paths;
}

const problems = [];

const outDir = path.join(root, "out");
if (await pathExists(outDir)) {
  const outFiles = await countFiles(outDir);

  if (outFiles > MAX_OUT_FILES) {
    problems.push(`out contains ${outFiles} files (limit: ${MAX_OUT_FILES})`);
  }
}

const serverAppDir = path.join(root, ".next", "server", "app");
if (await pathExists(serverAppDir)) {
  const serverAppFiles = await countFiles(serverAppDir);

  if (serverAppFiles > MAX_SERVER_APP_FILES) {
    problems.push(`.next/server/app contains ${serverAppFiles} files (limit: ${MAX_SERVER_APP_FILES})`);
  }
}

const trackedFiles = await getTrackedFiles();
const generatedTrackedFiles = trackedFiles.filter(isGeneratedTrackedPath);

if (generatedTrackedFiles.length) {
  problems.push(`generated artifacts are tracked by git: ${generatedTrackedFiles.slice(0, 10).join(", ")}${generatedTrackedFiles.length > 10 ? " ..." : ""}`);
}

for (const filePath of trackedFiles) {
  if (ALLOWED_LARGE_FILES.has(filePath)) {
    continue;
  }

  const absolutePath = path.join(root, filePath);

  try {
    const stat = await fs.stat(absolutePath);

    if (stat.isFile() && stat.size > MAX_TRACKED_FILE_BYTES) {
      problems.push(`tracked file larger than 25MB: ${filePath} (${Math.round(stat.size / (1024 * 1024))} MB)`);
    }
  } catch {
    // Ignore files that disappeared between ls-files and stat.
  }
}

if (problems.length) {
  console.error("[build-safety] Build safety check failed:");
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log("[build-safety] Safety checks passed.");
console.log(`[build-safety] Tracked files inspected: ${trackedFiles.length}`);
