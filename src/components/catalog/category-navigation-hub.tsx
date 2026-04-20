"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CategoryIcon } from "@/components/catalog/category-icon";
import type { CategoryHubItem } from "@/lib/category-taxonomy";
import type { SupportedLocale } from "@/i18n/config";

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

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(`category-${category.slug}`))
      .filter((item): item is HTMLElement => Boolean(item));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSlug(visible.target.id.replace("category-", ""));
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.12, 0.24, 0.36, 0.48]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [categories]);

  return (
    <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="ui-card rounded-[22px] p-3">
          <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-600">{copy.sidebarTitle}</p>
          <nav className="homepage-horizontal-scroll flex gap-2 overflow-x-auto pb-1 lg:max-h-[calc(100vh-9rem)] lg:flex-col lg:overflow-y-auto lg:pr-1">
            {categories.map((category) => {
              const active = category.slug === activeSlug;

              return (
                <a
                  key={category.slug}
                  href={`#category-${category.slug}`}
                  className={[
                    "group flex min-w-[12rem] items-center justify-between gap-3 rounded-[16px] border px-3 py-3 text-left transition lg:min-w-0",
                    active
                      ? "border-sky-200 bg-sky-50 text-slate-950 shadow-[0_16px_34px_-28px_rgba(37,99,235,0.45)]"
                      : "border-transparent bg-white/70 text-slate-600 hover:border-slate-200 hover:bg-white"
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
                      "h-8 w-1.5 shrink-0 rounded-full transition",
                      active ? "bg-[#0055FF]" : "bg-slate-200 group-hover:bg-sky-200"
                    ].join(" ")}
                  />
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      <section className="space-y-5">
        {categories.map((category) => (
          <section
            key={category.slug}
            id={`category-${category.slug}`}
            className="scroll-mt-28 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <CategoryIcon slug={category.slug} label={category.name} className="h-11 w-11 shrink-0" />
                <div>
                  <h2 className="text-xl font-black tracking-[-0.04em] text-slate-950">{category.name}</h2>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{category.description}</p>
                </div>
              </div>
              <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                {category.toolCount} {copy.toolCountLabel}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.slug}
                  href={`/${locale}/categories/${category.slug}/${subcategory.slug}`}
                  className="group rounded-[18px] border border-slate-200 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-[0_18px_34px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="clamp-2 text-sm font-black leading-5 text-slate-950">{subcategory.name}</h3>
                    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500">
                      {subcategory.toolCount}
                    </span>
                  </div>
                  <p className="clamp-2 mt-2 text-xs leading-5 text-slate-500">{subcategory.description}</p>
                  <span className="mt-3 inline-flex text-xs font-bold text-sky-700 group-hover:text-[#0055FF]">
                    {copy.openLabel} →
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
