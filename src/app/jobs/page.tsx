"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import {
  Briefcase, MapPin, Search, Bell, BellOff, ExternalLink,
  Loader2, CheckCircle, TrendingUp, Building2, Sparkles,
  Clock, IndianRupee, RefreshCw, Filter,
} from "lucide-react";
import toast from "react-hot-toast";

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
}

const typeColors: Record<JobType, "default" | "success" | "warning" | "default"> = {
  internship: "default", "full-time": "success", "part-time": "warning", remote: "default",
};
const typeIcons: Record<string, string> = {
  internship: "🎓", "full-time": "💼", "part-time": "⏰", remote: "🌐",
};
const companyColors = [
  "from-orange-500 to-orange-700", "from-pink-500 to-pink-700", "from-purple-500 to-purple-700",
  "from-blue-500 to-blue-700", "from-green-500 to-green-700", "from-teal-500 to-teal-700",
  "from-red-500 to-red-700", "from-indigo-500 to-indigo-700", "from-yellow-500 to-yellow-600",
  "from-cyan-500 to-cyan-700",
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function JobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [applying, setApplying] = useState<string | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const lastCountRef = useRef(0);

  const fetchJobs = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter !== "all") params.set("type", typeFilter);
      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      const list: Job[] = Array.isArray(data) ? data : [];
      setJobs(list);
      if (silent && notificationsOn && list.length > lastCountRef.current && lastCountRef.current > 0) {
        toast(`🆕 ${list.length - lastCountRef.current} new job${list.length - lastCountRef.current > 1 ? "s" : ""} posted!`, {
          duration: 4000, icon: "🔔",
        });
      }
      lastCountRef.current = list.length;
    } catch {
      if (!silent) toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [typeFilter, notificationsOn]);

  useEffect(() => { fetchJobs(); }, [typeFilter]);

  useEffect(() => {
    if (session) {
      fetch("/api/user").then((r) => r.json()).then((u) => setAppliedJobs(u.appliedJobs || [])).catch(() => {});
    }
  }, [session]);

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
    if (job.applyUrl && job.applyUrl !== "#") {
      window.open(job.applyUrl, "_blank", "noopener,noreferrer");
    }
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
        toast.error(err.message || "Failed to track application");
      } finally {
        setApplying(null);
      }
    }
  };

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    return !q || j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.skills?.some((s) => s.toLowerCase().includes(q)) ||
      j.location?.toLowerCase().includes(q);
  });

  const stats = {
    total: jobs.length,
    internships: jobs.filter((j) => j.type === "internship").length,
    fullTime: jobs.filter((j) => j.type === "full-time").length,
    remote: jobs.filter((j) => j.type === "remote").length,
    newToday: jobs.filter((j) => (Date.now() - new Date(j.postedAt || "").getTime()) < 86400000).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-200 mb-3">Job Portal</span>
              <h1 className="text-4xl font-extrabold mb-2">Opportunities</h1>
              <p className="text-orange-100 text-lg mb-4">Curated internships & jobs for students and freshers</p>
              <div className="flex flex-wrap gap-5 text-sm text-orange-100">
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {stats.total} Listings</span>
                <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> {stats.internships} Internships</span>
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {stats.fullTime} Full-time</span>
                <span className="flex items-center gap-1.5 font-semibold text-green-300">{stats.newToday} added today</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 self-start">
              <button
                onClick={() => {
                  const next = !notificationsOn;
                  setNotificationsOn(next);
                  toast(next ? "🔔 Job alerts ON!" : "🔕 Job alerts OFF");
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  notificationsOn
                    ? "bg-green-400 text-green-900 hover:bg-green-300"
                    : "bg-white text-orange-600 hover:bg-orange-50"
                }`}
              >
                {notificationsOn ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                {notificationsOn ? "Alerts ON ✓" : "Get Job Alerts"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search + Filters row */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              className="input pl-12 py-3.5"
              placeholder="Search by title, company, skill, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400 hidden sm:block flex-shrink-0" />
            {["all", "internship", "full-time", "part-time", "remote"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  typeFilter === t
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white dark:bg-[#0f172a] border-gray-200 dark:border-[#1e293b] text-gray-600 dark:text-slate-400 hover:border-orange-400"
                }`}
              >
                {t !== "all" && <span className="mr-1">{typeIcons[t]}</span>}
                {t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}
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

        {/* Status bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> opportunities found
            {typeFilter !== "all" && <> · <span className="text-orange-500 font-medium capitalize">{typeFilter}</span></>}
          </p>
          <div className="flex items-center gap-3">
            {session && appliedJobs.length > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
                <CheckCircle className="w-3.5 h-3.5" /> {appliedJobs.length} applied
              </span>
            )}
            {notificationsOn && (
              <span className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-medium">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" /> Auto-refreshing
              </span>
            )}
          </div>
        </div>

        {/* Job Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            <p className="text-gray-400 text-sm">Loading opportunities...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-200 dark:text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No opportunities found</h3>
            <p className="text-gray-400 text-sm">Try different filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-stagger">
            {filtered.map((job, idx) => {
              const applied = appliedJobs.includes(job._id);
              const colorClass = companyColors[idx % companyColors.length];
              return (
                <div
                  key={job._id}
                  className="group bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-[#1e293b] hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-0.5 transition-all duration-200 flex flex-col card-shine"
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-gray-50 dark:border-[#1e293b]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center font-bold text-white text-base flex-shrink-0`}>
                          {job.company?.[0]}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 truncate">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <Badge variant={typeColors[job.type as JobType] ?? "default"} className="capitalize text-xs">
                          {typeIcons[job.type]} {job.type}
                        </Badge>
                        {job.isNewListing && (
                <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">New</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.skills?.slice(0, 4).map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-gray-100 dark:bg-[#1e293b] text-gray-600 dark:text-slate-400 text-xs rounded-full">{s}</span>
                      ))}
                      {job.skills?.length > 4 && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-[#1e293b] text-gray-400 text-xs rounded-full">+{job.skills.length - 4}</span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-slate-500 mb-4 pt-3 border-t border-gray-50 dark:border-[#1e293b]">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      {job.salary && (
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                          <IndianRupee className="w-3 h-3" />{job.salary}
                        </span>
                      )}
                      <span className="flex items-center gap-1 ml-auto">
                        <Clock className="w-3 h-3" />{timeAgo(job.postedAt || new Date().toISOString())}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => handleApply(job)}
                        disabled={applying === job._id}
                        className={`flex-1 py-2.5 text-sm rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                          applied
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                            : "bg-orange-500 hover:bg-orange-400 text-white"
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
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#1e293b] text-gray-500 dark:text-slate-400 hover:border-orange-400 hover:text-orange-500 transition-all"
                          title="Open company careers page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && filtered.length > 0 && (
          <div className="mt-12 text-center rounded-2xl p-8 border border-orange-100 dark:border-[#1e293b]"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.05), rgba(236,72,153,0.05))" }}>
            <Sparkles className="w-10 h-10 text-orange-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Next Opportunity Awaits</h3>
            <p className="text-gray-500 dark:text-slate-400 text-sm">Apply early — most listings close within 7 days of posting.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
