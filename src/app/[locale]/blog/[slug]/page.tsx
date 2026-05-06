import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemePreviewLayout } from "@/components/content/theme-preview-layout";
import { blogArticles } from "@/data/blog";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale, type Locale } from "@/i18n/config";
import { formatBlogDate, getLocalizedBlogArticleBySlug, resolveBlogPublishDate } from "@/lib/blog";
import { buildBlogMetaDescription, buildBlogPageTitle } from "@/lib/seo";

export const revalidate = 3600;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from(new Set(blogArticles.map((article) => article.slug))).map((slug) => ({ slug }));
}

const blogDetailCopy: Record<
  Locale,
  {
    eyebrow: string;
    home: string;
    blog: string;
    editorial: string;
    sections: string;
    relatedTools: string;
    publishDate: string;
    allArticles: string;
    browseTools: string;
    heroTitle: string;
    heroDescription: string;
    blocksTitle: string;
    blocksDescription: string;
    previewDescription: string;
  }
> = {
  tr: {
    eyebrow: "Blog detay önizleme",
    home: "Ana sayfa",
    blog: "Blog",
    editorial: "Editoryal içerik",
    sections: "Bölüm sayısı",
    relatedTools: "İlgili araç",
    publishDate: "Yayın tarihi",
    allArticles: "Tüm blog yazıları",
    browseTools: "Araçlara dön",
    heroTitle: "Yeni editoryal hero",
    heroDescription: "Makale hero alanı yeni sistemde daha güçlü başlık, özet, yayın tarihi ve güven sinyalleriyle tekrar kurulacak.",
    blocksTitle: "Modüler içerik blokları",
    blocksDescription: "Alt başlıklar, iç linkler, ilgili araçlar ve karşılaştırma yönlendirmeleri yeni tema kartlarıyla yeniden yerleşecek.",
    previewDescription: "Bu detay sayfası yeni Deciply tema sisteminde daha temiz editoryal hiyerarşi ve daha güçlü içerik bloklarıyla yeniden kuruluyor."
  },
  en: {
    eyebrow: "Blog detail preview",
    home: "Home",
    blog: "Blog",
    editorial: "Editorial content",
    sections: "Sections",
    relatedTools: "Related tools",
    publishDate: "Publish date",
    allArticles: "All blog articles",
    browseTools: "Browse tools",
    heroTitle: "New editorial hero",
    heroDescription: "The article hero will be rebuilt with a stronger title, summary, publish date, and trust cues.",
    blocksTitle: "Modular content blocks",
    blocksDescription: "Subsections, internal links, related tools, and comparison prompts will be reintroduced with the new theme cards.",
    previewDescription: "This detail page is being rebuilt in the new Deciply theme system with a cleaner editorial hierarchy and stronger content blocks."
  },
  ar: {
    eyebrow: "معاينة تفاصيل المقال",
    home: "الرئيسية",
    blog: "المدونة",
    editorial: "محتوى تحريري",
    sections: "عدد الأقسام",
    relatedTools: "الأدوات المرتبطة",
    publishDate: "تاريخ النشر",
    allArticles: "كل المقالات",
    browseTools: "استعراض الأدوات",
    heroTitle: "واجهة تحريرية جديدة",
    heroDescription: "سيُعاد بناء منطقة المقال الرئيسية بعنوان أقوى وملخص وتاريخ نشر وإشارات ثقة أوضح.",
    blocksTitle: "كتل محتوى مرنة",
    blocksDescription: "ستعود العناوين الفرعية والروابط الداخلية والأدوات ذات الصلة ومقارنات القرار داخل بطاقات التصميم الجديدة.",
    previewDescription: "يُعاد بناء صفحة التفاصيل هذه داخل نظام Deciply الجديد بهرمية تحريرية أنظف وكتل محتوى أقوى."
  },
  ru: {
    eyebrow: "Предпросмотр статьи",
    home: "Главная",
    blog: "Блог",
    editorial: "Редакционный материал",
    sections: "Количество разделов",
    relatedTools: "Связанные инструменты",
    publishDate: "Дата публикации",
    allArticles: "Все статьи",
    browseTools: "Перейти к инструментам",
    heroTitle: "Новый редакционный hero-блок",
    heroDescription: "Главный блок статьи будет перестроен с более сильным заголовком, кратким описанием, датой публикации и сигналами доверия.",
    blocksTitle: "Модульные блоки контента",
    blocksDescription: "Подзаголовки, внутренние ссылки, связанные инструменты и подсказки к сравнениям будут заново собраны в карточках новой темы.",
    previewDescription: "Эта страница пересобирается в новой системе Deciply с более чистой редакционной иерархией и более сильными блоками контента."
  },
  zh: {
    eyebrow: "文章详情预览",
    home: "首页",
    blog: "博客",
    editorial: "编辑内容",
    sections: "章节数",
    relatedTools: "相关工具",
    publishDate: "发布日期",
    allArticles: "全部文章",
    browseTools: "浏览工具",
    heroTitle: "新的编辑头图",
    heroDescription: "文章头部区域将以更强的标题、摘要、发布日期和信任信号重新构建。",
    blocksTitle: "模块化内容区块",
    blocksDescription: "小标题、站内链接、相关工具和对比提示将通过新的主题卡片重新布局。",
    previewDescription: "该详情页正在新的 Deciply 主题系统中重建，拥有更清晰的编辑层级和更强的内容区块。"
  },
  ja: {
    eyebrow: "記事詳細プレビュー",
    home: "ホーム",
    blog: "ブログ",
    editorial: "編集コンテンツ",
    sections: "セクション数",
    relatedTools: "関連ツール",
    publishDate: "公開日",
    allArticles: "すべての記事",
    browseTools: "ツールを見る",
    heroTitle: "新しい編集ヒーロー",
    heroDescription: "記事ヒーローは、より強い見出し、要約、公開日、信頼シグナルを備えて再構築されます。",
    blocksTitle: "モジュール型コンテンツブロック",
    blocksDescription: "小見出し、内部リンク、関連ツール、比較導線が新しいテーマカードで再配置されます。",
    previewDescription: "この詳細ページは、より明確な編集階層と強いコンテンツブロックを備えた新しい Deciply テーマで再構築されています。"
  },
  ko: {
    eyebrow: "블로그 상세 미리보기",
    home: "홈",
    blog: "블로그",
    editorial: "편집 콘텐츠",
    sections: "섹션 수",
    relatedTools: "관련 도구",
    publishDate: "게시일",
    allArticles: "모든 글",
    browseTools: "도구 보기",
    heroTitle: "새 편집형 히어로",
    heroDescription: "기사 상단 영역은 더 강한 제목, 요약, 게시일, 신뢰 신호로 다시 구성됩니다.",
    blocksTitle: "모듈형 콘텐츠 블록",
    blocksDescription: "하위 섹션, 내부 링크, 관련 도구, 비교 유도 요소가 새 테마 카드에 맞게 재배치됩니다.",
    previewDescription: "이 상세 페이지는 더 깔끔한 편집 계층과 더 강한 콘텐츠 블록을 갖춘 새 Deciply 테마로 재구성되고 있습니다."
  },
  el: {
    eyebrow: "Προεπισκόπηση άρθρου",
    home: "Αρχική",
    blog: "Blog",
    editorial: "Συντακτικό περιεχόμενο",
    sections: "Αριθμός ενοτήτων",
    relatedTools: "Σχετικά εργαλεία",
    publishDate: "Ημερομηνία δημοσίευσης",
    allArticles: "Όλα τα άρθρα",
    browseTools: "Περιήγηση στα εργαλεία",
    heroTitle: "Νέο editorial hero",
    heroDescription: "Η κορυφή του άρθρου θα ξαναχτιστεί με ισχυρότερο τίτλο, περίληψη, ημερομηνία δημοσίευσης και σήματα εμπιστοσύνης.",
    blocksTitle: "Αρθρωτά blocks περιεχομένου",
    blocksDescription: "Υποενότητες, εσωτερικοί σύνδεσμοι, σχετικά εργαλεία και προτροπές σύγκρισης θα τοποθετηθούν ξανά με τις νέες κάρτες θέματος.",
    previewDescription: "Αυτή η σελίδα ανακατασκευάζεται στο νέο σύστημα Deciply με καθαρότερη συντακτική ιεραρχία και ισχυρότερα blocks περιεχομένου."
  },
  da: {
    eyebrow: "Forhåndsvisning af blogdetalje",
    home: "Forside",
    blog: "Blog",
    editorial: "Redaktionelt indhold",
    sections: "Antal sektioner",
    relatedTools: "Relaterede værktøjer",
    publishDate: "Udgivelsesdato",
    allArticles: "Alle artikler",
    browseTools: "Se værktøjer",
    heroTitle: "Nyt redaktionelt hero-område",
    heroDescription: "Artiklens topområde bliver genopbygget med stærkere titel, resumé, udgivelsesdato og tillidssignaler.",
    blocksTitle: "Modulære indholdsblokke",
    blocksDescription: "Undersektioner, interne links, relaterede værktøjer og sammenligningsopfordringer bliver lagt ind igen med de nye temakort.",
    previewDescription: "Denne detaljeside bliver genopbygget i det nye Deciply-tema med en renere redaktionel struktur og stærkere indholdsblokke."
  },
  fa: {
    eyebrow: "پیش‌نمایش جزئیات مقاله",
    home: "خانه",
    blog: "وبلاگ",
    editorial: "محتوای تحریریه",
    sections: "تعداد بخش‌ها",
    relatedTools: "ابزارهای مرتبط",
    publishDate: "تاریخ انتشار",
    allArticles: "همه مقاله‌ها",
    browseTools: "مشاهده ابزارها",
    heroTitle: "هدر تحریریه جدید",
    heroDescription: "بخش اصلی مقاله با عنوان قوی‌تر، خلاصه، تاریخ انتشار و نشانه‌های اعتماد بازطراحی می‌شود.",
    blocksTitle: "بلوک‌های محتوای ماژولار",
    blocksDescription: "زیرعنوان‌ها، لینک‌های داخلی، ابزارهای مرتبط و مسیرهای مقایسه با کارت‌های جدید تم دوباره چیده می‌شوند.",
    previewDescription: "این صفحه جزئیات در سیستم تم جدید Deciply با سلسله‌مراتب تحریریه تمیزتر و بلوک‌های محتوای قوی‌تر بازسازی می‌شود."
  }
};

function buildPreviewDescription(locale: Locale, excerpt: string, intro: string) {
  const copy = blogDetailCopy[locale];
  return `${excerpt} ${copy.previewDescription} ${intro}`;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const article = getLocalizedBlogArticleBySlug(safeLocale, slug);

  if (!article) {
    return {};
  }

  const canonicalUrl = buildCanonicalUrl(`/${safeLocale}/blog/${slug}`);
  const publishedTime = resolveBlogPublishDate(article);
  const description = buildBlogMetaDescription(safeLocale, article);

  return {
    title: buildBlogPageTitle(article),
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates(`/blog/${slug}`)
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: buildBlogPageTitle(article),
      description,
      publishedTime,
      modifiedTime: article.updatedAt ?? publishedTime
    }
  };
}

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const article = getLocalizedBlogArticleBySlug(safeLocale, slug);

  if (!article) {
    notFound();
  }

  const copy = blogDetailCopy[safeLocale];
  const publishedSource = resolveBlogPublishDate(article);
  const publishedDate = publishedSource ? formatBlogDate(safeLocale, publishedSource) : null;

  return (
    <ThemePreviewLayout
      locale={safeLocale}
      eyebrow={copy.eyebrow}
      title={article.title}
      description={buildPreviewDescription(safeLocale, article.excerpt, article.intro)}
      breadcrumbs={[
        { label: copy.home, href: `/${safeLocale}` },
        { label: copy.blog, href: `/${safeLocale}/blog` },
        { label: article.title }
      ]}
      badges={[
        article.categoryLabel,
        copy.editorial,
        ...(publishedDate ? [publishedDate] : [])
      ]}
      stats={[
        {
          label: copy.sections,
          value: String(article.sections.length)
        },
        {
          label: copy.relatedTools,
          value: String(article.relatedToolSlugs.length)
        },
        {
          label: copy.publishDate,
          value: publishedDate ?? "-"
        }
      ]}
      primaryAction={{
        label: copy.allArticles,
        href: `/${safeLocale}/blog`
      }}
      secondaryAction={{
        label: copy.browseTools,
        href: `/${safeLocale}/tools`
      }}
      sections={[
        {
          title: copy.heroTitle,
          description: copy.heroDescription
        },
        {
          title: copy.blocksTitle,
          description: copy.blocksDescription
        }
      ]}
    />
  );
}
