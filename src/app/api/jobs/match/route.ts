import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User, IUser } from "@/models/User";
import { Job } from "@/models/Job";

// Maps education levels to job-relevant keywords
const educationKeywords: Record<string, string[]> = {
  "10th Pass": ["10th", "school"],
  "10th Appearing": ["10th", "school"],
  "12th Science (PCM)": ["12th", "science", "pcm", "engineering", "diploma"],
  "12th Science (PCB)": ["12th", "science", "pcb", "medical", "biology"],
  "12th Science (PCMB)": ["12th", "science", "engineering", "medical"],
  "12th Commerce": ["12th", "commerce", "accounts", "business"],
  "12th Arts/Humanities": ["12th", "arts", "humanities"],
  "Diploma (Engineering)": ["diploma", "engineering", "polytechnic"],
  "ITI": ["iti", "trade", "technical"],
  "B.Tech / B.E.": ["b.tech", "engineering", "graduate", "btech"],
  "B.Sc": ["b.sc", "science", "graduate"],
  "B.Com": ["b.com", "commerce", "graduate", "accounts"],
  "BBA": ["bba", "business", "management", "graduate"],
  "BCA": ["bca", "computer", "graduate"],
  "B.A.": ["b.a.", "arts", "graduate"],
  "MBBS": ["mbbs", "medical", "doctor", "graduate"],
  "B.Pharm": ["b.pharm", "pharmacy", "graduate"],
  "LLB": ["llb", "law", "legal", "graduate"],
  "B.Ed": ["b.ed", "education", "teaching", "graduate"],
  "MBA": ["mba", "management", "postgraduate"],
  "M.Tech / M.E.": ["m.tech", "engineering", "postgraduate"],
  "M.Sc": ["m.sc", "science", "postgraduate"],
  "PhD": ["phd", "research", "doctorate"],
};

// Maps interests to skill keywords
const interestSkillMap: Record<string, string[]> = {
  "Technology & Coding": ["react", "node", "python", "javascript", "java", "coding", "developer", "software", "web", "android", "ios", "cloud", "devops", "ml", "ai"],
  "Science & Research": ["research", "lab", "data", "analysis", "python", "matlab", "science"],
  "Business & Startups": ["business", "sales", "marketing", "operations", "management", "startup", "crm"],
  "Arts & Design": ["figma", "design", "photoshop", "illustrator", "ui", "ux", "canva", "creative"],
  "Medicine & Healthcare": ["medical", "clinical", "pharmacy", "healthcare", "lab", "pathology"],
  "Law & Justice": ["legal", "law", "compliance", "contract", "regulatory"],
  "Finance & Banking": ["finance", "accounting", "excel", "tally", "gst", "banking", "investment"],
  "Education & Teaching": ["teaching", "education", "curriculum", "content", "tutor"],
  "Engineering": ["autocad", "catia", "mechanical", "civil", "electrical", "design", "manufacturing"],
  "Media & Journalism": ["writing", "content", "social media", "video", "editing", "journalism"],
  "Government & Civil Services": ["government", "research", "documentation", "general knowledge"],
  "Sports & Fitness": ["fitness", "sports", "coaching", "nutrition"],
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email }).lean<IUser>();
  if (!user) return NextResponse.json({ matches: [] });

  const allJobs = await Job.find({}).lean();

  const interests: string[] = user.interests || [];
  const education: string = user.educationLevel || "";

  // Build keyword sets from user profile
  const interestKeywords = interests.flatMap((i) => interestSkillMap[i] || []);
  const eduKeywords = educationKeywords[education] || ["graduate"];

  // Score each job
  const scored = allJobs.map((job) => {
    let score = 0;
    const jobText = [
      job.title, job.description, job.company,
      ...(job.skills || []), job.educationLevel || "",
    ].join(" ").toLowerCase();

    // Interest match
    interestKeywords.forEach((kw) => { if (jobText.includes(kw)) score += 2; });

    // Education match
    eduKeywords.forEach((kw) => {
      if ((job.educationLevel || "").toLowerCase().includes(kw)) score += 3;
    });

    // Recency bonus
    const daysOld = (Date.now() - new Date(job.postedAt || job.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysOld <= 1) score += 4;
    else if (daysOld <= 3) score += 2;
    else if (daysOld <= 7) score += 1;

    // New listing bonus
    if (job.isNewListing) score += 1;

    return { job, score };
  });

  // Return top 5 matches with score > 0
  const matches = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => ({ ...s.job, matchScore: s.score }));

  return NextResponse.json({ matches, userInterests: interests, userEducation: education });
}
