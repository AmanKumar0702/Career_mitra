import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: January 2025</p>
        <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-slate-400">
          {[
            { title: "1. Acceptance of Terms", body: "By accessing or using Learn2Earn, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform." },
            { title: "2. Use of the Platform", body: "Learn2Earn is a free educational platform for students. You agree to use it only for lawful purposes and not to misuse, hack, or attempt to gain unauthorised access to any part of the platform." },
            { title: "3. User Accounts", body: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorised use of your account." },
            { title: "4. Content", body: "All course content, tests, and materials on Learn2Earn are provided for educational purposes only. You may not reproduce, distribute, or sell any content without written permission." },
            { title: "5. XP, Badges and Certificates", body: "XP points, badges and certificates are awarded based on platform activity. They are for motivational purposes and do not constitute formal academic qualifications." },
            { title: "6. Privacy", body: "Your use of Learn2Earn is also governed by our Privacy Policy. We collect only the data necessary to provide our services and never sell your personal data." },
            { title: "7. Termination", body: "We reserve the right to suspend or terminate accounts that violate these terms, engage in abusive behaviour, or misuse the platform." },
            { title: "8. Disclaimer", body: "Learn2Earn is provided 'as is' without warranties of any kind. We do not guarantee job placement or specific career outcomes." },
            { title: "9. Contact", body: "For questions about these terms, contact us at hello@learn2earn.in" },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.title}</h2>
              <p className="leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
