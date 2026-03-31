import { tools } from "@/data/tools";
import type { Locale } from "@/i18n/config";
import { getLocalizedToolBySlug } from "@/lib/catalog";
import type { LocalizedTool, ToolEntry } from "@/types/catalog";

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

export function parseComparisonPairSlug(pair: string) {
  const [leftSlug, rightSlug] = pair.split("-vs-");

  if (!leftSlug || !rightSlug) {
    return null;
  }

  return { leftSlug, rightSlug };
}

export function buildComparisonPairSlug(leftSlug: string, rightSlug: string) {
  const leftTool = tools.find((tool) => tool.slug === leftSlug);
  const rightTool = tools.find((tool) => tool.slug === rightSlug);

  if (!leftTool || !rightTool) {
    const ordered = [leftSlug, rightSlug].sort((a, b) => a.localeCompare(b));
    return `${ordered[0]}-vs-${ordered[1]}`;
  }

  const [left, right] = normalizeComparableTools(leftTool, rightTool);
  return `${left.slug}-vs-${right.slug}`;
}

export function buildComparisonPath(locale: Locale, leftSlug: string, rightSlug: string) {
  return `/${locale}/compare/${buildComparisonPairSlug(leftSlug, rightSlug)}`;
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
  const picked = new Set([leftSlug, rightSlug]);
  const alternativeSlugs = [...getComparisonTargetSlugs(leftSlug, limit + 2), ...getComparisonTargetSlugs(rightSlug, limit + 2)]
    .filter((slug) => {
      if (picked.has(slug)) {
        return false;
      }

      picked.add(slug);
      return true;
    })
    .slice(0, limit);

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

  return pairs;
}

export function getComparisonToolsFromPair(locale: Locale, pair: string) {
  const parsed = parseComparisonPairSlug(pair);

  if (!parsed) {
    return null;
  }

  const leftTool = getLocalizedToolBySlug(locale, parsed.leftSlug);
  const rightTool = getLocalizedToolBySlug(locale, parsed.rightSlug);

  if (!leftTool || !rightTool || !areComparableTools(leftTool, rightTool)) {
    return null;
  }

  const canonicalPairSlug = buildComparisonPairSlug(leftTool.slug, rightTool.slug);
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

export function getComparisonRawTool(slug: string) {
  return tools.find((tool) => tool.slug === slug) ?? null;
}

export type ComparisonEligibleTool = ToolEntry;