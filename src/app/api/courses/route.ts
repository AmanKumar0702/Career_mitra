import { NextRequest, NextResponse } from "next/server";
import { sampleCourses } from "@/data/courses";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
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
  } catch (err) {
    console.error("[Courses API]", err);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { connectDB } = await import("@/lib/db");
    const { Course } = await import("@/models/Course");
    await connectDB();

    const body = await request.json();
    if (!body.title || !body.category) {
      return NextResponse.json({ error: "title and category are required" }, { status: 400 });
    }

    const course = await Course.create(body);
    return NextResponse.json(course, { status: 201 });
  } catch (err: any) {
    console.error("[Courses POST]", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
