import type { SupportedLocale } from "@/i18n/config";

type DictionaryShape = {
  meta: { homeTitle: string; homeDescription: string };
  brandSubtitle: string;
  navigation: { label: string; href: string }[];
  languageLabel: string;
  mobileMenuOpenLabel: string;
  mobileMenuCloseLabel: string;
  footer: {
    description: string;
    contactBlock: { title: string; links: { label: string; href: string }[] };
    groups: { title: string; links: { label: string; href: string }[] }[];
    alphabetTitle: string;
    alphabetDescription: string;
    allToolsLabel: string;
    bottomNote: string;
    copyright: string;
  };
};

const dictionaries: Record<SupportedLocale, DictionaryShape> = {
  tr: {
    meta: {
      homeTitle: "Deciply | AI araçları, karşılaştırmalar ve rehberler",
      homeDescription:
        "Deciply; AI araçlarını, karşılaştırmaları, rehberleri ve AI haberlerini tek premium keşif yüzeyinde bir araya getirir."
    },
    brandSubtitle: "AI araç dizini",
    languageLabel: "Dil",
    mobileMenuOpenLabel: "Menüyü aç",
    mobileMenuCloseLabel: "Menüyü kapat",
    navigation: [
      { label: "Kategoriler", href: "/categories" },
      { label: "Araçlar", href: "/tools" },
      { label: "Karşılaştırmalar", href: "/compare" },
      { label: "AI Haberleri", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply, doğru AI aracını daha hızlı bulmak, seçenekleri karşılaştırmak ve karar öncesinde güvenilir bağlam görmek için tasarlandı.",
      contactBlock: {
        title: "İletişim",
        links: [{ label: "İletişim", href: "/contact" }]
      },
      groups: [
        {
          title: "Keşfet",
          links: [
            { label: "Tüm araçlar", href: "/tools" },
            { label: "Tüm kategoriler", href: "/categories" },
            { label: "Karşılaştırmalar", href: "/compare" }
          ]
        },
        {
          title: "Popüler sayfalar",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "İçerik",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI Haberleri", href: "/news" },
            { label: "Canlı karşılaştırma", href: "/compare-auto" }
          ]
        },
        {
          title: "Kurumsal",
          links: [
            { label: "Affiliate açıklaması", href: "/affiliate-disclosure" },
            { label: "Gizlilik politikası", href: "/privacy-policy" },
            { label: "Kullanım şartları", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "Harf sırasına göre göz at",
      alphabetDescription:
        "Araçları baş harfine göre aç, dizinde daha hızlı ilerle ve doğrudan istediğin ürüne geç.",
      allToolsLabel: "Tüm araçlar",
      bottomNote:
        "Araç keşfi, karşılaştırmalar, haberler ve rehberler artık tek bir Deciply deneyiminde bir araya geliyor.",
      copyright: "2026 Deciply. Tüm hakları saklıdır."
    }
  },
  en: {
    meta: {
      homeTitle: "Deciply | AI tools, comparisons, and guides",
      homeDescription:
        "Deciply brings AI tools, comparisons, guides, and AI news into one premium discovery surface."
    },
    brandSubtitle: "AI tools directory",
    languageLabel: "Language",
    mobileMenuOpenLabel: "Open navigation",
    mobileMenuCloseLabel: "Close navigation",
    navigation: [
      { label: "Categories", href: "/categories" },
      { label: "Tools", href: "/tools" },
      { label: "Comparisons", href: "/compare" },
      { label: "AI News", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply is built to help people find the right AI tool faster, compare options, and keep useful editorial context before making a decision.",
      contactBlock: {
        title: "Contact",
        links: [{ label: "Contact", href: "/contact" }]
      },
      groups: [
        {
          title: "Explore",
          links: [
            { label: "All tools", href: "/tools" },
            { label: "All categories", href: "/categories" },
            { label: "Comparisons", href: "/compare" }
          ]
        },
        {
          title: "Popular pages",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "Content",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI News", href: "/news" },
            { label: "Live compare", href: "/compare-auto" }
          ]
        },
        {
          title: "Company",
          links: [
            { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
            { label: "Privacy policy", href: "/privacy-policy" },
            { label: "Terms of use", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "Browse alphabetically",
      alphabetDescription:
        "Open the catalog by first letter, move faster through the directory, and jump straight to the product you need.",
      allToolsLabel: "All tools",
      bottomNote:
        "Tool discovery, comparisons, news, and guides now live inside one Deciply experience.",
      copyright: "2026 Deciply. All rights reserved."
    }
  },
  ar: {
    meta: {
      homeTitle: "Deciply | أدوات الذكاء الاصطناعي والمقارنات والأدلة",
      homeDescription:
        "يجمع Deciply أدوات الذكاء الاصطناعي والمقارنات والأدلة وأخبار الذكاء الاصطناعي في تجربة اكتشاف واحدة."
    },
    brandSubtitle: "دليل أدوات الذكاء الاصطناعي",
    languageLabel: "اللغة",
    mobileMenuOpenLabel: "افتح التنقل",
    mobileMenuCloseLabel: "أغلق التنقل",
    navigation: [
      { label: "الفئات", href: "/categories" },
      { label: "الأدوات", href: "/tools" },
      { label: "المقارنات", href: "/compare" },
      { label: "أخبار الذكاء الاصطناعي", href: "/news" },
      { label: "المدونة", href: "/blog" }
    ],
    footer: {
      description:
        "صُمم Deciply لمساعدتك على العثور على أداة الذكاء الاصطناعي المناسبة بسرعة أكبر، ومقارنة الخيارات، والحصول على سياق موثوق قبل اتخاذ القرار.",
      contactBlock: {
        title: "اتصال",
        links: [{ label: "اتصل بنا", href: "/contact" }]
      },
      groups: [
        {
          title: "استكشف",
          links: [
            { label: "كل الأدوات", href: "/tools" },
            { label: "كل الفئات", href: "/categories" },
            { label: "المقارنات", href: "/compare" }
          ]
        },
        {
          title: "صفحات شائعة",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "المحتوى",
          links: [
            { label: "المدونة", href: "/blog" },
            { label: "أخبار الذكاء الاصطناعي", href: "/news" },
            { label: "مقارنة مباشرة", href: "/compare-auto" }
          ]
        },
        {
          title: "الشركة",
          links: [
            { label: "إفصاح الشراكة", href: "/affiliate-disclosure" },
            { label: "سياسة الخصوصية", href: "/privacy-policy" },
            { label: "شروط الاستخدام", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "تصفّح حسب الحرف",
      alphabetDescription:
        "افتح الدليل حسب الحرف الأول، وتقدم أسرع في الفهرس، وانتقل مباشرة إلى المنتج الذي تحتاجه.",
      allToolsLabel: "كل الأدوات",
      bottomNote:
        "اكتشاف الأدوات والمقارنات والأخبار والأدلة تجتمع الآن داخل تجربة Deciply واحدة.",
      copyright: "2026 Deciply. جميع الحقوق محفوظة."
    }
  },
  ru: {
    meta: {
      homeTitle: "Deciply | AI-инструменты, сравнения и гайды",
      homeDescription:
        "Deciply объединяет AI-инструменты, сравнения, гайды и новости AI в одном удобном интерфейсе."
    },
    brandSubtitle: "Каталог AI-инструментов",
    languageLabel: "Язык",
    mobileMenuOpenLabel: "Открыть навигацию",
    mobileMenuCloseLabel: "Закрыть навигацию",
    navigation: [
      { label: "Категории", href: "/categories" },
      { label: "Инструменты", href: "/tools" },
      { label: "Сравнения", href: "/compare" },
      { label: "Новости AI", href: "/news" },
      { label: "Блог", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply помогает быстрее находить подходящий AI-инструмент, сравнивать варианты и принимать решение с полезным контекстом.",
      contactBlock: {
        title: "Контакты",
        links: [{ label: "Связаться", href: "/contact" }]
      },
      groups: [
        {
          title: "Навигация",
          links: [
            { label: "Все инструменты", href: "/tools" },
            { label: "Все категории", href: "/categories" },
            { label: "Сравнения", href: "/compare" }
          ]
        },
        {
          title: "Популярные страницы",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "Контент",
          links: [
            { label: "Блог", href: "/blog" },
            { label: "Новости AI", href: "/news" },
            { label: "Живое сравнение", href: "/compare-auto" }
          ]
        },
        {
          title: "Компания",
          links: [
            { label: "Партнерское раскрытие", href: "/affiliate-disclosure" },
            { label: "Политика конфиденциальности", href: "/privacy-policy" },
            { label: "Условия использования", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "Просмотр по алфавиту",
      alphabetDescription:
        "Откройте каталог по первой букве, быстрее ориентируйтесь в списке и переходите сразу к нужному продукту.",
      allToolsLabel: "Все инструменты",
      bottomNote:
        "Поиск инструментов, сравнения, новости и гайды теперь объединены в одном интерфейсе Deciply.",
      copyright: "2026 Deciply. Все права защищены."
    }
  },
  zh: {
    meta: {
      homeTitle: "Deciply | AI 工具、对比与指南",
      homeDescription:
        "Deciply 将 AI 工具、对比、指南和 AI 新闻整合到一个统一的发现平台中。"
    },
    brandSubtitle: "AI 工具目录",
    languageLabel: "语言",
    mobileMenuOpenLabel: "打开导航",
    mobileMenuCloseLabel: "关闭导航",
    navigation: [
      { label: "分类", href: "/categories" },
      { label: "工具", href: "/tools" },
      { label: "对比", href: "/compare" },
      { label: "AI 新闻", href: "/news" },
      { label: "博客", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply 帮助你更快找到合适的 AI 工具、比较不同选项，并在决策前获得可靠背景信息。",
      contactBlock: {
        title: "联系",
        links: [{ label: "联系我们", href: "/contact" }]
      },
      groups: [
        {
          title: "探索",
          links: [
            { label: "全部工具", href: "/tools" },
            { label: "全部分类", href: "/categories" },
            { label: "对比", href: "/compare" }
          ]
        },
        {
          title: "热门页面",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "内容",
          links: [
            { label: "博客", href: "/blog" },
            { label: "AI 新闻", href: "/news" },
            { label: "实时对比", href: "/compare-auto" }
          ]
        },
        {
          title: "公司",
          links: [
            { label: "联盟披露", href: "/affiliate-disclosure" },
            { label: "隐私政策", href: "/privacy-policy" },
            { label: "使用条款", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "按字母浏览",
      alphabetDescription:
        "按首字母打开目录，更快浏览列表，并直接跳转到你需要的产品。",
      allToolsLabel: "全部工具",
      bottomNote:
        "工具发现、对比、新闻和指南现在都整合在一个 Deciply 体验中。",
      copyright: "2026 Deciply。保留所有权利。"
    }
  },
  ja: {
    meta: {
      homeTitle: "Deciply | AIツール・比較・ガイド",
      homeDescription:
        "Deciply は AI ツール、比較、ガイド、AI ニュースをひとつの発見体験にまとめます。"
    },
    brandSubtitle: "AIツールディレクトリ",
    languageLabel: "言語",
    mobileMenuOpenLabel: "ナビゲーションを開く",
    mobileMenuCloseLabel: "ナビゲーションを閉じる",
    navigation: [
      { label: "カテゴリ", href: "/categories" },
      { label: "ツール", href: "/tools" },
      { label: "比較", href: "/compare" },
      { label: "AIニュース", href: "/news" },
      { label: "ブログ", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply は、最適な AI ツールをより早く見つけ、選択肢を比較し、判断前に信頼できる文脈を得るために設計されています。",
      contactBlock: {
        title: "お問い合わせ",
        links: [{ label: "お問い合わせ", href: "/contact" }]
      },
      groups: [
        {
          title: "探す",
          links: [
            { label: "すべてのツール", href: "/tools" },
            { label: "すべてのカテゴリ", href: "/categories" },
            { label: "比較", href: "/compare" }
          ]
        },
        {
          title: "人気ページ",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "コンテンツ",
          links: [
            { label: "ブログ", href: "/blog" },
            { label: "AIニュース", href: "/news" },
            { label: "ライブ比較", href: "/compare-auto" }
          ]
        },
        {
          title: "会社情報",
          links: [
            { label: "アフィリエイト開示", href: "/affiliate-disclosure" },
            { label: "プライバシーポリシー", href: "/privacy-policy" },
            { label: "利用規約", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "アルファベット順に見る",
      alphabetDescription:
        "頭文字からディレクトリを開き、一覧を素早く移動して、必要な製品へ直接進めます。",
      allToolsLabel: "すべてのツール",
      bottomNote:
        "ツール発見、比較、ニュース、ガイドがひとつの Deciply 体験に統合されました。",
      copyright: "2026 Deciply. All rights reserved."
    }
  },
  ko: {
    meta: {
      homeTitle: "Deciply | AI 도구, 비교, 가이드",
      homeDescription:
        "Deciply는 AI 도구, 비교, 가이드, AI 뉴스를 하나의 발견 경험으로 제공합니다."
    },
    brandSubtitle: "AI 도구 디렉터리",
    languageLabel: "언어",
    mobileMenuOpenLabel: "탐색 열기",
    mobileMenuCloseLabel: "탐색 닫기",
    navigation: [
      { label: "카테고리", href: "/categories" },
      { label: "도구", href: "/tools" },
      { label: "비교", href: "/compare" },
      { label: "AI 뉴스", href: "/news" },
      { label: "블로그", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply는 적합한 AI 도구를 더 빨리 찾고, 옵션을 비교하고, 결정 전에 신뢰할 수 있는 맥락을 얻도록 설계되었습니다.",
      contactBlock: {
        title: "문의",
        links: [{ label: "문의하기", href: "/contact" }]
      },
      groups: [
        {
          title: "탐색",
          links: [
            { label: "모든 도구", href: "/tools" },
            { label: "모든 카테고리", href: "/categories" },
            { label: "비교", href: "/compare" }
          ]
        },
        {
          title: "인기 페이지",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "콘텐츠",
          links: [
            { label: "블로그", href: "/blog" },
            { label: "AI 뉴스", href: "/news" },
            { label: "실시간 비교", href: "/compare-auto" }
          ]
        },
        {
          title: "회사",
          links: [
            { label: "제휴 고지", href: "/affiliate-disclosure" },
            { label: "개인정보처리방침", href: "/privacy-policy" },
            { label: "이용약관", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "알파벳순으로 보기",
      alphabetDescription:
        "첫 글자 기준으로 디렉터리를 열고 더 빠르게 살펴본 뒤 필요한 제품으로 바로 이동하세요.",
      allToolsLabel: "모든 도구",
      bottomNote:
        "도구 탐색, 비교, 뉴스, 가이드가 이제 하나의 Deciply 경험 안에 모였습니다.",
      copyright: "2026 Deciply. All rights reserved."
    }
  },
  el: {
    meta: {
      homeTitle: "Deciply | Εργαλεία AI, συγκρίσεις και οδηγοί",
      homeDescription:
        "Το Deciply συγκεντρώνει εργαλεία AI, συγκρίσεις, οδηγούς και νέα AI σε μία ενιαία εμπειρία ανακάλυψης."
    },
    brandSubtitle: "Κατάλογος εργαλείων AI",
    languageLabel: "Γλώσσα",
    mobileMenuOpenLabel: "Άνοιγμα πλοήγησης",
    mobileMenuCloseLabel: "Κλείσιμο πλοήγησης",
    navigation: [
      { label: "Κατηγορίες", href: "/categories" },
      { label: "Εργαλεία", href: "/tools" },
      { label: "Συγκρίσεις", href: "/compare" },
      { label: "Νέα AI", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "Το Deciply σχεδιάστηκε για να σε βοηθά να βρίσκεις πιο γρήγορα το σωστό εργαλείο AI, να συγκρίνεις επιλογές και να αποκτάς αξιόπιστο πλαίσιο πριν αποφασίσεις.",
      contactBlock: {
        title: "Επικοινωνία",
        links: [{ label: "Επικοινωνία", href: "/contact" }]
      },
      groups: [
        {
          title: "Εξερεύνηση",
          links: [
            { label: "Όλα τα εργαλεία", href: "/tools" },
            { label: "Όλες οι κατηγορίες", href: "/categories" },
            { label: "Συγκρίσεις", href: "/compare" }
          ]
        },
        {
          title: "Δημοφιλείς σελίδες",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "Περιεχόμενο",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "Νέα AI", href: "/news" },
            { label: "Ζωντανή σύγκριση", href: "/compare-auto" }
          ]
        },
        {
          title: "Εταιρικά",
          links: [
            { label: "Δήλωση affiliate", href: "/affiliate-disclosure" },
            { label: "Πολιτική απορρήτου", href: "/privacy-policy" },
            { label: "Όροι χρήσης", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "Περιήγηση αλφαβητικά",
      alphabetDescription:
        "Άνοιξε τον κατάλογο με βάση το πρώτο γράμμα, κινήσου γρηγορότερα στη λίστα και πήγαινε κατευθείαν στο προϊόν που χρειάζεσαι.",
      allToolsLabel: "Όλα τα εργαλεία",
      bottomNote:
        "Ανακάλυψη εργαλείων, συγκρίσεις, νέα και οδηγοί ζουν πλέον μέσα σε μία εμπειρία Deciply.",
      copyright: "2026 Deciply. Με επιφύλαξη παντός δικαιώματος."
    }
  },
  da: {
    meta: {
      homeTitle: "Deciply | AI-værktøjer, sammenligninger og guides",
      homeDescription:
        "Deciply samler AI-værktøjer, sammenligninger, guides og AI-nyheder i én samlet oplevelse."
    },
    brandSubtitle: "AI-værktøjskatalog",
    languageLabel: "Sprog",
    mobileMenuOpenLabel: "Åbn navigation",
    mobileMenuCloseLabel: "Luk navigation",
    navigation: [
      { label: "Kategorier", href: "/categories" },
      { label: "Værktøjer", href: "/tools" },
      { label: "Sammenligninger", href: "/compare" },
      { label: "AI-nyheder", href: "/news" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply er bygget til at hjælpe dig med hurtigere at finde det rigtige AI-værktøj, sammenligne muligheder og få nyttig kontekst før du vælger.",
      contactBlock: {
        title: "Kontakt",
        links: [{ label: "Kontakt", href: "/contact" }]
      },
      groups: [
        {
          title: "Udforsk",
          links: [
            { label: "Alle værktøjer", href: "/tools" },
            { label: "Alle kategorier", href: "/categories" },
            { label: "Sammenligninger", href: "/compare" }
          ]
        },
        {
          title: "Populære sider",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "Indhold",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI-nyheder", href: "/news" },
            { label: "Live sammenligning", href: "/compare-auto" }
          ]
        },
        {
          title: "Virksomhed",
          links: [
            { label: "Affiliate-oplysning", href: "/affiliate-disclosure" },
            { label: "Privatlivspolitik", href: "/privacy-policy" },
            { label: "Brugsvilkår", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "Gennemse alfabetisk",
      alphabetDescription:
        "Åbn kataloget efter første bogstav, bevæg dig hurtigere gennem listen, og gå direkte til det produkt, du har brug for.",
      allToolsLabel: "Alle værktøjer",
      bottomNote:
        "Værktøjsopdagelse, sammenligninger, nyheder og guides lever nu i én samlet Deciply-oplevelse.",
      copyright: "2026 Deciply. Alle rettigheder forbeholdes."
    }
  },
  fa: {
    meta: {
      homeTitle: "Deciply | ابزارهای AI، مقایسه‌ها و راهنماها",
      homeDescription:
        "Deciply ابزارهای AI، مقایسه‌ها، راهنماها و اخبار هوش مصنوعی را در یک تجربه یکپارچه جمع می‌کند."
    },
    brandSubtitle: "دایرکتوری ابزارهای AI",
    languageLabel: "زبان",
    mobileMenuOpenLabel: "باز کردن ناوبری",
    mobileMenuCloseLabel: "بستن ناوبری",
    navigation: [
      { label: "دسته‌ها", href: "/categories" },
      { label: "ابزارها", href: "/tools" },
      { label: "مقایسه‌ها", href: "/compare" },
      { label: "اخبار AI", href: "/news" },
      { label: "وبلاگ", href: "/blog" }
    ],
    footer: {
      description:
        "Deciply برای این ساخته شده است که سریع‌تر ابزار مناسب AI را پیدا کنید، گزینه‌ها را مقایسه کنید و قبل از تصمیم‌گیری زمینه قابل اعتماد داشته باشید.",
      contactBlock: {
        title: "تماس",
        links: [{ label: "تماس با ما", href: "/contact" }]
      },
      groups: [
        {
          title: "کشف",
          links: [
            { label: "همه ابزارها", href: "/tools" },
            { label: "همه دسته‌ها", href: "/categories" },
            { label: "مقایسه‌ها", href: "/compare" }
          ]
        },
        {
          title: "صفحات محبوب",
          links: [
            { label: "ChatGPT", href: "/tools/chatgpt" },
            { label: "Claude", href: "/tools/claude" },
            { label: "ChatGPT vs Claude", href: "/compare/chatgpt-vs-claude" }
          ]
        },
        {
          title: "محتوا",
          links: [
            { label: "وبلاگ", href: "/blog" },
            { label: "اخبار AI", href: "/news" },
            { label: "مقایسه زنده", href: "/compare-auto" }
          ]
        },
        {
          title: "شرکتی",
          links: [
            { label: "افشای همکاری", href: "/affiliate-disclosure" },
            { label: "سیاست حریم خصوصی", href: "/privacy-policy" },
            { label: "شرایط استفاده", href: "/terms" }
          ]
        }
      ],
      alphabetTitle: "مرور بر اساس حروف الفبا",
      alphabetDescription:
        "فهرست را بر پایه حرف اول باز کنید، سریع‌تر در میان لیست حرکت کنید و مستقیم به محصول موردنیاز برسید.",
      allToolsLabel: "همه ابزارها",
      bottomNote:
        "کشف ابزار، مقایسه‌ها، اخبار و راهنماها اکنون در یک تجربه Deciply کنار هم قرار گرفته‌اند.",
      copyright: "2026 Deciply. تمامی حقوق محفوظ است."
    }
  }
};

export type Dictionary = DictionaryShape;

export function getDictionary(locale: SupportedLocale) {
  return dictionaries[locale];
}
