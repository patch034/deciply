import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import type { SupportedLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  locale: SupportedLocale;
  dictionary: Dictionary;
};

function isExternalHref(href: string) {
  return /^(mailto:|https?:\/\/|tel:)/i.test(href);
}

function renderLink(locale: SupportedLocale, item: { href: string; label: string }) {
  const className = "text-sm text-slate-600 transition hover:text-slate-950";

  if (isExternalHref(item.href)) {
    return (
      <a key={item.href + item.label} href={item.href} className={className}>
        {item.label}
      </a>
    );
  }

  return (
    <Link key={item.href + item.label} href={`/${locale}${item.href}`} className={className}>
      {item.label}
    </Link>
  );
}

function getFooterSeoColumns(locale: SupportedLocale) {
  const tr = locale === "tr";

  return [
    {
      title: tr ? "En iyi AI araçları" : "Best AI tools",
      links: [
        { href: "/tools/chatgpt", label: "ChatGPT" },
        { href: "/tools/claude", label: "Claude" },
        { href: "/tools/gemini", label: "Gemini" },
        { href: "/tools/perplexity", label: "Perplexity" },
        { href: "/tools/midjourney", label: "Midjourney" },
        { href: "/tools/cursor", label: "Cursor" }
      ]
    },
    {
      title: tr ? "Daha fazla araç" : "More tools",
      links: [
        { href: "/categories/chatbots-virtual-companions", label: tr ? "Chatbot araçları" : "Chatbot tools" },
        { href: "/categories/writing-editing", label: tr ? "Yazma araçları" : "Writing tools" },
        { href: "/categories/image-generation-editing", label: tr ? "Görsel araçları" : "Image tools" },
        { href: "/categories/coding-development", label: tr ? "Kodlama araçları" : "Coding tools" },
        { href: "/categories/video-animation", label: tr ? "Video araçları" : "Video tools" },
        { href: "/categories/office-productivity", label: tr ? "Verimlilik araçları" : "Productivity tools" }
      ]
    },
    {
      title: tr ? "Rehberler" : "Guides",
      links: [
        { href: "/blog", label: tr ? "Blog rehberleri" : "Blog guides" },
        { href: "/compare", label: tr ? "Karşılaştırmalar" : "Comparisons" },
        { href: "/tools", label: tr ? "Tüm araçlar" : "All tools" },
        { href: "/categories", label: tr ? "Kategoriler" : "Categories" },
        { href: "/news", label: tr ? "AI haberleri" : "AI news" }
      ]
    },
    {
      title: tr ? "Yeni içerikler" : "New content",
      links: [
        { href: "/blog/grok-alternatifleri-en-iyi-ai-araclari-2026", label: tr ? "Grok alternatifleri" : "Grok alternatives" },
        { href: "/blog/en-iyi-ai-ses-olusturma-araclari-2026", label: tr ? "AI ses araçları" : "AI voice tools" },
        { href: "/compare/chatgpt-vs-grok", label: "ChatGPT vs Grok" },
        { href: "/compare/claude-vs-grok", label: "Claude vs Grok" },
        { href: "/news", label: tr ? "Güncel AI haberleri" : "Latest AI news" }
      ]
    },
    {
      title: tr ? "Kaynak" : "Resource",
      links: [
        { href: "/about", label: tr ? "Hakkında" : "About" },
        { href: "/contact", label: tr ? "İletişim" : "Contact" },
        { href: "/privacy-policy", label: tr ? "Gizlilik" : "Privacy" },
        { href: "/terms", label: tr ? "Kullanım şartları" : "Terms" },
        { href: "/affiliate-disclosure", label: tr ? "Affiliate açıklaması" : "Affiliate disclosure" }
      ]
    }
  ];
}

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const seoColumns = getFooterSeoColumns(locale);

  return (
    <footer className="mt-16 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <section className="ui-card rounded-[24px] p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BrandLogo compact className="h-8 w-8" />
                <div>
                  <p className="text-base font-semibold tracking-[-0.03em] text-slate-950">Deciply</p>
                  <p className="text-xs text-slate-500">{dictionary.brandSubtitle}</p>
                </div>
              </div>
              <p className="max-w-[32rem] text-sm leading-7 text-slate-600">{dictionary.footer.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {dictionary.footer.contactBlock.links.map((item) => renderLink(locale, item))}
              </div>
            </div>

            {dictionary.footer.groups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{group.title}</h2>
                <div className="flex flex-col gap-2">{group.links.map((item) => renderLink(locale, item))}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="ui-card rounded-[24px] p-5 sm:p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {seoColumns.map((group) => (
              <div key={group.title} className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{group.title}</h2>
                <div className="flex flex-col gap-2.5">{group.links.slice(0, 8).map((item) => renderLink(locale, item))}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-3 border-t border-slate-200/90 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
          <p className="font-medium">{dictionary.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
