import type { Locale } from "@/i18n/config";
import type { MoneyUseCase, PricingTier, ToolEntry } from "@/types/catalog";

type LocaleSeed = {
  shortDescription: string;
  bestUseCase: string;
  whoShouldUse: string[];
  workflowExampleTitle: string;
  workflowExampleDescription: string;
  strengths: string[];
  limitations: string[];
  seoTitle: string;
  seoDescription: string;
};

type ToolSeed = {
  name: string;
  slug: string;
  pricing: PricingTier;
  websiteUrl: string;
  affiliateUrl: string;
  primaryCategorySlug: "writing" | "image" | "video" | "productivity";
  categorySlugs: string[];
  toolCategorySlugs: string[];
  useCaseSlugs: string[];
  rating: number;
  featured: boolean;
  locales: Record<Locale, LocaleSeed>;
};

function buildMoneyUseCases(locale: Locale, name: string, bestUseCase: string, workflowExampleDescription: string): MoneyUseCase[] {
  if (locale === "tr") {
    return [
      { title: "Müşteri işi", description: `${name} ile ${bestUseCase.toLocaleLowerCase("tr-TR")} teslimlerini daha tutarlı hazırlayabilirsiniz.` },
      { title: "Tekrarlayan teslim", description: `${workflowExampleDescription} Bu, tekrar eden işleri hızlandırır.` }
    ];
  }

  return [
    { title: "Client work", description: `${name} can help you deliver ${bestUseCase.toLowerCase()} work more consistently.` },
    { title: "Repeatable delivery", description: `${workflowExampleDescription} That makes recurring work faster.` }
  ];
}

function buildLocale(locale: Locale, name: string, seed: LocaleSeed) {
  const longDescription =
    locale === "tr"
      ? `${name}, ${seed.bestUseCase.toLocaleLowerCase("tr-TR")} odaklı çalışan ekipler için pratik bir seçenektir. ${seed.workflowExampleDescription}`
      : `${name} is a practical fit for teams focused on ${seed.bestUseCase.toLowerCase()}. ${seed.workflowExampleDescription}`;

  return {
    name,
    shortDescription: seed.shortDescription,
    longDescription,
    bestUseCase: seed.bestUseCase,
    whoShouldUse: seed.whoShouldUse,
    moneyUseCases: buildMoneyUseCases(locale, name, seed.bestUseCase, seed.workflowExampleDescription),
    features: [seed.shortDescription, seed.bestUseCase, seed.workflowExampleTitle, seed.strengths[0]],
    pros: seed.strengths,
    cons: seed.limitations,
    seoTitle: seed.seoTitle,
    seoDescription: seed.seoDescription
  };
}

function buildTool(seed: ToolSeed): ToolEntry {
  return {
    slug: seed.slug,
    pricing: seed.pricing,
    websiteUrl: seed.websiteUrl,
    affiliateUrl: seed.affiliateUrl,
    primaryCategorySlug: seed.primaryCategorySlug,
    categorySlugs: seed.categorySlugs,
    toolCategorySlugs: seed.toolCategorySlugs,
    useCaseSlugs: seed.useCaseSlugs,
    rating: seed.rating,
    featured: seed.featured,
    locales: {
      tr: buildLocale("tr", seed.name, seed.locales.tr),
      en: buildLocale("en", seed.name, seed.locales.en)
    }
  };
}

const sharedGuideCategories = ["ai-tools", "comparisons", "guides"];

const premiumSeeds: ToolSeed[] = [  {
    name: "Hootsuite OwlyWriter AI",
    slug: "hootsuite-owlywriter-ai",
    pricing: "PAID",
    websiteUrl: "https://www.hootsuite.com/platform/owlywriter-ai",
    affiliateUrl: "https://www.hootsuite.com/platform/owlywriter-ai",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["marketing", "creators", "business"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Sosyal medya başlıkları, fikirler ve kampanya metinleri için odaklı bir üretim yardımcısı.",
        bestUseCase: "Sosyal medya kampanya metni",
        whoShouldUse: ["Sosyal medya ekipleri", "Ajanslar", "Markalar"],
        workflowExampleTitle: "Kampanya metnini çeşitlendirin",
        workflowExampleDescription: "Bir ekip aynı mesaj için birkaç paylaşım varyasyonu üretip test edebilir.",
        strengths: ["Sosyal platform uyumu", "Hızlı varyasyon", "Kampanya desteği"],
        limitations: ["Hootsuite kullanan ekiplerde daha anlamlıdır", "Uzun form içerik için sınırlı"],
        seoTitle: "Hootsuite OwlyWriter AI incelemesi",
        seoDescription: "OwlyWriter AI'nin sosyal medya kampanya ve başlık üretimindeki değerini inceleyin."
      },
      en: {
        shortDescription: "A focused creation helper for social headlines, ideas, and campaign copy.",
        bestUseCase: "Social campaign copy",
        whoShouldUse: ["Social teams", "Agencies", "Brands"],
        workflowExampleTitle: "Create copy variations",
        workflowExampleDescription: "A team can produce and test several post variations for the same message.",
        strengths: ["Social fit", "Fast variations", "Campaign support"],
        limitations: ["Most useful inside Hootsuite", "Limited for long-form content"],
        seoTitle: "Hootsuite OwlyWriter AI review",
        seoDescription: "Review OwlyWriter AI for social campaign and headline generation."
      }
    }
  },
  {
    name: "Sprout Social AI",
    slug: "sprout-social-ai",
    pricing: "PAID",
    websiteUrl: "https://sproutsocial.com/",
    affiliateUrl: "https://sproutsocial.com/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["marketing", "creators", "business"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Sosyal içerik planlaması, metin kalitesi ve yayın akışını birleştiren kurumsal bir araç.",
        bestUseCase: "Sosyal medya operasyonu",
        whoShouldUse: ["Sosyal ekipler", "Ajanslar", "Marka yöneticileri"],
        workflowExampleTitle: "Haftalık planı hızlandırın",
        workflowExampleDescription: "Bir ekip haftalık post planını ve açıklamaları daha düzenli bir şekilde oluşturabilir.",
        strengths: ["Kurumsal his", "Planlama desteği", "Sosyal odak"],
        limitations: ["Daha ciddi ekipler için uygundur", "Küçük kullanım için ağır kalabilir"],
        seoTitle: "Sprout Social AI incelemesi",
        seoDescription: "Sprout Social AI'nin sosyal operasyon ve yayın planlamasındaki rolünü inceleyin."
      },
      en: {
        shortDescription: "An enterprise-grade tool for social planning, copy quality, and publishing workflow.",
        bestUseCase: "Social media operations",
        whoShouldUse: ["Social teams", "Agencies", "Brand managers"],
        workflowExampleTitle: "Speed up the weekly plan",
        workflowExampleDescription: "A team can build a more organized weekly post plan and captions.",
        strengths: ["Enterprise feel", "Planning support", "Social focus"],
        limitations: ["Better for serious teams", "May feel heavy for light use"],
        seoTitle: "Sprout Social AI review",
        seoDescription: "Review Sprout Social AI for social operations and publishing planning."
      }
    }
  },
  {
    name: "Webflow AI",
    slug: "webflow-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://webflow.com/ai",
    affiliateUrl: "https://webflow.com/ai",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "design"],
    useCaseSlugs: ["business", "freelancers", "creators"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Web sitesi içerikleri ve sayfa yapısı oluşturmayı hızlandıran web odaklı bir AI desteği.",
        bestUseCase: "Site kurgusu ve landing page metni",
        whoShouldUse: ["Web tasarımcıları", "Startup ekipleri", "Freelancer'lar"],
        workflowExampleTitle: "Landing sayfası iskeleti çıkarın",
        workflowExampleDescription: "Bir ekip Webflow AI ile sayfa bölümlerini ve giriş metnini daha hızlı kurabilir.",
        strengths: ["Web odaklı", "Hızlı başlangıç", "Tasarım iş akışına yakın"],
        limitations: ["Webflow merkezli kullanımda daha güçlüdür", "Derin içerik stratejisini tek başına çözmez"],
        seoTitle: "Webflow AI incelemesi",
        seoDescription: "Webflow AI'nin site kurgusu ve landing page üretimindeki değerini inceleyin."
      },
      en: {
        shortDescription: "A web-focused AI helper that speeds up site copy and page structure work.",
        bestUseCase: "Site structure and landing page copy",
        whoShouldUse: ["Web designers", "Startup teams", "Freelancers"],
        workflowExampleTitle: "Draft a landing page structure",
        workflowExampleDescription: "A team can build page sections and intro copy faster with Webflow AI.",
        strengths: ["Web-first", "Fast start", "Close to design workflows"],
        limitations: ["Stronger inside Webflow", "Does not solve deep content strategy alone"],
        seoTitle: "Webflow AI review",
        seoDescription: "Review Webflow AI for site structure and landing page creation."
      }
    }
  },
  {
    name: "Relume",
    slug: "relume",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.relume.io/",
    affiliateUrl: "https://www.relume.io/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "design"],
    useCaseSlugs: ["business", "creators", "freelancers"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Sitemap, wireframe ve web sayfası planlaması için güçlü bir tasarım başlangıç noktası.",
        bestUseCase: "Web yapısı ve wireframe planlama",
        whoShouldUse: ["Tasarımcılar", "Ajanslar", "Startup ekipleri"],
        workflowExampleTitle: "Site haritasını kurun",
        workflowExampleDescription: "Bir ekip Relume ile bir site yapısını sayfa sayfa planlayabilir.",
        strengths: ["Wireframe hızı", "Web planı", "Ajans dostu"],
        limitations: ["Uygulama katmanı değildir", "Son tasarım ve kopya gerekir"],
        seoTitle: "Relume incelemesi",
        seoDescription: "Relume'un web yapısı, wireframe ve site planlama değerini inceleyin."
      },
      en: {
        shortDescription: "A strong starting point for sitemaps, wireframes, and web page planning.",
        bestUseCase: "Web structure and wireframe planning",
        whoShouldUse: ["Designers", "Agencies", "Startup teams"],
        workflowExampleTitle: "Build the sitemap",
        workflowExampleDescription: "A team can plan a site structure page by page with Relume.",
        strengths: ["Wireframe speed", "Web planning", "Agency friendly"],
        limitations: ["Not an implementation layer", "Still needs final design and copy"],
        seoTitle: "Relume review",
        seoDescription: "Review Relume for web structure, wireframes, and site planning."
      }
    }
  },
  {
    name: "Uizard",
    slug: "uizard",
    pricing: "FREEMIUM",
    websiteUrl: "https://uizard.io/",
    affiliateUrl: "https://uizard.io/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "design"],
    useCaseSlugs: ["business", "creators", "freelancers"],
    rating: 4.4,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Fikirden ekrana hızlı geçmek isteyen ekipler için tasarım prototipi oluşturma aracı.",
        bestUseCase: "UI prototipi ve hızlı mockup",
        whoShouldUse: ["Tasarımcılar", "Ürün ekipleri", "Girişimler"],
        workflowExampleTitle: "Bir ekran taslağı çıkarın",
        workflowExampleDescription: "Bir ekip Uizard ile ilk uygulama veya ürün ekranını hızlıca taslaklayabilir.",
        strengths: ["Hızlı prototip", "Tasarım kolaylığı", "Başlangıç dostu"],
        limitations: ["Nihai tasarım aracı değildir", "Detaylı sistemlerde son düzen gerekir"],
        seoTitle: "Uizard incelemesi",
        seoDescription: "Uizard'ın UI prototip ve mockup üretimindeki değerini inceleyin."
      },
      en: {
        shortDescription: "A prototype tool for teams that want to move from idea to screen quickly.",
        bestUseCase: "UI prototypes and quick mockups",
        whoShouldUse: ["Designers", "Product teams", "Startups"],
        workflowExampleTitle: "Draft a screen mockup",
        workflowExampleDescription: "A team can sketch the first app or product screen with Uizard quickly.",
        strengths: ["Fast prototyping", "Easy design flow", "Beginner friendly"],
        limitations: ["Not a final design tool", "Needs refinement for detailed systems"],
        seoTitle: "Uizard review",
        seoDescription: "Review Uizard for UI prototypes and mockup creation."
      }
    }
  },
  {
    name: "Durable",
    slug: "durable",
    pricing: "FREEMIUM",
    websiteUrl: "https://durable.co/",
    affiliateUrl: "https://durable.co/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "design"],
    useCaseSlugs: ["business", "freelancers", "creators"],
    rating: 4.3,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Küçük işletmeler için hızlı web sitesi, işletme metni ve başlangıç varlıkları üreten bir araç.",
        bestUseCase: "Küçük işletme sitesi ve başlangıç metni",
        whoShouldUse: ["Küçük işletme sahipleri", "Freelancer'lar", "Ajanslar"],
        workflowExampleTitle: "İlk site taslağını çıkarın",
        workflowExampleDescription: "Bir kullanıcı birkaç dakika içinde temel site yapısını oluşturabilir.",
        strengths: ["Hızlı başlangıç", "İşletme dostu", "Basit kurulum"],
        limitations: ["Kapsamlı marka sistemi sunmaz", "Nihai içerik düzeni gerekir"],
        seoTitle: "Durable incelemesi",
        seoDescription: "Durable'ın küçük işletme sitesi ve başlangıç varlıklarındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A tool for small businesses that need fast websites, copy, and starter assets.",
        bestUseCase: "Small business sites and startup copy",
        whoShouldUse: ["Small business owners", "Freelancers", "Agencies"],
        workflowExampleTitle: "Draft the first site version",
        workflowExampleDescription: "A user can create a basic site structure in a few minutes.",
        strengths: ["Fast start", "Business friendly", "Simple setup"],
        limitations: ["Not a full brand system", "Final copy still needs review"],
        seoTitle: "Durable review",
        seoDescription: "Review Durable for small business websites and starter assets."
      }
    }
  },
  {
    name: "Bardeen",
    slug: "bardeen",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.bardeen.ai/",
    affiliateUrl: "https://www.bardeen.ai/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "sales", "marketing"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Tekrarlayan işleri otomatikleştirmek ve farklı araçlar arasında veri taşımak için güçlü bir yardımcı.",
        bestUseCase: "Otomasyon ve rutin iş azaltma",
        whoShouldUse: ["Operasyon ekipleri", "Güç kullanıcıları", "Kurucular"],
        workflowExampleTitle: "Tekrarlayan işlemi otomatikleştirin",
        workflowExampleDescription: "Bir ekip veri toplama veya güncelleme adımlarını daha hızlı hale getirebilir.",
        strengths: ["Otomasyon odağı", "Rutin işi azaltma", "Araçlar arası köprü"],
        limitations: ["Her otomasyon akışı için uygun değildir", "Kurulum düşünce ister"],
        seoTitle: "Bardeen incelemesi",
        seoDescription: "Bardeen'in otomasyon, rutin iş azaltma ve araçlar arası iş akışlarındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A strong helper for automating repeat work and moving data between tools.",
        bestUseCase: "Automation and repetitive task reduction",
        whoShouldUse: ["Operations teams", "Power users", "Founders"],
        workflowExampleTitle: "Automate a repetitive step",
        workflowExampleDescription: "A team can make data collection or update steps much faster.",
        strengths: ["Automation focus", "Repeat work reduction", "Tool bridging"],
        limitations: ["Not for every workflow", "Setup needs some thought"],
        seoTitle: "Bardeen review",
        seoDescription: "Review Bardeen for automation, repetitive task reduction, and tool-to-tool workflows."
      }
    }
  },
  {
    name: "MarketMuse",
    slug: "marketmuse",
    pricing: "PAID",
    websiteUrl: "https://www.marketmuse.com/",
    affiliateUrl: "https://www.marketmuse.com/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "seo"],
    useCaseSlugs: ["marketing", "business", "freelancers"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "İçerik boşluklarını, konu kapsamını ve SEO odaklı planlamayı görmek isteyen ekipler için güçlü bir araç.",
        bestUseCase: "SEO içerik stratejisi",
        whoShouldUse: ["SEO ekipleri", "İçerik pazarlamacıları", "Ajanslar"],
        workflowExampleTitle: "Konu kapsamını ölçün",
        workflowExampleDescription: "Bir ekip MarketMuse ile hangi alt başlıkların eksik kaldığını daha net görebilir.",
        strengths: ["Konu kapsamı", "Strateji desteği", "SEO planlama"],
        limitations: ["Hafif kullanım için ağır olabilir", "En iyi değer SEO ekibinde"],
        seoTitle: "MarketMuse incelemesi",
        seoDescription: "MarketMuse'un konu kapsamı, SEO içerik stratejisi ve planlama değerini inceleyin."
      },
      en: {
        shortDescription: "A strong option for content gaps, topical coverage, and SEO planning insights.",
        bestUseCase: "SEO content strategy",
        whoShouldUse: ["SEO teams", "Content marketers", "Agencies"],
        workflowExampleTitle: "Measure topic coverage",
        workflowExampleDescription: "A team can see which subtopics still need coverage more clearly.",
        strengths: ["Topical coverage", "Strategy support", "SEO planning"],
        limitations: ["Can feel heavy for light use", "Best value appears in SEO teams"],
        seoTitle: "MarketMuse review",
        seoDescription: "Review MarketMuse for topical coverage, SEO strategy, and planning value."
      }
    }
  },
  {
    name: "Frase",
    slug: "frase",
    pricing: "PAID",
    websiteUrl: "https://www.frase.io/",
    affiliateUrl: "https://www.frase.io/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "seo"],
    useCaseSlugs: ["marketing", "business", "freelancers"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Arama niyeti, içerik özeti ve hızlı blog taslağı için iyi dengelenmiş bir SEO aracı.",
        bestUseCase: "SEO blog taslağı ve içerik özeti",
        whoShouldUse: ["SEO ekipleri", "Freelance yazarlar", "Ajanslar"],
        workflowExampleTitle: "Blog özeti çıkarın",
        workflowExampleDescription: "Bir ekip Frase ile başlık, soru ve alt konu listesini daha hızlı toparlayabilir.",
        strengths: ["Özetleme", "SEO odak", "Hızlı taslak"],
        limitations: ["En iyi değer içerik süreçlerinde", "Genel amaçlı araç gibi değil"],
        seoTitle: "Frase incelemesi",
        seoDescription: "Frase'in SEO blog taslakları, içerik özeti ve arama niyeti uyumundaki değerini inceleyin."
      },
      en: {
        shortDescription: "A balanced SEO tool for search intent, content briefs, and faster blog drafts.",
        bestUseCase: "SEO blog drafts and content briefs",
        whoShouldUse: ["SEO teams", "Freelance writers", "Agencies"],
        workflowExampleTitle: "Build the article brief",
        workflowExampleDescription: "A team can organize headings, questions, and subtopics faster with Frase.",
        strengths: ["Briefing", "SEO focus", "Fast drafting"],
        limitations: ["Best in content workflows", "Not a general-purpose app"],
        seoTitle: "Frase review",
        seoDescription: "Review Frase for SEO blog drafts, content briefs, and search intent alignment."
      }
    }
  },
  {
    name: "Writer",
    slug: "writer",
    pricing: "PAID",
    websiteUrl: "https://writer.com/",
    affiliateUrl: "https://writer.com/",
    primaryCategorySlug: "writing",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["business", "marketing", "freelancers"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Kurumsal yazım, marka dili ve ekip içi metin standardı için güvenilir bir araç.",
        bestUseCase: "Kurumsal içerik ve brand voice yönetimi",
        whoShouldUse: ["İçerik ekipleri", "Pazarlama liderleri", "Ajanslar"],
        workflowExampleTitle: "Marka dilini sabitleyin",
        workflowExampleDescription: "Bir ekip Writer ile sık kullanılan mesajları ve ton kurallarını standardize edebilir.",
        strengths: ["Marka dili kontrolü", "Ekip standardı", "Tutarlı metin üretimi"],
        limitations: ["Serbest yaratıcı yazımdan çok sistemli kullanımda parlar", "Her ekip için gerekli değildir"],
        seoTitle: "Writer incelemesi",
        seoDescription: "Writer'ın kurumsal yazım, marka dili ve ekip standardizasyonu değerini inceleyin."
      },
      en: {
        shortDescription: "A reliable tool for enterprise writing, brand voice, and team-wide content standards.",
        bestUseCase: "Corporate content and brand voice management",
        whoShouldUse: ["Content teams", "Marketing leaders", "Agencies"],
        workflowExampleTitle: "Lock in brand voice",
        workflowExampleDescription: "A team can standardize common messages and tone rules with Writer.",
        strengths: ["Brand voice control", "Team standards", "Consistent writing"],
        limitations: ["Works best in structured workflows", "Not needed by every team"],
        seoTitle: "Writer review",
        seoDescription: "Review Writer for enterprise writing, brand voice, and team standardization."
      }
    }
  },
  {
    name: "Microsoft Copilot",
    slug: "microsoft-copilot",
    pricing: "FREEMIUM",
    websiteUrl: "https://copilot.microsoft.com/",
    affiliateUrl: "https://copilot.microsoft.com/",
    primaryCategorySlug: "productivity",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "students", "marketing"],
    rating: 4.8,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Günlük iş, araştırma ve Microsoft ekosistemi içindeki üretkenlik görevleri için çok yönlü bir asistan.",
        bestUseCase: "Genel üretkenlik ve doküman desteği",
        whoShouldUse: ["Ofis çalışanları", "Öğrenciler", "Kurumsal ekipler"],
        workflowExampleTitle: "Toplantı notlarını özetleyin",
        workflowExampleDescription: "Bir ekip Copilot ile e-posta, doküman ve toplantı özetlerini hızla toparlayabilir.",
        strengths: ["Geniş kullanım alanı", "Microsoft araçlarıyla uyum", "Hızlı özetleme"],
        limitations: ["Derin uzmanlık yerine genel destek sunar", "En iyi değer Microsoft akışlarında"],
        seoTitle: "Microsoft Copilot incelemesi",
        seoDescription: "Microsoft Copilot'un genel üretkenlik ve doküman desteğindeki yerini inceleyin."
      },
      en: {
        shortDescription: "A versatile assistant for daily work, research, and Microsoft ecosystem productivity tasks.",
        bestUseCase: "General productivity and document support",
        whoShouldUse: ["Office workers", "Students", "Enterprise teams"],
        workflowExampleTitle: "Summarize meeting notes",
        workflowExampleDescription: "A team can quickly turn emails, docs, and meeting notes into usable summaries.",
        strengths: ["Broad utility", "Microsoft ecosystem fit", "Fast summarization"],
        limitations: ["General support rather than deep specialization", "Best value inside Microsoft workflows"],
        seoTitle: "Microsoft Copilot review",
        seoDescription: "Review Microsoft Copilot for general productivity and document support."
      }
    }
  },
  {
    name: "Microsoft Designer",
    slug: "microsoft-designer",
    pricing: "FREEMIUM",
    websiteUrl: "https://designer.microsoft.com/",
    affiliateUrl: "https://designer.microsoft.com/",
    primaryCategorySlug: "image",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["image", "design"],
    useCaseSlugs: ["creators", "marketing", "business"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Sosyal medya görselleri, banner'lar ve hızlı kampanya tasarımları için pratik bir seçenek.",
        bestUseCase: "Hızlı pazarlama görseli üretimi",
        whoShouldUse: ["Pazarlama ekipleri", "Sosyal medya yöneticileri", "Küçük işletmeler"],
        workflowExampleTitle: "Kampanya görseli oluşturun",
        workflowExampleDescription: "Bir ekip kısa bir brief girip birkaç görsel varyasyonunu hızlıca test edebilir.",
        strengths: ["Hızlı taslak üretimi", "Kolay kullanım", "Sosyal içerik için uygun"],
        limitations: ["Detaylı profesyonel tasarım yerine hızlı üretimde güçlüdür", "Her marka için tek başına yeterli olmayabilir"],
        seoTitle: "Microsoft Designer incelemesi",
        seoDescription: "Microsoft Designer'ın hızlı görsel üretim ve kampanya tasarımındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A practical option for social graphics, banners, and quick campaign design work.",
        bestUseCase: "Fast marketing visual production",
        whoShouldUse: ["Marketing teams", "Social media managers", "Small businesses"],
        workflowExampleTitle: "Create a campaign visual",
        workflowExampleDescription: "A team can enter a short brief and test several visual variations quickly.",
        strengths: ["Fast drafts", "Easy to use", "Good for social content"],
        limitations: ["Stronger for speed than deep professional design", "May not be enough on its own for every brand"],
        seoTitle: "Microsoft Designer review",
        seoDescription: "Review Microsoft Designer for fast visual production and campaign design."
      }
    }
  },
  {
    name: "Adobe Express",
    slug: "adobe-express",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.adobe.com/express/",
    affiliateUrl: "https://www.adobe.com/express/",
    primaryCategorySlug: "image",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["image", "design"],
    useCaseSlugs: ["creators", "marketing", "business"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Marka materyalleri, hızlı düzenleme ve içerik üretim hızını artıran esnek bir yaratıcı araç.",
        bestUseCase: "Pazarlama ve sosyal tasarım",
        whoShouldUse: ["İçerik üreticileri", "Pazarlama ekipleri", "Tasarımcılar"],
        workflowExampleTitle: "Bir sosyal paylaşım seti hazırlayın",
        workflowExampleDescription: "Bir ekip şablonlarla görsel üretip son düzenlemeyi Adobe Express içinde yapabilir.",
        strengths: ["Şablon gücü", "Hızlı düzenleme", "Adobe ekosistemi"],
        limitations: ["Derin tasarım yazılımlarının yerini almaz", "En iyi değer hızlı üretimde"],
        seoTitle: "Adobe Express incelemesi",
        seoDescription: "Adobe Express'in marka materyali ve sosyal tasarım iş akışlarındaki yerini inceleyin."
      },
      en: {
        shortDescription: "A flexible creative tool for brand assets, fast editing, and higher content velocity.",
        bestUseCase: "Marketing and social design",
        whoShouldUse: ["Creators", "Marketing teams", "Designers"],
        workflowExampleTitle: "Build a social post set",
        workflowExampleDescription: "A team can produce visuals with templates and finish the editing inside Adobe Express.",
        strengths: ["Template strength", "Fast editing", "Adobe ecosystem"],
        limitations: ["Does not replace deep design software", "Best value is in fast production"],
        seoTitle: "Adobe Express review",
        seoDescription: "Review Adobe Express for brand assets and social design workflows."
      }
    }
  },
  {
    name: "Shopify Magic",
    slug: "shopify-magic",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.shopify.com/magic",
    affiliateUrl: "https://www.shopify.com/magic",
    primaryCategorySlug: "writing",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["business", "marketing", "creators"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Shopify mağazalarında ürün metinleri, başlıklar ve hızlı e-ticaret kopyası için doğal bir seçenek.",
        bestUseCase: "Ürün açıklamaları ve mağaza metni",
        whoShouldUse: ["E-ticaret ekipleri", "Mağaza sahipleri", "Ajanslar"],
        workflowExampleTitle: "Ürün kartını zenginleştirin",
        workflowExampleDescription: "Bir ekip ürün başlıklarını, açıklamalarını ve kısa satış metinlerini daha hızlı hazırlayabilir.",
        strengths: ["E-ticaret uyumu", "Hızlı ürün kopyası", "Mağaza iş akışına yakın"],
        limitations: ["En güçlü olduğu yer Shopify ekosistemi", "Uzun form içerikte tek başına yeterli olmayabilir"],
        seoTitle: "Shopify Magic incelemesi",
        seoDescription: "Shopify Magic'in ürün açıklaması ve mağaza içeriği üretimindeki değerini inceleyin."
      },
      en: {
        shortDescription: "A natural fit for Shopify product copy, titles, and fast ecommerce writing.",
        bestUseCase: "Product descriptions and store copy",
        whoShouldUse: ["Ecommerce teams", "Store owners", "Agencies"],
        workflowExampleTitle: "Improve a product card",
        workflowExampleDescription: "A team can produce product titles, descriptions, and short sales copy more quickly.",
        strengths: ["Ecommerce fit", "Fast product copy", "Close to the store workflow"],
        limitations: ["Strongest inside Shopify", "May not be enough alone for long-form content"],
        seoTitle: "Shopify Magic review",
        seoDescription: "Review Shopify Magic for product descriptions and store content production."
      }
    }
  },
  {
    name: "HubSpot AI",
    slug: "hubspot-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.hubspot.com/products/artificial-intelligence",
    affiliateUrl: "https://www.hubspot.com/products/artificial-intelligence",
    primaryCategorySlug: "writing",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["business", "sales", "marketing"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        shortDescription: "CRM, pazarlama ve satış metinlerini tek bir sistem içinde hızlandıran güçlü bir yardımcı.",
        bestUseCase: "Satış ve pazarlama içerikleri",
        whoShouldUse: ["B2B ekipleri", "Satış liderleri", "Pazarlama ekipleri"],
        workflowExampleTitle: "Lead sonrası e-posta yazın",
        workflowExampleDescription: "Bir ekip HubSpot AI ile takip mesajı ve kampanya metinlerini daha hızlı hazırlayabilir.",
        strengths: ["CRM odaklı", "Satış iş akışına uygun", "Pazarlama desteği"],
        limitations: ["HubSpot kullanan ekiplerde daha anlamlıdır", "Genel amaçlı yazım aracı gibi kullanılmaz"],
        seoTitle: "HubSpot AI incelemesi",
        seoDescription: "HubSpot AI'nin CRM, satış ve pazarlama iş akışlarındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A strong helper for CRM, marketing, and sales copy inside one system.",
        bestUseCase: "Sales and marketing content",
        whoShouldUse: ["B2B teams", "Sales leaders", "Marketing teams"],
        workflowExampleTitle: "Write a follow-up email",
        workflowExampleDescription: "A team can use HubSpot AI to prepare follow-up messages and campaign copy faster.",
        strengths: ["CRM-aware", "Sales workflow fit", "Marketing support"],
        limitations: ["Most valuable for HubSpot users", "Not a general-purpose writing app"],
        seoTitle: "HubSpot AI review",
        seoDescription: "Review HubSpot AI for CRM, sales, and marketing workflows."
      }
    }
  },
  {
    name: "Intercom Fin",
    slug: "intercom-fin",
    pricing: "PAID",
    websiteUrl: "https://www.intercom.com/fin",
    affiliateUrl: "https://www.intercom.com/fin",
    primaryCategorySlug: "productivity",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "sales", "marketing"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Destek ekipleri için müşteri sorularını hızlı yanıtlayan akıllı bir AI asistanı.",
        bestUseCase: "Müşteri destek otomasyonu",
        whoShouldUse: ["CX ekipleri", "Destek yöneticileri", "SaaS şirketleri"],
        workflowExampleTitle: "SSS yanıtlarını otomatikleştirin",
        workflowExampleDescription: "Bir ekip Fin ile tekrar eden müşteri sorularını daha hızlı çözebilir.",
        strengths: ["Destek odağı", "Hızlı yanıt", "SaaS uyumu"],
        limitations: ["Destek iş akışında en iyi sonucu verir", "Genel kullanıma göre daha uzmanlaşmıştır"],
        seoTitle: "Intercom Fin incelemesi",
        seoDescription: "Intercom Fin'in müşteri destek otomasyonu ve cevap kalitesini inceleyin."
      },
      en: {
        shortDescription: "A smart AI assistant for support teams that need fast customer replies.",
        bestUseCase: "Customer support automation",
        whoShouldUse: ["CX teams", "Support managers", "SaaS companies"],
        workflowExampleTitle: "Automate FAQ replies",
        workflowExampleDescription: "A team can use Fin to resolve recurring customer questions faster.",
        strengths: ["Support-first", "Fast replies", "SaaS fit"],
        limitations: ["Best in support workflows", "More specialized than general tools"],
        seoTitle: "Intercom Fin review",
        seoDescription: "Review Intercom Fin for customer support automation and answer quality."
      }
    }
  },
  {
    name: "Zendesk AI",
    slug: "zendesk-ai",
    pricing: "PAID",
    websiteUrl: "https://www.zendesk.com/ai/",
    affiliateUrl: "https://www.zendesk.com/ai/",
    primaryCategorySlug: "productivity",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "sales", "marketing"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Destek masası, bilet yönetimi ve yanıt standardizasyonu için kurumsal seviyede bir AI katmanı.",
        bestUseCase: "Destek talepleri ve ticket verimliliği",
        whoShouldUse: ["Support ekipleri", "Operasyon yöneticileri", "Kurumsal müşteriler"],
        workflowExampleTitle: "Ticket yanıtlarını hızlandırın",
        workflowExampleDescription: "Bir ekip tekrar eden taleplerde daha hızlı ve tutarlı cevaplar üretebilir.",
        strengths: ["Ticket workflow", "Kurumsal yapı", "Yanıt standardı"],
        limitations: ["Zendesk kullanan ekiplerde daha güçlüdür", "Basit ekipler için fazla olabilir"],
        seoTitle: "Zendesk AI incelemesi",
        seoDescription: "Zendesk AI'nin ticket yönetimi ve destek verimliliğindeki yerini inceleyin."
      },
      en: {
        shortDescription: "An enterprise AI layer for support desks, ticket handling, and response standardization.",
        bestUseCase: "Support tickets and service efficiency",
        whoShouldUse: ["Support teams", "Operations managers", "Enterprise customers"],
        workflowExampleTitle: "Speed up ticket replies",
        workflowExampleDescription: "A team can produce faster and more consistent answers for recurring requests.",
        strengths: ["Ticket workflow", "Enterprise structure", "Reply consistency"],
        limitations: ["Stronger for Zendesk users", "Can be overkill for simpler teams"],
        seoTitle: "Zendesk AI review",
        seoDescription: "Review Zendesk AI for ticket management and support efficiency."
      }
    }
  },
  {
    name: "Airtable AI",
    slug: "airtable-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.airtable.com/ai",
    affiliateUrl: "https://www.airtable.com/ai",
    primaryCategorySlug: "productivity",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "freelancers", "marketing"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Veri tabanları, operasyonlar ve içerik planlama tablolarında AI desteği sunan esnek bir araç.",
        bestUseCase: "Planlama ve veriyi düzenleme",
        whoShouldUse: ["Operasyon ekipleri", "Ajanslar", "Ürün yöneticileri"],
        workflowExampleTitle: "İçerik takvimini düzenleyin",
        workflowExampleDescription: "Bir ekip notları, durumları ve içerik başlıklarını tek tabloda yönetebilir.",
        strengths: ["Tablo mantığı", "Operasyon desteği", "Esnek yapı"],
        limitations: ["Veri odaklı kullanımda parlar", "Kısa metin üretiminin ötesine geçmez"],
        seoTitle: "Airtable AI incelemesi",
        seoDescription: "Airtable AI'nin planlama, veri düzenleme ve operasyon iş akışlarındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A flexible tool that adds AI support to databases, operations, and planning tables.",
        bestUseCase: "Planning and data organization",
        whoShouldUse: ["Operations teams", "Agencies", "Product managers"],
        workflowExampleTitle: "Organize the content calendar",
        workflowExampleDescription: "A team can manage notes, statuses, and article topics in one table.",
        strengths: ["Table-first model", "Operations support", "Flexible structure"],
        limitations: ["Shines most in data workflows", "Does not replace full writing tools"],
        seoTitle: "Airtable AI review",
        seoDescription: "Review Airtable AI for planning, data organization, and operations workflows."
      }
    }
  },
  {
    name: "Coda AI",
    slug: "coda-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://coda.io/",
    affiliateUrl: "https://coda.io/",
    primaryCategorySlug: "productivity",
    categorySlugs: sharedGuideCategories,
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "freelancers", "marketing"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Doküman, tablo ve otomasyon katmanını birleştiren akıllı bir çalışma alanı.",
        bestUseCase: "İçerik operasyonu ve doküman planlama",
        whoShouldUse: ["Ajanslar", "Operasyon ekipleri", "Kurucu ekipler"],
        workflowExampleTitle: "Brief'ten teslimata geçin",
        workflowExampleDescription: "Bir ekip brief, not ve görevleri tek dokümanda toplayıp süreci sadeleştirebilir.",
        strengths: ["Doküman + tablo", "İş akışı düzeni", "Takım koordinasyonu"],
        limitations: ["En iyi değer yapı kuran ekiplerde", "Basit not alma için fazla olabilir"],
        seoTitle: "Coda AI incelemesi",
        seoDescription: "Coda AI'nin doküman, tablo ve operasyon düzenindeki rolünü inceleyin."
      },
      en: {
        shortDescription: "A smart workspace that combines docs, tables, and automation in one place.",
        bestUseCase: "Content operations and document planning",
        whoShouldUse: ["Agencies", "Operations teams", "Founding teams"],
        workflowExampleTitle: "Move from brief to delivery",
        workflowExampleDescription: "A team can keep briefs, notes, and tasks in one doc and simplify the process.",
        strengths: ["Docs plus tables", "Workflow structure", "Team coordination"],
        limitations: ["Best for teams that build systems", "May be too much for simple note-taking"],
        seoTitle: "Coda AI review",
        seoDescription: "Review Coda AI for docs, tables, and operations workflows."
      }
    }
  },
  {
    name: "Asana AI",
    slug: "asana-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://asana.com/product/ai",
    affiliateUrl: "https://asana.com/product/ai",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "freelancers", "marketing"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Görevleri, projeleri ve teslim tarihlerini daha hızlı planlamaya yardımcı olan bir iş akışı asistanı.",
        bestUseCase: "Proje planlama ve görev düzeni",
        whoShouldUse: ["Operasyon ekipleri", "Ajanslar", "Proje yöneticileri"],
        workflowExampleTitle: "Sprint görevlerini toparlayın",
        workflowExampleDescription: "Bir ekip Asana AI ile görev listelerini özetleyip önceliklendirebilir.",
        strengths: ["Proje odağı", "Takım koordinasyonu", "Net görev düzeni"],
        limitations: ["En iyi değer Asana kullanan ekiplerde", "Yaratıcı yazım aracı değildir"],
        seoTitle: "Asana AI incelemesi",
        seoDescription: "Asana AI'nin proje planlama ve görev düzenindeki değerini inceleyin."
      },
      en: {
        shortDescription: "A workflow assistant that helps teams plan tasks, projects, and deadlines faster.",
        bestUseCase: "Project planning and task organization",
        whoShouldUse: ["Operations teams", "Agencies", "Project managers"],
        workflowExampleTitle: "Organize sprint tasks",
        workflowExampleDescription: "A team can summarize and prioritize task lists with Asana AI.",
        strengths: ["Project focus", "Team coordination", "Clear task structure"],
        limitations: ["Best for Asana users", "Not a creative writing tool"],
        seoTitle: "Asana AI review",
        seoDescription: "Review Asana AI for project planning and task organization."
      }
    }
  },
  {
    name: "Monday AI",
    slug: "monday-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://monday.com/ai",
    affiliateUrl: "https://monday.com/ai",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "freelancers", "marketing"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Ekip süreçlerini, tabloları ve proje akışlarını tek yerde hızlandıran pratik bir araç.",
        bestUseCase: "İş takibi ve operasyon düzeni",
        whoShouldUse: ["Operasyon ekipleri", "Yöneticiler", "Ajanslar"],
        workflowExampleTitle: "Proje durumunu netleştirin",
        workflowExampleDescription: "Bir ekip Monday AI ile proje özetlerini ve durum güncellemelerini kolayca çıkarabilir.",
        strengths: ["Görsel iş akışı", "Takım görünürlüğü", "Hızlı özet"],
        limitations: ["Monday yapısında en iyi sonucu verir", "Bağımsız bir yazım aracı değildir"],
        seoTitle: "Monday AI incelemesi",
        seoDescription: "Monday AI'nin iş takibi ve operasyon düzenindeki rolünü inceleyin."
      },
      en: {
        shortDescription: "A practical tool for speeding up team processes, boards, and project workflows.",
        bestUseCase: "Work tracking and operations setup",
        whoShouldUse: ["Operations teams", "Managers", "Agencies"],
        workflowExampleTitle: "Clarify project status",
        workflowExampleDescription: "A team can use Monday AI to produce quick project summaries and status updates.",
        strengths: ["Visual workflow", "Team visibility", "Fast summaries"],
        limitations: ["Best inside Monday", "Not a standalone writing tool"],
        seoTitle: "Monday AI review",
        seoDescription: "Review Monday AI for work tracking and operations workflows."
      }
    }
  },
  {
    name: "Miro AI",
    slug: "miro-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://miro.com/ai/",
    affiliateUrl: "https://miro.com/ai/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "design"],
    useCaseSlugs: ["business", "creators", "marketing"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Beyin fırtınası, akış diyagramı ve fikir düzenleme süreçlerini hızlandıran bir beyaz tahta desteği.",
        bestUseCase: "Workshop ve fikir düzenleme",
        whoShouldUse: ["Ürün ekipleri", "Tasarımcılar", "Ajanslar"],
        workflowExampleTitle: "Workshop notlarını toparlayın",
        workflowExampleDescription: "Bir ekip dağınık fikirleri Miro AI ile daha okunur bir akışa dönüştürebilir.",
        strengths: ["Görsel düşünme", "Workshop desteği", "Takım işbirliği"],
        limitations: ["En iyi değer beyaz tahta kullanımında", "Metin üretiminden çok yapı kurar"],
        seoTitle: "Miro AI incelemesi",
        seoDescription: "Miro AI'nin workshop, beyin fırtınası ve fikir düzenleme akışlarını inceleyin."
      },
      en: {
        shortDescription: "A whiteboard assistant that speeds up brainstorming, flow building, and idea organization.",
        bestUseCase: "Workshops and idea organization",
        whoShouldUse: ["Product teams", "Designers", "Agencies"],
        workflowExampleTitle: "Tidy workshop notes",
        workflowExampleDescription: "A team can turn scattered ideas into a clearer flow with Miro AI.",
        strengths: ["Visual thinking", "Workshop support", "Team collaboration"],
        limitations: ["Best in whiteboard workflows", "Builds structure more than prose"],
        seoTitle: "Miro AI review",
        seoDescription: "Review Miro AI for workshops, brainstorming, and idea organization."
      }
    }
  },
  {
    name: "Loom AI",
    slug: "loom-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.loom.com/ai",
    affiliateUrl: "https://www.loom.com/ai",
    primaryCategorySlug: "video",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["video", "productivity"],
    useCaseSlugs: ["business", "marketing", "creators"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Ekran kaydı, anlatım ve video özetleme için pratik bir iletişim aracı.",
        bestUseCase: "Kısa eğitim ve ürün anlatımı",
        whoShouldUse: ["Ürün ekipleri", "Destek ekipleri", "Ajanslar"],
        workflowExampleTitle: "Kısa demo kaydı hazırlayın",
        workflowExampleDescription: "Bir ekip bir ürünü kaydedip kısa bir anlatım videosuna çevirebilir.",
        strengths: ["Kolay kayıt", "Asenkron iletişim", "Video özetleri"],
        limitations: ["Kısa açıklamalar için daha uygundur", "Uzun prodüksiyon aracı değildir"],
        seoTitle: "Loom AI incelemesi",
        seoDescription: "Loom AI'nin ekran kaydı, anlatım ve video iş akışlarındaki yerini inceleyin."
      },
      en: {
        shortDescription: "A practical communication tool for screen recordings, explanations, and video summaries.",
        bestUseCase: "Short training and product walkthroughs",
        whoShouldUse: ["Product teams", "Support teams", "Agencies"],
        workflowExampleTitle: "Record a quick demo",
        workflowExampleDescription: "A team can record a product walkthrough and share it as a short explainer video.",
        strengths: ["Simple recording", "Async communication", "Video summaries"],
        limitations: ["Better for short explanations", "Not a long-form production tool"],
        seoTitle: "Loom AI review",
        seoDescription: "Review Loom AI for screen recording, explanations, and video workflows."
      }
    }
  },
  {
    name: "Zoom AI Companion",
    slug: "zoom-ai-companion",
    pricing: "FREEMIUM",
    websiteUrl: "https://zoom.us/ai-companion",
    affiliateUrl: "https://zoom.us/ai-companion",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "video"],
    useCaseSlugs: ["business", "sales", "marketing"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Toplantı özetleri, aksiyon maddeleri ve iletişim takibini kolaylaştıran yerleşik bir asistan.",
        bestUseCase: "Toplantı notları ve toplantı takibi",
        whoShouldUse: ["Yöneticiler", "Uzaktan ekipler", "Satış ekipleri"],
        workflowExampleTitle: "Toplantı sonrası özet alın",
        workflowExampleDescription: "Bir ekip toplantıdan sonra kararları ve aksiyonları daha hızlı çıkarabilir.",
        strengths: ["Toplantı odağı", "Aksiyon takibi", "Zaman tasarrufu"],
        limitations: ["Zoom merkezli ekiplerde daha anlamlıdır", "Kapsamlı bilgi işi için tek başına yetmeyebilir"],
        seoTitle: "Zoom AI Companion incelemesi",
        seoDescription: "Zoom AI Companion'ın toplantı özetleri ve aksiyon takibindeki değerini inceleyin."
      },
      en: {
        shortDescription: "An embedded assistant that simplifies meeting summaries, action items, and follow-up tracking.",
        bestUseCase: "Meeting notes and follow-up tracking",
        whoShouldUse: ["Managers", "Remote teams", "Sales teams"],
        workflowExampleTitle: "Get a post-meeting summary",
        workflowExampleDescription: "A team can extract decisions and action items faster after a meeting.",
        strengths: ["Meeting focus", "Action tracking", "Time savings"],
        limitations: ["Most useful for Zoom-centric teams", "May not replace deeper research work"],
        seoTitle: "Zoom AI Companion review",
        seoDescription: "Review Zoom AI Companion for meeting summaries and follow-up tracking."
      }
    }
  },
  {
    name: "Slack AI",
    slug: "slack-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://slack.com/ai",
    affiliateUrl: "https://slack.com/ai",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "marketing", "sales"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Kanal içi bilgi arama, sohbet özeti ve ekip iletişimini hızlandıran hafif bir AI katmanı.",
        bestUseCase: "İç iletişim ve bilgi bulma",
        whoShouldUse: ["Dağıtık ekipler", "Yöneticiler", "Operasyon ekipleri"],
        workflowExampleTitle: "Kanaldaki konuşmayı özetleyin",
        workflowExampleDescription: "Bir ekip uzun bir konuşmayı kısa bir karara dönüştürebilir.",
        strengths: ["İletişim odağı", "Hızlı özet", "Slack akışına yakın"],
        limitations: ["Slack kullanan ekiplerde daha güçlüdür", "Geniş yazım aracı gibi düşünülmemeli"],
        seoTitle: "Slack AI incelemesi",
        seoDescription: "Slack AI'nin ekip iletişimi ve bilgi bulma akışlarındaki rolünü inceleyin."
      },
      en: {
        shortDescription: "A lightweight AI layer that speeds up channel search, chat summaries, and team communication.",
        bestUseCase: "Internal communication and knowledge lookup",
        whoShouldUse: ["Distributed teams", "Managers", "Operations teams"],
        workflowExampleTitle: "Summarize a channel thread",
        workflowExampleDescription: "A team can turn a long conversation into a short decision summary.",
        strengths: ["Communication focus", "Fast summaries", "Close to Slack workflow"],
        limitations: ["Stronger for Slack users", "Not a broad writing suite"],
        seoTitle: "Slack AI review",
        seoDescription: "Review Slack AI for team communication and knowledge lookup workflows."
      }
    }
  },
  {
    name: "Read AI",
    slug: "read-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.read.ai/",
    affiliateUrl: "https://www.read.ai/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "video"],
    useCaseSlugs: ["business", "sales", "marketing"],
    rating: 4.4,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Toplantı analitiği, özet ve konuşma takibi için güvenilir bir analiz aracı.",
        bestUseCase: "Toplantı analizi ve özetleme",
        whoShouldUse: ["Satış ekipleri", "Yöneticiler", "Uzaktan çalışan ekipler"],
        workflowExampleTitle: "Görüşme notlarını çıkarın",
        workflowExampleDescription: "Bir ekip toplantıdan sonra önemli başlıkları ve aksiyonları hızlıca ayırabilir.",
        strengths: ["Analitik yaklaşım", "Özet kalitesi", "Toplantı hafızası"],
        limitations: ["Toplantı odaklıdır", "Genel üretkenlik aracı değildir"],
        seoTitle: "Read AI incelemesi",
        seoDescription: "Read AI'nin toplantı analizi, özet ve konuşma takibindeki değerini inceleyin."
      },
      en: {
        shortDescription: "A dependable analytics tool for meeting summaries, conversation tracking, and recap quality.",
        bestUseCase: "Meeting analysis and summarization",
        whoShouldUse: ["Sales teams", "Managers", "Remote teams"],
        workflowExampleTitle: "Pull key notes from a call",
        workflowExampleDescription: "A team can separate important topics and next steps after a meeting.",
        strengths: ["Analytical approach", "Solid summaries", "Meeting memory"],
        limitations: ["Focused on meetings", "Not a general productivity suite"],
        seoTitle: "Read AI review",
        seoDescription: "Review Read AI for meeting analysis, summaries, and conversation tracking."
      }
    }
  },
  {
    name: "tl;dv",
    slug: "tldv",
    pricing: "FREEMIUM",
    websiteUrl: "https://tldv.io/",
    affiliateUrl: "https://tldv.io/",
    primaryCategorySlug: "video",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["video", "productivity"],
    useCaseSlugs: ["business", "sales", "marketing"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Toplantı kayıtları, vurucu anlar ve paylaşılabilir özetler için güçlü bir araç.",
        bestUseCase: "Toplantı kaydı ve kesit çıkarma",
        whoShouldUse: ["Satış ekipleri", "Ürün ekipleri", "Ajanslar"],
        workflowExampleTitle: "Önemli anları işaretleyin",
        workflowExampleDescription: "Bir ekip uzun toplantılardan kısa paylaşılabilir kesitler oluşturabilir.",
        strengths: ["Kayıt ve kesit", "Paylaşım kolaylığı", "Toplantı hafızası"],
        limitations: ["Toplantı odaklı kullanımda değerli", "Uzun prodüksiyon aracı değildir"],
        seoTitle: "tl;dv incelemesi",
        seoDescription: "tl;dv'nin toplantı kaydı, kesit çıkarma ve paylaşım akışlarını inceleyin."
      },
      en: {
        shortDescription: "A strong tool for meeting recordings, highlight moments, and shareable summaries.",
        bestUseCase: "Meeting recording and clip extraction",
        whoShouldUse: ["Sales teams", "Product teams", "Agencies"],
        workflowExampleTitle: "Mark important moments",
        workflowExampleDescription: "A team can create short, shareable clips from long meetings.",
        strengths: ["Recording and clipping", "Easy sharing", "Meeting memory"],
        limitations: ["Most valuable in meeting workflows", "Not a long production tool"],
        seoTitle: "tl;dv review",
        seoDescription: "Review tl;dv for meeting recording, clipping, and sharing workflows."
      }
    }
  },
  {
    name: "Superhuman AI",
    slug: "superhuman-ai",
    pricing: "PAID",
    websiteUrl: "https://superhuman.com/",
    affiliateUrl: "https://superhuman.com/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "sales", "freelancers"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "E-posta trafiğini, hızlı yanıtları ve takip işlerini daha verimli hale getiren bir premium araç.",
        bestUseCase: "E-posta verimliliği ve takip",
        whoShouldUse: ["Kurucular", "Satış ekipleri", "Yoğun yöneticiler"],
        workflowExampleTitle: "Takip e-postası hazırlayın",
        workflowExampleDescription: "Bir kullanıcı hızlı yanıt kalıplarıyla e-posta kuyruğunu daha kolay yönetebilir.",
        strengths: ["E-posta odağı", "Hızlı işlem", "Yüksek verim hissi"],
        limitations: ["E-posta ağırlıklı kullanıcılar için anlamlıdır", "Genel amaçlı AI platformu değildir"],
        seoTitle: "Superhuman AI incelemesi",
        seoDescription: "Superhuman AI'nin e-posta verimliliği ve takip işlerine katkısını inceleyin."
      },
      en: {
        shortDescription: "A premium tool that makes email workflows, quick replies, and follow-up tasks more efficient.",
        bestUseCase: "Email productivity and follow-up",
        whoShouldUse: ["Founders", "Sales teams", "Busy managers"],
        workflowExampleTitle: "Draft a follow-up email",
        workflowExampleDescription: "A user can manage the inbox more easily with fast reply patterns.",
        strengths: ["Email-first", "Fast actions", "Feels highly efficient"],
        limitations: ["Most useful for email-heavy users", "Not a general AI platform"],
        seoTitle: "Superhuman AI review",
        seoDescription: "Review Superhuman AI for email productivity and follow-up work."
      }
    }
  },
  {
    name: "Mailchimp AI",
    slug: "mailchimp-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://mailchimp.com/",
    affiliateUrl: "https://mailchimp.com/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["business", "marketing", "freelancers"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "E-posta pazarlaması ve kampanya metinleri için güvenli, tanıdık bir başlangıç noktası.",
        bestUseCase: "E-posta kampanyaları",
        whoShouldUse: ["Pazarlama ekipleri", "Küçük işletmeler", "Ajanslar"],
        workflowExampleTitle: "Bülten metnini hızlandırın",
        workflowExampleDescription: "Bir ekip kampanya başlığı ve giriş metnini daha hızlı hazırlayabilir.",
        strengths: ["E-posta pazarlaması", "Kullanımı kolay", "Kampanya odaklı"],
        limitations: ["En iyi değer e-posta kullanımında", "Uzun form içerikte sınırlı olabilir"],
        seoTitle: "Mailchimp AI incelemesi",
        seoDescription: "Mailchimp AI'nin e-posta pazarlaması ve kampanya üretimindeki değerini inceleyin."
      },
      en: {
        shortDescription: "A safe, familiar starting point for email marketing and campaign copy.",
        bestUseCase: "Email campaigns",
        whoShouldUse: ["Marketing teams", "Small businesses", "Agencies"],
        workflowExampleTitle: "Speed up newsletter copy",
        workflowExampleDescription: "A team can prepare the campaign headline and intro faster.",
        strengths: ["Email marketing", "Easy to use", "Campaign focus"],
        limitations: ["Best value in email workflows", "Can be limited for long-form content"],
        seoTitle: "Mailchimp AI review",
        seoDescription: "Review Mailchimp AI for email marketing and campaign production."
      }
    }
  },
  {
    name: "Buffer AI Assistant",
    slug: "buffer-ai-assistant",
    pricing: "FREEMIUM",
    websiteUrl: "https://buffer.com/ai-assistant",
    affiliateUrl: "https://buffer.com/ai-assistant",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["marketing", "creators", "business"],
    rating: 4.4,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Sosyal medya metinlerini ve planlamayı hızlandıran hafif bir yardımcı.",
        bestUseCase: "Sosyal medya içerik planlama",
        whoShouldUse: ["Sosyal medya yöneticileri", "Küçük ekipler", "Freelancer'lar"],
        workflowExampleTitle: "Gönderi taslağı oluşturun",
        workflowExampleDescription: "Bir ekip Buffer AI Assistant ile kısa bir kampanya mesajını daha hızlı hazırlayabilir.",
        strengths: ["Planlama desteği", "Kısa metin üretimi", "Sosyal akışlara yakın"],
        limitations: ["Kısa biçimde daha güçlüdür", "Gelişmiş strateji katmanı sunmaz"],
        seoTitle: "Buffer AI Assistant incelemesi",
        seoDescription: "Buffer AI Assistant'ın sosyal medya planlama ve hızlı metin üretimindeki değerini inceleyin."
      },
      en: {
        shortDescription: "A lightweight helper for social copy, post ideas, and faster planning.",
        bestUseCase: "Social media content planning",
        whoShouldUse: ["Social media managers", "Small teams", "Freelancers"],
        workflowExampleTitle: "Draft a post idea",
        workflowExampleDescription: "A team can prepare a short campaign message faster with Buffer AI Assistant.",
        strengths: ["Planning support", "Short copy generation", "Close to social workflows"],
        limitations: ["Stronger for short-form content", "Does not replace a deep strategy layer"],
        seoTitle: "Buffer AI Assistant review",
        seoDescription: "Review Buffer AI Assistant for social planning and quick copy generation."
      }
    }
  },

  {
    name: "Scalenut",
    slug: "scalenut",
    pricing: "PAID",
    websiteUrl: "https://www.scalenut.com/",
    affiliateUrl: "https://www.scalenut.com/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "seo"],
    useCaseSlugs: ["marketing", "freelancers", "business"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "SEO odaklı içerik planlama, brief ve metin üretimi için güçlü bir yardımcı.",
        bestUseCase: "SEO blog planlama ve içerik üretimi",
        whoShouldUse: ["SEO ekipleri", "İçerik pazarlamacıları", "Ajanslar"],
        workflowExampleTitle: "Bir blog brief'i hazırlayın",
        workflowExampleDescription: "Bir ekip anahtar kelimeyi girip Scalenut ile başlık, outline ve içerik taslağını daha düzenli bir şekilde çıkarabilir.",
        strengths: ["SEO odaklı yapı", "Brief oluşturma", "İçerik planlama"],
        limitations: ["Tam serbest yazım aracı değildir", "En iyi değer SEO süreçlerinde ortaya çıkar"],
        seoTitle: "Scalenut incelemesi",
        seoDescription: "Scalenut'un SEO içerik üretimi, planlama ve iş akışı değerini inceleyin."
      },
      en: {
        shortDescription: "A strong assistant for SEO content planning, briefs, and writing workflows.",
        bestUseCase: "SEO blog planning and content creation",
        whoShouldUse: ["SEO teams", "Content marketers", "Agencies"],
        workflowExampleTitle: "Prepare a blog brief",
        workflowExampleDescription: "A team can enter a keyword and use Scalenut to produce a more organized title, outline, and content draft.",
        strengths: ["SEO-focused structure", "Brief creation", "Content planning"],
        limitations: ["Not a fully freeform writing tool", "Best value appears in SEO workflows"],
        seoTitle: "Scalenut review",
        seoDescription: "Review Scalenut for SEO content creation, planning, and workflow value."
      }
    }
  },
  {
    name: "Outranking",
    slug: "outranking",
    pricing: "PAID",
    websiteUrl: "https://www.outranking.io/",
    affiliateUrl: "https://www.outranking.io/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "seo"],
    useCaseSlugs: ["marketing", "business", "freelancers"],
    rating: 4.4,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Arama niyeti odaklı içerik üretmek isteyen ekipler için SEO araç seti.",
        bestUseCase: "SEO içerik optimizasyonu",
        whoShouldUse: ["SEO uzmanları", "İçerik ekipleri", "Ajanslar"],
        workflowExampleTitle: "Bir içerik taslağını optimize edin",
        workflowExampleDescription: "Bir ekip mevcut taslağı Outranking'e taşıyıp başlık yapısı, soru seti ve eksik konu alanlarını netleştirebilir.",
        strengths: ["Arama niyetine odaklı", "Planlama desteği", "SEO içerik sistemi"],
        limitations: ["Her ekip için gerekli değildir", "Öğrenme eğrisi olabilir"],
        seoTitle: "Outranking incelemesi",
        seoDescription: "Outranking'in SEO içerik optimizasyonu ve üretim akışını inceleyin."
      },
      en: {
        shortDescription: "An SEO content system for teams that want search-intent-led writing.",
        bestUseCase: "SEO content optimization",
        whoShouldUse: ["SEO specialists", "Content teams", "Agencies"],
        workflowExampleTitle: "Optimize an article draft",
        workflowExampleDescription: "A team can move a draft into Outranking and clarify heading structure, question sets, and missing topic coverage.",
        strengths: ["Search-intent focus", "Planning support", "SEO content system"],
        limitations: ["Not necessary for every team", "Can have a learning curve"],
        seoTitle: "Outranking review",
        seoDescription: "Review Outranking for SEO content optimization and production workflows."
      }
    }
  },
  {
    name: "SEO.ai",
    slug: "seo-ai",
    pricing: "PAID",
    websiteUrl: "https://seo.ai/",
    affiliateUrl: "https://seo.ai/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "seo"],
    useCaseSlugs: ["marketing", "business", "creators"],
    rating: 4.4,
    featured: true,
    locales: {
      tr: {
        shortDescription: "SEO odaklı metin üretimi ve optimizasyon için net konumlandırılmış bir araç.",
        bestUseCase: "SEO uyumlu içerik üretimi",
        whoShouldUse: ["SEO editörleri", "Pazarlama ekipleri", "Ajanslar"],
        workflowExampleTitle: "Ürün sayfası metnini iyileştirin",
        workflowExampleDescription: "Bir ekip SEO.ai ile ürün sayfası açıklamasını daha iyi başlıklar, alt başlıklar ve konu kapsamıyla güncelleyebilir.",
        strengths: ["SEO odaklı", "Net iş akışı", "İçerik iyileştirme"],
        limitations: ["Genel amaçlı yazım aracı gibi kullanılmaz", "En iyi kullanım SEO işlerinde"],
        seoTitle: "SEO.ai incelemesi",
        seoDescription: "SEO.ai'nin SEO odaklı yazım ve optimizasyon kabiliyetlerini inceleyin."
      },
      en: {
        shortDescription: "A tightly focused tool for SEO-first writing and optimization.",
        bestUseCase: "SEO-friendly content production",
        whoShouldUse: ["SEO editors", "Marketing teams", "Agencies"],
        workflowExampleTitle: "Improve a product page copy",
        workflowExampleDescription: "A team can use SEO.ai to refresh product-page copy with better headings, subheadings, and topic coverage.",
        strengths: ["SEO-first", "Clear workflow", "Content improvement"],
        limitations: ["Not a general-purpose writing app", "Best value is in SEO work"],
        seoTitle: "SEO.ai review",
        seoDescription: "Review SEO.ai for SEO-focused writing and optimization capabilities."
      }
    }
  },
  {
    name: "ContentShake AI",
    slug: "contentshake-ai",
    pricing: "PAID",
    websiteUrl: "https://www.semrush.com/content-shake/",
    affiliateUrl: "https://www.semrush.com/content-shake/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "seo"],
    useCaseSlugs: ["marketing", "business", "freelancers"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Semrush ekosisteminde SEO içerik fikirleri ve taslaklar için pratik bir seçenek.",
        bestUseCase: "SEO blog taslakları ve fikir üretimi",
        whoShouldUse: ["SEO ekipleri", "İçerik pazarlamacıları", "Küçük ekipler"],
        workflowExampleTitle: "Yeni blog fikrini ilk taslağa çevirin",
        workflowExampleDescription: "Bir içerik ekibi hedef anahtar kelimeyi girip başlık, outline ve kısa metin taslağını bir araya getirebilir.",
        strengths: ["SEO ekosistemine yakın", "Fikirden taslağa hızlı geçiş", "Pratik kullanım"],
        limitations: ["Her yazı türü için uygun değildir", "En iyi değer blog ve SEO akışlarında"],
        seoTitle: "ContentShake AI incelemesi",
        seoDescription: "ContentShake AI'nin SEO içerik üretimindeki yerini ve güçlü yanlarını inceleyin."
      },
      en: {
        shortDescription: "A practical option for SEO content ideas and first drafts inside the Semrush ecosystem.",
        bestUseCase: "SEO blog drafts and idea generation",
        whoShouldUse: ["SEO teams", "Content marketers", "Small teams"],
        workflowExampleTitle: "Turn a new blog idea into a first draft",
        workflowExampleDescription: "A content team can enter a target keyword and assemble a title, outline, and short draft in one pass.",
        strengths: ["Close to the SEO ecosystem", "Fast idea-to-draft flow", "Practical workflow"],
        limitations: ["Not ideal for every content type", "Best value in blog and SEO workflows"],
        seoTitle: "ContentShake AI review",
        seoDescription: "Review ContentShake AI for its role in SEO content production."
      }
    }
  },
  {
    name: "Freepik AI",
    slug: "freepik-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.freepik.com/ai",
    affiliateUrl: "https://www.freepik.com/ai",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["image", "design"],
    useCaseSlugs: ["creators", "marketing", "business"],
    rating: 4.4,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Görsel üretim, düzenleme ve pazarlama varlıkları için güçlü bir yaratıcı araç.",
        bestUseCase: "Pazarlama görselleri ve konsept üretimi",
        whoShouldUse: ["Tasarımcılar", "Pazarlama ekipleri", "İçerik üreticileri"],
        workflowExampleTitle: "Kampanya görseli hazırlayın",
        workflowExampleDescription: "Bir ekip Freepik AI ile kampanya için ilk görsel yönünü çıkarıp ardından tasarımda ince ayar yapabilir.",
        strengths: ["Hızlı görsel üretim", "Ticari kullanım odaklı", "Yaratıcı esneklik"],
        limitations: ["Her iş için tek başına yeterli olmayabilir", "Son tasarım kontrolü gerekebilir"],
        seoTitle: "Freepik AI incelemesi",
        seoDescription: "Freepik AI'nin görsel üretim ve pazarlama tasarım akışlarını inceleyin."
      },
      en: {
        shortDescription: "A strong creative tool for image generation, editing, and marketing assets.",
        bestUseCase: "Marketing visuals and concept generation",
        whoShouldUse: ["Designers", "Marketing teams", "Content creators"],
        workflowExampleTitle: "Create a campaign visual",
        workflowExampleDescription: "A team can use Freepik AI to sketch the first visual direction for a campaign and then refine it in design.",
        strengths: ["Fast image generation", "Commercial-use minded", "Creative flexibility"],
        limitations: ["May not be enough on its own for every job", "Final design control may still be needed"],
        seoTitle: "Freepik AI review",
        seoDescription: "Review Freepik AI for image generation and marketing design workflows."
      }
    }
  },
  {
    name: "Krea AI",
    slug: "krea-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.krea.ai/",
    affiliateUrl: "https://www.krea.ai/",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["image", "design"],
    useCaseSlugs: ["creators", "business", "marketing"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Görsel konsept, stil denemesi ve hızlı yaratıcı keşif için modern bir araç.",
        bestUseCase: "Yaratıcı konsept ve stil keşfi",
        whoShouldUse: ["Tasarımcılar", "İçerik ekipleri", "Yaratıcı yöneticiler"],
        workflowExampleTitle: "Marka yönü için konsept deneyin",
        workflowExampleDescription: "Bir ekip Krea AI ile birkaç görsel stil deneyip kampanya için uygun yönü hızlıca daraltabilir.",
        strengths: ["Stil keşfi", "Hızlı iterasyon", "Yaratıcı çalışma"],
        limitations: ["Son teslim tasarım aracı değildir", "Daha çok keşif aşamasında parlar"],
        seoTitle: "Krea AI incelemesi",
        seoDescription: "Krea AI'nin konsept, stil ve yaratıcı üretim akışlarını inceleyin."
      },
      en: {
        shortDescription: "A modern tool for image concepts, style exploration, and rapid creative iteration.",
        bestUseCase: "Creative concept and style exploration",
        whoShouldUse: ["Designers", "Content teams", "Creative leads"],
        workflowExampleTitle: "Try concepts for a brand direction",
        workflowExampleDescription: "A team can use Krea AI to test a few visual styles and narrow down the right direction for a campaign quickly.",
        strengths: ["Style exploration", "Fast iteration", "Creative work"],
        limitations: ["Not a final-delivery design tool", "Shines more in the exploration stage"],
        seoTitle: "Krea AI review",
        seoDescription: "Review Krea AI for concept generation, style testing, and creative workflows."
      }
    }
  },
  {
    name: "Figma AI",
    slug: "figma-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.figma.com/",
    affiliateUrl: "https://www.figma.com/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "design"],
    useCaseSlugs: ["business", "creators", "freelancers"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Tasarım iş akışlarını hızlandıran, ürün ekiplerine uygun yapay zeka destekli Figma deneyimi.",
        bestUseCase: "Ürün tasarımı ve arayüz üretimi",
        whoShouldUse: ["Ürün tasarımcıları", "Frontend ekipleri", "Startup ekipleri"],
        workflowExampleTitle: "Wireframe'i daha hızlı netleştirin",
        workflowExampleDescription: "Bir ekip Figma AI ile ilk wireframe yönünü düzenleyip tasarım sürecini hızlandırabilir.",
        strengths: ["Tasarım iş akışına yakın", "Ekip dostu", "Hızlı prototipleme"],
        limitations: ["Bağımsız bir AI aracı değildir", "En iyi değer Figma kullanımında ortaya çıkar"],
        seoTitle: "Figma AI incelemesi",
        seoDescription: "Figma AI'nin ürün tasarımı, wireframe ve arayüz iş akışlarını inceleyin."
      },
      en: {
        shortDescription: "An AI-augmented Figma experience that speeds up design workflows for product teams.",
        bestUseCase: "Product design and interface production",
        whoShouldUse: ["Product designers", "Frontend teams", "Startup teams"],
        workflowExampleTitle: "Clarify a wireframe faster",
        workflowExampleDescription: "A team can use Figma AI to shape the first wireframe direction and speed up the design process.",
        strengths: ["Close to the design workflow", "Team-friendly", "Fast prototyping"],
        limitations: ["Not a standalone AI app", "Best value appears inside Figma workflows"],
        seoTitle: "Figma AI review",
        seoDescription: "Review Figma AI for product design, wireframe, and interface workflows."
      }
    }
  },
  {
    name: "Voiceflow",
    slug: "voiceflow",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.voiceflow.com/",
    affiliateUrl: "https://www.voiceflow.com/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "sales", "marketing"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        shortDescription: "AI asistan ve konuşma deneyimi tasarlamak isteyen ekipler için güçlü bir platform.",
        bestUseCase: "AI asistan ve chatbot tasarımı",
        whoShouldUse: ["CX ekipleri", "Ürün ekipleri", "Geliştirici destekli takımlar"],
        workflowExampleTitle: "Basit müşteri akışı kurun",
        workflowExampleDescription: "Bir ekip Voiceflow ile SSS, yönlendirme ve basit destek akışlarını daha düzenli bir şekilde kurabilir.",
        strengths: ["Konuşma akışları", "Takım işbirliği", "Ürünleştirme dostu"],
        limitations: ["Her ekip için gerekli değildir", "En iyi sonuç konuşma tasarımında"],
        seoTitle: "Voiceflow incelemesi",
        seoDescription: "Voiceflow'un AI asistan ve sohbet deneyimi tasarımındaki rolünü inceleyin."
      },
      en: {
        shortDescription: "A strong platform for teams building AI assistants and conversational experiences.",
        bestUseCase: "AI assistant and chatbot design",
        whoShouldUse: ["CX teams", "Product teams", "Developer-assisted teams"],
        workflowExampleTitle: "Build a simple customer flow",
        workflowExampleDescription: "A team can use Voiceflow to organize FAQs, routing, and simple support flows in a cleaner way.",
        strengths: ["Conversation flows", "Team collaboration", "Productization-friendly"],
        limitations: ["Not needed for every team", "Best results in conversation design"],
        seoTitle: "Voiceflow review",
        seoDescription: "Review Voiceflow's role in AI assistant and conversational experience design."
      }
    }
  },
  {
    name: "Mistral AI",
    slug: "mistral-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://mistral.ai/",
    affiliateUrl: "https://mistral.ai/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["research", "business", "students"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Hızlı taslak, çok dilli yazı ve araştırma destekli cevaplar için sade ama güçlü bir model ailesi.",
        bestUseCase: "Çok dilli yazı ve hızlı taslak",
        whoShouldUse: ["İçerik ekipleri", "Araştırmacılar", "Freelancer'lar"],
        workflowExampleTitle: "İlk taslağı hızla kurun",
        workflowExampleDescription: "Bir ekip Mistral AI ile kısa brief, özet ve çok dilli taslakları daha hızlı çıkarabilir.",
        strengths: ["Hızlı taslak", "Çok dilli kullanım", "Temiz yanıtlar"],
        limitations: ["Her kullanımda tek başına yeterli olmayabilir", "Derin ürün iş akışları için ek araç gerekebilir"],
        seoTitle: "Mistral AI incelemesi",
        seoDescription: "Mistral AI'nin yazı, araştırma ve çok dilli üretim iş akışlarındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A clean, fast model family for drafting, multilingual writing, and research-assisted answers.",
        bestUseCase: "Multilingual writing and fast drafting",
        whoShouldUse: ["Content teams", "Researchers", "Freelancers"],
        workflowExampleTitle: "Draft faster",
        workflowExampleDescription: "A team can use Mistral AI to produce short briefs, summaries, and multilingual drafts more quickly.",
        strengths: ["Fast drafting", "Multilingual fit", "Clean outputs"],
        limitations: ["Not always enough on its own", "Deep product workflows may still need other tools"],
        seoTitle: "Mistral AI review",
        seoDescription: "Review Mistral AI for writing, research, and multilingual production workflows."
      }
    }
  },
  {
    name: "Cline",
    slug: "cline",
    pricing: "FREE",
    websiteUrl: "https://cline.bot/",
    affiliateUrl: "https://cline.bot/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "research", "freelancers"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Kod düzenleme, görev planlama ve geliştirici odaklı iş akışlarını IDE içinde destekleyen bir yardımcı.",
        bestUseCase: "Kodlama yardımı ve görev akışı",
        whoShouldUse: ["Frontend geliştiriciler", "Kurucu ekipler", "Teknik freelancer'lar"],
        workflowExampleTitle: "Kod görevini parçalara ayırın",
        workflowExampleDescription: "Bir geliştirici Cline ile küçük kod görevlerini daha net adımlara bölüp ilerleyebilir.",
        strengths: ["IDE içinde çalışma", "Görev bazlı akış", "Geliştirici dostu"],
        limitations: ["Teknik kullanıcılar için daha anlamlıdır", "Kısa metin üretimi için ana araç değildir"],
        seoTitle: "Cline incelemesi",
        seoDescription: "Cline'ın kodlama yardımı, görev akışı ve geliştirici işlerinde nasıl konumlandığını inceleyin."
      },
      en: {
        shortDescription: "An IDE-friendly helper for coding tasks, task planning, and developer-first workflows.",
        bestUseCase: "Coding help and task flow",
        whoShouldUse: ["Frontend developers", "Founding teams", "Technical freelancers"],
        workflowExampleTitle: "Break the coding task down",
        workflowExampleDescription: "A developer can use Cline to split small coding tasks into clearer steps.",
        strengths: ["Works in the IDE", "Task-oriented flow", "Developer friendly"],
        limitations: ["Most useful for technical users", "Not a primary short-form writing tool"],
        seoTitle: "Cline review",
        seoDescription: "Review Cline for coding assistance, task flow, and developer workflows."
      }
    }
  },
  {
    name: "CapCut",
    slug: "capcut",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.capcut.com/",
    affiliateUrl: "https://www.capcut.com/",
    primaryCategorySlug: "video",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["video", "productivity"],
    useCaseSlugs: ["creators", "content", "freelancers"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Kısa video düzenleme, altyazı ve sosyal medya teslimi için hızlı bir üretim aracı.",
        bestUseCase: "Kısa video düzenleme",
        whoShouldUse: ["İçerik üreticileri", "Sosyal medya ekipleri", "Freelancer'lar"],
        workflowExampleTitle: "Kısa videoyu yayına hazırlayın",
        workflowExampleDescription: "Bir ekip CapCut ile kesme, altyazı ve kısa sosyal video versiyonlarını hızla hazırlayabilir.",
        strengths: ["Hızlı kurgu", "Altyazı desteği", "Sosyal video odaklı"],
        limitations: ["Uzun kurgu işleri için sınırlı kalabilir", "Tam sinema düzeyi kurgu arayanlara yetmeyebilir"],
        seoTitle: "CapCut incelemesi",
        seoDescription: "CapCut'un kısa video, altyazı ve sosyal medya kurgu işlerinde nasıl çalıştığını inceleyin."
      },
      en: {
        shortDescription: "A fast video editing tool for short-form clips, subtitles, and social delivery.",
        bestUseCase: "Short-form video editing",
        whoShouldUse: ["Creators", "Social teams", "Freelancers"],
        workflowExampleTitle: "Prepare the clip for publishing",
        workflowExampleDescription: "A team can use CapCut to quickly prepare cuts, subtitles, and short social versions.",
        strengths: ["Fast editing", "Subtitle support", "Short-form focus"],
        limitations: ["Less ideal for long edits", "May not satisfy cinema-grade editing needs"],
        seoTitle: "CapCut review",
        seoDescription: "Review CapCut for short-form video editing, subtitles, and social delivery workflows."
      }
    }
  },
  {
    name: "Fathom AI",
    slug: "fathom-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://fathom.video/",
    affiliateUrl: "https://fathom.video/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "research", "freelancers"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Toplantı notları, özetler ve aksiyon maddeleri için toplantı merkezli pratik bir yardımcı.",
        bestUseCase: "Toplantı özeti ve aksiyon takibi",
        whoShouldUse: ["Kurucular", "Satış ekipleri", "Ajanslar"],
        workflowExampleTitle: "Toplantı kaydını özete çevirin",
        workflowExampleDescription: "Bir ekip Fathom AI ile toplantı sonrası özet ve takip görevlerini daha hızlı çıkarabilir.",
        strengths: ["Toplantı özeti", "Aksiyon çıkarma", "Zaman tasarrufu"],
        limitations: ["Toplantı olmayan akışlarda değeri düşer", "Tek başına proje yönetimi yerine geçmez"],
        seoTitle: "Fathom AI incelemesi",
        seoDescription: "Fathom AI'nin toplantı notları, özetler ve takip akışlarındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A meeting-first helper for notes, summaries, and action items.",
        bestUseCase: "Meeting summaries and follow-up tracking",
        whoShouldUse: ["Founders", "Sales teams", "Agencies"],
        workflowExampleTitle: "Turn a meeting into a summary",
        workflowExampleDescription: "A team can use Fathom AI to pull summaries and follow-up tasks faster after meetings.",
        strengths: ["Meeting summaries", "Action extraction", "Time savings"],
        limitations: ["Less useful without meetings", "Not a replacement for project management"],
        seoTitle: "Fathom AI review",
        seoDescription: "Review Fathom AI for meeting notes, summaries, and follow-up workflows."
      }
    }
  },
  {
    name: "PhotoRoom",
    slug: "photoroom",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.photoroom.com/",
    affiliateUrl: "https://www.photoroom.com/",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["image", "productivity"],
    useCaseSlugs: ["creators", "content", "freelancers"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Ürün görselleri, arka plan temizleme ve hızlı sosyal görsel teslimi için pratik bir araç.",
        bestUseCase: "Ürün görseli ve arka plan düzenleme",
        whoShouldUse: ["E-ticaret ekipleri", "Freelancer tasarımcılar", "İçerik üreticileri"],
        workflowExampleTitle: "Ürün fotoğrafını satışa hazır hale getirin",
        workflowExampleDescription: "Bir ekip PhotoRoom ile arka planı temizleyip sosyal veya mağaza görselini hızla hazırlayabilir.",
        strengths: ["Arka plan temizleme", "E-ticaret uyumu", "Hızlı teslim"],
        limitations: ["Uzun form tasarım işleri için yeterli değildir", "Konsept üretiminden çok düzenleme odaklıdır"],
        seoTitle: "PhotoRoom incelemesi",
        seoDescription: "PhotoRoom'un ürün görseli, arka plan düzenleme ve hızlı teslim işlerinde nasıl çalıştığını inceleyin."
      },
      en: {
        shortDescription: "A practical tool for product photos, background cleanup, and fast visual delivery.",
        bestUseCase: "Product visuals and background editing",
        whoShouldUse: ["Ecommerce teams", "Freelance designers", "Content creators"],
        workflowExampleTitle: "Make the product photo ready to sell",
        workflowExampleDescription: "A team can use PhotoRoom to remove the background and prepare a social or store visual quickly.",
        strengths: ["Background cleanup", "Ecommerce fit", "Fast delivery"],
        limitations: ["Not for long-form design work", "More editing-focused than concept-led"],
        seoTitle: "PhotoRoom review",
        seoDescription: "Review PhotoRoom for product visuals, background editing, and fast delivery workflows."
      }
    }
  },
  {
    name: "Lindy",
    slug: "lindy",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.lindy.ai/",
    affiliateUrl: "https://www.lindy.ai/",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "sales", "freelancers"],
    rating: 4.4,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Tekrarlayan operasyonları AI ajanlarla hafifletmek isteyen ekipler için modern bir araç.",
        bestUseCase: "Operasyon otomasyonu ve AI ajanlar",
        whoShouldUse: ["Operasyon ekipleri", "Kurucular", "İleri seviye kullanıcılar"],
        workflowExampleTitle: "Küçük bir ajan akışı kurun",
        workflowExampleDescription: "Bir ekip Lindy ile e-posta takibi, görev açma veya bilgi toplama için küçük bir ajan akışı oluşturabilir.",
        strengths: ["Ajan mantığı", "Tekrarlayan işi azaltma", "Operasyon dostu"],
        limitations: ["Herkes için gerekli değildir", "Karmaşık otomasyonlarda dikkat ister"],
        seoTitle: "Lindy incelemesi",
        seoDescription: "Lindy'nin AI ajanları, otomasyon ve operasyon akışlarındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A modern AI agent tool that can take over repeatable work patterns.",
        bestUseCase: "Operational automation with AI agents",
        whoShouldUse: ["Operations teams", "Founders", "Power users"],
        workflowExampleTitle: "Set up a simple agent flow",
        workflowExampleDescription: "A team can use Lindy to build a small agent for email follow-up, task creation, or data collection.",
        strengths: ["Agent logic", "Repeatable work reduction", "Operations-friendly"],
        limitations: ["Not required for everyone", "Needs care in complex automations"],
        seoTitle: "Lindy review",
        seoDescription: "Review Lindy for AI agents, automation, and operations workflows."
      }
    }
  },
  {
    name: "v0",
    slug: "v0",
    pricing: "FREEMIUM",
    websiteUrl: "https://v0.dev",
    affiliateUrl: "https://v0.dev",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "image"],
    useCaseSlugs: ["business", "creators", "freelancers"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        shortDescription: "UI bileşenleri ve web arayüzleri için hızlı ön yüz üretimi sağlayan güçlü bir araç.",
        bestUseCase: "UI taslağı ve ön yüz üretimi",
        whoShouldUse: ["Frontend geliştiriciler", "Tasarımcılar", "Startup kurucuları"],
        workflowExampleTitle: "Landing page taslağını çıkar",
        workflowExampleDescription: "Bir ekip v0 ile bir ürün sayfasının veya dashboard arayüzünün ilk sürümünü daha hızlı oluşturabilir.",
        strengths: ["Hızlı UI üretimi", "Geliştirici dostu", "Prototip hızlandırma"],
        limitations: ["Genel amaçlı AI aracı değildir", "En iyi değer ürün ve arayüz işlerinde ortaya çıkar"],
        seoTitle: "v0 incelemesi",
        seoDescription: "v0'un UI üretimi, prototip ve ön yüz iş akışlarını inceleyin."
      },
      en: {
        shortDescription: "A powerful tool for fast frontend generation and UI component drafting.",
        bestUseCase: "UI drafts and frontend generation",
        whoShouldUse: ["Frontend developers", "Designers", "Startup founders"],
        workflowExampleTitle: "Draft the landing page quickly",
        workflowExampleDescription: "A team can use v0 to produce the first version of a product page or dashboard interface faster.",
        strengths: ["Fast UI generation", "Developer-friendly", "Prototype speed"],
        limitations: ["Not a general-purpose AI app", "Best value appears in product and interface workflows"],
        seoTitle: "v0 review",
        seoDescription: "Review v0 for UI generation, prototypes, and frontend workflows."
      }
    }
  },
  {
    name: "DALL·E",
    slug: "dalle",
    pricing: "FREEMIUM",
    websiteUrl: "https://openai.com/dall-e-3",
    affiliateUrl: "https://openai.com/dall-e-3",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["image"],
    useCaseSlugs: ["content", "creators", "business"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        shortDescription: "Kısa promptlarla konsept görsel, ürün fikri ve yaratıcı varyasyon üretmek için kullanılan OpenAI görsel aracı.",
        bestUseCase: "Konsept görsel ve hızlı görsel fikir üretimi",
        whoShouldUse: ["İçerik üreticileri", "Tasarımcılar", "Pazarlama ekipleri"],
        workflowExampleTitle: "Hızlı görsel yön bulun",
        workflowExampleDescription: "Bir ekip kampanya ya da ürün fikrini daha hızlı test etmek için birkaç görsel yön çıkarabilir.",
        strengths: ["Hızlı görsel fikir", "Kolay başlangıç", "Geniş kullanım alanı"],
        limitations: ["Detaylı stil kontrolü sınırlı olabilir", "En iyi sonuç için net prompt gerekir"],
        seoTitle: "DALL·E incelemesi",
        seoDescription: "DALL·E için kullanım alanları, artılar, eksiler ve gerçek iş akışlarını kısa şekilde inceleyin."
      },
      en: {
        shortDescription: "OpenAI's image tool for concept visuals, product ideas, and quick creative variations.",
        bestUseCase: "Concept visuals and fast visual ideation",
        whoShouldUse: ["Content creators", "Designers", "Marketing teams"],
        workflowExampleTitle: "Find a visual direction fast",
        workflowExampleDescription: "A team can test a few visual directions to move a campaign or product idea forward faster.",
        strengths: ["Fast visual ideation", "Easy start", "Broad use cases"],
        limitations: ["Detailed style control can be limited", "Best results need clear prompts"],
        seoTitle: "DALL·E review",
        seoDescription: "Review DALL·E use cases, strengths, weaknesses, and practical workflow fit."
      }
    }
  },
  {
    name: "CapCut AI",
    slug: "capcut-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.capcut.com/",
    affiliateUrl: "https://www.capcut.com/",
    primaryCategorySlug: "video",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["video"],
    useCaseSlugs: ["creators", "content", "business"],
    rating: 4.3,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Kısa video düzenleme, altyazı, sosyal medya klibi ve hızlı yayın akışı için pratik bir AI video desteği.",
        bestUseCase: "Kısa video düzenleme ve sosyal klip üretimi",
        whoShouldUse: ["İçerik üreticileri", "Sosyal medya ekipleri", "Freelancer'lar"],
        workflowExampleTitle: "Sosyal klibi hızlandırın",
        workflowExampleDescription: "Bir ekip ham görüntüleri daha hızlı kesip altyazı ve paylaşım formatına dönüştürebilir.",
        strengths: ["Hızlı düzenleme", "Sosyal format uyumu", "Kolay üretim"],
        limitations: ["İleri kurgu için sınırlı kalabilir", "En güçlü tarafı kısa video akışıdır"],
        seoTitle: "CapCut AI incelemesi",
        seoDescription: "CapCut AI için kısa video, altyazı, hız ve gerçek workflow uyumunu inceleyin."
      },
      en: {
        shortDescription: "A practical AI video helper for short editing, captions, social clips, and fast publishing workflows.",
        bestUseCase: "Short-form video editing and social clip production",
        whoShouldUse: ["Content creators", "Social teams", "Freelancers"],
        workflowExampleTitle: "Speed up the social clip",
        workflowExampleDescription: "A team can cut raw footage faster and turn it into captioned, share-ready video assets.",
        strengths: ["Fast editing", "Social format fit", "Easy production"],
        limitations: ["May feel limited for advanced editing", "Best fit is short-form workflows"],
        seoTitle: "CapCut AI review",
        seoDescription: "Review CapCut AI for short-form video, captions, speed, and workflow fit."
      }
    }
  },
  {
    name: "Writer",
    slug: "writer",
    pricing: "PAID",
    websiteUrl: "https://writer.com",
    affiliateUrl: "https://writer.com",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["business", "content"],
    rating: 4.6,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Kurumsal ekipler için marka tonu ve stil uyumlu içerik üretimini hızlandıran yazı platformu.",
        bestUseCase: "Marka tonu uyumlu içerik üretimi",
        whoShouldUse: ["Pazarlama ekipleri", "Kurumsal içerik ekipleri", "Ajanslar"],
        workflowExampleTitle: "Marka uyumlu metin akışı kurun",
        workflowExampleDescription: "Bir ekip, kampanya ve web metinlerinde aynı tonu korumak için Writer'ı kullanabilir.",
        strengths: ["Marka tonu kontrolü", "Ekip iş akışına uygun", "Kurumsal metin üretimi"],
        limitations: ["Kurumsal kullanım odaklıdır", "Küçük ekipler için maliyetli olabilir"],
        seoTitle: "Writer incelemesi",
        seoDescription: "Writer'ın marka tonu, kurumsal içerik ve ekip iş akışlarındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A writing platform that helps teams keep brand tone and style consistent across content.",
        bestUseCase: "Brand-aligned content production",
        whoShouldUse: ["Marketing teams", "Enterprise content teams", "Agencies"],
        workflowExampleTitle: "Lock in brand voice",
        workflowExampleDescription: "A team can keep campaign and web copy aligned to the same tone with Writer.",
        strengths: ["Brand voice control", "Team workflow fit", "Enterprise-ready output"],
        limitations: ["Enterprise-focused", "Can be costly for small teams"],
        seoTitle: "Writer review",
        seoDescription: "Review Writer for brand voice control, enterprise content, and team workflows."
      }
    }
  },
  {
    name: "Copysmith",
    slug: "copysmith",
    pricing: "PAID",
    websiteUrl: "https://copysmith.ai",
    affiliateUrl: "https://copysmith.ai",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides", "make-money-with-ai"],
    toolCategorySlugs: ["writing"],
    useCaseSlugs: ["business", "content", "freelancers"],
    rating: 4.4,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Ürün açıklaması, katalog metni ve e-ticaret kopyası için odaklı bir yazı aracı.",
        bestUseCase: "E-ticaret ürün açıklaması",
        whoShouldUse: ["E-ticaret ekipleri", "Küçük markalar", "Ajanslar"],
        workflowExampleTitle: "SKU açıklamalarını hızlandırın",
        workflowExampleDescription: "Bir ekip Copysmith ile ürün açıklamalarını toplu şekilde daha hızlı hazırlayabilir.",
        strengths: ["E-ticaret odaklı", "Ürün açıklaması hızı", "Katalog için uygun"],
        limitations: ["Genel amaçlı yazı aracı değildir", "Derin marka stratejisi gerektirir"],
        seoTitle: "Copysmith incelemesi",
        seoDescription: "Copysmith'in e-ticaret ürün açıklaması ve katalog kopyası işlerinde nasıl çalıştığını inceleyin."
      },
      en: {
        shortDescription: "A focused writing tool for product descriptions, catalogs, and ecommerce copy.",
        bestUseCase: "Ecommerce product descriptions",
        whoShouldUse: ["Ecommerce teams", "Small brands", "Agencies"],
        workflowExampleTitle: "Speed up SKU descriptions",
        workflowExampleDescription: "A team can prepare product descriptions in bulk with Copysmith.",
        strengths: ["Ecommerce focus", "Fast product copy", "Catalog-friendly"],
        limitations: ["Not a general-purpose writer", "Still needs brand strategy review"],
        seoTitle: "Copysmith review",
        seoDescription: "Review Copysmith for ecommerce product descriptions and catalog copy workflows."
      }
    }
  },
  {
    name: "Shopify Magic",
    slug: "shopify-magic",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.shopify.com/magic",
    affiliateUrl: "https://www.shopify.com/magic",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides", "make-money-with-ai"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["business", "content"],
    rating: 4.3,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Shopify mağazaları için ürün açıklaması ve mağaza metni üretimini hızlandıran yerleşik AI.",
        bestUseCase: "Shopify ürün açıklaması ve mağaza metni",
        whoShouldUse: ["Shopify mağaza sahipleri", "E-ticaret ekipleri", "Küçük işletmeler"],
        workflowExampleTitle: "Ürün sayfasını hızla tamamlayın",
        workflowExampleDescription: "Bir mağaza, ürün açıklamalarını ve temel metinleri Shopify içinde daha hızlı tamamlayabilir.",
        strengths: ["Shopify içine entegre", "Hızlı ürün metni", "Mağaza odaklı akış"],
        limitations: ["Sadece Shopify ekosistemi", "Gelişmiş strateji için ek araç gerekebilir"],
        seoTitle: "Shopify Magic incelemesi",
        seoDescription: "Shopify Magic'in ürün açıklaması ve mağaza metni üretimindeki değerini inceleyin."
      },
      en: {
        shortDescription: "Built-in AI for Shopify that speeds up product descriptions and store copy.",
        bestUseCase: "Shopify product descriptions and store copy",
        whoShouldUse: ["Shopify store owners", "Ecommerce teams", "Small businesses"],
        workflowExampleTitle: "Finish the product page faster",
        workflowExampleDescription: "A store can complete product descriptions and basic copy directly inside Shopify.",
        strengths: ["Native to Shopify", "Fast product copy", "Store-first workflow"],
        limitations: ["Shopify-only", "Needs extra tooling for deeper strategy"],
        seoTitle: "Shopify Magic review",
        seoDescription: "Review Shopify Magic for product descriptions and store copy workflows."
      }
    }
  },
  {
    name: "Klaviyo AI",
    slug: "klaviyo-ai",
    pricing: "PAID",
    websiteUrl: "https://www.klaviyo.com/",
    affiliateUrl: "https://www.klaviyo.com/",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides", "make-money-with-ai"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["business", "content"],
    rating: 4.4,
    featured: false,
    locales: {
      tr: {
        shortDescription: "E-posta kampanyası, segment ve otomasyon metinleri için e-ticaret odaklı AI desteği.",
        bestUseCase: "E-posta kampanyası ve otomasyon metni",
        whoShouldUse: ["E-ticaret ekipleri", "Büyüme ekipleri", "Ajanslar"],
        workflowExampleTitle: "Otomasyon akışını kurgulayın",
        workflowExampleDescription: "Bir ekip, kampanya ve segment metinlerini daha hızlı hazırlayıp test edebilir.",
        strengths: ["E-ticaret odaklı", "Kampanya kurgusu", "Segment desteği"],
        limitations: ["Klaviyo altyapısında en güçlüdür", "Küçük ekipler için ağır olabilir"],
        seoTitle: "Klaviyo AI incelemesi",
        seoDescription: "Klaviyo AI'nin e-posta kampanyası ve otomasyon metinlerindeki değerini inceleyin."
      },
      en: {
        shortDescription: "Ecommerce-focused AI support for email campaigns, segmentation, and automation copy.",
        bestUseCase: "Email campaigns and automation copy",
        whoShouldUse: ["Ecommerce teams", "Growth teams", "Agencies"],
        workflowExampleTitle: "Plan the automation flow",
        workflowExampleDescription: "A team can prepare campaign and segment copy faster and iterate on tests.",
        strengths: ["Ecommerce focus", "Campaign structure", "Segmentation fit"],
        limitations: ["Strongest inside Klaviyo", "Can be heavy for small teams"],
        seoTitle: "Klaviyo AI review",
        seoDescription: "Review Klaviyo AI for email campaign and automation copy workflows."
      }
    }
  },
  {
    name: "Otter.ai",
    slug: "otter-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://otter.ai",
    affiliateUrl: "https://otter.ai",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "research", "freelancers"],
    rating: 4.5,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Toplantı transkripti, özet ve not çıkarma için pratik bir toplantı yardımcısı.",
        bestUseCase: "Toplantı transkripti ve özet",
        whoShouldUse: ["Satış ekipleri", "Kurucular", "Danışmanlar"],
        workflowExampleTitle: "Toplantıyı özetleyin",
        workflowExampleDescription: "Bir ekip Otter.ai ile toplantı notlarını ve aksiyonları daha hızlı çıkarabilir.",
        strengths: ["Canlı transkript", "Özet ve not çıkarma", "Toplantı odaklı hız"],
        limitations: ["Dil doğruluğu değişebilir", "Toplantı dışı işlerde sınırlı kalır"],
        seoTitle: "Otter.ai incelemesi",
        seoDescription: "Otter.ai'nin toplantı transkripti, özet ve not işlerinde nasıl çalıştığını inceleyin."
      },
      en: {
        shortDescription: "A meeting helper for transcripts, summaries, and fast note-taking.",
        bestUseCase: "Meeting transcripts and summaries",
        whoShouldUse: ["Sales teams", "Founders", "Consultants"],
        workflowExampleTitle: "Summarize the meeting",
        workflowExampleDescription: "A team can extract notes and action items faster with Otter.ai.",
        strengths: ["Live transcripts", "Summaries and notes", "Meeting-first speed"],
        limitations: ["Accuracy varies by language", "Less useful outside meetings"],
        seoTitle: "Otter.ai review",
        seoDescription: "Review Otter.ai for meeting transcripts, summaries, and notes."
      }
    }
  },
  {
    name: "Fireflies.ai",
    slug: "fireflies-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://fireflies.ai",
    affiliateUrl: "https://fireflies.ai",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "freelancers", "research"],
    rating: 4.5,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Toplantı kaydı, özet ve aksiyon maddelerini otomatik çıkarmak için kullanılan bir yardımcı.",
        bestUseCase: "Toplantı kaydı ve aksiyon takibi",
        whoShouldUse: ["Satış ekipleri", "Müşteri başarısı ekipleri", "Ajanslar"],
        workflowExampleTitle: "Aksiyonları otomatik yakalayın",
        workflowExampleDescription: "Bir ekip Fireflies.ai ile görüşme sonrası aksiyonları daha hızlı takip edebilir.",
        strengths: ["Toplantı kaydı", "Aksiyon çıkarma", "Takip kolaylığı"],
        limitations: ["Doğru kurulum ister", "Gizlilik politikaları dikkat gerektirir"],
        seoTitle: "Fireflies.ai incelemesi",
        seoDescription: "Fireflies.ai'nin toplantı kaydı ve aksiyon takibi işlerinde nasıl çalıştığını inceleyin."
      },
      en: {
        shortDescription: "A helper for meeting recording, summaries, and automatic action items.",
        bestUseCase: "Meeting recording and action tracking",
        whoShouldUse: ["Sales teams", "Customer success teams", "Agencies"],
        workflowExampleTitle: "Capture actions automatically",
        workflowExampleDescription: "A team can track post-meeting action items faster with Fireflies.ai.",
        strengths: ["Meeting recording", "Action extraction", "Follow-up clarity"],
        limitations: ["Needs correct setup", "Privacy considerations apply"],
        seoTitle: "Fireflies.ai review",
        seoDescription: "Review Fireflies.ai for meeting recording, summaries, and action tracking."
      }
    }
  },
  {
    name: "Notta",
    slug: "notta",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.notta.ai",
    affiliateUrl: "https://www.notta.ai",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["research", "students", "business"],
    rating: 4.4,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Toplantı, röportaj ve ders kayıtlarını hızlı transkripte çeviren bir araç.",
        bestUseCase: "Hızlı transkript ve not çıkarma",
        whoShouldUse: ["Araştırmacılar", "Öğrenciler", "Ekipler"],
        workflowExampleTitle: "Ses kaydını metne dökün",
        workflowExampleDescription: "Bir ekip Notta ile görüşme notlarını kısa sürede metne çevirebilir.",
        strengths: ["Hızlı transkript", "Ders ve görüşme odaklı", "Not çıkarma kolaylığı"],
        limitations: ["Uzun kayıtlar maliyetli olabilir", "Dil doğruluğu değişken olabilir"],
        seoTitle: "Notta incelemesi",
        seoDescription: "Notta'nın transkript, not çıkarma ve ders kayıtlarındaki değerini inceleyin."
      },
      en: {
        shortDescription: "A tool that turns meetings, interviews, and lectures into fast transcripts.",
        bestUseCase: "Fast transcripts and note-taking",
        whoShouldUse: ["Researchers", "Students", "Teams"],
        workflowExampleTitle: "Turn audio into text",
        workflowExampleDescription: "A team can convert interview notes into text quickly with Notta.",
        strengths: ["Fast transcription", "Lecture and interview fit", "Easy note extraction"],
        limitations: ["Long recordings can be costly", "Accuracy varies by language"],
        seoTitle: "Notta review",
        seoDescription: "Review Notta for transcription, notes, and lecture workflows."
      }
    }
  },
  {
    name: "Loom AI",
    slug: "loom-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.loom.com",
    affiliateUrl: "https://www.loom.com",
    primaryCategorySlug: "video",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["video", "productivity"],
    useCaseSlugs: ["business", "content", "freelancers"],
    rating: 4.5,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Hızlı ekran kaydı, ekip içi anlatım ve otomatik özet için kullanılan video aracı.",
        bestUseCase: "Ekran kaydı ve hızlı anlatım",
        whoShouldUse: ["Ürün ekipleri", "Destek ekipleri", "Uzaktan ekipler"],
        workflowExampleTitle: "Hızlı anlatım videosu hazırlayın",
        workflowExampleDescription: "Bir ekip Loom ile ürün anlatımını ve güncellemeleri daha hızlı paylaşabilir.",
        strengths: ["Hızlı kayıt", "Otomatik özet", "Ekip iletişimi"],
        limitations: ["Uzun prodüksiyon işleri için sınırlı", "Gelişmiş kurgu aracı değildir"],
        seoTitle: "Loom AI incelemesi",
        seoDescription: "Loom AI'nin ekran kaydı, anlatım ve özet işlerinde nasıl çalıştığını inceleyin."
      },
      en: {
        shortDescription: "A video tool for fast screen recordings, team explanations, and auto summaries.",
        bestUseCase: "Screen recording and quick explainers",
        whoShouldUse: ["Product teams", "Support teams", "Remote teams"],
        workflowExampleTitle: "Create a quick explainer",
        workflowExampleDescription: "A team can share product updates faster with Loom recordings.",
        strengths: ["Fast recording", "Auto summaries", "Team communication"],
        limitations: ["Limited for long productions", "Not a full editing suite"],
        seoTitle: "Loom AI review",
        seoDescription: "Review Loom AI for screen recordings, explainers, and team updates."
      }
    }
  },
  {
    name: "Pixelcut",
    slug: "pixelcut",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.pixelcut.ai",
    affiliateUrl: "https://www.pixelcut.ai",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "comparisons", "guides", "make-money-with-ai"],
    toolCategorySlugs: ["image", "productivity"],
    useCaseSlugs: ["business", "content", "freelancers"],
    rating: 4.5,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Ürün görselleri, arka plan temizleme ve hızlı sosyal görsel üretimi için pratik bir araç.",
        bestUseCase: "Ürün görseli ve arka plan düzenleme",
        whoShouldUse: ["E-ticaret ekipleri", "Sosyal medya ekipleri", "Freelancer'lar"],
        workflowExampleTitle: "Ürün görselini satışa hazırla",
        workflowExampleDescription: "Bir ekip Pixelcut ile arka planı temizleyip hızlı katalog görseli üretebilir.",
        strengths: ["Arka plan temizleme", "E-ticaret uyumu", "Hızlı teslim"],
        limitations: ["Konsept üretiminden çok düzenleme odaklıdır", "Gelişmiş tasarım gerektiren işlerde sınırlı"],
        seoTitle: "Pixelcut incelemesi",
        seoDescription: "Pixelcut'un ürün görseli, arka plan temizleme ve hızlı teslim işlerinde nasıl çalıştığını inceleyin."
      },
      en: {
        shortDescription: "A practical tool for product visuals, background cleanup, and fast social assets.",
        bestUseCase: "Product visuals and background editing",
        whoShouldUse: ["Ecommerce teams", "Social media teams", "Freelancers"],
        workflowExampleTitle: "Prepare the product image",
        workflowExampleDescription: "A team can remove backgrounds and create catalog visuals quickly with Pixelcut.",
        strengths: ["Background cleanup", "Ecommerce fit", "Fast delivery"],
        limitations: ["More editing than concept generation", "Limited for advanced design work"],
        seoTitle: "Pixelcut review",
        seoDescription: "Review Pixelcut for product visuals, background cleanup, and fast delivery."
      }
    }
  },
  {
    name: "Remove.bg",
    slug: "remove-bg",
    pricing: "FREEMIUM",
    websiteUrl: "https://www.remove.bg",
    affiliateUrl: "https://www.remove.bg",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "comparisons", "guides", "make-money-with-ai"],
    toolCategorySlugs: ["image", "productivity"],
    useCaseSlugs: ["business", "content", "freelancers"],
    rating: 4.4,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Arka plan temizleme ve hızlı ürün görseli hazırlama için sade bir araç.",
        bestUseCase: "Arka plan temizleme ve hızlı görsel hazırlama",
        whoShouldUse: ["E-ticaret ekipleri", "Tasarımcılar", "Ajanslar"],
        workflowExampleTitle: "Görseli şeffaflaştırın",
        workflowExampleDescription: "Bir ekip Remove.bg ile ürün görsellerini hızlıca temizleyip katalog haline getirebilir.",
        strengths: ["Hızlı arka plan kaldırma", "Basit kullanım", "E-ticaret için pratik"],
        limitations: ["İleri düzenleme için ek araç gerekir", "Toplu kullanımda ücret artabilir"],
        seoTitle: "Remove.bg incelemesi",
        seoDescription: "Remove.bg'nin arka plan temizleme ve hızlı görsel hazırlamadaki değerini inceleyin."
      },
      en: {
        shortDescription: "A simple tool for background removal and fast product image prep.",
        bestUseCase: "Background removal and quick image prep",
        whoShouldUse: ["Ecommerce teams", "Designers", "Agencies"],
        workflowExampleTitle: "Make the image transparent",
        workflowExampleDescription: "A team can clean product visuals quickly and prepare a catalog.",
        strengths: ["Fast background removal", "Simple workflow", "Ecommerce-friendly"],
        limitations: ["Needs other tools for advanced editing", "Costs rise for bulk use"],
        seoTitle: "Remove.bg review",
        seoDescription: "Review Remove.bg for background removal and quick image prep."
      }
    }
  },
  {
    name: "Vectorizer.ai",
    slug: "vectorizer-ai",
    pricing: "PAID",
    websiteUrl: "https://vectorizer.ai",
    affiliateUrl: "https://vectorizer.ai",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["image", "productivity"],
    useCaseSlugs: ["business", "content", "freelancers"],
    rating: 4.4,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Raster görselleri vektöre çevirerek logo ve baskı işleri için hazırlayan araç.",
        bestUseCase: "Rasterdan vektöre dönüşüm",
        whoShouldUse: ["Tasarımcılar", "Marka ekipleri", "Freelancer'lar"],
        workflowExampleTitle: "Logoyu vektöre çevirin",
        workflowExampleDescription: "Bir ekip düşük çözünürlüklü logoyu hızlıca vektör formatına dönüştürebilir.",
        strengths: ["Hızlı vektör dönüşümü", "Baskı dostu çıktı", "Tasarımcılar için pratik"],
        limitations: ["Yaratıcı tasarım üretmez", "Kompleks düzenleme için ek yazılım gerekir"],
        seoTitle: "Vectorizer.ai incelemesi",
        seoDescription: "Vectorizer.ai'nin vektör dönüşüm ve baskı hazırlık işlerinde nasıl çalıştığını inceleyin."
      },
      en: {
        shortDescription: "A tool that converts raster images to vectors for logo and print work.",
        bestUseCase: "Raster-to-vector conversion",
        whoShouldUse: ["Designers", "Brand teams", "Freelancers"],
        workflowExampleTitle: "Convert the logo to vector",
        workflowExampleDescription: "A team can turn a low-res logo into a vector file quickly.",
        strengths: ["Fast vector conversion", "Print-ready output", "Designer-friendly"],
        limitations: ["Does not create new designs", "Needs other tools for complex edits"],
        seoTitle: "Vectorizer.ai review",
        seoDescription: "Review Vectorizer.ai for vector conversion and print prep workflows."
      }
    }
  },
  {
    name: "Sourcegraph Cody",
    slug: "sourcegraph-cody",
    pricing: "FREEMIUM",
    websiteUrl: "https://sourcegraph.com/cody",
    affiliateUrl: "https://sourcegraph.com/cody",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "freelancers", "research"],
    rating: 4.6,
    featured: false,
    locales: {
      tr: {
        shortDescription: "Kod tabanı içinde arama, açıklama ve hızlı geliştirme desteği sunan geliştirici aracı.",
        bestUseCase: "Kod tabanı arama ve geliştirici üretkenliği",
        whoShouldUse: ["Geliştiriciler", "Teknik ekipler", "Kurucu ekipler"],
        workflowExampleTitle: "Repo içinde hızlı yanıt alın",
        workflowExampleDescription: "Bir ekip Cody ile kod tabanında arama, açıklama ve özetleri daha hızlı çıkarabilir.",
        strengths: ["Kod bağlamı", "Geliştirici odaklı", "Hızlı arama"],
        limitations: ["Kurulum ve erişim gerektirir", "En iyi değer teknik ekiplerde"],
        seoTitle: "Sourcegraph Cody incelemesi",
        seoDescription: "Cody'nin kod tabanı arama, açıklama ve geliştirici üretkenliğindeki rolünü inceleyin."
      },
      en: {
        shortDescription: "A developer tool for codebase search, explanations, and faster coding help.",
        bestUseCase: "Codebase search and developer productivity",
        whoShouldUse: ["Developers", "Technical teams", "Founding teams"],
        workflowExampleTitle: "Get fast repo answers",
        workflowExampleDescription: "A team can use Cody to search and summarize codebase context faster.",
        strengths: ["Codebase context", "Developer-first", "Fast search"],
        limitations: ["Requires setup and access", "Best value in technical teams"],
        seoTitle: "Sourcegraph Cody review",
        seoDescription: "Review Cody for codebase search, explanations, and developer productivity."
      }
    }
  }
];

export const premiumTools: ToolEntry[] = premiumSeeds.map(buildTool);
