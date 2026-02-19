"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "./kanban-card";
import { type Stage } from "./kanban-board";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";

interface Props {
    stage: Stage;
}

export function KanbanColumn({ stage }: Props) {
    const { setNodeRef, isOver } = useDroppable({ id: stage.id });

    const columnTotal = stage.deals.reduce((acc, d) => acc + d.value, 0);

    return (
        <div className="flex flex-col w-72 shrink-0">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                    <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: stage.color }}
                    />
                    <span className="font-semibold text-sm">{stage.name}</span>
                    <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                        {stage.deals.length}
                    </span>
                </div>
                <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Column total */}
            <div className="text-xs text-muted-foreground px-1 mb-2">
                {formatCurrency(columnTotal)}
            </div>

            {/* Drop zone */}
            <div
                ref={setNodeRef}
                className={`flex-1 flex flex-col gap-2 p-2 rounded-xl min-h-[400px] transition-colors ${isOver ? "bg-primary/5 border-2 border-primary/20 border-dashed" : "bg-muted/30"
                    }`}
            >
                <SortableContext
                    items={stage.deals.map((d) => d.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {stage.deals.map((deal) => (
                        <KanbanCard key={deal.id} deal={deal} />
                    ))}
                </SortableContext>

                {stage.deals.length === 0 && (
                    <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground text-center py-8">
                        Arraste deals aqui
                    </div>
                )}
            </div>
        </div>
    );
}
