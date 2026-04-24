import type { Metadata } from "next";

import { staticPages } from "@/data/static-pages";
import { buildAlternates, buildCanonicalUrl, type SupportedLocale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";

export type StaticPageKey = keyof (typeof staticPages)["tr" | "en"];

const affiliateDisclosurePages: Record<
  SupportedLocale,
  {
    title: string;
    description: string;
    intro: string;
    sections: { title: string; paragraphs: string[] }[];
  }
> = {
  tr: {
    title: "Affiliate açıklaması",
    description: "Affiliate bağlantılar hakkında kısa ve açık bilgilendirme.",
    intro:
      "Deciply üzerindeki bazı bağlantılar affiliate bağlantı olabilir. Bu bağlantılar üzerinden işlem yapılması durumunda komisyon kazanabiliriz. Bu durum içerik değerlendirmelerimizi, sıralamalarımızı veya önerilerimizi etkilemez.",
    sections: [{ title: "Editoryal yaklaşım", paragraphs: ["Önerilerimiz editoryal değerlendirme, kullanım senaryosu ve pratik değer dikkate alınarak hazırlanır."] }]
  },
  en: {
    title: "Affiliate disclosure",
    description: "A short and clear disclosure about affiliate links.",
    intro:
      "Some links on Deciply may be affiliate links. If you take action through these links, we may earn a commission. This does not affect our editorial evaluations, rankings, or recommendations.",
    sections: [{ title: "Editorial approach", paragraphs: ["Our recommendations are based on editorial judgment, use cases, and practical value."] }]
  },
  ar: {
    title: "إفصاح الشراكة",
    description: "إيضاح قصير وواضح حول روابط الشراكة.",
    intro:
      "قد تكون بعض الروابط على Deciply روابط affiliate. إذا اتخذت إجراءً عبر هذه الروابط فقد نحصل على عمولة. هذا لا يؤثر على تقييماتنا التحريرية أو الترتيب أو التوصيات.",
    sections: [{ title: "النهج التحريري", paragraphs: ["تستند توصياتنا إلى التقييم التحريري وحالات الاستخدام والقيمة العملية."] }]
  },
  ru: {
    title: "Партнёрское раскрытие",
    description: "Краткое и понятное уведомление о партнёрских ссылках.",
    intro:
      "Некоторые ссылки на Deciply могут быть партнёрскими. Если вы совершите действие по такой ссылке, мы можем получить комиссию. Это не влияет на наши редакционные оценки, рейтинги или рекомендации.",
    sections: [{ title: "Редакционный подход", paragraphs: ["Наши рекомендации основаны на редакционной оценке, сценариях использования и практической ценности."] }]
  },
  zh: {
    title: "联盟披露",
    description: "关于联盟链接的简短说明。",
    intro:
      "Deciply 上的部分链接可能为联盟链接。如果你通过这些链接完成操作，我们可能会获得佣金。这不会影响我们的编辑评估、排序或推荐。",
    sections: [{ title: "编辑原则", paragraphs: ["我们的推荐基于编辑判断、使用场景和实际价值。"] }]
  },
  ja: {
    title: "アフィリエイト開示",
    description: "アフィリエイトリンクに関する簡潔な案内です。",
    intro:
      "Deciply 上の一部リンクはアフィリエイトリンクである場合があります。これらのリンク経由でアクションが行われると、当サイトが報酬を得ることがあります。ただし、編集上の評価、順位付け、推奨内容には影響しません。",
    sections: [{ title: "編集方針", paragraphs: ["おすすめは編集判断、ユースケース、実用価値をもとに作成しています。"] }]
  },
  ko: {
    title: "제휴 고지",
    description: "제휴 링크에 대한 짧고 명확한 안내입니다.",
    intro:
      "Deciply의 일부 링크는 제휴 링크일 수 있습니다. 이 링크를 통해 행동이 이루어지면 저희가 수수료를 받을 수 있습니다. 이는 편집 평가, 순위, 추천에 영향을 주지 않습니다.",
    sections: [{ title: "편집 기준", paragraphs: ["추천은 편집 판단, 사용 사례, 실질적 가치를 기준으로 작성됩니다."] }]
  },
  el: {
    title: "Δήλωση affiliate",
    description: "Σύντομη και καθαρή ενημέρωση για affiliate συνδέσμους.",
    intro:
      "Ορισμένοι σύνδεσμοι στο Deciply μπορεί να είναι affiliate σύνδεσμοι. Αν προχωρήσετε σε ενέργεια μέσω αυτών, ενδέχεται να λάβουμε προμήθεια. Αυτό δεν επηρεάζει τις συντακτικές αξιολογήσεις, τις κατατάξεις ή τις προτάσεις μας.",
    sections: [{ title: "Συντακτική προσέγγιση", paragraphs: ["Οι προτάσεις μας βασίζονται σε συντακτική κρίση, περιπτώσεις χρήσης και πρακτική αξία."] }]
  },
  da: {
    title: "Affiliate-oplysning",
    description: "Kort og tydelig information om affiliatelinks.",
    intro:
      "Nogle links på Deciply kan være affiliatelinks. Hvis du foretager en handling via disse links, kan vi modtage en kommission. Det påvirker ikke vores redaktionelle vurderinger, rangeringer eller anbefalinger.",
    sections: [{ title: "Redaktionel tilgang", paragraphs: ["Vores anbefalinger er baseret på redaktionel vurdering, brugsscenarier og praktisk værdi."] }]
  },
  fa: {
    title: "افشای همکاری",
    description: "توضیحی کوتاه و شفاف درباره لینک‌های همکاری.",
    intro:
      "برخی لینک‌های موجود در Deciply ممکن است affiliate باشند. اگر از طریق این لینک‌ها اقدامی انجام شود، ممکن است کمیسیون دریافت کنیم. این موضوع بر ارزیابی‌های تحریریه، رتبه‌بندی‌ها یا پیشنهادهای ما اثر نمی‌گذارد.",
    sections: [{ title: "رویکرد تحریریه", paragraphs: ["پیشنهادهای ما بر پایه قضاوت تحریریه، سناریوی استفاده و ارزش عملی تهیه می‌شوند."] }]
  }
};

export function getStaticPage(locale: SupportedLocale, key: StaticPageKey) {
  if (key === "affiliateDisclosure") {
    return affiliateDisclosurePages[locale];
  }

  return localizeTree(locale, staticPages[getContentBaseLocale(locale)][key]);
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
