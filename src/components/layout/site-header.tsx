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
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f19]/74 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4">
        <Link href={`/${locale}`} className="inline-flex items-center">
          <BrandLogo compact className="drop-shadow-[0_12px_30px_rgba(108,92,231,0.22)]" />
        </Link>
        <div className="flex justify-center">
          <nav className="ui-nav-shell hidden items-center gap-1 px-2 py-2 md:flex">
            {dictionary.navigation.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="inline-flex min-h-[36px] items-center rounded-full px-4 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/[0.05] hover:text-white"
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
    </header>
  );
}
