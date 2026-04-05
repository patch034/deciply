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
    "bg-[linear-gradient(90deg,#60A5FA_0%,#3B82F6_40%,#2563EB_72%,#06B6D4_100%)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_56px_-24px_rgba(59,130,246,0.84),0_34px_92px_-38px_rgba(14,165,233,0.58)] hover:brightness-[1.06] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_30px_72px_-24px_rgba(59,130,246,0.94),0_42px_116px_-38px_rgba(14,165,233,0.72)]",
  secondary:
    "border border-sky-400/14 bg-slate-950/42 text-slate-200 hover:bg-white/[0.03] hover:text-white hover:border-cyan-400/20",
  ghost:
    "border border-cyan-400/18 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/14"
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
    "inline-flex min-h-[44px] items-center justify-center overflow-hidden rounded-[13px] px-4 py-2 text-sm font-semibold leading-none transition duration-150",
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
