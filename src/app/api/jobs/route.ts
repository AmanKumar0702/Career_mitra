import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Job } from "@/models/Job";
import { sampleJobs } from "@/data/jobs";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const location = searchParams.get("location");
  const skill = searchParams.get("skill");
  const education = searchParams.get("education");
  const search = searchParams.get("search");

  // Re-seed if DB is empty or has stale data (applyUrl = "#")
  const stale = await Job.findOne({ applyUrl: "#" });
  if (stale) {
    await Job.deleteMany({});
    await Job.insertMany(sampleJobs);
  } else {
    const total = await Job.countDocuments();
    if (total === 0) await Job.insertMany(sampleJobs);
  }

  const query: Record<string, unknown> = {};
  if (type) query.type = type;
  if (location) query.location = { $regex: escapeRegex(location), $options: "i" };
  if (skill) query.skills = { $in: [new RegExp(escapeRegex(skill), "i")] };
  if (education) query.educationLevel = { $regex: escapeRegex(education), $options: "i" };
  if (search) {
    const s = escapeRegex(search);
    query.$or = [
      { title: { $regex: s, $options: "i" } },
      { company: { $regex: s, $options: "i" } },
      { skills: { $in: [new RegExp(s, "i")] } },
      { description: { $regex: s, $options: "i" } },
    ];
  }

  const jobs = await Job.find(query).sort({ postedAt: -1 }).lean();
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const job = await Job.create(body);
    return NextResponse.json(job, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
