import { categories as categoryEntries } from "@/data/categories";
import { categoryAliasMap, getLocalizedCategories, getLocalizedTools, getToolsByCategory } from "@/lib/catalog";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import type { SupportedLocale } from "@/i18n/config";
import type { LocalizedTool, PricingTier } from "@/types/catalog";

type LocaleText = {
  tr: string;
  en: string;
} & Partial<Record<SupportedLocale, string>>;

type SubcategoryMatch = {
  categories?: string[];
  toolCategories?: string[];
  useCases?: string[];
  pricing?: PricingTier[];
  featured?: boolean;
};

export type CategoryHubSubcategory = {
  slug: string;
  name: string;
  description: string;
  toolCount: number;
};

export type CategoryHubItem = {
  slug: string;
  name: string;
  description: string;
  supportText: string;
  seoTitle: string;
  seoDescription: string;
  toolCount: number;
  subcategories: CategoryHubSubcategory[];
};

type SubcategoryDefinition = {
  slug: string;
  label: LocaleText;
  description: LocaleText;
  match: SubcategoryMatch;
};

const categoryHubCache = new Map<SupportedLocale, CategoryHubItem[]>();

type CategoryField = "name" | "description" | "supportText" | "seoTitle" | "seoDescription";

type CategoryLocaleCopy = Partial<Record<CategoryField, string>>;

const categoryNames: Record<string, Record<SupportedLocale, string>> = {
  "chatbots-virtual-companions": {
    tr: "Chatbotlar ve Sanal Yoldaşlar",
    en: "Chatbots & Virtual Companions",
    ar: "روبوتات الدردشة والمرافقون الافتراضيون",
    ru: "Чат-боты и виртуальные помощники",
    zh: "聊天机器人与虚拟伙伴",
    ja: "チャットボットと仮想アシスタント",
    ko: "챗봇 및 가상 동반자",
    el: "Chatbot και εικονικοί βοηθοί",
    da: "Chatbots og virtuelle assistenter",
    fa: "چت‌بات‌ها و همراهان مجازی"
  },
  "writing-editing": {
    tr: "Yazma ve Düzenleme",
    en: "Writing & Editing",
    ar: "الكتابة والتحرير",
    ru: "Письмо и редактирование",
    zh: "写作与编辑",
    ja: "ライティングと編集",
    ko: "글쓰기 및 편집",
    el: "Συγγραφή και επεξεργασία",
    da: "Skrivning og redigering",
    fa: "نوشتن و ویرایش"
  },
  "image-generation-editing": {
    tr: "Görüntü Oluşturma ve Düzenleme",
    en: "Image Generation & Editing",
    ar: "إنشاء الصور وتحريرها",
    ru: "Генерация и редактирование изображений",
    zh: "图像生成与编辑",
    ja: "画像生成と編集",
    ko: "이미지 생성 및 편집",
    el: "Δημιουργία και επεξεργασία εικόνων",
    da: "Billedgenerering og redigering",
    fa: "تولید و ویرایش تصویر"
  },
  "coding-development": {
    tr: "Kodlama ve Geliştirme",
    en: "Coding & Development",
    ar: "البرمجة والتطوير",
    ru: "Кодинг и разработка",
    zh: "编码与开发",
    ja: "コーディングと開発",
    ko: "코딩 및 개발",
    el: "Προγραμματισμός και ανάπτυξη",
    da: "Kodning og udvikling",
    fa: "کدنویسی و توسعه"
  },
  "office-productivity": {
    tr: "Ofis ve Verimlilik",
    en: "Office & Productivity",
    ar: "المكتب والإنتاجية",
    ru: "Офис и продуктивность",
    zh: "办公与效率",
    ja: "オフィスと生産性",
    ko: "오피스 및 생산성",
    el: "Γραφείο και παραγωγικότητα",
    da: "Kontor og produktivitet",
    fa: "دفتر کار و بهره‌وری"
  },
  "video-animation": {
    tr: "Video ve Animasyon",
    en: "Video & Animation",
    ar: "الفيديو والرسوم المتحركة",
    ru: "Видео и анимация",
    zh: "视频与动画",
    ja: "動画とアニメーション",
    ko: "비디오 및 애니메이션",
    el: "Βίντεο και animation",
    da: "Video og animation",
    fa: "ویدئو و انیمیشن"
  },
  "audio-generation-conversion": {
    tr: "Ses Oluşturma ve Dönüştürme",
    en: "Audio Generation & Conversion",
    ar: "إنشاء الصوت وتحويله",
    ru: "Генерация и преобразование аудио",
    zh: "音频生成与转换",
    ja: "音声生成と変換",
    ko: "오디오 생성 및 변환",
    el: "Δημιουργία και μετατροπή ήχου",
    da: "Lydgenerering og konvertering",
    fa: "تولید و تبدیل صدا"
  },
  "marketing-advertising": {
    tr: "Pazarlama ve Reklam",
    en: "Marketing & Advertising",
    ar: "التسويق والإعلانات",
    ru: "Маркетинг и реклама",
    zh: "营销与广告",
    ja: "マーケティングと広告",
    ko: "마케팅 및 광고",
    el: "Μάρκετινγκ και διαφήμιση",
    da: "Marketing og annoncering",
    fa: "بازاریابی و تبلیغات"
  },
  "research-data-analysis": {
    tr: "Araştırma ve Veri Analizi",
    en: "Research & Data Analysis",
    ar: "البحث وتحليل البيانات",
    ru: "Исследования и анализ данных",
    zh: "研究与数据分析",
    ja: "調査とデータ分析",
    ko: "리서치 및 데이터 분석",
    el: "Έρευνα και ανάλυση δεδομένων",
    da: "Research og dataanalyse",
    fa: "پژوهش و تحلیل داده"
  },
  "education-translation": {
    tr: "Eğitim ve Çeviri",
    en: "Education & Translation",
    ar: "التعليم والترجمة",
    ru: "Образование и перевод",
    zh: "教育与翻译",
    ja: "教育と翻訳",
    ko: "교육 및 번역",
    el: "Εκπαίδευση και μετάφραση",
    da: "Uddannelse og oversættelse",
    fa: "آموزش و ترجمه"
  },
  "social-media": {
    tr: "Sosyal Medya",
    en: "Social Media",
    ar: "وسائل التواصل الاجتماعي",
    ru: "Социальные сети",
    zh: "社交媒体",
    ja: "ソーシャルメディア",
    ko: "소셜 미디어",
    el: "Κοινωνικά δίκτυα",
    da: "Sociale medier",
    fa: "شبکه‌های اجتماعی"
  },
  "business-management": {
    tr: "İşletme Yönetimi",
    en: "Business Management",
    ar: "إدارة الأعمال",
    ru: "Управление бизнесом",
    zh: "企业管理",
    ja: "ビジネス管理",
    ko: "비즈니스 관리",
    el: "Διοίκηση επιχειρήσεων",
    da: "Forretningsstyring",
    fa: "مدیریت کسب‌وکار"
  },
  "business-research": {
    tr: "İş Araştırması",
    en: "Business Research",
    ar: "أبحاث الأعمال",
    ru: "Бизнес-исследования",
    zh: "商业研究",
    ja: "ビジネスリサーチ",
    ko: "비즈니스 리서치",
    el: "Επιχειρηματική έρευνα",
    da: "Forretningsresearch",
    fa: "پژوهش کسب‌وکار"
  },
  "law-finance": {
    tr: "Hukuk ve Finans",
    en: "Law & Finance",
    ar: "القانون والمال",
    ru: "Право и финансы",
    zh: "法律与金融",
    ja: "法律と金融",
    ko: "법률 및 금융",
    el: "Νομικά και οικονομικά",
    da: "Jura og finans",
    fa: "حقوق و مالی"
  },
  "health-wellness": {
    tr: "Sağlık ve Wellness",
    en: "Health & Wellness",
    ar: "الصحة والعافية",
    ru: "Здоровье и благополучие",
    zh: "健康与身心 wellness",
    ja: "健康とウェルネス",
    ko: "건강 및 웰니스",
    el: "Υγεία και ευεξία",
    da: "Sundhed og wellness",
    fa: "سلامت و تندرستی"
  },
  "daily-life": {
    tr: "Günlük Yaşam",
    en: "Daily Life",
    ar: "الحياة اليومية",
    ru: "Повседневная жизнь",
    zh: "日常生活",
    ja: "日常生活",
    ko: "일상 생활",
    el: "Καθημερινή ζωή",
    da: "Hverdagsliv",
    fa: "زندگی روزمره"
  },
  "interior-architecture-design": {
    tr: "İç Mekan ve Mimari Tasarım",
    en: "Interior & Architecture Design",
    ar: "التصميم الداخلي والمعماري",
    ru: "Интерьер и архитектура",
    zh: "室内与建筑设计",
    ja: "インテリアと建築デザイン",
    ko: "인테리어 및 건축 디자인",
    el: "Εσωτερική και αρχιτεκτονική σχεδίαση",
    da: "Interiør og arkitektur",
    fa: "طراحی داخلی و معماری"
  },
  "art-creative-design": {
    tr: "Sanat ve Yaratıcı Tasarım",
    en: "Art & Creative Design",
    ar: "الفن والتصميم الإبداعي",
    ru: "Искусство и креативный дизайн",
    zh: "艺术与创意设计",
    ja: "アートとクリエイティブデザイン",
    ko: "아트 및 크리에이티브 디자인",
    el: "Τέχνη και δημιουργικός σχεδιασμός",
    da: "Kunst og kreativt design",
    fa: "هنر و طراحی خلاق"
  },
  "image-analysis": {
    tr: "Görüntü Analizi",
    en: "Image Analysis",
    ar: "تحليل الصور",
    ru: "Анализ изображений",
    zh: "图像分析",
    ja: "画像分析",
    ko: "이미지 분석",
    el: "Ανάλυση εικόνας",
    da: "Billedanalyse",
    fa: "تحلیل تصویر"
  },
  "ai-detection-and-undetection": {
    tr: "AI Tespiti ve Gizleme",
    en: "AI Detection & Undetection",
    ar: "كشف الذكاء الاصطناعي وتجاوزه",
    ru: "Обнаружение и обход AI",
    zh: "AI 检测与规避",
    ja: "AI検出と回避",
    ko: "AI 탐지 및 우회",
    el: "Ανίχνευση και παράκαμψη AI",
    da: "AI-detektion og omgåelse",
    fa: "تشخیص و پنهان‌سازی AI"
  },
  "music-audio": {
    tr: "Müzik ve Ses",
    en: "Music & Audio",
    ar: "الموسيقى والصوت",
    ru: "Музыка и аудио",
    zh: "音乐与音频",
    ja: "音楽とオーディオ",
    ko: "음악 및 오디오",
    el: "Μουσική και ήχος",
    da: "Musik og lyd",
    fa: "موسیقی و صدا"
  },
  "make-money-with-ai": {
    tr: "AI ile Para Kazanma",
    en: "Make Money with AI",
    ar: "الربح باستخدام AI",
    ru: "Заработок с AI",
    zh: "用 AI 赚钱",
    ja: "AIで収益化",
    ko: "AI로 수익 창출",
    el: "Κέρδος με AI",
    da: "Tjen penge med AI",
    fa: "کسب درآمد با AI"
  },
  "free-tools": {
    tr: "Ücretsiz Araçlar",
    en: "Free Tools",
    ar: "أدوات مجانية",
    ru: "Бесплатные инструменты",
    zh: "免费工具",
    ja: "無料ツール",
    ko: "무료 도구",
    el: "Δωρεάν εργαλεία",
    da: "Gratis værktøjer",
    fa: "ابزارهای رایگان"
  },
  comparisons: {
    tr: "Karşılaştırmalar",
    en: "Comparisons",
    ar: "المقارنات",
    ru: "Сравнения",
    zh: "对比",
    ja: "比較",
    ko: "비교",
    el: "Συγκρίσεις",
    da: "Sammenligninger",
    fa: "مقایسه‌ها"
  },
  guides: {
    tr: "Rehberler",
    en: "Guides",
    ar: "الأدلة",
    ru: "Руководства",
    zh: "指南",
    ja: "ガイド",
    ko: "가이드",
    el: "Οδηγοί",
    da: "Guides",
    fa: "راهنماها"
  },
  "ai-tools": {
    tr: "AI Araçları",
    en: "AI Tools",
    ar: "أدوات AI",
    ru: "AI-инструменты",
    zh: "AI 工具",
    ja: "AIツール",
    ko: "AI 도구",
    el: "Εργαλεία AI",
    da: "AI-værktøjer",
    fa: "ابزارهای AI"
  },
  other: {
    tr: "Diğer",
    en: "Other",
    ar: "أخرى",
    ru: "Другое",
    zh: "其他",
    ja: "その他",
    ko: "기타",
    el: "Άλλα",
    da: "Andet",
    fa: "سایر"
  }
};

const CATEGORY_ORDER = [
  "chatbots-virtual-companions",
  "writing-editing",
  "image-generation-editing",
  "coding-development",
  "office-productivity",
  "video-animation",
  "audio-generation-conversion",
  "marketing-advertising",
  "research-data-analysis",
  "education-translation",
  "social-media",
  "business-management",
  "business-research",
  "law-finance",
  "health-wellness",
  "daily-life",
  "interior-architecture-design",
  "art-creative-design",
  "image-analysis",
  "ai-detection-and-undetection",
  "music-audio",
  "make-money-with-ai",
  "free-tools",
  "comparisons",
  "guides",
  "ai-tools",
  "other"
];

const DEFAULT_SUBCATEGORIES: SubcategoryDefinition[] = [
  {
    slug: "popular-tools",
    label: { tr: "Popüler araçlar", en: "Popular tools" },
    description: { tr: "Bu kategoride sık incelenen öne çıkan araçlar.", en: "Frequently reviewed tools in this category." },
    match: { featured: true }
  },
  {
    slug: "free-and-freemium",
    label: { tr: "Ücretsiz ve freemium", en: "Free and freemium" },
    description: { tr: "Düşük maliyetle başlayabileceğin seçenekler.", en: "Lower-friction options for getting started." },
    match: { pricing: ["FREE", "FREEMIUM"] }
  },
  {
    slug: "business-workflows",
    label: { tr: "İş akışları", en: "Business workflows" },
    description: { tr: "Ekip, operasyon ve üretkenlik odaklı kullanımlar.", en: "Team, operations, and productivity workflows." },
    match: { useCases: ["business", "freelancers", "research"] }
  }
];

const SUBCATEGORY_MAP: Record<string, SubcategoryDefinition[]> = {
  "chatbots-virtual-companions": [
    {
      slug: "ai-assistants",
      label: { tr: "AI asistanlar", en: "AI assistants" },
      description: { tr: "Yazı, araştırma ve günlük yardım için sohbet tabanlı araçlar.", en: "Chat-based tools for writing, research, and daily help." },
      match: { toolCategories: ["writing", "productivity"] }
    },
    {
      slug: "research-chatbots",
      label: { tr: "Araştırma chatbotları", en: "Research chatbots" },
      description: { tr: "Kaynaklı yanıt ve hızlı bilgi toplama odaklı seçenekler.", en: "Source-backed answers and fast information gathering." },
      match: { useCases: ["research", "students"] }
    },
    {
      slug: "business-chatbots",
      label: { tr: "İş için chatbotlar", en: "Chatbots for business" },
      description: { tr: "Ekip üretkenliği ve müşteri işleri için asistanlar.", en: "Assistants for team productivity and client work." },
      match: { useCases: ["business", "freelancers"] }
    }
  ],
  "writing-editing": [
    {
      slug: "blog-writing",
      label: { tr: "Blog ve içerik yazımı", en: "Blog and content writing" },
      description: { tr: "Blog, makale, sosyal içerik ve uzun form metin üretimi.", en: "Blog, article, social, and long-form writing workflows." },
      match: { toolCategories: ["writing"], useCases: ["content", "creators"] }
    },
    {
      slug: "copywriting",
      label: { tr: "Reklam ve satış metni", en: "Copywriting" },
      description: { tr: "Pazarlama, ürün açıklaması ve satış odaklı metinler.", en: "Marketing, product description, and sales-focused copy." },
      match: { categories: ["marketing-advertising"], useCases: ["business", "freelancers"] }
    },
    {
      slug: "summarization",
      label: { tr: "Özetleme ve düzenleme", en: "Summarization and editing" },
      description: { tr: "Not, araştırma, metin temizleme ve hızlı düzenleme.", en: "Notes, research, cleanup, and fast editing." },
      match: { useCases: ["research", "students"], toolCategories: ["writing"] }
    }
  ],
  "image-generation-editing": [
    {
      slug: "image-generators",
      label: { tr: "Görsel üreticiler", en: "Image generators" },
      description: { tr: "Prompt ile konsept, kampanya ve yaratıcı görsel üretimi.", en: "Prompt-based concept, campaign, and creative image generation." },
      match: { toolCategories: ["image"], useCases: ["creators", "content"] }
    },
    {
      slug: "design-assets",
      label: { tr: "Tasarım varlıkları", en: "Design assets" },
      description: { tr: "Sosyal medya, ürün ve marka varlıkları için araçlar.", en: "Tools for social, product, and brand assets." },
      match: { categories: ["art-creative-design", "social-media"], toolCategories: ["image"] }
    },
    {
      slug: "image-editing",
      label: { tr: "Görsel düzenleme", en: "Image editing" },
      description: { tr: "Arka plan, varyasyon, düzenleme ve hızlı tasarım işleri.", en: "Background work, variations, cleanup, and fast design edits." },
      match: { toolCategories: ["image", "productivity"] }
    }
  ],
  "coding-development": [
    {
      slug: "coding-assistants",
      label: { tr: "Kod asistanları", en: "Coding assistants" },
      description: { tr: "Kod yazma, refactor ve hata çözümü için araçlar.", en: "Tools for coding, refactoring, and debugging." },
      match: { toolCategories: ["productivity"], useCases: ["business", "research"] }
    },
    {
      slug: "ai-app-builders",
      label: { tr: "AI uygulama geliştiriciler", en: "AI app builders" },
      description: { tr: "Uygulama, prototip ve ürün ekranı üretimi.", en: "App, prototype, and product screen generation." },
      match: { useCases: ["business", "freelancers"], toolCategories: ["productivity"] }
    },
    {
      slug: "developer-automation",
      label: { tr: "Geliştirici otomasyonu", en: "Developer automation" },
      description: { tr: "Tekrarlı geliştirme ve teknik iş akışlarını hızlandırma.", en: "Speed up repeated development and technical workflows." },
      match: { categories: ["office-productivity"], useCases: ["business"] }
    }
  ],
  "office-productivity": [
    {
      slug: "meeting-notes",
      label: { tr: "Toplantı notları", en: "Meeting notes" },
      description: { tr: "Toplantı kaydı, özet, görev ve takip maddeleri.", en: "Meeting recording, summaries, tasks, and follow-ups." },
      match: { toolCategories: ["productivity"], useCases: ["business"] }
    },
    {
      slug: "workflow-automation",
      label: { tr: "İş akışı otomasyonu", en: "Workflow automation" },
      description: { tr: "Rutin işleri azaltan ve süreçleri bağlayan araçlar.", en: "Tools that reduce repetitive work and connect processes." },
      match: { categories: ["business-management"], useCases: ["business", "freelancers"] }
    },
    {
      slug: "notes-documents",
      label: { tr: "Not ve doküman", en: "Notes and documents" },
      description: { tr: "Doküman, bilgi tabanı ve günlük üretkenlik araçları.", en: "Documents, knowledge bases, and daily productivity tools." },
      match: { toolCategories: ["productivity", "writing"], useCases: ["students", "research"] }
    }
  ],
  "video-animation": [
    {
      slug: "video-generators",
      label: { tr: "Video üreticiler", en: "Video generators" },
      description: { tr: "Metinden video, kısa form ve kampanya kreatifi üretimi.", en: "Text-to-video, short-form, and campaign creative generation." },
      match: { toolCategories: ["video"], useCases: ["content", "creators"] }
    },
    {
      slug: "video-editing",
      label: { tr: "Video düzenleme", en: "Video editing" },
      description: { tr: "Kurgu, altyazı, kesit ve hızlı içerik üretimi.", en: "Editing, captions, clips, and fast content production." },
      match: { toolCategories: ["video", "productivity"] }
    },
    {
      slug: "creator-video",
      label: { tr: "Creator video araçları", en: "Creator video tools" },
      description: { tr: "Sosyal medya ve yaratıcı içerik üreticileri için.", en: "For social media and creative content creators." },
      match: { useCases: ["creators", "content", "freelancers"], toolCategories: ["video"] }
    }
  ],
  "audio-generation-conversion": [
    {
      slug: "text-to-speech",
      label: { tr: "Metinden sese", en: "Text to speech" },
      description: { tr: "Anlatım, reklam sesi ve voiceover üretimi.", en: "Narration, ad voice, and voiceover generation." },
      match: { toolCategories: ["video"], useCases: ["content", "creators"] }
    },
    {
      slug: "voice-cloning",
      label: { tr: "Ses klonlama", en: "Voice cloning" },
      description: { tr: "Marka sesi, dublaj ve çok dilli anlatım akışları.", en: "Brand voice, dubbing, and multilingual narration workflows." },
      match: { categories: ["music-audio"], useCases: ["business", "content"] }
    },
    {
      slug: "podcast-audio",
      label: { tr: "Podcast ve ses prodüksiyonu", en: "Podcast and audio production" },
      description: { tr: "Podcast, eğitim ve yayın seslerini hızlandıran araçlar.", en: "Tools for podcast, education, and publishing audio." },
      match: { useCases: ["creators", "content"], toolCategories: ["video", "productivity"] }
    }
  ]
};

const EXTRA_SUBCATEGORY_MAP: Record<string, SubcategoryDefinition[]> = {
  "marketing-advertising": [
    {
      slug: "seo-tools",
      label: { tr: "AI SEO araçları", en: "AI SEO tools" },
      description: { tr: "Arama trafiği ve içerik optimizasyonu için araçlar.", en: "Tools for search traffic and content optimization." },
      match: { useCases: ["business", "content", "research"], toolCategories: ["writing"] }
    },
    {
      slug: "ad-creative",
      label: { tr: "Reklam kreatifi", en: "Ad creative" },
      description: { tr: "Reklam metni, görsel ve kampanya fikirleri.", en: "Ad copy, visuals, and campaign ideas." },
      match: { toolCategories: ["writing", "image", "video"], useCases: ["business", "creators"] }
    },
    {
      slug: "sales-tools",
      label: { tr: "AI satış araçları", en: "AI sales tools" },
      description: { tr: "Lead, teklif ve satış destek akışları.", en: "Lead, proposal, and sales-support workflows." },
      match: { useCases: ["business", "freelancers"], toolCategories: ["productivity", "writing"] }
    }
  ],
  "research-data-analysis": [
    {
      slug: "source-research",
      label: { tr: "Kaynaklı araştırma", en: "Source-backed research" },
      description: { tr: "Kaynak tarama, özet ve bilgi doğrulama.", en: "Source scanning, summaries, and verification." },
      match: { useCases: ["research", "students"], toolCategories: ["writing", "productivity"] }
    },
    {
      slug: "data-analysis",
      label: { tr: "Veri analizi", en: "Data analysis" },
      description: { tr: "Tablo, rapor ve karar destek analizleri.", en: "Tables, reports, and decision-support analysis." },
      match: { useCases: ["business", "research"], toolCategories: ["productivity"] }
    },
    {
      slug: "academic-research",
      label: { tr: "Akademik araştırma", en: "Academic research" },
      description: { tr: "Öğrenci ve araştırmacı akışları.", en: "Student and researcher workflows." },
      match: { useCases: ["students", "research"] }
    }
  ],
  "education-translation": [
    {
      slug: "language-learning",
      label: { tr: "Dil öğrenme", en: "Language learning" },
      description: { tr: "Dil pratiği, çeviri ve öğrenme akışları.", en: "Language practice, translation, and learning workflows." },
      match: { useCases: ["students"], toolCategories: ["writing", "productivity"] }
    },
    {
      slug: "student-study",
      label: { tr: "Öğrenci çalışma araçları", en: "Student study tools" },
      description: { tr: "Not çıkarma, özetleme ve sınav hazırlığı.", en: "Note taking, summarization, and exam preparation." },
      match: { useCases: ["students", "research"] }
    },
    {
      slug: "translation-writing",
      label: { tr: "Çeviri ve yazı desteği", en: "Translation and writing help" },
      description: { tr: "Çok dilli yazı, düzenleme ve anlam koruma.", en: "Multilingual writing, editing, and meaning-preserving translation." },
      match: { toolCategories: ["writing"], useCases: ["students", "business"] }
    }
  ],
  "social-media": [
    {
      slug: "social-posts",
      label: { tr: "Sosyal medya içeriği", en: "Social media posts" },
      description: { tr: "Gönderi, başlık, caption ve içerik fikri üretimi.", en: "Post, headline, caption, and content idea generation." },
      match: { useCases: ["creators", "content", "marketing"], toolCategories: ["writing", "image"] }
    },
    {
      slug: "short-form-content",
      label: { tr: "Kısa form içerik", en: "Short-form content" },
      description: { tr: "Reels, Shorts ve klip üretim akışları.", en: "Reels, Shorts, and clip production workflows." },
      match: { toolCategories: ["video", "image"], useCases: ["creators", "content"] }
    },
    {
      slug: "social-scheduling",
      label: { tr: "Planlama ve yayınlama", en: "Scheduling and publishing" },
      description: { tr: "İçerik takvimi, kampanya planı ve sosyal operasyon.", en: "Content calendar, campaign planning, and social operations." },
      match: { useCases: ["marketing", "business"], toolCategories: ["productivity", "writing"] }
    }
  ],
  "business-management": [
    {
      slug: "crm-support",
      label: { tr: "CRM ve destek", en: "CRM and support" },
      description: { tr: "Müşteri destek, ticket ve CRM verimliliği.", en: "Customer support, ticketing, and CRM productivity." },
      match: { useCases: ["business", "sales"], toolCategories: ["productivity", "writing"] }
    },
    {
      slug: "team-productivity",
      label: { tr: "Ekip verimliliği", en: "Team productivity" },
      description: { tr: "Doküman, toplantı, görev ve operasyon düzeni.", en: "Documents, meetings, tasks, and operational clarity." },
      match: { useCases: ["business"], toolCategories: ["productivity"] }
    },
    {
      slug: "business-automation",
      label: { tr: "İş otomasyonu", en: "Business automation" },
      description: { tr: "Tekrarlayan işleri bağlayan AI otomasyon akışları.", en: "AI automation flows that connect repetitive business tasks." },
      match: { useCases: ["business", "freelancers"], toolCategories: ["productivity"] }
    }
  ],
  "business-research": [
    {
      slug: "market-research",
      label: { tr: "Pazar araştırması", en: "Market research" },
      description: { tr: "Rakip, pazar ve kullanıcı içgörüsü toplama.", en: "Competitor, market, and user insight gathering." },
      match: { useCases: ["research", "business"], toolCategories: ["writing", "productivity"] }
    },
    {
      slug: "knowledge-search",
      label: { tr: "Bilgi arama", en: "Knowledge search" },
      description: { tr: "Kurumsal bilgi, kaynak ve hızlı cevap akışları.", en: "Company knowledge, sources, and fast answer workflows." },
      match: { useCases: ["research", "business"], toolCategories: ["productivity"] }
    },
    {
      slug: "report-summaries",
      label: { tr: "Rapor ve özet", en: "Reports and summaries" },
      description: { tr: "Araştırma notlarını karar özetine dönüştürme.", en: "Turn research notes into decision-ready summaries." },
      match: { useCases: ["research", "business"], toolCategories: ["writing"] }
    }
  ],
  "law-finance": [
    {
      slug: "finance-productivity",
      label: { tr: "Finans verimliliği", en: "Finance productivity" },
      description: { tr: "Finansal not, rapor ve operasyonel destek akışları.", en: "Financial notes, reports, and operational support workflows." },
      match: { useCases: ["business", "research"], toolCategories: ["productivity"] }
    },
    {
      slug: "legal-writing",
      label: { tr: "Hukuki yazı desteği", en: "Legal writing support" },
      description: { tr: "Sözleşme taslağı, belge özeti ve kontrollü yazı desteği.", en: "Drafting, document summary, and controlled writing support." },
      match: { useCases: ["business", "research"], toolCategories: ["writing"] }
    },
    {
      slug: "compliance-review",
      label: { tr: "Uyumluluk inceleme", en: "Compliance review" },
      description: { tr: "Denetim, kontrol listesi ve risk sinyali için yardımcı araçlar.", en: "Tools for audits, checklists, and risk signals." },
      match: { useCases: ["business"], toolCategories: ["productivity"] }
    }
  ],
  "health-wellness": [
    {
      slug: "wellness-coaching",
      label: { tr: "Wellness koçluğu", en: "Wellness coaching" },
      description: { tr: "Günlük plan, alışkanlık ve kişisel destek araçları.", en: "Daily planning, habits, and personal support tools." },
      match: { useCases: ["students", "business"], toolCategories: ["productivity"] }
    },
    {
      slug: "health-notes",
      label: { tr: "Sağlık notları", en: "Health notes" },
      description: { tr: "Not, özet ve takip için dikkatli üretkenlik akışları.", en: "Careful productivity flows for notes, summaries, and tracking." },
      match: { useCases: ["research"], toolCategories: ["writing", "productivity"] }
    },
    {
      slug: "personal-planning",
      label: { tr: "Kişisel planlama", en: "Personal planning" },
      description: { tr: "Günlük yaşam, rutin ve kişisel karar desteği.", en: "Daily life, routines, and personal decision support." },
      match: { useCases: ["students", "freelancers"], toolCategories: ["productivity"] }
    }
  ],
  "daily-life": [
    {
      slug: "personal-assistants",
      label: { tr: "Kişisel asistanlar", en: "Personal assistants" },
      description: { tr: "Günlük yazı, planlama ve hızlı cevap yardımı.", en: "Daily writing, planning, and quick-answer help." },
      match: { useCases: ["students", "freelancers"], toolCategories: ["writing", "productivity"] }
    },
    {
      slug: "home-planning",
      label: { tr: "Ev ve yaşam planlama", en: "Home and life planning" },
      description: { tr: "Günlük düzen, fikir ve kişisel organizasyon.", en: "Daily organization, ideas, and personal planning." },
      match: { useCases: ["students", "business"], toolCategories: ["productivity"] }
    },
    {
      slug: "quick-answers",
      label: { tr: "Hızlı cevap araçları", en: "Quick answer tools" },
      description: { tr: "Soru-cevap, özet ve pratik bilgi akışları.", en: "Q&A, summaries, and practical information workflows." },
      match: { useCases: ["research", "students"], toolCategories: ["writing"] }
    }
  ],
  "interior-architecture-design": [
    {
      slug: "interior-visualization",
      label: { tr: "İç mekan görselleştirme", en: "Interior visualization" },
      description: { tr: "Oda, dekorasyon ve mimari fikir görselleştirme.", en: "Room, decor, and architecture idea visualization." },
      match: { toolCategories: ["image"], useCases: ["creators", "business"] }
    },
    {
      slug: "architecture-concepts",
      label: { tr: "Mimari konsept", en: "Architecture concepts" },
      description: { tr: "Konsept, moodboard ve yaratıcı tasarım akışları.", en: "Concept, moodboard, and creative design workflows." },
      match: { categories: ["art-creative-design"], toolCategories: ["image"] }
    },
    {
      slug: "design-mockups",
      label: { tr: "Tasarım mockup", en: "Design mockups" },
      description: { tr: "Sunum, prototip ve hızlı tasarım varlıkları.", en: "Presentation, prototype, and quick design assets." },
      match: { toolCategories: ["image", "productivity"], useCases: ["creators"] }
    }
  ],
  "art-creative-design": [
    {
      slug: "creative-concepts",
      label: { tr: "Yaratıcı konseptler", en: "Creative concepts" },
      description: { tr: "Kampanya, illüstrasyon ve yaratıcı fikir üretimi.", en: "Campaign, illustration, and creative idea generation." },
      match: { toolCategories: ["image"], useCases: ["creators", "content"] }
    },
    {
      slug: "brand-design",
      label: { tr: "Marka tasarımı", en: "Brand design" },
      description: { tr: "Logo, sosyal kit ve marka görseli hazırlama.", en: "Logo, social kit, and brand visual preparation." },
      match: { toolCategories: ["image"], useCases: ["business", "creators"] }
    },
    {
      slug: "illustration-art",
      label: { tr: "İllüstrasyon ve sanat", en: "Illustration and art" },
      description: { tr: "Sanatsal görsel, stil ve yaratıcı varyasyonlar.", en: "Art visuals, style exploration, and creative variations." },
      match: { toolCategories: ["image"], useCases: ["creators"] }
    }
  ],
  "image-analysis": [
    {
      slug: "ocr-extraction",
      label: { tr: "OCR ve veri çıkarma", en: "OCR and extraction" },
      description: { tr: "Görselden metin, tablo ve bilgi çıkarma.", en: "Extract text, tables, and information from images." },
      match: { useCases: ["research", "business"], toolCategories: ["productivity"] }
    },
    {
      slug: "visual-search",
      label: { tr: "Görsel arama", en: "Visual search" },
      description: { tr: "Görsel anlama, açıklama ve benzerlik akışları.", en: "Visual understanding, description, and similarity workflows." },
      match: { toolCategories: ["image", "productivity"], useCases: ["research"] }
    },
    {
      slug: "background-cleanup",
      label: { tr: "Arka plan temizleme", en: "Background cleanup" },
      description: { tr: "Ürün görseli, temizleme ve hızlı düzenleme.", en: "Product visuals, cleanup, and fast editing." },
      match: { toolCategories: ["image"], useCases: ["business", "content"] }
    }
  ],
  "ai-detection-and-undetection": [
    {
      slug: "ai-detectors",
      label: { tr: "AI tespit araçları", en: "AI detectors" },
      description: { tr: "Metin kontrolü, kalite ve yayın öncesi denetim.", en: "Text checks, quality, and pre-publish review." },
      match: { toolCategories: ["writing"], useCases: ["content", "students"] }
    },
    {
      slug: "humanizers",
      label: { tr: "Metin insanlaştırma", en: "Text humanizers" },
      description: { tr: "AI metnini daha doğal ve kontrollü hale getirme.", en: "Make AI text more natural and controlled." },
      match: { toolCategories: ["writing"], useCases: ["content", "freelancers"] }
    },
    {
      slug: "plagiarism-checks",
      label: { tr: "İntihal ve kalite kontrol", en: "Plagiarism and quality checks" },
      description: { tr: "Yayın öncesi kontrol, benzerlik ve kalite işleri.", en: "Pre-publish review, similarity, and quality workflows." },
      match: { useCases: ["students", "content"], toolCategories: ["writing"] }
    }
  ],
  "music-audio": [
    {
      slug: "music-generators",
      label: { tr: "Müzik üreticiler", en: "Music generators" },
      description: { tr: "Şarkı, jingle ve yaratıcı müzik üretimi.", en: "Song, jingle, and creative music generation." },
      match: { categories: ["audio-generation-conversion"], useCases: ["creators", "content"] }
    },
    {
      slug: "sound-design",
      label: { tr: "Ses tasarımı", en: "Sound design" },
      description: { tr: "Efekt, atmosfer ve yaratıcı ses varlıkları.", en: "Effects, atmospheres, and creative sound assets." },
      match: { useCases: ["creators", "content"], toolCategories: ["video"] }
    },
    {
      slug: "audio-editing",
      label: { tr: "Ses düzenleme", en: "Audio editing" },
      description: { tr: "Podcast, kayıt ve temiz ses üretimi.", en: "Podcast, recording, and clean audio production." },
      match: { toolCategories: ["video", "productivity"], useCases: ["creators"] }
    }
  ],
  "make-money-with-ai": [
    {
      slug: "freelance-services",
      label: { tr: "Freelance hizmetler", en: "Freelance services" },
      description: { tr: "AI ile paketlenebilir müşteri teslimleri.", en: "Client deliverables that can be packaged with AI." },
      match: { useCases: ["freelancers", "business"], toolCategories: ["writing", "image", "video"] }
    },
    {
      slug: "content-monetization",
      label: { tr: "İçerik geliri", en: "Content monetization" },
      description: { tr: "Blog, video, sosyal içerik ve affiliate akışları.", en: "Blog, video, social content, and affiliate workflows." },
      match: { useCases: ["content", "creators"], toolCategories: ["writing", "video", "image"] }
    },
    {
      slug: "agency-workflows",
      label: { tr: "Ajans iş akışları", en: "Agency workflows" },
      description: { tr: "Kampanya, kreatif ve operasyon teslimlerini hızlandırma.", en: "Speed up campaign, creative, and operations delivery." },
      match: { useCases: ["business", "marketing"], toolCategories: ["writing", "image", "productivity"] }
    }
  ],
  "free-tools": [
    {
      slug: "free-writing-tools",
      label: { tr: "Ücretsiz yazı araçları", en: "Free writing tools" },
      description: { tr: "Düşük maliyetle yazı ve içerik üretimi.", en: "Low-cost writing and content creation." },
      match: { pricing: ["FREE", "FREEMIUM"], toolCategories: ["writing"] }
    },
    {
      slug: "free-design-tools",
      label: { tr: "Ücretsiz tasarım araçları", en: "Free design tools" },
      description: { tr: "Görsel ve tasarım için ücretsiz/freemium seçenekler.", en: "Free or freemium options for visuals and design." },
      match: { pricing: ["FREE", "FREEMIUM"], toolCategories: ["image"] }
    },
    {
      slug: "free-productivity-tools",
      label: { tr: "Ücretsiz verimlilik araçları", en: "Free productivity tools" },
      description: { tr: "Günlük işler ve ekip verimliliği için ücretsiz seçenekler.", en: "Free options for daily work and team productivity." },
      match: { pricing: ["FREE", "FREEMIUM"], toolCategories: ["productivity"] }
    }
  ],
  comparisons: [
    {
      slug: "chatbot-comparisons",
      label: { tr: "Chatbot karşılaştırmaları", en: "Chatbot comparisons" },
      description: { tr: "ChatGPT, Claude, Gemini ve benzer araçları seçme akışı.", en: "Choose between ChatGPT, Claude, Gemini, and similar tools." },
      match: { categories: ["chatbots-virtual-companions"], toolCategories: ["writing"] }
    },
    {
      slug: "creative-tool-comparisons",
      label: { tr: "Kreatif araç karşılaştırmaları", en: "Creative tool comparisons" },
      description: { tr: "Görsel, video ve tasarım araçlarını yan yana değerlendirme.", en: "Compare image, video, and design tools side by side." },
      match: { toolCategories: ["image", "video"], useCases: ["creators"] }
    },
    {
      slug: "productivity-comparisons",
      label: { tr: "Verimlilik karşılaştırmaları", en: "Productivity comparisons" },
      description: { tr: "Toplantı, doküman, otomasyon ve ekip akışları.", en: "Meetings, documents, automation, and team workflows." },
      match: { toolCategories: ["productivity"], useCases: ["business"] }
    }
  ],
  guides: [
    {
      slug: "beginner-guides",
      label: { tr: "Başlangıç rehberleri", en: "Beginner guides" },
      description: { tr: "AI aracı seçmeye yeni başlayanlar için temel akışlar.", en: "Core workflows for people starting to choose AI tools." },
      match: { featured: true }
    },
    {
      slug: "workflow-guides",
      label: { tr: "İş akışı rehberleri", en: "Workflow guides" },
      description: { tr: "Belirli bir işi daha hızlı yapmak için araç kombinasyonları.", en: "Tool combinations for completing specific work faster." },
      match: { useCases: ["business", "freelancers", "content"] }
    },
    {
      slug: "tool-selection-guides",
      label: { tr: "Araç seçim rehberleri", en: "Tool selection guides" },
      description: { tr: "Fiyat, kullanım ve kaliteye göre daha iyi seçim yapma.", en: "Choose better by pricing, use case, and quality." },
      match: { featured: true, pricing: ["FREE", "FREEMIUM"] }
    }
  ],
  "ai-tools": [
    {
      slug: "all-purpose-ai",
      label: { tr: "Genel amaçlı AI", en: "General-purpose AI" },
      description: { tr: "Yazı, araştırma, fikir ve günlük üretkenlik için çok yönlü araçlar.", en: "Versatile tools for writing, research, ideation, and daily productivity." },
      match: { featured: true }
    },
    {
      slug: "creator-ai",
      label: { tr: "Creator AI", en: "Creator AI" },
      description: { tr: "İçerik üreticileri için görsel, video ve yazı araçları.", en: "Image, video, and writing tools for creators." },
      match: { useCases: ["creators", "content"], toolCategories: ["writing", "image", "video"] }
    },
    {
      slug: "business-ai",
      label: { tr: "İş için AI", en: "Business AI" },
      description: { tr: "Ekip, satış, destek ve operasyon için AI araçları.", en: "AI tools for teams, sales, support, and operations." },
      match: { useCases: ["business", "sales"], toolCategories: ["productivity", "writing"] }
    }
  ],
  other: [
    {
      slug: "emerging-tools",
      label: { tr: "Yeni çıkan araçlar", en: "Emerging tools" },
      description: { tr: "Henüz geniş kategoriye oturmayan yeni AI araçları.", en: "New AI tools that do not yet fit one broad category." },
      match: { featured: false }
    },
    {
      slug: "specialized-workflows",
      label: { tr: "Özel iş akışları", en: "Specialized workflows" },
      description: { tr: "Dar ama faydalı kullanım senaryoları.", en: "Narrow but useful use cases." },
      match: { useCases: ["business", "research", "freelancers"] }
    },
    {
      slug: "utility-tools",
      label: { tr: "Yardımcı araçlar", en: "Utility tools" },
      description: { tr: "Küçük ama tekrar eden dijital işleri kolaylaştıran araçlar.", en: "Tools that simplify small recurring digital tasks." },
      match: { toolCategories: ["productivity", "image", "writing"] }
    }
  ]
};

const subcategoryLabels: Record<string, Record<SupportedLocale, string>> = {
  "popular-tools": { tr: "Popüler araçlar", en: "Popular tools", ar: "أدوات شائعة", ru: "Популярные инструменты", zh: "热门工具", ja: "人気ツール", ko: "인기 도구", el: "Δημοφιλή εργαλεία", da: "Populære værktøjer", fa: "ابزارهای محبوب" },
  "free-and-freemium": { tr: "Ücretsiz ve freemium", en: "Free and freemium", ar: "مجاني وفريميوم", ru: "Бесплатные и freemium", zh: "免费与 Freemium", ja: "無料とフリーミアム", ko: "무료 및 프리미엄", el: "Δωρεάν και freemium", da: "Gratis og freemium", fa: "رایگان و فریمیوم" },
  "business-workflows": { tr: "İş akışları", en: "Business workflows", ar: "سير عمل الأعمال", ru: "Бизнес-процессы", zh: "业务流程", ja: "業務ワークフロー", ko: "비즈니스 워크플로", el: "Ροές εργασίας", da: "Forretningsflows", fa: "جریان‌های کاری کسب‌وکار" },
  "ai-assistants": { tr: "AI asistanlar", en: "AI assistants", ar: "مساعدو AI", ru: "AI-ассистенты", zh: "AI 助手", ja: "AIアシスタント", ko: "AI 어시스턴트", el: "Βοηθοί AI", da: "AI-assistenter", fa: "دستیارهای AI" },
  "research-chatbots": { tr: "Araştırma chatbotları", en: "Research chatbots", ar: "روبوتات بحثية", ru: "Исследовательские чат-боты", zh: "研究型聊天机器人", ja: "リサーチ用チャットボット", ko: "리서치 챗봇", el: "Chatbot έρευνας", da: "Research-chatbots", fa: "چت‌بات‌های پژوهشی" },
  "business-chatbots": { tr: "İş için chatbotlar", en: "Chatbots for business", ar: "روبوتات دردشة للأعمال", ru: "Чат-боты для бизнеса", zh: "商务聊天机器人", ja: "ビジネス向けチャットボット", ko: "비즈니스 챗봇", el: "Chatbot για επιχειρήσεις", da: "Chatbots til virksomheder", fa: "چت‌بات‌های کسب‌وکار" },
  "blog-writing": { tr: "Blog ve içerik yazımı", en: "Blog and content writing", ar: "كتابة المدونات والمحتوى", ru: "Блоги и контент", zh: "博客与内容写作", ja: "ブログとコンテンツ作成", ko: "블로그 및 콘텐츠 작성", el: "Blog και περιεχόμενο", da: "Blog- og indholdsskrivning", fa: "نوشتن بلاگ و محتوا" },
  copywriting: { tr: "Reklam ve satış metni", en: "Copywriting", ar: "كتابة الإعلانات", ru: "Копирайтинг", zh: "广告文案", ja: "コピーライティング", ko: "카피라이팅", el: "Copywriting", da: "Copywriting", fa: "کپی‌رایتینگ" },
  summarization: { tr: "Özetleme ve düzenleme", en: "Summarization and editing", ar: "التلخيص والتحرير", ru: "Резюме и редактирование", zh: "摘要与编辑", ja: "要約と編集", ko: "요약 및 편집", el: "Σύνοψη και επεξεργασία", da: "Opsummering og redigering", fa: "خلاصه‌سازی و ویرایش" },
  "image-generators": { tr: "Görsel üreticiler", en: "Image generators", ar: "مولدات الصور", ru: "Генераторы изображений", zh: "图像生成器", ja: "画像生成ツール", ko: "이미지 생성기", el: "Γεννήτριες εικόνων", da: "Billedgeneratorer", fa: "تولیدکننده‌های تصویر" },
  "design-assets": { tr: "Tasarım varlıkları", en: "Design assets", ar: "أصول التصميم", ru: "Дизайн-ресурсы", zh: "设计素材", ja: "デザイン素材", ko: "디자인 자산", el: "Στοιχεία σχεδίασης", da: "Designassets", fa: "دارایی‌های طراحی" },
  "image-editing": { tr: "Görsel düzenleme", en: "Image editing", ar: "تحرير الصور", ru: "Редактирование изображений", zh: "图像编辑", ja: "画像編集", ko: "이미지 편집", el: "Επεξεργασία εικόνας", da: "Billedredigering", fa: "ویرایش تصویر" },
  "coding-assistants": { tr: "Kod asistanları", en: "Coding assistants", ar: "مساعدو البرمجة", ru: "Ассистенты для кода", zh: "编程助手", ja: "コーディング支援", ko: "코딩 어시스턴트", el: "Βοηθοί κώδικα", da: "Kodeassistenter", fa: "دستیارهای کدنویسی" },
  "ai-app-builders": { tr: "AI uygulama geliştiriciler", en: "AI app builders", ar: "منشئو تطبيقات AI", ru: "AI-конструкторы приложений", zh: "AI 应用构建器", ja: "AIアプリビルダー", ko: "AI 앱 빌더", el: "Κατασκευαστές εφαρμογών AI", da: "AI-appbyggere", fa: "سازنده‌های اپلیکیشن AI" },
  "developer-automation": { tr: "Geliştirici otomasyonu", en: "Developer automation", ar: "أتمتة المطورين", ru: "Автоматизация разработки", zh: "开发者自动化", ja: "開発者向け自動化", ko: "개발자 자동화", el: "Αυτοματισμός ανάπτυξης", da: "Udviklerautomatisering", fa: "اتوماسیون توسعه‌دهنده" },
  "meeting-notes": { tr: "Toplantı notları", en: "Meeting notes", ar: "ملاحظات الاجتماعات", ru: "Заметки встреч", zh: "会议笔记", ja: "会議メモ", ko: "회의 노트", el: "Σημειώσεις συναντήσεων", da: "Mødenoter", fa: "یادداشت جلسه" },
  "workflow-automation": { tr: "İş akışı otomasyonu", en: "Workflow automation", ar: "أتمتة سير العمل", ru: "Автоматизация процессов", zh: "工作流自动化", ja: "ワークフロー自動化", ko: "워크플로 자동화", el: "Αυτοματισμός ροών", da: "Workflowautomatisering", fa: "اتوماسیون جریان کار" },
  "notes-documents": { tr: "Not ve doküman", en: "Notes and documents", ar: "الملاحظات والمستندات", ru: "Заметки и документы", zh: "笔记与文档", ja: "ノートとドキュメント", ko: "노트 및 문서", el: "Σημειώσεις και έγγραφα", da: "Noter og dokumenter", fa: "یادداشت و سند" },
  "video-generators": { tr: "Video üreticiler", en: "Video generators", ar: "مولدات الفيديو", ru: "Генераторы видео", zh: "视频生成器", ja: "動画生成ツール", ko: "비디오 생성기", el: "Γεννήτριες βίντεο", da: "Videogeneratorer", fa: "تولیدکننده‌های ویدئو" },
  "video-editing": { tr: "Video düzenleme", en: "Video editing", ar: "تحرير الفيديو", ru: "Редактирование видео", zh: "视频编辑", ja: "動画編集", ko: "비디오 편집", el: "Επεξεργασία βίντεο", da: "Videoredigering", fa: "ویرایش ویدئو" },
  "creator-video": { tr: "Creator video araçları", en: "Creator video tools", ar: "أدوات فيديو للمبدعين", ru: "Видео-инструменты для авторов", zh: "创作者视频工具", ja: "クリエイター向け動画ツール", ko: "크리에이터 비디오 도구", el: "Εργαλεία βίντεο δημιουργών", da: "Videoværktøjer til creators", fa: "ابزارهای ویدئویی سازندگان" },
  "text-to-speech": { tr: "Metinden sese", en: "Text to speech", ar: "تحويل النص إلى صوت", ru: "Текст в речь", zh: "文本转语音", ja: "テキスト読み上げ", ko: "텍스트 음성 변환", el: "Κείμενο σε ομιλία", da: "Tekst til tale", fa: "متن به گفتار" },
  "voice-cloning": { tr: "Ses klonlama", en: "Voice cloning", ar: "استنساخ الصوت", ru: "Клонирование голоса", zh: "声音克隆", ja: "音声クローン", ko: "음성 복제", el: "Κλωνοποίηση φωνής", da: "Stemmekloning", fa: "شبیه‌سازی صدا" },
  "podcast-audio": { tr: "Podcast ve ses prodüksiyonu", en: "Podcast and audio production", ar: "إنتاج البودكاست والصوت", ru: "Подкасты и аудио", zh: "播客与音频制作", ja: "ポッドキャストと音声制作", ko: "팟캐스트 및 오디오 제작", el: "Podcast και παραγωγή ήχου", da: "Podcast og lydproduktion", fa: "پادکست و تولید صدا" },
  "seo-tools": { tr: "AI SEO araçları", en: "AI SEO tools", ar: "أدوات SEO بالذكاء الاصطناعي", ru: "AI SEO-инструменты", zh: "AI SEO 工具", ja: "AI SEOツール", ko: "AI SEO 도구", el: "Εργαλεία AI SEO", da: "AI SEO-værktøjer", fa: "ابزارهای AI SEO" },
  "ad-creative": { tr: "Reklam kreatifi", en: "Ad creative", ar: "إبداع الإعلانات", ru: "Рекламные креативы", zh: "广告创意", ja: "広告クリエイティブ", ko: "광고 크리에이티브", el: "Διαφημιστικά δημιουργικά", da: "Annoncekreativer", fa: "خلاقیت تبلیغاتی" },
  "sales-tools": { tr: "AI satış araçları", en: "AI sales tools", ar: "أدوات مبيعات AI", ru: "AI-инструменты продаж", zh: "AI 销售工具", ja: "AI営業ツール", ko: "AI 세일즈 도구", el: "Εργαλεία πωλήσεων AI", da: "AI-salgsværktøjer", fa: "ابزارهای فروش AI" },
  "source-research": { tr: "Kaynaklı araştırma", en: "Source-backed research", ar: "بحث موثق بالمصادر", ru: "Исследования с источниками", zh: "带来源的研究", ja: "出典付きリサーチ", ko: "출처 기반 리서치", el: "Έρευνα με πηγές", da: "Kildebaseret research", fa: "پژوهش مبتنی بر منبع" },
  "data-analysis": { tr: "Veri analizi", en: "Data analysis", ar: "تحليل البيانات", ru: "Анализ данных", zh: "数据分析", ja: "データ分析", ko: "데이터 분석", el: "Ανάλυση δεδομένων", da: "Dataanalyse", fa: "تحلیل داده" },
  "academic-research": { tr: "Akademik araştırma", en: "Academic research", ar: "بحث أكاديمي", ru: "Академические исследования", zh: "学术研究", ja: "学術研究", ko: "학술 연구", el: "Ακαδημαϊκή έρευνα", da: "Akademisk research", fa: "پژوهش دانشگاهی" }
};

const descriptionTemplates: Record<SupportedLocale, (subcategory: string, category: string) => string> = {
  tr: (subcategory, category) => `${category} içinde ${subcategory} odaklı araçları keşfet.`,
  en: (subcategory, category) => `Explore ${subcategory} tools inside ${category}.`,
  ar: (subcategory, category) => `استكشف أدوات ${subcategory} ضمن ${category}.`,
  ru: (subcategory, category) => `Изучите инструменты «${subcategory}» в категории «${category}».`,
  zh: (subcategory, category) => `探索「${category}」中的「${subcategory}」工具。`,
  ja: (subcategory, category) => `${category}内の${subcategory}ツールを探す。`,
  ko: (subcategory, category) => `${category} 안에서 ${subcategory} 도구를 살펴보세요.`,
  el: (subcategory, category) => `Εξερευνήστε εργαλεία ${subcategory} στην κατηγορία ${category}.`,
  da: (subcategory, category) => `Udforsk ${subcategory}-værktøjer i ${category}.`,
  fa: (subcategory, category) => `ابزارهای ${subcategory} را در ${category} بررسی کنید.`
};

const categoryDescriptionTemplates: Record<SupportedLocale, (category: string) => CategoryLocaleCopy> = {
  tr: (category) => ({
    description: `${category} için en uygun AI araçlarını alt kategorilere göre keşfedin.`,
    supportText: `${category} alanında doğru aracı bulmak için alt kategorilerden başlayın.`,
    seoTitle: `${category} AI araçları`,
    seoDescription: `${category} için ilgili AI araçlarını, alt kategorileri ve kullanım alanlarını Deciply üzerinde keşfedin.`
  }),
  en: (category) => ({
    description: `Explore the best AI tools for ${category}, organized by focused subcategories.`,
    supportText: `Start from subcategories to find the right ${category} tool faster.`,
    seoTitle: `${category} AI tools`,
    seoDescription: `Discover AI tools, subcategories, and use cases for ${category} on Deciply.`
  }),
  ar: (category) => ({
    description: `استكشف أفضل أدوات الذكاء الاصطناعي لفئة ${category} عبر تصنيفات فرعية واضحة.`,
    supportText: `ابدأ من التصنيفات الفرعية للعثور على أداة مناسبة في ${category} بسرعة.`,
    seoTitle: `أدوات AI لفئة ${category}`,
    seoDescription: `اكتشف أدوات AI والتصنيفات الفرعية وحالات الاستخدام لفئة ${category} على Deciply.`
  }),
  ru: (category) => ({
    description: `Изучайте AI-инструменты для категории «${category}» через понятные подкатегории.`,
    supportText: `Начните с подкатегорий, чтобы быстрее найти подходящий инструмент для «${category}».`,
    seoTitle: `AI-инструменты: ${category}`,
    seoDescription: `Откройте AI-инструменты, подкатегории и сценарии использования для «${category}» на Deciply.`
  }),
  zh: (category) => ({
    description: `按清晰的子分类探索「${category}」相关 AI 工具。`,
    supportText: `从子分类开始，更快找到适合「${category}」的工具。`,
    seoTitle: `${category} AI 工具`,
    seoDescription: `在 Deciply 探索「${category}」的 AI 工具、子分类和使用场景。`
  }),
  ja: (category) => ({
    description: `${category}向けAIツールを、目的別のサブカテゴリで探せます。`,
    supportText: `サブカテゴリから始めて、${category}に合うツールを素早く見つけましょう。`,
    seoTitle: `${category}向けAIツール`,
    seoDescription: `Deciplyで${category}向けAIツール、サブカテゴリ、活用シーンを探せます。`
  }),
  ko: (category) => ({
    description: `${category}에 맞는 AI 도구를 세분화된 하위 카테고리로 살펴보세요.`,
    supportText: `하위 카테고리에서 시작해 ${category}에 맞는 도구를 더 빠르게 찾으세요.`,
    seoTitle: `${category} AI 도구`,
    seoDescription: `Deciply에서 ${category} 관련 AI 도구, 하위 카테고리, 사용 사례를 찾아보세요.`
  }),
  el: (category) => ({
    description: `Ανακαλύψτε εργαλεία AI για ${category} μέσα από καθαρές υποκατηγορίες.`,
    supportText: `Ξεκινήστε από τις υποκατηγορίες για να βρείτε γρηγορότερα το σωστό εργαλείο για ${category}.`,
    seoTitle: `Εργαλεία AI για ${category}`,
    seoDescription: `Ανακαλύψτε εργαλεία AI, υποκατηγορίες και χρήσεις για ${category} στο Deciply.`
  }),
  da: (category) => ({
    description: `Udforsk AI-værktøjer til ${category}, organiseret i fokuserede underkategorier.`,
    supportText: `Start med underkategorier for hurtigere at finde det rigtige værktøj til ${category}.`,
    seoTitle: `${category} AI-værktøjer`,
    seoDescription: `Find AI-værktøjer, underkategorier og brugsscenarier for ${category} på Deciply.`
  }),
  fa: (category) => ({
    description: `ابزارهای AI مرتبط با ${category} را در زیرشاخه‌های روشن بررسی کنید.`,
    supportText: `برای پیدا کردن سریع‌تر ابزار مناسب ${category} از زیرشاخه‌ها شروع کنید.`,
    seoTitle: `ابزارهای AI برای ${category}`,
    seoDescription: `در Deciply ابزارهای AI، زیرشاخه‌ها و کاربردهای مرتبط با ${category} را کشف کنید.`
  })
};

export const categoryUiCopy: Record<SupportedLocale, {
  supportText: string;
  sidebarTitle: string;
  subcategoryLabel: string;
  toolCountLabel: string;
  openLabel: string;
  eyebrow: string;
  subcategories: string;
  backToCategories: string;
  tools: string;
  empty: string;
  inspect: string;
  backToCategory: string;
  allCategories: string;
}> = {
  tr: { supportText: "Ana kategoriden alt kategoriye, oradan da ilgili araçlara ilerleyen düzenli bir keşif akışı.", sidebarTitle: "Kategori navigasyonu", subcategoryLabel: "alt kategori", toolCountLabel: "araç", openLabel: "Alt kategoriyi aç", eyebrow: "Kategori merkezi", subcategories: "Alt kategoriler", backToCategories: "Kategorilere dön", tools: "İlgili araçlar", empty: "Bu alt kategori için henüz gösterilecek araç bulunamadı.", inspect: "İncele", backToCategory: "Kategoriye dön", allCategories: "Tüm kategoriler" },
  en: { supportText: "A cleaner path from main category to subcategory and then into the right tools.", sidebarTitle: "Category navigation", subcategoryLabel: "subcategories", toolCountLabel: "tools", openLabel: "Open subcategory", eyebrow: "Category hub", subcategories: "Subcategories", backToCategories: "Back to categories", tools: "Related tools", empty: "No tools are available for this subcategory yet.", inspect: "Inspect", backToCategory: "Back to category", allCategories: "All categories" },
  ar: { supportText: "مسار واضح من الفئة الرئيسية إلى الفئة الفرعية ثم إلى الأدوات المناسبة.", sidebarTitle: "تنقل الفئات", subcategoryLabel: "فئة فرعية", toolCountLabel: "أداة", openLabel: "افتح الفئة الفرعية", eyebrow: "مركز الفئات", subcategories: "الفئات الفرعية", backToCategories: "العودة إلى الفئات", tools: "الأدوات ذات الصلة", empty: "لا توجد أدوات متاحة لهذه الفئة الفرعية حتى الآن.", inspect: "عرض", backToCategory: "العودة إلى الفئة", allCategories: "كل الفئات" },
  ru: { supportText: "Понятный путь от основной категории к подкатегории и затем к подходящим инструментам.", sidebarTitle: "Навигация по категориям", subcategoryLabel: "подкатегории", toolCountLabel: "инструментов", openLabel: "Открыть подкатегорию", eyebrow: "Центр категорий", subcategories: "Подкатегории", backToCategories: "Назад к категориям", tools: "Связанные инструменты", empty: "Для этой подкатегории пока нет инструментов.", inspect: "Открыть", backToCategory: "Назад к категории", allCategories: "Все категории" },
  zh: { supportText: "从主分类到子分类，再进入相关工具的清晰发现路径。", sidebarTitle: "分类导航", subcategoryLabel: "个子分类", toolCountLabel: "个工具", openLabel: "打开子分类", eyebrow: "分类中心", subcategories: "子分类", backToCategories: "返回分类", tools: "相关工具", empty: "此子分类暂时没有可显示的工具。", inspect: "查看", backToCategory: "返回分类", allCategories: "全部分类" },
  ja: { supportText: "メインカテゴリからサブカテゴリ、そして関連ツールへ進む分かりやすい導線です。", sidebarTitle: "カテゴリナビゲーション", subcategoryLabel: "サブカテゴリ", toolCountLabel: "ツール", openLabel: "サブカテゴリを開く", eyebrow: "カテゴリハブ", subcategories: "サブカテゴリ", backToCategories: "カテゴリへ戻る", tools: "関連ツール", empty: "このサブカテゴリにはまだ表示できるツールがありません。", inspect: "見る", backToCategory: "カテゴリへ戻る", allCategories: "すべてのカテゴリ" },
  ko: { supportText: "메인 카테고리에서 하위 카테고리, 관련 도구로 이어지는 명확한 탐색 흐름입니다.", sidebarTitle: "카테고리 탐색", subcategoryLabel: "하위 카테고리", toolCountLabel: "도구", openLabel: "하위 카테고리 열기", eyebrow: "카테고리 허브", subcategories: "하위 카테고리", backToCategories: "카테고리로 돌아가기", tools: "관련 도구", empty: "이 하위 카테고리에 표시할 도구가 아직 없습니다.", inspect: "보기", backToCategory: "카테고리로 돌아가기", allCategories: "전체 카테고리" },
  el: { supportText: "Καθαρή διαδρομή από κύρια κατηγορία σε υποκατηγορία και μετά στα σωστά εργαλεία.", sidebarTitle: "Πλοήγηση κατηγοριών", subcategoryLabel: "υποκατηγορίες", toolCountLabel: "εργαλεία", openLabel: "Άνοιγμα υποκατηγορίας", eyebrow: "Κέντρο κατηγοριών", subcategories: "Υποκατηγορίες", backToCategories: "Πίσω στις κατηγορίες", tools: "Σχετικά εργαλεία", empty: "Δεν υπάρχουν ακόμη εργαλεία για αυτή την υποκατηγορία.", inspect: "Προβολή", backToCategory: "Πίσω στην κατηγορία", allCategories: "Όλες οι κατηγορίες" },
  da: { supportText: "En klar vej fra hovedkategori til underkategori og videre til relevante værktøjer.", sidebarTitle: "Kategorinavigation", subcategoryLabel: "underkategorier", toolCountLabel: "værktøjer", openLabel: "Åbn underkategori", eyebrow: "Kategori-hub", subcategories: "Underkategorier", backToCategories: "Tilbage til kategorier", tools: "Relaterede værktøjer", empty: "Der er endnu ingen værktøjer i denne underkategori.", inspect: "Se", backToCategory: "Tilbage til kategori", allCategories: "Alle kategorier" },
  fa: { supportText: "مسیر روشن از دسته اصلی به زیرشاخه و سپس ابزارهای مرتبط.", sidebarTitle: "ناوبری دسته‌ها", subcategoryLabel: "زیرشاخه", toolCountLabel: "ابزار", openLabel: "باز کردن زیرشاخه", eyebrow: "مرکز دسته‌ها", subcategories: "زیرشاخه‌ها", backToCategories: "بازگشت به دسته‌ها", tools: "ابزارهای مرتبط", empty: "برای این زیرشاخه هنوز ابزاری برای نمایش وجود ندارد.", inspect: "مشاهده", backToCategory: "بازگشت به دسته", allCategories: "همه دسته‌ها" }
};

function label(locale: SupportedLocale, value: LocaleText) {
  return value[locale] ?? localizeTree(locale, value[getContentBaseLocale(locale)]);
}

function getCategoryLocalizedCopy(locale: SupportedLocale, slug: string, fallback: CategoryLocaleCopy) {
  const name = categoryNames[slug]?.[locale] ?? fallback.name ?? slug;
  const generated = categoryDescriptionTemplates[locale](name);

  return {
    name,
    description: locale === "tr" || locale === "en" ? fallback.description ?? generated.description ?? name : generated.description ?? name,
    supportText: locale === "tr" || locale === "en" ? fallback.supportText ?? generated.supportText ?? name : generated.supportText ?? name,
    seoTitle: locale === "tr" || locale === "en" ? fallback.seoTitle ?? generated.seoTitle ?? name : generated.seoTitle ?? name,
    seoDescription: locale === "tr" || locale === "en" ? fallback.seoDescription ?? generated.seoDescription ?? name : generated.seoDescription ?? name
  };
}

function getSubcategoryLabel(locale: SupportedLocale, slug: string, fallback: LocaleText) {
  return subcategoryLabels[slug]?.[locale] ?? label(locale, fallback);
}

function getSubcategoryDescription(locale: SupportedLocale, subcategorySlug: string, categoryName: string, fallback: LocaleText) {
  if (locale === "tr" || locale === "en") {
    return label(locale, fallback);
  }

  const subcategoryName = subcategoryLabels[subcategorySlug]?.[locale] ?? label(locale, fallback);
  return descriptionTemplates[locale](subcategoryName, categoryName);
}

function sortCategories<T extends { slug: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftIndex = CATEGORY_ORDER.indexOf(left.slug);
    const rightIndex = CATEGORY_ORDER.indexOf(right.slug);
    const safeLeft = leftIndex === -1 ? 999 : leftIndex;
    const safeRight = rightIndex === -1 ? 999 : rightIndex;

    if (safeLeft !== safeRight) {
      return safeLeft - safeRight;
    }

    return left.slug.localeCompare(right.slug);
  });
}

function getDefinitionsForCategory(slug: string) {
  const definitions = [...(SUBCATEGORY_MAP[slug] ?? []), ...(EXTRA_SUBCATEGORY_MAP[slug] ?? []), ...DEFAULT_SUBCATEGORIES];
  const seen = new Set<string>();

  return definitions.filter((definition) => {
    if (seen.has(definition.slug)) {
      return false;
    }

    seen.add(definition.slug);
    return true;
  });
}

function matchesSubcategory(tool: LocalizedTool, match: SubcategoryMatch, subcategorySlug?: string) {
  if (subcategorySlug && tool.subcategorySlug === subcategorySlug) {
    return true;
  }

  if (match.featured && tool.featured) {
    return true;
  }

  if (match.pricing?.includes(tool.pricing)) {
    return true;
  }

  if (match.categories?.some((slug) => tool.categorySlugs.includes(slug))) {
    return true;
  }

  if (match.toolCategories?.some((slug) => tool.toolCategorySlugs.includes(slug) || tool.primaryCategorySlug === slug)) {
    return true;
  }

  if (match.useCases?.some((slug) => tool.useCaseSlugs.includes(slug))) {
    return true;
  }

  return false;
}

function toolMatchesCategory(tool: LocalizedTool, categorySlug: string) {
  if (tool.categorySlug === categorySlug || tool.categorySlugs.includes(categorySlug)) {
    return true;
  }

  if (tool.toolCategorySlugs.includes(categorySlug) || tool.primaryCategorySlug === categorySlug) {
    return true;
  }

  if (categorySlug === "other") {
    return true;
  }

  const aliases = categoryAliasMap[categorySlug];
  return Boolean(aliases?.some((slug) => tool.toolCategorySlugs.includes(slug)));
}

export function getCategoryHub(locale: SupportedLocale): CategoryHubItem[] {
  const cachedHub = categoryHubCache.get(locale);

  if (cachedHub) {
    return cachedHub;
  }

  const localizedCategories = sortCategories(getLocalizedCategories(locale));
  const localizedTools = getLocalizedTools(locale);

  const hub = localizedCategories.map((category) => {
    const categoryTools = localizedTools.filter((tool) => toolMatchesCategory(tool, category.slug));
    const categoryCopy = getCategoryLocalizedCopy(locale, category.slug, category);

    return {
      ...category,
      ...categoryCopy,
      toolCount: categoryTools.length,
      subcategories: getDefinitionsForCategory(category.slug).map((subcategory) => ({
        slug: subcategory.slug,
        name: getSubcategoryLabel(locale, subcategory.slug, subcategory.label),
        description: getSubcategoryDescription(locale, subcategory.slug, categoryCopy.name, subcategory.description),
        toolCount: categoryTools.filter((tool) => matchesSubcategory(tool, subcategory.match, subcategory.slug)).length
      }))
    };
  });

  categoryHubCache.set(locale, hub);

  return hub;
}

export function getCategoryHubItem(locale: SupportedLocale, categorySlug: string) {
  return getCategoryHub(locale).find((category) => category.slug === categorySlug) ?? null;
}

export function getSubcategory(locale: SupportedLocale, categorySlug: string, subcategorySlug: string) {
  const category = getCategoryHubItem(locale, categorySlug);

  if (!category) {
    return null;
  }

  return category.subcategories.find((subcategory) => subcategory.slug === subcategorySlug) ?? null;
}

export function getToolsBySubcategory(locale: SupportedLocale, categorySlug: string, subcategorySlug: string) {
  const definition = getDefinitionsForCategory(categorySlug).find((subcategory) => subcategory.slug === subcategorySlug);

  if (!definition) {
    return [];
  }

  return getToolsByCategory(locale, categorySlug)
    .filter((tool) => matchesSubcategory(tool, definition.match, definition.slug))
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      if (left.rating !== right.rating) {
        return right.rating - left.rating;
      }

      return left.name.localeCompare(right.name);
    });
}

export function getCategoryRouteSlugs() {
  return sortCategories(categoryEntries).map((category) => category.slug);
}
