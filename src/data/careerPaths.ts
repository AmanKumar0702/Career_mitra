export interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  avgSalary: string;
  demand: "High" | "Medium" | "Low";
  roadmap: { step: number; title: string; skills: string[]; duration: string }[];
}

export const careerPaths: CareerPath[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Build applications, websites, and software systems used by millions of people worldwide.",
    icon: "💻",
    tags: ["technology", "coding", "programming", "computer", "tech"],
    avgSalary: "₹6–25 LPA",
    demand: "High",
    roadmap: [
      { step: 1, title: "Learn Programming Basics", skills: ["Python", "JavaScript", "C++"], duration: "3 months" },
      { step: 2, title: "Data Structures & Algorithms", skills: ["Arrays", "Trees", "Graphs", "Sorting"], duration: "3 months" },
      { step: 3, title: "Web/App Development", skills: ["React", "Node.js", "Databases"], duration: "4 months" },
      { step: 4, title: "Build Projects & Portfolio", skills: ["GitHub", "Deployment", "Open Source"], duration: "2 months" },
      { step: 5, title: "Internship & Job Applications", skills: ["Resume", "Interview Prep", "LeetCode"], duration: "Ongoing" },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze large datasets to find insights, build predictive models, and drive business decisions.",
    icon: "📊",
    tags: ["data", "analytics", "math", "statistics", "science", "technology"],
    avgSalary: "₹8–30 LPA",
    demand: "High",
    roadmap: [
      { step: 1, title: "Mathematics & Statistics", skills: ["Linear Algebra", "Probability", "Statistics"], duration: "2 months" },
      { step: 2, title: "Python for Data Science", skills: ["NumPy", "Pandas", "Matplotlib"], duration: "2 months" },
      { step: 3, title: "Machine Learning", skills: ["Scikit-learn", "Regression", "Classification"], duration: "3 months" },
      { step: 4, title: "Deep Learning & AI", skills: ["TensorFlow", "Neural Networks"], duration: "3 months" },
      { step: 5, title: "Projects & Kaggle", skills: ["Real datasets", "Competitions"], duration: "Ongoing" },
    ],
  },
  {
    id: "doctor",
    title: "Doctor (MBBS)",
    description: "Diagnose and treat patients, specialize in various medical fields, and save lives every day.",
    icon: "🩺",
    tags: ["medicine", "biology", "health", "neet", "science"],
    avgSalary: "₹8–50 LPA",
    demand: "High",
    roadmap: [
      { step: 1, title: "Class 11–12 Science (PCB)", skills: ["Physics", "Chemistry", "Biology"], duration: "2 years" },
      { step: 2, title: "NEET Preparation", skills: ["NCERT Mastery", "Mock Tests", "Coaching"], duration: "1–2 years" },
      { step: 3, title: "MBBS (5.5 years)", skills: ["Anatomy", "Physiology", "Clinical Rotations"], duration: "5.5 years" },
      { step: 4, title: "Internship", skills: ["Hospital Training", "Patient Care"], duration: "1 year" },
      { step: 5, title: "MD/MS Specialization (optional)", skills: ["Specialty of choice"], duration: "3 years" },
    ],
  },
  {
    id: "ca",
    title: "Chartered Accountant",
    description: "Manage finances, auditing, taxation, and provide business advisory to companies and individuals.",
    icon: "📈",
    tags: ["commerce", "finance", "accounting", "business", "economics"],
    avgSalary: "₹7–40 LPA",
    demand: "High",
    roadmap: [
      { step: 1, title: "Class 12 Commerce", skills: ["Accountancy", "Economics", "Maths"], duration: "2 years" },
      { step: 2, title: "CA Foundation", skills: ["Principles of Accounting", "Business Laws"], duration: "4 months" },
      { step: 3, title: "CA Intermediate", skills: ["Advanced Accounting", "Taxation", "Auditing"], duration: "8 months" },
      { step: 4, title: "Articleship (3 years)", skills: ["Practical Training", "Tax Filing"], duration: "3 years" },
      { step: 5, title: "CA Final", skills: ["Financial Reporting", "Strategic Management"], duration: "6 months" },
    ],
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    description: "Create visual content for brands, media, and digital platforms. Blend creativity with technology.",
    icon: "🎨",
    tags: ["design", "art", "creative", "visual", "arts"],
    avgSalary: "₹3–15 LPA",
    demand: "Medium",
    roadmap: [
      { step: 1, title: "Design Fundamentals", skills: ["Color Theory", "Typography", "Composition"], duration: "1 month" },
      { step: 2, title: "Design Tools", skills: ["Figma", "Adobe Photoshop", "Illustrator"], duration: "2 months" },
      { step: 3, title: "UI/UX Design", skills: ["Wireframing", "Prototyping", "User Research"], duration: "2 months" },
      { step: 4, title: "Build Portfolio", skills: ["Behance", "Dribbble", "Case Studies"], duration: "2 months" },
      { step: 5, title: "Freelance / Job", skills: ["Client Communication", "Pricing"], duration: "Ongoing" },
    ],
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    description: "Start and grow your own business or startup. Turn your ideas into products that solve real problems.",
    icon: "🚀",
    tags: ["business", "startup", "entrepreneurship", "commerce", "management"],
    avgSalary: "Variable",
    demand: "High",
    roadmap: [
      { step: 1, title: "Business Fundamentals", skills: ["Marketing", "Finance", "Operations"], duration: "2 months" },
      { step: 2, title: "Idea Validation", skills: ["Market Research", "MVP", "Customer Discovery"], duration: "1 month" },
      { step: 3, title: "Build Your Product", skills: ["Product Development", "Tech/No-code tools"], duration: "3 months" },
      { step: 4, title: "Launch & Marketing", skills: ["Digital Marketing", "Sales", "Branding"], duration: "Ongoing" },
      { step: 5, title: "Scale & Fundraise", skills: ["Pitch Deck", "Investors", "Team Building"], duration: "Ongoing" },
    ],
  },
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    description: "Design and build infrastructure — roads, bridges, buildings, and water systems that shape cities.",
    icon: "🏗️",
    tags: ["engineering", "construction", "infrastructure", "science", "maths"],
    avgSalary: "₹4–20 LPA",
    demand: "High",
    roadmap: [
      { step: 1, title: "Class 12 PCM", skills: ["Physics", "Chemistry", "Mathematics"], duration: "2 years" },
      { step: 2, title: "JEE / State Entrance", skills: ["JEE Mains", "Mock Tests", "Coaching"], duration: "1–2 years" },
      { step: 3, title: "B.Tech Civil Engineering", skills: ["Structural Analysis", "AutoCAD", "Surveying"], duration: "4 years" },
      { step: 4, title: "Internship & Projects", skills: ["Site Work", "Project Management"], duration: "6 months" },
      { step: 5, title: "GATE / Job / M.Tech", skills: ["GATE Prep", "Specialization"], duration: "Ongoing" },
    ],
  },
  {
    id: "content-creator",
    title: "Content Creator",
    description: "Build an audience on YouTube, Instagram, or podcasts. Monetize your passion and creativity.",
    icon: "🎬",
    tags: ["media", "arts", "social media", "creative", "communication"],
    avgSalary: "₹2–20 LPA",
    demand: "High",
    roadmap: [
      { step: 1, title: "Find Your Niche", skills: ["Audience Research", "Content Strategy"], duration: "1 month" },
      { step: 2, title: "Content Production", skills: ["Video Editing", "Photography", "Writing"], duration: "2 months" },
      { step: 3, title: "Grow Your Audience", skills: ["SEO", "Social Media", "Consistency"], duration: "6 months" },
      { step: 4, title: "Monetization", skills: ["Brand Deals", "AdSense", "Merchandise"], duration: "Ongoing" },
      { step: 5, title: "Scale & Diversify", skills: ["Multiple Platforms", "Team Building"], duration: "Ongoing" },
    ],
  },
  {
    id: "lawyer",
    title: "Lawyer (LLB)",
    description: "Represent clients in court, draft legal documents, and advise on laws and regulations.",
    icon: "⚖️",
    tags: ["law", "arts", "commerce", "humanities", "clat"],
    avgSalary: "₹5–30 LPA",
    demand: "Medium",
    roadmap: [
      { step: 1, title: "Class 12 (Any Stream)", skills: ["English", "Political Science", "History"], duration: "2 years" },
      { step: 2, title: "CLAT / AILET Preparation", skills: ["Legal Aptitude", "GK", "Reasoning"], duration: "1 year" },
      { step: 3, title: "BA LLB / BBA LLB (5 years)", skills: ["Constitutional Law", "Criminal Law", "Contract Law"], duration: "5 years" },
      { step: 4, title: "Internships at Law Firms", skills: ["Legal Research", "Drafting", "Court Visits"], duration: "Ongoing" },
      { step: 5, title: "Bar Council Enrollment", skills: ["Advocacy", "Specialization"], duration: "After graduation" },
    ],
  },
];
