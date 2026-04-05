import clsx from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return <div className={clsx("premium-surface premium-outline !border !border-violet-400/14 !bg-[linear-gradient(180deg,rgba(10,15,29,0.92),rgba(4,6,12,0.98))] rounded-[24px] backdrop-blur-[22px] !shadow-[0_30px_90px_-56px_rgba(2,5,11,0.78),0_0_0_1px_rgba(129,140,248,0.04)]", className)}>{children}</div>;
}

