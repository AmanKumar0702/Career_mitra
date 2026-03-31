import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "My Progress | Learn2Earn",
  description: "View your detailed learning analytics, performance charts and achievement history.",
};
export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
