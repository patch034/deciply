import { locales, type Locale } from "@/i18n/config";
import { buildToolCompareProfile } from "@/lib/tool-compare";
import { getContentBaseLocale, localizeString, localizeTree } from "@/lib/locale-copy";
import type { LocalizedTool, MoneyUseCase, RealUseCaseExample } from "@/types/catalog";

type ToolCopySource = Omit<LocalizedTool, "whatItActuallyDoes" | "whoShouldUseSummary" | "realUseCaseExample" | "compareProfile">;

type WorkflowKind =
  | "writing"
  | "research"
  | "docs"
  | "presentation"
  | "browser"
  | "meeting"
  | "image"
  | "ads"
  | "video"
  | "audio";

const genericEnglishMarkers = [
  "is an ai tool used for",
  "is built for",
  "it can be a strong fit",
  "move faster in",
  "paid service",
  "repeatable service packages",
  "internal throughput"
];

const genericTurkishMarkers = [
  "kullanılan bir ai aracıdır",
  "zaman kazanmak",
  "gerçek iş akışlarına kolayca uyarlanabilir",
  "müşteri işi hızlandırma",
  "paket hizmet üretimi",
  "iş süreçleri verimli hale getirme"
];

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripTrailingPunctuation(value: string) {
  return normalizeText(value).replace(/[.!?]+$/g, "").trim();
}

function ensureSentence(value: string) {
  const text = normalizeText(value);

  if (!text) {
    return text;
  }

  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function clipText(value: string, maxLength = 160) {
  const text = normalizeText(value);

  if (text.length <= maxLength) {
    return text;
  }

  const clipped = text.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");

  return `${(lastSpace > 90 ? clipped.slice(0, lastSpace) : clipped).trim()}...`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function lowerFirst(locale: Locale, value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US") + value.slice(1);
}

function joinList(locale: Locale, items: string[]) {
  if (items.length === 0) {
    if (locale === "tr") {
      return "genel kullanıcılar";
    }

    if (locale === "en") {
      return "general users";
    }

    return localizeString(locale, "general users");
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    if (locale === "tr") {
      return `${items[0]} ve ${items[1]}`;
    }

    if (locale === "en") {
      return `${items[0]} and ${items[1]}`;
    }

    return localizeString(locale, `${items[0]} and ${items[1]}`);
  }

  const head = items.slice(0, -1).join(", ");
  const tail = items.at(-1);

  if (locale === "tr") {
    return `${head} ve ${tail}`;
  }

  if (locale === "en") {
    return `${head}, and ${tail}`;
  }

  return localizeString(locale, `${head}, and ${tail}`);
}


type CategorySlug = "writing" | "image" | "video" | "productivity";

const categoryLabelsBase: Record<"tr" | "en", Record<CategorySlug, string>> = {
  tr: {
    writing: "yazı",
    image: "görsel",
    video: "video",
    productivity: "verimlilik"
  },
  en: {
    writing: "writing",
    image: "image",
    video: "video",
    productivity: "productivity"
  }
};

const categoryLabels = Object.fromEntries(
  locales.map((locale) => [locale, localizeTree(locale, categoryLabelsBase[getContentBaseLocale(locale)])])
) as Record<Locale, Record<CategorySlug, string>>;

const categoryActionsBase: Record<"tr" | "en", Record<CategorySlug, string>> = {
  tr: {
    writing: "taslak yazma, yeniden yazım, özetleme ve araştırma destekli metin üretimi",
    image: "konsept görsel, sosyal medya varlığı ve yaratıcı varyasyon üretimi",
    video: "senaryo hazırlama, kısa form video akışı ve kurgu taslağı",
    productivity: "not, doküman, görev ve toplantı özeti düzenleme"
  },
  en: {
    writing: "draft writing, rewriting, summarization, and research-assisted text work",
    image: "concept visuals, social assets, and creative variation generation",
    video: "script drafting, short-form video workflows, and rough-cut planning",
    productivity: "notes, documents, tasks, and meeting summary workflows"
  }
};

const categoryActions = Object.fromEntries(
  locales.map((locale) => [locale, localizeTree(locale, categoryActionsBase[getContentBaseLocale(locale)])])
) as Record<Locale, Record<CategorySlug, string>>;

function getPrimaryCategorySlug(tool: Pick<ToolCopySource, "toolCategorySlugs">): CategorySlug {
  return (tool.toolCategorySlugs[0] as CategorySlug | undefined) ?? "writing";
}

function getCategoryLabel(locale: Locale, tool: Pick<ToolCopySource, "toolCategorySlugs">) {
  return categoryLabels[locale][getPrimaryCategorySlug(tool)];
}

function getCategoryAction(locale: Locale, tool: Pick<ToolCopySource, "toolCategorySlugs">) {
  return categoryActions[locale][getPrimaryCategorySlug(tool)];
}

function isMeaningfulText(locale: Locale, value: string) {
  const text = stripTrailingPunctuation(value).toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");

  if (text.length < 8) {
    return false;
  }

  const markers = locale === "tr" ? genericTurkishMarkers : genericEnglishMarkers;
  return !markers.some((marker) => text.includes(marker));
}
function extractCapabilityFragment(
  locale: Locale,
  tool: Pick<ToolCopySource, "name" | "shortDescription" | "longDescription" | "bestUseCase" | "features">
) {
  const namePattern = new RegExp(`^${escapeRegExp(tool.name)}[, ]*`, "i");
  const featureCandidates = tool.features
    .map((feature) => stripTrailingPunctuation(feature))
    .filter((feature) => isMeaningfulText(locale, feature))
    .slice(0, 3);

  if (featureCandidates.length > 0) {
    return joinList(locale, featureCandidates);
  }

  const candidates = [tool.shortDescription, tool.longDescription, tool.bestUseCase]
    .map((value) => normalizeText(value).replace(namePattern, ""))
    .filter(Boolean);

  const englishPatterns = [
    /used for ([^.]+)/i,
    /built for ([^.]+)/i,
    /focused on ([^.]+)/i,
    /designed for ([^.]+)/i,
    /(?:assistant|tool|platform|workspace|suite|service|app|editor|generator|copilot) for ([^.]+)/i,
    /helps with ([^.]+)/i,
    /supports ([^.]+)/i
  ];

  const turkishPatterns = [
    /(.+?) için kullanılan bir ai aracıdır/i,
    /(.+?) için kullanılan bir araçtır/i,
    /(.+?) için kullanılır/i,
    /(.+?) odaklı/i,
    /(.+?) hızlandıran/i,
    /(.+?) sağlayan/i
  ];

  for (const candidate of candidates) {
    const patterns = locale === "tr" ? turkishPatterns : englishPatterns;

    for (const pattern of patterns) {
      const match = candidate.match(pattern);
      const fragment = stripTrailingPunctuation(match?.[1] ?? "");

      if (fragment) {
        return fragment;
      }
    }
  }

  if (stripTrailingPunctuation(tool.bestUseCase)) {
    return stripTrailingPunctuation(tool.bestUseCase);
  }

  return locale === "tr" ? "net iş akışları" : locale === "en" ? "clear workflows" : localizeString(locale, "clear workflows");
}

function detectWorkflowKind(locale: Locale, tool: Pick<ToolCopySource, "toolCategorySlugs" | "bestUseCase">, capability: string): WorkflowKind {
  const combined = `${capability} ${tool.bestUseCase}`.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");

  if (/(presentation|slide|deck|sunum|slayt)/.test(combined)) {
    return "presentation";
  }

  if (/(browser|tarayıcı|page summary|workflow prompt|sayfa özeti)/.test(combined)) {
    return "browser";
  }

  if (/(meeting|call|transcript|toplantı|çağrı|notlar)/.test(combined)) {
    return "meeting";
  }

  if (/(ad creative|campaign asset|creative|reklam|kampanya)/.test(combined)) {
    return "ads";
  }

  if (/(voice|audio|speech|ses|voice-over|narration)/.test(combined)) {
    return "audio";
  }

  if (tool.toolCategorySlugs.includes("video") || /(video|motion|clip|promo|avatar)/.test(combined)) {
    return "video";
  }

  if (tool.toolCategorySlugs.includes("image") || /(image|visual|design|görsel|tasarım)/.test(combined)) {
    return "image";
  }

  if (/(research|source|brief|araştırma|kaynak)/.test(combined)) {
    return "research";
  }

  if (/(docs|documentation|notes|tasks|project|workflow|doküman|görev|iş akışı|not)/.test(combined)) {
    return "docs";
  }

  return "writing";
}

function buildWhatItActuallyDoes(
  locale: Locale,
  tool: Pick<ToolCopySource, "name" | "toolCategorySlugs">,
  capability: string
) {
  const cleanCapability = stripTrailingPunctuation(capability);
  const categoryLabel = getCategoryLabel(locale, tool);
  const categoryAction = getCategoryAction(locale, tool);

  switch (locale) {
    case "tr":
      return `${tool.name}, ${categoryAction} için kullanılan bir ${categoryLabel} aracıdır. Öne çıkan tarafı ${cleanCapability}.`;
    case "en":
      return `${tool.name} is a ${categoryLabel} tool built for ${categoryAction}. Its standout angle is ${cleanCapability}.`;
    case "ar":
      return `${tool.name} أداة ${categoryLabel} مخصصة لـ ${categoryAction}. أبرز ما يميزها هو ${cleanCapability}.`;
    case "ru":
      return `${tool.name} — инструмент в категории ${categoryLabel}, созданный для ${categoryAction}. Его сильная сторона — ${cleanCapability}.`;
    case "zh":
      return `${tool.name} 是一款面向 ${categoryAction} 的${categoryLabel}工具，最突出的特点是 ${cleanCapability}。`;
    case "ja":
      return `${tool.name} は ${categoryAction} のために作られた${categoryLabel}ツールです。特に優れている点は ${cleanCapability} です。`;
    case "ko":
      return `${tool.name}는 ${categoryAction}에 맞춰진 ${categoryLabel} 도구이며, 가장 눈에 띄는 강점은 ${cleanCapability}입니다.`;
    case "el":
      return `Το ${tool.name} είναι εργαλείο ${categoryLabel} για ${categoryAction}. Το πιο δυνατό του σημείο είναι ${cleanCapability}.`;
    case "da":
      return `${tool.name} er et ${categoryLabel}-værktøj bygget til ${categoryAction}. Det skiller sig især ud med ${cleanCapability}.`;
    case "fa":
      return `${tool.name} یک ابزار ${categoryLabel} برای ${categoryAction} است و مهم‌ترین نقطه قوت آن ${cleanCapability} است.`;
  }
}

function buildWhoShouldUseSummary(locale: Locale, tool: Pick<ToolCopySource, "whoShouldUse" | "bestUseCase">) {
  const audience = joinList(locale, tool.whoShouldUse.slice(0, 3));
  const bestUseCase = lowerFirst(locale, stripTrailingPunctuation(tool.bestUseCase));

  switch (locale) {
    case "tr":
      return `En çok ${audience} için uygundur; özellikle ${bestUseCase} tarafında hızlı değer verir.`;
    case "en":
      return `Best for ${audience} that need ${bestUseCase} workflows.`;
    case "ar":
      return `يناسب أكثر ${audience} ممن يحتاجون إلى سير عمل ${bestUseCase}.`;
    case "ru":
      return `Лучше всего подходит для ${audience}, которым нужен сценарий ${bestUseCase}.`;
    case "zh":
      return `最适合需要 ${bestUseCase} 工作流的 ${audience}。`;
    case "ja":
      return `${bestUseCase} のワークフローを必要とする ${audience} に最適です。`;
    case "ko":
      return `${bestUseCase} 워크플로가 필요한 ${audience}에게 가장 잘 맞습니다.`;
    case "el":
      return `Ταιριάζει περισσότερο σε ${audience} που χρειάζονται ροές εργασίας για ${bestUseCase}.`;
    case "da":
      return `Bedst til ${audience}, der har brug for workflows til ${bestUseCase}.`;
    case "fa":
      return `برای ${audience} که به جریان کاری ${bestUseCase} نیاز دارند مناسب‌تر است.`;
  }
}

function buildShortDescription(locale: Locale, toolName: string, capability: string, audience: string) {
  const cleanCapability = stripTrailingPunctuation(capability);

  switch (locale) {
    case "tr":
      return `${toolName}, ${cleanCapability} için kullanılır. Özellikle ${audience} için uygundur.`;
    case "en":
      return `${toolName} helps with ${cleanCapability}. Best for ${audience}.`;
    case "ar":
      return `${toolName} يساعد في ${cleanCapability}. وهو مناسب خصوصًا لـ ${audience}.`;
    case "ru":
      return `${toolName} помогает с задачами ${cleanCapability}. Особенно полезен для ${audience}.`;
    case "zh":
      return `${toolName} 可用于 ${cleanCapability}，尤其适合 ${audience}。`;
    case "ja":
      return `${toolName} は ${cleanCapability} に役立ち、特に ${audience} に向いています。`;
    case "ko":
      return `${toolName}는 ${cleanCapability} 작업을 돕고, 특히 ${audience}에게 잘 맞습니다.`;
    case "el":
      return `Το ${toolName} βοηθά σε ${cleanCapability} και ταιριάζει ιδιαίτερα σε ${audience}.`;
    case "da":
      return `${toolName} hjælper med ${cleanCapability} og passer især til ${audience}.`;
    case "fa":
      return `${toolName} برای ${cleanCapability} کمک می‌کند و به‌ویژه برای ${audience} مناسب است.`;
  }
}

function buildSeoTitle(locale: Locale, toolName: string, bestUseCase: string) {
  switch (locale) {
    case "tr":
      return `${toolName} incelemesi (2026): ${bestUseCase}, fiyat ve kullanım alanları`;
    case "en":
      return `${toolName} Review (2026): ${bestUseCase}, Pricing & Use Cases`;
    case "ar":
      return `مراجعة ${toolName} (2026): ${bestUseCase} والأسعار وحالات الاستخدام`;
    case "ru":
      return `Обзор ${toolName} (2026): ${bestUseCase}, цены и сценарии использования`;
    case "zh":
      return `${toolName} 评测（2026）：${bestUseCase}、价格与使用场景`;
    case "ja":
      return `${toolName} レビュー（2026）：${bestUseCase}、価格、利用シーン`;
    case "ko":
      return `${toolName} 리뷰 (2026): ${bestUseCase}, 가격 및 활용 사례`;
    case "el":
      return `Αξιολόγηση ${toolName} (2026): ${bestUseCase}, τιμές και χρήσεις`;
    case "da":
      return `${toolName} anmeldelse (2026): ${bestUseCase}, priser og brugsscenarier`;
    case "fa":
      return `بررسی ${toolName} (2026): ${bestUseCase}، قیمت و کاربردها`;
  }
}

function buildRealUseCaseExample(locale: Locale, tool: Pick<ToolCopySource, "name" | "bestUseCase">, workflowKind: WorkflowKind): RealUseCaseExample {
  const bestUseCase = lowerFirst(locale, stripTrailingPunctuation(tool.bestUseCase));
  const examplesBase: Record<"tr" | "en", Record<WorkflowKind, RealUseCaseExample>> = {
    tr: {
      writing: {
        title: "İlk müşteri taslağını hızlıca çıkar",
        description: `Bir freelancer ${tool.name} ile ${bestUseCase} için ilk taslağı hazırlayıp final düzenlemeyi sonra yapabilir.`
      },
      research: {
        title: "Yazıdan önce araştırma brifi hazırla",
        description: `Bir araştırmacı ${tool.name} ile kaynakları toparlayıp kısa bir brif çıkarabilir, sonra asıl teslimi daha hızlı yazabilir.`
      },
      docs: {
        title: "Görevleri ve dokümanları tek taslakta topla",
        description: `Küçük bir ekip ${tool.name} ile görevleri, notları ve sonraki adımları tek çalışma taslağında toplayıp ekiple paylaşabilir.`
      },
      presentation: {
        title: "Kaba notları ilk müşteri sunumuna çevir",
        description: `Bir danışman ${tool.name} ile kaba notları ilk müşteri sunumuna çevirebilir, sonra final slaytları düzenleyebilir.`
      },
      browser: {
        title: "Rakip sayfalarını brife dönüştür",
        description: `Bir operatör ${tool.name} ile rakip sayfalarını özetleyip önemli noktaları çıkarabilir ve bunları hızlıca araştırma briefine çevirebilir.`
      },
      meeting: {
        title: "Toplantı sonrası aksiyonları hemen paylaş",
        description: `Bir operasyon ekibi ${tool.name} ile toplantı notlarını özetleyip aksiyon maddelerini çağrı biter bitmez paylaşabilir.`
      },
      image: {
        title: "Müşteri yorumu için ilk görsel setini üret",
        description: `Bir tasarımcı ${tool.name} ile ilk görsel yönleri hazırlayıp en güçlü seçeneği müşteriye sunmadan önce hızlıca karşılaştırabilir.`
      },
      ads: {
        title: "Tek brieften birden fazla reklam açısı çıkar",
        description: `Bir performans pazarlamacısı ${tool.name} ile aynı kampanya briefinden birden fazla reklam açısı üretip test için en güçlü varyasyonları seçebilir.`
      },
      video: {
        title: "Manuel düzenlemeden önce ilk video kurgusunu kur",
        description: `Bir içerik üreticisi ${tool.name} ile kısa video kurgusunun ilk versiyonunu çıkarıp final düzenlemeyi daha az zamanla tamamlayabilir.`
      },
      audio: {
        title: "Sesli anlatımın ilk örneğini üret",
        description: `Bir üretici ${tool.name} ile sesli anlatımın ilk örneğini hazırlayıp yayın öncesi tonu ve ritmi daha rahat düzenleyebilir.`
      }
    },
    en: {
      writing: {
        title: "Draft the first client-ready version faster",
        description: `A freelancer can use ${tool.name} to draft a first version of landing page copy, an email sequence, or a blog outline before final editing.`
      },
      research: {
        title: "Build a brief before writing the final piece",
        description: `A researcher can use ${tool.name} to collect sources and shape a short working brief before writing the final deliverable.`
      },
      docs: {
        title: "Organize tasks and docs in one working draft",
        description: `A small team can use ${tool.name} to collect tasks, notes, and next steps in one shared working draft before handoff.`
      },
      presentation: {
        title: "Turn rough notes into a first client deck",
        description: `A consultant can use ${tool.name} to turn rough notes into a first client deck, then polish the final slides before presenting them.`
      },
      browser: {
        title: "Summarize pages before building a brief",
        description: `An operator can use ${tool.name} to review competitor pages, pull the important points, and turn them into a research brief faster.`
      },
      meeting: {
        title: "Share action items right after the call",
        description: `An operations team can use ${tool.name} to summarize meeting notes and share action items as soon as the call ends.`
      },
      image: {
        title: "Create first-pass visuals for client review",
        description: `A designer can use ${tool.name} to create initial visual directions, compare the strongest options, and send a cleaner first round to a client.`
      },
      ads: {
        title: "Generate multiple ad angles from one brief",
        description: `A marketer can use ${tool.name} to generate several ad angles from one campaign brief and choose the strongest versions for testing.`
      },
      video: {
        title: "Build a first video cut before manual polish",
        description: `A creator can use ${tool.name} to assemble a first video cut, then spend the remaining time on final polish instead of blank-page work.`
      },
      audio: {
        title: "Create a quick narration or voice sample",
        description: `A creator can use ${tool.name} to produce a first narration or voice sample, then refine tone and pacing before publishing.`
      }
    }
  };

  const examples = Object.fromEntries(
    locales.map((itemLocale) => [itemLocale, localizeTree(itemLocale, examplesBase[getContentBaseLocale(itemLocale)])])
  ) as Record<Locale, Record<WorkflowKind, RealUseCaseExample>>;

  return examples[locale][workflowKind];
}

function isGenericMoneyUseCase(locale: Locale, item: MoneyUseCase) {
  const text = `${item.title} ${item.description}`.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
  const markers = locale === "tr" ? genericTurkishMarkers : genericEnglishMarkers;

  return text.includes("?") || text.length < 35 || markers.some((marker) => text.includes(marker));
}

function buildMoneyUseCaseTemplates(locale: Locale, tool: Pick<ToolCopySource, "name" | "bestUseCase">, workflowKind: WorkflowKind) {
  const bestUseCase = lowerFirst(locale, stripTrailingPunctuation(tool.bestUseCase));

  type MoneyUseCaseGroup = "text" | "presentation" | "visual" | "media";
  const groupsBase: Record<MoneyUseCaseGroup, Record<"tr" | "en", MoneyUseCase[]>> = {
    text: {
      tr: [
        {
          title: "Müşteri teslimi için ilk taslak",
          description: `${tool.name} ile ilk taslağı, özeti veya briefi daha hızlı hazırlayıp final düzenlemeyi ücretli teslim aşamasına saklayabilirsiniz.`
        },
        {
          title: "Araştırma ve hazırlık işi",
          description: `Notları, kaynakları veya dağınık fikirleri temiz bir çalışma taslağına çevirip hazırlık süresini kısaltabilirsiniz.`
        },
        {
          title: "Tekrarlayan hizmet paketi",
          description: `${bestUseCase} etrafında aylık içerik, dokümantasyon veya araştırma hizmeti kurgulayıp işi paketleyebilirsiniz.`
        },
        {
          title: "İç operasyon desteği",
          description: `${bestUseCase} tarafındaki manuel hazırlığı azaltıp daha fazla zamanı editoryal karar, strateji ve final kalite kontrolüne ayırabilirsiniz.`
        }
      ],
      en: [
        {
          title: "Client-ready first draft",
          description: `Use ${tool.name} to prepare a first-pass draft, summary, or brief faster, then save human review for the paid delivery stage.`
        },
        {
          title: "Research and prep work",
          description: `Turn notes, sources, or rough ideas into a cleaner working draft so billable work starts faster.`
        },
        {
          title: "Recurring service packages",
          description: `Wrap ${bestUseCase} into a monthly content, documentation, or research offer instead of selling isolated prompts.`
        },
        {
          title: "Internal workflow support",
          description: `Reduce manual prep around ${bestUseCase} so more time goes into editing, strategy, and final delivery.`
        }
      ]
    },
    presentation: {
      tr: [
        {
          title: "İlk müşteri deck'ini oluşturma",
          description: `${tool.name} ile kaba notları ilk deck taslağına çevirip sunum işini daha hızlı teslim edebilirsiniz.`
        },
        {
          title: "Revizyon turunu kısaltma",
          description: `Slayt yapısını daha hızlı güncelleyip müşteri geri bildiriminden sonraki versiyonları daha az zamanla çıkarabilirsiniz.`
        },
        {
          title: "Sunum hizmetini paketleme",
          description: `Tek seferlik slayt işi yerine düzenli sunum, teklif deck'i veya iç rapor paketi satabilirsiniz.`
        },
        {
          title: "İç ekip sunumları",
          description: `Satış, operasyon veya yönetim ekipleri için tekrar eden sunum hazırlığını daha düzenli hale getirebilirsiniz.`
        }
      ],
      en: [
        {
          title: "First client deck production",
          description: `Use ${tool.name} to turn rough notes into a first presentation draft and deliver decks faster.`
        },
        {
          title: "Shorter revision rounds",
          description: `Update slide structure faster after feedback and reduce the time between versions.`
        },
        {
          title: "Repeatable deck services",
          description: `Sell presentation support as a recurring offer instead of handling slide work as one-off busywork.`
        },
        {
          title: "Internal presentation support",
          description: `Support sales, operations, or leadership teams with faster recurring presentation prep.`
        }
      ]
    },
    visual: {
      tr: [
        {
          title: "Müşteri yorumu için ilk kreatif set",
          description: `${tool.name} ile ilk görsel yönleri hızla çıkarıp müşteri onayına daha erken gidebilirsiniz.`
        },
        {
          title: "Varyasyon üretimi",
          description: `Aynı brieften birden fazla görsel veya reklam varyasyonu çıkarıp test sürecini hızlandırabilirsiniz.`
        },
        {
          title: "Tekrarlayan kreatif hizmet",
          description: `Kampanya kreatifi, sosyal medya seti veya konsept paketi gibi tekrar eden teklifler oluşturabilirsiniz.`
        },
        {
          title: "Asset ve şablon üretimi",
          description: `En iyi çıktıları şablon, asset paketi veya tekrar satılabilir kreatif setlere dönüştürebilirsiniz.`
        }
      ],
      en: [
        {
          title: "First-pass client concepts",
          description: `Use ${tool.name} to create initial visual directions faster and reach client review earlier.`
        },
        {
          title: "Creative variation output",
          description: `Generate multiple visual or ad variations from one brief and speed up testing.`
        },
        {
          title: "Repeatable creative services",
          description: `Package campaign creative, social asset sets, or concept work into recurring offers.`
        },
        {
          title: "Asset and template packs",
          description: `Turn the strongest outputs into reusable asset packs, templates, or sellable creative collections.`
        }
      ]
    },
    media: {
      tr: [
        {
          title: "İlk medya versiyonunu hızlı çıkar",
          description: `${tool.name} ile ilk video veya ses taslağını oluşturup manuel düzenlemeye daha fazla zaman bırakabilirsiniz.`
        },
        {
          title: "Revizyon süresini azalt",
          description: `Alternatif sahne, kurgu veya anlatım versiyonlarını daha hızlı hazırlayıp geri bildirim döngüsünü kısaltabilirsiniz.`
        },
        {
          title: "Tekrarlayan medya teklifi",
          description: `Kısa video, voice-over veya medya paketi gibi tekrar eden hizmetler oluşturabilirsiniz.`
        },
        {
          title: "Çoklu format teslim",
          description: `Tek bir üretim akışını kısa klip, reklam ve yeniden kullanım içeriğine çevirerek daha fazla teslim çıkarabilirsiniz.`
        }
      ],
      en: [
        {
          title: "Fast first media version",
          description: `Use ${tool.name} to build a first video or audio draft faster and leave more time for manual polish.`
        },
        {
          title: "Shorter revision loops",
          description: `Prepare alternate scenes, cuts, or narration versions faster after feedback.`
        },
        {
          title: "Recurring media offers",
          description: `Turn short-form video, voice-over, or media production into a repeatable service package.`
        },
        {
          title: "Multi-format delivery",
          description: `Expand one production workflow into clips, ads, and repurposed media deliverables.`
        }
      ]
    }
  };

  const groups = Object.fromEntries(
    locales.map((itemLocale) => [
      itemLocale,
      Object.fromEntries(
        (Object.entries(groupsBase) as [MoneyUseCaseGroup, Record<"tr" | "en", MoneyUseCase[]>][]).map(([group, localizedBase]) => [
          group,
          localizeTree(itemLocale, localizedBase[getContentBaseLocale(itemLocale)])
        ])
      ) as Record<MoneyUseCaseGroup, MoneyUseCase[]>
    ])
  ) as Record<Locale, Record<MoneyUseCaseGroup, MoneyUseCase[]>>;

  const group =
    workflowKind === "presentation"
      ? "presentation"
      : workflowKind === "image" || workflowKind === "ads"
        ? "visual"
        : workflowKind === "video" || workflowKind === "audio"
          ? "media"
          : "text";

  return groups[locale][group];
}

export function enrichToolCopy(locale: Locale, tool: ToolCopySource): LocalizedTool {
  const capability = extractCapabilityFragment(locale, tool);
  const workflowKind = detectWorkflowKind(locale, tool, capability);
  const whatItActuallyDoes = buildWhatItActuallyDoes(locale, tool, capability);
  const whoShouldUseSummary = buildWhoShouldUseSummary(locale, tool);
  const realUseCaseExample = buildRealUseCaseExample(locale, tool, workflowKind);
  const rewrittenMoneyUseCases = tool.moneyUseCases.some((item) => isGenericMoneyUseCase(locale, item))
    ? buildMoneyUseCaseTemplates(locale, tool, workflowKind).slice(0, tool.moneyUseCases.length)
    : tool.moneyUseCases;

  const shortDescription = buildShortDescription(
    locale,
    tool.name,
    capability,
    joinList(locale, tool.whoShouldUse.slice(0, 2))
  );

  const longDescription = `${whatItActuallyDoes} ${whoShouldUseSummary} ${realUseCaseExample.description}`;
  const seoTitle = buildSeoTitle(locale, tool.name, tool.bestUseCase);
  const seoDescription = clipText(`${shortDescription} ${realUseCaseExample.description}`);

  return {
    ...tool,
    shortDescription: ensureSentence(shortDescription),
    longDescription: ensureSentence(longDescription),
    whatItActuallyDoes,
    whoShouldUseSummary,
    realUseCaseExample: {
      title: ensureSentence(realUseCaseExample.title),
      description: ensureSentence(realUseCaseExample.description)
    },
    moneyUseCases: rewrittenMoneyUseCases.map((item) => ({
      title: normalizeText(item.title),
      description: ensureSentence(item.description)
    })),
    seoTitle,
    seoDescription,
    compareProfile: buildToolCompareProfile(locale, tool)
  };
}


