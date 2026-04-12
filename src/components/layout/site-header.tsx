import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { PremiumButton } from "@/components/ui/premium-button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const navItems = dictionary.navigation;
  const quickLinks = [
    { href: `/${locale}/categories`, label: locale === "tr" ? "Kategoriler" : "Categories" },
    { href: `/${locale}/tools`, label: locale === "tr" ? "Araçlar" : "Tools" },
    { href: `/${locale}/categories/comparisons`, label: locale === "tr" ? "Karşılaştırmalar" : "Comparisons" },
    { href: `/${locale}/blog`, label: locale === "tr" ? "Blog" : "Blog" },
    { href: `/${locale}/compare-auto`, label: locale === "tr" ? "Canlı karşılaştırma" : "Live compare" }
  ];
  const searchPlaceholder =
    locale === "tr" ? "Araç, kategori veya karşılaştırma ara..." : "Search tools, categories, or comparisons...";
  const searchButtonLabel = locale === "tr" ? "Ara" : "Search";
  const featuredCtaLabel = locale === "tr" ? "Karşılaştır" : "Compare";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[rgba(255,255,255,0.9)] text-slate-900 backdrop-blur-2xl">
      <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.96))] px-4 py-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Link href={`/${locale}`} className="inline-flex min-h-[44px] shrink-0 items-center gap-3">
                <BrandLogo compact className="h-8" />
                <span className="min-w-0 leading-tight">
                  <span className="block text-[15px] font-semibold tracking-[-0.03em] text-slate-950 sm:text-[16px]">
                    Deciply
                  </span>
                  <span className="block text-[11px] font-medium text-slate-500 sm:text-[12px]">
                    {locale === "tr" ? "AI araç dizini" : "AI tools directory"}
                  </span>
                </span>
              </Link>

              <nav className="hidden flex-1 items-center justify-center gap-1.5 xl:flex">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className="inline-flex min-h-[40px] items-center rounded-full px-4 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-slate-100 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <form action={`/${locale}/tools`} method="get" className="hidden min-w-[320px] max-w-[440px] flex-1 items-center gap-2 lg:flex">
                <label className="sr-only" htmlFor="site-search">
                  {searchButtonLabel}
                </label>
                <div className="flex w-full items-center gap-3 rounded-[20px] border border-slate-200/90 bg-white px-4 py-3 shadow-[0_20px_48px_-30px_rgba(15,23,42,0.2)]">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-400">
                    <path d="M10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
                    <path d="m15 15 4.5 4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                  </svg>
                  <input
                    id="site-search"
                    name="q"
                    type="search"
                    placeholder={searchPlaceholder}
                    className="h-6 w-full border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="inline-flex min-h-[38px] shrink-0 items-center rounded-full bg-slate-900 px-4 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    {searchButtonLabel}
                  </button>
                </div>
              </form>

              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden md:block">
                  <LocaleSwitcher locale={locale} />
                </div>
                <PremiumButton href={`/${locale}/compare-auto`} className="hidden md:inline-flex" variant="ghost">
                  {featuredCtaLabel}
                </PremiumButton>
              </div>
            </div>

            <div className="grid gap-3 xl:hidden">
              <form action={`/${locale}/tools`} method="get" className="flex w-full items-center gap-3 rounded-[20px] border border-slate-200/90 bg-white px-4 py-3 shadow-[0_20px_48px_-30px_rgba(15,23,42,0.2)]">
                <label className="sr-only" htmlFor="site-search-mobile">
                  {searchButtonLabel}
                </label>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-400">
                  <path d="M10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m15 15 4.5 4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                </svg>
                <input
                  id="site-search-mobile"
                  name="q"
                  type="search"
                  placeholder={searchPlaceholder}
                  className="h-8 w-full border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-[38px] shrink-0 items-center rounded-full bg-slate-900 px-4 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  {searchButtonLabel}
                </button>
              </form>

              <nav className="flex items-center gap-2 overflow-x-auto pb-0.5 xl:hidden">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex min-h-[36px] shrink-0 items-center rounded-full border border-slate-200/90 bg-slate-50 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3 md:hidden">
                <LocaleSwitcher locale={locale} />
                <PremiumButton href={`/${locale}/compare-auto`} className="flex-1" variant="ghost">
                  {featuredCtaLabel}
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
