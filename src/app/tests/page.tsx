"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  ClipboardList, XCircle, AlertTriangle, Loader2,
  Timer, Trophy, Target, Zap, Maximize, AlertOctagon, Globe, RefreshCw,
  Code, Brain, FlaskConical, BarChart2, BookOpen, Dna, FileText, Landmark,
} from "lucide-react";
import toast from "react-hot-toast";

type QuizState = "idle" | "taking" | "result";

const categoryConfig: Record<string, { icon: any; gradient: string }> = {
  Technology:  { icon: Code,         gradient: "from-blue-600 to-cyan-500"    },
  Aptitude:    { icon: Brain,        gradient: "from-purple-600 to-violet-500" },
  Science:     { icon: FlaskConical, gradient: "from-green-600 to-emerald-500" },
  Commerce:    { icon: BarChart2,    gradient: "from-orange-600 to-amber-500"  },
  Language:    { icon: BookOpen,     gradient: "from-pink-600 to-rose-500"     },
  JEE:         { icon: Zap,          gradient: "from-blue-700 to-indigo-600"   },
  NEET:        { icon: Dna,          gradient: "from-green-700 to-teal-600"    },
  SSC:         { icon: FileText,     gradient: "from-orange-700 to-amber-600"  },
  UPSC:        { icon: Landmark,     gradient: "from-red-700 to-rose-600"      },
  default:     { icon: ClipboardList,gradient: "from-purple-600 to-indigo-500" },
};

const getCategoryConfig = (cat: string) => categoryConfig[cat] || categoryConfig.default;

const LIVE_CATEGORIES = ["General Knowledge", "Science", "Mathematics", "Technology", "History", "Geography", "Sports", "Music"];
const DIFFICULTIES = ["easy", "medium", "hard"];

export default function TestsPage() {
  const { data: session } = useSession();
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [activeTest, setActiveTest] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveCategory, setLiveCategory] = useState("General Knowledge");
  const [liveDifficulty, setLiveDifficulty] = useState("medium");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const answersRef = useRef<Record<number, number>>({});
  const activeTestRef = useRef<any>(null);
  const quizStateRef = useRef<QuizState>("idle");

  useEffect(() => { answersRef.current = answers; }, [answers]);
  useEffect(() => { activeTestRef.current = activeTest; }, [activeTest]);
  useEffect(() => { quizStateRef.current = quizState; }, [quizState]);

  useEffect(() => {
    fetch("/api/tests")
      .then((r) => r.json())
      .then((data) => { setTests(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { toast.error("Failed to load tests"); setLoading(false); });
  }, []);

  const enterFullscreen = () => {
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    } catch {}
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
  };

  const autoSubmit = useCallback(async (reason: "timeout" | "fullscreen") => {
    if (quizStateRef.current !== "taking") return;
    if (timerRef.current) clearTimeout(timerRef.current);
    exitFullscreen();
    if (reason === "fullscreen") {
      toast.error("You exited fullscreen — test auto-submitted!", { duration: 4000 });
    } else {
      toast.error("Time's up! Auto-submitting...");
    }
    const test = activeTestRef.current;
    const currentAnswers = answersRef.current;
    if (!test) return;
    try {
      const body: any = { testId: test._id, answers: currentAnswers };
      if (test.isLive) {
        body.questions = test.questions;
        body.passingScore = test.passingScore;
      }
      const res = await fetch("/api/tests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
      setQuizState("result");
    } catch {
      toast.error("Submission failed");
      setQuizState("idle");
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement && quizStateRef.current === "taking") autoSubmit("fullscreen");
    };
    const handleVisibility = () => {
      if (document.hidden && quizStateRef.current === "taking") autoSubmit("fullscreen");
    };
    const handleBlur = () => {
      if (quizStateRef.current === "taking") autoSubmit("fullscreen");
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, [autoSubmit]);

  useEffect(() => {
    if (quizState === "taking" && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (quizState === "taking" && timeLeft === 0 && activeTest) {
      autoSubmit("timeout");
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [quizState, timeLeft, activeTest, autoSubmit]);

  const startTest = async (test: any) => {
    try {
      const res = await fetch(`/api/tests/${test._id}`);
      const fullTest = await res.json();
      setActiveTest(fullTest);
      setAnswers({});
      setCurrent(0);
      setTimeLeft((fullTest.duration || 20) * 60);
      setQuizState("taking");
      enterFullscreen();
    } catch {
      toast.error("Failed to load test. Please try again.");
    }
  };

  const startLiveQuiz = async () => {
    setLiveLoading(true);
    try {
      const url = `/api/tests/live?category=${encodeURIComponent(liveCategory)}&difficulty=${liveDifficulty}&amount=10`;
      const res = await fetch(url);
      const liveTest = await res.json();
      if (!res.ok) throw new Error(liveTest.error);
      setActiveTest(liveTest);
      setAnswers({});
      setCurrent(0);
      setTimeLeft((liveTest.duration || 15) * 60);
      setQuizState("taking");
      enterFullscreen();
    } catch {
      toast.error("Failed to load live quiz. Try again.");
    } finally {
      setLiveLoading(false);
    }
  };

  const submitTest = async () => {
    if (!activeTest) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    exitFullscreen();
    setSubmitting(true);
    try {
      const body: any = { testId: activeTest._id, answers };
      // For live quizzes, send questions so server can score without DB lookup
      if (activeTest.isLive) {
        body.questions = activeTest.questions;
        body.passingScore = activeTest.passingScore;
      }
      const res = await fetch("/api/tests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
      setQuizState("result");
    } catch (err: any) {
      toast.error(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const q = activeTest?.questions?.[current];
  const progress = activeTest ? ((current + 1) / activeTest.questions.length) * 100 : 0;
  const timerColor = timeLeft < 60 ? "text-red-500" : timeLeft < 180 ? "text-yellow-500" : "text-gray-600 dark:text-gray-300";
  const timerBg = timeLeft < 60 ? "bg-red-50 dark:bg-red-900/20" : timeLeft < 180 ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-gray-100 dark:bg-gray-800";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-200 mb-3">Test & Assessment</span>
          <h1 className="text-4xl font-extrabold mb-2">Test & Assessment</h1>
          <p className="text-purple-100 text-lg mb-4">MCQ quizzes with timer, scoring & weak area detection</p>
          <div className="flex flex-wrap gap-6 text-sm text-purple-100">
            <span className="flex items-center gap-1.5"><ClipboardList className="w-4 h-4" /> {tests.length} Practice Tests</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Live Quiz from OpenTDB</span>
            <span className="flex items-center gap-1.5"><Timer className="w-4 h-4" /> Timed Quizzes</span>
            <span className="flex items-center gap-1.5"><Target className="w-4 h-4" /> Weak Area Analysis</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Earn XP</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Live Quiz Section */}
        <div className="mb-10 rounded-2xl border border-purple-100 dark:border-purple-900/30 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(147,51,234,0.05), rgba(99,102,241,0.05))" }}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-5 h-5 text-purple-500" />
              <h2 className="font-bold text-gray-900 dark:text-white text-lg">Live Quiz</h2>
              <span className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">Fresh questions every time — powered by Open Trivia Database. No two quizzes are the same!</p>
            <div className="flex flex-wrap gap-3 items-end">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Category</label>
                <select
                  value={liveCategory}
                  onChange={(e) => setLiveCategory(e.target.value)}
                  className="input py-2 text-sm"
                  style={{ minWidth: 180 }}
                >
                  {LIVE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Difficulty</label>
                <select
                  value={liveDifficulty}
                  onChange={(e) => setLiveDifficulty(e.target.value)}
                  className="input py-2 text-sm"
                  style={{ minWidth: 120 }}
                >
                  {DIFFICULTIES.map((d) => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
                </select>
              </div>
              <button
                onClick={startLiveQuiz}
                disabled={liveLoading}
                className="btn-primary flex items-center gap-2 py-2.5"
              >
                {liveLoading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
                  : <><RefreshCw className="w-4 h-4" /> Start Live Quiz</>
                }
              </button>
            </div>
          </div>
        </div>

        {/* Practice Tests */}
        <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2 text-lg">
          <ClipboardList className="w-5 h-5 text-purple-500" /> Practice Tests
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
            <p className="text-gray-400 text-sm">Loading tests...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => {
              const cfg = getCategoryConfig(test.category);
              const Icon = cfg.icon;
              return (
                <Card key={test._id} className="flex flex-col p-0 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  {/* Banner with Lucide icon */}
                  <div className={`relative h-28 bg-gradient-to-br ${cfg.gradient} flex items-center justify-between px-6 overflow-hidden`}>
                    {/* Dot pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                    {/* Icon */}
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Question count */}
                    <div className="relative z-10 text-right text-white">
                      <div className="text-3xl font-extrabold">{test.questions?.length || 0}</div>
                      <div className="text-xs opacity-80">Questions</div>
                    </div>
                    {/* Shine */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="gray">{test.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{test.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">{test.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{test.questions?.length || 0}</div>
                        <div className="text-xs text-gray-400">Questions</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{test.duration}m</div>
                        <div className="text-xs text-gray-400">Duration</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                        <div className="text-sm font-bold text-green-600">{test.passingScore}%</div>
                        <div className="text-xs text-gray-400">Pass Mark</div>
                      </div>
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-3">
                      <AlertOctagon className="w-3.5 h-3.5 flex-shrink-0" />
                      Exiting fullscreen will auto-submit the test
                    </p>
                    <button onClick={() => startTest(test)} className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
                      <Maximize className="w-4 h-4" /> Start Test (Fullscreen)
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Quiz Modal */}
      <Modal open={quizState === "taking"} onClose={() => {}} className="max-w-2xl">
        {activeTest && q && (
          <div>
            <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-3 py-2 mb-4 text-xs text-amber-700 dark:text-amber-400">
              <AlertOctagon className="w-4 h-4 flex-shrink-0" />
              <span>Stay in fullscreen. Exiting or <strong>switching tabs</strong> will <strong>auto-submit</strong> immediately.</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[200px]">{activeTest.title}</span>
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1.5 text-sm font-mono font-bold px-3 py-1 rounded-lg ${timerBg} ${timerColor}`}>
                  <Timer className="w-4 h-4" />{formatTime(timeLeft)}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                  {current + 1} / {activeTest.questions.length}
                </span>
              </div>
            </div>
            <ProgressBar value={progress} className="mb-6" />

            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{q.topic}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 capitalize">{q.difficulty}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 leading-snug">{q.question}</h3>

            <div className="space-y-3 mb-6">
              {q.options.map((opt: string, j: number) => (
                <button
                  key={j}
                  onClick={() => setAnswers({ ...answers, [current]: j })}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all text-sm ${
                    answers[current] === j
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-medium"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="inline-flex w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center text-xs font-bold mr-3">
                    {String.fromCharCode(65 + j)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              {current > 0 && (
                <button className="btn-secondary flex-1 py-2.5" onClick={() => setCurrent(current - 1)}>Previous</button>
              )}
              {current < activeTest.questions.length - 1 ? (
                <button
                  className="btn-primary flex-1 py-2.5"
                  onClick={() => setCurrent(current + 1)}
                  disabled={answers[current] === undefined}
                >
                  Next
                </button>
              ) : (
                <button
                  className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2"
                  onClick={submitTest}
                  disabled={submitting}
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Submit Test"}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
              {activeTest.questions.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-7 h-7 rounded-full text-xs font-medium transition-all ${
                    i === current
                      ? "bg-purple-600 text-white"
                      : answers[i] !== undefined
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Result Modal */}
      <Modal open={quizState === "result"} onClose={() => setQuizState("idle")} title="Test Results">
        {result && (
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${result.passed ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
              {result.passed
                ? <Trophy className="w-12 h-12 text-green-600" />
                : <XCircle className="w-12 h-12 text-red-500" />
              }
            </div>
            <div className="text-6xl font-extrabold text-gray-900 dark:text-white mb-1">{result.score}%</div>
            <p className="text-gray-500 mb-1 text-lg">{result.correct} / {result.total} correct</p>
            {session && (
              <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-3 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4" /> +{Math.round(result.score / 10)} XP earned!
              </p>
            )}
            <Badge variant={result.passed ? "success" : "danger"} className="mb-6 text-sm px-4 py-1">
              {result.passed ? "Passed!" : "Failed — Try Again"}
            </Badge>

            {result.weakAreas?.length > 0 && (
              <div className="text-left bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3 text-yellow-700 dark:text-yellow-400 font-semibold text-sm">
                  <AlertTriangle className="w-4 h-4" /> Focus on these weak areas
                </div>
                {result.weakAreas.map((w: any) => (
                  <div key={w.topic} className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span className="font-medium">{w.topic}</span>
                      <span className={w.accuracy < 50 ? "text-red-500" : "text-yellow-600"}>{w.accuracy}%</span>
                    </div>
                    <ProgressBar value={w.accuracy} color={w.accuracy < 50 ? "yellow" : "green"} />
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button className="btn-secondary flex-1 py-2.5" onClick={() => setQuizState("idle")}>Back to Tests</button>
              {activeTest && (
                <button className="btn-primary flex-1 py-2.5" onClick={() => { setQuizState("idle"); setTimeout(() => startTest(activeTest), 100); }}>
                  Retry Test
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
