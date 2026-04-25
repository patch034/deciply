import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;

export type HomePreviewItem = {
  slug: string;
  title: string;
  excerpt: string;
};

type LocalizedPreviewItem = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
};

const HOMEPAGE_BLOG_PREVIEWS: LocalizedPreviewItem[] = [
  {
    slug: "grok-alternatifleri-en-iyi-ai-araclari-2026",
    title: {
      tr: "2026'da Grok alternatifleri için en iyi AI araçları",
      en: "Best AI tools to use instead of Grok in 2026",
      ar: "أفضل أدوات الذكاء الاصطناعي كبدائل لـ Grok في 2026",
      ru: "Лучшие альтернативы Grok среди AI-инструментов в 2026 году",
      zh: "2026 年可替代 Grok 的最佳 AI 工具",
      ja: "2026年版 Grok の代わりに使えるおすすめ AI ツール",
      ko: "2026년에 Grok 대신 쓰기 좋은 AI 도구",
      el: "Τα καλύτερα εργαλεία AI αντί του Grok το 2026",
      da: "De bedste AI-værktøjer som alternativer til Grok i 2026",
      fa: "بهترین ابزارهای هوش مصنوعی به‌عنوان جایگزین Grok در سال 2026"
    },
    excerpt: {
      tr: "Yazı, araştırma ve gündem tarama için Grok yerine hangi araçların daha mantıklı olduğunu hızlıca karşılaştır.",
      en: "Compare the strongest alternatives to Grok for writing, research, and current-topic discovery.",
      ar: "قارن بسرعة بين أفضل بدائل Grok للكتابة والبحث ومتابعة المواضيع الجديدة.",
      ru: "Быстро сравните лучшие замены Grok для письма, исследований и отслеживания повестки.",
      zh: "快速比较适合写作、研究和热点追踪的 Grok 替代工具。",
      ja: "執筆・調査・トレンド確認に向く Grok の代替ツールをすばやく比較できます。",
      ko: "글쓰기, 리서치, 이슈 탐색에 적합한 Grok 대안을 빠르게 비교합니다.",
      el: "Σύγκρινε γρήγορα τις καλύτερες εναλλακτικές του Grok για γραφή, έρευνα και παρακολούθηση θεμάτων.",
      da: "Sammenlign hurtigt de bedste alternativer til Grok til skrivning, research og emneoverblik.",
      fa: "به‌سرعت بهترین جایگزین‌های Grok را برای نوشتن، تحقیق و دنبال‌کردن موضوعات مقایسه کنید."
    }
  },
  {
    slug: "en-iyi-ai-ses-olusturma-araclari-2026",
    title: {
      tr: "2026'da en iyi AI ses oluşturma araçları",
      en: "Best AI voice generation tools in 2026",
      ar: "أفضل أدوات إنشاء الصوت بالذكاء الاصطناعي في 2026",
      ru: "Лучшие AI-инструменты для генерации голоса в 2026 году",
      zh: "2026 年最佳 AI 语音生成工具",
      ja: "2026年版 おすすめAI音声生成ツール",
      ko: "2026년 최고의 AI 음성 생성 도구",
      el: "Τα καλύτερα εργαλεία δημιουργίας φωνής με AI το 2026",
      da: "De bedste AI-værktøjer til stemmegenerering i 2026",
      fa: "بهترین ابزارهای تولید صدای هوش مصنوعی در سال 2026"
    },
    excerpt: {
      tr: "Voiceover, anlatım ve sesli içerik üretimi için öne çıkan araçları kullanım senaryosuna göre incele.",
      en: "Review the strongest voiceover, narration, and audio production tools by practical use case.",
      ar: "راجع أبرز أدوات التعليق الصوتي والسرد والإنتاج الصوتي حسب سيناريو الاستخدام.",
      ru: "Посмотрите лучшие инструменты для озвучки, дикторского голоса и аудиопроизводства по реальным сценариям.",
      zh: "按实际场景查看适合配音、旁白和音频制作的 AI 工具。",
      ja: "ナレーションや音声制作に向くツールを用途別に確認できます。",
      ko: "보이스오버, 내레이션, 오디오 제작에 맞는 도구를 활용 사례별로 살펴봅니다.",
      el: "Δες ποια εργαλεία ταιριάζουν καλύτερα σε voiceover, αφήγηση και παραγωγή ήχου.",
      da: "Se hvilke værktøjer der passer bedst til voiceover, speak og lydproduktion.",
      fa: "ابزارهای مناسب برای گویندگی، نریشن و تولید محتوای صوتی را بر اساس کاربرد بررسی کنید."
    }
  },
  {
    slug: "kucuk-isletmeler-icin-en-iyi-ai-verimlilik-araclari-2026",
    title: {
      tr: "2026'da küçük işletmeler için en iyi AI verimlilik araçları",
      en: "Best AI productivity tools for small businesses in 2026",
      ar: "أفضل أدوات الإنتاجية بالذكاء الاصطناعي للشركات الصغيرة في 2026",
      ru: "Лучшие AI-инструменты продуктивности для малого бизнеса в 2026 году",
      zh: "2026 年适合小型企业的最佳 AI 生产力工具",
      ja: "2026年版 小規模ビジネス向けAI生産性ツール",
      ko: "2026년 소규모 비즈니스를 위한 최고의 AI 생산성 도구",
      el: "Τα καλύτερα εργαλεία AI παραγωγικότητας για μικρές επιχειρήσεις το 2026",
      da: "De bedste AI-produktivitetsværktøjer til små virksomheder i 2026",
      fa: "بهترین ابزارهای بهره‌وری هوش مصنوعی برای کسب‌وکارهای کوچک در سال 2026"
    },
    excerpt: {
      tr: "Toplantı, görev, not ve otomasyon akışlarında küçük ekipler için en mantıklı AI araçlarını derledik.",
      en: "A practical shortlist of AI tools that help small teams manage meetings, tasks, notes, and automation.",
      ar: "قائمة عملية لأدوات AI التي تساعد الفرق الصغيرة في الاجتماعات والمهام والملاحظات والأتمتة.",
      ru: "Практичная подборка AI-инструментов для встреч, задач, заметок и автоматизации в небольших командах.",
      zh: "为小团队整理了一份适合会议、任务、笔记和自动化的 AI 工具清单。",
      ja: "会議・タスク・メモ・自動化を助ける小規模チーム向けツールをまとめています。",
      ko: "회의, 업무, 메모, 자동화까지 작은 팀에 맞는 AI 도구를 정리했습니다.",
      el: "Μια πρακτική λίστα εργαλείων AI για συναντήσεις, εργασίες, σημειώσεις και αυτοματοποίηση σε μικρές ομάδες.",
      da: "En praktisk liste over AI-værktøjer til møder, opgaver, noter og automatisering i små teams.",
      fa: "فهرستی کاربردی از ابزارهای AI برای جلسه‌ها، کارها، یادداشت‌ها و اتوماسیون در تیم‌های کوچک."
    }
  },
  {
    slug: "en-iyi-ai-araclari-2026",
    title: {
      tr: "2026'da en iyi AI araçları",
      en: "Best AI tools in 2026",
      ar: "أفضل أدوات الذكاء الاصطناعي في 2026",
      ru: "Лучшие AI-инструменты в 2026 году",
      zh: "2026 年最佳 AI 工具",
      ja: "2026年版 おすすめAIツール",
      ko: "2026년 최고의 AI 도구",
      el: "Τα καλύτερα εργαλεία AI το 2026",
      da: "De bedste AI-værktøjer i 2026",
      fa: "بهترین ابزارهای هوش مصنوعی در سال 2026"
    },
    excerpt: {
      tr: "Yazı, görsel, video, araştırma ve verimlilik tarafında öne çıkan araçları tek listede toparladık.",
      en: "A single shortlist of standout AI tools across writing, image, video, research, and productivity.",
      ar: "قائمة مختصرة بأبرز أدوات AI في الكتابة والصور والفيديو والبحث والإنتاجية.",
      ru: "Одна подборка заметных AI-инструментов для письма, изображений, видео, исследований и продуктивности.",
      zh: "把写作、图像、视频、研究和效率领域值得关注的 AI 工具集中到一份清单里。",
      ja: "執筆、画像、動画、調査、業務効率化まで注目ツールを一つにまとめました。",
      ko: "글쓰기, 이미지, 영상, 리서치, 생산성 분야의 대표 AI 도구를 한눈에 정리했습니다.",
      el: "Μια ενιαία λίστα με τα πιο χρήσιμα εργαλεία AI για γραφή, εικόνα, βίντεο, έρευνα και παραγωγικότητα.",
      da: "En samlet shortlist over stærke AI-værktøjer til skrivning, billeder, video, research og produktivitet.",
      fa: "فهرستی یک‌جا از ابزارهای شاخص AI در نوشتن، تصویر، ویدیو، تحقیق و بهره‌وری."
    }
  },
  {
    slug: "chatgpt-vs-claude-vs-gemini",
    title: {
      tr: "ChatGPT vs Claude vs Gemini",
      en: "ChatGPT vs Claude vs Gemini",
      ar: "ChatGPT مقابل Claude مقابل Gemini",
      ru: "ChatGPT против Claude против Gemini",
      zh: "ChatGPT vs Claude vs Gemini",
      ja: "ChatGPT vs Claude vs Gemini",
      ko: "ChatGPT vs Claude vs Gemini",
      el: "ChatGPT vs Claude vs Gemini",
      da: "ChatGPT vs Claude vs Gemini",
      fa: "ChatGPT در برابر Claude در برابر Gemini"
    },
    excerpt: {
      tr: "Yazı, araştırma, hız ve genel kullanım bakımından üç güçlü modeli aynı çerçevede değerlendir.",
      en: "Compare three major models across writing quality, research, speed, and general usability.",
      ar: "قارن بين ثلاثة نماذج قوية من حيث الكتابة والبحث والسرعة والاستخدام العام.",
      ru: "Сравните три сильные модели по качеству письма, исследованиям, скорости и универсальности.",
      zh: "从写作、研究、速度和通用体验四个角度比较这三款主流模型。",
      ja: "執筆、調査、速度、使いやすさの観点で3つの主要モデルを比較します。",
      ko: "글쓰기, 리서치, 속도, 범용성 측면에서 세 가지 대표 모델을 비교합니다.",
      el: "Σύγκρινε τρία κορυφαία μοντέλα σε γραφή, έρευνα, ταχύτητα και γενική χρηστικότητα.",
      da: "Sammenlign tre stærke modeller på skrivning, research, hastighed og generel anvendelighed.",
      fa: "سه مدل مهم را از نظر نوشتن، تحقیق، سرعت و کاربری عمومی مقایسه کنید."
    }
  },
  {
    slug: "best-ai-tools-for-beginners-2026",
    title: {
      tr: "2026'da yeni başlayanlar için en iyi AI araçları",
      en: "Best AI tools for beginners in 2026",
      ar: "أفضل أدوات الذكاء الاصطناعي للمبتدئين في 2026",
      ru: "Лучшие AI-инструменты для новичков в 2026 году",
      zh: "2026 年最适合新手的 AI 工具",
      ja: "2026年版 初心者向けおすすめAIツール",
      ko: "2026년 입문자를 위한 최고의 AI 도구",
      el: "Τα καλύτερα εργαλεία AI για αρχάριους το 2026",
      da: "De bedste AI-værktøjer for begyndere i 2026",
      fa: "بهترین ابزارهای هوش مصنوعی برای مبتدی‌ها در سال 2026"
    },
    excerpt: {
      tr: "İlk kez AI araçlarını deneyecek kullanıcılar için öğrenmesi kolay ve hızlı değer veren seçenekleri seçtik.",
      en: "A starter-friendly list of AI tools that are easy to learn and useful from day one.",
      ar: "قائمة مناسبة للمبتدئين تضم أدوات AI سهلة التعلم وتمنح قيمة سريعة من اليوم الأول.",
      ru: "Подборка простых и полезных AI-инструментов, с которых удобно начать уже с первого дня.",
      zh: "这是一份适合入门用户的 AI 工具清单，上手快、从第一天就能产生价值。",
      ja: "初めてでも使いやすく、すぐ価値を感じやすいAIツールをまとめました。",
      ko: "처음 시작하는 사람도 배우기 쉽고 바로 활용하기 좋은 AI 도구를 골랐습니다.",
      el: "Μια φιλική λίστα για αρχάριους με εργαλεία AI που μαθαίνονται εύκολα και δίνουν γρήγορα αξία.",
      da: "En begyndervenlig liste over AI-værktøjer, som er lette at lære og nyttige fra dag ét.",
      fa: "فهرستی مناسب مبتدی‌ها از ابزارهای AI که یادگیری آن‌ها آسان است و از همان ابتدا کاربرد دارند."
    }
  }
];

const HOMEPAGE_NEWS_PREVIEWS: LocalizedPreviewItem[] = [
  {
    slug: "openai-chatgpt-gorev-akislari-2026-04-13",
    title: {
      tr: "OpenAI, ChatGPT'yi daha görev odaklı bir akışa taşıyor",
      en: "OpenAI moves ChatGPT toward a more task-focused workflow",
      ar: "OpenAI تدفع ChatGPT نحو سير عمل أكثر تركيزًا على المهام",
      ru: "OpenAI переводит ChatGPT к более задачному сценарию работы",
      zh: "OpenAI 正把 ChatGPT 推向更任务导向的工作流",
      ja: "OpenAI は ChatGPT をよりタスク志向のワークフローへ進めている",
      ko: "OpenAI가 ChatGPT를 더 작업 중심의 흐름으로 옮기고 있다",
      el: "Η OpenAI στρέφει το ChatGPT σε πιο task-focused ροές εργασίας",
      da: "OpenAI flytter ChatGPT mod en mere opgavefokuseret arbejdsgang",
      fa: "OpenAI در حال سوق دادن ChatGPT به سمت یک جریان کاری متمرکزتر بر وظایف است"
    },
    excerpt: {
      tr: "Taslak, araştırma ve karar adımlarını tek yüzeyde birleştiren daha kısa bir üretim akışı öne çıkıyor.",
      en: "The latest product direction combines drafting, research, and decision support into one tighter flow.",
      ar: "الاتجاه الجديد يجمع المسودة والبحث ودعم القرار في تدفق واحد أكثر كفاءة.",
      ru: "Новый вектор продукта объединяет черновики, исследование и поддержку решений в один более короткий поток.",
      zh: "最新方向把草稿、研究和决策支持整合进一个更紧凑的流程。",
      ja: "下書き、調査、意思決定支援を一つの短い流れにまとめる方向が強まっています。",
      ko: "초안 작성, 리서치, 의사결정 지원을 하나의 더 간결한 흐름으로 묶는 방향이다.",
      el: "Η νέα κατεύθυνση ενώνει draft, research και decision support σε μία πιο καθαρή ροή.",
      da: "Den nye retning samler udkast, research og beslutningsstøtte i ét strammere flow.",
      fa: "جهت‌گیری جدید محصول، پیش‌نویس، تحقیق و پشتیبانی تصمیم را در یک مسیر فشرده‌تر ترکیب می‌کند."
    }
  },
  {
    slug: "anthropic-claude-uzun-form-yazim-2026-04-13",
    title: {
      tr: "Claude, uzun form yazı ve kaynaklı araştırmada konumunu güçlendiriyor",
      en: "Claude keeps getting stronger in long-form writing and source-backed research",
      ar: "Claude يواصل تعزيز مكانته في الكتابة الطويلة والبحث المدعوم بالمصادر",
      ru: "Claude усиливает позиции в длинных текстах и исследованиях с опорой на источники",
      zh: "Claude 继续强化在长文写作和带来源研究中的优势",
      ja: "Claude は長文執筆と出典付きリサーチでさらに強みを見せている",
      ko: "Claude는 장문 작성과 출처 기반 리서치에서 강점을 더 키우고 있다",
      el: "Το Claude ενισχύεται ακόμη περισσότερο στη μακροσκελή γραφή και στην έρευνα με πηγές",
      da: "Claude står endnu stærkere i long-form skrivning og kildebaseret research",
      fa: "Claude جایگاه خود را در نوشتار بلند و تحقیق مبتنی بر منبع تقویت می‌کند"
    },
    excerpt: {
      tr: "Daha düzenli çıktı ve araştırma odaklı kullanım, Claude'u yazı tarafında daha güçlü bir aday yapıyor.",
      en: "More structured output and research-first positioning keep Claude highly relevant in writing workflows.",
      ar: "المخرجات الأكثر تنظيمًا والتركيز على البحث يجعل Claude خيارًا أقوى في مسارات الكتابة.",
      ru: "Более структурный вывод и исследовательский фокус делают Claude сильнее в сценариях письма.",
      zh: "更有结构的输出和研究优先定位，让 Claude 在写作场景里更具吸引力。",
      ja: "より整理された出力と調査重視の方向性が、Claude を執筆用途でさらに有力にしています。",
      ko: "더 구조화된 출력과 연구 중심 포지셔닝이 Claude의 글쓰기 활용도를 높이고 있다.",
      el: "Η πιο δομημένη έξοδος και η έμφαση στην έρευνα κρατούν το Claude πολύ δυνατό στη γραφή.",
      da: "Mere struktureret output og research-fokus gør Claude endnu stærkere i skriveflows.",
      fa: "خروجی ساختاریافته‌تر و تمرکز بر تحقیق، Claude را در جریان‌های نوشتاری گزینه‌ای قوی‌تر می‌کند."
    }
  },
  {
    slug: "google-gemini-arama-verimlilik-2026-04-13",
    title: {
      tr: "Gemini, arama ve verimlilik akışını daha da birleştiriyor",
      en: "Gemini keeps blending search and productivity into one flow",
      ar: "Gemini يواصل دمج البحث والإنتاجية في مسار واحد",
      ru: "Gemini всё сильнее объединяет поиск и продуктивность в один сценарий",
      zh: "Gemini 正持续把搜索与效率工具融合成一个流程",
      ja: "Gemini は検索と生産性を一つの流れにさらに統合している",
      ko: "Gemini는 검색과 생산성 흐름을 하나로 더 가깝게 묶고 있다",
      el: "Το Gemini ενώνει ακόμη περισσότερο την αναζήτηση με την παραγωγικότητα",
      da: "Gemini smelter søgning og produktivitet endnu tættere sammen",
      fa: "Gemini همچنان جست‌وجو و بهره‌وری را در یک جریان واحد ترکیب می‌کند"
    },
    excerpt: {
      tr: "Araştırma, özetleme ve günlük iş akışları artık aynı deneyimde daha yakın duruyor.",
      en: "Research, summarization, and everyday work are moving closer together inside the same experience.",
      ar: "البحث والتلخيص والعمل اليومي يقتربون أكثر داخل تجربة واحدة.",
      ru: "Исследование, суммаризация и ежедневная работа всё больше сходятся в одном интерфейсе.",
      zh: "研究、总结和日常工作流程正在同一体验里进一步靠拢。",
      ja: "調査、要約、日常作業が同じ体験の中でより近づいています。",
      ko: "리서치, 요약, 일상 업무가 같은 경험 안에서 더 가까워지고 있다.",
      el: "Έρευνα, σύνοψη και καθημερινή εργασία έρχονται πιο κοντά στην ίδια εμπειρία.",
      da: "Research, opsummering og dagligt arbejde samles i højere grad i samme oplevelse.",
      fa: "تحقیق، خلاصه‌سازی و کار روزمره بیش از پیش در یک تجربه مشترک قرار می‌گیرند."
    }
  },
  {
    slug: "microsoft-copilot-ofis-otomasyon-2026-04-13",
    title: {
      tr: "Microsoft Copilot, ofis ekipleri için otomasyonu derinleştiriyor",
      en: "Microsoft Copilot deepens automation for office teams",
      ar: "Microsoft Copilot يعمّق الأتمتة لفرق العمل المكتبية",
      ru: "Microsoft Copilot усиливает автоматизацию для офисных команд",
      zh: "Microsoft Copilot 正在为办公团队深化自动化能力",
      ja: "Microsoft Copilot はオフィスチーム向け自動化をさらに深めている",
      ko: "Microsoft Copilot이 오피스 팀을 위한 자동화를 더 깊게 확장하고 있다",
      el: "Το Microsoft Copilot εμβαθύνει την αυτοματοποίηση για ομάδες γραφείου",
      da: "Microsoft Copilot uddyber automatisering for kontorteams",
      fa: "Microsoft Copilot اتوماسیون را برای تیم‌های اداری عمیق‌تر می‌کند"
    },
    excerpt: {
      tr: "Toplantı, doküman ve görev akışlarını aynı yüzeye toplama yönü daha belirgin hale geliyor.",
      en: "The product direction keeps pulling meetings, documents, and tasks into one tighter operating layer.",
      ar: "الاتجاه الجديد يجمع الاجتماعات والمستندات والمهام في طبقة تشغيلية واحدة أكثر ترابطًا.",
      ru: "Новый вектор всё сильнее сводит встречи, документы и задачи в один рабочий слой.",
      zh: "新的方向正把会议、文档和任务拉进同一个更紧密的工作层。",
      ja: "会議・文書・タスクを一つの運用レイヤーにまとめる流れが強まっています。",
      ko: "회의, 문서, 업무를 하나의 더 촘촘한 작업 레이어로 묶는 방향이 강해지고 있다.",
      el: "Η νέα κατεύθυνση φέρνει συναντήσεις, έγγραφα και εργασίες σε ένα ενιαίο λειτουργικό layer.",
      da: "Retningen samler møder, dokumenter og opgaver i ét tættere arbejdslag.",
      fa: "این مسیر جدید جلسه‌ها، اسناد و وظایف را در یک لایه عملیاتی منسجم‌تر جمع می‌کند."
    }
  },
  {
    slug: "perplexity-kaynakli-arama-karar-ekrani-2026-04-13",
    title: {
      tr: "Perplexity, kaynaklı aramayı karar odaklı bir yüzeye yaklaştırıyor",
      en: "Perplexity moves source-backed search closer to a decision-ready surface",
      ar: "Perplexity تقرّب البحث المدعوم بالمصادر إلى واجهة جاهزة لاتخاذ القرار",
      ru: "Perplexity приближает поиск с источниками к готовому для решения интерфейсу",
      zh: "Perplexity 正把带来源搜索推向更适合决策的界面",
      ja: "Perplexity は出典付き検索をより意思決定向けの体験へ近づけている",
      ko: "Perplexity는 출처 기반 검색을 더 결정 친화적인 화면으로 옮기고 있다",
      el: "Το Perplexity φέρνει την αναζήτηση με πηγές πιο κοντά σε μια έτοιμη για απόφαση εμπειρία",
      da: "Perplexity bringer kildebaseret søgning tættere på en beslutningsklar oplevelse",
      fa: "Perplexity جست‌وجوی مبتنی بر منبع را به تجربه‌ای آماده‌تر برای تصمیم‌گیری نزدیک می‌کند"
    },
    excerpt: {
      tr: "Cevapla karar arasında kalan mesafe kısalıyor; kullanıcı daha hızlı doğrulanmış özet bekliyor.",
      en: "The gap between answer and decision keeps shrinking as users expect verified summaries faster.",
      ar: "الفجوة بين الإجابة والقرار تضيق مع توقّع المستخدمين لملخصات موثوقة بشكل أسرع.",
      ru: "Разрыв между ответом и решением сокращается: пользователи ждут проверенных сводок быстрее.",
      zh: "答案与决策之间的距离正在缩短，用户希望更快获得可验证的摘要。",
      ja: "回答から意思決定までの距離が縮まり、検証された要約への期待が高まっています。",
      ko: "답과 결정 사이의 거리가 줄어들며, 사용자들은 더 빠른 검증형 요약을 기대하고 있다.",
      el: "Το κενό ανάμεσα στην απάντηση και στην απόφαση μικραίνει, καθώς οι χρήστες ζητούν πιο γρήγορα επαληθευμένες περιλήψεις.",
      da: "Afstanden mellem svar og beslutning bliver mindre, efterhånden som brugere forventer verificerede opsummeringer hurtigere.",
      fa: "فاصله میان پاسخ و تصمیم کمتر می‌شود و کاربران خلاصه‌های سریع‌تر و تأییدشده‌تری می‌خواهند."
    }
  }
];

function localizePreviewItems(locale: Locale, items: LocalizedPreviewItem[]): HomePreviewItem[] {
  return items.map((item) => ({
    slug: item.slug,
    title: item.title[locale],
    excerpt: item.excerpt[locale]
  }));
}

export function getHomepageBlogPreviews(locale: Locale) {
  return localizePreviewItems(locale, HOMEPAGE_BLOG_PREVIEWS);
}

export function getHomepageNewsPreviews(locale: Locale) {
  return localizePreviewItems(locale, HOMEPAGE_NEWS_PREVIEWS);
}
