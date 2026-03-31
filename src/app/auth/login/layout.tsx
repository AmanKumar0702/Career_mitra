import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In | Learn2Earn",
  description: "Sign in to your Learn2Earn account to continue your learning journey.",
};
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
