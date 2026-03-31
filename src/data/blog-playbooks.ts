import type { Locale } from "@/i18n/config";
import type { BlogSection, BlogSubSection } from "@/types/blog";

type PlaybookLocale = {
  scenarioParagraphs: string[];
  stepCards: { title: string; paragraphs: string[]; bullets?: string[] }[];
  earningsParagraphs: string[];
  earningsItems: { label: string; value: string }[];
  failParagraphs: string[];
  failBullets: string[];
  toolsParagraphs: string[];
  toolItems: { label: string; value: string }[];
  caseParagraphs: string[];
};

type Playbook = {
  tr: PlaybookLocale;
  en: PlaybookLocale;
};

const section = (
  title: string,
  paragraphs: string[],
  options?: {
    bullets?: string[];
    subSections?: BlogSubSection[];
    comparison?: { title: string; items: { label: string; value: string }[] };
  }
): BlogSection => ({
  title,
  paragraphs,
  bullets: options?.bullets,
  subSections: options?.subSections,
  comparison: options?.comparison
});

const sub = (
  title: string,
  paragraphs: string[],
  bullets?: string[]
): BlogSubSection => ({ title, paragraphs, bullets });

const freeStarterPlaybook: Playbook = {
  tr: {
    scenarioParagraphs: [
      "Gerçek senaryoda ücretsiz araç arayan kişi çoğu zaman öğrenci, yeni freelancer veya ilk ürününü test eden solo operatördür. Bu kullanıcı için soru 'bedava mı?' değil, 'ilk gerçek çıktıyı çıkarabiliyor muyum?' sorusudur.",
      "Örneğin bir freelancer, [ChatGPT] veya [Perplexity] ile ilk araştırma özetini hazırlayıp küçük bir teklif çıkabilir. Bir öğrenci [Gemini] ile ders özeti hazırlarken, içerik üreticisi [Canva AI] ile ilk görsel teslimini test edebilir."
    ],
    stepCards: [
      { title: "Step 1: Tek görev seç", paragraphs: ["Önce tek bir görev seç: araştırma özeti, kısa blog taslağı, sunum taslağı veya temel sosyal medya görseli.", "Ücretsiz planı gerçek görev üzerinde test etmek, özellik listesi okumaktan çok daha değerlidir."], bullets: ["Araştırma özeti", "Kısa taslak", "Sunum taslağı"] },
      { title: "Step 2: Çıktıyı satılabilir hale getir", paragraphs: ["Ham çıktıyı direkt teslim etme. Kısa düzenleme, başlık temizliği ve örnek ekleme ile çıktıyı kullanılabilir hale getir.", "Buradaki amaç AI'a güvenmek değil, teslimi daha hızlı hazırlamaktır."], bullets: ["Kısa edit", "Basit formatlama", "İnsan kontrolü"] },
      { title: "Step 3: Limit geldiğinde karar ver", paragraphs: ["Ücretsiz plan gerçekten işe yarıyor ama limit yüzünden süreç duruyorsa ücretli plan mantıklı hale gelir.", "Fit yoksa planı büyütmek yerine aracı değiştirmek daha doğrudur."], bullets: ["Önce doğrula", "Sonra yükselt", "Gerekirse değiştir"] }
    ],
    earningsParagraphs: [
      "Ücretsiz araçlarla doğrudan büyük gelir beklemek gerçekçi değildir. Ama küçük teslimleri test etmek, ilk müşteri geri bildirimini almak ve hangi iş modelinin çalıştığını görmek için yeterlidir.",
      "Düşük senaryoda kullanıcı ayda birkaç küçük teslimle sınırlı kalır. Orta senaryoda araştırma, içerik veya basit görsel işiyle düzenli ek gelir oluşabilir. İyi senaryoda ise ücretsiz plan sadece doğrulama aşaması olur ve ücretli plana geçiş gerekebilir."
    ],
    earningsItems: [
      { label: "Düşük senaryo", value: "$50-$150 / ay - küçük test teslimleri" },
      { label: "Orta senaryo", value: "$150-$400 / ay - tekrar eden küçük işler" },
      { label: "İyi senaryo", value: "$400+ / ay - artık ücretli plana geçiş gerekebilir" }
    ],
    failParagraphs: [
      "Çoğu kişi ücretsiz aracı gelir sistemi yerine sihirli çözüm gibi görür. Oysa araç ücretsiz olsa da müşteriye değer sunmayan çıktı para kazandırmaz.",
      "İkinci hata, ücretsiz planın limitlerini iş modeli kurmadan önce görmezden gelmektir. Eğer süreç daha ilk haftada tıkanıyorsa, darboğazı erken fark etmek gerekir."
    ],
    failBullets: ["Ham çıktıyı teslim etmek", "Tek aracı her iş için zorlamak", "Limitleri planlamamak", "İlk geri bildirimi toplamamak"],
    toolsParagraphs: [
      "[ChatGPT] ve [Gemini] hızlı taslak ve özet için mantıklıdır. [Perplexity] kaynaklı araştırmada daha faydalı olabilir. [Canva AI] basit görsel teslim ve sunum akışında daha pratik hissettirebilir.",
      "Araç seçimi, görev tipine göre yapılmalıdır. Ücretsiz araç listesi, ancak iş bağlamı ile birlikte anlamlı hale gelir."
    ],
    toolItems: [
      { label: "Taslak ve özet", value: "ChatGPT / Gemini" },
      { label: "Kaynaklı araştırma", value: "Perplexity" },
      { label: "Görsel ve sunum", value: "Canva AI" },
      { label: "Not ve düzen", value: "Notion AI" }
    ],
    caseParagraphs: [
      "Mini örnek: üniversite son sınıfta olan bir kullanıcı, [Perplexity] ile rakip analizi özeti çıkardı ve bunu küçük işletme sahibine haftalık rapor olarak sundu. İlk ay iki küçük teslim aldı.",
      "Sonuç büyük değildi; ama kullanıcı hangi çıktının satıldığını gördü. Bu, ücretsiz plandan ücretli sisteme geçmeden önce en değerli öğrenme oldu."
    ]
  },
  en: {
    scenarioParagraphs: [
      "In a real scenario, the person looking for free AI tools is usually a student, new freelancer, or solo operator testing a first offer. The key question is not 'is it free?' but 'can it produce a usable first result?'",
      "A freelancer may use ChatGPT or Perplexity for a first research summary. A student may use Gemini for study notes. A creator may use Canva AI for a first visual deliverable."
    ],
    stepCards: [
      { title: "Step 1: Pick one real task", paragraphs: ["Choose one task first: a research summary, short draft, slide outline, or simple visual asset.", "Testing a free plan on real work is more valuable than reading feature lists."], bullets: ["Research summary", "Short draft", "Slide outline"] },
      { title: "Step 2: Make the output deliverable", paragraphs: ["Do not ship raw output. Add editing, cleanup, and a simple structure layer.", "The goal is not to trust the app blindly. The goal is to reduce effort while keeping the result usable."], bullets: ["Short edit", "Simple formatting", "Human review"] },
      { title: "Step 3: Decide when friction is real", paragraphs: ["If the free plan works but usage caps keep blocking the workflow, paid becomes easier to justify.", "If the fit is weak even before limits matter, switching tools is often smarter than upgrading."], bullets: ["Validate first", "Upgrade later", "Switch if fit is weak"] }
    ],
    earningsParagraphs: [
      "Free tools rarely create large income directly. What they do well is reduce the cost of validation and help users find the first workable deliverable.",
      "In a low scenario the user only lands a few small tasks. In a medium scenario they start turning summaries, drafts, or visuals into repeatable small sales. In a good scenario the free tool becomes a gateway to a paid workflow."
    ],
    earningsItems: [
      { label: "Low scenario", value: "$50-$150/mo - test deliverables" },
      { label: "Medium scenario", value: "$150-$400/mo - repeatable small jobs" },
      { label: "Good scenario", value: "$400+/mo - upgrade likely needed" }
    ],
    failParagraphs: [
      "Most people fail when they treat a free tool like a business model instead of a validation layer. A free plan does not matter if the output has no real value.",
      "The second failure point is ignoring limits until the workflow breaks. Good validation includes knowing when the tool stops being enough."
    ],
    failBullets: ["Shipping raw output", "Forcing one tool into every job", "Ignoring plan limits", "Skipping real-world feedback"],
    toolsParagraphs: [
      "ChatGPT and Gemini often fit quick drafting and summarization. Perplexity fits source-backed research better. Canva AI is more practical when a visual or slide deliverable is involved.",
      "A free-tool list only becomes useful when each tool is attached to a clear job." 
    ],
    toolItems: [
      { label: "Drafts and summaries", value: "ChatGPT / Gemini" },
      { label: "Source-backed research", value: "Perplexity" },
      { label: "Visual and slides", value: "Canva AI" },
      { label: "Notes and structure", value: "Notion AI" }
    ],
    caseParagraphs: [
      "Mini case: a student freelancer used Perplexity to prepare a short competitor summary and sold it as a lightweight weekly report to a small business owner.",
      "The result was modest, but it showed which output people would actually pay for before any serious tool spend happened."
    ]
  }
};
const beginnerLaunchPlaybook: Playbook = {
  tr: {
    scenarioParagraphs: [
      "Ger\u00e7ek senaryoda yeni ba\u015flayan biri tek seferde on ara\u00e7 \u00f6\u011frenmeye \u00e7al\u0131\u015fmaz. Genelde bir \u00f6\u011frenci, yeni freelancer veya k\u00fc\u00e7\u00fck i\u015fletme sahibi ilk haftada hangi arac\u0131n ger\u00e7ekten i\u015fine yarad\u0131\u011f\u0131n\u0131 anlamaya \u00e7al\u0131\u015f\u0131r.",
      "Bu y\u00fczden ChatGPT, Gemini, Perplexity, Canva AI ve Notion AI gibi ara\u00e7lar 'en pop\u00fcler' olduklar\u0131 i\u00e7in de\u011fil, ilk fayday\u0131 h\u0131zl\u0131 g\u00f6sterdikleri i\u00e7in \u00f6nemlidir."
    ],
    stepCards: [
      { title: "Step 1: \u0130lk g\u00f6revi se\u00e7", paragraphs: ["\u00d6nce tek bir i\u015f belirle: \u00f6zet \u00e7\u0131karmak, fikir toplamak, ara\u015ft\u0131rma yapmak veya sunum haz\u0131rlamak.", "Yeni ba\u015flayan biri i\u00e7in en do\u011fru ara\u00e7, ilk g\u00f6revde h\u0131zl\u0131 sonu\u00e7 verendir."], bullets: ["\u00d6zet", "Taslak", "Ara\u015ft\u0131rma", "Sunum"] },
      { title: "Step 2: Tek ara\u00e7la 7 g\u00fcn dene", paragraphs: ["\u0130lk hafta boyunca tek ara\u00e7la k\u00fc\u00e7\u00fck ama ger\u00e7ek g\u00f6revler \u00e7\u00f6z. B\u00f6ylece arac\u0131n dili, h\u0131z\u0131 ve s\u0131n\u0131rlar\u0131 daha net g\u00f6r\u00fcn\u00fcr.", "Bu a\u015famada ara\u00e7 toplamak yerine kullan\u0131m al\u0131\u015fkanl\u0131\u011f\u0131 kurmak daha de\u011ferlidir."], bullets: ["7 g\u00fcnl\u00fck test", "Tek ara\u00e7 oda\u011f\u0131", "Ger\u00e7ek g\u00f6rev"] },
      { title: "Step 3: \u0130kinci arac\u0131 ihtiya\u00e7 \u00e7\u0131k\u0131nca ekle", paragraphs: ["Genel ara\u00e7 art\u0131k yetmedi\u011finde ikinci katman\u0131 ekle. Ara\u015ft\u0131rma i\u00e7in Perplexity, d\u00fczen i\u00e7in Notion AI, g\u00f6rsel i\u00e7in Canva AI daha mant\u0131kl\u0131 olabilir.", "\u0130htiya\u00e7 olu\u015fmadan stack b\u00fcy\u00fctmek kafa kar\u0131\u015f\u0131kl\u0131\u011f\u0131n\u0131 art\u0131r\u0131r."], bullets: ["\u00d6nce temel ara\u00e7", "Sonra ihtiya\u00e7 bazl\u0131 ekleme", "Gereksiz kalabal\u0131\u011f\u0131 \u00f6nle"] }
    ],
    earningsParagraphs: [
      "Yeni ba\u015flayan biri i\u00e7in ilk hedef b\u00fcy\u00fck gelir de\u011fil, h\u0131zl\u0131 de\u011fer \u00fcretmektir. Do\u011fru ara\u00e7 se\u00e7imi k\u00fc\u00e7\u00fck teslimleri daha h\u0131zl\u0131 haz\u0131rlamay\u0131 m\u00fcmk\u00fcn k\u0131larsa ilk k\u00fc\u00e7\u00fck gelir f\u0131rsat\u0131 da olu\u015fabilir.",
      "D\u00fc\u015f\u00fck senaryoda kullan\u0131c\u0131 sadece kendi i\u015fini h\u0131zland\u0131r\u0131r. Orta senaryoda k\u00fc\u00e7\u00fck freelance teslimler ba\u015flayabilir. \u0130yi senaryoda ise tek g\u00f6revden k\u00fc\u00e7\u00fck ama d\u00fczenli bir ek gelir modeli \u00e7\u0131kabilir."
    ],
    earningsItems: [
      { label: "D\u00fc\u015f\u00fck senaryo", value: "$0-$100 / ay - \u00f6nce ki\u015fisel verim" },
      { label: "Orta senaryo", value: "$100-$300 / ay - ilk k\u00fc\u00e7\u00fck teslimler" },
      { label: "\u0130yi senaryo", value: "$300+ / ay - dar ama tekrar eden servis" }
    ],
    failParagraphs: [
      "\u00c7o\u011fu yeni ba\u015flayan ki\u015fi \u00e7ok fazla ara\u00e7 denedi\u011fi i\u00e7in kal\u0131c\u0131 kullan\u0131m al\u0131\u015fkanl\u0131\u011f\u0131 kuramaz. Bu da arac\u0131 de\u011fil, motivasyonu t\u00fcketir.",
      "Di\u011fer b\u00fcy\u00fck hata, ilk \u00e7\u0131kt\u0131y\u0131 g\u00f6rmeden \u00fccretli plana ge\u00e7mek veya tek bir arac\u0131n her i\u015fi \u00e7\u00f6zece\u011fini sanmakt\u0131r."
    ],
    failBullets: ["\u00c7ok fazla ara\u00e7 denemek", "Ger\u00e7ek g\u00f6rev yerine bo\u015f test yapmak", "\u0130lk haftada \u00fccretli plana ko\u015fmak", "Tek arac\u0131 her i\u015f i\u00e7in zorlamak"],
    toolsParagraphs: [
      "ChatGPT ve Gemini ilk genel kullan\u0131m katman\u0131 i\u00e7in mant\u0131kl\u0131d\u0131r. Perplexity ara\u015ft\u0131rma gerekiyorsa ikinci ara\u00e7 olarak g\u00fc\u00e7l\u00fcd\u00fcr. Canva AI g\u00f6rsel teslimlerde, Notion AI ise d\u00fczen ve not ak\u0131\u015f\u0131nda daha mant\u0131kl\u0131 hissedilir.",
      "Ba\u015flang\u0131\u00e7ta soru 'en g\u00fc\u00e7l\u00fc ara\u00e7 hangisi?' de\u011fil, 'benim ilk i\u015fimi en h\u0131zl\u0131 hangisi \u00e7\u00f6z\u00fcyor?' olmal\u0131d\u0131r."
    ],
    toolItems: [
      { label: "\u0130lk genel kullan\u0131m", value: "ChatGPT / Gemini" },
      { label: "Ara\u015ft\u0131rma", value: "Perplexity" },
      { label: "G\u00f6rsel ba\u015flang\u0131\u00e7", value: "Canva AI" },
      { label: "D\u00fczen ve not", value: "Notion AI" }
    ],
    caseParagraphs: [
      "Mini \u00f6rnek: yeni ba\u015flayan bir kullan\u0131c\u0131 \u00f6nce ChatGPT ile teklif tasla\u011f\u0131 ve \u00f6zet \u00e7\u0131karmay\u0131 \u00f6\u011frendi, sonra ara\u015ft\u0131rma gerekti\u011finde Perplexity ekledi. \u0130lk ay iki k\u00fc\u00e7\u00fck deneme i\u015fi ald\u0131.",
      "Buradaki kazan\u00e7tan daha \u00f6nemli nokta, hangi arac\u0131n hangi g\u00f6revde ger\u00e7ekten i\u015fe yarad\u0131\u011f\u0131n\u0131 g\u00f6rmesiydi. Bu da sonraki se\u00e7imleri \u00e7ok daha kolay hale getirdi."
    ]
  },
  en: {
    scenarioParagraphs: [
      "In a real beginner scenario, the user is not trying to master ten tools at once. They are usually a student, new freelancer, or small operator trying to find the first tool that creates real value in the first week.",
      "That is why tools like ChatGPT, Gemini, Perplexity, Canva AI, and Notion AI matter less because they are famous and more because they can show quick practical value."
    ],
    stepCards: [
      { title: "Step 1: Choose the first task", paragraphs: ["Pick one real job first: summarize, brainstorm, research, or prepare a simple deck.", "The best beginner tool is usually the one that solves the first job with the least friction."], bullets: ["Summary", "Draft", "Research", "Slides"] },
      { title: "Step 2: Use one tool for 7 days", paragraphs: ["Spend the first week on one real workflow. That reveals speed, limits, and usability much faster than random experiments.", "Early consistency matters more than tool collecting."], bullets: ["7-day test", "One-tool focus", "Real tasks"] },
      { title: "Step 3: Add the second tool only when needed", paragraphs: ["Add Perplexity for research, Canva AI for visuals, or Notion AI for organization only after the first tool stops being enough.", "This keeps the learning curve manageable."], bullets: ["Core tool first", "Add by need", "Avoid tool clutter"] }
    ],
    earningsParagraphs: [
      "For beginners, the first goal is not major income. It is practical value. If the right tool helps produce useful drafts, summaries, or simple deliverables faster, small revenue paths become more realistic.",
      "In a low scenario the user only improves personal productivity. In a medium scenario they test small freelance outputs. In a better scenario those outputs turn into a narrow but repeatable offer."
    ],
    earningsItems: [
      { label: "Low scenario", value: "$0-$100/mo - personal productivity first" },
      { label: "Medium scenario", value: "$100-$300/mo - first small deliverables" },
      { label: "Good scenario", value: "$300+/mo - narrow repeatable service" }
    ],
    failParagraphs: [
      "Most beginners fail because they try too many tools too early and never build a repeatable habit around one workflow.",
      "The second issue is paying for tools before the first useful result has even been validated."
    ],
    failBullets: ["Trying too many tools", "Testing without a real task", "Paying too early", "Forcing one tool into every job"],
    toolsParagraphs: [
      "ChatGPT and Gemini usually fit first general use. Perplexity fits research as a second layer. Canva AI fits visual outputs. Notion AI fits note and workflow structure.",
      "The key beginner question is not which tool looks strongest. It is which tool creates the first useful result fastest."
    ],
    toolItems: [
      { label: "General first tool", value: "ChatGPT / Gemini" },
      { label: "Research layer", value: "Perplexity" },
      { label: "Visual starter", value: "Canva AI" },
      { label: "Notes and structure", value: "Notion AI" }
    ],
    caseParagraphs: [
      "Mini case: a new user started with ChatGPT for quick summaries and simple proposal drafts, then added Perplexity only when research quality started to matter.",
      "The first wins were small, but the user quickly learned which tool actually fit the workflow instead of guessing from hype."
    ]
  }
};

const freelancerWorkflowPlaybook: Playbook = {
  tr: {
    scenarioParagraphs: [
      "Ger\u00e7ek senaryoda freelancer i\u00e7in de\u011fer, daha \u00e7ok ara\u00e7 kullanmakta de\u011fil; ayn\u0131 m\u00fc\u015fteriye daha h\u0131zl\u0131 ve daha temiz teslim yapabilmektedir. Bir i\u00e7erik freelancer'\u0131 tasla\u011f\u0131 h\u0131zland\u0131rmak isterken, bir ara\u015ft\u0131rma odakl\u0131 dan\u0131\u015fman kaynak kalitesini \u00f6ne \u00e7\u0131kar\u0131r.",
      "Bu y\u00fczden ChatGPT, Claude, Perplexity, Canva AI ve Notion AI ayn\u0131 anda de\u011fil; teklifin ihtiya\u00e7 duydu\u011fu yerde anlam kazan\u0131r."
    ],
    stepCards: [
      { title: "Step 1: Sat\u0131lacak teslimi netle\u015ftir", paragraphs: ["\u00d6nce hangi \u00e7\u0131kt\u0131y\u0131 satt\u0131\u011f\u0131n\u0131 netle\u015ftir: blog paketi, ara\u015ft\u0131rma \u00f6zeti, sosyal medya kreatifi veya teklif tasla\u011f\u0131.", "Freelancer i\u00e7in ara\u00e7 se\u00e7imi teslim tipinden sonra gelmelidir."], bullets: ["Blog paketi", "Ara\u015ft\u0131rma \u00f6zeti", "Sosyal medya", "Teklif tasla\u011f\u0131"] },
      { title: "Step 2: \u00c7ekirdek arac\u0131 se\u00e7", paragraphs: ["Yaz\u0131 ve taslak i\u00e7in ChatGPT veya Claude, ara\u015ft\u0131rma i\u00e7in Perplexity, g\u00f6rsel destek i\u00e7in Canva AI daha mant\u0131kl\u0131 olabilir.", "\u0130lk a\u015famada tek ana ara\u00e7 se\u00e7mek s\u00fcre\u00e7te netlik sa\u011flar."], bullets: ["Ana ara\u00e7", "Destek ara\u00e7", "G\u00f6reve g\u00f6re se\u00e7im"] },
      { title: "Step 3: Teslim s\u00fcresini \u00f6l\u00e7", paragraphs: ["Ara\u00e7 ger\u00e7ekten zaman kazand\u0131r\u0131yor mu, revizyonu azalt\u0131yor mu ve fiyat\u0131 koruyor mu bunlar\u0131 ilk m\u00fc\u015fterilerde \u00f6l\u00e7.", "Freelancer i\u00e7in en de\u011ferli metrik g\u00f6r\u00fcn\u00fc\u015f de\u011fil marjd\u0131r."], bullets: ["Teslim s\u00fcresi", "Revizyon say\u0131s\u0131", "Marj etkisi"] }
    ],
    earningsParagraphs: [
      "Freelancer i\u00e7in gelir ara\u00e7tan de\u011fil, teslim sisteminden gelir. Do\u011fru ara\u00e7 se\u00e7imi ayn\u0131 i\u015ften daha fazla \u00e7\u0131kt\u0131 almay\u0131 veya ayn\u0131 s\u00fcrede daha kaliteli teslim yapmay\u0131 sa\u011flar.",
      "D\u00fc\u015f\u00fck senaryoda birka\u00e7 k\u00fc\u00e7\u00fck teslim vard\u0131r. Orta senaryoda haftal\u0131k tekrar eden paketler olu\u015fur. \u0130yi senaryoda ise ara\u00e7, marj\u0131 b\u00fcy\u00fcten bir kald\u0131ra\u00e7 haline gelir."
    ],
    earningsItems: [
      { label: "D\u00fc\u015f\u00fck senaryo", value: "$150-$400 / ay - birka\u00e7 k\u00fc\u00e7\u00fck teslim" },
      { label: "Orta senaryo", value: "$400-$1.200 / ay - tekrar eden paketler" },
      { label: "\u0130yi senaryo", value: "$1.200+ / ay - daha y\u00fcksek marjl\u0131 sistem" }
    ],
    failParagraphs: [
      "Freelancer'lar\u0131n \u00e7o\u011fu ara\u00e7 y\u00fcz\u00fcnden de\u011fil, teklifi net olmad\u0131\u011f\u0131 i\u00e7in zorlan\u0131r. Ara\u00e7 g\u00fc\u00e7l\u00fc olsa da m\u00fc\u015fteri \u00e7\u0131kt\u0131y\u0131 net anlam\u0131yorsa sat\u0131\u015f zorla\u015f\u0131r.",
      "Di\u011fer b\u00fcy\u00fck hata ham AI \u00e7\u0131kt\u0131s\u0131n\u0131 teslim etmektir. Bu k\u0131sa vadede h\u0131z kazand\u0131r\u0131r ama uzun vadede g\u00fcven kaybettirir."
    ],
    failBullets: ["Net teslim tan\u0131mlamamak", "Ham \u00e7\u0131kt\u0131 teslim etmek", "\u00c7ok fazla araca ayn\u0131 anda \u00f6deme yapmak", "Teslim s\u00fcresini \u00f6l\u00e7memek"],
    toolsParagraphs: [
      "Claude uzun i\u00e7erikte ve daha d\u00fczenli anlat\u0131mda rahat olabilir. ChatGPT esnek taslak taraf\u0131nda iyi hissedebilir. Perplexity kaynakl\u0131 ara\u015ft\u0131rma gereken i\u015flerde de\u011fer katar. Canva AI g\u00f6rsel ek teslimlerde yard\u0131mc\u0131 olur.",
      "Freelancer i\u00e7in do\u011fru stack, m\u00fc\u015fteriye daha net sonu\u00e7 veren k\u00fc\u00e7\u00fck ve temiz stack'tir."
    ],
    toolItems: [
      { label: "Yaz\u0131 ve taslak", value: "Claude / ChatGPT" },
      { label: "Ara\u015ft\u0131rma", value: "Perplexity" },
      { label: "G\u00f6rsel ek teslim", value: "Canva AI" },
      { label: "D\u00fczen ve s\u00fcre\u00e7", value: "Notion AI" }
    ],
    caseParagraphs: [
      "Mini \u00f6rnek: bir freelancer \u00f6nce Claude ile haftal\u0131k blog taslaklar\u0131n\u0131 h\u0131zland\u0131rd\u0131, sonra Perplexity ile ara\u015ft\u0131rma k\u0131sm\u0131n\u0131 g\u00fc\u00e7lendirdi. \u0130ki m\u00fc\u015fteride teslim s\u00fcresi k\u0131sald\u0131 ve revizyonlar azald\u0131.",
      "As\u0131l kazan\u00e7 yaln\u0131zca h\u0131z de\u011fildi; ayn\u0131 paketi daha g\u00fcvenli \u015fekilde satabilmekti."
    ]
  },
  en: {
    scenarioParagraphs: [
      "In a real freelance scenario, value does not come from using more tools. It comes from delivering cleaner work faster. A content freelancer may care about draft speed, while a strategy freelancer may care more about research quality.",
      "That is why ChatGPT, Claude, Perplexity, Canva AI, and Notion AI matter only when they fit the deliverable being sold."
    ],
    stepCards: [
      { title: "Step 1: Define the deliverable", paragraphs: ["Start by defining the output you sell: blog package, research summary, social creative, or proposal draft.", "Tool choice should come after the deliverable is clear."], bullets: ["Blog package", "Research summary", "Social creative", "Proposal draft"] },
      { title: "Step 2: Pick the core tool", paragraphs: ["ChatGPT or Claude may fit drafting, Perplexity may fit research, Canva AI may fit visual support.", "A clean first stack is easier to manage and improve."], bullets: ["Core tool", "Support tool", "Fit by task"] },
      { title: "Step 3: Measure delivery speed", paragraphs: ["Track whether the tool reduces time, lowers revision cycles, and protects margin.", "For freelancers, the key metric is not novelty. It is profitable delivery."], bullets: ["Delivery speed", "Revision count", "Margin impact"] }
    ],
    earningsParagraphs: [
      "Freelance income comes from the delivery system, not the software name. The right tool can improve output volume or raise quality without increasing time.",
      "In a low scenario the freelancer only lands a few small jobs. In a medium scenario packages repeat. In a better scenario the tool becomes real margin leverage."
    ],
    earningsItems: [
      { label: "Low scenario", value: "$150-$400/mo - a few small jobs" },
      { label: "Medium scenario", value: "$400-$1,200/mo - repeatable packages" },
      { label: "Good scenario", value: "$1,200+/mo - better margin system" }
    ],
    failParagraphs: [
      "Most freelancers struggle not because the tool is weak, but because the offer is unclear. A strong tool cannot fix a vague client promise.",
      "The second mistake is shipping raw AI output. That may save time once, but it usually hurts trust fast."
    ],
    failBullets: ["Unclear deliverables", "Shipping raw output", "Paying for too many tools at once", "Not measuring delivery time"],
    toolsParagraphs: [
      "Claude may feel stronger for longer structured writing. ChatGPT may feel better for flexible drafting. Perplexity adds value when sources matter. Canva AI helps when visual add-ons increase package value.",
      "The right freelance stack is usually a small stack that improves client-facing output."
    ],
    toolItems: [
      { label: "Writing and drafts", value: "Claude / ChatGPT" },
      { label: "Research", value: "Perplexity" },
      { label: "Visual add-ons", value: "Canva AI" },
      { label: "Planning and process", value: "Notion AI" }
    ],
    caseParagraphs: [
      "Mini case: a freelancer used Claude for weekly blog drafts and Perplexity for research verification. Delivery time dropped and revision cycles became easier to manage across two clients.",
      "The main gain was not just speed. It was being able to sell the same package with more confidence."
    ]
  }
};

const moneyServicePlaybook: Playbook = {
  tr: {
    scenarioParagraphs: [
      "Gerçek senaryoda kullanıcı tek seferlik viral gelir peşinde değildir; küçük ama tekrar eden bir hizmet kurmaya çalışır. Örneğin bir freelancer, haftalık içerik paketi ya da araştırma özeti satarak ilk müşterisini bulabilir.",
      "Burada [ChatGPT], [Claude] ve [Perplexity] gibi araçlar işi müşteriye satmak için değil, teslim süresini kısaltmak için kullanılır. Gelir farkı çoğu zaman aracın kendisinden değil, kurulan sistemden gelir."
    ],
    stepCards: [
      { title: "Step 1: Tek bir teslim seç", paragraphs: ["Önce blog yazısı, e-posta serisi, araştırma özeti ya da kısa teklif paketi gibi net bir teslim seç.", "İlk müşteri için çok geniş hizmet değil, sonucu anlaşılır küçük bir teklif daha güçlüdür."], bullets: ["Blog paketi", "Araştırma özeti", "E-posta dizisi"] },
      { title: "Step 2: Teklifini ölçülebilir yap", paragraphs: ["'AI ile çalışıyorum' demek yerine 'haftada 4 blog taslağı teslim ediyorum' gibi net bir çıktı sun.", "Müşteri aracı değil, sonucunu satın alır."], bullets: ["Net çıktı", "Paket mantığı", "Revizyon sınırı"] },
      { title: "Step 3: İlk 3 müşteriyle sistemi doğrula", paragraphs: ["İlk hedef ölçek değil, tekrar eden süreç kurmaktır. İlk 2-3 müşteride hangi adımın yavaşladığını ölç.", "Darboğaz görüldüğünde ikinci aracı eklemek daha doğru olur."], bullets: ["İlk 3 müşteri", "Darboğaz ölçümü", "Sonra stack büyüt"] }
    ],
    earningsParagraphs: [
      "Gerçekçi gelir, niş, teklif gücü ve teslim disiplinine bağlıdır. İlk ay düşük gelir normaldir; orta senaryoda küçük paketler tekrar etmeye başlar; iyi senaryoda ise aynı sistem daha yüksek fiyatla satılabilir.",
      "Buradaki hedef dev rakamlar söylemek değil, tekrar eden küçük işlerin zaman içinde gelir oluşturduğunu göstermek olmalıdır."
    ],
    earningsItems: [
      { label: "Düşük senaryo", value: "$100-$300 / ay - ilk küçük müşteriler" },
      { label: "Orta senaryo", value: "$300-$900 / ay - tekrar eden paketler" },
      { label: "İyi senaryo", value: "$900-$2.000 / ay - sistem oturmaya başlar" }
    ],
    failParagraphs: [
      "Çoğu kişi para kazanamaz çünkü araçla üretim yapmayı teklif satmakla karıştırır. İyi çıktı üretmek tek başına yetmez; müşteri açısından net problem ve net teslim gerekir.",
      "İkinci büyük sorun kalite kontrolüdür. Ham AI çıktısı teslim edildiğinde güven kaybı yaşanır ve tekrar eden müşteri gelmez."
    ],
    failBullets: ["Sonuç yerine araç satmak", "Ham çıktıyı teslim etmek", "Teklifi çok geniş tutmak", "Süreç ölçmeden ölçek denemek"],
    toolsParagraphs: [
      "[ChatGPT] hızlı taslak ve çok yönlü üretimde faydalıdır. [Claude] daha uzun ve düzenli metinlerde güçlü olabilir. [Perplexity] kaynaklı araştırma eklemek istediğinde değer yaratır.",
      "Görsel veya sunum desteği gerekiyorsa [Canva AI], süreç ve not düzeni gerekiyorsa [Notion AI] destekleyici katman olabilir."
    ],
    toolItems: [
      { label: "Taslak ve esneklik", value: "ChatGPT" },
      { label: "Uzun ve düzenli yazı", value: "Claude" },
      { label: "Kaynaklı araştırma", value: "Perplexity" },
      { label: "Düzen ve plan", value: "Notion AI / Canva AI" }
    ],
    caseParagraphs: [
      "Mini örnek: solo çalışan bir içerik freelancer'ı, [Claude] ile haftalık blog taslağı hazırlayıp [Perplexity] ile araştırma doğrulaması ekledi. İlk ay 2 müşteriye küçük paket sattı.",
      "Kazanç sınırlı kaldı ama tekrar eden iş modeli oluştu. Bu noktadan sonra fiyat yükseltmek ve teslim çeşitlendirmek çok daha kolay hale geldi."
    ]
  },
  en: {
    scenarioParagraphs: [
      "In a real scenario, the user is not chasing a magical income button. They are building a small repeatable service, such as weekly content packs or research summaries for a first client.",
      "Tools like ChatGPT, Claude, and Perplexity are not the thing being sold. They reduce delivery time and increase consistency inside the system being sold."
    ],
    stepCards: [
      { title: "Step 1: Choose one deliverable", paragraphs: ["Start with one clear deliverable such as a blog draft pack, research summary, or short email sequence.", "A small, understandable offer is easier to sell than a vague all-purpose AI service."], bullets: ["Blog pack", "Research summary", "Email sequence"] },
      { title: "Step 2: Make the offer measurable", paragraphs: ["Say what the client receives, not what tool you use.", "Clients buy outcomes, not software names."], bullets: ["Clear deliverable", "Package logic", "Revision limits"] },
      { title: "Step 3: Validate with the first clients", paragraphs: ["The first goal is not scale. It is a repeatable workflow with the first 2-3 clients.", "Only expand the stack after you know where the real bottleneck is."], bullets: ["First 3 clients", "Measure friction", "Expand later"] }
    ],
    earningsParagraphs: [
      "Realistic income depends on niche, offer strength, and delivery discipline. A low first month is normal. Medium scenarios appear when small packages repeat. Better scenarios appear when the same workflow supports higher pricing.",
      "The point is not to promise massive numbers. It is to show how repeatable small work turns into income over time."
    ],
    earningsItems: [
      { label: "Low scenario", value: "$100-$300/mo - first small clients" },
      { label: "Medium scenario", value: "$300-$900/mo - repeatable packages" },
      { label: "Good scenario", value: "$900-$2,000/mo - system starts compounding" }
    ],
    failParagraphs: [
      "Most people fail because they confuse tool usage with offer design. Strong output is not enough unless the client problem and final deliverable are clear.",
      "The second issue is quality control. Raw AI output damages trust and makes repeat business much harder." 
    ],
    failBullets: ["Selling the tool instead of the outcome", "Shipping raw output", "Keeping the offer too broad", "Trying to scale before measuring the process"],
    toolsParagraphs: [
      "ChatGPT often fits flexible drafting. Claude may fit longer structured writing. Perplexity becomes valuable when source-backed research matters.",
      "If the workflow needs visuals or organization, Canva AI and Notion AI can act as supporting layers instead of core engines."
    ],
    toolItems: [
      { label: "Drafting and flexibility", value: "ChatGPT" },
      { label: "Long-form structure", value: "Claude" },
      { label: "Source-backed research", value: "Perplexity" },
      { label: "Organization support", value: "Notion AI / Canva AI" }
    ],
    caseParagraphs: [
      "Mini case: a solo content freelancer used Claude for weekly drafts and Perplexity for research verification, then sold two small recurring content packages in the first month.",
      "The income stayed modest at first, but the repeatable model made pricing and expansion much easier later." 
    ]
  }
};

const blogPublisherPlaybook: Playbook = {
  tr: {
    scenarioParagraphs: [
      "Gerçek senaryoda blogdan para kazanmak isteyen kişi önce trafik değil, doğru trafik peşinde olmalıdır. Bir niche yayıncı, karar niyeti taşıyan yazılar yazarak ilk affiliate tıklamalarını ve ilk lead'lerini toplamaya başlar.",
      "Burada [Perplexity] araştırma için, [ChatGPT] veya [Claude] taslak ve yapı için, [Notion AI] ise yayın planı için işe yarar. Gelir, içerik miktarından çok niyet, iç link ve CTA akışından gelir."
    ],
    stepCards: [
      { title: "Step 1: Gelir niyetli konu seç", paragraphs: ["Önce 'nasıl para kazanılır', 'hangi tool ne işe yarar', 'x vs y' gibi karar niyeti yüksek konu kümelerini seç.", "Sadece trafik çeken ama karar anına uzak içerikler daha yavaş monetize olur."], bullets: ["Karşılaştırma", "Use-case rehberi", "Alternatives"] },
      { title: "Step 2: İçerik zinciri kur", paragraphs: ["Liste yazısından tool sayfasına, tool sayfasından comparison ya da başka rehbere giden iç link akışı kur.", "Bu zincir kullanıcıyı tek sayfada bırakmak yerine karar akışına taşır."], bullets: ["Blog -> tool", "Tool -> comparison", "Blog -> blog"] },
      { title: "Step 3: Tıklanan şeyi ölç", paragraphs: ["İlk 10-20 içerikte hangi başlıkların tool tıklaması getirdiğini izle.", "Büyüme, daha çok yazmaktan çok çalışan formatı tekrar etmekle gelir."], bullets: ["CTR takibi", "Tool click", "Kazanan formatı büyüt"] }
    ],
    earningsParagraphs: [
      "Blog gelirinde düşük senaryo birkaç komisyon veya küçük lead ile başlar. Orta senaryoda düzenli organik trafik, affiliate tıklamaları ve birkaç iyi intent yazı birleşir. İyi senaryo ise içerik zinciri çalıştığında oluşur.",
      "Burada kritik nokta, gelir beklentisini ilk haftalarda abartmamaktır. Blog genelde içerik stoğu büyüdükçe ve iç link akışı güçlendikçe sonuç verir."
    ],
    earningsItems: [
      { label: "Düşük senaryo", value: "$20-$100 / ay - ilk tıklama ve lead'ler" },
      { label: "Orta senaryo", value: "$100-$500 / ay - çalışan içerik kümeleri" },
      { label: "İyi senaryo", value: "$500+ / ay - düzenli intent akışı" }
    ],
    failParagraphs: [
      "Çoğu kişi blogda para kazanamaz çünkü sadece içerik sayısına odaklanır. Oysa arama niyeti, iç link ve doğru CTA kurulmadığında trafik bile dönüşmeyebilir.",
      "İkinci hata, AI ile üretimi otomatik sanmaktır. Editoryal karar, örnek seçimi ve içeriğin yapısı hâlâ insan tarafında çözülmelidir."
    ],
    failBullets: ["Yalnızca trafik odaklı konu seçmek", "İç link kurmamak", "CTA düşünmemek", "AI taslağını edit etmeden yayınlamak"],
    toolsParagraphs: [
      "[Perplexity] araştırma ve kaynak toplamada faydalıdır. [ChatGPT] hızlı taslak, [Claude] daha uzun yapı için anlamlı olabilir. [Notion AI] yayın planı ve içerik düzeni tarafında destek sağlar.",
      "Blog geliri için doğru tool, en popüler olan değil; editoryal akışı düzenleyen ve içerik üretimini sürdürülebilir hale getiren tooldur."
    ],
    toolItems: [
      { label: "Araştırma", value: "Perplexity" },
      { label: "Taslak ve yapı", value: "ChatGPT / Claude" },
      { label: "Yayın planı", value: "Notion AI" },
      { label: "CTA destekli sayfalar", value: "Tool detail + comparison pages" }
    ],
    caseParagraphs: [
      "Mini örnek: niş bir araç blogu yöneten kullanıcı, önce comparison ve use-case içeriklerine odaklandı. [Perplexity] ile araştırma, [Claude] ile taslak ve manuel edit ile yayın akışını kurdu.",
      "İlk ay gelir düşük kaldı; ama birkaç intent yazı tıklama üretmeye başlayınca hangi konuların ölçeklenmesi gerektiği netleşti."
    ]
  },
  en: {
    scenarioParagraphs: [
      "In a realistic blogging scenario, the goal is not raw traffic first but the right kind of traffic. A niche publisher starts getting affiliate clicks and leads when the content matches decision intent.",
      "Perplexity can support research, ChatGPT or Claude can support drafting, and Notion AI can support the publishing system. The income comes from intent, internal linking, and CTA flow more than content volume alone."
    ],
    stepCards: [
      { title: "Step 1: Choose intent-heavy topics", paragraphs: ["Start with topics such as comparisons, use-case guides, alternatives, and monetization workflows.", "Pure traffic articles can help reach, but they monetize more slowly."], bullets: ["Comparisons", "Use-case guides", "Alternatives"] },
      { title: "Step 2: Build an internal content chain", paragraphs: ["Create paths from list articles to tool pages, then from tool pages to comparison and related guides.", "This makes the site more useful and improves conversion paths."], bullets: ["Blog -> tool", "Tool -> comparison", "Blog -> blog"] },
      { title: "Step 3: Repeat what gets clicks", paragraphs: ["Track which topics create tool clicks instead of only pageviews.", "Growth usually comes from repeating what already matches intent well."], bullets: ["CTR tracking", "Tool clicks", "Scale the winners"] }
    ],
    earningsParagraphs: [
      "A low scenario may mean only a few affiliate clicks or small lead value. Medium scenarios appear when multiple intent-driven posts start ranking together. Better scenarios happen when the internal flow compounds.",
      "The realistic view is simple: blogging usually monetizes slowly at first, then improves once structure and internal linking mature."
    ],
    earningsItems: [
      { label: "Low scenario", value: "$20-$100/mo - first clicks and leads" },
      { label: "Medium scenario", value: "$100-$500/mo - working content clusters" },
      { label: "Good scenario", value: "$500+/mo - repeatable intent engine" }
    ],
    failParagraphs: [
      "Most people fail because they chase volume without structure. Traffic alone does not monetize well when intent, internal linking, and CTA paths are weak.",
      "The second issue is treating AI writing as automatic publishing. Editorial choices still define whether the content earns trust or gets ignored."
    ],
    failBullets: ["Choosing traffic-only topics", "Ignoring internal links", "Weak CTA planning", "Publishing raw AI drafts"],
    toolsParagraphs: [
      "Perplexity supports research. ChatGPT helps with speed. Claude may help with long-form structure. Notion AI can support content planning and consistency.",
      "For monetized blogging, the right tool is the one that supports a repeatable editorial system, not just one fast draft."
    ],
    toolItems: [
      { label: "Research", value: "Perplexity" },
      { label: "Drafting and structure", value: "ChatGPT / Claude" },
      { label: "Editorial planning", value: "Notion AI" },
      { label: "Conversion layer", value: "Tool detail + comparison pages" }
    ],
    caseParagraphs: [
      "Mini case: a niche publisher focused first on comparisons and use-case guides, using Perplexity for research and Claude for structured drafts before manual editing.",
      "The early revenue stayed small, but the first few posts that produced clicks made it obvious which content format was worth scaling."
    ]
  }
};
const monetizationToolsPlaybook: Playbook = {
  tr: {
    scenarioParagraphs: [
      "Gerçek senaryoda kullanıcı 'hangi tool para kazandırır?' diye sormaz; hangi tool'un hangi iş modeline uygun olduğunu anlamaya çalışır. Affiliate içerik, freelance paket, araştırma özeti, dijital ürün veya kısa video gibi modeller farklı araç ister.",
      "Bu yüzden [ChatGPT], [Claude], [Perplexity], [Canva AI], [ElevenLabs] ve [Runway] gibi araçlara tek liste gibi değil, farklı kullanım bağlamlarıyla bakmak gerekir."
    ],
    stepCards: [
      { title: "Step 1: İş modelini seç", paragraphs: ["Önce gelir modelini seç: içerik paketi mi, affiliate içerik mi, araştırma teslimi mi, görsel/video işi mi?", "Aracı iş modelinden önce seçmek genelde yanlış başlangıçtır."], bullets: ["İçerik", "Araştırma", "Görsel", "Video"] },
      { title: "Step 2: Teklifini daralt", paragraphs: ["'AI hizmeti veriyorum' gibi geniş cümleler yerine çıktı bazlı teklif kur.", "Net teslim, ilk satış ihtimalini yükseltir."], bullets: ["Net teslim", "Paket mantığı", "Hedef müşteri"] },
      { title: "Step 3: Tool stack'i göreve göre kur", paragraphs: ["İlk satıştan sonra araştırma, taslak, görsel veya video katmanını ihtiyaca göre ekle.", "Her araç aynı akışta gerekli değildir."], bullets: ["Önce satış", "Sonra araç ekleme", "Darboğaz bazlı seçim"] }
    ],
    earningsParagraphs: [
      "Düşük senaryo genelde küçük tek seferlik işlerle başlar. Orta senaryoda aynı teslim tekrar eden paket olur. İyi senaryoda ise içerik ve süreç birikimi birleşir.",
      "Gerçekçi beklenti, ilk ay büyük rakam görmek değil; hangi modelin tutacağını sayılarla görmektir."
    ],
    earningsItems: [
      { label: "Düşük senaryo", value: "$100-$250 / ay - küçük tek seferlik işler" },
      { label: "Orta senaryo", value: "$250-$1.000 / ay - tekrar eden paketler" },
      { label: "İyi senaryo", value: "$1.000+ / ay - sistem ve kanal birleşir" }
    ],
    failParagraphs: [
      "İnsanlar çoğu zaman araç listesi okuyup hemen gelir bekler. Ama araç seçimi, teklif kalitesinin yerini tutmaz. Net problem çözülmüyorsa araç ismi fark yaratmaz.",
      "İkinci risk, aynı anda çok fazla araca para ve zaman ayırmaktır. Bu durum hem odağı hem marjı bozar."
    ],
    failBullets: ["İş modeli seçmeden tool seçmek", "Çok geniş teklif vermek", "Aynı anda fazla araç denemek", "Geliri araçtan beklemek"],
    toolsParagraphs: [
      "[ChatGPT] ve [Claude] yazı tarafında, [Perplexity] araştırmada, [Canva AI] görsel teslimde, [ElevenLabs] sesli varlıklarda, [Runway] ise video akışında daha anlamlı olabilir.",
      "Araçlar güçlüdür ama sadece doğru bağlamda. Asıl değer, bunları iş modeline göre dizmektir."
    ],
    toolItems: [
      { label: "Yazı ve teklif", value: "ChatGPT / Claude" },
      { label: "Araştırma ve doğrulama", value: "Perplexity" },
      { label: "Görsel paket", value: "Canva AI" },
      { label: "Ses / video genişleme", value: "ElevenLabs / Runway" }
    ],
    caseParagraphs: [
      "Mini örnek: küçük ölçekli bir içerik üreticisi önce [ChatGPT] ile blog paketi, sonra [Canva AI] ile aynı pakete görsel teslim ekledi. Bu, teklif değerini artırdı.",
      "Daha sonra [Perplexity] ile araştırma doğrulaması ekleyince daha yüksek fiyat istemek kolaylaştı. Buradaki büyüme tek bir araçtan değil, kademeli sistem kurmaktan geldi."
    ]
  },
  en: {
    scenarioParagraphs: [
      "In a realistic scenario, users do not need 'the one AI tool that makes money.' They need to understand which tool fits which income model: content, affiliate publishing, research delivery, visuals, audio, or video.",
      "That is why tools like ChatGPT, Claude, Perplexity, Canva AI, ElevenLabs, and Runway should be viewed in context rather than as one flat ranking list."
    ],
    stepCards: [
      { title: "Step 1: Choose the income model", paragraphs: ["Pick the model first: content package, affiliate content, research delivery, visual work, or video support.", "Choosing tools before choosing the model usually leads to confusion."], bullets: ["Content", "Research", "Visuals", "Video"] },
      { title: "Step 2: Narrow the offer", paragraphs: ["A clear deliverable is easier to sell than a vague 'AI service'.", "Specific outputs create more trust and make pricing easier."], bullets: ["Clear deliverable", "Package logic", "Target client"] },
      { title: "Step 3: Build the stack by friction", paragraphs: ["Only add research, visual, or media tools when the workflow needs them.", "Not every tool belongs in the same stack."], bullets: ["Sell first", "Add tools later", "Choose by bottleneck"] }
    ],
    earningsParagraphs: [
      "A low scenario often starts with small one-off jobs. Medium scenarios appear when the same deliverable becomes a recurring package. Better scenarios happen when the system gains momentum across multiple pages or clients.",
      "The realistic goal is not instant big income. It is learning which model works with the least friction."
    ],
    earningsItems: [
      { label: "Low scenario", value: "$100-$250/mo - small one-off jobs" },
      { label: "Medium scenario", value: "$250-$1,000/mo - repeatable packages" },
      { label: "Good scenario", value: "$1,000+/mo - system and distribution align" }
    ],
    failParagraphs: [
      "Many users expect income from the tool name itself. But tool choice never replaces offer clarity.",
      "The second risk is paying for too many tools too early, which hurts focus and margin at the same time."
    ],
    failBullets: ["Choosing tools before the model", "Keeping the offer too broad", "Paying for too many tools early", "Expecting the app to create the income"] ,
    toolsParagraphs: [
      "ChatGPT and Claude often fit writing. Perplexity fits research. Canva AI fits visual delivery. ElevenLabs and Runway fit audio and video expansion.",
      "The real value comes from matching each tool to the workflow where it creates leverage."
    ],
    toolItems: [
      { label: "Writing and offers", value: "ChatGPT / Claude" },
      { label: "Research and validation", value: "Perplexity" },
      { label: "Visual package", value: "Canva AI" },
      { label: "Audio / video expansion", value: "ElevenLabs / Runway" }
    ],
    caseParagraphs: [
      "Mini case: a small content operator first used ChatGPT for blog packages, then added Canva AI to increase the value of the same deliverable with visuals.",
      "Later, adding Perplexity for research quality made premium pricing easier. The growth came from system design, not from one magic app."
    ]
  }
};

const playbooks: Record<string, Playbook> = {
  "chatgpt-ile-para-kazanma-yollari": moneyServicePlaybook,
  "freelance-icin-en-iyi-ai-araclari": moneyServicePlaybook,
  "ai-side-hustles-you-can-start-today": moneyServicePlaybook,
  "how-to-make-1000-a-month-with-ai-tools": moneyServicePlaybook,
  "ai-ile-blog-yazip-para-kazanma": blogPublisherPlaybook,
  "ai-tools-for-passive-income-2026": blogPublisherPlaybook,
  "ai-ile-para-kazanmak-icin-en-iyi-araclar": monetizationToolsPlaybook,
  "best-ai-tools-for-making-money-2026": monetizationToolsPlaybook,
  "ai-tools-to-make-money-2026": monetizationToolsPlaybook,
  "en-iyi-ucretsiz-ai-araclari": freeStarterPlaybook,
  "ucretsiz-ai-araclari-2026": freeStarterPlaybook,
  "free-ai-tools-you-can-start-using-today": freeStarterPlaybook,
  "free-ai-tools-that-actually-make-money": freeStarterPlaybook,
  "best-free-ai-tools-2026": freeStarterPlaybook
};

export function getBlogPlaybookSections(slug: string, locale: Locale): BlogSection[] | null {
  const playbook = playbooks[slug]?.[locale];

  if (!playbook) {
    return null;
  }

  const isTurkish = locale === "tr";

  return [
    section(isTurkish ? "Gerçek senaryo" : "Real scenario", playbook.scenarioParagraphs),
    section(isTurkish ? "Adım adım sistem" : "Step-by-step system", [isTurkish ? "Bu yazının mantığı kolay para anlatmak değil; yapılabilir ve ölçülebilir bir sistem kurmaktır." : "The goal here is not easy-money language. It is a small system that can actually be executed and measured."], { subSections: playbook.stepCards.map((card) => sub(card.title, card.paragraphs, card.bullets)) }),
    section(isTurkish ? "Ne kadar kazanılır?" : "How much can you earn?", playbook.earningsParagraphs, { comparison: { title: isTurkish ? "Gerçekçi aralık" : "Realistic range", items: playbook.earningsItems } }),
    section(isTurkish ? "Nerede fail olur?" : "Where does it fail?", playbook.failParagraphs, { bullets: playbook.failBullets }),
    section(isTurkish ? "Hangi tool ne işe yarar?" : "What does each tool do?", playbook.toolsParagraphs, { comparison: { title: isTurkish ? "Araç bağlamı" : "Tool context", items: playbook.toolItems } }),
    section(isTurkish ? "Mini case study" : "Mini case study", playbook.caseParagraphs)
  ];
}