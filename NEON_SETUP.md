# Neon Database Bağlantı Kılavuzu

## 1️⃣ Neon Hesabı Oluştur

1. https://neon.tech/ ziyaret et
2. "Sign Up" butonuna tıkla
3. Email/Google ile kaydol
4. Email'ini doğrula

## 2️⃣ Proje Oluştur

1. Dashboard'a giriş yap
2. "New Project" butonuna tıkla
3. "PostgreSQL" seç
4. Proje adını gir (örn: "arikan_hukuk")
5. Region seç (Europe - Istanbul'a yakın)
6. Create project'e tıkla

## 3️⃣ Connection String Al

1. Oluşturulan project'e tıkla
2. "Connection" sekmesinde
3. "Connection string" bul
4. URL'i kopyala: `postgresql://...`

## 4️⃣ .env.local Dosyasını Güncelle

```bash
DATABASE_URL="postgresql://user:password@host/dbname"
```

Kopyaladığın string'i yapıştır.

## Seçeneği 2: R2 Bucket (Opsiyonel)

Cloudflare R2 için:
1. https://dash.cloudflare.com/ giriş yap
2. R2 → Create Bucket
3. "Settings" → "API Tokens" → Generate token
4. Credential'ları .env.local'e ekle

---

Hepsi hazırladıktan sonra çalıştır:
```bash
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```
