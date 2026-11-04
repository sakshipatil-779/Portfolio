export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  status?: string;
  grade: string;
  gradeLabel: string;
}

export interface CertificationItem {
  issuer: string;
  title: string;
  badge?: string;
  score?: string;
  period: string;
}

export interface AchievementItem {
  rank: string;
  event: string;
  track?: string;
  highlight: string;
  bullets: string[];
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "MET's Institute of Engineering, Nashik",
    degree: "Computer Engineering",
    period: "2024–2028",
    status: "Pursuing",
    grade: "8.31",
    gradeLabel: "CGPA",
  },
  {
    institution: "D.D.S.P College, Erandol, District Jalgaon",
    degree: "Higher Secondary Certificate (HSC)",
    period: "2024",
    grade: "80.17%",
    gradeLabel: "Score",
  },
  {
    institution: "R. T. Kabre, Erandol",
    degree: "Secondary School Certificate (SSC)",
    period: "2022",
    grade: "85.40%",
    gradeLabel: "Score",
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    issuer: "NPTEL – IIT Kharagpur",
    title: "Programming in Java",
    badge: "Elite Certification",
    score: "92%",
    period: "January–April 2026",
  },
  {
    issuer: "Apna College",
    title: "Data Structures and Algorithms with Java",
    period: "2025",
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    rank: "WINNER – 1ST PLACE",
    event: "upXgen State Level Hackathon",
    track: "Blockchain Track",
    highlight: "Secured 1st Rank among 96+ competing teams across Maharashtra.",
    bullets: [
      "Secured 1st Rank among 96+ competing teams across Maharashtra.",
      "Winner in the Blockchain track.",
      "Recognized for VoteChainX, featuring gasless meta-transactions and cryptographic security.",
    ],
  },
  {
    rank: "ELITE CERTIFICATION",
    event: "NPTEL – IIT Kharagpur",
    track: "National Examination",
    highlight: "Programming in Java — Top 92% Elite standing nationwide.",
    bullets: [
      "Programming in Java.",
      "Scored 92%.",
      "Among 19,306+ candidates nationwide.",
      "Proctored examination.",
    ],
  },
];

