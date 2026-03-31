"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Download, X, Award } from "lucide-react";

interface Props {
  courseName: string;
  studentName: string;
  date: string;
  onClose: () => void;
}

export default function Certificate({ courseName, studentName, date, onClose }: Props) {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!certRef.current) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate - ${courseName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; background: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
          </style>
        </head>
        <body>${certRef.current.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-2xl"
      >
        <button onClick={onClose} className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white dark:bg-[#0f172a] rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-[#1e293b]">
          <X className="w-4 h-4 text-gray-600 dark:text-slate-400" />
        </button>

        {/* Certificate */}
        <div ref={certRef} style={{
          background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 100%)",
          border: "2px solid rgba(6,182,212,0.4)",
          borderRadius: "16px",
          padding: "48px",
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Corner decorations */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "80px", height: "80px", borderTop: "3px solid #06b6d4", borderLeft: "3px solid #06b6d4", borderRadius: "16px 0 0 0" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", borderTop: "3px solid #6366f1", borderRight: "3px solid #6366f1", borderRadius: "0 16px 0 0" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "80px", height: "80px", borderBottom: "3px solid #6366f1", borderLeft: "3px solid #6366f1", borderRadius: "0 0 0 16px" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "80px", height: "80px", borderBottom: "3px solid #06b6d4", borderRight: "3px solid #06b6d4", borderRadius: "0 0 16px 0" }} />

          <div style={{ marginBottom: "8px", fontSize: "12px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", color: "#06b6d4" }}>
            LEARN2EARN
          </div>
          <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "32px" }}>
            Certificate of Completion
          </div>

          <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "linear-gradient(135deg, #06b6d4, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "28px" }}>
            🏆
          </div>

          <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>This is to certify that</div>
          <div style={{ fontSize: "32px", fontWeight: 800, color: "white", marginBottom: "8px", background: "linear-gradient(135deg, #06b6d4, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {studentName}
          </div>
          <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "24px" }}>has successfully completed</div>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "32px", padding: "12px 24px", border: "1px solid rgba(6,182,212,0.3)", borderRadius: "12px", display: "inline-block" }}>
            {courseName}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>Date of Completion</div>
              <div style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: 600 }}>{date}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#06b6d4" }}>Learn2Earn</div>
              <div style={{ fontSize: "10px", color: "#64748b" }}>learn2earn.in</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>Verified by</div>
              <div style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: 600 }}>AI Platform</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-[#1e293b] text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-[#1e293b] transition-all">
            Close
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" /> Download Certificate
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
