import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "accent" | "muted" | "dark" | "ghost";
  className?: string;
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  const variants = {
    accent: "border border-sky-200 bg-sky-50 text-[#0055FF]",
    muted: "border border-slate-200 bg-white text-slate-600",
    dark: "border border-slate-300 bg-slate-900 text-white",
    ghost: "border border-blue-100 bg-blue-50 text-[#0E2450]"
  } as const;

  return (
    <span
      className={clsx(
        "inline-flex max-w-full items-center justify-center truncate whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
