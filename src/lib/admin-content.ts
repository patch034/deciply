import { AdminContentType, ContentStatus } from "@prisma/client";

import { locales } from "@/i18n/config";

export const adminContentTypes = [
  AdminContentType.TOOL,
  AdminContentType.BLOG_POST,
  AdminContentType.NEWS_ITEM,
  AdminContentType.CATEGORY,
  AdminContentType.COMPARISON
] as const;

export const adminContentStatuses = [ContentStatus.DRAFT, ContentStatus.PUBLISHED, ContentStatus.HIDDEN] as const;

export const adminTypeLabels: Record<AdminContentType, string> = {
  TOOL: "Araç",
  BLOG_POST: "Blog yazısı",
  NEWS_ITEM: "AI haberi",
  CATEGORY: "Kategori",
  COMPARISON: "Karşılaştırma"
};

export const adminTypeHelp: Record<AdminContentType, string> = {
  TOOL: "AI araç kartı, kategori bağlantısı ve kısa açıklama.",
  BLOG_POST: "Rehber veya editoryal blog içeriği. Tarih otomatik bugün olur.",
  NEWS_ITEM: "Kısa AI haber özeti. Tarih otomatik bugün olur.",
  CATEGORY: "Kategori adı, açıklaması ve dizin gruplaması.",
  COMPARISON: "İki araç arasında karşılaştırma kaydı."
};

export const adminStatusLabels: Record<ContentStatus, string> = {
  DRAFT: "Taslak",
  PUBLISHED: "Yayında",
  HIDDEN: "Gizli"
};

export const adminPublishLocales = locales;

export function formatAdminDate(value: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(value);
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function slugifyAdminTitle(value: string) {
  const normalized = value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

  return normalized || `icerik-${Date.now()}`;
}

export function normalizeJsonText(value: FormDataEntryValue | null, fallback = "{}") {
  const raw = String(value ?? "").trim() || fallback;
  JSON.parse(raw);
  return raw;
}

export function parseAdminJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function buildAdminPayloadFromForm(formData: FormData, type: AdminContentType) {
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const sourceName = String(formData.get("sourceName") ?? "").trim();
  const sourceUrl = String(formData.get("sourceUrl") ?? "").trim();
  const websiteUrl = String(formData.get("websiteUrl") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "").trim();
  const toolA = String(formData.get("toolA") ?? "").trim();
  const toolB = String(formData.get("toolB") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const today = getTodayDate();

  return JSON.stringify(
    {
      title,
      summary,
      body,
      sourceName,
      sourceUrl,
      websiteUrl,
      categorySlug,
      toolA,
      toolB,
      price,
      publishedAt: type === AdminContentType.BLOG_POST || type === AdminContentType.NEWS_ITEM ? today : undefined,
      sourceLanguage: "auto",
      localizationMode: "all-locales-created-from-single-entry"
    },
    null,
    2
  );
}

export function buildAdminRelationsFromForm(formData: FormData) {
  const relatedTools = String(formData.get("relatedTools") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const relatedComparisons = String(formData.get("relatedComparisons") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const categories = String(formData.get("categories") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return JSON.stringify(
    {
      tools: relatedTools,
      comparisons: relatedComparisons,
      categories
    },
    null,
    2
  );
}
