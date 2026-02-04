import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    console.log('DEBUG: process.env.DATABASE_URL =', process.env.DATABASE_URL)
    return new PrismaClient({
      adapter: new PrismaNeon(
        new Pool({ connectionString: process.env.DATABASE_URL })
      ),
    })
  })()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
