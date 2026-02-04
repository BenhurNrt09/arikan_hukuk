# Hızlı Başlangıç

## 1️⃣ Environment Setup

```bash
# .env.local dosyasını oluştur
cp .env.example .env.local

# Aşağıdaki bilgileri doldur:
# - DATABASE_URL (Neon PostgreSQL)
# - R2 credentials (Cloudflare)
# - JWT_SECRET (random string, min 32 chars)
```

## 2️⃣ Database Setup

```bash
# Dependencies
npm install

# Migration
npx prisma migrate dev --name init

# Seed (admin user + kategoriler)
npm run prisma:seed
```

## 3️⃣ Start Development

```bash
npm run dev
```

Tarayıcı: http://localhost:3000

## 4️⃣ Login Admin Panel

- URL: http://localhost:3000/admin/login
- Email: `admin@arikan.com`
- Password: `admin123`

## 📝 İlk Yazıyı Ekle

1. Dashboard → "Yeni Yazı Ekle"
2. Formu doldur:
   - Başlık
   - URL Slug
   - Kategori seç
   - İçerik (Markdown desteklenir)
   - Resim yükle (R2'ye gider)
3. Yayınla

## 🌐 Web'de Gör

- Homepage: http://localhost:3000/
- Blog: http://localhost:3000/blog
- Yazı: http://localhost:3000/blog/url-slug

## 🔧 Troubleshooting

### Database hata
```bash
npm run prisma:reset  # Temiz başlangıç
npm run prisma:seed   # Tekrar seed
```

### Port meşgul
```bash
npm run dev -- -p 3001  # Farklı port
```

### R2 upload hatası
- `R2_PUBLIC_DOMAIN` kontrol et
- Bucket'ın public olduğundan emin ol

---

Detaylı kurulum: [KURULUM.md](./KURULUM.md)
