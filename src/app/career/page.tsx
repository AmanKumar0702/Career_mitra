"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { careerPaths, CareerPath } from "@/data/careerPaths";
import { Compass, TrendingUp, ChevronRight, Send, Bot, User, Sparkles, IndianRupee, Clock } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const suggestedQuestions = [
  "What skills do I need for software engineering?",
  "How do I prepare for NEET?",
  "Which career is best after 12th Commerce?",
  "How to become a data scientist?",
  "What is the salary of a CA?",
];

export default function CareerPage() {
  const [selected, setSelected] = useState<CareerPath | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm CareerMitra AI 👋 I can help you explore careers, plan your studies, and answer any questions about your future. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const sendMessage = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const userMsg: Message = { role: "user", content: msg };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages.slice(-6) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I couldn't connect right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const demandColor = { High: "success" as const, Medium: "warning" as const, Low: "danger" as const };
  const demandBg = { High: "from-green-500 to-emerald-400", Medium: "from-yellow-500 to-amber-400", Low: "from-red-500 to-rose-400" };

  const filters = ["All", "High Demand", "Medium Demand"];
  const filtered = careerPaths.filter((cp) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "High Demand") return cp.demand === "High";
    if (activeFilter === "Medium Demand") return cp.demand === "Medium";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Career Guidance 🧭</h1>
              <p className="text-green-100 text-lg mb-4">Explore {careerPaths.length} career paths with step-by-step roadmaps</p>
              <div className="flex flex-wrap gap-5 text-sm text-green-100">
                <span className="flex items-center gap-1.5"><Compass className="w-4 h-4" /> {careerPaths.length} Career Paths</span>
                <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Salary Insights</span>
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> AI Career Advisor</span>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-all shadow-lg self-start"
            >
              <Bot className="w-5 h-5" /> Ask AI Advisor
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Career Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cp) => (
            <Card
              key={cp.id}
              hover
              onClick={() => setSelected(cp)}
              className="cursor-pointer group hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${demandBg[cp.demand]} flex items-center justify-center text-3xl shadow-sm`}>
                  {cp.icon}
                </div>
                <Badge variant={demandColor[cp.demand]}>{cp.demand} Demand</Badge>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {cp.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{cp.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {cp.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs rounded-full capitalize">{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold text-sm">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {cp.avgSalary}
                </div>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {cp.roadmap.length} steps
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Roadmap Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} className="max-w-2xl">
        {selected && (
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${demandBg[selected.demand]} flex items-center justify-center text-4xl flex-shrink-0`}>
                {selected.icon}
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{selected.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant={demandColor[selected.demand]}>{selected.demand} Demand</Badge>
                  <Badge variant="success" className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />{selected.avgSalary}
                  </Badge>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" /> Step-by-Step Roadmap
            </h4>

            <div className="space-y-0">
              {selected.roadmap.map((step, idx) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                      {step.step}
                    </div>
                    {idx < selected.roadmap.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-300 to-gray-200 dark:from-primary-700 dark:to-gray-700 my-1" />
                    )}
                  </div>
                  <div className="pb-6 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white">{step.title}</h5>
                      <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />{step.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {step.skills.map((s) => (
                        <span key={s} className="px-2.5 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs rounded-full font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setSelected(null); setChatOpen(true); }}
              className="btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" /> Ask AI about this career
            </button>
          </div>
        )}
      </Modal>

      {/* AI Chat Modal */}
      <Modal open={chatOpen} onClose={() => setChatOpen(false)} title="CareerMitra AI Advisor 🤖" className="max-w-lg">
        <div className="flex flex-col" style={{ height: "480px" }}>
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === "assistant" ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-primary-100 dark:bg-primary-900/30 text-primary-600"}`}>
                  {m.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "assistant" ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200" : "bg-primary-600 text-white"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2.5 rounded-2xl text-sm text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && (
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <input
              className="input flex-1 py-2.5"
              placeholder="Ask about careers, exams, skills..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="btn-primary px-4 py-2.5 disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
