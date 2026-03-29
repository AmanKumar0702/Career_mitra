"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, BookOpen, Briefcase, ThumbsUp } from "lucide-react";

const stats = [
  { value: 50000, suffix: "+", label: "Students Enrolled",  icon: Users,     color: "from-cyan-400 to-cyan-600"    },
  { value: 500,   suffix: "+", label: "Courses Available",  icon: BookOpen,  color: "from-indigo-400 to-indigo-600" },
  { value: 1000,  suffix: "+", label: "Job Listings",       icon: Briefcase, color: "from-cyan-500 to-indigo-500"   },
  { value: 95,    suffix: "%", label: "Satisfaction Rate",  icon: ThumbsUp,  color: "from-indigo-400 to-cyan-500"   },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = target >= 1000
    ? (count / 1000).toFixed(count >= target ? 0 : 1) + "K"
    : count.toString();

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-r from-cyan-600 via-cyan-700 to-indigo-700">
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex flex-col items-center group cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} bg-opacity-20 flex items-center justify-center mb-4 shadow-lg`}
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
              >
                <s.icon className="w-7 h-7 text-white" />
              </motion.div>
              <div className="text-4xl sm:text-5xl font-extrabold mb-1 tracking-tight">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-cyan-100 text-sm font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
