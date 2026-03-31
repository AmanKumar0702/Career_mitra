import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Job Portal | Learn2Earn",
  description: "Browse 1000+ internships and jobs filtered by skills, location and education level.",
};
export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
