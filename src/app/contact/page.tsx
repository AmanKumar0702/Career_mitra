"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all required fields"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e]">
      <Navbar />

      <section className="relative bg-gradient-to-br from-cyan-600 to-indigo-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <MessageSquare className="w-10 h-10 mx-auto mb-4 text-cyan-200" />
            <h1 className="text-4xl font-extrabold mb-3">Get in Touch</h1>
            <p className="text-cyan-100 text-lg">Have a question, partnership idea or feedback? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "hello@learn2earn.in" },
                  { icon: MapPin, label: "Location", value: "India (Remote-first)" },
                  { icon: MessageSquare, label: "Response Time", value: "Within 24 hours" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 dark:text-slate-500">{label}</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-5 border border-cyan-100 dark:border-cyan-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">For Schools & Institutions</h3>
              <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                Interested in bulk enrollment for your school or college? We offer special institutional plans. Reach out to discuss partnerships.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-500 dark:text-slate-400">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Name *</label>
                    <input className="input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Email *</label>
                    <input type="email" className="input" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Subject</label>
                  <input className="input" placeholder="What is this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Message *</label>
                  <textarea className="input min-h-[140px] resize-none" placeholder="Tell us more..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
