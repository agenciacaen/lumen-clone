import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// Fallback URL para evitar que o Build quebre na Cloudflare se a variável de ambiente não for detectada
const dbUrl = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/placeholder?schema=public";

const prisma = globalThis.prisma ?? new PrismaClient({
    datasources: {
        db: {
            url: dbUrl,
        },
    },
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
