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
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "mx-auto max-w-3xl text-center md:items-center",
        className
      )}
    >
      <div className={clsx("max-w-3xl min-w-0", align === "center" && "mx-auto")}>
        {eyebrow ? <Badge variant="ghost" className="text-cyan-200">{eyebrow}</Badge> : null}
        <h2 className="balance-text mt-4 max-w-3xl text-[1.9rem] font-bold tracking-[-0.035em] text-slate-50 sm:text-[2.15rem] md:text-[2.4rem] md:leading-[1.08]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-slate-300/82 sm:text-[15px] sm:leading-7 md:text-base md:leading-8">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
