import { Badge } from "@/components/ui/badge";
import { RatingBadge } from "@/components/ui/rating-badge";

type ToolMetaPanelProps = {
  pricingLabel: string;
  pricingValue: string;
  ratingLabel: string;
  ratingValue: string;
  categoryTagsLabel: string;
  categories: string[];
};

export function ToolMetaPanel({
  pricingLabel,
  pricingValue,
  ratingLabel,
  ratingValue,
  categoryTagsLabel,
  categories
}: ToolMetaPanelProps) {
  return (
    <aside className="rounded-[28px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)]">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{pricingLabel}</p>
          <div className="mt-3">
            <Badge variant="accent">{pricingValue}</Badge>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{ratingLabel}</p>
          <RatingBadge rating={ratingValue} className="mt-3 w-fit" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{categoryTagsLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}




