"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Option {
  id: string;
  text: string;
}
interface Question {
  id: string;
  section: string;
  text: string;
  options: Option[];
  correctAnswer?: string; // only used after submission
  explanation?: string;
}
interface Test {
  id: string;
  title: string;
  duration: number; // seconds
  sections: string[];
  questions: Question[];
  negativeMarking: number; // e.g. 0.25
  marksPerQuestion: number;
}

type QStatus = "not-visited" | "not-answered" | "answered" | "marked" | "answered-marked";

// ─── Mock data (replace with your API call) ──────────────────────────────────
const MOCK_TEST: Test = {
  id: "mock-1",
  title: "General Intelligence & Reasoning Mock Test",
  duration: 45 * 60,
  sections: ["Reasoning", "Quantitative", "English"],
  negativeMarking: 0.25,
  marksPerQuestion: 1,
  questions: Array.from({ length: 25 }, (_, i) => ({
    id: `q${i + 1}`,
    section: ["Reasoning", "Quantitative", "English"][Math.floor(i / 9)] || "Reasoning",
    text: `Question ${i + 1}: ${[
      "Which number completes the series: 2, 6, 12, 20, 30, __?",
      "If A = 1, B = 2, ... Z = 26, find the value of LOGIC.",
      "A train travels 360 km in 4 hours. What is its speed in m/s?",
      "Choose the odd one out: Apple, Mango, Potato, Orange",
      "In a row of students, Ravi is 8th from left and 12th from right. Total students?",
    ][i % 5]}`,
    options: [
      { id: "a", text: ["42", "54", "25 m/s", "Potato", "19"][i % 5] },
      { id: "b", text: ["40", "60", "30 m/s", "Mango", "20"][i % 5] },
      { id: "c", text: ["38", "48", "20 m/s", "Apple", "21"][i % 5] },
      { id: "d", text: ["44", "50", "28 m/s", "Orange", "18"][i % 5] },
    ],
    correctAnswer: "a",
    explanation: "This is the explanation for question " + (i + 1),
  })),
};

// ─── Palette legend item ──────────────────────────────────────────────────────
const LEGEND = [
  { status: "answered", label: "Answered", bg: "bg-green-500" },
  { status: "not-answered", label: "Not Answered", bg: "bg-red-500" },
  { status: "not-visited", label: "Not Visited", bg: "bg-gray-300" },
  { status: "marked", label: "Marked for Review", bg: "bg-purple-600" },
  { status: "answered-marked", label: "Answered & Marked", bg: "bg-purple-400" },
];

function paletteBg(status: QStatus) {
  switch (status) {
    case "answered": return "bg-green-500 text-white border-green-600";
    case "not-answered": return "bg-red-500 text-white border-red-600";
    case "marked": return "bg-purple-600 text-white border-purple-700";
    case "answered-marked": return "bg-purple-400 text-white border-purple-500";
    default: return "bg-gray-200 text-gray-600 border-gray-300";
  }
}

// ─── Timer hook ───────────────────────────────────────────────────────────────
function useTimer(initial: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(initial);
  const ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    ref.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) { clearInterval(ref.current); onExpire(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, []);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return { remaining, formatted: fmt(remaining) };
}

// ─── Result screen ────────────────────────────────────────────────────────────
function ResultScreen({
  test, answers, onReview,
}: {
  test: Test;
  answers: Record<string, string>;
  onReview: () => void;
}) {
  const correct = test.questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const attempted = Object.keys(answers).length;
  const wrong = attempted - correct;
  const score = correct * test.marksPerQuestion - wrong * test.negativeMarking;
  const pct = Math.round((correct / test.questions.length) * 100);

  const ring = `conic-gradient(#22c55e ${pct}%, #e5e7eb ${pct}%)`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white">
          <h1 className="text-xl font-bold">{test.title}</h1>
          <p className="text-blue-200 text-sm mt-1">Test completed • Results</p>
        </div>

        {/* Score ring */}
        <div className="flex flex-col items-center py-8 border-b">
          <div className="relative w-36 h-36">
            <div
              className="w-36 h-36 rounded-full"
              style={{ background: ring }}
            />
            <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-gray-800">{score.toFixed(2)}</span>
              <span className="text-xs text-gray-400">/ {test.questions.length}</span>
            </div>
          </div>
          <p className="mt-3 text-lg font-semibold text-gray-700">{pct}% Score</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y border-b">
          {[
            { label: "Total Questions", value: test.questions.length, color: "text-gray-800" },
            { label: "Attempted", value: attempted, color: "text-blue-600" },
            { label: "Correct", value: correct, color: "text-green-600" },
            { label: "Wrong", value: wrong, color: "text-red-500" },
          ].map(s => (
            <div key={s.label} className="p-5 text-center">
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Answer key preview */}
        <div className="p-6">
          <h2 className="font-bold text-gray-700 mb-4">Answer Key</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {test.questions.map((q, i) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              const isSkipped = !userAns;

              return (
                <div key={q.id}
                  className={`rounded-xl border p-3 text-sm
                    ${isSkipped ? "border-gray-200 bg-gray-50"
                    : isCorrect ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"}`}>
                  <div className="flex items-start gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5
                      ${isSkipped ? "bg-gray-400" : isCorrect ? "bg-green-500" : "bg-red-500"}`}>
                      {isSkipped ? "—" : isCorrect ? "✓" : "✗"}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-700 line-clamp-2">Q{i + 1}. {q.text.split(":")[1]?.trim() || q.text}</p>
                      <div className="flex gap-4 mt-1 text-xs">
                        <span className="text-gray-500">
                          Your answer: <span className={`font-semibold uppercase ${isSkipped ? "text-gray-400" : isCorrect ? "text-green-600" : "text-red-600"}`}>
                            {userAns || "Skipped"}
                          </span>
                        </span>
                        <span className="text-gray-500">
                          Correct: <span className="font-semibold text-green-600 uppercase">{q.correctAnswer}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <button onClick={onReview}
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
            Review Answers
          </button>
          <a href="/tests"
            className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold transition text-center">
            Back to Tests
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TestPage() {
  const { id } = useParams();
  const router = useRouter();

  // In production, fetch your test: useEffect(() => fetch(`/api/tests/${id}`)...)
  const test = MOCK_TEST;

  const [phase, setPhase] = useState<"instructions" | "test" | "result">("instructions");
  const [activeSection, setActiveSection] = useState(test.sections[0]);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [statuses, setStatuses] = useState<Record<string, QStatus>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPalette, setShowPalette] = useState(false); // mobile toggle

  const currentQ = test.questions[currentQIdx];
  const sectionQs = test.questions.filter(q => q.section === activeSection);

  const startTest = () => {
    setPhase("test");
    // Mark first question as not-answered when visited
    setStatuses({ [test.questions[0].id]: "not-answered" });
  };

  const submitTest = useCallback(() => {
    setShowSubmitModal(false);
    setPhase("result");
  }, []);

  const { formatted, remaining } = useTimer(test.duration, submitTest);
  const isLowTime = remaining < 300;

  const goToQuestion = (idx: number) => {
    setCurrentQIdx(idx);
    const q = test.questions[idx];
    setStatuses(prev => ({
      ...prev,
      [q.id]: prev[q.id] === "not-visited" || !prev[q.id] ? "not-answered" : prev[q.id],
    }));
    setShowPalette(false);
  };

  const handleAnswer = (optionId: string) => {
    const qId = currentQ.id;
    setAnswers(prev => ({ ...prev, [qId]: optionId }));
    setStatuses(prev => ({
      ...prev,
      [qId]: prev[qId] === "marked" || prev[qId] === "answered-marked"
        ? "answered-marked" : "answered",
    }));
  };

  const handleClearResponse = () => {
    const qId = currentQ.id;
    setAnswers(prev => { const n = { ...prev }; delete n[qId]; return n; });
    setStatuses(prev => ({ ...prev, [qId]: "not-answered" }));
  };

  const handleMarkForReview = () => {
    const qId = currentQ.id;
    setStatuses(prev => ({
      ...prev,
      [qId]: answers[qId] ? "answered-marked" : "marked",
    }));
    if (currentQIdx < test.questions.length - 1) goToQuestion(currentQIdx + 1);
  };

  const handleSaveNext = () => {
    if (currentQIdx < test.questions.length - 1) goToQuestion(currentQIdx + 1);
  };

  const getStatus = (qId: string): QStatus => statuses[qId] || "not-visited";

  const answered = Object.keys(answers).length;
  const marked = Object.values(statuses).filter(s => s === "marked" || s === "answered-marked").length;
  const notVisited = test.questions.filter(q => getStatus(q.id) === "not-visited").length;

  // ── Instructions screen ───────────────────────────────────────────────────
  if (phase === "instructions") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-1">Mock Test</div>
            <h1 className="text-xl font-black">{test.title}</h1>
          </div>

          <div className="p-6 space-y-5">
            {/* Info row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "📋", label: "Questions", value: test.questions.length },
                { icon: "⏱", label: "Duration", value: `${test.duration / 60} mins` },
                { icon: "🏆", label: "Max Marks", value: test.questions.length * test.marksPerQuestion },
              ].map(item => (
                <div key={item.label} className="text-center p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-xl">{item.icon}</div>
                  <div className="text-lg font-black text-blue-700">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Marking scheme */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-semibold text-amber-800 text-sm mb-2">📌 Marking Scheme</p>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>✅ Correct answer: <strong>+{test.marksPerQuestion} mark</strong></li>
                <li>❌ Wrong answer: <strong>−{test.negativeMarking} mark</strong></li>
                <li>⬜ Unattempted: <strong>0 marks</strong></li>
              </ul>
            </div>

            {/* Legend */}
            <div>
              <p className="font-semibold text-gray-700 text-sm mb-2">Question Status Legend</p>
              <div className="grid grid-cols-2 gap-2">
                {LEGEND.map(l => (
                  <div key={l.status} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className={`w-6 h-6 rounded-md ${l.bg} flex-shrink-0`} />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="text-sm text-gray-600 space-y-1 bg-gray-50 rounded-xl p-4">
              <p className="font-semibold text-gray-700 mb-2">📋 General Instructions</p>
              <ul className="list-disc list-inside space-y-1 text-gray-500">
                <li>The test will auto-submit when the timer reaches zero.</li>
                <li>You can navigate between questions using the palette.</li>
                <li>Marked questions are reviewed before final submission.</li>
                <li>Do not refresh the page during the test.</li>
              </ul>
            </div>
          </div>

          <div className="px-6 pb-6">
            <button onClick={startTest}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition text-sm tracking-wide">
              I've Read the Instructions — Start Test →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Result screen ─────────────────────────────────────────────────────────
  if (phase === "result") {
    return <ResultScreen test={test} answers={answers} onReview={() => setPhase("test")} />;
  }

  // ── Test screen ───────────────────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden select-none">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="bg-white border-b shadow-sm flex items-center justify-between px-4 py-2.5 z-10 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-blue-700 font-black text-lg hidden sm:block">ExamPrep</span>
          <span className="hidden sm:block text-gray-300">|</span>
          <h1 className="text-sm font-semibold text-gray-700 truncate max-w-xs">{test.title}</h1>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-base
          ${isLowTime ? "bg-red-50 text-red-600 border border-red-200 animate-pulse" : "bg-blue-50 text-blue-700 border border-blue-200"}`}>
          <span>⏱</span>
          <span>{formatted}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile palette toggle */}
          <button onClick={() => setShowPalette(p => !p)}
            className="lg:hidden px-3 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium">
            📋 Palette
          </button>
          <button onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold transition">
            Submit Test
          </button>
        </div>
      </header>

      {/* ── Section tabs ────────────────────────────────────────────────── */}
      <div className="bg-white border-b flex items-center gap-1 px-4 overflow-x-auto flex-shrink-0">
        {test.sections.map(sec => {
          const secQs = test.questions.filter(q => q.section === sec);
          const secAnswered = secQs.filter(q => answers[q.id]).length;
          return (
            <button key={sec} onClick={() => {
              setActiveSection(sec);
              const firstIdx = test.questions.findIndex(q => q.section === sec);
              goToQuestion(firstIdx);
            }}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition whitespace-nowrap
                ${activeSection === sec
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {sec}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full
                ${activeSection === sec ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                {secAnswered}/{secQs.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* ── Question panel ─────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {/* Question number + mark for review */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
                  Q{currentQIdx + 1}
                </span>
                <span className="text-xs text-gray-400">of {test.questions.length}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium
                ${getStatus(currentQ.id) === "answered" ? "bg-green-100 text-green-700"
                : getStatus(currentQ.id) === "marked" || getStatus(currentQ.id) === "answered-marked" ? "bg-purple-100 text-purple-700"
                : getStatus(currentQ.id) === "not-answered" ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-500"}`}>
                {getStatus(currentQ.id).replace("-", " ")}
              </span>
            </div>

            {/* Question text */}
            <div className="bg-white rounded-xl border p-5 mb-5 shadow-sm">
              <p className="text-gray-800 font-medium text-sm md:text-base leading-relaxed">
                {currentQ.text}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map(opt => {
                const selected = answers[currentQ.id] === opt.id;
                return (
                  <button key={opt.id} onClick={() => handleAnswer(opt.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition
                      ${selected
                        ? "border-blue-500 bg-blue-50 text-blue-800"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 text-gray-700"}`}>
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 uppercase
                      ${selected ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 text-gray-500"}`}>
                      {opt.id}
                    </span>
                    <span className="text-sm font-medium">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Bottom action bar ─────────────────────────────────────── */}
          <div className="bg-white border-t px-4 py-3 flex items-center gap-2 flex-shrink-0">
            <button onClick={handleMarkForReview}
              className="px-3 py-2 rounded-lg border border-purple-300 bg-purple-50 text-purple-700 text-xs font-semibold hover:bg-purple-100 transition">
              🔖 Mark for Review
            </button>
            <button onClick={handleClearResponse}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition">
              🗑 Clear
            </button>
            <div className="flex-1" />
            <button onClick={() => currentQIdx > 0 && goToQuestion(currentQIdx - 1)}
              disabled={currentQIdx === 0}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-40">
              ← Prev
            </button>
            <button onClick={handleSaveNext}
              disabled={currentQIdx === test.questions.length - 1}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition disabled:opacity-40">
              Save & Next →
            </button>
          </div>
        </main>

        {/* ── Question Palette (desktop always visible, mobile overlay) ── */}
        <aside className={`
          bg-white border-l w-64 flex-shrink-0 flex flex-col overflow-hidden
          lg:flex
          ${showPalette
            ? "fixed inset-y-0 right-0 z-40 shadow-2xl flex flex-col"
            : "hidden lg:flex"}
        `}>
          {/* Mobile close */}
          <div className="flex items-center justify-between p-3 border-b lg:hidden">
            <span className="font-bold text-sm text-gray-700">Question Palette</span>
            <button onClick={() => setShowPalette(false)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          {/* User info */}
          <div className="p-3 border-b bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Student</p>
                <p className="text-xs text-gray-400">Mock Test</p>
              </div>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-1 text-center">
              {[
                { label: "Answered", value: answered, bg: "bg-green-100 text-green-700" },
                { label: "Marked", value: marked, bg: "bg-purple-100 text-purple-700" },
                { label: "Not Visited", value: notVisited, bg: "bg-gray-100 text-gray-600" },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-lg p-1.5`}>
                  <div className="text-sm font-black">{s.value}</div>
                  <div className="text-xs leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Palette section filter */}
          <div className="px-3 pt-2 pb-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Questions</p>
          </div>

          {/* Question grid */}
          <div className="flex-1 overflow-y-auto px-3 pb-3">
            {test.sections.map(sec => (
              <div key={sec} className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{sec}</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {test.questions
                    .map((q, i) => ({ q, i }))
                    .filter(({ q }) => q.section === sec)
                    .map(({ q, i }) => (
                      <button
                        key={q.id}
                        onClick={() => goToQuestion(i)}
                        className={`w-full aspect-square rounded-md border text-xs font-bold transition
                          ${paletteBg(getStatus(q.id))}
                          ${currentQIdx === i ? "ring-2 ring-offset-1 ring-blue-400 scale-110" : "hover:scale-105"}`}>
                        {i + 1}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="border-t p-3 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 mb-2">Legend</p>
            <div className="space-y-1">
              {LEGEND.map(l => (
                <div key={l.status} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className={`w-4 h-4 rounded-sm ${l.bg} flex-shrink-0`} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ── Submit confirmation modal ──────────────────────────────────── */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-lg font-black text-gray-800 mb-1">Submit Test?</h2>
            <p className="text-sm text-gray-500 mb-4">Once submitted, you cannot change your answers.</p>

            <div className="grid grid-cols-2 gap-2 mb-5 text-center text-sm">
              <div className="bg-green-50 rounded-xl p-3">
                <div className="text-2xl font-black text-green-600">{answered}</div>
                <div className="text-xs text-gray-500">Answered</div>
              </div>
              <div className="bg-red-50 rounded-xl p-3">
                <div className="text-2xl font-black text-red-500">{test.questions.length - answered}</div>
                <div className="text-xs text-gray-500">Unanswered</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <div className="text-2xl font-black text-purple-600">{marked}</div>
                <div className="text-xs text-gray-500">Marked</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-2xl font-black text-gray-500">{notVisited}</div>
                <div className="text-xs text-gray-500">Not Visited</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition">
                Go Back
              </button>
              <button onClick={submitTest}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm transition">
                Submit ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}