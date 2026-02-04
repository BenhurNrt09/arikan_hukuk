#!/bin/bash
# Arıkan Hukuk - Pre-Flight Checklist
# Bu script, deployment öncesi tüm gerekli dosyaların var olduğunu kontrol eder.

echo "🚀 Arıkan Hukuk - Pre-Flight Checklist"
echo "======================================"
echo ""

# Renk kodları
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kontrol sonuçları
PASSED=0
FAILED=0

# Kontrol fonksiyonu
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1"
        ((FAILED++))
    fi
}

check_directory() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1/"
        ((FAILED++))
    fi
}

echo "📁 Directories:"
check_directory "app"
check_directory "lib"
check_directory "prisma"
check_directory "public"
check_directory "app/(admin)"
check_directory "app/(web)"
check_directory "app/api"
check_directory "app/components"
echo ""

echo "📄 Configuration Files:"
check_file ".env.example"
check_file ".env.local"
check_file "package.json"
check_file "tsconfig.json"
check_file "next.config.ts"
check_file "tailwind.config.ts"
check_file "prisma.config.ts"
check_file "middleware.ts"
echo ""

echo "📚 Documentation:"
check_file "README.md"
check_file "QUICKSTART.md"
check_file "KURULUM.md"
check_file "IMPLEMENTATION_CHECKLIST.md"
check_file "IMPLEMENTATION_SUMMARY.md"
echo ""

echo "📦 App Pages (Admin):"
check_file "app/(admin)/layout.tsx"
check_file "app/(admin)/admin/page.tsx"
check_file "app/(admin)/admin/login/page.tsx"
check_file "app/(admin)/admin/dashboard/page.tsx"
check_file "app/(admin)/admin/posts/page.tsx"
check_file "app/(admin)/admin/posts/new/page.tsx"
check_file "app/(admin)/admin/settings/page.tsx"
check_file "app/(admin)/admin/logout/page.tsx"
echo ""

echo "📱 App Pages (Web):"
check_file "app/(web)/layout.tsx"
check_file "app/(web)/page.tsx"
check_file "app/(web)/blog/page.tsx"
check_file "app/(web)/blog/[slug]/page.tsx"
echo ""

echo "🔧 Library Files:"
check_file "lib/auth.ts"
check_file "lib/auth-actions.ts"
check_file "lib/actions.ts"
check_file "lib/prisma.ts"
check_file "lib/r2.ts"
echo ""

echo "🌐 API Routes:"
check_file "app/api/settings/route.ts"
echo ""

echo "⚙️ Components:"
check_file "app/components/Header.tsx"
echo ""

echo "🗄️ Database:"
check_file "prisma/schema.prisma"
check_file "prisma/seed.ts"
echo ""

echo "======================================"
echo -e "Kontrol Sonuçları:"
echo -e "${GREEN}✓ Passed: $PASSED${NC}"
echo -e "${RED}✗ Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ Tüm dosyalar mevcut! Kuruluma hazırsınız.${NC}"
    echo ""
    echo "Sonraki adımlar:"
    echo "1. .env.local dosyasını doldurun"
    echo "2. npm install"
    echo "3. npx prisma migrate dev"
    echo "4. npm run prisma:seed"
    echo "5. npm run dev"
    exit 0
else
    echo -e "${RED}❌ Bazı dosyalar eksik! Lütfen kontrol edin.${NC}"
    exit 1
fi
