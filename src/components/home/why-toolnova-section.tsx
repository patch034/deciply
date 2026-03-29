"use client";

import { motion } from "framer-motion";

import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import type { Locale } from "@/i18n/config";

const content = {
  tr: {
    eyebrow: "Neden Deciply?",
    title: "Karar vermeyi hızlandıran güvenilir ve net bir AI seçim deneyimi",
    description:
      "Deciply, araçları tek bir kazanan mantığıyla değil; kullanım senaryosu, fiyat ve karar sinyalleriyle birlikte değerlendirmenizi kolaylaştırır.",
    items: [
      {
        title: "Tarafsız karşılaştırmalar",
        description: "Araçları tek bir varsayılan kazananla değil, hangi iş için daha uygun olduğuna göre incelemenizi sağlar."
      },
      {
        title: "Gerçek kullanım içgörüleri",
        description: "Kartlar ve detay sayfaları, aracın nerede güçlü kaldığını ve hangi kullanım için daha mantıklı olduğunu net biçimde gösterir."
      },
      {
        title: "Sahte sıralama yok",
        description: "Şişirilmiş vaatler yerine temiz sinyaller, dürüst açıklamalar ve düzenli güncellenen içerik akışı sunar."
      },
      {
        title: "Düzenli olarak güncellenir",
        description: "Kullanıcıyı eski içerikle bırakmamak için araç seti ve karar katmanı düzenli aralıklarla yenilenir."
      }
    ]
  },
  en: {
    eyebrow: "Why Deciply?",
    title: "A cleaner and more trustworthy AI decision layer built for faster choices",
    description:
      "Deciply helps people compare tools through use cases, pricing signals, and honest decision context instead of hype.",
    items: [
      {
        title: "Unbiased comparisons",
        description: "Tools are framed by scenario fit instead of forcing one tool to look like the default winner."
      },
      {
        title: "Real use-case insights",
        description: "Cards and detail pages show where a tool is strong and where it may be a weaker fit."
      },
      {
        title: "No fake rankings",
        description: "The experience avoids inflated claims and focuses on practical, scenario-based decision guidance."
      },
      {
        title: "Updated regularly",
        description: "Content and decision signals are refreshed regularly so users are not stuck with stale information."
      }
    ]
  }
} as const;

type WhyToolNovaSectionProps = {
  locale: Locale;
};

export function WhyToolNovaSection({ locale }: WhyToolNovaSectionProps) {
  const section = content[locale];

  return (
    <SectionShell eyebrow={section.eyebrow} title={section.title} description={section.description}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {section.items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <GlassPanel className="ui-card ui-card-hover flex h-full flex-col justify-between overflow-hidden p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300/68">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                <span>0{index + 1}</span>
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

