"use client";

import React from "react";
import { ShieldCheck, Cpu, Database, Network, Lock, Sparkles, Award, Trophy, Layers } from "lucide-react";

// Visual 1: Core CS & Systems Intelligence Polyhedron
export function CoreCsVisual() {
  return (
    <div className="w-full h-full min-h-[280px] bg-[#120E0A]/90 rounded-2xl border border-[rgba(217,164,65,0.22)] p-4 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl preserve-3d">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-[#D9A441]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(217,164,65,0.15)] relative z-10 text-[11px]">
        <div className="flex items-center gap-2 text-[#F0B85A]">
          <Layers className="w-4 h-4 animate-pulse" />
          <span className="font-semibold tracking-wider text-[#F5EDE4]">ALGORITHMIC CORE</span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#D9A441]/15 text-[#F7D38A] border border-[#D9A441]/30">
          Java & Data Structures
        </span>
      </div>

      {/* 3D Polyhedron / Geometric Wireframe SVG */}
      <div className="my-auto py-2 flex items-center justify-center relative z-10">
        <svg viewBox="0 0 200 200" className="w-36 h-36 drop-shadow-[0_0_20px_rgba(240,184,90,0.4)]">
          <defs>
            <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7D38A" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#D9A441" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#B87345" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F0B85A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#15100C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Core Glow */}
          <circle cx="100" cy="100" r="45" fill="url(#centerGlow)" className="animate-pulse" />

          {/* 3D Wireframe Icosahedron Projection */}
          <polygon points="100,25 165,65 165,135 100,175 35,135 35,65" fill="none" stroke="url(#polyGrad)" strokeWidth="1.8" />
          <polygon points="100,55 145,80 145,120 100,145 55,120 55,80" fill="rgba(217,164,65,0.08)" stroke="url(#polyGrad)" strokeWidth="1.2" />

          {/* Internal Radiating Strands */}
          <line x1="100" y1="25" x2="100" y2="55" stroke="#F7D38A" strokeWidth="1.5" />
          <line x1="165" y1="65" x2="145" y2="80" stroke="#F7D38A" strokeWidth="1.5" />
          <line x1="165" y1="135" x2="145" y2="120" stroke="#F7D38A" strokeWidth="1.5" />
          <line x1="100" y1="175" x2="100" y2="145" stroke="#F7D38A" strokeWidth="1.5" />
          <line x1="35" y1="135" x2="55" y2="120" stroke="#F7D38A" strokeWidth="1.5" />
          <line x1="35" y1="65" x2="55" y2="80" stroke="#F7D38A" strokeWidth="1.5" />

          {/* Connecting Cross-Chords */}
          <line x1="100" y1="55" x2="145" y2="120" stroke="rgba(247,211,138,0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="145" y1="80" x2="55" y2="120" stroke="rgba(247,211,138,0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="55" y1="80" x2="145" y2="80" stroke="rgba(247,211,138,0.4)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Luminous Vertices */}
          <circle cx="100" cy="25" r="4" fill="#F7D38A" />
          <circle cx="165" cy="65" r="4" fill="#F7D38A" />
          <circle cx="165" cy="135" r="4" fill="#F7D38A" />
          <circle cx="100" cy="175" r="4" fill="#F7D38A" />
          <circle cx="35" cy="135" r="4" fill="#F7D38A" />
          <circle cx="35" cy="65" r="4" fill="#F7D38A" />
          <circle cx="100" cy="100" r="5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Footer Metrics */}
      <div className="pt-2 border-t border-[rgba(217,164,65,0.15)] flex items-center justify-between text-[10px] text-[#B8AA98]">
        <span>O(log N) Algorithmic Optimization</span>
        <span className="text-[#F0B85A] font-semibold">Graph & Tree Proofs</span>
      </div>
    </div>
  );
}

// Visual 2: Achievements Golden Trophy & Beacon
export function AchievementVisual() {
  return (
    <div className="w-full h-full min-h-[280px] bg-[#120E0A]/90 rounded-2xl border border-[rgba(217,164,65,0.22)] p-4 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl preserve-3d">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#F0B85A]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(217,164,65,0.15)] relative z-10 text-[11px]">
        <div className="flex items-center gap-2 text-[#F0B85A]">
          <Trophy className="w-4 h-4 text-[#F7D38A]" />
          <span className="font-semibold tracking-wider text-[#F5EDE4]">COMPETITIVE HONORS</span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#D9A441]/20 text-[#F7D38A] border border-[#D9A441]/40 font-bold">
          1st Rank Maharashtra
        </span>
      </div>

      {/* Dual Badges Highlight */}
      <div className="my-auto py-3 space-y-2.5 relative z-10">
        <div className="p-3 rounded-xl bg-[#211810] border border-[#D9A441]/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-[#F7D38A]" />
            <div>
              <div className="text-xs font-bold text-[#F5EDE4]">upXgen Hackathon 2026</div>
              <div className="text-[10px] text-[#B8AA98]">1st Position • 96+ Teams</div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#F0B85A] bg-[#D9A441]/15 px-2 py-0.5 rounded border border-[#D9A441]/30">
            Winner
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#211810] border border-[#D9A441]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#F0B85A]" />
            <div>
              <div className="text-xs font-bold text-[#F5EDE4]">NPTEL Java Elite Certification</div>
              <div className="text-[10px] text-[#B8AA98]">IIT Kharagpur • 19,306+ Candidates</div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#F7D38A] bg-[#D9A441]/15 px-2 py-0.5 rounded border border-[#D9A441]/30">
            92% Score
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[rgba(217,164,65,0.15)] flex items-center justify-between text-[10px] text-[#B8AA98]">
        <span className="text-[#F7D38A]">Verified Certificates Attached</span>
        <span>National Standards</span>
      </div>
    </div>
  );
}

// Visual 3: VoteChainX Decentralized Consensus Mesh
export function VoteChainVisual() {
  return (
    <div className="w-full h-full min-h-[280px] bg-[#120E0A]/90 rounded-2xl border border-[rgba(217,164,65,0.22)] p-4 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl preserve-3d">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D9A441]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(217,164,65,0.15)] relative z-10 text-[11px]">
        <div className="flex items-center gap-2 text-[#F0B85A]">
          <Lock className="w-4 h-4" />
          <span className="font-semibold tracking-wider text-[#F5EDE4]">SOLIDITY • EIP-2771 RELAYER</span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#D9A441]/15 text-[#F7D38A] border border-[#D9A441]/30 flex items-center gap-1 font-semibold">
          <Sparkles className="w-3 h-3 text-[#F0B85A]" />
          Ethereum EVM
        </span>
      </div>

      {/* Cryptographic Verification Mesh */}
      <div className="my-auto py-2.5 space-y-2.5 relative z-10">
        <div className="p-3 rounded-xl bg-[#211810] border border-[rgba(217,164,65,0.25)] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#C8B6A5]">Gasless Meta-Tx Relayer</span>
            <span className="text-[#F0B85A] font-semibold">EIP-2771</span>
          </div>
          <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#B87345] via-[#D9A441] to-[#F7D38A] w-full" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#B8AA98]">
            <span>Keccak-256 Digest</span>
            <span className="text-[#F7D38A]">ECDSA Verification OK</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2.5 rounded-xl bg-[#2A1F15] border border-[rgba(217,164,65,0.20)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F0B85A] shrink-0" />
            <div>
              <div className="font-bold text-[#F5EDE4]">ReentrancyGuard</div>
              <div className="text-[#B8AA98] text-[9px]">Zero exploit surface</div>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#2A1F15] border border-[rgba(217,164,65,0.20)] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#F7D38A] shrink-0" />
            <div>
              <div className="font-bold text-[#F5EDE4]">Double-Vote Guard</div>
              <div className="text-[#B8AA98] text-[9px]">Anonymity intact</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[rgba(217,164,65,0.15)] flex items-center justify-between text-[10px] text-[#B8AA98]">
        <span className="text-[#F0B85A]">Offline-First Synchronization</span>
        <span>Deterministic Hash</span>
      </div>
    </div>
  );
}

// Visual 4: FedCreditX Federated Learning Topology
export function FedCreditVisual() {
  return (
    <div className="w-full h-full min-h-[280px] bg-[#120E0A]/90 rounded-2xl border border-[rgba(217,164,65,0.22)] p-4 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl preserve-3d">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D9A441]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(217,164,65,0.15)] relative z-10 text-[11px]">
        <div className="flex items-center gap-2 text-[#F0B85A]">
          <Cpu className="w-4 h-4 animate-pulse" />
          <span className="font-semibold tracking-wider text-[#F5EDE4]">FLOWER FEDAVG ENGINE</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#C8B6A5]">
          <span className="px-2 py-0.5 rounded-full bg-[#211810] border border-[rgba(217,164,65,0.25)]">Round 5/5</span>
          <span className="text-[#F7D38A] font-semibold">ε ≈ 2.21 DP-SGD</span>
        </div>
      </div>

      {/* Central Server & Lenders */}
      <div className="my-auto py-2 flex flex-col items-center justify-center relative z-10">
        <div className="px-4 py-2 rounded-xl bg-[#2A1F15] border border-[#D9A441]/50 shadow-[0_0_20px_rgba(217,164,65,0.25)] text-center mb-3">
          <div className="text-[9px] text-[#F0B85A] font-bold uppercase tracking-widest">Global Server</div>
          <div className="text-xs text-[#F5EDE4] font-medium">PyTorch Federated Aggregator</div>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
          {["Lender 01", "Lender 02", "Lender 03"].map((id) => (
            <div key={id} className="p-2 rounded-lg bg-[#211810] border border-[rgba(217,164,65,0.20)] text-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F0B85A] mx-auto mb-1" />
              <div className="text-[10px] text-[#F5EDE4] font-bold">{id}</div>
              <div className="text-[8px] text-[#B8AA98]">Local Data Only</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[rgba(217,164,65,0.15)] flex items-center justify-between text-[10px] text-[#B8AA98]">
        <span className="text-[#F5EDE4] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F0B85A]" />
          Human Underwriter Sign-off
        </span>
        <span>900 Holdout Benchmark</span>
      </div>
    </div>
  );
}

// Visual 5: PayScope Neo4j Cadence Network
export function PayScopeVisual() {
  return (
    <div className="w-full h-full min-h-[280px] bg-[#120E0A]/90 rounded-2xl border border-[rgba(217,164,65,0.22)] p-4 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl preserve-3d">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#F0B85A]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(217,164,65,0.15)] relative z-10 text-[11px]">
        <div className="flex items-center gap-2 text-[#F0B85A]">
          <Network className="w-4 h-4" />
          <span className="font-semibold tracking-wider text-[#F5EDE4]">NEO4J CADENCE DETECTOR</span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#D9A441]/20 text-[#F7D38A] border border-[#D9A441]/40 font-semibold">
          Silent Creep Alert
        </span>
      </div>

      {/* Price Creep Box & Savings */}
      <div className="my-auto py-2.5 space-y-2.5 relative z-10">
        <div className="p-3 rounded-xl bg-[#211810] border border-[#D9A441]/40 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-[#B8AA98]">Streaming Autopay</div>
            <div className="font-bold text-[#F5EDE4] line-through">₹699/mo</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-[#F0B85A] font-semibold">+₹100 Price Creep</div>
            <div className="text-sm font-black text-[#F7D38A]">₹799/mo</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#2A1F15] border border-[rgba(217,164,65,0.22)] text-center">
          <div className="text-[10px] text-[#B8AA98] uppercase">3-Year Projected Leakage Saved</div>
          <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D9A441] via-[#F0B85A] to-[#F7D38A]">
            ₹3,600
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[rgba(217,164,65,0.15)] flex items-center justify-between text-[10px] text-[#B8AA98]">
        <span className="text-[#F0B85A]">Zero-Credential Parsing</span>
        <span>Playbooks: UPI • Cards</span>
      </div>
    </div>
  );
}

// Visual 6: Technical Arsenal Crystalline Stack
export function SkillsVisual() {
  const stack = [
    { label: "Core CS", tech: "Java • DSA • OOP" },
    { label: "Frontend", tech: "Next.js 16 • React 19 • TS" },
    { label: "Backend", tech: "FastAPI • PostgreSQL • Neo4j" },
    { label: "AI & Web3", tech: "PyTorch • Flower • Solidity" },
  ];

  return (
    <div className="w-full h-full min-h-[280px] bg-[#120E0A]/90 rounded-2xl border border-[rgba(217,164,65,0.22)] p-4 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl preserve-3d">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D9A441]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(217,164,65,0.15)] relative z-10 text-[11px]">
        <div className="flex items-center gap-2 text-[#F0B85A]">
          <Layers className="w-4 h-4" />
          <span className="font-semibold tracking-wider text-[#F5EDE4]">STACK ARCHITECTURE</span>
        </div>
        <span className="text-[10px] font-mono text-[#F7D38A]">Production Ready</span>
      </div>

      {/* Stack Items */}
      <div className="my-auto py-2 space-y-2 relative z-10">
        {stack.map((item) => (
          <div key={item.label} className="p-2.5 rounded-xl bg-[#211810] border border-[rgba(217,164,65,0.20)] flex items-center justify-between text-xs">
            <span className="text-[#F0B85A] font-bold text-[11px]">{item.label}</span>
            <span className="text-[#F5EDE4] text-[11px] font-sans font-medium">{item.tech}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[rgba(217,164,65,0.15)] flex items-center justify-between text-[10px] text-[#B8AA98]">
        <span>Full-Stack Competency</span>
        <span className="text-[#F0B85A]">Class of 2028</span>
      </div>
    </div>
  );
}
