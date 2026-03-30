import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const course = await Course.findById(params.id).lean();
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(course);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const course = await Course.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(course);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Course.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
