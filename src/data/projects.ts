export interface Project {
  id: string;
  name: string;
  subtitle?: string;
  statusBadge?: string;
  tagline: string;
  overview: string;
  whatIBuilt: string[];
  techStack: string[];
  disclosure?: string;
  achievement?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  visualType: "votechain" | "fedcredit" | "payscope";
}

export const PROJECTS: Project[] = [
  {
    id: "votechainx",
    name: "VoteChainX",
    subtitle: "Decentralized E-Voting System",
    statusBadge: "Winning Project",
    tagline: "Decentralized E-Voting System",
    overview:
      "A decentralized electronic voting platform built using Ethereum blockchain technology, designed to provide transparent blockchain interactions, voter anonymity and secure voting operations.",
    whatIBuilt: [
      "Architected a secure voting platform using Solidity, Next.js 14 and Ethers.js.",
      "Implemented gasless meta-transaction relayer using EIP-2771.",
      "Built offline-first synchronization for unreliable networks.",
      "Used ReentrancyGuard for smart contract security.",
      "Implemented ECDSA signatures and Keccak-256 integrity.",
      "Added cryptographic protections against double voting.",
      "Designed the voting architecture to preserve complete voter anonymity.",
    ],
    techStack: [
      "Solidity",
      "Next.js 14",
      "Ethers.js",
      "Ethereum",
      "EIP-2771",
      "ECDSA",
      "Keccak-256",
    ],
    achievement: "1st Place – upXgen State Level Hackathon",
    visualType: "votechain",
  },
  {
    id: "fedcreditx",
    name: "FedCreditX",
    tagline:
      "Collaborative credit intelligence, without sharing a single customer record.",
    overview:
      "Banks cannot freely share customer data, making independently trained credit models weaker. FedCreditX demonstrates how multiple lenders can collaboratively train a shared machine learning model using federated learning, while keeping raw customer data within each lender's environment. Since credit decisions are high-stakes, every decision is explainable and requires human underwriter sign-off.",
    whatIBuilt: [
      "3 simulated lenders using Flower FedAvg training.",
      "5 federated training rounds.",
      "PyTorch Logistic Regression and Decision Tree engines.",
      "Sample-level differential privacy using Opacus DP-SGD.",
      "Privacy budget: approximately ε = 2.21.",
      "Holdout benchmark measured on 900 synthetic samples.",
      "Decision Screen with approval tracking and SQLite audit logs.",
      "Federation Lab dashboards for local isolation guarantees.",
      "SQLite audit trail recording every human underwriter decision.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Flower",
      "PyTorch",
      "Opacus",
      "SQLite",
      "Render",
    ],
    disclosure:
      "FedCreditX is a research prototype running entirely on synthetic data. It is not a production lending system.",
    liveDemoUrl: "https://fedcreditx.onrender.com/",
    visualType: "fedcredit",
  },
  {
    id: "payscope",
    name: "PayScope",
    tagline: "Find the money leaving quietly.",
    overview:
      "People often forget recurring subscriptions, miss silent price increases, or overlook free-trial conversions. PayScope analyzes bank statements to detect recurring payments, shows evidence behind every detection, and explains how to cancel unwanted commitments. It works without bank login credentials or screen scraping.",
    whatIBuilt: [
      "Recurring payment cadence and commitment detection engine.",
      "Weekly-to-annual recurrence classification with confidence scoring.",
      "Silent price creep detection (Example: ₹699 → ₹799).",
      "Free trial conversion alerts and unusual recurring charge notifications.",
      "Mechanism-aware cancellation playbooks: UPI Autopay, E-mandate, Card billing, Web portal.",
      "What-if savings simulator projecting 1, 3, and 5-year gains.",
      "Interactive Neo4j knowledge graph explorer.",
      "Google Sign-In using Firebase Auth with zero-setup guest demo mode.",
      "RapidFuzz merchant normalization and 30+ Pytest verification suites.",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Neo4j AuraDB",
      "Firebase Auth",
      "RapidFuzz",
      "Pytest",
    ],
    liveDemoUrl: "https://pay-scope-lake.vercel.app/",
    githubUrl: "https://github.com/sakshipatil-779/PayScope",
    visualType: "payscope",
  },
];
