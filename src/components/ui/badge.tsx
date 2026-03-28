import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "accent" | "muted" | "dark" | "ghost";
  className?: string;
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  const variants = {
    accent: "border border-cyan-400/18 bg-cyan-400/12 text-cyan-100",
    muted: "border border-white/10 bg-white/[0.05] text-slate-300",
    dark: "border border-white/10 bg-slate-950/78 text-slate-100",
    ghost: "border border-violet-400/16 bg-violet-400/10 text-violet-100"
  } as const;

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium leading-none",
        "max-w-full overflow-hidden truncate shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
