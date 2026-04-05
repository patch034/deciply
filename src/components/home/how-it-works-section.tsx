"use client";

import { motion } from "framer-motion";

import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import type { Locale } from "@/i18n/config";

const content = {
  tr: {
    eyebrow: "Nasıl çalışır?",
    title: "Doğru AI aracına üç kısa adımda ulaş",
    description: "Kısa bir akışla ihtiyacını netleştir, seçenekleri karşılaştır ve doğru aracı dene.",
    steps: [
      {
        step: "1",
        title: "Ne yapmak istiyorsun?",
        description: "Yazı, görsel, video veya verimlilik ihtiyacını seç."
      },
      {
        step: "2",
        title: "Seçenekleri daralt",
        description: "Fiyatı, güçlü yönleri ve kullanım alanını kıyasla."
      },
      {
        step: "3",
        title: "Uygun olanı dene",
        description: "Detayları gör ve doğru araca hemen geç."
      }
    ]
  },
  en: {
    eyebrow: "How it works",
    title: "Reach the right AI tool in three simple steps",
    description: "Clarify the need, narrow the options, then try the right tool with confidence.",
    steps: [
      {
        step: "1",
        title: "What do you want to do?",
        description: "Start with writing, image, video, or productivity."
      },
      {
        step: "2",
        title: "Narrow the options",
        description: "Compare pricing, strengths, and best-fit use cases."
      },
      {
        step: "3",
        title: "Try the right fit",
        description: "Open the details and move to the right tool fast."
      }
    ]
  }
} as const;

type HowItWorksSectionProps = {
  locale: Locale;
};

export function HowItWorksSection({ locale }: HowItWorksSectionProps) {
  const section = content[locale];

  return (
    <SectionShell eyebrow={section.eyebrow} title={section.title} description={section.description}>
      <div className="grid gap-5 md:grid-cols-3">
        {section.steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <GlassPanel className="ui-card ui-card-hover flex h-full flex-col justify-between overflow-hidden p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300/68">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                <span>{item.step}</span>
              </div>
              <h3 className="balance-text mt-3 text-xl font-bold tracking-[-0.03em] text-slate-50">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-300/82">{item.description}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

