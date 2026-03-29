"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

// ─── Education Data ────────────────────────────────────────────────────────────
const educationGroups = [
  {
    group: "School Level",
    icon: "🏫",
    options: [
      { value: "Below 10th", label: "Below 10th", desc: "Currently studying below Class 10" },
      { value: "10th Pass", label: "10th Pass (SSC/CBSE/ICSE)", desc: "Completed Class 10" },
      { value: "10th Appearing", label: "10th Appearing", desc: "Currently in Class 10" },
    ],
  },
  {
    group: "12th / Intermediate",
    icon: "📚",
    options: [
      { value: "12th Science (PCM)", label: "12th Science — PCM", desc: "Physics, Chemistry, Maths" },
      { value: "12th Science (PCB)", label: "12th Science — PCB", desc: "Physics, Chemistry, Biology" },
      { value: "12th Science (PCMB)", label: "12th Science — PCMB", desc: "Physics, Chemistry, Maths & Biology" },
      { value: "12th Commerce", label: "12th Commerce", desc: "Accountancy, Business Studies, Economics" },
      { value: "12th Arts/Humanities", label: "12th Arts / Humanities", desc: "History, Political Science, Sociology etc." },
      { value: "12th Vocational", label: "12th Vocational", desc: "Vocational / Skill-based stream" },
      { value: "12th Appearing", label: "12th Appearing", desc: "Currently in Class 12" },
    ],
  },
  {
    group: "Diploma & Certificate",
    icon: "📜",
    options: [
      { value: "Diploma (Engineering)", label: "Diploma — Engineering", desc: "3-year polytechnic diploma" },
      { value: "Diploma (Pharmacy)", label: "Diploma — Pharmacy (D.Pharm)", desc: "Pharmacy diploma" },
      { value: "Diploma (Computer)", label: "Diploma — Computer Applications", desc: "DCA / PGDCA" },
      { value: "Diploma (Design)", label: "Diploma — Design / Fine Arts", desc: "Design or arts diploma" },
      { value: "ITI", label: "ITI (Industrial Training)", desc: "Trade certificate from ITI" },
      { value: "Certificate Course", label: "Certificate Course", desc: "Short-term skill certificate" },
    ],
  },
  {
    group: "Undergraduate (UG)",
    icon: "🎓",
    options: [
      { value: "B.Tech / B.E.", label: "B.Tech / B.E.", desc: "Engineering degree (4 years)" },
      { value: "B.Sc", label: "B.Sc (Science)", desc: "Bachelor of Science" },
      { value: "B.Com", label: "B.Com (Commerce)", desc: "Bachelor of Commerce" },
      { value: "BBA", label: "BBA (Business Administration)", desc: "Bachelor of Business Administration" },
      { value: "B.A.", label: "B.A. (Arts / Humanities)", desc: "Bachelor of Arts" },
      { value: "BCA", label: "BCA (Computer Applications)", desc: "Bachelor of Computer Applications" },
      { value: "MBBS", label: "MBBS (Medicine)", desc: "Bachelor of Medicine & Surgery" },
      { value: "B.Pharm", label: "B.Pharm (Pharmacy)", desc: "Bachelor of Pharmacy" },
      { value: "B.Arch", label: "B.Arch (Architecture)", desc: "Bachelor of Architecture" },
      { value: "LLB", label: "LLB (Law)", desc: "Bachelor of Laws" },
      { value: "B.Ed", label: "B.Ed (Education)", desc: "Bachelor of Education" },
      { value: "BHM", label: "BHM (Hotel Management)", desc: "Bachelor of Hotel Management" },
      { value: "UG Other", label: "Other UG Degree", desc: "Any other undergraduate degree" },
    ],
  },
  {
    group: "Postgraduate (PG)",
    icon: "🏆",
    options: [
      { value: "M.Tech / M.E.", label: "M.Tech / M.E.", desc: "Master of Technology / Engineering" },
      { value: "M.Sc", label: "M.Sc (Science)", desc: "Master of Science" },
      { value: "M.Com", label: "M.Com (Commerce)", desc: "Master of Commerce" },
      { value: "MBA", label: "MBA (Business Administration)", desc: "Master of Business Administration" },
      { value: "MCA", label: "MCA (Computer Applications)", desc: "Master of Computer Applications" },
      { value: "M.A.", label: "M.A. (Arts / Humanities)", desc: "Master of Arts" },
      { value: "MD / MS", label: "MD / MS (Medicine)", desc: "Medical postgraduate degree" },
      { value: "LLM", label: "LLM (Law)", desc: "Master of Laws" },
      { value: "M.Ed", label: "M.Ed (Education)", desc: "Master of Education" },
      { value: "PG Other", label: "Other PG Degree", desc: "Any other postgraduate degree" },
    ],
  },
  {
    group: "Doctorate & Research",
    icon: "🔬",
    options: [
      { value: "PhD", label: "Ph.D (Doctorate)", desc: "Doctor of Philosophy" },
      { value: "M.Phil", label: "M.Phil (Research)", desc: "Master of Philosophy" },
    ],
  },
];

const interestOptions = [
  { label: "Technology & Coding", icon: "💻" },
  { label: "Science & Research", icon: "🔬" },
  { label: "Business & Startups", icon: "📈" },
  { label: "Arts & Design", icon: "🎨" },
  { label: "Medicine & Healthcare", icon: "🩺" },
  { label: "Law & Justice", icon: "⚖️" },
  { label: "Finance & Banking", icon: "💰" },
  { label: "Education & Teaching", icon: "📖" },
  { label: "Engineering", icon: "⚙️" },
  { label: "Media & Journalism", icon: "📰" },
  { label: "Government & Civil Services", icon: "🏛️" },
  { label: "Sports & Fitness", icon: "🏅" },
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>("12th / Intermediate");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    educationLevel: "",
    interests: [] as string[],
    careerGoals: "",
  });

  const toggleInterest = (interest: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((x) => x !== interest)
        : [...f.interests, interest],
    }));
  };

  const validateStep1 = () => {
    if (!form.name.trim()) { toast.error("Please enter your name"); return false; }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) { toast.error("Please enter a valid email"); return false; }
    if (form.password.length < 8) { toast.error("Password must be at least 8 characters"); return false; }
    return true;
  };

  const validateStep2 = () => {
    if (!form.educationLevel) { toast.error("Please select your education level"); return false; }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.toLowerCase().trim(),
          password: form.password,
          educationLevel: form.educationLevel,
          interests: form.interests,
          careerGoals: form.careerGoals ? [form.careerGoals] : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Signup failed. Please try again."); return; }
      toast.success("Account created! Please sign in.");
      router.push("/auth/login");
    } catch {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050810] bg-grid p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-500 font-bold text-2xl">
            <GraduationCap className="w-8 h-8" /> CareerMitra
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">Create your account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Join 50,000+ students building their career</p>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {["Basic Info", "Education", "Interests"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${i + 1 <= step ? "bg-cyan-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`}>
                  {i + 1 < step ? <CheckCircle2 className="w-3 h-3" /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 2 && <div className={`w-6 h-0.5 rounded ${i + 1 < step ? "bg-cyan-500" : "bg-gray-200 dark:bg-gray-700"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          {/* ── Step 1: Basic Info ── */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Basic Information</h2>
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <input className="input" placeholder="e.g. Aman Kumar" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email Address</label>
                <input type="email" className="input" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    className="input pr-10"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${form.password.length >= i * 3 ? i <= 1 ? "bg-red-400" : i <= 2 ? "bg-yellow-400" : i <= 3 ? "bg-blue-400" : "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">{form.password.length < 4 ? "Weak" : form.password.length < 8 ? "Fair" : form.password.length < 12 ? "Good" : "Strong"}</span>
                  </div>
                )}
              </div>
              <button className="btn-primary w-full py-3 flex items-center justify-center gap-2" onClick={() => { if (validateStep1()) setStep(2); }}>
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── Step 2: Education ── */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Your Education</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Select your current or highest qualification</p>
              </div>

              {form.educationLevel && (
                <div className="flex items-center gap-2 px-3 py-2 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl text-sm text-cyan-700 dark:text-cyan-400">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Selected: <strong>{form.educationLevel}</strong></span>
                </div>
              )}

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {educationGroups.map((group) => (
                  <div key={group.group} className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                    {/* Group Header */}
                    <button
                      type="button"
                      onClick={() => setExpandedGroup(expandedGroup === group.group ? null : group.group)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="flex items-center gap-2 font-medium text-sm text-gray-700 dark:text-gray-300">
                        <span>{group.icon}</span> {group.group}
                      </span>
                      <span className="text-gray-400 text-xs">{expandedGroup === group.group ? "▲" : "▼"}</span>
                    </button>

                    {/* Group Options */}
                    {expandedGroup === group.group && (
                      <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
                        {group.options.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setForm({ ...form, educationLevel: opt.value })}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all ${
                              form.educationLevel === opt.value
                                ? "bg-cyan-50 dark:bg-cyan-900/20"
                                : "bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-gray-800/30"
                            }`}
                          >
                            <div>
                              <div className={`text-sm font-medium ${form.educationLevel === opt.value ? "text-cyan-700 dark:text-cyan-400" : "text-gray-800 dark:text-gray-200"}`}>
                                {opt.label}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
                            </div>
                            {form.educationLevel === opt.value && (
                              <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" className="btn-secondary flex-1 py-3 flex items-center justify-center gap-2" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button type="button" className="btn-primary flex-1 py-3 flex items-center justify-center gap-2" onClick={() => { if (validateStep2()) setStep(3); }}>
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Interests ── */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Your Interests</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Pick any that excite you — we'll personalise your experience</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map(({ label, icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleInterest(label)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm border transition-all text-left ${
                      form.interests.includes(label)
                        ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 font-medium"
                        : "border-gray-200 dark:border-[#1e293b] text-gray-700 dark:text-gray-300 hover:border-cyan-300"
                    }`}
                  >
                    <span className="text-base">{icon}</span>
                    <span className="leading-tight">{label}</span>
                    {form.interests.includes(label) && <CheckCircle2 className="w-3.5 h-3.5 ml-auto flex-shrink-0" />}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Career Goal <span className="text-gray-400 font-normal">(optional)</span></label>
                <input
                  className="input"
                  placeholder="e.g. Software Engineer, Doctor, CA, IAS Officer..."
                  value={form.careerGoals}
                  onChange={(e) => setForm({ ...form, careerGoals: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" className="btn-secondary flex-1 py-3 flex items-center justify-center gap-2" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  className="btn-primary flex-1 py-3 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating...</>
                  ) : "Create Account 🎉"}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-500 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
