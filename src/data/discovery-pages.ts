import type { GuideCard } from "@/types/home";
import type { SupportedLocale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";

type DiscoveryLocale = {
  eyebrow: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  summaryTitle: string;
  summaryDescription: string;
  audienceTitle: string;
  audienceBullets: string[];
  chooseTitle: string;
  chooseBullets: string[];
  useCasesTitle: string;
  useCases: string[];
  finalTitle: string;
  finalDescription: string;
};

export type DiscoveryPageEntry = {
  slug: string;
  icon: string;
  tag: string;
  readTime: string;
  toolSlugs: string[];
  locales: Record<"tr" | "en", DiscoveryLocale>;
};

export const discoveryPages: DiscoveryPageEntry[] = [
  {
    slug: "best-ai-tools-for-making-money",
    icon: "MG",
    tag: "Monetization",
    readTime: "6 min",
    toolSlugs: ["chatgpt", "claude", "midjourney", "canva-ai", "jasper", "elevenlabs"],
    locales: {
      tr: {
        eyebrow: "Gelir odaklı",
        title: "Para kazanmak için uygun AI araçlarını karşılaştır",
        description: "Yazı, görsel, ses ve dijital ürün akışlarında hangi araçların daha mantıklı olduğunu senaryoya göre gör.",
        seoTitle: "Para kazanmak için AI araçları | Deciply",
        seoDescription: "İçerik, freelance hizmet, görsel teslim ve dijital ürün akışlarında kullanılabilecek AI araçlarını karşılaştırın.",
        summaryTitle: "Bu sayfa ne işe yarar?",
        summaryDescription: "Her araç her gelir modeli için uygun değil. Bu sayfa, gelir odaklı işlerde daha anlamlı seçenekleri bir araya getirir.",
        audienceTitle: "Kimler için uygun?",
        audienceBullets: ["Freelancer'lar", "İçerik üreticileri", "Hizmet veya dijital ürün satanlar"],
        chooseTitle: "Nasıl seçim yapılmalı?",
        chooseBullets: ["Metin ve araştırmada ChatGPT, Claude ve Perplexity güçlü olabilir.", "Görsel işlerde Midjourney, Canva AI ve Leonardo AI daha uygun olabilir.", "Ses veya video akışlarında ElevenLabs, Runway ve Pictory öne çıkabilir."],
        useCasesTitle: "Gerçek kullanım senaryoları",
        useCases: ["Affiliate ve reklam odaklı içerik üretimi", "Müşterilere sosyal medya veya landing page paketi sunmak", "YouTube ve dijital ürün üretim maliyetini düşürmek"],
        finalTitle: "Senaryona en yakın aracı aç ve detayları karşılaştır",
        finalDescription: "Önce iş modeline en yakın aracı seç, sonra fiyat, artılar ve alternatifler üzerinden kararını netleştir."
      },
      en: {
        eyebrow: "Revenue focused",
        title: "Compare AI tools that fit monetization workflows",
        description: "See which tools make more sense for writing, visuals, voice, and digital-product work based on real scenarios.",
        seoTitle: "Best AI tools for making money | Deciply",
        seoDescription: "Compare AI tools for content, freelance services, visual delivery, and digital product workflows.",
        summaryTitle: "What does this page do?",
        summaryDescription: "Not every tool fits every revenue model. This page groups the tools that make more sense for monetization-heavy work.",
        audienceTitle: "Who is it for?",
        audienceBullets: ["Freelancers", "Creators", "Users selling services or digital products"],
        chooseTitle: "How should you choose?",
        chooseBullets: ["For text and research, ChatGPT, Claude, and Perplexity can be strong options.", "For visual delivery, Midjourney, Canva AI, and Leonardo AI may fit better.", "For voice or video workflows, ElevenLabs, Runway, and Pictory can be more useful."],
        useCasesTitle: "Realistic use cases",
        useCases: ["Publishing content for affiliate and ad-supported sites", "Selling client packages for social, landing pages, or visuals", "Reducing production time for YouTube and digital products"],
        finalTitle: "Open the tools that match your workflow",
        finalDescription: "Start with the workflow that looks closest to your business model, then compare pricing, trade-offs, and alternatives."
      }
    }
  },
  {
    slug: "best-ai-tools-for-students",
    icon: "ST",
    tag: "Students",
    readTime: "5 min",
    toolSlugs: ["chatgpt", "gemini", "notion-ai", "perplexity"],
    locales: {
      tr: {
        eyebrow: "Öğrenci akışı",
        title: "Öğrenciler için düşük sürtünmeli AI araçları",
        description: "Araştırma, özetleme, not düzenleme ve sunum hazırlama için mantıklı seçenekleri hızlıca gör.",
        seoTitle: "Öğrenciler için AI araçları | Deciply",
        seoDescription: "Araştırma, not alma, özetleme ve üretkenlik işlerinde kullanılabilecek AI araçlarını karşılaştırın.",
        summaryTitle: "Neden önemli?",
        summaryDescription: "Öğrenciler için asıl ihtiyaç her özelliği almak değil; düşük maliyetle hızlı öğrenme akışı kurmaktır.",
        audienceTitle: "Kimler için uygun?",
        audienceBullets: ["Araştırma yapan öğrenciler", "Not düzenlemek isteyenler", "İlk kez AI deneyenler"],
        chooseTitle: "Neye göre seçilmeli?",
        chooseBullets: ["Araştırma ve kaynak keşfinde Perplexity ve Gemini rahat olabilir.", "Not ve proje organizasyonunda Notion AI daha mantıklı olabilir.", "Genel yazı ve özet akışlarında ChatGPT daha esnek olabilir."],
        useCasesTitle: "Kullanım örnekleri",
        useCases: ["Ders konularını sadeleştirmek", "Sunum veya essay taslağı başlatmak", "Araştırma süresini kısaltmak"],
        finalTitle: "İhtiyacına göre aracı aç ve kısa sürede dene",
        finalDescription: "Araştırma, not veya yazı odaklı seçim yapmak, tek bir 'en iyi' araç aramaktan daha yararlıdır."
      },
      en: {
        eyebrow: "Student workflows",
        title: "Low-friction AI tools for students",
        description: "Compare useful options for research, summarization, note organization, and presentations.",
        seoTitle: "Best AI tools for students | Deciply",
        seoDescription: "Compare AI tools for research, notes, summarization, and productivity workflows that fit students.",
        summaryTitle: "Why does it matter?",
        summaryDescription: "Students usually need lower cost and faster learning flow more than a long feature list.",
        audienceTitle: "Who is it for?",
        audienceBullets: ["Students doing research", "Users organizing notes", "People trying AI for the first time"],
        chooseTitle: "What should you compare?",
        chooseBullets: ["For search and source discovery, Perplexity and Gemini can be strong starts.", "For notes and project organization, Notion AI may fit better.", "For general writing and summaries, ChatGPT can be more flexible."],
        useCasesTitle: "Use cases",
        useCases: ["Simplifying class topics", "Starting essays and presentations faster", "Reducing research time"],
        finalTitle: "Open the tool that matches your study workflow",
        finalDescription: "Choosing by research, note-taking, or writing style is usually more helpful than searching for one universal winner."
      }
    }
  },
  {
    slug: "best-ai-tools-for-content-creation",
    icon: "CT",
    tag: "Content",
    readTime: "6 min",
    toolSlugs: ["chatgpt", "claude", "jasper", "copy-ai", "canva-ai", "midjourney"],
    locales: {
      tr: {
        eyebrow: "İçerik üretimi",
        title: "İçerik üretimi için doğru AI araç kombinasyonunu bul",
        description: "Blog, sosyal medya, görsel ve kreatif teslim akışlarında farklı araçların güçlü olduğu alanları yan yana gör.",
        seoTitle: "İçerik üretimi için AI araçları | Deciply",
        seoDescription: "Yazı, sosyal medya, tasarım ve kreatif üretim akışlarında öne çıkan AI araçlarını karşılaştırın.",
        summaryTitle: "Bu sayfa ne sağlar?",
        summaryDescription: "İçerik üretimi tek araçlık bir problem değildir. Metin, fikir ve görsel tarafında farklı araçlar daha mantıklı olabilir.",
        audienceTitle: "Kimler için?",
        audienceBullets: ["İçerik ekipleri", "Sosyal medya freelancer'ları", "Metin ve görseli birlikte üretenler"],
        chooseTitle: "Karar verirken bakılacak noktalar",
        chooseBullets: ["Uzun açıklayıcı metinlerde Claude daha sakin olabilir.", "Kısa pazarlama metninde Jasper veya Copy.ai daha uygun olabilir.", "Görsel teslimde Canva AI ve Midjourney daha güçlü olabilir."],
        useCasesTitle: "Gerçek kullanım alanları",
        useCases: ["Blog ve newsletter paketleri", "Sosyal medya takvimi ve kreatif üretimi", "Kampanya metni ve görsel akışını hızlandırmak"],
        finalTitle: "Metin ve görsel ihtiyacına göre aracı seç",
        finalDescription: "En iyi sonuç çoğu zaman tek araçtan değil, doğru araç kombinasyonundan gelir."
      },
      en: {
        eyebrow: "Content workflows",
        title: "Find the right AI stack for content creation",
        description: "Compare where different tools fit best across blogging, social content, visuals, and creative delivery.",
        seoTitle: "Best AI tools for content creation | Deciply",
        seoDescription: "Review AI tools for writing, social media, design support, and creative output based on real workflows.",
        summaryTitle: "What does this page help with?",
        summaryDescription: "Content creation is rarely solved by a single tool. Writing, ideation, and visual output often need different strengths.",
        audienceTitle: "Who is it for?",
        audienceBullets: ["Creators", "Small teams", "Freelancers combining writing and visual work"],
        chooseTitle: "What should you compare first?",
        chooseBullets: ["For long-form writing, Claude can feel calmer and more organized.", "For campaign copy, Jasper or Copy.ai may be a better fit.", "For visual delivery, Canva AI and Midjourney are often stronger options."],
        useCasesTitle: "Use cases",
        useCases: ["Producing blog and newsletter packages", "Building social calendars and creative assets", "Speeding up campaign concepts and short-form content"],
        finalTitle: "Choose by output type, not hype",
        finalDescription: "For content teams, better results usually come from matching each task to the right tool."
      }
    }
  },
  {
    slug: "best-free-ai-tools",
    icon: "FR",
    tag: "Free",
    readTime: "5 min",
    toolSlugs: ["chatgpt", "gemini", "notion-ai", "perplexity", "canva-ai"],
    locales: {
      tr: {
        eyebrow: "Ücretsiz başlangıç",
        title: "Ücretsiz başlayabileceğin AI araçlarını karşılaştır",
        description: "Ücretsiz veya freemium araçları, ilk kullanım sürtünmesi ve gerçek senaryo uyumu açısından bir araya getir.",
        seoTitle: "En iyi ücretsiz AI araçları | Deciply",
        seoDescription: "Ücretsiz veya freemium başlangıç sunan AI araçlarını gerçek kullanım senaryolarına göre karşılaştırın.",
        summaryTitle: "Bu sayfa neye odaklanır?",
        summaryDescription: "Asıl soru sadece ücretsiz olup olmaması değil; hangi iş için gerçekten yeterli olduğudur.",
        audienceTitle: "Kimler için uygun?",
        audienceBullets: ["İlk kez AI deneyecekler", "Bütçe ayırmadan test etmek isteyenler", "Önce ücretsiz katmanı görmek isteyenler"],
        chooseTitle: "Nasıl düşünmeli?",
        chooseBullets: ["Araştırma ve hızlı cevap için Gemini veya Perplexity rahat olabilir.", "Genel amaçlı yazı ve fikir üretiminde ChatGPT daha geniş kullanım sunabilir.", "Sunum ve görsel işlerde Canva AI daha doğal bir giriş olabilir."],
        useCasesTitle: "Kullanım örnekleri",
        useCases: ["İlk AI iş akışını bütçe olmadan test etmek", "Araştırma veya içerik taslağında hızlı başlangıç", "Görsel ve sunum işlerinde ücretsiz seviyede verim almak"],
        finalTitle: "Önce ücretsiz katmanı test et",
        finalDescription: "Ücretsiz araçlar her işi çözmez ama doğru senaryoda çok hızlı başlangıç sağlayabilir."
      },
      en: {
        eyebrow: "Free start",
        title: "Compare AI tools you can start using for free",
        description: "Review free and freemium tools based on real workflow fit instead of feature lists.",
        seoTitle: "Best free AI tools | Deciply",
        seoDescription: "Compare free and freemium AI tools based on real use cases, not just feature claims.",
        summaryTitle: "What is this page about?",
        summaryDescription: "The real question is not only whether a tool is free, but whether it is useful enough for the workflow you care about.",
        audienceTitle: "Who is it useful for?",
        audienceBullets: ["First-time users", "People testing workflows before spending", "Teams comparing free tiers"],
        chooseTitle: "How should you think about free tools?",
        chooseBullets: ["For research and fast answers, Gemini or Perplexity can feel easier to start with.", "For general writing and ideation, ChatGPT can offer wider coverage.", "For visual and presentation work, Canva AI may be the more natural starting point."],
        useCasesTitle: "Use-case examples",
        useCases: ["Testing workflows without budget pressure", "Starting research and drafts faster", "Getting value from free visual and presentation tools"],
        finalTitle: "Use the free tier as a decision tool",
        finalDescription: "A free plan will not solve everything, but it can quickly show whether a tool matches your workflow."
      }
    }
  },
  {
    slug: "best-ai-tools-for-beginners",
    icon: "BG",
    tag: "Beginner",
    readTime: "5 min",
    toolSlugs: ["chatgpt", "gemini", "canva-ai", "notion-ai"],
    locales: {
      tr: {
        eyebrow: "Yeni başlayanlar",
        title: "İlk kez AI kullananlar için daha anlaşılır araçlar",
        description: "Düşük sürtünmeli başlangıç ve hızlı ilk sonuç isteyen kullanıcılar için mantıklı AI araçlarını topla.",
        seoTitle: "Yeni başlayanlar için AI araçları | Deciply",
        seoDescription: "İlk kez AI kullananlar için düşük bariyerli ve hızlı sonuç veren AI araçlarını inceleyin.",
        summaryTitle: "Neden bu sayfa var?",
        summaryDescription: "Yeni başlayanlar için en kritik nokta özellik zenginliği değil; neyin ne işe yaradığını hızlı anlamaktır.",
        audienceTitle: "Kimler için uygun?",
        audienceBullets: ["AI araçlarını ilk kez deneyenler", "Karmaşık kurulum istemeyenler", "Hızlıca ilk sonuç görmek isteyenler"],
        chooseTitle: "Hangi durumda hangisi mantıklı?",
        chooseBullets: ["Genel amaçlı kullanım için ChatGPT esnek bir başlangıç sunar.", "Google ekosistemine yakınsan Gemini daha doğal hissedilebilir.", "Sunum ve görsel tarafında Canva AI daha kolay bir giriş sağlayabilir."],
        useCasesTitle: "İlk kullanım senaryoları",
        useCases: ["Basit içerik taslağı veya fikir üretimi", "Günlük araştırma ve soru-cevap akışı", "Sunum, görsel veya not düzeni gibi küçük işler"],
        finalTitle: "İlk hedefini belirle, sonra aracı dene",
        finalDescription: "Doğru seçim, tüm özellikleri olan araç değil; ilk hedefe en az sürtünmeyle götüren araçtır."
      },
      en: {
        eyebrow: "Beginner friendly",
        title: "Clearer AI tools for first-time users",
        description: "See beginner-friendly tools that offer lower friction and faster first results.",
        seoTitle: "Best AI tools for beginners | Deciply",
        seoDescription: "Review beginner-friendly AI tools with simpler onboarding and faster first wins.",
        summaryTitle: "Why does this page exist?",
        summaryDescription: "Beginners usually need to understand the tool quickly and get useful output without much setup.",
        audienceTitle: "Who is it for?",
        audienceBullets: ["First-time AI users", "People who want low-friction onboarding", "Users trying to get useful output quickly"],
        chooseTitle: "Which tool fits which start?",
        chooseBullets: ["For flexible general use, ChatGPT remains an easy starting point.", "If you already use Google products, Gemini may feel more natural.", "For visuals and presentations, Canva AI can be easier to adopt."],
        useCasesTitle: "Early use cases",
        useCases: ["Simple writing drafts and ideas", "Everyday research and Q&A", "Small tasks such as visuals, presentations, and note organization"],
        finalTitle: "Start with the task, not the hype",
        finalDescription: "For beginners, the best choice is usually the tool that gets the first job done with the least friction."
      }
    }
  },
  {
    slug: "ai-tools-for-freelancers",
    icon: "FL",
    tag: "Freelance",
    readTime: "6 min",
    toolSlugs: ["chatgpt", "claude", "canva-ai", "midjourney", "elevenlabs"],
    locales: {
      tr: {
        eyebrow: "Freelance iş akışı",
        title: "Freelancer'lar için zaman kazandıran AI araçları",
        description: "Müşteri teslimi, içerik paketleri, görsel üretim ve ses/video akışlarında işi hızlandırabilecek araçları karşılaştır.",
        seoTitle: "Freelancer'lar için AI araçları | Deciply",
        seoDescription: "Freelance yazı, görsel, sunum, ses ve müşteri teslim süreçlerinde kullanılabilecek AI araçlarını inceleyin.",
        summaryTitle: "Bu sayfa neye odaklanır?",
        summaryDescription: "Freelance kullanıcılar için kritik konu daha kısa sürede teslim üretmek ama kalite algısını düşürmemektir.",
        audienceTitle: "Kimler için mantıklı?",
        audienceBullets: ["Metin, görsel veya sunum paketi satan freelancer'lar", "Tek başına daha fazla teslim yapmak isteyenler", "Araştırma ve üretim süresini kısaltmak isteyen servis sağlayıcılar"],
        chooseTitle: "Nasıl seçim yapılmalı?",
        chooseBullets: ["Metin ve araştırma teslimlerinde ChatGPT ve Claude daha mantıklı olabilir.", "Tasarım ve sosyal medya teslimlerinde Canva AI ve Midjourney öne çıkabilir.", "Sesli içerik veya YouTube tesliminde ElevenLabs daha uygun olabilir."],
        useCasesTitle: "Gerçek freelance senaryoları",
        useCases: ["Landing page, blog veya e-posta paketi hazırlamak", "Sosyal medya kreatifi ve sunum seti teslim etmek", "Seslendirme, script ve YouTube üretimini hızlandırmak"],
        finalTitle: "Teslim tipine göre aracı seç",
        finalDescription: "Doğru araç seçimi, daha fazla teslim yaparken marjı korumayı kolaylaştırır."
      },
      en: {
        eyebrow: "Freelance workflows",
        title: "AI tools that can save freelancers real time",
        description: "Compare tools that can reduce delivery time across content, visual output, presentations, and voice/video work.",
        seoTitle: "AI tools for freelancers | Deciply",
        seoDescription: "Explore AI tools for freelance writing, visuals, presentations, voice, and client delivery workflows.",
        summaryTitle: "What does this page focus on?",
        summaryDescription: "For freelancers, the main question is how to deliver faster without making the end result feel cheap or generic.",
        audienceTitle: "Who is it for?",
        audienceBullets: ["Freelancers selling writing, visuals, or presentation packages", "Solo operators who want more output", "Service providers reducing research and production time"],
        chooseTitle: "How should you choose?",
        chooseBullets: ["If client work is text-heavy, ChatGPT and Claude may be stronger starting points.", "For design and social delivery, Canva AI and Midjourney can be more useful.", "For voice or YouTube production, ElevenLabs can make more sense."],
        useCasesTitle: "Real freelance scenarios",
        useCases: ["Producing landing page, blog, or email packages", "Delivering social creative and presentation assets", "Speeding up scripts, voice work, and YouTube production"],
        finalTitle: "Match the tool to the deliverable",
        finalDescription: "The right tool is usually the one that improves delivery speed without lowering perceived quality."
      }
    }
  },
  {
    slug: "ai-tools-for-youtube",
    icon: "YT",
    tag: "YouTube",
    readTime: "5 min",
    toolSlugs: ["chatgpt", "elevenlabs", "canva-ai", "runway", "pictory"],
    locales: {
      tr: {
        eyebrow: "YouTube üretimi",
        title: "YouTube iş akışı için mantıklı AI araçları",
        description: "Script, seslendirme, thumbnail ve hızlı video üretim akışlarında hangi araçların daha uygun olduğunu karşılaştır.",
        seoTitle: "YouTube için AI araçları | Deciply",
        seoDescription: "Script, seslendirme, thumbnail ve video üretimi için kullanılabilecek AI araçlarını karşılaştırın.",
        summaryTitle: "Bu sayfa neye yardım eder?",
        summaryDescription: "YouTube üretimi tek bir araçla çözülmez. Metin, ses ve video için farklı araçlar daha mantıklı olabilir.",
        audienceTitle: "Kimler için yararlı?",
        audienceBullets: ["Kanalını hızlandırmak isteyen üreticiler", "Faceless format deneyenler", "Script, ses ve görseli parçalara bölenler"],
        chooseTitle: "Neye göre karar verilmeli?",
        chooseBullets: ["Script ve fikir üretiminde ChatGPT esnek olabilir.", "Seslendirme tarafında ElevenLabs daha güçlü olabilir.", "Hızlı video akışında Runway veya Pictory daha mantıklı olabilir."],
        useCasesTitle: "Kullanım alanları",
        useCases: ["Video script ve bölüm akışı hazırlamak", "Voice-over ve çoklu ses üretmek", "Thumbnail ve hızlı video varyasyonu hazırlamak"],
        finalTitle: "İş akışını parçalara ayır ve aracı seç",
        finalDescription: "En iyi sonuç genelde script, ses ve video için doğru kombinasyondan gelir."
      },
      en: {
        eyebrow: "YouTube workflows",
        title: "Useful AI tools for YouTube creation",
        description: "Compare tools for scripts, voice-over, thumbnails, and fast video production.",
        seoTitle: "AI tools for YouTube | Deciply",
        seoDescription: "Compare AI tools for YouTube scripts, voice-over, thumbnails, and fast video workflows.",
        summaryTitle: "What does this page help with?",
        summaryDescription: "YouTube production usually needs more than one tool. Writing, voice, and editing often fit different platforms better.",
        audienceTitle: "Who is it useful for?",
        audienceBullets: ["Creators speeding up channel output", "Users testing faceless formats", "People splitting script, voice, and visuals"],
        chooseTitle: "How should you decide?",
        chooseBullets: ["For script ideation, ChatGPT is often a practical starting point.", "For voice-over, ElevenLabs is usually the stronger fit.", "For fast editing, Runway and Pictory may be more useful."],
        useCasesTitle: "Workflow examples",
        useCases: ["Writing scripts and structuring episodes", "Generating voice-over with multiple options", "Producing thumbnails and fast video variations"],
        finalTitle: "Break the workflow into parts",
        finalDescription: "Better results usually come from choosing the right tool for script, voice, and editing rather than forcing one tool to do everything."
      }
    }
  },
  {
    slug: "ai-tools-for-business",
    icon: "BZ",
    tag: "Business",
    readTime: "6 min",
    toolSlugs: ["chatgpt", "claude", "gemini", "notion-ai", "perplexity", "jasper"],
    locales: {
      tr: {
        eyebrow: "İş süreçleri",
        title: "İş akışları için daha düzenli AI araçları",
        description: "Araştırma, özetleme, ekip içi üretkenlik, içerik ve dokümantasyon akışlarında kullanılabilecek AI araçlarını kıyasla.",
        seoTitle: "İşletmeler için AI araçları | Deciply",
        seoDescription: "İş araştırması, ekip içi üretkenlik, içerik ve dokümantasyon süreçlerinde kullanılabilecek AI araçlarını karşılaştırın.",
        summaryTitle: "Bu sayfa neden önemli?",
        summaryDescription: "İş tarafında araç seçimi sadece güçlü model aramak değildir. Uyum ve ekip kullanımı daha belirleyici olur.",
        audienceTitle: "Kimler için mantıklı?",
        audienceBullets: ["Operasyon ve içerik ekipleri", "Düzenli dokümantasyon kurmak isteyenler", "Google veya Notion ile uyum arayan ekipler"],
        chooseTitle: "Nasıl seçim yapılmalı?",
        chooseBullets: ["Geniş genel kullanım için ChatGPT veya Claude iyi başlangıç olabilir.", "Google odaklı ekiplerde Gemini daha düşük sürtünmeli olabilir.", "Dokümantasyon ve iç bilgi akışında Notion AI daha doğal olabilir."],
        useCasesTitle: "Gerçek iş senaryoları",
        useCases: ["Toplantı notlarını özetlemek ve aksiyon listesi çıkarmak", "Araştırma ve iç rapor hazırlama süresini kısaltmak", "İçerik ve dokümantasyon akışlarında tekrar eden işleri hızlandırmak"],
        finalTitle: "Ekip akışına en yakın aracı aç",
        finalDescription: "Doğru seçim, tek başına etkileyici görünen araçtan çok ekibe en az sürtünmeyle oturan araçtır."
      },
      en: {
        eyebrow: "Business workflows",
        title: "More structured AI tools for business teams",
        description: "Compare tools for research, summarization, documentation, team productivity, and repeatable content workflows.",
        seoTitle: "AI tools for business | Deciply",
        seoDescription: "Compare AI tools for business research, team productivity, documentation, and repeatable content workflows.",
        summaryTitle: "Why does this page matter?",
        summaryDescription: "In business settings, the right tool is not only about model strength. Workflow fit and team adoption matter more.",
        audienceTitle: "Who is it for?",
        audienceBullets: ["Operations and content teams", "Teams building recurring note flows", "Users seeking better fit with Google or Notion"],
        chooseTitle: "How should teams choose?",
        chooseBullets: ["For broad general use, ChatGPT and Claude are practical starts.", "For Google-heavy teams, Gemini can feel lower friction.", "For documentation and internal knowledge, Notion AI can make more sense."],
        useCasesTitle: "Business use cases",
        useCases: ["Summarizing meetings and turning them into action lists", "Reducing time spent on research and internal reporting", "Speeding up repeated content and documentation workflows"],
        finalTitle: "Choose by workflow fit",
        finalDescription: "The stronger long-term option is usually the one that fits the team’s existing process with less friction."
      }
    }
  }
];

const homepageGuideSlugs = [
  "best-ai-tools-for-making-money",
  "best-ai-tools-for-beginners",
  "best-free-ai-tools",
  "best-ai-tools-for-content-creation",
  "ai-tools-for-freelancers",
  "ai-tools-for-business"
] as const;

export function getDiscoveryPage(locale: SupportedLocale, slug: string) {
  const page = discoveryPages.find((item) => item.slug === slug);

  if (!page) {
    return null;
  }

  return localizeTree(locale, {
    slug: page.slug,
    icon: page.icon,
    tag: page.tag,
    readTime: page.readTime,
    toolSlugs: page.toolSlugs,
    ...page.locales[getContentBaseLocale(locale)]
  });
}

export function getHomepageDiscoveryGuides(locale: SupportedLocale): GuideCard[] {
  return homepageGuideSlugs
    .map((slug) => getDiscoveryPage(locale, slug))
    .filter((page): page is NonNullable<ReturnType<typeof getDiscoveryPage>> => Boolean(page))
    .map((page) => ({
      icon: page.icon,
      title: page.title,
      description: page.description,
      href: `/${page.slug}`,
      tag: page.tag,
      readTime: page.readTime
    }));
}
