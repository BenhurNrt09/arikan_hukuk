'use server'

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { deletePost } from '@/lib/actions'

export default async function PostsPage() {
    const session = await getSession()

    if (!session?.userId) {
        redirect('/admin/login')
    }

    const posts = await prisma.post.findMany({
        include: { category: true },
        orderBy: { publishedAt: 'desc' },
    })

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <Link
                            href="/admin/dashboard"
                            className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
                        >
                            ← Geri
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-primary-900">
                            Yazılar
                        </h1>
                    </div>
                    <Link
                        href="/admin/posts/new"
                        className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                    >
                        Yeni Yazı Ekle
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {posts.length === 0 ? (
                    <div className="rounded-lg bg-white p-8 text-center shadow">
                        <p className="text-gray-500">Henüz yazı yok.</p>
                        <Link
                            href="/admin/posts/new"
                            className="mt-4 inline-block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                        >
                            İlk yazıyı oluştur
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg bg-white shadow">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Başlık
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Tarih
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post: any) => (
                                    <tr
                                        key={post.id}
                                        className="border-b hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {post.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {post.category.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(post.publishedAt).toLocaleDateString(
                                                'tr-TR',
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm space-x-2">
                                            <Link
                                                href={`/admin/posts/${post.id}/edit`}
                                                className="text-primary-600 hover:text-primary-700 font-medium"
                                            >
                                                Düzenle
                                            </Link>
                                            <DeletePostButton postId={post.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    )
}

function DeletePostButton({ postId }: { postId: string }) {
    async function handleDelete() {
        'use server'
        await deletePost(postId)
    }

    return (
        <form action={handleDelete} style={{ display: 'inline' }}>
            <button
                type="submit"
                className="text-red-600 hover:text-red-700 font-medium"
                onClick={(e) => {
                    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
                        e.preventDefault()
                    }
                }}
            >
                Sil
            </button>
        </form>
    )
}
