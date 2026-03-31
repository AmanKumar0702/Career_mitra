"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Briefcase, BarChart2, FileText, Menu, X, Sun, Moon, ClipboardList, Compass, LogIn, LogOut, Trophy } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/dashboard",   label: "Dashboard",   icon: BarChart2 },
  { href: "/learn",       label: "Learn",        icon: BookOpen },
  { href: "/tests",       label: "Tests",        icon: ClipboardList },
  { href: "/career",      label: "Career",       icon: Compass },
  { href: "/jobs",        label: "Jobs",         icon: Briefcase },
  { href: "/leaderboard", label: "Leaderboard",  icon: Trophy },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 relative bg-white/80 dark:bg-[#0a0f1e]/80 backdrop-blur-md border-b border-gray-100 dark:border-[#1e293b] shadow-sm">
      {/* Cyan glow line — dark mode only */}
      <div className="absolute top-0 left-0 right-0 h-px hidden dark:block" style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl" style={{ textDecoration: "none" }}>
              <div className="relative w-9 h-9 flex-shrink-0">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                  <defs>
                    <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <rect width="36" height="36" rx="10" fill="url(#logoGrad)" />
                  <rect x="6" y="22" width="24" height="3" rx="1" fill="white" opacity="0.9" />
                  <rect x="8" y="19" width="20" height="3" rx="1" fill="white" opacity="0.7" />
                  <rect x="10" y="16" width="16" height="3" rx="1" fill="white" opacity="0.5" />
                  <path d="M14 6h8v6c0 2.21-1.79 4-4 4s-4-1.79-4-4V6z" fill="white" opacity="0.95" />
                  <path d="M14 8h-2a2 2 0 000 4h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
                  <path d="M22 8h2a2 2 0 010 4h-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
                  <rect x="17" y="16" width="2" height="3" rx="0.5" fill="white" opacity="0.9" />
                  <rect x="14" y="19" width="8" height="1.5" rx="0.75" fill="white" opacity="0.9" />
                </svg>
              </div>
              <span className="text-cyan-500">Learn<span className="text-gray-900 dark:text-white">2Earn</span></span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }, i) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={href}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group ${
                      active
                        ? "text-cyan-600 dark:text-cyan-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {/* Active / hover background */}
                    {active && (
                      <motion.span
                        layoutId="navActive"
                        className="absolute inset-0 rounded-lg bg-cyan-50 dark:bg-cyan-900/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <motion.span
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.span>
                    <span className="relative z-10">{label}</span>
                    {/* Hover underline */}
                    {!active && (
                      <span className="absolute bottom-1 left-4 right-4 h-px bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Sign in / Sign out */}
            {session ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors border border-gray-200 dark:border-[#1e293b]"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </motion.button>
            ) : (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="hidden md:block">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>
              </motion.div>
            )}

            {/* Mobile hamburger */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-[#1e293b]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden border-t border-gray-100 dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e]"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ href, label, icon: Icon }, i) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
              {session ? (
                <motion.button
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: navLinks.length * 0.04 }}
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: navLinks.length * 0.04 }}
                >
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all"
                  >
                    <LogIn className="w-4 h-4" /> Sign In
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
