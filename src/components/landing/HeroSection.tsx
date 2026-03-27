"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, BookOpen, Target, Briefcase, Star, TrendingUp, Flame } from "lucide-react";
import { motion } from "framer-motion";

const floatingCards = [
  { icon: BookOpen, label: "500+ Courses", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600" },
  { icon: Target, label: "Smart Tests", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600" },
  { icon: Briefcase, label: "1000+ Jobs", color: "bg-green-50 dark:bg-green-900/20 text-green-600" },
];

export default function HeroSection() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (session) {
      fetch("/api/user").then((r) => r.json()).then(setUser).catch(() => {});
    }
  }, [session]);

  const isLoggedIn = !!session;
  const name = user?.name || session?.user?.name || "Student";
  const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
  const xp = user?.xp || 0;
  const streak = user?.streak || 0;
  const completedCourses = user?.completedCourses?.length || 0;
  const level = Math.floor(xp / 500) + 1;

  const previewStats = [
    { icon: Flame, label: "Day Streak", value: streak.toString(), color: "text-orange-500" },
    { icon: Star, label: "XP Points", value: xp.toLocaleString(), color: "text-yellow-500" },
    { icon: TrendingUp, label: "Courses", value: completedCourses.toString(), color: "text-blue-500" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-20 pb-32">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" /> AI-Powered Career Platform for Students
            </span>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              {isLoggedIn ? (
                <>Welcome back,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                    {name.split(" ")[0]} 👋
                  </span>
                </>
              ) : (
                <>Learn, Test, and{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                    Build Your Career
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              {isLoggedIn
                ? `You're at Level ${level} with ${xp} XP. Keep learning to unlock new badges and opportunities!`
                : "CareerMitra helps students after 10th & 12th explore the right career path, develop skills, and land their first opportunity — all in one place."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="btn-primary text-base px-8 py-3.5 flex items-center justify-center gap-2">
                    Go to Dashboard <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/progress" className="btn-secondary text-base px-8 py-3.5 text-center">
                    View My Progress
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/signup" className="btn-primary text-base px-8 py-3.5 flex items-center justify-center gap-2">
                    Get Started Free <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#features" className="btn-secondary text-base px-8 py-3.5 text-center">
                    Explore Features
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {floatingCards.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-sm border border-white/50 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
                  <div className={`p-2 rounded-xl ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Dashboard Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">
                      {isLoggedIn ? "Welcome back 👋" : "Example Dashboard"}
                    </p>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {isLoggedIn ? name : "Your Name Here"}
                    </h3>
                    {isLoggedIn && (
                      <p className="text-xs text-primary-600 font-medium">Level {level}</p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {isLoggedIn ? initials : "?"}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {previewStats.map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 text-center">
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
                      <div className="font-bold text-gray-900 dark:text-white text-sm">{value}</div>
                      <div className="text-xs text-gray-400">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="space-y-3 mb-5">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Level {level} Progress</span>
                      <span>{xp % 500}/500 XP</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, ((xp % 500) / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                  {completedCourses > 0 && (
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Courses Enrolled</span>
                        <span>{completedCourses} done</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          style={{ width: `${Math.min(100, (completedCourses / 10) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Status */}
                {isLoggedIn ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-green-700 dark:text-green-400">Active Learner 🎉</p>
                      <p className="text-xs text-green-600 dark:text-green-500">
                        {completedCourses > 0 ? `${completedCourses} course${completedCourses > 1 ? "s" : ""} enrolled` : "Start your first course today!"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary-700 dark:text-primary-400">Sign up to see your data</p>
                      <p className="text-xs text-primary-600 dark:text-primary-500">Track XP, streaks & progress</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 px-4 py-2.5 flex items-center gap-2"
              >
                <span className="text-xl">🏆</span>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {isLoggedIn && streak >= 7 ? "Badge Earned!" : "Earn Badges!"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isLoggedIn && streak >= 7 ? "7-Day Streak 🔥" : "Stay consistent"}
                  </p>
                </div>
              </motion.div>

              {/* Floating job card */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 px-4 py-2.5 flex items-center gap-2"
              >
                <span className="text-xl">💼</span>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {isLoggedIn ? "Keep Going!" : "1000+ Jobs"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isLoggedIn ? `Level ${level} · ${xp} XP` : "Internships & full-time"}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
