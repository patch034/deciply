"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { ComparisonActionGrid } from "@/components/comparison/comparison-action-grid";

type ComparisonInsightSlide = {
  eyebrow: string;
  title: string;
  description: string;
  badges: string[];
};

type ComparisonInsightPanelProps = {
  locale: "tr" | "en";
  slides: ComparisonInsightSlide[];
  tools: {
    name: string;
    openHref: string;
    reviewHref: string;
  }[];
  neutralHref: string;
  className?: string;
};

export function ComparisonInsightPanel({ locale, slides, tools, neutralHref, className }: ComparisonInsightPanelProps) {
  const safeSlides = useMemo(() => slides.slice(0, 3), [slides]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const startXRef = useRef<number | null>(null);

  useEffect(() => {
    if (safeSlides.length <= 1 || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [safeSlides.length, isPaused]);

  useEffect(() => {
    if (activeIndex >= safeSlides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, safeSlides.length]);

  const goTo = (index: number) => {
    if (!safeSlides.length) {
      return;
    }

    const normalized = (index + safeSlides.length) % safeSlides.length;
    setActiveIndex(normalized);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    startXRef.current = event.clientX;
    setIsPaused(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (startXRef.current !== null) {
      const delta = event.clientX - startXRef.current;

      if (Math.abs(delta) > 48) {
        goTo(activeIndex + (delta < 0 ? 1 : -1));
      }
    }

    startXRef.current = null;
    setIsPaused(false);
  };

  return (
    <div
      className={clsx(
        "rounded-[28px] border border-violet-400/14 bg-[linear-gradient(180deg,rgba(9,13,23,0.92),rgba(10,16,30,0.96))] p-4 shadow-[0_18px_60px_-36px_rgba(124,58,237,0.18),0_14px_42px_-32px_rgba(244,114,182,0.12)] md:rounded-[32px] md:p-6",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-[22px] border border-violet-400/14 bg-[linear-gradient(135deg,rgba(10,16,30,0.96),rgba(15,23,42,0.98))] p-3.5 sm:rounded-[24px] sm:p-5"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          startXRef.current = null;
          setIsPaused(false);
        }}
        onPointerLeave={() => {
          startXRef.current = null;
          setIsPaused(false);
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">
            {locale === "tr" ? "Karar özeti" : "Decision summary"}
          </p>
          <p className="text-[11px] font-medium text-slate-500">
            {safeSlides.length ? `${activeIndex + 1}/${safeSlides.length}` : "0/0"}
          </p>
        </div>

        <div className="mt-3.5 min-h-[154px] sm:mt-4 sm:min-h-[188px]">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {safeSlides.map((slide) => (
                <article key={slide.title} className="w-full shrink-0">
                  <div className="flex min-h-[154px] flex-col rounded-[20px] border border-violet-400/14 bg-slate-950/55 p-3.5 sm:min-h-[188px] sm:rounded-[22px] sm:p-5">
                    <div className="flex flex-wrap gap-2">
                      {slide.badges.map((badge) => (
                        <Badge key={badge} variant="ghost" className="border-violet-400/14 bg-slate-950/55 text-slate-200">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{slide.eyebrow}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-50 sm:text-[1.35rem]">{slide.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{slide.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between gap-3 sm:mt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label={locale === "tr" ? "Önceki karar özeti" : "Previous insight"}
              className="inline-flex min-h-11 w-11 items-center justify-center rounded-full border border-violet-400/14 bg-slate-950/55 text-slate-200 transition hover:border-fuchsia-400/24 hover:bg-fuchsia-400/[0.08] hover:text-fuchsia-100"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label={locale === "tr" ? "Sonraki karar özeti" : "Next insight"}
              className="inline-flex min-h-10 w-10 items-center justify-center rounded-full border border-violet-400/14 bg-slate-950/55 text-slate-200 transition hover:border-fuchsia-400/24 hover:bg-fuchsia-400/[0.08] hover:text-fuchsia-100"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {safeSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`${slide.title} ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => goTo(index)}
                className={clsx(
                  "h-2.5 rounded-full transition-all duration-200",
                  index === activeIndex ? "w-8 bg-fuchsia-300" : "w-2.5 bg-white/18 hover:bg-white/35"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <ComparisonActionGrid locale={locale} tools={tools} neutralHref={neutralHref} className="gap-3" />
      </div>
    </div>
  );
}


