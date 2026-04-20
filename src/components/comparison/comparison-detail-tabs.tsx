"use client";

import clsx from "clsx";
import Image from "next/image";
import { useMemo, useState } from "react";

import { PremiumButton } from "@/components/ui/premium-button";
import type { Locale } from "@/i18n/config";
import { getToolLogoUrl } from "@/lib/logo";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import type { LocalizedTool } from "@/types/catalog";

type ComparisonDetailTabsProps = {
  locale: Locale;
  leftTool: LocalizedTool;
  rightTool: LocalizedTool;
  leftOpenHref: string;
  rightOpenHref: string;
  leftReviewHref: string;
  rightReviewHref: string;
  editorialHref: string;
  className?: string;
};

type TabKey = "overview" | "pricing" | "useCases" | "strengths" | "weaknesses" | "verdict";

type RowItem = {
  label: string;
  leftTitle: string;
  rightTitle: string;
  left: string;
  right: string;
};

function formatTier(locale: Locale, value: boolean) {
  return locale === "tr" ? (value ? "Var" : "Yok") : value ? "Yes" : "No";
}

function buildOverallScore(tool: LocalizedTool) {
  const profile = tool.compareProfile;
  const avg =
    (profile.speedScore + profile.easeOfUseScore + profile.outputQualityScore + profile.studentScore + profile.businessScore + profile.creatorScore + profile.valueScore) / 7;
  return avg.toFixed(1);
}

function getTabLabel(locale: Locale, tab: TabKey) {
  const labels = {
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
  } as const;

  return localizeTree(locale, labels[getContentBaseLocale(locale)])[tab];
}

function buildRows(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool) {
  const leftName = leftTool.name;
  const rightName = rightTool.name;

  return {
    overview: [
      { label: locale === "tr" ? "En uygun kullanım" : "Best use case", leftTitle: leftName, rightTitle: rightName, left: leftTool.bestUseCase, right: rightTool.bestUseCase },
      { label: locale === "tr" ? "Kimler için" : "Who should use it", leftTitle: leftName, rightTitle: rightName, left: leftTool.whoShouldUseSummary, right: rightTool.whoShouldUseSummary },
      { label: locale === "tr" ? "Gerçek kullanım" : "Real use case", leftTitle: leftName, rightTitle: rightName, left: leftTool.realUseCaseExample.title, right: rightTool.realUseCaseExample.title }
    ] satisfies RowItem[],
    pricing: [
      { label: locale === "tr" ? "Fiyat modeli" : "Pricing model", leftTitle: leftName, rightTitle: rightName, left: leftTool.compareProfile.pricingModel, right: rightTool.compareProfile.pricingModel },
      { label: locale === "tr" ? "Ücretsiz başlangıç" : "Free tier", leftTitle: leftName, rightTitle: rightName, left: formatTier(locale, leftTool.compareProfile.freeTier), right: formatTier(locale, rightTool.compareProfile.freeTier) },
      { label: locale === "tr" ? "Ticari uyum" : "Business fit", leftTitle: leftName, rightTitle: rightName, left: `${leftTool.compareProfile.businessScore.toFixed(1)}/10`, right: `${rightTool.compareProfile.businessScore.toFixed(1)}/10` }
    ] satisfies RowItem[],
    useCases: [
      { label: locale === "tr" ? "Günlük akış" : "Daily workflow", leftTitle: leftName, rightTitle: rightName, left: leftTool.realUseCaseExample.description, right: rightTool.realUseCaseExample.description },
      { label: locale === "tr" ? "Nerede iyi çalışır?" : "Where it works best", leftTitle: leftName, rightTitle: rightName, left: leftTool.bestUseCase, right: rightTool.bestUseCase },
      { label: locale === "tr" ? "İlk adım" : "First step", leftTitle: leftName, rightTitle: rightName, left: leftTool.whoShouldUse[0] ?? leftTool.bestUseCase, right: rightTool.whoShouldUse[0] ?? rightTool.bestUseCase }
    ] satisfies RowItem[],
    strengths: [
      { label: locale === "tr" ? "Öne çıkanlar" : "Strong points", leftTitle: leftName, rightTitle: rightName, left: leftTool.compareProfile.strengths.slice(0, 3).join(" · "), right: rightTool.compareProfile.strengths.slice(0, 3).join(" · ") },
      { label: locale === "tr" ? "Artılar" : "Pros", leftTitle: leftName, rightTitle: rightName, left: leftTool.pros.slice(0, 3).join(" · "), right: rightTool.pros.slice(0, 3).join(" · ") },
      { label: locale === "tr" ? "Hız sinyali" : "Speed signal", leftTitle: leftName, rightTitle: rightName, left: `${leftTool.compareProfile.speedScore.toFixed(1)}/10`, right: `${rightTool.compareProfile.speedScore.toFixed(1)}/10` }
    ] satisfies RowItem[],
    weaknesses: [
      { label: locale === "tr" ? "Dikkat edilmesi gerekenler" : "Watch outs", leftTitle: leftName, rightTitle: rightName, left: leftTool.compareProfile.weaknesses.slice(0, 3).join(" · "), right: rightTool.compareProfile.weaknesses.slice(0, 3).join(" · ") },
      { label: locale === "tr" ? "Eksiler" : "Cons", leftTitle: leftName, rightTitle: rightName, left: leftTool.cons.slice(0, 3).join(" · "), right: rightTool.cons.slice(0, 3).join(" · ") },
      { label: locale === "tr" ? "Kolay kullanım" : "Ease signal", leftTitle: leftName, rightTitle: rightName, left: `${leftTool.compareProfile.easeOfUseScore.toFixed(1)}/10`, right: `${rightTool.compareProfile.easeOfUseScore.toFixed(1)}/10` }
    ] satisfies RowItem[],
    verdict: [
      { label: locale === "tr" ? "Hangi akış için" : "Which workflow", leftTitle: leftName, rightTitle: rightName, left: leftTool.bestUseCase, right: rightTool.bestUseCase },
      { label: locale === "tr" ? "Değer sinyali" : "Value signal", leftTitle: leftName, rightTitle: rightName, left: `${leftTool.compareProfile.valueScore.toFixed(1)}/10`, right: `${rightTool.compareProfile.valueScore.toFixed(1)}/10` },
      { label: locale === "tr" ? "Son karar" : "Final call", leftTitle: leftName, rightTitle: rightName, left: leftTool.whoShouldUseSummary, right: rightTool.whoShouldUseSummary }
    ] satisfies RowItem[]
  };
}

function renderAvatar(name: string, logoUrl?: string) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-[10px] font-bold uppercase tracking-[0.18em] text-[#0055FF] shadow-[0_12px_28px_-20px_rgba(15,23,42,0.16)]">
      {logoUrl ? (
        <Image src={logoUrl} alt={name} width={40} height={40} unoptimized className="h-full w-full object-contain p-1.5" />
      ) : (
        <span>{name.slice(0, 2).toUpperCase()}</span>
      )}
    </span>
  );
}

function Row({ row, leftTool, rightTool }: { row: RowItem; leftTool: LocalizedTool; rightTool: LocalizedTool }) {
  return (
    <article className="border-t border-slate-200 px-4 py-4 first:border-t-0 sm:px-5 sm:py-5">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.14)]">
            {row.label}
          </span>
        </div>

        <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.14)]">
          <div className="flex items-start gap-3">
            {renderAvatar(leftTool.name, getToolLogoUrl(leftTool.websiteUrl))}
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]">{row.leftTitle}</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{row.left}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.14)]">
          <div className="flex items-start gap-3">
            {renderAvatar(rightTool.name, getToolLogoUrl(rightTool.websiteUrl))}
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]">{row.rightTitle}</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{row.right}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
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
  className
}: ComparisonDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const rows = useMemo(() => buildRows(locale, leftTool, rightTool), [locale, leftTool, rightTool]);
  const tabs = useMemo(() => ["overview", "pricing", "useCases", "strengths", "weaknesses", "verdict"] as TabKey[], []);
  const activeRows = rows[activeTab];
  const overallLeft = buildOverallScore(leftTool);
  const overallRight = buildOverallScore(rightTool);

  return (
    <section className={clsx("ui-card ui-card-hover rounded-[34px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.996),rgba(247,250,255,0.988))] p-4 shadow-[0_24px_72px_-40px_rgba(15,23,42,0.16)] sm:p-5 md:p-6", className)}>
      <div className="mb-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.14)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0055FF]">{locale === "tr" ? "Karar paneli" : "Decision panel"}</p>
            <h2 className="mt-3 text-[1.8rem] font-bold tracking-[-0.035em] text-slate-950 sm:text-[2.25rem] md:text-[2.8rem] md:leading-[1.02]">
              {locale === "tr" ? "Kısa karar ver, detayları sekmelerle aç" : "Make a quick call, then inspect details in tabs"}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-7">
              {locale === "tr"
                ? "Tek tek koyu kutular yerine tek bir açık panel içinde karşılaştırmayı oku. Üstte hızlı sinyaller, altta sekmeli detaylar ve sabit karar CTA'sı var."
                : "Read the comparison inside one light premium panel. Fast signals live above, tabbed details below, and a sticky decision CTA stays at the bottom."}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[300px] lg:grid-cols-1">
            {[
              { name: leftTool.name, score: `${leftTool.rating.toFixed(1)}/5`, category: leftTool.compareProfile.category, logoUrl: getToolLogoUrl(leftTool.websiteUrl) },
              { name: rightTool.name, score: `${rightTool.rating.toFixed(1)}/5`, category: rightTool.compareProfile.category, logoUrl: getToolLogoUrl(rightTool.websiteUrl) }
            ].map((tool) => (
              <div key={tool.name} className="flex min-h-[46px] w-full items-center justify-start gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-3.5 py-2 text-left text-slate-950 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.16)]">
                {renderAvatar(tool.name, tool.logoUrl)}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-slate-950">{tool.name}</span>
                  <span className="block truncate text-[11px] font-normal uppercase tracking-[0.14em] text-slate-500">{tool.category}</span>
                </span>
                <span className="shrink-0 text-[11px] font-semibold text-[#0055FF]">{tool.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.05fr_auto_1.05fr] lg:items-stretch">
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.12)]">
          <div className="flex items-center gap-3">
            {renderAvatar(leftTool.name, getToolLogoUrl(leftTool.websiteUrl))}
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]">{leftTool.name}</p>
              <p className="mt-1 text-sm text-slate-600">{leftTool.bestUseCase}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-[#0055FF]">{overallLeft}/10</span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">{leftTool.rating.toFixed(1)}/5</span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-500">{leftTool.compareProfile.category}</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="inline-flex min-h-[72px] min-w-[72px] items-center justify-center rounded-full border border-slate-200 bg-white px-5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.16)]">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0055FF]">VS</span>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.12)] text-left lg:text-right">
          <div className="flex items-center gap-3 lg:justify-end">
            <div className="min-w-0 lg:order-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]">{rightTool.name}</p>
              <p className="mt-1 text-sm text-slate-600">{rightTool.bestUseCase}</p>
            </div>
            {renderAvatar(rightTool.name, getToolLogoUrl(rightTool.websiteUrl))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 lg:justify-end">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-[#0055FF]">{overallRight}/10</span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">{rightTool.rating.toFixed(1)}/5</span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-500">{rightTool.compareProfile.category}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5 border-b border-slate-200 pb-4">
        {tabs.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "inline-flex min-h-[40px] items-center rounded-full border px-4 text-sm font-semibold transition",
                active ? "border-sky-200 bg-sky-50 text-[#0055FF] shadow-[0_14px_34px_-18px_rgba(37,99,235,0.18)]" : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-[#0E2450]"
              )}
            >
              {getTabLabel(locale, tab)}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_64px_-40px_rgba(15,23,42,0.12)]">
        <div className="divide-y divide-slate-200">{activeRows.map((row) => <Row key={row.label + row.leftTitle} row={row} leftTool={leftTool} rightTool={rightTool} />)}</div>
      </div>

      <div className="mt-6 sticky bottom-3 z-20 rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_18px_60px_-34px_rgba(15,23,42,0.12)] sm:p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <PremiumButton href={leftReviewHref} className="w-full" variant="primary">
            {locale === "tr" ? `${leftTool.name}'i incele` : `Review ${leftTool.name}`}
          </PremiumButton>
          <PremiumButton href={rightReviewHref} className="w-full" variant="primary">
            {locale === "tr" ? `${rightTool.name}'i incele` : `Review ${rightTool.name}`}
          </PremiumButton>
          <PremiumButton href={editorialHref} className="w-full" variant="secondary">
            {locale === "tr" ? "Editoryal inceleme" : "Read editorial review"}
          </PremiumButton>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>{locale === "tr" ? "Mobilde alt panel sabit kalır." : "The bottom panel stays sticky on mobile."}</span>
          <span>
            {leftTool.name} vs {rightTool.name}
          </span>
        </div>
        {className ? <div className="sr-only">{className}</div> : null}
      </div>
    </section>
  );
}
