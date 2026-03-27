import { NextResponse } from "next/server";
import { sampleCourses } from "@/data/courses";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = parseInt(params.id);

  if (isNaN(index) || index < 0 || index >= sampleCourses.length) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const course = {
    ...sampleCourses[index],
    _id: String(index),
  };

  return NextResponse.json(course);
}