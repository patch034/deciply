import type { SupportedLocale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";

export type TaxonomyOption = {
  slug: string;
  label: string;
};

const baseToolCategoryOptions = {
  tr: [
    { slug: "writing", label: "Yazı" },
    { slug: "image", label: "Görsel" },
    { slug: "video", label: "Video" },
    { slug: "productivity", label: "Verimlilik" }
  ],
  en: [
    { slug: "writing", label: "Writing AI" },
    { slug: "image", label: "Image AI" },
    { slug: "video", label: "Video" },
    { slug: "productivity", label: "Productivity AI" }
  ]
} as const;

const baseUseCaseOptions = {
  tr: [
    { slug: "business", label: "İşletmeler" },
    { slug: "students", label: "Öğrenciler" },
    { slug: "content", label: "İçerik" },
    { slug: "creators", label: "Üreticiler" },
    { slug: "freelancers", label: "Freelancer" },
    { slug: "research", label: "Araştırma" }
  ],
  en: [
    { slug: "business", label: "Business" },
    { slug: "students", label: "Students" },
    { slug: "content", label: "Content" },
    { slug: "creators", label: "Creators" },
    { slug: "freelancers", label: "Freelancers" },
    { slug: "research", label: "Research" }
  ]
} as const;

const buildLocalizedOptions = (locale: SupportedLocale, base: readonly TaxonomyOption[]) =>
  localizeTree(locale, base) as readonly TaxonomyOption[];

export const toolCategoryOptions = {
  tr: baseToolCategoryOptions.tr,
  en: baseToolCategoryOptions.en,
  ar: buildLocalizedOptions("ar", baseToolCategoryOptions.en),
  ru: buildLocalizedOptions("ru", baseToolCategoryOptions.en),
  zh: buildLocalizedOptions("zh", baseToolCategoryOptions.en),
  ja: buildLocalizedOptions("ja", baseToolCategoryOptions.en),
  ko: buildLocalizedOptions("ko", baseToolCategoryOptions.en),
  el: buildLocalizedOptions("el", baseToolCategoryOptions.en),
  da: buildLocalizedOptions("da", baseToolCategoryOptions.en),
  fa: buildLocalizedOptions("fa", baseToolCategoryOptions.en)
} as const satisfies Record<SupportedLocale, readonly TaxonomyOption[]>;

export const useCaseOptions = {
  tr: baseUseCaseOptions.tr,
  en: baseUseCaseOptions.en,
  ar: buildLocalizedOptions("ar", baseUseCaseOptions.en),
  ru: buildLocalizedOptions("ru", baseUseCaseOptions.en),
  zh: buildLocalizedOptions("zh", baseUseCaseOptions.en),
  ja: buildLocalizedOptions("ja", baseUseCaseOptions.en),
  ko: buildLocalizedOptions("ko", baseUseCaseOptions.en),
  el: buildLocalizedOptions("el", baseUseCaseOptions.en),
  da: buildLocalizedOptions("da", baseUseCaseOptions.en),
  fa: buildLocalizedOptions("fa", baseUseCaseOptions.en)
} as const satisfies Record<SupportedLocale, readonly TaxonomyOption[]>;
