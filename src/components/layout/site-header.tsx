"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

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
        "sticky top-0 z-[70] text-slate-900 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300",
        isScrolled
          ? "border-b border-slate-200/80 bg-[rgba(255,255,255,0.9)] shadow-[0_24px_65px_-36px_rgba(15,23,42,0.24)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[rgba(255,255,255,0.88)]"
          : "border-b border-slate-200/60 bg-[rgba(255,255,255,0.76)] shadow-[0_18px_48px_-38px_rgba(15,23,42,0.16)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(255,255,255,0.72)]"
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1440px] px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
        <div className="ui-card ui-card-hover rounded-[24px] border border-slate-200/75 bg-white/80 px-4 py-3.5 shadow-[0_18px_54px_-36px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-[background-color,box-shadow,border-color,transform] duration-300 supports-[backdrop-filter]:bg-white/78 sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
            <Link href={`/${locale}`} className="inline-flex min-h-[44px] shrink-0 items-center gap-3">
              <BrandLogo compact className="h-8 w-8" />
              <span className="min-w-0 leading-tight">
                <span className="block text-[16px] font-semibold tracking-[-0.03em] text-slate-950 sm:text-[17px]">Deciply</span>
                <span className="block text-[11px] font-medium text-slate-600 sm:text-[12px]">
                  {locale === "tr" ? "AI araç dizini" : "AI tools directory"}
                </span>
              </span>
            </Link>

            <nav className="flex items-center gap-1.5 overflow-x-auto pb-0.5 lg:justify-center lg:pb-0">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="inline-flex min-h-[40px] shrink-0 items-center rounded-full border border-transparent px-4 text-sm font-semibold text-slate-700 transition duration-200 hover:border-sky-200 hover:bg-sky-50 hover:text-[#0A2540] hover:shadow-[0_10px_24px_-18px_rgba(14,37,64,0.35)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-between gap-3">
              <LocaleSwitcher locale={locale} />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-0.5 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={`${item.href}-mobile`}
                href={`/${locale}${item.href}`}
                className="inline-flex min-h-[36px] shrink-0 items-center rounded-full border border-slate-200/90 bg-white px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700 transition duration-200 hover:border-sky-200 hover:bg-sky-50 hover:text-[#0A2540] hover:shadow-[0_10px_24px_-18px_rgba(14,37,64,0.35)]"
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
