'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createPost, getCategories } from '@/lib/actions'
import { useEffect, useState } from 'react'
import { getPresignedUrl } from '@/lib/actions'

function SubmitButton({ pending }: { pending: boolean }) {
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
            {pending ? 'Kaydediliyor...' : 'Yazıyı Yayınla'}
        </button>
    )
}

export default function NewPostPage() {
    const [state, formAction, isPending] = useActionState(handleCreatePost, null)
    const [categories, setCategories] = useState<any[]>([])
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('')
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        async function loadCategories() {
            const result = await getCategories()
            if (result.success) {
                setCategories(result.data || [])
            }
        }
        loadCategories()
    }, [])

    async function handleCreatePost(prevState: any, formData: FormData) {
        const title = formData.get('title') as string
        const slug = formData.get('slug') as string
        const content = formData.get('content') as string
        const excerpt = formData.get('excerpt') as string
        const categoryId = formData.get('categoryId') as string

        if (!title || !slug || !content || !categoryId) {
            return { error: 'Lütfen tüm alanları doldurun.' }
        }

        const result = await createPost(
            title,
            slug,
            content,
            excerpt,
            categoryId,
            uploadedImageUrl || undefined,
        )

        if (result.success) {
            // Redirect will happen in layout
            window.location.href = '/admin/posts'
        }

        return result
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const result = await getPresignedUrl(file.name, file.type)
            if (result.success && result.url) {
                // Upload to R2 using presigned URL
                const uploadResponse = await fetch(result.url as string, {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': file.type,
                    },
                })

                if (uploadResponse.ok && result.publicUrl) {
                    setUploadedImageUrl(result.publicUrl as string)
                }
            }
        } catch (error) {
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <Link
                        href="/admin/posts"
                        className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
                    >
                        ← Geri
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-primary-900">
                        Yeni Yazı
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <form action={formAction} className="space-y-8 rounded-lg bg-white p-8 shadow">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Başlık
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label
                            htmlFor="slug"
                            className="block text-sm font-medium text-gray-900"
                        >
                            URL Slug
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            required
                            placeholder="yazi-basligi"
                            className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label
                            htmlFor="categoryId"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Kategori
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            required
                            className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                        >
                            <option value="">Kategori seçin</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label
                            htmlFor="excerpt"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Özet
                        </label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            rows={2}
                            className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                        />
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label
                            htmlFor="coverImage"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Kapak Resmi
                        </label>
                        <div className="mt-2">
                            <input
                                type="file"
                                id="coverImage"
                                name="coverImage"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className="block w-full text-sm"
                            />
                            {uploading && (
                                <p className="mt-2 text-sm text-blue-600">
                                    Resim yükleniyor...
                                </p>
                            )}
                            {uploadedImageUrl && (
                                <div className="mt-4">
                                    <img
                                        src={uploadedImageUrl}
                                        alt="Preview"
                                        className="h-40 w-full object-cover rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-900"
                        >
                            İçerik
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows={12}
                            required
                            className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm font-mono"
                            placeholder="Markdown desteklenir"
                        />
                    </div>

                    {/* Error Message */}
                    {state?.error && (
                        <div className="rounded-md bg-red-50 p-4 text-red-700">
                            {state.error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4">
                        <SubmitButton pending={isPending} />
                        <Link
                            href="/admin/posts"
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            İptal
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    )
}
