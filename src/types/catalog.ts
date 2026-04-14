import type { ContentLocale, Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;
export type LocalizedStringList = Record<Locale, string[]>;

export type PricingTier = "FREE" | "FREEMIUM" | "PAID";

export type MoneyUseCase = {
  title: string;
  description: string;
};

export type RealUseCaseExample = {
  title: string;
  description: string;
};

export type CategoryEntry = {
  slug: string;
  locales: Record<
    ContentLocale,
    {
      name: string;
      description: string;
      supportText: string;
      seoTitle: string;
      seoDescription: string;
    }
  >;
};

export type ToolCompareProfile = {
  slug: string;
  name: string;
  category: string;
  pricingModel: string;
  freeTier: boolean;
  bestFor: string[];
  strengths: string[];
  weaknesses: string[];
  speedScore: number;
  easeOfUseScore: number;
  outputQualityScore: number;
  studentScore: number;
  businessScore: number;
  creatorScore: number;
  valueScore: number;
};

export type ToolEntry = {
  slug: string;
  pricing: PricingTier;
  websiteUrl: string;
  affiliateUrl: string;
  primaryCategorySlug: string;
  categorySlugs: string[];
  toolCategorySlugs: string[];
  useCaseSlugs: string[];
  rating: number;
  featured: boolean;
  compareProfile?: ToolCompareProfile;
  locales: Record<
    ContentLocale,
    {
      name: string;
      shortDescription: string;
      longDescription: string;
      bestUseCase: string;
      whoShouldUse: string[];
      moneyUseCases: MoneyUseCase[];
      features: string[];
      pros: string[];
      cons: string[];
      seoTitle: string;
      seoDescription: string;
    }
  >;
};

export type LocalizedCategory = {
  slug: string;
  name: string;
  description: string;
  supportText: string;
  seoTitle: string;
  seoDescription: string;
};

export type LocalizedTool = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  whatItActuallyDoes: string;
  whoShouldUseSummary: string;
  realUseCaseExample: RealUseCaseExample;
  bestUseCase: string;
  whoShouldUse: string[];
  moneyUseCases: MoneyUseCase[];
  pricing: PricingTier;
  websiteUrl: string;
  affiliateUrl: string;
  primaryCategorySlug: string;
  categorySlugs: string[];
  toolCategorySlugs: string[];
  useCaseSlugs: string[];
  rating: number;
  featured: boolean;
  compareProfile: ToolCompareProfile;
  features: string[];
  pros: string[];
  cons: string[];
  seoTitle: string;
  seoDescription: string;
};
