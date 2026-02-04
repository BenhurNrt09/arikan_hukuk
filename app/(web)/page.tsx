'use server'

import Header from '@/app/components/Header'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
    const recentPosts = await prisma.post.findMany({
        take: 3,
        include: { category: true },
        orderBy: { publishedAt: 'desc' },
    })

    const settings = await prisma.siteSettings.findFirst()
    const appointmentPhone = settings?.appointmentPhone || '+90 212 123 45 67'

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-primary text-white py-20 sm:py-32 lg:py-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Profesyonel Hukuk Danışmanlığı
                        </h1>
                        <p className="text-lg sm:text-xl text-primary-100 mb-8">
                            Arıkan Hukuk & Danışmanlık, kurumsal ve bireysel hukuk hizmetlerinde
                            uzmanlaşmış, deneyimli avukatlardan oluşan bir ofistir.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={`tel:${appointmentPhone.replace(/\s/g, '')}`}
                                className="inline-block bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors text-center"
                            >
                                Randevu Taleplerini Yapın
                            </a>
                            <Link
                                href="/blog"
                                className="inline-block bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                            >
                                Yazılarımızı Okuyun
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 sm:py-32 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
                            Hizmetlerimiz
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Geniş kapsamlı hukuk hizmetleri ile müşterilerimizin yanında bulunuyoruz.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Kurumsal Hukuk',
                                description:
                                    'Şirket kuruluşu, yönetim danışmanlığı ve sözleşme hazırlanması',
                            },
                            {
                                title: 'Ticaret Hukuku',
                                description:
                                    'Ticari anlaşmazlıklar ve mağazaya ilişkin hukuki konularda danışmanlık',
                            },
                            {
                                title: 'Emlak Hukuku',
                                description:
                                    'Gayrimenkul işlemleri, tapu müdürlüğü işlemlerinde yasal destek',
                            },
                        ].map((service, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-semibold text-primary-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Preview */}
            <section className="py-20 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900">
                            Son Yazılar
                        </h2>
                        <Link
                            href="/blog"
                            className="text-accent-500 font-semibold hover:text-accent-600"
                        >
                            Tüm Yazıları Göster →
                        </Link>
                    </div>

                    {recentPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {recentPosts.map((post: any) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow group"
                                >
                                    {post.coverImage && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <span className="inline-block text-sm font-medium text-accent-500 mb-2">
                                            {post.category.name}
                                        </span>
                                        <h3 className="font-display text-lg font-bold text-primary-900 mb-2 group-hover:text-accent-500 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-xs text-gray-500">
                                            {new Date(post.publishedAt).toLocaleDateString(
                                                'tr-TR',
                                            )}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 mb-4">
                                Henüz yazı yayınlanmamıştır.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 sm:py-32 bg-primary-900 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                            Bize Ulaşın
                        </h2>
                        <p className="text-primary-100 max-w-2xl mx-auto">
                            Hukuki tavsiyeler için iletişime geçin
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {settings?.phone && (
                            <div className="text-center">
                                <div className="text-3xl mb-3">📞</div>
                                <h3 className="font-semibold mb-2">Telefon</h3>
                                <a
                                    href={`tel:${settings.phone.replace(/\s/g, '')}`}
                                    className="text-accent-400 hover:text-accent-300 transition-colors"
                                >
                                    {settings.phone}
                                </a>
                            </div>
                        )}
                        {settings?.email && (
                            <div className="text-center">
                                <div className="text-3xl mb-3">📧</div>
                                <h3 className="font-semibold mb-2">E-posta</h3>
                                <a
                                    href={`mailto:${settings.email}`}
                                    className="text-accent-400 hover:text-accent-300 transition-colors"
                                >
                                    {settings.email}
                                </a>
                            </div>
                        )}
                        {settings?.appointmentPhone && (
                            <div className="text-center">
                                <div className="text-3xl mb-3">📅</div>
                                <h3 className="font-semibold mb-2">Randevu</h3>
                                <a
                                    href={`tel:${settings.appointmentPhone.replace(/\s/g, '')}`}
                                    className="text-accent-400 hover:text-accent-300 transition-colors"
                                >
                                    {settings.appointmentPhone}
                                </a>
                            </div>
                        )}
                    </div>

                    {settings?.address && (
                        <div className="mt-12 pt-12 border-t border-primary-800 text-center">
                            <h3 className="font-semibold mb-2">Ofis Adresi</h3>
                            <p className="text-primary-100 whitespace-pre-line">
                                {settings.address}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary-950 text-primary-100 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <p>
                        © 2026 Arıkan Hukuk & Danışmanlık. Tüm hakları saklıdır.
                    </p>
                </div>
            </footer>
        </div>
    )
}
