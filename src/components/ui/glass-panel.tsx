import clsx from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return <div className={clsx("premium-surface premium-outline rounded-2xl border border-violet-400/14 backdrop-blur-2xl shadow-[0_28px_84px_-52px_rgba(124,58,237,0.22),0_18px_60px_-48px_rgba(244,114,182,0.12)]", className)}>{children}</div>;
}
