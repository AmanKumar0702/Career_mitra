"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, Target, BookOpen, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const steps = [
  {
    id: "welcome",
    title: "Welcome to Learn2Earn! 🎉",
    subtitle: "You're now part of 50,000+ students building their careers.",
    content: null,
  },
  {
    id: "goal",
    title: "What's your main goal?",
    subtitle: "We'll personalise your experience based on this.",
    options: [
      { value: "get_job", label: "Get a Job / Internship", icon: Briefcase },
      { value: "crack_exam", label: "Crack Board / Entrance Exam", icon: Target },
      { value: "learn_skills", label: "Learn New Skills", icon: BookOpen },
      { value: "explore", label: "Explore Career Options", icon: Sparkles },
    ],
  },
  {
    id: "ready",
    title: "You're all set!",
    subtitle: "Your personalised dashboard is ready. Start your first course to earn XP.",
    content: null,
  },
];

interface Props {
  onClose: () => void;
  userName: string;
}

export default function OnboardingModal({ onClose, userName }: Props) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const router = useRouter();

  const handleNext = async () => {
    if (step === steps.length - 1) {
      if (goal) {
        await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ careerGoals: [goal] }),
        }).catch(() => {});
      }
      onClose();
      router.push("/learn");
      return;
    }
    setStep((s) => s + 1);
  };

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
        className="relative w-full max-w-md bg-white dark:bg-[#0f172a] rounded-3xl p-8 shadow-2xl"
        style={{ border: "1px solid rgba(6,182,212,0.2)" }}
      >
        {/* Progress dots */}
        <div className="flex gap-1.5 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "bg-cyan-500" : "bg-gray-200 dark:bg-[#1e293b]"} ${i === step ? "w-6" : "w-3"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg">
                  🎓
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                  Welcome, {userName.split(" ")[0]}!
                </h2>
                <p className="text-gray-500 dark:text-slate-400 leading-relaxed">
                  You're now part of 50,000+ students building their careers on Learn2Earn. Let's set you up in 30 seconds.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { emoji: "📚", label: "500+ Courses" },
                    { emoji: "🎯", label: "AI Guidance" },
                    { emoji: "💼", label: "1000+ Jobs" },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 dark:bg-[#1e293b] rounded-2xl p-3 text-center">
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <div className="text-xs font-medium text-gray-600 dark:text-slate-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">{current.title}</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">{current.subtitle}</p>
                <div className="space-y-2">
                  {current.options?.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setGoal(value)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        goal === value
                          ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                          : "border-gray-100 dark:border-[#1e293b] hover:border-cyan-300 dark:hover:border-cyan-700"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${goal === value ? "bg-cyan-500" : "bg-gray-100 dark:bg-[#1e293b]"}`}>
                        <Icon className={`w-4 h-4 ${goal === value ? "text-white" : "text-gray-500 dark:text-slate-400"}`} />
                      </div>
                      <span className={`font-medium text-sm ${goal === value ? "text-cyan-700 dark:text-cyan-400" : "text-gray-700 dark:text-slate-300"}`}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg">
                  🚀
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">You're all set!</h2>
                <p className="text-gray-500 dark:text-slate-400 leading-relaxed mb-6">
                  Your personalised dashboard is ready. Start your first course to earn XP and begin your streak!
                </p>
                <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-cyan-900/20 dark:to-indigo-900/20 rounded-2xl p-4 border border-cyan-100 dark:border-cyan-800">
                  <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">🎁 Welcome Bonus</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Enroll in your first course to earn <strong>50 XP</strong> and unlock the <strong>"First Course"</strong> badge!</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-3">
          {step > 0 && step < steps.length - 1 && (
            <button onClick={() => setStep((s) => s - 1)} className="px-4 py-3 rounded-xl border border-gray-200 dark:border-[#1e293b] text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-[#1e293b] transition-all">
              Back
            </button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            disabled={step === 1 && !goal}
            className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === steps.length - 1 ? "Start Learning" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
