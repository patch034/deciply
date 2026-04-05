import clsx from "clsx";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/ui/section-heading";

type SectionShellProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  align?: "left" | "center";
};

export function SectionShell({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
  align = "left"
}: SectionShellProps) {
  return (
    <section className={clsx("relative mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>
      <div className="relative overflow-hidden rounded-[32px] border border-slate-700/55 bg-[linear-gradient(180deg,rgba(7,11,20,0.92),rgba(4,7,13,0.98))] px-4 py-5 shadow-[0_32px_96px_-56px_rgba(2,5,11,0.88)] sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-violet-500/8 blur-3xl" />
        {title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            actions={actions}
            align={align}
            className="relative mb-6 sm:mb-8"
          />
        ) : null}
        <div className={clsx("relative", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}

