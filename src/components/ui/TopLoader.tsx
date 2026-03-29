"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TopLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setVisible(true);
    setProgress(20);
    const t1 = setTimeout(() => setProgress(60), 100);
    const t2 = setTimeout(() => setProgress(85), 300);
    const t3 = setTimeout(() => setProgress(100), 500);
    const t4 = setTimeout(() => setVisible(false), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5 pointer-events-none">
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #06b6d4, #6366f1)",
          boxShadow: "0 0 8px rgba(6,182,212,0.6)",
        }}
      />
    </div>
  );
}
