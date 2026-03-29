"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeProvider";
import dynamic from "next/dynamic";
import TopLoader from "@/components/ui/TopLoader";

const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), { ssr: false });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <TopLoader />
        <AnimatedBackground />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0f172a",
              color: "#e2e8f0",
              border: "1px solid rgba(6,182,212,0.2)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#06b6d4", secondary: "#0f172a" } },
            error:   { iconTheme: { primary: "#ef4444", secondary: "#0f172a" } },
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
