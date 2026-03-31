import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tests & Assessments | Learn2Earn",
  description: "Take MCQ-based quizzes with instant scoring, weak area detection and adaptive difficulty.",
};
export default function TestsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
