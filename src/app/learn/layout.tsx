import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Learn | Learn2Earn",
  description: "Browse 500+ free courses from Class 1 to Graduate level. Learn at your own pace and earn XP.",
};
export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
