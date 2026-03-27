import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
}

export interface ITest extends Document {
  title: string;
  description: string;
  category: string;
  questions: IQuestion[];
  duration: number;
  passingScore: number;
  createdAt: Date;
}

const TestSchema = new Schema<ITest>({
  title: { type: String, required: true },
  description: String,
  category: String,
  questions: [{
    question: String,
    options: [String],
    correct: Number,
    explanation: String,
    difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    topic: String,
  }],
  duration: { type: Number, default: 30 },
  passingScore: { type: Number, default: 60 },
}, { timestamps: true });

export const Test = mongoose.models.Test || mongoose.model<ITest>("Test", TestSchema);
