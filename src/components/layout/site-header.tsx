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
        "fixed left-0 right-0 top-0 z-[80] text-slate-900 transition-[background-color,box-shadow,border-color,backdrop-filter,transform] duration-300 will-change-[background-color,box-shadow,backdrop-filter,transform]",
        isScrolled
          ? "border-b border-slate-200/75 bg-[rgba(255,255,255,0.82)] shadow-[0_20px_54px_-34px_rgba(15,23,42,0.2)] backdrop-blur-3xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[rgba(255,255,255,0.82)]"
          : "border-b border-slate-200/50 bg-[rgba(255,255,255,0.62)] shadow-[0_14px_38px_-34px_rgba(15,23,42,0.14)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[rgba(255,255,255,0.64)]"
      ].join(" ")}
    >
      <div className="w-full px-3 py-0 sm:px-4">
        <div className="ui-card ui-card-hover mx-auto w-full rounded-[28px] border border-white/65 bg-[rgba(255,255,255,0.74)] px-4 py-3.5 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.2)] ring-1 ring-white/55 backdrop-blur-2xl transition-[background-color,box-shadow,border-color,transform] duration-300 supports-[backdrop-filter]:bg-[rgba(255,255,255,0.74)] sm:px-5 lg:px-6">
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
                  className="inline-flex min-h-[40px] shrink-0 items-center rounded-full border border-slate-200/85 bg-white/55 px-4 text-[14px] font-semibold tracking-[-0.01em] text-slate-700 shadow-[0_8px_22px_-20px_rgba(15,23,42,0.18)] transition duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-[#0A2540] hover:shadow-[0_12px_26px_-18px_rgba(14,37,64,0.38)]"
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
                className="inline-flex min-h-[36px] shrink-0 items-center rounded-full border border-slate-200/85 bg-white/65 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700 shadow-[0_8px_22px_-20px_rgba(15,23,42,0.18)] transition duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-[#0A2540] hover:shadow-[0_12px_26px_-18px_rgba(14,37,64,0.38)]"
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
