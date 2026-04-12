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
  tone?: "dark" | "light";
};

export function SectionShell({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
  align = "left",
  tone = "light"
}: SectionShellProps) {
  return (
    <section className={clsx("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>
      {title ? (
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={actions}
          align={align}
          tone={tone}
          className="mb-5 sm:mb-7"
        />
      ) : null}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
