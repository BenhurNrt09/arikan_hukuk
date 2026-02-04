'use server'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2, R2_BUCKET_NAME } from './r2'
import { randomUUID } from 'crypto'

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
        // Assuming a custom domain or standard R2 dev domain is setup.
        // Ideally this should be an environment variable R2_PUBLIC_DOMAIN
        const publicUrl = `${process.env.R2_PUBLIC_DOMAIN}/${fileKey}`

        return { success: true, url: signedUrl, publicUrl, fileKey }
    } catch (error) {
        console.error('Error generating presigned URL:', error)
        return { success: false, error: 'Failed to generate upload URL' }
    }
}
