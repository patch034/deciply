const suspiciousEncodingPattern = /[\u00C2\u00C3\u00C4\u00C5\u00E2\uFFFD]/;
const TURKISH_ENCODING_SAMPLE = "\u015E\u011F\u0130\u00E7\u00F6\u00FC";

type NormalizeResult<T> = {
  value: T;
  changed: boolean;
};

export function hasSuspiciousEncoding(value: string) {
  return suspiciousEncodingPattern.test(value);
}

function decodeLatin1Utf8(value: string) {
  return Buffer.from(value, "latin1").toString("utf8");
}

export function repairSuspiciousEncoding(value: string) {
  let current = value.normalize("NFC");

  for (let index = 0; index < 4 && hasSuspiciousEncoding(current); index += 1) {
    const decoded = decodeLatin1Utf8(current).normalize("NFC");

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

