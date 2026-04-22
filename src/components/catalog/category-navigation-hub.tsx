"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { SupportedLocale } from "@/i18n/config";
import type { CategoryHubItem } from "@/lib/category-taxonomy";

type CategoryNavigationHubProps = {
  locale: SupportedLocale;
  categories: CategoryHubItem[];
  copy: {
    sidebarTitle: string;
    subcategoryLabel: string;
    toolCountLabel: string;
    openLabel: string;
  };
};

export function CategoryNavigationHub({ locale, categories, copy }: CategoryNavigationHubProps) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const categoryCountLabel = locale === "tr" ? "kategori" : copy.subcategoryLabel;

  const scrollToCategory = (slug: string) => {
    const section = document.getElementById(`category-${slug}`);

    if (!section) {
      return;
    }

    setActiveSlug(slug);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(`category-${category.slug}`))
      .filter((item): item is HTMLElement => Boolean(item));

    if (!sections.length) {
      return;
    }

    const updateActiveSection = () => {
      const markerOffset = 120;
      const currentSection =
        [...sections]
          .reverse()
          .find((section) => section.getBoundingClientRect().top <= markerOffset) ?? sections[0];

      if (currentSection?.id) {
        setActiveSlug(currentSection.id.replace("category-", ""));
      }
    };

    const observer = new IntersectionObserver(
      () => updateActiveSection(),
      {
        rootMargin: "-120px 0px -70% 0px",
        threshold: [0, 0.12, 0.24, 0.36]
      }
    );

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [categories]);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[18px] border border-slate-200 bg-white p-2">
          <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-600">{copy.sidebarTitle}</p>
          <nav className="homepage-horizontal-scroll flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pr-0">
            {categories.map((category) => {
              const active = category.slug === activeSlug;

              return (
                <a
                  key={category.slug}
                  href={`#category-${category.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToCategory(category.slug);
                  }}
                  className={[
                    "group flex min-w-[12rem] cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-l-[3px] px-3 py-2.5 text-left transition duration-150 lg:min-w-0 lg:py-2",
                    active
                      ? "border-sky-200 border-l-[#2563eb] bg-sky-50 text-[#2563eb]"
                      : "border-transparent border-l-transparent bg-white text-slate-600 hover:border-slate-200 hover:border-l-sky-200 hover:bg-slate-50 hover:text-slate-950"
                  ].join(" ")}
                >
                  <span className="min-w-0">
                    <span className="clamp-1 block text-sm font-bold">{category.name}</span>
                    <span className="mt-0.5 block text-[11px] font-semibold text-slate-400">
                      {category.subcategories.length} {copy.subcategoryLabel}
                    </span>
                  </span>
                  <span
                    className={[
                      "h-7 w-1.5 shrink-0 rounded-full transition duration-150",
                      active ? "bg-[#2563eb]" : "bg-slate-200 group-hover:bg-sky-200"
                    ].join(" ")}
                  />
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      <section className="space-y-4">
        {categories.map((category) => (
          <section
            key={category.slug}
            id={`category-${category.slug}`}
            className="scroll-mt-32 rounded-[18px] border border-slate-200 bg-white p-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-black tracking-[-0.04em] text-slate-950">{category.name}</h2>
                <p className="clamp-1 mt-1 max-w-3xl text-sm leading-6 text-slate-500">{category.description}</p>
              </div>
              <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                {category.subcategories.length} {categoryCountLabel}
              </span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.slug}
                  href={`/${locale}/category/${subcategory.routeSlug}`}
                  className="group flex h-10 items-center justify-between gap-3 rounded-[10px] border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50/70 hover:text-slate-950"
                  aria-label={`${copy.openLabel}: ${subcategory.name}`}
                >
                  <span className="clamp-1 min-w-0">{subcategory.name}</span>
                  <span className="shrink-0 text-xs font-bold text-slate-400 group-hover:text-sky-700">
                    {subcategory.toolCount}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}
