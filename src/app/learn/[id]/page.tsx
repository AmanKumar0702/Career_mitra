"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ChevronLeft, ChevronRight, BookOpen, Clock, CheckCircle, Lock, Play, ArrowLeft, Star, Users, Loader2, Menu, X, Youtube, Award } from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import Certificate from "@/components/ui/Certificate";

export default function CourseStudyPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((r) => r.json())
      .then((data) => { setCourse(data); setLoading(false); })
      .catch(() => { toast.error("Failed to load course"); setLoading(false); });
  }, [id]);

  useEffect(() => {
    if (session) {
      fetch("/api/user").then((r) => r.json()).then((u) => {
        setEnrolled(u.completedCourses?.includes(id));
        setUserName(u.name || "Student");
        const saved = localStorage.getItem(`course-progress-${id}`);
        if (saved) setCompletedLessons(JSON.parse(saved));
      }).catch(() => {});
    }
  }, [session, id]);

  const handleEnroll = async () => {
    if (!session) { router.push("/auth/login"); return; }
    setEnrolling(true);
    try {
      const res = await fetch("/api/user/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setEnrolled(true);
      toast.success("Enrolled! +50 XP");
    } catch (err: any) {
      toast.error(err.message || "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };

  const markComplete = (index: number) => {
    if (completedLessons.includes(index)) return;
    const updated = [...completedLessons, index];
    setCompletedLessons(updated);
    localStorage.setItem(`course-progress-${id}`, JSON.stringify(updated));
      toast.success("Lesson completed");
    if (index < (course?.lessons?.length || 0) - 1) {
      setTimeout(() => setActiveLesson(index + 1), 500);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0f1e]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
        <p className="text-gray-400 text-sm">Loading course...</p>
      </div>
    </div>
  );

  if (!course || course.error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0f1e]">
      <div className="text-center">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Course not found</h2>
        <Link href="/learn" className="btn-primary text-sm px-6 py-2.5">Back to Courses</Link>
      </div>
    </div>
  );

  const lessons = course.lessons || [];
  const progress = lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0;
  const currentLesson = lessons[activeLesson];

  const grad = "from-cyan-600 to-indigo-600";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] flex flex-col">
      <Navbar />

      <AnimatePresence>
        {showCertificate && (
          <Certificate
            courseName={course.title}
            studentName={userName}
            date={new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </AnimatePresence>

      {/* Course Header */}
      <div className={`bg-gradient-to-r ${grad} text-white py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <Link href="/learn" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Courses
              </Link>
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">{course.title}</h1>
              <p className="text-white/80 text-sm mb-3 max-w-2xl">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />{course.rating}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{(course.enrolledCount || 0).toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{lessons.length} lessons</span>
                <Badge variant="default" className="bg-white/20 text-white border-0 capitalize">{course.level}</Badge>
              </div>
            </div>
            {!enrolled ? (
              <button onClick={handleEnroll} disabled={enrolling} className="flex-shrink-0 bg-white text-cyan-700 font-bold px-6 py-3 rounded-xl hover:bg-cyan-50 transition-all shadow-lg flex items-center gap-2 text-sm">
                {enrolling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {enrolling ? "Enrolling..." : "Enroll Free"}
              </button>
            ) : (
              <div className="bg-white/10 rounded-2xl px-5 py-3 text-center flex-shrink-0">
                <div className="text-2xl font-extrabold">{progress}%</div>
                <div className="text-xs text-white/70">Complete</div>
              </div>
            )}
          </div>
          {enrolled && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>{completedLessons.length} of {lessons.length} lessons done</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 relative">

          {/* Sidebar */}
          <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-[#0f172a] shadow-xl transition-transform lg:relative lg:inset-auto lg:shadow-none lg:z-auto lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#1e293b] lg:hidden">
              <span className="font-semibold text-gray-900 dark:text-white">Lessons</span>
              <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 border-b border-gray-100 dark:border-[#1e293b] hidden lg:block">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Course Content</h3>
              <p className="text-xs text-gray-400">{lessons.length} lessons · {course.duration}</p>
              {enrolled && <ProgressBar value={progress} className="mt-2" color="blue" />}
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              {lessons.map((lesson: any, i: number) => {
                const isCompleted = completedLessons.includes(i);
                const isActive = activeLesson === i;
                const isLocked = !enrolled && i > 0;
                return (
                  <button
                    key={i}
                    onClick={() => { if (!isLocked) { setActiveLesson(i); setSidebarOpen(false); } }}
                    disabled={isLocked}
                    className={`w-full text-left px-4 py-3.5 border-b border-gray-50 dark:border-[#1e293b] flex items-start gap-3 transition-all ${isActive ? "bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-l-cyan-500" : isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-[#1e293b]/50"}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${isCompleted ? "bg-green-100 dark:bg-green-900/30 text-green-600" : isActive ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : isLocked ? <Lock className="w-3 h-3" /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium leading-tight ${isActive ? "text-cyan-700 dark:text-cyan-400" : "text-gray-700 dark:text-gray-300"}`}>{lesson.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" />{lesson.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          {/* Lesson Content */}
          <main className="flex-1 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-2 text-sm font-medium btn-secondary py-2 px-4 mb-4">
              <Menu className="w-4 h-4" /> View All Lessons
            </button>

            {!enrolled && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3">
                <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">Enroll to unlock all lessons</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500">First lesson is free. Enroll to access all {lessons.length} lessons.</p>
                </div>
                <button onClick={handleEnroll} disabled={enrolling} className="btn-primary text-sm py-2 px-4 flex-shrink-0 flex items-center gap-2">
                  {enrolling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />} Enroll Free
                </button>
              </div>
            )}

            {currentLesson ? (
              <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-sm border border-gray-100 dark:border-[#1e293b] overflow-hidden">
                {/* Lesson Header */}
                <div className="p-6 border-b border-gray-100 dark:border-[#1e293b]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Lesson {activeLesson + 1} of {lessons.length}</span>
                    {completedLessons.includes(activeLesson) && (
                      <Badge variant="success" className="text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</Badge>
                    )}
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{currentLesson.title}</h2>
                  <p className="text-gray-400 text-sm mt-1 flex items-center gap-1"><Clock className="w-4 h-4" />{currentLesson.duration}</p>
                </div>

                {/* Lesson Body */}
                <div className="p-6 lg:p-8">
                  <div className="max-w-none space-y-4">
                    {currentLesson.content.split("\n\n").map((block: string, i: number) => {
                      if (block.startsWith("```")) {
                        const code = block.replace(/```\w*\n?/, "").replace(/```$/, "");
                        return (
                          <pre key={i} className="bg-gray-900 dark:bg-black text-green-400 rounded-xl p-5 overflow-x-auto text-sm font-mono leading-relaxed">
                            <code>{code.trim()}</code>
                          </pre>
                        );
                      }
                      if (block.startsWith("## ")) {
                        return <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2">{block.replace("## ", "")}</h3>;
                      }
                      if (block.startsWith("# ")) {
                        return <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2">{block.replace("# ", "")}</h2>;
                      }
                      if (block.startsWith("- ") || block.includes("\n- ")) {
                        const items = block.split("\n").filter((l) => l.startsWith("- "));
                        return (
                          <ul key={i} className="space-y-2 my-3">
                            {items.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                                {item.replace("- ", "")}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (block.startsWith("💡") || block.startsWith("⚠️") || block.startsWith("✅") || block.startsWith("📌")) {
                        return (
                          <div key={i} className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {block}
                          </div>
                        );
                      }
                      return block.trim() ? (
                        <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{block}</p>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* YouTube Videos */}
                {course.youtubeVideos && course.youtubeVideos.length > 0 && (
                  <div className="px-6 lg:px-8 pb-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-500" /> Recommended Videos
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.youtubeVideos.map((v: any, i: number) => (
                        <a
                          key={i}
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1e293b] rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group border border-gray-100 dark:border-[#1e293b]"
                        >
                          <span className="text-3xl flex-shrink-0">{v.thumbnail}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{v.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{v.channel} · {v.duration}</p>
                            <p className="text-xs text-gray-400">{v.views}</p>
                          </div>
                          <Youtube className="w-4 h-4 text-red-500 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lesson Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-[#1e293b] flex items-center justify-between gap-3 flex-wrap">
                  <button
                    onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
                    disabled={activeLesson === 0}
                    className="btn-secondary flex items-center gap-2 text-sm py-2.5 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <div className="flex items-center gap-3">
                    {enrolled && !completedLessons.includes(activeLesson) && (
                      <button onClick={() => markComplete(activeLesson)} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5">
                        <CheckCircle className="w-4 h-4" /> Mark Complete
                      </button>
                    )}
                    {activeLesson < lessons.length - 1 ? (
                      <button
                        onClick={() => setActiveLesson(activeLesson + 1)}
                        disabled={!enrolled && activeLesson >= 0}
                        className="btn-primary flex items-center gap-2 text-sm py-2.5 disabled:opacity-40"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : progress === 100 ? (
                      <button onClick={() => setShowCertificate(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                        <Award className="w-4 h-4" /> Get Certificate
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-12 text-center border border-gray-100 dark:border-[#1e293b]">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-200 dark:text-gray-700" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No lessons available yet</h3>
                <p className="text-gray-400 text-sm">Check back soon — content is being added.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
