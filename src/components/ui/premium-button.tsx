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
    "bg-[linear-gradient(90deg,#6D28D9_0%,#4F46E5_52%,#06B6D4_100%)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_56px_-26px_rgba(79,70,229,0.92),0_36px_96px_-38px_rgba(6,182,212,0.74)] hover:brightness-[1.12] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_28px_68px_-26px_rgba(79,70,229,0.96),0_42px_110px_-38px_rgba(6,182,212,0.82)]",
  secondary:
    "border border-slate-700/70 bg-slate-950/48 text-slate-200 hover:border-cyan-400/22 hover:bg-slate-900/72 hover:text-white",
  ghost:
    "border border-cyan-400/16 bg-cyan-400/10 text-cyan-100 hover:border-cyan-300/24 hover:bg-cyan-400/14"
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
    "inline-flex min-h-[44px] items-center justify-center overflow-hidden rounded-[12px] px-4 py-2 text-sm font-semibold leading-none transition duration-150",
    variant !== "primary" && "shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
    styles[variant],
    className
  );

  const content = <span className="inline-flex items-center justify-center gap-2">{children}</span>;

  if (href) {
    const isExternal = href.startsWith("http");

    return (
      <motion.div whileHover={{ y: -2, scale: variant === "primary" ? 1.03 : 1 }} whileTap={{ scale: 0.985 }} transition={{ duration: 0.16 }} className="inline-flex max-w-full">
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

