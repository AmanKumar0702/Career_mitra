"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Home } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Something went wrong
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
              An unexpected error occurred. Please try again or go back to the home page.
            </p>
            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </motion.button>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] text-gray-700 dark:text-slate-300"
                >
                  <Home className="w-4 h-4" /> Go Home
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
