import Link from "next/link";

import { PremiumButton } from "@/components/ui/premium-button";

type DecisionBox = {
  title: string;
  description: string;
  leftButtonLabel: string;
  leftButtonHref: string;
  rightButtonLabel: string;
  rightButtonHref: string;
};

type ComparisonDecisionBoxesProps = {
  locale: "tr" | "en" | "ar" | "ru" | "zh" | "ja" | "ko" | "el" | "da" | "fa";
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

function buildDecisionBoxes(
  locale: "tr" | "en" | "ar" | "ru" | "zh" | "ja" | "ko" | "el" | "da" | "fa",
  leftTool: ComparisonDecisionBoxesProps["leftTool"],
  rightTool: ComparisonDecisionBoxesProps["rightTool"],
  alternativesHref: string
): DecisionBox[] {
  const leftButtonLabel = locale === "tr" ? `${leftTool.name} aç` : `Open ${leftTool.name}`;
  const rightButtonLabel = locale === "tr" ? `${rightTool.name} aç` : `Open ${rightTool.name}`;
  const helperLabel = locale === "tr" ? "İlgili alternatifleri gör" : "View related alternatives";

  if (locale === "tr") {
    return [
      {
        title: "Workflow uyumu",
        description: `${leftTool.name} ${leftTool.bestUseCase.toLowerCase()} tarafında, ${rightTool.name} ise ${rightTool.bestUseCase.toLowerCase()} tarafında daha doğal hissedebilir. Bugünkü iş akışına en az sürtünme ekleyen aracı test et.`,
        leftButtonLabel,
        leftButtonHref: `/tr/tools/${leftTool.slug}`,
        rightButtonLabel,
        rightButtonHref: `/tr/tools/${rightTool.slug}`
      },
      {
        title: "Freelancer akışı",
        description: `Freelance işlerde hız, ilk teslim süresi ve revizyon kolaylığı önemlidir. İki aracı da aynı brief ile açıp hangisinin daha rahat başladığını kontrol et.`,
        leftButtonLabel,
        leftButtonHref: `/tr/tools/${leftTool.slug}`,
        rightButtonLabel,
        rightButtonHref: `/tr/tools/${rightTool.slug}`
      },
      {
        title: "Ajans kullanımı",
        description: `Ajans işlerinde tekrar üretilebilir çıktı, ekip içi paylaşım ve tutarlı kalite daha önemlidir. İki aracı da müşteri akışı üzerinden yan yana değerlendirin.`,
        leftButtonLabel,
        leftButtonHref: `/tr/tools/${leftTool.slug}`,
        rightButtonLabel,
        rightButtonHref: `/tr/tools/${rightTool.slug}`
      },
      {
        title: "Creator akışı",
        description: `Creator tarafında hız, ton ve içerik ritmi öne çıkar. ${leftTool.name} ile ${rightTool.name}'i aynı içerik brief'i üzerinde test etmek en net sinyali verir.`,
        leftButtonLabel,
        leftButtonHref: `/tr/tools/${leftTool.slug}`,
        rightButtonLabel,
        rightButtonHref: `/tr/tools/${rightTool.slug}`
      },
      {
        title: "Öğrenci kullanımı",
        description: `Öğrenciler için maliyet, kolay başlangıç ve araştırma desteği önemlidir. İki aracı da kısa bir not, özet veya araştırma akışıyla dene.`,
        leftButtonLabel,
        leftButtonHref: `/tr/tools/${leftTool.slug}`,
        rightButtonLabel,
        rightButtonHref: `/tr/tools/${rightTool.slug}`
      }
    ];
  }

  return [
    {
      title: "Workflow fit",
      description: `${leftTool.name} can feel more natural for ${leftTool.bestUseCase.toLowerCase()}, while ${rightTool.name} may align better with ${rightTool.bestUseCase.toLowerCase()}. Test the one that creates the least friction in your current workflow.`,
      leftButtonLabel,
      leftButtonHref: `/en/tools/${leftTool.slug}`,
      rightButtonLabel,
      rightButtonHref: `/en/tools/${rightTool.slug}`
    },
    {
      title: "Freelancer workflow",
      description: `Freelance work usually comes down to speed, first delivery time, and easy revisions. Open both tools against the same brief and see which one starts faster.`,
      leftButtonLabel,
      leftButtonHref: `/en/tools/${leftTool.slug}`,
      rightButtonLabel,
      rightButtonHref: `/en/tools/${rightTool.slug}`
    },
    {
      title: "Agency workflow",
      description: `Agencies usually care more about repeatable output, team sharing, and consistent quality. Review both tools against the same client workflow.`,
      leftButtonLabel,
      leftButtonHref: `/en/tools/${leftTool.slug}`,
      rightButtonLabel,
      rightButtonHref: `/en/tools/${rightTool.slug}`
    },
    {
      title: "Creator workflow",
      description: `For creators, speed, tone, and publishing rhythm matter most. Testing both tools on the same content brief usually gives the clearest signal.`,
      leftButtonLabel,
      leftButtonHref: `/en/tools/${leftTool.slug}`,
      rightButtonLabel,
      rightButtonHref: `/en/tools/${rightTool.slug}`
    },
    {
      title: "Student workflow",
      description: `For students, cost, ease of start, and research support matter most. Try both tools with a short note, summary, or research task.`,
      leftButtonLabel,
      leftButtonHref: `/en/tools/${leftTool.slug}`,
      rightButtonLabel,
      rightButtonHref: `/en/tools/${rightTool.slug}`
    }
  ];
}

export function ComparisonDecisionBoxes({ locale, leftTool, rightTool, alternativesHref }: ComparisonDecisionBoxesProps) {
  const boxes = buildDecisionBoxes(locale, leftTool, rightTool, alternativesHref);
  const helperLabel = locale === "tr" ? "İlgili alternatifleri gör" : "View related alternatives";

  return (
    <section className="rounded-[32px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-5 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)] md:p-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{locale === "tr" ? "Karar kutuları" : "Decision boxes"}</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
          {locale === "tr" ? "Hangi akış hangi aracı ister?" : "Which workflow fits which tool?"}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">
          {locale === "tr"
            ? "Bu kutular tek bir kazanan seçmez. Hangi kullanım senaryosunun hangi araca daha yakın olduğunu hızlıca gösterir."
            : "These boxes do not force a single winner. They show which workflow is closer to each tool so the decision stays neutral."}
        </p>
      </div>

      <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-5">
        {boxes.map((box) => (
          <div key={box.title} className="flex h-full flex-col rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-4">
            <p className="text-base font-semibold text-slate-50">{box.title}</p>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{box.description}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <PremiumButton href={box.leftButtonHref} variant="secondary" className="min-h-[44px] w-full">
                {box.leftButtonLabel}
              </PremiumButton>
              <PremiumButton href={box.rightButtonHref} variant="secondary" className="min-h-[44px] w-full">
                {box.rightButtonLabel}
              </PremiumButton>
            </div>
            <div className="mt-4">
              <Link
                href={alternativesHref}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/35 hover:bg-cyan-400/14 hover:text-cyan-200"
              >
                {helperLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

