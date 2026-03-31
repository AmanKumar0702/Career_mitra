"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Trophy, Star, Flame, Zap, Medal, Crown } from "lucide-react";

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"xp" | "streak" | "courses">("xp");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((data) => { setUsers(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...users].sort((a, b) => {
    if (tab === "xp") return (b.xp || 0) - (a.xp || 0);
    if (tab === "streak") return (b.streak || 0) - (a.streak || 0);
    return (b.completedCourses?.length || 0) - (a.completedCourses?.length || 0);
  }).slice(0, 50);

  const getRankIcon = (i: number) => {
    if (i === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (i === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (i === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-bold text-gray-400 w-5 text-center">#{i + 1}</span>;
  };

  const getValue = (u: any) => {
    if (tab === "xp") return `${(u.xp || 0).toLocaleString()} XP`;
    if (tab === "streak") return `${u.streak || 0} days`;
    return `${u.completedCourses?.length || 0} courses`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <Navbar />

      <div className="relative bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-200" />
            <h1 className="text-4xl font-extrabold mb-2">Leaderboard</h1>
            <p className="text-orange-100 text-lg">Top learners on Learn2Earn. Keep earning XP to climb the ranks!</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white dark:bg-[#0f172a] p-1 rounded-xl border border-gray-100 dark:border-[#1e293b]">
          {[
            { key: "xp", label: "XP Points", icon: Zap },
            { key: "streak", label: "Streak", icon: Flame },
            { key: "courses", label: "Courses", icon: Star },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === key
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-sm"
                  : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        {!loading && sorted.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-8">
            {[sorted[1], sorted[0], sorted[2]].map((u, idx) => {
              const rank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
              const colors = [
                "bg-gray-100 dark:bg-[#1e293b]",
                "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400",
                "bg-orange-50 dark:bg-orange-900/20",
              ];
              return (
                <motion.div
                  key={u._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex-1 flex flex-col items-center p-4 rounded-2xl ${colors[idx]}`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg mb-2">
                    {u.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white text-center truncate w-full">{u.name?.split(" ")[0]}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{getValue(u)}</div>
                  <div className={`mt-2 text-lg font-extrabold ${rank === 1 ? "text-yellow-500" : rank === 2 ? "text-gray-400" : "text-amber-600"}`}>#{rank}</div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Full list */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-[#1e293b] animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No users yet. Be the first to earn XP!</div>
        ) : (
          <div className="space-y-2">
            {sorted.map((u, i) => {
              const isMe = session?.user?.email === u.email;
              return (
                <motion.div
                  key={u._id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    isMe
                      ? "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800"
                      : "bg-white dark:bg-[#0f172a] border-gray-100 dark:border-[#1e293b] hover:border-yellow-200 dark:hover:border-yellow-800"
                  }`}
                >
                  <div className="w-8 flex items-center justify-center flex-shrink-0">{getRankIcon(i)}</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {u.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {u.name} {isMe && <span className="text-xs text-cyan-500 font-normal">(You)</span>}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-slate-500">{u.educationLevel || "Student"}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-sm text-gray-900 dark:text-white">{getValue(u)}</div>
                    <div className="text-xs text-gray-400">Lv.{Math.floor((u.xp || 0) / 500) + 1}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
