"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Locale, SupportedLocale } from "@/i18n/config";
import type { HomeSearchGroup, HomeSearchItem } from "@/lib/home-search";
import { getPopularHomeSearchItems } from "@/lib/home-search";

type SearchCopy = {
  placeholder: string;
  submit: string;
  emptyHint: string;
  noResults: string;
  popularSearches: string;
  groups: Record<HomeSearchGroup, string>;
};

type GlobalSmartSearchProps = {
  locale: SupportedLocale;
  items: HomeSearchItem[];
};

const DESKTOP_RESULT_LIMIT = 12;
const GROUP_LIMIT = 3;

const searchCopy: Record<Locale, SearchCopy> = {
  tr: {
    placeholder: "Araç, kategori, karşılaştırma veya rehber ara…",
    submit: "Ara",
    emptyHint: "Aramak için yazmaya başla",
    noResults: "Bu içerik henüz Deciply'de yok. Yakında eklenebilir.",
    popularSearches: "Popüler aramalar",
    groups: {
      tools: "Araçlar",
      categories: "Kategoriler",
      comparisons: "Karşılaştırmalar",
      blog: "Blog",
      news: "AI Haberleri"
    }
  },
  en: {
    placeholder: "Search tools, categories, comparisons, or guides…",
    submit: "Search",
    emptyHint: "Start typing to search",
    noResults: "This item is not available on Deciply yet. It may be added soon.",
    popularSearches: "Popular searches",
    groups: {
      tools: "Tools",
      categories: "Categories",
      comparisons: "Comparisons",
      blog: "Blog",
      news: "AI News"
    }
  },
  ar: {
    placeholder: "ابحث عن أداة أو فئة أو مقارنة أو دليل…",
    submit: "بحث",
    emptyHint: "ابدأ الكتابة للبحث",
    noResults: "هذا المحتوى غير متوفر على Deciply بعد. قد تتم إضافته قريبًا.",
    popularSearches: "عمليات بحث شائعة",
    groups: {
      tools: "الأدوات",
      categories: "الفئات",
      comparisons: "المقارنات",
      blog: "المدونة",
      news: "أخبار AI"
    }
  },
  ru: {
    placeholder: "Ищите инструмент, категорию, сравнение или гайд…",
    submit: "Найти",
    emptyHint: "Начните вводить запрос",
    noResults: "Этого материала пока нет на Deciply. Он может появиться позже.",
    popularSearches: "Популярные запросы",
    groups: {
      tools: "Инструменты",
      categories: "Категории",
      comparisons: "Сравнения",
      blog: "Блог",
      news: "Новости AI"
    }
  },
  zh: {
    placeholder: "搜索工具、分类、对比或指南…",
    submit: "搜索",
    emptyHint: "开始输入以搜索",
    noResults: "Deciply 暂时还没有这个内容，之后可能会补充。",
    popularSearches: "热门搜索",
    groups: {
      tools: "工具",
      categories: "分类",
      comparisons: "对比",
      blog: "博客",
      news: "AI 新闻"
    }
  },
  ja: {
    placeholder: "ツール、カテゴリ、比較、ガイドを検索…",
    submit: "検索",
    emptyHint: "入力して検索を開始",
    noResults: "この内容はまだ Deciply にありません。今後追加される可能性があります。",
    popularSearches: "人気の検索",
    groups: {
      tools: "ツール",
      categories: "カテゴリ",
      comparisons: "比較",
      blog: "ブログ",
      news: "AIニュース"
    }
  },
  ko: {
    placeholder: "도구, 카테고리, 비교 또는 가이드를 검색하세요…",
    submit: "검색",
    emptyHint: "검색하려면 입력을 시작하세요",
    noResults: "이 콘텐츠는 아직 Deciply에 없습니다. 곧 추가될 수 있습니다.",
    popularSearches: "인기 검색어",
    groups: {
      tools: "도구",
      categories: "카테고리",
      comparisons: "비교",
      blog: "블로그",
      news: "AI 뉴스"
    }
  },
  el: {
    placeholder: "Αναζήτησε εργαλεία, κατηγορίες, συγκρίσεις ή οδηγούς…",
    submit: "Αναζήτηση",
    emptyHint: "Ξεκίνα να πληκτρολογείς για αναζήτηση",
    noResults: "Αυτό το περιεχόμενο δεν υπάρχει ακόμη στο Deciply. Μπορεί να προστεθεί σύντομα.",
    popularSearches: "Δημοφιλείς αναζητήσεις",
    groups: {
      tools: "Εργαλεία",
      categories: "Κατηγορίες",
      comparisons: "Συγκρίσεις",
      blog: "Blog",
      news: "AI News"
    }
  },
  da: {
    placeholder: "Søg efter værktøjer, kategorier, sammenligninger eller guides…",
    submit: "Søg",
    emptyHint: "Begynd at skrive for at søge",
    noResults: "Dette indhold findes ikke på Deciply endnu. Det kan blive tilføjet snart.",
    popularSearches: "Populære søgninger",
    groups: {
      tools: "Værktøjer",
      categories: "Kategorier",
      comparisons: "Sammenligninger",
      blog: "Blog",
      news: "AI-nyheder"
    }
  },
  fa: {
    placeholder: "ابزار، دسته، مقایسه یا راهنما را جستجو کنید…",
    submit: "جستجو",
    emptyHint: "برای جستجو شروع به تایپ کنید",
    noResults: "این محتوا هنوز در Deciply موجود نیست و ممکن است بعداً اضافه شود.",
    popularSearches: "جستجوهای محبوب",
    groups: {
      tools: "ابزارها",
      categories: "دسته‌ها",
      comparisons: "مقایسه‌ها",
      blog: "وبلاگ",
      news: "اخبار AI"
    }
  }
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15 15 4.5 4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function scoreItem(item: HomeSearchItem, query: string) {
  const normalizedTitle = normalizeSearchText(item.title);
  const normalizedSubtitle = normalizeSearchText(item.subtitle ?? "");

  if (normalizedTitle === query) {
    return 140;
  }

  if (normalizedTitle.startsWith(query)) {
    return 120;
  }

  if (normalizedTitle.includes(query)) {
    return 100;
  }

  if (normalizedSubtitle.startsWith(query)) {
    return 74;
  }

  if (normalizedSubtitle.includes(query)) {
    return 64;
  }

  if (item.searchText.includes(query)) {
    return 42;
  }

  return 0;
}

export function GlobalSmartSearch({ locale, items }: GlobalSmartSearchProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const copy = searchCopy[locale];
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedHref, setHighlightedHref] = useState<string | null>(null);

  const popularItems = useMemo(() => getPopularHomeSearchItems(locale, items), [items, locale]);
  const normalizedQuery = normalizeSearchText(query);

  const resultGroups = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    const scored = items
      .map((item) => ({ item, score: scoreItem(item, normalizedQuery) }))
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score);

    const groupedOrder: HomeSearchGroup[] = ["tools", "categories", "comparisons", "blog", "news"];
    const grouped = groupedOrder
      .map((group) => {
        const groupItems = scored
          .filter((entry) => entry.item.group === group)
          .slice(0, GROUP_LIMIT)
          .map((entry) => entry.item);

        return { group, items: groupItems };
      })
      .filter((entry) => entry.items.length > 0);

    let currentCount = 0;

    return grouped.map((entry) => {
      const remaining = Math.max(DESKTOP_RESULT_LIMIT - currentCount, 0);
      const slicedItems = entry.items.slice(0, remaining);
      currentCount += slicedItems.length;
      return { ...entry, items: slicedItems };
    }).filter((entry) => entry.items.length > 0);
  }, [items, normalizedQuery]);

  const flatResults = useMemo(() => resultGroups.flatMap((group) => group.items), [resultGroups]);

  useEffect(() => {
    if (!flatResults.length) {
      setHighlightedHref(null);
      return;
    }

    setHighlightedHref((current) =>
      current && flatResults.some((item) => item.href === current) ? current : flatResults[0]?.href ?? null
    );
  }, [flatResults]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const firstResult = highlightedHref
      ? flatResults.find((item) => item.href === highlightedHref)
      : flatResults[0];

    if (firstResult) {
      navigate(firstResult.href);
      return;
    }

    const trimmedQuery = query.trim();
    const fallbackHref = trimmedQuery ? `/${locale}/tools?q=${encodeURIComponent(trimmedQuery)}` : `/${locale}/tools`;
    navigate(fallbackHref);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!flatResults.length) {
      return;
    }

    const currentIndex = flatResults.findIndex((item) => item.href === highlightedHref);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % flatResults.length : 0;
      setHighlightedHref(flatResults[nextIndex]?.href ?? null);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = currentIndex >= 0 ? (currentIndex - 1 + flatResults.length) % flatResults.length : flatResults.length - 1;
      setHighlightedHref(flatResults[nextIndex]?.href ?? null);
    }
  };

  return (
    <div ref={wrapperRef} className="relative mt-7 w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="w-full">
        <label className="sr-only" htmlFor="homepage-search">
          {copy.placeholder}
        </label>
        <div className="flex min-h-[72px] items-center gap-3 rounded-[28px] border border-slate-200 bg-white/96 p-2.5 text-left shadow-[0_20px_52px_rgba(15,23,42,0.11)] ring-1 ring-white/70 transition focus-within:border-sky-300 focus-within:ring-sky-100">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 text-slate-400">
            <SearchIcon />
          </div>
          <input
            ref={inputRef}
            id="homepage-search"
            name="q"
            type="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder={copy.placeholder}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            className="h-14 flex-1 border-0 bg-transparent px-0 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-[20px] bg-[linear-gradient(90deg,#0e2450_0%,#2563eb_44%,#5b4bff_100%)] px-5 text-sm font-semibold text-white shadow-[0_22px_48px_-28px_rgba(37,99,235,0.5)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_28px_58px_-26px_rgba(37,99,235,0.58)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
          >
            {copy.submit}
          </button>
        </div>
      </form>

      {open ? (
        <div className="absolute inset-x-0 top-[calc(100%+0.8rem)] z-30 overflow-hidden rounded-[26px] border border-slate-200 bg-white/98 shadow-[0_26px_80px_-34px_rgba(15,23,42,0.24)] backdrop-blur-xl">
          {!normalizedQuery ? (
            <div className="space-y-4 p-4 sm:p-5">
              <p className="text-sm font-semibold text-slate-500">{copy.emptyHint}</p>
              {popularItems.length ? (
                <div>
                  <p className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">{copy.popularSearches}</p>
                  <div className="flex flex-wrap gap-2">
                    {popularItems.map((item) => (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => navigate(item.href)}
                        className="inline-flex min-h-[36px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : flatResults.length ? (
            <div className="max-h-[28rem] overflow-y-auto py-2">
              {resultGroups.map((group) => (
                <div key={group.group} className="border-b border-slate-100 px-2 py-2 last:border-b-0">
                  <p className="px-3 pb-2 text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">
                    {copy.groups[group.group]}
                  </p>
                  <div className="grid gap-1">
                    {group.items.map((item) => {
                      const active = item.href === highlightedHref;

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          onMouseEnter={() => setHighlightedHref(item.href)}
                          className={[
                            "rounded-[18px] border px-3 py-3 transition",
                            active
                              ? "border-sky-200 bg-sky-50/80 shadow-[0_10px_26px_-24px_rgba(37,99,235,0.4)]"
                              : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="clamp-1 text-sm font-bold text-slate-950">{item.title}</p>
                              {item.subtitle ? (
                                <p className="clamp-1 mt-1 text-xs leading-5 text-slate-500">{item.subtitle}</p>
                              ) : null}
                            </div>
                            <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500">
                              {copy.groups[item.group]}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 sm:p-5">
              <p className="text-sm font-medium text-slate-500">{copy.noResults}</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
