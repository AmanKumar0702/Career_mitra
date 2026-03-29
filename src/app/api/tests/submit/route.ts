import { NextRequest, NextResponse } from "next/server";
import { sampleTests } from "@/data/tests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function scoreTest(test: any, answers: Record<string, number>) {
  let correct = 0;
  const weakTopics: Record<string, { wrong: number; total: number }> = {};

  test.questions.forEach((q: any, i: number) => {
    const topic = q.topic || "General";
    if (!weakTopics[topic]) weakTopics[topic] = { wrong: 0, total: 0 };
    weakTopics[topic].total++;
    const given = answers[i] ?? answers[String(i)];
    if (given !== undefined && Number(given) === q.correct) {
      correct++;
    } else {
      weakTopics[topic].wrong++;
    }
  });

  const total = test.questions.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  const weakAreas = Object.entries(weakTopics)
    .filter(([, v]) => v.wrong > 0)
    .map(([topic, v]) => ({ topic, accuracy: Math.round(((v.total - v.wrong) / v.total) * 100) }))
    .sort((a, b) => a.accuracy - b.accuracy);

  return { score, correct, total, weakAreas, passed: score >= (test.passingScore ?? 60) };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { testId, answers, questions, passingScore } = body;

    if (!testId || !answers) {
      return NextResponse.json({ error: "testId and answers are required" }, { status: 400 });
    }

    let test: any = null;

    // Live quiz — questions are passed directly in the request body
    if (testId.startsWith("live-") && questions?.length) {
      test = { questions, passingScore: passingScore ?? 50 };
    }

    // Try MongoDB for regular tests
    if (!test) {
      try {
        const { connectDB } = await import("@/lib/db");
        const { Test } = await import("@/models/Test");
        await connectDB();
        test = await Test.findById(testId).lean();
      } catch {
        // Fallback to sampleTests by index
        const index = parseInt(testId);
        if (!isNaN(index) && sampleTests[index]) {
          test = { ...sampleTests[index], _id: testId };
        }
      }
    }

    if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });

    const result = scoreTest(test, answers);

    // Update user XP (non-critical)
    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) {
        const { connectDB } = await import("@/lib/db");
        const { User } = await import("@/models/User");
        await connectDB();
        await User.findOneAndUpdate(
          { email: session.user.email },
          { $addToSet: { completedTests: testId }, $inc: { xp: Math.round(result.score / 10) } }
        );
      }
    } catch { /* ignore */ }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[Test Submit] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
