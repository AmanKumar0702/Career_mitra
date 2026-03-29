import { NextRequest, NextResponse } from "next/server";

const CATEGORIES: Record<string, number> = {
  "General Knowledge": 9,
  "Science": 17,
  "Mathematics": 19,
  "Technology": 18,
  "History": 23,
  "Geography": 22,
  "Sports": 21,
  "Music": 12,
  "Movies": 11,
};

function decodeHTML(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "General Knowledge";
  const difficulty = searchParams.get("difficulty") || "medium";
  const amount = parseInt(searchParams.get("amount") || "10");

  const catId = CATEGORIES[category];
  const url = `https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}${catId ? `&category=${catId}` : ""}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    if (data.response_code !== 0 || !data.results?.length) {
      return NextResponse.json({ error: "No questions available" }, { status: 404 });
    }

    const questions = data.results.map((q: any) => {
      const allOptions = shuffle([q.correct_answer, ...q.incorrect_answers]);
      const correctIndex = allOptions.indexOf(q.correct_answer);
      return {
        question: decodeHTML(q.question),
        options: allOptions.map(decodeHTML),
        correct: correctIndex,
        difficulty: q.difficulty,
        topic: decodeHTML(q.category),
        explanation: `The correct answer is: ${decodeHTML(q.correct_answer)}`,
      };
    });

    const test = {
      _id: `live-${Date.now()}`,
      title: `${category} — ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz`,
      description: `${amount} live questions from Open Trivia Database`,
      category,
      duration: Math.ceil(amount * 1.5),
      passingScore: 50,
      totalMarks: amount * 4,
      negativeMarking: -1,
      marksPerQuestion: 4,
      instructions: [
        "Each correct answer carries +4 marks.",
        "Each wrong answer carries -1 mark.",
        "Questions are fetched live — every attempt is unique!",
      ],
      questions,
      isLive: true,
    };

    return NextResponse.json(test);
  } catch (err) {
    console.error("[OpenTDB]", err);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
