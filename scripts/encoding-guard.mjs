import fs from "node:fs";
import path from "node:path";

export const contentExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md"]);
export const ignoredDirectories = new Set([".git", ".next", ".open-next", "node_modules", "public", "review-bundle"]);
export const ignoredFilenames = new Set(["toolnova-full-code-export.md", "deciply-full-code-export.md", "turkish-repair.mjs"]);
export const turkishSentinel = "Şğİçöü";

export const suspiciousEncodingPattern =
  /(?:[\u00C2\u00C3\u00C4\u00C5\uFFFD]|\u00E2\u20AC|\u00E2\u20AC\u2122|\u00E2\u20AC\u0153|\u00E2\u20AC\u009D|\u00E2\u20AC\u00A2|\u00E2\u20AC\u201C|\u00E2\u20AC\u201D)/;

const turkishUpper = "A-Z\\u00C7\\u011E\\u0130\\u00D6\\u015E\\u00DC";
const turkishLower = "a-z\\u00E7\\u011F\\u0131\\u00F6\\u015F\\u00FC";
const suspiciousAsciiFallbackPattern = new RegExp(
  `\\b(?:[${turkishUpper}]?[${turkishLower}]*[1_][${turkishLower}]+(?:[1_][${turkishLower}]+)*|0[${turkishUpper}${turkishLower}]{2,})\\b`,
  "gu"
);
const suspiciousQuestionFallbackPattern = new RegExp(
  `\\b(?:[${turkishUpper}${turkishLower}]*\\?[${turkishLower}]+(?:\\?[${turkishLower}]+)*|\\?+[${turkishLower}]+)\\b`,
  "gu"
);
const ignoredAsciiFallbackTokens = new Set(["_blank", "1fr_auto"]);
const turkishMojibakeReplacements = [
  [String.fromCharCode(195, 188), String.fromCharCode(252)],
  [String.fromCharCode(195, 156), String.fromCharCode(220)],
  [String.fromCharCode(195, 339), String.fromCharCode(220)],
  [String.fromCharCode(195, 182), String.fromCharCode(246)],
  [String.fromCharCode(195, 150), String.fromCharCode(214)],
  [String.fromCharCode(195, 8211), String.fromCharCode(214)],
  [String.fromCharCode(195, 167), String.fromCharCode(231)],
  [String.fromCharCode(195, 135), String.fromCharCode(199)],
  [String.fromCharCode(195, 8225), String.fromCharCode(199)],
  [String.fromCharCode(196, 177), String.fromCharCode(305)],
  [String.fromCharCode(196, 176), String.fromCharCode(304)],
  [String.fromCharCode(197, 376), String.fromCharCode(351)],
  [String.fromCharCode(197, 381), String.fromCharCode(350)],
  [String.fromCharCode(197, 382), String.fromCharCode(350)],
  [String.fromCharCode(196, 159), String.fromCharCode(287)],
  [String.fromCharCode(196, 376), String.fromCharCode(287)],
  [String.fromCharCode(196, 158), String.fromCharCode(286)],
  [String.fromCharCode(196, 382), String.fromCharCode(286)],
  [String.fromCharCode(195, 162), String.fromCharCode(226)],
  [String.fromCharCode(195, 170), String.fromCharCode(234)],
  [String.fromCharCode(195, 174), String.fromCharCode(238)],
  [String.fromCharCode(195, 180), String.fromCharCode(244)],
  [String.fromCharCode(195, 187), String.fromCharCode(251)],
  [String.fromCharCode(197, 158), String.fromCharCode(350)]
];

function repairTurkishMojibake(value) {
  let current = value;

  for (const [pattern, replacement] of turkishMojibakeReplacements) {
    current = current.replaceAll(pattern, replacement);
  }

  return current;
}


const windows1252ReverseMap = new Map([
  ["€", 0x80],
  ["‚", 0x82],
  ["ƒ", 0x83],
  ["„", 0x84],
  ["…", 0x85],
  ["†", 0x86],
  ["‡", 0x87],
  ["ˆ", 0x88],
  ["‰", 0x89],
  ["Š", 0x8a],
  ["‹", 0x8b],
  ["Œ", 0x8c],
  ["Ž", 0x8e],
  ["‘", 0x91],
  ["’", 0x92],
  ["“", 0x93],
  ["”", 0x94],
  ["•", 0x95],
  ["–", 0x96],
  ["—", 0x97],
  ["˜", 0x98],
  ["™", 0x99],
  ["š", 0x9a],
  ["›", 0x9b],
  ["œ", 0x9c],
  ["ž", 0x9e],
  ["Ÿ", 0x9f]
]);

function encodeWindows1252(value) {
  const bytes = [];

  for (const character of value) {
    const mappedByte = windows1252ReverseMap.get(character);

    if (mappedByte !== undefined) {
      bytes.push(mappedByte);
      continue;
    }

    const codePoint = character.codePointAt(0);

    if (codePoint === undefined || codePoint > 0xff) {
      return null;
    }

    bytes.push(codePoint);
  }

  return Buffer.from(bytes);
}

function decodeWindows1252Utf8(value) {
  const encoded = encodeWindows1252(value);
  return encoded ? encoded.toString("utf8") : value;
}

function scoreEncodingCandidate(value) {
  const suspiciousCount = value.match(suspiciousEncodingPattern)?.length ?? 0;
  const fallbackCount = value.match(suspiciousAsciiFallbackPattern)?.length ?? 0;
  const questionFallbackCount = value.match(suspiciousQuestionFallbackPattern)?.length ?? 0;

  return suspiciousCount + fallbackCount + questionFallbackCount;
}

export function hasSuspiciousEncoding(value) {
  return suspiciousEncodingPattern.test(value);
}

export function hasTurkishAsciiFallback(value) {
  const matches = value.match(suspiciousAsciiFallbackPattern);
  const questionMatches = value.match(suspiciousQuestionFallbackPattern);

  if (matches && matches.some((token) => !ignoredAsciiFallbackTokens.has(token))) {
    return true;
  }

  return Boolean(questionMatches?.length);
}

export function repairSuspiciousEncoding(value) {
  let current = value.normalize("NFC");

  for (let index = 0; index < 6; index += 1) {
    const directRepair = repairTurkishMojibake(current);

    if (directRepair !== current) {
      current = directRepair;
      continue;
    }

    if (!hasSuspiciousEncoding(current)) {
      break;
    }

    const decoded = repairTurkishMojibake(decodeWindows1252Utf8(current).normalize("NFC"));

    if (decoded === current) {
      break;
    }

    if (scoreEncodingCandidate(decoded) > scoreEncodingCandidate(current)) {
      break;
    }

    current = decoded;
  }

  return current;
}

export function normalizeEncodingTree(input) {
  if (typeof input === "string") {
    const fixed = hasSuspiciousEncoding(input) ? repairSuspiciousEncoding(input) : input.normalize("NFC");

    return {
      value: fixed,
      changed: fixed !== input
    };
  }

  if (Array.isArray(input)) {
    let changed = false;
    const value = input.map((item) => {
      const normalized = normalizeEncodingTree(item);
      changed = changed || normalized.changed;
      return normalized.value;
    });

    return { value, changed };
  }

  if (input && typeof input === "object") {
    let changed = false;
    const entries = Object.entries(input).map(([key, value]) => {
      const normalized = normalizeEncodingTree(value);
      changed = changed || normalized.changed;
      return [key, normalized.value];
    });

    return {
      value: Object.fromEntries(entries),
      changed
    };
  }

  return { value: input, changed: false };
}

export function normalizeLocalizedContent(context, input) {
  const normalized = normalizeEncodingTree(input);

  if (normalized.changed && process.env.NODE_ENV !== "production") {
    console.warn(`[encoding] Repaired suspicious localized content in ${context}.`);
  }

  return normalized.value;
}

export function assertEncodingHealth(context) {
  const sample = repairSuspiciousEncoding(turkishSentinel);

  if (process.env.NODE_ENV !== "production" && sample !== turkishSentinel) {
    console.warn(`[encoding] Turkish encoding sentinel failed in ${context}. Expected ${turkishSentinel} but received ${sample}.`);
  }

  return sample;
}

export function writeUtf8File(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

export function walkContentFiles(rootDir) {
  const files = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ignoredDirectories.has(entry.name)) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (ignoredFilenames.has(entry.name)) {
        continue;
      }

      if (contentExtensions.has(path.extname(entry.name))) {
        files.push(fullPath);
      }
    }
  }

  walk(rootDir);
  return files;
}
