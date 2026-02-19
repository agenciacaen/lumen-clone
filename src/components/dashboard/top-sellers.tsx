"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials, formatCurrency } from "@/lib/utils";

const sellers = [
    { name: "Ana Silva", deals: 24, revenue: 89000, avatar: null },
    { name: "Carlos Mendes", deals: 18, revenue: 72000, avatar: null },
    { name: "Juliana Costa", deals: 15, revenue: 61000, avatar: null },
    { name: "Roberto Alves", deals: 12, revenue: 48000, avatar: null },
    { name: "Fernanda Lima", deals: 9, revenue: 38000, avatar: null },
];

const colors = ["bg-purple-500", "bg-blue-500", "bg-green-500", "bg-orange-500", "bg-pink-500"];

export function TopSellers() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Top Vendedores</CardTitle>
                <p className="text-xs text-muted-foreground">Este mês</p>
            </CardHeader>
            <CardContent className="space-y-3">
                {sellers.map((seller, i) => (
                    <div key={seller.name} className="flex items-center gap-3">
                        <div className="relative">
                            <div className={`w-8 h-8 rounded-full ${colors[i]} flex items-center justify-center text-white text-xs font-bold`}>
                                {getInitials(seller.name)}
                            </div>
                            {i === 0 && (
                                <span className="absolute -top-1 -right-1 text-xs">🏆</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{seller.name}</p>
                            <p className="text-xs text-muted-foreground">{seller.deals} deals</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold text-green-400">
                                {formatCurrency(seller.revenue)}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
