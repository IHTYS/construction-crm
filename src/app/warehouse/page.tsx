import { createClient } from "@/utils/supabase/server";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Этот код предполагает, что у вас есть таблица 'inventory' (остатки на складе)
export default async function WarehousePage() {
  const supabase = await createClient();
  const { data: inventory } = await supabase.from("inventory").select("*");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Склад</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Наименование</TableHead>
            <TableHead>Ед. изм.</TableHead>
            <TableHead>Кол-во</TableHead>
            <TableHead>Цена</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price?.toLocaleString()} ₽</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}