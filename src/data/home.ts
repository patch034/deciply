import { blogArticles } from "@/data/blog";
import { discoveryPages, getHomepageDiscoveryGuides } from "@/data/discovery-pages";
import type { Locale, SupportedLocale } from "@/i18n/config";
import { getToolCount } from "@/lib/catalog";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
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

const homeContent: Record<"tr" | "en", HomeContent> = {
  tr: {
    hero: {
      badge: "AI araç dizini",
      title: "En iyi AI araçlarını, sitelerini ve karşılaştırmaları keşfet",
      description:
        "Kategoriler, canlı araç akışı, karşılaştırmalar ve rehberler tek bir keşif deneyiminde birleşiyor; doğru başlangıç noktasına daha hızlı ulaşıyorsun.",
      primaryCta: "Araçları keşfet",
      secondaryCta: "Karşılaştırmaları aç",
      starterHint: "",
      starterHintLabel: "",
      starterHintHref: "",
      trustLine: "Kategoriler, araçlar, karşılaştırmalar ve rehberler tek yerde.",
      panelEyebrow: "Canlı dizin",
      trustBadges: ["Kürasyonlu", "Kullanım odaklı", "Düzenli güncellenir"],
      stats: [
        { value: String(getToolCount()), label: "küratörlü araç" },
        { value: String(blogArticles.length), label: "yayındaki rehber" },
        { value: String(discoveryPages.length), label: "keşif sayfası" }
      ],
      panelTitle: "Aradığın aracı, alternatifi ve karar yolunu tek akışta gör",
      panelDescription:
        "Logo sinyalleri, kısa açıklamalar, fiyat ipuçları ve yan yana karşılaştırmalar kullanıcıyı daha hızlı doğru sayfaya taşır.",
      panelItems: [
        { title: "Kategori keşfi", meta: "yazı, görsel, video ve iş akışlarını ayrı ayrı tarayın", value: "Hızlı" },
        { title: "Araç tarama", meta: "logo, kısa açıklama ve fiyat modeli ile hızlıca filtrele", value: "Net" },
        { title: "Karşılaştırma yolu", meta: "iyi eşleşen araçları tek tıkla yan yana aç", value: "Kolay" }
      ],
      panelFootnote: "Deciply, AI araçlarını keşfetmek, karşılaştırmak ve karar vermek için tasarlanmış açık bir dizindir."
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
        title: "Karar öncesi en çok ziyaret edilen yüzeyler",
        description: "Kullanıcıyı doğru araç grubuna hızlıca yönlendiren sayfaları öne çıkar.",
        linkLabel: "Detayları gör"
      },
      socialProof: {
        eyebrow: "Güven sinyali",
        title: "Binlerce kullanıcı Deciply ile doğru AI aracına daha hızlı ulaşıyor",
        description:
          "Gerçek kullanım senaryolarına göre sıralanan araçlar, haftalık güncellemeler ve net kategori yapısı keşif sürecini sadeleştirir."
      },
      categories: {
        eyebrow: "Kategoriler",
        title: "AI kategorilerine açık ve hızlı erişin",
        description: "Yazı, görsel, video ve iş odaklı kullanım alanları için doğru başlangıç noktasını seçin.",
        linkLabel: "Detayları gör"
      },
      tools: {
        eyebrow: "Öne çıkan araçlar",
        title: "Araç kartlarıyla hızlı keşif yap",
        description:
          "Kartlar; logo, kısa özet, fiyat modeli ve uygun kullanım ile hangi aracın ne için iyi olduğunu açıkça gösterir.",
        detailLabel: "Detayları gör",
        tryLabel: "Ücretsiz Başla",
        bestForLabel: "Uygun kullanım",
        ratingLabel: "Puan"
      },
      hotTools: {
        eyebrow: "2026",
        title: "2026'da sık incelenen AI araçları",
        description: "Farklı kullanım senaryolarında sık açılan araçları hızlıca keşfedin."
      },
      makeMoney: {
        eyebrow: "Gelir odaklı seçimler",
        title: "Para kazandıran AI araçları",
        description: "İçerik üretimi, otomasyon ve freelance iş akışlarında gelir üretmeye yardımcı olabilecek araçları görün."
      },
      comparisons: {
        eyebrow: "Karşılaştırma tablosu",
        title: "Kararı hızlandıran kısa tablo",
        description: "Araçların hangi kullanım sonucuna daha uygun olduğunu tek bakışta görün.",
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
        description: "Karar vermeden önce okunabilecek kısa ve pratik rehberler.",
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
        title: "AI araçlarını şimdi keşfet ve doğru başlangıç noktasına ilerle",
        description: "Kategori sayfalarından başlayın ya da tüm araç dizininde hızlıca tarama yapın.",
        urgencyNote: "Şu anda sık incelenen araçlar",
        primaryCta: "Kategorileri keşfet",
        secondaryCta: "Araçları incele"
      }
    },
    socialProofStats: [
      { value: String(getToolCount()), label: "incelenen AI araç" },
      { value: String(discoveryPages.length), label: "yayındaki use-case sayfası" },
      { value: String(blogArticles.length), label: "güncel rehber" }
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
      title: "Discover the best AI websites and tools in one place",
      description:
        "Categories, a live tool feed, comparisons, and guides come together in one discovery-first experience.",
      primaryCta: "Explore tools",
      secondaryCta: "Open comparisons",
      starterHint: "",
      starterHintLabel: "",
      starterHintHref: "",
      trustLine: "Categories, tools, comparisons, and guides in one place.",
      panelEyebrow: "Live directory",
      trustBadges: ["Curated", "Use-case driven", "Updated regularly"],
      stats: [
        { value: String(getToolCount()), label: "curated tools" },
        { value: String(blogArticles.length), label: "guides published" },
        { value: String(discoveryPages.length), label: "discovery pages" }
      ],
      panelTitle: "See the right tool, best alternative, and compare path together",
      panelDescription:
        "Logo signals, short summaries, pricing hints, and side-by-side comparisons help users reach the right page faster.",
      panelItems: [
        { title: "Category browsing", meta: "scan writing, image, video, and business workflows separately", value: "Quick" },
        { title: "Tool scan", meta: "use logos, short descriptions, and pricing signals to filter faster", value: "Clear" },
        { title: "Compare path", meta: "open well-matched tools side by side in one click", value: "Easy" }
      ],
      panelFootnote: "Deciply is built as a clean directory for discovery, comparison, and decision support."
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
      { value: String(getToolCount()), label: "AI tools reviewed" },
      { value: String(discoveryPages.length), label: "use-case pages live" },
      { value: String(blogArticles.length), label: "fresh guides" }
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

type LocalizedHeroBase = Omit<HomeContent["hero"], "stats">;

const localizedHeroBase: Record<Locale, LocalizedHeroBase> = {
  tr: {
    badge: "AI araç dizini",
    title: "En iyi AI araçlarını, sitelerini ve karşılaştırmaları keşfet",
    description:
      "Kategoriler, canlı araç akışı, karşılaştırmalar ve rehberler tek bir keşif deneyiminde birleşiyor; doğru başlangıç noktasına daha hızlı ulaşıyorsun.",
    primaryCta: "Araçları keşfet",
    secondaryCta: "Karşılaştırmaları aç",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "Kategoriler, araçlar, karşılaştırmalar ve rehberler tek yerde.",
    panelEyebrow: "Canlı dizin",
    trustBadges: ["Kürasyonlu", "Kullanım odaklı", "Düzenli güncellenir"],
    panelTitle: "Aradığın aracı, alternatifi ve karar yolunu tek akışta gör",
    panelDescription:
      "Logo sinyalleri, kısa açıklamalar, fiyat ipuçları ve yan yana karşılaştırmalar kullanıcıyı daha hızlı doğru sayfaya taşır.",
    panelItems: [
      { title: "Kategori keşfi", meta: "yazı, görsel, video ve iş akışlarını ayrı ayrı tarayın", value: "Hızlı" },
      { title: "Araç tarama", meta: "logo, kısa açıklama ve fiyat modeli ile hızlıca filtrele", value: "Net" },
      { title: "Karşılaştırma yolu", meta: "iyi eşleşen araçları tek tıkla yan yana aç", value: "Kolay" }
    ],
    panelFootnote: "Deciply, AI araçlarını keşfetmek, karşılaştırmak ve karar vermek için tasarlanmış açık bir dizindir."
  },
  en: {
    badge: "AI tool directory",
    title: "Discover the best AI websites and tools in one place",
    description:
      "Categories, a live tool feed, comparisons, and guides come together in one discovery-first experience.",
    primaryCta: "Explore tools",
    secondaryCta: "Open comparisons",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "Categories, tools, comparisons, and guides in one place.",
    panelEyebrow: "Live directory",
    trustBadges: ["Curated", "Use-case driven", "Updated regularly"],
    panelTitle: "See the right tool, best alternative, and compare path together",
    panelDescription:
      "Logo signals, short summaries, pricing hints, and side-by-side comparisons help users reach the right page faster.",
    panelItems: [
      { title: "Category browsing", meta: "scan writing, image, video, and business workflows separately", value: "Quick" },
      { title: "Tool scan", meta: "use logos, short descriptions, and pricing signals to filter faster", value: "Clear" },
      { title: "Compare path", meta: "open well-matched tools side by side in one click", value: "Easy" }
    ],
    panelFootnote: "Deciply is built as a clean directory for discovery, comparison, and decision support."
  },
  ar: {
    badge: "دليل أدوات الذكاء الاصطناعي",
    title: "اكتشف أفضل أدوات ومواقع ومقارنات الذكاء الاصطناعي في مكان واحد",
    description:
      "الفئات وتدفق الأدوات المباشر والمقارنات والأدلة تجتمع في تجربة واحدة تساعدك على الوصول إلى الأداة المناسبة بسرعة أكبر.",
    primaryCta: "استكشف الأدوات",
    secondaryCta: "افتح المقارنات",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "الفئات والأدوات والمقارنات والأدلة في مكان واحد.",
    panelEyebrow: "الدليل المباشر",
    trustBadges: ["منسّق", "مبني على الاستخدام", "يتحدث باستمرار"],
    panelTitle: "اعرف الأداة المناسبة والبديل الأقرب ومسار المقارنة في شاشة واحدة",
    panelDescription: "إشارات الشعار والملخصات القصيرة وتلميحات الأسعار والمقارنات الجانبية تساعدك على الوصول للقرار أسرع.",
    panelItems: [
      { title: "استكشاف الفئات", meta: "تصفّح الكتابة والصور والفيديو وسير العمل بشكل منفصل", value: "سريع" },
      { title: "مسح الأدوات", meta: "راجع الشعارات والوصف المختصر والسعر بسرعة", value: "واضح" },
      { title: "مسار المقارنة", meta: "افتح الأدوات المتقاربة جنبًا إلى جنب بضغطة واحدة", value: "سهل" }
    ],
    panelFootnote: "Deciply دليل واضح لاكتشاف أدوات الذكاء الاصطناعي ومقارنتها واتخاذ القرار المناسب."
  },
  ru: {
    badge: "Каталог AI-инструментов",
    title: "Находите лучшие AI-сайты, инструменты и сравнения в одном месте",
    description:
      "Категории, живая лента инструментов, сравнения и гайды собраны в одном интерфейсе, чтобы быстрее привести вас к подходящему решению.",
    primaryCta: "Открыть инструменты",
    secondaryCta: "Открыть сравнения",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "Категории, инструменты, сравнения и гайды в одном месте.",
    panelEyebrow: "Живой каталог",
    trustBadges: ["Кураторская подборка", "По сценариям", "Регулярно обновляется"],
    panelTitle: "Смотрите подходящий инструмент, альтернативу и путь сравнения в одном потоке",
    panelDescription: "Логотипы, короткие описания, подсказки по цене и сравнения бок о бок помогают быстрее дойти до нужной страницы.",
    panelItems: [
      { title: "Навигация по категориям", meta: "отдельно просматривайте письмо, изображения, видео и бизнес-задачи", value: "Быстро" },
      { title: "Сканирование инструментов", meta: "фильтруйте по логотипу, описанию и модели цены", value: "Понятно" },
      { title: "Путь сравнения", meta: "открывайте подходящие инструменты рядом в один клик", value: "Легко" }
    ],
    panelFootnote: "Deciply — это понятный каталог для поиска, сравнения и выбора AI-инструментов."
  },
  zh: {
    badge: "AI 工具目录",
    title: "在一个地方发现优质 AI 工具、网站与对比",
    description:
      "分类、实时工具流、对比和指南整合成一套发现体验，帮助你更快找到合适的起点。",
    primaryCta: "探索工具",
    secondaryCta: "查看对比",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "分类、工具、对比和指南都集中在一个地方。",
    panelEyebrow: "实时目录",
    trustBadges: ["精选整理", "按场景组织", "持续更新"],
    panelTitle: "在同一条流里看到合适工具、替代方案和对比路径",
    panelDescription: "Logo 信号、简短说明、价格提示和并排对比，能帮助你更快进入正确页面。",
    panelItems: [
      { title: "分类探索", meta: "分别浏览写作、图像、视频和业务工作流", value: "高效" },
      { title: "工具速览", meta: "通过 logo、简介和价格模式快速筛选", value: "清晰" },
      { title: "对比路径", meta: "一键并排打开更适合的工具", value: "轻松" }
    ],
    panelFootnote: "Deciply 是一个帮助你发现、对比并做出 AI 工具决策的清晰目录。"
  },
  ja: {
    badge: "AIツールディレクトリ",
    title: "優れた AI ツール、サイト、比較をひとつの場所で見つける",
    description:
      "カテゴリ、ライブツールフィード、比較、ガイドをひとつにまとめ、最適な選択肢へより早くたどり着けるようにします。",
    primaryCta: "ツールを見る",
    secondaryCta: "比較を見る",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "カテゴリ、ツール、比較、ガイドをひとつの画面で確認できます。",
    panelEyebrow: "ライブディレクトリ",
    trustBadges: ["厳選済み", "用途ベース", "継続更新"],
    panelTitle: "最適なツール、代替候補、比較ルートをひとつの流れで把握",
    panelDescription: "ロゴ、短い説明、価格のヒント、並列比較によって、目的のページまでより速く進めます。",
    panelItems: [
      { title: "カテゴリ探索", meta: "文章、画像、動画、業務フローを個別に確認", value: "速い" },
      { title: "ツール確認", meta: "ロゴ、概要、価格からすばやく絞り込む", value: "明確" },
      { title: "比較ルート", meta: "相性の良いツールをワンクリックで横並び表示", value: "簡単" }
    ],
    panelFootnote: "Deciply は AI ツールの発見、比較、判断を支えるための整理されたディレクトリです。"
  },
  ko: {
    badge: "AI 도구 디렉터리",
    title: "최고의 AI 도구, 사이트, 비교를 한 곳에서 발견하세요",
    description:
      "카테고리, 실시간 도구 피드, 비교, 가이드를 하나의 탐색 경험으로 묶어 더 빠르게 적합한 선택지에 도달하게 합니다.",
    primaryCta: "도구 탐색",
    secondaryCta: "비교 열기",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "카테고리, 도구, 비교, 가이드를 한곳에서 볼 수 있습니다.",
    panelEyebrow: "라이브 디렉터리",
    trustBadges: ["큐레이션됨", "활용 중심", "정기 업데이트"],
    panelTitle: "적합한 도구, 대안, 비교 경로를 하나의 흐름에서 확인",
    panelDescription: "로고 신호, 짧은 설명, 가격 힌트, 나란히 비교를 통해 올바른 페이지에 더 빨리 도달할 수 있습니다.",
    panelItems: [
      { title: "카테고리 탐색", meta: "글쓰기, 이미지, 영상, 비즈니스 흐름을 따로 살펴보기", value: "빠름" },
      { title: "도구 스캔", meta: "로고, 요약, 가격 모델로 빠르게 필터링", value: "명확" },
      { title: "비교 경로", meta: "잘 맞는 도구를 한 번에 나란히 열기", value: "쉬움" }
    ],
    panelFootnote: "Deciply는 AI 도구를 탐색하고 비교하며 더 나은 결정을 돕기 위해 설계된 정돈된 디렉터리입니다."
  },
  el: {
    badge: "Κατάλογος εργαλείων AI",
    title: "Ανακάλυψε τα καλύτερα εργαλεία, sites και συγκρίσεις AI σε ένα σημείο",
    description:
      "Κατηγορίες, live ροή εργαλείων, συγκρίσεις και οδηγοί συνδυάζονται σε μία εμπειρία που σε οδηγεί πιο γρήγορα στη σωστή επιλογή.",
    primaryCta: "Εξερεύνησε εργαλεία",
    secondaryCta: "Άνοιξε συγκρίσεις",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "Κατηγορίες, εργαλεία, συγκρίσεις και οδηγοί σε ένα μέρος.",
    panelEyebrow: "Live κατάλογος",
    trustBadges: ["Επιλεγμένο", "Βασισμένο σε use case", "Συχνά ενημερωμένο"],
    panelTitle: "Δες το σωστό εργαλείο, την καλύτερη εναλλακτική και τη διαδρομή σύγκρισης μαζί",
    panelDescription: "Λογότυπα, σύντομες περιγραφές, hints τιμής και side-by-side συγκρίσεις σε οδηγούν πιο γρήγορα στη σωστή σελίδα.",
    panelItems: [
      { title: "Εξερεύνηση κατηγοριών", meta: "δείτε ξεχωριστά writing, image, video και business flows", value: "Γρήγορα" },
      { title: "Σάρωση εργαλείων", meta: "φίλτραρε πιο γρήγορα με λογότυπο, σύνοψη και τιμή", value: "Καθαρά" },
      { title: "Διαδρομή σύγκρισης", meta: "άνοιξε καλά ταιριασμένα εργαλεία δίπλα δίπλα με ένα κλικ", value: "Εύκολα" }
    ],
    panelFootnote: "Το Deciply είναι ένας καθαρός κατάλογος για ανακάλυψη, σύγκριση και επιλογή εργαλείων AI."
  },
  da: {
    badge: "AI-værktøjskatalog",
    title: "Find de bedste AI-værktøjer, websites og sammenligninger ét sted",
    description:
      "Kategorier, live værktøjsfeed, sammenligninger og guides samles i én oplevelse, så du hurtigere finder det rigtige udgangspunkt.",
    primaryCta: "Udforsk værktøjer",
    secondaryCta: "Åbn sammenligninger",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "Kategorier, værktøjer, sammenligninger og guides samlet ét sted.",
    panelEyebrow: "Live katalog",
    trustBadges: ["Kurateret", "Use-case baseret", "Opdateres løbende"],
    panelTitle: "Se det rigtige værktøj, alternativer og sammenligningsveje i ét flow",
    panelDescription: "Logosignaler, korte beskrivelser, prishints og side-by-side sammenligninger gør det lettere at lande på den rigtige side.",
    panelItems: [
      { title: "Kategoriopdagelse", meta: "gennemse skrivning, billede, video og business-workflows separat", value: "Hurtigt" },
      { title: "Værktøjsoverblik", meta: "brug logo, kort beskrivelse og prismodel til at filtrere hurtigere", value: "Klart" },
      { title: "Sammenligningsspor", meta: "åbn værktøjer side om side med ét klik", value: "Let" }
    ],
    panelFootnote: "Deciply er et klart katalog til at opdage, sammenligne og vælge AI-værktøjer."
  },
  fa: {
    badge: "دایرکتوری ابزارهای AI",
    title: "بهترین ابزارها، سایت‌ها و مقایسه‌های هوش مصنوعی را در یک‌جا پیدا کنید",
    description:
      "دسته‌ها، جریان زنده ابزارها، مقایسه‌ها و راهنماها در یک تجربه کشف کنار هم قرار می‌گیرند تا سریع‌تر به انتخاب مناسب برسید.",
    primaryCta: "کاوش ابزارها",
    secondaryCta: "باز کردن مقایسه‌ها",
    starterHint: "",
    starterHintLabel: "",
    starterHintHref: "",
    trustLine: "دسته‌ها، ابزارها، مقایسه‌ها و راهنماها در یک‌جا.",
    panelEyebrow: "دایرکتوری زنده",
    trustBadges: ["منتخب", "بر پایه کاربرد", "به‌روزرسانی مداوم"],
    panelTitle: "ابزار مناسب، گزینه جایگزین و مسیر مقایسه را در یک جریان ببینید",
    panelDescription: "نشانه‌های لوگو، توضیح کوتاه، سرنخ قیمت و مقایسه‌های کنار هم کمک می‌کنند سریع‌تر به صفحه درست برسید.",
    panelItems: [
      { title: "کشف دسته‌ها", meta: "نوشتن، تصویر، ویدیو و جریان‌های کاری را جداگانه مرور کنید", value: "سریع" },
      { title: "مرور ابزارها", meta: "با لوگو، توضیح کوتاه و مدل قیمت سریع‌تر فیلتر کنید", value: "شفاف" },
      { title: "مسیر مقایسه", meta: "ابزارهای مناسب را با یک کلیک کنار هم باز کنید", value: "آسان" }
    ],
    panelFootnote: "Deciply یک دایرکتوری شفاف برای کشف، مقایسه و تصمیم‌گیری درباره ابزارهای هوش مصنوعی است."
  }
};

const heroStatLabels: Record<Locale, [string, string, string]> = {
  tr: ["küratörlü AI araç", "yayındaki rehber", "karar sayfası"],
  en: ["curated AI tools", "guides published", "decision pages"],
  ar: ["أداة AI منسقة", "دليل منشور", "صفحة قرار"],
  ru: ["курируемых AI-инструментов", "опубликованных гайдов", "страниц выбора"],
  zh: ["精选 AI 工具", "已发布指南", "决策页面"],
  ja: ["厳選AIツール", "公開ガイド", "比較ページ"],
  ko: ["큐레이션된 AI 도구", "게시된 가이드", "결정 페이지"],
  el: ["επιλεγμένα εργαλεία AI", "δημοσιευμένοι οδηγοί", "σελίδες απόφασης"],
  da: ["kuraterede AI-værktøjer", "publicerede guides", "beslutningssider"],
  fa: ["ابزار AI منتخب", "راهنمای منتشرشده", "صفحه تصمیم‌گیری"]
};

const socialProofStatLabels: Record<Locale, [string, string, string]> = {
  tr: ["incelenen AI araç", "yayındaki use-case sayfası", "güncel rehber"],
  en: ["AI tools reviewed", "use-case pages live", "fresh guides"],
  ar: ["أداة AI تمت مراجعتها", "صفحة use case منشورة", "دليل محدث"],
  ru: ["AI-инструментов в обзоре", "активных use-case страниц", "свежих гайдов"],
  zh: ["已评估 AI 工具", "上线中的 use case 页面", "最新指南"],
  ja: ["レビュー済みAIツール", "公開中のユースケースページ", "最新ガイド"],
  ko: ["검토된 AI 도구", "운영 중인 활용 사례 페이지", "최신 가이드"],
  el: ["AI εργαλεία με αξιολόγηση", "ενεργές use-case σελίδες", "νέοι οδηγοί"],
  da: ["AI-værktøjer gennemgået", "aktive use-case sider", "nye guides"],
  fa: ["ابزار AI بررسی‌شده", "صفحه use case فعال", "راهنمای تازه"]
};

function buildHeroContent(locale: Locale, toolCount: number, articleCount: number, discoveryCount: number): HomeContent["hero"] {
  return {
    ...localizedHeroBase[locale],
    stats: [
      { value: String(toolCount), label: heroStatLabels[locale][0] },
      { value: String(articleCount), label: heroStatLabels[locale][1] },
      { value: String(discoveryCount), label: heroStatLabels[locale][2] }
    ]
  };
}

function buildSocialProofStats(locale: Locale, toolCount: number, articleCount: number, discoveryCount: number) {
  return [
    { value: String(toolCount), label: socialProofStatLabels[locale][0] },
    { value: String(discoveryCount), label: socialProofStatLabels[locale][1] },
    { value: String(articleCount), label: socialProofStatLabels[locale][2] }
  ];
}

export function getHomeContent(locale: SupportedLocale) {
  const base = localizeTree(locale, homeContent[getContentBaseLocale(locale)]);
  const toolCount = getToolCount();
  const articleCount = blogArticles.length;
  const discoveryCount = discoveryPages.length;

  const content = {
    ...base,
    hero: {
      ...buildHeroContent(locale, toolCount, articleCount, discoveryCount)
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
    socialProofStats: buildSocialProofStats(locale, toolCount, articleCount, discoveryCount),
    guides: getHomepageDiscoveryGuides(locale)
  };

  return content;
}

