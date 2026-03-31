export const activeBlogSlugs = new Set([
  "en-iyi-ai-araclari-2026",
  "chatgpt-vs-claude-vs-gemini",
  "midjourney-nasil-kullanilir",
  "best-ai-tools-for-beginners-2026",
  "ai-tools-for-freelancers",
  "best-free-ai-tools-2026",
  "ai-tools-to-make-money-2026"
]);

export const removedBlogRedirects = new Map<string, string>([
  ["/en/blog/real-ways-to-make-money-with-ai", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/ai-tools-for-passive-income-2026", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/ai-side-hustles-you-can-start-today", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/how-to-make-1000-a-month-with-ai-tools", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/best-ai-tools-for-making-money-2026", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/free-ai-tools-you-can-start-using-today", "/en/blog/best-free-ai-tools-2026"],
  ["/en/blog/best-ai-tools-for-freelancers-2026", "/en/blog/ai-tools-for-freelancers"],
  ["/en/blog/best-ai-tools-for-students-2026", "/en/blog/best-ai-tools-for-beginners-2026"],
  ["/en/blog/chatgpt-alternatives-compared-2026", "/en/blog/chatgpt-vs-claude-vs-gemini"],
  ["/tr/blog/2026-pasif-gelir-icin-en-iyi-ai-araclari", "/tr/blog/ai-tools-to-make-money-2026"],
  ["/tr/blog/bugun-baslayabilecegin-10-ai-yan-gelir-fikri", "/tr/blog/ai-tools-to-make-money-2026"],
  ["/tr/blog/gercekten-para-kazandiran-ucretsiz-ai-araclari", "/tr/blog/best-free-ai-tools-2026"],
  ["/tr/blog/2026-yeni-baslayanlar-icin-en-iyi-ai-araclari", "/tr/blog/best-ai-tools-for-beginners-2026"],
  ["/tr/blog/ai-araclariyla-ayda-1000-dolar-kazanma", "/tr/blog/ai-tools-to-make-money-2026"],
  ["/tr/blog/freelancerlar-icin-ai-araclari", "/tr/blog/ai-tools-for-freelancers"],
  ["/tr/blog/2026-en-iyi-ucretsiz-ai-araclari", "/tr/blog/best-free-ai-tools-2026"],
  ["/tr/blog/2026-internetten-para-kazandiran-ai-araclari", "/tr/blog/ai-tools-to-make-money-2026"],
  ["/tr/blog/chatgpt-vs-claude-vs-gemini-karsilastirma", "/tr/blog/chatgpt-vs-claude-vs-gemini"]
]);

export function getBlogRedirectTarget(pathname: string) {
  const directMatch = removedBlogRedirects.get(pathname);

  if (directMatch) {
    return directMatch;
  }

  const match = pathname.match(/^\/(tr|en)\/blog\/([^/]+)$/);

  if (!match) {
    return null;
  }

  const [, locale, slug] = match;

  if (activeBlogSlugs.has(slug)) {
    return null;
  }

  return `/${locale}/blog`;
}
