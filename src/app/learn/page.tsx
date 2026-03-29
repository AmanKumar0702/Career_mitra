"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Star, Users, Clock, BookOpen, CheckCircle,
  Loader2, Play, TrendingUp, Award, Zap, ChevronRight,
  GraduationCap, Code, FlaskConical, Calculator, Globe,
  Briefcase, Palette, Heart, SlidersHorizontal, X,
} from "lucide-react";
import { categories } from "@/data/courses";
import toast from "react-hot-toast";

type CourseLevel = "beginner" | "intermediate" | "advanced";

const levelConfig: Record<CourseLevel, { label: string; color: string; bg: string }> = {
  beginner:     { label: "Beginner",     color: "#22c55e", bg: "rgba(34,197,94,0.1)"  },
  intermediate: { label: "Intermediate", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  advanced:     { label: "Advanced",     color: "#ef4444", bg: "rgba(239,68,68,0.1)"  },
};

const categoryConfig: Record<string, { icon: any; gradient: string; accent: string }> = {
  Technology:  { icon: Code,         gradient: "from-blue-600 to-cyan-500",     accent: "#06b6d4" },
  Mathematics: { icon: Calculator,   gradient: "from-violet-600 to-purple-500", accent: "#8b5cf6" },
  Science:     { icon: FlaskConical, gradient: "from-green-600 to-emerald-500", accent: "#10b981" },
  Physics:     { icon: Zap,          gradient: "from-yellow-500 to-orange-500", accent: "#f59e0b" },
  Chemistry:   { icon: FlaskConical, gradient: "from-teal-600 to-cyan-500",     accent: "#14b8a6" },
  Biology:     { icon: Heart,        gradient: "from-pink-600 to-rose-500",     accent: "#ec4899" },
  English:     { icon: Globe,        gradient: "from-indigo-600 to-blue-500",   accent: "#6366f1" },
  Business:    { icon: Briefcase,    gradient: "from-orange-600 to-amber-500",  accent: "#f97316" },
  Design:      { icon: Palette,      gradient: "from-pink-600 to-fuchsia-500",  accent: "#d946ef" },
  Commerce:    { icon: TrendingUp,   gradient: "from-emerald-600 to-teal-500",  accent: "#059669" },
  default:     { icon: BookOpen,     gradient: "from-slate-600 to-slate-500",   accent: "#64748b" },
};

const getCfg = (cat: string) => categoryConfig[cat] || categoryConfig.default;

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
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
  const [showFilters, setShowFilters] = useState(false);
  const [levelFilter, setLevelFilter] = useState("All");

  useEffect(() => {
    const url = activeCategory !== "All"
      ? `/api/courses?category=${encodeURIComponent(activeCategory)}`
      : "/api/courses";
    setLoading(true);
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setCourses(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { toast.error("Failed to load courses"); setLoading(false); });
  }, [activeCategory]);

  useEffect(() => {
    if (session) fetch("/api/user").then((r) => r.json()).then(setUserProfile).catch(() => {});
  }, [session]);

  const isEnrolled = (id: string) => userProfile?.completedCourses?.includes(id);

  const handleEnroll = async (e: React.MouseEvent, course: any) => {
    e.stopPropagation();
    if (!session) { toast.error("Please sign in to enroll"); return; }
    if (isEnrolled(course._id)) { router.push(`/learn/${course._id}`); return; }
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
      toast.success("Enrolled! +50 XP");
      router.push(`/learn/${course._id}`);
    } catch (err: any) {
      toast.error(err.message || "Enrollment failed");
    } finally {
      setEnrolling(null);
    }
  };

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) ||
      (c.tags || []).some((t: string) => t.toLowerCase().includes(q)) ||
      c.category?.toLowerCase().includes(q);
    const matchLevel = levelFilter === "All" || c.level === levelFilter.toLowerCase();
    return matchSearch && matchLevel;
  });

  const completedCount = userProfile?.completedCourses?.length || 0;
  const xp = userProfile?.xp || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-2xl"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4 block">
                Learning Platform
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight">
                Expand Your Knowledge
              </h1>
              <p className="text-blue-200 text-lg mb-6 leading-relaxed">
                Structured courses from Class 1 to Graduate level. Learn at your own pace, earn XP, and build your career.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-blue-200">
                {[
                  { icon: BookOpen, text: `${courses.length || "500"}+ Courses` },
                  { icon: Users,    text: "50,000+ Students" },
                  { icon: Award,    text: "Free Certificates" },
                  { icon: Zap,      text: "Earn XP" },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.span
                    key={text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-1.5"
                  >
                    <Icon className="w-4 h-4 text-blue-400" /> {text}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {userProfile && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-w-[220px]"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-300 font-medium">Your Progress</p>
                    <p className="text-white font-bold text-sm">{userProfile.name?.split(" ")[0] || "Student"}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-blue-300 mb-1">
                      <span>Courses Enrolled</span>
                      <span className="text-white font-semibold">{completedCount}</span>
                    </div>
                    <ProgressBar value={completedCount} max={10} color="blue" />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-blue-300">Total XP</span>
                    <span className="text-yellow-400 font-bold text-sm flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> {xp.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="input pl-11 py-3"
              placeholder="Search courses, topics, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
              showFilters
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-[#0f172a] border-gray-200 dark:border-[#1e293b] text-gray-600 dark:text-slate-400 hover:border-blue-400"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </motion.button>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden mb-6"
            >
              <div className="p-4 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-[#1e293b]">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3">Level</p>
                <div className="flex gap-2 flex-wrap">
                  {["All", "Beginner", "Intermediate", "Advanced"].map((l) => (
                    <motion.button
                      key={l}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setLevelFilter(l)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        levelFilter === l
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-[#1e293b] text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-[#263548]"
                      }`}
                    >
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex gap-2 flex-wrap mb-8 pb-4 border-b border-gray-100 dark:border-[#1e293b]"
        >
          {categories.map((cat) => {
            const active = activeCategory === cat;
            const cfg = getCfg(cat);
            const Icon = cfg.icon;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white dark:bg-[#0f172a] text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-[#1e293b] hover:border-blue-400 dark:hover:border-blue-600"
                }`}
              >
                {cat !== "All" && <Icon className="w-3.5 h-3.5" />}
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Results count */}
        <AnimatePresence mode="wait">
          {!loading && (
            <motion.div
              key={`${activeCategory}-${levelFilter}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between mb-5"
            >
              <p className="text-sm text-gray-500 dark:text-slate-400">
                <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> courses
                {activeCategory !== "All" && <> in <span className="font-semibold text-blue-600 dark:text-blue-400">{activeCategory}</span></>}
                {levelFilter !== "All" && <> · <span className="font-semibold text-gray-700 dark:text-slate-300">{levelFilter}</span></>}
              </p>
              {(activeCategory !== "All" || levelFilter !== "All" || search) && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => { setActiveCategory("All"); setLevelFilter("All"); setSearch(""); }}
                  className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear filters
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-8 h-8 text-blue-500" />
            </motion.div>
            <p className="text-gray-400 text-sm">Loading courses...</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No courses found</h3>
            <p className="text-gray-400 text-sm">Try a different search or category</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course, i) => {
              const enrolled = isEnrolled(course._id);
              const cfg = getCfg(course.category);
              const Icon = cfg.icon;
              const lvl = levelConfig[course.level as CourseLevel];

              return (
                <motion.div
                  key={course._id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => router.push(`/learn/${course._id}`)}
                  className="group cursor-pointer bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-[#1e293b] overflow-hidden flex flex-col card-shine"
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                >
                  {/* Banner */}
                  <div className={`relative h-36 bg-gradient-to-br ${cfg.gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }} />
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    {enrolled && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-lg font-semibold">
                        <CheckCircle className="w-3 h-3" /> Enrolled
                      </div>
                    )}
                    {course.language && course.language !== "English" && (
                      <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                        {course.language}
                      </div>
                    )}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {lvl && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md"
                          style={{ background: lvl.bg, color: lvl.color }}>
                          {lvl.label}
                        </span>
                      )}
                      <span className="text-xs font-medium text-gray-400 dark:text-slate-500">{course.category}</span>
                      {course.featured && (
                        <span className="ml-auto text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-md">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 line-clamp-2 text-sm leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1 leading-relaxed">
                      {course.description}
                    </p>

                    {course.instructor && (
                      <p className="text-xs text-gray-400 dark:text-slate-500 mb-3 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        {course.instructor}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-slate-500 mb-4 pt-3 border-t border-gray-50 dark:border-[#1e293b]">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{course.rating}</span>
                        {course.reviewCount && <span>({course.reviewCount.toLocaleString()})</span>}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {(course.enrolledCount || 0).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 ml-auto">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => handleEnroll(e, course)}
                      disabled={enrolling === course._id}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        enrolled
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                          : "btn-primary"
                      }`}
                    >
                      {enrolling === course._id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : enrolled
                          ? <><CheckCircle className="w-4 h-4" /> Continue Learning</>
                          : <><Play className="w-4 h-4" /> Enroll Free</>
                      }
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-2xl overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-center text-white">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />
              <div className="relative">
                <TrendingUp className="w-10 h-10 mx-auto mb-3 text-blue-300" />
                <h3 className="text-xl font-bold mb-2">Keep Learning, Keep Growing</h3>
                <p className="text-blue-200 text-sm mb-5 max-w-md mx-auto">
                  Every course you complete earns XP and brings you closer to your career goal.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/dashboard")}
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-all text-sm"
                >
                  View My Progress <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
