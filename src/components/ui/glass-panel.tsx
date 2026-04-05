import clsx from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return <div className={clsx("premium-surface premium-outline rounded-2xl border border-sky-400/10 backdrop-blur-2xl shadow-[0_28px_84px_-52px_rgba(14,165,233,0.12)]", className)}>{children}</div>;
}
