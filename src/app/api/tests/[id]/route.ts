import { NextRequest, NextResponse } from "next/server";
import { sampleTests } from "@/data/tests";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { connectDB } = await import("@/lib/db");
    const { Test } = await import("@/models/Test");
    await connectDB();
    const test = await Test.findById(params.id).lean();
    if (!test) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(test);
  } catch {
    // Fallback: treat id as index into sampleTests
    const index = parseInt(params.id);
    const test = isNaN(index) ? null : sampleTests[index];
    if (!test) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ...test, _id: String(index) });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { connectDB } = await import("@/lib/db");
    const { Test } = await import("@/models/Test");
    await connectDB();
    const body = await req.json();
    const test = await Test.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(test);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { connectDB } = await import("@/lib/db");
    const { Test } = await import("@/models/Test");
    await connectDB();
    await Test.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
