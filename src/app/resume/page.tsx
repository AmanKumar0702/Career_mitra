"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Plus, Trash2, Download, FileText, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, FolderOpen } from "lucide-react";
import toast from "react-hot-toast";

interface ResumeData {
  name: string; email: string; phone: string; location: string; summary: string;
  education: { degree: string; school: string; year: string; grade: string }[];
  skills: string[];
  experience: { title: string; company: string; duration: string; description: string }[];
  projects: { name: string; description: string; tech: string }[];
}

const defaultResume: ResumeData = {
  name: "", email: "", phone: "", location: "", summary: "",
  education: [{ degree: "", school: "", year: "", grade: "" }],
  skills: [""],
  experience: [],
  projects: [{ name: "", description: "", tech: "" }],
};

const sampleResume: ResumeData = {
  name: "Aman Kumar",
  email: "aman.kumar@email.com",
  phone: "+91 98765 43210",
  location: "Delhi, India",
  summary: "Passionate Computer Science student with hands-on experience in web development. Seeking opportunities to apply my skills in a dynamic tech environment.",
  education: [
    { degree: "B.Tech Computer Science", school: "Delhi Technological University", year: "2024", grade: "8.5 CGPA" },
    { degree: "Class 12 (PCM)", school: "DPS R.K. Puram", year: "2020", grade: "94%" },
  ],
  skills: ["React", "Node.js", "Python", "MongoDB", "TypeScript", "Git", "Figma"],
  experience: [
    { title: "Frontend Developer Intern", company: "TechStartup India", duration: "Jun 2023 – Aug 2023", description: "Built responsive React components, improved page load speed by 40%, collaborated with design team." },
  ],
  projects: [
    { name: "CareerMitra Platform", description: "Full-stack career guidance platform with AI chatbot, course management, and job portal.", tech: "Next.js, MongoDB, OpenAI" },
    { name: "E-Commerce App", description: "Built a complete shopping app with cart, payments, and admin dashboard.", tech: "React, Node.js, Stripe" },
  ],
};

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [preview, setPreview] = useState(false);

  const update = (field: keyof ResumeData, value: any) => setResume((r) => ({ ...r, [field]: value }));

  const updateArr = <T,>(field: keyof ResumeData, index: number, key: keyof T, value: string) => {
    const arr = [...(resume[field] as T[])];
    (arr[index] as any)[key] = value;
    update(field, arr);
  };

  const addItem = (field: "education" | "experience" | "projects") => {
    const templates = {
      education: { degree: "", school: "", year: "", grade: "" },
      experience: { title: "", company: "", duration: "", description: "" },
      projects: { name: "", description: "", tech: "" },
    };
    update(field, [...(resume[field] as any[]), templates[field]]);
  };

  const removeItem = (field: "education" | "experience" | "projects", i: number) => {
    update(field, (resume[field] as any[]).filter((_, idx) => idx !== i));
  };

  const loadSample = () => {
    setResume(sampleResume);
    toast.success("Sample resume loaded!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <Navbar />
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-600 via-pink-700 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-pink-200 mb-3">Resume Builder</span>
          <h1 className="text-4xl font-extrabold mb-2">Resume Builder</h1>
          <p className="text-pink-100 text-lg">Build a professional resume in minutes — free, no sign-up required</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex gap-2">
            <button onClick={loadSample} className="btn-secondary text-sm flex items-center gap-2">
              <FileText className="w-4 h-4" /> Load Sample
            </button>
            <button onClick={() => setResume(defaultResume)} className="btn-secondary text-sm flex items-center gap-2 text-red-500 hover:text-red-600">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setPreview(!preview)} className="btn-secondary flex items-center gap-2">
              <FileText className="w-4 h-4" /> {preview ? "Edit" : "Preview"}
            </button>
            <button
              onClick={() => { if (typeof window !== "undefined") { window.print(); } toast.success("Opening print dialog..."); }}
              className="btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>

        {!preview ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Info */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl"><User className="w-4 h-4 text-blue-600" /></div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Personal Information</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Full Name</label>
                  <input className="input" placeholder="Aman Kumar" value={resume.name} onChange={(e) => update("name", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Email</label>
                    <input className="input" placeholder="aman@email.com" value={resume.email} onChange={(e) => update("email", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Phone</label>
                    <input className="input" placeholder="+91 98765 43210" value={resume.phone} onChange={(e) => update("phone", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Location</label>
                  <input className="input" placeholder="Delhi, India" value={resume.location} onChange={(e) => update("location", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Professional Summary</label>
                  <textarea className="input resize-none" rows={3} placeholder="Brief summary about yourself and your goals..." value={resume.summary} onChange={(e) => update("summary", e.target.value)} />
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl"><Code className="w-4 h-4 text-purple-600" /></div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Skills</h3>
              </div>
              <div className="space-y-2">
                {resume.skills.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input className="input flex-1" placeholder="e.g. Python, React, Excel..." value={s} onChange={(e) => { const arr = [...resume.skills]; arr[i] = e.target.value; update("skills", arr); }} />
                    <button onClick={() => update("skills", resume.skills.filter((_, idx) => idx !== i))} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={() => update("skills", [...resume.skills, ""])} className="btn-secondary w-full py-2 text-sm flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </div>
              {resume.skills.filter(Boolean).length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-400 mb-2">Preview:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {resume.skills.filter(Boolean).map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Education */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-xl"><GraduationCap className="w-4 h-4 text-green-600" /></div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Education</h3>
              </div>
              {resume.education.map((edu, i) => (
                <div key={i} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 mb-3 bg-gray-50/50 dark:bg-gray-800/30">
                  <div className="grid grid-cols-2 gap-3">
                    {(["degree", "school", "year", "grade"] as const).map((f) => (
                      <div key={f}>
                        <label className="block text-xs font-medium text-gray-400 mb-1 capitalize">{f === "grade" ? "Grade/CGPA" : f}</label>
                        <input className="input text-sm py-2" placeholder={f === "degree" ? "B.Tech CSE" : f === "school" ? "IIT Delhi" : f === "year" ? "2024" : "8.5 CGPA"} value={edu[f]} onChange={(e) => updateArr<typeof edu>("education", i, f, e.target.value)} />
                      </div>
                    ))}
                  </div>
                  {resume.education.length > 1 && (
                    <button onClick={() => removeItem("education", i)} className="text-red-400 text-xs mt-2 flex items-center gap-1 hover:text-red-600">
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => addItem("education")} className="btn-secondary w-full py-2 text-sm flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </Card>

            {/* Experience */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl"><Briefcase className="w-4 h-4 text-orange-600" /></div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Work Experience</h3>
              </div>
              {resume.experience.length === 0 && (
                <div className="text-center py-6 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl mb-3">
                  <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No experience added yet</p>
                  <p className="text-xs mt-1">Internships, part-time jobs, freelance work</p>
                </div>
              )}
              {resume.experience.map((exp, i) => (
                <div key={i} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 mb-3 bg-gray-50/50 dark:bg-gray-800/30 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input className="input text-sm py-2" placeholder="Job Title" value={exp.title} onChange={(e) => updateArr<typeof exp>("experience", i, "title", e.target.value)} />
                    <input className="input text-sm py-2" placeholder="Company" value={exp.company} onChange={(e) => updateArr<typeof exp>("experience", i, "company", e.target.value)} />
                  </div>
                  <input className="input text-sm py-2" placeholder="Duration (e.g. Jun 2023 – Aug 2023)" value={exp.duration} onChange={(e) => updateArr<typeof exp>("experience", i, "duration", e.target.value)} />
                  <textarea className="input text-sm py-2 resize-none" rows={2} placeholder="Key responsibilities and achievements..." value={exp.description} onChange={(e) => updateArr<typeof exp>("experience", i, "description", e.target.value)} />
                  <button onClick={() => removeItem("experience", i)} className="text-red-400 text-xs flex items-center gap-1 hover:text-red-600">
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              ))}
              <button onClick={() => addItem("experience")} className="btn-secondary w-full py-2 text-sm flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </Card>

            {/* Projects */}
            <Card className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-xl"><FolderOpen className="w-4 h-4 text-teal-600" /></div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Projects</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resume.projects.map((proj, i) => (
                  <div key={i} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-800/30 space-y-2">
                    <input className="input text-sm py-2" placeholder="Project Name" value={proj.name} onChange={(e) => updateArr<typeof proj>("projects", i, "name", e.target.value)} />
                    <input className="input text-sm py-2" placeholder="Tech Stack (React, Node.js, MongoDB...)" value={proj.tech} onChange={(e) => updateArr<typeof proj>("projects", i, "tech", e.target.value)} />
                    <textarea className="input text-sm py-2 resize-none" rows={2} placeholder="Brief description of what you built..." value={proj.description} onChange={(e) => updateArr<typeof proj>("projects", i, "description", e.target.value)} />
                    {resume.projects.length > 1 && (
                      <button onClick={() => removeItem("projects", i)} className="text-red-400 text-xs flex items-center gap-1 hover:text-red-600">
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => addItem("projects")} className="btn-secondary mt-4 py-2 text-sm flex items-center justify-center gap-2 w-full md:w-auto px-6">
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </Card>
          </div>
        ) : (
          /* Resume Preview */
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden print:shadow-none print:rounded-none">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white p-8">
              <h1 className="text-3xl font-extrabold mb-1">{resume.name || "Your Name"}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-primary-100">
                {resume.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{resume.email}</span>}
                {resume.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{resume.phone}</span>}
                {resume.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{resume.location}</span>}
              </div>
              {resume.summary && <p className="mt-3 text-primary-100 text-sm leading-relaxed">{resume.summary}</p>}
            </div>

            <div className="p-8 space-y-6">
              {resume.skills.filter(Boolean).length > 0 && (
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white mb-3 uppercase text-xs tracking-widest text-primary-600">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.filter(Boolean).map((s) => (
                      <span key={s} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-sm rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {resume.education.filter((e) => e.degree).length > 0 && (
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white mb-3 uppercase text-xs tracking-widest text-primary-600">Education</h2>
                  <div className="space-y-3">
                    {resume.education.filter((e) => e.degree).map((edu, i) => (
                      <div key={i} className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{edu.degree}</div>
                          <div className="text-sm text-gray-500">{edu.school}</div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>{edu.year}</div>
                          <div className="font-medium text-primary-600">{edu.grade}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.experience.filter((e) => e.title).length > 0 && (
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white mb-3 uppercase text-xs tracking-widest text-primary-600">Experience</h2>
                  <div className="space-y-4">
                    {resume.experience.filter((e) => e.title).map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{exp.title}</div>
                            <div className="text-sm text-primary-600 font-medium">{exp.company}</div>
                          </div>
                          <div className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{exp.duration}</div>
                        </div>
                        {exp.description && <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.projects.filter((p) => p.name).length > 0 && (
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white mb-3 uppercase text-xs tracking-widest text-primary-600">Projects</h2>
                  <div className="space-y-3">
                    {resume.projects.filter((p) => p.name).map((proj, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">{proj.name}</span>
                          {proj.tech && <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{proj.tech}</span>}
                        </div>
                        {proj.description && <p className="text-sm text-gray-500">{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
