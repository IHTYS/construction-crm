"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { createClient } from "@/utils/supabase/client";

const STAGES = [
  { id: "lead", title: "Лид" },
  { id: "qualified", title: "Квалифицирован" },
  { id: "proposal", title: "Предложение" },
  { id: "won", title: "Выиграно" },
  { id: "lost", title: "Проиграно" },
];

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    supabase.from("deals").select("*").then(({ data }) => setDeals(data || []));
  }, []);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const newStage = destination.droppableId;

    setDeals((prev) =>
      prev.map((deal) => (deal.id === draggableId ? { ...deal, stage: newStage } : deal))
    );

    await supabase.from("deals").update({ stage: newStage }).eq("id", draggableId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Воронка продаж</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-5 gap-4">
          {STAGES.map((stage) => (
            <Droppable droppableId={stage.id} key={stage.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-3 rounded min-h-[200px]">
                  <h3 className="font-semibold mb-2">{stage.title}</h3>
                  {deals.filter((d) => d.stage === stage.id).map((deal, index) => (
                    <Draggable key={deal.id} draggableId={deal.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white p-3 rounded shadow mb-2">
                          <p className="font-medium">{deal.title}</p>
                          <p className="text-sm text-gray-500">{deal.amount?.toLocaleString()} ₽</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}