import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Job } from "@/models/Job";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!;
const JSEARCH_HOST = "jsearch.p.rapidapi.com";

// Normalize JSearch job to our Job schema
function normalizeJob(raw: any) {
  const type = (() => {
    const t = (raw.job_employment_type || "").toLowerCase();
    if (t.includes("intern")) return "internship";
    if (t.includes("part")) return "part-time";
    if (t.includes("remote") || raw.job_is_remote) return "remote";
    return "full-time";
  })();

  return {
    title: raw.job_title || "Untitled",
    company: raw.employer_name || "Unknown Company",
    location: raw.job_is_remote
      ? "Remote"
      : [raw.job_city, raw.job_state, raw.job_country].filter(Boolean).join(", ") || "India",
    type,
    description: raw.job_description?.slice(0, 400) || "",
    skills: raw.job_required_skills || extractSkills(raw.job_description || ""),
    educationLevel: mapEducation(raw.job_required_education?.required_credential || ""),
    salary: formatSalary(raw.job_min_salary, raw.job_max_salary, raw.job_salary_currency),
    applyUrl: raw.job_apply_link || "#",
    isNewListing: true,
    postedAt: raw.job_posted_at_datetime_utc
      ? new Date(raw.job_posted_at_datetime_utc)
      : new Date(),
    externalId: raw.job_id,
  };
}

function extractSkills(description: string): string[] {
  const known = [
    "Python", "JavaScript", "TypeScript", "React", "Node.js", "Java", "C++", "C#",
    "SQL", "MongoDB", "AWS", "Docker", "Kubernetes", "Git", "Excel", "Figma",
    "Machine Learning", "Data Analysis", "Communication", "Leadership", "Marketing",
    "Accounting", "Tally", "AutoCAD", "MATLAB", "Research",
  ];
  return known.filter((s) => description.toLowerCase().includes(s.toLowerCase())).slice(0, 6);
}

function mapEducation(credential: string): string {
  const c = credential.toLowerCase();
  if (c.includes("phd") || c.includes("doctorate")) return "PhD";
  if (c.includes("master") || c.includes("mba") || c.includes("postgrad")) return "MBA";
  if (c.includes("bachelor") || c.includes("degree") || c.includes("b.tech") || c.includes("graduate")) return "B.Tech / B.E.";
  if (c.includes("diploma")) return "Diploma (Engineering)";
  if (c.includes("high school") || c.includes("12th")) return "12th Science (PCM)";
  return "B.Tech / B.E.";
}

function formatSalary(min: number, max: number, currency: string): string {
  if (!min && !max) return "";
  const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "₹";
  if (min && max) {
    const fmtMin = min >= 100000 ? `${(min / 100000).toFixed(1)}L` : `${(min / 1000).toFixed(0)}K`;
    const fmtMax = max >= 100000 ? `${(max / 100000).toFixed(1)}L` : `${(max / 1000).toFixed(0)}K`;
    return `${symbol}${fmtMin}–${fmtMax} PA`;
  }
  if (min) return `${symbol}${min >= 100000 ? `${(min / 100000).toFixed(1)}L` : `${(min / 1000).toFixed(0)}K`}+ PA`;
  return "";
}

// Fetch from JSearch
async function fetchFromJSearch(query: string, page = 1): Promise<any[]> {
  const url = `https://${JSEARCH_HOST}/search?query=${encodeURIComponent(query)}&page=${page}&num_pages=1&country=in&date_posted=week`;
  const res = await fetch(url, {
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": JSEARCH_HOST,
    },
    next: { revalidate: 3600 }, // cache 1 hour
  });
  if (!res.ok) throw new Error(`JSearch error: ${res.status}`);
  const data = await res.json();
  return data.data || [];
}

export async function GET(req: NextRequest) {
  if (!RAPIDAPI_KEY) {
    return NextResponse.json({ error: "RAPIDAPI_KEY not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "internship India";
  const page = parseInt(searchParams.get("page") || "1");

  try {
    const raw = await fetchFromJSearch(query, page);
    const jobs = raw.map(normalizeJob);

    // Upsert into MongoDB so they appear in main jobs list
    await connectDB();
    for (const job of jobs) {
      await Job.findOneAndUpdate(
        { externalId: job.externalId },
        { $setOnInsert: job },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ jobs, total: jobs.length, source: "jsearch" });
  } catch (err: any) {
    console.error("[JSearch] error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
