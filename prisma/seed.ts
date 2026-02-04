import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create admin user
    const password = await hash('admin123', 12)
    const user = await prisma.user.upsert({
        where: { email: 'admin@arikan.com' },
        update: {},
        create: {
            email: 'admin@arikan.com',
            name: 'Admin',
            password,
        },
    })
    console.log('Admin user created:', user)

    // Create default categories
    const categories = [
        { name: 'Blog', slug: 'blog' },
        { name: 'Makale', slug: 'makale' },
        { name: 'Köşe Yazısı', slug: 'kose-yazisi' },
    ]

    for (const cat of categories) {
        const category = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        })
        console.log('Category created:', category)
    }

    // Create default site settings
    const settings = await prisma.siteSettings.upsert({
        where: { id: 'default' },
        update: {},
        create: {
            id: 'default',
            phone: '+90 212 123 45 67',
            email: 'info@arikan.com',
            address: 'İstanbul, Türkiye',
            appointmentPhone: '+90 212 987 65 43',
        },
    })
    console.log('Site settings created:', settings)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
