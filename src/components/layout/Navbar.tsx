"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Briefcase, BarChart2, FileText, Menu, X, GraduationCap, Sun, Moon, ClipboardList, Compass } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/tests", label: "Tests", icon: ClipboardList },
  { href: "/career", label: "Career", icon: Compass },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/resume", label: "Resume", icon: FileText },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-primary-600">
            <GraduationCap className="w-7 h-7" />
            <span>Career<span className="text-gray-900 dark:text-white">Mitra</span></span>
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
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50"
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