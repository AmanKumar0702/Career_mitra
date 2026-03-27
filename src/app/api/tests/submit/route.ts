import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Test, ITest } from "@/models/Test";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { testId, answers } = await req.json();

    if (!testId || !answers) {
      return NextResponse.json({ error: "testId and answers are required" }, { status: 400 });
    }

    const test = await Test.findById(testId).lean<ITest>();
    if (!test) return NextResponse.json({ error: "Test not found" }, { status: 404 });

    let correct = 0;
    const weakTopics: Record<string, { wrong: number; total: number }> = {};

    test.questions.forEach((q, i) => {
      const topic = q.topic || "General";
      if (!weakTopics[topic]) weakTopics[topic] = { wrong: 0, total: 0 };
      weakTopics[topic].total++;
      // answers keys are strings after JSON parse, so check both
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
      .map(([topic, v]) => ({
        topic,
        accuracy: Math.round(((v.total - v.wrong) / v.total) * 100),
      }))
      .sort((a, b) => a.accuracy - b.accuracy);

    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
      await User.findOneAndUpdate(
        { email: session.user.email },
        {
          $addToSet: { completedTests: testId },
          $inc: { xp: Math.round(score / 10) },
        }
      );
    }

    return NextResponse.json({
      score,
      correct,
      total,
      weakAreas,
      passed: score >= (test.passingScore ?? 60),
    });
  } catch (err) {
    console.error("[Test Submit] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
