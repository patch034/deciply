type CategoryIconProps = {
  slug: string;
  label: string;
  className?: string;
};

export function CategoryIcon({ slug, label, className = "" }: CategoryIconProps) {
  const path =
    slug.includes("image") || slug.includes("design")
      ? "M4 16l4-4 3 3 5-6 4 5M5 5h14v14H5z"
      : slug.includes("video")
        ? "M5 6h10v12H5zM15 10l5-3v10l-5-3z"
        : slug.includes("audio") || slug.includes("music")
          ? "M9 18V5l9-2v13M9 18a3 3 0 1 1-2-2.83M18 16a3 3 0 1 1-2-2.83"
          : slug.includes("coding")
            ? "M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"
            : slug.includes("business") || slug.includes("marketing")
              ? "M4 19V8l8-4 8 4v11M8 19v-7h8v7"
              : slug.includes("research") || slug.includes("education")
                ? "M5 6h14M5 10h14M5 14h9M5 18h6"
                : "M6 8a6 6 0 0 1 12 0v4a6 6 0 0 1-12 0zM8 19h8";

  return (
    <span className={`inline-flex items-center justify-center rounded-[14px] bg-[#0E2450] text-white ${className}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
        <path d={path} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
