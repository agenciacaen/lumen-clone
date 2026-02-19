"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    KanbanSquare,
    Users,
    MessageSquare,
    Bot,
    Calendar,
    Megaphone,
    Settings,
    Zap,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Pipeline", href: "/kanban", icon: KanbanSquare },
    { label: "Contatos", href: "/contacts", icon: Users },
    { label: "WhatsApp", href: "/whatsapp", icon: MessageSquare },
    { label: "Agentes IA", href: "/agents", icon: Bot },
    { label: "Calendário", href: "/calendar", icon: Calendar },
    { label: "Campanhas", href: "/campaigns", icon: Megaphone },
    { label: "Configurações", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex flex-col border-r border-border bg-[hsl(var(--sidebar-bg))] shrink-0">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-lg text-foreground">LumenCRM</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1">{item.label}</span>
                            {isActive && <ChevronRight className="w-3 h-3 opacity-60" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Brand */}
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2 px-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Sistema online</span>
                </div>
            </div>
        </aside>
    );
}
