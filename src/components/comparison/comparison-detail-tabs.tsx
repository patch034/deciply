"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";

import { PremiumButton } from "@/components/ui/premium-button";
import type { Locale } from "@/i18n/config";
import type { LocalizedTool } from "@/types/catalog";

type ComparisonWinnerCard = {
  label: string;
  winner: string;
  note: string;
};

type ComparisonDetailTabsProps = {
  locale: Locale;
  leftTool: LocalizedTool;
  rightTool: LocalizedTool;
  leftOpenHref: string;
  rightOpenHref: string;
  leftReviewHref: string;
  rightReviewHref: string;
  editorialHref: string;
  winnerCards: ComparisonWinnerCard[];
  className?: string;
};

type TabKey = "overview" | "pricing" | "useCases" | "strengths" | "weaknesses" | "verdict";

type RowItem = {
  label: string;
  left: string;
  right: string;
};

function formatTier(locale: Locale, value: boolean) {
  return locale === "tr" ? (value ? "Var" : "Yok") : value ? "Yes" : "No";
}

function buildOverallScore(tool: LocalizedTool) {
  const profile = tool.compareProfile;
  const avg =
    (profile.speedScore + profile.easeOfUseScore + profile.outputQualityScore + profile.studentScore + profile.businessScore + profile.creatorScore + profile.valueScore) /
    7;
  return avg.toFixed(1);
}

function getTabLabel(locale: Locale, tab: TabKey) {
  const labels: Record<Locale, Record<TabKey, string>> = {
    tr: {
      overview: "Genel Bakış",
      pricing: "Fiyat",
      useCases: "Kullanım Alanları",
      strengths: "Güçlü Yönler",
      weaknesses: "Zayıf Yönler",
      verdict: "Sonuç"
    },
    en: {
      overview: "Overview",
      pricing: "Pricing",
      useCases: "Use Cases",
      strengths: "Strengths",
      weaknesses: "Weaknesses",
      verdict: "Verdict"
    }
  };

  return labels[locale][tab];
}

function buildRows(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool) {
  const pricingModelLabel = locale === "tr" ? "Fiyat modeli" : "Pricing model";
  const freeTierLabel = locale === "tr" ? "Ücretsiz başlangıç" : "Free tier";
  const useCaseLabel = locale === "tr" ? "En uygun kullanım" : "Best use case";
  const audienceLabel = locale === "tr" ? "Kimler için" : "Who should use it";
  const realUseLabel = locale === "tr" ? "Gerçek kullanım" : "Real use case";
  const strengthsLabel = locale === "tr" ? "Öne çıkanlar" : "Strong points";
  const weaknessesLabel = locale === "tr" ? "Dikkat edilmesi gerekenler" : "Watch outs";

  return {
    overview: [
      { label: useCaseLabel, left: leftTool.bestUseCase, right: rightTool.bestUseCase },
      { label: audienceLabel, left: leftTool.whoShouldUseSummary, right: rightTool.whoShouldUseSummary },
      { label: realUseLabel, left: leftTool.realUseCaseExample.title, right: rightTool.realUseCaseExample.title }
    ] satisfies RowItem[],
    pricing: [
      { label: pricingModelLabel, left: leftTool.compareProfile.pricingModel, right: rightTool.compareProfile.pricingModel },
      { label: freeTierLabel, left: formatTier(locale, leftTool.compareProfile.freeTier), right: formatTier(locale, rightTool.compareProfile.freeTier) },
      {
        label: locale === "tr" ? "Ticari uyum" : "Business fit",
        left: `${leftTool.compareProfile.businessScore.toFixed(1)}/10`,
        right: `${rightTool.compareProfile.businessScore.toFixed(1)}/10`
      }
    ] satisfies RowItem[],
    useCases: [
      { label: realUseLabel, left: leftTool.realUseCaseExample.description, right: rightTool.realUseCaseExample.description },
      { label: locale === "tr" ? "Nerede iyi çalışır?" : "Where it works best", left: leftTool.bestUseCase, right: rightTool.bestUseCase },
      { label: locale === "tr" ? "İlk adım" : "First step", left: leftTool.whoShouldUse[0] ?? leftTool.bestUseCase, right: rightTool.whoShouldUse[0] ?? rightTool.bestUseCase }
    ] satisfies RowItem[],
    strengths: [
      { label: strengthsLabel, left: leftTool.compareProfile.strengths.slice(0, 3).join(" · "), right: rightTool.compareProfile.strengths.slice(0, 3).join(" · ") },
      { label: locale === "tr" ? "Artılar" : "Pros", left: leftTool.pros.slice(0, 3).join(" · "), right: rightTool.pros.slice(0, 3).join(" · ") },
      { label: locale === "tr" ? "Hız sinyali" : "Speed signal", left: `${leftTool.compareProfile.speedScore.toFixed(1)}/10`, right: `${rightTool.compareProfile.speedScore.toFixed(1)}/10` }
    ] satisfies RowItem[],
    weaknesses: [
      { label: weaknessesLabel, left: leftTool.compareProfile.weaknesses.slice(0, 3).join(" · "), right: rightTool.compareProfile.weaknesses.slice(0, 3).join(" · ") },
      { label: locale === "tr" ? "Eksiler" : "Cons", left: leftTool.cons.slice(0, 3).join(" · "), right: rightTool.cons.slice(0, 3).join(" · ") },
      { label: locale === "tr" ? "Kolay kullanım" : "Ease signal", left: `${leftTool.compareProfile.easeOfUseScore.toFixed(1)}/10`, right: `${rightTool.compareProfile.easeOfUseScore.toFixed(1)}/10` }
    ] satisfies RowItem[],
    verdict: [
      { label: locale === "tr" ? "Hangi akış için" : "Which workflow", left: leftTool.bestUseCase, right: rightTool.bestUseCase },
      { label: locale === "tr" ? "Değer sinyali" : "Value signal", left: `${leftTool.compareProfile.valueScore.toFixed(1)}/10`, right: `${rightTool.compareProfile.valueScore.toFixed(1)}/10` },
      { label: locale === "tr" ? "Son karar" : "Final call", left: leftTool.whoShouldUseSummary, right: rightTool.whoShouldUseSummary }
    ] satisfies RowItem[]
  };
}

function renderRow(locale: Locale, row: RowItem, leftTool: LocalizedTool, rightTool: LocalizedTool) {
  return (
    <div key={row.label} className="grid gap-3 border-t border-sky-400/10 px-4 py-4 first:border-t-0 md:grid-cols-[1.05fr_auto_1.05fr] md:items-start md:px-5 md:py-5">
      <div className="flex items-start gap-2.5">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/18 bg-cyan-400/10 text-[10px] font-bold text-cyan-100">
          {leftTool.name.slice(0, 2).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">{leftTool.name}</p>
          <p className="mt-1 text-sm leading-6 text-slate-200">{row.left}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:pt-1.5">
        <span className="inline-flex h-8 items-center rounded-full border border-sky-400/12 bg-slate-950/55 px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          {locale === "tr" ? row.label : row.label}
        </span>
      </div>
      <div className="flex items-start gap-2.5 md:justify-end md:text-right">
        <div className="min-w-0 md:order-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">{rightTool.name}</p>
          <p className="mt-1 text-sm leading-6 text-slate-200">{row.right}</p>
        </div>
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-400/18 bg-sky-400/10 text-[10px] font-bold text-sky-100 md:order-1">
          {rightTool.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
    </div>
  );
}

export function ComparisonDetailTabs({
  locale,
  leftTool,
  rightTool,
  leftOpenHref,
  rightOpenHref,
  leftReviewHref,
  rightReviewHref,
  editorialHref,
  winnerCards,
  className
}: ComparisonDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const rows = useMemo(() => buildRows(locale, leftTool, rightTool), [locale, leftTool, rightTool]);
  const tabs = useMemo(() => ["overview", "pricing", "useCases", "strengths", "weaknesses", "verdict"] as TabKey[], []);
  const activeRows = rows[activeTab];
  const overallLeft = buildOverallScore(leftTool);
  const overallRight = buildOverallScore(rightTool);

  return (
    <section className={clsx("rounded-[34px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(8,12,22,0.98),rgba(12,18,32,0.97))] p-4 shadow-[0_28px_96px_-48px_rgba(14,165,233,0.18)] sm:p-5 md:p-6", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-sky-400/10 pb-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{locale === "tr" ? "Karar paneli" : "Decision panel"}</p>
          <h2 className="mt-2 text-[1.4rem] font-semibold tracking-tight text-slate-50 sm:text-[1.7rem] md:text-[2rem]">
            {locale === "tr" ? "Kısa karar ver, detayları sekmelerle aç" : "Make a quick call, then inspect details in tabs"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            {locale === "tr"
              ? "Tek tek kutular yerine tek bir premium panel içinde karşılaştırmayı oku. Üstte hızlı sinyaller, altta sekmeli detaylar ve sabit karar CTA’sı var."
              : "Read the comparison inside a single premium panel. Fast signals live above, tabbed details below, and a sticky decision CTA stays at the bottom."}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_auto_1.05fr] lg:items-center">
        <div className="flex flex-col gap-3 rounded-[28px] border border-sky-400/10 bg-slate-950/55 p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/18 bg-cyan-400/10 text-sm font-bold text-cyan-100">
              {leftTool.name.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{leftTool.name}</p>
              <p className="mt-1 text-sm text-slate-400">{leftTool.bestUseCase}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold text-cyan-100">{overallLeft}/10</span>
            <span className="inline-flex items-center rounded-full border border-sky-400/12 bg-slate-950/55 px-3 py-1.5 text-sm font-semibold text-slate-100">{leftTool.rating.toFixed(1)}/5</span>
            <span className="inline-flex items-center rounded-full border border-sky-400/12 bg-slate-950/55 px-3 py-1.5 text-sm font-semibold text-slate-300">{leftTool.compareProfile.category}</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative inline-flex min-h-[76px] min-w-[76px] items-center justify-center rounded-full border border-cyan-400/16 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.3),rgba(59,130,246,0.12),rgba(15,23,42,0.1))] px-5 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_0_48px_rgba(14,165,233,0.18)]">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">VS</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-[28px] border border-sky-400/10 bg-slate-950/55 p-4 text-left lg:text-right">
          <div className="flex items-center gap-3 lg:justify-end">
            <div className="min-w-0 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{rightTool.name}</p>
              <p className="mt-1 text-sm text-slate-400">{rightTool.bestUseCase}</p>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/18 bg-sky-400/10 text-sm font-bold text-sky-100 lg:order-1">
              {rightTool.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <span className="inline-flex items-center rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold text-cyan-100">{overallRight}/10</span>
            <span className="inline-flex items-center rounded-full border border-sky-400/12 bg-slate-950/55 px-3 py-1.5 text-sm font-semibold text-slate-100">{rightTool.rating.toFixed(1)}/5</span>
            <span className="inline-flex items-center rounded-full border border-sky-400/12 bg-slate-950/55 px-3 py-1.5 text-sm font-semibold text-slate-300">{rightTool.compareProfile.category}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5 border-b border-sky-400/10 pb-4">
        {tabs.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "inline-flex min-h-[42px] items-center rounded-full border px-4 text-sm font-semibold transition",
                active
                  ? "border-cyan-400/25 bg-cyan-400/12 text-cyan-100 shadow-[0_14px_34px_-18px_rgba(34,211,238,0.35)]"
                  : "border-sky-400/10 bg-slate-950/45 text-slate-300 hover:border-cyan-400/18 hover:text-slate-100"
              )}
            >
              {getTabLabel(locale, tab)}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[30px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(8,12,22,0.88),rgba(10,16,30,0.92))] shadow-[0_20px_64px_-40px_rgba(14,165,233,0.14)]">
        <div className="divide-y divide-sky-400/10">
          {activeRows.map((row) => renderRow(locale, row, leftTool, rightTool))}
        </div>
      </div>

      <div className="mt-6 sticky bottom-3 z-20 rounded-[28px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(10,16,30,0.98),rgba(15,23,42,0.96))] p-3 shadow-[0_18px_60px_-34px_rgba(14,165,233,0.18)] sm:p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <PremiumButton href={leftOpenHref} target="_blank" rel="noopener noreferrer" className="w-full" variant="primary">
            {locale === "tr" ? `${leftTool.name} kullan` : `Use ${leftTool.name}`}
          </PremiumButton>
          <PremiumButton href={rightOpenHref} target="_blank" rel="noopener noreferrer" className="w-full" variant="primary">
            {locale === "tr" ? `${rightTool.name} kullan` : `Use ${rightTool.name}`}
          </PremiumButton>
          <PremiumButton href={editorialHref} className="w-full" variant="secondary">
            {locale === "tr" ? "Editoryal inceleme" : "Read editorial review"}
          </PremiumButton>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>{locale === "tr" ? "Mobilde alt panel sabit kalır." : "The bottom panel stays sticky on mobile."}</span>
          <span>{leftTool.name} vs {rightTool.name}</span>
        </div>
      </div>
    </section>
  );
}
