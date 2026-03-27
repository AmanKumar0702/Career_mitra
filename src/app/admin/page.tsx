"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, BookOpen, ClipboardList, Briefcase, Users } from "lucide-react";
import toast from "react-hot-toast";
import { sampleCourses } from "@/data/courses";
import { sampleJobs } from "@/data/jobs";

type Tab = "courses" | "tests" | "jobs";

const staticTests = [
  { title: "Python Basics Quiz", category: "Technology", questions: 5, duration: 20 },
  { title: "General Aptitude Test", category: "Aptitude", questions: 4, duration: 30 },
  { title: "Class 10 Science MCQ", category: "Science", questions: 3, duration: 25 },
];

export default function AdminPage() {
  const { status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("courses");
  const [courses, setCourses] = useState(sampleCourses);
  const [jobs, setJobs] = useState(sampleJobs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  const stats = [
    { icon: BookOpen, label: "Total Courses", value: courses.length, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
    { icon: ClipboardList, label: "Total Tests", value: staticTests.length, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
    { icon: Briefcase, label: "Job Listings", value: jobs.length, color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20" },
    { icon: Users, label: "Students", value: "50K+", color: "text-green-600 bg-green-50 dark:bg-green-900/20" },
  ];

  const openAdd = () => { setEditItem(null); setForm({}); setModalOpen(true); };
  const openEdit = (item: any) => { setEditItem(item); setForm({ ...item, skills: Array.isArray(item.skills) ? item.skills.join(", ") : item.skills }); setModalOpen(true); };

  const handleSave = () => {
    if (tab === "courses") {
      if (editItem) {
        setCourses((c) => c.map((x) => (x.title === editItem.title ? { ...x, ...form } : x)));
      } else {
        setCourses((c) => [...c, { ...form, enrolledCount: 0, rating: 4.5, lessons: [] }]);
      }
    } else if (tab === "jobs") {
      const skillsArr = typeof form.skills === "string"
        ? form.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
        : form.skills || [];
      if (editItem) {
        setJobs((j) => j.map((x) => (x.title === editItem.title ? { ...x, ...form, skills: skillsArr } : x)));
      } else {
        setJobs((j) => [...j, { ...form, skills: skillsArr, isNew: true }]);
      }
    }
    setModalOpen(false);
    toast.success(editItem ? "Updated successfully!" : "Added successfully!");
  };

  const handleDelete = (title: string) => {
    if (tab === "courses") setCourses((c) => c.filter((x) => x.title !== title));
    else if (tab === "jobs") setJobs((j) => j.filter((x) => x.title !== title));
    toast.success("Deleted successfully!");
  };

  if (status === "loading") return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Panel</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage courses, tests, and job listings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <Card key={label} className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["courses", "tests", "jobs"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                tab === t
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              {t}
            </button>
          ))}
          <button onClick={openAdd} className="btn-primary ml-auto flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Add {tab.slice(0, -1)}
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  {tab === "courses" && ["Title", "Category", "Level", "Enrolled", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 font-medium text-gray-500 dark:text-gray-400">{h}</th>
                  ))}
                  {tab === "jobs" && ["Title", "Company", "Type", "Location", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 font-medium text-gray-500 dark:text-gray-400">{h}</th>
                  ))}
                  {tab === "tests" && ["Title", "Category", "Questions", "Duration", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 font-medium text-gray-500 dark:text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {tab === "courses" && courses.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{c.title}</td>
                    <td className="px-6 py-4 text-gray-500">{c.category}</td>
                    <td className="px-6 py-4">
                      <Badge variant={c.level === "beginner" ? "success" : c.level === "intermediate" ? "warning" : "danger"}>
                        {c.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{c.enrolledCount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(c.title)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {tab === "jobs" && jobs.map((j, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{j.title}</td>
                    <td className="px-6 py-4 text-gray-500">{j.company}</td>
                    <td className="px-6 py-4">
                      <Badge variant="default" className="capitalize">{j.type}</Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{j.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(j)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(j.title)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {tab === "tests" && staticTests.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{t.title}</td>
                    <td className="px-6 py-4 text-gray-500">{t.category}</td>
                    <td className="px-6 py-4 text-gray-500">{t.questions}</td>
                    <td className="px-6 py-4 text-gray-500">{t.duration} min</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${editItem ? "Edit" : "Add"} ${tab.slice(0, -1)}`}
      >
        <div className="space-y-3">
          {tab === "courses" && (
            <>
              <input className="input" placeholder="Title" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className="input" placeholder="Category" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <textarea className="input resize-none" rows={3} placeholder="Description" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <select className="input" value={form.level || "beginner"} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </>
          )}
          {tab === "jobs" && (
            <>
              <input className="input" placeholder="Job Title" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className="input" placeholder="Company" value={form.company || ""} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <input className="input" placeholder="Location" value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <input className="input" placeholder="Skills (comma separated)" value={form.skills || ""} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
              <select className="input" value={form.type || "internship"} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="internship">Internship</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="remote">Remote</option>
              </select>
            </>
          )}
          <div className="flex gap-3 pt-2">
            <button className="btn-secondary flex-1 py-2.5" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn-primary flex-1 py-2.5" onClick={handleSave}>Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}