"use client";
import Link from "next/link";
import { BookOpen, ClipboardList, Compass, Briefcase, BarChart2, Award, FileText, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "Learning Platform",
    description: "500+ courses across Science, Tech, Business & more. Multi-language support with progress tracking.",
    href: "/learn",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
    badge: "500+ Courses",
  },
  {
    icon: ClipboardList,
    title: "Test & Assessment",
    description: "MCQ-based quizzes with adaptive difficulty, countdown timer, and instant weak area analysis.",
    href: "/tests",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
    badge: "AI Adaptive",
  },
  {
    icon: Compass,
    title: "Career Guidance",
    description: "AI-powered career path suggestions with step-by-step roadmaps and a 24/7 AI chatbot.",
    href: "/career",
    color: "bg-green-100 dark:bg-green-900/30 text-green-600",
    badge: "AI Powered",
  },
  {
    icon: Briefcase,
    title: "Job Portal",
    description: "Browse internships and jobs filtered by skills, location, and education level. Apply in one click.",
    href: "/jobs",
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600",
    badge: "1000+ Jobs",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Build a professional resume with live preview. Download as PDF and stand out to recruiters.",
    href: "/resume",
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600",
    badge: "Live Preview",
  },
  {
    icon: BarChart2,
    title: "Progress Analytics",
    description: "Track your learning streaks, XP points, completed courses, and performance over time.",
    href: "/dashboard",
    color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600",
    badge: "Real-time",
  },
  {
    icon: Award,
    title: "Gamification",
    description: "Earn badges, maintain streaks, and climb leaderboards as you learn and grow every day.",
    href: "/dashboard",
    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600",
    badge: "Badges & XP",
  },
  {
    icon: Shield,
    title: "Admin Panel",
    description: "Full CRUD management for courses, tests, and jobs. Built for educators and platform admins.",
    href: "/admin",
    color: "bg-gray-100 dark:bg-gray-800 text-gray-600",
    badge: "Full CRUD",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <p className="section-subtitle text-lg max-w-2xl mx-auto">
            From learning to landing your first job — CareerMitra has all the tools in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <Link href={f.href} className="card hover:shadow-md hover:-translate-y-1 transition-all duration-200 block h-full group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${f.color}`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-base mb-1.5 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
