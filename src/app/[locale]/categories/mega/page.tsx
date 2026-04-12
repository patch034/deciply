import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getLocalizedTools } from "@/lib/catalog";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale } from "@/i18n/config";

type MegaGroup = {
  title: string;
  slug: string;
  items: { label: string; href: string; keywords: string[] }[];
};

const megaGroups: Record<Locale, MegaGroup[]> = {
  tr: [
    {
      title: "Yazma ve Düzenleme",
      slug: "writing",
      items: [
        { label: "Blog yazımı", href: "/tools?q=blog", keywords: ["blog", "write"] },
        { label: "Copywriting", href: "/tools?q=copywriting", keywords: ["copy", "marketing"] },
        { label: "E-posta yazımı", href: "/tools?q=email", keywords: ["email"] },
        { label: "Gramer", href: "/tools?q=grammar", keywords: ["grammar"] },
        { label: "SEO yazımı", href: "/tools?q=seo writing", keywords: ["seo", "writing"] }
      ]
    },
    {
      title: "Görsel ve Video",
      slug: "visual",
      items: [
        { label: "Görsel üretim", href: "/tools?q=image", keywords: ["image", "design"] },
        { label: "Görsel düzenleme", href: "/tools?q=photo", keywords: ["photo", "image"] },
        { label: "Video üretimi", href: "/tools?q=video", keywords: ["video"] },
        { label: "Animasyon", href: "/tools?q=animation", keywords: ["animation"] },
        { label: "Logo üretimi", href: "/tools?q=logo", keywords: ["logo"] }
      ]
    },
    {
      title: "Verimlilik ve İş",
      slug: "productivity",
      items: [
        { label: "Toplantı notları", href: "/tools?q=meeting notes", keywords: ["meeting", "notes"] },
        { label: "Otomasyon", href: "/tools?q=automation", keywords: ["automation"] },
        { label: "Görev yönetimi", href: "/tools?q=task", keywords: ["task", "project"] },
        { label: "CRM", href: "/tools?q=crm", keywords: ["crm", "business"] },
        { label: "İş akışları", href: "/tools?q=workflow", keywords: ["workflow"] }
      ]
    },
    {
      title: "Araştırma ve Analiz",
      slug: "research",
      items: [
        { label: "Araştırma", href: "/tools?q=research", keywords: ["research"] },
        { label: "Kaynaklı arama", href: "/tools?q=search", keywords: ["search", "answer"] },
        { label: "Veri analizi", href: "/tools?q=analysis", keywords: ["analysis", "data"] },
        { label: "Rakip analizi", href: "/tools?q=competitor", keywords: ["seo", "analysis"] }
      ]
    },
    {
      title: "Kod ve Geliştirme",
      slug: "coding",
      items: [
        { label: "Kod asistanı", href: "/tools?q=code", keywords: ["code"] },
        { label: "AI IDE", href: "/tools?q=ide", keywords: ["cursor", "ide"] },
        { label: "API aracı", href: "/tools?q=api", keywords: ["api"] },
        { label: "CLI", href: "/tools?q=cli", keywords: ["cli"] }
      ]
    }
  ],
  en: [
    {
      title: "Writing and Editing",
      slug: "writing",
      items: [
        { label: "Blog writing", href: "/tools?q=blog", keywords: ["blog", "write"] },
        { label: "Copywriting", href: "/tools?q=copywriting", keywords: ["copy", "marketing"] },
        { label: "Email writing", href: "/tools?q=email", keywords: ["email"] },
        { label: "Grammar", href: "/tools?q=grammar", keywords: ["grammar"] },
        { label: "SEO writing", href: "/tools?q=seo writing", keywords: ["seo", "writing"] }
      ]
    },
    {
      title: "Image and Video",
      slug: "visual",
      items: [
        { label: "Image generation", href: "/tools?q=image", keywords: ["image", "design"] },
        { label: "Image editing", href: "/tools?q=photo", keywords: ["photo", "image"] },
        { label: "Video generation", href: "/tools?q=video", keywords: ["video"] },
        { label: "Animation", href: "/tools?q=animation", keywords: ["animation"] },
        { label: "Logo creation", href: "/tools?q=logo", keywords: ["logo"] }
      ]
    },
    {
      title: "Productivity and Business",
      slug: "productivity",
      items: [
        { label: "Meeting notes", href: "/tools?q=meeting notes", keywords: ["meeting", "notes"] },
        { label: "Automation", href: "/tools?q=automation", keywords: ["automation"] },
        { label: "Task management", href: "/tools?q=task", keywords: ["task", "project"] },
        { label: "CRM", href: "/tools?q=crm", keywords: ["crm", "business"] },
        { label: "Workflows", href: "/tools?q=workflow", keywords: ["workflow"] }
      ]
    },
    {
      title: "Research and Analysis",
      slug: "research",
      items: [
        { label: "Research", href: "/tools?q=research", keywords: ["research"] },
        { label: "Source-based search", href: "/tools?q=search", keywords: ["search", "answer"] },
        { label: "Data analysis", href: "/tools?q=analysis", keywords: ["analysis", "data"] },
        { label: "Competitor research", href: "/tools?q=competitor", keywords: ["seo", "analysis"] }
      ]
    },
    {
      title: "Coding and Development",
      slug: "coding",
      items: [
        { label: "Code assistant", href: "/tools?q=code", keywords: ["code"] },
        { label: "AI IDE", href: "/tools?q=ide", keywords: ["cursor", "ide"] },
        { label: "API tools", href: "/tools?q=api", keywords: ["api"] },
        { label: "CLI", href: "/tools?q=cli", keywords: ["cli"] }
      ]
    }
  ]
};

function countMatches(tools: ReturnType<typeof getLocalizedTools>, keywords: string[]) {
  const terms = keywords.map((keyword) => keyword.toLowerCase());

  return tools.filter((tool) =>
    terms.some((term) => `${tool.name} ${tool.shortDescription} ${tool.longDescription}`.toLowerCase().includes(term))
  ).length;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = locale as Locale;

  return {
    title: safeLocale === "tr" ? "Mega Kategori Dizini" : "Mega Category Directory",
    description:
      safeLocale === "tr"
        ? "AI kategorilerini, alt konuları ve araç keşif yollarını tek bir master dizinde keşfedin."
        : "Explore AI categories, subtopics, and tool discovery paths in one master directory.",
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/categories/mega`),
      languages: buildAlternates("/categories/mega")
    }
  };
}

export default async function MegaCategoryDirectoryPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = locale as Locale;
  const tools = getLocalizedTools(safeLocale);
  const groups = megaGroups[safeLocale];
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fb_46%,#eef3f8_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[32px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(244,248,253,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] sm:p-8">
        <Badge variant="accent">{safeLocale === "tr" ? "Mega dizin" : "Mega directory"}</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          {safeLocale === "tr" ? "Kategorileri ve alt konuları tek master dizinde keşfet" : "Explore categories and subtopics in one master directory"}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {safeLocale === "tr"
            ? "Hızlı iç linkler, konu kümeleri ve harf bazlı gezinme ile crawl derinliğini artır."
            : "Use fast internal links, topic clusters, and alphabetical navigation to deepen crawl paths."}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <PremiumButton href={`/${safeLocale}/categories`}>{safeLocale === "tr" ? "Kategoriler" : "Categories"}</PremiumButton>
          <PremiumButton href={`/${safeLocale}/tools`} variant="secondary">
            {safeLocale === "tr" ? "Araçlar" : "Tools"}
          </PremiumButton>
        </div>
      </section>

      {groups.map((group) => (
        <SectionShell
          key={group.slug}
          eyebrow={group.title}
          title={group.title}
          description={
            safeLocale === "tr"
              ? `${group.title} altında sık aranan alt konuları ve ilgili araç yollarını aç.`
              : `Open the most common subtopics and related tool paths under ${group.title}.`
          }
          className="px-0 sm:px-0"
          contentClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {group.items.map((item) => {
            const count = countMatches(tools, item.keywords);

            return (
              <Link
                key={item.href}
                href={`/${safeLocale}${item.href}`}
                className="flex items-start justify-between gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_52px_-36px_rgba(37,99,235,0.12)] transition hover:border-sky-200 hover:bg-slate-50"
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-950">{item.label}</span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {safeLocale === "tr" ? "Alt konu" : "Subtopic"}
                  </span>
                </span>
                <Badge variant="muted" className="shrink-0">
                  {count}
                </Badge>
              </Link>
            );
          })}
        </SectionShell>
      ))}

      <SectionShell
        eyebrow={safeLocale === "tr" ? "Harf sırası" : "Alphabetical browse"}
        title={safeLocale === "tr" ? "A'dan Z'ye hızlı gezin" : "Quick navigation from A to Z"}
        description={safeLocale === "tr" ? "Harfler üzerinden araç dizinine hızlı eriş." : "Jump into the directory by letter."}
        className="px-0 sm:px-0"
        contentClassName="flex flex-wrap gap-2"
      >
        {alpha.map((letter) => (
          <Link
            key={letter}
            href={`/${safeLocale}/tools?q=${letter}`}
            className="inline-flex min-h-[36px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
          >
            {letter}
          </Link>
        ))}
      </SectionShell>
    </div>
  );
}
