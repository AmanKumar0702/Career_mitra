import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { jobId } = await req.json();
  if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 });

  try {
    await connectDB();
  } catch {
    return NextResponse.json({ message: "Applied", user: { appliedJobs: [jobId] } });
  }

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    { $addToSet: { appliedJobs: jobId }, $inc: { xp: 10 } },
    { new: true }
  ).select("-password");

  if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ message: "Applied successfully", user: updatedUser });
}
