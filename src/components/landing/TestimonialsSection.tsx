"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Class 12 Student, Delhi",
    avatar: "PS",
    avatarColor: "from-blue-400 to-blue-600",
    text: "CareerMitra helped me discover that I'm passionate about data science. The roadmap was so clear — I knew exactly what to study next!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Engineering Fresher, Pune",
    avatar: "RV",
    avatarColor: "from-purple-400 to-purple-600",
    text: "I got my first internship through CareerMitra's job portal. The skill-based filters made it easy to find roles that matched my profile.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Commerce Student, Ahmedabad",
    avatar: "AP",
    avatarColor: "from-green-400 to-green-600",
    text: "The CA career roadmap was incredibly detailed. The AI chatbot answered all my doubts about the CA Foundation exam instantly.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Class 10 Student, Jaipur",
    avatar: "AM",
    avatarColor: "from-orange-400 to-orange-600",
    text: "I scored 92% in my Class 10 boards after using CareerMitra's Science MCQ tests. The weak area detection is a game changer!",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "B.Tech Graduate, Hyderabad",
    avatar: "SR",
    avatarColor: "from-pink-400 to-pink-600",
    text: "The resume builder helped me create a professional resume in under 10 minutes. Got 3 interview calls in the first week!",
    rating: 5,
  },
  {
    name: "Karan Singh",
    role: "NEET Aspirant, Chandigarh",
    avatar: "KS",
    avatarColor: "from-teal-400 to-teal-600",
    text: "The NEET Biology crash course is outstanding. 41,000 students can't be wrong — this platform genuinely cares about student success.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Students Love CareerMitra</h2>
          <p className="section-subtitle text-lg">Real stories from students who found their path.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card relative"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-gray-100 dark:text-gray-800" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
