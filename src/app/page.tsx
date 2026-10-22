import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*, clients(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Проекты</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Клиент: {project.clients?.name}</p>
              <p className="text-sm text-gray-600">Бюджет: {project.budget_planned?.toLocaleString()} ₽</p>
              <p className="text-sm text-gray-600">Статус: {project.status}</p>
              <Link href={`/projects/${project.id}`} className="text-blue-600 mt-2 inline-block">
                Подробнее →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}