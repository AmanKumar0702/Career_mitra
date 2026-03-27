import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  language: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  thumbnail: string;
  tags: string[];
  lessons: { title: string; content: string; duration: string; youtubeUrl?: string }[];
  enrolledCount: number;
  rating: number;
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  language: { type: String, default: "English" },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  duration: String,
  thumbnail: String,
  tags: [String],
  lessons: [{ title: String, content: String, duration: String, youtubeUrl: String }],
  enrolledCount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.0 },
}, { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
