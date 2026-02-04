'use server'

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
    const session = await getSession()

    if (!session?.userId) {
        redirect('/admin/login')
    }

    const postCount = await prisma.post.count()
    const categoryCount = await prisma.category.count()
    const settings = await prisma.siteSettings.findFirst()

    const stats = [
        {
            title: 'Toplam Yazı',
            value: postCount,
            icon: '📄',
            href: '/admin/posts',
        },
        {
            title: 'Kategoriler',
            value: categoryCount,
            icon: '📂',
            href: '/admin/categories',
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-primary-900">
                        Admin Paneli
                    </h1>
                    <Link
                        href="/admin/logout"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Çıkış Yap
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Stats Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        İstatistikler
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <Link
                                key={stat.title}
                                href={stat.href}
                                className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <dt className="truncate text-sm font-medium text-gray-500">
                                    {stat.title}
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-primary-900">
                                    {stat.value}
                                </dd>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Hızlı Erişim
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Link
                            href="/admin/posts/new"
                            className="block rounded-lg bg-gradient-primary p-6 text-white hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                Yeni Yazı Ekle
                            </h3>
                            <p className="text-primary-100">
                                Blog'a yeni bir yazı oluştur
                            </p>
                        </Link>

                        <Link
                            href="/admin/settings"
                            className="block rounded-lg bg-accent-500 p-6 text-white hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                Site Ayarları
                            </h3>
                            <p className="text-accent-100">
                                İletişim bilgilerini güncelle
                            </p>
                        </Link>
                    </div>
                </div>

                {/* Site Info */}
                {settings && (
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Site Bilgileri
                        </h2>
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {settings.phone && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Telefon
                                    </dt>
                                    <dd className="mt-1 text-lg text-gray-900">
                                        {settings.phone}
                                    </dd>
                                </div>
                            )}
                            {settings.email && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        E-posta
                                    </dt>
                                    <dd className="mt-1 text-lg text-gray-900">
                                        {settings.email}
                                    </dd>
                                </div>
                            )}
                            {settings.appointmentPhone && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Randevu Telefonu
                                    </dt>
                                    <dd className="mt-1 text-lg text-gray-900">
                                        {settings.appointmentPhone}
                                    </dd>
                                </div>
                            )}
                            {settings.address && (
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Adres
                                    </dt>
                                    <dd className="mt-1 text-lg text-gray-900">
                                        {settings.address}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                )}
            </main>
        </div>
    )
}
