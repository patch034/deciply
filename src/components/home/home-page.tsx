import { HeroSection } from "@/components/home/hero-section";
import { HomeDirectoryShell } from "@/components/home/home-directory-shell";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { getLocalizedCategories, getLocalizedTools } from "@/lib/catalog";

type HomePageProps = {
  locale: Locale;
  content: HomeContent;
};

function buildPopularTools(locale: Locale) {
  return [...getLocalizedTools(locale)]
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      if (left.rating !== right.rating) {
        return right.rating - left.rating;
      }

      return left.slug.localeCompare(right.slug);
    });
}

export async function HomePage({ locale, content }: HomePageProps) {
  const categories = getLocalizedCategories(locale);
  const tools = buildPopularTools(locale);

  return (
    <div className="ui-page-shell relative min-h-screen overflow-x-clip pb-12 text-slate-900 sm:pb-16 lg:pb-20">
      <HeroSection locale={locale} content={content.hero} />
      <HomeDirectoryShell
        locale={locale}
        categories={categories}
        tools={tools}
      />
    </div>
  );
}
