import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Job } from "@/models/Job";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const job = await Job.findById(params.id).lean();
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(job);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const job = await Job.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(job);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Job.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
