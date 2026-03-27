"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 50000, suffix: "+", label: "Students Enrolled", prefix: "" },
  { value: 500, suffix: "+", label: "Courses Available", prefix: "" },
  { value: 1000, suffix: "+", label: "Job Listings", prefix: "" },
  { value: 95, suffix: "%", label: "Satisfaction Rate", prefix: "" },
];

function Counter({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = target >= 1000
    ? (count / 1000).toFixed(count >= target ? 0 : 1) + "K"
    : count.toString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-extrabold mb-1">
                <Counter target={s.value} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <div className="text-primary-100 text-sm font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
