import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey?.trim()) {
      return NextResponse.json({
        reply: "AI chatbot is not configured. Please add GROQ_API_KEY to .env.local and restart the server.",
      });
    }

    const { message, history = [] } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ reply: "Please type a message." });
    }

    const groq = new Groq({ apiKey: apiKey.trim() });

    const messages = [
      {
        role: "system" as const,
        content: `You are CareerMitra AI, a helpful career counselor for Indian students after 10th and 12th grade. 
Help them with career choices, skill development, exam preparation, and job opportunities. 
Be concise, encouraging, and practical. Respond in the same language the user writes in.`,
      },
      ...history.slice(-6).map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    return NextResponse.json({ reply });

  } catch (err: any) {
    console.error("[Chat API] Groq error:", err?.message || err);

    if (err?.status === 401) {
      return NextResponse.json({ reply: "Invalid Groq API key. Please check GROQ_API_KEY in .env.local." });
    }
    if (err?.status === 429) {
      return NextResponse.json({ reply: "Groq rate limit reached. Please try again in a moment." });
    }

    return NextResponse.json({ reply: `Error: ${err?.message || "Unknown error. Check server logs."}` });
  }
}
