import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { defaultLocale, locales } from "@/i18n/config";

function pickBestLocale(acceptLanguageHeader: string | null) {
  if (!acceptLanguageHeader) {
    return defaultLocale;
  }

  const requestedLocales = acceptLanguageHeader
    .split(",")
    .map((entry) => {
      const [tag, qualityPart] = entry.trim().split(";q=");
      const quality = qualityPart ? Number.parseFloat(qualityPart) : 1;

      return {
        tag: tag.toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0
      };
    })
    .filter((item) => item.tag)
    .sort((left, right) => right.quality - left.quality);

  for (const { tag } of requestedLocales) {
    const exactMatch = locales.find((locale) => tag === locale);

    if (exactMatch) {
      return exactMatch;
    }

    const baseLanguage = tag.split("-")[0];
    const baseMatch = locales.find((locale) => locale === baseLanguage);

    if (baseMatch) {
      return baseMatch;
    }
  }

  return defaultLocale;
}

export default async function Home() {
  const acceptLanguage = (await headers()).get("accept-language");
  const locale = pickBestLocale(acceptLanguage);

  redirect(`/${locale}`);
}
