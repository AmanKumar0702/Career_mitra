import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { connectDB } = await import("@/lib/db");
    const { User } = await import("@/models/User");
    await connectDB();
    const users = await User.find({})
      .select("name xp streak completedCourses educationLevel badges email")
      .sort({ xp: -1 })
      .limit(50)
      .lean();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json([]);
  }
}
