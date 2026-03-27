"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  BookOpen, ClipboardList, Briefcase, Trophy, Flame, Star, Zap,
  TrendingUp, CheckCircle, Lock, ArrowRight, Loader2, User, GraduationCap
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

const allBadges = [
  { icon: "🔥", name: "7-Day Streak", desc: "Log in 7 days in a row", key: "7-Day Streak" },
  { icon: "📚", name: "First Course", desc: "Enroll in your first course", key: "First Course" },
  { icon: "🎯", name: "Quiz Master", desc: "Score 90%+ on any test", key: "Quiz Master" },
  { icon: "💼", name: "Job Seeker", desc: "Apply to your first job", key: "Job Seeker" },
  { icon: "🏆", name: "Course Explorer", desc: "Complete 5 courses", key: "Course Explorer" },
  { icon: "⚡", name: "Speed Learner", desc: "Complete 3 courses in a week", key: "Speed Learner" },
  { icon: "🌟", name: "Top Scorer", desc: "Score 100% on any test", key: "Top Scorer" },
  { icon: "🚀", name: "Career Ready", desc: "Apply to 5 jobs", key: "Career Ready" },
];

const categoryColors: Record<string, string> = {
  Technology: "from-blue-500 to-cyan-400",
  Science: "from-green-500 to-emerald-400",
  Business: "from-orange-500 to-amber-400",
  Arts: "from-pink-500 to-rose-400",
  Commerce: "from-purple-500 to-violet-400",
  Health: "from-red-500 to-pink-400",
  default: "from-primary-500 to-primary-400",
};
const categoryIcons: Record<string, string> = {
  Technology: "💻", Science: "🔬", Business: "📊", Arts: "🎨",
  Commerce: "💰", Health: "🩺", default: "📚",
};

export default function ProgressPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    Promise.all([
      fetch("/api/user").then((r) => r.json()),
      fetch("/api/courses").then((r) => r.json()),
      fetch("/api/jobs").then((r) => r.json()),
    ]).then(([userData, coursesData, jobsData]) => {
      setUser(userData);
      setCourses(Array.isArray(coursesData) ? coursesData : []);
      setJobs(Array.isArray(jobsData) ? jobsData : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [session]);

  if (status === "loading" || loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
        <p className="text-gray-400 text-sm">Loading your progress...</p>
      </div>
    </div>
  );
  if (!session || !user) return null;

  const xp = user.xp || 0;
  const streak = user.streak || 0;
  const level = Math.floor(xp / 500) + 1;
  const xpInLevel = xp % 500;
  const xpToNext = 500 - xpInLevel;
  const earnedBadges: string[] = user.badges || [];
  const completedCourseIds: string[] = user.completedCourses || [];
  const completedTestIds: string[] = user.completedTests || [];
  const appliedJobIds: string[] = user.appliedJobs || [];

  // Match enrolled courses from DB
  const enrolledCourses = courses.filter((c) => completedCourseIds.includes(c._id));
  const appliedJobsList = jobs.filter((j) => appliedJobIds.includes(j._id));

  // Category breakdown for radar chart
  const categoryMap: Record<string, number> = {};
  enrolledCourses.forEach((c) => {
    categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
  });
  const radarData = ["Technology", "Science", "Business", "Arts", "Commerce", "Health"].map((cat) => ({
    subject: cat,
    value: categoryMap[cat] || 0,
    fullMark: 5,
  }));

  const totalXpFromCourses = completedCourseIds.length * 50;
  const totalXpFromTests = completedTestIds.length * 10;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold mb-1">My Progress 📈</h1>
              <p className="text-primary-200 text-lg">Your complete learning track record</p>
            </div>
            {/* Profile Summary */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-primary-200 text-sm">{user.educationLevel} · Level {level}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-primary-200">
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {streak} day streak</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {xp} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Courses Enrolled", value: completedCourseIds.length, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { icon: ClipboardList, label: "Tests Taken", value: completedTestIds.length, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
            { icon: Briefcase, label: "Jobs Applied", value: appliedJobIds.length, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
            { icon: Trophy, label: "Badges Earned", value: earnedBadges.length, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <Card key={label} className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${bg} ${color} flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Level & XP */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-bold text-gray-900 dark:text-white">Level Progress</h3>
            </div>
            <div className="text-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
                <span className="text-white font-extrabold text-2xl">{level}</span>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Level {level}</p>
              <p className="text-xs text-gray-400">{xpToNext} XP to Level {level + 1}</p>
            </div>
            <ProgressBar value={xpInLevel} max={500} color="blue" showLabel />
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                <div className="font-bold text-blue-600">{totalXpFromCourses}</div>
                <div className="text-xs text-gray-400">XP from Courses</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3">
                <div className="font-bold text-purple-600">{totalXpFromTests}</div>
                <div className="text-xs text-gray-400">XP from Tests</div>
              </div>
            </div>
          </Card>

          {/* Skill Radar */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Skills Breakdown</h3>
            </div>
            {enrolledCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <BookOpen className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm">Enroll in courses to see your skill breakdown</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </Card>

          {/* Badges */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">Badges</h3>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                {earnedBadges.length}/{allBadges.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {allBadges.map((b) => {
                const earned = earnedBadges.includes(b.key);
                return (
                  <div
                    key={b.key}
                    title={b.desc}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                      earned
                        ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-800"
                        : "border-gray-100 dark:border-gray-800 opacity-40"
                    }`}
                  >
                    <span className="text-lg">{earned ? b.icon : "🔒"}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight">{b.name}</p>
                      <p className="text-xs text-gray-400 leading-tight">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Enrolled Courses ({completedCourseIds.length})</h3>
            </div>
            <Link href="/learn" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
              Browse more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
              <p className="text-gray-500 font-medium">No courses enrolled yet</p>
              <p className="text-gray-400 text-sm mb-4">Start learning to track your progress here</p>
              <Link href="/learn" className="btn-primary text-sm px-6 py-2.5 inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.map((course) => {
                const grad = categoryColors[course.category] || categoryColors.default;
                const icon = categoryIcons[course.category] || categoryIcons.default;
                return (
                  <div key={course._id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{course.title}</p>
                      <p className="text-xs text-gray-400">{course.category} · {course.level}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">Enrolled · +50 XP</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Applied Jobs */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Applied Jobs ({appliedJobIds.length})</h3>
            </div>
            <Link href="/jobs" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
              Find more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {appliedJobsList.length === 0 ? (
            <div className="text-center py-10">
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
              <p className="text-gray-500 font-medium">No jobs applied yet</p>
              <p className="text-gray-400 text-sm mb-4">Apply to internships and jobs to track them here</p>
              <Link href="/jobs" className="btn-primary text-sm px-6 py-2.5 inline-flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {appliedJobsList.map((job, idx) => (
                <div key={job._id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                    {job.company?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{job.title}</p>
                    <p className="text-xs text-gray-400">{job.company} · {job.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Applied</span>
                    </div>
                  </div>
                  <Badge variant="default" className="capitalize text-xs flex-shrink-0">{job.type}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Tests Taken */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Tests Taken ({completedTestIds.length})</h3>
            </div>
            <Link href="/tests" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
              Take more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {completedTestIds.length === 0 ? (
            <div className="text-center py-10">
              <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
              <p className="text-gray-500 font-medium">No tests taken yet</p>
              <p className="text-gray-400 text-sm mb-4">Take quizzes to test your knowledge and earn XP</p>
              <Link href="/tests" className="btn-primary text-sm px-6 py-2.5 inline-flex items-center gap-2">
                <ClipboardList className="w-4 h-4" /> Take a Test
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {completedTestIds.map((testId, i) => (
                <div key={testId} className="flex flex-col items-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 text-center">
                  <ClipboardList className="w-6 h-6 text-purple-500 mb-2" />
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Test #{i + 1}</p>
                  <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Completed
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Next Steps */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/10 dark:to-purple-900/10 rounded-2xl p-6 border border-primary-100 dark:border-primary-900/20">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary-600" /> What to do next
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/learn", icon: BookOpen, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20", title: "Keep Learning", desc: "Enroll in more courses to earn XP and badges" },
              { href: "/tests", icon: ClipboardList, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20", title: "Test Yourself", desc: "Take quizzes to identify and fix weak areas" },
              { href: "/jobs", icon: Briefcase, color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20", title: "Apply to Jobs", desc: "Find internships that match your skills" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className={`p-2.5 rounded-xl ${item.color} flex-shrink-0`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
