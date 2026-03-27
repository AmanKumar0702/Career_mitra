import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { courseId } = body;

  if (!courseId) {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 });
  }

  // Mock response — replace with real DB logic later
  return NextResponse.json({
    success: true,
    message: "Enrolled successfully",
    user: {
      xp: 200,
      completedCourses: [courseId],
    },
  });
}