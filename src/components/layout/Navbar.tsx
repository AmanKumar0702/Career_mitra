"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Briefcase, BarChart2, FileText, Menu, X, GraduationCap, Sun, Moon, ClipboardList, Compass } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
  { href: "/learn",     label: "Learn",      icon: BookOpen },
  { href: "/tests",     label: "Tests",      icon: ClipboardList },
  { href: "/career",    label: "Career",     icon: Compass },
  { href: "/jobs",      label: "Jobs",       icon: Briefcase },
  { href: "/resume",    label: "Resume",     icon: FileText },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <nav className="sticky top-0 z-50 relative bg-white dark:bg-[#0a0f1e] border-b border-gray-100 dark:border-[#1e293b] shadow-sm">
      {/* Cyan glow line — dark mode only */}
      <div className="absolute top-0 left-0 right-0 h-px hidden dark:block" style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-cyan-500">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}>
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span>Learn<span className="text-gray-900 dark:text-white">2Earn</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-cyan-500 dark:hover:text-cyan-400 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-[#1e293b]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-[#1e293b] bg-white dark:bg-[#0a0f1e] px-4 py-3 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e293b]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
