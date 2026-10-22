"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TransportPage() {
  const [startMileage, setStartMileage] = useState("");
  const [endMileage, setEndMileage] = useState("");
  const [total, setTotal] = useState<number | null>(null);
  const supabase = createClient();

  const handleCalculate = () => {
    const start = parseFloat(startMileage);
    const end = parseFloat(endMileage);
    if (!isNaN(start) && !isNaN(end)) {
      setTotal(end - start);
    }
  };

  const handleSave = async () => {
    if (total === null) return;
    await supabase.from("waybills").insert({
      start_mileage: parseFloat(startMileage),
      end_mileage: parseFloat(endMileage),
      total_mileage: total,
      date: new Date().toISOString(),
    });
    alert("Путевой лист сохранён!");
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Новый путевой лист</h1>
      <div className="space-y-4">
        <Input placeholder="Пробег на начало дня (км)" value={startMileage} onChange={(e) => setStartMileage(e.target.value)} />
        <Input placeholder="Пробег на конец дня (км)" value={endMileage} onChange={(e) => setEndMileage(e.target.value)} />
        <Button onClick={handleCalculate} className="w-full">Рассчитать пробег</Button>
        {total !== null && (
          <div className="p-4 bg-green-50 rounded">
            <p>Общий пробег: <strong>{total} км</strong></p>
            <Button onClick={handleSave} className="mt-2 w-full">Сохранить</Button>
          </div>
        )}
      </div>
    </div>
  );
}