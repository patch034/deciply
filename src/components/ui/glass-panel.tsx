import clsx from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return <div className={clsx("premium-surface premium-outline rounded-[24px] backdrop-blur-[22px] shadow-[0_28px_86px_-52px_rgba(2,5,11,0.78)]", className)}>{children}</div>;
}

