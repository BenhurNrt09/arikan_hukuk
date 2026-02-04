'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { updateSettings, getSettings } from '@/lib/actions'
import { useEffect, useState } from 'react'

function SubmitButton({ pending }: { pending: boolean }) {
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-accent-500 text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-colors disabled:opacity-50"
        >
            {pending ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </button>
    )
}

async function handleUpdateSettings(prevState: any, formData: FormData) {
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const address = formData.get('address') as string
    const googleMapsUrl = formData.get('googleMapsUrl') as string
    const appointmentPhone = formData.get('appointmentPhone') as string

    const result = await updateSettings(
        phone || undefined,
        email || undefined,
        address || undefined,
        googleMapsUrl || undefined,
        appointmentPhone || undefined,
    )

    return result
}

export default function SettingsPage() {
    const [state, formAction, isPending] = useActionState(handleUpdateSettings, null)
    const [settings, setSettings] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadSettings() {
            const result = await getSettings()
            if (result.success) {
                setSettings(result.data)
            }
            setLoading(false)
        }
        loadSettings()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Yükleniyor...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <Link
                        href="/admin/dashboard"
                        className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
                    >
                        ← Geri
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-primary-900">
                        Site Ayarları
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <form action={formAction} className="space-y-8 rounded-lg bg-white p-8 shadow">
                    {/* Contact Info */}
                    <fieldset className="border-b pb-8">
                        <legend className="text-lg font-semibold text-gray-900 mb-6">
                            İletişim Bilgileri
                        </legend>

                        {/* Phone */}
                        <div className="mb-6">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Genel Telefon
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                defaultValue={settings?.phone || ''}
                                className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                placeholder="+90 212 123 45 67"
                            />
                        </div>

                        {/* Appointment Phone */}
                        <div className="mb-6">
                            <label
                                htmlFor="appointmentPhone"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Randevu Telefonu
                            </label>
                            <input
                                type="tel"
                                id="appointmentPhone"
                                name="appointmentPhone"
                                defaultValue={settings?.appointmentPhone || ''}
                                className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                placeholder="+90 212 123 45 67"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-900"
                            >
                                E-posta Adresi
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                defaultValue={settings?.email || ''}
                                className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                placeholder="info@example.com"
                            />
                        </div>
                    </fieldset>

                    {/* Address Info */}
                    <fieldset className="border-b pb-8">
                        <legend className="text-lg font-semibold text-gray-900 mb-6">
                            Konum Bilgileri
                        </legend>

                        {/* Address */}
                        <div className="mb-6">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Adres
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                rows={3}
                                defaultValue={settings?.address || ''}
                                className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                placeholder="Ofis adresini gir..."
                            />
                        </div>

                        {/* Google Maps URL */}
                        <div>
                            <label
                                htmlFor="googleMapsUrl"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Google Maps URL
                            </label>
                            <input
                                type="url"
                                id="googleMapsUrl"
                                name="googleMapsUrl"
                                defaultValue={settings?.googleMapsUrl || ''}
                                className="mt-2 block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                placeholder="https://maps.google.com/..."
                            />
                        </div>
                    </fieldset>

                    {/* Success/Error Message */}
                    {state?.success && (
                        <div className="rounded-md bg-green-50 p-4 text-green-700">
                            Ayarlar başarıyla kaydedildi!
                        </div>
                    )}

                    {state?.error && (
                        <div className="rounded-md bg-red-50 p-4 text-red-700">
                            {state.error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4">
                        <SubmitButton pending={isPending} />
                        <Link
                            href="/admin/dashboard"
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
