import axios from "axios";

const EVOLUTION_URL = process.env.NEXT_PUBLIC_EVOLUTION_API_URL!;
const API_KEY = process.env.EVOLUTION_API_KEY!;

const evoApi = axios.create({
    baseURL: EVOLUTION_URL,
    headers: {
        apikey: API_KEY,
        "Content-Type": "application/json",
    },
});

// === INSTANCE ===
export async function createInstance(instanceName: string) {
    const { data } = await evoApi.post("/instance/create", {
        instanceName,
        qrcode: true,
        integration: "WHATSAPP-BAILEYS",
    });
    return data;
}

export async function getInstanceStatus(instanceName: string) {
    const { data } = await evoApi.get(`/instance/connectionState/${instanceName}`);
    return data;
}

export async function getQrCode(instanceName: string) {
    const { data } = await evoApi.get(`/instance/connect/${instanceName}`);
    return data;
}

export async function deleteInstance(instanceName: string) {
    const { data } = await evoApi.delete(`/instance/delete/${instanceName}`);
    return data;
}

export async function listInstances() {
    const { data } = await evoApi.get("/instance/fetchInstances");
    return data;
}

// === MESSAGES ===
export async function sendTextMessage(instanceName: string, to: string, text: string) {
    const { data } = await evoApi.post(`/message/sendText/${instanceName}`, {
        number: to,
        text,
    });
    return data;
}

export async function sendMediaMessage(
    instanceName: string,
    to: string,
    mediaUrl: string,
    caption?: string,
    mediatype: "image" | "video" | "document" | "audio" = "image"
) {
    const { data } = await evoApi.post(`/message/sendMedia/${instanceName}`, {
        number: to,
        mediatype,
        media: mediaUrl,
        caption,
    });
    return data;
}

// === WEBHOOK ===
export async function setWebhook(instanceName: string, webhookUrl: string) {
    const { data } = await evoApi.post(`/webhook/set/${instanceName}`, {
        webhook: {
            enabled: true,
            url: webhookUrl,
            webhookByEvents: false,
            webhookBase64: false,
            events: [
                "MESSAGES_UPSERT",
                "MESSAGES_UPDATE",
                "CONNECTION_UPDATE",
                "QRCODE_UPDATED",
            ],
        },
    });
    return data;
}
