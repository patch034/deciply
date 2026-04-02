import type { Locale } from "@/i18n/config";
import { assertEncodingHealth, normalizeLocalizedContent } from "@/lib/encoding";

export type ComparisonRow = {
  label: string;
  left: string;
  right: string;
};

export type RelatedComparisonCard = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  highlight: string;
};

export type ComparisonFaqItem = {
  question: string;
  answer: string;
};

export type ComparisonPageContent = {
  title: string;
  summary: string;
  primaryToolSlug: string;
  secondaryToolSlug: string;
  hero: {
    eyebrow: string;
    leftButton: string;
    rightButton: string;
  };
  selectionCards: {
    title: string;
    toolLabel: string;
    description: string;
  }[];
  guidance: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  table: {
    title: string;
    description: string;
    columns: {
      label: string;
      left: string;
      right: string;
    };
    rows: ComparisonRow[];
  };
  midCta: {
    title: string;
    description: string;
    leftButton: string;
    rightButton: string;
  };
  finalVerdict: {
    title: string;
    description: string;
    leftTitle: string;
    leftDescription: string;
    rightTitle: string;
    rightDescription: string;
    leftButton: string;
    rightButton: string;
  };
  faq: {
    title: string;
    description: string;
    items: ComparisonFaqItem[];
  };
  related: {
    title: string;
    description: string;
    cards: RelatedComparisonCard[];
  };
};

export const comparisonContent: Record<Locale, ComparisonPageContent> = {
  tr: {
    title: "ChatGPT vs Claude",
    summary:
      "ChatGPT hızlı ve çok yönlü iş akışları için uygun olabilir. Claude ise uzun yazı ve daha düzenli anlatım isteyen kullanıcılar için daha iyi uyum sağlayabilir.",
    primaryToolSlug: "chatgpt",
    secondaryToolSlug: "claude",
    hero: {
      eyebrow: "Kısa karşılaştırma özeti",
      leftButton: "ChatGPT'yi incele",
      rightButton: "Claude'u incele"
    },
    selectionCards: [
      {
        title: "Hızlı başlangıç için",
        toolLabel: "ChatGPT",
        description: "Günlük kullanım ve hızlı taslak isteyen kullanıcılar için daha düşük sürtünmeli bir seçenek olabilir."
      },
      {
        title: "Uzun yazı için",
        toolLabel: "Claude",
        description: "Daha düzenli ve sakin anlatım isteyen kullanıcılar için uzun içerikte daha rahat bir akış sunabilir."
      },
      {
        title: "Araştırma ve taslak için",
        toolLabel: "ChatGPT",
        description: "Araştırma, özet ve hızlı fikir üretimi gereken akışlarda pratik bir deneyim sağlayabilir."
      },
      {
        title: "Daha düzenli çıktı için",
        toolLabel: "Claude",
        description: "Uzun açıklama ve daha kontrollü metin yapısı isteyen kullanıcılar için daha uygun olabilir."
      }
    ],
    guidance: {
      title: "Kararı kolaylaştır",
      description: "Önce temel farkı gör, sonra kendi iş akışına daha uygun aracı seç.",
      items: [
        {
          title: "Kim için daha uygun?",
          description: "Hız, esneklik ve günlük kullanım arayanlar ChatGPT tarafına; uzun ve düzenli yazı isteyenler Claude tarafına daha yakın hissedebilir."
        },
        {
          title: "Hangi durumda hangisi daha iyi?",
          description: "Hızlı taslak ve çok amaçlı kullanımda ChatGPT; uzun açıklama ve yapılandırılmış içerikte Claude daha uygun olabilir."
        },
        {
          title: "Kısa özet: hangisini seçmelisin?",
          description: "Hızlı sonuç arıyorsan ChatGPT, uzun ve daha düzenli metin arıyorsan Claude senaryosuna daha yakın olabilirsin."
        }
      ]
    },
    table: {
      title: "Temel farklar",
      description: "Kullanım alanı, fiyat, kalite ve hız farklarını tek tabloda gör.",
      columns: {
        label: "Kriter",
        left: "ChatGPT",
        right: "Claude"
      },
      rows: [
        {
          label: "Kullanım alanı",
          left: "Genel kullanım, içerik, araştırma",
          right: "Uzun içerik, detaylı açıklama"
        },
        {
          label: "Fiyat",
          left: "Kısmen ücretsiz",
          right: "Kısmen ücretsiz"
        },
        {
          label: "Kalite yaklaşımı",
          left: "Çok yönlü ve hızlı çıktı",
          right: "Daha düzenli ve kontrollü çıktı"
        },
        {
          label: "Kullanım kolaylığı",
          left: "Daha hızlı alışılır",
          right: "Biraz daha niş hissedebilir"
        },
        {
          label: "Hız",
          left: "Günlük işlerde daha pratik",
          right: "Daha dikkatli ama bazen daha yavaş"
        },
        {
          label: "Uygun kullanım sonucu",
          left: "Hızlı blog taslağı, araştırma özeti, fikir geliştirme",
          right: "Uzun rehber, açıklayıcı analiz, daha temiz metin yapısı"
        }
      ]
    },
    midCta: {
      title: "Detay sayfalarına geç ve daha net karar ver",
      description: "Her iki aracın artılarını, eksilerini ve kullanım senaryolarını tek tek açıp kontrol et.",
      leftButton: "ChatGPT detay sayfası",
      rightButton: "Claude detay sayfası"
    },
    finalVerdict: {
      title: "Kısa sonuç",
      description: "Tek cümlelik özet: hızlı ve çok yönlü kullanım için ChatGPT, uzun ve düzenli yazı için Claude daha uygun olabilir.",
      leftTitle: "ChatGPT hangi durumda daha uygun?",
      leftDescription: "Hızlı üretmek, araştırma yapmak ve tek araçla birçok işi yürütmek istiyorsan ChatGPT tarafı daha uygun olabilir.",
      rightTitle: "Claude hangi durumda daha uygun?",
      rightDescription: "Daha sakin ton, uzun yazı ve daha derli toplu çıktı istiyorsan Claude tarafı daha uygun olabilir.",
      leftButton: "ChatGPT'yi aç",
      rightButton: "Claude'u aç"
    },
    faq: {
      title: "Sık sorulan sorular",
      description: "Kararı hızlandıran kısa ve nötr cevaplar.",
      items: [
        {
          question: "ChatGPT mi Claude mu daha iyi?",
          answer: "Bu, önceliğine göre değişir. Hız ve esneklik için ChatGPT, uzun ve daha düzenli yazılar için Claude daha uygun olabilir."
        },
        {
          question: "Hangisi yeni başlayanlar için daha uygun?",
          answer: "Daha hızlı alışmak isteyenler ChatGPT tarafını, daha sakin ve uzun yazı isteyenler Claude tarafını tercih edebilir."
        },
        {
          question: "Hangisi daha iyi yazı yazar?",
          answer: "Uzun ve kontrollü yazılarda Claude, çok amaçlı hızlı yazılarda ChatGPT daha uygun olabilir."
        },
        {
          question: "Fiyat açısından fark var mı?",
          answer: "İkisi de freemium mantığıyla denenebilir; bu yüzden karar çoğu zaman kullanım tarzına göre verilir."
        },
        {
          question: "Hangisi günlük kullanım için daha uygun?",
          answer: "Günlük araştırma, taslak ve hızlı işler için ChatGPT; daha sakin ve düzenli anlatım için Claude değerlendirilebilir."
        }
      ]
    },
    related: {
      title: "İlgili karşılaştırmalar",
      description: "Karar alanını daraltmak için bir sonraki karşılaştırmayı aç.",
      cards: [
        {
          title: "Gemini vs ChatGPT",
          description: "Google ekosistemi ile genel AI asistan deneyimini yan yana gör.",
          href: "/tools/gemini",
          ctaLabel: "Gemini'yi incele",
          highlight: "Verimlilik"
        },
        {
          title: "Midjourney vs DALL·E",
          description: "Görsel kalite ve yaratıcı kontrol açısından iki popüler aracı değerlendir.",
          href: "/tools/midjourney",
          ctaLabel: "Midjourney'yi incele",
          highlight: "Görsel AI"
        },
        {
          title: "2026'da farklı işler için AI araçları",
          description: "İkiden fazla seçenek görmek istersen geniş listeye geç.",
          href: "/categories/ai-tools",
          ctaLabel: "Araç listesini aç",
          highlight: "Genel görünüm"
        }
      ]
    }
  },
  en: {
    title: "ChatGPT vs Claude",
    summary:
      "ChatGPT can be a better fit for faster, more flexible workflows. Claude may fit users better when long-form clarity and structure matter more.",
    primaryToolSlug: "chatgpt",
    secondaryToolSlug: "claude",
    hero: {
      eyebrow: "Quick comparison summary",
      leftButton: "Review ChatGPT",
      rightButton: "Review Claude"
    },
    selectionCards: [
      {
        title: "For faster onboarding",
        toolLabel: "ChatGPT",
        description: "It may feel easier to start with if you want faster everyday output and lower friction."
      },
      {
        title: "For long-form writing",
        toolLabel: "Claude",
        description: "It may fit better if you want longer, calmer, and more structured writing output."
      },
      {
        title: "For drafting and research",
        toolLabel: "ChatGPT",
        description: "It can be a practical fit for draft-heavy work, quick summaries, and idea generation."
      },
      {
        title: "For cleaner structure",
        toolLabel: "Claude",
        description: "It may be a better fit when cleaner structure and clearer explanations matter more."
      }
    ],
    guidance: {
      title: "Make the choice easier",
      description: "See the core difference first, then pick the tool that fits your workflow better.",
      items: [
        {
          title: "Who is each tool more suitable for?",
          description: "Users who want speed, flexibility, and everyday utility may lean toward ChatGPT. Users who care more about long-form structure may lean toward Claude."
        },
        {
          title: "When does each one fit better?",
          description: "ChatGPT may fit faster drafting and multi-purpose work. Claude may fit longer explanations and structured content better."
        },
        {
          title: "Short answer: which one should you try first?",
          description: "If speed matters more, start by evaluating ChatGPT. If structure matters more, Claude may be the better starting point."
        }
      ]
    },
    table: {
      title: "Core differences",
      description: "Review use case, pricing, quality, and speed differences in one simple table.",
      columns: {
        label: "Criteria",
        left: "ChatGPT",
        right: "Claude"
      },
      rows: [
        {
          label: "Use case",
          left: "General use, content, research",
          right: "Long-form content, detailed explanation"
        },
        {
          label: "Pricing",
          left: "Freemium",
          right: "Freemium"
        },
        {
          label: "Quality approach",
          left: "Versatile and fast output",
          right: "More structured and controlled output"
        },
        {
          label: "Ease of use",
          left: "Faster to get used to",
          right: "Can feel more niche"
        },
        {
          label: "Speed",
          left: "More practical for daily work",
          right: "More careful but sometimes slower"
        },
        {
          label: "Useful outcome",
          left: "Fast blog drafts, research summaries, idea generation",
          right: "Long guides, explanatory analysis, cleaner structure"
        }
      ]
    },
    midCta: {
      title: "Open the detail pages and decide with more context",
      description: "Review pros, cons, and use-case fit for each tool before you decide.",
      leftButton: "ChatGPT detail page",
      rightButton: "Claude detail page"
    },
    finalVerdict: {
      title: "Short conclusion",
      description: "One-line summary: ChatGPT may fit faster, more flexible work; Claude may fit longer, more structured writing.",
      leftTitle: "When is ChatGPT more suitable?",
      leftDescription: "It may fit better if you want speed, research help, and one tool for many everyday tasks.",
      rightTitle: "When is Claude more suitable?",
      rightDescription: "It may fit better if you want a calmer tone, longer writing, and cleaner structure.",
      leftButton: "Open ChatGPT",
      rightButton: "Open Claude"
    },
    faq: {
      title: "Frequently asked questions",
      description: "Short neutral answers to make the decision easier.",
      items: [
        {
          question: "Is ChatGPT better than Claude?",
          answer: "That depends on your priority. ChatGPT may fit speed and flexibility better, while Claude may fit long-form structure better."
        },
        {
          question: "Which one is better for beginners?",
          answer: "Users who want lower friction may prefer ChatGPT, while users who care more about calmer writing may prefer Claude."
        },
        {
          question: "Which one writes better?",
          answer: "Claude may fit longer structured writing better, while ChatGPT may fit faster general drafting better."
        },
        {
          question: "Is there a big pricing difference?",
          answer: "Both can be tested through freemium access, so the first decision is usually based on fit rather than price alone."
        },
        {
          question: "Which one is better for everyday work?",
          answer: "ChatGPT may feel more practical for quick daily tasks, while Claude may fit longer structured work better."
        }
      ]
    },
    related: {
      title: "Related comparisons",
      description: "Open the next comparison to narrow the decision further.",
      cards: [
        {
          title: "Gemini vs ChatGPT",
          description: "See Google ecosystem workflows next to a broader AI assistant workflow.",
          href: "/tools/gemini",
          ctaLabel: "Review Gemini",
          highlight: "Productivity"
        },
        {
          title: "Midjourney vs DALL·E",
          description: "Compare two popular visual tools through image quality and creative control.",
          href: "/tools/midjourney",
          ctaLabel: "Review Midjourney",
          highlight: "Image AI"
        },
        {
          title: "AI tools for different jobs in 2026",
          description: "Open the broader list if you want to compare more than two options.",
          href: "/categories/ai-tools",
          ctaLabel: "Open tool list",
          highlight: "Overview"
        }
      ]
    }
  }
};



export type TripleComparisonPageContent = {
  title: string;
  summary: string;
  eyebrow: string;
  toolCtaLabel: string;
  selectionTitle: string;
  selectionDescription: string;
  tableTitle: string;
  tableDescription: string;
  pricingTitle: string;
  pricingDescription: string;
  strengthsTitle: string;
  strengthsDescription: string;
  limitationsTitle: string;
  limitationsDescription: string;
  verdictTitle: string;
  verdictDescription: string;
  relatedTitle: string;
  relatedDescription: string;
};

export const tripleComparisonContent: Record<Locale, TripleComparisonPageContent> = {
  tr: {
    title: "ChatGPT vs Claude vs Gemini",
    summary: "Bu üç genel amaçlı AI aracı benzer görünse de farklı iş akışlarında farklı şekilde öne çıkar. Hız, uzun form yazı ve Google ekosistemi arasındaki farkı netleştirin.",
    eyebrow: "Üçlü karşılaştırma",
    toolCtaLabel: "Araç sayfası",
    selectionTitle: "Kim hangisini seçmeli?",
    selectionDescription: "Bir karar vermeden önce hangi iş akışının öncelik olduğunu netleştirin; bu sayfa da tam olarak bunu sadeleştirir.",
    tableTitle: "Temel farklar",
    tableDescription: "Kullanım alanı, fiyat, güçlü taraflar ve sınırlamaları tek bir tablo içinde görün.",
    pricingTitle: "Fiyat farkı nasıl?",
    pricingDescription: "Freemium başlangıç, ücretli plan ve ticari kullanım tarafındaki sinyalleri karşılaştırın.",
    strengthsTitle: "Güçlü yanlar",
    strengthsDescription: "Her aracın öne çıktığı alanı hızlıca görün ve işinize en yakın olanı seçin.",
    limitationsTitle: "Sınırlamalar",
    limitationsDescription: "En sık yaşanan sürtünme noktalarını ve hangi durumda dikkat etmeniz gerektiğini kontrol edin.",
    verdictTitle: "Pratik sonuç",
    verdictDescription: "En iyi seçim çoğu zaman tek bir kazanan değil, iş akışınıza en az sürtünme ekleyen araçtır.",
    relatedTitle: "Yakın alternatifler",
    relatedDescription: "Daha dar bir karar için komşu seçenekleri ve ilgili araç sayfalarını da açın."
  },
  en: {
    title: "ChatGPT vs Claude vs Gemini",
    summary: "These three general-purpose AI assistants may look similar, but they stand out in different workflows. Compare speed, long-form writing, and Google-ecosystem fit clearly.",
    eyebrow: "Three-way comparison",
    toolCtaLabel: "Tool page",
    selectionTitle: "Who should choose which?",
    selectionDescription: "Before choosing, clarify which workflow matters most; this page is designed to make that decision easier.",
    tableTitle: "Core differences",
    tableDescription: "Review use case, pricing, strengths, and limitations in one clean table.",
    pricingTitle: "How does pricing differ?",
    pricingDescription: "Compare the freemium starting point, paid plan signals, and commercial fit across the three tools.",
    strengthsTitle: "Strengths",
    strengthsDescription: "See where each tool stands out so you can pick the one closest to your workflow.",
    limitationsTitle: "Limitations",
    limitationsDescription: "Review the most common friction points and when each tool may fall short.",
    verdictTitle: "Practical result",
    verdictDescription: "The best choice is often not a single winner, but the tool that adds the least friction to your workflow.",
    relatedTitle: "Nearby alternatives",
    relatedDescription: "Open nearby options and related tool pages if you want to narrow the decision further."
  }
};

assertEncodingHealth("comparisons");

export function getComparisonContent(locale: Locale) {
  return normalizeLocalizedContent(`comparison:${locale}`, comparisonContent[locale]);
}




