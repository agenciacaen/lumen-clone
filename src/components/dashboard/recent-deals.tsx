"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatRelativeDate } from "@/lib/utils";

const deals = [
    { title: "Implementação CRM Enterprise", contact: "Tech Solutions Ltda", value: 45000, stage: "Proposta", status: "active", date: new Date(Date.now() - 86400000 * 2) },
    { title: "Consultoria Marketing Digital", contact: "Agência Criativa", value: 18000, stage: "Negociação", status: "active", date: new Date(Date.now() - 86400000 * 3) },
    { title: "Licença Software Anual", contact: "Comércio Global SA", value: 32000, stage: "Fechado", status: "won", date: new Date(Date.now() - 86400000) },
    { title: "Treinamento Equipe Vendas", contact: "RH Experts Ltda", value: 9500, stage: "Qualificação", status: "active", date: new Date(Date.now() - 86400000 * 5) },
    { title: "Suporte Técnico Premium", contact: "Fábrica do Norte", value: 7200, stage: "Perdido", status: "lost", date: new Date(Date.now() - 86400000 * 1) },
];

const statusMap: Record<string, "default" | "success" | "destructive" | "secondary"> = {
    active: "secondary",
    won: "success",
    lost: "destructive",
};

const statusLabel: Record<string, string> = {
    active: "Ativo",
    won: "Ganho",
    lost: "Perdido",
};

export function RecentDeals() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Deals Recentes</CardTitle>
                <p className="text-xs text-muted-foreground">Últimas movimentações</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-0">
                    {deals.map((deal, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 -mx-2 px-2 rounded-md cursor-pointer transition-colors"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{deal.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{deal.contact}</p>
                            </div>
                            <div className="hidden md:block text-xs text-muted-foreground">
                                {deal.stage}
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold">{formatCurrency(deal.value)}</p>
                                <p className="text-xs text-muted-foreground">{formatRelativeDate(deal.date)}</p>
                            </div>
                            <Badge variant={statusMap[deal.status]} className="shrink-0">
                                {statusLabel[deal.status]}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
