import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Career Guidance | Learn2Earn",
  description: "Get AI-powered career path suggestions, step-by-step roadmaps and 24/7 AI chatbot support.",
};
export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
