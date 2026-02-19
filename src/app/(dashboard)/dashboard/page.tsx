import { DashboardMetrics } from "@/components/dashboard/metrics";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { FunnelChart } from "@/components/dashboard/funnel-chart";
import { TopSellers } from "@/components/dashboard/top-sellers";
import { RecentDeals } from "@/components/dashboard/recent-deals";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Visão geral do seu pipeline de vendas
                </p>
            </div>

            {/* KPI Cards */}
            <DashboardMetrics />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <FunnelChart />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentDeals />
                </div>
                <TopSellers />
            </div>
        </div>
    );
}
