import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";

export const metadata: Metadata = {
  title: "Learn2Earn — Learn, Test & Build Your Career",
  description: "Learn2Earn helps students explore careers, learn skills, take assessments, and find jobs.",
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
