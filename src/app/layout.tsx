import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";

export const metadata: Metadata = {
  title: {
    default: "Learn2Earn — Learn, Test & Build Your Career",
    template: "%s | Learn2Earn",
  },
  description: "Learn2Earn helps students after 10th & 12th explore careers, build skills, take assessments, and find jobs. Free courses, AI career guidance and job portal.",
  keywords: ["career guidance", "online courses", "student learning", "job portal", "skill development", "India", "10th 12th students"],
  authors: [{ name: "Learn2Earn" }],
  openGraph: {
    title: "Learn2Earn — Learn, Test & Build Your Career",
    description: "Free courses, AI career guidance, MCQ tests and job listings for Indian students.",
    type: "website",
    locale: "en_IN",
    siteName: "Learn2Earn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn2Earn — Learn, Test & Build Your Career",
    description: "Free courses, AI career guidance, MCQ tests and job listings for Indian students.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="relative">
        <Providers>
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
