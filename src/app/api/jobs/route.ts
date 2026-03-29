import { NextRequest, NextResponse } from "next/server";
import { sampleJobs } from "@/data/jobs";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: NextRequest) {
  try {
    const { connectDB } = await import("@/lib/db");
    const { Job } = await import("@/models/Job");

    await connectDB();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

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

    const jobs = await Job.find(query).sort({ postedAt: -1 }).lean();
    return NextResponse.json(jobs);
  } catch {
    // MongoDB unavailable — serve from static data
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    let jobs = sampleJobs.map((j, i) => ({ ...j, _id: String(i) }));
    if (type) jobs = jobs.filter((j) => j.type === type);
    return NextResponse.json(jobs);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { connectDB } = await import("@/lib/db");
    const { Job } = await import("@/models/Job");
    await connectDB();
    const body = await req.json();
    const job = await Job.create(body);
    return NextResponse.json(job, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
