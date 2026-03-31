const suspiciousEncodingPattern = /[\u00C2\u00C3\u00C4\u00C5\u00E2\uFFFD]/;
const TURKISH_ENCODING_SAMPLE = "\u015E\u011F\u0130\u00E7\u00F6\u00FC";

const windows1252ReverseMap = new Map<string, number>([
  ["\u20AC", 0x80],
  ["\u201A", 0x82],
  ["\u0192", 0x83],
  ["\u201E", 0x84],
  ["\u2026", 0x85],
  ["\u2020", 0x86],
  ["\u2021", 0x87],
  ["\u02C6", 0x88],
  ["\u2030", 0x89],
  ["\u0160", 0x8a],
  ["\u2039", 0x8b],
  ["\u0152", 0x8c],
  ["\u017D", 0x8e],
  ["\u2018", 0x91],
  ["\u2019", 0x92],
  ["\u201C", 0x93],
  ["\u201D", 0x94],
  ["\u2022", 0x95],
  ["\u2013", 0x96],
  ["\u2014", 0x97],
  ["\u02DC", 0x98],
  ["\u2122", 0x99],
  ["\u0161", 0x9a],
  ["\u203A", 0x9b],
  ["\u0153", 0x9c],
  ["\u017E", 0x9e],
  ["\u0178", 0x9f]
]);

type NormalizeResult<T> = {
  value: T;
  changed: boolean;
};

export function hasSuspiciousEncoding(value: string) {
  return suspiciousEncodingPattern.test(value);
}

function encodeWindows1252(value: string) {
  const bytes: number[] = [];

  for (const character of value) {
    const mappedByte = windows1252ReverseMap.get(character);

    if (mappedByte !== undefined) {
      bytes.push(mappedByte);
      continue;
    }

    const codePoint = character.codePointAt(0) ?? 0x3f;
    bytes.push(codePoint <= 0xff ? codePoint : 0x3f);
  }

  return Buffer.from(bytes);
}

function decodeWindows1252Utf8(value: string) {
  return encodeWindows1252(value).toString("utf8");
}

export function repairSuspiciousEncoding(value: string) {
  let current = value.normalize("NFC");

  for (let index = 0; index < 6 && hasSuspiciousEncoding(current); index += 1) {
    const decoded = decodeWindows1252Utf8(current).normalize("NFC");

    if (decoded === current) {
      break;
    }

    current = decoded;
  }

  return current;
}

export function normalizeEncodingTree<T>(input: T): NormalizeResult<T> {
  if (typeof input === "string") {
    const fixed = hasSuspiciousEncoding(input) ? repairSuspiciousEncoding(input) : input.normalize("NFC");

    return {
      value: fixed as T,
      changed: fixed !== input
    };
  }

  if (Array.isArray(input)) {
    let changed = false;
    const value = input.map((item) => {
      const normalized = normalizeEncodingTree(item);
      changed = changed || normalized.changed;
      return normalized.value;
    }) as T;

    return { value, changed };
  }

  if (input && typeof input === "object") {
    let changed = false;
    const entries = Object.entries(input as Record<string, unknown>).map(([key, value]) => {
      const normalized = normalizeEncodingTree(value);
      changed = changed || normalized.changed;
      return [key, normalized.value];
    });

    return {
      value: Object.fromEntries(entries) as T,
      changed
    };
  }

  return { value: input, changed: false };
}

export function normalizeLocalizedContent<T>(context: string, input: T): T {
  const normalized = normalizeEncodingTree(input);

  if (normalized.changed && process.env.NODE_ENV !== "production") {
    console.warn(`[encoding] Repaired suspicious localized content in ${context}.`);
  }

  return normalized.value;
}

export function assertEncodingHealth(context: string) {
  const sample = repairSuspiciousEncoding(TURKISH_ENCODING_SAMPLE);

  if (process.env.NODE_ENV !== "production" && sample !== TURKISH_ENCODING_SAMPLE) {
    console.warn(`[encoding] Turkish encoding sentinel failed in ${context}. Expected ${TURKISH_ENCODING_SAMPLE} but received ${sample}.`);
  }

  return sample;
}
