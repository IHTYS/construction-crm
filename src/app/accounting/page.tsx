import { createClient } from "@/utils/supabase/server";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  partially_paid: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
};

export default async function AccountingPage() {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*, projects(name)")
    .order("date", { ascending: false });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Бухгалтерия</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Номер</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Поставщик</TableHead>
            <TableHead>Сумма</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Срок оплаты</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map((inv) => (
            <TableRow key={inv.id} className={inv.status === "overdue" ? "bg-red-50" : ""}>
              <TableCell>{inv.number}</TableCell>
              <TableCell>{new Date(inv.date).toLocaleDateString("ru-RU")}</TableCell>
              <TableCell>{inv.supplier}</TableCell>
              <TableCell>{inv.amount?.toLocaleString()} ₽</TableCell>
              <TableCell>
                <Badge className={statusColors[inv.status]}>{inv.status}</Badge>
              </TableCell>
              <TableCell>{inv.due_date ? new Date(inv.due_date).toLocaleDateString("ru-RU") : "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}