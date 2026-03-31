import type { Metadata } from "next";
export const metadata: Metadata = { title: "About | Learn2Earn", description: "Learn about Learn2Earn's mission to help Indian students build careers." };
export default function AboutLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
