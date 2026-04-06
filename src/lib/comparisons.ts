import { tools } from "@/data/tools";
import type { Locale } from "@/i18n/config";
import { getCategoryNamesMap, getLocalizedToolBySlug } from "@/lib/catalog";
import type { LocalizedTool, ToolEntry } from "@/types/catalog";
import type { ComparisonCard as HomeComparisonCard } from "@/types/home";

type ComparableToolLike = {
  slug: string;
  featured: boolean;
  rating: number;
  categorySlugs: string[];
  toolCategorySlugs: string[];
  useCaseSlugs: string[];
  primaryCategorySlug: string;
};

const COMPARISON_CATEGORY_SLUG = "comparisons";
export const FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS = ["chatgpt", "claude", "gemini"] as const;
export const FEATURED_TRIPLE_COMPARISON_SLUG = FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.join("-vs-");
export const SPECIAL_TEAM_COMPARISON_SLUG = "cursor-vs-codeium-for-teams";
const SPECIAL_TEAM_COMPARISON_PAIR = { leftSlug: "cursor", rightSlug: "codeium" } as const;
export const SPECIAL_FREELANCER_COMPARISON_SLUG = "chatgpt-vs-jasper-for-freelancers";
const SPECIAL_FREELANCER_COMPARISON_PAIR = { leftSlug: "chatgpt", rightSlug: "jasper" } as const;
const MANUAL_COMPARISON_PAIR_TOOL_SLUGS = [
  ["cursor", "replit"],
  ["leonardo-ai", "recraft"],
  ["recraft", "midjourney"],
  ["runway", "pika"],
  ["pika", "capcut-ai"],
  ["grammarly", "quillbot"]
] as const;

const COMPARISON_BLOG_CLUSTERS: Record<string, string[]> = {
    [FEATURED_TRIPLE_COMPARISON_SLUG]: [
    "best-ai-tools-for-small-businesses-2026",
    "how-to-write-product-descriptions-with-ai-2026",
    "best-ai-tools-for-marketing-teams-2026"
  ],
  "chatgpt-vs-gemini": [
    "best-ai-tools-for-marketing-teams-2026",
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-startups-2026",
    "how-ai-tools-are-changing-ecommerce-in-2026",
    "best-ai-tools-for-agencies-2026"
  ],
  "midjourney-vs-leonardo-ai": [
    "best-ai-tools-for-marketing-teams-2026",
    "best-ai-tools-for-small-businesses-2026",
    "how-to-write-product-descriptions-with-ai-2026"
  ],
  "github-copilot-vs-codeium": [
    "best-ai-tools-for-startups-2026",
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-agencies-2026"
  ],
  "shopify-magic-vs-copy-ai": [
    "how-ai-tools-are-changing-ecommerce-in-2026",
    "best-ai-tools-for-shopify-stores-2026",
    "best-ai-tools-for-shopify-product-descriptions-2026"
  ],
  "chatgpt-vs-claude": [
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-agencies-2026",
    "how-ai-tools-are-changing-ecommerce-in-2026"
  ],
  "chatgpt-vs-jasper": [
    "best-ai-tools-to-make-money-online-2026",
    "best-ai-tools-for-freelancers-and-solo-founders-2026",
    "best-ai-tools-for-agency-delivery-2026"
  ],
  "claude-vs-gemini": [
    "best-ai-tools-for-students-projects-2026",
    "best-ai-tools-for-resume-linkedin-2026",
    "best-ai-tools-for-agency-delivery-2026"
  ],
  "chatgpt-vs-perplexity": [
    "best-ai-tools-for-small-businesses-2026",
    "how-to-write-product-descriptions-with-ai-2026",
    "best-ai-tools-for-marketing-teams-2026"
  ],
  "perplexity-vs-gemini": [
    "best-ai-tools-for-students-projects-2026",
    "best-ai-tools-for-small-businesses-2026",
    "best-ai-tools-for-agency-delivery-2026"
  ],
  "midjourney-vs-recraft": [
    "best-ai-tools-for-social-media-managers-2026",
    "best-ai-tools-for-seo-teams-2026",
    "best-ai-tools-for-small-business-owners-2026"
  ],
  "codeium-vs-cursor": [
    "best-ai-tools-for-startups-2026",
    "best-ai-tools-for-agencies-2026",
    "best-ai-tools-for-content-teams-2026"
  ],
  "cursor-vs-codeium": [
    "best-ai-tools-for-startups-2026",
    "best-ai-tools-for-agencies-2026",
    "best-ai-tools-for-content-teams-2026"
  ],
  "cursor-vs-codeium-for-teams": [
    "best-ai-tools-for-students-projects-2026",
    "best-ai-tools-for-agency-delivery-2026",
    "best-ai-tools-for-startups-2026"
  ],
  "cursor-vs-replit": [
    "best-ai-tools-for-small-businesses-2026",
    "best-ai-tools-for-marketing-teams-2026",
    "how-ai-tools-are-changing-ecommerce-in-2026"
  ],
  "replit-vs-copilot": [
    "best-ai-tools-for-startups-2026",
    "best-ai-tools-for-agencies-2026",
    "best-ai-tools-for-content-teams-2026"
  ],
  "midjourney-vs-dalle": [
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-agencies-2026",
    "best-ai-tools-for-marketing-teams-2026"
  ],
  "dalle-vs-leonardo-ai": [
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-agencies-2026",
    "best-ai-tools-for-marketing-teams-2026"
  ],
  "leonardo-ai-vs-recraft": [
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-agencies-2026",
    "best-ai-tools-for-marketing-teams-2026"
  ],
  "recraft-vs-midjourney": [
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-agencies-2026",
    "best-ai-tools-for-marketing-teams-2026"
  ],
  "runway-vs-pika": [
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-agencies-2026",
    "best-ai-tools-for-marketing-teams-2026"
  ],
  "pika-vs-capcut-ai": [
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-agencies-2026",
    "best-ai-tools-for-marketing-teams-2026"
  ],
  "grammarly-vs-quillbot": [
    "best-ai-tools-for-students-projects-2026",
    "best-ai-tools-for-agency-delivery-2026",
    "best-ai-tools-for-startups-2026"
  ],
  "notion-ai-vs-chatgpt": [
    "best-ai-tools-for-startups-2026",
    "best-ai-tools-for-content-teams-2026",
    "how-ai-tools-are-changing-ecommerce-in-2026"
  ],
  "jasper-vs-copy-ai": [
    "best-ai-tools-for-agency-delivery-2026",
    "best-ai-tools-for-marketing-teams-2026",
    "best-ai-tools-for-small-businesses-2026"
  ],
  "grammarly-vs-deepl-write": [
    "best-ai-tools-for-resume-linkedin-2026",
    "best-ai-tools-for-students-projects-2026",
    "best-ai-tools-for-agency-delivery-2026"
  ],
  default: [
    "how-ai-tools-are-changing-ecommerce-in-2026",
    "best-ai-tools-for-content-teams-2026",
    "best-ai-tools-for-agencies-2026"
  ]
};

function sharedCount(left: string[], right: string[]) {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item)).length;
}

function byCanonicalPriority(left: ComparableToolLike, right: ComparableToolLike) {
  if (left.featured !== right.featured) {
    return left.featured ? -1 : 1;
  }

  if (left.rating !== right.rating) {
    return right.rating - left.rating;
  }

  return left.slug.localeCompare(right.slug);
}

function normalizeComparableTools<T extends ComparableToolLike>(left: T, right: T): [T, T] {
  return byCanonicalPriority(left, right) <= 0 ? [left, right] : [right, left];
}

function getManualComparisonPairSlugs() {
  return MANUAL_COMPARISON_PAIR_TOOL_SLUGS.map(([leftSlug, rightSlug]) => buildComparisonPairSlug(leftSlug, rightSlug));
}

function getComparisonScore(primary: ComparableToolLike, candidate: ComparableToolLike) {
  const sharedToolCategories = sharedCount(primary.toolCategorySlugs, candidate.toolCategorySlugs);
  const sharedUseCases = sharedCount(primary.useCaseSlugs, candidate.useCaseSlugs);
  const samePrimaryCategory = primary.primaryCategorySlug === candidate.primaryCategorySlug ? 1 : 0;

  return sharedToolCategories * 10 + sharedUseCases * 3 + samePrimaryCategory * 4 + (candidate.featured ? 2 : 0) + candidate.rating;
}

export function isComparisonEligible(tool: ComparableToolLike) {
  return tool.categorySlugs.includes(COMPARISON_CATEGORY_SLUG);
}

export function areComparableTools(left: ComparableToolLike, right: ComparableToolLike) {
  if (left.slug === right.slug) {
    return false;
  }

  if (!isComparisonEligible(left) || !isComparisonEligible(right)) {
    return false;
  }

  return (
    sharedCount(left.toolCategorySlugs, right.toolCategorySlugs) > 0 ||
    left.primaryCategorySlug === right.primaryCategorySlug
  );
}

const COMPARE_SLUG_ALIASES: Record<string, string> = {
  "cursor-vs-codeium": SPECIAL_TEAM_COMPARISON_SLUG,
  "codeium-vs-cursor": SPECIAL_TEAM_COMPARISON_SLUG,
  "chatgpt-vs-jasper": SPECIAL_FREELANCER_COMPARISON_SLUG,
  "adobe-firefly-vs-midjourney": "midjourney-vs-adobe-express",
  "midjourney-vs-adobe-firefly": "midjourney-vs-adobe-express",
  "recraft-vs-midjourney": "midjourney-vs-recraft",
  "notion-ai-vs-chatgpt": "chatgpt-vs-notion-ai"
};

function normalizeComparisonPairSlug(pair: string) {
  return COMPARE_SLUG_ALIASES[pair] ?? pair;
}

export function parseComparisonPairSlug(pair: string) {
  const normalizedPair = normalizeComparisonPairSlug(pair);

  if (normalizedPair === SPECIAL_TEAM_COMPARISON_SLUG) {
    return SPECIAL_TEAM_COMPARISON_PAIR;
  }

  if (normalizedPair === SPECIAL_FREELANCER_COMPARISON_SLUG) {
    return SPECIAL_FREELANCER_COMPARISON_PAIR;
  }

  const [leftSlug, rightSlug] = normalizedPair.split("-vs-");

  if (!leftSlug || !rightSlug) {
    return null;
  }

  return { leftSlug, rightSlug };
}

export function parseComparisonSlugs(path: string) {
  const slugs = path.split("-vs-").filter(Boolean);

  return slugs.length >= 2 ? slugs : null;
}

export function buildComparisonPairSlug(leftSlug: string, rightSlug: string) {
  if ((leftSlug === "cursor" && rightSlug === "codeium") || (leftSlug === "codeium" && rightSlug === "cursor")) {
    return SPECIAL_TEAM_COMPARISON_SLUG;
  }

  const leftTool = tools.find((tool) => tool.slug === leftSlug);
  const rightTool = tools.find((tool) => tool.slug === rightSlug);

  if (!leftTool || !rightTool) {
    const ordered = [leftSlug, rightSlug].sort((a, b) => a.localeCompare(b));
    return `${ordered[0]}-vs-${ordered[1]}`;
  }

  const [left, right] = normalizeComparableTools(leftTool, rightTool);
  return `${left.slug}-vs-${right.slug}`;
}

function buildComparisonSlug(slugs: string[]) {
  if (
    slugs.length === 3 &&
    FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.every((slug) => slugs.includes(slug)) &&
    new Set(slugs).size === FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.length
  ) {
    return FEATURED_TRIPLE_COMPARISON_SLUG;
  }

  if (slugs.length === 2) {
    return buildComparisonPairSlug(slugs[0], slugs[1]);
  }

  return slugs.join("-vs-");
}

export function buildComparisonPath(locale: Locale, leftSlug: string, rightSlug: string, thirdSlug?: string) {
  const slugs = thirdSlug ? [leftSlug, rightSlug, thirdSlug] : [leftSlug, rightSlug];

  return `/${locale}/compare/${buildComparisonSlug(slugs)}`;
}

export function pickBestComparisonTarget<T extends ComparableToolLike>(primary: T, candidates: T[]) {
  const comparableCandidates = candidates
    .filter((candidate) => areComparableTools(primary, candidate))
    .sort((left, right) => {
      const scoreDifference = getComparisonScore(primary, right) - getComparisonScore(primary, left);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return byCanonicalPriority(left, right);
    });

  return comparableCandidates[0] ?? null;
}

export function getComparisonTargetSlugs(toolSlug: string, limit = 3) {
  const primaryTool = tools.find((tool) => tool.slug === toolSlug);

  if (!primaryTool) {
    return [];
  }

  return tools
    .filter((tool) => tool.slug !== toolSlug)
    .filter((tool) => areComparableTools(primaryTool, tool))
    .sort((left, right) => {
      const scoreDifference = getComparisonScore(primaryTool, right) - getComparisonScore(primaryTool, left);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return byCanonicalPriority(left, right);
    })
    .slice(0, limit)
    .map((tool) => tool.slug);
}

export function getComparisonTargetTools(locale: Locale, toolSlug: string, limit = 3) {
  return getComparisonTargetSlugs(toolSlug, limit)
    .map((slug) => getLocalizedToolBySlug(locale, slug))
    .filter((tool): tool is LocalizedTool => tool !== null);
}

export function getComparisonAlternativeTools(locale: Locale, leftSlug: string, rightSlug: string, limit = 4) {
  return getComparisonAlternativeToolsForSlugs(locale, [leftSlug, rightSlug], limit);
}

function getMultiComparisonScore(primaryTools: ComparableToolLike[], candidate: ComparableToolLike) {
  return primaryTools.reduce((score, tool) => score + getComparisonScore(tool, candidate), 0);
}

export function getComparisonAlternativeToolsForSlugs(locale: Locale, slugs: string[], limit = 4) {
  const primaryTools = slugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is ToolEntry => Boolean(tool));

  if (primaryTools.length === 0) {
    return [];
  }

  const picked = new Set(slugs);
  const alternativeSlugs = tools
    .filter((tool) => !picked.has(tool.slug))
    .filter((tool) => isComparisonEligible(tool))
    .sort((left, right) => {
      const scoreDifference = getMultiComparisonScore(primaryTools, right) - getMultiComparisonScore(primaryTools, left);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return byCanonicalPriority(left, right);
    })
    .slice(0, limit)
    .map((tool) => tool.slug);

  return alternativeSlugs
    .map((slug) => getLocalizedToolBySlug(locale, slug))
    .filter((tool): tool is LocalizedTool => tool !== null);
}

export function getStaticComparisonPairSlugs() {
  const eligibleTools = tools.filter((tool) => isComparisonEligible(tool)).sort(byCanonicalPriority);
  const pairs: string[] = [];

  for (let index = 0; index < eligibleTools.length; index += 1) {
    for (let candidateIndex = index + 1; candidateIndex < eligibleTools.length; candidateIndex += 1) {
      const left = eligibleTools[index];
      const right = eligibleTools[candidateIndex];

      if (!areComparableTools(left, right)) {
        continue;
      }

      pairs.push(buildComparisonPairSlug(left.slug, right.slug));
    }
  }

  if (!pairs.includes(SPECIAL_TEAM_COMPARISON_SLUG)) {
    pairs.push(SPECIAL_TEAM_COMPARISON_SLUG);
  }

  if (!pairs.includes(SPECIAL_FREELANCER_COMPARISON_SLUG)) {
    pairs.push(SPECIAL_FREELANCER_COMPARISON_SLUG);
  }

  for (const slug of getManualComparisonPairSlugs()) {
    if (!pairs.includes(slug)) {
      pairs.push(slug);
    }
  }

  return pairs;
}

const HIGH_INTENT_COMPARISON_DIRECTORY_SLUGS = [
  FEATURED_TRIPLE_COMPARISON_SLUG,
  'chatgpt-vs-claude',
  'chatgpt-vs-gemini',
  'claude-vs-gemini',
  'chatgpt-vs-perplexity',
  'chatgpt-vs-jasper',
  'perplexity-vs-gemini',
  'github-copilot-vs-codeium',
  'codeium-vs-cursor',
  'microsoft-copilot-vs-github-copilot',
  'cursor-vs-replit',
  'replit-vs-copilot',
  'cursor-vs-codeium-for-teams',
  'midjourney-vs-leonardo-ai',
  'midjourney-vs-dalle',
  'midjourney-vs-recraft',
  'dalle-vs-leonardo-ai',
  'leonardo-ai-vs-recraft',
  'recraft-vs-midjourney',
  'runway-vs-pika',
  'pika-vs-capcut-ai',
  'grammarly-vs-quillbot',
  'grammarly-vs-deepl-write',
  'notion-ai-vs-chatgpt',
  'jasper-vs-notion-ai',
  'jasper-vs-copy-ai',
  'shopify-magic-vs-copy-ai'
] as const;

export function getStaticComparisonSlugs() {
  return [...getStaticComparisonPairSlugs(), FEATURED_TRIPLE_COMPARISON_SLUG];
}

function buildComparisonDirectoryPairCard(locale: Locale, leftSlug: string, rightSlug: string, categoryNamesMap: Map<string, string>): HomeComparisonCard | null {
  const leftTool = getLocalizedToolBySlug(locale, leftSlug);
  const rightTool = getLocalizedToolBySlug(locale, rightSlug);

  if (!leftTool || !rightTool) {
    return null;
  }

  return {
    icon: 'VS',
    eyebrow: locale === 'tr' ? 'Karşılaştırma' : 'Comparison',
    title: leftTool.name + ' vs ' + rightTool.name,
    description:
      locale === 'tr'
        ? 'Fiyat, güçlü yönler, kullanım senaryoları ve alternatifleri tek sayfada görün.'
        : 'Review pricing, strengths, workflow fit, and alternatives on one page.',
    href: '/compare/' + buildComparisonPairSlug(leftTool.slug, rightTool.slug),
    highlight: categoryNamesMap.get(leftTool.primaryCategorySlug) ?? (locale === 'tr' ? 'Karşılaştırma' : 'Comparison')
  };
}

function buildComparisonDirectoryTripleCard(locale: Locale): HomeComparisonCard | null {
  const trio = FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.map((slug) => getLocalizedToolBySlug(locale, slug));

  if (trio.some((tool) => tool === null)) {
    return null;
  }

  const [firstTool, secondTool, thirdTool] = trio as [LocalizedTool, LocalizedTool, LocalizedTool];

  return {
    icon: 'VS',
    eyebrow: locale === 'tr' ? 'Üçlü karşılaştırma' : 'Three-way comparison',
    title: firstTool.name + ' vs ' + secondTool.name + ' vs ' + thirdTool.name,
    description:
      locale === 'tr'
        ? 'Hız, uzun form yazı ve ekosistem farklarını tek sayfada karşılaştırın.'
        : 'Compare speed, long-form writing, and ecosystem fit in one page.',
    href: '/compare/' + FEATURED_TRIPLE_COMPARISON_SLUG,
    highlight: locale === 'tr' ? 'Üçlü' : 'Three-way'
  };
}

export function getComparisonDirectoryCards(locale: Locale) {
  const categoryNamesMap = getCategoryNamesMap(locale);
  const cards: HomeComparisonCard[] = [];

  for (const slug of HIGH_INTENT_COMPARISON_DIRECTORY_SLUGS) {
    if (slug === FEATURED_TRIPLE_COMPARISON_SLUG) {
      const tripleCard = buildComparisonDirectoryTripleCard(locale);

      if (tripleCard) {
        cards.push(tripleCard);
      }

      continue;
    }

    const parsed = parseComparisonPairSlug(slug);

    if (!parsed) {
      continue;
    }

    const pairCard = buildComparisonDirectoryPairCard(locale, parsed.leftSlug, parsed.rightSlug, categoryNamesMap);

    if (pairCard) {
      cards.push(pairCard);
    }
  }

  return cards;
}

export function getComparisonToolsFromPair(locale: Locale, pair: string) {
  const parsed = parseComparisonPairSlug(pair);

  if (!parsed) {
    return null;
  }

  const leftTool = getLocalizedToolBySlug(locale, parsed.leftSlug);
  const rightTool = getLocalizedToolBySlug(locale, parsed.rightSlug);

  if (!leftTool || !rightTool) {
    return null;
  }

  const canonicalPairSlug = buildComparisonPairSlug(leftTool.slug, rightTool.slug);
  const staticPairSlugs = getStaticComparisonPairSlugs();

  if (!areComparableTools(leftTool, rightTool) && !staticPairSlugs.includes(pair) && !staticPairSlugs.includes(canonicalPairSlug)) {
    return null;
  }

  if (pair === SPECIAL_TEAM_COMPARISON_SLUG) {
    return {
      leftTool,
      rightTool,
      canonicalPairSlug: SPECIAL_TEAM_COMPARISON_SLUG,
      isCanonical: true
    };
  }

  if (pair === SPECIAL_FREELANCER_COMPARISON_SLUG || pair === "chatgpt-vs-jasper") {
    return {
      leftTool,
      rightTool,
      canonicalPairSlug: SPECIAL_FREELANCER_COMPARISON_SLUG,
      isCanonical: pair === SPECIAL_FREELANCER_COMPARISON_SLUG
    };
  }

  const canonicalLeftSlug = canonicalPairSlug.split("-vs-")[0] ?? leftTool.slug;
  const canonicalRightSlug = canonicalPairSlug.split("-vs-")[1] ?? rightTool.slug;
  const canonicalLeftTool = canonicalLeftSlug === leftTool.slug ? leftTool : rightTool;
  const canonicalRightTool = canonicalRightSlug === rightTool.slug ? rightTool : leftTool;

  return {
    leftTool: canonicalLeftTool,
    rightTool: canonicalRightTool,
    canonicalPairSlug,
    isCanonical: canonicalPairSlug === pair
  };
}

export function getComparisonRelatedBlogSlugsForSlugs(slugs: string[], limit = 3) {
  const canonicalKey =
    slugs.length === 3 &&
    FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.every((slug) => slugs.includes(slug)) &&
    new Set(slugs).size === FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.length
      ? FEATURED_TRIPLE_COMPARISON_SLUG
      : slugs.length === 2
        ? buildComparisonPairSlug(slugs[0], slugs[1])
        : slugs.join("-vs-");

  const clusteredSlugs = COMPARISON_BLOG_CLUSTERS[canonicalKey] ?? COMPARISON_BLOG_CLUSTERS.default;

  return [...new Set(clusteredSlugs)].slice(0, limit);
}

export function getComparisonPageData(locale: Locale, path: string) {
  const parsed = parseComparisonSlugs(path);

  if (!parsed) {
    return null;
  }

  if (
    parsed.length === 3 &&
    FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.every((slug) => parsed.includes(slug)) &&
    new Set(parsed).size === FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.length
  ) {
    const toolsForPage = FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.map((slug) => getLocalizedToolBySlug(locale, slug));

    if (toolsForPage.some((tool) => tool === null)) {
      return null;
    }

    return {
      kind: "triple" as const,
      tools: toolsForPage as [LocalizedTool, LocalizedTool, LocalizedTool],
      canonicalSlug: FEATURED_TRIPLE_COMPARISON_SLUG,
      isCanonical: path === FEATURED_TRIPLE_COMPARISON_SLUG
    };
  }

  if (parsed.length !== 2) {
    return null;
  }

  const comparison = getComparisonToolsFromPair(locale, path);

  return comparison ? { kind: "pair" as const, ...comparison } : null;
}

export function getComparisonRawTool(slug: string) {
  return tools.find((tool) => tool.slug === slug) ?? null;
}

export type ComparisonEligibleTool = ToolEntry;
