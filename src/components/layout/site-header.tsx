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
    <header className="sticky top-0 z-40 border-b border-fuchsia-400/16 bg-[linear-gradient(180deg,rgba(2,4,9,0.96),rgba(7,11,24,0.84))] backdrop-blur-2xl">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 px-4 py-3 md:grid-cols-[auto_1fr_auto] md:gap-4 md:px-6 md:py-4">
        <Link href={`/${locale}`} className="inline-flex min-h-[44px] min-w-0 items-center">
          <BrandLogo compact className="drop-shadow-[0_16px_36px_rgba(59,130,246,0.16)]" />
        </Link>
        <div className="hidden justify-center md:flex">
          <nav className="ui-nav-shell hidden items-center gap-1 px-2 py-2 md:flex">
            {dictionary.navigation.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="inline-flex min-h-[36px] items-center rounded-full px-4 text-sm font-medium text-slate-100 transition duration-200 hover:bg-fuchsia-400/[0.08] hover:text-white"
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

      <div className="border-t border-fuchsia-400/14 px-4 py-2 md:hidden">
        <nav className="mx-auto grid max-w-[1200px] grid-cols-3 gap-2">
          {mobileQuickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="ui-nav-shell inline-flex min-h-[44px] min-w-0 items-center justify-center truncate px-1.5 text-[10px] font-semibold tracking-normal text-slate-100 transition duration-150 hover:border-fuchsia-400/24 hover:text-fuchsia-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}



