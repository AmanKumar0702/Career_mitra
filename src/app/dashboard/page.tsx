"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { BookOpen, ClipboardList, Compass, Briefcase, Flame, Star, Trophy, TrendingUp, FileText, Zap, Target, ChevronRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const quickLinks = [
  { icon: BookOpen, title: "Learning Platform", desc: "Continue your courses", href: "/learn", color: "text-cyan-500", badge: "500+ Courses" },
  { icon: ClipboardList, title: "Test & Assessment", desc: "Take a quiz, track progress", href: "/tests", color: "text-cyan-500", badge: "Adaptive AI" },
  { icon: Compass, title: "Career Guidance", desc: "Explore career paths", href: "/career", color: "text-cyan-500", badge: "AI Powered" },
  { icon: Briefcase, title: "Job Opportunities", desc: "Find internships & jobs", href: "/jobs", color: "text-cyan-500", badge: "1000+ Jobs" },
  { icon: FileText, title: "Resume Builder", desc: "Build your resume", href: "/resume", color: "text-cyan-500", badge: "Live Preview" },
];

const activityData = [
  { day: "Mon", xp: 40, courses: 1 }, { day: "Tue", xp: 80, courses: 2 },
  { day: "Wed", xp: 60, courses: 1 }, { day: "Thu", xp: 120, courses: 3 },
  { day: "Fri", xp: 90, courses: 2 }, { day: "Sat", xp: 150, courses: 4 },
  { day: "Sun", xp: 110, courses: 2 },
];

const allBadges = [
  { icon: "🔥", name: "7-Day Streak", desc: "7 days in a row", key: "7-Day Streak" },
  { icon: "📚", name: "First Course", desc: "Enrolled in first course", key: "First Course" },
  { icon: "🎯", name: "Quiz Master", desc: "Score 90%+ on a test", key: "Quiz Master" },
  { icon: "💼", name: "Job Seeker", desc: "Applied to a job", key: "Job Seeker" },
  { icon: "🏆", name: "Top Scorer", desc: "Complete 5 courses", key: "Course Explorer" },
  { icon: "⚡", name: "Speed Learn", desc: "3 courses in a week", key: "Speed Learner" },
];

// Shared 3D card style — same cyan glow for every card
const GLOW = "rgba(6,182,212,0.10)";
const BORDER = "rgba(6,182,212,0.15)";
const CARD_SHADOW = `0 4px 20px ${GLOW}, 0 1px 0 rgba(255,255,255,0.04) inset`;

function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`group relative ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        e.currentTarget.style.transform = `rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`;
      }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)"; }}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease", perspective: "900px" }}
    >
      {/* Glow layer */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: GLOW, transform: "translateY(6px) scale(0.97)", filter: "blur(14px)", opacity: 0.7 }}
      />
      {/* Card surface */}
      <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl border overflow-hidden"
        style={{ borderColor: BORDER, boxShadow: CARD_SHADOW }}
      >
        {/* Shine on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.06) 0%, transparent 60%)" }}
        />
        {children}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/user").then((r) => r.json()).then(setUser).catch(() => {});
    }
  }, [session]);

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0f1e]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  );
  if (!session) return null;

  const name = user?.name || session.user?.name || "Student";
  const xp = user?.xp || 0;
  const streak = user?.streak || 0;
  const completedCourses = user?.completedCourses?.length || 0;
  const completedTests = user?.completedTests?.length || 0;
  const level = Math.floor(xp / 500) + 1;
  const xpToNext = 500 - (xp % 500);
  const earnedBadges: string[] = user?.badges || [];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const stats = [
    { icon: Flame, label: "Day Streak", value: `${streak}`, sub: "days" },
    { icon: Star, label: "XP Points", value: xp.toLocaleString(), sub: "earned" },
    { icon: BookOpen, label: "Courses", value: `${completedCourses}`, sub: "enrolled" },
    { icon: ClipboardList, label: "Tests", value: `${completedTests}`, sub: "taken" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <Navbar />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-cyan-600 via-cyan-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-cyan-200 text-sm mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              <h1 className="text-3xl font-extrabold">{greeting}, {name.split(" ")[0]}</h1>
              <p className="text-cyan-200 mt-1 text-sm">Ready to continue your learning journey?</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-white/10 backdrop-blur rounded-2xl px-5 py-3 text-center min-w-[80px]">
                <div className="text-2xl font-extrabold">{streak}</div>
                <div className="text-xs text-cyan-200 flex items-center gap-1 justify-center mt-0.5">
                  <Flame className="w-3 h-3" /> Streak
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl px-5 py-3 text-center min-w-[80px]">
                <div className="text-2xl font-extrabold">Lv.{level}</div>
                <div className="text-xs text-cyan-200 flex items-center gap-1 justify-center mt-0.5">
                  <Zap className="w-3 h-3" /> {xp} XP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-stagger">
          {stats.map(({ icon: Icon, label, value, sub }) => (
            <Card3D key={label}>
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight truncate">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400 truncate">{label}</div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
              <Target className="w-4 h-4 text-cyan-500" /> Quick Access
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map((c) => (
                <Card3D key={c.title}>
                  <Link href={c.href} className="block p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                        <c.icon className="w-4 h-4 text-cyan-500" />
                      </div>
                      <Badge variant="gray" className="text-xs flex-shrink-0">{c.badge}</Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5 truncate">{c.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1">
                      {c.desc} <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    </p>
                  </Link>
                </Card3D>
              ))}
            </div>
          </div>

          {/* Level + Badges */}
          <div className="space-y-4">

            {/* Level Progress */}
            <Card3D>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-500" />
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">Level {level}</span>
                  </div>
                  <span className="text-xs bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full font-medium">
                    Lv.{level}
                  </span>
                </div>
                <ProgressBar value={xp % 500} max={500} color="blue" />
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{xpToNext} XP to Level {level + 1}</p>
              </div>
            </Card3D>

            {/* Badges */}
            <Card3D>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-cyan-500" />
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">Badges</span>
                  <span className="ml-auto text-xs text-gray-400">{earnedBadges.length}/{allBadges.length}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {allBadges.map((b) => {
                    const earned = earnedBadges.includes(b.key);
                    return (
                      <div
                        key={b.name}
                        title={b.desc}
                        className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                          earned
                            ? "border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20"
                            : "border-gray-100 dark:border-gray-800 opacity-40 grayscale"
                        }`}
                      >
                        <span className="text-lg mb-0.5">{b.icon}</span>
                        <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 leading-tight text-center">{b.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card3D>
          </div>
        </div>

        {/* ── Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card3D>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-cyan-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Weekly XP Activity</h3>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "11px" }} />
                  <Area type="monotone" dataKey="xp" stroke="#06b6d4" strokeWidth={2} fill="url(#xpGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card3D>

          <Card3D>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-cyan-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Courses This Week</h3>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={activityData} barSize={24}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "11px" }} />
                  <Bar dataKey="courses" fill="#06b6d4" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card3D>
        </div>

        {/* ── Track Record ── */}
        <Card3D>
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-cyan-500" /> Your Track Record
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {completedCourses} courses · {completedTests} tests · {user?.appliedJobs?.length || 0} jobs applied
              </p>
            </div>
            <Link href="/progress" className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap flex-shrink-0">
              View Progress <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </Card3D>

      </div>
    </div>
  );
}
