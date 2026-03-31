"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Target, Users, BookOpen, Briefcase, Heart, Zap, Globe, Award } from "lucide-react";

const stats = [
  { value: "50,000+", label: "Students Enrolled" },
  { value: "29+", label: "Free Courses" },
  { value: "1,000+", label: "Job Listings" },
  { value: "95%", label: "Satisfaction Rate" },
];

const values = [
  { icon: Heart, title: "Student First", desc: "Every decision we make starts with one question — does this help the student?" },
  { icon: Globe, title: "Accessible to All", desc: "Free forever for students. No credit card, no paywalls on core features." },
  { icon: Zap, title: "AI-Powered", desc: "We use AI to personalise career paths, detect weak areas and guide every student." },
  { icon: Award, title: "Outcome Focused", desc: "We measure success by jobs landed, courses completed and careers launched." },
];

const team = [
  { name: "Aman Kumar", role: "Founder & CEO", initials: "AK", color: "from-cyan-400 to-cyan-600" },
  { name: "Priya Sharma", role: "Head of Curriculum", initials: "PS", color: "from-indigo-400 to-indigo-600" },
  { name: "Rahul Verma", role: "Lead Engineer", initials: "RV", color: "from-purple-400 to-violet-600" },
  { name: "Sneha Reddy", role: "Career Counsellor", initials: "SR", color: "from-pink-400 to-rose-600" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e]">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cyan-600 via-cyan-700 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-200 mb-4">Our Mission</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
              Helping Every Indian Student<br />Build a Successful Career
            </h1>
            <p className="text-cyan-100 text-lg max-w-2xl mx-auto leading-relaxed">
              Learn2Earn was built for the millions of students after 10th and 12th who are confused, underserved and lack access to quality career guidance. We are changing that — for free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-[#0d1526]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500 mb-1">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-slate-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-3 block">Our Story</span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Why We Built Learn2Earn</h2>
          <div className="text-gray-600 dark:text-slate-400 leading-relaxed space-y-4 text-left max-w-3xl mx-auto">
            <p>Every year, over 30 million students appear for Class 10 and 12 board exams in India. Most of them have no idea what to do next. Career counselling is expensive, coaching is inaccessible, and the internet is overwhelming.</p>
            <p>We built Learn2Earn to be the platform we wish existed when we were students — a single place to explore careers, learn skills, take assessments, build a resume, and find opportunities. All for free.</p>
            <p>Our AI-powered career guidance, gamified learning with XP and badges, and structured courses from Class 1 to Graduate level make learning engaging and outcomes measurable.</p>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-[#0d1526]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-3 block">What We Stand For</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-gray-100 dark:border-[#1e293b]">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-cyan-500" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-3 block">The People</span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-gray-100 dark:border-[#1e293b] text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}>
                {t.initials}
              </div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</div>
              <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
