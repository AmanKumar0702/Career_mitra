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
    if (!user) return NextResponse.json(mockUser);

    // Update streak on first fetch of the day
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dbUser = user as any;
    if (dbUser.lastActiveDate !== today) {
      const wasYesterday = dbUser.lastActiveDate === yesterday.toDateString();
      const newStreak = wasYesterday ? (dbUser.streak || 0) + 1 : 1;
      await (await import("@/models/User")).User.findOneAndUpdate(
        { email: session.user.email },
        { lastActiveDate: today, streak: newStreak }
      );
      return NextResponse.json({ ...dbUser, streak: newStreak, lastActiveDate: today });
    }

    return NextResponse.json(user);
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
