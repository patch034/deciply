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
  tone = "dark"
}: SectionHeadingProps) {
  const textClass = tone === "light" ? "text-slate-950" : "text-slate-50";
  const descriptionClass = tone === "light" ? "text-slate-700" : "text-slate-300/82";

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
          <Badge variant={tone === "light" ? "muted" : "ghost"} className={tone === "light" ? "border-slate-200 bg-slate-50 text-slate-700" : "text-cyan-200"}>
            {eyebrow}
          </Badge>
        ) : null}
        <h2 className={clsx("balance-text mt-3 max-w-3xl text-[1.72rem] font-bold tracking-[-0.035em] sm:mt-4 sm:text-[2.05rem] md:text-[2.35rem] md:leading-[1.08]", textClass)}>
          {title}
        </h2>
        {description ? (
          <p className={clsx("mt-2 max-w-2xl text-[13px] leading-6 sm:mt-3 sm:text-[14px] sm:leading-7 md:text-base md:leading-8", descriptionClass)}>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
