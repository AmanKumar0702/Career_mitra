import { NextRequest, NextResponse } from "next/server";
import { sampleTests } from "@/data/tests";

export async function GET(req: NextRequest) {
  try {
    const { connectDB } = await import("@/lib/db");
    const { Test } = await import("@/models/Test");
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const query = category ? { category } : {};

    let tests = await Test.find(query).lean();
    if (tests.length === 0 && !category) {
      await Test.insertMany(sampleTests);
      tests = await Test.find({}).lean();
    }
    return NextResponse.json(tests);
  } catch {
    // MongoDB unavailable — serve from static data
    const tests = sampleTests.map((t, i) => ({ ...t, _id: String(i) }));
    return NextResponse.json(tests);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { connectDB } = await import("@/lib/db");
    const { Test } = await import("@/models/Test");
    await connectDB();
    const body = await req.json();
    const test = await Test.create(body);
    return NextResponse.json(test, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
