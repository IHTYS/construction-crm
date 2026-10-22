"use client";

import { register } from "@/app/actions/auth";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await register(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form action={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Регистрация</h1>
        {error && <div className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <input name="full_name" type="text" placeholder="ФИО" required className="w-full rounded border p-2" />
        <input name="email" type="email" placeholder="Email" required className="w-full rounded border p-2" />
        <input name="password" type="password" placeholder="Пароль (мин. 6 символов)" required minLength={6} className="w-full rounded border p-2" />
        <button type="submit" disabled={loading} className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50">
          {loading ? "Создание..." : "Зарегистрироваться"}
        </button>
        <p className="text-center text-sm text-gray-500">
          Уже есть аккаунт? <Link href="/login" className="text-blue-600 hover:underline">Войти</Link>
        </p>
      </form>
    </div>
  );
}