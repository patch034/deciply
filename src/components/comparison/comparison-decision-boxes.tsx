import Link from "next/link";

import { PremiumButton } from "@/components/ui/premium-button";

type DecisionBox = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

type ComparisonDecisionBoxesProps = {
  locale: "tr" | "en";
  leftTool: {
    name: string;
    bestUseCase: string;
    whoShouldUseSummary: string;
    pricing: string;
    slug: string;
  };
  rightTool: {
    name: string;
    bestUseCase: string;
    whoShouldUseSummary: string;
    pricing: string;
    slug: string;
  };
  alternativesHref: string;
};

function buildDecisionBoxes(locale: "tr" | "en", leftTool: ComparisonDecisionBoxesProps["leftTool"], rightTool: ComparisonDecisionBoxesProps["rightTool"], alternativesHref: string): DecisionBox[] {
  const lowerLeftBest = leftTool.bestUseCase.toLowerCase();
  const lowerRightBest = rightTool.bestUseCase.toLowerCase();
  const lowerLeftSummary = leftTool.whoShouldUseSummary.toLowerCase();
  const lowerRightSummary = rightTool.whoShouldUseSummary.toLowerCase();
  const firstAccessible = leftTool.pricing !== "PAID" ? leftTool : rightTool;
  const firstPaid = leftTool.pricing === "PAID" ? leftTool : rightTool;

  if (locale === "tr") {
    return [
      {
        title: "Kim bu aracı seçmeli?",
        description: `${leftTool.name} daha çok ${lowerLeftBest} için uygun olabilir. ${rightTool.name} ise ${lowerRightBest} ihtiyacına daha iyi oturabilir. ${lowerLeftSummary} ${lowerRightSummary}`,
        ctaLabel: `${leftTool.name} incele`,
        ctaHref: `/tr/tools/${leftTool.slug}`
      },
      {
        title: "Freelancer'lar için en uygun",
        description: `${firstAccessible.name} daha düşük giriş bariyeriyle başlamaya yardımcı olabilir. Freelancer'lar genelde ilk teslimatı hızlandıran aracı daha kolay benimser.`,
        ctaLabel: `(${firstAccessible.name}) detay`,
        ctaHref: `/tr/tools/${firstAccessible.slug}`
      },
      {
        title: "Ajanslar için en uygun",
        description: `${firstPaid.name} veya daha güçlü teslim ritmi sunan seçenek, ajans işlerinde tekrar eden üretimi daha anlamlı hale getirebilir.`,
        ctaLabel: `${firstPaid.name} incele`,
        ctaHref: `/tr/tools/${firstPaid.slug}`
      },
      {
        title: "Creator'lar için en uygun",
        description: `${leftTool.name} ve ${rightTool.name} arasında görsel, içerik veya hızlı yayın akışına en iyi uyan taraf genelde içerik üretim hızını daha fazla artıran seçenektir.`,
        ctaLabel: "Alternatifleri aç",
        ctaHref: alternativesHref
      },
      {
        title: "Öğrenciler için en uygun",
        description: `${firstAccessible.name} not, özet ve araştırma gibi akışlarda daha düşük sürtünmeyle başlamak isteyen öğrenciler için daha rahat bir başlangıç olabilir.`,
        ctaLabel: `${firstAccessible.name} aç`,
        ctaHref: `/tr/tools/${firstAccessible.slug}`
      }
    ];
  }

  return [
    {
      title: "Who should choose this tool?",
      description: `${leftTool.name} may fit ${lowerLeftBest} better, while ${rightTool.name} may suit ${lowerRightBest} workflows more closely. ${lowerLeftSummary} ${lowerRightSummary}`,
      ctaLabel: `Review ${leftTool.name}`,
      ctaHref: `/en/tools/${leftTool.slug}`
    },
    {
      title: "Best for freelancers",
      description: `${firstAccessible.name} usually works well when you want a lower-friction starting point and faster first delivery.`,
      ctaLabel: `Open ${firstAccessible.name}`,
      ctaHref: `/en/tools/${firstAccessible.slug}`
    },
    {
      title: "Best for agencies",
      description: `${firstPaid.name} or the stronger repeatability option usually makes more sense when client delivery and scale matter.`,
      ctaLabel: `Review ${firstPaid.name}`,
      ctaHref: `/en/tools/${firstPaid.slug}`
    },
    {
      title: "Best for creators",
      description: `If your workflow is content-heavy or visual, the better option is usually the one that speeds up output without adding friction.`,
      ctaLabel: "Open alternatives",
      ctaHref: alternativesHref
    },
    {
      title: "Best for students",
      description: `${firstAccessible.name} can be a practical starting point for notes, summaries, and research-heavy work when you want lower friction.`,
      ctaLabel: `Open ${firstAccessible.name}`,
      ctaHref: `/en/tools/${firstAccessible.slug}`
    }
  ];
}

export function ComparisonDecisionBoxes({ locale, leftTool, rightTool, alternativesHref }: ComparisonDecisionBoxesProps) {
  const boxes = buildDecisionBoxes(locale, leftTool, rightTool, alternativesHref);

  return (
    <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {locale === "tr" ? "Karar kutuları" : "Decision boxes"}
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
          {locale === "tr" ? "Kim hangi aracı seçmeli?" : "Who should choose what?"}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">
          {locale === "tr"
            ? "Bu kısa kutular, hangi kullanıcı tipinin hangi aracı daha rahat benimseyeceğini hızlıca gösterir."
            : "These short boxes show which user type is more likely to benefit from each option faster."}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {boxes.map((box) => (
          <div key={box.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-base font-semibold text-slate-50">{box.title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{box.description}</p>
            <div className="mt-5">
              {box.ctaHref.startsWith("/") ? (
                <Link
                  href={box.ctaHref}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.08] px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.14] hover:text-cyan-100"
                >
                  {box.ctaLabel}
                </Link>
              ) : (
                <PremiumButton href={box.ctaHref} variant="ghost">
                  {box.ctaLabel}
                </PremiumButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
