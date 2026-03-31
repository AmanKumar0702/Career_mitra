"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const words = ["Career", "Future", "Success", "Dream"];

function TypewriterWords() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout: NodeJS.Timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-0.5 h-8 bg-cyan-300 ml-1 align-middle" />
    </span>
  );
}

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 bg-gray-50/80 dark:bg-[#0d1526]/80 overflow-hidden" style={{ zIndex: 2 }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-12 text-center"
          style={{ background: "linear-gradient(135deg, #0891b2 0%, #0e7490 40%, #4f46e5 100%)", boxShadow: "0 20px 60px rgba(6,182,212,0.3)" }}
        >
          {/* Animated floating orbs */}
          <motion.div animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <motion.div animate={{ x: [0, -20, 0], y: [0, 15, 0], scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

          {/* Pulsing ring */}
          <motion.div animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-3xl pointer-events-none" style={{ border: "2px solid rgba(255,255,255,0.25)" }} />

          {/* Shimmer sweep */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
            className="absolute inset-y-0 w-1/2 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
          />

          {/* Shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />

          <div className="relative">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Join 50,000+ students already learning
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight"
            >
              Build Your <TypewriterWords /><br />Journey Starts Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-cyan-100 text-lg mb-8 max-w-xl mx-auto"
            >
              Free to start. No credit card required. Get access to 500+ courses, career roadmaps, and job listings instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Link href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 bg-white text-cyan-700 font-bold px-8 py-3.5 rounded-xl hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Link href="/learn"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all border border-white/20">
                  Browse Courses
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating XP badges */}
            <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
              {[
                { emoji: "🔥", text: "Daily Streaks" },
                { emoji: "⚡", text: "Earn XP" },
                { emoji: "🏆", text: "Win Badges" },
                { emoji: "📜", text: "Get Certified" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-medium text-white"
                >
                  <span>{item.emoji}</span> {item.text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
