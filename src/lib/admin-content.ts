import { AdminContentType, ContentStatus } from "@prisma/client";

export const adminContentTypes = [
  AdminContentType.TOOL,
  AdminContentType.BLOG_POST,
  AdminContentType.NEWS_ITEM,
  AdminContentType.CATEGORY,
  AdminContentType.COMPARISON
];

export const adminContentStatuses = [ContentStatus.DRAFT, ContentStatus.PUBLISHED, ContentStatus.HIDDEN];

export const adminTypeLabels: Record<AdminContentType, string> = {
  TOOL: "Tools",
  BLOG_POST: "Blog posts",
  NEWS_ITEM: "AI News",
  CATEGORY: "Categories",
  COMPARISON: "Comparisons"
};

export function formatAdminDate(value: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(value);
}

export function normalizeJsonText(value: FormDataEntryValue | null, fallback = "{}") {
  const raw = String(value ?? "").trim() || fallback;
  JSON.parse(raw);
  return raw;
}
