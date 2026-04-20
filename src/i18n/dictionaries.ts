import type { SupportedLocale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";

type DictionaryShape = {
  meta: { homeTitle: string; homeDescription: string };
  brandSubtitle: string;
  navigation: { label: string; href: string }[];
  languageLabel: string;
  footer: {
    description: string;
    contactBlock: { title: string; links: { label: string; href: string }[] };
    groups: { title: string; links: { label: string; href: string }[] }[];
    alphabetTitle: string;
    alphabetDescription: string;
    allToolsLabel: string;
    bottomNote: string;
    copyright: string;
  };
};

const baseDictionaries = {
  tr: {
    meta: {
      homeTitle: "Deciply | AI araçları ve karşılaştırma dizini",
      homeDescription:
        "Deciply; AI araçları, karşılaştırmalar, blog rehberleri ve AI haberlerini tek premium keşif yüzeyinde toplar."
    },
    brandSubtitle: "AI araç dizini",
    languageLabel: "Dil",
    navigation: [
      { label: "Kategoriler", href: "/categories" },
      { label: "Araçlar", href: "/tools" },
      { label: "Karşılaştırmalar", href: "/compare" },
      { label: "AI Haberleri", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply; doğru AI aracını daha hızlı bulmak, seçenekleri karşılaştırmak ve karar vermeden önce güvenilir bağlam görmek için tasarlandı.",
      contactBlock: {
        title: "İletişim",
        links: [{ label: "İletişim", href: "/contact" }]
      },
      groups: [
        {
          title: "Keşfet",
          links: [
            { label: "Tüm araçlar", href: "/tools" },
            { label: "Tüm kategoriler", href: "/categories" },
            { label: "Karşılaştırmalar", href: "/compare" }
          ]
        },
        {
          title: "Popüler sayfalar",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "İçerik",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI Haberleri", href: "/news" },
            { label: "Canlı karşılaştırma", href: "/compare-auto" }
          ]
        },
        {
          title: "Kurumsal",
          links: [
            { label: "Affiliate açıklaması", href: "/affiliate-disclosure" },
            { label: "Gizlilik politikası", href: "/privacy-policy" },
            { label: "Kullanım şartları", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "Harf sırasına göre göz at",
      alphabetDescription:
        "Araçları baş harfine göre aç, dizinde daha hızlı ilerle ve doğrudan istediğin ürüne geç.",
      allToolsLabel: "Tüm araçlar",
      bottomNote:
        "Araç keşfi, karşılaştırma, haber ve rehber katmanları tek Deciply deneyiminde birleşir.",
      copyright: "2026 Deciply. Tüm hakları saklıdır."
    }
  },
  en: {
    meta: {
      homeTitle: "Deciply | AI tools, comparisons, news, and guides",
      homeDescription:
        "Deciply brings AI tools, comparisons, editorial guides, and AI news into one premium discovery surface."
    },
    brandSubtitle: "AI tools directory",
    languageLabel: "Language",
    navigation: [
      { label: "Categories", href: "/categories" },
      { label: "Tools", href: "/tools" },
      { label: "Comparisons", href: "/compare" },
      { label: "AI News", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply is built to help people find the right AI tool faster, compare options, and keep useful editorial context before making a decision.",
      contactBlock: {
        title: "Contact",
        links: [{ label: "Contact", href: "/contact" }]
      },
      groups: [
        {
          title: "Explore",
          links: [
            { label: "All tools", href: "/tools" },
            { label: "All categories", href: "/categories" },
            { label: "Comparisons", href: "/compare" }
          ]
        },
        {
          title: "Popular pages",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "Content",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI News", href: "/news" },
            { label: "Live compare", href: "/compare-auto" }
          ]
        },
        {
          title: "Company",
          links: [
            { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
            { label: "Privacy policy", href: "/privacy-policy" },
            { label: "Terms", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "Browse alphabetically",
      alphabetDescription:
        "Open the directory by first letter, move faster across the catalog, and jump into the exact product you need.",
      allToolsLabel: "All tools",
      bottomNote:
        "Tool discovery, comparisons, AI news, and editorial guides now live inside one Deciply surface.",
      copyright: "2026 Deciply. All rights reserved."
    }
  }
} as const satisfies Record<"tr" | "en", DictionaryShape>;

const supportedLocales = ["tr", "en", "ar", "ru", "zh", "ja", "ko", "el", "da", "fa"] as const;

const dictionaries = supportedLocales.reduce(
  (acc, locale) => {
    acc[locale] = localizeTree(locale, baseDictionaries[getContentBaseLocale(locale)]) as DictionaryShape;
    return acc;
  },
  {} as Record<SupportedLocale, DictionaryShape>
);

export type Dictionary = DictionaryShape;

export function getDictionary(locale: SupportedLocale) {
  return dictionaries[locale] ?? dictionaries.en;
}
