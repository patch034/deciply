"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

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

const DESKTOP_BREAKPOINT = 1024;
const DESKTOP_SIDEBAR_WIDTH = 260;
const HEADER_OFFSET = 96;
const SCROLL_OFFSET = 112;

export function CategoryNavigationHub({ locale, categories, copy }: CategoryNavigationHubProps) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const [desktopSidebarStyle, setDesktopSidebarStyle] = useState<CSSProperties>({});
  const layoutRef = useRef<HTMLDivElement>(null);
  const desktopPanelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const categoryCountLabel = locale === "tr" ? "kategori" : copy.subcategoryLabel;

  const scrollToCategory = (slug: string) => {
    const section = document.getElementById(`category-${slug}`);

    if (!section) {
      return;
    }

    const targetTop = section.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    setActiveSlug(slug);
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  };

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(`category-${category.slug}`))
      .filter((item): item is HTMLElement => Boolean(item));

    if (!sections.length) {
      return;
    }

    const updateActiveSection = () => {
      const markerOffset = SCROLL_OFFSET + 8;
      const currentSection =
        [...sections]
          .reverse()
          .find((section) => section.getBoundingClientRect().top <= markerOffset) ?? sections[0];

      if (currentSection?.id) {
        setActiveSlug(currentSection.id.replace("category-", ""));
      }
    };

    const observer = new IntersectionObserver(() => updateActiveSection(), {
      rootMargin: `-${SCROLL_OFFSET}px 0px -68% 0px`,
      threshold: [0, 0.12, 0.24, 0.36]
    });

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [categories]);

  useEffect(() => {
    const updateDesktopSidebarPosition = () => {
      frameRef.current = null;

      if (!layoutRef.current || !desktopPanelRef.current) {
        return;
      }

      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        setDesktopSidebarStyle({});
        return;
      }

      const layoutRect = layoutRef.current.getBoundingClientRect();
      const layoutTop = window.scrollY + layoutRect.top;
      const layoutBottom = layoutTop + layoutRef.current.offsetHeight;
      const panelVisibleHeight = Math.min(desktopPanelRef.current.scrollHeight, window.innerHeight - HEADER_OFFSET - 16);
      const fixedTopAbs = window.scrollY + HEADER_OFFSET;
      const maxAbsoluteTop = Math.max(layoutBottom - panelVisibleHeight, layoutTop);

      if (fixedTopAbs <= layoutTop) {
        setDesktopSidebarStyle({
          position: "absolute",
          top: 0,
          left: 0,
          width: `${DESKTOP_SIDEBAR_WIDTH}px`
        });
        return;
      }

      if (fixedTopAbs >= maxAbsoluteTop) {
        setDesktopSidebarStyle({
          position: "absolute",
          top: `${maxAbsoluteTop - layoutTop}px`,
          left: 0,
          width: `${DESKTOP_SIDEBAR_WIDTH}px`
        });
        return;
      }

      setDesktopSidebarStyle({
        position: "fixed",
        top: `${HEADER_OFFSET}px`,
        left: `${layoutRect.left}px`,
        width: `${DESKTOP_SIDEBAR_WIDTH}px`
      });
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = window.requestAnimationFrame(updateDesktopSidebarPosition);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const observer = new ResizeObserver(() => scheduleUpdate());

    if (layoutRef.current) {
      observer.observe(layoutRef.current);
    }

    if (desktopPanelRef.current) {
      observer.observe(desktopPanelRef.current);
    }

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [categories.length]);

  const navigationItems = useMemo(
    () =>
      categories.map((category) => {
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
              "group flex min-w-[12rem] cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-l-[3px] px-3 py-2 text-left transition duration-150 lg:min-w-0",
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
      }),
    [activeSlug, categories, copy.subcategoryLabel]
  );

  return (
    <div ref={layoutRef} className="relative">
      <div className="hidden lg:block">
        <div className="relative w-[260px]" aria-hidden />
        <aside
          style={desktopSidebarStyle}
          className="z-30 hidden lg:block"
        >
          <div
            ref={desktopPanelRef}
            className="category-sidebar-panel rounded-[18px] border border-slate-200 bg-white p-2 shadow-[0_16px_36px_rgba(15,23,42,0.06)]"
          >
            <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-600">{copy.sidebarTitle}</p>
            <nav className="flex flex-col gap-1">{navigationItems}</nav>
          </div>
        </aside>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:hidden">
          <div className="rounded-[18px] border border-slate-200 bg-white p-2">
            <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-600">{copy.sidebarTitle}</p>
            <nav className="homepage-horizontal-scroll flex gap-2 overflow-x-auto pb-1">{navigationItems}</nav>
          </div>
        </aside>

        <div className="hidden lg:block" aria-hidden />

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
    </div>
  );
}
