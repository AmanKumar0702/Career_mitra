import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User, IUser } from "@/models/User";
import { careerPaths } from "@/data/careerPaths";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email }).lean<IUser>();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const interests: string[] = Array.isArray(user.interests) ? user.interests : [];

  const matched = careerPaths.filter((cp) =>
    cp.tags.some((tag) =>
      interests.some((i) => i.toLowerCase().includes(tag.toLowerCase()))
    )
  );

  const suggestions = matched.length > 0 ? matched : careerPaths.slice(0, 3);

  return NextResponse.json({
    suggestions,
    userProfile: {
      interests,
      educationLevel: user.educationLevel,
      careerGoals: user.careerGoals,
    },
  });
}