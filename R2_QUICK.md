# Cloudflare R2 - Quick Reference

## ⚡ 2 Dakikada Yapılacaklar

### Adım 1: Cloudflare'e Giriş
```
https://dash.cloudflare.com/ → Sign up/Login
```

### Adım 2: R2 Bucket Oluştur
```
Left Menu → R2
Create Bucket → "arikan-hukuk-images" → Create
```

### Adım 3: API Token Oluştur
```
R2 → Settings → Manage API tokens
Create API Token → Object Read & Write → Create
```

### Adım 4: Kopyala (Ekranda göreceksin)
```
✓ Access Key ID        → R2_ACCESS_KEY_ID
✓ Secret Access Key    → R2_SECRET_ACCESS_KEY
✓ Account ID           → R2_ACCOUNT_ID
```

### Adım 5: .env.local Doldur
```env
R2_ACCOUNT_ID="12345abcde"
R2_ACCESS_KEY_ID="4a1c2b3e4f5g6h7i8j9k0l"
R2_SECRET_ACCESS_KEY="1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p"
R2_BUCKET_NAME="arikan-hukuk-images"
R2_PUBLIC_DOMAIN="https://arikan-hukuk-images.12345abcde.r2.cloudflarestorage.com"
```

---

## 🧪 Test
```bash
npm run dev
# http://localhost:3000/admin/login
# Resim upload test et
```

---

**Ayrıntılı kılavuz:** [CLOUDFLARE_R2_SETUP.md](./CLOUDFLARE_R2_SETUP.md)
