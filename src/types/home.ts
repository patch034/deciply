export type CategoryCard = {
  icon: string;
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  metric: string;
  bestFor: string;
};

export type ToolCard = {
  icon: string;
  logoUrl?: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
  href: string;
  websiteUrl: string;
  affiliateUrl?: string;
  rating: string;
  note: string;
  bestFor: string;
  benefit: string;
  comparisonOutcome: string;
  editorNote: string;
  useCaseTags: string[];
  notIdealFor?: string;
  ctaLabel?: string;
  socialProofBadges?: string[];
  primaryChoiceLabel?: string;
  popularityLabel?: string;
};

export type ComparisonCard = {
  icon: string;
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  highlight?: string;
  logos?: {
    name: string;
    logoUrl?: string;
  }[];
};

export type ConversionListItem = {
  icon: string;
  badge: string;
  title: string;
  description: string;
  benefit: string;
  href: string;
  ctaLabel: string;
};

export type GuideCard = {
  icon: string;
  title: string;
  description: string;
  href: string;
  tag: string;
  readTime: string;
};
