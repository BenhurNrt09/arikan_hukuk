# Arıkan Hukuk & Danışmanlık - Kurulum Rehberi

## Proje Yapısı

```
app/
├── (admin)/          # Admin panel routes (protected)
│   └── admin/
│       ├── login/    # Login sayfası
│       ├── dashboard/ # Ana panel
│       ├── posts/    # Yazı yönetimi
│       ├── settings/ # Site ayarları
│       └── logout/   # Çıkış
├── (web)/           # Halk web sitesi
│   ├── page.tsx     # Anasayfa
│   └── blog/        # Blog sayfaları
├── api/
│   └── settings/    # Settings API
├── components/
│   └── Header.tsx   # Sticky header
└── globals.css      # Stil

lib/
├── auth.ts          # JWT ve session yönetimi
├── auth-actions.ts  # Login action
├── actions.ts       # Server actions (CRUD)
├── prisma.ts        # Prisma client
└── r2.ts            # Cloudflare R2 client

prisma/
├── schema.prisma    # Database şeması
└── seed.ts          # Başlangıç verileri
```

## Kurulum Adımları

### 1. Environment Variables Ayarla

`.env.local` dosyasını doldur:

```bash
# Neon PostgreSQL
DATABASE_URL="postgresql://user:password@host/dbname"

# Cloudflare R2
R2_ACCOUNT_ID="your_account_id"
R2_ACCESS_KEY_ID="your_access_key"
R2_SECRET_ACCESS_KEY="your_secret_key"
R2_BUCKET_NAME="your_bucket_name"
R2_PUBLIC_DOMAIN="https://yourdomain.r2.cloudflarestorage.com"

# JWT Secret (min 32 chars)
JWT_SECRET="your_super_secret_key_change_this"
```

### 2. Dependencies Yükle

```bash
npm install
```

### 3. Prisma Migrate Yap

```bash
npx prisma migrate dev --name init
```

### 4. Database'i Seed Et

```bash
npx prisma db seed
```

Bu adım aşağıdakileri oluşturacak:
- Admin user: `admin@arikan.com` / `admin123`
- Kategoriler: Blog, Makale, Köşe Yazısı
- Default site settings

### 5. Development Server Başlat

```bash
npm run dev
```

Ziyaret et: http://localhost:3000

## Kullanım

### Admin Panel

**Login:** http://localhost:3000/admin/login
- Email: `admin@arikan.com`
- Password: `admin123`

**Panel Features:**
- **Dashboard:** İstatistikler ve hızlı erişim
- **Posts:** Blog yazılarını yönet (CRUD + Resim upload)
- **Settings:** İletişim bilgilerini güncelle
- **Logout:** Oturumu kapat

### Web Site

- **Homepage:** http://localhost:3000/
  - Hero section
  - Hizmetler
  - Son yazılar (3 tanesi)
  - İletişim bölümü
  - Footer

- **Blog:** http://localhost:3000/blog
  - Tüm yazılar
  - Kategori filtresi
  - Yazı detayı sayfası
  - İlgili yazılar

- **Header:** Sticky, responsive
  - "Randevu Al" butonu (telefon linki)
  - Mobile menu

## Tasarım

### Renkler (Dark Blue & Yellow)

```css
Primary (Navy Blue):
  - 900: #0c1525
  - 800: #131d3f
  - 700: #1d2e60
  - 600: #2d4480
  - 500: #3d5a9f (Main)

Accent (Gold/Yellow):
  - 500: #ffd166 (Main)
  - 600: #e6b800
```

### Font Aileler

- Display: Playfair Display (başlıklar)
- Sans: Inter (body)

## API Endpoints

### GET /api/settings
Site ayarlarını döner (Header'da kullanılır)

```json
{
  "phone": "+90 212 123 45 67",
  "email": "info@arikan.com",
  "address": "İstanbul, Türkiye",
  "appointmentPhone": "+90 212 987 65 43",
  "googleMapsUrl": "..."
}
```

## Server Actions

Tüm database işlemleri `lib/actions.ts` içindedir:

### Category
- `createCategory(name, slug)`
- `getCategories()`
- `deleteCategory(id)`

### Post
- `createPost(title, slug, content, excerpt, categoryId, coverImage)`
- `updatePost(id, ...)`
- `getPosts()`
- `getPostBySlug(slug)`
- `deletePost(id)`

### Settings
- `updateSettings(phone, email, address, googleMapsUrl, appointmentPhone)`
- `getSettings()`

### R2 Upload
- `getPresignedUrl(fileName, contentType)` - Signed URL döner

## Güvenlik

- **Admin Routes:** Middleware ile korunur (`/admin/*`)
- **JWT Sessions:** 24 saat valid
- **Passwords:** bcryptjs ile hash'lenir
- **R2 Upload:** Presigned URL'ler 1 saat geçerli

## Tailwind CSS Config

Özel renkler `tailwind.config.ts` içinde tanımlanmıştır:

```javascript
colors: {
  primary: { 50: '...', 900: '#0c1525' },
  accent: { 50: '...', 500: '#ffd166' }
}
```

## Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Hamburger menu mobile'da

## Next Steps / TODO

- [ ] Rich text editor ekle (Posts için - ör: TipTap)
- [ ] Email notifications
- [ ] Google Analytics
- [ ] SEO optimization (metadata, sitemap)
- [ ] Deployment (Vercel recommended)
- [ ] SSL certificate for R2 custom domain
- [ ] Admin user management (multi-admin support)

## Troubleshooting

### Prisma Hataları
```bash
# Fresh migration
npx prisma migrate reset

# Generate client
npx prisma generate
```

### R2 Upload Hatası
- `R2_PUBLIC_DOMAIN` doğru olduğundan emin ol
- R2 credentials'ı kontrol et
- Bucket permissions'ı kontrol et (public access)

### Login Hatası
- DATABASE_URL'in doğru olduğundan emin ol
- Seed'i tekrar çalıştır
- Cookies enabled olduğundan emin ol
