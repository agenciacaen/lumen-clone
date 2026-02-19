"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const data = [
    { month: "Ago", ganho: 180000, perdido: 32000 },
    { month: "Set", ganho: 210000, perdido: 28000 },
    { month: "Out", ganho: 195000, perdido: 45000 },
    { month: "Nov", ganho: 230000, perdido: 38000 },
    { month: "Dez", ganho: 310000, perdido: 22000 },
    { month: "Jan", ganho: 248000, perdido: 42000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-sm">
                <p className="font-semibold mb-2">{label}</p>
                {payload.map((entry: any) => (
                    <p key={entry.name} style={{ color: entry.color }}>
                        {entry.name === "ganho" ? "Ganho" : "Perdido"}: {formatCurrency(entry.value)}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export function RevenueChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Evolução de Receita</CardTitle>
                <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <YAxis
                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            formatter={(value) => (
                                <span className="text-xs text-muted-foreground capitalize">
                                    {value === "ganho" ? "Receita Ganha" : "Receita Perdida"}
                                </span>
                            )}
                        />
                        <Bar dataKey="ganho" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="perdido" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} opacity={0.7} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
