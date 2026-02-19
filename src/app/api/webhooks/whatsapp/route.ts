import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { event, instance, data } = body;

        // Handle connection state updates
        if (event === "connection.update") {
            const { state, qrcode } = data ?? {};
            await prisma.whatsappInstance.updateMany({
                where: { instanceName: instance },
                data: {
                    status: state === "open" ? "connected" : state === "close" ? "disconnected" : "connecting",
                    qrCode: qrcode?.base64 ?? null,
                    phoneNumber: data?.wid?.user ? `+${data.wid.user}` : undefined,
                    updatedAt: new Date(),
                },
            });
            return NextResponse.json({ ok: true });
        }

        // Handle incoming messages
        if (event === "messages.upsert") {
            const messages = data?.messages ?? [];
            for (const msg of messages) {
                if (msg.key?.fromMe) continue; // skip outbound

                const phone = msg.key?.remoteJid?.replace("@s.whatsapp.net", "");
                if (!phone) continue;

                // Find or create contact
                const wppInst = await prisma.whatsappInstance.findFirst({
                    where: { instanceName: instance },
                });
                if (!wppInst) continue;

                let contact = await prisma.contact.findFirst({
                    where: { whatsapp: phone, tenantId: wppInst.tenantId },
                });

                if (!contact) {
                    contact = await prisma.contact.create({
                        data: {
                            name: msg.pushName ?? phone,
                            whatsapp: phone,
                            phone,
                            source: "whatsapp",
                            tenantId: wppInst.tenantId,
                        },
                    });
                }

                // Get message content
                const content =
                    msg.message?.conversation ||
                    msg.message?.extendedTextMessage?.text ||
                    "[mídia]";

                // Save message
                await prisma.message.create({
                    data: {
                        externalId: msg.key?.id,
                        content,
                        type: msg.message?.imageMessage ? "image" : msg.message?.audioMessage ? "audio" : "text",
                        direction: "inbound",
                        status: "delivered",
                        wppInstance: instance,
                        contactId: contact.id,
                        tenantId: wppInst.tenantId,
                    },
                });
            }
            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ ok: true, event });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
