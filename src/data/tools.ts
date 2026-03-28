import type { ToolEntry } from "@/types/catalog";

export const tools: ToolEntry[] = [
  {
    slug: "chatgpt",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/chatgpt",
    affiliateUrl: "https://example.com/chatgpt",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["content", "business", "students"],
    rating: 4.9,
    featured: true,
    locales: {
      tr: {
        name: "ChatGPT",
        shortDescription: "Yazı, araştırma ve günlük iş akışlarını hızlandıran çok yönlü bir AI asistanı.",
        longDescription:
          "ChatGPT; yazı yazma, özet çıkarma, fikir bulma ve araştırma destekli içerik üretimi için kullanılan çok yönlü bir AI aracıdır. Hızlı sonuç verdiği için bireysel kullanıcılar ve ekipler için pratik bir başlangıç noktası olur.",
        bestUseCase: "Yazı, araştırma ve günlük üretkenlik işleri",
        whoShouldUse: ["Freelancer'lar", "Öğrenciler", "İçerik üreticileri"],
        moneyUseCases: [
          {
            title: "Blog içerikleri üretme",
            description: "Daha hızlı taslak çıkarıp reklam veya affiliate geliri hedefleyen siteler için içerik üretebilirsiniz."
          },
          {
            title: "Müşteri için metin yazma",
            description: "Landing page, e-posta ve sosyal medya metinlerini freelance hizmet olarak satabilirsiniz."
          },
          {
            title: "Dijital ürün hazırlama",
            description: "Kontrol listesi, mini rehber ve şablon üretip bunları dijital ürün olarak satabilirsiniz."
          },
          {
            title: "YouTube senaryosu yazma",
            description: "Video üreticileri için senaryo ve içerik akışı hazırlayarak ek gelir oluşturabilirsiniz."
          }
        ],
        features: ["Uzun ve kısa metin üretimi", "Özetleme ve yeniden yazım", "Araştırma desteği", "Esnek prompt kullanımı"],
        pros: ["Çok geniş kullanım alanı sunar", "Yeni başlayanlar için öğrenmesi kolaydır", "Hızlı çıktı verir"],
        cons: ["Sonuç kalitesi prompt kalitesine bağlıdır", "Önemli bilgiler için kontrol gerekebilir"],
        seoTitle: "ChatGPT incelemesi ve kullanım alanları",
        seoDescription: "ChatGPT fiyat modeli, güçlü yönleri, eksileri ve para kazanma kullanım alanlarını kısa şekilde inceleyin."
      },
      en: {
        name: "ChatGPT",
        shortDescription: "A versatile AI assistant for writing, research, and everyday productivity work.",
        longDescription:
          "ChatGPT is a flexible AI tool used for writing, summarization, idea generation, and research-assisted content work. Its speed makes it a practical starting point for solo users and teams.",
        bestUseCase: "Writing, research, and daily productivity",
        whoShouldUse: ["Freelancers", "Students", "Content creators"],
        moneyUseCases: [
          {
            title: "Create blog content",
            description: "Draft content faster for websites built around ads or affiliate revenue."
          },
          {
            title: "Write for clients",
            description: "Sell landing page copy, email copy, and social media text as a freelance service."
          },
          {
            title: "Build digital products",
            description: "Turn checklists, mini guides, and templates into simple paid products."
          },
          {
            title: "Write YouTube scripts",
            description: "Create script drafts for video creators and turn that into a repeatable service."
          }
        ],
        features: ["Short and long text generation", "Summarization and rewriting", "Research support", "Flexible prompts"],
        pros: ["Very broad use-case coverage", "Easy to start using", "Fast output"],
        cons: ["Quality depends on prompt quality", "Important claims still need checking"],
        seoTitle: "ChatGPT review and use cases",
        seoDescription: "See ChatGPT pricing, strengths, weaknesses, and practical monetization use cases in one short review."
      }
    }
  },
  {
    slug: "claude",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/claude",
    affiliateUrl: "https://example.com/claude",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing"],
    useCaseSlugs: ["content", "business", "research"],
    rating: 4.8,
    featured: true,
    locales: {
      tr: {
        name: "Claude",
        shortDescription: "Uzun içerik, detaylı açıklama ve daha sakin yazım tonu için güçlü bir AI aracı.",
        longDescription:
          "Claude; uzun metin üretimi, detaylı açıklamalar ve düzenli yazı akışı isteyen kullanıcılar için öne çıkar. Özellikle araştırma destekli içerik ve daha temiz uzun form yazılar için tercih edilir.",
        bestUseCase: "Uzun içerik ve detaylı anlatım",
        whoShouldUse: ["Araştırmacılar", "İçerik ekipleri", "Freelancer'lar"],
        moneyUseCases: [
          {
            title: "Uzun blog yazıları hazırlama",
            description: "Daha düzenli uzun içerikler üreterek müşterilere blog paketi satabilirsiniz."
          },
          {
            title: "B2B içerik üretimi",
            description: "Kurumsal ton isteyen markalar için daha açıklayıcı içerikler hazırlayabilirsiniz."
          },
          {
            title: "Rapor ve rehber yazımı",
            description: "Detaylı rehberler ve araştırma özetlerini ücretli içerik hizmetine dönüştürebilirsiniz."
          }
        ],
        features: ["Uzun bağlam desteği", "Düzenli açıklama yapısı", "Yazı odaklı kullanım", "Araştırma destekli akışlar"],
        pros: ["Uzun cevaplarda güçlüdür", "Daha düzenli bir yazım stili sunar", "Araştırma odaklı içerikte iyidir"],
        cons: ["Bazı hızlı iş akışlarında daha yavaş hissedilebilir", "Kısa pazarlama metinlerinde her zaman en pratik seçenek olmayabilir"],
        seoTitle: "Claude incelemesi ve karşılaştırmaları",
        seoDescription: "Claude için fiyat, kullanım alanları, artılar ve eksiler dahil kısa bir inceleme okuyun."
      },
      en: {
        name: "Claude",
        shortDescription: "A strong AI tool for long-form content, careful explanations, and cleaner writing flow.",
        longDescription:
          "Claude stands out for long-form writing, detailed answers, and a more measured output style. It is often used for research-backed content and structured editorial work.",
        bestUseCase: "Long-form content and detailed explanation",
        whoShouldUse: ["Researchers", "Editorial teams", "Freelancers"],
        moneyUseCases: [
          {
            title: "Write long blog posts",
            description: "Produce cleaner long-form posts and sell them as a client content package."
          },
          {
            title: "Create B2B content",
            description: "Draft more structured content for brands that want a professional tone."
          },
          {
            title: "Build reports and guides",
            description: "Turn detailed explainers and summaries into a paid writing service."
          }
        ],
        features: ["Long context support", "Structured explanations", "Writing-first workflows", "Research-friendly output"],
        pros: ["Strong for long answers", "Clean writing style", "Helpful for research-heavy content"],
        cons: ["Can feel slower in speed-first workflows", "Not always the simplest option for short marketing copy"],
        seoTitle: "Claude review and comparisons",
        seoDescription: "Read a short Claude review covering pricing, use cases, pros, and cons."
      }
    }
  },
  {
    slug: "midjourney",
    pricing: "PAID",
    websiteUrl: "https://example.com/midjourney",
    affiliateUrl: "https://example.com/midjourney",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "comparisons"],
    toolCategorySlugs: ["image"],
    useCaseSlugs: ["content", "creators", "business"],
    rating: 4.8,
    featured: true,
    locales: {
      tr: {
        name: "Midjourney",
        shortDescription: "Yüksek kaliteli konsept görseller ve stil odaklı yaratıcı işler için güçlü bir görsel AI aracı.",
        longDescription:
          "Midjourney; konsept tasarım, yaratıcı görsel üretimi ve estetik kalite arayan kullanıcılar için öne çıkan bir görsel AI aracıdır. Tasarımcılar ve içerik üreticileri için hızlı ilham ve sunum desteği sağlar.",
        bestUseCase: "Görsel üretim ve konsept tasarımı",
        whoShouldUse: ["Tasarımcılar", "İçerik üreticileri", "Freelancer'lar"],
        moneyUseCases: [
          {
            title: "Müşteri için görsel hazırlama",
            description: "Kapak, poster ve sosyal medya görsellerini ücretli tasarım hizmetine çevirebilirsiniz."
          },
          {
            title: "Print-on-demand tasarımlar üretme",
            description: "Tişört, poster ve dijital baskı ürünleri için satılabilir görseller hazırlayabilirsiniz."
          },
          {
            title: "Moodboard ve konsept sunumu",
            description: "Ajans veya freelance sunumlarda hızlı konsept görselleri hazırlayarak iş kazanabilirsiniz."
          }
        ],
        features: ["Stil odaklı görsel üretim", "Konsept ve moodboard desteği", "Yüksek estetik kalite", "Yaratıcı iterasyon"],
        pros: ["Görsel kalite algısı yüksektir", "Yaratıcı projelerde güçlü sonuçlar verir", "Konsept üretimini hızlandırır"],
        cons: ["Ücretli başlangıç bariyeri olabilir", "Arayüz ve akış her kullanıcı için en kolay seçenek değildir"],
        seoTitle: "Midjourney incelemesi",
        seoDescription: "Midjourney fiyat modeli, görsel kalite gücü ve para kazanma senaryolarını kısaca inceleyin."
      },
      en: {
        name: "Midjourney",
        shortDescription: "A strong image AI tool for high-quality concepts and style-driven creative visuals.",
        longDescription:
          "Midjourney is widely used for concept design, creative image generation, and style-first visual work. It helps designers and creators move from idea to visual direction quickly.",
        bestUseCase: "Image generation and concept design",
        whoShouldUse: ["Designers", "Content creators", "Freelancers"],
        moneyUseCases: [
          {
            title: "Create visuals for clients",
            description: "Turn covers, posters, and social media visuals into a paid design service."
          },
          {
            title: "Make print-on-demand designs",
            description: "Create sellable artwork for posters, shirts, and digital print products."
          },
          {
            title: "Build concept decks",
            description: "Prepare quick visual directions for agency or freelance client presentations."
          }
        ],
        features: ["Style-led image generation", "Concept and moodboard support", "High visual quality", "Creative iteration"],
        pros: ["Strong perceived image quality", "Great for creative projects", "Speeds up concept work"],
        cons: ["Paid starting point can be a barrier", "The workflow is not the simplest for everyone"],
        seoTitle: "Midjourney review",
        seoDescription: "Review Midjourney pricing, image quality, and practical monetization use cases."
      }
    }
  },
  {
    slug: "gemini",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/gemini",
    affiliateUrl: "https://example.com/gemini",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "students", "research"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        name: "Gemini",
        shortDescription: "Google ekosistemiyle çalışan kullanıcılar için pratik araştırma ve üretkenlik AI aracı.",
        longDescription:
          "Gemini; Google araçlarıyla birlikte çalışan, araştırma, özetleme ve genel iş akışlarını hızlandıran bir AI asistanıdır. Özellikle Gmail, Docs ve Workspace odaklı kullanıcılar için verimli bir seçenek olur.",
        bestUseCase: "Google ekosistemi ve günlük üretkenlik",
        whoShouldUse: ["Öğrenciler", "İş ekipleri", "Araştırma yapan kullanıcılar"],
        moneyUseCases: [
          {
            title: "Hızlı araştırma destekli içerik üretimi",
            description: "Araştırma süresini kısaltarak daha fazla müşteri işi veya içerik yayını çıkarabilirsiniz."
          },
          {
            title: "Sunum ve doküman hazırlama",
            description: "Müşteriler için daha hızlı rapor, özet ve sunum içeriği hazırlayabilirsiniz."
          },
          {
            title: "Workspace odaklı danışmanlık",
            description: "Google araçlarını yoğun kullanan ekipler için iş akışı ve içerik desteği sunabilirsiniz."
          }
        ],
        features: ["Araştırma ve özetleme desteği", "Google araçlarıyla uyum", "Günlük iş akışlarında hız", "Soru-cevap kullanımı"],
        pros: ["Google ekosistemiyle uyumludur", "Araştırma ve özet işlerinde pratiktir", "Başlamak kolaydır"],
        cons: ["Her senaryoda en derin çıktıyı vermeyebilir", "Bazı yaratıcı işlerde alternatifler daha güçlü olabilir"],
        seoTitle: "Gemini incelemesi ve kullanım alanları",
        seoDescription: "Gemini fiyat modeli, kullanım alanları ve hangi kullanıcılar için uygun olduğuna kısa bakış."
      },
      en: {
        name: "Gemini",
        shortDescription: "A practical research and productivity AI tool for users working inside the Google ecosystem.",
        longDescription:
          "Gemini helps with research, summarization, and everyday work inside Google-focused workflows. It is especially useful for people who already rely on Gmail, Docs, and Workspace.",
        bestUseCase: "Google ecosystem and daily productivity",
        whoShouldUse: ["Students", "Business teams", "Research-oriented users"],
        moneyUseCases: [
          {
            title: "Create research-backed content faster",
            description: "Cut research time and increase client output or publishing volume."
          },
          {
            title: "Build docs and presentations",
            description: "Produce reports, summaries, and presentation drafts faster for clients."
          },
          {
            title: "Support Workspace-heavy teams",
            description: "Offer workflow and documentation help to teams working in Google tools."
          }
        ],
        features: ["Research and summarization support", "Google tool compatibility", "Faster daily workflows", "Question-answer assistance"],
        pros: ["Works well in the Google ecosystem", "Practical for research and summaries", "Easy to start with"],
        cons: ["May not go as deep in every workflow", "Some creative tasks may be stronger in other tools"],
        seoTitle: "Gemini review and use cases",
        seoDescription: "A short Gemini review covering pricing, use cases, and who it fits best."
      }
    }
  },
  {
    slug: "notion-ai",
    pricing: "PAID",
    websiteUrl: "https://example.com/notion-ai",
    affiliateUrl: "https://example.com/notion-ai",
    primaryCategorySlug: "productivity",
    categorySlugs: ["ai-tools", "guides", "make-money-with-ai"],
    toolCategorySlugs: ["productivity", "writing"],
    useCaseSlugs: ["business", "content", "freelancers"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        name: "Notion AI",
        shortDescription: "Notion içinde yazı, özet ve dokümantasyon süreçlerini hızlandıran üretkenlik aracı.",
        longDescription:
          "Notion AI; notlar, içerik taslakları, toplantı özetleri ve bilgi tabanı işleri için kullanılan entegre bir AI katmanıdır. Özellikle Notion ile çalışan ekipler ve freelancer'lar için düzenli üretim sağlar.",
        bestUseCase: "Notion içinde yazı ve dokümantasyon işleri",
        whoShouldUse: ["Freelancer'lar", "Operasyon ekipleri", "İçerik ekipleri"],
        moneyUseCases: [
          {
            title: "Müşteri dokümantasyonu hazırlama",
            description: "SOP, süreç dokümanı ve proje özetlerini daha hızlı hazırlayıp danışmanlık hizmeti verebilirsiniz."
          },
          {
            title: "İçerik planı satma",
            description: "İçerik takvimi, brief ve üretim şablonları hazırlayarak paket hizmet sunabilirsiniz."
          },
          {
            title: "Bilgi tabanı kurulumu",
            description: "Ekipler için Notion tabanlı bilgi sistemi kurup buna AI destekli içerik akışı ekleyebilirsiniz."
          }
        ],
        features: ["Notion içinde AI üretim", "Özet ve yeniden yazım", "Doküman ve toplantı notu desteği", "Bilgi tabanı odaklı kullanım"],
        pros: ["Notion kullanan ekipler için çok pratiktir", "Dokümantasyonu hızlandırır", "İş akışına kolay entegre olur"],
        cons: ["Notion dışında tek başına güçlü bir araç değildir", "Ücretli kullanım gerektirir"],
        seoTitle: "Notion AI incelemesi",
        seoDescription: "Notion AI ile üretkenlik, dokümantasyon ve para kazanma kullanım alanlarını kısa şekilde inceleyin."
      },
      en: {
        name: "Notion AI",
        shortDescription: "A productivity layer inside Notion for faster writing, summaries, and documentation.",
        longDescription:
          "Notion AI helps with notes, content drafts, meeting summaries, and documentation inside Notion. It is especially useful for teams and freelancers already managing work in Notion.",
        bestUseCase: "Writing and documentation inside Notion",
        whoShouldUse: ["Freelancers", "Operations teams", "Content teams"],
        moneyUseCases: [
          {
            title: "Create client documentation",
            description: "Build SOPs, process docs, and project summaries as a consulting service."
          },
          {
            title: "Sell content planning",
            description: "Package content calendars, briefs, and workflow templates for clients."
          },
          {
            title: "Set up knowledge bases",
            description: "Build Notion systems for teams and add AI-assisted content workflows."
          }
        ],
        features: ["AI inside Notion", "Summaries and rewriting", "Docs and meeting notes", "Knowledge-base workflows"],
        pros: ["Very practical for Notion users", "Speeds up documentation", "Fits existing workflows well"],
        cons: ["Not as strong as a standalone AI tool outside Notion", "Requires a paid setup"],
        seoTitle: "Notion AI review",
        seoDescription: "Explore Notion AI for productivity, documentation, and monetization-focused workflows."
      }
    }
  },
  {
    slug: "runway",
    pricing: "PAID",
    websiteUrl: "https://example.com/runway",
    affiliateUrl: "https://example.com/runway",
    primaryCategorySlug: "video",
    categorySlugs: ["ai-tools", "comparisons", "make-money-with-ai"],
    toolCategorySlugs: ["video"],
    useCaseSlugs: ["content", "creators", "business"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        name: "Runway",
        shortDescription: "AI video üretimi, düzenleme ve kısa içerik kurgusu için güçlü bir video aracı.",
        longDescription:
          "Runway; video üretimi, görsel efektler ve hızlı düzenleme akışları için kullanılan AI video araçlarından biridir. İçerik üreticileri ve ajanslar için fikirden videoya giden süreci hızlandırır.",
        bestUseCase: "Video üretimi ve kısa içerik kurgusu",
        whoShouldUse: ["Video üreticileri", "Ajans ekipleri", "Freelancer'lar"],
        moneyUseCases: [
          {
            title: "Kısa video hizmeti sunma",
            description: "Markalar için Reels, Shorts ve reklam klipleri üreterek hizmet satabilirsiniz."
          },
          {
            title: "YouTube içerik üretimi",
            description: "Daha hızlı video akışı kurup kendi kanalınızdan reklam veya sponsor geliri hedefleyebilirsiniz."
          },
          {
            title: "Video düzenleme işi alma",
            description: "Klip temizleme, sahne üretimi ve hızlı teslim isteyen müşteriler için çalışma yapabilirsiniz."
          }
        ],
        features: ["AI video üretimi", "Hızlı kurgu akışı", "Görsel efekt desteği", "Kısa video odaklı kullanım"],
        pros: ["Video üretimini hızlandırır", "Yaratıcı ekipler için güçlüdür", "Kısa form içerikte faydalıdır"],
        cons: ["Ücretli kullanım maliyeti artabilir", "Öğrenme süreci bazı kullanıcılar için zaman alabilir"],
        seoTitle: "Runway incelemesi",
        seoDescription: "Runway ile video üretimi, fiyat modeli ve gelir odaklı kullanım senaryolarını kısaca inceleyin."
      },
      en: {
        name: "Runway",
        shortDescription: "A strong AI video tool for generation, editing, and short-form production workflows.",
        longDescription:
          "Runway helps users create, edit, and speed up video production with AI-assisted workflows. It is useful for creators and agencies that want to move from concept to publishable video faster.",
        bestUseCase: "Video creation and short-form editing",
        whoShouldUse: ["Video creators", "Agency teams", "Freelancers"],
        moneyUseCases: [
          {
            title: "Offer short video services",
            description: "Produce reels, shorts, and ad clips for brands as a paid service."
          },
          {
            title: "Grow a YouTube workflow",
            description: "Create video content faster and pursue ad or sponsor revenue."
          },
          {
            title: "Take on editing work",
            description: "Handle fast-turnaround client editing and clip production projects."
          }
        ],
        features: ["AI video generation", "Fast editing workflow", "Visual effect support", "Short-form content focus"],
        pros: ["Speeds up video production", "Strong for creative teams", "Useful for short-form content"],
        cons: ["Paid usage can become expensive", "The learning curve may take time"],
        seoTitle: "Runway review",
        seoDescription: "A short Runway review covering pricing, video workflows, and monetization use cases."
      }
    }
  },
  {
    slug: "perplexity",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/perplexity",
    affiliateUrl: "https://example.com/perplexity",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "guides", "comparisons"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["research", "students", "business"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        name: "Perplexity",
        shortDescription: "Kaynak odaklı araştırma ve hızlı bilgi toplama için güçlü bir AI arama aracı.",
        longDescription:
          "Perplexity; kaynak göstererek araştırma yapmak, hızlı özet çıkarmak ve karar öncesi bilgi toplamak için kullanılan AI destekli bir arama aracıdır. Özellikle içerik, analiz ve pazar araştırması işlerinde zaman kazandırır.",
        bestUseCase: "Araştırma ve kaynaklı bilgi toplama",
        whoShouldUse: ["Araştırmacılar", "İçerik üreticileri", "Öğrenciler"],
        moneyUseCases: [
          {
            title: "Pazar araştırması yapma",
            description: "Müşteriler için hızlı sektör araştırması hazırlayıp danışmanlık veya içerik hizmeti verebilirsiniz."
          },
          {
            title: "Araştırma destekli yazı üretme",
            description: "Kaynaklı içerik hazırlayarak daha güven veren blog ve raporlar yazabilirsiniz."
          },
          {
            title: "Rakip analizi çıkarma",
            description: "Markalar için rakip, trend ve ürün araştırmalarını daha hızlı hazırlayabilirsiniz."
          }
        ],
        features: ["Kaynak gösteren cevaplar", "Hızlı araştırma akışı", "Özet ve bilgi toplama", "Karar öncesi inceleme desteği"],
        pros: ["Araştırma işlerinde çok pratiktir", "Kaynaklı cevaplar güven verir", "Öğrenme süreci kısadır"],
        cons: ["Yaratıcı üretim için tek başına yeterli olmayabilir", "Derin yazı üretiminde ek araç gerekebilir"],
        seoTitle: "Perplexity incelemesi",
        seoDescription: "Perplexity ile araştırma, kaynaklı içerik ve para kazanma kullanım alanlarını kısaca görün."
      },
      en: {
        name: "Perplexity",
        shortDescription: "A strong AI search tool for source-backed research and fast information gathering.",
        longDescription:
          "Perplexity is used for source-backed research, quick summaries, and faster decision support. It is especially useful for content, analysis, and market research workflows.",
        bestUseCase: "Research and source-backed discovery",
        whoShouldUse: ["Researchers", "Content creators", "Students"],
        moneyUseCases: [
          {
            title: "Do market research",
            description: "Prepare quick industry research for clients as a consulting or content service."
          },
          {
            title: "Write research-backed content",
            description: "Create more credible blog posts and reports with faster source gathering."
          },
          {
            title: "Build competitor analysis",
            description: "Produce faster trend, product, and competitor summaries for brands."
          }
        ],
        features: ["Source-backed answers", "Fast research workflow", "Summaries and information gathering", "Decision support"],
        pros: ["Very practical for research", "Sources increase trust", "Easy to learn"],
        cons: ["Not enough alone for pure creative production", "May need another tool for deeper writing output"],
        seoTitle: "Perplexity review",
        seoDescription: "See how Perplexity helps with research, source-backed content, and monetization workflows."
      }
    }
  },
  {
    slug: "jasper",
    pricing: "PAID",
    websiteUrl: "https://example.com/jasper",
    affiliateUrl: "https://example.com/jasper",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "make-money-with-ai", "guides"],
    toolCategorySlugs: ["writing"],
    useCaseSlugs: ["business", "content", "freelancers"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        name: "Jasper",
        shortDescription: "Pazarlama ekipleri için reklam, satış ve marka odaklı içerik üretimini hızlandıran AI yazı aracı.",
        longDescription:
          "Jasper; pazarlama metinleri, kampanya içerikleri ve marka dili korunan yazı akışları için kullanılan bir AI yazı aracıdır. Özellikle ajanslar ve gelir odaklı içerik ekipleri için verimlidir.",
        bestUseCase: "Pazarlama ve satış odaklı metin üretimi",
        whoShouldUse: ["Pazarlama ekipleri", "Ajanslar", "Freelance copywriter'lar"],
        moneyUseCases: [
          {
            title: "Reklam metni hazırlama",
            description: "Meta, Google ve e-posta kampanyaları için dönüşüm odaklı metinler üretebilirsiniz."
          },
          {
            title: "Landing page yazımı",
            description: "Satış sayfası ve teklif sayfası metinlerini müşteri işi olarak sunabilirsiniz."
          },
          {
            title: "Marka içerik paketi satma",
            description: "Düzenli sosyal medya ve kampanya metni hazırlayıp abonelik modeliyle çalışabilirsiniz."
          }
        ],
        features: ["Pazarlama odaklı içerik akışları", "Marka tonu desteği", "Kısa ve orta format metin", "Kampanya üretimi"],
        pros: ["Pazarlama ekipleri için uygundur", "Satış metinlerinde hızlıdır", "Tekrarlayan copy işlerini kısaltır"],
        cons: ["Ücretli kullanım gerekir", "Genel amaçlı araçlar kadar esnek olmayabilir"],
        seoTitle: "Jasper incelemesi",
        seoDescription: "Jasper ile reklam metni, landing page ve gelir odaklı içerik üretimini kısaca inceleyin."
      },
      en: {
        name: "Jasper",
        shortDescription: "An AI writing tool built to speed up ad, sales, and brand-focused content for marketing teams.",
        longDescription:
          "Jasper is designed for marketing copy, campaign content, and brand-consistent writing. It is especially useful for agencies and revenue-focused content teams.",
        bestUseCase: "Marketing and sales copy creation",
        whoShouldUse: ["Marketing teams", "Agencies", "Freelance copywriters"],
        moneyUseCases: [
          {
            title: "Write ad copy",
            description: "Create Meta, Google, and email campaign copy as a paid service."
          },
          {
            title: "Build landing pages",
            description: "Sell landing page and sales page writing to client businesses."
          },
          {
            title: "Offer brand content packages",
            description: "Deliver ongoing social and campaign copy through a retainer model."
          }
        ],
        features: ["Marketing-first workflows", "Brand voice support", "Short and medium-form copy", "Campaign output"],
        pros: ["Good fit for marketing teams", "Fast for sales copy", "Reduces repetitive copy work"],
        cons: ["Requires paid use", "Less flexible than broader AI assistants"],
        seoTitle: "Jasper review",
        seoDescription: "A short Jasper review covering ad copy, landing pages, and monetization-focused use cases."
      }
    }
  },
  {
    slug: "copy-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/copy-ai",
    affiliateUrl: "https://example.com/copy-ai",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "make-money-with-ai", "guides"],
    toolCategorySlugs: ["writing"],
    useCaseSlugs: ["business", "content", "freelancers"],
    rating: 4.4,
    featured: true,
    locales: {
      tr: {
        name: "Copy.ai",
        shortDescription: "Kısa pazarlama metinleri, satış mesajları ve hızlı içerik üretimi için pratik bir AI aracı.",
        longDescription:
          "Copy.ai; kısa formatlı pazarlama metinleri, e-posta ve satış odaklı içerikler için hız sağlayan bir AI yazı aracıdır. Özellikle hızlı üretim isteyen freelancer'lar ve küçük ekipler için uygundur.",
        bestUseCase: "Kısa pazarlama metni ve satış mesajları",
        whoShouldUse: ["Freelancer'lar", "Küçük ekipler", "Satış odaklı içerik üreticileri"],
        moneyUseCases: [
          {
            title: "E-posta ve satış mesajı yazma",
            description: "Outbound mesajlar, teklif e-postaları ve takip akışlarını hizmet olarak sunabilirsiniz."
          },
          {
            title: "Sosyal medya açıklamaları",
            description: "Kısa açıklama ve post kopyalarını hızlı üreterek aylık içerik paketi satabilirsiniz."
          },
          {
            title: "Ürün açıklaması hazırlama",
            description: "E-ticaret markaları için ürün açıklamaları ve kampanya metinleri üretebilirsiniz."
          }
        ],
        features: ["Kısa format copy üretimi", "Satış odaklı akışlar", "Hızlı şablon tabanlı kullanım", "Pazarlama mesajları"],
        pros: ["Kısa metinlerde hızlıdır", "Başlamak kolaydır", "Freemium giriş sunabilir"],
        cons: ["Uzun içerikte sınırlı kalabilir", "Derin araştırma gerektiren işlerde ek araç ister"],
        seoTitle: "Copy.ai incelemesi",
        seoDescription: "Copy.ai ile kısa pazarlama metinleri, satış mesajları ve müşteri işleri için kullanım alanlarına bakın."
      },
      en: {
        name: "Copy.ai",
        shortDescription: "A practical AI tool for short marketing copy, sales messages, and fast content production.",
        longDescription:
          "Copy.ai helps users move faster on short-form marketing content, email copy, and sales-oriented writing. It fits freelancers and small teams that want quick output.",
        bestUseCase: "Short marketing copy and sales messaging",
        whoShouldUse: ["Freelancers", "Small teams", "Sales-focused creators"],
        moneyUseCases: [
          {
            title: "Write email and sales messages",
            description: "Offer outbound messages, proposal emails, and follow-up sequences as a service."
          },
          {
            title: "Create social captions",
            description: "Build short-form post copy and sell monthly content packages."
          },
          {
            title: "Write product descriptions",
            description: "Create ecommerce product copy and campaign messaging for brands."
          }
        ],
        features: ["Short-form copy generation", "Sales-focused workflows", "Fast template-led use", "Marketing messaging"],
        pros: ["Fast for short copy", "Easy to start with", "Can offer a freemium entry"],
        cons: ["Can feel limited for long-form work", "Needs other tools for deeper research-heavy tasks"],
        seoTitle: "Copy.ai review",
        seoDescription: "See how Copy.ai supports short marketing copy, sales messaging, and client work."
      }
    }
  },
  {
    slug: "canva-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/canva-ai",
    affiliateUrl: "https://example.com/canva-ai",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "make-money-with-ai", "guides"],
    toolCategorySlugs: ["image", "productivity"],
    useCaseSlugs: ["content", "business", "creators"],
    rating: 4.6,
    featured: true,
    locales: {
      tr: {
        name: "Canva AI",
        shortDescription: "Sunum, sosyal medya ve hızlı tasarım işleri için pratik AI destekli görsel üretim aracı.",
        longDescription:
          "Canva AI; sunum, sosyal medya görselleri, kısa videolar ve temel tasarım işleri için hızlı üretim sağlayan görsel araçlardan biridir. Özellikle teknik tasarım bilgisi sınırlı olan kullanıcılar için kolay bir akış sunar.",
        bestUseCase: "Hızlı tasarım ve sosyal medya görselleri",
        whoShouldUse: ["İçerik üreticileri", "Küçük işletmeler", "Freelancer'lar"],
        moneyUseCases: [
          {
            title: "Sosyal medya tasarımı satma",
            description: "Müşteriler için post, story ve sunum görselleri hazırlayarak düzenli gelir elde edebilirsiniz."
          },
          {
            title: "Sunum ve teklif dosyası hazırlama",
            description: "Şirketler ve girişimler için sunum, medya kiti ve teklif dosyası tasarlayabilirsiniz."
          },
          {
            title: "Basit marka paketleri oluşturma",
            description: "Logo seti, sosyal medya şablonu ve görsel kit hizmeti sunabilirsiniz."
          }
        ],
        features: ["Kolay tasarım akışı", "Sosyal medya ve sunum üretimi", "Şablon tabanlı kullanım", "Hızlı görsel düzenleme"],
        pros: ["Öğrenmesi kolaydır", "Hızlı teslim gerektiren işler için uygundur", "Freemium kullanım sunar"],
        cons: ["Çok ileri tasarım ihtiyaçlarında sınırlı kalabilir", "Benzersiz kreatif işler için ek araç gerekebilir"],
        seoTitle: "Canva AI incelemesi",
        seoDescription: "Canva AI ile hızlı tasarım, sosyal medya üretimi ve para kazanma kullanım alanlarını inceleyin."
      },
      en: {
        name: "Canva AI",
        shortDescription: "A practical AI-assisted design tool for presentations, social media, and fast visual work.",
        longDescription:
          "Canva AI helps users create presentations, social graphics, short videos, and simple design assets quickly. It is especially useful for people who want an easier design workflow.",
        bestUseCase: "Fast design and social media visuals",
        whoShouldUse: ["Content creators", "Small businesses", "Freelancers"],
        moneyUseCases: [
          {
            title: "Sell social media design",
            description: "Create posts, stories, and presentation graphics for clients on a recurring basis."
          },
          {
            title: "Build decks and proposal files",
            description: "Design presentations, media kits, and proposal documents for businesses."
          },
          {
            title: "Create simple brand kits",
            description: "Offer logo packs, social templates, and starter brand assets."
          }
        ],
        features: ["Easy design workflow", "Social and presentation output", "Template-based use", "Fast visual editing"],
        pros: ["Easy to learn", "Good for fast delivery work", "Offers freemium access"],
        cons: ["Limited for advanced design needs", "May need other tools for unique creative work"],
        seoTitle: "Canva AI review",
        seoDescription: "Review Canva AI for fast design, social media output, and monetization-friendly workflows."
      }
    }
  },
  {
    slug: "leonardo-ai",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/leonardo-ai",
    affiliateUrl: "https://example.com/leonardo-ai",
    primaryCategorySlug: "image",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["image"],
    useCaseSlugs: ["content", "creators", "business"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        name: "Leonardo AI",
        shortDescription: "Asset üretimi, yaratıcı görseller ve oyun odaklı tasarım işleri için esnek görsel AI aracı.",
        longDescription:
          "Leonardo AI; konsept üretimi, oyun asset'leri ve yaratıcı görseller için kullanılan esnek bir görsel AI aracıdır. Özellikle çok sayıda varyasyon isteyen tasarım ve üretim süreçlerinde faydalıdır.",
        bestUseCase: "Asset üretimi ve yaratıcı görseller",
        whoShouldUse: ["Tasarımcılar", "Oyun geliştiricileri", "Yaratıcı ekipler"],
        moneyUseCases: [
          {
            title: "Oyun ve uygulama asset'leri hazırlama",
            description: "Satılabilir görsel setler veya müşteri için asset paketleri oluşturabilirsiniz."
          },
          {
            title: "Thumbnail ve reklam görseli üretme",
            description: "İçerik üreticileri ve markalar için hızlı görsel hizmeti verebilirsiniz."
          },
          {
            title: "Konsept tasarım hizmeti",
            description: "Proje başlangıcında çoklu görsel yön göstererek müşteri kazanabilirsiniz."
          }
        ],
        features: ["Asset ve konsept üretimi", "Esnek stil denemeleri", "Varyasyon odaklı akış", "Yaratıcı iterasyon"],
        pros: ["Asset üretiminde kullanışlıdır", "Yaratıcı denemeler için esnektir", "Freemium başlangıç sunar"],
        cons: ["Arayüz bazı kullanıcılar için karmaşık gelebilir", "Bazı sonuçlar ek düzenleme gerektirebilir"],
        seoTitle: "Leonardo AI incelemesi",
        seoDescription: "Leonardo AI ile asset üretimi, görsel tasarım ve gelir odaklı kullanım alanlarını kısa şekilde inceleyin."
      },
      en: {
        name: "Leonardo AI",
        shortDescription: "A flexible image AI tool for assets, creative visuals, and game-oriented design work.",
        longDescription:
          "Leonardo AI is useful for concept work, game assets, and creative visual generation. It helps users explore multiple visual directions quickly.",
        bestUseCase: "Asset generation and creative visuals",
        whoShouldUse: ["Designers", "Game developers", "Creative teams"],
        moneyUseCases: [
          {
            title: "Create game and app assets",
            description: "Build sellable asset packs or client-ready visual sets."
          },
          {
            title: "Make thumbnails and ad visuals",
            description: "Offer fast visual production for creators and brands."
          },
          {
            title: "Sell concept design work",
            description: "Win projects by presenting multiple early visual directions."
          }
        ],
        features: ["Asset and concept generation", "Flexible style testing", "Variation-driven workflow", "Creative iteration"],
        pros: ["Useful for asset work", "Flexible for experimentation", "Offers a freemium start"],
        cons: ["UI can feel complex for some users", "Some outputs still need editing"],
        seoTitle: "Leonardo AI review",
        seoDescription: "A short Leonardo AI review covering assets, visual design, and monetization use cases."
      }
    }
  },
  {
    slug: "elevenlabs",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/elevenlabs",
    affiliateUrl: "https://example.com/elevenlabs",
    primaryCategorySlug: "video",
    categorySlugs: ["ai-tools", "guides", "make-money-with-ai"],
    toolCategorySlugs: ["video", "productivity"],
    useCaseSlugs: ["content", "creators", "freelancers"],
    rating: 4.8,
    featured: true,
    locales: {
      tr: {
        name: "ElevenLabs",
        shortDescription: "Gerçekçi ses üretimi ve voiceover işleri için öne çıkan AI ses aracıdır.",
        longDescription:
          "ElevenLabs; gerçekçi AI ses üretimi, anlatım sesleri ve hızlı voiceover akışları için kullanılan güçlü bir araçtır. Video üreticileri, eğitim içerik ekipleri ve ses odaklı freelancer'lar için pratiktir.",
        bestUseCase: "Voiceover ve ses üretimi",
        whoShouldUse: ["Video üreticileri", "Eğitim içerik ekipleri", "Freelancer'lar"],
        moneyUseCases: [
          {
            title: "Voiceover hizmeti sunma",
            description: "Tanıtım, eğitim ve sosyal medya videoları için seslendirme hizmeti verebilirsiniz."
          },
          {
            title: "YouTube anlatım kanalı kurma",
            description: "Kendi anlatım içeriklerinizi daha hızlı üretip reklam geliri hedefleyebilirsiniz."
          },
          {
            title: "Kurumsal eğitim sesleri hazırlama",
            description: "Şirketler için demo, onboarding ve eğitim seslendirmeleri hazırlayabilirsiniz."
          }
        ],
        features: ["Gerçekçi ses üretimi", "Hızlı voiceover akışı", "Çok dilli kullanım potansiyeli", "Video odaklı üretim"],
        pros: ["Ses kalitesi güçlüdür", "Video iş akışlarına kolay girer", "Freemium başlangıç sunar"],
        cons: ["Yoğun kullanımda maliyet artabilir", "Bazı projelerde manuel düzenleme gerekebilir"],
        seoTitle: "ElevenLabs incelemesi",
        seoDescription: "ElevenLabs ile ses üretimi, voiceover ve gelir odaklı kullanım alanlarını kısa biçimde görün."
      },
      en: {
        name: "ElevenLabs",
        shortDescription: "A leading AI voice tool for realistic speech generation and voiceover workflows.",
        longDescription:
          "ElevenLabs is a strong AI tool for realistic voice generation, narration, and fast voiceover production. It works well for video creators, education teams, and audio-focused freelancers.",
        bestUseCase: "Voiceovers and voice generation",
        whoShouldUse: ["Video creators", "Education teams", "Freelancers"],
        moneyUseCases: [
          {
            title: "Offer voiceover services",
            description: "Create narration for promos, lessons, and social media videos."
          },
          {
            title: "Build a narrated YouTube channel",
            description: "Produce audio-led content faster and pursue ad revenue."
          },
          {
            title: "Create business training audio",
            description: "Produce demo, onboarding, and training narration for companies."
          }
        ],
        features: ["Realistic voice generation", "Fast voiceover workflow", "Multilingual potential", "Video-friendly production"],
        pros: ["Strong voice quality", "Easy to use in video workflows", "Offers a freemium start"],
        cons: ["Costs can rise with heavier usage", "Some projects still need manual editing"],
        seoTitle: "ElevenLabs review",
        seoDescription: "See ElevenLabs for AI voice generation, voiceovers, and monetization-focused use cases."
      }
    }
  },
  {
    slug: "writesonic",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/writesonic",
    affiliateUrl: "https://example.com/writesonic",
    primaryCategorySlug: "writing",
    categorySlugs: ["ai-tools", "make-money-with-ai", "guides", "free-tools"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["content", "business", "freelancers"],
    rating: 4.5,
    featured: true,
    locales: {
      tr: {
        name: "Writesonic",
        shortDescription: "Blog, reklam ve satış odaklı içeriklerde hız kazandıran AI yazı aracı.",
        longDescription:
          "Writesonic; blog taslakları, reklam metinleri ve satış sayfası içerikleri gibi gelir odaklı yazı akışlarında hız sağlayan bir AI aracıdır.",
        bestUseCase: "Blog ve pazarlama metni üretimi",
        whoShouldUse: ["Freelancer'lar", "Pazarlama ekipleri", "İçerik üreticileri"],
        moneyUseCases: [
          {
            title: "Blog paketleri hazırlama",
            description: "Müşterilere hızlı blog içerik paketleri sunabilirsiniz."
          },
          {
            title: "Reklam kopyası yazma",
            description: "Kampanya ve reklam metinlerini hizmet olarak hazırlayabilirsiniz."
          },
          {
            title: "Landing page içerikleri",
            description: "Satış sayfası metinlerini daha hızlı üretip ücretli iş haline getirebilirsiniz."
          }
        ],
        features: ["Blog ve reklam metni üretimi", "Pazarlama akışları", "Şablon destekli kullanım"],
        pros: ["Pazarlama için pratiktir", "İçerik süresini kısaltır", "Freemium giriş sunar"],
        cons: ["Uzun formatta ek düzenleme ister", "Genel amaçlı araçlar kadar geniş değildir"],
        seoTitle: "Writesonic incelemesi",
        seoDescription: "Writesonic ile blog, reklam ve satış odaklı içerik üretimini kısa biçimde inceleyin."
      },
      en: {
        name: "Writesonic",
        shortDescription: "An AI writing tool that speeds up blog, ad, and conversion-focused content.",
        longDescription:
          "Writesonic helps users move faster on blog drafts, ad copy, and sales-page content built for revenue-focused workflows.",
        bestUseCase: "Blog and marketing copy creation",
        whoShouldUse: ["Freelancers", "Marketing teams", "Content creators"],
        moneyUseCases: [
          {
            title: "Create blog packages",
            description: "Deliver faster blog content packages to clients."
          },
          {
            title: "Write ad copy",
            description: "Produce campaign copy as a paid marketing service."
          },
          {
            title: "Draft landing page content",
            description: "Turn faster sales-page writing into billable work."
          }
        ],
        features: ["Blog and ad copy generation", "Marketing workflows", "Template-guided use"],
        pros: ["Practical for marketing work", "Speeds up delivery", "Offers freemium access"],
        cons: ["Needs editing in long-form work", "Not as broad as general AI assistants"],
        seoTitle: "Writesonic review",
        seoDescription: "Read a short Writesonic review focused on blog, ad, and sales-copy workflows."
      }
    }
  },
  {
    slug: "pictory",
    pricing: "PAID",
    websiteUrl: "https://example.com/pictory",
    affiliateUrl: "https://example.com/pictory",
    primaryCategorySlug: "video",
    categorySlugs: ["ai-tools", "make-money-with-ai", "guides"],
    toolCategorySlugs: ["video"],
    useCaseSlugs: ["content", "creators", "business"],
    rating: 4.4,
    featured: true,
    locales: {
      tr: {
        name: "Pictory",
        shortDescription: "Metinden videoya ve kısa içerik dönüştürme için pratik bir AI video aracı.",
        longDescription:
          "Pictory; yazıları, özetleri ve içerik fikirlerini kısa videolara dönüştürmek için kullanılan pratik bir AI video aracıdır. Özellikle içerik tekrar kullanımı yapmak isteyen ekipler için uygundur.",
        bestUseCase: "Metinden videoya hızlı üretim",
        whoShouldUse: ["İçerik üreticileri", "Ajans ekipleri", "Küçük işletmeler"],
        moneyUseCases: [
          {
            title: "Blogdan videoya içerik dönüştürme",
            description: "Mevcut yazıları kısa videolara dönüştürerek yeni dağıtım kanalları açabilirsiniz."
          },
          {
            title: "Kısa video paketi satma",
            description: "Müşterilere sosyal medya için kısa video üretim hizmeti sunabilirsiniz."
          },
          {
            title: "Tanıtım videosu hazırlama",
            description: "Ürün ve hizmetler için hızlı tanıtım videoları hazırlayabilirsiniz."
          }
        ],
        features: ["Metinden videoya dönüşüm", "Kısa video akışı", "İçerik tekrar kullanımı", "Hızlı üretim"],
        pros: ["Video üretimini hızlandırır", "Mevcut içeriği değerlendirmeyi kolaylaştırır", "Ajans işlerine uygundur"],
        cons: ["Ücretli kullanım gerektirir", "Özgün kurgu ihtiyacında sınırlı kalabilir"],
        seoTitle: "Pictory incelemesi",
        seoDescription: "Pictory ile metinden videoya üretim ve para kazanma kullanım alanlarını inceleyin."
      },
      en: {
        name: "Pictory",
        shortDescription: "A practical AI video tool for text-to-video workflows and short content repurposing.",
        longDescription:
          "Pictory helps users turn articles, summaries, and ideas into short videos quickly. It is useful for teams that want to repurpose existing content into video.",
        bestUseCase: "Fast text-to-video production",
        whoShouldUse: ["Content creators", "Agency teams", "Small businesses"],
        moneyUseCases: [
          {
            title: "Turn blogs into videos",
            description: "Repurpose written content into short videos and reach more channels."
          },
          {
            title: "Sell short-form video packages",
            description: "Offer simple social video production to clients."
          },
          {
            title: "Create promo videos",
            description: "Build fast product and service promo videos for paid work."
          }
        ],
        features: ["Text-to-video conversion", "Short-form video workflow", "Content repurposing", "Fast production"],
        pros: ["Speeds up video production", "Makes reuse of existing content easier", "Useful for agency work"],
        cons: ["Requires a paid plan", "Can feel limited for custom editing"],
        seoTitle: "Pictory review",
        seoDescription: "Review Pictory for text-to-video creation and monetization-friendly video workflows."
      }
    }
  }
];
