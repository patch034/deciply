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
      className={[
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "mx-auto max-w-3xl text-center md:items-center",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={["max-w-3xl min-w-0", align === "center" && "mx-auto"].filter(Boolean).join(" ")}>
        {eyebrow ? <Badge variant="accent" className="shadow-[0_10px_24px_-18px_rgba(34,211,238,0.36)]">{eyebrow}</Badge> : null}
        <h2 className="balance-text mt-4 max-w-3xl text-[1.9rem] font-bold tracking-[-0.04em] text-slate-50 sm:text-[2.15rem] md:text-[2.45rem] md:leading-[1.06]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-slate-300/84 sm:text-[15px] sm:leading-7 md:text-base md:leading-8">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}

