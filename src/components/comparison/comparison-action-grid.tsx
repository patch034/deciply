import clsx from "clsx";

import { PremiumButton } from "@/components/ui/premium-button";
import type { Locale } from "@/i18n/config";

type ComparisonActionTool = {
  name: string;
  openHref: string;
  reviewHref: string;
};

type ComparisonActionGridProps = {
  locale: Locale;
  tools: ComparisonActionTool[];
  neutralHref: string;
  neutralLabel?: string;
  className?: string;
};

function getOpenLabel(locale: Locale, toolName: string) {
  return locale === "tr" ? `${toolName} a\u00e7` : `Open ${toolName}`;
}

function getReviewLabel(locale: Locale, toolName: string) {
  return locale === "tr" ? `${toolName} incele` : `Review ${toolName}`;
}

function getNeutralLabel(locale: Locale, neutralLabel?: string) {
  if (neutralLabel) {
    return neutralLabel;
  }

  return locale === "tr" ? "Alternatifleri kar\u015f\u0131la\u015ft\u0131r" : "Compare alternatives";
}

export function ComparisonActionGrid({ locale, tools, neutralHref, neutralLabel, className }: ComparisonActionGridProps) {
  const columnsClass = tools.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  const finalColumnsClass = tools.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={clsx("grid gap-3", className)}>
      <div className={clsx("grid gap-2.5", columnsClass)}>
        {tools.map((tool) => (
          <PremiumButton
            key={`open-${tool.name}-${tool.openHref}`}
            href={tool.openHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            variant="primary"
          >
            {getOpenLabel(locale, tool.name)}
          </PremiumButton>
        ))}
      </div>
      <div className={clsx("grid gap-2.5", finalColumnsClass)}>
        {tools.map((tool) => (
          <PremiumButton key={`review-${tool.name}-${tool.reviewHref}`} href={tool.reviewHref} className="w-full" variant="secondary">
            {getReviewLabel(locale, tool.name)}
          </PremiumButton>
        ))}
      </div>
      <div className="flex justify-center">
        <PremiumButton href={neutralHref} className="w-full sm:max-w-sm" variant="secondary">
          {getNeutralLabel(locale, neutralLabel)}
        </PremiumButton>
      </div>
    </div>
  );
}
