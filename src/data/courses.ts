export interface YoutubeVideo {
  title: string;
  channel: string;
  url: string;
  duration: string;
  views: string;
  thumbnail: string;
}

export interface Lesson {
  title: string;
  content: string;
  duration: string;
  type?: string;
  completed?: boolean;
  resources?: string[];
}

export interface Course {
  _id?: string;
  title: string;
  description: string;
  category: string;
  educationGroup: string;
  language: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  instructor?: string;
  instructorAvatar?: string;
  tags: string[];
  enrolledCount: number;
  rating: number;
  reviewCount?: number;
  thumbnail?: string;
  featured?: boolean;
  youtubeVideos?: YoutubeVideo[];
  lessons: Lesson[];
  whatYouLearn?: string[];
  prerequisites?: string[];
}

export const educationGroups = [
  { id: "class1to5", label: "Class 1–5", icon: "🌱", desc: "Fun learning for young minds", color: "from-yellow-400 to-orange-400", bgColor: "#FEF3C7", accentColor: "#F59E0B" },
  { id: "class6to8", label: "Class 6–8", icon: "📖", desc: "Build strong foundations", color: "from-green-400 to-teal-400", bgColor: "#D1FAE5", accentColor: "#10B981" },
  { id: "class9to10", label: "Class 9–10", icon: "🎯", desc: "Board exam preparation", color: "from-blue-400 to-cyan-400", bgColor: "#DBEAFE", accentColor: "#3B82F6" },
  { id: "class11", label: "Class 11", icon: "🔬", desc: "Science, Commerce & Arts", color: "from-purple-400 to-violet-400", bgColor: "#EDE9FE", accentColor: "#7C3AED" },
  { id: "class12", label: "Class 12", icon: "🏆", desc: "Boards + Entrance Exams", color: "from-red-400 to-pink-400", bgColor: "#FCE7F3", accentColor: "#EC4899" },
  { id: "graduate", label: "Graduate & Above", icon: "🎓", desc: "Degree, skills & career", color: "from-indigo-400 to-blue-500", bgColor: "#E0E7FF", accentColor: "#4F46E5" },
  { id: "skills", label: "Skill Development", icon: "⚡", desc: "Coding, Design, Business", color: "from-orange-400 to-amber-400", bgColor: "#FFEDD5", accentColor: "#EA580C" },
];

export const sampleCourses: Course[] = [
  // ── Class 1–5 ──
  {
    title: "Fun with Numbers (Class 1–3)",
    description: "Learn counting, addition, subtraction with fun games and colorful examples. Perfect introduction to mathematics.",
    category: "Mathematics", educationGroup: "class1to5", language: "English", level: "beginner",
    duration: "4 hours", instructor: "Mrs. Priya Sharma", instructorAvatar: "👩‍🏫",
    tags: ["maths", "class1", "class2", "class3", "numbers"], enrolledCount: 12000, rating: 4.8, reviewCount: 1240, thumbnail: "🔢", featured: false,
    youtubeVideos: [
      { title: "Counting 1–100 | Fun Number Song", channel: "Kids Learning Tube", url: "https://www.youtube.com/watch?v=0TgLtF3PMOc", duration: "10:24", views: "45M views", thumbnail: "🎵" },
      { title: "Addition for Kids | Learn to Add", channel: "Math Antics", url: "https://www.youtube.com/watch?v=AuX7nPBqDts", duration: "9:15", views: "12M views", thumbnail: "➕" },
    ],
    lessons: [
      { title: "Counting 1 to 100", content: "Fun counting exercises with colourful visuals. Learn to count forward and backward with rhymes and songs.", duration: "15 min", type: "video" },
      { title: "Addition & Subtraction", content: "Basic operations with pictures. Use objects like apples, balloons and stars to understand adding and taking away.", duration: "20 min", type: "video" },
      { title: "Shapes & Patterns", content: "Identify circles, squares, triangles and rectangles. Create and extend simple patterns.", duration: "15 min", type: "activity" },
      { title: "Fun Number Games", content: "Interactive games to test your counting and addition skills. Mini-challenges and puzzles.", duration: "20 min", type: "quiz" },
    ],
    whatYouLearn: ["Count from 1 to 100 confidently", "Add and subtract single-digit numbers", "Identify basic 2D shapes", "Recognise and create simple patterns"],
    prerequisites: ["None – perfect for beginners!"],
  },
  {
    title: "English Grammar Basics (Class 1–5)",
    description: "Nouns, verbs, adjectives and simple sentences for young learners. Build a strong language foundation.",
    category: "English", educationGroup: "class1to5", language: "English", level: "beginner",
    duration: "5 hours", instructor: "Mr. Arjun Mehta", instructorAvatar: "👨‍🏫",
    tags: ["english", "grammar", "class1", "class5"], enrolledCount: 9500, rating: 4.7, reviewCount: 980, thumbnail: "📝",
    lessons: [
      { title: "Nouns & Pronouns", content: "What are nouns? People, places, things, and ideas. How pronouns replace nouns in sentences.", duration: "15 min", type: "video" },
      { title: "Verbs – Action Words", content: "Learn about doing words and being words. Practice with fun activity sentences.", duration: "15 min", type: "video" },
      { title: "Adjectives – Describing Words", content: "Use adjectives to describe colours, sizes, and feelings. Expand your vocabulary.", duration: "20 min", type: "video" },
      { title: "Simple Sentences", content: "Making sentences with subject and verb. Learn sentence structure with examples.", duration: "20 min", type: "activity" },
    ],
    whatYouLearn: ["Identify and use nouns, pronouns, verbs and adjectives", "Form simple and compound sentences", "Expand vocabulary with 100+ new words"],
  },
  {
    title: "EVS – Our Environment (Class 3–5)",
    description: "Learn about plants, animals, water, air and our surroundings in a fun way. Hindi medium friendly.",
    category: "Science", educationGroup: "class1to5", language: "Hindi", level: "beginner",
    duration: "3 hours", instructor: "Mrs. Kavita Rao", instructorAvatar: "👩‍🔬",
    tags: ["evs", "environment", "class3", "class5", "science"], enrolledCount: 8200, rating: 4.6, reviewCount: 810, thumbnail: "🌿",
    lessons: [
      { title: "Plants Around Us", content: "Types of plants and their uses. Trees, shrubs, herbs.", duration: "15 min", type: "video" },
      { title: "Animals & Their Homes", content: "Domestic and wild animals. Where do animals live?", duration: "15 min", type: "video" },
      { title: "Water & Air", content: "Importance of water and air. Sources of water. Water cycle.", duration: "20 min", type: "video" },
    ],
    whatYouLearn: ["Identify plant types and parts", "Name animal habitats", "Understand water and air importance"],
  },
  // ── Class 6–8 ──
  {
    title: "Mathematics Class 6–8",
    description: "Fractions, decimals, algebra basics, geometry and mensuration with practice problems.",
    category: "Mathematics", educationGroup: "class6to8", language: "English", level: "beginner",
    duration: "10 hours", instructor: "Mr. Rohit Bansal", instructorAvatar: "👨‍🏫",
    tags: ["maths", "algebra", "class6", "class7", "class8"], enrolledCount: 22000, rating: 4.7, reviewCount: 2100, thumbnail: "📐",
    lessons: [
      { title: "Fractions & Decimals", content: "Operations on fractions and decimals. LCM method and word problems.", duration: "30 min", type: "video" },
      { title: "Basic Algebra", content: "Variables, expressions, equations. Solving linear equations.", duration: "35 min", type: "video" },
      { title: "Geometry Basics", content: "Lines, angles, triangles. Properties and Pythagoras intro.", duration: "30 min", type: "video" },
      { title: "Mensuration", content: "Perimeter and area of rectangles, triangles and circles.", duration: "35 min", type: "video" },
    ],
    whatYouLearn: ["Operations on fractions and decimals", "Solve linear algebraic equations", "Understand geometric shapes", "Calculate area and perimeter"],
  },
  {
    title: "Science Class 6–8 (NCERT)",
    description: "Physics, Chemistry and Biology topics from NCERT with detailed diagrams.",
    category: "Science", educationGroup: "class6to8", language: "Hindi", level: "beginner",
    duration: "12 hours", instructor: "Dr. Sunita Patel", instructorAvatar: "👩‍🔬",
    tags: ["science", "ncert", "class6", "class7", "class8"], enrolledCount: 31000, rating: 4.8, reviewCount: 3200, thumbnail: "🔭",
    lessons: [
      { title: "Food: Where Does It Come From?", content: "Sources of food, nutrients – carbohydrates, proteins, fats, vitamins.", duration: "20 min", type: "video" },
      { title: "Motion & Measurement", content: "Types of motion (linear, circular, oscillatory), units, SI units.", duration: "25 min", type: "video" },
      { title: "Cell Structure", content: "Plant and animal cells – nucleus, membrane, mitochondria.", duration: "30 min", type: "video" },
    ],
    whatYouLearn: ["Understand nutrition and balanced diet", "Identify motion types and SI units", "Draw and label plant/animal cells"],
  },
  // ── Class 9–10 ──
  {
    title: "Class 10 Science (CBSE)",
    description: "Physics, Chemistry, Biology — complete NCERT with board exam tips and PYQs.",
    category: "Science", educationGroup: "class9to10", language: "Hindi", level: "intermediate",
    duration: "18 hours", instructor: "Dr. Prashant Tiwari", instructorAvatar: "👨‍🔬",
    tags: ["science", "class10", "cbse", "physics", "chemistry", "biology"], enrolledCount: 45000, rating: 4.9, reviewCount: 4800, thumbnail: "⚗️", featured: true,
    lessons: [
      { title: "Chemical Reactions & Equations", content: "Types of reactions, balancing equations, oxidation-reduction, corrosion.", duration: "40 min", type: "video" },
      { title: "Acids, Bases & Salts", content: "pH scale, indicators, neutralisation. Important salts.", duration: "40 min", type: "video" },
      { title: "Electricity", content: "Ohm's law, resistance, circuits, power and energy.", duration: "45 min", type: "video" },
      { title: "Life Processes", content: "Nutrition, respiration, transport and excretion.", duration: "40 min", type: "video" },
    ],
    whatYouLearn: ["Balance chemical equations", "Understand acid-base reactions", "Solve electricity numericals", "Explain life processes"],
  },
  {
    title: "Class 10 Mathematics (CBSE)",
    description: "Complete Class 10 Maths — Real Numbers, Polynomials, Quadratics, Trigonometry, Statistics.",
    category: "Mathematics", educationGroup: "class9to10", language: "Hindi", level: "intermediate",
    duration: "14 hours", instructor: "Mr. Amit Kumar", instructorAvatar: "👨‍🏫",
    tags: ["maths", "class10", "cbse", "board", "algebra", "geometry"], enrolledCount: 28000, rating: 4.7, reviewCount: 2900, thumbnail: "📊", featured: true,
    lessons: [
      { title: "Real Numbers", content: "Euclid's division lemma, HCF, LCM, irrational numbers.", duration: "35 min", type: "video" },
      { title: "Quadratic Equations", content: "Factorisation, quadratic formula, nature of roots.", duration: "40 min", type: "video" },
      { title: "Trigonometry", content: "sin, cos, tan and their identities. Heights and distances.", duration: "45 min", type: "video" },
      { title: "Statistics", content: "Mean, median, mode. Cumulative frequency and ogive.", duration: "35 min", type: "video" },
    ],
    whatYouLearn: ["Prove numbers are irrational", "Solve quadratic equations", "Apply trigonometric identities", "Calculate statistical measures"],
  },
  // ── Class 11 ──
  {
    title: "Class 11 Physics (PCM)",
    description: "Kinematics, Laws of Motion, Work-Energy, Gravitation, Thermodynamics — full NCERT.",
    category: "Physics", educationGroup: "class11", language: "Hindi", level: "intermediate",
    duration: "22 hours", instructor: "Dr. Alakh Pandey", instructorAvatar: "👨‍🔬",
    tags: ["physics", "class11", "pcm", "jee", "neet"], enrolledCount: 38000, rating: 4.8, reviewCount: 3900, thumbnail: "⚡", featured: true,
    lessons: [
      { title: "Kinematics", content: "Motion in a straight line, projectile motion, relative velocity.", duration: "60 min", type: "video" },
      { title: "Laws of Motion", content: "Newton's laws, friction, circular motion.", duration: "55 min", type: "video" },
      { title: "Work, Energy & Power", content: "Work-energy theorem, conservation of energy.", duration: "50 min", type: "video" },
      { title: "Gravitation", content: "Universal law, escape velocity, orbital motion.", duration: "50 min", type: "video" },
    ],
    whatYouLearn: ["Solve kinematics problems", "Apply Newton's laws", "Use energy conservation", "Explain gravitational phenomena"],
  },
  {
    title: "Class 11 Chemistry",
    description: "Structure of Atom, Chemical Bonding, Equilibrium, Organic Chemistry basics.",
    category: "Chemistry", educationGroup: "class11", language: "Hindi", level: "intermediate",
    duration: "20 hours", instructor: "Dr. Neeraj Gupta", instructorAvatar: "👨‍🔬",
    tags: ["chemistry", "class11", "pcm", "pcb", "jee", "neet"], enrolledCount: 29000, rating: 4.7, reviewCount: 2800, thumbnail: "🧪",
    lessons: [
      { title: "Structure of Atom", content: "Bohr model, quantum numbers, orbitals, electronic configuration.", duration: "55 min", type: "video" },
      { title: "Chemical Bonding", content: "Ionic, covalent bonds, VSEPR theory, hybridization.", duration: "50 min", type: "video" },
      { title: "Equilibrium", content: "Le Chatelier's principle, equilibrium constants, ionic equilibrium.", duration: "55 min", type: "video" },
    ],
    whatYouLearn: ["Write electronic configurations", "Explain chemical bonding", "Apply equilibrium principles"],
  },
  {
    title: "Class 11 Mathematics",
    description: "Sets, Relations, Trigonometry, Straight Lines, Conic Sections, Limits & Derivatives.",
    category: "Mathematics", educationGroup: "class11", language: "English", level: "intermediate",
    duration: "24 hours", instructor: "Mr. RD Sharma", instructorAvatar: "👨‍🏫",
    tags: ["maths", "class11", "pcm", "jee"], enrolledCount: 26000, rating: 4.8, reviewCount: 2500, thumbnail: "📐",
    lessons: [
      { title: "Sets & Relations", content: "Types of sets, Venn diagrams, functions and their types.", duration: "45 min", type: "video" },
      { title: "Trigonometric Functions", content: "Identities, equations, inverse trigonometry.", duration: "60 min", type: "video" },
      { title: "Limits & Derivatives", content: "Concept of limit, differentiation basics, chain rule.", duration: "55 min", type: "video" },
    ],
    whatYouLearn: ["Work with sets and relations", "Solve trigonometric equations", "Differentiate functions"],
  },
  // ── Class 12 ──
  {
    title: "Class 12 Physics (JEE/NEET/Board)",
    description: "Electrostatics, Current Electricity, Magnetism, Optics, Modern Physics — complete.",
    category: "Physics", educationGroup: "class12", language: "Hindi", level: "advanced",
    duration: "28 hours", instructor: "Dr. Alakh Pandey", instructorAvatar: "👨‍🔬",
    tags: ["physics", "class12", "jee", "neet", "board"], enrolledCount: 52000, rating: 4.9, reviewCount: 5200, thumbnail: "🔋", featured: true,
    lessons: [
      { title: "Electrostatics", content: "Coulomb's law, Gauss's law, electric potential and field.", duration: "70 min", type: "video" },
      { title: "Current Electricity", content: "Ohm's law, Kirchhoff's laws, Wheatstone bridge.", duration: "65 min", type: "video" },
      { title: "Ray Optics", content: "Reflection, refraction, lenses, mirrors, optical instruments.", duration: "60 min", type: "video" },
      { title: "Modern Physics", content: "Photoelectric effect, Bohr model, nuclear physics.", duration: "65 min", type: "video" },
    ],
    whatYouLearn: ["Solve electrostatics problems", "Apply Kirchhoff's laws", "Explain optical phenomena", "Understand modern physics"],
  },
  {
    title: "Class 12 Mathematics (JEE/Board)",
    description: "Relations, Matrices, Calculus, Vectors, 3D Geometry, Probability — complete guide.",
    category: "Mathematics", educationGroup: "class12", language: "English", level: "advanced",
    duration: "30 hours", instructor: "Mr. Ashish Kumar", instructorAvatar: "👨‍🏫",
    tags: ["maths", "class12", "jee", "board", "calculus"], enrolledCount: 48000, rating: 4.9, reviewCount: 4800, thumbnail: "∫", featured: true,
    lessons: [
      { title: "Matrices & Determinants", content: "Operations, transpose, inverse, Cramer's rule.", duration: "60 min", type: "video" },
      { title: "Integrals", content: "Indefinite, definite integrals, by parts, substitution.", duration: "75 min", type: "video" },
      { title: "Vectors & 3D Geometry", content: "Dot product, cross product, lines and planes in 3D.", duration: "65 min", type: "video" },
      { title: "Probability", content: "Bayes theorem, Binomial distribution, random variables.", duration: "55 min", type: "video" },
    ],
    whatYouLearn: ["Perform matrix operations", "Evaluate complex integrals", "Solve 3D geometry problems", "Apply probability theorems"],
  },
  // ── Graduate ──
  {
    title: "Python for Beginners",
    description: "Learn Python programming from scratch. Variables, loops, functions, OOP and projects.",
    category: "Technology", educationGroup: "graduate", language: "English", level: "beginner",
    duration: "8 hours", instructor: "Ms. Pooja Hegde", instructorAvatar: "👩‍💻",
    tags: ["python", "programming", "coding", "beginner"], enrolledCount: 12400, rating: 4.8, reviewCount: 1240, thumbnail: "🐍",
    lessons: [
      { title: "Introduction to Python", content: "What is Python? Installing Python and VS Code. First program: Hello World!", duration: "15 min", type: "video" },
      { title: "Variables & Data Types", content: "Strings, integers, floats, booleans. Type conversion.", duration: "20 min", type: "video" },
      { title: "Loops & Conditionals", content: "if-else, for loops, while loops with examples.", duration: "30 min", type: "video" },
      { title: "Functions & OOP", content: "def keyword, parameters, return values, classes and objects.", duration: "40 min", type: "video" },
    ],
    whatYouLearn: ["Write Python programs from scratch", "Use loops and conditionals", "Build functions and classes", "Create small projects"],
  },
  {
    title: "Data Science with Python",
    description: "Pandas, NumPy, Matplotlib and machine learning basics for aspiring data scientists.",
    category: "Technology", educationGroup: "graduate", language: "English", level: "intermediate",
    duration: "15 hours", instructor: "Dr. Krish Naik", instructorAvatar: "👨‍💻",
    tags: ["data science", "python", "ml", "analytics", "pandas"], enrolledCount: 15600, rating: 4.8, reviewCount: 1560, thumbnail: "📊", featured: true,
    lessons: [
      { title: "NumPy Fundamentals", content: "Arrays, operations, broadcasting, linear algebra.", duration: "40 min", type: "video" },
      { title: "Pandas for Data Analysis", content: "DataFrames, groupby, merge, handling missing data.", duration: "45 min", type: "video" },
      { title: "Data Visualization", content: "Matplotlib and Seaborn — charts, heatmaps, pair plots.", duration: "40 min", type: "video" },
      { title: "Intro to Machine Learning", content: "sklearn — linear regression, classification, model evaluation.", duration: "60 min", type: "video" },
    ],
    whatYouLearn: ["Manipulate data with Pandas", "Visualize data with Matplotlib", "Build ML models with sklearn"],
  },
  {
    title: "MBA Preparation (CAT/MAT)",
    description: "Quantitative Aptitude, Verbal Ability, Logical Reasoning for CAT, MAT, XAT.",
    category: "Management", educationGroup: "graduate", language: "English", level: "advanced",
    duration: "20 hours", instructor: "Mr. Arun Sharma", instructorAvatar: "👨‍🏫",
    tags: ["cat", "mba", "aptitude", "reasoning", "verbal"], enrolledCount: 18000, rating: 4.7, reviewCount: 1800, thumbnail: "🎓",
    lessons: [
      { title: "Quantitative Aptitude", content: "Number systems, percentages, profit-loss, time-speed-distance.", duration: "60 min", type: "video" },
      { title: "Logical Reasoning", content: "Syllogisms, blood relations, seating arrangement, puzzles.", duration: "55 min", type: "video" },
      { title: "Verbal Ability", content: "Reading comprehension, para-jumbles, grammar.", duration: "50 min", type: "video" },
    ],
    whatYouLearn: ["Crack quantitative aptitude questions", "Solve logical reasoning puzzles", "Improve verbal ability"],
  },
  // ── Skills ──
  {
    title: "Web Development Fundamentals",
    description: "HTML, CSS, and JavaScript basics to build your first website from scratch.",
    category: "Technology", educationGroup: "skills", language: "English", level: "beginner",
    duration: "12 hours", instructor: "Mr. Hitesh Choudhary", instructorAvatar: "👨‍💻",
    tags: ["html", "css", "javascript", "web", "frontend"], enrolledCount: 9800, rating: 4.7, reviewCount: 980, thumbnail: "🌐",
    lessons: [
      { title: "HTML Basics", content: "Structure of a webpage — tags, elements, attributes, semantic HTML.", duration: "30 min", type: "video" },
      { title: "CSS Styling", content: "Selectors, box model, flexbox, grid, responsive design.", duration: "35 min", type: "video" },
      { title: "JavaScript Basics", content: "Variables, DOM manipulation, events, fetch API.", duration: "45 min", type: "video" },
      { title: "Build a Project", content: "Create a complete portfolio website from scratch.", duration: "60 min", type: "project" },
    ],
    whatYouLearn: ["Build HTML pages", "Style with CSS and Flexbox", "Add interactivity with JavaScript", "Deploy a live website"],
  },
  {
    title: "React.js Complete Guide",
    description: "Build modern web apps with React 18, hooks, context API, and real-world projects.",
    category: "Technology", educationGroup: "skills", language: "English", level: "intermediate",
    duration: "18 hours", instructor: "Mr. Harkirat Singh", instructorAvatar: "👨‍💻",
    tags: ["react", "javascript", "frontend", "web", "hooks"], enrolledCount: 11200, rating: 4.9, reviewCount: 1120, thumbnail: "⚛️", featured: true,
    lessons: [
      { title: "React Fundamentals", content: "Components, JSX, props, state — the building blocks.", duration: "40 min", type: "video" },
      { title: "Hooks Deep Dive", content: "useState, useEffect, useContext, useReducer, custom hooks.", duration: "50 min", type: "video" },
      { title: "Context API & State Management", content: "Global state without Redux. Context + useReducer pattern.", duration: "45 min", type: "video" },
      { title: "Real World Project", content: "Build a full CRUD app with React, API calls and deployment.", duration: "90 min", type: "project" },
    ],
    whatYouLearn: ["Build React components", "Use all major hooks", "Manage global state", "Deploy a React app"],
  },
  {
    title: "UI/UX Design with Figma",
    description: "Learn user interface and experience design using Figma. Create stunning prototypes.",
    category: "Design", educationGroup: "skills", language: "English", level: "beginner",
    duration: "10 hours", instructor: "Ms. Anisha Gupta", instructorAvatar: "👩‍🎨",
    tags: ["design", "figma", "ui", "ux", "prototype"], enrolledCount: 8900, rating: 4.8, reviewCount: 890, thumbnail: "🎨",
    lessons: [
      { title: "Design Principles", content: "Color theory, typography, spacing, visual hierarchy.", duration: "30 min", type: "video" },
      { title: "Figma Basics", content: "Frames, components, auto-layout, styles.", duration: "45 min", type: "video" },
      { title: "UX Research", content: "User personas, wireframing, user journey maps.", duration: "40 min", type: "video" },
      { title: "Prototype & Handoff", content: "Interactive prototypes, developer handoff, design systems.", duration: "50 min", type: "video" },
    ],
    whatYouLearn: ["Apply design principles", "Master Figma tools", "Create interactive prototypes", "Build design systems"],
  },
  {
    title: "Digital Marketing Basics",
    description: "Learn SEO, social media marketing, Google Ads and content strategy.",
    category: "Business", educationGroup: "skills", language: "English", level: "beginner",
    duration: "6 hours", instructor: "Mr. Neil Patel", instructorAvatar: "👨‍💼",
    tags: ["marketing", "seo", "social media", "business", "google ads"], enrolledCount: 7600, rating: 4.5, reviewCount: 760, thumbnail: "📱",
    lessons: [
      { title: "What is Digital Marketing?", content: "Overview of digital channels: SEO, SEM, social media, email, content.", duration: "20 min", type: "video" },
      { title: "SEO Fundamentals", content: "How search engines work, keyword research, on-page and off-page SEO.", duration: "30 min", type: "video" },
      { title: "Social Media Marketing", content: "Strategy for Instagram, LinkedIn, YouTube. Content calendars.", duration: "30 min", type: "video" },
      { title: "Google Ads Basics", content: "Creating a campaign, ad copy, bidding strategies, conversion tracking.", duration: "30 min", type: "video" },
    ],
    whatYouLearn: ["Understand all digital marketing channels", "Do keyword research for SEO", "Build social media strategy", "Run Google Ads"],
  },
  {
    title: "Public Speaking & Communication",
    description: "Overcome stage fear, speak confidently, and master persuasive communication.",
    category: "Soft Skills", educationGroup: "skills", language: "English", level: "beginner",
    duration: "5 hours", instructor: "Mr. Vikas Divyakirti", instructorAvatar: "🎤",
    tags: ["communication", "speaking", "soft skills", "confidence"], enrolledCount: 7100, rating: 4.5, reviewCount: 710, thumbnail: "🎤",
    lessons: [
      { title: "Overcoming Stage Fear", content: "Techniques to manage anxiety: breathing, visualisation, progressive exposure.", duration: "20 min", type: "video" },
      { title: "Structuring Your Speech", content: "Intro, body, conclusion. The PREP framework. Storytelling arcs.", duration: "25 min", type: "video" },
      { title: "Body Language & Voice", content: "Eye contact, gestures, posture, vocal variety — pace, pitch, pauses.", duration: "25 min", type: "video" },
      { title: "Persuasion & Storytelling", content: "Aristotle's ethos, pathos, logos. Narrative techniques.", duration: "25 min", type: "video" },
    ],
    whatYouLearn: ["Manage stage anxiety", "Structure any speech", "Use body language effectively", "Apply storytelling frameworks"],
  },
  {
    title: "Entrepreneurship 101",
    description: "From idea to startup — learn the fundamentals of building a business. Includes business plan workshop.",
    category: "Business", educationGroup: "skills", language: "English", level: "beginner",
    duration: "5 hours", instructor: "Mr. Sanjeev Bikhchandani", instructorAvatar: "🚀",
    tags: ["startup", "business", "entrepreneurship", "funding"], enrolledCount: 5400, rating: 4.6, reviewCount: 540, thumbnail: "🚀",
    lessons: [
      { title: "Idea Validation", content: "How to test your business idea. Problem-solution fit, customer interviews, MVP.", duration: "25 min", type: "video" },
      { title: "Business Model Canvas", content: "Mapping your business: value proposition, revenue streams, cost structure.", duration: "30 min", type: "video" },
      { title: "Funding & Finance Basics", content: "Bootstrapping, angel investors, VCs, Startup India schemes.", duration: "30 min", type: "video" },
      { title: "Build Your Business Plan", content: "Write a 1-page business plan. Pitch deck structure.", duration: "40 min", type: "project" },
    ],
    whatYouLearn: ["Validate business ideas", "Complete a Business Model Canvas", "Understand startup funding", "Build a pitch deck"],
  },
];

export const categories = [
  "All", "Mathematics", "Science", "English", "Physics", "Chemistry",
  "Biology", "Social Science", "Technology", "Commerce", "Management",
  "Business", "Design", "Soft Skills", "Accountancy", "Economics",
];