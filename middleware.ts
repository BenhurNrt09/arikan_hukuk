import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Protect all routes starting with /admin
    if (path.startsWith('/admin')) {
        // Exclude /admin/login from protection to avoid redirect loop
        if (path === '/admin/login') {
            return NextResponse.next()
        }

        const session = request.cookies.get('session')?.value

        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        try {
            const payload = await decrypt(session)
            if (!payload) {
                // Invalid session
                return NextResponse.redirect(new URL('/admin/login', request.url))
            }
        } catch (error) {
            // Decryption failed
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
