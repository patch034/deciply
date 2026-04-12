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
      contactBlock: {
        title: "İletişim",
        links: [{ label: "İletişim", href: "/contact" }]
      },
      groups: [
        {
          title: "Araçlar",
          links: [
            { label: "Tüm araçlar", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "Karşılaştır",
          links: [
            { label: "Tüm karşılaştırmalar", href: "/categories/comparisons" },
            { label: "Canlı karşılaştırma", href: "/compare-auto" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Express", href: "/compare/midjourney-vs-adobe-express" }
          ]
        },
        {
          title: "Popüler rehberler",
          links: [
            { label: "ChatGPT alternatifleri", href: "/alternatives/chatgpt" },
            { label: "Öğrenciler için AI araçları", href: "/use-cases/students" },
            { label: "Freelancer'lar için AI araçları", href: "/use-cases/freelancers" },
            { label: "İçerik üreticileri için AI araçları", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "Güven / Kurumsal",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "Affiliate açıklaması", href: "/affiliate-disclosure" },
            { label: "Gizlilik politikası", href: "/privacy-policy" },
            { label: "Kullanım şartları", href: "/terms" }
          ]
        }
      ],
      bottomNote: "AI araçları, blog rehberleri ve karşılaştırmalar için hızlı ve güven odaklı Deciply deneyimi.",
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
      contactBlock: {
        title: "Contact",
        links: [{ label: "Contact", href: "/contact" }]
      },
      groups: [
        {
          title: "Tools",
          links: [
            { label: "All tools", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "Compare",
          links: [
            { label: "All comparisons", href: "/categories/comparisons" },
            { label: "Live compare", href: "/compare-auto" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Express", href: "/compare/midjourney-vs-adobe-express" }
          ]
        },
        {
          title: "Popular guides",
          links: [
            { label: "ChatGPT alternatives", href: "/alternatives/chatgpt" },
            { label: "Best AI tools for students", href: "/use-cases/students" },
            { label: "Best AI tools for freelancers", href: "/use-cases/freelancers" },
            { label: "Best AI tools for content creators", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "Trust / Corporate",
          links: [
            { label: "Blog", href: "/blog" },
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
} as const satisfies Record<
  Locale,
  {
    meta: { homeTitle: string; homeDescription: string };
    navigation: { label: string; href: string }[];
    footer: {
      description: string;
      badge: string;
      contactBlock: { title: string; links: { label: string; href: string }[] };
      groups: { title: string; links: { label: string; href: string }[] }[];
      bottomNote: string;
      copyright: string;
    };
  }
>;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
