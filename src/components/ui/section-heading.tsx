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
  const titleClass = tone === "light" ? "text-slate-950" : "text-slate-50";
  const descriptionClass = tone === "light" ? "text-slate-600" : "text-slate-300/84";

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "mx-auto max-w-3xl text-center md:items-center",
        className
      )}
    >
      <div className={clsx("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <Badge variant={tone === "light" ? "ghost" : "accent"}>{eyebrow}</Badge>
        ) : null}
        <h2 className={clsx("balance-text mt-3 text-[1.7rem] font-bold tracking-[-0.05em] sm:text-[2rem] md:text-[2.25rem] md:leading-[1.05]", titleClass)}>
          {title}
        </h2>
        {description ? (
          <p className={clsx("mt-3 max-w-2xl text-sm leading-7 md:text-[0.97rem]", descriptionClass)}>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
