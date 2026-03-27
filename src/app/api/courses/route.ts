import { NextResponse } from "next/server";
import { sampleCourses } from "@/data/courses";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const educationGroup = searchParams.get("group");
  const search = searchParams.get("search");

  let courses = sampleCourses.map((course, index) => ({
    ...course,
    _id: String(index),
  }));

  if (category && category !== "All") {
    courses = courses.filter((c) => c.category === category);
  }

  if (educationGroup && educationGroup !== "all") {
    courses = courses.filter((c) => c.educationGroup === educationGroup);
  }

  if (search) {
    const q = search.toLowerCase();
    courses = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json(courses);
}