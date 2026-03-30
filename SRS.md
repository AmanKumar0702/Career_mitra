# Software Requirements Specification (SRS)

## Learn2Earn — AI-Powered Career & Learning Platform

**Version:** 1.0  
**Date:** June 2025  
**Prepared by:** Swayamshree Nayak  
**Document Status:** Final

---

## Table of Contents

1. Introduction
2. Overall Description
3. System Architecture
4. Functional Requirements
5. Non-Functional Requirements
6. Database Design
7. API Specification
8. User Interface Requirements
9. Security Requirements
10. Constraints and Assumptions

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document describes the functional and non-functional requirements for **Learn2Earn**, a full-stack web application designed to help Indian students (Class 1 through graduate level) explore career paths, develop skills, take assessments, and find job/internship opportunities — all in one platform.

### 1.2 Scope

Learn2Earn is a production-ready web platform that provides:

- A structured learning platform with courses across all education levels
- MCQ-based tests with scoring and weak area detection
- AI-powered career guidance and chatbot (Groq LLaMA 3.3)
- A job and internship portal with filters
- A resume builder with live preview and print/download
- A gamified dashboard with XP, streaks, and badges
- An admin panel for content management
- Dark/Light mode support

### 1.3 Intended Audience

- **Students** — Class 1 to graduate level seeking learning resources and career guidance
- **Administrators** — Platform managers who manage courses, tests, and job listings
- **Developers** — Engineers maintaining or extending the platform

### 1.4 Definitions and Acronyms

| Term | Definition |
|------|-----------|
| XP | Experience Points — gamification metric earned by completing activities |
| MCQ | Multiple Choice Question |
| SRS | Software Requirements Specification |
| API | Application Programming Interface |
| JWT | JSON Web Token — used for session authentication |
| CRUD | Create, Read, Update, Delete |
| OTP | One-Time Password |
| AI | Artificial Intelligence |
| LLM | Large Language Model |

### 1.5 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS, Framer Motion |
| Backend | Next.js API Routes (Node.js) |
| Database | MongoDB with Mongoose ODM |
| Authentication | NextAuth.js (Credentials + Google OAuth) |
| AI / Chatbot | Groq SDK (LLaMA 3.3 70B) |
| Charts | Recharts |
| Deployment | Vercel (recommended) |

---

## 2. Overall Description

### 2.1 Product Perspective

Learn2Earn is a standalone web application accessible via any modern browser. It follows a monolithic Next.js architecture where both the frontend and backend API routes are served from the same application. Data is persisted in a MongoDB database (local or MongoDB Atlas).

### 2.2 Product Functions (Summary)

1. User registration and authentication (email/password + Google OAuth)
2. Course browsing, filtering, and learning with embedded YouTube videos
3. MCQ tests with auto-scoring, weak area detection, and XP rewards
4. AI career guidance with personalised roadmaps
5. AI chatbot for career counselling (Groq LLaMA 3.3)
6. Job/internship portal with type and skill filters
7. Resume builder with live preview and PDF download
8. Gamified dashboard (XP, streaks, badges, activity chart)
9. Admin panel for CRUD management of courses, tests, and jobs
10. Dark/Light mode toggle

### 2.3 User Classes

| User Class | Description |
|-----------|-------------|
| Guest | Unauthenticated visitor — can view landing page only |
| Student | Registered user — full access to learning, tests, career, jobs, resume |
| Admin | Privileged user — access to admin panel for content management |

### 2.4 Operating Environment

- **Client:** Any modern browser (Chrome, Firefox, Safari, Edge)
- **Server:** Node.js 18+ runtime (Vercel or self-hosted)
- **Database:** MongoDB 6+ (local instance or MongoDB Atlas)
- **Network:** HTTPS in production, HTTP in development

### 2.5 Assumptions and Dependencies

- MongoDB must be running and accessible via `MONGODB_URI`
- `NEXTAUTH_SECRET` must be set for JWT signing
- Groq API key is optional — chatbot degrades gracefully without it
- Google OAuth credentials are optional — email/password login always works

---

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client Browser                    │
│         Next.js 14 App Router (React 18)            │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/HTTPS
┌──────────────────────▼──────────────────────────────┐
│              Next.js API Routes (Server)             │
│   /api/auth  /api/courses  /api/tests  /api/jobs    │
│   /api/user  /api/career   /api/chat               │
└──────────────────────┬──────────────────────────────┘
                       │ Mongoose ODM
┌──────────────────────▼──────────────────────────────┐
│                   MongoDB Database                   │
│        Collections: users, courses, tests, jobs     │
└─────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│              External Services                       │
│   Groq AI API  |  Google OAuth  |  RapidAPI Jobs    │
└─────────────────────────────────────────────────────┘
```

### 3.2 Folder Structure

```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── page.tsx          # Landing page
│   ├── dashboard/        # User dashboard
│   ├── learn/            # Course catalog and course detail
│   ├── tests/            # Test listing and test taking
│   ├── career/           # Career guidance + AI chatbot
│   ├── jobs/             # Job portal
│   ├── resume/           # Resume builder
│   ├── admin/            # Admin panel (admin only)
│   ├── auth/             # Login and signup pages
│   └── api/              # All backend API routes
├── components/           # Reusable React components
├── models/               # Mongoose data models
├── data/                 # Static seed data
├── lib/                  # Database connection, auth config, utilities
└── types/                # TypeScript type declarations
```

---

## 4. Functional Requirements

### 4.1 Authentication Module

#### FR-AUTH-01: User Registration
- The system shall allow new users to register with name, email, password, and education level
- Password shall be hashed using bcrypt before storage
- Email addresses shall be stored in lowercase and must be unique
- Default role assigned on registration: `student`

#### FR-AUTH-02: User Login
- The system shall authenticate users via email and password
- The system shall support Google OAuth login
- On successful login, a JWT session token shall be issued
- Failed login attempts shall return appropriate error messages

#### FR-AUTH-03: Session Management
- Sessions shall be managed using NextAuth.js with JWT strategy
- Session tokens shall include user ID, name, email, and role
- Sessions shall persist across browser refreshes

#### FR-AUTH-04: Role-Based Access Control
- Users with role `student` shall not access the admin panel
- Users with role `admin` shall have full access to all pages
- Unauthenticated users shall be redirected to `/auth/login`
- Non-admin authenticated users attempting to access `/admin` shall be redirected to `/dashboard`

---

### 4.2 Landing Page Module

#### FR-LAND-01: Hero Section
- The system shall display an animated typewriter brand name cycling through: Learn, Grow, Earn, Succeed, Explore
- Logged-in users shall see a personalised welcome with their name and stats
- Logged-out users shall see "Get Started Free" and "Explore Features" CTAs

#### FR-LAND-02: Features, Stats, Testimonials
- The system shall display platform features, student statistics, and testimonials
- All testimonials shall reference the platform name "Learn2Earn"

---

### 4.3 Dashboard Module

#### FR-DASH-01: User Stats Display
- The system shall display the user's current XP, level, streak, and badges
- Level shall be calculated as: `floor(XP / 500) + 1`
- XP progress bar shall show progress toward the next level

#### FR-DASH-02: Activity Chart
- The system shall display a weekly activity chart using Recharts
- The chart shall show learning activity over the past 7 days

#### FR-DASH-03: Quick Actions
- The system shall provide quick navigation links to Learn, Tests, Career, and Jobs

---

### 4.4 Learning Platform Module

#### FR-LEARN-01: Course Catalog
- The system shall display all available courses fetched from MongoDB
- Courses shall be filterable by category and education group
- Courses shall be searchable by title, description, and category
- Each course card shall display title, category, level, enrolled count, and rating

#### FR-LEARN-02: Course Detail
- The system shall display full course details including lessons, YouTube videos, and what-you-learn
- Users shall be able to enrol in a course
- Enrolled courses shall be tracked in the user's profile

#### FR-LEARN-03: Course Seeding
- On first load, if the courses collection is empty, the system shall seed it with sample courses
- The system shall automatically update any courses with `language: "Hindi"` to `"English"`

#### FR-LEARN-04: Education Groups
- Courses shall be organised into groups: Class 1-5, Class 6-8, Class 9-10, Class 11, Class 12, Graduate & Above, Skill Development

---

### 4.5 Tests & Assessment Module

#### FR-TEST-01: Test Listing
- The system shall display all available MCQ tests fetched from MongoDB
- Tests shall be filterable by category

#### FR-TEST-02: Test Taking
- The system shall present MCQ questions one at a time or all at once
- Each question shall have 4 options with a single correct answer
- A countdown timer shall be displayed based on test duration

#### FR-TEST-03: Test Submission and Scoring
- On submission, the system shall calculate the score as a percentage
- The system shall identify weak areas based on incorrect answers
- XP shall be awarded based on score performance
- Results shall be saved to the user's `completedTests` array

#### FR-TEST-04: Test Seeding
- On first load, if the tests collection is empty, the system shall seed it with sample tests

---

### 4.6 Career Guidance Module

#### FR-CAREER-01: Career Roadmaps
- The system shall display personalised career roadmaps based on the user's interests
- If no interests match, the system shall show the top 3 default career paths

#### FR-CAREER-02: AI Chatbot
- The system shall provide an AI chatbot powered by Groq LLaMA 3.3 70B
- The chatbot shall act as a career counsellor for Indian students
- The chatbot shall maintain conversation history (last 6 messages)
- If the Groq API key is not configured, the chatbot shall display a helpful error message
- The chatbot shall respond in the same language the user writes in

---

### 4.7 Job Portal Module

#### FR-JOB-01: Job Listings
- The system shall display job and internship listings from MongoDB
- Listings shall be filterable by type: internship, full-time, part-time, remote
- Each listing shall display title, company, location, type, skills, and salary

#### FR-JOB-02: Job Application
- Users shall be able to apply to jobs
- Applied jobs shall be tracked in the user's `appliedJobs` array

#### FR-JOB-03: Job Seeding
- On first load, if the jobs collection is empty, the system shall seed it with sample jobs
- The system shall NOT wipe and reseed jobs on subsequent loads

---

### 4.8 Resume Builder Module

#### FR-RESUME-01: Resume Form
- The system shall provide input fields for: personal info, education, experience, skills, and projects

#### FR-RESUME-02: Live Preview
- The system shall render a live preview of the resume as the user types

#### FR-RESUME-03: Print / Download
- The system shall allow users to print or download the resume as a PDF using the browser print dialog

---

### 4.9 Admin Panel Module

#### FR-ADMIN-01: Access Control
- The admin panel shall only be accessible to users with `role: "admin"`
- Non-admin users shall be redirected to `/dashboard`
- Unauthenticated users shall be redirected to `/auth/login`

#### FR-ADMIN-02: Course Management
- Admins shall be able to view all courses in a table
- Admins shall be able to add new courses via a modal form
- Admins shall be able to edit existing courses
- Admins shall be able to delete courses with a confirmation prompt
- All changes shall persist to MongoDB

#### FR-ADMIN-03: Test Management
- Admins shall be able to view all tests in a table
- Admins shall be able to add, edit, and delete tests
- All changes shall persist to MongoDB

#### FR-ADMIN-04: Job Management
- Admins shall be able to view all job listings in a table
- Admins shall be able to add, edit, and delete job listings
- All changes shall persist to MongoDB

---

### 4.10 User Profile Module

#### FR-USER-01: Profile Data
- The system shall store and retrieve user profile data including name, email, education level, interests, and career goals

#### FR-USER-02: XP and Gamification
- The system shall award XP for completing courses and tests
- The system shall track daily streaks
- The system shall award badges for achievements

---

## 5. Non-Functional Requirements

### 5.1 Performance

| Requirement | Target |
|-------------|--------|
| Page load time | < 2 seconds on broadband |
| API response time | < 500ms for standard queries |
| Database queries | Indexed on frequently queried fields |
| AI chatbot response | < 5 seconds |

### 5.2 Scalability
- The application shall be deployable on Vercel with serverless API routes
- MongoDB Atlas shall support horizontal scaling via sharding if needed
- Static assets shall be served via CDN

### 5.3 Usability
- The UI shall be fully responsive across mobile, tablet, and desktop
- The platform shall support Dark Mode and Light Mode
- All interactive elements shall have hover and focus states
- Font sizes shall meet WCAG AA accessibility standards

### 5.4 Reliability
- API routes shall handle errors gracefully and return meaningful error messages
- If MongoDB is unavailable, course and job APIs shall fall back to static sample data
- If the Groq API is unavailable, the chatbot shall display a user-friendly error

### 5.5 Maintainability
- Code shall follow consistent TypeScript typing throughout
- Mongoose models shall define strict schemas with validation
- Environment variables shall be used for all secrets and configuration

### 5.6 Compatibility
- The application shall support the latest 2 versions of Chrome, Firefox, Safari, and Edge
- The application shall be functional on screens as small as 375px width

---

## 6. Database Design

### 6.1 User Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Auto-generated primary key |
| `name` | String | Full name (required) |
| `email` | String | Unique, lowercase (required) |
| `password` | String | Bcrypt hashed (optional for OAuth) |
| `image` | String | Profile picture URL |
| `educationLevel` | String | Default: "10th" |
| `interests` | String[] | User's interest tags |
| `careerGoals` | String[] | User's career goals |
| `role` | String | "student" or "admin" (default: "student") |
| `streak` | Number | Daily login streak (default: 0) |
| `badges` | String[] | Earned badge names |
| `xp` | Number | Experience points (default: 0) |
| `completedCourses` | String[] | IDs of completed courses |
| `completedTests` | String[] | IDs of completed tests |
| `appliedJobs` | String[] | IDs of applied jobs |
| `lastActiveDate` | String | ISO date string of last activity |
| `createdAt` | Date | Auto-generated timestamp |

### 6.2 Course Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Auto-generated primary key |
| `title` | String | Course title (required) |
| `description` | String | Course description (required) |
| `category` | String | Subject category (required) |
| `educationGroup` | String | Target education group |
| `language` | String | Medium of instruction |
| `level` | String | "beginner", "intermediate", or "advanced" |
| `duration` | String | Estimated duration |
| `instructor` | String | Instructor name |
| `tags` | String[] | Searchable tags |
| `enrolledCount` | Number | Number of enrolled students |
| `rating` | Number | Average rating (0-5) |
| `lessons` | Object[] | Array of lesson objects |
| `youtubeVideos` | Object[] | Linked YouTube videos |
| `whatYouLearn` | String[] | Learning outcomes |
| `prerequisites` | String[] | Prerequisites |
| `createdAt` | Date | Auto-generated timestamp |

### 6.3 Test Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Auto-generated primary key |
| `title` | String | Test title (required) |
| `description` | String | Test description |
| `category` | String | Subject category |
| `questions` | Object[] | Array of MCQ question objects |
| `duration` | Number | Duration in minutes (default: 30) |
| `passingScore` | Number | Minimum passing percentage (default: 60) |
| `createdAt` | Date | Auto-generated timestamp |

**Question Object:**

| Field | Type | Description |
|-------|------|-------------|
| `question` | String | Question text |
| `options` | String[] | 4 answer options |
| `correct` | Number | Index of correct option (0-3) |
| `explanation` | String | Explanation of correct answer |
| `difficulty` | String | "easy", "medium", or "hard" |
| `topic` | String | Topic/subtopic tag |

### 6.4 Job Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Auto-generated primary key |
| `title` | String | Job title (required) |
| `company` | String | Company name (required) |
| `location` | String | Job location |
| `type` | String | "internship", "full-time", "part-time", or "remote" |
| `description` | String | Job description |
| `skills` | String[] | Required skills |
| `educationLevel` | String | Minimum education required |
| `salary` | String | Salary/stipend range |
| `applyUrl` | String | Application URL |
| `deadline` | Date | Application deadline |
| `isNewListing` | Boolean | Whether listing is new |
| `postedAt` | Date | Posting date |
| `createdAt` | Date | Auto-generated timestamp |

---

## 7. API Specification

### 7.1 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/[...nextauth]` | Login / OAuth callback | No |
| GET | `/api/auth/[...nextauth]` | Get session info | No |

### 7.2 User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user` | Get current user profile | Yes |
| PUT | `/api/user` | Update user profile | Yes |
| POST | `/api/user/enroll` | Enrol in a course | Yes |
| POST | `/api/user/apply` | Apply to a job | Yes |

### 7.3 Course Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courses` | List all courses (with filters) | No |
| POST | `/api/courses` | Create a new course | Admin |
| GET | `/api/courses/[id]` | Get course by ID | No |
| PUT | `/api/courses/[id]` | Update course by ID | Admin |
| DELETE | `/api/courses/[id]` | Delete course by ID | Admin |

### 7.4 Test Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tests` | List all tests | No |
| POST | `/api/tests` | Create a new test | Admin |
| GET | `/api/tests/[id]` | Get test by ID | No |
| PUT | `/api/tests/[id]` | Update test by ID | Admin |
| DELETE | `/api/tests/[id]` | Delete test by ID | Admin |
| POST | `/api/tests/submit` | Submit test answers, get score | Yes |

### 7.5 Job Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/jobs` | List all jobs (with filters) | No |
| POST | `/api/jobs` | Create a new job listing | Admin |
| GET | `/api/jobs/[id]` | Get job by ID | No |
| PUT | `/api/jobs/[id]` | Update job by ID | Admin |
| DELETE | `/api/jobs/[id]` | Delete job by ID | Admin |

### 7.6 AI Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/career` | Get personalised career suggestions | Yes |
| POST | `/api/chat` | Send message to AI chatbot | No |

---

## 8. User Interface Requirements

### 8.1 General UI Requirements

- The application shall use a consistent design system with cyan (`#06b6d4`) as the primary colour and indigo (`#6366f1`) as the secondary colour
- All pages shall include the shared Navbar and Footer components
- The Navbar shall display Login/Logout buttons based on authentication state
- The Navbar shall show the user's first name when logged in

### 8.2 Responsive Design

- All pages shall be fully functional on screens from 375px to 1920px wide
- The Navbar shall collapse to a hamburger menu on mobile screens
- Course and job grids shall adapt from 1 column (mobile) to 3-4 columns (desktop)

### 8.3 Theme Support

- The application shall support Light Mode and Dark Mode
- Theme preference shall be persisted in localStorage
- The system shall respect the user's OS-level theme preference on first visit
- A toggle button in the Navbar shall allow manual switching

### 8.4 Animations

- Page transitions and component entrances shall use Framer Motion
- Buttons shall have hover lift and active press effects
- The hero section shall feature animated background glows
- The brand name shall animate with a typewriter effect on the landing page

---

## 9. Security Requirements

### 9.1 Authentication Security
- Passwords shall be hashed with bcrypt (minimum 10 salt rounds) before storage
- Plain-text passwords shall never be stored or logged
- JWT tokens shall be signed with `NEXTAUTH_SECRET`
- Session tokens shall expire after a configurable period

### 9.2 Authorization
- All admin API routes shall verify the user's role server-side before processing
- The admin page shall redirect non-admin users client-side
- API routes that modify data shall require authentication

### 9.3 Input Validation
- All API routes shall validate required fields before processing
- Database queries shall use Mongoose schema validation
- User-supplied strings shall not be directly interpolated into queries (Mongoose handles this)

### 9.4 Environment Variables
- All secrets (API keys, database URIs, JWT secrets) shall be stored in `.env.local`
- `.env.local` shall never be committed to version control
- Production secrets shall be configured via the deployment platform's environment variable settings

---

## 10. Constraints and Assumptions

### 10.1 Technical Constraints
- The application requires Node.js 18 or higher
- MongoDB must be version 6 or higher
- The Groq AI chatbot requires a valid `GROQ_API_KEY` to function
- Google OAuth requires valid `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### 10.2 Business Constraints
- The platform is targeted at Indian students (Class 1 through graduate level)
- All course content is in English
- Career guidance is tailored to the Indian education system and job market

### 10.3 Assumptions
- Users have access to a modern browser with JavaScript enabled
- Users have a stable internet connection for video content and AI features
- The MongoDB instance is accessible from the deployment environment
- The admin role is assigned manually via database update

### 10.4 Future Enhancements (Out of Scope for v1.0)
- Mobile application (iOS / Android)
- Payment gateway for premium courses
- Live classes and video conferencing
- Peer-to-peer discussion forums
- Email notifications and reminders
- Multi-language support (Hindi, regional languages)
- Offline mode / Progressive Web App (PWA)

---

*End of SRS Document*

**Document Version History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | June 2025 | Swayamshree Nayak | Initial release |
