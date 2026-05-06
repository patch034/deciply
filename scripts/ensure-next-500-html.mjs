import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const exportDir = path.join(root, ".next", "export");
const exportFile = path.join(exportDir, "500.html");
const serverPagesDir = path.join(root, ".next", "server", "pages");
const serverPagesFile = path.join(serverPagesDir, "500.html");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>500 | Deciply</title>
  </head>
  <body>
    <p>500</p>
  </body>
</html>
`;

await fs.mkdir(exportDir, { recursive: true });
await fs.mkdir(serverPagesDir, { recursive: true });

await fs.writeFile(exportFile, html, "utf8");
await fs.writeFile(serverPagesFile, html, "utf8");

console.log("[build] Ensured .next/export/500.html and .next/server/pages/500.html exist");
