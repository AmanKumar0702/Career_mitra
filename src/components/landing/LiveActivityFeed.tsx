"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ClipboardList, Briefcase, Star } from "lucide-react";

const activities = [
  { name: "Priya S.", action: "enrolled in", item: "Physics Class 12", icon: BookOpen, color: "text-cyan-500" },
  { name: "Rahul V.", action: "scored 92% on", item: "Class 10 Science Test", icon: ClipboardList, color: "text-green-500" },
  { name: "Ananya P.", action: "applied to", item: "Frontend Intern at TechCorp", icon: Briefcase, color: "text-indigo-500" },
  { name: "Arjun M.", action: "completed", item: "Python for Beginners", icon: Star, color: "text-yellow-500" },
  { name: "Sneha R.", action: "enrolled in", item: "Data Science with Python", icon: BookOpen, color: "text-cyan-500" },
  { name: "Karan S.", action: "scored 88% on", item: "Mathematics Class 11", icon: ClipboardList, color: "text-green-500" },
  { name: "Meera T.", action: "applied to", item: "Marketing Intern at StartupX", icon: Briefcase, color: "text-indigo-500" },
  { name: "Dev K.", action: "completed", item: "Web Development Fundamentals", icon: Star, color: "text-yellow-500" },
];

export default function LiveActivityFeed() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((i) => (i + 1) % activities.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const a = activities[current];
  const Icon = a.icon;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2.5 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur border border-gray-100 dark:border-[#1e293b] rounded-full px-4 py-2 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <Icon className={`w-3.5 h-3.5 ${a.color} flex-shrink-0`} />
          <span className="text-xs text-gray-600 dark:text-slate-400">
            <span className="font-semibold text-gray-900 dark:text-white">{a.name}</span>
            {" "}{a.action}{" "}
            <span className="font-medium text-gray-700 dark:text-slate-300">{a.item}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
