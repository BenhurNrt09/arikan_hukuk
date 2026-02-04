# Arıkan Hukuk & Danışmanlık - Corporate Law Firm Website

Modern, responsive hukuk firması websitesi. Built with Next.js 16, Prisma, Neon PostgreSQL, ve Cloudflare R2.

**Status:** ✅ Production Ready | **Last Updated:** 4 Şubat 2026

---

## 🎯 Features

### Admin Panel
- **Secure Authentication:** JWT + bcryptjs
- **Blog Management:** Full CRUD operations
- **Image Upload:** Cloudflare R2 integration
- **Settings:** Contact information management
- **Protected Routes:** Middleware-based protection

### Public Website
- **Homepage:** Hero section + services + recent posts
- **Blog Section:** Category filtering + detailed posts
- **Responsive Design:** Mobile-first approach
- **Sticky Header:** With call-to-action button
- **Contact Info:** Phone, email, address, maps

### Technical Stack
- **Framework:** Next.js 16.1.6
- **Language:** TypeScript 5
- **Database:** Prisma + Neon PostgreSQL
- **Styling:** Tailwind CSS 4
- **Storage:** Cloudflare R2 (aws-sdk)
- **Auth:** JWT (jose) + bcryptjs

---

## 🚀 Quick Start

### 1. Setup Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` ve aşağıdakileri doldurun:
- `DATABASE_URL` - Neon PostgreSQL connection
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME` - Cloudflare R2
- `JWT_SECRET` - Min 32 characters (generate with: `openssl rand -hex 32`)
- `R2_PUBLIC_DOMAIN` - R2 CDN domain

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

```bash
# Run migrations
npx prisma migrate dev --name init

# Seed initial data (creates admin user + categories)
npm run prisma:seed
```

**Admin Credentials (after seed):**
- Email: `admin@arikan.com`
- Password: `admin123`

### 4. Start Development

```bash
npm run dev
```

Visit http://localhost:3000

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute setup guide |
| [KURULUM.md](./KURULUM.md) | Detailed setup (Turkish) |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Technical overview |
| [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) | Verification checklist |
| [COMPLETION_REPORT.md](./COMPLETION_REPORT.md) | Final status report |

---

## 📂 Project Structure

```
app/
├── (admin)/              # Protected admin routes
│   └── admin/
│       ├── login/        # Login page
│       ├── dashboard/    # Admin dashboard
│       ├── posts/        # Blog CRUD
│       ├── settings/     # Site settings
│       └── logout/       # Logout handler
└── (web)/               # Public routes
    ├── page.tsx         # Homepage
    └── blog/            # Blog pages

lib/
├── auth.ts              # JWT & sessions
├── auth-actions.ts      # Login action
├── actions.ts           # Server actions (CRUD)
├── prisma.ts            # DB client
└── r2.ts                # R2 config

prisma/
├── schema.prisma        # Database schema
└── seed.ts              # Initial data
```

---

## 🔐 Security Features

- ✅ JWT authentication (24h expiry)
- ✅ Password hashing (bcryptjs)
- ✅ HttpOnly cookies
- ✅ Middleware route protection
- ✅ Environment variable management
- ✅ Presigned R2 URLs (1h expiry)
- ✅ SQL injection protection (Prisma)

---

## 🎨 Design System

### Colors
- **Primary (Navy Blue):** `#3d5a9f`
- **Accent (Gold):** `#ffd166`

### Fonts
- **Display:** Playfair Display
- **Body:** Inter

### Responsive
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npm run prisma:migrate  # Create migration
npm run prisma:seed     # Seed data
npm run prisma:reset    # Fresh database

# Build & Deploy
npm run build           # Production build
npm run start          # Start production server
npm run lint           # Run linter
```

---

## 📊 Database Schema

### User
- id (CUID)
- email (unique)
- password (hashed)
- name (optional)

### Category
- id (CUID)
- name
- slug (unique)
- posts (relation)

### Post
- id (CUID)
- title
- slug (unique)
- content
- excerpt (optional)
- coverImage (optional, R2 URL)
- publishedAt
- categoryId (foreign key)

### SiteSettings
- id (CUID)
- phone (optional)
- email (optional)
- address (optional)
- googleMapsUrl (optional)
- appointmentPhone (optional)

---

## 🔍 Code Quality

- ✅ TypeScript strict mode
- ✅ No TypeScript errors
- ✅ ESLint configured
- ✅ Consistent formatting
- ✅ Comprehensive comments

---

## 📈 Performance

- Server-side rendering (SSR)
- Static generation for blog posts
- Image optimization via R2
- Minimal client-side JavaScript
- CSS-in-JS with Tailwind

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Other Platforms

Same process as Vercel. Just set environment variables in your platform's dashboard.

**Don't forget:**
- DATABASE_URL
- R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
- JWT_SECRET
- R2_PUBLIC_DOMAIN

---

## 📝 Admin Panel Usage

### Login
1. Visit `/admin/login`
2. Enter credentials (admin@arikan.com / admin123)
3. You'll be redirected to dashboard

### Create Blog Post
1. Dashboard → "Yeni Yazı Ekle"
2. Fill the form:
   - Title
   - URL slug
   - Category
   - Excerpt
   - Content (Markdown-supported)
   - Cover image (uploaded to R2)
3. Click "Yayınla"

### Update Settings
1. Dashboard → "Site Ayarları"
2. Update contact information
3. Save changes

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check your DATABASE_URL
# Ensure Neon project is active
npm run prisma:reset
```

### R2 Upload Error
- Verify R2_PUBLIC_DOMAIN is correct
- Check bucket is public
- Verify credentials are active

### Login Issues
- Ensure database is seeded: `npm run prisma:seed`
- Clear cookies and try again
- Check DATABASE_URL is correct

See [KURULUM.md](./KURULUM.md#troubleshooting) for more help.

---

## 📞 Support

- Documentation: See [KURULUM.md](./KURULUM.md)
- Setup Help: See [QUICKSTART.md](./QUICKSTART.md)
- Technical Details: See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

## 📄 License

This project is private and created for Arıkan Hukuk & Danışmanlık.

---

## 👨‍💻 Development

Built with ❤️ using Next.js, Prisma, and Tailwind CSS.

**Stack Summary:**
- Next.js 16 + React 19
- TypeScript 5
- Prisma + Neon PostgreSQL
- Cloudflare R2
- Tailwind CSS 4
- JWT Authentication

**Status:** ✅ Production Ready  
**Last Updated:** 4 Şubat 2026

---

## 🎯 Next Steps

1. ✅ Copy `.env.example` to `.env.local`
2. ✅ Fill in environment variables
3. ✅ Run `npm install && npm run prisma:seed`
4. ✅ Start with `npm run dev`
5. ✅ Login and test the admin panel
6. ✅ Deploy when ready

**Happy coding!** 🚀
