import type { SupportedLocale } from "@/i18n/config";

type DictionaryShape = {
  meta: { homeTitle: string; homeDescription: string };
  navigation: { label: string; href: string }[];
  footer: {
    description: string;
    badge: string;
    contactBlock: { title: string; links: { label: string; href: string }[] };
    groups: { title: string; links: { label: string; href: string }[] }[];
    bottomNote: string;
    copyright: string;
  };
};

const dictionaries: Partial<Record<SupportedLocale, DictionaryShape>> = {
  tr: {
    meta: {
      homeTitle: "AI araçları ve SaaS rehberi",
      homeDescription: "Kategori, araç, karşılaştırma ve blog odaklı Deciply platformu."
    },
    navigation: [
      { label: "Kategoriler", href: "/categories" },
      { label: "Araçlar", href: "/tools" },
      { label: "Karşılaştırmalar", href: "/compare" },
      { label: "AI Haberleri", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply, AI araçlarını daha hızlı karşılaştırmak, doğru aracı seçmek ve gelir odaklı kullanım senaryolarını keşfetmek için tasarlanmış modern bir platformdur.",
      badge: "Deciply",
      contactBlock: { title: "İletişim", links: [{ label: "İletişim", href: "/contact" }] },
      groups: [
        {
          title: "Araçlar",
          links: [
            { label: "Tüm araçlar", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "Karşılaştır",
          links: [
            { label: "Tüm karşılaştırmalar", href: "/compare" },
            { label: "Canlı karşılaştırma", href: "/compare-auto" },
            { label: "AI Haberleri", href: "/news" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "Popüler rehberler",
          links: [
            { label: "ChatGPT alternatifleri", href: "/alternatives/chatgpt" },
            { label: "Öğrenciler için AI araçları", href: "/use-cases/students" },
            { label: "Freelancer'lar için AI araçları", href: "/use-cases/freelancers" },
            { label: "İçerik üreticileri için AI araçları", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "Güven / Kurumsal",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI Haberleri", href: "/news" },
            { label: "Affiliate açıklaması", href: "/affiliate-disclosure" },
            { label: "Gizlilik politikası", href: "/privacy-policy" },
            { label: "Kullanım şartları", href: "/terms" }
          ]
        }
      ],
      bottomNote: "AI araçları, blog rehberleri ve karşılaştırmalar için hızlı ve güven odaklı Deciply deneyimi.",
      copyright: "2026 Deciply. Tüm hakları saklıdır."
    }
  },
  en: {
    meta: {
      homeTitle: "AI tools and SaaS directory",
      homeDescription: "A Deciply platform focused on categories, tools, comparisons, and editorial content."
    },
    navigation: [
      { label: "Categories", href: "/categories" },
      { label: "Tools", href: "/tools" },
      { label: "Comparisons", href: "/compare" },
      { label: "AI News", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description: "Deciply helps people find, compare, and choose the right AI tools faster.",
      badge: "Deciply",
      contactBlock: { title: "Contact", links: [{ label: "Contact", href: "/contact" }] },
      groups: [
        {
          title: "Tools",
          links: [
            { label: "All tools", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "Compare",
          links: [
            { label: "All comparisons", href: "/compare" },
            { label: "Live compare", href: "/compare-auto" },
            { label: "AI News", href: "/news" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "Popular guides",
          links: [
            { label: "ChatGPT alternatives", href: "/alternatives/chatgpt" },
            { label: "AI tools for students", href: "/use-cases/students" },
            { label: "AI tools for freelancers", href: "/use-cases/freelancers" },
            { label: "AI tools for content creators", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "Trust / Company",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI News", href: "/news" },
            { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
            { label: "Privacy policy", href: "/privacy-policy" },
            { label: "Terms", href: "/terms" }
          ]
        }
      ],
      bottomNote: "A clearer Deciply experience for tools, comparisons, and SEO-driven guides.",
      copyright: "2026 Deciply. All rights reserved."
    }
  },
  ar: {
    meta: {
      homeTitle: "دليل أدوات الذكاء الاصطناعي وSaaS",
      homeDescription: "منصة Deciply متعددة اللغات تركز على الفئات والأدوات والمقارنات والمحتوى التحريري."
    },
    navigation: [
      { label: "الفئات", href: "/categories" },
      { label: "الأدوات", href: "/tools" },
      { label: "المقارنات", href: "/compare" },
      { label: "أخبار الذكاء الاصطناعي", href: "/news" },
      { label: "المدونة", href: "/blog" }
    ],
    footer: {
      description: "Deciply منصة حديثة لاكتشاف أدوات الذكاء الاصطناعي ومقارنتها واختيار الأنسب منها بسرعة وثقة.",
      badge: "Deciply",
      contactBlock: { title: "تواصل", links: [{ label: "تواصل", href: "/contact" }] },
      groups: [
        {
          title: "الأدوات",
          links: [
            { label: "كل الأدوات", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "المقارنة",
          links: [
            { label: "كل المقارنات", href: "/compare" },
            { label: "مقارنة مباشرة", href: "/compare-auto" },
            { label: "أخبار الذكاء الاصطناعي", href: "/news" },
            { label: "ChatGPT مقابل Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT مقابل Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney مقابل Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "أدلة شائعة",
          links: [
            { label: "بدائل ChatGPT", href: "/alternatives/chatgpt" },
            { label: "أدوات AI للطلاب", href: "/use-cases/students" },
            { label: "أدوات AI للمستقلين", href: "/use-cases/freelancers" },
            { label: "أدوات AI لصناع المحتوى", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "الثقة / الشركة",
          links: [
            { label: "المدونة", href: "/blog" },
            { label: "أخبار الذكاء الاصطناعي", href: "/news" },
            { label: "إفصاح الشراكة", href: "/affiliate-disclosure" },
            { label: "سياسة الخصوصية", href: "/privacy-policy" },
            { label: "الشروط", href: "/terms" }
          ]
        }
      ],
      bottomNote: "تجربة Deciply أوضح للأدوات والمقارنات والأدلة المبنية على SEO.",
      copyright: "2026 Deciply. جميع الحقوق محفوظة."
    }
  },
  ru: {
    meta: {
      homeTitle: "Каталог AI‑инструментов и SaaS",
      homeDescription: "Многоязычная платформа Deciply с акцентом на категории, инструменты, сравнения и редакционный контент."
    },
    navigation: [
      { label: "Категории", href: "/categories" },
      { label: "Инструменты", href: "/tools" },
      { label: "Сравнения", href: "/compare" },
      { label: "Новости AI", href: "/news" },
      { label: "Блог", href: "/blog" }
    ],
    footer: {
      description: "Deciply помогает быстрее находить, сравнивать и выбирать подходящие AI‑инструменты без лишнего шума.",
      badge: "Deciply",
      contactBlock: { title: "Контакты", links: [{ label: "Контакты", href: "/contact" }] },
      groups: [
        {
          title: "Инструменты",
          links: [
            { label: "Все инструменты", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "Сравнить",
          links: [
            { label: "Все сравнения", href: "/compare" },
            { label: "Быстрое сравнение", href: "/compare-auto" },
            { label: "Новости AI", href: "/news" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "Популярные гайды",
          links: [
            { label: "Альтернативы ChatGPT", href: "/alternatives/chatgpt" },
            { label: "AI‑инструменты для студентов", href: "/use-cases/students" },
            { label: "AI‑инструменты для фрилансеров", href: "/use-cases/freelancers" },
            { label: "AI‑инструменты для создателей контента", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "Доверие / Компания",
          links: [
            { label: "Блог", href: "/blog" },
            { label: "Новости AI", href: "/news" },
            { label: "Партнёрское раскрытие", href: "/affiliate-disclosure" },
            { label: "Политика конфиденциальности", href: "/privacy-policy" },
            { label: "Условия", href: "/terms" }
          ]
        }
      ],
      bottomNote: "Более понятный Deciply для инструментов, сравнений и SEO‑гайдов.",
      copyright: "2026 Deciply. Все права защищены."
    }
  },
  zh: {
    meta: {
      homeTitle: "AI 工具与 SaaS 目录",
      homeDescription: "Deciply 的多语言平台，聚焦分类、工具、对比与编辑内容。"
    },
    navigation: [
      { label: "分类", href: "/categories" },
      { label: "工具", href: "/tools" },
      { label: "对比", href: "/compare" },
      { label: "AI 新闻", href: "/news" },
      { label: "博客", href: "/blog" }
    ],
    footer: {
      description: "Deciply 帮助用户更快地发现、比较并选择合适的 AI 工具。",
      badge: "Deciply",
      contactBlock: { title: "联系", links: [{ label: "联系", href: "/contact" }] },
      groups: [
        {
          title: "工具",
          links: [
            { label: "全部工具", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "对比",
          links: [
            { label: "全部对比", href: "/compare" },
            { label: "实时对比", href: "/compare-auto" },
            { label: "AI 新闻", href: "/news" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "热门指南",
          links: [
            { label: "ChatGPT 替代品", href: "/alternatives/chatgpt" },
            { label: "学生 AI 工具", href: "/use-cases/students" },
            { label: "自由职业者 AI 工具", href: "/use-cases/freelancers" },
            { label: "内容创作者 AI 工具", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "信任 / 公司",
          links: [
            { label: "博客", href: "/blog" },
            { label: "AI 新闻", href: "/news" },
            { label: "联盟披露", href: "/affiliate-disclosure" },
            { label: "隐私政策", href: "/privacy-policy" },
            { label: "条款", href: "/terms" }
          ]
        }
      ],
      bottomNote: "面向工具、对比与 SEO 指南的更清晰 Deciply 体验。",
      copyright: "2026 Deciply。保留所有权利。"
    }
  },
  ja: {
    meta: {
      homeTitle: "AIツールとSaaSのディレクトリ",
      homeDescription: "カテゴリー、ツール、比較、編集コンテンツに焦点を当てた Deciply の多言語プラットフォームです。"
    },
    navigation: [
      { label: "カテゴリー", href: "/categories" },
      { label: "ツール", href: "/tools" },
      { label: "比較", href: "/compare" },
      { label: "AIニュース", href: "/news" },
      { label: "ブログ", href: "/blog" }
    ],
    footer: {
      description: "Deciply は、AIツールをより早く見つけ、比較し、最適なものを選ぶためのプラットフォームです。",
      badge: "Deciply",
      contactBlock: { title: "お問い合わせ", links: [{ label: "お問い合わせ", href: "/contact" }] },
      groups: [
        {
          title: "ツール",
          links: [
            { label: "すべてのツール", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "比較",
          links: [
            { label: "すべての比較", href: "/compare" },
            { label: "ライブ比較", href: "/compare-auto" },
            { label: "AIニュース", href: "/news" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "人気ガイド",
          links: [
            { label: "ChatGPT の代替", href: "/alternatives/chatgpt" },
            { label: "学生向け AI ツール", href: "/use-cases/students" },
            { label: "フリーランス向け AI ツール", href: "/use-cases/freelancers" },
            { label: "コンテンツ制作者向け AI ツール", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "信頼 / 会社情報",
          links: [
            { label: "ブログ", href: "/blog" },
            { label: "AIニュース", href: "/news" },
            { label: "アフィリエイト開示", href: "/affiliate-disclosure" },
            { label: "プライバシーポリシー", href: "/privacy-policy" },
            { label: "利用規約", href: "/terms" }
          ]
        }
      ],
      bottomNote: "ツール、比較、SEOガイドのためのより明確な Deciply 体験。",
      copyright: "2026 Deciply. All rights reserved."
    }
  },
  ko: {
    meta: {
      homeTitle: "AI 도구 및 SaaS 디렉터리",
      homeDescription: "카테고리, 도구, 비교, 편집 콘텐츠에 집중한 Deciply의 다국어 플랫폼입니다."
    },
    navigation: [
      { label: "카테고리", href: "/categories" },
      { label: "도구", href: "/tools" },
      { label: "비교", href: "/compare" },
      { label: "AI 뉴스", href: "/news" },
      { label: "블로그", href: "/blog" }
    ],
    footer: {
      description: "Deciply는 AI 도구를 더 빠르게 찾고 비교해 더 나은 선택을 돕는 플랫폼입니다.",
      badge: "Deciply",
      contactBlock: { title: "문의", links: [{ label: "문의", href: "/contact" }] },
      groups: [
        {
          title: "도구",
          links: [
            { label: "모든 도구", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "비교",
          links: [
            { label: "모든 비교", href: "/compare" },
            { label: "실시간 비교", href: "/compare-auto" },
            { label: "AI 뉴스", href: "/news" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "인기 가이드",
          links: [
            { label: "ChatGPT 대안", href: "/alternatives/chatgpt" },
            { label: "학생용 AI 도구", href: "/use-cases/students" },
            { label: "프리랜서용 AI 도구", href: "/use-cases/freelancers" },
            { label: "콘텐츠 크리에이터용 AI 도구", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "신뢰 / 회사",
          links: [
            { label: "블로그", href: "/blog" },
            { label: "AI 뉴스", href: "/news" },
            { label: "제휴 고지", href: "/affiliate-disclosure" },
            { label: "개인정보 처리방침", href: "/privacy-policy" },
            { label: "이용 약관", href: "/terms" }
          ]
        }
      ],
      bottomNote: "도구, 비교, SEO 가이드를 위한 더 명확한 Deciply 경험.",
      copyright: "2026 Deciply. All rights reserved."
    }
  },
  el: {
    meta: {
      homeTitle: "Κατάλογος εργαλείων AI και SaaS",
      homeDescription: "Μια πολύγλωσση πλατφόρμα Deciply με έμφαση σε κατηγορίες, εργαλεία, συγκρίσεις και επιμελημένο περιεχόμενο."
    },
    navigation: [
      { label: "Κατηγορίες", href: "/categories" },
      { label: "Εργαλεία", href: "/tools" },
      { label: "Συγκρίσεις", href: "/compare" },
      { label: "AI Νέα", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description: "Το Deciply βοηθά τους χρήστες να εντοπίζουν, να συγκρίνουν και να επιλέγουν τα κατάλληλα AI εργαλεία πιο γρήγορα.",
      badge: "Deciply",
      contactBlock: { title: "Επικοινωνία", links: [{ label: "Επικοινωνία", href: "/contact" }] },
      groups: [
        {
          title: "Εργαλεία",
          links: [
            { label: "Όλα τα εργαλεία", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "Σύγκριση",
          links: [
            { label: "Όλες οι συγκρίσεις", href: "/compare" },
            { label: "Ζωντανή σύγκριση", href: "/compare-auto" },
            { label: "AI Νέα", href: "/news" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "Δημοφιλείς οδηγοί",
          links: [
            { label: "Εναλλακτικές του ChatGPT", href: "/alternatives/chatgpt" },
            { label: "Εργαλεία AI για φοιτητές", href: "/use-cases/students" },
            { label: "Εργαλεία AI για freelancers", href: "/use-cases/freelancers" },
            { label: "Εργαλεία AI για δημιουργούς περιεχομένου", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "Εμπιστοσύνη / Εταιρικά",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI Νέα", href: "/news" },
            { label: "Δήλωση συνεργασίας", href: "/affiliate-disclosure" },
            { label: "Πολιτική απορρήτου", href: "/privacy-policy" },
            { label: "Όροι", href: "/terms" }
          ]
        }
      ],
      bottomNote: "Μια πιο καθαρή εμπειρία Deciply για εργαλεία, συγκρίσεις και SEO οδηγούς.",
      copyright: "2026 Deciply. Με επιφύλαξη παντός δικαιώματος."
    }
  },
  da: {
    meta: {
      homeTitle: "AI-værktøjs- og SaaS-katalog",
      homeDescription: "En flersproget Deciply-platform med fokus på kategorier, værktøjer, sammenligninger og redaktionelt indhold."
    },
    navigation: [
      { label: "Kategorier", href: "/categories" },
      { label: "Værktøjer", href: "/tools" },
      { label: "Sammenligninger", href: "/compare" },
      { label: "AI-nyheder", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description: "Deciply hjælper brugere med hurtigere at finde, sammenligne og vælge de rigtige AI-værktøjer.",
      badge: "Deciply",
      contactBlock: { title: "Kontakt", links: [{ label: "Kontakt", href: "/contact" }] },
      groups: [
        {
          title: "Værktøjer",
          links: [
            { label: "Alle værktøjer", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "Sammenlign",
          links: [
            { label: "Alle sammenligninger", href: "/compare" },
            { label: "Live sammenligning", href: "/compare-auto" },
            { label: "AI-nyheder", href: "/news" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT vs Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney vs Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "Populære guides",
          links: [
            { label: "ChatGPT-alternativer", href: "/alternatives/chatgpt" },
            { label: "AI-værktøjer til studerende", href: "/use-cases/students" },
            { label: "AI-værktøjer til freelancere", href: "/use-cases/freelancers" },
            { label: "AI-værktøjer til indholdsskabere", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "Troværdighed / Firma",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI-nyheder", href: "/news" },
            { label: "Affiliate-oplysning", href: "/affiliate-disclosure" },
            { label: "Privatlivspolitik", href: "/privacy-policy" },
            { label: "Vilkår", href: "/terms" }
          ]
        }
      ],
      bottomNote: "En mere overskuelig Deciply-oplevelse til værktøjer, sammenligninger og SEO-guides.",
      copyright: "2026 Deciply. Alle rettigheder forbeholdes."
    }
  },
  fa: {
    meta: {
      homeTitle: "دایرکتوری ابزارهای هوش مصنوعی و SaaS",
      homeDescription: "پلتفرم چندزبانه Deciply با تمرکز بر دسته‌بندی‌ها، ابزارها، مقایسه‌ها و محتوای تحریریه."
    },
    navigation: [
      { label: "دسته‌بندی‌ها", href: "/categories" },
      { label: "ابزارها", href: "/tools" },
      { label: "مقایسه‌ها", href: "/compare" },
      { label: "اخبار AI", href: "/news" },
      { label: "وبلاگ", href: "/blog" }
    ],
    footer: {
      description: "Deciply به کاربران کمک می‌کند ابزارهای مناسب هوش مصنوعی را سریع‌تر پیدا، مقایسه و انتخاب کنند.",
      badge: "Deciply",
      contactBlock: { title: "تماس", links: [{ label: "تماس", href: "/contact" }] },
      groups: [
        {
          title: "ابزارها",
          links: [
            { label: "همه ابزارها", href: "/tools" },
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "Midjourney", href: "/tools/midjourney" }
          ]
        },
        {
          title: "مقایسه",
          links: [
            { label: "همه مقایسه‌ها", href: "/compare" },
            { label: "مقایسه زنده", href: "/compare-auto" },
            { label: "اخبار AI", href: "/news" },
            { label: "ChatGPT در برابر Claude", href: "/compare/chatgpt-vs-claude" },
            { label: "ChatGPT در برابر Gemini", href: "/compare/chatgpt-vs-gemini" },
            { label: "Midjourney در برابر Adobe Firefly", href: "/compare/midjourney-vs-adobe-firefly" }
          ]
        },
        {
          title: "راهنماهای محبوب",
          links: [
            { label: "جایگزین‌های ChatGPT", href: "/alternatives/chatgpt" },
            { label: "ابزارهای AI برای دانشجویان", href: "/use-cases/students" },
            { label: "ابزارهای AI برای فریلنسرها", href: "/use-cases/freelancers" },
            { label: "ابزارهای AI برای تولیدکنندگان محتوا", href: "/use-cases/content-creators" }
          ]
        },
        {
          title: "اعتماد / شرکت",
          links: [
            { label: "وبلاگ", href: "/blog" },
            { label: "اخبار AI", href: "/news" },
            { label: "افشای همکاری", href: "/affiliate-disclosure" },
            { label: "سیاست حریم خصوصی", href: "/privacy-policy" },
            { label: "شرایط", href: "/terms" }
          ]
        }
      ],
      bottomNote: "تجربه‌ای شفاف‌تر از Deciply برای ابزارها، مقایسه‌ها و راهنماهای SEO.",
      copyright: "2026 Deciply. همه حقوق محفوظ است."
    }
  }
};

export type Dictionary = DictionaryShape;

export function getDictionary(locale: SupportedLocale) {
  return dictionaries[locale] ?? dictionaries.en ?? dictionaries.tr!;
}
