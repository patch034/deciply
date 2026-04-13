import clsx from "clsx";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
  tone = "light"
}: SectionHeadingProps) {
  const textClass = tone === "light" ? "text-slate-950" : "text-slate-50";
  const descriptionClass = tone === "light" ? "text-slate-700" : "text-slate-300/82";
  const badgeClass = tone === "light" ? "border-sky-200 bg-sky-50 text-[#0055FF]" : "border-sky-400/10 bg-slate-950/50 text-cyan-200";

  return (
    <div
      className={clsx(
        "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
        align === "center" && "mx-auto max-w-3xl text-center md:items-center",
        className
      )}
    >
      <div className={clsx("max-w-3xl min-w-0", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <Badge variant="muted" className={badgeClass}>
            {eyebrow}
          </Badge>
        ) : null}
        <h2 className={clsx("balance-text mt-3 max-w-3xl text-[1.8rem] font-bold tracking-[-0.04em] sm:mt-4 sm:text-[2.18rem] md:text-[2.5rem] md:leading-[1.06]", textClass)}>
          {title}
        </h2>
        {description ? (
          <p className={clsx("mt-2 max-w-2xl text-[13px] leading-6 sm:mt-3 sm:text-[14px] sm:leading-7 md:text-[1rem] md:leading-8", descriptionClass)}>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
