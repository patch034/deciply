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
    "bg-[linear-gradient(90deg,#C084FC_0%,#8B5CF6_38%,#6366F1_68%,#38BDF8_100%)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_24px_56px_-24px_rgba(139,92,246,0.88),0_34px_92px_-38px_rgba(59,130,246,0.64)] hover:brightness-[1.1] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_72px_-24px_rgba(139,92,246,0.96),0_42px_116px_-38px_rgba(244,114,182,0.78)]",
  secondary:
    "border border-violet-400/14 bg-slate-950/42 text-slate-200 hover:bg-white/[0.04] hover:text-white hover:border-fuchsia-400/20",
  ghost:
    "border border-fuchsia-400/16 bg-fuchsia-400/10 text-fuchsia-100 hover:bg-fuchsia-400/14"
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
    "inline-flex min-h-[44px] items-center justify-center overflow-hidden rounded-[14px] px-4 py-2 text-sm font-semibold leading-none transition duration-150",
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
