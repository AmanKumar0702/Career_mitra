import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, educationLevel, interests, careerGoals } = body;

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    await connectDB();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashed,
      educationLevel: educationLevel || "10th",
      interests: Array.isArray(interests) ? interests : [],
      careerGoals: Array.isArray(careerGoals) ? careerGoals : careerGoals ? [careerGoals] : [],
    });

    return NextResponse.json({ message: "Account created successfully", userId: user._id }, { status: 201 });
  } catch (err: any) {
    console.error("[Signup] error:", err?.message || err);

    if (err?.code === 11000) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    // Return real error message so you can debug
    const message = process.env.NODE_ENV === "development"
      ? (err?.message || "Unknown error")
      : "Something went wrong. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
