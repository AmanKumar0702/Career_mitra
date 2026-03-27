import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  type: "internship" | "full-time" | "part-time" | "remote";
  description: string;
  skills: string[];
  educationLevel: string;
  salary?: string;
  applyUrl: string;
  deadline?: Date;
  isNewListing: boolean;
  postedAt: Date;
  externalId?: string;
  createdAt: Date;
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  type: { type: String, enum: ["internship", "full-time", "part-time", "remote"], default: "internship" },
  description: String,
  skills: [String],
  educationLevel: String,
  salary: String,
  applyUrl: String,
  deadline: Date,
  isNewListing: { type: Boolean, default: true },
  postedAt: { type: Date, default: Date.now },
  externalId: { type: String, sparse: true },
}, { timestamps: true });

export const Job = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
