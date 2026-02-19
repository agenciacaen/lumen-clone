import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// const prisma = globalThis.prisma ?? new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

const prisma = new PrismaClient(); // Simplest init to see if just the import hurts? 
// No, let's mock it to avoid ANY heavy import usage if possible, but typing prevents simple mock.
// Let's just keep the import but NOT use it in the app mostly.
// Actually, to test providing a smaller bundle, we should avoid the heavy instantiation if that's the trigger.

// For this test, I will export a casted object to satisfy TS but avoid the actual heavy lifting if that helps, 
// OR simpler: Just don't instantiate it.

const prisma = {} as PrismaClient;

export default prisma;
