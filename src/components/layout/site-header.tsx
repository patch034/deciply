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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ) : (
        <>
          <path d="M5 7h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 17h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 10);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMobileOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[90] px-0 pt-0 sm:px-0 sm:pt-0">
      <div
        className={[
          "mx-auto flex w-full max-w-none flex-col border-b transition-[background-color,box-shadow,border-color,transform] duration-300",
          isScrolled
            ? "border-slate-200/95 bg-white/84 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
            : "border-slate-200/85 bg-white/74 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.12)] backdrop-blur-xl"
        ].join(" ")}
      >
        <div className="mx-auto flex min-h-[76px] w-full max-w-[1440px] items-center gap-3 px-4 py-3 sm:px-5 lg:px-7">
          <Link href={`/${locale}`} className="flex min-w-0 shrink-0 items-center gap-3">
            <BrandLogo compact className="h-8 w-8" />
            <span className="min-w-0 leading-tight">
              <span className="block text-[1.05rem] font-semibold tracking-[-0.03em] text-slate-950">Deciply</span>
              <span className="block text-[0.78rem] text-slate-500">{dictionary.brandSubtitle}</span>
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex">
            {dictionary.navigation.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`} className="ui-nav-pill">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="shrink-0">
              <LocaleSwitcher locale={locale} />
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white/72 text-slate-700 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.24)] backdrop-blur-xl transition hover:border-sky-200 hover:text-slate-950 lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-200/80 bg-white/92 px-4 pb-4 pt-2 lg:hidden">
            <nav className="mx-auto grid max-w-[1440px] gap-2">
              {dictionary.navigation.map((item) => (
                <Link
                  key={`${item.href}-mobile`}
                  href={`/${locale}${item.href}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[46px] items-center rounded-[18px] border border-slate-200 bg-white/82 px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
