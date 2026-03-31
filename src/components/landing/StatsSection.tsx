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
    <section className="relative py-20 overflow-hidden bg-gradient-to-r from-cyan-600/90 via-cyan-700/90 to-indigo-700/90" style={{ zIndex: 2 }}>
      {/* Animated background orbs */}
      <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Moving shimmer sweep */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        className="absolute inset-y-0 w-1/3 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
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
              whileHover={{ scale: 1.08, y: -6 }}
              className="flex flex-col items-center group cursor-default relative"
            >
              {/* Glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 70%)" }}
              />
              <motion.div
                whileHover={{ rotate: 15, scale: 1.15 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg relative"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
              >
                <s.icon className="w-7 h-7 text-white" />
                {/* Ping effect */}
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none"
                />
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
