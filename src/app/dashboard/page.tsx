"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { BookOpen, ClipboardList, Compass, Briefcase, Flame, Star, Trophy, TrendingUp, FileText, Zap, Target, ChevronRight, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const quickLinks = [
  { icon: BookOpen, title: "Learning Platform", desc: "Continue your courses", href: "/learn", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20", badge: "500+ Courses", gradient: "from-blue-500 to-cyan-400" },
  { icon: ClipboardList, title: "Test & Assessment", desc: "Take a quiz, track progress", href: "/tests", color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20", badge: "Adaptive AI", gradient: "from-purple-500 to-violet-400" },
  { icon: Compass, title: "Career Guidance", desc: "Explore career paths", href: "/career", color: "text-green-600 bg-green-50 dark:bg-green-900/20", badge: "AI Powered", gradient: "from-green-500 to-emerald-400" },
  { icon: Briefcase, title: "Job Opportunities", desc: "Find internships & jobs", href: "/jobs", color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20", badge: "1000+ Jobs", gradient: "from-orange-500 to-amber-400" },
  { icon: FileText, title: "Resume Builder", desc: "Build your resume", href: "/resume", color: "text-pink-600 bg-pink-50 dark:bg-pink-900/20", badge: "Live Preview", gradient: "from-pink-500 to-rose-400" },
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
  { icon: "🏆", name: "Course Explorer", desc: "Complete 5 courses", key: "Course Explorer" },
  { icon: "⚡", name: "Speed Learner", desc: "Complete 3 courses in a week", key: "Speed Learner" },
];



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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-primary-200 text-sm mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              <h1 className="text-3xl font-extrabold">{greeting}, {name.split(" ")[0]} 👋</h1>
              <p className="text-primary-200 mt-1">Ready to continue your learning journey?</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-extrabold">{streak}</div>
                <div className="text-xs text-primary-200 flex items-center gap-1 justify-center"><Flame className="w-3 h-3" /> Day Streak</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-extrabold">Lv.{level}</div>
                <div className="text-xs text-primary-200 flex items-center gap-1 justify-center"><Zap className="w-3 h-3" /> {xp} XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Flame, label: "Day Streak", value: streak, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20", suffix: streak === 1 ? " day" : " days" },
            { icon: Star, label: "XP Points", value: xp.toLocaleString(), color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20", suffix: "" },
            { icon: BookOpen, label: "Courses Done", value: completedCourses, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", suffix: "" },
            { icon: ClipboardList, label: "Tests Taken", value: completedTests, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", suffix: "" },
          ].map(({ icon: Icon, label, value, color, bg, suffix }) => (
            <Card key={label} className="flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-xl ${bg} ${color} flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}{suffix}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-600" /> Quick Access
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map((c) => (
                <Link key={c.title} href={c.href}>
                  <Card hover className="h-full group">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-xl ${c.color}`}>
                        <c.icon className="w-5 h-5" />
                      </div>
                      <Badge variant="gray" className="text-xs">{c.badge}</Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-0.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{c.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      {c.desc} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Badges + Level */}
          <div className="space-y-4">
            {/* Level Progress */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Level {level}</h3>
                </div>
                <Badge variant="default">Level {level}</Badge>
              </div>
              <ProgressBar value={xp % 500} max={500} color="blue" showLabel />
              <p className="text-xs text-gray-500 mt-2">{xpToNext} XP to Level {level + 1}</p>
            </Card>

            {/* Badges */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Badges</h3>
                <span className="ml-auto text-xs text-gray-400">{earnedBadges.length}/{allBadges.length} earned</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {allBadges.map((b) => {
                  const earned = earnedBadges.includes(b.key);
                  return (
                    <div
                      key={b.name}
                      title={b.desc}
                      className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition-all ${
                        earned
                          ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-800"
                          : "border-gray-100 dark:border-gray-800 opacity-40 grayscale"
                      }`}
                    >
                      <span className="text-xl mb-1">{b.icon}</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">{b.name}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Activity Chart */}
          <Card>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Weekly XP Activity</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "12px" }} />
                <Area type="monotone" dataKey="xp" stroke="#3b82f6" strokeWidth={2.5} fill="url(#xpGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Courses per day */}
          <Card>
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Courses This Week</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={activityData} barSize={28}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "12px" }} />
                <Bar dataKey="courses" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Track Record CTA */}
        <Card className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/10 dark:to-purple-900/10 border-primary-100 dark:border-primary-900/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" /> Your Track Record
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {completedCourses} courses enrolled · {completedTests} tests taken · {user?.appliedJobs?.length || 0} jobs applied
              </p>
            </div>
            <Link href="/progress" className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap">
              View Full Progress <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
