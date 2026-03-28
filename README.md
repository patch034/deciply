# ToolNova

Iki dilli (TR + EN) AI Tools ve SaaS rehber sitesi icin ilk proje iskeleti.

## Kullanilan teknoloji

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- Locale tabanli route yapisi (`/tr`, `/en`)

## Baslatma

1. `.env.example` dosyasini kopyalayip `.env` olarak olustur.
2. `npm install`
3. `npx prisma generate`
4. `npx prisma migrate dev --name init`
5. `npm run dev`

## Ilk klasor yapisi

- `src/app`: Sayfalar ve layout yapisi
- `src/components`: Arayuz bilesenleri
- `src/i18n`: Dil konfigurasyonu ve sozlukler
- `src/lib`: Ortak yardimci dosyalar
- `prisma`: Veritabani semasi

## Not

Bu asamada tam admin paneli, tool detaylari, karsilastirma sistemi ve blog icerik modeli henuz tamamlanmadi. Bu temel, sonraki adimlarda genisletilmek icin hazirlandi.
