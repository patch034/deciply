import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { categories } from "@/data/categories";
import { toolCategoryOptions, useCaseOptions } from "@/data/tool-taxonomy";
import { getLocalizedCategories, getLocalizedTools, getToolsByCategory } from "@/lib/catalog";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale } from "@/i18n/config";

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
        ? "AI kategorilerini, alt konuları ve arama yollarını tek bir master dizinde keşfedin."
        : "Explore AI categories, subtopics, and search paths in one master directory.",
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/categories/mega`),
      languages: buildAlternates("/categories/mega")
    }
  };
}

type ArchiveGroup = {
  title: string;
  intro: string;
  items: { label: string; href: string; count: number }[];
};

function countUseCaseMatches(locale: Locale, slug: string) {
  const tools = getLocalizedTools(locale);
  return tools.filter((tool) => tool.useCaseSlugs.includes(slug)).length;
}

function countToolCategoryMatches(locale: Locale, slug: string) {
  const tools = getLocalizedTools(locale);
  return tools.filter((tool) => tool.toolCategorySlugs.includes(slug)).length;
}

function buildArchiveGroups(locale: Locale): ArchiveGroup[] {
  const parent = (href: string, label: string, count: number) => ({ href, label, count });
  const writing = `/${locale}/tools?browse=writing`;
  const image = `/${locale}/tools?browse=image`;
  const video = `/${locale}/tools?browse=video`;
  const productivity = `/${locale}/tools?browse=productivity`;
  const coding = `/${locale}/tools?browse=coding`;
  const marketing = `/${locale}/tools?browse=marketing`;
  const research = `/${locale}/tools?browse=research`;
  const education = `/${locale}/tools?browse=education`;
  const voice = `/${locale}/tools?browse=voice`;
  const business = `/${locale}/tools?browse=business`;
  const finance = `/${locale}/tools?browse=finance`;
  const health = `/${locale}/tools?browse=health`;
  const social = `/${locale}/tools?browse=social`;

  return [
    {
      title: locale === "tr" ? "Yazma ve Düzenleme" : "Writing & Editing",
      intro:
        locale === "tr"
          ? "Blog yazımı, kopya yazımı, e-posta, özetleme ve dilbilgisi iş akışlarını tek grupta tara."
          : "Scan blog writing, copywriting, email, summarization, and grammar workflows together.",
      items: [
        parent(writing, locale === "tr" ? "Blog Writing" : "Blog Writing", getToolsByCategory(locale, "writing-editing").length),
        parent(writing, locale === "tr" ? "Copywriting" : "Copywriting", getToolsByCategory(locale, "writing-editing").length),
        parent(writing, locale === "tr" ? "Essay Writing" : "Essay Writing", getToolsByCategory(locale, "writing-editing").length),
        parent(writing, locale === "tr" ? "Grammar" : "Grammar", getToolsByCategory(locale, "writing-editing").length),
        parent(writing, locale === "tr" ? "Email Writing" : "Email Writing", getToolsByCategory(locale, "writing-editing").length),
        parent(writing, locale === "tr" ? "SEO Writing" : "SEO Writing", getToolsByCategory(locale, "writing-editing").length)
      ]
    },
    {
      title: locale === "tr" ? "Görüntü Oluşturma ve Düzenleme" : "Image Generation & Editing",
      intro:
        locale === "tr"
          ? "Görsel üretim, arka plan kaldırma, iyileştirme ve yaratıcı düzenlemeleri bir arada aç."
          : "Open generation, background removal, enhancement, and visual editing together.",
      items: [
        parent(image, locale === "tr" ? "Image Generation" : "Image Generation", getToolsByCategory(locale, "image-generation-editing").length),
        parent(image, locale === "tr" ? "Background Removal" : "Background Removal", getToolsByCategory(locale, "image-generation-editing").length),
        parent(image, locale === "tr" ? "Upscaling" : "Upscaling", getToolsByCategory(locale, "image-generation-editing").length),
        parent(image, locale === "tr" ? "Product Photos" : "Product Photos", getToolsByCategory(locale, "image-generation-editing").length),
        parent(image, locale === "tr" ? "Profile Pictures" : "Profile Pictures", getToolsByCategory(locale, "image-generation-editing").length),
        parent(image, locale === "tr" ? "Text to Image" : "Text to Image", getToolsByCategory(locale, "image-generation-editing").length)
      ]
    },
    {
      title: locale === "tr" ? "Görüntü Analizi" : "Image Analysis",
      intro:
        locale === "tr"
          ? "OCR, yüz tanıma, nesne algılama ve görsel açıklama yollarını bir arada göster."
          : "Group OCR, face recognition, object detection, and visual explanation paths.",
      items: [
        parent(image, "OCR", getToolsByCategory(locale, "image-analysis").length),
        parent(image, locale === "tr" ? "Image Explain" : "Image Explain", getToolsByCategory(locale, "image-analysis").length),
        parent(image, locale === "tr" ? "Face Recognition" : "Face Recognition", getToolsByCategory(locale, "image-analysis").length),
        parent(image, locale === "tr" ? "Object Detection" : "Object Detection", getToolsByCategory(locale, "image-analysis").length),
        parent(image, locale === "tr" ? "Image Segmentation" : "Image Segmentation", getToolsByCategory(locale, "image-analysis").length),
        parent(image, locale === "tr" ? "Prompt to Image" : "Prompt to Image", getToolsByCategory(locale, "image-analysis").length)
      ]
    },
    {
      title: locale === "tr" ? "Müzik ve Ses" : "Music & Audio",
      intro:
        locale === "tr"
          ? "Müzik üretimi, beat, söz yazımı ve ses dönüştürme yüzeylerini tek arşivde tut."
          : "Keep music generation, beats, lyrics, and audio transformation in one archive.",
      items: [
        parent(voice, locale === "tr" ? "Music Generator" : "Music Generator", getToolsByCategory(locale, "music-audio").length),
        parent(voice, locale === "tr" ? "Beat Generator" : "Beat Generator", getToolsByCategory(locale, "music-audio").length),
        parent(voice, locale === "tr" ? "Lyrics" : "Lyrics", getToolsByCategory(locale, "music-audio").length),
        parent(voice, locale === "tr" ? "Mastering" : "Mastering", getToolsByCategory(locale, "music-audio").length),
        parent(voice, locale === "tr" ? "Vocal Remover" : "Vocal Remover", getToolsByCategory(locale, "music-audio").length),
        parent(voice, locale === "tr" ? "Song Generator" : "Song Generator", getToolsByCategory(locale, "music-audio").length)
      ]
    },
    {
      title: locale === "tr" ? "Ses Oluşturma ve Dönüştürme" : "Audio Generation & Conversion",
      intro:
        locale === "tr"
          ? "Metinden sese, ses klonlama, dublaj ve transkripsiyon akışlarını toparla."
          : "Organize text-to-speech, voice cloning, dubbing, and transcription flows.",
      items: [
        parent(voice, locale === "tr" ? "Text to Speech" : "Text to Speech", getToolsByCategory(locale, "audio-generation-conversion").length),
        parent(voice, locale === "tr" ? "Voice Cloning" : "Voice Cloning", getToolsByCategory(locale, "audio-generation-conversion").length),
        parent(voice, locale === "tr" ? "Dubbing" : "Dubbing", getToolsByCategory(locale, "audio-generation-conversion").length),
        parent(voice, locale === "tr" ? "Transcription" : "Transcription", getToolsByCategory(locale, "audio-generation-conversion").length),
        parent(voice, locale === "tr" ? "Speech to Text" : "Speech to Text", getToolsByCategory(locale, "audio-generation-conversion").length),
        parent(voice, locale === "tr" ? "Voice Assistants" : "Voice Assistants", getToolsByCategory(locale, "audio-generation-conversion").length)
      ]
    },
    {
      title: locale === "tr" ? "Video ve Animasyon" : "Video & Animation",
      intro:
        locale === "tr"
          ? "Kısa video, animasyon, yüz takası ve metinden videoya yollarını tara."
          : "Scan short video, animation, face swap, and text-to-video paths.",
      items: [
        parent(video, locale === "tr" ? "Video Generator" : "Video Generator", getToolsByCategory(locale, "video-animation").length),
        parent(video, locale === "tr" ? "Video Editor" : "Video Editor", getToolsByCategory(locale, "video-animation").length),
        parent(video, locale === "tr" ? "Animation" : "Animation", getToolsByCategory(locale, "video-animation").length),
        parent(video, locale === "tr" ? "Short Video" : "Short Video", getToolsByCategory(locale, "video-animation").length),
        parent(video, locale === "tr" ? "Image to Video" : "Image to Video", getToolsByCategory(locale, "video-animation").length),
        parent(video, locale === "tr" ? "Script to Video" : "Script to Video", getToolsByCategory(locale, "video-animation").length)
      ]
    },
    {
      title: locale === "tr" ? "İşletme, pazarlama ve satış" : "Business, marketing, and sales",
      intro:
        locale === "tr"
          ? "CRM, reklam, e-posta, satış ve operasyon odaklı arşiv yollarını tek yerde grupla."
          : "Group CRM, ads, email, sales, and operations paths in one place.",
      items: [
        parent(business, locale === "tr" ? "CRM" : "CRM", getToolsByCategory(locale, "business-management").length),
        parent(marketing, locale === "tr" ? "Ad Copy" : "Ad Copy", getToolsByCategory(locale, "marketing-advertising").length),
        parent(marketing, locale === "tr" ? "Email Marketing" : "Email Marketing", getToolsByCategory(locale, "marketing-advertising").length),
        parent(business, locale === "tr" ? "Project Management" : "Project Management", getToolsByCategory(locale, "business-management").length),
        parent(business, locale === "tr" ? "Hiring" : "Hiring", getToolsByCategory(locale, "business-management").length),
        parent(marketing, locale === "tr" ? "Lead Generation" : "Lead Generation", getToolsByCategory(locale, "marketing-advertising").length)
      ]
    },
    {
      title: locale === "tr" ? "Araştırma ve eğitim" : "Research & education",
      intro:
        locale === "tr"
          ? "Öğrenci, araştırma, çeviri ve veri analizi için kaynak yollarını toparla."
          : "Collect source paths for students, research, translation, and data analysis.",
      items: [
        parent(research, locale === "tr" ? "Research" : "Research", getToolsByCategory(locale, "research-data-analysis").length),
        parent(education, locale === "tr" ? "Students" : "Students", getToolsByCategory(locale, "education-translation").length),
        parent(education, locale === "tr" ? "Translation" : "Translation", getToolsByCategory(locale, "education-translation").length),
        parent(education, locale === "tr" ? "Study" : "Study", getToolsByCategory(locale, "education-translation").length),
        parent(research, locale === "tr" ? "Summarization" : "Summarization", getToolsByCategory(locale, "research-data-analysis").length),
        parent(research, locale === "tr" ? "Decision Support" : "Decision Support", getToolsByCategory(locale, "research-data-analysis").length)
      ]
    }
  ];
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
  const localizedCategories = getLocalizedCategories(safeLocale);
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const tools = getLocalizedTools(safeLocale);
  const archiveGroups = buildArchiveGroups(safeLocale);

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fb_46%,#eef3f8_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[32px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(244,248,253,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] sm:p-8">
        <Badge variant="accent">{safeLocale === "tr" ? "Mega dizin" : "Mega directory"}</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          {safeLocale === "tr" ? "Kategori, alt konu ve harf bazlı arşivi tek yerde keşfet" : "Explore categories, subtopics, and alphabetical archive in one place"}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {safeLocale === "tr"
            ? "Hızlı iç linkler, araç kategorileri, use-case yolları ve A-Z gezinme ile crawl derinliğini artır."
            : "Use fast internal links, tool categories, use-case paths, and A-Z browsing to deepen crawl paths."}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <PremiumButton href={`/${safeLocale}/categories`}>{safeLocale === "tr" ? "Kategoriler" : "Categories"}</PremiumButton>
          <PremiumButton href={`/${safeLocale}/tools`} variant="secondary">
            {safeLocale === "tr" ? "Araçlar" : "Tools"}
          </PremiumButton>
          <PremiumButton href={`/${safeLocale}/news`} variant="secondary">
            {safeLocale === "tr" ? "AI Haberleri" : "AI News"}
          </PremiumButton>
        </div>
      </section>

      <SectionShell
        eyebrow={safeLocale === "tr" ? "Ana kategoriler" : "Main categories"}
        title={safeLocale === "tr" ? "Tam kategori taksonomisi" : "Full category taxonomy"}
        description={
          safeLocale === "tr"
            ? "Kullanıcıların en hızlı başladığı ana taksonomiyi, araç sayılarıyla birlikte tarayın."
            : "Browse the main taxonomy with tool counts and direct category paths."
        }
        className="px-0 sm:px-0"
        contentClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {localizedCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/${safeLocale}/categories/${category.slug}`}
            className="group rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)] transition hover:border-sky-200 hover:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-950">{category.name}</span>
                <span className="mt-1 block text-xs leading-6 text-slate-500">{category.description}</span>
              </span>
              <Badge variant="muted" className="shrink-0">
                {getToolsByCategory(safeLocale, category.slug).length}
              </Badge>
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-500">{category.supportText}</p>
          </Link>
        ))}
      </SectionShell>

      <SectionShell
        eyebrow={safeLocale === "tr" ? "Alt arşiv" : "Sub-archive"}
        title={safeLocale === "tr" ? "Detaylı alt konu grupları" : "Detailed subtopic groups"}
        description={
          safeLocale === "tr"
            ? "Bu kartlar, ana kategorileri daha küçük karar yollarına ayıran geniş bir arşiv görünümü sunar."
            : "These cards split main categories into smaller decision paths for deeper browsing."
        }
        className="px-0 sm:px-0"
        contentClassName="grid gap-5 xl:grid-cols-2"
      >
        {archiveGroups.map((group) => (
          <div key={group.title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{group.title}</p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{group.intro}</p>
              </div>
              <Badge variant="muted" className="shrink-0">
                {group.items.length}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Link
                  key={`${group.title}-${item.label}`}
                  href={item.href}
                  className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
                >
                  {item.label}
                  <span className="ml-2 text-[10px] text-slate-400">{item.count}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </SectionShell>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionShell
          eyebrow={safeLocale === "tr" ? "Tool kategorileri" : "Tool categories"}
          title={safeLocale === "tr" ? "Hızlı kategori filtreleri" : "Quick category filters"}
          description={
            safeLocale === "tr"
              ? "Yazı, görsel, video ve verimlilik gibi ana araç katmanlarını hızlıca aç."
              : "Open the main tool layers for writing, image, video, and productivity."
          }
          className="px-0 sm:px-0"
          contentClassName="flex flex-wrap gap-2"
        >
          {toolCategoryOptions[safeLocale].map((item) => (
            <Link
              key={item.slug}
              href={`/${safeLocale}/tools?category=${item.slug}`}
              className="inline-flex min-h-[36px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
            >
              {item.label}
              <span className="ml-2 text-[10px] text-slate-400">{countToolCategoryMatches(safeLocale, item.slug)}</span>
            </Link>
          ))}
        </SectionShell>

        <SectionShell
          eyebrow={safeLocale === "tr" ? "Use-case arşivi" : "Use-case archive"}
          title={safeLocale === "tr" ? "Detaylı keşif yolları" : "Detailed discovery paths"}
          description={
            safeLocale === "tr"
              ? "Öğrenciler, freelancer’lar, araştırma ve içerik gibi kullanıma göre filtrelenen yolları aç."
              : "Open use-case driven archives for students, freelancers, research, and content."
          }
          className="px-0 sm:px-0"
          contentClassName="flex flex-wrap gap-2"
        >
          {useCaseOptions[safeLocale].map((item) => (
            <Link
              key={item.slug}
              href={`/${safeLocale}/tools?useCase=${item.slug}`}
              className="inline-flex min-h-[36px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
            >
              {item.label}
              <span className="ml-2 text-[10px] text-slate-400">{countUseCaseMatches(safeLocale, item.slug)}</span>
            </Link>
          ))}
        </SectionShell>
      </div>

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

      <SectionShell
        eyebrow={safeLocale === "tr" ? "Keşif merkezleri" : "Discovery hubs"}
        title={safeLocale === "tr" ? "Ek SEO merkezleri" : "Additional SEO hubs"}
        description={
          safeLocale === "tr"
            ? "Araçlar, karşılaştırmalar, blog ve AI haberleri arasında daha derin bağlantılar kur."
            : "Create deeper links between tools, comparisons, blog, and AI news."
        }
        className="px-0 sm:px-0"
        contentClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        <Link href={`/${safeLocale}/compare`} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)] transition hover:border-sky-200 hover:bg-slate-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons"}</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">{safeLocale === "tr" ? "Karar sayfalarına geç" : "Move into decision pages"}</p>
        </Link>
        <Link href={`/${safeLocale}/blog`} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)] transition hover:border-sky-200 hover:bg-slate-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{safeLocale === "tr" ? "Blog" : "Blog"}</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">{safeLocale === "tr" ? "Editoryal rehberler" : "Editorial guides"}</p>
        </Link>
        <Link href={`/${safeLocale}/news`} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)] transition hover:border-sky-200 hover:bg-slate-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{safeLocale === "tr" ? "AI Haberleri" : "AI News"}</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">{safeLocale === "tr" ? "Kısa haber akışı" : "Short news flow"}</p>
        </Link>
        <Link href={`/${safeLocale}/tools`} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)] transition hover:border-sky-200 hover:bg-slate-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{safeLocale === "tr" ? "Araçlar" : "Tools"}</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">{safeLocale === "tr" ? "Kompakt liste görünümü" : "Compact list view"}</p>
        </Link>
      </SectionShell>
    </div>
  );
}
