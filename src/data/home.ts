import { blogArticles } from "@/data/blog";
import { discoveryPages, getHomepageDiscoveryGuides } from "@/data/discovery-pages";
import type { Locale } from "@/i18n/config";
import { getToolCount } from "@/lib/catalog";
import type {
  CategoryCard,
  ComparisonCard,
  ConversionListItem,
  GuideCard,
  ToolCard
} from "@/types/home";

type HeroStat = {
  value: string;
  label: string;
};

type HeroPanelItem = {
  title: string;
  meta: string;
  value: string;
};

export type HomeContent = {
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    starterHint: string;
    starterHintLabel: string;
    starterHintHref: string;
    trustLine: string;
    panelEyebrow: string;
    trustBadges: string[];
    stats: HeroStat[];
    panelTitle: string;
    panelDescription: string;
    panelItems: HeroPanelItem[];
    panelFootnote: string;
  };
  topPick: {
    badge: string;
    title: string;
    description: string;
    reasonLabel: string;
    reason: string;
    useCaseLabel: string;
    useCase: string;
    benefitLine: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  sections: {
    highIntent: {
      eyebrow: string;
      title: string;
      description: string;
      linkLabel: string;
    };
    socialProof: {
      eyebrow: string;
      title: string;
      description: string;
    };
    categories: {
      eyebrow: string;
      title: string;
      description: string;
      linkLabel: string;
    };
    tools: {
      eyebrow: string;
      title: string;
      description: string;
      detailLabel: string;
      tryLabel: string;
      bestForLabel: string;
      ratingLabel: string;
    };
    hotTools: {
      eyebrow: string;
      title: string;
      description: string;
    };
    makeMoney: {
      eyebrow: string;
      title: string;
      description: string;
    };
    comparisons: {
      eyebrow: string;
      title: string;
      description: string;
      linkLabel: string;
      actionLabel: string;
      columns: {
        tool: string;
        bestFor: string;
        price: string;
        outcome: string;
        rating: string;
        action: string;
      };
    };
    guides: {
      eyebrow: string;
      title: string;
      description: string;
      linkLabel: string;
    };
    newsletter: {
      eyebrow: string;
      title: string;
      description: string;
      inputLabel: string;
      placeholder: string;
      buttonLabel: string;
      disclaimer: string;
    };
    finalCta: {
      eyebrow: string;
      title: string;
      description: string;
      urgencyNote: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  socialProofStats: HeroStat[];
  highIntentCards: ComparisonCard[];
  categories: CategoryCard[];
  tools: ToolCard[];
  hotTools: ConversionListItem[];
  moneyTools: ConversionListItem[];
  comparisons: ComparisonCard[];
  guides: GuideCard[];
};

const homeContent: Record<Locale, HomeContent> = {
  tr: {
    hero: {
      badge: "AI araç rehberi",
      title: "Doğru AI aracını saniyeler içinde bul",
      description:
        "Karşılaştır, karar ver ve hemen başla.",
      primaryCta: "Ücretsiz Başla",
      secondaryCta: "Karşılaştırmaları incele",
      starterHint: "",
      starterHintLabel: "",
      starterHintHref: "",
      trustLine: "Doğru AI aracını daha hızlı ve güvenle seç.",
      panelEyebrow: "Karar paneli",
      trustBadges: ["Tarafsız", "Gerçek kullanım", "Düzenli güncellenir"],
      stats: [
        { value: "120+", label: "AI araç" },
        { value: "10.000+", label: "aktif kullanıcı sinyali" },
        { value: "Haftalık", label: "güncellenen veriler" }
      ],
      panelTitle: "Daha hızlı, daha net karar verin",
      panelDescription:
        "Araçları fiyat, kullanım alanı ve sonuç gücüne göre karşılaştırın; size uygun seçeneğe birkaç saniyede gidin.",
      panelItems: [
        { title: "Fiyat sinyali", meta: "ücretsiz, kısmen ücretsiz ve ücretli seçenekleri ayırın", value: "Net" },
        { title: "Kullanım alanı", meta: "hangi iş için daha uygun olduğunu tek bakışta görün", value: "Senaryo" },
        { title: "Karşılaştırma hızı", meta: "araç detaylarına ve karşılaştırmalara tek tıkla ulaşın", value: "Hız" }
      ],
      panelFootnote: "Deciply, doğru AI aracını daha hızlı, daha akıllı ve daha güvenli seçmeniz için tasarlanmış modern bir karar platformudur."
    },
    topPick: {
      badge: "Kullanım senaryosu",
      title: "Yazı ve araştırma araçlarını senaryona göre değerlendir",
      description:
        "Yazı, araştırma ve günlük üretkenlik için farklı araçların güçlü taraflarını görüp sana uygun olana ilerleyebilirsin.",
      reasonLabel: "Hangi durumda uygun?",
      reason: "Aynı kullanım alanında bazı araçlar hız, bazıları daha düzenli çıktı, bazıları ise araştırma tarafında öne çıkabilir.",
      useCaseLabel: "Kimler için uygun?",
      useCase: "İçerik üreticileri, freelancer'lar, öğrenciler ve ekipler; kendi önceliğine göre farklı bir aracı tercih edebilir.",
      benefitLine: "Yazı ve araştırma senaryolarını karşılaştırarak ilerle",
      ctaLabel: "Araçları karşılaştır",
      ctaHref: "/tools",
      secondaryCtaLabel: "Yazı araçlarını gör",
      secondaryCtaHref: "/categories/ai-tools"
    },
    sections: {
      highIntent: {
        eyebrow: "En çok açılan sayfalar",
        title: "Karar aşamasındaki kullanıcıların ilk baktığı sayfalar",
        description: "Karşılaştırma ve liste sayfalarıyla kullanıcıyı daha az sürtünmeyle doğru araca yönlendirin.",
        linkLabel: "Detayları gör"
      },
      socialProof: {
        eyebrow: "Güven sinyali",
        title: "Binlerce kullanıcı doğru AI aracını Deciply ile buluyor",
        description:
          "Gerçek kullanım senaryolarına göre sıralanan araçlar, haftalık güncellemeler ve net kategori yapısı ile kullanıcıyı daha hızlı doğru seçime götürür."
      },
      categories: {
        eyebrow: "Kategoriler",
        title: "AI kategorilerine tek ekrandan girin",
        description: "Yazı, görsel, video ve gelir odaklı kullanım alanlarında uygun başlangıç noktasını bulun.",
        linkLabel: "Detayları gör"
      },
      tools: {
        eyebrow: "Öne çıkan araçlar",
        title: "Araçları karşılaştır, güçlü yönlerini gör ve senaryona uygun seç",
        description:
          "Kartlar; fiyat modeli, kullanım alanı ve sonuç potansiyeli ile hangi aracın hangi iş için daha uygun olduğunu hızlıca gösterir.",
        detailLabel: "Detayları gör",
        tryLabel: "Ücretsiz Başla",
        bestForLabel: "Uygun kullanım",
        ratingLabel: "Puan"
      },
      hotTools: {
        eyebrow: "2026",
        title: "2026'da sık incelenen AI araçları",
        description: "Farklı kullanım senaryolarında sık açılan araçlara hızlıca bakın."
      },
      makeMoney: {
        eyebrow: "Gelir odaklı seçimler",
        title: "Para kazandıran AI araçları",
        description: "İçerik üretimi, otomasyon ve freelance iş akışlarında gelir üretmeye yardımcı olabilecek araçları görün."
      },
      comparisons: {
        eyebrow: "Karşılaştırma tablosu",
        title: "Kararı hızlandıran kısa tablo",
        description: "Araçların hangi kullanım sonucuna daha uygun olduğunu tek bakışta görün ve daha bilinçli seçim yapın.",
        linkLabel: "Karşılaştırmayı aç",
        actionLabel: "Detayları gör",
        columns: {
          tool: "Araç",
          bestFor: "Uygun kullanım",
          price: "Fiyat",
          outcome: "Uygun kullanım sonucu",
          rating: "Puan",
          action: "İşlem"
        }
      },
      guides: {
        eyebrow: "Rehberler",
        title: "Rehberler",
        description: "İleride yayınlanacak rehber içerikler için ayrılan alan.",
        linkLabel: "Aç"
      },
      newsletter: {
        eyebrow: "Bülten",
        title: "Yeni araçları takip edin",
        description: "Yeni araçları ve güncellemeleri kaçırmamak için e-posta listesine katılın.",
        inputLabel: "E-posta",
        placeholder: "ornek@mail.com",
        buttonLabel: "Kaydol",
        disclaimer: "İstediğiniz zaman çıkabilirsiniz."
      },
      finalCta: {
        eyebrow: "Hemen başla",
        title: "AI araçlarını şimdi keşfet ve kullanım senaryona uygun olana ilerle",
        description: "Kategori sayfalarından ilerleyin ya da tüm araç dizinine geçip uygun seçeneği daha hızlı bulun.",
        urgencyNote: "Şu anda sık incelenen araçlar",
        primaryCta: "Kategorileri keşfet",
        secondaryCta: "Araçları incele"
      }
    },
    socialProofStats: [
      { value: "10.000+", label: "kullanıcı" },
      { value: "Her hafta", label: "güncellenen araçlar" },
      { value: "Gerçek", label: "kullanım senaryolarına göre sıralama" }
    ],
    highIntentCards: [
      {
        icon: "VS",
        eyebrow: "Karşılaştırma",
        title: "ChatGPT vs Claude",
        description: "Hız, kalite ve kullanım kolaylığı açısından sık açılan karşılaştırma.",
        href: "/categories/comparisons",
        highlight: "Yazı"
      },
      {
        icon: "MJ",
        eyebrow: "Görsel",
        title: "Midjourney vs DALL·E",
        description: "Görsel üretim ve yaratıcı kontrol tarafında sık bakılan karşılaştırma.",
        href: "/categories/comparisons",
        highlight: "Görsel"
      },
      {
        icon: "AI",
        eyebrow: "Liste",
        title: "2026'da öne çıkan AI araçları",
        description: "Farklı kullanım alanlarında öne çıkan seçenekleri tek listede görün.",
        href: "/categories/ai-tools",
        highlight: "2026"
      },
      {
        icon: "FR",
        eyebrow: "Ücretsiz",
        title: "Ücretsiz AI araçları",
        description: "Ücret ödemeden başlamak isteyen kullanıcılar için net başlangıç noktası.",
        href: "/categories/free-tools",
        highlight: "Başlangıç"
      }
    ],
    categories: [
      {
        icon: "WR",
        eyebrow: "Yazı",
        title: "Yazı araçları",
        description: "Metin üretimi, yeniden yazım, özetleme ve araştırma odaklı araçları inceleyin.",
        href: "/categories/ai-tools",
        metric: "Yazı",
        bestFor: "Blog, metin ve e-posta yazımı"
      },
      {
        icon: "IM",
        eyebrow: "Görsel",
        title: "Görsel araçlar",
        description: "Görsel üretim, konsept tasarım ve yaratıcı denemeler için güçlü araçları bulun.",
        href: "/categories/ai-tools",
        metric: "Görsel",
        bestFor: "Görsel üretim ve tasarım"
      },
      {
        icon: "VD",
        eyebrow: "Video",
        title: "Video araçları",
        description: "Kısa video, reklam kreatifi ve kurgu odaklı AI araçlarını keşfedin.",
        href: "/categories/ai-tools",
        metric: "Video",
        bestFor: "Video üretimi ve kurgu"
      },
      {
        icon: "BS",
        eyebrow: "İş",
        title: "İş araçları",
        description: "Operasyon, verimlilik ve büyüme odaklı AI çözümlerini görün.",
        href: "/categories/make-money-with-ai",
        metric: "İş",
        bestFor: "İş akışları ve büyüme"
      }
    ],
    tools: [
      {
        icon: "CG",
        name: "ChatGPT",
        description: "Yazma, araştırma ve günlük üretkenlik için çok yönlü AI asistanı.",
        category: "Yazı ve araştırma",
        pricing: "Freemium",
        href: "/tools/chatgpt",
        websiteUrl: "https://chatgpt.com",
        rating: "4.9/5",
        note: "Yazı ve araştırma için",
        bestFor: "İçerik, araştırma ve günlük görevler",
        benefit: "Yazı, araştırma ve günlük görevleri tek araçta toplamak isteyen kullanıcılar için uygundur.",
        comparisonOutcome: "Blog ve içerik üretimi",
        editorNote: "Yazı, araştırma ve günlük üretkenlik tarafında geniş kullanım alanı sunar.",
        useCaseTags: ["Blog yazma", "Freelance çalışma", "Otomasyon"],
        ctaLabel: "Araçları karşılaştır",
        socialProofBadges: ["Yazı"]
      },
      {
        icon: "CL",
        name: "Claude",
        description: "Uzun içerikler ve dikkatli anlatım isteyen ekipler için güçlü bir seçenek.",
        category: "Uzun içerik",
        pricing: "Freemium",
        href: "/tools/claude",
        websiteUrl: "https://claude.ai",
        rating: "4.8/5",
        note: "Uzun içerik için",
        bestFor: "Uzun içerik ve detaylı açıklamalar",
        benefit: "Uzun açıklamalar ve daha düzenli metin yapısı isteyen kullanıcılar için uygundur.",
        comparisonOutcome: "Freelance müşteri işleri kazanma",
        editorNote: "Uzun açıklama ve daha düzenli metin yapısı isteyen kullanıcılar için uygundur.",
        useCaseTags: ["Blog yazma", "Freelance çalışma"],
        ctaLabel: "Araçları karşılaştır",
        socialProofBadges: ["Uzun içerik"]
      },
      {
        icon: "MJ",
        name: "Midjourney",
        description: "Konsept görseller ve yaratıcı üretim için güçlü bir görsel AI aracı.",
        category: "Görsel kalite",
        pricing: "Ücretli",
        href: "/tools/midjourney",
        websiteUrl: "https://www.midjourney.com",
        rating: "4.8/5",
        note: "Görsel kalite için",
        bestFor: "Görsel üretim ve konsept tasarım",
        benefit: "Görsel üretimi ve kreatif işler için daha yüksek kalite arayan senaryolarda güçlü sonuçlar verebilir.",
        comparisonOutcome: "Görsel üretip satma",
        editorNote: "Görsel kalite ve yaratıcı stil arayan kullanım senaryolarında güçlü sonuçlar verebilir.",
        useCaseTags: ["Görsel üretim", "Freelance çalışma"],
        ctaLabel: "Araçları karşılaştır",
        socialProofBadges: ["Görsel"]
      },
      {
        icon: "GM",
        name: "Gemini",
        description: "Google ekosistemiyle uyumlu, arama ve verimlilik odaklı AI deneyimi.",
        category: "Google ekosistemi",
        pricing: "Freemium",
        href: "/tools/gemini",
        websiteUrl: "https://gemini.google.com",
        rating: "4.6/5",
        note: "Google ekosistemi için",
        bestFor: "Google merkezli iş akışları",
        benefit: "Google araçlarıyla çalışan kullanıcılar için düşük sürtünmeli ve pratik bir deneyim sağlar.",
        comparisonOutcome: "Araştırma ve hızlı çıktı üretme",
        editorNote: "Google araçlarıyla çalışan iş akışlarında pratik bir seçenek olabilir.",
        useCaseTags: ["Araştırma", "Otomasyon"],
        ctaLabel: "Araçları karşılaştır",
        socialProofBadges: ["Verimlilik"]
      }
    ],
    hotTools: [
      {
        icon: "CG",
        badge: "Yazı",
        title: "ChatGPT",
        description: "Genel amaçlı kullanım için sık tercih edilen çok yönlü araç.",
        benefit: "İçerik üretiminden araştırmaya kadar tek araçta hızlı sonuç isteyen kullanıcılar için uygun olabilir.",
        href: "/tools/chatgpt",
        ctaLabel: "Araçları karşılaştır"
      },
      {
        icon: "CL",
        badge: "Uzun içerik",
        title: "Claude",
        description: "Uzun ve daha dengeli içeriklerde güçlü bir alternatif.",
        benefit: "Detaylı yazılar, raporlar ve açıklama isteyen iş akışlarında değerlendirilebilir.",
        href: "/tools/claude",
        ctaLabel: "Araçları karşılaştır"
      },
      {
        icon: "MJ",
        badge: "Görsel",
        title: "Midjourney",
        description: "Görsel kalite ve yaratıcı kontrol arayanlar için güçlü seçenek.",
        benefit: "Kreatif teslimler ve görsel üretim odaklı işlerde öne çıkabilir.",
        href: "/tools/midjourney",
        ctaLabel: "Araçları karşılaştır"
      }
    ],
    moneyTools: [
      {
        icon: "CG",
        badge: "İçerik",
        title: "ChatGPT",
        description: "Yazı, araştırma ve müşteri işi tarafında gelir üretimine yardımcı olabilir.",
        benefit: "Blog, freelance yazı ve içerik paketleri hazırlayan kullanıcılar için uygundur.",
        href: "/tools/chatgpt",
        ctaLabel: "Araçları karşılaştır"
      },
      {
        icon: "MJ",
        badge: "Görsel",
        title: "Midjourney",
        description: "Satılabilir görseller ve kreatif müşteri işleri için değerlendirilebilir.",
        benefit: "Poster, kapak, konsept ve sosyal medya görselleri üretenler için uygun olabilir.",
        href: "/tools/midjourney",
        ctaLabel: "Araçları karşılaştır"
      },
      {
        icon: "GM",
        badge: "Verimlilik",
        title: "Gemini",
        description: "Araştırma ve üretkenlik odaklı işlerde hız kazandırabilir.",
        benefit: "Google tabanlı iş akışlarında zaman tasarrufu isteyen kullanıcılar için uygundur.",
        href: "/tools/gemini",
        ctaLabel: "Araçları karşılaştır"
      }
    ],
    comparisons: [
      {
        icon: "VS",
        eyebrow: "Yazı",
        title: "ChatGPT vs Claude",
        description: "Yazma kalitesi ve kullanım kolaylığı açısından sık karşılaştırılan iki araç.",
        href: "/categories/comparisons",
        highlight: "Karşılaştırma"
      },
      {
        icon: "MJ",
        eyebrow: "Görsel",
        title: "Midjourney vs DALL·E",
        description: "Görsel kalite ve yaratıcı kontrol tarafında sık aranan karşılaştırma.",
        href: "/categories/comparisons",
        highlight: "Görsel"
      }
    ],
    guides: []
  },
  en: {
    hero: {
      badge: "AI tool directory",
      title: "Find the right AI tool in seconds",
      description:
        "Compare, decide, and start instantly.",
      primaryCta: "Start Free",
      secondaryCta: "Review comparisons",
      starterHint: "",
      starterHintLabel: "",
      starterHintHref: "",
      trustLine: "Choose the right AI. Faster, smarter, confidently.",
      panelEyebrow: "Decision panel",
      trustBadges: ["Scenario-based", "Transparent", "Updated regularly"],
      stats: [
        { value: "120+", label: "AI tools" },
        { value: "10,000+", label: "user signals" },
        { value: "Weekly", label: "fresh updates" }
      ],
      panelTitle: "Decide faster",
      panelDescription:
        "Compare tools by pricing, use case, and output strength so users can reach the better fit in seconds.",
      panelItems: [
        { title: "Pricing signal", meta: "separate free, freemium, and paid options instantly", value: "Clear" },
        { title: "Use case", meta: "see what each tool is better suited for", value: "Scenario" },
        { title: "Comparison speed", meta: "jump into tool detail and comparison pages faster", value: "Fast" }
      ],
      panelFootnote: "Deciply is built to make AI tool decisions faster through scenario-based discovery."
    },
    topPick: {
      badge: "Use case",
      title: "Compare writing and research tools by scenario",
      description:
        "For writing, research, and daily productivity, different tools may fit different workflows. Compare them before you decide.",
      reasonLabel: "When does it fit best?",
      reason: "Some tools are better for speed, some for structure, and some for research-oriented workflows.",
      useCaseLabel: "Who is it suitable for?",
      useCase: "Creators, freelancers, students, and teams may prefer different tools depending on their workflow.",
      benefitLine: "Review writing and research tools by use case",
      ctaLabel: "Compare tools",
      ctaHref: "/tools",
      secondaryCtaLabel: "View writing tools",
      secondaryCtaHref: "/categories/ai-tools"
    },
    sections: {
      highIntent: {
        eyebrow: "Top pages",
        title: "The pages decision-ready users open first",
        description: "Use comparison and list pages to move visitors toward the right tool with less friction.",
        linkLabel: "View details"
      },
      socialProof: {
        eyebrow: "Trust signal",
        title: "Thousands of users find the right AI tool with Deciply",
        description:
          "Weekly updates, clear pricing labels, and scenario-based grouping make the decision path easier and more trustworthy."
      },
      categories: {
        eyebrow: "Categories",
        title: "Jump into AI categories from one screen",
        description: "Move into writing, image, video, and business workflows faster.",
        linkLabel: "View details"
      },
      tools: {
        eyebrow: "Featured tools",
        title: "Compare tools, understand the strengths, and choose the right fit",
        description:
          "Cards surface pricing, fit, and likely outcomes so users can decide faster without guessing.",
        detailLabel: "View details",
        tryLabel: "Start Free",
        bestForLabel: "Best for",
        ratingLabel: "Rating"
      },
      hotTools: {
        eyebrow: "2026",
        title: "Frequently opened AI tools (2026)",
        description: "A quick shortlist of tools users often open for different scenarios."
      },
      makeMoney: {
        eyebrow: "Revenue-focused picks",
        title: "AI tools that can support monetization",
        description: "See tools that can help with content production, automation, and freelance workflows."
      },
      comparisons: {
        eyebrow: "Comparison table",
        title: "The faster comparison layer",
        description: "See what kind of result each tool is suited for before clicking through.",
        linkLabel: "Open comparison",
        actionLabel: "View details",
        columns: {
          tool: "Tool",
          bestFor: "Best for",
          price: "Price",
          outcome: "Useful outcome",
          rating: "Rating",
          action: "Action"
        }
      },
      guides: {
        eyebrow: "Guides",
        title: "Guides",
        description: "Reserved space for future guide content.",
        linkLabel: "Open"
      },
      newsletter: {
        eyebrow: "Newsletter",
        title: "Stay updated",
        description: "Join the list to follow new tools and major updates.",
        inputLabel: "Email",
        placeholder: "name@example.com",
        buttonLabel: "Subscribe",
        disclaimer: "Unsubscribe anytime."
      },
      finalCta: {
        eyebrow: "Start now",
        title: "Explore AI tools and move toward the right fit faster",
        description: "Start from categories or jump into the tool directory to find the better option faster.",
        urgencyNote: "Frequently reviewed right now",
        primaryCta: "Explore categories",
        secondaryCta: "Review tools"
      }
    },
    socialProofStats: [
      { value: "10,000+", label: "users" },
      { value: "Weekly", label: "updated tools" },
      { value: "Real", label: "use-case-based sorting" }
    ],
    highIntentCards: [
      {
        icon: "VS",
        eyebrow: "Comparison",
        title: "ChatGPT vs Claude",
        description: "A frequently opened comparison for writing quality and usability.",
        href: "/categories/comparisons",
        highlight: "Writing"
      },
      {
        icon: "MJ",
        eyebrow: "Image",
        title: "Midjourney vs DALL·E",
        description: "A common comparison for image quality and creative control.",
        href: "/categories/comparisons",
        highlight: "Image"
      },
      {
        icon: "AI",
        eyebrow: "List",
        title: "AI tools gaining momentum in 2026",
        description: "Open a broader list of tools by scenario and category.",
        href: "/categories/ai-tools",
        highlight: "2026"
      },
      {
        icon: "FR",
        eyebrow: "Free",
        title: "Free AI tools",
        description: "A clear starting point for users who want to begin without immediate spend.",
        href: "/categories/free-tools",
        highlight: "Start"
      }
    ],
    categories: [
      {
        icon: "WR",
        eyebrow: "Writing",
        title: "Writing tools",
        description: "Review tools for text generation, rewriting, summarization, and research.",
        href: "/categories/ai-tools",
        metric: "Writing",
        bestFor: "Blogs, copy, and email writing"
      },
      {
        icon: "IM",
        eyebrow: "Image",
        title: "Image tools",
        description: "Find strong options for image generation, concept design, and creative work.",
        href: "/categories/ai-tools",
        metric: "Image",
        bestFor: "Image generation and design"
      },
      {
        icon: "VD",
        eyebrow: "Video",
        title: "Video tools",
        description: "Explore AI tools for short videos, creative edits, and visual storytelling.",
        href: "/categories/ai-tools",
        metric: "Video",
        bestFor: "Video creation and editing"
      },
      {
        icon: "BS",
        eyebrow: "Business",
        title: "Business tools",
        description: "See AI products focused on operations, productivity, and growth.",
        href: "/categories/make-money-with-ai",
        metric: "Business",
        bestFor: "Business workflows and growth"
      }
    ],
    tools: [
      {
        icon: "CG",
        name: "ChatGPT",
        description: "A versatile AI assistant for writing, research, and everyday productivity.",
        category: "Writing and research",
        pricing: "Freemium",
        href: "/tools/chatgpt",
        websiteUrl: "https://chatgpt.com",
        rating: "4.9/5",
        note: "For writing and research",
        bestFor: "Content, research, and daily tasks",
        benefit: "Useful for users who want writing, research, and day-to-day tasks in one place.",
        comparisonOutcome: "Blog and content workflows",
        editorNote: "A broad option for writing, research, and everyday productivity workflows.",
        useCaseTags: ["Blog writing", "Freelance work", "Automation"],
        ctaLabel: "Compare tools",
        socialProofBadges: ["Writing"]
      },
      {
        icon: "CL",
        name: "Claude",
        description: "A strong option for long-form writing and more structured explanation.",
        category: "Long-form content",
        pricing: "Freemium",
        href: "/tools/claude",
        websiteUrl: "https://claude.ai",
        rating: "4.8/5",
        note: "For long-form content",
        bestFor: "Long-form writing and detailed explanations",
        benefit: "Useful for users who want longer explanations and more structured output.",
        comparisonOutcome: "Long-form client delivery",
        editorNote: "Useful for users who want longer explanations and more structured output.",
        useCaseTags: ["Blog writing", "Freelance work"],
        ctaLabel: "Compare tools",
        socialProofBadges: ["Long-form"]
      },
      {
        icon: "MJ",
        name: "Midjourney",
        description: "A strong image AI option for concept visuals and creative production.",
        category: "Image quality",
        pricing: "Paid",
        href: "/tools/midjourney",
        websiteUrl: "https://www.midjourney.com",
        rating: "4.8/5",
        note: "For image quality",
        bestFor: "Image generation and concept design",
        benefit: "Useful in workflows where visual quality and creative control matter more.",
        comparisonOutcome: "Visual production workflows",
        editorNote: "Useful in scenarios where visual quality and creative style matter more.",
        useCaseTags: ["Image generation", "Freelance work"],
        ctaLabel: "Compare tools",
        socialProofBadges: ["Image"]
      },
      {
        icon: "GM",
        name: "Gemini",
        description: "A Google-friendly AI experience focused on search and productivity.",
        category: "Google ecosystem",
        pricing: "Freemium",
        href: "/tools/gemini",
        websiteUrl: "https://gemini.google.com",
        rating: "4.6/5",
        note: "For Google ecosystem",
        bestFor: "Google-centered workflows",
        benefit: "Useful for users who already work inside Google tools and want low-friction adoption.",
        comparisonOutcome: "Research and quick summaries",
        editorNote: "A practical option for workflows already built around Google tools.",
        useCaseTags: ["Research", "Automation"],
        ctaLabel: "Compare tools",
        socialProofBadges: ["Productivity"]
      }
    ],
    hotTools: [
      {
        icon: "CG",
        badge: "Writing",
        title: "ChatGPT",
        description: "A widely used general-purpose AI tool for content and research.",
        benefit: "Useful for users who want one tool for writing, research, and everyday tasks.",
        href: "/tools/chatgpt",
        ctaLabel: "Compare tools"
      },
      {
        icon: "CL",
        badge: "Long-form",
        title: "Claude",
        description: "A strong alternative for longer, calmer, and more structured output.",
        benefit: "Useful for reports, guides, and explanation-heavy workflows.",
        href: "/tools/claude",
        ctaLabel: "Compare tools"
      },
      {
        icon: "MJ",
        badge: "Image",
        title: "Midjourney",
        description: "A strong option for visual quality and creative output.",
        benefit: "Useful for creative delivery, concepts, and visual monetization workflows.",
        href: "/tools/midjourney",
        ctaLabel: "Compare tools"
      }
    ],
    moneyTools: [
      {
        icon: "CG",
        badge: "Content",
        title: "ChatGPT",
        description: "Useful for writing, research, and client-facing content production.",
        benefit: "A good fit for blogging, freelance writing, and content package delivery.",
        href: "/tools/chatgpt",
        ctaLabel: "Compare tools"
      },
      {
        icon: "MJ",
        badge: "Image",
        title: "Midjourney",
        description: "Useful for visuals, concept work, and creative client projects.",
        benefit: "Can fit posters, covers, social assets, and design-style deliverables.",
        href: "/tools/midjourney",
        ctaLabel: "Compare tools"
      },
      {
        icon: "GM",
        badge: "Productivity",
        title: "Gemini",
        description: "Useful for research and productivity workflows built around Google tools.",
        benefit: "A practical fit for faster information work and low-friction execution.",
        href: "/tools/gemini",
        ctaLabel: "Compare tools"
      }
    ],
    comparisons: [
      {
        icon: "VS",
        eyebrow: "Writing",
        title: "ChatGPT vs Claude",
        description: "A common comparison focused on writing quality and ease of use.",
        href: "/categories/comparisons",
        highlight: "Comparison"
      },
      {
        icon: "MJ",
        eyebrow: "Image",
        title: "Midjourney vs DALL·E",
        description: "A common comparison for image quality and creative control.",
        href: "/categories/comparisons",
        highlight: "Image"
      }
    ],
    guides: []
  }
};

export function getHomeContent(locale: Locale) {
  const base = homeContent[locale];
  const toolCount = getToolCount();
  const articleCount = blogArticles.length;
  const discoveryCount = discoveryPages.length;

  const heroStats =
    locale === "tr"
      ? [
          { value: String(toolCount), label: "küratörlü AI araç" },
          { value: String(articleCount), label: "yayındaki rehber" },
          { value: String(discoveryCount), label: "karar sayfası" }
        ]
      : [
          { value: String(toolCount), label: "curated AI tools" },
          { value: String(articleCount), label: "guides published" },
          { value: String(discoveryCount), label: "decision pages" }
        ];

  const socialProofStats =
    locale === "tr"
      ? [
          { value: String(toolCount), label: "incelenen AI araç" },
          { value: String(discoveryCount), label: "yayındaki use-case sayfası" },
          { value: String(articleCount), label: "güncel rehber" }
        ]
      : [
          { value: String(toolCount), label: "AI tools reviewed" },
          { value: String(discoveryCount), label: "use-case pages live" },
          { value: String(articleCount), label: "fresh guides" }
        ];

  return {
    ...base,
    hero: {
      ...base.hero,
      stats: heroStats
    },
    sections: {
      ...base.sections,
      hotTools:
        locale === "tr"
          ? {
              ...base.sections.hotTools,
              eyebrow: "Trending",
              title: "Şu an öne çıkan AI araçları",
              description: "Karşılaştırma ve keşif akışlarında sık açılan araçları hızlıca görün."
            }
          : {
              ...base.sections.hotTools,
              eyebrow: "Trending",
              title: "Trending AI tools right now",
              description: "Quickly review the tools that show up most often in discovery and comparison flows."
            },
      guides:
        locale === "tr"
          ? {
              ...base.sections.guides,
              eyebrow: "Discovery sayfaları",
              title: "Kararı hızlandıran en iyi sayfalar",
              description: "Para kazanma, yeni başlangıç, içerik üretimi ve freelance kullanım senaryoları için hazırlanan sayfaları açın.",
              linkLabel: "Sayfayı aç"
            }
          : {
              ...base.sections.guides,
              eyebrow: "Discovery pages",
              title: "Best pages built to speed up decisions",
              description: "Open use-case pages for monetization, beginner workflows, content creation, and freelance work.",
              linkLabel: "Open page"
            }
    },
    socialProofStats,
    guides: getHomepageDiscoveryGuides(locale)
  };
}
