"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma",  role: "Class 12 Student, Delhi",     avatar: "PS", color: "from-cyan-400 to-cyan-600",    text: "Learn2Earn helped me discover that I'm passionate about data science. The roadmap was so clear — I knew exactly what to study next!" },
  { name: "Rahul Verma",   role: "Engineering Fresher, Pune",    avatar: "RV", color: "from-indigo-400 to-indigo-600", text: "I got my first internship through Learn2Earn's job portal. The skill-based filters made it easy to find roles that matched my profile." },
  { name: "Ananya Patel",  role: "Commerce Student, Ahmedabad",  avatar: "AP", color: "from-cyan-400 to-indigo-500",   text: "The CA career roadmap was incredibly detailed. The AI chatbot answered all my doubts about the CA Foundation exam instantly." },
  { name: "Arjun Mehta",   role: "Class 10 Student, Jaipur",     avatar: "AM", color: "from-indigo-400 to-cyan-500",   text: "I scored 92% in my Class 10 boards after using Learn2Earn's Science MCQ tests. The weak area detection is a game changer!" },
  { name: "Sneha Reddy",   role: "B.Tech Graduate, Hyderabad",   avatar: "SR", color: "from-cyan-500 to-indigo-400",   text: "The resume builder helped me create a professional resume in under 10 minutes. Got 3 interview calls in the first week!" },
  { name: "Karan Singh",   role: "NEET Aspirant, Chandigarh",    avatar: "KS", color: "from-indigo-500 to-cyan-400",   text: "The NEET Biology crash course is outstanding. 41,000 students can't be wrong — this platform genuinely cares about student success." },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="relative rounded-2xl p-6 flex-shrink-0 w-[320px] bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-[#1e293b] hover:border-cyan-200 dark:hover:border-cyan-800 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200">
      <Quote className="absolute top-5 right-5 w-6 h-6 text-cyan-100 dark:text-cyan-900/50" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-[#1e293b]">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} text-white flex items-center justify-center font-bold text-xs flex-shrink-0`}>
          {t.avatar}
        </div>
        <div>
          <div className="font-semibold text-sm text-gray-900 dark:text-white">{t.name}</div>
          <div className="text-xs text-gray-400 dark:text-slate-500">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials].reverse().concat([...testimonials].reverse());

  return (
    <section id="testimonials" className="py-24 bg-gray-50/80 dark:bg-[#0d1526]/80 overflow-hidden" style={{ zIndex: 2 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Students Love Learn2Earn
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Real stories from students who found their path.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-5">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-gray-50 dark:from-[#0d1526] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-gray-50 dark:from-[#0d1526] to-transparent" />
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: [0, -(testimonials.length * 345)] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {row1.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-gray-50 dark:from-[#0d1526] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-gray-50 dark:from-[#0d1526] to-transparent" />
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: [-(testimonials.length * 345), 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {row2.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </motion.div>
      </div>
    </section>
  );
}
