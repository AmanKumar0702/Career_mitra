# CareerMitra 🎓

> **Learn, Test, and Build Your Career** — A production-ready full-stack platform for students after 10th/12th.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + React 18 |
| Styling | Tailwind CSS + custom components |
| Backend | Next.js API Routes |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js (Credentials + Google OAuth) |
| AI | OpenAI GPT-3.5 (career chatbot) |
| Charts | Recharts |
| Animations | Framer Motion |

## Features

- 🏠 **Landing Page** — Hero, stats, features, testimonials
- 🔐 **Auth** — Multi-step signup, login, Google OAuth
- 📊 **Dashboard** — XP, streaks, badges, activity chart
- 📚 **Learning Platform** — Course catalog with filters & search
- 📝 **Tests** — MCQ quizzes with scoring & weak area detection
- 🎯 **Career Guidance** — Roadmaps + AI chatbot
- 💼 **Job Portal** — Filtered listings with apply & notifications
- 📄 **Resume Builder** — Live preview + print/download
- ⚙️ **Admin Panel** — CRUD for courses, tests, jobs
- 🌙 **Dark/Light Mode** — System preference + toggle

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.local` and fill in your values:
```bash
# Required
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/careermitra
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=http://localhost:3000

# Optional — for Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional — for AI chatbot
OPENAI_API_KEY=your-openai-api-key
```

### 3. Seed the database (optional)
```bash
npx ts-node scripts/seed.ts
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for production
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── dashboard/page.tsx    # User dashboard
│   ├── learn/page.tsx        # Learning platform
│   ├── tests/page.tsx        # Test & assessment
│   ├── career/page.tsx       # Career guidance + AI chat
│   ├── jobs/page.tsx         # Job portal
│   ├── resume/page.tsx       # Resume builder
│   ├── admin/page.tsx        # Admin panel
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── auth/signup/route.ts
│       ├── courses/route.ts
│       ├── courses/[id]/route.ts
│       ├── tests/route.ts
│       ├── tests/[id]/route.ts
│       ├── tests/submit/route.ts
│       ├── jobs/route.ts
│       ├── jobs/[id]/route.ts
│       ├── career/route.ts
│       ├── chat/route.ts
│       └── user/route.ts
├── components/
│   ├── layout/               # Navbar, Footer, ThemeProvider
│   ├── ui/                   # Card, Badge, ProgressBar, Modal
│   └── landing/              # Hero, Features, Testimonials, Stats
├── models/                   # Mongoose models (User, Course, Test, Job)
├── data/                     # Sample data (courses, tests, jobs, careerPaths)
└── lib/                      # db.ts, utils.ts
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| GET/PUT | `/api/user` | Get/update user profile |
| GET/POST | `/api/courses` | List/create courses |
| GET/PUT/DELETE | `/api/courses/[id]` | Course CRUD |
| GET/POST | `/api/tests` | List/create tests |
| POST | `/api/tests/submit` | Submit test, get score |
| GET/POST | `/api/jobs` | List/create jobs (with filters) |
| GET | `/api/career` | AI career suggestions |
| POST | `/api/chat` | AI chatbot message |

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `NEXTAUTH_SECRET` | ✅ | Random secret for JWT signing |
| `NEXTAUTH_URL` | ✅ | App URL (http://localhost:3000 in dev) |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth client secret |
| `OPENAI_API_KEY` | Optional | OpenAI API key for AI chatbot |

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

## MongoDB Atlas Setup

1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create database user
3. Whitelist IP (0.0.0.0/0 for Vercel)
4. Copy connection string to `MONGODB_URI`
