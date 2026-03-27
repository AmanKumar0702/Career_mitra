import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Course } from "@/models/Course";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId } = await req.json();
  if (!courseId) return NextResponse.json({ error: "courseId required" }, { status: 400 });

  await connectDB();

  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Already enrolled
  if (user.completedCourses.includes(courseId)) {
    return NextResponse.json({ message: "Already enrolled", user }, { status: 200 });
  }

  // Award XP and update streak
  const today = new Date().toDateString();
  const lastActive = (user as any).lastActiveDate;
  const isNewDay = lastActive !== today;
  const newStreak = isNewDay ? (user.streak || 0) + 1 : user.streak;

  // Badge logic
  const newBadges = [...user.badges];
  const completedCount = user.completedCourses.length + 1;
  if (completedCount === 1 && !newBadges.includes("First Course")) newBadges.push("First Course");
  if (completedCount === 5 && !newBadges.includes("Course Explorer")) newBadges.push("Course Explorer");
  if (newStreak >= 7 && !newBadges.includes("7-Day Streak")) newBadges.push("7-Day Streak");

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      $addToSet: { completedCourses: courseId },
      $inc: { xp: 50 },
      $set: { streak: newStreak, badges: newBadges, lastActiveDate: today },
    },
    { new: true }
  ).select("-password");

  // Increment course enrollment count
  await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });

  return NextResponse.json({ message: "Enrolled successfully", user: updatedUser });
}
