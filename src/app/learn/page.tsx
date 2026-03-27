"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Search, Star, Users, Clock, BookOpen, CheckCircle, Loader2, Play, TrendingUp, Award } from "lucide-react";
import { categories } from "@/data/courses";
import toast from "react-hot-toast";

type CourseLevel = "beginner" | "intermediate" | "advanced";
const levelColor: Record<CourseLevel, "success" | "warning" | "danger"> = {
  beginner: "success", intermediate: "warning", advanced: "danger",
};

const categoryGradients: Record<string, string> = {
  Technology: "from-blue-500 to-cyan-400",
  Science: "from-green-500 to-emerald-400",
  Business: "from-orange-500 to-amber-400",
  Arts: "from-pink-500 to-rose-400",
  Commerce: "from-purple-500 to-violet-400",
  Health: "from-red-500 to-pink-400",
  Mathematics: "from-violet-500 to-purple-400",
  Physics: "from-sky-500 to-blue-400",
  Chemistry: "from-teal-500 to-green-400",
  Biology: "from-lime-500 to-green-400",
  English: "from-yellow-500 to-orange-400",
  default: "from-primary-500 to-primary-400",
};

const categoryIcons: Record<string, string> = {
  Technology: "💻", Science: "🔬", Business: "📊", Arts: "🎨",
  Commerce: "💰", Health: "🩺", Mathematics: "📐", Physics: "⚡",
  Chemistry: "🧪", Biology: "🧬", English: "📖", default: "📚",
};

export default function LearnPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);

  useEffect(() => {
    const url = activeCategory !== "All"
      ? `/api/courses?category=${encodeURIComponent(activeCategory)}`
      : "/api/courses";
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((data) => { setCourses(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { toast.error("Failed to load courses"); setLoading(false); });
  }, [activeCategory]);

  useEffect(() => {
    if (session) {
      fetch("/api/user").then((r) => r.json()).then(setUserProfile).catch(() => {});
    }
  }, [session]);

  const isEnrolled = (courseId: string) => userProfile?.completedCourses?.includes(courseId);

  const handleEnroll = async (course: any) => {
    if (!session) { toast.error("Please sign in to enroll"); return; }
    if (isEnrolled(course._id)) {
      router.push(`/learn/${course._id}`);
      return;
    }
    setEnrolling(course._id);
    try {
      const res = await fetch("/api/user/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUserProfile(data.user);
      toast.success(`Enrolled in "${course.title}"! +50 XP 🎉`);
      router.push(`/learn/${course._id}`);
    } catch (err: any) {
      toast.error(err.message || "Enrollment failed");
    } finally {
      setEnrolling(null);
    }
  };

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.title.toLowerCase().includes(q) ||
      (c.tags || []).some((t: string) => t.toLowerCase().includes(q)) ||
      c.category?.toLowerCase().includes(q);
  });

  const gradient = (cat: string) => categoryGradients[cat] || categoryGradients.default;
  const catIcon = (cat: string) => categoryIcons[cat] || categoryIcons.default;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Learning Platform 📚</h1>
              <p className="text-primary-100 text-lg">500+ courses across Science, Technology, Business & more</p>
              <div className="flex gap-6 mt-4 text-sm text-primary-100">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 500+ Courses</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 50,000+ Students</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> Free Certificates</span>
              </div>
            </div>
            {userProfile && (
              <div className="bg-white/10 backdrop-blur rounded-2xl p-5 min-w-[220px]">
                <p className="text-sm text-primary-100 mb-1">Your Learning Progress</p>
                <div className="text-3xl font-extrabold mb-2">{userProfile.completedCourses?.length || 0} <span className="text-lg font-normal text-primary-100">courses done</span></div>
                <ProgressBar value={userProfile.completedCourses?.length || 0} max={10} color="blue" />
                <p className="text-xs text-primary-200 mt-1.5">{userProfile.xp || 0} XP earned</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            className="input pl-12 py-3.5 text-base shadow-sm"
            placeholder="Search courses, topics, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-400"
              }`}
            >
              {cat !== "All" && <span className="mr-1">{catIcon(cat)}</span>}{cat}
            </button>
          ))}
        </div>

        {!loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> courses
            {activeCategory !== "All" && <> in <span className="font-semibold text-primary-600">{activeCategory}</span></>}
          </p>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
            <p className="text-gray-400 text-sm">Loading courses...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-200 dark:text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No courses found</h3>
            <p className="text-gray-400">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course) => {
              const enrolled = isEnrolled(course._id);
              const grad = gradient(course.category);
              const icon = catIcon(course.category);
              return (
                <Card key={course._id} className="flex flex-col p-0 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer" onClick={() => router.push(`/learn/${course._id}`)}>
                  <div className={`h-36 bg-gradient-to-br ${grad} flex items-center justify-center relative`}>
                    <span className="text-5xl">{icon}</span>
                    {enrolled && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                        <CheckCircle className="w-3 h-3" /> Enrolled
                      </div>
                    )}
                    {course.language && course.language !== "English" && (
                      <div className="absolute top-2 left-2 bg-black/30 text-white text-xs px-2 py-0.5 rounded-full">
                        {course.language}
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={levelColor[course.level as CourseLevel] ?? "default"} className="capitalize">{course.level}</Badge>
                      <Badge variant="gray">{course.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 text-sm leading-snug">{course.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 flex-1">{course.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3 border-t border-gray-100 dark:border-gray-800 pt-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{course.rating}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {(course.enrolledCount || 0).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleEnroll(course); }}
                      disabled={enrolling === course._id}
                      className={`w-full py-2 text-sm rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        enrolled
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                          : "btn-primary"
                      }`}
                    >
                      {enrolling === course._id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : enrolled
                          ? <><CheckCircle className="w-4 h-4" /> Continue</>
                          : <><Play className="w-4 h-4" /> Enroll Free</>
                      }
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="mt-12 text-center bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/10 dark:to-purple-900/10 rounded-2xl p-8 border border-primary-100 dark:border-primary-900/20">
            <TrendingUp className="w-10 h-10 text-primary-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Keep Learning, Keep Growing</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Every course you complete earns you XP and brings you closer to your career goal.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
