import clsx from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return <div className={clsx("premium-surface premium-outline rounded-[24px] border border-white/8 backdrop-blur-xl shadow-[0_24px_72px_-44px_rgba(5,10,18,0.72)]", className)}>{children}</div>;
}
