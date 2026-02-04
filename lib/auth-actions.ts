'use server'

import { prisma } from '@/lib/prisma'
import { login } from '@/lib/auth'
import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Lütfen tüm alanları doldurun.' }
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return { error: 'Hatalı e-posta veya şifre.' }
        }

        const isValid = await compare(password, user.password)

        if (!isValid) {
            return { error: 'Hatalı e-posta veya şifre.' }
        }

        // Create session
        await login(user.id)
    } catch (error) {
        console.error('Login error:', error)
        return { error: 'Bir hata oluştu.' }
    }

    // Redirect after successful login
    redirect('/admin')
}
