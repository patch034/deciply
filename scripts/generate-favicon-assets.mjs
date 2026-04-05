import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const sourceSvg = path.join(publicDir, 'favicon.svg');

const pngTargets = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon-48x48.png', 48],
  ['favicon-64x64.png', 64],
  ['favicon-96x96.png', 96],
  ['favicon-128x128.png', 128],
  ['apple-touch-icon.png', 180],
  ['favicon-192x192.png', 192],
  ['favicon-256x256.png', 256],
  ['favicon-512x512.png', 512],
  ['icon.png', 512],
  ['favicon.png', 512]
];

function toIcoEntry(size, buffer) {
  return {
    width: size >= 256 ? 0 : size,
    height: size >= 256 ? 0 : size,
    colorCount: 0,
    reserved: 0,
    planes: 1,
    bitCount: 32,
    buffer
  };
}

function buildIco(entries) {
  const headerSize = 6;
  const entrySize = 16;
  const offsetBase = headerSize + entries.length * entrySize;
  const directoryEntries = [];
  let offset = offsetBase;

  for (const entry of entries) {
    directoryEntries.push({ ...entry, offset });
    offset += entry.buffer.length;
  }

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(entries.length * entrySize);
  directoryEntries.forEach((entry, index) => {
    const start = index * entrySize;
    directory.writeUInt8(entry.width, start);
    directory.writeUInt8(entry.height, start + 1);
    directory.writeUInt8(entry.colorCount, start + 2);
    directory.writeUInt8(entry.reserved, start + 3);
    directory.writeUInt16LE(entry.planes, start + 4);
    directory.writeUInt16LE(entry.bitCount, start + 6);
    directory.writeUInt32LE(entry.buffer.length, start + 8);
    directory.writeUInt32LE(entry.offset, start + 12);
  });

  return Buffer.concat([header, directory, ...directoryEntries.map((entry) => entry.buffer)]);
}

async function renderIcon(svg, size) {
  const padding = Math.max(1, Math.round(size * 0.08));
  const innerSize = Math.max(1, size - padding * 2);
  const inner = await sharp(svg, { density: 1024 })
    .resize(innerSize, innerSize, { fit: 'contain', position: 'center' })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: inner, left: padding, top: padding }])
    .png()
    .toBuffer();
}

async function main() {
  const svg = fs.readFileSync(sourceSvg);
  const generated = new Map();

  for (const [filename, size] of pngTargets) {
    const outPath = path.join(publicDir, filename);
    const png = await renderIcon(svg, size);
    fs.writeFileSync(outPath, png);
    generated.set(size, png);
    console.log(`[favicon] wrote ${filename}`);
  }

  const icoSizes = [16, 32, 48, 64, 96, 128, 180, 192, 256];
  const icoEntries = icoSizes.map((size) => {
    const buffer = generated.get(size);
    if (!buffer) {
      throw new Error(`Missing PNG for ${size}`);
    }
    return toIcoEntry(size, buffer);
  });

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buildIco(icoEntries));
  console.log('[favicon] wrote favicon.ico');
}

main().catch((error) => {
  console.error('[favicon] generation failed');
  console.error(error);
  process.exit(1);
});
