"use client";

import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";
import { buildAutoComparisonPath } from "@/lib/comparisons";
import type { Locale } from "@/i18n/config";
import type { LocalizedTool } from "@/types/catalog";

type CompareToolOption = Pick<LocalizedTool, "slug" | "name" | "bestUseCase" | "pricing" | "compareProfile">;

type AutoCompareWorkspaceProps = {
  locale: Locale;
  tools: CompareToolOption[];
  initialLeftSlug?: string;
  initialRightSlug?: string;
  compact?: boolean;
};

const copy = {
  tr: {
    leftLabel: "Araç A",
    rightLabel: "Araç B",
    selectorHint: "Herhangi iki aracı seçin ve anında karşılaştırın.",
    compareCta: "Şimdi karşılaştır",
    openLabel: "Karşılaştırmayı aç",
    emptyTitle: "Karşılaştırmak için iki araç seçin",
    emptyDescription: "Seçim yaptığınız anda fiyat, kullanım alanı ve kalite farkları aşağıda görünür.",
    compactTitle: "Hızlı karşılaştırma",
    compactDescription: "Seçtiğiniz iki araç için özet karşılaştırma görünümü.",
    fullTitle: "Tam otomatik karşılaştırma",
    fullDescription: "Aynı katalog verisiyle fiyat, kullanım alanı, hız ve kaliteyi tek panelde görün.",
    pricingModel: "Fiyat modeli",
    freeTier: "Ücretsiz başlangıç",
    bestUseCase: "En iyi kullanım",
    strengths: "Güçlü yönler",
    weaknesses: "Zayıf yönler",
    speed: "Hız",
    ease: "Kullanım kolaylığı",
    quality: "Çıktı kalitesi",
    students: "Öğrenci",
    creators: "Creator",
    business: "İş",
    value: "Değer",
    category: "Kategori",
    yes: "Evet",
    no: "Hayır"
  },
  en: {
    leftLabel: "Tool A",
    rightLabel: "Tool B",
    selectorHint: "Pick any two tools and compare them instantly.",
    compareCta: "Compare now",
    openLabel: "Open comparison",
    emptyTitle: "Choose two tools to compare",
    emptyDescription: "As soon as you pick them, pricing, workflow fit, and quality differences show up below.",
    compactTitle: "Quick compare",
    compactDescription: "A compact overview for the pair you selected.",
    fullTitle: "Auto compare workspace",
    fullDescription: "Use the same catalog data to review pricing, fit, speed, and output in one panel.",
    pricingModel: "Pricing model",
    freeTier: "Free tier",
    bestUseCase: "Best use case",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    speed: "Speed",
    ease: "Ease of use",
    quality: "Output quality",
    students: "Students",
    creators: "Creators",
    business: "Business",
    value: "Value",
    category: "Category",
    yes: "Yes",
    no: "No"
  }
} as const;

function compareLocaleSort(locale: Locale, left: CompareToolOption, right: CompareToolOption) {
  return left.name.localeCompare(right.name, locale === "tr" ? "tr-TR" : "en-US");
}

function renderValue(value: string | string[] | number | boolean, locale: Locale) {
  const labels = copy[locale];

  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-2">
        {value.slice(0, 4).map((item) => (
          <Badge key={item} variant="muted" className="max-w-full justify-center text-[11px]">
            {item}
          </Badge>
        ))}
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <span className="inline-flex items-center rounded-full border border-sky-400/14 bg-slate-950/65 px-3 py-1 text-xs font-semibold text-slate-100">
        {value.toFixed(0)}/10
      </span>
    );
  }

  if (typeof value === "boolean") {
    return (
      <span
        role="img"
        aria-label={value ? labels.yes : labels.no}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-400/14 bg-slate-950/55 text-xs font-bold text-slate-100"
      >
        {value ? "✓" : "✕"}
      </span>
    );
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === labels.yes.toLowerCase()) {
      return (
        <span role="img" aria-label={labels.yes} className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-400/14 bg-slate-950/55 text-xs font-bold text-slate-100">
          ✓
        </span>
      );
    }
    if (normalized === labels.no.toLowerCase()) {
      return (
        <span role="img" aria-label={labels.no} className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-400/14 bg-slate-950/55 text-xs font-bold text-slate-100">
          ✕
        </span>
      );
    }
    if (normalized === "-" || normalized === "—" || normalized === "n/a" || normalized === "na") {
      return (
        <span role="img" aria-label={locale === "tr" ? "Uygun değil" : "Not available"} className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-400/14 bg-slate-950/55 text-xs font-bold text-slate-100">
          —
        </span>
      );
    }
  }

  return <p className="text-sm leading-6 text-slate-200">{value}</p>;
}

export function AutoCompareWorkspace({ locale, tools, initialLeftSlug, initialRightSlug, compact = false }: AutoCompareWorkspaceProps) {
  const labels = copy[locale];
  const orderedTools = useMemo(() => [...tools].sort((left, right) => compareLocaleSort(locale, left, right)), [locale, tools]);

  const initialLeft = initialLeftSlug && orderedTools.some((tool) => tool.slug === initialLeftSlug) ? initialLeftSlug : orderedTools[0]?.slug ?? "";
  const initialRightCandidate =
    initialRightSlug && orderedTools.some((tool) => tool.slug === initialRightSlug) && initialRightSlug !== initialLeft
      ? initialRightSlug
      : orderedTools.find((tool) => tool.slug !== initialLeft)?.slug ?? initialLeft;

  const [leftSlug, setLeftSlug] = useState(initialLeft);
  const [rightSlug, setRightSlug] = useState(initialRightCandidate);

  useEffect(() => {
    setLeftSlug(initialLeft);
    setRightSlug(initialRightCandidate);
  }, [initialLeft, initialRightCandidate]);

  const leftTool = orderedTools.find((tool) => tool.slug === leftSlug) ?? orderedTools[0] ?? null;
  const rightTool = orderedTools.find((tool) => tool.slug === rightSlug) ?? orderedTools[1] ?? orderedTools[0] ?? null;
  const canCompare = Boolean(leftTool && rightTool && leftTool.slug !== rightTool.slug);
  const comparisonHref = canCompare ? buildAutoComparisonPath(locale, leftTool!.slug, rightTool!.slug) : null;

  const rows = useMemo(
    () =>
      leftTool && rightTool
        ? [
            { label: labels.pricingModel, left: leftTool.compareProfile.pricingModel, right: rightTool.compareProfile.pricingModel },
            { label: labels.freeTier, left: leftTool.compareProfile.freeTier, right: rightTool.compareProfile.freeTier },
            { label: labels.bestUseCase, left: leftTool.bestUseCase, right: rightTool.bestUseCase },
            { label: labels.category, left: leftTool.compareProfile.category, right: rightTool.compareProfile.category },
            { label: labels.strengths, left: leftTool.compareProfile.strengths, right: rightTool.compareProfile.strengths },
            { label: labels.weaknesses, left: leftTool.compareProfile.weaknesses, right: rightTool.compareProfile.weaknesses },
            { label: labels.speed, left: leftTool.compareProfile.speedScore, right: rightTool.compareProfile.speedScore },
            { label: labels.ease, left: leftTool.compareProfile.easeOfUseScore, right: rightTool.compareProfile.easeOfUseScore },
            { label: labels.quality, left: leftTool.compareProfile.outputQualityScore, right: rightTool.compareProfile.outputQualityScore },
            { label: labels.students, left: leftTool.compareProfile.studentScore, right: rightTool.compareProfile.studentScore },
            { label: labels.creators, left: leftTool.compareProfile.creatorScore, right: rightTool.compareProfile.creatorScore },
            { label: labels.business, left: leftTool.compareProfile.businessScore, right: rightTool.compareProfile.businessScore },
            { label: labels.value, left: leftTool.compareProfile.valueScore, right: rightTool.compareProfile.valueScore }
          ]
        : [],
    [labels, leftTool, rightTool]
  );

  const visibleRows = compact ? rows.slice(0, 4) : rows;
  const safeLeftSlug = leftTool?.slug ?? leftSlug;
  const safeRightSlug = rightTool?.slug ?? rightSlug;

  return (
    <GlassPanel className="overflow-hidden rounded-[32px] border-sky-400/12 bg-[linear-gradient(180deg,rgba(6,10,18,0.96),rgba(8,12,22,0.98))] p-4 shadow-[0_30px_100px_-58px_rgba(14,165,233,0.24)] sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{compact ? labels.compactTitle : labels.fullTitle}</p>
          <h2 className="mt-3 text-[1.5rem] font-bold tracking-[-0.035em] text-slate-50 sm:text-[1.9rem]">
            {compact ? labels.compactTitle : labels.fullTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300/84 sm:text-[15px] sm:leading-7">
            {compact ? labels.compactDescription : labels.fullDescription}
          </p>
        </div>
        <Badge variant="accent" className="w-fit text-[11px] uppercase tracking-[0.14em]">
          {labels.selectorHint}
        </Badge>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto] lg:items-end">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{labels.leftLabel}</span>
          <select
            className="dark-select min-h-[48px] w-full rounded-2xl border border-sky-400/12 bg-slate-950/72 px-4 text-sm font-medium text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            value={safeLeftSlug}
            onChange={(event) => {
              const nextSlug = event.target.value;
              setLeftSlug(nextSlug);
              if (nextSlug === rightSlug) {
                const fallback = orderedTools.find((tool) => tool.slug !== nextSlug)?.slug ?? nextSlug;
                setRightSlug(fallback);
              }
            }}
          >
            {orderedTools.map((tool) => (
              <option key={tool.slug} value={tool.slug}>
                {tool.name} · {tool.compareProfile.pricingModel}
              </option>
            ))}
          </select>
        </label>

        <div className="hidden lg:flex lg:h-[48px] lg:items-center lg:justify-center">
          <Badge variant="dark" className="px-3 py-1.5 text-[11px] tracking-[0.18em] text-cyan-100">
            VS
          </Badge>
        </div>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{labels.rightLabel}</span>
          <select
            className="dark-select min-h-[48px] w-full rounded-2xl border border-sky-400/12 bg-slate-950/72 px-4 text-sm font-medium text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            value={safeRightSlug}
            onChange={(event) => {
              const nextSlug = event.target.value;
              setRightSlug(nextSlug);
              if (nextSlug === leftSlug) {
                const fallback = orderedTools.find((tool) => tool.slug !== nextSlug)?.slug ?? nextSlug;
                setLeftSlug(fallback);
              }
            }}
          >
            {orderedTools.map((tool) => (
              <option key={tool.slug} value={tool.slug}>
                {tool.name} · {tool.compareProfile.pricingModel}
              </option>
            ))}
          </select>
        </label>

        <div className="flex lg:justify-end">
          <PremiumButton href={comparisonHref ?? undefined} className="w-full lg:w-auto">
            {labels.compareCta}
          </PremiumButton>
        </div>
      </div>

      {leftTool && rightTool ? (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {([leftTool, rightTool] as CompareToolOption[]).map((tool) => (
              <article key={tool.slug} className="rounded-[26px] border border-sky-400/10 bg-slate-950/45 p-4 shadow-[0_18px_54px_-36px_rgba(14,165,233,0.2)] sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">{tool.compareProfile.category}</p>
                    <h3 className="mt-2 text-xl font-bold tracking-[-0.03em] text-slate-50">{tool.name}</h3>
                  </div>
                  <Badge variant="accent" className="shrink-0 text-[11px]">
                    {tool.compareProfile.pricingModel}
                  </Badge>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-300/84">{tool.bestUseCase}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.compareProfile.bestFor.slice(0, 2).map((item) => (
                    <Badge key={item} variant="muted" className="px-2 py-0.5 text-[10px]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-3">
            {visibleRows.map((row) => (
              <div
                key={row.label}
                className="rounded-[20px] border border-sky-400/10 bg-slate-950/36 px-4 py-3 sm:rounded-[22px] sm:px-5 sm:py-4 lg:grid lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-4"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 lg:pt-1">{row.label}</div>
                <div className="mt-3 space-y-3 lg:mt-0">
                  <div className="compare-slot-left flex items-start justify-between gap-3 border-t border-sky-400/10 pt-3 lg:border-t-0 lg:pt-0">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">{leftTool?.name ?? labels.leftLabel}</p>
                      {renderValue(row.left, locale)}
                    </div>
                    <span className="shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">→</span>
                  </div>
                </div>
                <div className="mt-3 space-y-3 lg:mt-0">
                  <div className="compare-slot-right flex items-start justify-between gap-3 border-t border-sky-400/10 pt-3 lg:border-t-0 lg:pt-0">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200">{rightTool?.name ?? labels.rightLabel}</p>
                      {renderValue(row.right, locale)}
                    </div>
                    <span className="shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!compact ? (
            <div className="flex flex-col gap-3 rounded-[24px] border border-sky-400/10 bg-cyan-400/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <p className="text-sm leading-7 text-slate-200/88">{labels.selectorHint}</p>
              <PremiumButton href={comparisonHref ?? undefined} className="w-full sm:w-auto">
                {labels.openLabel}
              </PremiumButton>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-6 rounded-[24px] border border-sky-400/10 bg-slate-950/42 p-5 text-sm leading-7 text-slate-300 sm:p-6">
          <p className="text-base font-semibold text-slate-50">{labels.emptyTitle}</p>
          <p className="mt-2 text-slate-300/84">{labels.emptyDescription}</p>
        </div>
      )}
    </GlassPanel>
  );
}
