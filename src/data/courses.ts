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
  { id: "class1to5",  label: "Class 1-5",        icon: "seedling",  desc: "Fun learning for young minds",    color: "from-yellow-400 to-orange-400" },
  { id: "class6to8",  label: "Class 6-8",        icon: "book",      desc: "Build strong foundations",        color: "from-green-400 to-teal-400"   },
  { id: "class9to10", label: "Class 9-10",       icon: "target",    desc: "Board exam preparation",          color: "from-blue-400 to-cyan-400"    },
  { id: "class11",    label: "Class 11",         icon: "flask",     desc: "Science, Commerce & Arts",        color: "from-purple-400 to-violet-400"},
  { id: "class12",    label: "Class 12",         icon: "trophy",    desc: "Boards + Entrance Exams",         color: "from-red-400 to-pink-400"     },
  { id: "graduate",   label: "Graduate & Above", icon: "mortarboard",desc: "Degree, skills & career",        color: "from-indigo-400 to-blue-500"  },
  { id: "skills",     label: "Skill Development",icon: "zap",       desc: "Coding, Design, Business",        color: "from-orange-400 to-amber-400" },
];

export const sampleCourses: Course[] = [

  // ── Class 1-5 ──────────────────────────────────────────────────────────────

  {
    title: "Fun with Numbers (Class 1-3)",
    description: "Learn counting, addition, subtraction with fun games and colorful examples. Perfect introduction to mathematics.",
    category: "Mathematics", educationGroup: "class1to5", language: "English", level: "beginner",
    duration: "4 hours", instructor: "Mrs. Priya Sharma",
    tags: ["maths", "class1", "class2", "class3", "numbers"], enrolledCount: 12000, rating: 4.8, reviewCount: 1240,
    youtubeVideos: [
      { title: "Counting 1 to 100 | Number Song for Kids", channel: "Kids Learning Tube", url: "https://www.youtube.com/watch?v=0TgLtF3PMOc", duration: "10:24", views: "45M views", thumbnail: "counting" },
      { title: "Addition for Kids | Learn to Add Numbers", channel: "Math Antics", url: "https://www.youtube.com/watch?v=AuX7nPBqDts", duration: "9:15", views: "12M views", thumbnail: "addition" },
      { title: "Subtraction for Kids | Basic Maths", channel: "Smile and Learn", url: "https://www.youtube.com/watch?v=6pDH66X3ClA", duration: "8:30", views: "8M views", thumbnail: "subtraction" },
    ],
    lessons: [
      {
        title: "Counting 1 to 100",
        duration: "15 min",
        type: "video",
        content: `# Counting 1 to 100

Counting is the foundation of all mathematics. Let us learn to count from 1 to 100 step by step.

## Counting 1 to 10

1, 2, 3, 4, 5, 6, 7, 8, 9, 10

Say each number out loud as you count. Use your fingers to help!

## Counting 11 to 20

11 - eleven
12 - twelve
13 - thirteen
14 - fourteen
15 - fifteen
16 - sixteen
17 - seventeen
18 - eighteen
19 - nineteen
20 - twenty

## Counting by 10s

10, 20, 30, 40, 50, 60, 70, 80, 90, 100

## Tips for Counting

- Count objects around you — apples, pencils, books
- Count forward: 1, 2, 3...
- Count backward: 10, 9, 8...

💡 Fun Trick: When counting large numbers, group them in sets of 10. Count 10 pencils, then another 10 — that is 20!

📌 Practice: Count all the chairs in your room. Then count backward from that number to 1.`,
      },
      {
        title: "Addition and Subtraction",
        duration: "20 min",
        type: "video",
        content: `# Addition and Subtraction

## What is Addition?

Addition means putting numbers together to get a bigger number. We use the + sign.

3 + 2 = 5

Think of it like this: You have 3 apples. Your friend gives you 2 more. Now you have 5 apples.

## Addition Examples

- 4 + 3 = 7
- 6 + 5 = 11
- 8 + 7 = 15
- 10 + 9 = 19

## What is Subtraction?

Subtraction means taking away a number from another. We use the - sign.

7 - 3 = 4

Think of it like this: You have 7 balloons. 3 fly away. Now you have 4 balloons.

## Subtraction Examples

- 9 - 4 = 5
- 12 - 6 = 6
- 15 - 8 = 7
- 20 - 11 = 9

## Addition and Subtraction Together

If 3 + 4 = 7, then 7 - 4 = 3 and 7 - 3 = 4.

These are called fact families!

💡 Use your fingers, draw pictures, or use small objects like coins to help you add and subtract.

📌 Practice: You have 10 toffees. You eat 4. How many are left? Then your friend gives you 3 more. How many do you have now?`,
      },
      {
        title: "Shapes and Patterns",
        duration: "15 min",
        type: "activity",
        content: `# Shapes and Patterns

## Basic 2D Shapes

### Circle
- Round with no corners
- Examples: wheel, coin, clock

### Square
- 4 equal sides, 4 corners
- Examples: chessboard, window

### Rectangle
- 4 sides, opposite sides are equal, 4 corners
- Examples: book, door, phone

### Triangle
- 3 sides, 3 corners
- Examples: pizza slice, mountain, roof

## Identifying Shapes Around You

Look around your room right now:
- Your book is a rectangle
- A clock is a circle
- A sandwich cut diagonally is a triangle

## Patterns

A pattern is something that repeats in a regular way.

- Red, Blue, Red, Blue, Red, Blue... (colour pattern)
- Circle, Square, Circle, Square... (shape pattern)
- 2, 4, 6, 8, 10... (number pattern)

## Creating Patterns

You can make patterns with:
- Colours
- Shapes
- Numbers
- Sounds (clap, stomp, clap, stomp)

💡 Patterns are everywhere — on your clothes, tiles, and even in music!

📌 Practice: Draw a pattern using two shapes of your choice. Repeat it at least 5 times.`,
      },
    ],
    whatYouLearn: ["Count from 1 to 100", "Add and subtract single-digit numbers", "Identify basic 2D shapes", "Recognise and create patterns"],
    prerequisites: ["None - perfect for beginners!"],
  },

  {
    title: "English Grammar Basics (Class 1-5)",
    description: "Nouns, verbs, adjectives and simple sentences for young learners. Build a strong language foundation.",
    category: "English", educationGroup: "class1to5", language: "English", level: "beginner",
    duration: "5 hours", instructor: "Mr. Arjun Mehta",
    tags: ["english", "grammar", "class1", "class5"], enrolledCount: 9500, rating: 4.7, reviewCount: 980,
    youtubeVideos: [
      { title: "Nouns for Kids | What is a Noun?", channel: "Grammaropolis", url: "https://www.youtube.com/watch?v=6Oq_RFsqFaI", duration: "3:45", views: "5M views", thumbnail: "noun" },
      { title: "Verbs for Kids | Action Words", channel: "English Tree TV", url: "https://www.youtube.com/watch?v=8nMnMFMFkLo", duration: "4:12", views: "3M views", thumbnail: "verb" },
      { title: "Adjectives for Kids | Describing Words", channel: "Smile and Learn", url: "https://www.youtube.com/watch?v=NkuuZEey_bs", duration: "5:20", views: "4M views", thumbnail: "adjective" },
    ],
    lessons: [
      {
        title: "Nouns and Pronouns",
        duration: "15 min",
        type: "video",
        content: `# Nouns and Pronouns

## What is a Noun?

A noun is a word that names a person, place, thing, or idea.

## Types of Nouns

### Person
- boy, girl, teacher, doctor, mother, Aman, Priya

### Place
- school, park, city, India, Delhi, market

### Thing
- book, pen, table, mango, car, phone

### Idea
- happiness, love, freedom, courage

## Examples in Sentences

- The **dog** is barking. (thing)
- **Aman** lives in **Delhi**. (person, place)
- **Kindness** is important. (idea)

## What is a Pronoun?

A pronoun replaces a noun so we do not have to repeat it.

- I, me, my, mine
- you, your, yours
- he, him, his
- she, her, hers
- it, its
- we, us, our
- they, them, their

## Examples

Instead of: Aman went to school. Aman carried Aman's bag.
We say: Aman went to school. **He** carried **his** bag.

💡 Pronouns make sentences shorter and easier to read.

📌 Practice: Write 5 sentences. Underline all the nouns. Then rewrite the sentences replacing nouns with pronouns.`,
      },
      {
        title: "Verbs - Action Words",
        duration: "15 min",
        type: "video",
        content: `# Verbs - Action Words

## What is a Verb?

A verb is a word that shows action or a state of being. Every sentence must have a verb.

## Action Verbs

Action verbs show what someone or something does.

- run, jump, eat, sleep, read, write, play, sing, dance, swim

## Examples in Sentences

- The children **play** in the park.
- She **reads** a book every night.
- The dog **runs** fast.
- I **eat** rice for lunch.

## Being Verbs (is, am, are, was, were)

Being verbs do not show action. They show a state.

- I **am** happy.
- She **is** a doctor.
- They **are** my friends.
- He **was** tired yesterday.

## Verb Tenses

Verbs change based on time:

- Present: I **eat** an apple.
- Past: I **ate** an apple.
- Future: I **will eat** an apple.

💡 To find the verb in a sentence, ask "What is happening?" or "What is the subject doing?"

📌 Practice: Write 10 action verbs. Use each one in a sentence. Then change each sentence to past tense.`,
      },
      {
        title: "Adjectives - Describing Words",
        duration: "20 min",
        type: "video",
        content: `# Adjectives - Describing Words

## What is an Adjective?

An adjective is a word that describes a noun. It tells us more about a person, place, or thing.

## Types of Adjectives

### Adjectives of Quality (What kind?)
- big, small, tall, short, beautiful, ugly, hot, cold, sweet, sour

### Adjectives of Quantity (How many? How much?)
- one, two, many, few, some, all, no, several

### Adjectives of Colour
- red, blue, green, yellow, black, white, orange, purple

## Examples in Sentences

- The **big** elephant walked slowly.
- She has **long** hair.
- I ate **three** mangoes.
- He wore a **blue** shirt.

## Adjectives Make Writing Better

Without adjective: The dog barked.
With adjective: The **small, brown** dog barked **loudly**.

## Degrees of Adjectives

- Positive: tall
- Comparative: taller (comparing two)
- Superlative: tallest (comparing three or more)

Example:
- Aman is **tall**.
- Rahul is **taller** than Aman.
- Priya is the **tallest** in the class.

💡 Good writers use adjectives to paint a picture with words.

📌 Practice: Describe your school bag using at least 5 adjectives. Write a short paragraph about it.`,
      },
      {
        title: "Simple Sentences",
        duration: "20 min",
        type: "activity",
        content: `# Simple Sentences

## What is a Sentence?

A sentence is a group of words that makes complete sense. Every sentence has two parts:

- Subject - who or what the sentence is about
- Predicate - what the subject does or is

## Examples

- **The cat** (subject) **sleeps on the mat** (predicate).
- **Aman** (subject) **plays cricket** (predicate).
- **Birds** (subject) **fly in the sky** (predicate).

## Types of Sentences

### Declarative (Statement)
Makes a statement. Ends with a full stop.
- The sun rises in the east.
- I love reading books.

### Interrogative (Question)
Asks a question. Ends with a question mark.
- What is your name?
- Where do you live?

### Exclamatory (Exclamation)
Shows strong feeling. Ends with an exclamation mark.
- What a beautiful day!
- How clever you are!

### Imperative (Command)
Gives a command or request.
- Please sit down.
- Open your books.

## Capital Letters and Full Stops

- Every sentence starts with a capital letter.
- Every sentence ends with a full stop, question mark, or exclamation mark.

💡 A sentence must always make complete sense. "The dog" is not a sentence. "The dog barked loudly" is a sentence.

📌 Practice: Write one sentence of each type - declarative, interrogative, exclamatory, and imperative.`,
      },
    ],
    whatYouLearn: ["Identify nouns, pronouns, verbs and adjectives", "Form simple sentences", "Use correct punctuation", "Expand vocabulary"],
  },

  {
    title: "EVS - Our Environment (Class 3-5)",
    description: "Learn about plants, animals, water, air and our surroundings in a fun way.",
    category: "Science", educationGroup: "class1to5", language: "Hindi", level: "beginner",
    duration: "3 hours", instructor: "Mrs. Kavita Rao",
    tags: ["evs", "environment", "class3", "class5", "science"], enrolledCount: 8200, rating: 4.6, reviewCount: 810,
    youtubeVideos: [
      { title: "Plants and Their Parts | EVS for Kids", channel: "Periwinkle", url: "https://www.youtube.com/watch?v=3mHKBGMkHAI", duration: "7:15", views: "6M views", thumbnail: "plant" },
      { title: "Animals and Their Homes | EVS Class 3", channel: "Magnet Brains", url: "https://www.youtube.com/watch?v=Ry9M4rFMBFU", duration: "8:40", views: "3M views", thumbnail: "animal" },
      { title: "Water Cycle for Kids | EVS Science", channel: "Kurzgesagt", url: "https://www.youtube.com/watch?v=al-do-HGuIk", duration: "5:30", views: "10M views", thumbnail: "water" },
    ],
    lessons: [
      {
        title: "Plants Around Us",
        duration: "15 min",
        type: "video",
        content: `# Plants Around Us

## Why are Plants Important?

Plants are essential for life on Earth. They give us food, oxygen, medicine, and shelter.

## Types of Plants

### Trees
- Very tall with thick woody stems called trunks
- Live for many years
- Examples: mango, neem, banyan, oak, coconut

### Shrubs
- Medium-sized plants with woody stems
- Shorter than trees
- Examples: rose, hibiscus, jasmine, mehendi

### Herbs
- Small plants with soft, green stems
- Examples: tulsi, mint, coriander, wheat, grass

### Climbers
- Plants that climb on walls or other plants for support
- Examples: money plant, grapevine, pea plant

### Creepers
- Plants that grow along the ground
- Examples: pumpkin, watermelon, strawberry

## Parts of a Plant

- Roots - absorb water and minerals from soil, hold plant in place
- Stem - carries water and food to all parts
- Leaves - make food using sunlight (photosynthesis)
- Flowers - help in reproduction
- Fruits - contain seeds for new plants
- Seeds - grow into new plants

## Uses of Plants

- Food: fruits, vegetables, grains, pulses
- Medicine: neem, tulsi, aloe vera
- Shelter: wood from trees for furniture and houses
- Oxygen: plants release oxygen we breathe
- Clothing: cotton from cotton plants

💡 A single large tree can absorb up to 48 pounds of carbon dioxide per year and release enough oxygen for 2 people!

📌 Practice: Go outside and find one example each of a tree, shrub, and herb near your home. Draw and label them.`,
      },
      {
        title: "Animals and Their Homes",
        duration: "15 min",
        type: "video",
        content: `# Animals and Their Homes

## Types of Animals

### Wild Animals
Live in forests, jungles, and natural habitats.
- Lion, tiger, elephant, deer, monkey, snake, wolf

### Domestic Animals
Live with humans and are kept for various purposes.
- Dog, cat, cow, buffalo, horse, goat, hen

### Pet Animals
Kept at home for companionship.
- Dog, cat, parrot, fish, rabbit

### Farm Animals
Kept on farms for food and work.
- Cow, buffalo, goat, hen, pig, sheep

## Animal Homes

| Animal | Home |
| ------ | ---- |
| Lion | Den |
| Bird | Nest |
| Dog | Kennel |
| Cow | Shed / Barn |
| Rabbit | Burrow |
| Bee | Hive |
| Spider | Web |
| Fish | Water / Aquarium |
| Horse | Stable |
| Pig | Sty |

## What Animals Give Us

- Cow and buffalo: milk, curd, butter, ghee
- Hen: eggs and meat
- Sheep: wool for warm clothes
- Bees: honey and wax
- Silkworm: silk for clothes

## How Animals Move

- Walk/Run: dog, cat, horse, elephant
- Fly: birds, butterflies, bats
- Swim: fish, dolphin, frog
- Crawl: snake, lizard, earthworm
- Jump: frog, kangaroo, rabbit

💡 Animals that eat only plants are called herbivores. Animals that eat only meat are carnivores. Animals that eat both are omnivores.

📌 Practice: Make a chart with 5 animals, their homes, what they eat, and what they give us.`,
      },
      {
        title: "Water and Air",
        duration: "20 min",
        type: "video",
        content: `# Water and Air

## Importance of Water

Water is essential for all living things. Without water, no life is possible on Earth.

## Uses of Water

- Drinking and cooking
- Bathing and cleaning
- Watering plants and crops
- Used in factories and industries
- Swimming and other water sports

## Sources of Water

### Natural Sources
- Rain - the main source of fresh water
- Rivers - Ganga, Yamuna, Brahmaputra
- Lakes - Dal Lake, Chilika Lake
- Ponds and wells
- Oceans and seas (salt water)
- Glaciers and ice caps

### Man-made Sources
- Dams and reservoirs
- Borewells and handpumps
- Water tanks and taps

## The Water Cycle

1. Evaporation - Sun heats water in oceans and rivers, turning it into water vapour
2. Condensation - Water vapour rises and cools to form clouds
3. Precipitation - Water falls back as rain, snow, or hail
4. Collection - Water collects in rivers, lakes, and oceans

## Importance of Air

Air is a mixture of gases that surrounds the Earth. We cannot see, smell, or taste clean air, but we cannot live without it.

## Composition of Air

- Nitrogen - 78%
- Oxygen - 21% (we breathe this)
- Carbon dioxide - 0.04%
- Other gases - remaining

## Uses of Air

- We breathe oxygen from air to stay alive
- Plants use carbon dioxide to make food
- Wind (moving air) turns windmills to generate electricity
- Air fills tyres of vehicles
- Birds and aeroplanes fly using air

## Air Pollution

Air gets polluted by smoke from factories, vehicles, and burning waste. Polluted air causes breathing problems and diseases.

💡 Save water! A dripping tap wastes about 15 litres of water per day. Always turn off taps properly.

📌 Practice: Draw the water cycle and label all four stages with arrows showing the direction of movement.`,
      },
    ],
    whatYouLearn: ["Identify plant types and their parts", "Name animals and their homes", "Understand the water cycle", "Learn about air and its importance"],
  },
];

export const categories = [
  "All", "Mathematics", "Science", "English", "Physics", "Chemistry",
  "Biology", "Social Science", "Technology", "Commerce", "Management",
  "Business", "Design", "Soft Skills", "Accountancy", "Economics",
];

// ── Web Development Fundamentals ─────────────────────────────────────────────
sampleCourses.push({
  title: "Web Development Fundamentals",
  description: "HTML, CSS, and JavaScript basics to build your first website from scratch.",
  category: "Technology", educationGroup: "skills", language: "English", level: "beginner",
  duration: "12 hours", instructor: "Mr. Hitesh Choudhary",
  tags: ["html", "css", "javascript", "web", "frontend"], enrolledCount: 9800, rating: 4.7, reviewCount: 980,
  youtubeVideos: [
    { title: "HTML Full Course - Build a Website Tutorial", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=pQN-pnXPaVg", duration: "2:02:37", views: "14M views", thumbnail: "html" },
    { title: "CSS Tutorial - Zero to Hero (Complete Course)", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc", duration: "6:18:37", views: "5M views", thumbnail: "css" },
    { title: "JavaScript Full Course for Beginners", channel: "Bro Code", url: "https://www.youtube.com/watch?v=lfmg-EJ8gm4", duration: "12:00:00", views: "4M views", thumbnail: "js" },
    { title: "Build a Complete Website with HTML & CSS", channel: "Kevin Powell", url: "https://www.youtube.com/watch?v=moBhzSC455o", duration: "1:30:00", views: "2M views", thumbnail: "project" },
  ],
  whatYouLearn: [
    "Build complete HTML pages with semantic structure",
    "Style websites with CSS, Flexbox and Grid",
    "Add interactivity with JavaScript",
    "Deploy a live website for free",
  ],
  prerequisites: ["No prior experience needed", "A computer with a browser"],
  lessons: [
    {
      title: "HTML Basics",
      duration: "30 min",
      type: "video",
      content: `# HTML Basics

HTML stands for HyperText Markup Language. It is the skeleton of every webpage — it defines the structure and content.

## Your First HTML Page

Create a file called index.html and type:

\`\`\`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
  </body>
</html>
\`\`\`

Open this file in your browser — you will see your first webpage!

## HTML Tags

HTML uses tags to mark up content. Tags come in pairs — an opening tag and a closing tag.

\`\`\`
<tagname>content goes here</tagname>
\`\`\`

## Common HTML Tags

### Headings
\`\`\`
<h1>Biggest Heading</h1>
<h2>Second Heading</h2>
<h3>Third Heading</h3>
\`\`\`

### Paragraph
\`\`\`
<p>This is a paragraph of text.</p>
\`\`\`

### Links
\`\`\`
<a href="https://google.com">Click here to visit Google</a>
\`\`\`

### Images
\`\`\`
<img src="photo.jpg" alt="A description of the image" />
\`\`\`

### Lists
\`\`\`
<ul>
  <li>Unordered item 1</li>
  <li>Unordered item 2</li>
</ul>

<ol>
  <li>Ordered item 1</li>
  <li>Ordered item 2</li>
</ol>
\`\`\`

## Semantic HTML

Semantic tags describe the meaning of content, not just its appearance.

\`\`\`
<header>   - top section of the page
<nav>      - navigation links
<main>     - main content area
<section>  - a section of content
<article>  - an independent piece of content
<footer>   - bottom section of the page
\`\`\`

## HTML Attributes

Attributes provide extra information about elements.

\`\`\`
<a href="https://google.com" target="_blank">Open in new tab</a>
<img src="cat.jpg" alt="A cute cat" width="300" />
<input type="text" placeholder="Enter your name" />
\`\`\`

💡 Always add an alt attribute to images. It helps visually impaired users and improves SEO.

📌 Practice: Build a simple webpage about yourself. Include your name as an h1, a short paragraph about yourself, a list of your hobbies, and a link to your favourite website.`,
    },
    {
      title: "CSS Styling",
      duration: "35 min",
      type: "video",
      content: `# CSS Styling

CSS stands for Cascading Style Sheets. It controls how HTML elements look — colours, fonts, spacing, layout, and more.

## Linking CSS to HTML

Create a file called style.css and link it in your HTML:

\`\`\`
<head>
  <link rel="stylesheet" href="style.css" />
</head>
\`\`\`

## CSS Syntax

\`\`\`
selector {
  property: value;
}
\`\`\`

Example:
\`\`\`
h1 {
  color: blue;
  font-size: 32px;
  font-family: Arial, sans-serif;
}
\`\`\`

## Selectors

\`\`\`
/* Element selector */
p { color: gray; }

/* Class selector */
.highlight { background-color: yellow; }

/* ID selector */
#header { background-color: navy; }
\`\`\`

## The Box Model

Every HTML element is a box with four layers:

\`\`\`
.box {
  width: 300px;
  padding: 20px;      /* space inside the border */
  border: 2px solid black;
  margin: 10px;       /* space outside the border */
}
\`\`\`

## Flexbox Layout

Flexbox makes it easy to arrange items in a row or column.

\`\`\`
.container {
  display: flex;
  justify-content: center;   /* horizontal alignment */
  align-items: center;       /* vertical alignment */
  gap: 16px;
}
\`\`\`

## CSS Grid

Grid is perfect for two-dimensional layouts.

\`\`\`
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## Responsive Design

Use media queries to make your site look good on all screen sizes.

\`\`\`
/* Mobile first */
.container { width: 100%; }

/* Tablet and above */
@media (min-width: 768px) {
  .container { width: 750px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { width: 960px; }
}
\`\`\`

## Common CSS Properties

\`\`\`
color: red;                    /* text colour */
background-color: #f0f0f0;     /* background colour */
font-size: 16px;               /* text size */
font-weight: bold;             /* text weight */
text-align: center;            /* text alignment */
border-radius: 8px;            /* rounded corners */
box-shadow: 0 4px 8px rgba(0,0,0,0.1);  /* shadow */
transition: all 0.3s ease;     /* smooth animation */
\`\`\`

💡 Use browser DevTools (F12) to inspect and experiment with CSS in real time without editing your files.

📌 Practice: Style your HTML page from the previous lesson. Add colours, fonts, a navigation bar using Flexbox, and make it responsive for mobile.`,
    },
    {
      title: "JavaScript Basics",
      duration: "45 min",
      type: "video",
      content: `# JavaScript Basics

JavaScript makes webpages interactive. It can respond to user actions, update content, fetch data, and much more.

## Adding JavaScript to HTML

\`\`\`
<!-- At the bottom of body -->
<script src="script.js"></script>
\`\`\`

## Variables

\`\`\`
let name = "Aman";        // can be changed
const age = 18;           // cannot be changed
var city = "Delhi";       // old way, avoid using
\`\`\`

## DOM Manipulation

The DOM (Document Object Model) lets JavaScript interact with HTML elements.

\`\`\`
// Select an element
const heading = document.getElementById("title");
const buttons = document.querySelectorAll(".btn");

// Change content
heading.textContent = "New Title";
heading.innerHTML = "<span>New Title</span>";

// Change style
heading.style.color = "blue";
heading.style.fontSize = "32px";

// Add/remove CSS classes
heading.classList.add("active");
heading.classList.remove("hidden");
heading.classList.toggle("dark");
\`\`\`

## Events

Events let you respond to user actions.

\`\`\`
const button = document.getElementById("myBtn");

button.addEventListener("click", function() {
  alert("Button was clicked!");
});

// Arrow function syntax
button.addEventListener("click", () => {
  console.log("Clicked!");
});
\`\`\`

## Practical Example — Dark Mode Toggle

\`\`\`
const toggle = document.getElementById("toggle");
const body = document.body;

toggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggle.textContent = body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
});
\`\`\`

## Fetch API — Getting Data

\`\`\`
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.getElementById("result").textContent = data.name;
  })
  .catch(error => console.error("Error:", error));
\`\`\`

## Form Validation

\`\`\`
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();  // stop page reload

  const email = document.getElementById("email").value;

  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  console.log("Form submitted:", email);
});
\`\`\`

💡 Open your browser console (F12 > Console) and type JavaScript directly to experiment without creating files.

📌 Practice: Add a button to your webpage that changes the background colour when clicked. Then add a form that validates the input before submission.`,
    },
    {
      title: "Build Your First Project",
      duration: "60 min",
      type: "project",
      content: `# Build Your First Project — Personal Portfolio

Now you will combine HTML, CSS, and JavaScript to build a complete personal portfolio website.

## Project Structure

\`\`\`
portfolio/
  index.html
  style.css
  script.js
  images/
    profile.jpg
\`\`\`

## Step 1 — HTML Structure

\`\`\`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aman Kumar | Portfolio</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <nav>
    <div class="logo">Aman Kumar</div>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button id="themeToggle">Dark Mode</button>
  </nav>

  <section id="hero">
    <h1>Hi, I am <span class="highlight">Aman Kumar</span></h1>
    <p>Aspiring Web Developer | Class 12 Student</p>
    <a href="#contact" class="btn">Get In Touch</a>
  </section>

  <section id="skills">
    <h2>My Skills</h2>
    <div class="skills-grid">
      <div class="skill">HTML</div>
      <div class="skill">CSS</div>
      <div class="skill">JavaScript</div>
      <div class="skill">Python</div>
    </div>
  </section>

  <section id="contact">
    <h2>Contact Me</h2>
    <form id="contactForm">
      <input type="text" id="name" placeholder="Your Name" required />
      <input type="email" id="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </section>

  <script src="script.js"></script>
</body>
</html>
\`\`\`

## Step 2 — CSS Styling

\`\`\`
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #1e293b;
  transition: background 0.3s, color 0.3s;
}

body.dark {
  background: #0f172a;
  color: #e2e8f0;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
}

#hero {
  text-align: center;
  padding: 6rem 2rem;
}

#hero h1 { font-size: 3rem; margin-bottom: 1rem; }
.highlight { color: #06b6d4; }

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #06b6d4;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1.5rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 2rem auto;
}

.skill {
  padding: 1rem;
  background: #e0f2fe;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  color: #0891b2;
}
\`\`\`

## Step 3 — JavaScript

\`\`\`
// Dark mode toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark")
    ? "Light Mode" : "Dark Mode";
});

// Form submission
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  alert("Thank you, " + name + "! Your message has been sent.");
  form.reset();
});
\`\`\`

## Deploying for Free

1. Create a free account at https://github.com
2. Create a new repository called username.github.io
3. Upload your files
4. Your site is live at https://username.github.io

💡 Your portfolio is your most important asset as a developer. Keep adding projects to it as you learn more.

📌 Challenge: Add a projects section with at least 2 project cards. Each card should have a title, description, tech stack, and a link.`,
    },
  ],
});

sampleCourses.push({
  title: "Python for Beginners",
  description: "Learn Python programming from scratch. Variables, loops, functions, OOP and projects.",
  category: "Technology", educationGroup: "graduate", language: "English", level: "beginner",
  duration: "8 hours", instructor: "Ms. Pooja Hegde",
  tags: ["python", "programming", "coding", "beginner"], enrolledCount: 12400, rating: 4.8, reviewCount: 1240,
  youtubeVideos: [
    { title: "Python Tutorial for Beginners - Full Course", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", duration: "6:14:07", views: "35M views", thumbnail: "python" },
    { title: "Python for Beginners - Learn in 1 Hour", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=kqtD5dpn9C8", duration: "1:00:07", views: "12M views", thumbnail: "python" },
    { title: "Python OOP Tutorial - Classes and Objects", channel: "Corey Schafer", url: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM", duration: "41:39", views: "4.5M views", thumbnail: "oop" },
  ],
  whatYouLearn: ["Write Python programs from scratch", "Use loops and conditionals", "Build functions and classes", "Create small projects"],
  prerequisites: ["No prior programming experience needed", "A computer with internet access"],
  lessons: [
    {
      title: "Introduction to Python",
      duration: "15 min",
      type: "video",
      content: `# Introduction to Python

Python is a high-level, general-purpose programming language created by Guido van Rossum in 1991. It is one of the most popular languages in the world, used in web development, data science, AI, automation, and more.

## Why Learn Python?

- Simple, readable syntax that reads almost like English
- Huge community and thousands of free libraries
- Used by Google, Netflix, NASA, and Instagram
- Best language for both beginners and professionals

## Installing Python

Step 1: Go to https://python.org and download the latest version (3.x).
Step 2: During installation, tick "Add Python to PATH".
Step 3: Open your terminal and type:

\`\`\`
python --version
\`\`\`

You should see: Python 3.11.0

## Your First Program

Create a file called hello.py and type:

\`\`\`
print("Hello, World!")
\`\`\`

Run it:

\`\`\`
python hello.py
\`\`\`

Output: Hello, World!

## How Python Works

- Python is an interpreted language — it runs line by line
- No need to compile like C or Java
- The Python interpreter reads your code and executes it immediately

💡 The print() function displays output on the screen. It is the most commonly used function when learning Python.

📌 Practice: Write a program that prints your name, your city, and your favourite subject on three separate lines.`,
    },
    {
      title: "Variables and Data Types",
      duration: "20 min",
      type: "video",
      content: `# Variables and Data Types

A variable is a named container that stores a value. In Python, you do not need to declare the type — Python figures it out automatically.

## Creating Variables

\`\`\`
name = "Aman"
age = 18
percentage = 95.5
is_student = True
\`\`\`

## The 4 Basic Data Types

- str — text, always written in quotes: "Hello"
- int — whole numbers: 10, -5, 0
- float — decimal numbers: 3.14, 99.9
- bool — only True or False

## Checking the Type

\`\`\`
print(type(name))         # <class 'str'>
print(type(age))          # <class 'int'>
print(type(percentage))   # <class 'float'>
\`\`\`

## Type Conversion

\`\`\`
x = "10"
y = int(x)       # string to integer -> 10
z = float(x)     # string to float   -> 10.0
s = str(99)      # integer to string -> "99"
print(y + 5)     # 15
\`\`\`

## f-Strings

f-strings are the cleanest way to embed variables inside text:

\`\`\`
name = "Aman"
age  = 18
city = "Delhi"
print(f"My name is {name}, I am {age} years old and I live in {city}.")
\`\`\`

## Getting Input from the User

\`\`\`
name = input("Enter your name: ")
print(f"Hello, {name}!")

age = int(input("Enter your age: "))
print(f"In 10 years you will be {age + 10}.")
\`\`\`

📌 Practice: Ask the user for their name and marks. Print their grade (A if marks >= 90, B if >= 75, else C) using an f-string.`,
    },
    {
      title: "Loops and Conditionals",
      duration: "30 min",
      type: "video",
      content: `# Loops and Conditionals

## if-elif-else Statements

\`\`\`
marks = 75

if marks >= 90:
    print("Grade: A")
elif marks >= 75:
    print("Grade: B")
elif marks >= 60:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`

Output: Grade: B

## Comparison Operators

- == equal to
- != not equal to
- >  greater than
- <  less than
- >= greater than or equal to
- <= less than or equal to

## for Loops

\`\`\`
fruits = ["apple", "banana", "mango"]
for fruit in fruits:
    print(fruit)
\`\`\`

## range() Function

\`\`\`
for i in range(1, 6):
    print(i)
# prints 1 2 3 4 5

for i in range(0, 11, 2):
    print(i)
# prints 0 2 4 6 8 10
\`\`\`

## while Loops

\`\`\`
count = 1
while count <= 5:
    print(f"Count: {count}")
    count += 1
\`\`\`

## break and continue

\`\`\`
for i in range(10):
    if i == 5:
        break       # exits the loop
    print(i)
# prints 0 1 2 3 4

for i in range(10):
    if i % 2 == 0:
        continue    # skips even numbers
    print(i)
# prints 1 3 5 7 9
\`\`\`

💡 Indentation is critical in Python. Use 4 spaces consistently. Wrong indentation causes errors.

📌 Practice: Write a program that prints all numbers from 1 to 100 that are divisible by 3 but not by 9.`,
    },
    {
      title: "Functions and OOP",
      duration: "40 min",
      type: "video",
      content: `# Functions and Object-Oriented Programming

## What is a Function?

A function is a reusable block of code that performs a specific task.

\`\`\`
def greet(name):
    print(f"Hello, {name}! Welcome to Python.")

greet("Aman")    # Hello, Aman! Welcome to Python.
greet("Priya")   # Hello, Priya! Welcome to Python.
\`\`\`

## Return Values

\`\`\`
def add(a, b):
    return a + b

result = add(10, 20)
print(result)    # 30
\`\`\`

## Default Parameters

\`\`\`
def greet(name, message="Good morning"):
    print(f"{message}, {name}!")

greet("Aman")                     # Good morning, Aman!
greet("Priya", "Good evening")    # Good evening, Priya!
\`\`\`

## Lists

\`\`\`
marks = [85, 92, 78, 95, 88]
print(marks[0])      # 85
print(len(marks))    # 5
print(sum(marks))    # 438
print(max(marks))    # 95
marks.append(91)     # add to end
marks.sort()         # sort ascending
\`\`\`

## Object-Oriented Programming

\`\`\`
class Student:
    def __init__(self, name, marks):
        self.name  = name
        self.marks = marks

    def grade(self):
        if self.marks >= 90:
            return "A"
        elif self.marks >= 75:
            return "B"
        else:
            return "C"

    def display(self):
        print(f"{self.name} - Marks: {self.marks}, Grade: {self.grade()}")

s1 = Student("Aman", 92)
s2 = Student("Priya", 78)
s1.display()    # Aman - Marks: 92, Grade: A
s2.display()    # Priya - Marks: 78, Grade: B
\`\`\`

## Key OOP Concepts

- Class — a blueprint for creating objects
- Object — an instance of a class
- __init__ — constructor, runs when object is created
- self — refers to the current object
- Method — a function defined inside a class

💡 Think of a class as a cookie cutter and objects as the cookies made from it.

📌 Practice: Create a class BankAccount with attributes owner and balance. Add methods deposit(amount), withdraw(amount), and show_balance().`,
    },
  ],
});

sampleCourses.push({
  title: "Mathematics Class 6-8",
  description: "Fractions, decimals, algebra basics, geometry and mensuration with practice problems.",
  category: "Mathematics", educationGroup: "class6to8", language: "English", level: "beginner",
  duration: "10 hours", instructor: "Mr. Rohit Bansal",
  tags: ["maths", "algebra", "class6", "class7", "class8"], enrolledCount: 22000, rating: 4.7, reviewCount: 2100,
  youtubeVideos: [
    { title: "Fractions and Decimals - Class 6 Maths", channel: "Magnet Brains", url: "https://www.youtube.com/watch?v=X0nCkOhFBP4", duration: "45:00", views: "2M views", thumbnail: "fractions" },
    { title: "Basic Algebra for Beginners", channel: "Math Antics", url: "https://www.youtube.com/watch?v=NybHckSEQBI", duration: "12:00", views: "8M views", thumbnail: "algebra" },
    { title: "Geometry Basics - Lines and Angles", channel: "Khan Academy", url: "https://www.youtube.com/watch?v=mML5UGGCt9A", duration: "10:00", views: "3M views", thumbnail: "geometry" },
  ],
  whatYouLearn: ["Operations on fractions and decimals", "Solve linear algebraic equations", "Understand geometric shapes", "Calculate area and perimeter"],
  lessons: [
    {
      title: "Fractions and Decimals",
      duration: "30 min", type: "video",
      content: `# Fractions and Decimals

## What is a Fraction?

A fraction represents a part of a whole. It has two parts:
- Numerator — the top number (how many parts we have)
- Denominator — the bottom number (total equal parts)

Example: 3/4 means 3 parts out of 4 equal parts.

## Types of Fractions

- Proper fraction: numerator < denominator (3/4, 2/5)
- Improper fraction: numerator > denominator (7/4, 9/5)
- Mixed number: whole number + fraction (1 3/4, 2 1/2)

## Operations on Fractions

### Addition and Subtraction (same denominator)
\`\`\`
3/7 + 2/7 = 5/7
5/9 - 2/9 = 3/9 = 1/3
\`\`\`

### Addition and Subtraction (different denominators)
Find LCM first:
\`\`\`
1/3 + 1/4
LCM of 3 and 4 = 12
= 4/12 + 3/12 = 7/12
\`\`\`

### Multiplication
\`\`\`
2/3 x 3/5 = (2x3)/(3x5) = 6/15 = 2/5
\`\`\`

### Division
Multiply by the reciprocal:
\`\`\`
2/3 / 4/5 = 2/3 x 5/4 = 10/12 = 5/6
\`\`\`

## Decimals

A decimal is another way to write a fraction with denominator 10, 100, 1000...

- 0.5 = 5/10 = 1/2
- 0.25 = 25/100 = 1/4
- 0.75 = 75/100 = 3/4

## Converting Fractions to Decimals

Divide numerator by denominator:
\`\`\`
3/4 = 3 / 4 = 0.75
1/8 = 1 / 8 = 0.125
\`\`\`

## Operations on Decimals

\`\`\`
2.5 + 1.75 = 4.25
5.6 - 2.3  = 3.3
1.2 x 3    = 3.6
4.8 / 2    = 2.4
\`\`\`

💡 When adding or subtracting decimals, always align the decimal points.

📌 Practice: Solve these — (a) 2/3 + 3/4, (b) 5/6 - 1/4, (c) 0.75 + 1.25, (d) Convert 7/8 to decimal.`,
    },
    {
      title: "Basic Algebra",
      duration: "35 min", type: "video",
      content: `# Basic Algebra

## What is Algebra?

Algebra uses letters (variables) to represent unknown numbers. It helps us solve problems where we don't know a value yet.

## Variables and Expressions

- Variable: a letter representing an unknown value (x, y, n)
- Expression: a combination of numbers, variables and operations (2x + 3, 5y - 7)
- Equation: an expression with an equals sign (2x + 3 = 11)

## Solving Linear Equations

The goal is to find the value of the variable.

### One-step equations
\`\`\`
x + 5 = 12
x = 12 - 5
x = 7

3x = 18
x = 18 / 3
x = 6
\`\`\`

### Two-step equations
\`\`\`
2x + 3 = 11
2x = 11 - 3
2x = 8
x = 4

5x - 7 = 18
5x = 18 + 7
5x = 25
x = 5
\`\`\`

### Equations with variables on both sides
\`\`\`
3x + 4 = x + 12
3x - x = 12 - 4
2x = 8
x = 4
\`\`\`

## Word Problems

"A number multiplied by 3 and then increased by 7 equals 22. Find the number."

Let the number = x
3x + 7 = 22
3x = 15
x = 5

## Algebraic Identities

\`\`\`
(a + b)^2 = a^2 + 2ab + b^2
(a - b)^2 = a^2 - 2ab + b^2
(a + b)(a - b) = a^2 - b^2
\`\`\`

💡 Always perform the same operation on both sides of the equation to keep it balanced.

📌 Practice: Solve (a) 4x - 9 = 15, (b) 2x + 5 = x + 13, (c) A number added to twice itself equals 21. Find the number.`,
    },
    {
      title: "Geometry Basics",
      duration: "30 min", type: "video",
      content: `# Geometry Basics

## Lines and Angles

### Types of Lines
- Line: extends infinitely in both directions
- Line segment: has two endpoints
- Ray: starts at a point and extends infinitely in one direction

### Types of Angles
- Acute angle: less than 90 degrees
- Right angle: exactly 90 degrees
- Obtuse angle: between 90 and 180 degrees
- Straight angle: exactly 180 degrees
- Reflex angle: between 180 and 360 degrees

## Triangles

### Types by sides
- Equilateral: all 3 sides equal, all angles = 60 degrees
- Isosceles: 2 sides equal, 2 angles equal
- Scalene: all sides different, all angles different

### Types by angles
- Acute triangle: all angles less than 90 degrees
- Right triangle: one angle = 90 degrees
- Obtuse triangle: one angle greater than 90 degrees

### Properties
- Sum of all angles in a triangle = 180 degrees
- Exterior angle = sum of two non-adjacent interior angles

## Pythagoras Theorem

In a right triangle:
\`\`\`
hypotenuse^2 = base^2 + height^2
c^2 = a^2 + b^2
\`\`\`

Example: If base = 3, height = 4, find hypotenuse.
\`\`\`
c^2 = 3^2 + 4^2 = 9 + 16 = 25
c = 5
\`\`\`

## Quadrilaterals

- Square: 4 equal sides, 4 right angles
- Rectangle: opposite sides equal, 4 right angles
- Parallelogram: opposite sides parallel and equal
- Rhombus: all sides equal, opposite angles equal
- Trapezium: one pair of parallel sides

## Circles

- Radius (r): distance from centre to edge
- Diameter (d): d = 2r
- Circumference: C = 2 * pi * r
- Area: A = pi * r^2

💡 pi = 3.14159... (use 22/7 for calculations)

📌 Practice: (a) Find the hypotenuse if base=5, height=12. (b) Find area and circumference of a circle with radius 7cm.`,
    },
    {
      title: "Mensuration",
      duration: "35 min", type: "video",
      content: `# Mensuration

Mensuration is the branch of mathematics that deals with measurement of geometric figures — their area, perimeter, volume, etc.

## Perimeter

Perimeter is the total length of the boundary of a shape.

\`\`\`
Square:      P = 4 x side
Rectangle:   P = 2 x (length + breadth)
Triangle:    P = a + b + c
Circle:      C = 2 x pi x r  (called circumference)
\`\`\`

## Area

Area is the amount of surface covered by a shape.

\`\`\`
Square:        A = side x side = side^2
Rectangle:     A = length x breadth
Triangle:      A = (1/2) x base x height
Circle:        A = pi x r^2
Parallelogram: A = base x height
Trapezium:     A = (1/2) x (sum of parallel sides) x height
\`\`\`

## Solved Examples

### Example 1
Find the area and perimeter of a rectangle with length 12cm and breadth 8cm.
\`\`\`
Area      = 12 x 8 = 96 cm^2
Perimeter = 2 x (12 + 8) = 2 x 20 = 40 cm
\`\`\`

### Example 2
Find the area of a triangle with base 10cm and height 6cm.
\`\`\`
Area = (1/2) x 10 x 6 = 30 cm^2
\`\`\`

### Example 3
Find the circumference and area of a circle with radius 14cm. (pi = 22/7)
\`\`\`
Circumference = 2 x (22/7) x 14 = 88 cm
Area          = (22/7) x 14 x 14 = 616 cm^2
\`\`\`

## Volume (3D Shapes)

\`\`\`
Cube:           V = side^3
Cuboid:         V = length x breadth x height
Cylinder:       V = pi x r^2 x height
\`\`\`

## Surface Area

\`\`\`
Cube:           SA = 6 x side^2
Cuboid:         SA = 2(lb + bh + lh)
Cylinder:       SA = 2 x pi x r x (r + h)
\`\`\`

💡 Always write the unit with your answer — cm for length, cm^2 for area, cm^3 for volume.

📌 Practice: A room is 8m long, 5m wide and 3m high. Find (a) area of the floor, (b) area of 4 walls, (c) volume of the room.`,
    },
  ],
});

sampleCourses.push({
  title: "Class 10 Science (CBSE)",
  description: "Physics, Chemistry, Biology — complete NCERT with board exam tips and PYQs.",
  category: "Science", educationGroup: "class9to10", language: "Hindi", level: "intermediate",
  duration: "18 hours", instructor: "Dr. Prashant Tiwari",
  tags: ["science", "class10", "cbse", "physics", "chemistry", "biology"], enrolledCount: 45000, rating: 4.9, reviewCount: 4800, featured: true,
  youtubeVideos: [
    { title: "Chemical Reactions and Equations - Class 10", channel: "Physics Wallah", url: "https://www.youtube.com/watch?v=0TgLtF3PMOc", duration: "1:20:00", views: "10M views", thumbnail: "chemistry" },
    { title: "Electricity Class 10 Full Chapter", channel: "Vedantu", url: "https://www.youtube.com/watch?v=mML5UGGCt9A", duration: "2:10:00", views: "8M views", thumbnail: "electricity" },
    { title: "Life Processes Class 10 Biology", channel: "Magnet Brains", url: "https://www.youtube.com/watch?v=NybHckSEQBI", duration: "1:45:00", views: "6M views", thumbnail: "biology" },
  ],
  whatYouLearn: ["Balance chemical equations", "Understand acid-base reactions", "Solve electricity numericals", "Explain life processes"],
  lessons: [
    {
      title: "Chemical Reactions and Equations",
      duration: "40 min", type: "video",
      content: `# Chemical Reactions and Equations

## What is a Chemical Reaction?

A chemical reaction is a process in which substances (reactants) are transformed into new substances (products) with different properties.

Signs of a chemical reaction:
- Change in colour
- Evolution of gas
- Change in temperature
- Formation of precipitate
- Change in smell

## Chemical Equations

A chemical equation represents a chemical reaction using symbols and formulas.

Word equation: Magnesium + Oxygen -> Magnesium oxide

Symbol equation:
\`\`\`
2Mg + O2 -> 2MgO
\`\`\`

## Balancing Chemical Equations

The number of atoms of each element must be equal on both sides.

Unbalanced: H2 + O2 -> H2O
Balanced:   2H2 + O2 -> 2H2O

## Types of Chemical Reactions

### Combination Reaction
Two or more substances combine to form a single product.
\`\`\`
CaO + H2O -> Ca(OH)2
\`\`\`

### Decomposition Reaction
A single compound breaks down into two or more simpler substances.
\`\`\`
2H2O -> 2H2 + O2  (electrolysis)
CaCO3 -> CaO + CO2  (thermal decomposition)
\`\`\`

### Displacement Reaction
A more reactive element displaces a less reactive element.
\`\`\`
Fe + CuSO4 -> FeSO4 + Cu
Zn + H2SO4 -> ZnSO4 + H2
\`\`\`

### Double Displacement Reaction
Exchange of ions between two compounds.
\`\`\`
Na2SO4 + BaCl2 -> BaSO4 + 2NaCl
\`\`\`

### Oxidation and Reduction
- Oxidation: gain of oxygen OR loss of hydrogen OR loss of electrons
- Reduction: loss of oxygen OR gain of hydrogen OR gain of electrons
- Redox reaction: oxidation and reduction occur simultaneously

## Corrosion and Rancidity

- Corrosion: slow eating away of metals by reaction with air/moisture (rusting of iron)
- Rancidity: oxidation of fats and oils causing bad smell/taste

Prevention of corrosion:
- Painting, oiling, galvanising, electroplating

💡 Board Exam Tip: Always balance equations and mention state symbols (s), (l), (g), (aq) for full marks.

📌 Practice: Balance these equations:
(a) Fe + O2 -> Fe2O3
(b) Al + HCl -> AlCl3 + H2
(c) Na + H2O -> NaOH + H2`,
    },
    {
      title: "Acids, Bases and Salts",
      duration: "40 min", type: "video",
      content: `# Acids, Bases and Salts

## Acids

Acids are substances that produce H+ ions (hydrogen ions) in water.

Properties of acids:
- Sour taste (lemon, vinegar)
- Turn blue litmus red
- React with metals to produce hydrogen gas
- pH less than 7

Common acids:
- HCl — Hydrochloric acid (stomach acid)
- H2SO4 — Sulphuric acid (car batteries)
- HNO3 — Nitric acid
- CH3COOH — Acetic acid (vinegar)

## Bases

Bases are substances that produce OH- ions (hydroxide ions) in water.

Properties of bases:
- Bitter taste, soapy feel
- Turn red litmus blue
- pH greater than 7

Common bases:
- NaOH — Sodium hydroxide (caustic soda)
- Ca(OH)2 — Calcium hydroxide (lime water)
- NH4OH — Ammonium hydroxide

## pH Scale

The pH scale measures how acidic or basic a solution is.
- pH 0-7: acidic (lower = more acidic)
- pH 7: neutral (pure water)
- pH 7-14: basic (higher = more basic)

## Neutralisation Reaction

Acid + Base -> Salt + Water

\`\`\`
HCl + NaOH -> NaCl + H2O
H2SO4 + 2NaOH -> Na2SO4 + 2H2O
\`\`\`

## Important Salts

- NaCl (common salt) — used in food, making chlorine
- NaHCO3 (baking soda) — used in cooking, antacids
- Na2CO3 (washing soda) — used in cleaning
- CaOCl2 (bleaching powder) — used for disinfection
- Plaster of Paris (CaSO4.1/2H2O) — used in making casts

## Indicators

- Litmus: red in acid, blue in base
- Phenolphthalein: colourless in acid, pink in base
- Methyl orange: red in acid, yellow in base

💡 Remember: Acids and bases neutralise each other. The product is always a salt and water.

📌 Practice: (a) What is the pH of lemon juice? Is it acidic or basic? (b) Write the neutralisation reaction between H2SO4 and KOH.`,
    },
    {
      title: "Electricity",
      duration: "45 min", type: "video",
      content: `# Electricity

## Electric Charge and Current

- Electric charge: property of matter that causes electrical phenomena
- Electric current (I): flow of electric charges
- Unit of current: Ampere (A)
- I = Q/t (charge / time)

## Potential Difference and Voltage

- Potential difference (V): work done to move unit charge between two points
- Unit: Volt (V)
- V = W/Q (work / charge)

## Ohm's Law

At constant temperature, current through a conductor is directly proportional to the potential difference.

\`\`\`
V = I x R
I = V / R
R = V / I
\`\`\`

Where R = resistance (measured in Ohms, symbol: omega)

## Resistance

Resistance opposes the flow of current.

Factors affecting resistance:
- Length of conductor (R increases with length)
- Cross-sectional area (R decreases with area)
- Material (resistivity)
- Temperature

## Resistors in Series

\`\`\`
R_total = R1 + R2 + R3
Current is same through all resistors
Voltage is divided
\`\`\`

## Resistors in Parallel

\`\`\`
1/R_total = 1/R1 + 1/R2 + 1/R3
Voltage is same across all resistors
Current is divided
\`\`\`

## Electric Power and Energy

\`\`\`
Power (P) = V x I = I^2 x R = V^2 / R
Unit: Watt (W)

Energy (E) = P x t
Unit: Joule (J) or kWh (kilowatt-hour)
\`\`\`

## Heating Effect of Current

When current flows through a resistor, electrical energy is converted to heat.

\`\`\`
Heat produced (H) = I^2 x R x t
\`\`\`

Applications: electric bulb, heater, iron, toaster

## Solved Example

A bulb has resistance 100 ohm and is connected to 220V supply.
\`\`\`
I = V/R = 220/100 = 2.2 A
P = V x I = 220 x 2.2 = 484 W
\`\`\`

💡 Board Exam Tip: Always draw neat circuit diagrams with proper symbols. Show all steps in numerical problems.

📌 Practice: Three resistors of 2, 3, and 6 ohm are connected in parallel. Find the equivalent resistance and total current if connected to 12V.`,
    },
    {
      title: "Life Processes",
      duration: "40 min", type: "video",
      content: `# Life Processes

Life processes are the basic functions performed by living organisms to maintain life.

## Nutrition

Nutrition is the process of obtaining and using food for energy and growth.

### Autotrophic Nutrition (Plants)
Plants make their own food through photosynthesis:
\`\`\`
6CO2 + 6H2O + sunlight -> C6H12O6 + 6O2
\`\`\`

Conditions needed: sunlight, chlorophyll, CO2, water

### Heterotrophic Nutrition (Animals)
Animals obtain food by eating other organisms.

Human digestive system:
- Mouth: mechanical digestion, saliva (amylase breaks starch)
- Stomach: HCl kills bacteria, pepsin digests proteins
- Small intestine: complete digestion and absorption
- Large intestine: water absorption
- Liver: produces bile (emulsifies fats)
- Pancreas: produces pancreatic juice (digests all nutrients)

## Respiration

Respiration releases energy from food.

### Aerobic Respiration (with oxygen)
\`\`\`
C6H12O6 + 6O2 -> 6CO2 + 6H2O + Energy (38 ATP)
\`\`\`

### Anaerobic Respiration (without oxygen)
In yeast:
\`\`\`
C6H12O6 -> 2C2H5OH + 2CO2 + Energy (2 ATP)
\`\`\`

In muscles (during heavy exercise):
\`\`\`
C6H12O6 -> 2C3H6O3 (lactic acid) + Energy
\`\`\`

## Transportation

### In Plants
- Water and minerals: xylem (upward)
- Food (glucose): phloem (upward and downward)

### In Humans (Blood Circulatory System)
- Heart: pumps blood (4 chambers — 2 atria, 2 ventricles)
- Arteries: carry oxygenated blood away from heart
- Veins: carry deoxygenated blood to heart
- Capillaries: exchange of materials with tissues

Blood components:
- RBC: carry oxygen (haemoglobin)
- WBC: fight infection
- Platelets: blood clotting
- Plasma: liquid part

## Excretion

Removal of metabolic waste products.

### In Humans
- Kidneys: filter blood, produce urine (urea, water, salts)
- Lungs: excrete CO2 and water vapour
- Skin: excretes sweat (water, salts, urea)
- Liver: converts ammonia to urea

Nephron is the functional unit of the kidney.

💡 Board Exam Tip: Draw labelled diagrams of the human digestive system, heart, and nephron for guaranteed marks.

📌 Practice: (a) What is the role of HCl in the stomach? (b) Differentiate between aerobic and anaerobic respiration. (c) Name the blood vessel that carries blood from the lungs to the heart.`,
    },
  ],
});

sampleCourses.push({
  title: "Class 10 Mathematics (CBSE)",
  description: "Complete Class 10 Maths — Real Numbers, Polynomials, Quadratics, Trigonometry, Statistics.",
  category: "Mathematics", educationGroup: "class9to10", language: "Hindi", level: "intermediate",
  duration: "14 hours", instructor: "Mr. Amit Kumar",
  tags: ["maths", "class10", "cbse", "board", "algebra", "geometry"], enrolledCount: 28000, rating: 4.7, reviewCount: 2900, featured: true,
  youtubeVideos: [
    { title: "Real Numbers Class 10 Full Chapter", channel: "Physics Wallah", url: "https://www.youtube.com/watch?v=X0nCkOhFBP4", duration: "1:10:00", views: "5M views", thumbnail: "numbers" },
    { title: "Quadratic Equations Class 10", channel: "Vedantu", url: "https://www.youtube.com/watch?v=NybHckSEQBI", duration: "1:30:00", views: "4M views", thumbnail: "quadratic" },
    { title: "Trigonometry Class 10 - Full Chapter", channel: "Magnet Brains", url: "https://www.youtube.com/watch?v=mML5UGGCt9A", duration: "2:00:00", views: "6M views", thumbnail: "trig" },
  ],
  whatYouLearn: ["Prove numbers are irrational", "Solve quadratic equations", "Apply trigonometric identities", "Calculate statistical measures"],
  lessons: [
    {
      title: "Real Numbers",
      duration: "35 min", type: "video",
      content: `# Real Numbers

## Euclid's Division Lemma

For any two positive integers a and b, there exist unique integers q and r such that:
a = bq + r, where 0 <= r < b

Example: Divide 135 by 12
135 = 12 x 11 + 3
So q = 11, r = 3

## HCF using Euclid's Algorithm

To find HCF(135, 225):
\`\`\`
225 = 135 x 1 + 90
135 = 90 x 1 + 45
90  = 45 x 2 + 0
\`\`\`
HCF = 45

## Fundamental Theorem of Arithmetic

Every composite number can be expressed as a product of primes in a unique way.

\`\`\`
12 = 2 x 2 x 3 = 2^2 x 3
60 = 2 x 2 x 3 x 5 = 2^2 x 3 x 5
\`\`\`

## HCF and LCM using Prime Factorisation

\`\`\`
HCF(12, 18):
12 = 2^2 x 3
18 = 2 x 3^2
HCF = 2 x 3 = 6

LCM(12, 18):
LCM = 2^2 x 3^2 = 36
\`\`\`

Important: HCF x LCM = Product of two numbers

## Irrational Numbers

A number that cannot be expressed as p/q (where p, q are integers and q != 0).

Examples: sqrt(2), sqrt(3), pi

## Proving sqrt(2) is Irrational

Assume sqrt(2) = p/q (in lowest terms)
Then 2 = p^2/q^2
So p^2 = 2q^2
This means p^2 is even, so p is even.
Let p = 2m, then 4m^2 = 2q^2, so q^2 = 2m^2
This means q is also even.
But p and q can't both be even if p/q is in lowest terms. Contradiction!
Therefore sqrt(2) is irrational.

💡 Board Tip: The proof of irrationality is a 3-4 mark question. Learn it by heart.

📌 Practice: (a) Find HCF(96, 404) using Euclid's algorithm. (b) Prove sqrt(3) is irrational. (c) Find LCM(12, 15, 21).`,
    },
    {
      title: "Quadratic Equations",
      duration: "40 min", type: "video",
      content: `# Quadratic Equations

A quadratic equation is an equation of the form:
ax^2 + bx + c = 0, where a != 0

## Methods of Solving

### 1. Factorisation Method

\`\`\`
x^2 - 5x + 6 = 0
Find two numbers whose sum = -5 and product = 6
Those numbers are -2 and -3
(x - 2)(x - 3) = 0
x = 2 or x = 3
\`\`\`

### 2. Quadratic Formula

\`\`\`
x = (-b +/- sqrt(b^2 - 4ac)) / 2a
\`\`\`

Example: 2x^2 - 7x + 3 = 0
a=2, b=-7, c=3
\`\`\`
x = (7 +/- sqrt(49 - 24)) / 4
x = (7 +/- sqrt(25)) / 4
x = (7 +/- 5) / 4
x = 3 or x = 1/2
\`\`\`

### 3. Completing the Square

\`\`\`
x^2 + 4x - 5 = 0
x^2 + 4x = 5
x^2 + 4x + 4 = 5 + 4
(x + 2)^2 = 9
x + 2 = +/- 3
x = 1 or x = -5
\`\`\`

## Discriminant and Nature of Roots

D = b^2 - 4ac

- D > 0: two distinct real roots
- D = 0: two equal real roots
- D < 0: no real roots (complex roots)

## Word Problems

"The product of two consecutive positive integers is 306. Find the integers."

Let integers be x and x+1
x(x+1) = 306
x^2 + x - 306 = 0
(x + 18)(x - 17) = 0
x = 17 (taking positive value)
Integers are 17 and 18.

💡 Board Tip: Always verify your answers by substituting back into the original equation.

📌 Practice: (a) Solve 3x^2 - 5x + 2 = 0 by factorisation. (b) Find discriminant of x^2 - 4x + 4 = 0 and state nature of roots. (c) A train travels 360km at uniform speed. If speed was 5km/h more, it would take 1 hour less. Find the speed.`,
    },
    {
      title: "Trigonometry",
      duration: "45 min", type: "video",
      content: `# Trigonometry

## Trigonometric Ratios

In a right triangle with angle A:
\`\`\`
sin A = opposite / hypotenuse = BC/AC
cos A = adjacent / hypotenuse = AB/AC
tan A = opposite / adjacent   = BC/AB

cosec A = 1/sin A = AC/BC
sec A   = 1/cos A = AC/AB
cot A   = 1/tan A = AB/BC
\`\`\`

## Standard Values

| Angle | 0 | 30 | 45 | 60 | 90 |
|-------|---|----|----|----|----|
| sin   | 0 | 1/2 | 1/sqrt(2) | sqrt(3)/2 | 1 |
| cos   | 1 | sqrt(3)/2 | 1/sqrt(2) | 1/2 | 0 |
| tan   | 0 | 1/sqrt(3) | 1 | sqrt(3) | undefined |

Memory trick for sin: 0, 1/2, 1/sqrt(2), sqrt(3)/2, 1
Think: sqrt(0)/2, sqrt(1)/2, sqrt(2)/2, sqrt(3)/2, sqrt(4)/2

## Trigonometric Identities

\`\`\`
sin^2 A + cos^2 A = 1
1 + tan^2 A = sec^2 A
1 + cot^2 A = cosec^2 A
\`\`\`

## Complementary Angles

\`\`\`
sin(90-A) = cos A
cos(90-A) = sin A
tan(90-A) = cot A
\`\`\`

## Heights and Distances

- Angle of elevation: angle above horizontal when looking UP at an object
- Angle of depression: angle below horizontal when looking DOWN at an object

Example: A tower is 30m high. Find the angle of elevation from a point 30m away.
\`\`\`
tan(angle) = height/distance = 30/30 = 1
angle = 45 degrees
\`\`\`

## Solved Example

From the top of a 7m high building, the angle of elevation of a tower is 60 degrees and angle of depression of its foot is 45 degrees. Find the height of the tower.

Let height of tower = h, distance between buildings = d
\`\`\`
tan 45 = 7/d  =>  d = 7m
tan 60 = (h-7)/d  =>  sqrt(3) = (h-7)/7
h - 7 = 7*sqrt(3)
h = 7 + 7*sqrt(3) = 7(1 + sqrt(3)) metres
\`\`\`

💡 Board Tip: Draw a clear diagram for every heights and distances problem. Label all known values.

📌 Practice: (a) Prove: (sin A + cosec A)^2 + (cos A + sec A)^2 = 7 + tan^2 A + cot^2 A. (b) A ladder 10m long reaches a window 8m above ground. Find the distance of the foot of the ladder from the wall.`,
    },
    {
      title: "Statistics",
      duration: "35 min", type: "video",
      content: `# Statistics

## Mean

Mean is the average of all values.

### Direct Method
\`\`\`
Mean = Sum of all values / Number of values
\`\`\`

### For Grouped Data (Assumed Mean Method)
\`\`\`
Mean = a + (Sum of f*d) / Sum of f
where d = x - a (deviation from assumed mean)
\`\`\`

Example: Find mean of 10, 15, 20, 25, 30
Mean = (10+15+20+25+30)/5 = 100/5 = 20

## Median

Median is the middle value when data is arranged in order.

For ungrouped data:
- If n is odd: median = ((n+1)/2)th value
- If n is even: median = average of (n/2)th and (n/2+1)th values

For grouped data:
\`\`\`
Median = l + ((n/2 - cf) / f) x h
where:
l = lower boundary of median class
n = total frequency
cf = cumulative frequency before median class
f = frequency of median class
h = class width
\`\`\`

## Mode

Mode is the value that appears most frequently.

For grouped data:
\`\`\`
Mode = l + ((f1 - f0) / (2f1 - f0 - f2)) x h
where:
l = lower boundary of modal class
f1 = frequency of modal class
f0 = frequency of class before modal class
f2 = frequency of class after modal class
h = class width
\`\`\`

## Relationship between Mean, Median and Mode

\`\`\`
Mode = 3 x Median - 2 x Mean
\`\`\`

## Cumulative Frequency and Ogive

Cumulative frequency is the running total of frequencies.

Two types of ogive:
- Less than ogive: plot (upper boundary, cumulative frequency)
- More than ogive: plot (lower boundary, cumulative frequency from below)

The x-coordinate of the intersection of both ogives gives the median.

💡 Board Tip: The formula-based questions on mean, median and mode are very scoring. Practice at least 5 examples of each.

📌 Practice: Find mean, median and mode for the following data:
Marks: 10-20, 20-30, 30-40, 40-50, 50-60
Frequency: 5, 8, 15, 10, 2`,
    },
  ],
});