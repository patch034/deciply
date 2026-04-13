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
    muted: "border border-slate-200 bg-white/90 text-slate-600",
    dark: "border border-slate-300 bg-slate-900 text-white",
    ghost: "border border-sky-200 bg-sky-50 text-[#0055FF]"
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
