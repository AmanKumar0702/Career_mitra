"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Briefcase, MapPin, Search, Bell, BellOff, ExternalLink,
  Loader2, CheckCircle, Filter, TrendingUp, Building2,
  Sparkles, X, Clock, ChevronRight, IndianRupee, RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

// ── Types ──────────────────────────────────────────────────────────────────────
type JobType = "internship" | "full-time" | "part-time" | "remote";
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  description: string;
  skills: string[];
  educationLevel: string;
  salary?: string;
  applyUrl?: string;
  isNewListing: boolean;
  postedAt: string;
  matchScore?: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const typeColors: Record<JobType, "default" | "success" | "warning" | "purple"> = {
  internship: "default", "full-time": "success", "part-time": "warning", remote: "purple",
};
const typeIcons: Record<string, string> = {
  internship: "🎓", "full-time": "💼", "part-time": "⏰", remote: "🌐",
};
const companyColors = [
  "from-blue-500 to-blue-700", "from-purple-500 to-purple-700", "from-green-500 to-green-700",
  "from-orange-500 to-orange-700", "from-pink-500 to-pink-700", "from-teal-500 to-teal-700",
  "from-red-500 to-red-700", "from-indigo-500 to-indigo-700", "from-yellow-500 to-yellow-600",
  "from-cyan-500 to-cyan-700",
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// ── Smart Match Popup ──────────────────────────────────────────────────────────
function MatchPopup({ matches, onClose, onApply, appliedJobs }: {
  matches: Job[];
  onClose: () => void;
  onApply: (job: Job) => void;
  appliedJobs: string[];
}) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const job = matches[current];
  if (!job) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-primary-100 dark:border-primary-900/50 w-80 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Matched for You!</span>
            <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">{matches.length}</span>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Job Card */}
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${companyColors[current % companyColors.length]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
              {job.company?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight truncate">{job.title}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{job.company}</p>
            </div>
            <Badge variant={typeColors[job.type] ?? "default"} className="text-xs flex-shrink-0 capitalize">
              {typeIcons[job.type]} {job.type}
            </Badge>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
            {job.salary && <span className="flex items-center gap-1 text-green-600 font-medium"><IndianRupee className="w-3 h-3" />{job.salary}</span>}
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {job.skills?.slice(0, 3).map((s) => (
              <span key={s} className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs rounded-full">{s}</span>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { onApply(job); if (job.applyUrl && job.applyUrl !== "#") window.open(job.applyUrl, "_blank", "noopener,noreferrer"); }}
              disabled={appliedJobs.includes(job._id)}
              className={`flex-1 py-2 text-xs rounded-xl font-semibold transition-all flex items-center justify-center gap-1 ${
                appliedJobs.includes(job._id)
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 border border-green-200"
                  : "btn-primary"
              }`}
            >
              {appliedJobs.includes(job._id) ? <><CheckCircle className="w-3 h-3" /> Applied</> : "Apply Now"}
            </button>
            {matches.length > 1 && (
              <button
                onClick={() => setCurrent((c) => (c + 1) % matches.length)}
                className="btn-secondary px-3 py-2 text-xs flex items-center gap-1"
              >
                Next <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Dots */}
        {matches.length > 1 && (
          <div className="flex justify-center gap-1.5 pb-3">
            {matches.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-primary-600 w-3" : "bg-gray-300 dark:bg-gray-600"}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function OpportunitiesPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [liveJobs, setLiveJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [liveLoading, setLiveLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [liveSearch, setLiveSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"local" | "live">("local");
  const [typeFilter, setTypeFilter] = useState("all");
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [applying, setApplying] = useState<string | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [lastJobCount, setLastJobCount] = useState(0);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const hasShownPopup = useRef(false);
  const liveSearchTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchJobs = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter !== "all") params.set("type", typeFilter);
      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      const jobList: Job[] = Array.isArray(data) ? data : [];
      setJobs(jobList);

      // Detect new jobs since last poll
      if (silent && notificationsOn && jobList.length > lastJobCount && lastJobCount > 0) {
        const newCount = jobList.length - lastJobCount;
        toast(`🆕 ${newCount} new opportunit${newCount > 1 ? "ies" : "y"} just posted!`, {
          duration: 5000,
          icon: "🔔",
          style: { background: "#3b82f6", color: "white", fontWeight: "600" },
        });
      }
      setLastJobCount(jobList.length);
    } catch {
      if (!silent) toast.error("Failed to load opportunities");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [typeFilter, notificationsOn, lastJobCount]);

  // Initial load
  useEffect(() => { fetchJobs(); }, [typeFilter]);

  // Live job search with debounce
  const searchLiveJobs = useCallback(async (query: string) => {
    if (!query.trim()) { setLiveJobs([]); return; }
    setLiveLoading(true);
    try {
      const res = await fetch(`/api/jobs/external?query=${encodeURIComponent(query + " India")}`);
      const data = await res.json();
      if (data.jobs) {
        setLiveJobs(data.jobs);
        if (data.jobs.length > 0) {
          toast.success(`Found ${data.jobs.length} live jobs for "${query}"`, { duration: 3000 });
        } else {
          toast("No live results found. Try a different keyword.", { icon: "🔍" });
        }
      }
    } catch {
      toast.error("Live search failed. Check your API key.");
    } finally {
      setLiveLoading(false);
    }
  }, []);

  const handleLiveSearch = (value: string) => {
    setLiveSearch(value);
    if (liveSearchTimer.current) clearTimeout(liveSearchTimer.current);
    if (value.trim().length > 2) {
      liveSearchTimer.current = setTimeout(() => searchLiveJobs(value), 800);
    } else {
      setLiveJobs([]);
    }
  };

  // Fetch user profile + matched jobs
  useEffect(() => {
    if (!session) return;
    fetch("/api/user").then((r) => r.json()).then((u) => {
      setAppliedJobs(u.appliedJobs || []);
    }).catch(() => {});

    // Fetch smart matches
    fetch("/api/jobs/match").then((r) => r.json()).then((data) => {
      if (data.matches?.length > 0) {
        setMatchedJobs(data.matches);
        // Show popup after 2 seconds on first visit
        if (!hasShownPopup.current) {
          setTimeout(() => { setShowPopup(true); hasShownPopup.current = true; }, 2000);
        }
      }
    }).catch(() => {});
  }, [session]);

  // Polling every 30 seconds when notifications are on
  useEffect(() => {
    if (notificationsOn) {
      pollRef.current = setInterval(() => fetchJobs(true), 30000);
    } else {
      if (pollRef.current) clearInterval(pollRef.current);
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [notificationsOn, fetchJobs]);

  const handleApply = async (job: Job) => {
    if (!session) { toast.error("Please sign in to apply"); return; }
    // Open real apply URL immediately
    if (job.applyUrl && job.applyUrl !== "#") {
      window.open(job.applyUrl, "_blank", "noopener,noreferrer");
    }
    // Mark as applied in DB (only once)
    if (!appliedJobs.includes(job._id)) {
      setApplying(job._id);
      try {
        const res = await fetch("/api/user/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId: job._id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setAppliedJobs((prev) => [...prev, job._id]);
      } catch (err: any) {
        toast.error(err.message || "Application tracking failed");
      } finally {
        setApplying(null);
      }
    }
  };

  const toggleNotifications = () => {
    const next = !notificationsOn;
    setNotificationsOn(next);
    toast(next ? "🔔 Job alerts ON — we'll notify you of new opportunities!" : "🔕 Job alerts turned off", {
      duration: 3000,
    });
    // Also show matched jobs popup when enabling
    if (next && matchedJobs.length > 0 && !showPopup) {
      setTimeout(() => setShowPopup(true), 500);
    }
  };

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    return !q || j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.skills?.some((s) => s.toLowerCase().includes(q)) ||
      j.location?.toLowerCase().includes(q);
  });

  const displayJobs = activeTab === "live" ? liveJobs : filtered;

  const stats = {
    total: jobs.length,
    internships: jobs.filter((j) => j.type === "internship").length,
    fullTime: jobs.filter((j) => j.type === "full-time").length,
    remote: jobs.filter((j) => j.type === "remote").length,
    newToday: jobs.filter((j) => {
      const d = new Date(j.postedAt || "");
      return (Date.now() - d.getTime()) < 24 * 60 * 60 * 1000;
    }).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Live Opportunities
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">Opportunities 🚀</h1>
              <p className="text-orange-100 text-lg">Curated internships & jobs for students and freshers</p>
              <div className="flex flex-wrap gap-5 mt-4 text-sm text-orange-100">
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{stats.total} Listings</span>
                <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" />{stats.internships} Internships</span>
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{stats.fullTime} Full-time</span>
                <span className="flex items-center gap-1.5 text-green-300 font-semibold">🆕 {stats.newToday} added today</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 self-start">
              <button
                onClick={toggleNotifications}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  notificationsOn
                    ? "bg-green-400 text-green-900 hover:bg-green-300"
                    : "bg-white text-orange-600 hover:bg-orange-50"
                }`}
              >
                {notificationsOn ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                {notificationsOn ? "Alerts ON ✓" : "Get Job Alerts"}
              </button>
              {session && matchedJobs.length > 0 && (
                <button
                  onClick={() => setShowPopup(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  {matchedJobs.length} Matched for You
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("local")}
            className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-all -mb-px ${
              activeTab === "local"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            📋 Curated Jobs
          </button>
          <button
            onClick={() => setActiveTab("live")}
            className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-all -mb-px flex items-center gap-2 ${
              activeTab === "live"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            🌐 Live Search
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            {activeTab === "local" ? (
              <input
                className="input pl-12 py-3.5 shadow-sm"
                placeholder="Search by title, company, skill, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            ) : (
              <div className="relative">
                <input
                  className="input pl-12 pr-32 py-3.5 shadow-sm"
                  placeholder="Search live jobs e.g. React Developer, Data Analyst..."
                  value={liveSearch}
                  onChange={(e) => handleLiveSearch(e.target.value)}
                />
                <button
                  onClick={() => searchLiveJobs(liveSearch)}
                  disabled={liveLoading || liveSearch.trim().length < 2}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-4 py-1.5 text-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {liveLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                  Search
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
            {["all", "internship", "full-time", "part-time", "remote"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  typeFilter === t
                    ? "bg-primary-600 text-white border-primary-600"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-400"
                }`}
              >
                {t !== "all" && <span className="mr-1">{typeIcons[t]}</span>}
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
            <button
              onClick={() => fetchJobs()}
              disabled={refreshing}
              className="btn-secondary px-3 py-2.5 flex items-center gap-1.5 text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Applied banner */}
        {session && appliedJobs.length > 0 && (
          <div className="mb-5 px-4 py-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-sm text-green-700 dark:text-green-400 font-medium flex items-center gap-2 border border-green-200 dark:border-green-800">
            <CheckCircle className="w-4 h-4" />
            You have applied to {appliedJobs.length} opportunit{appliedJobs.length > 1 ? "ies" : "y"} — keep going! 💪
          </div>
        )}

        {/* Matched jobs inline strip */}
        {session && matchedJobs.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/10 dark:to-purple-900/10 rounded-2xl border border-primary-100 dark:border-primary-900/30">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="font-semibold text-sm text-primary-700 dark:text-primary-400">Top Matches Based on Your Profile</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {matchedJobs.slice(0, 4).map((job, idx) => (
                <div key={job._id} className="flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl border border-primary-100 dark:border-primary-900/30 p-3 w-52">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${companyColors[idx % companyColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                      {job.company?.[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{job.title}</p>
                      <p className="text-xs text-gray-400 truncate">{job.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApply(job)}
                    disabled={appliedJobs.includes(job._id)}
                    className={`w-full py-1.5 text-xs rounded-lg font-semibold transition-all ${
                      appliedJobs.includes(job._id)
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "btn-primary"
                    }`}
                  >
                    {appliedJobs.includes(job._id) ? "Applied ✓" : "Quick Apply"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live search hint */}
        {activeTab === "live" && liveJobs.length === 0 && !liveLoading && (
          <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-center">
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Search Live Jobs from Google Jobs</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Powered by JSearch API — real-time job listings from across the web</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["React Developer India", "Data Analyst Intern", "MBA Finance Jobs", "Remote Python Developer", "Mechanical Engineer Fresher"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setLiveSearch(q); searchLiveJobs(q); }}
                  className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-primary-400 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">
              {activeTab === "live" ? liveJobs.length : filtered.length}
            </span> {activeTab === "live" ? "live results" : "opportunities found"}
          </p>
          {notificationsOn && (
            <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Auto-refreshing every 30s
            </span>
          )}
        </div>

        {/* Job Grid */}
        {(loading || liveLoading) ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
            <p className="text-gray-400 text-sm">{liveLoading ? "Searching live jobs..." : "Loading opportunities..."}</p>
          </div>
        ) : displayJobs.length === 0 && activeTab === "local" ? (
          <div className="text-center py-24">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-200 dark:text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No opportunities found</h3>
            <p className="text-gray-400">Try different filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {displayJobs.map((job, idx) => {
              const applied = appliedJobs.includes(job._id);
              const isMatch = activeTab === "local" && matchedJobs.some((m) => m._id === job._id);
              const isLive = activeTab === "live";
              const colorClass = companyColors[idx % companyColors.length];
              return (
                <Card
                  key={job._id}
                  className={`flex flex-col hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 relative ${isMatch ? "ring-2 ring-primary-400 ring-offset-2 dark:ring-offset-gray-950" : ""}`}
                >
                  {isMatch && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" /> Match
                    </div>
                  )}
                  {isLive && (
                    <div className="absolute -top-2 -left-2 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center font-bold text-white text-lg flex-shrink-0`}>
                        {job.company?.[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{job.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <Badge variant={typeColors[job.type as JobType] ?? "default"} className="capitalize text-xs">
                        {typeIcons[job.type]} {job.type}
                      </Badge>
                      {job.isNewListing && <Badge variant="success" className="text-xs">🆕 New</Badge>}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {job.skills?.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">{s}</span>
                    ))}
                    {job.skills?.length > 4 && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs rounded-full">+{job.skills.length - 4}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-t border-gray-100 dark:border-gray-800 pt-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                    {job.salary && (
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                        <IndianRupee className="w-3 h-3" />{job.salary}
                      </span>
                    )}
                    <span className="flex items-center gap-1 ml-auto text-gray-400">
                      <Clock className="w-3 h-3" />{timeAgo(job.postedAt || new Date().toISOString())}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleApply(job)}
                      disabled={applying === job._id}
                      className={`flex-1 py-2.5 text-sm rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        applied
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                          : "btn-primary"
                      }`}
                    >
                      {applying === job._id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : applied
                          ? <><CheckCircle className="w-4 h-4" /> Applied</>
                          : "Apply Now"
                      }
                    </button>
                    {job.applyUrl && job.applyUrl !== "#" && (
                      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary px-3 py-2.5" title="Open original listing">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Smart Match Popup */}
      {showPopup && matchedJobs.length > 0 && (
        <MatchPopup
          matches={matchedJobs}
          onClose={() => setShowPopup(false)}
          onApply={(job) => { handleApply(job); }}
          appliedJobs={appliedJobs}
        />
      )}

      <Footer />
    </div>
  );
}
