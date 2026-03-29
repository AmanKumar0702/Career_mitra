"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, BookOpen, Target, Briefcase, Star, TrendingUp, Flame, Zap, Trophy, Award } from "lucide-react";
import { motion } from "framer-motion";

const floatingCards = [
  { icon: BookOpen,  label: "500+ Courses", color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600" },
  { icon: Target,    label: "Smart Tests",  color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600" },
  { icon: Briefcase, label: "1000+ Jobs",   color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600" },
];

export default function HeroSection() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
  const xpPercent = Math.min(100, ((xp % 500) / 500) * 100);

  const previewStats = [
    { icon: Flame, label: "Streak", value: streak.toString(), color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/30" },
    { icon: Star, label: "XP", value: xp.toLocaleString(), color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/30" },
    { icon: TrendingUp, label: "Courses", value: completedCourses.toString(), color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-900/30" },
  ];

  // 3D tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -22;
    card.style.transform = `rotateX(${y}deg) rotateY(${x}deg) translateZ(16px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-indigo-50 dark:from-[#0a0f1e] dark:via-[#0a0f1e] dark:to-[#0d1526] pt-20 pb-32">

      {/* Background glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-300/20 dark:bg-cyan-900/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-900/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" /> AI-Powered Career Platform for Students
            </span>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              {isLoggedIn ? (
                <>Welcome back,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
                    {name.split(" ")[0]}
                  </span>
                </>
              ) : (
                <>Learn, Test &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
                    Build Your Career
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
              {isLoggedIn
                ? `You're at Level ${level} with ${xp} XP. Keep learning to unlock new badges and opportunities!`
                : "Learn2Earn helps students after 10th & 12th explore the right career path, develop skills, and land their first opportunity."
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

            <div className="flex flex-wrap gap-3">
              {floatingCards.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-sm border border-white/60 dark:border-[#1e293b] bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur">
                  <div className={`p-1.5 rounded-lg ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm text-gray-700 dark:text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: 3D User Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div
              style={{ perspective: "1000px" }}
              className="relative w-full max-w-sm"
            >
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(6,182,212,0.25) 0%, transparent 70%)",
                  transform: "translateY(12px) scale(0.95)",
                  filter: "blur(20px)",
                }}
              />

              {/* 3D Card */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.12s ease",
                }}
                className="relative"
              >
                {/* Card body */}
                <div
                  className="relative bg-white dark:bg-[#0f172a] rounded-3xl p-6 overflow-hidden"
                  style={{
                    border: "1px solid rgba(6,182,212,0.25)",
                    boxShadow: "0 8px 40px rgba(6,182,212,0.2), 0 2px 0 rgba(255,255,255,0.06) inset",
                  }}
                >
                  {/* Top shine */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)" }}
                  />

                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
                    style={{
                      backgroundImage: "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Header */}
                  <div className="relative flex items-center justify-between mb-5">
                    <div>
                      <p className="text-xs text-gray-400 dark:text-slate-500 mb-0.5">
                        {isLoggedIn ? "Welcome back" : "Example Dashboard"}
                      </p>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
                        {isLoggedIn ? name : "Your Name Here"}
                      </h3>
                      <p className="text-xs text-cyan-500 font-semibold mt-0.5 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Level {level}
                      </p>
                    </div>
                    {/* Avatar */}
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base"
                        style={{
                          background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                          boxShadow: "0 4px 16px rgba(6,182,212,0.4)",
                        }}
                      >
                        {isLoggedIn ? initials : "?"}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-[#0f172a]" />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="relative grid grid-cols-3 gap-2 mb-5">
                    {previewStats.map(({ icon: Icon, label, value, color, bg }) => (
                      <div
                        key={label}
                        className={`${bg} rounded-2xl p-3 text-center`}
                        style={{ border: "1px solid rgba(6,182,212,0.1)" }}
                      >
                        <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{value}</div>
                        <div className="text-[10px] text-gray-400 dark:text-slate-500">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* XP Progress */}
                  <div className="relative mb-5">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1.5">
                      <span>Level {level} Progress</span>
                      <span className="text-cyan-500 font-medium">{xp % 500} / 500 XP</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-[#1e293b] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${xpPercent}%`,
                          background: "linear-gradient(90deg, #06b6d4, #6366f1)",
                          boxShadow: "0 0 8px rgba(6,182,212,0.5)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Status bar */}
                  <div
                    className="relative rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{
                      background: isLoggedIn
                        ? "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(99,102,241,0.1))"
                        : "rgba(6,182,212,0.08)",
                      border: "1px solid rgba(6,182,212,0.2)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(6,182,212,0.15)" }}
                    >
                      {isLoggedIn
                        ? <Target className="w-4 h-4 text-cyan-500" />
                        : <Sparkles className="w-4 h-4 text-cyan-500" />
                      }
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                        {isLoggedIn ? "Active Learner" : "Sign up to see your data"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-500">
                        {isLoggedIn
                          ? completedCourses > 0 ? `${completedCourses} course${completedCourses > 1 ? "s" : ""} enrolled` : "Start your first course!"
                          : "Track XP, streaks & progress"
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating badge chip — top right */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -top-5 -right-5 flex items-center gap-2 px-3 py-2 rounded-2xl"
                  style={{ background: "white", border: "1px solid rgba(6,182,212,0.3)", boxShadow: "0 4px 20px rgba(6,182,212,0.2)", backdropFilter: "blur(8px)" }}
                >
                  <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-tight">
                      {isLoggedIn && streak >= 7 ? "Badge Earned" : "Earn Badges"}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {isLoggedIn && streak >= 7 ? "7-Day Streak" : "Stay consistent"}
                    </p>
                  </div>
                </motion.div>

                {/* Floating job chip — bottom left */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-5 -left-5 flex items-center gap-2 px-3 py-2 rounded-2xl"
                  style={{ background: "white", border: "1px solid rgba(99,102,241,0.3)", boxShadow: "0 4px 20px rgba(99,102,241,0.2)", backdropFilter: "blur(8px)" }}
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-tight">
                      {isLoggedIn ? "Keep Going" : "1000+ Jobs"}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {isLoggedIn ? `Level ${level} · ${xp} XP` : "Internships & full-time"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
