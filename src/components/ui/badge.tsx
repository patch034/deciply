import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "accent" | "muted" | "dark" | "ghost";
  className?: string;
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  const variants = {
    accent: "border border-cyan-400/20 bg-cyan-400/14 text-cyan-100 shadow-[0_10px_24px_-18px_rgba(34,211,238,0.36)]",
    muted: "border border-slate-700/70 bg-slate-950/52 text-slate-200",
    dark: "border border-slate-700/70 bg-[linear-gradient(180deg,rgba(10,16,28,0.98),rgba(5,9,17,0.98))] text-slate-100",
    ghost: "border border-violet-400/18 bg-violet-400/10 text-violet-100"
  } as const;

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium leading-none",
        "max-w-full overflow-hidden truncate shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

