import type { Locale } from "@/i18n/config";

export type StaticPageSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type StaticPageContent = {
  title: string;
  description: string;
  intro: string;
  sections: StaticPageSection[];
};

export const staticPages = {
  tr: {
    about: {
      title: "Deciply Hakkında",
      description: "Deciply'nın ne olduğunu, neden kurulduğunu ve kullanıcılar için neyi kolaylaştırdığını keşfedin.",
      intro:
        "Deciply, AI araçlarını ve SaaS ürünlerini daha hızlı karşılaştırmak, daha güvenli değerlendirmek ve doğru aracı daha kısa sürede bulmak için oluşturulmuş iki dilli bir keşif platformudur.",
      sections: [
        {
          title: "Deciply nedir?",
          paragraphs: [
            "Deciply; AI araçlarını, karşılaştırmaları, kullanım senaryolarını ve rehber içeriklerini tek çatı altında toplayan modern bir dizindir.",
            "Amacımız, kullanıcıların uzun araştırma süreçlerini kısaltıp karar verme aşamasını daha net, daha hızlı ve daha güvenilir hale getirmektir."
          ]
        },
        {
          title: "Misyonumuz",
          paragraphs: [
            "Yapay zeka araçları hızla çoğalırken doğru aracı seçmek zorlaşıyor. Deciply'nın misyonu, bu karmaşayı sadeleştirmek ve her kullanıcıya ihtiyacına uygun aracı bulması için net sinyaller sunmaktır."
          ],
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
      intro:
        "Soru, geri bildirim, iş birliği veya düzeltme talepleriniz için bizimle iletişime geçebilirsiniz. Deciply büyüdükçe kullanıcı geri bildirimlerini aktif olarak dikkate alıyoruz.",
      sections: [
        {
          title: "İletişim bilgileri",
          bullets: [
            "E-posta: hello@deciply.com",
            "İş birlikleri: partners@deciply.com",
            "Genel geri bildirim: feedback@deciply.com"
          ]
        },
        {
          title: "Ne için yazabilirsiniz?",
          bullets: [
            "Araç bilgisi güncelleme talepleri",
            "Affiliate ve iş birliği teklifleri",
            "İçerik düzeltmeleri ve geri bildirimler",
            "Reklam ve sponsorluk görüşmeleri"
          ]
        }
      ]
    },
    privacyPolicy: {
      title: "Gizlilik Politikası",
      description: "Deciply'nın hangi verileri neden topladığını ve bunları nasıl koruduğunu öğrenin.",
      intro:
        "Deciply, kullanıcı gizliliğine önem verir. Bu politika, hangi temel bilgilerin toplanabileceğini, bunların nasıl kullanıldığını ve kullanıcı haklarını genel hatlarıyla açıklar.",
      sections: [
        {
          title: "Toplanabilecek bilgiler",
          bullets: [
            "Temel analitik veriler",
            "Cihaz ve tarayıcı bilgileri",
            "Form veya e-posta yoluyla paylaşılan iletişim bilgileri"
          ]
        },
        {
          title: "Bu bilgiler neden kullanılır?",
          bullets: [
            "Site performansını iyileştirmek",
            "İçerik ve kullanıcı deneyimini geliştirmek",
            "Geri bildirim veya iletişim taleplerine yanıt vermek"
          ]
        },
        {
          title: "Üçüncü taraf hizmetler",
          paragraphs: [
            "İleride analitik, reklam veya affiliate sistemleri kullanılabilir. Bu hizmetler kendi gizlilik politikalarına göre çalışabilir ve gerektiğinde ayrı bildirimlerle desteklenir."
          ]
        }
      ]
    },
    terms: {
      title: "Kullanım Şartları",
      description: "Deciply'yı kullanırken geçerli temel şartları ve sorumluluk sınırlarını inceleyin.",
      intro:
        "Deciply üzerindeki içerikler bilgilendirme amaçlıdır. Siteyi kullanarak aşağıdaki temel şartları kabul etmiş sayılırsınız.",
      sections: [
        {
          title: "İçerik kullanımı",
          bullets: [
            "Sitedeki içerikler genel bilgi ve araştırma amaçlıdır",
            "Araç seçiminden doğan nihai karar kullanıcıya aittir",
            "İçeriklerde zaman içinde güncelleme veya düzeltme yapılabilir"
          ]
        },
        {
          title: "Sorumluluk sınırı",
          paragraphs: [
            "Deciply, üçüncü taraf araçların sunduğu hizmetlerden, fiyat değişikliklerinden veya ürün politikalarından doğrudan sorumlu değildir. Kullanıcıların resmi ürün sayfalarını ayrıca incelemesi önerilir."
          ]
        }
      ]
    },
    affiliateDisclosure: {
      title: "Affiliate açıklaması",
      description: "Deciply üzerindeki bazı bağlantıların affiliate bağlantı olabileceğini ve bunun içeriği nasıl etkilediğini öğrenin.",
      intro:
        "Deciply üzerindeki bazı bağlantılar affiliate bağlantı olabilir. Bu bağlantılar üzerinden işlem yapıldığında komisyon kazanılabilir; ancak bu durum editoryal değerlendirmeyi belirlemez.",
      sections: [
        {
          title: "Affiliate bağlantılar nasıl çalışır?",
          paragraphs: [
            "Bir kullanıcı Deciply üzerinden üçüncü taraf bir araca gider ve uygun bir işlem yaparsa, Deciply gelir elde edebilir.",
            "Bu gelir, sitenin geliştirilmesi, içerik üretimi ve kullanıcı deneyiminin iyileştirilmesi için kullanılabilir."
          ]
        },
        {
          title: "Editoryal bağımsızlık",
          bullets: [
            "Affiliate ilişkileri içerik sıralamasını otomatik belirlemez",
            "Araç değerlendirmelerinde kullanım senaryosu ve pratik değer önceliklidir",
            "Kullanıcıya daha net karar verebilmesi için güçlü ve zayıf yönler birlikte sunulur"
          ]
        }
      ]
    }
  },
  en: {
    about: {
      title: "About Deciply",
      description: "Learn what Deciply is, why it exists, and how it helps users make better tool decisions.",
      intro:
        "Deciply is a bilingual discovery platform built to help users compare AI tools and SaaS products faster, evaluate them with more confidence, and reach better-fit tools with less friction.",
      sections: [
        {
          title: "What is Deciply?",
          paragraphs: [
            "Deciply is a modern directory that brings together AI tools, comparisons, use cases, and guide content in one place.",
            "The platform is designed to reduce research time and make the decision process clearer, faster, and more trustworthy."
          ]
        },
        {
          title: "Our mission",
          paragraphs: [
            "As the AI tools market grows, choosing the right product becomes harder. Deciply exists to simplify that decision and present clearer signals for every type of user."
          ],
          bullets: [
            "Make tools easier to compare",
            "Highlight decision-focused information over fluff",
            "Help beginners and professionals move faster with more confidence"
          ]
        }
      ]
    },
    contact: {
      title: "Contact",
      description: "Reach Deciply for feedback, partnerships, updates, or general inquiries.",
      intro:
        "If you have feedback, partnership ideas, corrections, or general questions, you can contact Deciply through the channels below.",
      sections: [
        {
          title: "Contact details",
          bullets: [
            "Email: hello@deciply.com",
            "Partnerships: partners@deciply.com",
            "General feedback: feedback@deciply.com"
          ]
        },
        {
          title: "Reasons to reach out",
          bullets: [
            "Tool data update requests",
            "Affiliate or partnership inquiries",
            "Content corrections and feedback",
            "Advertising and sponsorship discussions"
          ]
        }
      ]
    },
    privacyPolicy: {
      title: "Privacy Policy",
      description: "Understand what information Deciply may collect, why it may be used, and how privacy is handled.",
      intro:
        "Deciply respects user privacy. This policy explains, at a high level, what basic information may be collected, how it may be used, and what users should expect.",
      sections: [
        {
          title: "Information that may be collected",
          bullets: [
            "Basic analytics data",
            "Device and browser information",
            "Contact details shared through forms or email"
          ]
        },
        {
          title: "Why this information may be used",
          bullets: [
            "Improve site performance",
            "Enhance content and user experience",
            "Respond to feedback and contact requests"
          ]
        },
        {
          title: "Third-party services",
          paragraphs: [
            "Analytics, advertising, or affiliate systems may be used in the future. These services may operate under their own privacy policies and can be supported with separate disclosures when needed."
          ]
        }
      ]
    },
    terms: {
      title: "Terms of Use",
      description: "Review the basic terms, conditions, and responsibility boundaries for using Deciply.",
      intro:
        "Content on Deciply is provided for informational purposes. By using the site, you acknowledge the general terms below.",
      sections: [
        {
          title: "Content usage",
          bullets: [
            "Site content is intended for research and informational use",
            "Final tool selection decisions remain the responsibility of the user",
            "Content may be updated, corrected, or revised over time"
          ]
        },
        {
          title: "Limitation of responsibility",
          paragraphs: [
            "Deciply is not directly responsible for third-party product changes, pricing updates, or platform policies. Users should review official product pages before making decisions."
          ]
        }
      ]
    },
    affiliateDisclosure: {
      title: "Affiliate Disclosure",
      description: "Understand how affiliate links may appear on Deciply and how that relates to editorial content.",
      intro:
        "Some links on Deciply may be affiliate links. If a user visits a third-party tool and completes a qualifying action, Deciply may earn a commission. That does not automatically determine the editorial outcome.",
      sections: [
        {
          title: "How affiliate links work",
          paragraphs: [
            "If a user clicks through from Deciply to a third-party product and completes a qualifying action, Deciply may receive compensation.",
            "That revenue can help support site improvements, content production, and user experience enhancements."
          ]
        },
        {
          title: "Editorial independence",
          bullets: [
            "Affiliate relationships do not automatically decide rankings",
            "Tool evaluation focuses on use-case fit and practical value",
            "Strengths and limitations are presented together to support better decisions"
          ]
        }
      ]
    }
  }
} as const satisfies Record<
  Locale,
  {
    about: StaticPageContent;
    contact: StaticPageContent;
    privacyPolicy: StaticPageContent;
    terms: StaticPageContent;
    affiliateDisclosure: StaticPageContent;
  }
>;