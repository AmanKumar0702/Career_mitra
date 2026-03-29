# CareerMitra — Complete Project Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started](#4-getting-started)
5. [Environment Variables](#5-environment-variables)
6. [Pages & Features](#6-pages--features)
7. [API Reference](#7-api-reference)
8. [Database Models](#8-database-models)
9. [Data Files](#9-data-files)
10. [Components](#10-components)
11. [Authentication](#11-authentication)
12. [Deployment](#12-deployment)
13. [Known Issues & Fixes Applied](#13-known-issues--fixes-applied)

---

## 1. Project Overview

CareerMitra is a full-stack career guidance platform built for Indian students after Class 10/12. It provides:

- Structured learning courses (Class 1 to Graduate level)
- MCQ-based timed tests with anti-cheat fullscreen mode
- AI-powered career guidance chatbot
- Job & internship portal with real company apply links
- Resume builder with live preview
- XP-based gamification (streaks, badges, leaderboard)
- Admin panel for content management
- Dark/Light theme toggle

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.2.5 |
| UI Library | React | 18 |
| Styling | Tailwind CSS | 3.4.1 |
| Database | MongoDB + Mongoose | 8.5.1 |
| Auth | NextAuth.js | 4.24.7 |
| AI | OpenAI / Google Generative AI / Groq | Latest |
| Charts | Recharts | 2.12.7 |
| Animations | Framer Motion | 11.3.8 |
| Icons | Lucide React | 0.400.0 |
| Toasts | React Hot Toast | 2.4.1 |
| Language | TypeScript | 5 |

---

## 3. Project Structure

```
careermitra/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Landing page
│   │   ├── layout.tsx              # Root layout (wraps all pages)
│   │   ├── globals.css             # Global styles + Tailwind
│   │   ├── dashboard/page.tsx      # User dashboard (XP, streaks, badges)
│   │   ├── learn/
│   │   │   ├── page.tsx            # Course listing page
│   │   │   └── [id]/page.tsx       # Course study page (lessons)
│   │   ├── tests/
│   │   │   ├── page.tsx            # Test listing + quiz modal
│   │   │   └── [id]/page.tsx       # Individual test page
│   │   ├── career/page.tsx         # Career guidance + AI chatbot
│   │   ├── jobs/page.tsx           # Job portal with filters
│   │   ├── resume/page.tsx         # Resume builder with live preview
│   │   ├── admin/page.tsx          # Admin panel (CRUD)
│   │   ├── progress/page.tsx       # User progress tracking
│   │   ├── auth/
│   │   │   ├── login/page.tsx      # Login page
│   │   │   └── signup/page.tsx     # Multi-step signup
│   │   └── api/                    # API Routes (backend)
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts   # NextAuth handler
│   │       │   └── signup/route.ts          # User registration
│   │       ├── courses/
│   │       │   ├── route.ts                 # GET all / POST course
│   │       │   └── [id]/route.ts            # GET/PUT/DELETE course
│   │       ├── tests/
│   │       │   ├── route.ts                 # GET all / POST test
│   │       │   ├── [id]/route.ts            # GET single test
│   │       │   └── submit/route.ts          # Submit answers, get score
│   │       ├── jobs/
│   │       │   ├── route.ts                 # GET all / POST job
│   │       │   ├── [id]/route.ts            # GET/PUT/DELETE job
│   │       │   ├── external/route.ts        # Live job search (JSearch API)
│   │       │   └── match/route.ts           # Smart job matching
│   │       ├── career/route.ts              # AI career suggestions
│   │       ├── chat/route.ts                # AI chatbot messages
│   │       └── user/
│   │           ├── route.ts                 # GET/PUT user profile
│   │           ├── enroll/route.ts          # Enroll in course
│   │           └── apply/route.ts           # Apply to job
│   ├── components/
│   │   ├── landing/                # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── layout/                 # Shared layout components
│   │   │   ├── Navbar.tsx          # Top navigation with theme toggle
│   │   │   ├── Footer.tsx          # Site footer
│   │   │   ├── Providers.tsx       # SessionProvider + ThemeProvider wrapper
│   │   │   └── ThemeProvider.tsx   # Dark/light mode context
│   │   └── ui/                     # Reusable UI primitives
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── ProgressBar.tsx
│   ├── data/                       # Static seed data
│   │   ├── courses.ts              # 30+ courses across all education levels
│   │   ├── tests.ts                # 6 mock tests (JEE, NEET, SSC, UPSC, etc.)
│   │   ├── jobs.ts                 # 30 job listings with real apply URLs
│   │   └── careerPaths.ts          # Career roadmaps data
│   ├── lib/
│   │   ├── db.ts                   # MongoDB connection (singleton)
│   │   ├── auth.ts                 # NextAuth config (Credentials + Google)
│   │   └── utils.ts                # Utility functions (cn, etc.)
│   ├── models/                     # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Course.ts
│   │   ├── Test.ts
│   │   └── Job.ts
│   └── types/
│       └── next-auth.d.ts          # NextAuth type extensions
├── scripts/
│   └── seed.ts                     # Manual DB seed script
├── .env.example                    # Environment variable template
├── .env.local                      # Your local env (not committed)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Other Commands

```bash
npm run build       # Production build
npm start           # Start production server
npm run lint        # Run ESLint
npm run seed        # Manually seed the database
```

---

## 5. Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `NEXTAUTH_SECRET` | ✅ | Random secret for JWT signing (min 32 chars) |
| `NEXTAUTH_URL` | ✅ | App base URL (`http://localhost:3000` in dev) |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth client secret |
| `OPENAI_API_KEY` | Optional | OpenAI API key for AI chatbot |

### Example `.env.local`

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/careermitra
NEXTAUTH_SECRET=your-random-secret-string-min-32-chars
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OPENAI_API_KEY=sk-...
```

---

## 6. Pages & Features

### 🏠 Landing Page (`/`)
- Hero section with CTA buttons
- Stats section (students, courses, jobs)
- Features overview
- How it works (3-step guide)
- Testimonials
- Final CTA section

### 🔐 Auth (`/auth/login`, `/auth/signup`)
- Email/password login
- Multi-step signup (name → email → password → education level)
- Google OAuth (if configured)
- Session managed by NextAuth.js

### 📊 Dashboard (`/dashboard`)
- XP points and level progress
- Daily streak tracker
- Badges earned
- Activity chart (Recharts)
- Quick links to all sections
- Recently enrolled courses

### 📚 Learn (`/learn`)
- Course listing grid with search and category filters
- Education group filters (Class 1–5, 6–8, 9–10, 11, 12, Graduate, Skills)
- Enroll button → redirects to course study page
- Enrolled courses show "Continue" button

### 📖 Course Study (`/learn/[id]`)
- Sidebar with all lessons and progress
- Lesson content renderer (supports headings, bullets, code blocks, callouts)
- YouTube recommended videos per course
- Mark lesson complete → auto-advance
- Progress bar (saved to localStorage)
- Enroll gate (first lesson free, rest locked until enrolled)

### 🧠 Tests (`/tests`)
- Test cards with category, question count, duration, pass mark
- Fullscreen mode enforced on start
- Auto-submit on:
  - Tab switch (`visibilitychange` event)
  - Window blur (`blur` event)
  - Fullscreen exit (`fullscreenchange` event)
  - Timer reaching 0
- Question navigation dots
- Results modal with:
  - Score percentage
  - Correct/total count
  - XP earned
  - Weak area analysis with accuracy bars
  - Retry option

### 🎯 Career (`/career`)
- Career path roadmaps by stream (Science, Commerce, Arts, Technology)
- AI chatbot powered by OpenAI/Groq
- Career suggestions based on user profile

### 💼 Jobs (`/jobs`)
- Job listing grid with type filters (internship, full-time, part-time, remote)
- Search by title, company, skill, location
- Apply Now → opens real company careers page in new tab
- Tracks applied jobs in user profile
- Smart job matching popup (based on user profile)
- Live job search tab (JSearch API)
- Job alert notifications (polls every 30s when enabled)

### 📄 Resume (`/resume`)
- Form-based resume builder
- Live preview panel
- Print/Download as PDF
- Sections: Personal Info, Education, Experience, Skills, Projects

### ⚙️ Admin (`/admin`)
- CRUD for Courses, Tests, Jobs
- Add/Edit/Delete content
- Protected route (admin role required)

---

## 7. API Reference

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler (login, session, OAuth) |

### User

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get current user profile |
| PUT | `/api/user` | Update user profile |
| POST | `/api/user/enroll` | Enroll in a course (+50 XP) |
| POST | `/api/user/apply` | Mark job as applied |

### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | List all courses (auto-seeds if empty) |
| GET | `/api/courses?category=X` | Filter by category |
| POST | `/api/courses` | Create new course (admin) |
| GET | `/api/courses/[id]` | Get single course with lessons |
| PUT | `/api/courses/[id]` | Update course |
| DELETE | `/api/courses/[id]` | Delete course |

### Tests

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tests` | List all tests (auto-seeds if empty) |
| POST | `/api/tests` | Create new test (admin) |
| GET | `/api/tests/[id]` | Get single test with questions |
| POST | `/api/tests/submit` | Submit answers → returns score, weak areas |

**Submit Payload:**
```json
{
  "testId": "mongo_object_id",
  "answers": { "0": 2, "1": 0, "2": 3 }
}
```

**Submit Response:**
```json
{
  "score": 75,
  "correct": 6,
  "total": 8,
  "passed": true,
  "weakAreas": [
    { "topic": "Optics", "accuracy": 50 }
  ]
}
```

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List all jobs (auto-reseeds if stale) |
| GET | `/api/jobs?type=internship` | Filter by type |
| POST | `/api/jobs` | Create job (admin) |
| GET | `/api/jobs/[id]` | Get single job |
| PUT | `/api/jobs/[id]` | Update job |
| DELETE | `/api/jobs/[id]` | Delete job |
| GET | `/api/jobs/external?query=X` | Live job search via JSearch API |
| GET | `/api/jobs/match` | Smart job matches for logged-in user |

### AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/career` | AI career suggestions based on profile |
| POST | `/api/chat` | Send message to AI chatbot |

---

## 8. Database Models

### User
```typescript
{
  name: string
  email: string (unique)
  password: string (bcrypt hashed)
  image?: string
  role: "user" | "admin"          // default: "user"
  educationLevel?: string
  xp: number                      // default: 0
  streak: number                  // default: 0
  lastActive?: Date
  completedCourses: ObjectId[]    // Course refs
  completedTests: ObjectId[]      // Test refs
  appliedJobs: ObjectId[]         // Job refs
  badges: string[]
  createdAt: Date
}
```

### Course
```typescript
{
  title: string
  description: string
  category: string
  educationGroup: string          // class1to5 | class6to8 | ... | skills
  language: string                // default: "English"
  level: "beginner" | "intermediate" | "advanced"
  duration: string
  thumbnail?: string
  tags: string[]
  lessons: [{
    title: string
    content: string               // Markdown-like rich text
    duration: string
    youtubeUrl?: string
  }]
  enrolledCount: number
  rating: number
  createdAt: Date
}
```

### Test
```typescript
{
  title: string
  description: string
  category: string                // JEE | NEET | SSC | UPSC | Class 10 | etc.
  duration: number                // minutes
  passingScore: number            // percentage
  totalMarks: number
  negativeMarking: number         // e.g. -1, -0.5, 0
  marksPerQuestion: number
  instructions: string[]
  questions: [{
    question: string
    options: string[]             // 4 options
    correct: number               // 0-indexed correct option
    explanation: string
    difficulty: "easy" | "medium" | "hard"
    topic: string
  }]
  createdAt: Date
}
```

### Job
```typescript
{
  title: string
  company: string
  location: string
  type: "internship" | "full-time" | "part-time" | "remote"
  description: string
  skills: string[]
  educationLevel: string
  salary?: string
  applyUrl: string                // Real company careers page URL
  isNewListing: boolean
  postedAt: Date
}
```

---

## 9. Data Files

### `src/data/courses.ts`
Contains `sampleCourses` — 30+ courses across 7 education groups:
- Class 1–5: Fun with Numbers, English Grammar, EVS
- Class 6–8: Mathematics, Science (NCERT), English, Social Science
- Class 9–10: Science, Mathematics, Social Science, English
- Class 11: Physics, Chemistry, Mathematics, Biology, Accountancy, Economics
- Class 12: Physics, Chemistry, Mathematics, Biology, Accountancy, Business Studies, English
- Graduate: Python, Data Science, MBA Prep, Financial Literacy
- Skills: Web Dev, React.js, UI/UX Design, Digital Marketing, Public Speaking, Entrepreneurship

Also exports `educationGroups` and `categories` arrays used for filters.

### `src/data/tests.ts`
Contains `sampleTests` — 6 mock tests:
- JEE Mains Physics Mock (10 questions, 60 min, -1 negative marking)
- NEET Biology Mock (10 questions, 45 min, -1 negative marking)
- Class 10 Board Science (10 questions, 40 min, no negative marking)
- SSC CGL Reasoning (8 questions, 25 min, -0.5 negative marking)
- UPSC Prelims GS Mock (8 questions, 120 min, -0.66 negative marking)
- Class 12 Mathematics (8 questions, 50 min, no negative marking)
- Campus Placement Aptitude (8 questions, 35 min, no negative marking)

### `src/data/jobs.ts`
Contains `sampleJobs` — 30 job listings across sectors:
- Technology (Razorpay, Zomato, NVIDIA, Swiggy, PhonePe, Flipkart, Wipro, Turing)
- Design (Swiggy, CRED, Internshala)
- Business & Commerce (Byju's, Deloitte, HDFC Bank, Nykaa, Infosys, Meesho)
- Content & Media (Internshala, Unacademy)
- Healthcare (Sun Pharma, Dr. Lal PathLabs, Apollo Hospitals)
- Government (Adda247, ISRO)
- Education (Vedantu, Khan Academy India)
- Law (Khaitan & Co., Paytm)
- Engineering (Tata Motors, L&T Construction)

All jobs have real `applyUrl` pointing to company careers pages.

### `src/data/careerPaths.ts`
Career roadmaps for different streams used in the Career Guidance page.

---

## 10. Components

### Layout Components

**`Navbar.tsx`**
- Sticky top navigation
- Links: Dashboard, Learn, Tests, Career, Jobs, Resume
- Dark/Light theme toggle (Sun/Moon icon)
- Mobile hamburger menu
- Active link highlighting

**`ThemeProvider.tsx`**
- React Context providing `theme` and `toggle`
- Persists preference to `localStorage`
- Applies `dark` class to `document.documentElement`
- Respects system preference on first visit

**`Providers.tsx`**
- Wraps app with `SessionProvider` (NextAuth) and `ThemeProvider`

**`Footer.tsx`**
- Site footer with links and branding

### UI Primitives

**`Card.tsx`**
- Base card container with border, shadow, rounded corners
- Supports dark mode

**`Badge.tsx`**
- Variants: `default`, `success`, `warning`, `danger`, `gray`
- Used for job types, course levels, test results

**`Modal.tsx`**
- Overlay modal with backdrop blur
- Props: `open`, `onClose`, `title`, `children`, `className`
- Used for quiz modal and results modal

**`ProgressBar.tsx`**
- Animated progress bar
- Props: `value`, `max` (default 100), `color`

### Landing Components
- `HeroSection` — Main hero with animated CTA
- `FeaturesSection` — 6-feature grid
- `StatsSection` — Animated counters
- `TestimonialsSection` — Student testimonials carousel
- `HowItWorksSection` — 3-step process
- `CTASection` — Bottom call-to-action

---

## 11. Authentication

CareerMitra uses **NextAuth.js v4** with two providers:

### Credentials Provider
- Email + password login
- Password hashed with `bcryptjs`
- Validates against MongoDB User collection

### Google OAuth Provider
- Requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Auto-creates user on first Google login
- Optional — app works without it

### Session Strategy
- JWT-based sessions
- Session includes: `id`, `email`, `name`, `image`, `role`
- Protected routes check session client-side with `useSession()`

### Setting Up Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` as redirect URI
6. Copy Client ID and Secret to `.env.local`

---

## 12. Deployment

### Deploy to Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "deploy"
git push origin main

# 2. Import project at vercel.com
# 3. Add environment variables in Vercel dashboard
# 4. Deploy — Vercel auto-detects Next.js
```

**Required env vars on Vercel:**
- `MONGODB_URI` — use MongoDB Atlas (not localhost)
- `NEXTAUTH_SECRET` — any random string
- `NEXTAUTH_URL` — your Vercel deployment URL (e.g. `https://careermitra.vercel.app`)

### MongoDB Atlas Setup
1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create database user with read/write access
3. Whitelist IP: `0.0.0.0/0` (allow all — required for Vercel)
4. Get connection string → paste into `MONGODB_URI`

### Auto-Seeding
The database auto-seeds on first API call:
- `/api/courses` — seeds courses if DB is empty
- `/api/tests` — seeds tests if DB is empty
- `/api/jobs` — seeds jobs if any job has `applyUrl: "#"` (stale data detection)

No manual seeding required on deployment.

---

## 13. Known Issues & Fixes Applied

| Issue | Fix Applied |
|-------|-------------|
| `next` not recognized | Run `npm install` — node_modules was missing |
| Course not found on click | `learn/page.tsx` had study page code — restored correct listing page |
| Theme toggle missing | Navbar was missing `useTheme` import and toggle button — restored |
| Tests/Career missing from navbar | Added `ClipboardList` and `Compass` links back to `navLinks` array |
| Apply button not opening real URL | Added real company `applyUrl` to all jobs; button now calls `window.open()` immediately |
| Jobs DB not re-seeding with new URLs | API now detects stale data by checking `applyUrl: "#"` and force re-seeds |
| Test score always 0% | JSON serializes object keys as strings; fixed by checking `answers[String(i)]` |
| Tab switching not detected during test | Added `visibilitychange` and `window blur` event listeners alongside `fullscreenchange` |
| `jobs.ts` syntax error (stray `────` chars) | Rewrote entire file cleanly after bad string replacements corrupted it |
| YouTube videos missing from course page | Restored `course.youtubeVideos` render section and `Youtube` icon import |
