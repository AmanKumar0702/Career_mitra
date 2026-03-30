"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma",  role: "Class 12 Student, Delhi",      avatar: "PS", color: "from-cyan-400 to-cyan-600",    text: "Learn2Earn helped me discover that I'm passionate about data science. The roadmap was so clear — I knew exactly what to study next!" },
  { name: "Rahul Verma",   role: "Engineering Fresher, Pune",     avatar: "RV", color: "from-indigo-400 to-indigo-600", text: "I got my first internship through Learn2Earn's job portal. The skill-based filters made it easy to find roles that matched my profile." },
  { name: "Ananya Patel",  role: "Commerce Student, Ahmedabad",   avatar: "AP", color: "from-cyan-400 to-indigo-500",   text: "The CA career roadmap was incredibly detailed. The AI chatbot answered all my doubts about the CA Foundation exam instantly." },
  { name: "Arjun Mehta",   role: "Class 10 Student, Jaipur",      avatar: "AM", color: "from-indigo-400 to-cyan-500",   text: "I scored 92% in my Class 10 boards after using Learn2Earn's Science MCQ tests. The weak area detection is a game changer!" },
  { name: "Sneha Reddy",   role: "B.Tech Graduate, Hyderabad",    avatar: "SR", color: "from-cyan-500 to-indigo-400",   text: "The resume builder helped me create a professional resume in under 10 minutes. Got 3 interview calls in the first week!" },
  { name: "Karan Singh",   role: "NEET Aspirant, Chandigarh",     avatar: "KS", color: "from-indigo-500 to-cyan-400",   text: "The NEET Biology crash course is outstanding. 41,000 students can't be wrong — this platform genuinely cares about student success." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-[#0a0f1e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-3">Testimonials</span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Students Love Learn2Earn</h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg">Real stories from students who found their path.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative rounded-2xl p-6 cursor-default bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-[#1e293b] hover:border-cyan-200 dark:hover:border-cyan-800 hover:shadow-lg hover:shadow-cyan-500/10 transition-colors duration-200"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute top-5 right-5"
              >
                <Quote className="w-7 h-7 text-cyan-100 dark:text-cyan-900/50" />
              </motion.div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: j * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-5">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-[#1e293b]">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} text-white flex items-center justify-center font-bold text-xs flex-shrink-0`}
                >
                  {t.avatar}
                </motion.div>
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-xs text-gray-400 dark:text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
