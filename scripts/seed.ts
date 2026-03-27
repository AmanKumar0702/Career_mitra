/**
 * Seed script — run with: npx ts-node scripts/seed.ts
 * Or: node -r ts-node/register scripts/seed.ts
 */
import mongoose from "mongoose";
import { sampleCourses } from "../src/data/courses";
import { sampleTests } from "../src/data/tests";
import { sampleJobs } from "../src/data/jobs";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/careermitra";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Dynamic imports to avoid model re-registration issues
  const { Course } = await import("../src/models/Course");
  const { Test } = await import("../src/models/Test");
  const { Job } = await import("../src/models/Job");

  await Course.deleteMany({});
  await Test.deleteMany({});
  await Job.deleteMany({});

  await Course.insertMany(sampleCourses);
  await Test.insertMany(sampleTests);
  await Job.insertMany(sampleJobs);

  console.log(`✅ Seeded ${sampleCourses.length} courses, ${sampleTests.length} tests, ${sampleJobs.length} jobs`);
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
