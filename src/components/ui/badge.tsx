import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "accent" | "muted" | "dark" | "ghost";
  className?: string;
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  const variants = {
    accent: "border border-fuchsia-400/20 bg-[linear-gradient(180deg,rgba(244,114,182,0.16),rgba(124,58,237,0.12))] text-fuchsia-100 shadow-[0_10px_24px_-18px_rgba(244,114,182,0.34)]",
    muted: "border border-violet-400/14 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(5,9,17,0.98))] text-slate-100",
    dark: "border border-violet-400/18 bg-[linear-gradient(180deg,rgba(10,16,28,0.98),rgba(5,9,17,0.98))] text-slate-50",
    ghost: "border border-fuchsia-400/18 bg-fuchsia-400/10 text-fuchsia-100"
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

