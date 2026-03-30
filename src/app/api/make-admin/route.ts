import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const result = await User.updateOne(
    { email: "nayakswayamshree554@gmail.com" },
    { $set: { role: "admin" } }
  );
  if (result.modifiedCount === 1) return NextResponse.json({ ok: true, message: "Admin role assigned!" });
  return NextResponse.json({ ok: false, message: "User not found or already admin" });
}
