import Link from "next/link";
import type { ReactNode } from "react";

import type { Locale } from "@/i18n/config";
import { getLocalizedTools } from "@/lib/catalog";
import type { BlogSection } from "@/types/blog";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildArticleSectionId(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type InlineLinkItem = {
  label: string;
  href: string;
};

type ArticleActionButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

type ArticleContentProps = {
  locale: Locale;
  sections: BlogSection[];
  tone?: "light" | "dark";
  supportingLinks?: {
    tools?: InlineLinkItem[];
    articles?: InlineLinkItem[];
    comparePages?: InlineLinkItem[];
    alternativePages?: InlineLinkItem[];
    useCasePages?: InlineLinkItem[];
  };
};

export function ArticleContent({ locale, sections, supportingLinks, tone = "light" }: ArticleContentProps) {
  const isLight = tone === "light";
  const toolLinks = getLocalizedTools(locale)
    .map((tool) => ({ slug: tool.slug, name: tool.name, href: `/${locale}/tools/${tool.slug}` }))
    .sort((a, b) => b.name.length - a.name.length);

  const seenToolSlugs = new Set<string>();

  function renderPlainText(text: string): ReactNode[] {
    if (!toolLinks.length) {
      return [text];
    }

    const pattern = new RegExp(`(${toolLinks.map((item) => escapeRegExp(item.name)).join("|")})`, "g");
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      const match = toolLinks.find((item) => item.name === part);

      if (!match || seenToolSlugs.has(match.slug)) {
        return <span key={`${part}-${index}`}>{part}</span>;
      }

      seenToolSlugs.add(match.slug);

      return (
        <Link
          key={`${part}-${index}`}
          href={match.href}
          className="font-medium text-[#0055FF] underline decoration-sky-200 underline-offset-4 transition hover:text-[#0E2450] hover:decoration-sky-300"
        >
          {part}
        </Link>
      );
    });
  }

  function renderLinkedText(text: string): ReactNode[] {
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const nodes: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkPattern.exec(text)) !== null) {
      const [fullMatch, label, href] = match;

      if (match.index > lastIndex) {
        nodes.push(...renderPlainText(text.slice(lastIndex, match.index)));
      }

      nodes.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="font-medium text-[#0055FF] underline decoration-sky-200 underline-offset-4 transition hover:text-[#0E2450] hover:decoration-sky-300"
        >
          {label}
        </Link>
      );

      lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < text.length) {
      nodes.push(...renderPlainText(text.slice(lastIndex)));
    }

    return nodes.length ? nodes : [text];
  }

  function renderLinkList(items: InlineLinkItem[]) {
    return items.map((item, index) => (
      <span key={item.href}>
        {index > 0 ? ", " : null}
        <Link
          href={item.href}
          className="font-medium text-[#0055FF] underline decoration-sky-200 underline-offset-4 transition hover:text-[#0E2450] hover:decoration-sky-300"
        >
          {item.label}
        </Link>
      </span>
    ));
  }

  function collectContextualButtons(textBlocks: string[]): ArticleActionButton[] {
    const localeValue = locale === "tr" ? "tr-TR" : "en-US";
    const joinedText = textBlocks.join(" \n ").toLocaleLowerCase(localeValue);
    const buttons: ArticleActionButton[] = [];
    const seenHrefs = new Set<string>();

    const addButton = (button: ArticleActionButton) => {
      if (!button.href || seenHrefs.has(button.href)) {
        return;
      }

      seenHrefs.add(button.href);
      buttons.push(button);
    };

    toolLinks.forEach((tool) => {
      if (buttons.length >= 3) {
        return;
      }

      if (joinedText.includes(tool.name.toLocaleLowerCase(localeValue))) {
        addButton({
          label: locale === "tr" ? `${tool.name}’yi incele` : `Open ${tool.name}`,
          href: tool.href,
          variant: "primary"
        });
      }
    });

    if (buttons.length >= 2 && supportingLinks?.comparePages?.length) {
      const compareLink = supportingLinks.comparePages[0];
      if (compareLink) {
        addButton({
          label: compareLink.label,
          href: compareLink.href,
          variant: "secondary"
        });
      }
    }

    if (supportingLinks?.articles?.length) {
      const relatedArticle = supportingLinks.articles[0];
      addButton({
        label: relatedArticle.label,
        href: relatedArticle.href,
        variant: "ghost"
      });
    }

    if (!buttons.length && supportingLinks?.tools?.length) {
      supportingLinks.tools.slice(0, 3).forEach((item) => {
        addButton({
          label: item.label,
          href: item.href,
          variant: "primary"
        });
      });
    }

    if (!buttons.length && supportingLinks?.alternativePages?.length) {
      const alternative = supportingLinks.alternativePages[0];
      if (alternative) {
        addButton({
          label: alternative.label,
          href: alternative.href,
          variant: "ghost"
        });
      }
    }

    if (!buttons.length && supportingLinks?.useCasePages?.length) {
      const useCase = supportingLinks.useCasePages[0];
      if (useCase) {
        addButton({
          label: useCase.label,
          href: useCase.href,
          variant: "ghost"
        });
      }
    }

    return buttons.slice(0, 5);
  }

  function renderButtonRow(buttons: ArticleActionButton[]) {
    if (!buttons.length) {
      return null;
    }

    return (
      <div className="mt-5 flex flex-wrap gap-2.5">
        {buttons.map((button) => (
          <Link
            key={`${button.href}-${button.label}`}
            href={button.href}
            className={[
              "inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-300",
              button.variant === "primary"
                ? "bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_42%,#0055FF_72%,#3B82F6_100%)] text-white shadow-[0_20px_60px_-22px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 hover:scale-[1.02]"
                : button.variant === "secondary"
                  ? isLight
                    ? "border border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-slate-950"
                    : "border border-sky-400/14 bg-slate-950/50 text-slate-100 hover:border-sky-200 hover:text-[#BFD2F6]"
                  : isLight
                    ? "border border-slate-200 bg-slate-50 text-slate-600 hover:border-sky-200 hover:text-slate-950"
                    : "border border-sky-400/10 bg-slate-950/40 text-slate-200 hover:border-sky-200 hover:text-[#BFD2F6]"
            ].join(" ")}
          >
            {button.label}
          </Link>
        ))}
      </div>
    );
  }

  function renderSupportingLinks() {
    if (!supportingLinks) {
      return null;
    }

    const toolItems = supportingLinks.tools ?? [];
    const articleItems = supportingLinks.articles ?? [];
    const compareItems = supportingLinks.comparePages ?? [];
    const alternativeItems = supportingLinks.alternativePages ?? [];
    const useCaseItems = supportingLinks.useCasePages ?? [];

    if (!toolItems.length && !articleItems.length && !compareItems.length && !alternativeItems.length && !useCaseItems.length) {
      return null;
    }

    return (
      <div
        className={[
          "mt-4 rounded-[18px] px-4 py-3 text-sm leading-7 sm:mt-5 sm:rounded-[20px]",
          isLight ? "border border-slate-200 bg-white/92 text-slate-600" : "border border-sky-400/14 bg-slate-950/40 text-slate-300"
        ].join(" ")}
      >
        {locale === "tr" ? (
          <>
            {(toolItems.length || articleItems.length) ? (
              <p>
                Bu konuyla ilgili olarak {toolItems.length ? renderLinkList(toolItems) : null}
                {toolItems.length && articleItems.length ? " detay sayfalarına ve " : toolItems.length ? " detay sayfalarına" : ""}
                {articleItems.length ? renderLinkList(articleItems) : null}
                {articleItems.length ? " rehberlerine de göz atabilirsiniz." : "."}
              </p>
            ) : null}
            {(compareItems.length || alternativeItems.length || useCaseItems.length) ? (
              <p className="mt-2">
                Kararı derinleştirmek için {compareItems.length ? renderLinkList(compareItems) : null}
                {compareItems.length && (alternativeItems.length || useCaseItems.length) ? ", " : ""}
                {alternativeItems.length ? renderLinkList(alternativeItems) : null}
                {alternativeItems.length && useCaseItems.length ? ", " : ""}
                {useCaseItems.length ? renderLinkList(useCaseItems) : null}
                {" sayfalarına da geçebilirsiniz."}
              </p>
            ) : null}
          </>
        ) : (
          <>
            {(toolItems.length || articleItems.length) ? (
              <p>
                For this topic, you can also explore {toolItems.length ? renderLinkList(toolItems) : null}
                {toolItems.length && articleItems.length ? " tool pages and " : toolItems.length ? " tool pages" : ""}
                {articleItems.length ? renderLinkList(articleItems) : null}
                {articleItems.length ? " related guides." : "."}
              </p>
            ) : null}
            {(compareItems.length || alternativeItems.length || useCaseItems.length) ? (
              <p className="mt-2">
                To go deeper, open {compareItems.length ? renderLinkList(compareItems) : null}
                {compareItems.length && (alternativeItems.length || useCaseItems.length) ? ", " : ""}
                {alternativeItems.length ? renderLinkList(alternativeItems) : null}
                {alternativeItems.length && useCaseItems.length ? ", " : ""}
                {useCaseItems.length ? renderLinkList(useCaseItems) : null}
                {" next."}
              </p>
            ) : null}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <section
          key={section.title}
          id={buildArticleSectionId(section.title)}
          className={[
            "scroll-mt-24 rounded-[28px] border p-5 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)] md:p-8",
            isLight
              ? "border-slate-200/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.99))]"
              : "border-sky-400/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))]"
          ].join(" ")}
        >
          <h2 className={["text-2xl font-bold tracking-tight md:text-[2rem]", isLight ? "text-slate-950" : "text-slate-50"].join(" ")}>{section.title}</h2>

          <div className={["mt-4 space-y-3 text-[15px] leading-7 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8", isLight ? "text-slate-600" : "text-slate-300"].join(" ")}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{renderLinkedText(paragraph)}</p>
            ))}
          </div>

          {index === 0 ? renderSupportingLinks() : null}

          {section.bullets?.length ? (
            <ul className="mt-5 grid gap-3 sm:mt-6">
              {section.bullets.map((item) => (
                <li
                  key={item}
                className={[
                  "flex items-start gap-3 rounded-[22px] px-4 py-3 text-sm leading-7",
                  isLight ? "border border-slate-200 bg-white/92 text-slate-700" : "border border-sky-400/10 bg-slate-950/50 text-slate-200"
                ].join(" ")}
              >
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#0055FF]" />
                  <span>{renderLinkedText(item)}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.comparison ? (
            <div
              className={[
                "mt-5 rounded-[24px] p-4 sm:mt-6 sm:p-5",
                isLight ? "border border-sky-200 bg-sky-50/70" : "border border-sky-400/16 bg-slate-950/40"
              ].join(" ")}
            >
              <h3 className={["text-lg font-semibold", isLight ? "text-slate-950" : "text-slate-50"].join(" ")}>{section.comparison.title}</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {section.comparison.items.map((item) => (
                  <div key={item.label} className={["rounded-[20px] p-4", isLight ? "border border-slate-200 bg-white/92" : "border border-sky-400/10 bg-slate-950/50"].join(" ")}>
                    <p className={["text-xs font-semibold uppercase tracking-[0.16em]", isLight ? "text-slate-500" : "text-slate-400"].join(" ")}>{item.label}</p>
                    <p className={["mt-3 text-sm font-semibold", isLight ? "text-slate-950" : "text-slate-100"].join(" ")}>{renderLinkedText(item.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {renderButtonRow(
            collectContextualButtons([
              ...section.paragraphs,
              ...(section.bullets ?? []),
              ...(section.comparison?.items.map((item) => `${item.label}: ${item.value}`) ?? [])
            ])
          )}

          {section.subSections?.length ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-2 sm:mt-8 sm:gap-5">
              {section.subSections.map((subSection) => (
                <div key={subSection.title} className={["rounded-[24px] p-5", isLight ? "border border-slate-200 bg-white/92" : "border border-sky-400/10 bg-slate-950/50"].join(" ")}>
                  <h3 className={["text-lg font-semibold", isLight ? "text-slate-950" : "text-slate-50"].join(" ")}>{subSection.title}</h3>
                  <div className={["mt-4 space-y-3 text-sm leading-7", isLight ? "text-slate-600" : "text-slate-300"].join(" ")}>
                    {subSection.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                    ))}
                  </div>
                  {subSection.bullets?.length ? (
                    <ul className={["mt-4 space-y-2 text-sm leading-7", isLight ? "text-slate-700" : "text-slate-200"].join(" ")}>
                      {subSection.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#0055FF]" />
                          <span>{renderLinkedText(item)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {renderButtonRow(
                    collectContextualButtons([
                      ...subSection.paragraphs,
                      ...(subSection.bullets ?? []),
                      ...(subSection.ctaLabel && subSection.ctaHref ? [`[${subSection.ctaLabel}](${subSection.ctaHref})`] : [])
                    ])
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}




