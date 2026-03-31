import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Resume Builder | Learn2Earn",
  description: "Build a professional resume with live preview. Download as PDF and stand out to recruiters.",
};
export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
