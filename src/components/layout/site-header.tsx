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
  const mobileQuickLinks = [
    {
      href: `/${locale}/tools`,
      label: locale === "tr" ? "Tools" : "Tools"
    },
    {
      href: `/${locale}/blog`,
      label: locale === "tr" ? "Blog" : "Blog"
    },
    {
      href: `/${locale}/categories/comparisons`,
      label: locale === "tr" ? "Compare" : "Compare"
    }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[linear-gradient(180deg,rgba(4,8,15,0.88),rgba(5,10,18,0.74))] backdrop-blur-2xl">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 px-4 py-3 md:grid-cols-[auto_1fr_auto] md:gap-4 md:px-6 md:py-4">
        <Link href={`/${locale}`} className="inline-flex min-h-[44px] min-w-0 items-center">
          <BrandLogo compact className="drop-shadow-[0_12px_30px_rgba(108,92,231,0.18)]" />
        </Link>
        <div className="hidden justify-center md:flex">
          <nav className="ui-nav-shell hidden items-center gap-1 px-2 py-2 md:flex">
            {dictionary.navigation.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="inline-flex min-h-[36px] items-center rounded-full px-4 text-sm font-medium text-slate-200 transition duration-200 hover:bg-white/[0.045] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex justify-end">
          <LocaleSwitcher locale={locale} />
        </div>
      </div>

      <div className="border-t border-white/8 px-4 py-2 md:hidden">
        <nav className="mx-auto grid max-w-[1200px] grid-cols-3 gap-2">
          {mobileQuickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="ui-nav-shell inline-flex min-h-[44px] min-w-0 items-center justify-center truncate px-1.5 text-[10px] font-semibold tracking-normal text-slate-100 transition duration-150 hover:border-cyan-400/20 hover:text-cyan-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
