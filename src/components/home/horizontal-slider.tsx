"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

type HorizontalSliderProps = {
  children: ReactNode;
  ariaLabel: string;
};

export function HorizontalSlider({ children, ariaLabel }: HorizontalSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth"
    });
  }

  return (
    <div className="group relative" aria-label={ariaLabel}>
      <button
        type="button"
        onClick={() => scroll("left")}
        className="pointer-events-none absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-lg font-bold text-slate-700 opacity-0 shadow-lg transition group-hover:pointer-events-auto group-hover:opacity-100 md:flex"
        aria-label="Önceki"
      >
        ‹
      </button>
      <div
        ref={scrollerRef}
        className="homepage-horizontal-scroll -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scroll-smooth sm:gap-4"
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => scroll("right")}
        className="pointer-events-none absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-lg font-bold text-slate-700 opacity-0 shadow-lg transition group-hover:pointer-events-auto group-hover:opacity-100 md:flex"
        aria-label="Sonraki"
      >
        ›
      </button>
    </div>
  );
}
