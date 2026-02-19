"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Send,
    Image,
    Mic,
    Phone,
    MoreVertical,
    Search,
    Plus,
    CheckCheck,
    Clock,
} from "lucide-react";
import { cn, formatRelativeDate, getInitials } from "@/lib/utils";

type Contact = {
    id: string;
    name: string;
    phone: string;
    lastMessage: string;
    lastMessageTime: Date;
    unread: number;
    online: boolean;
};

type Message = {
    id: string;
    content: string;
    direction: "inbound" | "outbound";
    time: Date;
    status: "sent" | "delivered" | "read";
};

const MOCK_CONTACTS: Contact[] = [
    { id: "c1", name: "João Silva", phone: "5511999990001", lastMessage: "Oi, tudo bem?", lastMessageTime: new Date(Date.now() - 60000 * 5), unread: 2, online: true },
    { id: "c2", name: "Maria Santos", phone: "5511999990002", lastMessage: "Aguardando proposta", lastMessageTime: new Date(Date.now() - 3600000), unread: 0, online: false },
    { id: "c3", name: "Pedro Alves", phone: "5511999990003", lastMessage: "Vou verificar com a equipe", lastMessageTime: new Date(Date.now() - 7200000 * 2), unread: 1, online: true },
];

const MOCK_MESSAGES: Message[] = [
    { id: "m1", content: "Olá! Vi que vocês trabalham com CRM. Tenho interesse.", direction: "inbound", time: new Date(Date.now() - 3600000), status: "read" },
    { id: "m2", content: "Oi João! Sim, trabalhamos. O que você precisa exatamente?", direction: "outbound", time: new Date(Date.now() - 3500000), status: "read" },
    { id: "m3", content: "Preciso de um sistema para gerenciar minha equipe de vendas, umas 10 pessoas.", direction: "inbound", time: new Date(Date.now() - 3400000), status: "read" },
    { id: "m4", content: "Perfeito! Temos o plano Pro que atende exatamente isso. Posso te enviar um material?", direction: "outbound", time: new Date(Date.now() - 3300000), status: "read" },
    { id: "m5", content: "Sim, por favor! Qual o valor?", direction: "inbound", time: new Date(Date.now() - 300000), status: "read" },
];

const colors = ["bg-purple-500", "bg-blue-500", "bg-green-500", "bg-orange-500", "bg-pink-500"];

export function WhatsAppChat() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(MOCK_CONTACTS[0]);
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [newMessage, setNewMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredContacts = MOCK_CONTACTS.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const msg: Message = {
            id: `m${Date.now()}`,
            content: newMessage,
            direction: "outbound",
            time: new Date(),
            status: "sent",
        };
        setMessages((prev) => [...prev, msg]);
        setNewMessage("");
    };

    return (
        <div className="h-full flex gap-0 rounded-xl overflow-hidden border border-border">
            {/* Contacts sidebar */}
            <div className="w-80 flex flex-col border-r border-border bg-card shrink-0">
                <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold">Conversas</h2>
                        <Button size="icon" variant="ghost" className="w-8 h-8">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar..."
                            className="pl-8 h-9 text-sm"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredContacts.map((contact, i) => (
                        <div
                            key={contact.id}
                            onClick={() => setSelectedContact(contact)}
                            className={cn(
                                "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/60 transition-colors border-b border-border/50",
                                selectedContact?.id === contact.id && "bg-primary/10"
                            )}
                        >
                            <div className="relative">
                                <div className={`w-10 h-10 rounded-full ${colors[i % colors.length]} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                                    {getInitials(contact.name)}
                                </div>
                                {contact.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium truncate">{contact.name}</span>
                                    <span className="text-xs text-muted-foreground shrink-0 ml-1">
                                        {formatRelativeDate(contact.lastMessageTime)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-0.5">
                                    <span className="text-xs text-muted-foreground truncate">{contact.lastMessage}</span>
                                    {contact.unread > 0 && (
                                        <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                                            {contact.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat area */}
            {selectedContact ? (
                <div className="flex-1 flex flex-col bg-background">
                    {/* Chat Header */}
                    <div className="h-16 flex items-center gap-3 px-4 border-b border-border bg-card">
                        <div className={`w-10 h-10 rounded-full ${colors[0]} flex items-center justify-center text-white text-sm font-bold`}>
                            {getInitials(selectedContact.name)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold">{selectedContact.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {selectedContact.online ? (
                                    <span className="text-green-400">● online</span>
                                ) : (
                                    "offline"
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
                                <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex",
                                    msg.direction === "outbound" ? "justify-end" : "justify-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                                        msg.direction === "outbound"
                                            ? "bg-primary text-primary-foreground rounded-br-sm"
                                            : "bg-card border border-border rounded-bl-sm"
                                    )}
                                >
                                    <p>{msg.content}</p>
                                    <div className={cn("flex items-center gap-1 mt-1 justify-end", msg.direction === "inbound" && "justify-start")}>
                                        <span className={cn("text-xs", msg.direction === "outbound" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                                            {msg.time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                        {msg.direction === "outbound" && (
                                            <CheckCheck className="w-3 h-3 text-primary-foreground/70" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-border bg-card">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0">
                                <Image className="w-4 h-4" />
                            </Button>
                            <Input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Digite uma mensagem..."
                                className="flex-1"
                            />
                            <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0">
                                <Mic className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={sendMessage}
                                size="icon"
                                disabled={!newMessage.trim()}
                                className="shrink-0"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Selecione uma conversa
                </div>
            )}
        </div>
    );
}
