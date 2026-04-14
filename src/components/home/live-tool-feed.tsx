"use client";

import { useMemo, useState } from "react";

import { DiscoveryToolCard } from "@/components/home/discovery-tool-card";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/config";
import type { ToolCard as HomeToolCard } from "@/types/home";

type FeedTabKey = "today" | "new" | "saved" | "used" | "extensions" | "apps";

type LiveToolFeedProps = {
  locale: Locale;
  tools: HomeToolCard[];
  openLabel: string;
};

function getTabLabel(locale: Locale, key: FeedTabKey) {
  const labels: Record<FeedTabKey, Record<Locale, string>> = {
    today: {
      tr: "Bugün",
      en: "Today",
      ar: "اليوم",
      ru: "Сегодня",
      zh: "今天",
      ja: "今日",
      ko: "오늘",
      el: "Σήμερα",
      da: "I dag",
      fa: "امروز"
    },
    new: {
      tr: "Yeni",
      en: "New",
      ar: "جديد",
      ru: "Новые",
      zh: "最新",
      ja: "新着",
      ko: "신규",
      el: "Νέα",
      da: "Nyt",
      fa: "جدید"
    },
    saved: {
      tr: "En çok kaydedilen",
      en: "Most saved",
      ar: "الأكثر حفظًا",
      ru: "Чаще сохраняют",
      zh: "保存最多",
      ja: "保存が多い",
      ko: "저장 많이 됨",
      el: "Πιο αποθηκευμένα",
      da: "Mest gemte",
      fa: "بیشترین ذخیره"
    },
    used: {
      tr: "En çok kullanılan",
      en: "Most used",
      ar: "الأكثر استخدامًا",
      ru: "Чаще используют",
      zh: "使用最多",
      ja: "最も使用",
      ko: "가장 많이 사용",
      el: "Πιο χρησιμοποιημένα",
      da: "Mest brugte",
      fa: "بیشترین استفاده"
    },
    extensions: {
      tr: "Tarayıcı uzantıları",
      en: "Browser extensions",
      ar: "إضافات المتصفح",
      ru: "Расширения браузера",
      zh: "浏览器扩展",
      ja: "ブラウザ拡張",
      ko: "브라우저 확장",
      el: "Επεκτάσεις browser",
      da: "Browserudvidelser",
      fa: "افزونه‌های مرورگر"
    },
    apps: {
      tr: "Uygulamalar",
      en: "Apps",
      ar: "تطبيقات",
      ru: "Приложения",
      zh: "应用",
      ja: "アプリ",
      ko: "앱",
      el: "Εφαρμογές",
      da: "Apps",
      fa: "اپ‌ها"
    }
  };

  return labels[key][locale];
}

function sortBaseTools(tools: HomeToolCard[]) {
  return [...tools].sort((left, right) => {
    const ratingLeft = Number.parseFloat(left.rating);
    const ratingRight = Number.parseFloat(right.rating);

    if (ratingLeft !== ratingRight) {
      return ratingRight - ratingLeft;
    }

    return left.name.localeCompare(right.name);
  });
}

function getToolSlug(tool: HomeToolCard) {
  return tool.href.split("/").pop() ?? tool.name.toLowerCase().replace(/\s+/g, "-");
}

export function LiveToolFeed({ locale, tools, openLabel }: LiveToolFeedProps) {
  const [activeTab, setActiveTab] = useState<FeedTabKey>("today");
  const sortedTools = useMemo(() => sortBaseTools(tools), [tools]);
  const browserExtensionSlugs = useMemo(
    () =>
      new Set([
        "chatgpt",
        "claude",
        "gemini",
        "perplexity",
        "notion-ai",
        "microsoft-copilot",
        "grammarly",
        "cursor",
        "v0",
        "fathom-ai",
        "tldv",
        "bardeen",
        "lindy",
        "mistral-ai",
        "hubspot-ai"
      ]),
    []
  );

  const feedTabs = useMemo(() => {
    const todayCount = sortedTools.slice(0, 10).length;
    const newCount = sortedTools.slice(-10).length;
    const savedCount = sortedTools.filter((tool) => Number.parseFloat(tool.rating) >= 4.6).length;
    const usedCount = sortedTools.filter((tool) => tool.useCaseTags.length >= 2).length;
    const extensionCount = sortedTools.filter((tool) => browserExtensionSlugs.has(getToolSlug(tool))).length;
    const appCount = sortedTools.length - extensionCount;

    return [
      { key: "today" as const, count: todayCount },
      { key: "new" as const, count: newCount },
      { key: "saved" as const, count: savedCount },
      { key: "used" as const, count: usedCount },
      { key: "extensions" as const, count: extensionCount },
      { key: "apps" as const, count: appCount }
    ];
  }, [browserExtensionSlugs, sortedTools]);

  const activeTools = useMemo(() => {
    switch (activeTab) {
      case "new":
        return [...tools].slice(-10).reverse();
      case "saved":
        return [...sortedTools].slice(0, 12);
      case "used":
        return [...sortedTools].filter((tool) => tool.useCaseTags.length >= 2).slice(0, 12);
      case "extensions":
        return [...sortedTools].filter((tool) => browserExtensionSlugs.has(getToolSlug(tool))).slice(0, 12);
      case "apps":
        return [...sortedTools].filter((tool) => !browserExtensionSlugs.has(getToolSlug(tool))).slice(0, 12);
      case "today":
      default:
        return [...sortedTools].slice(0, 12);
    }
  }, [activeTab, browserExtensionSlugs, sortedTools, tools]);

  return (
    <div className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,253,0.99))] p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
            {locale === "tr" ? "Canlı araç akışı" : "Live tool feed"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {locale === "tr"
              ? "Logo, fiyat sinyali ve kısa özetle araçları hızlıca tara."
              : "Scan tools quickly with logos, pricing signals, and short summaries."}
          </p>
        </div>
        <Badge variant="ghost" className="shrink-0 text-[11px]">
          {activeTools.length}
        </Badge>
      </div>

      <div className="mt-4 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2">
          {feedTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={[
                "inline-flex min-h-[38px] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
                activeTab === tab.key
                  ? "border-sky-200 bg-sky-50 text-sky-700 shadow-[0_14px_32px_-24px_rgba(37,99,235,0.26)]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-slate-950"
              ].join(" ")}
            >
              {getTabLabel(locale, tab.key)}
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {activeTools.map((tool, index) => (
          <DiscoveryToolCard
            key={tool.href}
            locale={locale}
            tool={tool}
            ctaLabel={openLabel}
            compact={index >= 6}
            variant="row"
          />
        ))}
      </div>
    </div>
  );
}
