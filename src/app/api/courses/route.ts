import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";
import { sampleCourses } from "@/data/courses";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const total = await Course.countDocuments();
    if (total === 0) {
      await Course.insertMany(sampleCourses);
    } else {
      // Fix any courses that still have Hindi as language
      await Course.updateMany({ language: "Hindi" }, { $set: { language: "English" } });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (category && category !== "All") query.category = category;
    if (search) query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];

    const courses = await Course.find(query).lean();
    return NextResponse.json(courses);
  } catch (err) {
    console.error("[Courses API]", err);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const course = await Course.create(body);
    return NextResponse.json(course, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
