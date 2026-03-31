"use client";
import Link from "next/link";
import { BookOpen, ClipboardList, Compass, Briefcase, BarChart2, Award, FileText, Shield } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

const features = [
  { icon: BookOpen,      title: "Learning Platform",  description: "500+ courses across Science, Tech, Business & more. Multi-language support with progress tracking.", href: "/learn",     badge: "500+ Courses" },
  { icon: ClipboardList, title: "Test & Assessment",  description: "MCQ-based quizzes with adaptive difficulty, countdown timer, and instant weak area analysis.",      href: "/tests",     badge: "AI Adaptive"  },
  { icon: Compass,       title: "Career Guidance",    description: "AI-powered career path suggestions with step-by-step roadmaps and a 24/7 AI chatbot.",              href: "/career",    badge: "AI Powered"   },
  { icon: Briefcase,     title: "Job Portal",         description: "Browse internships and jobs filtered by skills, location, and education level. Apply in one click.", href: "/jobs",      badge: "1000+ Jobs"   },
  { icon: FileText,      title: "Resume Builder",     description: "Build a professional resume with live preview. Download as PDF and stand out to recruiters.",         href: "/resume",    badge: "Live Preview" },
  { icon: BarChart2,     title: "Progress Analytics", description: "Track your learning streaks, XP points, completed courses, and performance over time.",              href: "/dashboard", badge: "Real-time"    },
  { icon: Award,         title: "Gamification",       description: "Earn badges, maintain streaks, and climb leaderboards as you learn and grow every day.",              href: "/leaderboard", badge: "Badges & XP"  },
  { icon: Shield,        title: "Admin Panel",        description: "Full CRUD management for courses, tests, and jobs. Built for educators and platform admins.",         href: "/admin",     badge: "Full CRUD"    },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

function FeatureCard({ f }: { f: typeof features[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set(cx / 10);
    y.set(-cy / 10);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      variants={itemVariants}
    >
      <Link
        href={f.href}
        className="group flex flex-col h-full rounded-2xl p-5 transition-all duration-300 bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-[#1e293b] hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-xl hover:shadow-cyan-500/15 relative overflow-hidden"
      >
        {/* Spotlight glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(6,182,212,0.08), transparent 70%)" }} />

        {/* Top shimmer line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{ background: "linear-gradient(90deg, transparent, #06b6d4, transparent)" }}
        />

        <div className="flex items-start justify-between mb-4 relative">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.25, type: "spring", stiffness: 300 }}
            className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0"
          >
            <f.icon className="w-5 h-5 text-cyan-500" />
          </motion.div>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-0.5 rounded-full border border-cyan-100 dark:border-cyan-800"
          >
            {f.badge}
          </motion.span>
        </div>
        <h3 className="font-semibold text-base mb-1.5 text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {f.title}
        </h3>
        <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed flex-1">{f.description}</p>

        {/* Arrow indicator */}
        <motion.div
          initial={{ opacity: 0, x: -4 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mt-3 text-xs font-semibold text-cyan-500 flex items-center gap-1"
        >
          Explore →
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white/80 dark:bg-[#0a0f1e]/80 overflow-hidden relative" style={{ zIndex: 2 }}>
      {/* Animated floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/30 dark:bg-cyan-500/20"
            style={{ left: `${(i * 5.5) % 100}%`, top: `${(i * 13 + 10) % 90}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-3"
          >
            Platform Features
          </motion.span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Everything You Need to Succeed</h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            From learning to landing your first job — Learn2Earn has all the tools in one unified platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ perspective: "1000px" }}
        >
          {features.map((f) => <FeatureCard key={f.title} f={f} />)}
        </motion.div>
      </div>
    </section>
  );
}
