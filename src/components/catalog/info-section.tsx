import clsx from "clsx";
import type { ReactNode } from "react";

type InfoSectionProps = {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function InfoSection({ id, title, description, children, className, tone = "dark" }: InfoSectionProps) {
  const isLight = tone === "light";

  return (
    <section
      id={id}
      className={clsx(
        "rounded-[28px] border p-6 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)] md:p-8",
        isLight
          ? "border-slate-200/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.99))]"
          : "border-sky-400/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))]",
        className
      )}
    >
      <h2 className={clsx("text-2xl font-bold tracking-tight", isLight ? "text-slate-950" : "text-slate-50")}>{title}</h2>
      {description ? <p className={clsx("mt-3 text-base leading-7", isLight ? "text-slate-600" : "text-slate-300")}>{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}
