import type { Locale } from "@/i18n/config";

export type TaxonomyOption = {
  slug: string;
  label: string;
};

export const toolCategoryOptions = {
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
} as const satisfies Record<Locale, readonly TaxonomyOption[]>;

export const useCaseOptions = {
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
} as const satisfies Record<Locale, readonly TaxonomyOption[]>;
