"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { BookOpen, ClipboardList, Compass, Briefcase, Flame, Star, Trophy, TrendingUp, FileText, Zap, Target, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { AnimatePresence } from "framer-motion";
import OnboardingModal from "@/components/ui/OnboardingModal";

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
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/user").then((r) => r.json()).then((data) => {
        setUser(data);
        // Show onboarding if new user (xp === 0 and no courses)
        if (!data.xp && !data.completedCourses?.length) {
          const seen = localStorage.getItem("onboarding_seen");
          if (!seen) {
            setShowOnboarding(true);
            localStorage.setItem("onboarding_seen", "1");
          }
        }
      }).catch(() => {});
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

      <AnimatePresence>
        {showOnboarding && (
          <OnboardingModal
            userName={name}
            onClose={() => setShowOnboarding(false)}
          />
        )}
      </AnimatePresence>

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

        {/* ── Daily Goal ── */}
        <Card3D>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-500" /> Daily Goal
              </h3>
              <span className="text-xs text-cyan-500 font-semibold">{Math.min(completedCourses, 3)}/3 tasks</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Enroll in a course", done: completedCourses > 0, xp: "+50 XP" },
                { label: "Take a test", done: completedTests > 0, xp: "+10 XP" },
                { label: "Visit Career Guidance", done: false, xp: "+5 XP" },
              ].map((task) => (
                <div key={task.label} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  task.done
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-gray-50 dark:bg-[#1e293b] border-gray-100 dark:border-[#263548]"
                }`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    task.done ? "bg-green-500 border-green-500" : "border-gray-300 dark:border-slate-600"
                  }`}>
                    {task.done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm flex-1 ${task.done ? "line-through text-gray-400" : "text-gray-700 dark:text-slate-300"}`}>{task.label}</span>
                  <span className="text-xs font-semibold text-cyan-500">{task.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </Card3D>

        {/* ── Recommended Courses ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" /> Recommended for You
            </h3>
            <Link href="/learn" className="text-xs text-cyan-500 hover:text-cyan-600 font-semibold flex items-center gap-1">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Python for Beginners", category: "Technology", level: "Beginner", xp: "+50 XP", color: "from-blue-500 to-cyan-500" },
              { title: "Class 10 Science (CBSE)", category: "Science", level: "Intermediate", xp: "+50 XP", color: "from-green-500 to-emerald-500" },
              { title: "Communication & Soft Skills", category: "Soft Skills", level: "Beginner", xp: "+50 XP", color: "from-purple-500 to-violet-500" },
            ].map((c) => (
              <Link key={c.title} href="/learn" className="group block">
                <Card3D>
                  <div className={`h-20 bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                    <BookOpen className="w-8 h-8 text-white/80" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">{c.category}</span>
                      <span className="ml-auto text-xs font-bold text-cyan-500">{c.xp}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-2">{c.title}</h4>
                    <span className="text-xs text-gray-400 mt-1 block">{c.level}</span>
                  </div>
                </Card3D>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
