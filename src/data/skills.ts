export interface SkillCategory {
  title: string;
  categoryKey: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "CORE CS & PROBLEM SOLVING",
    categoryKey: "core-cs",
    skills: [
      "Data Structures & Algorithms (Java)",
      "Object-Oriented Programming",
      "Time and Space Complexity Analysis",
    ],
  },
  {
    title: "PROGRAMMING LANGUAGES",
    categoryKey: "languages",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "Solidity"],
  },
  {
    title: "WEB & BACKEND TECHNOLOGIES",
    categoryKey: "web-backend",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "FastAPI",
      "REST APIs",
      "Ethers.js",
      "PostgreSQL",
      "SQLAlchemy",
      "Neo4j",
      "SQLite",
    ],
  },
  {
    title: "AI/ML & SECURITY",
    categoryKey: "ai-security",
    skills: [
      "PyTorch",
      "Federated Learning (Flower)",
      "Differential Privacy (Opacus)",
      "Cryptography",
      "ECDSA",
      "Keccak-256",
    ],
  },
  {
    title: "TOOLS",
    categoryKey: "tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Render", "Pytest"],
  },
];

