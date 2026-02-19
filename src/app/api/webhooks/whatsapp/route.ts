import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

export const runtime = 'edge';

export async function POST(req: Request) {
    return NextResponse.json({ ok: true, status: "Prisma Disabled for Debug" });
    /*
    try {
        const body = await req.json();
        const { event, instance, data } = body;
        // ... (commented out logic)
        return NextResponse.json({ ok: true, event });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
    */
}
