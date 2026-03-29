"use client";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

const links = {
  Platform: [
    { label: "Learn",   href: "/learn"   },
    { label: "Tests",   href: "/tests"   },
    { label: "Career",  href: "/career"  },
    { label: "Jobs",    href: "/jobs"    },
  ],
  Account: [
    { label: "Dashboard",      href: "/dashboard"   },
    { label: "Resume Builder", href: "/resume"      },
    { label: "Sign Up",        href: "/auth/signup" },
    { label: "Login",          href: "/auth/login"  },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-[#0a0f1e] border-t border-gray-100 dark:border-[#1e293b] mt-auto">
      {/* Subtle glow line — dark mode */}
      <div className="absolute top-0 left-0 right-0 h-px hidden dark:block" style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-cyan-500 mb-3">
              <GraduationCap className="w-6 h-6" />
              <span>Learn<span className="text-gray-900 dark:text-white">2Earn</span></span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Helping students after 10th & 12th explore careers, build skills, and land their first opportunity.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-gray-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gray-100 dark:border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Learn2Earn. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-500">
            Built for Indian students
          </p>
        </div>
      </div>
    </footer>
  );
}
