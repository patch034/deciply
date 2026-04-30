import type { Metadata } from "next";

import type { StaticPageContent } from "@/data/static-pages";
import { buildAlternates, buildCanonicalUrl, type SupportedLocale } from "@/i18n/config";

export type StaticPageKey = "about" | "contact" | "privacyPolicy" | "terms" | "affiliateDisclosure";

const localizedStaticPages: Record<SupportedLocale, Record<StaticPageKey, StaticPageContent>> = {
  tr: {
    about: {
      title: "Deciply Hakkında",
      description: "Deciply’nin ne olduğunu, neden kurulduğunu ve kullanıcılar için neyi kolaylaştırdığını keşfedin.",
      intro: "Deciply, AI araçlarını ve SaaS ürünlerini daha hızlı karşılaştırmak, daha güvenli değerlendirmek ve doğru aracı daha kısa sürede bulmak için oluşturulmuş bir keşif platformudur.",
      sections: [
        {
          title: "Deciply nedir?",
          paragraphs: [
            "Deciply; AI araçlarını, karşılaştırmaları, kullanım senaryolarını ve rehber içeriklerini tek çatı altında toplayan modern bir dizindir.",
            "Amacımız uzun araştırma sürecini kısaltmak ve karar verme aşamasını daha net, daha hızlı ve daha güvenilir hale getirmektir."
          ]
        },
        {
          title: "Yaklaşımımız",
          bullets: [
            "Araçları daha kolay karşılaştırılabilir hale getirmek",
            "Gerçek kullanım odaklı değerlendirmeler sunmak",
            "Başlayanlar ve profesyoneller için daha hızlı karar deneyimi oluşturmak"
          ]
        }
      ]
    },
    contact: {
      title: "İletişim",
      description: "Deciply ile iletişime geçmek, iş birliği önermek veya geri bildirim paylaşmak için bu sayfayı kullanın.",
      intro: "Soru, geri bildirim, iş birliği veya düzeltme talepleriniz için bizimle iletişime geçebilirsiniz.",
      sections: [
        { title: "İletişim bilgileri", bullets: ["E-posta: hello@deciply.com", "İş birlikleri: partners@deciply.com", "Genel geri bildirim: feedback@deciply.com"] },
        { title: "Ne için yazabilirsiniz?", bullets: ["Araç bilgisi güncelleme talepleri", "İş birliği ve affiliate teklifleri", "İçerik düzeltmeleri ve geri bildirimler"] }
      ]
    },
    privacyPolicy: {
      title: "Gizlilik Politikası",
      description: "Deciply’nin hangi verileri neden topladığını ve bunları nasıl koruduğunu öğrenin.",
      intro: "Deciply kullanıcı gizliliğine önem verir. Bu politika, hangi temel bilgilerin toplanabileceğini ve bunların nasıl kullanılabileceğini özetler.",
      sections: [
        { title: "Toplanabilecek bilgiler", bullets: ["Temel analitik veriler", "Cihaz ve tarayıcı bilgileri", "Form veya e-posta ile paylaşılan iletişim bilgileri"] },
        { title: "Bu bilgiler neden kullanılır?", bullets: ["Site performansını iyileştirmek", "İçerik ve kullanıcı deneyimini geliştirmek", "Geri bildirim ve iletişim taleplerine yanıt vermek"] }
      ]
    },
    terms: {
      title: "Kullanım Şartları",
      description: "Deciply’yi kullanırken geçerli temel şartları ve sorumluluk sınırlarını inceleyin.",
      intro: "Deciply üzerindeki içerikler bilgilendirme amaçlıdır. Siteyi kullanarak aşağıdaki temel şartları kabul etmiş sayılırsınız.",
      sections: [
        { title: "İçerik kullanımı", bullets: ["İçerikler genel bilgi ve araştırma amaçlıdır", "Nihai araç seçimi kullanıcı sorumluluğundadır", "İçerikler zaman içinde güncellenebilir"] },
        { title: "Sorumluluk sınırı", paragraphs: ["Deciply, üçüncü taraf ürün değişikliklerinden, fiyat güncellemelerinden veya platform politikalarından doğrudan sorumlu değildir."] }
      ]
    },
    affiliateDisclosure: {
      title: "Affiliate açıklaması",
      description: "Affiliate bağlantılar hakkında kısa ve açık bilgilendirme.",
      intro: "Deciply üzerindeki bazı bağlantılar affiliate bağlantı olabilir. Bu bağlantılar üzerinden işlem yapılması durumunda komisyon kazanabiliriz. Bu durum içerik değerlendirmelerimizi, sıralamalarımızı veya önerilerimizi etkilemez.",
      sections: [{ title: "Editoryal yaklaşım", paragraphs: ["Önerilerimiz editoryal değerlendirme, kullanım senaryosu ve pratik değer dikkate alınarak hazırlanır."] }]
    }
  },
  en: {
    about: { title: "About Deciply", description: "Learn what Deciply is, why it exists, and how it helps users make better tool decisions.", intro: "Deciply is a discovery platform built to help users compare AI tools and SaaS products faster, evaluate them with more confidence, and reach better-fit tools with less friction.", sections: [{ title: "What is Deciply?", paragraphs: ["Deciply is a modern directory that brings together AI tools, comparisons, use cases, and guide content in one place.", "The platform is designed to reduce research time and make the decision process clearer, faster, and more trustworthy."] }, { title: "Our approach", bullets: ["Make tools easier to compare", "Highlight practical, decision-focused information", "Help beginners and professionals move faster with more confidence"] }] },
    contact: { title: "Contact", description: "Reach Deciply for feedback, partnerships, updates, or general inquiries.", intro: "If you have feedback, partnership ideas, corrections, or general questions, you can contact Deciply through the channels below.", sections: [{ title: "Contact details", bullets: ["Email: hello@deciply.com", "Partnerships: partners@deciply.com", "General feedback: feedback@deciply.com"] }, { title: "Reasons to reach out", bullets: ["Tool data update requests", "Affiliate or partnership inquiries", "Content corrections and feedback"] }] },
    privacyPolicy: { title: "Privacy Policy", description: "Understand what information Deciply may collect, why it may be used, and how privacy is handled.", intro: "Deciply respects user privacy. This policy explains, at a high level, what basic information may be collected, how it may be used, and what users should expect.", sections: [{ title: "Information that may be collected", bullets: ["Basic analytics data", "Device and browser information", "Contact details shared through forms or email"] }, { title: "Why this information may be used", bullets: ["Improve site performance", "Enhance content and user experience", "Respond to feedback and contact requests"] }] },
    terms: { title: "Terms of Use", description: "Review the basic terms, conditions, and responsibility boundaries for using Deciply.", intro: "Content on Deciply is provided for informational purposes. By using the site, you acknowledge the general terms below.", sections: [{ title: "Content usage", bullets: ["Site content is intended for research and informational use", "Final tool selection decisions remain the responsibility of the user", "Content may be updated or corrected over time"] }, { title: "Limitation of responsibility", paragraphs: ["Deciply is not directly responsible for third-party product changes, pricing updates, or platform policies."] }] },
    affiliateDisclosure: { title: "Affiliate disclosure", description: "A short and clear disclosure about affiliate links.", intro: "Some links on Deciply may be affiliate links. If you take action through these links, we may earn a commission. This does not affect our editorial evaluations, rankings, or recommendations.", sections: [{ title: "Editorial approach", paragraphs: ["Our recommendations are based on editorial judgment, use cases, and practical value."] }] }
  },
  ar: {
    about: { title: "حول Deciply", description: "تعرّف على Deciply ولماذا أُنشئ وكيف يساعدك على اختيار الأدوات بشكل أفضل.", intro: "Deciply منصة اكتشاف تساعدك على مقارنة أدوات AI ومنتجات SaaS بسرعة أكبر وبثقة أعلى.", sections: [{ title: "ما هو Deciply؟", paragraphs: ["يجمع Deciply الأدوات والمقارنات وحالات الاستخدام والمحتوى الإرشادي في مكان واحد.", "الهدف هو تقليل وقت البحث وجعل قرار الاختيار أوضح وأسرع وأكثر موثوقية."] }, { title: "منهجنا", bullets: ["جعل الأدوات أسهل في المقارنة", "تقديم معلومات عملية مرتبطة بالقرار", "مساعدة المبتدئين والمحترفين على التحرك بثقة أكبر"] }] },
    contact: { title: "اتصل بنا", description: "تواصل مع Deciply للملاحظات أو الشراكات أو التحديثات.", intro: "إذا كانت لديك ملاحظات أو أفكار شراكة أو تصحيحات أو أسئلة عامة، يمكنك التواصل معنا عبر القنوات التالية.", sections: [{ title: "بيانات التواصل", bullets: ["البريد الإلكتروني: hello@deciply.com", "الشراكات: partners@deciply.com", "الملاحظات العامة: feedback@deciply.com"] }, { title: "أسباب التواصل", bullets: ["طلبات تحديث بيانات الأدوات", "الاستفسارات الخاصة بالشراكات أو affiliate", "تصحيحات المحتوى والملاحظات"] }] },
    privacyPolicy: { title: "سياسة الخصوصية", description: "اعرف ما المعلومات التي قد يجمعها Deciply ولماذا وكيف يتم التعامل معها.", intro: "يحترم Deciply خصوصية المستخدم. توضح هذه السياسة بشكل عام ما المعلومات الأساسية التي قد تُجمع وكيف يمكن استخدامها.", sections: [{ title: "المعلومات التي قد يتم جمعها", bullets: ["بيانات تحليلات أساسية", "معلومات الجهاز والمتصفح", "بيانات التواصل المرسلة عبر النماذج أو البريد الإلكتروني"] }, { title: "لماذا قد تُستخدم هذه المعلومات؟", bullets: ["تحسين أداء الموقع", "تحسين المحتوى وتجربة المستخدم", "الرد على الملاحظات وطلبات التواصل"] }] },
    terms: { title: "شروط الاستخدام", description: "راجع الشروط الأساسية وحدود المسؤولية عند استخدام Deciply.", intro: "المحتوى على Deciply مخصص لأغراض معلوماتية. باستخدام الموقع فإنك تقر بالشروط العامة التالية.", sections: [{ title: "استخدام المحتوى", bullets: ["المحتوى مخصص للبحث والمعلومات العامة", "قرار اختيار الأداة النهائي يعود للمستخدم", "قد يتم تحديث المحتوى أو تصحيحه بمرور الوقت"] }, { title: "حدود المسؤولية", paragraphs: ["Deciply غير مسؤول مباشرة عن تغييرات المنتجات أو الأسعار أو سياسات المنصات التابعة لجهات خارجية."] }] },
    affiliateDisclosure: { title: "إفصاح affiliate", description: "إيضاح قصير وواضح حول روابط affiliate.", intro: "قد تكون بعض الروابط على Deciply روابط affiliate. إذا اتخذت إجراءً عبر هذه الروابط فقد نحصل على عمولة. هذا لا يؤثر على تقييماتنا التحريرية أو توصياتنا.", sections: [{ title: "النهج التحريري", paragraphs: ["تستند توصياتنا إلى التقييم التحريري وحالات الاستخدام والقيمة العملية."] }] }
  },
  ru: {
    about: { title: "О Deciply", description: "Узнайте, что такое Deciply, зачем он создан и как помогает выбирать инструменты увереннее.", intro: "Deciply — это платформа для поиска и сравнения AI-инструментов и SaaS-продуктов быстрее и с большим доверием.", sections: [{ title: "Что такое Deciply?", paragraphs: ["Deciply объединяет инструменты, сравнения, сценарии использования и гайды в одном месте.", "Платформа помогает сократить время исследования и сделать выбор понятнее, быстрее и надежнее."] }, { title: "Наш подход", bullets: ["Упрощать сравнение инструментов", "Показывать практичную информацию, полезную для решения", "Помогать новичкам и профессионалам двигаться быстрее и увереннее"] }] },
    contact: { title: "Контакты", description: "Свяжитесь с Deciply по вопросам обратной связи, партнерств, обновлений или общих запросов.", intro: "Если у вас есть отзывы, идеи партнерства, исправления или общие вопросы, свяжитесь с нами по каналам ниже.", sections: [{ title: "Контактные данные", bullets: ["Email: hello@deciply.com", "Партнерства: partners@deciply.com", "Общая обратная связь: feedback@deciply.com"] }, { title: "По каким вопросам писать", bullets: ["Запросы на обновление данных об инструментах", "Вопросы по партнерству и affiliate", "Исправления контента и обратная связь"] }] },
    privacyPolicy: { title: "Политика конфиденциальности", description: "Узнайте, какие данные Deciply может собирать, зачем они нужны и как с ними обращаются.", intro: "Deciply уважает конфиденциальность пользователей. Эта политика в общих чертах объясняет, какие базовые данные могут собираться и как они могут использоваться.", sections: [{ title: "Какие данные могут собираться", bullets: ["Базовая аналитика", "Информация об устройстве и браузере", "Контактные данные, отправленные через формы или email"] }, { title: "Зачем могут использоваться эти данные", bullets: ["Улучшение работы сайта", "Улучшение контента и пользовательского опыта", "Ответы на отзывы и запросы"] }] },
    terms: { title: "Условия использования", description: "Ознакомьтесь с основными условиями и границами ответственности при использовании Deciply.", intro: "Контент на Deciply предоставляется в информационных целях. Используя сайт, вы соглашаетесь с общими условиями ниже.", sections: [{ title: "Использование контента", bullets: ["Контент предназначен для исследования и общей информации", "Окончательное решение о выборе инструмента принимает пользователь", "Контент может обновляться и исправляться со временем"] }, { title: "Ограничение ответственности", paragraphs: ["Deciply не несет прямой ответственности за изменения сторонних продуктов, цен или политик платформ."] }] },
    affiliateDisclosure: { title: "Раскрытие affiliate", description: "Краткое и понятное уведомление о партнерских ссылках.", intro: "Некоторые ссылки на Deciply могут быть affiliate-ссылками. Если вы совершите действие по такой ссылке, мы можем получить комиссию. Это не влияет на наши редакционные оценки и рекомендации.", sections: [{ title: "Редакционный подход", paragraphs: ["Наши рекомендации основаны на редакционной оценке, сценариях использования и практической ценности."] }] }
  },
  zh: {
    about: { title: "关于 Deciply", description: "了解 Deciply 是什么、为什么创建，以及它如何帮助你更好地选择工具。", intro: "Deciply 是一个帮助用户更快比较 AI 工具和 SaaS 产品、并更有信心做出选择的发现平台。", sections: [{ title: "Deciply 是什么？", paragraphs: ["Deciply 将工具、对比、使用场景和指南内容集中在一个地方。", "平台旨在缩短研究时间，让决策更清晰、更快速、更值得信赖。"] }, { title: "我们的方式", bullets: ["让工具更容易比较", "突出与决策相关的实用信息", "帮助新手和专业用户更快、更有把握地做决定"] }] },
    contact: { title: "联系我们", description: "如需反馈、合作、更新或一般咨询，请联系 Deciply。", intro: "如果你有反馈、合作想法、修正建议或一般问题，可以通过以下方式联系 Deciply。", sections: [{ title: "联系方式", bullets: ["邮箱：hello@deciply.com", "合作：partners@deciply.com", "一般反馈：feedback@deciply.com"] }, { title: "可联系的事项", bullets: ["工具数据更新请求", "Affiliate 或合作咨询", "内容修正与反馈"] }] },
    privacyPolicy: { title: "隐私政策", description: "了解 Deciply 可能收集哪些信息、为何使用以及如何处理隐私。", intro: "Deciply 尊重用户隐私。本政策概述可能收集的基础信息、其使用方式以及用户应有的预期。", sections: [{ title: "可能收集的信息", bullets: ["基础分析数据", "设备与浏览器信息", "通过表单或邮件提交的联系信息"] }, { title: "这些信息为何会被使用", bullets: ["提升网站性能", "改进内容与用户体验", "回复反馈和联系请求"] }] },
    terms: { title: "使用条款", description: "查看使用 Deciply 时适用的基本条款、条件与责任边界。", intro: "Deciply 上的内容仅供参考。使用本站即表示你理解并接受以下一般条款。", sections: [{ title: "内容使用", bullets: ["站内内容用于研究与信息参考", "最终工具选择由用户自行负责", "内容可能会随时间更新或修正"] }, { title: "责任限制", paragraphs: ["Deciply 不对第三方产品变更、价格更新或平台政策承担直接责任。"] }] },
    affiliateDisclosure: { title: "Affiliate 说明", description: "关于 affiliate 链接的简短说明。", intro: "Deciply 上的部分链接可能是 affiliate 链接。如果你通过这些链接采取行动，我们可能获得佣金。这不会影响我们的编辑判断、排名或推荐。", sections: [{ title: "编辑原则", paragraphs: ["我们的推荐基于编辑判断、使用场景与实际价值。"] }] }
  },
  ja: {
    about: { title: "Deciplyについて", description: "Deciply が何であり、なぜ存在し、どのように役立つのかを確認できます。", intro: "Deciply は、AI ツールや SaaS 製品をより速く比較し、より自信を持って選べるようにするための発見プラットフォームです。", sections: [{ title: "Deciplyとは？", paragraphs: ["Deciply はツール、比較、ユースケース、ガイド記事を一か所にまとめたディレクトリです。", "調査時間を減らし、意思決定をより明確で速く、信頼しやすいものにすることを目指しています。"] }, { title: "私たちの方針", bullets: ["ツールを比較しやすくする", "意思決定に役立つ実用情報を重視する", "初心者とプロの両方がより速く判断できるようにする"] }] },
    contact: { title: "お問い合わせ", description: "フィードバック、提携、更新依頼、一般的なお問い合わせはこちらから。", intro: "フィードバック、提携案、修正依頼、一般的なご質問があれば以下の方法でご連絡ください。", sections: [{ title: "連絡先", bullets: ["メール: hello@deciply.com", "提携: partners@deciply.com", "一般フィードバック: feedback@deciply.com"] }, { title: "お問い合わせ内容の例", bullets: ["ツール情報の更新依頼", "Affiliate や提携に関する相談", "コンテンツ修正やフィードバック"] }] },
    privacyPolicy: { title: "プライバシーポリシー", description: "Deciply が収集する可能性のある情報、その用途、プライバシーの扱いを確認できます。", intro: "Deciply はユーザーのプライバシーを尊重します。このポリシーでは、収集される可能性のある基本情報とその利用目的を大まかに説明します。", sections: [{ title: "収集される可能性のある情報", bullets: ["基本的な分析データ", "デバイスおよびブラウザ情報", "フォームやメールで共有された連絡先情報"] }, { title: "これらの情報が使われる理由", bullets: ["サイト性能の改善", "コンテンツと体験の向上", "お問い合わせやフィードバックへの対応"] }] },
    terms: { title: "利用規約", description: "Deciply 利用時の基本条件と責任範囲を確認してください。", intro: "Deciply 上のコンテンツは情報提供を目的としています。サイトを利用することで、以下の一般条件を理解したものとみなされます。", sections: [{ title: "コンテンツ利用", bullets: ["コンテンツは調査および情報目的です", "最終的なツール選定はユーザーの責任です", "コンテンツは更新・修正される場合があります"] }, { title: "責任の制限", paragraphs: ["Deciply は第三者サービスの変更、価格改定、プラットフォーム方針について直接責任を負いません。"] }] },
    affiliateDisclosure: { title: "Affiliate 開示", description: "affiliate リンクに関する簡潔なご案内です。", intro: "Deciply 上の一部リンクは affiliate リンクである場合があります。これらのリンク経由で行動が行われた場合、当サイトが報酬を得ることがあります。ただし、編集上の評価や順位付け、推奨内容には影響しません。", sections: [{ title: "編集方針", paragraphs: ["おすすめは編集判断、ユースケース、実用価値に基づいて作成しています。"] }] }
  },
  ko: {
    about: { title: "Deciply 소개", description: "Deciply가 무엇이며 왜 만들어졌고 어떻게 도움을 주는지 알아보세요.", intro: "Deciply는 AI 도구와 SaaS 제품을 더 빠르게 비교하고 더 자신 있게 선택할 수 있도록 돕는 탐색 플랫폼입니다.", sections: [{ title: "Deciply란?", paragraphs: ["Deciply는 도구, 비교, 활용 사례, 가이드 콘텐츠를 한곳에 모은 디렉터리입니다.", "조사 시간을 줄이고 의사결정을 더 명확하고 빠르며 신뢰할 수 있게 만드는 것이 목표입니다."] }, { title: "우리의 방식", bullets: ["도구를 더 쉽게 비교할 수 있게 만들기", "결정에 도움이 되는 실용적 정보 강조", "초보자와 전문가 모두가 더 빠르게 판단하도록 돕기"] }] },
    contact: { title: "문의하기", description: "피드백, 제휴, 업데이트 요청 또는 일반 문의를 위해 Deciply에 연락하세요.", intro: "피드백, 제휴 제안, 수정 요청, 일반 질문이 있다면 아래 채널로 연락할 수 있습니다.", sections: [{ title: "연락처", bullets: ["이메일: hello@deciply.com", "제휴: partners@deciply.com", "일반 피드백: feedback@deciply.com"] }, { title: "문의 가능한 내용", bullets: ["도구 데이터 업데이트 요청", "제휴 또는 affiliate 문의", "콘텐츠 수정 및 피드백"] }] },
    privacyPolicy: { title: "개인정보 처리방침", description: "Deciply가 어떤 정보를 수집할 수 있는지, 왜 사용되는지, 어떻게 다루는지 알아보세요.", intro: "Deciply는 사용자 프라이버시를 존중합니다. 이 정책은 수집될 수 있는 기본 정보와 그 활용 방식을 개괄적으로 설명합니다.", sections: [{ title: "수집될 수 있는 정보", bullets: ["기본 분석 데이터", "기기 및 브라우저 정보", "폼 또는 이메일로 공유된 연락처 정보"] }, { title: "이 정보가 사용되는 이유", bullets: ["사이트 성능 개선", "콘텐츠와 사용자 경험 향상", "피드백 및 문의 응답"] }] },
    terms: { title: "이용 약관", description: "Deciply 사용 시 적용되는 기본 조건과 책임 범위를 확인하세요.", intro: "Deciply의 콘텐츠는 정보 제공 목적입니다. 사이트를 사용함으로써 아래의 일반 약관을 이해한 것으로 간주됩니다.", sections: [{ title: "콘텐츠 사용", bullets: ["콘텐츠는 조사 및 정보 목적으로 제공됩니다", "최종 도구 선택은 사용자 책임입니다", "콘텐츠는 시간이 지나며 수정·업데이트될 수 있습니다"] }, { title: "책임의 한계", paragraphs: ["Deciply는 제3자 제품 변경, 가격 업데이트 또는 플랫폼 정책에 대해 직접 책임지지 않습니다."] }] },
    affiliateDisclosure: { title: "Affiliate 고지", description: "affiliate 링크에 대한 짧고 명확한 안내입니다.", intro: "Deciply의 일부 링크는 affiliate 링크일 수 있습니다. 이 링크를 통해 행동이 이루어지면 저희가 수수료를 받을 수 있습니다. 이는 편집 평가, 순위 또는 추천에 영향을 주지 않습니다.", sections: [{ title: "편집 기준", paragraphs: ["추천은 편집 판단, 사용 사례, 실질적 가치를 기준으로 작성됩니다."] }] }
  },
  el: {
    about: { title: "Σχετικά με το Deciply", description: "Μάθε τι είναι το Deciply, γιατί δημιουργήθηκε και πώς βοηθά στην επιλογή εργαλείων.", intro: "Το Deciply είναι μια πλατφόρμα ανακάλυψης που σε βοηθά να συγκρίνεις AI εργαλεία και SaaS προϊόντα πιο γρήγορα και με μεγαλύτερη σιγουριά.", sections: [{ title: "Τι είναι το Deciply;", paragraphs: ["Το Deciply συγκεντρώνει εργαλεία, συγκρίσεις, περιπτώσεις χρήσης και οδηγούς σε ένα μέρος.", "Στόχος είναι να μειώσει τον χρόνο έρευνας και να κάνει την απόφαση πιο καθαρή, γρήγορη και αξιόπιστη."] }, { title: "Η προσέγγισή μας", bullets: ["Να κάνουμε τα εργαλεία πιο εύκολα στη σύγκριση", "Να προβάλλουμε πρακτικές πληροφορίες για καλύτερη απόφαση", "Να βοηθάμε αρχάριους και επαγγελματίες να κινούνται πιο γρήγορα"] }] },
    contact: { title: "Επικοινωνία", description: "Επικοινώνησε με το Deciply για feedback, συνεργασίες, ενημερώσεις ή γενικές ερωτήσεις.", intro: "Αν έχεις feedback, ιδέες συνεργασίας, διορθώσεις ή γενικές ερωτήσεις, μπορείς να επικοινωνήσεις μαζί μας από τα παρακάτω κανάλια.", sections: [{ title: "Στοιχεία επικοινωνίας", bullets: ["Email: hello@deciply.com", "Συνεργασίες: partners@deciply.com", "Γενικό feedback: feedback@deciply.com"] }, { title: "Γιατί να επικοινωνήσεις", bullets: ["Αιτήματα ενημέρωσης δεδομένων εργαλείων", "Ερωτήσεις για συνεργασίες ή affiliate", "Διορθώσεις περιεχομένου και feedback"] }] },
    privacyPolicy: { title: "Πολιτική Απορρήτου", description: "Δες ποιες πληροφορίες μπορεί να συλλέγει το Deciply και γιατί.", intro: "Το Deciply σέβεται την ιδιωτικότητα των χρηστών. Αυτή η πολιτική εξηγεί συνοπτικά ποιες βασικές πληροφορίες μπορεί να συλλέγονται και πώς μπορεί να χρησιμοποιούνται.", sections: [{ title: "Πληροφορίες που μπορεί να συλλέγονται", bullets: ["Βασικά αναλυτικά δεδομένα", "Πληροφορίες συσκευής και browser", "Στοιχεία επικοινωνίας μέσω φόρμας ή email"] }, { title: "Γιατί μπορεί να χρησιμοποιούνται", bullets: ["Βελτίωση απόδοσης του site", "Βελτίωση περιεχομένου και εμπειρίας", "Απάντηση σε feedback και αιτήματα επικοινωνίας"] }] },
    terms: { title: "Όροι Χρήσης", description: "Δες τους βασικούς όρους και τα όρια ευθύνης για τη χρήση του Deciply.", intro: "Το περιεχόμενο στο Deciply παρέχεται για ενημερωτικούς σκοπούς. Με τη χρήση του site αποδέχεσαι τους παρακάτω γενικούς όρους.", sections: [{ title: "Χρήση περιεχομένου", bullets: ["Το περιεχόμενο προορίζεται για έρευνα και ενημέρωση", "Η τελική επιλογή εργαλείου παραμένει ευθύνη του χρήστη", "Το περιεχόμενο μπορεί να ενημερώνεται ή να διορθώνεται με τον χρόνο"] }, { title: "Περιορισμός ευθύνης", paragraphs: ["Το Deciply δεν ευθύνεται άμεσα για αλλαγές σε τρίτα προϊόντα, τιμές ή πολιτικές πλατφορμών."] }] },
    affiliateDisclosure: { title: "Δήλωση affiliate", description: "Σύντομη και καθαρή ενημέρωση για affiliate συνδέσμους.", intro: "Ορισμένοι σύνδεσμοι στο Deciply μπορεί να είναι affiliate σύνδεσμοι. Αν προχωρήσεις σε ενέργεια μέσω αυτών, ενδέχεται να λάβουμε προμήθεια. Αυτό δεν επηρεάζει τις συντακτικές αξιολογήσεις ή τις προτάσεις μας.", sections: [{ title: "Συντακτική προσέγγιση", paragraphs: ["Οι προτάσεις μας βασίζονται σε συντακτική κρίση, περιπτώσεις χρήσης και πρακτική αξία."] }] }
  },
  da: {
    about: { title: "Om Deciply", description: "Lær hvad Deciply er, hvorfor det findes, og hvordan det hjælper brugere med at vælge bedre værktøjer.", intro: "Deciply er en platform til at opdage og sammenligne AI-værktøjer og SaaS-produkter hurtigere og med større sikkerhed.", sections: [{ title: "Hvad er Deciply?", paragraphs: ["Deciply samler værktøjer, sammenligninger, brugsscenarier og guides ét sted.", "Målet er at reducere researchtid og gøre beslutningen mere klar, hurtig og troværdig."] }, { title: "Vores tilgang", bullets: ["Gøre værktøjer lettere at sammenligne", "Fremhæve praktisk og beslutningsrelevant information", "Hjælpe både begyndere og professionelle med at handle hurtigere"] }] },
    contact: { title: "Kontakt", description: "Kontakt Deciply for feedback, partnerskaber, opdateringer eller generelle henvendelser.", intro: "Hvis du har feedback, partnerskabsideer, rettelser eller generelle spørgsmål, kan du kontakte Deciply via kanalerne herunder.", sections: [{ title: "Kontaktoplysninger", bullets: ["Email: hello@deciply.com", "Partnerskaber: partners@deciply.com", "Generel feedback: feedback@deciply.com"] }, { title: "Hvorfor skrive til os?", bullets: ["Opdateringsønsker til værktøjsdata", "Affiliate- eller partnerskabshenvendelser", "Indholdsrettelser og feedback"] }] },
    privacyPolicy: { title: "Privatlivspolitik", description: "Forstå hvilke oplysninger Deciply kan indsamle, hvorfor de bruges, og hvordan privatliv håndteres.", intro: "Deciply respekterer brugernes privatliv. Denne politik forklarer overordnet, hvilke grundlæggende oplysninger der kan blive indsamlet, og hvordan de kan blive brugt.", sections: [{ title: "Oplysninger der kan blive indsamlet", bullets: ["Grundlæggende analysedata", "Enheds- og browseroplysninger", "Kontaktoplysninger delt via formularer eller email"] }, { title: "Hvorfor oplysningerne kan blive brugt", bullets: ["Forbedre sitets ydeevne", "Forbedre indhold og brugeroplevelse", "Besvare feedback og henvendelser"] }] },
    terms: { title: "Brugsvilkår", description: "Gennemgå de grundlæggende vilkår og ansvarsgrænser for brug af Deciply.", intro: "Indhold på Deciply leveres til informationsformål. Ved at bruge siden anerkender du de generelle vilkår nedenfor.", sections: [{ title: "Brug af indhold", bullets: ["Indholdet er til research og generel information", "Det endelige valg af værktøj er brugerens ansvar", "Indhold kan blive opdateret eller rettet over tid"] }, { title: "Ansvarsbegrænsning", paragraphs: ["Deciply er ikke direkte ansvarlig for ændringer i tredjepartsprodukter, priser eller platformspolitikker."] }] },
    affiliateDisclosure: { title: "Affiliate-oplysning", description: "Kort og tydelig information om affiliatelinks.", intro: "Nogle links på Deciply kan være affiliatelinks. Hvis du foretager en handling via disse links, kan vi modtage en kommission. Det påvirker ikke vores redaktionelle vurderinger, rangeringer eller anbefalinger.", sections: [{ title: "Redaktionel tilgang", paragraphs: ["Vores anbefalinger er baseret på redaktionel vurdering, brugsscenarier og praktisk værdi."] }] }
  },
  fa: {
    about: { title: "درباره Deciply", description: "ببینید Deciply چیست، چرا ساخته شده و چگونه به انتخاب بهتر ابزار کمک می‌کند.", intro: "Deciply یک پلتفرم کشف و مقایسه است که کمک می‌کند ابزارهای AI و محصولات SaaS را سریع‌تر و با اطمینان بیشتر بررسی کنید.", sections: [{ title: "Deciply چیست؟", paragraphs: ["Deciply ابزارها، مقایسه‌ها، سناریوهای استفاده و راهنماها را در یک جا جمع می‌کند.", "هدف این است که زمان تحقیق کمتر شود و تصمیم‌گیری شفاف‌تر، سریع‌تر و قابل‌اعتمادتر باشد."] }, { title: "رویکرد ما", bullets: ["ساده‌تر کردن مقایسه ابزارها", "برجسته کردن اطلاعات عملی و تصمیم‌محور", "کمک به کاربران مبتدی و حرفه‌ای برای حرکت سریع‌تر و مطمئن‌تر"] }] },
    contact: { title: "تماس با ما", description: "برای بازخورد، همکاری، به‌روزرسانی یا پرسش‌های عمومی با Deciply تماس بگیرید.", intro: "اگر بازخورد، ایده همکاری، اصلاح محتوا یا پرسش عمومی دارید، می‌توانید از راه‌های زیر با ما در ارتباط باشید.", sections: [{ title: "راه‌های ارتباطی", bullets: ["ایمیل: hello@deciply.com", "همکاری‌ها: partners@deciply.com", "بازخورد عمومی: feedback@deciply.com"] }, { title: "برای چه موضوعی می‌توانید پیام بدهید؟", bullets: ["درخواست به‌روزرسانی داده ابزارها", "پرسش‌های affiliate یا همکاری", "اصلاح محتوا و بازخورد"] }] },
    privacyPolicy: { title: "سیاست حفظ حریم خصوصی", description: "ببینید Deciply چه اطلاعاتی ممکن است جمع‌آوری کند و چرا از آن‌ها استفاده می‌شود.", intro: "Deciply به حریم خصوصی کاربران احترام می‌گذارد. این سیاست به‌صورت کلی توضیح می‌دهد چه اطلاعات پایه‌ای ممکن است جمع‌آوری شود و چگونه استفاده شود.", sections: [{ title: "اطلاعاتی که ممکن است جمع‌آوری شود", bullets: ["داده‌های تحلیلی پایه", "اطلاعات دستگاه و مرورگر", "اطلاعات تماس ارسال‌شده از طریق فرم یا ایمیل"] }, { title: "چرا از این اطلاعات استفاده می‌شود", bullets: ["بهبود عملکرد سایت", "بهبود محتوا و تجربه کاربری", "پاسخ به بازخوردها و درخواست‌های ارتباطی"] }] },
    terms: { title: "شرایط استفاده", description: "شرایط پایه و حدود مسئولیت در استفاده از Deciply را مرور کنید.", intro: "محتوای Deciply با هدف اطلاع‌رسانی ارائه می‌شود. با استفاده از سایت، شما شرایط کلی زیر را می‌پذیرید.", sections: [{ title: "استفاده از محتوا", bullets: ["محتوا برای تحقیق و اطلاع‌رسانی عمومی است", "تصمیم نهایی برای انتخاب ابزار بر عهده کاربر است", "ممکن است محتوا در طول زمان به‌روزرسانی یا اصلاح شود"] }, { title: "محدودیت مسئولیت", paragraphs: ["Deciply مستقیماً مسئول تغییرات محصولات شخص ثالث، به‌روزرسانی قیمت‌ها یا سیاست‌های پلتفرم‌ها نیست."] }] },
    affiliateDisclosure: { title: "افشای affiliate", description: "توضیحی کوتاه و شفاف درباره لینک‌های affiliate.", intro: "برخی لینک‌های موجود در Deciply ممکن است affiliate باشند. اگر از طریق این لینک‌ها اقدامی انجام شود، ممکن است کمیسیون دریافت کنیم. این موضوع بر ارزیابی‌های تحریریه، رتبه‌بندی‌ها یا پیشنهادهای ما اثر نمی‌گذارد.", sections: [{ title: "رویکرد تحریریه", paragraphs: ["پیشنهادهای ما بر پایه قضاوت تحریریه، سناریوی استفاده و ارزش عملی تهیه می‌شوند."] }] }
  }
};

export function getStaticPage(locale: SupportedLocale, key: StaticPageKey) {
  return localizedStaticPages[locale][key];
}

export function buildStaticPageMetadata(locale: SupportedLocale, path: string, key: StaticPageKey): Metadata {
  const page = getStaticPage(locale, key);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${locale}${path}`),
      languages: buildAlternates(path)
    }
  };
}
