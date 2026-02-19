"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Deal } from "./kanban-board";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { GripVertical, Clock, AlertCircle } from "lucide-react";

interface Props {
    deal: Deal;
    isDragging?: boolean;
}

const priorityColors = {
    low: "bg-slate-500/20 text-slate-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    high: "bg-red-500/20 text-red-400",
};

const priorityLabel = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
};

export function KanbanCard({ deal, isDragging }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } =
        useSortable({ id: deal.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isSortableDragging ? 0.4 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing group hover:border-primary/40 hover:shadow-md transition-all",
                isDragging && "shadow-2xl rotate-1 opacity-90 border-primary"
            )}
        >
            {/* Header */}
            <div className="flex items-start gap-2 mb-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="mt-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                    <GripVertical className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight line-clamp-2">{deal.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{deal.contact}</p>
                </div>
            </div>

            {/* Value */}
            <div className="text-base font-bold text-primary mb-2">
                {formatCurrency(deal.value)}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex gap-1 flex-wrap">
                    {deal.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {deal.daysInStage > 7 && (
                        <div className="flex items-center gap-1 text-orange-400 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {deal.daysInStage}d
                        </div>
                    )}
                    {deal.daysInStage <= 7 && (
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Clock className="w-3 h-3" />
                            {deal.daysInStage}d
                        </div>
                    )}
                    <span className={cn("text-xs rounded-full px-2 py-0.5 font-medium", priorityColors[deal.priority])}>
                        {priorityLabel[deal.priority]}
                    </span>
                </div>
            </div>
        </div>
    );
}
