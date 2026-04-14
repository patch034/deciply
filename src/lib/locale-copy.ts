import type { ContentLocale, Locale, SupportedLocale } from "@/i18n/config";

type Replacement = [pattern: RegExp, replacement: string];

const replacementMap: Partial<Record<SupportedLocale, Replacement[]>> = {
  ar: [
    [/\bAI tools and SaaS directory\b/gi, "دليل أدوات الذكاء الاصطناعي وSaaS"],
    [/\bAI tool directory\b/gi, "دليل أدوات الذكاء الاصطناعي"],
    [/\bAI Tools Directory\b/gi, "دليل أدوات الذكاء الاصطناعي"],
    [/\bCategories\b/gi, "الفئات"],
    [/\bTools\b/gi, "الأدوات"],
    [/\bComparisons\b/gi, "المقارنات"],
    [/\bBlog\b/gi, "المدونة"],
    [/\bAI News\b/gi, "أخبار الذكاء الاصطناعي"],
    [/\bFind the right AI tool faster\b/gi, "اعثر على أداة الذكاء الاصطناعي المناسبة بسرعة"],
    [/\bSearch and filters\b/gi, "البحث والتصفية"],
    [/\bSearch tools\b/gi, "ابحث في الأدوات"],
    [/\bSearch by tool name, description, category, or use case\./gi, "ابحث باسم الأداة أو الوصف أو الفئة أو حالة الاستخدام."],
    [/\bUse case\b/gi, "حالة الاستخدام"],
    [/\bPricing\b/gi, "السعر"],
    [/\bPrevious\b/gi, "السابق"],
    [/\bNext\b/gi, "التالي"],
    [/\bRead more\b/gi, "اقرأ المزيد"],
    [/\bReview\b/gi, "مراجعة"],
    [/\bOverview\b/gi, "نظرة عامة"],
    [/\bPros\b/gi, "الإيجابيات"],
    [/\bCons\b/gi, "السلبيات"],
    [/\bRelated tools\b/gi, "الأدوات ذات الصلة"],
    [/\bRelated guides\b/gi, "الأدلة ذات الصلة"],
    [/\bBack to all articles\b/gi, "العودة إلى جميع المقالات"],
    [/\bOpen comparison\b/gi, "افتح المقارنة"],
    [/\bOpen the related tool\b/gi, "افتح الأداة المرتبطة"],
    [/\bOpen related comparisons\b/gi, "افتح المقارنات المرتبطة"],
    [/\bOpen the tool that matches your workflow\b/gi, "افتح الأداة التي تناسب سير عملك"],
    [/\bThis page helps you compare\b/gi, "تساعدك هذه الصفحة على مقارنة"],
    [/\bWhat is this page about\?\b/gi, "ما الذي تتحدث عنه هذه الصفحة؟"],
    [/\bWhy does it matter\?\b/gi, "لماذا هذا مهم؟"],
    [/\bWho is it for\?\b/gi, "لمن هذه الصفحة؟"],
    [/\bHow should you choose\?\b/gi, "كيف تختار؟"],
    [/\bUse cases\b/gi, "حالات الاستخدام"],
    [/\bTools mentioned in this guide\b/gi, "الأدوات المذكورة في هذا الدليل"],
    [/\bBest AI tools for\b/gi, "أفضل أدوات الذكاء الاصطناعي لـ"],
    [/\bCompare AI tools by real use case\b/gi, "قارن أدوات الذكاء الاصطناعي حسب حالة الاستخدام الفعلية"],
    [/\bCompare AI tools, explore real use cases, and choose the right tool faster with Deciply\./gi, "قارن أدوات الذكاء الاصطناعي، واستكشف حالات الاستخدام الحقيقية، واختر الأداة المناسبة بسرعة أكبر مع Deciply."]
  ],
  ru: [
    [/\bAI tools and SaaS directory\b/gi, "Каталог AI‑инструментов и SaaS"],
    [/\bAI tool directory\b/gi, "Каталог AI‑инструментов"],
    [/\bAI Tools Directory\b/gi, "Каталог AI‑инструментов"],
    [/\bCategories\b/gi, "Категории"],
    [/\bTools\b/gi, "Инструменты"],
    [/\bComparisons\b/gi, "Сравнения"],
    [/\bBlog\b/gi, "Блог"],
    [/\bAI News\b/gi, "Новости AI"],
    [/\bFind the right AI tool faster\b/gi, "Быстрее находите подходящий AI‑инструмент"],
    [/\bSearch and filters\b/gi, "Поиск и фильтры"],
    [/\bSearch tools\b/gi, "Поиск инструментов"],
    [/\bSearch by tool name, description, category, or use case\./gi, "Ищите по названию, описанию, категории или сценарию использования."],
    [/\bUse case\b/gi, "Сценарий использования"],
    [/\bPricing\b/gi, "Цена"],
    [/\bPrevious\b/gi, "Предыдущая"],
    [/\bNext\b/gi, "Следующая"],
    [/\bRead more\b/gi, "Читать далее"],
    [/\bReview\b/gi, "Обзор"],
    [/\bOverview\b/gi, "Обзор"],
    [/\bPros\b/gi, "Плюсы"],
    [/\bCons\b/gi, "Минусы"],
    [/\bRelated tools\b/gi, "Похожие инструменты"],
    [/\bRelated guides\b/gi, "Похожие руководства"],
    [/\bBack to all articles\b/gi, "Назад ко всем статьям"],
    [/\bOpen comparison\b/gi, "Открыть сравнение"],
    [/\bOpen the related tool\b/gi, "Открыть связанный инструмент"],
    [/\bOpen related comparisons\b/gi, "Открыть связанные сравнения"],
    [/\bOpen the tool that matches your workflow\b/gi, "Откройте инструмент, который подходит вашему процессу"],
    [/\bThis page helps you compare\b/gi, "Эта страница помогает сравнить"],
    [/\bWhat is this page about\?\b/gi, "О чём эта страница?"],
    [/\bWhy does it matter\?\b/gi, "Почему это важно?"],
    [/\bWho is it for\?\b/gi, "Для кого это?"],
    [/\bHow should you choose\?\b/gi, "Как выбрать?"],
    [/\bUse cases\b/gi, "Сценарии использования"],
    [/\bTools mentioned in this guide\b/gi, "Инструменты, упомянутые в этом руководстве"],
    [/\bBest AI tools for\b/gi, "Лучшие AI‑инструменты для"],
    [/\bCompare AI tools by real use case\b/gi, "Сравнивайте AI‑инструменты по реальному сценарию использования"],
    [/\bCompare AI tools, explore real use cases, and choose the right tool faster with Deciply\./gi, "Сравнивайте AI‑инструменты, изучайте реальные сценарии и быстрее выбирайте подходящий вариант с Deciply."]
  ],
  zh: [
    [/\bAI tools and SaaS directory\b/gi, "AI 工具与 SaaS 目录"],
    [/\bAI tool directory\b/gi, "AI 工具目录"],
    [/\bAI Tools Directory\b/gi, "AI 工具目录"],
    [/\bCategories\b/gi, "分类"],
    [/\bTools\b/gi, "工具"],
    [/\bComparisons\b/gi, "对比"],
    [/\bBlog\b/gi, "博客"],
    [/\bAI News\b/gi, "AI 新闻"],
    [/\bFind the right AI tool faster\b/gi, "更快找到合适的 AI 工具"],
    [/\bSearch and filters\b/gi, "搜索与筛选"],
    [/\bSearch tools\b/gi, "搜索工具"],
    [/\bSearch by tool name, description, category, or use case\./gi, "按工具名称、描述、分类或使用场景搜索。"],
    [/\bUse case\b/gi, "使用场景"],
    [/\bPricing\b/gi, "价格"],
    [/\bPrevious\b/gi, "上一页"],
    [/\bNext\b/gi, "下一页"],
    [/\bRead more\b/gi, "阅读更多"],
    [/\bReview\b/gi, "查看"],
    [/\bOverview\b/gi, "概览"],
    [/\bPros\b/gi, "优点"],
    [/\bCons\b/gi, "缺点"],
    [/\bRelated tools\b/gi, "相关工具"],
    [/\bRelated guides\b/gi, "相关指南"],
    [/\bBack to all articles\b/gi, "返回全部文章"],
    [/\bOpen comparison\b/gi, "打开对比"],
    [/\bOpen the related tool\b/gi, "打开相关工具"],
    [/\bOpen related comparisons\b/gi, "打开相关对比"],
    [/\bOpen the tool that matches your workflow\b/gi, "打开最符合你工作流的工具"],
    [/\bThis page helps you compare\b/gi, "本页帮助你比较"],
    [/\bWhat is this page about\?\b/gi, "本页内容是什么？"],
    [/\bWhy does it matter\?\b/gi, "为什么这很重要？"],
    [/\bWho is it for\?\b/gi, "适合谁？"],
    [/\bHow should you choose\?\b/gi, "该如何选择？"],
    [/\bUse cases\b/gi, "使用场景"],
    [/\bTools mentioned in this guide\b/gi, "本指南提到的工具"],
    [/\bBest AI tools for\b/gi, "适合……的最佳 AI 工具"],
    [/\bCompare AI tools by real use case\b/gi, "按真实使用场景比较 AI 工具"],
    [/\bCompare AI tools, explore real use cases, and choose the right tool faster with Deciply\./gi, "比较 AI 工具、探索真实使用场景，并借助 Deciply 更快选出合适工具。"]
  ],
  ja: [
    [/\bAI tools and SaaS directory\b/gi, "AIツールとSaaSのディレクトリ"],
    [/\bAI tool directory\b/gi, "AIツールのディレクトリ"],
    [/\bAI Tools Directory\b/gi, "AIツールのディレクトリ"],
    [/\bCategories\b/gi, "カテゴリー"],
    [/\bTools\b/gi, "ツール"],
    [/\bComparisons\b/gi, "比較"],
    [/\bBlog\b/gi, "ブログ"],
    [/\bAI News\b/gi, "AIニュース"],
    [/\bFind the right AI tool faster\b/gi, "最適なAIツールをより速く見つける"],
    [/\bSearch and filters\b/gi, "検索とフィルター"],
    [/\bSearch tools\b/gi, "ツールを検索"],
    [/\bSearch by tool name, description, category, or use case\./gi, "ツール名、説明、カテゴリー、用途で検索できます。"],
    [/\bUse case\b/gi, "用途"],
    [/\bPricing\b/gi, "価格"],
    [/\bPrevious\b/gi, "前へ"],
    [/\bNext\b/gi, "次へ"],
    [/\bRead more\b/gi, "続きを読む"],
    [/\bReview\b/gi, "レビュー"],
    [/\bOverview\b/gi, "概要"],
    [/\bPros\b/gi, "強み"],
    [/\bCons\b/gi, "弱み"],
    [/\bRelated tools\b/gi, "関連ツール"],
    [/\bRelated guides\b/gi, "関連ガイド"],
    [/\bBack to all articles\b/gi, "すべての記事に戻る"],
    [/\bOpen comparison\b/gi, "比較を開く"],
    [/\bOpen the related tool\b/gi, "関連ツールを開く"],
    [/\bOpen related comparisons\b/gi, "関連比較を開く"],
    [/\bOpen the tool that matches your workflow\b/gi, "あなたの作業に合うツールを開く"],
    [/\bThis page helps you compare\b/gi, "このページでは比較できます"],
    [/\bWhat is this page about\?\b/gi, "このページは何についてですか？"],
    [/\bWhy does it matter\?\b/gi, "なぜ重要ですか？"],
    [/\bWho is it for\?\b/gi, "誰向けですか？"],
    [/\bHow should you choose\?\b/gi, "どう選ぶべきですか？"],
    [/\bUse cases\b/gi, "活用例"],
    [/\bTools mentioned in this guide\b/gi, "このガイドで紹介したツール"],
    [/\bBest AI tools for\b/gi, "〜に最適なAIツール"],
    [/\bCompare AI tools by real use case\b/gi, "実際の用途でAIツールを比較する"],
    [/\bCompare AI tools, explore real use cases, and choose the right tool faster with Deciply\./gi, "AIツールを比較し、実際の用途を確認して、Deciplyでより速く最適なツールを選びましょう。"]
  ],
  ko: [
    [/\bAI tools and SaaS directory\b/gi, "AI 도구 및 SaaS 디렉터리"],
    [/\bAI tool directory\b/gi, "AI 도구 디렉터리"],
    [/\bAI Tools Directory\b/gi, "AI 도구 디렉터리"],
    [/\bCategories\b/gi, "카테고리"],
    [/\bTools\b/gi, "도구"],
    [/\bComparisons\b/gi, "비교"],
    [/\bBlog\b/gi, "블로그"],
    [/\bAI News\b/gi, "AI 뉴스"],
    [/\bFind the right AI tool faster\b/gi, "더 빠르게 맞는 AI 도구 찾기"],
    [/\bSearch and filters\b/gi, "검색 및 필터"],
    [/\bSearch tools\b/gi, "도구 검색"],
    [/\bSearch by tool name, description, category, or use case\./gi, "도구 이름, 설명, 카테고리 또는 사용 사례로 검색하세요."],
    [/\bUse case\b/gi, "사용 사례"],
    [/\bPricing\b/gi, "가격"],
    [/\bPrevious\b/gi, "이전"],
    [/\bNext\b/gi, "다음"],
    [/\bRead more\b/gi, "더 읽기"],
    [/\bReview\b/gi, "검토"],
    [/\bOverview\b/gi, "개요"],
    [/\bPros\b/gi, "장점"],
    [/\bCons\b/gi, "단점"],
    [/\bRelated tools\b/gi, "관련 도구"],
    [/\bRelated guides\b/gi, "관련 가이드"],
    [/\bBack to all articles\b/gi, "모든 글로 돌아가기"],
    [/\bOpen comparison\b/gi, "비교 열기"],
    [/\bOpen the related tool\b/gi, "관련 도구 열기"],
    [/\bOpen related comparisons\b/gi, "관련 비교 열기"],
    [/\bOpen the tool that matches your workflow\b/gi, "작업 흐름에 맞는 도구 열기"],
    [/\bThis page helps you compare\b/gi, "이 페이지는 비교를 돕습니다"],
    [/\bWhat is this page about\?\b/gi, "이 페이지는 무엇에 관한 것인가요?"],
    [/\bWhy does it matter\?\b/gi, "왜 중요한가요?"],
    [/\bWho is it for\?\b/gi, "누구를 위한 것인가요?"],
    [/\bHow should you choose\?\b/gi, "어떻게 선택해야 하나요?"],
    [/\bUse cases\b/gi, "사용 사례"],
    [/\bTools mentioned in this guide\b/gi, "이 가이드에서 언급된 도구"],
    [/\bBest AI tools for\b/gi, "다음에 가장 적합한 AI 도구"],
    [/\bCompare AI tools by real use case\b/gi, "실제 사용 사례로 AI 도구 비교하기"],
    [/\bCompare AI tools, explore real use cases, and choose the right tool faster with Deciply\./gi, "AI 도구를 비교하고 실제 사용 사례를 살펴보며 Deciply로 더 빠르게 적합한 도구를 선택하세요."]
  ],
  el: [
    [/\bAI tools and SaaS directory\b/gi, "Κατάλογος εργαλείων AI και SaaS"],
    [/\bAI tool directory\b/gi, "Κατάλογος εργαλείων AI"],
    [/\bAI Tools Directory\b/gi, "Κατάλογος εργαλείων AI"],
    [/\bCategories\b/gi, "Κατηγορίες"],
    [/\bTools\b/gi, "Εργαλεία"],
    [/\bComparisons\b/gi, "Συγκρίσεις"],
    [/\bBlog\b/gi, "Blog"],
    [/\bAI News\b/gi, "Νέα AI"],
    [/\bFind the right AI tool faster\b/gi, "Βρείτε πιο γρήγορα το κατάλληλο εργαλείο AI"],
    [/\bSearch and filters\b/gi, "Αναζήτηση και φίλτρα"],
    [/\bSearch tools\b/gi, "Αναζήτηση εργαλείων"],
    [/\bSearch by tool name, description, category, or use case\./gi, "Αναζητήστε με όνομα εργαλείου, περιγραφή, κατηγορία ή χρήση."],
    [/\bUse case\b/gi, "Χρήση"],
    [/\bPricing\b/gi, "Τιμή"],
    [/\bPrevious\b/gi, "Προηγούμενη"],
    [/\bNext\b/gi, "Επόμενη"],
    [/\bRead more\b/gi, "Διαβάστε περισσότερα"],
    [/\bReview\b/gi, "Αξιολόγηση"],
    [/\bOverview\b/gi, "Επισκόπηση"],
    [/\bPros\b/gi, "Πλεονεκτήματα"],
    [/\bCons\b/gi, "Μειονεκτήματα"],
    [/\bRelated tools\b/gi, "Σχετικά εργαλεία"],
    [/\bRelated guides\b/gi, "Σχετικοί οδηγοί"],
    [/\bBack to all articles\b/gi, "Πίσω σε όλα τα άρθρα"],
    [/\bOpen comparison\b/gi, "Άνοιγμα σύγκρισης"],
    [/\bOpen the related tool\b/gi, "Άνοιγμα σχετικού εργαλείου"],
    [/\bOpen related comparisons\b/gi, "Άνοιγμα σχετικών συγκρίσεων"],
    [/\bOpen the tool that matches your workflow\b/gi, "Ανοίξτε το εργαλείο που ταιριάζει στη ροή σας"],
    [/\bThis page helps you compare\b/gi, "Αυτή η σελίδα σας βοηθά να συγκρίνετε"],
    [/\bWhat is this page about\?\b/gi, "Για τι μιλά αυτή η σελίδα;"],
    [/\bWhy does it matter\?\b/gi, "Γιατί έχει σημασία;"],
    [/\bWho is it for\?\b/gi, "Σε ποιον απευθύνεται;"],
    [/\bHow should you choose\?\b/gi, "Πώς να επιλέξετε;"],
    [/\bUse cases\b/gi, "Χρήσεις"],
    [/\bTools mentioned in this guide\b/gi, "Εργαλεία που αναφέρονται σε αυτόν τον οδηγό"],
    [/\bBest AI tools for\b/gi, "Καλύτερα εργαλεία AI για"],
    [/\bCompare AI tools by real use case\b/gi, "Συγκρίνετε εργαλεία AI με βάση την πραγματική χρήση"],
    [/\bCompare AI tools, explore real use cases, and choose the right tool faster with Deciply\./gi, "Συγκρίνετε εργαλεία AI, εξερευνήστε πραγματικές χρήσεις και επιλέξτε γρηγορότερα το σωστό εργαλείο με το Deciply."]
  ],
  da: [
    [/\bAI tools and SaaS directory\b/gi, "AI-værktøjs- og SaaS-katalog"],
    [/\bAI tool directory\b/gi, "AI-værktøjs-katalog"],
    [/\bAI Tools Directory\b/gi, "AI-værktøjs-katalog"],
    [/\bCategories\b/gi, "Kategorier"],
    [/\bTools\b/gi, "Værktøjer"],
    [/\bComparisons\b/gi, "Sammenligninger"],
    [/\bBlog\b/gi, "Blog"],
    [/\bAI News\b/gi, "AI-nyheder"],
    [/\bFind the right AI tool faster\b/gi, "Find hurtigere det rigtige AI-værktøj"],
    [/\bSearch and filters\b/gi, "Søgning og filtre"],
    [/\bSearch tools\b/gi, "Søg værktøjer"],
    [/\bSearch by tool name, description, category, or use case\./gi, "Søg efter navn, beskrivelse, kategori eller brugsscenarie."],
    [/\bUse case\b/gi, "Brugsscenarie"],
    [/\bPricing\b/gi, "Pris"],
    [/\bPrevious\b/gi, "Forrige"],
    [/\bNext\b/gi, "Næste"],
    [/\bRead more\b/gi, "Læs mere"],
    [/\bReview\b/gi, "Gennemgå"],
    [/\bOverview\b/gi, "Oversigt"],
    [/\bPros\b/gi, "Fordele"],
    [/\bCons\b/gi, "Ulemper"],
    [/\bRelated tools\b/gi, "Relaterede værktøjer"],
    [/\bRelated guides\b/gi, "Relaterede guides"],
    [/\bBack to all articles\b/gi, "Tilbage til alle artikler"],
    [/\bOpen comparison\b/gi, "Åbn sammenligning"],
    [/\bOpen the related tool\b/gi, "Åbn det relaterede værktøj"],
    [/\bOpen related comparisons\b/gi, "Åbn relaterede sammenligninger"],
    [/\bOpen the tool that matches your workflow\b/gi, "Åbn værktøjet, der passer til din arbejdsproces"],
    [/\bThis page helps you compare\b/gi, "Denne side hjælper dig med at sammenligne"],
    [/\bWhat is this page about\?\b/gi, "Hvad handler denne side om?"],
    [/\bWhy does it matter\?\b/gi, "Hvorfor er det vigtigt?"],
    [/\bWho is it for\?\b/gi, "Hvem er det til?"],
    [/\bHow should you choose\?\b/gi, "Hvordan bør du vælge?"],
    [/\bUse cases\b/gi, "Brugsscenarier"],
    [/\bTools mentioned in this guide\b/gi, "Værktøjer nævnt i denne guide"],
    [/\bBest AI tools for\b/gi, "Bedste AI-værktøjer til"],
    [/\bCompare AI tools by real use case\b/gi, "Sammenlign AI-værktøjer efter reel brug"],
    [/\bCompare AI tools, explore real use cases, and choose the right tool faster with Deciply\./gi, "Sammenlign AI-værktøjer, udforsk reelle brugsscenarier, og vælg hurtigere det rigtige værktøj med Deciply."]
  ],
  fa: [
    [/\bAI tools and SaaS directory\b/gi, "دایرکتوری ابزارهای هوش مصنوعی و SaaS"],
    [/\bAI tool directory\b/gi, "دایرکتوری ابزارهای هوش مصنوعی"],
    [/\bAI Tools Directory\b/gi, "دایرکتوری ابزارهای هوش مصنوعی"],
    [/\bCategories\b/gi, "دسته‌ها"],
    [/\bTools\b/gi, "ابزارها"],
    [/\bComparisons\b/gi, "مقایسه‌ها"],
    [/\bBlog\b/gi, "وبلاگ"],
    [/\bAI News\b/gi, "اخبار هوش مصنوعی"],
    [/\bFind the right AI tool faster\b/gi, "ابزار مناسب هوش مصنوعی را سریع‌تر پیدا کنید"],
    [/\bSearch and filters\b/gi, "جستجو و فیلترها"],
    [/\bSearch tools\b/gi, "جستجوی ابزارها"],
    [/\bSearch by tool name, description, category, or use case\./gi, "بر اساس نام ابزار، توضیح، دسته یا کاربرد جستجو کنید."],
    [/\bUse case\b/gi, "کاربرد"],
    [/\bPricing\b/gi, "قیمت"],
    [/\bPrevious\b/gi, "قبلی"],
    [/\bNext\b/gi, "بعدی"],
    [/\bRead more\b/gi, "ادامه مطلب"],
    [/\bReview\b/gi, "بررسی"],
    [/\bOverview\b/gi, "نمای کلی"],
    [/\bPros\b/gi, "نقاط قوت"],
    [/\bCons\b/gi, "نقاط ضعف"],
    [/\bRelated tools\b/gi, "ابزارهای مرتبط"],
    [/\bRelated guides\b/gi, "راهنماهای مرتبط"],
    [/\bBack to all articles\b/gi, "بازگشت به همه مقاله‌ها"],
    [/\bOpen comparison\b/gi, "باز کردن مقایسه"],
    [/\bOpen the related tool\b/gi, "باز کردن ابزار مرتبط"],
    [/\bOpen related comparisons\b/gi, "باز کردن مقایسه‌های مرتبط"],
    [/\bOpen the tool that matches your workflow\b/gi, "ابزاری را باز کنید که با جریان کاری شما سازگار است"],
    [/\bThis page helps you compare\b/gi, "این صفحه به شما کمک می‌کند مقایسه کنید"],
    [/\bWhat is this page about\?\b/gi, "این صفحه درباره چیست؟"],
    [/\bWhy does it matter\?\b/gi, "چرا مهم است؟"],
    [/\bWho is it for\?\b/gi, "مناسب چه کسانی است؟"],
    [/\bHow should you choose\?\b/gi, "چطور باید انتخاب کنید؟"],
    [/\bUse cases\b/gi, "موارد استفاده"],
    [/\bTools mentioned in this guide\b/gi, "ابزارهای ذکرشده در این راهنما"],
    [/\bBest AI tools for\b/gi, "بهترین ابزارهای هوش مصنوعی برای"],
    [/\bCompare AI tools by real use case\b/gi, "ابزارهای هوش مصنوعی را بر اساس کاربرد واقعی مقایسه کنید"],
    [/\bCompare AI tools, explore real use cases, and choose the right tool faster with Deciply\./gi, "ابزارهای هوش مصنوعی را مقایسه کنید، کاربردهای واقعی را بررسی کنید و با Deciply سریع‌تر ابزار مناسب را انتخاب کنید."]
  ]
};

function applyReplacements(value: string, replacements: Replacement[]) {
  return replacements.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), value);
}

function shouldSkipLocalization(value: string) {
  return /^(?:https?:\/\/|\/|mailto:|tel:)/i.test(value);
}

export function localizeString(locale: SupportedLocale, value: string): string {
  if (!value || locale === "tr" || locale === "en" || shouldSkipLocalization(value)) {
    return value;
  }

  const replacements = replacementMap[locale];
  if (!replacements) {
    return value;
  }

  return applyReplacements(value, replacements);
}

export function localizeTree<T>(locale: SupportedLocale, value: T): T {
  if (typeof value === "string") {
    return localizeString(locale, value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeTree(locale, item)) as T;
  }

  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};

    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      output[key] = localizeTree(locale, item);
    }

    return output as T;
  }

  return value;
}

export function localizeLocaleRecord<T>(locale: SupportedLocale, record: Record<ContentLocale, T>): T {
  const baseLocale: ContentLocale = locale === "tr" ? "tr" : "en";
  return localizeTree(locale, record[baseLocale]);
}

export function getContentBaseLocale(locale: SupportedLocale): ContentLocale {
  return locale === "tr" ? "tr" : "en";
}
