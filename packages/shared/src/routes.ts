// Route table + per-page swarm themes + world building summaries. One source of truth for nav, 3D buildings and swarm labels.

export type Agent = { label: string; color: string };

const C = ["#c8ff3d", "#38bdf8", "#fbbf24", "#fb7185", "#34d399", "#f472b6"];
const theme = (labels: string[]): Agent[] => labels.map((label, i) => ({ label, color: C[i % C.length] }));

export type RouteKey = "home" | "about" | "experience" | "work" | "skills" | "contact";
export type BuildingKind = "school" | "office" | "factory" | "lab" | "tower";

export const routes: {
  key: RouteKey; path: string; title: string; pin: string; sub: string; kind?: BuildingKind;
  summary?: string; highlights?: string[];
}[] = [
  { key: "home", path: "/", title: "Career World", pin: "", sub: "" },
  {
    key: "about", path: "/about", title: "About", pin: "School", sub: "Education", kind: "school",
    summary: "IT graduate with a full-stack focus and an IEEE-published research paper.",
    highlights: ["B.Tech Information Technology, 2022 - 2026", "St. Joseph's Institute of Technology, Chennai", "Co-author, IEEE Xplore (ICONSTEM 2025)"],
  },
  {
    key: "experience", path: "/experience", title: "Experience", pin: "Office", sub: "KIAQ + more", kind: "office",
    summary: "Associate MERN Stack Developer with 1 year of experience on client projects.",
    highlights: ["Associate MERN Developer, KIAQ (current, 1 year)", "Built merchant, review and enquiry pages, an admin approval workflow and 4 public APIs", "63 of 63 API tests passing, Swagger-documented"],
  },
  {
    key: "work", path: "/work", title: "Selected Work", pin: "Workshop", sub: "Products & apps", kind: "factory",
    summary: "Two 3D product websites and an internal finance app for the manufacturing sector, built end to end.",
    highlights: ["Product website: 3D Explorer and Fitment Studio", "Power systems site: 3D factory world, quote form", "Finance app: quotes, GST invoices, ledger"],
  },
  {
    key: "skills", path: "/skills", title: "Skills", pin: "Lab", sub: "MERN + Data", kind: "lab",
    summary: "MERN stack at the core, with Next.js, Three.js and a data analyst's toolkit.",
    highlights: ["MongoDB, Express, React, Node.js", "Next.js, TypeScript, Three.js, Tailwind", "SQL, Python, Power BI, Tableau, 5 certifications"],
  },
  {
    key: "contact", path: "/contact", title: "Contact", pin: "Tower", sub: "Open to roles", kind: "tower",
    summary: "Open to full-stack and software developer opportunities. Chennai, India, and remote.",
    highlights: ["rajasudarsan17@gmail.com", "linkedin.com/in/raja-sudarsan-75873a257", "Resume available as PDF"],
  },
];

export const swarmThemes: Record<RouteKey, Agent[]> = {
  home: theme(["MongoDB", "Express", "React", "Node.js", "SQL", "Power BI"]),
  about: theme(["B.Tech IT", "MERN", "Python", "SQL", "Statistics", "Class XII 91%"]),
  experience: theme(["KIAQ", "Next.js", "React", "Node.js", "Postgres", "Power BI"]),
  work: theme(["Next.js", "Three.js", "React", "Postgres", "Vercel", "TypeScript"]),
  skills: theme(["MongoDB", "Express", "React", "Node.js", "Pandas", "SQL"]),
  contact: theme(["Email", "LinkedIn", "Resume", "Hello", "Chennai", "Open to work"]),
};

export const pathToKey = (p: string): RouteKey => routes.find((r) => r.path === p)?.key ?? "home";
