import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "accent" | "muted" | "dark" | "ghost";
  className?: string;
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  const variants = {
    accent: "border border-sky-400/16 bg-sky-400/10 text-sky-100",
    muted: "border border-sky-400/12 bg-slate-950/68 text-slate-200",
    dark: "border border-sky-400/14 bg-slate-950/84 text-slate-100",
    ghost: "border border-cyan-400/18 bg-cyan-400/10 text-cyan-100"
  } as const;

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium leading-none",
        "max-w-full overflow-hidden truncate shadow-[inset_0_1px_0_rgba(56,189,248,0.04)]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
