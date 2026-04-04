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
      "ChatGPT ve Claude farklı iş akışlarında farklı avantajlar sunar. Bu hub, hız, uzun form yazı, fiyat ve çıktı düzenini senaryo üzerinden karşılaştırır.",
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
          description: "Hız, esneklik ve günlük kullanım önceliği olanlar bir tarafa; uzun form yazı ve daha düzenli yapı isteyenler diğer tarafa daha yakın hissedebilir."
        },
        {
          title: "Hangi durumda hangisi daha iyi?",
          description: "Hızlı taslak ve çok amaçlı kullanım ile uzun açıklama ve yapılandırılmış içerik, farklı karar sinyalleri üretir."
        },
        {
          title: "Kısa özet: hangisini seçmelisin?",
          description: "En iyi seçim çoğu zaman tek bir kazanan değil, iş akışına en az sürtünme ekleyen araçtır."
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
      description: "Bu sayfa tek bir kazanan seçmez. Hangi aracın hangi iş akışına daha az sürtünme eklediğini gösterir.",
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
          question: "Hangi iş akışı hangi araca daha yakın?",
          answer: "Önceliğe göre değişir. Hız ve esneklik bir tarafta, uzun ve düzenli yazı diğer tarafta daha iyi hissedebilir."
        },
        {
          question: "Yeni başlayan biri ilk olarak neye bakmalı?",
          answer: "İlk 10 dakikada hangi aracın daha rahat başladığına bakmak daha güvenli bir sinyal verir."
        },
        {
          question: "Fiyat mı, çıktı kalitesi mi, hız mı?",
          answer: "Hız, kalite ve tekrar üretilebilirlik birlikte değerlendirilmelidir."
        },
        {
          question: "Ekip veya creator işleri için neye dikkat edilmeli?",
          answer: "Tutarlı çıktı, paylaşılabilir kullanım ve aynı brief üzerinde tekrar eden testler karar kalitesini artırır."
        },
        {
          question: "Günlük kullanımda hangisi daha rahat?",
          answer: "Günlük kullanımda en iyi sinyal, hangi aracın daha az sürtünme yarattığıdır."
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
          href: "/compare/chatgpt-vs-gemini",
          ctaLabel: "Gemini'yi incele",
          highlight: "Verimlilik"
        },
        {
          title: "Midjourney vs DALL·E",
          description: "Görsel kalite ve yaratıcı kontrol açısından iki popüler aracı değerlendir.",
          href: "/compare/midjourney-vs-dalle",
          ctaLabel: "Midjourney'yi incele",
          highlight: "Görsel AI"
        },
        {
          title: "2026'da farklı işler için AI araçları",
          description: "İkiden fazla seçenek görmek istersen geniş listeye geç.",
          href: "/compare/chatgpt-vs-claude-vs-gemini",
          ctaLabel: "Araç listesini aç",
          highlight: "Genel görünüm"
        }
      ]
    }
  },
  en: {
    title: "ChatGPT vs Claude",
    summary:
      "ChatGPT and Claude can fit different workflows in different ways. This hub compares speed, long-form writing, pricing, and output structure.",
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
          description: "Users who care about speed, flexibility, and everyday utility may lean one way; users who care more about long-form structure may lean the other."
        },
        {
          title: "When does each one fit better?",
          description: "Faster drafting and multi-purpose work may point one way; longer explanations and structured content may point the other."
        },
        {
          title: "Short answer: which one should you try first?",
          description: "If speed matters more, start by evaluating the faster workflow fit. If structure matters more, start by evaluating the more structured fit."
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
      description: "This page does not force a single winner. It shows when each tool fits better by workflow, pricing, and output style.",
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
          question: "Which workflow is closer to each tool?",
          answer: "That depends on the workflow. Speed and flexibility may point one way, while long-form structure may point the other."
        },
        {
          question: "What should a beginner check first?",
          answer: "Start with the first 10 minutes of use rather than the sticker price. Ease of start and clear output often provide the strongest signal."
        },
        {
          question: "What matters most: price, quality, or speed?",
          answer: "All three matter, but the right choice usually comes from the combination rather than a single metric. Review speed, quality, and repeatability together."
        },
        {
          question: "What matters most for teams or creators?",
          answer: "Consistent output, shareable usage, and repeated tests on the same brief make team and creator decisions more reliable."
        },
        {
          question: "Which workflow is closer to each tool?",
          answer: "The better choice is usually the tool that adds the least friction to your workflow."
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
          href: "/compare/chatgpt-vs-gemini",
          ctaLabel: "Review Gemini",
          highlight: "Productivity"
        },
        {
          title: "Midjourney vs DALL·E",
          description: "Compare two popular visual tools through image quality and creative control.",
          href: "/compare/midjourney-vs-dalle",
          ctaLabel: "Review Midjourney",
          highlight: "Image AI"
        },
        {
          title: "AI tools for different jobs in 2026",
          description: "Open the broader list if you want to compare more than two options.",
          href: "/compare/chatgpt-vs-claude-vs-gemini",
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
    summary: "These three general-purpose AI assistants may look similar, but they stand out in different workflows. Compare speed, long-form writing, and ecosystem fit clearly.",
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









