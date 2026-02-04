# Cloudflare R2 Kurulum Kılavuzu

## 🎯 Cloudflare R2 Nedir?

Cloudflare R2, AWS S3 uyumlu bir **object storage** (dosya depolama) hizmetidir. Blog yazılarının kapak resimleri burada saklanır.

**Özellikleri:**
- ✅ S3 API uyumlu (aws-sdk ile kullanılır)
- ✅ Egress ücreti yok (indirim!)
- ✅ Presigned URLs ile güvenli upload
- ✅ CDN entegrasyonu
- ✅ Ucuz (pay-as-you-go)

---

## 📋 KURULUM (5 Adım)

### 1️⃣ Cloudflare Hesabı Oluştur

```
1. https://dash.cloudflare.com/ ziyaret et
2. "Sign up" tıkla
3. Email adresin gir
4. Şifre kur
5. Doğrula
```

### 2️⃣ R2 Storage Oluştur

```
1. Sol menüde "R2" tıkla
2. "Create bucket" butonuna tıkla
3. Bucket adı gir:
   - Örn: "arikan-hukuk-images"
   - LOWERCASE + hyphen (-) kullan
4. Region seç: "WNAM" (North America) veya "WEUR" (Europe)
5. "Create bucket" tıkla
```

### 3️⃣ API Token Oluştur

```
1. R2 Dashboard'da
2. "Settings" tıkla
3. "Manage R2 API tokens" tıkla
4. "Create API token" butonuna tıkla
5. Aşağıdaki ayarları yap:
   - Permissions: "Object Read & Write"
   - Account Resources: "Include all resources" seç
   - Token name: "arikan-hukuk-api" yaz
6. "Create API Token" tıkla
```

### 4️⃣ Bilgileri Kopyala

Açılan ekranda 3 bilgi göreceksin:

```
1. Access Key ID          → R2_ACCESS_KEY_ID
2. Secret Access Key      → R2_SECRET_ACCESS_KEY
3. Account ID             → R2_ACCOUNT_ID
```

**Daha sonra göremeyeceksin, şimdi kopyala!**

### 5️⃣ .env.local Dosyasını Güncelle

Aşağıdaki yerleri doldur:

```env
# Cloudflare R2
R2_ACCOUNT_ID="abc123def456"              # Kopyaladığın Account ID
R2_ACCESS_KEY_ID="your_access_key"        # Kopyaladığın Access Key
R2_SECRET_ACCESS_KEY="your_secret_key"    # Kopyaladığın Secret Key
R2_BUCKET_NAME="arikan-hukuk-images"      # Oluşturduğun bucket adı
R2_PUBLIC_DOMAIN="https://arikan-hukuk-images.YOUR_ACCOUNT_ID.r2.cloudflarestorage.com"
```

**R2_ACCOUNT_ID nasıl bulursun?**
- R2 Settings → Account ID kısmında görüyor olmalı
- Veya: `https://dash.cloudflare.com/` URL'inde giriş yap, R2'ye tıkla
- Dashboard'da "Account ID:" yazısı altında rakam yaz

---

## 🔧 Örnek .env.local (Doldurduktan Sonra)

```env
# Neon PostgreSQL
DATABASE_URL='postgresql://neondb_owner:npg_BqpwscVX7mT9@ep-patient-math-aim0stq2-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

# Cloudflare R2
R2_ACCOUNT_ID="12345abcde"
R2_ACCESS_KEY_ID="4a1c2b3e4f5g6h7i8j9k0l"
R2_SECRET_ACCESS_KEY="1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p"
R2_BUCKET_NAME="arikan-hukuk-images"
R2_PUBLIC_DOMAIN="https://arikan-hukuk-images.12345abcde.r2.cloudflarestorage.com"

# Admin JWT Secret
JWT_SECRET="your_super_secret_key_min_32_chars_change_this"
```

---

## 🧪 Test Et

Dosyayı doldurduktan sonra:

```bash
# Terminal'de:
npm run dev

# Tarayıcıda:
http://localhost:3000/admin/login

# Giriş yap:
Email: admin@arikan.com
Password: admin123

# Dashboard → Yeni Yazı Ekle → Resim yükle
```

Resim başarıyla yüklenirse, R2 çalışıyor demektir! ✅

---

## 📸 Screenshot Rehberi

### R2 Dashboard'ı
```
Cloudflare Dashboard
├── Left Menu
│   └── R2
│       ├── Buckets (oluşturduğun bucket)
│       └── Settings
│           ├── Account ID (buradan kopyala)
│           └── Manage API tokens
│               └── Your tokens (Create, Edit, Delete)
```

### API Token Oluşturma
```
Create API Token
├── Permissions
│   └── Object Read & Write ← SEÇMEK GEREKLİ
├── Account Resources
│   └── Include all resources ← SEÇMEK GEREKLİ
├── Token name: "arikan-hukuk-api"
└── Create API Token
    ├── Access Key ID (kopyala)
    ├── Secret Access Key (kopyala)
    └── Account ID (kopyala)
```

---

## ⚠️ ÖNEMLİ NOTLAR

### 🔐 Güvenlik
- Secret Key'i **asla GitHub'a commit etme**
- `.env.local` dosyası `.gitignore`'da olmalı (zaten var)
- Token'ı kimse ile paylaşma

### 🪣 Bucket Ayarları
- Bucket ismini **harf ve hyphen**'le yaz (LOWERCASE)
- Public access gerekli mi? Başlarda evet (resimler görünmeli)
- CORS ayarları: R2 otomatik uyumlu

### 🌐 R2_PUBLIC_DOMAIN
```
Format: https://bucket-name.ACCOUNT_ID.r2.cloudflarestorage.com

Örn:
https://arikan-hukuk-images.12345abcde.r2.cloudflarestorage.com
                           ↑
                      ACCOUNT_ID'ni buraya koy
```

---

## 📊 R2 Pricing (Şubat 2026)

| İşlem | Ücret |
|-------|-------|
| Storage | $0.015/GB/ay |
| Uploads | $4.50/1M request |
| Downloads | ✅ ÜCRETSIZ |
| API Calls | $4.50/1M request |

**Örnek:** 1000 resim, 100KB = 100MB storage = **$0.0015/ay** 💰

---

## ✅ Checklist

- [ ] Cloudflare hesabı oluşturdun
- [ ] R2 bucket oluşturdun
- [ ] API token oluşturdun
- [ ] .env.local dosyasını doldurdun
- [ ] npm run dev başlattın
- [ ] Admin login test ettdin
- [ ] Resim upload test ettdin
- [ ] Resim R2'de gözüküyor

---

## 🆘 Hata Çözümü

### "Invalid credentials"
```
Sebep: R2_ACCESS_KEY_ID veya R2_SECRET_ACCESS_KEY yanlış
Çözüm: Token'ı yeniden oluştur
```

### "Access Denied"
```
Sebep: Token'ın izni yok
Çözüm: Permissions "Object Read & Write" olmalı
```

### "Bucket not found"
```
Sebep: R2_BUCKET_NAME yanlış
Çözüm: Bucket adını R2 Dashboard'dan kontrol et
```

### "Invalid public domain"
```
Sebep: R2_PUBLIC_DOMAIN formatı yanlış
Çözüm: https://bucket-name.ACCOUNT_ID.r2.cloudflarestorage.com
```

---

## 🎯 Sonraki Adımlar

1. ✅ Neon Database (zaten yaptık)
2. 🔨 **Cloudflare R2** (bu kılavuz)
3. ✅ npm run dev
4. ✅ Admin login test
5. ✅ Yazı + resim upload test

---

## 💡 İPUÇLARI

**Presigned URLs nedir?**
- Admin resim upload'ı kendi seçer
- Server Client'e temporary URL gönderir
- Client doğrudan R2'ye upload eder
- Güvenli ve hızlı

**Neden R2?**
- AWS S3 uyumlu (aws-sdk kullanır)
- Egress (indirme) ücreti yok
- Başarısız upload'ta para çıkmazsa çıkar
- Cloudflare Global Network entegrasyonu

---

**Hazırsan devam et! 🚀 Sorular?** Terminal'de çalışan dev server var mı kontrol et.
