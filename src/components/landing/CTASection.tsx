"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 p-12 text-center shadow-2xl"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" /> Join 50,000+ students already learning
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Your Career Journey<br />Starts Today
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
              Free to start. No credit card required. Get access to 500+ courses, career roadmaps, and job listings instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-bold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
