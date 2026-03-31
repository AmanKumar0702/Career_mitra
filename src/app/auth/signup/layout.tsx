import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up | Learn2Earn",
  description: "Create a free Learn2Earn account and start your career journey today.",
};
export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
