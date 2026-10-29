/**
 * Single source of truth for everything on the site.
 * Update this file to change content — no component edits needed.
 */

export const profile = {
  name: "Md Rashed Al Amin",
  shortName: "Rashed",
  role: "Full-Stack Developer",
  roles: [
    "Full-Stack Developer",
    "Shopify App Builder",
    "LLM Integration Engineer",
    "System Designer",
  ],
  location: "Dhaka, Bangladesh",
  email: "rashedalamin69@gmail.com",
  phone: "+8801570204436",
  photo: "/images/rashed.jpg",
  cv: "/Rashed_Al_Amin_CV.pdf",
  headline:
    "I build production web apps end to end — from system architecture and APIs to polished frontends and deployment.",
  summary:
    "Full-stack developer and CSE graduate from CUET. I work across TypeScript, React, Next.js, Node.js, FastAPI and PostgreSQL, and I've shipped Shopify apps and LLM integrations in live products.",
  availability: "Open to full-time roles & freelance work",
  /** Where this site's source code lives */
  sourceRepo: "https://github.com/Rashed-AlAmin/portfolio",
  socials: {
    github: { label: "GitHub", handle: "Rashed-AlAmin", url: "https://github.com/Rashed-AlAmin" },
    linkedin: {
      label: "LinkedIn",
      handle: "md-rashed-al-amin",
      url: "https://www.linkedin.com/in/md-rashed-al-amin/",
    },
    codeforces: {
      label: "Codeforces",
      handle: "Rashed_Al_Amin",
      url: "https://codeforces.com/profile/Rashed_Al_Amin",
    },
    leetcode: {
      label: "LeetCode",
      handle: "Rashed_Al_Amin",
      url: "https://leetcode.com/u/Rashed_Al_Amin/",
    },
  },
} as const;

export type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    title: "Full-Stack Developer",
    company: "Webozza",
    location: "Dhaka, Bangladesh",
    period: "Apr 2026 — Present",
    current: true,
    summary: "Building and shipping full-stack applications end to end.",
    highlights: [
      "Integrated an LLM-powered AI assistant into a live Shopify storefront.",
      "Built product bundling, dynamic pricing and a custom checkout flow for a client store.",
      "Engineered a webhook-driven notification system.",
      "Now building an AI agent for automated storefront analysis.",
    ],
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma", "GraphQL", "Shopify"],
  },
  {
    title: "Junior Software Developer",
    company: "BreakByte",
    location: "Chittagong, Bangladesh",
    period: "May 2024 — Dec 2024",
    summary: "Developed MERN-stack e-commerce applications across multiple production releases.",
    highlights: [
      "Built REST APIs with JWT authentication for e-commerce platforms.",
      "Shipped features across multiple production releases with the MERN stack.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  live?: string;
  repo?: string;
  /** Accent hue for the card glow (OKLCH hue angle) */
  hue: number;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "eduBee",
    tagline: "Multi-tenant School SaaS",
    description:
      "A Bangla, mobile-first, multi-tenant platform that lets many schools run on one deployment, with seven role-based portals.",
    highlights: [
      "Seven role-based portals in one multi-tenant app",
      "Redis + ARQ background workers for PDF generation",
      "OTP-over-SMS authentication",
      "bKash / Nagad payment integration",
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    live: "https://edubee.pages.dev/adarsha-high-school/admission",
    hue: 75,
    featured: true,
  },
  {
    name: "Multibeam Data Converter",
    tagline: "Sonar survey → LAS point clouds",
    description:
      "Converts multibeam sonar survey data into LAS point clouds through a dockerized MB-System pipeline, with automatic UTM zone detection and reprojection.",
    highlights: [
      "Dockerized MB-System processing pipeline",
      "Auto-detected UTM reprojection",
      "Next.js frontend on a FastAPI backend",
    ],
    stack: ["FastAPI", "Next.js", "MB-System", "Docker"],
    live: "https://multibeam-converter.vercel.app",
    repo: "https://github.com/Rashed-AlAmin/Multibeam-Converter",
    hue: 220,
    featured: true,
  },
  {
    name: "TeamSync",
    tagline: "Real-time collaboration app",
    description:
      "A real-time workspace for teams with Firestore-backed messaging, role-based access control and multi-workspace task management.",
    highlights: [
      "Real-time Firestore messaging",
      "Role-based access control (RBAC)",
      "Multi-workspace task boards",
    ],
    stack: ["React", "Node.js", "Firebase"],
    live: "https://teamsync-gamma.vercel.app/",
    repo: "https://github.com/Rashed-AlAmin/teamsync",
    hue: 160,
    featured: true,
  },
];

export const skills: { group: string; icon: SkillIcon; items: string[] }[] = [
  { group: "Languages", icon: "code", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  {
    group: "Frontend",
    icon: "layers",
    items: ["React", "Next.js", "Remix", "Tailwind CSS", "Shopify"],
  },
  {
    group: "Backend",
    icon: "server",
    items: ["Node.js", "Express.js", "FastAPI", "GraphQL", "REST"],
  },
  {
    group: "Data & DevOps",
    icon: "database",
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Prisma", "Docker", "Nginx", "Linux", "Vercel", "Git"],
  },
  {
    group: "AI & Tools",
    icon: "bot",
    items: ["LLM Integration", "Prompt Engineering", "AI Agents", "Claude Code", "OpenAI Codex"],
  },
  {
    group: "Spoken",
    icon: "languages",
    items: ["Bengali (Native)", "English (Full Professional)", "German (A1)"],
  },
];

export type SkillIcon = "code" | "layers" | "server" | "database" | "bot" | "languages";

export const education = {
  school: "Chittagong University of Engineering and Technology",
  short: "CUET",
  degree: "B.Sc. in Computer Science and Engineering",
  graduated: "Aug 2025",
  cgpa: "3.46 / 4.00",
  thesis: "An ML model to detect malicious validator behaviour in Proof-of-Stake blockchains.",
};

export const achievements = [
  {
    title: "300+ problems solved",
    detail: "Competitive programming on Codeforces and LeetCode.",
    icon: "trophy",
  },
  {
    title: "Vice-President, CUET Computer Club",
    detail: "Student leadership at CUET's computer club.",
    icon: "users",
  },
  {
    title: "Mastering REST APIs with FastAPI",
    detail: "Udemy certification.",
    href: "https://www.udemy.com/certificate/UC-6f7c69bc-4c00-4d10-8e7d-1927846a4b4c/",
    icon: "award",
  },
] as const;

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "activity", label: "Activity" },
  { id: "contact", label: "Contact" },
] as const;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
