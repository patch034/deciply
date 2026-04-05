import Link from "next/link";

import { locales, type Locale } from "@/i18n/config";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  return (
    <div className="ui-nav-shell inline-flex items-center p-1 text-xs font-semibold uppercase tracking-[0.16em]">
      {locales.map((item) => (
        <Link
          key={item}
          href={`/${item}`}
          className={`inline-flex min-h-[40px] min-w-[44px] items-center justify-center rounded-full px-3 transition duration-200 ${
            item === locale
              ? "bg-[var(--tn-gradient-primary)] text-white shadow-[0_10px_24px_-14px_rgba(59,130,246,0.5)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}

