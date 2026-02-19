"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Smartphone, Wifi, WifiOff, QrCode, Trash2 } from "lucide-react";

type Instance = {
    id: string;
    name: string;
    status: "connected" | "disconnected" | "connecting";
    phone?: string;
};

const MOCK_INSTANCES: Instance[] = [
    { id: "i1", name: "Principal", status: "connected", phone: "+55 11 9 9999-0001" },
    { id: "i2", name: "Suporte", status: "disconnected" },
];

export function WhatsAppInstances() {
    const [instances, setInstances] = useState<Instance[]>(MOCK_INSTANCES);

    const statusConfig = {
        connected: { label: "Conectado", variant: "success" as const, Icon: Wifi },
        disconnected: { label: "Desconectado", variant: "destructive" as const, Icon: WifiOff },
        connecting: { label: "Conectando...", variant: "secondary" as const, Icon: QrCode },
    };

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {instances.map((inst) => {
                const cfg = statusConfig[inst.status];
                const StatusIcon = cfg.Icon;
                return (
                    <Card key={inst.id} className="flex-shrink-0">
                        <CardContent className="p-3 flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                                <Smartphone className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{inst.name}</p>
                                {inst.phone && <p className="text-xs text-muted-foreground">{inst.phone}</p>}
                            </div>
                            <Badge variant={cfg.variant} className="gap-1">
                                <StatusIcon className="w-3 h-3" />
                                {cfg.label}
                            </Badge>
                            {inst.status === "disconnected" && (
                                <Button size="sm" variant="outline" className="gap-1 h-7 text-xs">
                                    <QrCode className="w-3 h-3" />
                                    Conectar
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
            <Button size="sm" variant="outline" className="gap-2 h-10">
                <Plus className="w-4 h-4" />
                Nova Instância
            </Button>
        </div>
    );
}
