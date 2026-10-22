import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ error: "Telegram credentials not set" }, { status: 500 });
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}