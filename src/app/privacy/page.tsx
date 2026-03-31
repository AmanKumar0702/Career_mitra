import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: January 2025</p>
        <div className="space-y-8 text-gray-600 dark:text-slate-400">
          {[
            { title: "1. Information We Collect", body: "We collect your name, email address, education level, interests and career goals when you sign up. We also collect usage data such as courses enrolled, tests taken and XP earned to personalise your experience." },
            { title: "2. How We Use Your Information", body: "We use your information to provide personalised course recommendations, career guidance, and to track your learning progress. We do not sell your personal data to third parties." },
            { title: "3. Data Storage", body: "Your data is stored securely in MongoDB Atlas with encryption at rest. Passwords are hashed using bcrypt and never stored in plain text." },
            { title: "4. Cookies", body: "We use session cookies for authentication (via NextAuth.js). We do not use tracking or advertising cookies." },
            { title: "5. Third-Party Services", body: "We use Groq AI for the career chatbot. Messages sent to the chatbot may be processed by Groq's servers. We do not share personally identifiable information with Groq." },
            { title: "6. Your Rights", body: "You have the right to access, update or delete your personal data at any time. Contact us at hello@learn2earn.in to exercise these rights." },
            { title: "7. Children's Privacy", body: "Learn2Earn is designed for students of all ages. We do not knowingly collect personal data from children under 13 without parental consent." },
            { title: "8. Changes to This Policy", body: "We may update this Privacy Policy from time to time. We will notify users of significant changes via email or a notice on the platform." },
            { title: "9. Contact", body: "For privacy-related questions, contact us at hello@learn2earn.in" },
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
