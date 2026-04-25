import type { Locale } from "@/i18n/config";

type CatalogContentShape = {
  common: {
    categoriesLabel: string;
    toolsLabel: string;
    allToolsLabel: string;
    relatedToolsLabel: string;
    officialSiteLabel: string;
    placeholderLabel: string;
    breadcrumbsHome: string;
    ratingLabel: string;
    pricingLabel: string;
    featuresLabel: string;
    internalLinksLabel: string;
    relatedContentLabel: string;
    categoryTagsLabel: string;
    viewDetailsLabel: string;
  };
  categoriesIndex: {
    eyebrow: string;
    title: string;
    description: string;
    cardLinkLabel: string;
  };
  categoryDetail: {
    toolsTitle: string;
    toolsDescription: string;
    relatedTitle: string;
    relatedDescription: string;
    internalLinksTitle: string;
    internalLinksDescription: string;
    allToolsLink: string;
    allCategoriesLink: string;
    guidesLink: string;
  };
  toolsIndex: {
    eyebrow: string;
    title: string;
    description: string;
    filterTitle: string;
    filterDescription: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchHelp: string;
    toolCategoryLabel: string;
    useCaseLabel: string;
    pricingFilterLabel: string;
    allToolCategoriesLabel: string;
    allUseCasesLabel: string;
    allPricingLabel: string;
    resetFiltersLabel: string;
    resultsLabel: string;
    resultsSummaryLabel: string;
    emptyTitle: string;
    emptyDescription: string;
    bestForLabel: string;
    pageLabel: string;
    previousPage: string;
    nextPage: string;
    loadMoreLabel: string;
    sortLabel: string;
    mostPopularLabel: string;
    highestRatedLabel: string;
    newestLabel: string;
    freeFirstLabel: string;
    paidFirstLabel: string;
    quickIntentLabel: string;
    mobileFiltersLabel: string;
    mobileFiltersCloseLabel: string;
  };
  toolDetail: {
    overviewTitle: string;
    whyItStandsOutTitle: string;
    prosTitle: string;
    consTitle: string;
    relatedToolsDescription: string;
    backToTools: string;
  };
};

export const catalogContent: Record<Locale, CatalogContentShape> = {
  tr: {
    common: {
      categoriesLabel: "Kategoriler",
      toolsLabel: "Araçlar",
      allToolsLabel: "Tüm araçlar",
      relatedToolsLabel: "Benzer araçlar",
      officialSiteLabel: "Resmi siteyi ziyaret et",
      placeholderLabel: "Hazırlanıyor",
      breadcrumbsHome: "Ana sayfa",
      ratingLabel: "Puan",
      pricingLabel: "Fiyat",
      featuresLabel: "Öne çıkan özellikler",
      internalLinksLabel: "İç bağlantılar",
      relatedContentLabel: "İlgili içerikler",
      categoryTagsLabel: "Kategoriler",
      viewDetailsLabel: "İncele"
    },
    categoriesIndex: {
      eyebrow: "Kategori merkezi",
      title: "Deciply kategori yapısı",
      description: "Her kategori, ilgili araçlara ve rehber içeriklere açılan SEO dostu bir merkez olarak tasarlandı.",
      cardLinkLabel: "Kategoriyi aç"
    },
    categoryDetail: {
      toolsTitle: "Bu kategorideki araçlar",
      toolsDescription: "Kategoriye bağlı araçlar, detay sayfalarına bağlanan net bir liste yapısıyla gösterilir.",
      relatedTitle: "İlgili rehberler ve karşılaştırmalar",
      relatedDescription: "Bu alan, kategoriye yakın rehberleri ve karşılaştırmaları bir arada gösterir.",
      internalLinksTitle: "Bu kategori için iç bağlantılar",
      internalLinksDescription: "Kategori detayları, araç sayfaları ve rehberler arasında güçlü bir iç link akışı kurar.",
      allToolsLink: "Tüm araçları gör",
      allCategoriesLink: "Tüm kategorilere dön",
      guidesLink: "Rehberlere git"
    },
    toolsIndex: {
      eyebrow: "Araç dizini",
      title: "İhtiyacına uygun AI aracını bul",
      description: "Araç adını, kategori, fiyat modeli ve kullanım amacını kullanarak doğru aracı birkaç saniyede keşfet.",
      filterTitle: "Arama ve filtreler",
      filterDescription: "İsim, kategori, fiyat modeli ve kullanım amacına göre sonuçları anında daralt.",
      searchLabel: "Araç ara",
      searchPlaceholder: "Örn. ChatGPT, video, içerik, öğrenciler",
      searchHelp: "Araç adı, açıklama, kategori veya kullanım amacı yazarak sonuçları filtreleyin.",
      toolCategoryLabel: "Araç kategorisi",
      useCaseLabel: "Kullanım amacı",
      pricingFilterLabel: "Fiyat modeli",
      allToolCategoriesLabel: "Tüm araç kategorileri",
      allUseCasesLabel: "Tüm kullanım amaçları",
      allPricingLabel: "Tüm fiyatlar",
      resetFiltersLabel: "Filtreleri temizle",
      resultsLabel: "araç bulundu",
      resultsSummaryLabel: "içinden",
      emptyTitle: "Sonuç bulunamadı",
      emptyDescription: "Daha geniş bir arama deneyin veya filtreleri temizleyin.",
      bestForLabel: "En uygun kullanım",
      pageLabel: "Sayfa",
      previousPage: "Önceki",
      nextPage: "Sonraki",
      loadMoreLabel: "Daha fazla araç yükle",
      sortLabel: "Sırala",
      mostPopularLabel: "En popüler",
      highestRatedLabel: "En yüksek puanlı",
      newestLabel: "En yeni",
      freeFirstLabel: "Önce ücretsiz",
      paidFirstLabel: "Önce ücretli",
      quickIntentLabel: "Hızlı keşif",
      mobileFiltersLabel: "Filtreler",
      mobileFiltersCloseLabel: "Filtreleri kapat"
    },
    toolDetail: {
      overviewTitle: "Genel bakış",
      whyItStandsOutTitle: "Neden öne çıkıyor?",
      prosTitle: "Artıları",
      consTitle: "Eksileri",
      relatedToolsDescription: "Benzer kategorilerdeki diğer araçlar karar sürecini hızlandırır.",
      backToTools: "Tüm araçlara dön"
    }
  },
  en: {
    common: {
      categoriesLabel: "Categories",
      toolsLabel: "Tools",
      allToolsLabel: "All tools",
      relatedToolsLabel: "Related tools",
      officialSiteLabel: "Visit official site",
      placeholderLabel: "Coming soon",
      breadcrumbsHome: "Home",
      ratingLabel: "Rating",
      pricingLabel: "Pricing",
      featuresLabel: "Key features",
      internalLinksLabel: "Internal links",
      relatedContentLabel: "Related content",
      categoryTagsLabel: "Categories",
      viewDetailsLabel: "Review"
    },
    categoriesIndex: {
      eyebrow: "Category hub",
      title: "Deciply category structure",
      description: "Each category is designed as an SEO-friendly hub that connects relevant tools and guides.",
      cardLinkLabel: "Open category"
    },
    categoryDetail: {
      toolsTitle: "Tools in this category",
      toolsDescription: "Category tools are listed in a clean structure that links directly into detail pages.",
      relatedTitle: "Related guides and comparisons",
      relatedDescription: "This area surfaces nearby guides and comparisons for the same topic.",
      internalLinksTitle: "Internal links for this category",
      internalLinksDescription: "Category pages connect tool details, guides, and the main directory through clear internal linking.",
      allToolsLink: "View all tools",
      allCategoriesLink: "Back to all categories",
      guidesLink: "Go to guides"
    },
    toolsIndex: {
      eyebrow: "Tool directory",
      title: "Find the right AI tool faster",
      description: "Use tool name, category, pricing, and use-case filters to reach the best-fit tool quickly.",
      filterTitle: "Search and filters",
      filterDescription: "Refine results instantly by tool name, category, pricing model, and use case.",
      searchLabel: "Search tools",
      searchPlaceholder: "e.g. ChatGPT, video, content, students",
      searchHelp: "Search by tool name, description, category, or use case.",
      toolCategoryLabel: "Tool category",
      useCaseLabel: "Use case",
      pricingFilterLabel: "Pricing",
      allToolCategoriesLabel: "All tool categories",
      allUseCasesLabel: "All use cases",
      allPricingLabel: "All pricing",
      resetFiltersLabel: "Clear filters",
      resultsLabel: "tools found",
      resultsSummaryLabel: "of",
      emptyTitle: "No tools found",
      emptyDescription: "Try a broader query or clear the filters to discover more options.",
      bestForLabel: "Best fit",
      pageLabel: "Page",
      previousPage: "Previous",
      nextPage: "Next",
      loadMoreLabel: "Load more tools",
      sortLabel: "Sort by",
      mostPopularLabel: "Most popular",
      highestRatedLabel: "Highest rated",
      newestLabel: "Newest",
      freeFirstLabel: "Free first",
      paidFirstLabel: "Paid first",
      quickIntentLabel: "Quick discovery",
      mobileFiltersLabel: "Filters",
      mobileFiltersCloseLabel: "Close filters"
    },
    toolDetail: {
      overviewTitle: "Overview",
      whyItStandsOutTitle: "Why it stands out",
      prosTitle: "Pros",
      consTitle: "Cons",
      relatedToolsDescription: "Other tools in similar categories help users compare options faster.",
      backToTools: "Back to all tools"
    }
  },
  ar: {
    common: {
      categoriesLabel: "الفئات",
      toolsLabel: "الأدوات",
      allToolsLabel: "كل الأدوات",
      relatedToolsLabel: "أدوات ذات صلة",
      officialSiteLabel: "زيارة الموقع الرسمي",
      placeholderLabel: "قريبًا",
      breadcrumbsHome: "الرئيسية",
      ratingLabel: "التقييم",
      pricingLabel: "السعر",
      featuresLabel: "أبرز الميزات",
      internalLinksLabel: "روابط داخلية",
      relatedContentLabel: "محتوى ذو صلة",
      categoryTagsLabel: "الفئات",
      viewDetailsLabel: "استعراض"
    },
    categoriesIndex: {
      eyebrow: "مركز الفئات",
      title: "هيكل فئات Deciply",
      description: "كل فئة مصممة كمركز صديق لمحركات البحث يربط الأدوات ذات الصلة والأدلة التحريرية.",
      cardLinkLabel: "افتح الفئة"
    },
    categoryDetail: {
      toolsTitle: "الأدوات في هذه الفئة",
      toolsDescription: "تُعرض الأدوات المرتبطة بهذه الفئة ضمن بنية واضحة تقود مباشرة إلى صفحات التفاصيل.",
      relatedTitle: "أدلة ومقارنات ذات صلة",
      relatedDescription: "يعرض هذا القسم الأدلة والمقارنات الأقرب لنفس الموضوع.",
      internalLinksTitle: "روابط داخلية لهذه الفئة",
      internalLinksDescription: "تربط صفحات الفئات بين الأدوات والأدلة والدليل الرئيسي عبر تدفق داخلي واضح.",
      allToolsLink: "عرض كل الأدوات",
      allCategoriesLink: "العودة إلى كل الفئات",
      guidesLink: "الانتقال إلى الأدلة"
    },
    toolsIndex: {
      eyebrow: "دليل الأدوات",
      title: "اعثر على أداة AI المناسبة بسرعة",
      description: "استخدم اسم الأداة والفئة والسعر وحالة الاستخدام للوصول إلى أفضل خيار بسرعة.",
      filterTitle: "البحث والفلاتر",
      filterDescription: "ضيّق النتائج فورًا حسب الاسم والفئة ونموذج السعر وحالة الاستخدام.",
      searchLabel: "ابحث عن الأدوات",
      searchPlaceholder: "مثل ChatGPT أو فيديو أو محتوى أو طلاب",
      searchHelp: "ابحث باسم الأداة أو الوصف أو الفئة أو حالة الاستخدام.",
      toolCategoryLabel: "فئة الأداة",
      useCaseLabel: "حالة الاستخدام",
      pricingFilterLabel: "السعر",
      allToolCategoriesLabel: "كل فئات الأدوات",
      allUseCasesLabel: "كل حالات الاستخدام",
      allPricingLabel: "كل الأسعار",
      resetFiltersLabel: "إزالة الفلاتر",
      resultsLabel: "أداة",
      resultsSummaryLabel: "من أصل",
      emptyTitle: "لم يتم العثور على أدوات",
      emptyDescription: "جرّب بحثًا أوسع أو امسح الفلاتر لاكتشاف المزيد.",
      bestForLabel: "الأنسب لـ",
      pageLabel: "الصفحة",
      previousPage: "السابق",
      nextPage: "التالي",
      loadMoreLabel: "تحميل المزيد من الأدوات",
      sortLabel: "الترتيب",
      mostPopularLabel: "الأكثر شعبية",
      highestRatedLabel: "الأعلى تقييمًا",
      newestLabel: "الأحدث",
      freeFirstLabel: "المجانية أولًا",
      paidFirstLabel: "المدفوعة أولًا",
      quickIntentLabel: "استكشاف سريع",
      mobileFiltersLabel: "الفلاتر",
      mobileFiltersCloseLabel: "إغلاق الفلاتر"
    },
    toolDetail: {
      overviewTitle: "نظرة عامة",
      whyItStandsOutTitle: "لماذا يبرز؟",
      prosTitle: "الإيجابيات",
      consTitle: "السلبيات",
      relatedToolsDescription: "تساعد الأدوات الأخرى في الفئات المشابهة على المقارنة بشكل أسرع.",
      backToTools: "العودة إلى كل الأدوات"
    }
  },
  ru: {
    common: {
      categoriesLabel: "Категории",
      toolsLabel: "Инструменты",
      allToolsLabel: "Все инструменты",
      relatedToolsLabel: "Похожие инструменты",
      officialSiteLabel: "Перейти на официальный сайт",
      placeholderLabel: "Скоро",
      breadcrumbsHome: "Главная",
      ratingLabel: "Рейтинг",
      pricingLabel: "Цена",
      featuresLabel: "Ключевые возможности",
      internalLinksLabel: "Внутренние ссылки",
      relatedContentLabel: "Связанный контент",
      categoryTagsLabel: "Категории",
      viewDetailsLabel: "Обзор"
    },
    categoriesIndex: {
      eyebrow: "Центр категорий",
      title: "Структура категорий Deciply",
      description: "Каждая категория оформлена как SEO-дружественный хаб, который связывает релевантные инструменты и гайды.",
      cardLinkLabel: "Открыть категорию"
    },
    categoryDetail: {
      toolsTitle: "Инструменты в этой категории",
      toolsDescription: "Инструменты этой категории показаны в понятной структуре с прямыми ссылками на страницы деталей.",
      relatedTitle: "Связанные гайды и сравнения",
      relatedDescription: "В этом блоке собраны ближайшие по теме гайды и сравнения.",
      internalLinksTitle: "Внутренние ссылки для этой категории",
      internalLinksDescription: "Страницы категорий связывают детали инструментов, гайды и основной каталог через понятный внутренний поток.",
      allToolsLink: "Все инструменты",
      allCategoriesLink: "Ко всем категориям",
      guidesLink: "Перейти к гайдам"
    },
    toolsIndex: {
      eyebrow: "Каталог инструментов",
      title: "Быстрее найдите подходящий AI-инструмент",
      description: "Используйте название инструмента, категорию, цену и сценарий использования, чтобы быстрее найти подходящий вариант.",
      filterTitle: "Поиск и фильтры",
      filterDescription: "Мгновенно уточняйте результаты по названию, категории, цене и сценарию использования.",
      searchLabel: "Поиск инструментов",
      searchPlaceholder: "Например: ChatGPT, видео, контент, студенты",
      searchHelp: "Ищите по названию инструмента, описанию, категории или сценарию использования.",
      toolCategoryLabel: "Категория инструмента",
      useCaseLabel: "Сценарий использования",
      pricingFilterLabel: "Цена",
      allToolCategoriesLabel: "Все категории инструментов",
      allUseCasesLabel: "Все сценарии",
      allPricingLabel: "Все цены",
      resetFiltersLabel: "Сбросить фильтры",
      resultsLabel: "инструментов найдено",
      resultsSummaryLabel: "из",
      emptyTitle: "Инструменты не найдены",
      emptyDescription: "Попробуйте более широкий запрос или очистите фильтры.",
      bestForLabel: "Лучше всего подходит для",
      pageLabel: "Страница",
      previousPage: "Предыдущая",
      nextPage: "Следующая",
      loadMoreLabel: "Показать больше инструментов",
      sortLabel: "Сортировать",
      mostPopularLabel: "Самые популярные",
      highestRatedLabel: "С самым высоким рейтингом",
      newestLabel: "Новые",
      freeFirstLabel: "Сначала бесплатные",
      paidFirstLabel: "Сначала платные",
      quickIntentLabel: "Быстрый обзор",
      mobileFiltersLabel: "Фильтры",
      mobileFiltersCloseLabel: "Закрыть фильтры"
    },
    toolDetail: {
      overviewTitle: "Обзор",
      whyItStandsOutTitle: "Почему выделяется",
      prosTitle: "Плюсы",
      consTitle: "Минусы",
      relatedToolsDescription: "Похожие инструменты помогают быстрее сравнить варианты.",
      backToTools: "Назад ко всем инструментам"
    }
  },
  zh: {
    common: {
      categoriesLabel: "分类",
      toolsLabel: "工具",
      allToolsLabel: "全部工具",
      relatedToolsLabel: "相关工具",
      officialSiteLabel: "访问官网",
      placeholderLabel: "即将推出",
      breadcrumbsHome: "首页",
      ratingLabel: "评分",
      pricingLabel: "价格",
      featuresLabel: "核心功能",
      internalLinksLabel: "站内链接",
      relatedContentLabel: "相关内容",
      categoryTagsLabel: "分类",
      viewDetailsLabel: "查看"
    },
    categoriesIndex: {
      eyebrow: "分类中心",
      title: "Deciply 分类结构",
      description: "每个分类都被设计为一个 SEO 友好的中心，连接相关工具和指南。",
      cardLinkLabel: "打开分类"
    },
    categoryDetail: {
      toolsTitle: "该分类中的工具",
      toolsDescription: "该分类相关工具以清晰结构呈现，并直接连接到详情页。",
      relatedTitle: "相关指南与对比",
      relatedDescription: "此区域会展示同主题下更接近的指南和对比内容。",
      internalLinksTitle: "该分类的站内链接",
      internalLinksDescription: "分类页通过清晰的内链流连接工具详情、指南和主目录。",
      allToolsLink: "查看全部工具",
      allCategoriesLink: "返回全部分类",
      guidesLink: "前往指南"
    },
    toolsIndex: {
      eyebrow: "工具目录",
      title: "更快找到合适的 AI 工具",
      description: "通过工具名称、分类、价格和使用场景筛选，快速找到更适合的工具。",
      filterTitle: "搜索与筛选",
      filterDescription: "按工具名称、分类、价格模型和使用场景即时缩小结果。",
      searchLabel: "搜索工具",
      searchPlaceholder: "例如：ChatGPT、视频、内容、学生",
      searchHelp: "可按工具名称、描述、分类或使用场景搜索。",
      toolCategoryLabel: "工具分类",
      useCaseLabel: "使用场景",
      pricingFilterLabel: "价格",
      allToolCategoriesLabel: "全部工具分类",
      allUseCasesLabel: "全部使用场景",
      allPricingLabel: "全部价格",
      resetFiltersLabel: "清除筛选",
      resultsLabel: "个工具",
      resultsSummaryLabel: "共",
      emptyTitle: "未找到工具",
      emptyDescription: "请尝试更宽泛的搜索或清除筛选条件。",
      bestForLabel: "最适合",
      pageLabel: "页",
      previousPage: "上一页",
      nextPage: "下一页",
      loadMoreLabel: "加载更多工具",
      sortLabel: "排序方式",
      mostPopularLabel: "最热门",
      highestRatedLabel: "评分最高",
      newestLabel: "最新",
      freeFirstLabel: "免费优先",
      paidFirstLabel: "付费优先",
      quickIntentLabel: "快速发现",
      mobileFiltersLabel: "筛选",
      mobileFiltersCloseLabel: "关闭筛选"
    },
    toolDetail: {
      overviewTitle: "概览",
      whyItStandsOutTitle: "为什么值得关注",
      prosTitle: "优点",
      consTitle: "缺点",
      relatedToolsDescription: "相似分类中的其他工具能帮助你更快完成比较。",
      backToTools: "返回全部工具"
    }
  },
  ja: {
    common: {
      categoriesLabel: "カテゴリ",
      toolsLabel: "ツール",
      allToolsLabel: "すべてのツール",
      relatedToolsLabel: "関連ツール",
      officialSiteLabel: "公式サイトへ",
      placeholderLabel: "準備中",
      breadcrumbsHome: "ホーム",
      ratingLabel: "評価",
      pricingLabel: "価格",
      featuresLabel: "主な機能",
      internalLinksLabel: "内部リンク",
      relatedContentLabel: "関連コンテンツ",
      categoryTagsLabel: "カテゴリ",
      viewDetailsLabel: "確認"
    },
    categoriesIndex: {
      eyebrow: "カテゴリハブ",
      title: "Deciply のカテゴリ構造",
      description: "各カテゴリは関連ツールやガイドにつながる SEO フレンドリーなハブとして設計されています。",
      cardLinkLabel: "カテゴリを開く"
    },
    categoryDetail: {
      toolsTitle: "このカテゴリのツール",
      toolsDescription: "このカテゴリに関連するツールを、詳細ページへつながる明確な構造で表示します。",
      relatedTitle: "関連ガイドと比較",
      relatedDescription: "このエリアでは近いテーマのガイドや比較を表示します。",
      internalLinksTitle: "このカテゴリの内部リンク",
      internalLinksDescription: "カテゴリページはツール詳細、ガイド、メインディレクトリを明確な内部導線でつなぎます。",
      allToolsLink: "すべてのツールを見る",
      allCategoriesLink: "すべてのカテゴリに戻る",
      guidesLink: "ガイドへ移動"
    },
    toolsIndex: {
      eyebrow: "ツールディレクトリ",
      title: "最適な AI ツールをすばやく見つける",
      description: "ツール名、カテゴリ、価格、用途で絞り込み、最適なツールにすばやくたどり着けます。",
      filterTitle: "検索とフィルター",
      filterDescription: "ツール名、カテゴリ、価格モデル、用途で結果をすぐに絞り込めます。",
      searchLabel: "ツールを検索",
      searchPlaceholder: "例：ChatGPT、動画、コンテンツ、学生",
      searchHelp: "ツール名、説明、カテゴリ、用途で検索できます。",
      toolCategoryLabel: "ツールカテゴリ",
      useCaseLabel: "用途",
      pricingFilterLabel: "価格",
      allToolCategoriesLabel: "すべてのツールカテゴリ",
      allUseCasesLabel: "すべての用途",
      allPricingLabel: "すべての価格",
      resetFiltersLabel: "フィルターをクリア",
      resultsLabel: "件のツール",
      resultsSummaryLabel: "中",
      emptyTitle: "ツールが見つかりませんでした",
      emptyDescription: "より広い検索語にするか、フィルターをリセットしてください。",
      bestForLabel: "最適な用途",
      pageLabel: "ページ",
      previousPage: "前へ",
      nextPage: "次へ",
      loadMoreLabel: "さらにツールを表示",
      sortLabel: "並び替え",
      mostPopularLabel: "人気順",
      highestRatedLabel: "評価順",
      newestLabel: "新着順",
      freeFirstLabel: "無料優先",
      paidFirstLabel: "有料優先",
      quickIntentLabel: "クイック探索",
      mobileFiltersLabel: "フィルター",
      mobileFiltersCloseLabel: "フィルターを閉じる"
    },
    toolDetail: {
      overviewTitle: "概要",
      whyItStandsOutTitle: "注目される理由",
      prosTitle: "メリット",
      consTitle: "デメリット",
      relatedToolsDescription: "似たカテゴリの他ツールが比較をより早くしてくれます。",
      backToTools: "すべてのツールへ戻る"
    }
  },
  ko: {
    common: {
      categoriesLabel: "카테고리",
      toolsLabel: "도구",
      allToolsLabel: "모든 도구",
      relatedToolsLabel: "관련 도구",
      officialSiteLabel: "공식 사이트 방문",
      placeholderLabel: "준비 중",
      breadcrumbsHome: "홈",
      ratingLabel: "평점",
      pricingLabel: "가격",
      featuresLabel: "주요 기능",
      internalLinksLabel: "내부 링크",
      relatedContentLabel: "관련 콘텐츠",
      categoryTagsLabel: "카테고리",
      viewDetailsLabel: "확인"
    },
    categoriesIndex: {
      eyebrow: "카테고리 허브",
      title: "Deciply 카테고리 구조",
      description: "각 카테고리는 관련 도구와 가이드를 연결하는 SEO 친화적 허브로 설계되었습니다.",
      cardLinkLabel: "카테고리 열기"
    },
    categoryDetail: {
      toolsTitle: "이 카테고리의 도구",
      toolsDescription: "이 카테고리의 도구는 상세 페이지로 바로 연결되는 명확한 구조로 제공됩니다.",
      relatedTitle: "관련 가이드와 비교",
      relatedDescription: "이 영역은 같은 주제의 인접 가이드와 비교를 함께 보여줍니다.",
      internalLinksTitle: "이 카테고리의 내부 링크",
      internalLinksDescription: "카테고리 페이지는 도구 상세, 가이드, 메인 디렉터리를 명확한 내부 흐름으로 연결합니다.",
      allToolsLink: "모든 도구 보기",
      allCategoriesLink: "모든 카테고리로 돌아가기",
      guidesLink: "가이드로 이동"
    },
    toolsIndex: {
      eyebrow: "도구 디렉터리",
      title: "맞는 AI 도구를 더 빠르게 찾기",
      description: "도구 이름, 카테고리, 가격, 사용 목적을 활용해 적합한 도구를 빠르게 찾으세요.",
      filterTitle: "검색 및 필터",
      filterDescription: "도구 이름, 카테고리, 가격 모델, 사용 사례로 결과를 즉시 좁혀보세요.",
      searchLabel: "도구 검색",
      searchPlaceholder: "예: ChatGPT, 비디오, 콘텐츠, 학생",
      searchHelp: "도구 이름, 설명, 카테고리 또는 사용 사례로 검색하세요.",
      toolCategoryLabel: "도구 카테고리",
      useCaseLabel: "사용 사례",
      pricingFilterLabel: "가격",
      allToolCategoriesLabel: "모든 도구 카테고리",
      allUseCasesLabel: "모든 사용 사례",
      allPricingLabel: "모든 가격",
      resetFiltersLabel: "필터 지우기",
      resultsLabel: "개 도구",
      resultsSummaryLabel: "중",
      emptyTitle: "도구를 찾을 수 없습니다",
      emptyDescription: "더 넓은 검색어를 사용하거나 필터를 초기화해 보세요.",
      bestForLabel: "가장 적합한 용도",
      pageLabel: "페이지",
      previousPage: "이전",
      nextPage: "다음",
      loadMoreLabel: "도구 더 보기",
      sortLabel: "정렬",
      mostPopularLabel: "인기순",
      highestRatedLabel: "평점순",
      newestLabel: "최신순",
      freeFirstLabel: "무료 우선",
      paidFirstLabel: "유료 우선",
      quickIntentLabel: "빠른 탐색",
      mobileFiltersLabel: "필터",
      mobileFiltersCloseLabel: "필터 닫기"
    },
    toolDetail: {
      overviewTitle: "개요",
      whyItStandsOutTitle: "주목할 이유",
      prosTitle: "장점",
      consTitle: "단점",
      relatedToolsDescription: "비슷한 카테고리의 다른 도구들이 비교를 더 빠르게 도와줍니다.",
      backToTools: "모든 도구로 돌아가기"
    }
  },
  el: {
    common: {
      categoriesLabel: "Κατηγορίες",
      toolsLabel: "Εργαλεία",
      allToolsLabel: "Όλα τα εργαλεία",
      relatedToolsLabel: "Σχετικά εργαλεία",
      officialSiteLabel: "Επίσκεψη στην επίσημη σελίδα",
      placeholderLabel: "Σύντομα διαθέσιμο",
      breadcrumbsHome: "Αρχική",
      ratingLabel: "Βαθμολογία",
      pricingLabel: "Τιμή",
      featuresLabel: "Βασικά χαρακτηριστικά",
      internalLinksLabel: "Εσωτερικοί σύνδεσμοι",
      relatedContentLabel: "Σχετικό περιεχόμενο",
      categoryTagsLabel: "Κατηγορίες",
      viewDetailsLabel: "Προβολή"
    },
    categoriesIndex: {
      eyebrow: "Κέντρο κατηγοριών",
      title: "Δομή κατηγοριών Deciply",
      description: "Κάθε κατηγορία λειτουργεί ως SEO-friendly κόμβος που συνδέει σχετικά εργαλεία και οδηγούς.",
      cardLinkLabel: "Άνοιγμα κατηγορίας"
    },
    categoryDetail: {
      toolsTitle: "Εργαλεία σε αυτή την κατηγορία",
      toolsDescription: "Τα εργαλεία αυτής της κατηγορίας εμφανίζονται σε καθαρή δομή που οδηγεί απευθείας στις λεπτομέρειες.",
      relatedTitle: "Σχετικοί οδηγοί και συγκρίσεις",
      relatedDescription: "Αυτή η ενότητα εμφανίζει οδηγούς και συγκρίσεις κοντά στο ίδιο θέμα.",
      internalLinksTitle: "Εσωτερικοί σύνδεσμοι για αυτή την κατηγορία",
      internalLinksDescription: "Οι σελίδες κατηγοριών συνδέουν εργαλεία, οδηγούς και τον κύριο κατάλογο με καθαρή ροή.",
      allToolsLink: "Δείτε όλα τα εργαλεία",
      allCategoriesLink: "Επιστροφή σε όλες τις κατηγορίες",
      guidesLink: "Μετάβαση στους οδηγούς"
    },
    toolsIndex: {
      eyebrow: "Κατάλογος εργαλείων",
      title: "Βρες γρηγορότερα το σωστό εργαλείο AI",
      description: "Χρησιμοποίησε όνομα εργαλείου, κατηγορία, τιμή και περίπτωση χρήσης για να φτάσεις στο κατάλληλο εργαλείο πιο γρήγορα.",
      filterTitle: "Αναζήτηση και φίλτρα",
      filterDescription: "Περιορίστε άμεσα τα αποτελέσματα με βάση όνομα, κατηγορία, τιμή και χρήση.",
      searchLabel: "Αναζήτηση εργαλείων",
      searchPlaceholder: "π.χ. ChatGPT, βίντεο, περιεχόμενο, μαθητές",
      searchHelp: "Αναζήτησε με όνομα εργαλείου, περιγραφή, κατηγορία ή περίπτωση χρήσης.",
      toolCategoryLabel: "Κατηγορία εργαλείου",
      useCaseLabel: "Περίπτωση χρήσης",
      pricingFilterLabel: "Τιμή",
      allToolCategoriesLabel: "Όλες οι κατηγορίες εργαλείων",
      allUseCasesLabel: "Όλες οι περιπτώσεις χρήσης",
      allPricingLabel: "Όλες οι τιμές",
      resetFiltersLabel: "Καθαρισμός φίλτρων",
      resultsLabel: "εργαλεία",
      resultsSummaryLabel: "από",
      emptyTitle: "Δεν βρέθηκαν εργαλεία",
      emptyDescription: "Δοκίμασε πιο γενική αναζήτηση ή καθάρισε τα φίλτρα.",
      bestForLabel: "Κατάλληλο για",
      pageLabel: "Σελίδα",
      previousPage: "Προηγούμενη",
      nextPage: "Επόμενη",
      loadMoreLabel: "Φόρτωση περισσότερων εργαλείων",
      sortLabel: "Ταξινόμηση",
      mostPopularLabel: "Πιο δημοφιλή",
      highestRatedLabel: "Υψηλότερη βαθμολογία",
      newestLabel: "Νεότερα",
      freeFirstLabel: "Δωρεάν πρώτα",
      paidFirstLabel: "Πληρωμένα πρώτα",
      quickIntentLabel: "Γρήγορη ανακάλυψη",
      mobileFiltersLabel: "Φίλτρα",
      mobileFiltersCloseLabel: "Κλείσιμο φίλτρων"
    },
    toolDetail: {
      overviewTitle: "Επισκόπηση",
      whyItStandsOutTitle: "Γιατί ξεχωρίζει",
      prosTitle: "Πλεονεκτήματα",
      consTitle: "Μειονεκτήματα",
      relatedToolsDescription: "Άλλα εργαλεία σε παρόμοιες κατηγορίες βοηθούν τη σύγκριση πιο γρήγορα.",
      backToTools: "Επιστροφή σε όλα τα εργαλεία"
    }
  },
  da: {
    common: {
      categoriesLabel: "Kategorier",
      toolsLabel: "Værktøjer",
      allToolsLabel: "Alle værktøjer",
      relatedToolsLabel: "Relaterede værktøjer",
      officialSiteLabel: "Besøg det officielle website",
      placeholderLabel: "Kommer snart",
      breadcrumbsHome: "Forside",
      ratingLabel: "Bedømmelse",
      pricingLabel: "Pris",
      featuresLabel: "Nøglefunktioner",
      internalLinksLabel: "Interne links",
      relatedContentLabel: "Relateret indhold",
      categoryTagsLabel: "Kategorier",
      viewDetailsLabel: "Se"
    },
    categoriesIndex: {
      eyebrow: "Kategoricenter",
      title: "Deciplys kategoristruktur",
      description: "Hver kategori er designet som et SEO-venligt knudepunkt, der forbinder relevante værktøjer og guides.",
      cardLinkLabel: "Åbn kategori"
    },
    categoryDetail: {
      toolsTitle: "Værktøjer i denne kategori",
      toolsDescription: "Værktøjerne i denne kategori vises i en tydelig struktur, der linker direkte til detaljesider.",
      relatedTitle: "Relaterede guides og sammenligninger",
      relatedDescription: "Dette område viser de nærmeste guides og sammenligninger til samme emne.",
      internalLinksTitle: "Interne links til denne kategori",
      internalLinksDescription: "Kategorisider forbinder værktøjer, guides og hovedkataloget med et tydeligt internt flow.",
      allToolsLink: "Se alle værktøjer",
      allCategoriesLink: "Tilbage til alle kategorier",
      guidesLink: "Gå til guides"
    },
    toolsIndex: {
      eyebrow: "Værktøjskatalog",
      title: "Find det rigtige AI-værktøj hurtigere",
      description: "Brug værktøjsnavn, kategori, pris og brugsscenarie til hurtigt at finde det rigtige match.",
      filterTitle: "Søgning og filtre",
      filterDescription: "Afgræns resultater med det samme efter navn, kategori, pris og brugsscenarie.",
      searchLabel: "Søg værktøjer",
      searchPlaceholder: "fx ChatGPT, video, indhold, studerende",
      searchHelp: "Søg efter værktøjsnavn, beskrivelse, kategori eller brugsscenarie.",
      toolCategoryLabel: "Værktøjskategori",
      useCaseLabel: "Brugsscenarie",
      pricingFilterLabel: "Pris",
      allToolCategoriesLabel: "Alle værktøjskategorier",
      allUseCasesLabel: "Alle brugsscenarier",
      allPricingLabel: "Alle priser",
      resetFiltersLabel: "Nulstil filtre",
      resultsLabel: "værktøjer fundet",
      resultsSummaryLabel: "ud af",
      emptyTitle: "Ingen værktøjer fundet",
      emptyDescription: "Prøv en bredere søgning eller nulstil filtrene.",
      bestForLabel: "Bedst til",
      pageLabel: "Side",
      previousPage: "Forrige",
      nextPage: "Næste",
      loadMoreLabel: "Indlæs flere værktøjer",
      sortLabel: "Sorter efter",
      mostPopularLabel: "Mest populære",
      highestRatedLabel: "Højest bedømte",
      newestLabel: "Nyeste",
      freeFirstLabel: "Gratis først",
      paidFirstLabel: "Betalte først",
      quickIntentLabel: "Hurtig opdagelse",
      mobileFiltersLabel: "Filtre",
      mobileFiltersCloseLabel: "Luk filtre"
    },
    toolDetail: {
      overviewTitle: "Oversigt",
      whyItStandsOutTitle: "Hvorfor skiller det sig ud?",
      prosTitle: "Fordele",
      consTitle: "Ulemper",
      relatedToolsDescription: "Andre værktøjer i lignende kategorier gør sammenligningen hurtigere.",
      backToTools: "Tilbage til alle værktøjer"
    }
  },
  fa: {
    common: {
      categoriesLabel: "دسته‌ها",
      toolsLabel: "ابزارها",
      allToolsLabel: "همه ابزارها",
      relatedToolsLabel: "ابزارهای مرتبط",
      officialSiteLabel: "بازدید از سایت رسمی",
      placeholderLabel: "به‌زودی",
      breadcrumbsHome: "خانه",
      ratingLabel: "امتیاز",
      pricingLabel: "قیمت",
      featuresLabel: "ویژگی‌های کلیدی",
      internalLinksLabel: "لینک‌های داخلی",
      relatedContentLabel: "محتوای مرتبط",
      categoryTagsLabel: "دسته‌ها",
      viewDetailsLabel: "بررسی"
    },
    categoriesIndex: {
      eyebrow: "مرکز دسته‌ها",
      title: "ساختار دسته‌بندی Deciply",
      description: "هر دسته به‌عنوان یک هاب سازگار با SEO طراحی شده که ابزارها و راهنماهای مرتبط را به هم وصل می‌کند.",
      cardLinkLabel: "باز کردن دسته"
    },
    categoryDetail: {
      toolsTitle: "ابزارهای این دسته",
      toolsDescription: "ابزارهای این دسته در ساختاری روشن نمایش داده می‌شوند که مستقیماً به صفحات جزئیات وصل می‌شود.",
      relatedTitle: "راهنماها و مقایسه‌های مرتبط",
      relatedDescription: "این بخش راهنماها و مقایسه‌های نزدیک به همین موضوع را نشان می‌دهد.",
      internalLinksTitle: "لینک‌های داخلی این دسته",
      internalLinksDescription: "صفحات دسته‌بندی ابزارها، راهنماها و دایرکتوری اصلی را با یک جریان داخلی روشن به هم متصل می‌کنند.",
      allToolsLink: "مشاهده همه ابزارها",
      allCategoriesLink: "بازگشت به همه دسته‌ها",
      guidesLink: "رفتن به راهنماها"
    },
    toolsIndex: {
      eyebrow: "دایرکتوری ابزارها",
      title: "ابزار مناسب AI را سریع‌تر پیدا کنید",
      description: "با استفاده از نام ابزار، دسته، قیمت و سناریوی استفاده، سریع‌تر به گزینه مناسب برسید.",
      filterTitle: "جستجو و فیلترها",
      filterDescription: "نتایج را بلافاصله بر اساس نام، دسته، مدل قیمت و سناریوی استفاده محدود کنید.",
      searchLabel: "جستجوی ابزارها",
      searchPlaceholder: "مثلاً ChatGPT، ویدئو، محتوا، دانشجو",
      searchHelp: "با نام ابزار، توضیح، دسته یا سناریوی استفاده جستجو کنید.",
      toolCategoryLabel: "دسته ابزار",
      useCaseLabel: "سناریوی استفاده",
      pricingFilterLabel: "قیمت",
      allToolCategoriesLabel: "همه دسته‌های ابزار",
      allUseCasesLabel: "همه سناریوهای استفاده",
      allPricingLabel: "همه قیمت‌ها",
      resetFiltersLabel: "پاک کردن فیلترها",
      resultsLabel: "ابزار پیدا شد",
      resultsSummaryLabel: "از",
      emptyTitle: "ابزاری پیدا نشد",
      emptyDescription: "یک جستجوی گسترده‌تر انجام دهید یا فیلترها را پاک کنید.",
      bestForLabel: "مناسب برای",
      pageLabel: "صفحه",
      previousPage: "قبلی",
      nextPage: "بعدی",
      loadMoreLabel: "بارگذاری ابزارهای بیشتر",
      sortLabel: "مرتب‌سازی",
      mostPopularLabel: "محبوب‌ترین",
      highestRatedLabel: "بالاترین امتیاز",
      newestLabel: "جدیدترین",
      freeFirstLabel: "رایگان‌ها اول",
      paidFirstLabel: "پولی‌ها اول",
      quickIntentLabel: "کشف سریع",
      mobileFiltersLabel: "فیلترها",
      mobileFiltersCloseLabel: "بستن فیلترها"
    },
    toolDetail: {
      overviewTitle: "نمای کلی",
      whyItStandsOutTitle: "چرا برجسته است؟",
      prosTitle: "نقاط قوت",
      consTitle: "نقاط ضعف",
      relatedToolsDescription: "ابزارهای دیگر در دسته‌های مشابه مقایسه را سریع‌تر می‌کنند.",
      backToTools: "بازگشت به همه ابزارها"
    }
  }
};
