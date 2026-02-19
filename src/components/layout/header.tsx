"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-6 gap-4 shrink-0">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar contatos, deals..."
                    className="pl-9 bg-muted border-0 focus-visible:ring-1"
                />
            </div>

            <div className="flex items-center gap-3 ml-auto">
                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                </Button>

                {/* User */}
                <UserButton afterSignOutUrl="/sign-in" />
            </div>
        </header>
    );
}
