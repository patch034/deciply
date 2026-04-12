import clsx from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={clsx(
        "ui-card ui-card-hover rounded-2xl backdrop-blur-2xl shadow-[0_28px_84px_-52px_rgba(37,99,235,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}
