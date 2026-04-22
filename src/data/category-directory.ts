import type { SupportedLocale } from "@/i18n/config";

export type DirectoryLocaleText = {
  tr: string;
  en: string;
} & Partial<Record<SupportedLocale, string>>;

export type DirectorySubcategory = {
  slug: string;
  title: DirectoryLocaleText;
};

export type DirectoryCategory = {
  slug: string;
  title: DirectoryLocaleText;
  subcategories: DirectorySubcategory[];
};

const rawCategoryDataset = `
Yazma ve Düzenleme (Kategori Başlığı)
AI Blog Oluşturucu
AI Kitap Yazma
AI Altyazı Oluşturucu
AI Sohbet Oluşturucu
AI Metin Yazarlığı
AI Kapak Mektubu Oluşturucu
AI Yaratıcı Yazarlık
AI Açıklama Jeneratörü
AI Diyalog Oluşturucu
AI Ebook Oluşturucu
AI E-posta Yazarı
AI Deneme Yazarı
AI Fanfic Jeneratörü
AI Dilbilgisi Denetleyicisi
AI Resim Açıklaması Jeneratör
AI İlham Verici Sözler
AI İş Tanımı Jeneratör
AI Mektup Yazarı
AI Aşk Mektubu Üreticisi
AI Mesaj Oluşturucu
AI Film Senaryosu Oluşturucu
AI Adı Oluşturucu
AI Bülten Oluşturucu
Yapay Zeka Romanı
AI Anahat Jeneratörü
AI Paragraf Oluşturucu
AI Parafraser
AI Çizim Oluşturucu
AI Şiir Jeneratörü
AI Ürün Açıklaması Jeneratör
AI İstemi Jeneratörü
AI Düzeltme
AI Alıntılar Jeneratör
AI Rapor Yazma
AI Yeniden Amaçlama
AI İnceleme Oluşturucu
AI Yeniden Yazıcı
AI Komut Dosyası Yazma
AI Cümle Oluşturucu
AI Kısa Öykü Oluşturucu
AI Slogan Oluşturucu
AI Büyü Kontrolü
AI Hikaye Oluşturucu
AI Özetleyici
AI Metin Sınıflandırıcı
AI Metin Oluşturucu
AI Metin Mesajı Oluşturucu
AI Tez Jeneratörü
AI Başlık Oluşturucu
AI Yazma
AI Yazma Asistanları
Başlıklar AI
İstemi Mühendislik

Görüntü Oluşturma ve Düzenleme (Kategori Başlığı)
AI Yaş İlerlemesi
AI Avatar Jeneratörü
AI Arka Plan Oluşturucu
AI Arka Plan Sökücü
AI Renklendir
AI Cosplay Jeneratörü
AI Kırpma Görüntüsü
AI Silgi
AI Görüntüyü Genişlet
AI Yüz Takas Jeneratörü
AI Headshot Jeneratörü
AI Görüntü Birleştirici
AI Görüntü Geliştirici
AI Görüntü Oluşturucu
AI Görüntü Bileme
AI Görüntü Yükseltici
AI Inpainting
AI Harita Oluşturucu
AI Outpainting
AI Pasaport Fotoğrafı
AI Kişi Jeneratörü
AI Fotoğraf Düzenleyici
AI Fotoğraf Geliştirici
AI Fotoğraf Filtresi
AI Fotoğraf Restorasyonu
AI Ürün Fotoğrafçılığı
AI Profil Resim Oluşturucu
AI QR Kod Oluşturucu
AI Gerçekçi Görüntü Oluşturucu
AI İmza Oluşturucu
AI Stil Aktarımı
AI Doku Jeneratörü
AI Görüntüyü Bulanıklaştır
AI Duvar Kağıdı Jeneratörü
AI Filigran Sökücü
AI Yıllığı
Cinsiyet Değiştirme Yapay Zeka
Görüntüden Görüntüye
Nesne Temizleyici AI
El Yazısına Metin
Resme Metin

Görüntü Analizi (Kategori Başlığı)
AI Resmi Açıkla
AI Yüz Analizörü
AI Yüz Tanıma
AI Görüntü Tanıma
AI Görüntü Tarama
AI Görüntü Segmentasyonu
AI OCR
İsteme Görüntü

Müzik ve Ses (Kategori Başlığı)
AI Ses Düzenleme
AI Ses Geliştirici
AI Ses Ayırıcı
AI Beat Jeneratörü
AI Enstrümantal Jeneratör
AI Şarkı Sözleri Oluşturucu
AI Mastering
AI Melodi Jeneratörü
AI Midi Jeneratörü
AI Müzik Jeneratörü
AI Gürültü İptali
AI Rap Jeneratörü
AI Rap Şarkı Sözleri Jeneratör
AI Şarkı Söyleyen Jeneratör
AI Şarkı Kapağı
AI Şarkı Oluşturucu
AI Şarkı Remixer
AI Ses Efekti Jeneratörü
AI Bölücü
AI Sapları Ayırıcı
AI Metinden Müziğe
AI Vokal Sökücü
Akor yapay zekası

Ses Oluşturma ve Dönüştürme (Kategori Başlığı)
AI Ünlü Ses Üreticisi
AI Dublaj
AI Podcast'i
AI Podcast Klip Jeneratörü
AI Podcast Düzenleme
AI Kaydı
AI Konuşma Tanıma
AI Konuşma Sentezi
AI Konuşmadan Metne
AI Metinden Konuşmaya
AI Transcriber
AI Transkripsiyonu
AI Ses Asistanları
AI Ses Değiştirici
AI Ses Klonlama
AI Ses Geliştirici
AI Ses Üreteci
AI Seslendirme
Metinden Metne Ses Yapay Zeka
Tiktok AI Ses Üreticisi

Sanat ve Yaratıcı Tasarım (Kategori Başlığı)
AI 3D Model Jeneratörü
AI Albüm Kapağı Oluşturucu
AI Anime Sanatı
AI Anime Jeneratörü
AI Sanat Jeneratörü
AI Banner Oluşturucu
AI Güzellik
AI Kitap Kapağı Jeneratörü
AI Broşür Oluşturucu
AI Kartvizit Jeneratörü
AI Karikatür Jeneratörü
AI Kedisi
AI Giyim Jeneratörü
AI Renk Paleti Jeneratörü
AI Coloring Book Generator
AI Comic Generator
AI Design Assistant
AI Design Generator
AI Disney Poster
AI Drawing
AI Emoji Generator
AI Font Generator
AI Graphic Design
AI Hair Color Changer
AI Hairstyle
AI Icon Generator
AI Illustration Generator
AI Infographic Generator
AI Logo Generator
AI Manga Generator
AI Mockup Generator
AI Movie Poster
AI Painting Generator
AI Pattern Generator
AI Photography
AI Pixel Art
AI Pokemon Generator
AI Poster Generator
AI SVG Generator
AI Sketch Generator
AI Sticker Generator
AI T Shirt Design
AI Tattoo Generator
AI Thumbnail Maker
AI UX Design
AI Vector Graphics
Fashion AI
Image to 3D Model
Storyboard AI
Text to 3D

Sosyal Medya (Kategori Başlığı)
AI Biyo Jeneratör
AI Facebook
AI Hashtag
AI Etkileyici
AI Instagram
AI Instagram Altyazı Oluşturucu
AI Linkedin Headshot
AI Linkedin Fotoğraf Jeneratörü
AI Meme Jeneratörü
AI Sosyal Bağlantı
AI Sosyal Medya
AI Sosyal Medya Post Generator
AI Tiktok
AI Tweet Oluşturucu
AI Twitter
AI Kullanıcı Adı Oluşturucu
AI YouTube
AI Youtube Özeti
AI Youtube Küçük Resim Jeneratörü
Biyo Bağlantı
Youtube Etiketler Jeneratör

Yapay Zeka Algılama (Kategori Başlığı)
AI Sanat Dedektörü
AI Baypasör
AI Denetleyicisi
AI Denetleyici Denemesi
AI İçerik Dedektörü
AI Dedektörü
AI Görüntü Dedektörü
AI İntihal Denetleyicisi
AI'yı atla
İnsanlaştırıcı AI
Tespit edilemeyen AI

Kodlama ve Geliştirme (Kategori Başlığı)
AI API'si
AI Uygulama Oluşturucu
AI Tarayıcılar
AI Kod Yardımcısı
AI Kod Oluşturucu
AI Kod İncelemesi
AI Geliştirici Araçları
AI Github
AI Açılış Sayfası Oluşturucu
AI Testi
AI Web Kazıma
AI Web Sitesi Oluşturucu
Günlük Yönetimi
No-Code & Low-Code
SQL Sorgu Oluşturucu

Video ve Animasyon (Kategori Başlığı)
AI Animasyonlu Video
AI Animasyon Jeneratörü
AI Avatar Video Oluşturucu
AI Karikatür Video Jeneratör
AI Ticari Jeneratör
AI Yüz Takas Videosu
AI GIF Jeneratörü
AI Dudak Senkronizasyonu Jeneratörü
AI Film Jeneratörü
AI Müzik Video Oluşturucu
AI Makara Jeneratörü
AI Kısa Video Oluşturucu
AI Stok Video Oluşturucu
AI Tiktok Video Oluşturucu
AI UGC Video Oluşturucu
AI Video Düzenleyici
AI Video Geliştirici
AI Video Oluşturucu
AI Video Recording
AI Video Search
AI Video Summarizer
AI Video Upscaler
AI Vtuber
AI Youtube Video Maker
Image to Video
Long Video To Short Video AI
Script To Video AI Generator
Text to Video
Video to Video

Günlük Yaşam (Kategori Başlığı)
AI Bebek Jeneratörü
AI İncil
AI Pişirme Asistanı
AI Rüya Tercümanı
AI Fitness
AI Hediye Fikirleri
AI Haberleri
AI Bülteni
AI Kıyafet Jeneratörü
AI Ebeveynlik
AI Portre Oluşturucu
AI Tarifi
AI Din
AI Selfie Jeneratörü
AI Alışveriş Asistanı
AI Sporları
AI Seyahat
AI Gezi Planlayıcısı

Hukuk ve Finans (Kategori Başlığı)
AI Muhasebe
AI Sözleşme Oluşturucu
AI Sözleşme Yönetimi
AI Sözleşme İncelemesi
Finans İçin Yapay Zeka
AI Yatırım
AI Hukuk Asistanı
AI Emlak
AI Hisse Senedi Ticareti
AI Vergi Asistanı
AI Ticaret Botu

İşletme Yönetimi (Kategori Başlığı)
AI CRM
AI Çağrı Merkezi
AI Müşteri Hizmetleri
AI ERP
AI Röportaj Asistanı
AI Ürün Yöneticisi
AI Proje Yönetimi
AI İşe Alma
AI Yol Haritası
AI İş Akışı

Pazarlama ve Reklamcılık (Kategori Başlığı)
AI Reklam Yaratıcı
AI Reklam Oluşturucu
AI Reklamcılığı
AI Satış Ortaklığı
AI Soğuk Çağrı
AI Dijital Pazarlama
AI E-posta Oluşturucu
AI E-posta Pazarlama
AI Flyer Jeneratörü
AI Kurşun Üretimi
AI Pazarlama
AI Pazarlama Planı Oluşturucu
AI Pitch Güverte Jeneratörü
AI Yanıt
AI Yanıt Üreticisi
AI İncelemeleri
AI SEO Araçları
AI Satış
AI Satış Asistanı
AI Shopify Mağaza Oluşturucu
AI Web Sitesi Tasarımcısı
Reklam Kopyası
Google Reklamları AI
SEO Yazma AI

Sağlık (Kategori Başlığı)
AI Dermatoloji
AI Sağlık
AI Tıbbi Teşhis
AI Ruh Sağlığı
AI Belirti Denetleyicisi
AI Terapisti

İşletme Araştırma (Kategori Başlığı)
AI İş Fikirleri Jeneratörü
AI İşletme Adı Oluşturucu
AI Şirket Adı Jeneratörü
AI Danışmanlık
AI Kripto
AI Alan Adı Oluşturucu
Blockchain
NFT'ler
Web3

Eğitim ve Çeviri (Kategori Başlığı)
AI Cevabı
AI Makale Özetleyici
AI Kitap Özetleyici
AI Koçluğu
AI Kursu
AI Flashcard Maker
AI Ödev Yardımcısı
AI Görüntü Çevirmeni
AI Bilgi Bankası
AI Bilgi Grafiği
AI Bilgi Yönetimi
AI Dil Öğrenme
AI Ders Planı Oluşturucu
AI Matematik
AI Zihin Haritalaması
AI Soru Oluşturucu
AI Sınav Oluşturucu
AI Sınavları
AI Okuyucu
AI Öğretmenleri
AI Çeviri
AI Eğitimi
AI Video Çevirmen
AI Sesli Çevirmen

Ofis ve Verimlilik (Kategori Başlığı)
AI Ajanı
AI Yardımcısı
AI Takvimi
AI Çizelgesi
AI Yardımcı Pilot
AI Diyagramı Oluşturucu
AI Belge Çıkarma
AI Belgeleri Oluşturucu
AI E-posta Asistanı
AI Excel Formül Oluşturucu
AI Dosyaları
AI Formları
AI İşleri
AI Hayatı
AI Toplantı Asistanı
AI Monitörü
AI Not Alıcı
AI Notları Jeneratör
AI PDF
AI PDF Düzenleyici
AI PDF Özetleyici
AI PPT Oluşturucu
AI Sunum Oluşturucu
AI Verimlilik Araçları
AI Rapor Oluşturucu
AI Özgeçmiş Oluşturucu
AI Özgeçmiş Denetleyicisi
AI SOP
AI Tarayıcı
AI Program Oluşturucu
AI Zamanlama
AI Arama Motoru
AI Elektronik Tablosu
AI Görev Yönetimi
AI KELIMESI
Excel AI
Grafik AI
Beyaz Tahta Yapay Zeka

Araştırma ve Veri Analizi (Kategori Başlığı)
AI Veri Madenciliği
Veri Analitiği İçin Yapay Zeka
AI Kağıtları
AI Tahminleri
AI Araştırma Makaleleri
AI Araştırma Aracı
AI Spor Bahisleri
AI Spor Tahminleri

Diğer (Kategori Başlığı)
AI Oyun Jeneratörü
AI Oyunları
AI Modelleri
AI Poker
AI Robotu
AI Araçları Dizini
Büyük Dil Modelleri (LLM'ler)
Minecraft Yapay Zeka
Açık Kaynak Yapay Zeka Modelleri
`;

const categorySlugMap: Record<string, string> = {
  "Yazma ve Düzenleme": "writing-editing",
  "Görüntü Oluşturma ve Düzenleme": "image-generation-editing",
  "Görüntü Analizi": "image-analysis",
  "Müzik ve Ses": "music-audio",
  "Ses Oluşturma ve Dönüştürme": "audio-generation-conversion",
  "Sanat ve Yaratıcı Tasarım": "art-creative-design",
  "Sosyal Medya": "social-media",
  "Yapay Zeka Algılama": "ai-detection-and-undetection",
  "Kodlama ve Geliştirme": "coding-development",
  "Video ve Animasyon": "video-animation",
  "Günlük Yaşam": "daily-life",
  "Hukuk ve Finans": "law-finance",
  "İşletme Yönetimi": "business-management",
  "Pazarlama ve Reklamcılık": "marketing-advertising",
  "Sağlık": "health-wellness",
  "İşletme Araştırma": "business-research",
  "Eğitim ve Çeviri": "education-translation",
  "Ofis ve Verimlilik": "office-productivity",
  "Araştırma ve Veri Analizi": "research-data-analysis",
  "Diğer": "other"
};

const categoryEnglishMap: Record<string, string> = {
  "Yazma ve Düzenleme": "Writing & Editing",
  "Görüntü Oluşturma ve Düzenleme": "Image Generation & Editing",
  "Görüntü Analizi": "Image Analysis",
  "Müzik ve Ses": "Music & Audio",
  "Ses Oluşturma ve Dönüştürme": "Audio Generation & Conversion",
  "Sanat ve Yaratıcı Tasarım": "Art & Creative Design",
  "Sosyal Medya": "Social Media",
  "Yapay Zeka Algılama": "AI Detection",
  "Kodlama ve Geliştirme": "Coding & Development",
  "Video ve Animasyon": "Video & Animation",
  "Günlük Yaşam": "Daily Life",
  "Hukuk ve Finans": "Law & Finance",
  "İşletme Yönetimi": "Business Management",
  "Pazarlama ve Reklamcılık": "Marketing & Advertising",
  "Sağlık": "Health",
  "İşletme Araştırma": "Business Research",
  "Eğitim ve Çeviri": "Education & Translation",
  "Ofis ve Verimlilik": "Office & Productivity",
  "Araştırma ve Veri Analizi": "Research & Data Analysis",
  "Diğer": "Other"
};

const exactEnglishLabels: Record<string, string> = {
  "AI Blog Oluşturucu": "AI Blog Generator",
  "AI Kitap Yazma": "AI Book Writing",
  "AI Metin Yazarlığı": "AI Copywriting",
  "AI E-posta Yazarı": "AI Email Writer",
  "AI Parafraser": "AI Paraphraser",
  "AI Başlık Oluşturucu": "AI Title Generator"
};

const englishReplacements: Array<[RegExp, string]> = [
  [/Yapay Zeka/gi, "AI"],
  [/Oluşturucu/gi, "Generator"],
  [/Jeneratörü/gi, "Generator"],
  [/Jeneratör/gi, "Generator"],
  [/Üreticisi/gi, "Generator"],
  [/Üreteci/gi, "Generator"],
  [/Yazarı/gi, "Writer"],
  [/Yazma/gi, "Writing"],
  [/Düzenleme/gi, "Editing"],
  [/Düzenleyici/gi, "Editor"],
  [/Geliştirici/gi, "Enhancer"],
  [/Geliştirici Araçları/gi, "Developer Tools"],
  [/Sökücü/gi, "Remover"],
  [/Denetleyicisi/gi, "Checker"],
  [/Tanıma/gi, "Recognition"],
  [/Çeviri/gi, "Translation"],
  [/Çevirmen/gi, "Translator"],
  [/Asistanı/gi, "Assistant"],
  [/Araçları/gi, "Tools"],
  [/Aracı/gi, "Tool"],
  [/Görüntü/gi, "Image"],
  [/Ses/gi, "Voice"],
  [/Metin/gi, "Text"],
  [/Konuşma/gi, "Speech"],
  [/Video/gi, "Video"],
  [/Müzik/gi, "Music"],
  [/Fotoğraf/gi, "Photo"],
  [/Resim/gi, "Image"],
  [/Sosyal Medya/gi, "Social Media"],
  [/Verimlilik/gi, "Productivity"],
  [/Araştırma/gi, "Research"],
  [/Veri/gi, "Data"],
  [/Analizi/gi, "Analysis"],
  [/Analizörü/gi, "Analyzer"],
  [/Rapor/gi, "Report"],
  [/Özetleyici/gi, "Summarizer"],
  [/İş/gi, "Business"],
  [/İşletme/gi, "Business"],
  [/Sağlık/gi, "Health"],
  [/Hukuk/gi, "Legal"],
  [/Finans/gi, "Finance"],
  [/Pazarlama/gi, "Marketing"],
  [/Reklam/gi, "Ad"],
  [/Satış/gi, "Sales"],
  [/Öğretmenleri/gi, "Teachers"],
  [/Öğrenme/gi, "Learning"],
  [/Eğitimi/gi, "Training"],
  [/Eğitim/gi, "Education"],
  [/Sınav/gi, "Quiz"],
  [/Soru/gi, "Question"],
  [/Matematik/gi, "Math"],
  [/Hikaye/gi, "Story"],
  [/Şiir/gi, "Poem"],
  [/Romanı/gi, "Novel"],
  [/Ürün/gi, "Product"],
  [/Açıklaması/gi, "Description"],
  [/Açıklama/gi, "Description"],
  [/Yeniden/gi, "Re"],
  [/Amaçlama/gi, "Purpose"],
  [/Yazıcı/gi, "Writer"],
  [/Başlıklar/gi, "Headlines"],
  [/İstemi/gi, "Prompt"],
  [/Mühendislik/gi, "Engineering"]
];

function toEnglishLabel(value: string) {
  if (exactEnglishLabels[value]) {
    return exactEnglishLabels[value];
  }

  return englishReplacements.reduce((label, [pattern, replacement]) => label.replace(pattern, replacement), value);
}

function slugify(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function makeLocaleText(tr: string, en = toEnglishLabel(tr)): DirectoryLocaleText {
  return {
    tr,
    en,
    ar: en,
    ru: en,
    zh: en,
    ja: en,
    ko: en,
    el: en,
    da: en,
    fa: en
  };
}

function parseCategoryDirectory(): DirectoryCategory[] {
  const categories: DirectoryCategory[] = [];
  let currentCategory: DirectoryCategory | null = null;

  for (const rawLine of rawCategoryDataset.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    if (line.endsWith("(Kategori Başlığı)")) {
      const title = line.replace(/\s*\(Kategori Başlığı\)\s*$/, "");
      const slug = categorySlugMap[title] ?? slugify(title);

      currentCategory = {
        slug,
        title: makeLocaleText(title, categoryEnglishMap[title] ?? toEnglishLabel(title)),
        subcategories: []
      };
      categories.push(currentCategory);
      continue;
    }

    if (!currentCategory) {
      continue;
    }

    currentCategory.subcategories.push({
      slug: slugify(toEnglishLabel(line)),
      title: makeLocaleText(line)
    });
  }

  return categories;
}

export const categoryDirectory = parseCategoryDirectory();
