"use client";
import Link from "next/link";
import { useState } from "react";
import { Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import toast from "react-hot-toast";

const links = {
  Platform: [
    { label: "Learn",       href: "/learn" },
    { label: "Tests",       href: "/tests" },
    { label: "Career",      href: "/career" },
    { label: "Jobs",        href: "/jobs" },
    { label: "Resume",      href: "/resume" },
    { label: "Leaderboard", href: "/leaderboard" },
  ],
  Company: [
    { label: "About Us",   href: "/about" },
    { label: "Contact",    href: "/contact" },
    { label: "Terms",      href: "/terms" },
    { label: "Privacy",    href: "/privacy" },
  ],
  Account: [
    { label: "Dashboard",  href: "/dashboard" },
    { label: "Progress",   href: "/progress" },
    { label: "Sign Up",    href: "/auth/signup" },
    { label: "Login",      href: "/auth/login" },
  ],
};

const socials = [
  { icon: Twitter,   href: "#", label: "Twitter" },
  { icon: Linkedin,  href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube,   href: "#", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Enter a valid email"); return; }
    toast.success("Subscribed! You'll get weekly career tips.");
    setEmail("");
  };

  return (
    <footer className="relative bg-white dark:bg-[#0a0f1e] border-t border-gray-100 dark:border-[#1e293b] mt-auto">
      <div className="absolute top-0 left-0 right-0 h-px hidden dark:block" style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl mb-4 no-underline" style={{ textDecoration: "none" }}>
              <div className="relative w-8 h-8 flex-shrink-0">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <rect width="36" height="36" rx="10" fill="url(#footerLogoGrad)" />
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
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed max-w-xs mb-6">
              Helping students after 10th &amp; 12th explore careers, build skills, and land their first opportunity. Free forever.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3">Weekly Career Tips</p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input text-sm py-2 flex-1"
                />
                <button type="submit" className="px-3 py-2 rounded-lg text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
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
        <div className="pt-6 border-t border-gray-100 dark:border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Learn2Earn. All rights reserved. Made with ❤️ for Indian students.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
