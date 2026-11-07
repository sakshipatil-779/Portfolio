export interface EducationItem {
  institution: string;
  university?: string;
  degree: string;
  period: string;
  status?: string;
  grade: string;
  gradeLabel: string;
}

export interface CertificationItem {
  issuer: string;
  subIssuer?: string;
  title: string;
  badge?: string;
  score?: string;
  period: string;
  description?: string;
  viewUrl: string;
  downloadName: string;
}

export interface AchievementItem {
  rank: string;
  event: string;
  track?: string;
  organization?: string;
  highlight: string;
  bullets: string[];
  certificateUrl?: string;
}

export interface ExtraCurricularItem {
  title: string;
  role: string;
  organizer?: string;
  description: string;
  tag: string;
  certificateUrl?: string;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "MET's Institute of Engineering, Nashik",
    university: "Savitribai Phule Pune University",
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
    description:
      "Elite standing proctored national certification in Java, Data Structures, and Object-Oriented principles.",
    viewUrl: "/certificates/nptel-programming-in-java-elite.pdf",
    downloadName: "nptel-programming-in-java-elite.pdf",
  },
  {
    issuer: "Apna College",
    title: "Alpha — Data Structures and Algorithms with Java",
    badge: "Full Course Mastery",
    period: "2025",
    description:
      "Comprehensive algorithmic problem solving, graph theory, trees, dynamic programming, and complexity analysis.",
    viewUrl: "/certificates/apna-college-alpha-dsa-java.pdf",
    downloadName: "apna-college-alpha-dsa-java.pdf",
  },
  {
    issuer: "P.V.G.'s College of Engineering & SSD Institute of Management, Nashik",
    subIssuer: "R&D Cell / IIC in association with UPXGEN powered by UVK Link",
    title: "upXgen Hackathon 2026 — First Position",
    badge: "1st Place Winner",
    period: "April 2026",
    description:
      "Awarded 1st place among 96+ competing engineering teams across Maharashtra for developing VoteChainX.",
    viewUrl: "/certificates/upxgen-hackathon-2026-first-position.pdf",
    downloadName: "upxgen-hackathon-2026-first-position.pdf",
  },
  {
    issuer: "Pune Vidyarthi Griha's College of Engineering & SSD Institute of Management, Nashik",
    subIssuer: "Department of Computer Engineering & Information Technology",
    title: "Hack-A-Night 2026 — 24-Hour Hackathon",
    badge: "24-Hour Hackathon",
    period: "March 2026",
    description:
      "Certificate of Participation for completing the intensive 24-hour engineering challenge.",
    viewUrl: "/certificates/hack-a-night-2026-participation.pdf",
    downloadName: "hack-a-night-2026-participation.pdf",
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    rank: "WINNER – 1ST PLACE",
    event: "upXgen State Level Hackathon 2026",
    track: "Blockchain Track",
    organization:
      "P.V.G.'s College of Engineering & SSD Institute of Management, Nashik (R&D Cell/IIC in association with UPXGEN powered by UVK Link)",
    highlight: "Secured 1st Rank among 96+ competing teams across Maharashtra.",
    certificateUrl: "/certificates/upxgen-hackathon-2026-first-position.pdf",
    bullets: [
      "Secured 1st Rank among 96+ competing teams across Maharashtra.",
      "Winner in the Blockchain & Web3 track.",
      "Recognized for VoteChainX, featuring gasless meta-transactions (EIP-2771) and cryptographic security.",
    ],
  },
  {
    rank: "ELITE CERTIFICATION",
    event: "NPTEL – IIT Kharagpur",
    track: "National Examination",
    highlight: "Programming in Java — Top 92% Elite standing nationwide.",
    certificateUrl: "/certificates/nptel-programming-in-java-elite.pdf",
    bullets: [
      "Elite certification in Programming in Java (12-week intensive course).",
      "Scored 92% in the proctored national examination.",
      "Ranked in the top percentile among 19,306+ candidates nationwide.",
      "Conducted by Indian Institute of Technology, Kharagpur.",
    ],
  },
];

export const EXTRA_CURRICULAR_DATA: ExtraCurricularItem[] = [
  {
    title: "ACM Research Body",
    role: "Member",
    description:
      "Active member of ACM research body contributing to computer science research discussions, algorithmic seminars, and peer technical workshops.",
    tag: "Research & Technical Community",
  },
  {
    title: "Hack-A-Night 2026",
    role: "Hackathon Participant",
    organizer:
      "Pune Vidyarthi Griha's College of Engineering & Shrikrushna S. Dhamankar Institute of Management, Nashik",
    description:
      "Participated in an intensive 24-hour hackathon organized by the Department of Computer Engineering & IT, designing and prototyping full-stack software solutions under continuous time constraints.",
    tag: "24-Hour Competitive Hackathon",
    certificateUrl: "/certificates/hack-a-night-2026-participation.pdf",
  },
];
