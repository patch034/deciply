import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

function isExternalHref(href: string) {
  return /^(mailto:|https?:\/\/|tel:)/i.test(href);
}

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  function renderFooterLink(item: { href: string; label: string }) {
    const sharedClassName = "truncate transition duration-200 hover:text-cyan-100";

    if (isExternalHref(item.href)) {
      return (
        <a key={item.href + item.label} href={item.href} className={sharedClassName}>
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.href + item.label} href={`/${locale}${item.href}`} className={sharedClassName}>
        {item.label}
      </Link>
    );
  }

  const [toolsGroup, compareGroup, guidesGroup, trustGroup] = dictionary.footer.groups;

  return (
    <footer className="mt-20 border-t border-slate-700/60 bg-[linear-gradient(180deg,rgba(3,7,13,0.96),rgba(2,5,10,1))] px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_repeat(4,minmax(0,1fr))] lg:items-center lg:gap-8">
          <div className="min-w-0 self-start lg:self-center">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[var(--tn-gradient-primary)] text-sm font-bold text-white shadow-[0_18px_42px_-22px_rgba(56,189,248,0.32)]">
                D
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">{dictionary.footer.badge}</p>
                <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-50">{locale === "tr" ? "AI araçlarını keşfetmek için" : "For discovering AI tools"}</p>
              </div>
            </div>

            <p
              className="mt-4 max-w-[320px] text-sm leading-6 text-slate-300/86"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {dictionary.footer.description}
            </p>
            <p className="mt-3 text-sm font-medium text-cyan-100/90">
              {locale === "tr" ? "Doğru AI aracını daha hızlı ve güvenle seç." : "Choose the right AI faster and with confidence."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-200">
              {dictionary.footer.contactBlock.links.map((item) => renderFooterLink(item))}
            </div>
          </div>

          <div className="min-w-0 self-center lg:pt-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{toolsGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300/88">{toolsGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>

          <div className="min-w-0 self-center lg:pt-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{compareGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300/88">{compareGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>

          <div className="min-w-0 self-center lg:pt-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{guidesGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300/88">{guidesGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>

          <div className="min-w-0 self-center lg:pt-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{trustGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-4 text-sm text-slate-300/88">
              {trustGroup.links.map((item) => renderFooterLink(item))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700/60 pt-5">
          <div className="flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:shrink-0">
              <p>{dictionary.footer.copyright}</p>
              <p className="opacity-60">Impact-Site-Verification: cc3ef693-e846-43e9-8663-c0af7be7810c</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
