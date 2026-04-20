import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import type { SupportedLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  locale: SupportedLocale;
  dictionary: Dictionary;
};

type FooterLink = {
  href: string;
  label: string;
};

function isExternalHref(href: string) {
  return /^(mailto:|https?:\/\/|tel:)/i.test(href);
}

function renderLink(locale: SupportedLocale, item: FooterLink) {
  const className =
    "text-sm font-medium text-slate-600 transition hover:text-slate-950";

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

const footerCopy: Record<SupportedLocale, Record<string, string>> = {
  tr: { explore: "Keşfet", popular: "Popüler", content: "İçerik", company: "Kurumsal", seo: "SEO bağlantıları", categories: "Kategoriler", tools: "Araçlar", compare: "Karşılaştırmalar", news: "AI Haberleri", blogGuides: "Blog rehberleri", latestNews: "Güncel AI haberleri", about: "Hakkında", contact: "İletişim", privacy: "Gizlilik", terms: "Kullanım şartları", affiliate: "Affiliate açıklaması", chatbot: "Chatbot araçları", writing: "Yazma araçları", image: "Görsel araçları", coding: "Kodlama araçları", video: "Video araçları", productivity: "Verimlilik araçları", grok: "Grok alternatifleri", voice: "AI ses araçları" },
  en: { explore: "Explore", popular: "Popular", content: "Content", company: "Company", seo: "SEO links", categories: "Categories", tools: "Tools", compare: "Comparisons", news: "AI News", blogGuides: "Blog guides", latestNews: "Latest AI news", about: "About", contact: "Contact", privacy: "Privacy", terms: "Terms", affiliate: "Affiliate disclosure", chatbot: "Chatbot tools", writing: "Writing tools", image: "Image tools", coding: "Coding tools", video: "Video tools", productivity: "Productivity tools", grok: "Grok alternatives", voice: "AI voice tools" },
  ar: { explore: "استكشف", popular: "الشائع", content: "المحتوى", company: "الشركة", seo: "روابط SEO", categories: "الفئات", tools: "الأدوات", compare: "المقارنات", news: "أخبار AI", blogGuides: "أدلة المدونة", latestNews: "أحدث أخبار AI", about: "حول", contact: "اتصال", privacy: "الخصوصية", terms: "الشروط", affiliate: "إفصاح الشراكة", chatbot: "أدوات chatbot", writing: "أدوات الكتابة", image: "أدوات الصور", coding: "أدوات البرمجة", video: "أدوات الفيديو", productivity: "أدوات الإنتاجية", grok: "بدائل Grok", voice: "أدوات صوت AI" },
  ru: { explore: "Навигация", popular: "Популярное", content: "Контент", company: "Компания", seo: "SEO-ссылки", categories: "Категории", tools: "Инструменты", compare: "Сравнения", news: "AI-новости", blogGuides: "Гайды блога", latestNews: "Последние AI-новости", about: "О проекте", contact: "Контакты", privacy: "Конфиденциальность", terms: "Условия", affiliate: "Партнёрское раскрытие", chatbot: "Чат-боты", writing: "Инструменты письма", image: "Инструменты изображений", coding: "Инструменты кода", video: "Видео-инструменты", productivity: "Продуктивность", grok: "Альтернативы Grok", voice: "AI-голос" },
  zh: { explore: "探索", popular: "热门", content: "内容", company: "公司", seo: "SEO 链接", categories: "分类", tools: "工具", compare: "对比", news: "AI 新闻", blogGuides: "博客指南", latestNews: "最新 AI 新闻", about: "关于", contact: "联系", privacy: "隐私", terms: "条款", affiliate: "联盟披露", chatbot: "聊天机器人工具", writing: "写作工具", image: "图像工具", coding: "编程工具", video: "视频工具", productivity: "效率工具", grok: "Grok 替代品", voice: "AI 语音工具" },
  ja: { explore: "探す", popular: "人気", content: "コンテンツ", company: "会社情報", seo: "SEOリンク", categories: "カテゴリ", tools: "ツール", compare: "比較", news: "AIニュース", blogGuides: "ブログガイド", latestNews: "最新AIニュース", about: "概要", contact: "問い合わせ", privacy: "プライバシー", terms: "利用規約", affiliate: "アフィリエイト開示", chatbot: "チャットボットツール", writing: "文章ツール", image: "画像ツール", coding: "コードツール", video: "動画ツール", productivity: "生産性ツール", grok: "Grok代替", voice: "AI音声ツール" },
  ko: { explore: "탐색", popular: "인기", content: "콘텐츠", company: "회사", seo: "SEO 링크", categories: "카테고리", tools: "도구", compare: "비교", news: "AI 뉴스", blogGuides: "블로그 가이드", latestNews: "최신 AI 뉴스", about: "소개", contact: "문의", privacy: "개인정보", terms: "이용약관", affiliate: "제휴 고지", chatbot: "챗봇 도구", writing: "글쓰기 도구", image: "이미지 도구", coding: "코딩 도구", video: "비디오 도구", productivity: "생산성 도구", grok: "Grok 대안", voice: "AI 음성 도구" },
  el: { explore: "Εξερεύνηση", popular: "Δημοφιλή", content: "Περιεχόμενο", company: "Εταιρικά", seo: "Σύνδεσμοι SEO", categories: "Κατηγορίες", tools: "Εργαλεία", compare: "Συγκρίσεις", news: "Νέα AI", blogGuides: "Οδηγοί blog", latestNews: "Τελευταία νέα AI", about: "Σχετικά", contact: "Επικοινωνία", privacy: "Απόρρητο", terms: "Όροι", affiliate: "Affiliate disclosure", chatbot: "Εργαλεία chatbot", writing: "Εργαλεία γραφής", image: "Εργαλεία εικόνας", coding: "Εργαλεία κώδικα", video: "Εργαλεία βίντεο", productivity: "Παραγωγικότητα", grok: "Εναλλακτικές Grok", voice: "Εργαλεία φωνής AI" },
  da: { explore: "Udforsk", popular: "Populært", content: "Indhold", company: "Virksomhed", seo: "SEO-links", categories: "Kategorier", tools: "Værktøjer", compare: "Sammenligninger", news: "AI-nyheder", blogGuides: "Blogguides", latestNews: "Seneste AI-nyheder", about: "Om", contact: "Kontakt", privacy: "Privatliv", terms: "Vilkår", affiliate: "Affiliate-oplysning", chatbot: "Chatbot-værktøjer", writing: "Skriveværktøjer", image: "Billedværktøjer", coding: "Kodeværktøjer", video: "Videoværktøjer", productivity: "Produktivitet", grok: "Grok-alternativer", voice: "AI-stemmeværktøjer" },
  fa: { explore: "کشف", popular: "محبوب", content: "محتوا", company: "شرکتی", seo: "لینک‌های SEO", categories: "دسته‌ها", tools: "ابزارها", compare: "مقایسه‌ها", news: "اخبار AI", blogGuides: "راهنماهای بلاگ", latestNews: "آخرین اخبار AI", about: "درباره", contact: "تماس", privacy: "حریم خصوصی", terms: "شرایط", affiliate: "افشای همکاری", chatbot: "ابزارهای چت‌بات", writing: "ابزارهای نوشتن", image: "ابزارهای تصویر", coding: "ابزارهای کدنویسی", video: "ابزارهای ویدئو", productivity: "ابزارهای بهره‌وری", grok: "جایگزین‌های Grok", voice: "ابزارهای صدای AI" }
};

function getFooterColumns(locale: SupportedLocale) {
  const copy = footerCopy[locale];

  return [
    {
      title: copy.explore,
      links: [
        { href: "/categories", label: copy.categories },
        { href: "/tools", label: copy.tools },
        { href: "/compare", label: copy.compare },
        { href: "/news", label: copy.news },
        { href: "/blog", label: "Blog" }
      ]
    },
    {
      title: copy.popular,
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
      title: copy.content,
      links: [
        { href: "/blog", label: copy.blogGuides },
        { href: "/news", label: copy.latestNews },
        { href: "/compare/chatgpt-vs-grok", label: "ChatGPT vs Grok" },
        { href: "/compare/claude-vs-grok", label: "Claude vs Grok" },
        { href: "/blog/grok-alternatifleri-en-iyi-ai-araclari-2026", label: copy.grok },
        { href: "/blog/en-iyi-ai-ses-olusturma-araclari-2026", label: copy.voice }
      ]
    },
    {
      title: copy.company,
      links: [
        { href: "/about", label: copy.about },
        { href: "/contact", label: copy.contact },
        { href: "/privacy-policy", label: copy.privacy },
        { href: "/terms", label: copy.terms },
        { href: "/affiliate-disclosure", label: copy.affiliate }
      ]
    },
    {
      title: copy.seo,
      links: [
        { href: "/categories/chatbots-virtual-companions", label: copy.chatbot },
        { href: "/categories/writing-editing", label: copy.writing },
        { href: "/categories/image-generation-editing", label: copy.image },
        { href: "/categories/coding-development", label: copy.coding },
        { href: "/categories/video-animation", label: copy.video },
        { href: "/categories/office-productivity", label: copy.productivity }
      ]
    }
  ];
}

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const footerColumns = getFooterColumns(locale);

  return (
    <footer className="mt-16 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <section className="ui-card rounded-[28px] p-5 sm:p-6 lg:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_2fr] lg:items-start">
            <div className="space-y-5 rounded-[24px] border border-slate-200 bg-white/78 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.045)]">
              <div className="flex items-center gap-3">
                <BrandLogo compact className="h-10 w-10" />
                <div>
                  <p className="text-xl font-black tracking-[-0.045em] text-slate-950">Deciply</p>
                  <p className="text-sm font-semibold text-slate-500">{dictionary.brandSubtitle}</p>
                </div>
              </div>
              <p className="max-w-[36rem] text-sm leading-7 text-slate-600">{dictionary.footer.description}</p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {dictionary.footer.contactBlock.links.map((item) => renderLink(locale, item))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {footerColumns.map((group) => (
                <div key={group.title} className="space-y-3">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">{group.title}</h2>
                  <div className="flex flex-col gap-2">{group.links.slice(0, 8).map((item) => renderLink(locale, item))}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 border-t border-slate-200/90 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
            <p className="font-semibold">{dictionary.footer.copyright}</p>
          </div>
        </section>
      </div>
    </footer>
  );
}
