'use server'

import Header from '@/app/components/Header'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        include: { category: true },
        orderBy: { publishedAt: 'desc' },
    })

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    })

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                        Blog & Makaleler
                    </h1>
                    <p className="text-lg text-primary-100 max-w-2xl">
                        Hukuki konularla ilgili yazılarımızı okuyun ve güncel bilgiler edinin.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar - Categories */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <h2 className="font-display text-xl font-bold text-primary-900 mb-6">
                                    Kategoriler
                                </h2>
                                <nav className="space-y-2">
                                    <Link
                                        href="/blog"
                                        className="block px-4 py-2 rounded-lg text-primary-900 hover:bg-primary-100 transition-colors font-medium"
                                    >
                                        Tüm Yazılar
                                    </Link>
                                    {categories.map((category: any) => (
                                        <Link
                                            key={category.id}
                                            href={`/blog/category/${category.slug}`}
                                            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Main Content - Posts Grid */}
                        <div className="lg:col-span-3">
                            {posts.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-gray-500 text-lg">
                                        Henüz yazı yayınlanmamıştır.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {posts.map((post: any) => (
                                        <article
                                            key={post.id}
                                            className="border-b pb-8 hover:opacity-80 transition-opacity"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                                {post.coverImage && (
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="md:col-span-1 relative h-40 rounded-lg overflow-hidden"
                                                    >
                                                        <img
                                                            src={post.coverImage}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                        />
                                                    </Link>
                                                )}
                                                <div
                                                    className={
                                                        post.coverImage
                                                            ? 'md:col-span-3'
                                                            : ''
                                                    }
                                                >
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="block group"
                                                    >
                                                        <span className="inline-block text-sm font-medium text-accent-500 mb-2">
                                                            {post.category.name}
                                                        </span>
                                                        <h3 className="font-display text-2xl font-bold text-primary-900 mb-3 group-hover:text-accent-500 transition-colors">
                                                            {post.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-gray-600 mb-4">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(
                                                                post.publishedAt,
                                                            ).toLocaleDateString('tr-TR', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                        <Link
                                                            href={`/blog/${post.slug}`}
                                                            className="text-accent-500 font-semibold hover:text-accent-600 transition-colors"
                                                        >
                                                            Devamını Oku →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
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
