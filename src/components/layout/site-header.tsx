"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import type { SupportedLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteHeaderProps = {
  locale: SupportedLocale;
  dictionary: Dictionary;
};

function getHeaderSubtitle(locale: SupportedLocale) {
  switch (locale) {
    case "tr":
      return "AI araç dizini";
    case "ar":
      return "دليل أدوات الذكاء الاصطناعي";
    case "ru":
      return "Каталог AI‑инструментов";
    case "zh":
      return "AI 工具目录";
    case "ja":
      return "AIツールのディレクトリ";
    case "ko":
      return "AI 도구 디렉터리";
    case "el":
      return "Κατάλογος εργαλείων AI";
    case "da":
      return "AI-værktøjs-katalog";
    case "fa":
      return "دایرکتوری ابزارهای هوش مصنوعی";
    case "en":
    default:
      return "AI tools directory";
  }
}

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const navItems = dictionary.navigation;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 8);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-[80] overflow-visible text-slate-900 transition-[background-color,box-shadow,border-color,backdrop-filter,transform] duration-300 will-change-[background-color,box-shadow,backdrop-filter,transform]",
        isScrolled
          ? "border-b border-slate-200/70 bg-[rgba(255,255,255,0.82)] shadow-[0_18px_46px_-34px_rgba(15,23,42,0.15)] backdrop-blur-3xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[rgba(255,255,255,0.82)]"
          : "border-b border-slate-200/50 bg-[rgba(255,255,255,0.66)] shadow-[0_10px_28px_-34px_rgba(15,23,42,0.09)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[rgba(255,255,255,0.66)]"
      ].join(" ")}
    >
      <div className="w-full px-0 py-0">
        <div className="mx-auto flex w-full max-w-none flex-col gap-2 px-2.5 py-2.5 sm:px-4 sm:py-3 lg:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href={`/${locale}`} className="inline-flex min-h-[44px] shrink-0 items-center gap-3">
              <BrandLogo compact className="h-8 w-8" />
              <span className="min-w-0 leading-tight">
                <span className="block text-[16px] font-semibold tracking-[-0.03em] text-slate-950 sm:text-[17px]">Deciply</span>
                <span className="block text-[11px] font-medium text-slate-600 sm:text-[12px]">{getHeaderSubtitle(locale)}</span>
              </span>
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1.5 overflow-x-auto pb-0.5 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="ui-pill-link shrink-0 px-4 text-[14px] tracking-[-0.01em]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center justify-between gap-3">
              <LocaleSwitcher locale={locale} />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={`${item.href}-mobile`}
                href={`/${locale}${item.href}`}
                className="ui-pill-link min-h-[36px] shrink-0 px-3 text-[11px] uppercase tracking-[0.12em]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
