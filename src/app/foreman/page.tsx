"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ForemanPage() {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fileUrls: string[] = [];
    if (files) {
      for (const file of Array.from(files)) {
        const filePath = `${user.id}/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("foreman-files").upload(filePath, file);
        if (!error) {
          const { data: { publicUrl } } = supabase.storage.from("foreman-files").getPublicUrl(filePath);
          fileUrls.push(publicUrl);
        }
      }
    }

    await supabase.from("foreman_requests").insert({
      author_id: user.id,
      project_id: "00000000-0000-0000-0000-000000000000", // замените на реальный ID проекта
      description,
      file_urls: fileUrls,
    });

    setDescription("");
    setFiles(null);
    setLoading(false);
    alert("Заявка отправлена!");
  };

  return (
    <div className="container mx-auto max-w-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Заявка прораба</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Что нужно?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="w-full rounded border p-2"
        />
        <input
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={(e) => setFiles(e.target.files)}
          className="w-full"
        />
        <button type="submit" disabled={loading} className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50">
          {loading ? "Отправка..." : "Отправить заявку"}
        </button>
      </form>
    </div>
  );
}