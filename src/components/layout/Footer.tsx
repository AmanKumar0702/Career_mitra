import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-primary-600">
            <GraduationCap className="w-6 h-6" />
            <span>Career<span className="text-gray-900 dark:text-white">Mitra</span></span>
          </Link>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CareerMitra. Helping students grow. 🚀
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/learn" className="hover:text-primary-600 transition-colors">Learn</Link>
            <Link href="/jobs" className="hover:text-primary-600 transition-colors">Jobs</Link>
            <Link href="/resume" className="hover:text-primary-600 transition-colors">Resume</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}