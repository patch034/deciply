type CategoryIconProps = {
  slug: string;
  label: string;
  className?: string;
};

type IconDefinition = {
  paths: string[];
  circles?: Array<{ cx: number; cy: number; r: number }>;
};

const icons: Record<string, IconDefinition> = {
  ai: {
    paths: ["M12 3v3", "M12 18v3", "M3 12h3", "M18 12h3", "M7.8 7.8l-2.1-2.1", "M18.3 18.3l-2.1-2.1", "M16.2 7.8l2.1-2.1", "M5.7 18.3l2.1-2.1", "M8.5 12a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0"]
  },
  bot: {
    paths: ["M12 8V4", "M7 8h10a3 3 0 0 1 3 3v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5a3 3 0 0 1 3-3Z", "M9 13h.01", "M15 13h.01", "M9.5 17h5"]
  },
  pen: {
    paths: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z"]
  },
  image: {
    paths: ["M5 5h14v14H5z", "M8 15l3-3 2 2 3-4 3 5", "M8.5 8.5h.01"]
  },
  music: {
    paths: ["M9 18V6l10-2v12", "M9 18a3 3 0 1 1-2.4-2.94", "M19 16a3 3 0 1 1-2.4-2.94"]
  },
  mic: {
    paths: ["M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z", "M19 11a7 7 0 0 1-14 0", "M12 18v3", "M8 21h8"]
  },
  palette: {
    paths: ["M12 3a9 9 0 0 0 0 18h1.2a2.2 2.2 0 0 0 1.6-3.7 1.6 1.6 0 0 1 1.2-2.7H18a3 3 0 0 0 3-3A8.7 8.7 0 0 0 12 3Z", "M7.5 10.5h.01", "M10 7.5h.01", "M14 7.5h.01", "M16.5 10.5h.01"]
  },
  megaphone: {
    paths: ["M4 13h3l9 4V7l-9 4H4v2Z", "M7 13l1 5", "M19 9.5a4.5 4.5 0 0 1 0 5"]
  },
  shield: {
    paths: ["M12 3l7 3v5c0 4.5-2.8 8.4-7 10-4.2-1.6-7-5.5-7-10V6l7-3Z", "M9 12l2 2 4-4"]
  },
  code: {
    paths: ["M8 9l-4 3 4 3", "M16 9l4 3-4 3", "M14 5l-4 14"]
  },
  video: {
    paths: ["M5 7h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5z", "M17 10l4-2v8l-4-2"]
  },
  home: {
    paths: ["M4 11l8-7 8 7", "M6 10v10h12V10", "M10 20v-6h4v6"]
  },
  scale: {
    paths: ["M12 3v18", "M5 7h14", "M6 7l-3 6h6L6 7Z", "M18 7l-3 6h6l-3-6Z"]
  },
  briefcase: {
    paths: ["M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2", "M4 7h16v12H4z", "M4 12h16"]
  },
  heart: {
    paths: ["M20.8 8.6a5 5 0 0 0-8.8-3.2 5 5 0 0 0-8.8 3.2c0 5.6 8.8 10.4 8.8 10.4s8.8-4.8 8.8-10.4Z"]
  },
  search: {
    paths: ["M21 21l-4.4-4.4", "M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"]
  },
  book: {
    paths: ["M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z", "M4 5.5V21", "M8 7h8"]
  },
  building: {
    paths: ["M4 21h16", "M6 21V5h8v16", "M14 9h4v12", "M9 8h.01", "M11.5 8h.01", "M9 12h.01", "M11.5 12h.01"]
  },
  table: {
    paths: ["M4 5h16v14H4z", "M4 10h16", "M10 5v14"]
  },
  tag: {
    paths: ["M20 13l-7 7L4 11V4h7l9 9Z", "M8 8h.01"]
  },
  chart: {
    paths: ["M4 19V5", "M4 19h16", "M8 16v-5", "M12 16V8", "M16 16v-8"]
  },
  wallet: {
    paths: ["M4 7h15a2 2 0 0 1 2 2v9H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12", "M16 13h.01"]
  }
};

const iconBySlug: Record<string, string> = {
  "ai-tools": "ai",
  "writing-editing": "pen",
  "image-generation-editing": "image",
  "image-analysis": "search",
  "music-audio": "music",
  "audio-generation-conversion": "mic",
  "art-creative-design": "palette",
  "social-media": "megaphone",
  "ai-detection-and-undetection": "shield",
  "coding-development": "code",
  "video-animation": "video",
  "daily-life": "home",
  "law-finance": "scale",
  "business-management": "briefcase",
  "marketing-advertising": "megaphone",
  "health-wellness": "heart",
  "business-research": "search",
  "education-translation": "book",
  "chatbots-virtual-companions": "bot",
  "interior-architecture-design": "building",
  "office-productivity": "table",
  "research-data-analysis": "chart",
  other: "tag",
  "make-money-with-ai": "wallet",
  comparisons: "scale",
  "free-tools": "tag",
  guides: "book"
};

export function CategoryIcon({ slug, label, className = "" }: CategoryIconProps) {
  const icon = icons[iconBySlug[slug] ?? "ai"];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-[15px] border border-sky-100 bg-sky-50 text-[#0055FF] shadow-[0_10px_24px_rgba(37,99,235,0.09)] transition group-hover:border-sky-200 group-hover:bg-white group-hover:text-[#0E2450] ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
        {icon.paths.map((path) => (
          <path key={path} d={path} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {icon.circles?.map((circle) => (
          <circle key={`${circle.cx}-${circle.cy}-${circle.r}`} cx={circle.cx} cy={circle.cy} r={circle.r} />
        ))}
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
