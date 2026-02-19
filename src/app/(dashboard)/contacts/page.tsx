"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Search,
    Plus,
    Phone,
    MessageSquare,
    Mail,
    Building2,
    Filter,
} from "lucide-react";
import { getInitials, formatDate } from "@/lib/utils";

const MOCK_CONTACTS = [
    { id: "1", name: "João Silva", email: "joao@techco.com", phone: "+55 11 9999-0001", company: "Tech Solutions", source: "whatsapp", tags: ["lead", "enterprise"], createdAt: new Date(Date.now() - 86400000 * 10) },
    { id: "2", name: "Maria Santos", email: "maria@mkt.com", phone: "+55 11 9999-0002", company: "Marketing Pro", source: "website", tags: ["prospect"], createdAt: new Date(Date.now() - 86400000 * 5) },
    { id: "3", name: "Pedro Alves", email: "pedro@alves.com", phone: "+55 11 9999-0003", company: "Construtora Norte", source: "import", tags: ["cliente"], createdAt: new Date(Date.now() - 86400000 * 2) },
    { id: "4", name: "Ana Costa", email: "ana@costaind.com", phone: "+55 11 9999-0004", company: "Costa Ind.", source: "whatsapp", tags: ["lead"], createdAt: new Date(Date.now() - 86400000 * 1) },
    { id: "5", name: "Carlos Ferreira", email: "carlos@ferr.com", phone: "+55 11 9999-0005", company: "Ferreira & Cia", source: "manual", tags: ["prospect", "vip"], createdAt: new Date() },
];

const colors = ["bg-purple-500", "bg-blue-500", "bg-green-500", "bg-orange-500", "bg-pink-500"];

const sourceLabel: Record<string, string> = {
    whatsapp: "WhatsApp",
    website: "Website",
    import: "Importação",
    manual: "Manual",
};

export default function ContactsPage() {
    const [search, setSearch] = useState("");

    const filtered = MOCK_CONTACTS.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Contatos</h1>
                    <p className="text-sm text-muted-foreground mt-1">{MOCK_CONTACTS.length} contatos cadastrados</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Novo Contato
                    </Button>
                </div>
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar contatos..."
                    className="pl-9"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((contact, i) => (
                    <Card key={contact.id} className="hover:border-primary/40 transition-colors cursor-pointer group">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-full ${colors[i % colors.length]} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                                    {getInitials(contact.name)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm">{contact.name}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                        <Building2 className="w-3 h-3" />
                                        <span className="truncate">{contact.company}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                                {contact.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3 h-3 shrink-0" />
                                        <span className="truncate">{contact.email}</span>
                                    </div>
                                )}
                                {contact.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3 h-3 shrink-0" />
                                        <span>{contact.phone}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-1 flex-wrap">
                                    {contact.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs h-5">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="w-7 h-7">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="w-7 h-7">
                                        <Phone className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                    {sourceLabel[contact.source]}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{formatDate(contact.createdAt)}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
