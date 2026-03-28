import clsx from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return <div className={clsx("premium-surface premium-outline rounded-2xl border border-white/10 backdrop-blur-2xl", className)}>{children}</div>;
}
