'use server'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2, R2_BUCKET_NAME } from './r2'
import { prisma } from './prisma'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'

// ============ R2 Upload ============
export async function getPresignedUrl(fileName: string, contentType: string) {
    try {
        const fileKey = `${randomUUID()}-${fileName}`

        const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: fileKey,
            ContentType: contentType,
        })

        const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 })

        // Public URL for accessing the file after upload
        const publicUrl = `${process.env.R2_PUBLIC_DOMAIN}/${fileKey}`

        return { success: true, url: signedUrl, publicUrl, fileKey }
    } catch (error) {
        console.error('Error generating presigned URL:', error)
        return { success: false, error: 'Failed to generate upload URL' }
    }
}

// ============ Category Actions ============
export async function createCategory(name: string, slug: string) {
    try {
        const category = await prisma.category.create({
            data: { name, slug },
        })
        return { success: true, data: category }
    } catch (error) {
        console.error('Error creating category:', error)
        return { success: false, error: 'Failed to create category' }
    }
}

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
        })
        return { success: true, data: categories }
    } catch (error) {
        console.error('Error fetching categories:', error)
        return { success: false, error: 'Failed to fetch categories' }
    }
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({ where: { id } })
        return { success: true }
    } catch (error) {
        console.error('Error deleting category:', error)
        return { success: false, error: 'Failed to delete category' }
    }
}

// ============ Post Actions ============
export async function createPost(
    title: string,
    slug: string,
    content: string,
    excerpt: string,
    categoryId: string,
    coverImage?: string,
) {
    try {
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                categoryId,
                coverImage,
            },
            include: { category: true },
        })
        return { success: true, data: post }
    } catch (error) {
        console.error('Error creating post:', error)
        return { success: false, error: 'Failed to create post' }
    }
}

export async function updatePost(
    id: string,
    title: string,
    slug: string,
    content: string,
    excerpt: string,
    categoryId: string,
    coverImage?: string,
) {
    try {
        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                excerpt,
                categoryId,
                coverImage,
            },
            include: { category: true },
        })
        return { success: true, data: post }
    } catch (error) {
        console.error('Error updating post:', error)
        return { success: false, error: 'Failed to update post' }
    }
}

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            include: { category: true },
            orderBy: { publishedAt: 'desc' },
        })
        return { success: true, data: posts }
    } catch (error) {
        console.error('Error fetching posts:', error)
        return { success: false, error: 'Failed to fetch posts' }
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: { category: true },
        })
        return { success: true, data: post }
    } catch (error) {
        console.error('Error fetching post:', error)
        return { success: false, error: 'Failed to fetch post' }
    }
}

export async function deletePost(id: string) {
    try {
        await prisma.post.delete({ where: { id } })
        return { success: true }
    } catch (error) {
        console.error('Error deleting post:', error)
        return { success: false, error: 'Failed to delete post' }
    }
}

// ============ Settings Actions ============
export async function updateSettings(
    phone?: string,
    email?: string,
    address?: string,
    googleMapsUrl?: string,
    appointmentPhone?: string,
) {
    try {
        let settings = await prisma.siteSettings.findFirst()
        
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    phone,
                    email,
                    address,
                    googleMapsUrl,
                    appointmentPhone,
                },
            })
        } else {
            settings = await prisma.siteSettings.update({
                where: { id: settings.id },
                data: {
                    phone,
                    email,
                    address,
                    googleMapsUrl,
                    appointmentPhone,
                },
            })
        }
        return { success: true, data: settings }
    } catch (error) {
        console.error('Error updating settings:', error)
        return { success: false, error: 'Failed to update settings' }
    }
}

export async function getSettings() {
    try {
        const settings = await prisma.siteSettings.findFirst()
        return { success: true, data: settings }
    } catch (error) {
        console.error('Error fetching settings:', error)
        return { success: false, error: 'Failed to fetch settings' }
    }
}

// ============ User/Auth Actions ============
export async function verifyAdminLogin(email: string, password: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return { success: false, error: 'User not found' }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return { success: false, error: 'Invalid password' }
        }

        return { success: true, data: user }
    } catch (error) {
        console.error('Error verifying login:', error)
        return { success: false, error: 'Login failed' }
    }
}
