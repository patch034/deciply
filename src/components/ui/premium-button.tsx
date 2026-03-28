"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type PremiumButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
};

const styles = {
  primary:
    "bg-[linear-gradient(90deg,#6C5CE7_0%,#4F7CFF_55%,#00C2FF_100%)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_56px_-24px_rgba(108,92,231,0.86),0_34px_92px_-38px_rgba(0,194,255,0.62)] hover:brightness-[1.2] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_30px_72px_-24px_rgba(108,92,231,0.94),0_42px_116px_-38px_rgba(0,194,255,0.72)]",
  secondary:
    "border border-white/10 bg-white/[0.025] text-slate-300/82 hover:bg-white/[0.04] hover:text-slate-200 hover:border-white/14",
  ghost:
    "border border-cyan-400/14 bg-cyan-400/8 text-cyan-100 hover:bg-cyan-400/12"
} as const;

export function PremiumButton({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  target,
  rel
}: PremiumButtonProps) {
  const classes = clsx(
    "inline-flex h-10 items-center justify-center overflow-hidden rounded-[10px] px-4 py-0 text-sm font-semibold leading-none transition duration-150",
    variant !== "primary" && "shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
    styles[variant],
    className
  );

  const content = <span className="inline-flex items-center justify-center gap-2">{children}</span>;

  if (href) {
    const isExternal = href.startsWith("http");

    return (
      <motion.div whileHover={{ y: -2, scale: variant === "primary" ? 1.03 : 1 }} whileTap={{ scale: 0.985 }} transition={{ duration: 0.16 }} className="inline-flex">
        {isExternal ? (
          <a href={href} target={target} rel={rel} className={classes}>
            {content}
          </a>
        ) : (
          <Link href={href} className={classes}>
            {content}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.button type={type} className={classes} whileHover={{ y: -2, scale: variant === "primary" ? 1.03 : 1 }} whileTap={{ scale: 0.985 }} transition={{ duration: 0.16 }}>
      {content}
    </motion.button>
  );
}
