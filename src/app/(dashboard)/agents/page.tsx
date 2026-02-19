"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Plus, Settings, Zap, Power, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_AGENTS = [
    {
        id: "a1",
        name: "Agente Comercial",
        description: "Responde automaticamente leads e qualifica prospects via WhatsApp",
        isActive: true,
        personality: "professional",
        wppInstance: "Principal",
        triggersCount: 8,
        messagesHandled: 234,
    },
    {
        id: "a2",
        name: "Suporte Técnico",
        description: "Atende dúvidas técnicas e cria tickets automaticamente",
        isActive: false,
        personality: "friendly",
        wppInstance: "Suporte",
        triggersCount: 5,
        messagesHandled: 89,
    },
];

export default function AgentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Agentes de IA</h1>
                    <p className="text-sm text-muted-foreground mt-1">Automação inteligente 24/7</p>
                </div>
                <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Agente
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_AGENTS.map((agent) => (
                    <Card key={agent.id} className={cn("hover:border-primary/40 transition-colors", agent.isActive && "border-primary/20")}>
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", agent.isActive ? "bg-primary/20" : "bg-muted")}>
                                        <Bot className={cn("w-5 h-5", agent.isActive ? "text-primary" : "text-muted-foreground")} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">{agent.name}</CardTitle>
                                        <div className="mt-1">
                                            <Badge variant={agent.isActive ? "success" : "secondary"} className="gap-1 text-xs">
                                                <Power className="w-2.5 h-2.5" />
                                                {agent.isActive ? "Ativo" : "Inativo"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                <div className="flex items-center gap-1">
                                    <Zap className="w-3 h-3 text-yellow-400" />
                                    {agent.triggersCount} triggers
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3 text-blue-400" />
                                    {agent.messagesHandled} mensagens tratadas
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                    📱 {agent.wppInstance}
                                </Badge>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="h-7 text-xs">
                                        Editar Regras
                                    </Button>
                                    <Button size="sm" className={cn("h-7 text-xs", agent.isActive ? "bg-destructive hover:bg-destructive/90" : "")}>
                                        {agent.isActive ? "Pausar" : "Ativar"}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Empty state card */}
                <Card className="border-dashed flex items-center justify-center min-h-[200px] hover:border-primary/40 cursor-pointer transition-colors">
                    <div className="text-center">
                        <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Plus className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Criar novo agente</p>
                        <p className="text-xs text-muted-foreground mt-1">Configure regras e personalidade</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
