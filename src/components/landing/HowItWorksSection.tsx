"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Target, Briefcase } from "lucide-react";

const steps = [
  { icon: UserPlus,  step: "01", title: "Create Your Profile",  description: "Sign up in 30 seconds. Tell us your stream — Science, Commerce, or Arts — and your goals." },
  { icon: Target,    step: "02", title: "Learn & Get Tested",   description: "Take courses, attempt MCQ quizzes, and get instant feedback on your weak areas." },
  { icon: Briefcase, step: "03", title: "Land Opportunities",   description: "Explore career roadmaps, build your resume, and apply to internships & jobs — all in one place." },
];

function AnimatedConnector() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ originX: 0, height: "100%", background: "linear-gradient(90deg, rgba(6,182,212,0.6), rgba(99,102,241,0.6))" }}
      />
      {/* Moving dot along the line */}
      <motion.div
        initial={{ left: "0%" }}
        animate={inView ? { left: ["0%", "100%", "0%"] } : {}}
        transition={{ duration: 3, delay: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-lg"
        style={{ boxShadow: "0 0 8px rgba(6,182,212,0.8)" }}
      />
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-50/80 dark:bg-[#0d1526]/80 overflow-hidden relative" style={{ zIndex: 2 }}>
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-3"
          >
            How It Works
          </motion.span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Three Steps to Your Career</h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
            From confused student to confident professional — in three simple steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <AnimatedConnector />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.18, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-6 z-10">
                {/* Outer glow ring */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
                  className="absolute -inset-3 rounded-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)" }}
                />
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                  style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)" }}
                >
                  <s.icon className="w-8 h-8 text-cyan-500" />
                  {/* Inner shimmer */}
                  <motion.div
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.2), transparent)" }}
                  />
                </motion.div>
                {/* Ripple pulse */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1.8], opacity: [0.4, 0.15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ border: "2px solid rgba(6,182,212,0.5)" }}
                />
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.18 + 0.3, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-bold text-white flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
                >
                  {s.step}
                </motion.span>
              </div>

              <motion.h3
                className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
              >
                {s.title}
              </motion.h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
