import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  educationLevel: string;
  interests: string[];
  careerGoals: string[];
  role: "student" | "admin";
  streak: number;
  badges: string[];
  xp: number;
  completedCourses: string[];
  completedTests: string[];
  appliedJobs: string[];
  lastActiveDate: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String },
  image: String,
  educationLevel: { type: String, default: "10th" },
  interests: [String],
  careerGoals: [String],
  role: { type: String, enum: ["student", "admin"], default: "student" },
  streak: { type: Number, default: 0 },
  badges: [String],
  xp: { type: Number, default: 0 },
  completedCourses: [String],
  completedTests: [String],
  appliedJobs: [String],
  lastActiveDate: { type: String, default: "" },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
