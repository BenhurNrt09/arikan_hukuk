'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
    const [isSticky, setIsSticky] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [settings, setSettings] = useState<any>(null)

    useEffect(() => {
        // Fetch settings for contact info
        async function fetchSettings() {
            try {
                const response = await fetch('/api/settings')
                if (response.ok) {
                    const data = await response.json()
                    setSettings(data)
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error)
            }
        }

        fetchSettings()

        // Handle sticky header
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const appointmentPhone = settings?.appointmentPhone || '+90 212 123 45 67'

    return (
        <>
            <header
                className={`transition-all duration-300 z-50 ${
                    isSticky
                        ? 'fixed top-0 left-0 right-0 bg-primary-900/95 backdrop-blur shadow-lg'
                        : 'relative bg-white border-b border-gray-200'
                }`}
            >
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className={`font-display text-2xl font-bold ${
                                isSticky
                                    ? 'text-white'
                                    : 'text-primary-900'
                            }`}
                        >
                            Arıkan Hukuk
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link
                                href="/"
                                className={`font-medium transition-colors ${
                                    isSticky
                                        ? 'text-white hover:text-accent-400'
                                        : 'text-gray-700 hover:text-primary-900'
                                }`}
                            >
                                Anasayfa
                            </Link>
                            <Link
                                href="/blog"
                                className={`font-medium transition-colors ${
                                    isSticky
                                        ? 'text-white hover:text-accent-400'
                                        : 'text-gray-700 hover:text-primary-900'
                                }`}
                            >
                                Blog
                            </Link>
                            <Link
                                href="#contact"
                                className={`font-medium transition-colors ${
                                    isSticky
                                        ? 'text-white hover:text-accent-400'
                                        : 'text-gray-700 hover:text-primary-900'
                                }`}
                            >
                                İletişim
                            </Link>
                        </div>

                        {/* CTA Button */}
                        <a
                            href={`tel:${appointmentPhone.replace(/\s/g, '')}`}
                            className="hidden md:inline-flex items-center gap-2 bg-gradient-accent text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                        >
                            <span>Randevu Al</span>
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`md:hidden p-2 rounded-md ${
                                isSticky
                                    ? 'text-white hover:bg-primary-800'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden pb-4 space-y-2">
                            <Link
                                href="/"
                                className={`block px-3 py-2 rounded-md font-medium ${
                                    isSticky
                                        ? 'text-white hover:bg-primary-800'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Anasayfa
                            </Link>
                            <Link
                                href="/blog"
                                className={`block px-3 py-2 rounded-md font-medium ${
                                    isSticky
                                        ? 'text-white hover:bg-primary-800'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Blog
                            </Link>
                            <Link
                                href="#contact"
                                className={`block px-3 py-2 rounded-md font-medium ${
                                    isSticky
                                        ? 'text-white hover:bg-primary-800'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                İletişim
                            </Link>
                            <a
                                href={`tel:${appointmentPhone.replace(/\s/g, '')}`}
                                className="block w-full mt-4 bg-gradient-accent text-white px-4 py-2 rounded-lg font-semibold text-center hover:shadow-lg transition-shadow"
                            >
                                Randevu Al
                            </a>
                        </div>
                    )}
                </nav>
            </header>

            {/* Sticky header spacer */}
            {isSticky && <div className="h-20" />}
        </>
    )
}
