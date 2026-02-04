'use server'

import Header from '@/app/components/Header'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const posts = await prisma.post.findMany({
        select: { slug: true },
    })

    return posts.map((post: any) => ({
        slug: post.slug,
    }))
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { category: true },
    })

    if (!post) {
        notFound()
    }

    // Get related posts from same category
    const relatedPosts = await prisma.post.findMany({
        where: {
            categoryId: post.categoryId,
            slug: { not: post.slug },
        },
        take: 3,
        include: { category: true },
        orderBy: { publishedAt: 'desc' },
    })

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex gap-2 text-sm">
                    <Link href="/" className="text-primary-600 hover:text-primary-700">
                        Anasayfa
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href="/blog" className="text-primary-600 hover:text-primary-700">
                        Blog
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600">{post.title}</span>
                </div>
            </div>

            {/* Hero Section */}
            {post.coverImage && (
                <div className="relative h-96 sm:h-[500px] overflow-hidden">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            )}

            {/* Main Content */}
            <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Meta Info */}
                <div className="mb-8 pb-8 border-b">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="inline-block bg-accent-100 text-accent-900 px-3 py-1 rounded-full text-sm font-medium">
                            {post.category.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-900 mb-4">
                        {post.title}
                    </h1>
                    <p className="text-xl text-gray-600">{post.excerpt}</p>
                </div>

                {/* Article Content */}
                <div className="prose prose-primary max-w-none mb-12">
                    <div className="text-gray-700 leading-8 whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-primary text-white p-8 rounded-lg mb-12">
                    <h3 className="font-semibold text-lg mb-2">
                        Hukuki danışmanlığa mı ihtiyacınız var?
                    </h3>
                    <p className="text-primary-100 mb-4">
                        Sorularınız için bizimle iletişime geçin. Uzman avukatlarımız
                        yardımcı olmaya hazırdır.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-block bg-accent-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
                    >
                        İletişim Sayfasına Git
                    </Link>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div>
                        <h2 className="font-display text-2xl font-bold text-primary-900 mb-6">
                            İlgili Yazılar
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost: any) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow group"
                                >
                                    {relatedPost.coverImage && (
                                        <div className="relative h-40 overflow-hidden">
                                            <img
                                                src={relatedPost.coverImage}
                                                alt={relatedPost.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <span className="text-xs font-medium text-accent-500">
                                            {relatedPost.category.name}
                                        </span>
                                        <h3 className="font-semibold text-primary-900 mt-2 group-hover:text-accent-500 transition-colors">
                                            {relatedPost.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>

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
