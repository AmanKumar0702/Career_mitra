import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard | Learn2Earn",
  description: "Track your XP, streaks, completed courses, badges and learning progress.",
};
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
