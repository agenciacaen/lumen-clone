"use client";

import { TrendingUp, TrendingDown, DollarSign, Target, Activity, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";

const metrics = [
    {
        label: "Receita Ganha",
        value: 248000,
        change: +18.2,
        isCurrency: true,
        icon: DollarSign,
        color: "text-green-400",
        bg: "bg-green-500/10",
    },
    {
        label: "Receita Perdida",
        value: 42000,
        change: -5.1,
        isCurrency: true,
        icon: TrendingDown,
        color: "text-red-400",
        bg: "bg-red-500/10",
    },
    {
        label: "Taxa de Conversão",
        value: "34.8%",
        change: +2.4,
        isCurrency: false,
        icon: Target,
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        label: "Pipeline Ativo",
        value: 1240000,
        change: +9.7,
        isCurrency: true,
        icon: Activity,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
    },
    {
        label: "Ticket Médio",
        value: 18500,
        change: +4.2,
        isCurrency: true,
        icon: TrendingUp,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
    },
    {
        label: "Novos Contatos",
        value: 134,
        change: +22.1,
        isCurrency: false,
        icon: Users,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
    },
];

export function DashboardMetrics() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((m) => {
                const Icon = m.icon;
                const isPositive = m.change >= 0;
                return (
                    <Card key={m.label} className="hover:border-primary/40 transition-colors">
                        <CardContent className="p-4 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
                                <div className={cn("p-1.5 rounded-md", m.bg)}>
                                    <Icon className={cn("w-3.5 h-3.5", m.color)} />
                                </div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-foreground">
                                    {m.isCurrency && typeof m.value === "number"
                                        ? formatCurrency(m.value)
                                        : m.value}
                                </div>
                                <div className={cn("flex items-center gap-1 mt-1 text-xs", isPositive ? "text-green-400" : "text-red-400")}>
                                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {isPositive ? "+" : ""}{m.change}% mês
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
