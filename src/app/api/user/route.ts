import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const mockUser = {
  xp: 0, streak: 0, level: 1,
  completedCourses: [], completedTests: [],
  appliedJobs: [], badges: [],
};

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json(mockUser);

    const { connectDB } = await import("@/lib/db");
    const { User } = await import("@/models/User");
    await connectDB();

    const user = await User.findOne({ email: session.user.email }).select("-password").lean();
    return NextResponse.json(user || mockUser);
  } catch {
    return NextResponse.json(mockUser);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { connectDB } = await import("@/lib/db");
    const { User } = await import("@/models/User");
    await connectDB();

    const body = await req.json();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: body },
      { new: true }
    ).select("-password");
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
