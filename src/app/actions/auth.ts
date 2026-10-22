"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
});

export async function login(formData: FormData) {
  const supabase = await createClient();
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: error.message };

  redirect("/");
}

export async function register(formData: FormData) {
  const supabase = await createClient();
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.auth.signUp({
    ...parsed.data,
    options: {
      data: {
        full_name: formData.get("full_name"),
        role: "client", // роль по умолчанию
      },
    },
  });
  if (error) return { error: error.message };

  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}