"use client";

import { useState } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export type Deal = {
    id: string;
    title: string;
    contact: string;
    value: number;
    tags: string[];
    priority: "low" | "medium" | "high";
    daysInStage: number;
    stageId: string;
};

export type Stage = {
    id: string;
    name: string;
    color: string;
    deals: Deal[];
};

const INITIAL_STAGES: Stage[] = [
    {
        id: "prospeccao",
        name: "Prospecção",
        color: "#3B82F6",
        deals: [
            { id: "d1", title: "Implementação CRM", contact: "Tech Solutions", value: 45000, tags: ["enterprise"], priority: "high", daysInStage: 3, stageId: "prospeccao" },
            { id: "d2", title: "Consultoria SEO", contact: "Mídias SA", value: 12000, tags: ["marketing"], priority: "low", daysInStage: 7, stageId: "prospeccao" },
        ],
    },
    {
        id: "qualificacao",
        name: "Qualificação",
        color: "#8B5CF6",
        deals: [
            { id: "d3", title: "Licença Anual Software", contact: "Global Commerce", value: 32000, tags: ["recorrente"], priority: "medium", daysInStage: 5, stageId: "qualificacao" },
        ],
    },
    {
        id: "proposta",
        name: "Proposta",
        color: "#F59E0B",
        deals: [
            { id: "d4", title: "Treinamento Vendas", contact: "RH Experts", value: 9500, tags: ["training"], priority: "medium", daysInStage: 2, stageId: "proposta" },
            { id: "d5", title: "Suporte Premium", contact: "Fábrica Norte", value: 7200, tags: [], priority: "low", daysInStage: 12, stageId: "proposta" },
        ],
    },
    {
        id: "negociacao",
        name: "Negociação",
        color: "#F97316",
        deals: [
            { id: "d6", title: "Projeto Full Stack", contact: "StartupXYZ", value: 68000, tags: ["dev", "urgente"], priority: "high", daysInStage: 1, stageId: "negociacao" },
        ],
    },
    {
        id: "fechamento",
        name: "Fechamento",
        color: "#10B981",
        deals: [],
    },
];

export function KanbanBoard() {
    const [stages, setStages] = useState<Stage[]>(INITIAL_STAGES);
    const [activeCard, setActiveCard] = useState<Deal | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    function findStageByDealId(dealId: string) {
        return stages.find((s) => s.deals.some((d) => d.id === dealId));
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const stage = findStageByDealId(active.id as string);
        const deal = stage?.deals.find((d) => d.id === active.id);
        if (deal) setActiveCard(deal);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeStage = findStageByDealId(activeId);
        const overStage =
            stages.find((s) => s.id === overId) || findStageByDealId(overId);

        if (!activeStage || !overStage || activeStage.id === overStage.id) return;

        setStages((prev) => {
            const activeDeal = activeStage.deals.find((d) => d.id === activeId)!;
            return prev.map((s) => {
                if (s.id === activeStage.id) {
                    return { ...s, deals: s.deals.filter((d) => d.id !== activeId) };
                }
                if (s.id === overStage.id) {
                    return {
                        ...s,
                        deals: [...s.deals, { ...activeDeal, stageId: overStage.id }],
                    };
                }
                return s;
            });
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        setActiveCard(null);
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const stage = findStageByDealId(activeId);
        if (!stage) return;

        const oldIndex = stage.deals.findIndex((d) => d.id === activeId);
        const newIndex = stage.deals.findIndex((d) => d.id === overId);

        if (oldIndex !== newIndex) {
            setStages((prev) =>
                prev.map((s) => {
                    if (s.id !== stage.id) return s;
                    return { ...s, deals: arrayMove(s.deals, oldIndex, newIndex) };
                })
            );
        }
    }

    const totalValue = stages.flatMap((s) => s.deals).reduce((acc, d) => acc + d.value, 0);

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Pipeline de Vendas</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {stages.flatMap((s) => s.deals).length} deals · Pipeline:{" "}
                        <span className="text-primary font-semibold">
                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalValue)}
                        </span>
                    </p>
                </div>
                <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Deal
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 overflow-x-auto pb-4 h-full">
                    <SortableContext items={stages.map((s) => s.id)} strategy={horizontalListSortingStrategy}>
                        {stages.map((stage) => (
                            <KanbanColumn key={stage.id} stage={stage} />
                        ))}
                    </SortableContext>
                </div>

                <DragOverlay>
                    {activeCard ? <KanbanCard deal={activeCard} isDragging /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
