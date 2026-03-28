import type { Locale } from "@/i18n/config";

const dictionaries = {
  tr: {
    meta: {
      homeTitle: "AI araçları ve SaaS rehberi",
      homeDescription: "Kategori, araç, karşılaştırma ve blog odaklı iki dilli Deciply platformu."
    },
    navigation: [
      { label: "Kategoriler", href: "/categories" },
      { label: "Araçlar", href: "/tools" },
      { label: "Karşılaştırmalar", href: "/categories/comparisons" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply, AI araçlarını daha hızlı karşılaştırmak, doğru aracı seçmek ve gelir odaklı kullanım senaryolarını keşfetmek için tasarlanmış modern bir platformdur.",
      badge: "Deciply",
      groups: [
        {
          title: "Araçlar",
          links: [
            { label: "Tüm araçlar", href: "/tools" },
            { label: "Öne çıkan AI araçları", href: "/categories/ai-tools" },
            { label: "Karşılaştırmalar", href: "/categories/comparisons" }
          ]
        },
        {
          title: "İçerik",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI ile para kazanma", href: "/categories/make-money-with-ai" },
            { label: "Ücretsiz araçlar", href: "/categories/free-tools" }
          ]
        },
        {
          title: "Güven",
          links: [
            { label: "Hakkımızda", href: "/about" },
            { label: "İletişim", href: "/contact" },
            { label: "Affiliate açıklaması", href: "/affiliate-disclosure" },
            { label: "Gizlilik politikası", href: "/privacy-policy" },
            { label: "Kullanım şartları", href: "/terms" }
          ]
        }
      ],
      bottomNote: "AI tools, blog rehberleri ve karşılaştırmalar için hızlı ve güven odaklı Deciply deneyimi.",
      copyright: "2026 Deciply. Tüm hakları saklıdır."
    }
  },
  en: {
    meta: {
      homeTitle: "AI Tools and SaaS Directory",
      homeDescription: "A bilingual Deciply platform focused on categories, tools, comparisons, and blog content."
    },
    navigation: [
      { label: "Categories", href: "/categories" },
      { label: "Tools", href: "/tools" },
      { label: "Comparisons", href: "/categories/comparisons" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply is a modern AI discovery platform built to help users compare tools faster, choose with confidence, and explore revenue-focused AI workflows.",
      badge: "Deciply",
      groups: [
        {
          title: "Tools",
          links: [
            { label: "All tools", href: "/tools" },
            { label: "Featured AI tools", href: "/categories/ai-tools" },
            { label: "Comparisons", href: "/categories/comparisons" }
          ]
        },
        {
          title: "Content",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "Make money with AI", href: "/categories/make-money-with-ai" },
            { label: "Free tools", href: "/categories/free-tools" }
          ]
        },
        {
          title: "Trust",
          links: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
            { label: "Privacy policy", href: "/privacy-policy" },
            { label: "Terms", href: "/terms" }
          ]
        }
      ],
      bottomNote: "A cleaner Deciply experience for tools, comparisons, and SEO-driven guides.",
      copyright: "2026 Deciply. All rights reserved."
    }
  }
};

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
