type RatingBadgeProps = {
  rating: number | string;
  className?: string;
};

function formatRatingValue(rating: number | string) {
  if (typeof rating === "number") {
    return rating.toFixed(1);
  }

  const numeric = Number.parseFloat(rating);

  if (Number.isFinite(numeric)) {
    return numeric.toFixed(1);
  }

  return String(rating);
}

export function RatingBadge({ rating, className = "" }: RatingBadgeProps) {
  return (
    <div
      className={`inline-flex min-h-[36px] items-center gap-2 rounded-full border border-amber-400/20 bg-[linear-gradient(180deg,rgba(245,158,11,0.14),rgba(245,158,11,0.06))] px-4 py-2 text-sm font-semibold text-amber-100 shadow-[0_0_0_1px_rgba(14,165,233,0.02),0_14px_32px_-22px_rgba(251,191,36,0.22)] ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4 shrink-0 text-amber-300"
        fill="currentColor"
      >
        <path d="M10 1.75l2.56 5.19 5.73.83-4.15 4.05.98 5.7L10 14.84 5.88 17.52l.98-5.7L2.71 7.77l5.73-.83L10 1.75z" />
      </svg>
      <span className="tabular-nums">{formatRatingValue(rating)}/5</span>
    </div>
  );
}

