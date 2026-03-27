import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Test } from "@/models/Test";
import { sampleTests } from "@/data/tests";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const query = category ? { category } : {};

  let tests = await Test.find(query).lean();

  // Auto-seed if DB is empty
  if (tests.length === 0 && !category) {
    await Test.insertMany(sampleTests);
    tests = await Test.find({}).lean();
  }

  return NextResponse.json(tests);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const test = await Test.create(body);
    return NextResponse.json(test, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
