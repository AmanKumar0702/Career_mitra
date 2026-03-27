"use client";
import { motion } from "framer-motion";
import { UserPlus, Target, Briefcase, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up in 30 seconds. Tell us your stream — Science, Commerce, or Arts — and your goals.",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
  },
  {
    icon: Target,
    step: "02",
    title: "Learn & Get Tested",
    description: "Take courses, attempt MCQ quizzes, and get instant feedback on your weak areas.",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
  },
  {
    icon: Briefcase,
    step: "03",
    title: "Land Opportunities",
    description: "Explore career roadmaps, build your resume, and apply to internships & jobs — all in one place.",
    color: "bg-green-100 dark:bg-green-900/30 text-green-600",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">How CareerMitra Works</h2>
          <p className="section-subtitle text-lg max-w-xl mx-auto">
            Three simple steps to go from confused student to confident professional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-green-900/40" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${s.color} shadow-sm`}>
                  <s.icon className="w-9 h-9" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-500 flex items-center justify-center shadow-sm">
                  {s.step}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">{s.description}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="md:hidden w-5 h-5 text-gray-300 dark:text-gray-600 mt-6" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
