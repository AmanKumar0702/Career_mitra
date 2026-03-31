import type { Metadata } from "next";
export const metadata: Metadata = { title: "Leaderboard | Learn2Earn", description: "See the top learners on Learn2Earn ranked by XP, streak and courses completed." };
export default function LeaderboardLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
