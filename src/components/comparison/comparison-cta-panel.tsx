import { ComparisonActionGrid } from "@/components/comparison/comparison-action-grid";
import { RatingBadge } from "@/components/ui/rating-badge";
import type { Locale } from "@/i18n/config";

type ComparisonCtaTool = {
  name: string;
  rating: number;
  openHref: string;
  reviewHref: string;
};

type ComparisonCtaPanelProps = {
  locale: Locale;
  tools: ComparisonCtaTool[];
  neutralHref: string;
  className?: string;
};

export function ComparisonCtaPanel({ locale, tools, neutralHref, className = "" }: ComparisonCtaPanelProps) {
  const columnsClass = tools.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.64),rgba(15,23,42,0.36))] p-5 shadow-[0_18px_50px_-36px_rgba(34,211,238,0.18)] sm:p-6 ${className}`}>
      <div className={`grid gap-2 ${columnsClass}`}>
        {tools.map((tool) => (
          <div key={tool.name} className="flex justify-start">
            <RatingBadge rating={tool.rating} />
          </div>
        ))}
      </div>

      <ComparisonActionGrid locale={locale} tools={tools} neutralHref={neutralHref} className="mt-3" />
    </div>
  );
}
