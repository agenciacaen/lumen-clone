"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stages = [
    { name: "Prospecção", count: 89, value: 890000, color: "bg-blue-500" },
    { name: "Qualificação", count: 54, value: 680000, color: "bg-purple-500" },
    { name: "Proposta", count: 32, value: 480000, color: "bg-yellow-500" },
    { name: "Negociação", count: 18, value: 320000, color: "bg-orange-500" },
    { name: "Fechamento", count: 12, value: 248000, color: "bg-green-500" },
];

const maxCount = Math.max(...stages.map((s) => s.count));

export function FunnelChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Funil de Vendas</CardTitle>
                <p className="text-xs text-muted-foreground">Deals por estágio</p>
            </CardHeader>
            <CardContent className="space-y-3">
                {stages.map((stage, i) => {
                    const width = (stage.count / maxCount) * 100;
                    return (
                        <div key={stage.name} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground font-medium">{stage.name}</span>
                                <span className="font-semibold text-foreground">{stage.count}</span>
                            </div>
                            <div className="h-6 bg-muted rounded-md overflow-hidden">
                                <div
                                    className={cn("h-full rounded-md transition-all duration-700 flex items-center justify-end pr-2", stage.color)}
                                    style={{ width: `${width}%` }}
                                >
                                    {width > 20 && (
                                        <span className="text-xs text-white font-medium">
                                            {((stage.count / stages[0].count) * 100).toFixed(0)}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
