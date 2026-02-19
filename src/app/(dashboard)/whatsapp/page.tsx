import { WhatsAppChat } from "@/components/whatsapp/whatsapp-chat";
import { WhatsAppInstances } from "@/components/whatsapp/whatsapp-instances";

export default function WhatsAppPage() {
    return (
        <div className="h-full flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold">WhatsApp</h1>
                <p className="text-sm text-muted-foreground mt-1">Gerencie suas conversas e instâncias</p>
            </div>
            <WhatsAppInstances />
            <div className="flex-1 min-h-0">
                <WhatsAppChat />
            </div>
        </div>
    );
}
