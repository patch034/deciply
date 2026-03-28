import Link from "next/link";
import type { ReactNode } from "react";

import type { Locale } from "@/i18n/config";
import { getLocalizedTools, getToolOutboundUrl } from "@/lib/catalog";
import type { BlogSection } from "@/types/blog";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderLinkedText(text: string, locale: Locale): ReactNode {
  const toolLinks = getLocalizedTools(locale)
    .map((tool) => ({ name: tool.name, href: getToolOutboundUrl(tool) }))
    .sort((a, b) => b.name.length - a.name.length);

  if (!toolLinks.length) {
    return text;
  }

  const pattern = new RegExp(`(${toolLinks.map((item) => escapeRegExp(item.name)).join("|")})`, "g");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const match = toolLinks.find((item) => item.name === part);

    if (!match) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    return (
      <a
        key={`${part}-${index}`}
        href={match.href}
        target="_blank"
        rel="nofollow sponsored noreferrer"
        className="font-medium text-cyan-200 transition hover:text-cyan-100"
      >
        {part}
      </a>
    );
  });
}

type ArticleContentProps = {
  locale: Locale;
  sections: BlogSection[];
};

export function ArticleContent({ locale, sections }: ArticleContentProps) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section
          key={section.title}
          className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-50 md:text-[2rem]">{section.title}</h2>

          <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{renderLinkedText(paragraph, locale)}</p>
            ))}
          </div>

          {section.bullets?.length ? (
            <ul className="mt-6 grid gap-3">
              {section.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-slate-200"
                >
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <span>{renderLinkedText(item, locale)}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.comparison ? (
            <div className="mt-6 rounded-[24px] border border-cyan-400/16 bg-cyan-400/[0.05] p-5">
              <h3 className="text-lg font-semibold text-slate-50">{section.comparison.title}</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {section.comparison.items.map((item) => (
                  <div key={item.label} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                    <p className="mt-3 text-sm font-semibold text-slate-100">{renderLinkedText(item.value, locale)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {section.subSections?.length ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {section.subSections.map((subSection) => (
                <div key={subSection.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-lg font-semibold text-slate-50">{subSection.title}</h3>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                    {subSection.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{renderLinkedText(paragraph, locale)}</p>
                    ))}
                  </div>
                  {subSection.bullets?.length ? (
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-200">
                      {subSection.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                          <span>{renderLinkedText(item, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {subSection.ctaLabel && subSection.ctaHref ? (
                    <div className="mt-5">
                      <Link
                        href={subSection.ctaHref}
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_72px_-22px_rgba(56,189,248,0.68)]"
                      >
                        {subSection.ctaLabel}
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
