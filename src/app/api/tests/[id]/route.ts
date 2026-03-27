import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Test } from "@/models/Test";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  // Return full test including questions (correct answers are needed client-side for immediate feedback)
  const test = await Test.findById(params.id).lean();
  if (!test) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(test);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const test = await Test.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(test);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Test.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
