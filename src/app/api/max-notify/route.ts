import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { chatId, text } = await request.json();
  const botToken = process.env.MAX_BOT_TOKEN;

  if (!botToken) {
    return NextResponse.json({ error: "MAX_BOT_TOKEN not set" }, { status: 500 });
  }

  // MAX Bot API (пример endpoint, уточните в документации)
  const url = `https://platform-api2.max.ru/bots/${botToken}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}