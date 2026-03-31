"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, BookOpen, Briefcase } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          className="mb-8"
        >
          <div className="text-[120px] font-extrabold leading-none bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent select-none">
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Page not found
          </h1>
          <p className="text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
              >
                <Home className="w-4 h-4" /> Go Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] text-gray-700 dark:text-slate-300 hover:border-cyan-400 transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Browse Courses
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] text-gray-700 dark:text-slate-300 hover:border-cyan-400 transition-colors"
              >
                <Briefcase className="w-4 h-4" /> Find Jobs
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
