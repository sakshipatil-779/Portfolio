"use client";

import React, { useState } from "react";
import { ShieldCheck, Cpu, Database, Network, ArrowRight, CheckCircle2, Lock, Sparkles, RefreshCw } from "lucide-react";

interface ProjectVisualProps {
  type: "fedcredit" | "payscope" | "votechain";
}

export function ProjectVisual({ type }: ProjectVisualProps) {
  // Simulator state for PayScope
  const [savingsYear, setSavingsYear] = useState<1 | 3 | 5>(1);

  if (type === "fedcredit") {
    return (
      <div className="w-full h-full min-h-[340px] bg-[#0D0A18] rounded-2xl border border-[rgba(190,150,255,0.18)] p-5 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl">
        {/* Subtle grid and ambient backdrop */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#7650FF]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header HUD */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(190,150,255,0.14)] relative z-10 text-xs">
          <div className="flex items-center gap-2 text-[#7650FF]">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="font-semibold tracking-wider text-[#F7F5FF]">FLOWER FEDAVG ENGINE</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#B7B0CE]">
            <span className="px-2 py-0.5 rounded-full bg-[#151020] border border-[rgba(190,150,255,0.2)]">Round 5/5</span>
            <span className="text-[#F05BCB] font-semibold">ε ≈ 2.21 DP-SGD</span>
          </div>
        </div>

        {/* Central Architecture Topology */}
        <div className="my-auto py-6 relative z-10 flex flex-col items-center justify-center">
          {/* Central Aggregator */}
          <div className="relative mb-6">
            <div className="px-4 py-2.5 rounded-xl bg-[#1A1428] border border-[#7650FF]/50 shadow-[0_0_20px_rgba(118,80,255,0.3)] text-center">
              <div className="text-[10px] text-[#7650FF] font-bold tracking-widest uppercase">
                Global Aggregation Server
              </div>
              <div className="text-xs text-[#F7F5FF] font-medium mt-0.5">
                PyTorch Shared Model Parameters
              </div>
            </div>
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-xl border border-[#7650FF]/30 animate-ping pointer-events-none" />
          </div>

          {/* Lenders Trio */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
            {[
              { id: "LENDER 01", samples: "300 syn", status: "Weights Aggregated" },
              { id: "LENDER 02", samples: "300 syn", status: "Weights Aggregated" },
              { id: "LENDER 03", samples: "300 syn", status: "Weights Aggregated" },
            ].map((node) => (
              <div
                key={node.id}
                className="p-2.5 rounded-xl bg-[#151020] border border-[rgba(190,150,255,0.16)] text-center relative hover:border-[#7650FF]/50 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#7650FF] mx-auto mb-1.5" />
                <div className="text-[10px] text-[#F7F5FF] font-bold">{node.id}</div>
                <div className="text-[9px] text-[#B7B0CE] mt-0.5">{node.samples}</div>
                <div className="text-[8px] text-[#F05BCB] mt-1 uppercase">Local Isolation</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Audit Status */}
        <div className="pt-3 border-t border-[rgba(190,150,255,0.14)] flex items-center justify-between text-[11px] relative z-10 text-[#B7B0CE]">
          <span className="flex items-center gap-1.5 text-[#F7F5FF]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7650FF]" />
            Human Underwriter Sign-off Required
          </span>
          <span className="font-mono text-[10px] text-[#85809C]">900 Holdout Benchmark</span>
        </div>
      </div>
    );
  }

  if (type === "payscope") {
    const annualSavingsMap = { 1: 1200, 3: 3600, 5: 6000 };

    return (
      <div className="w-full h-full min-h-[340px] bg-[#0D0A18] rounded-2xl border border-[rgba(190,150,255,0.18)] p-5 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#7B8CFF]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Alert */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(190,150,255,0.14)] relative z-10 text-xs">
          <div className="flex items-center gap-2 text-[#7B8CFF]">
            <Network className="w-4 h-4" />
            <span className="font-semibold tracking-wider text-[#F7F5FF]">NEO4J CADENCE DETECTOR</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/25 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Price Creep Detected
          </span>
        </div>

        {/* Price Creep Detection Box */}
        <div className="my-auto py-3 space-y-3 relative z-10">
          <div className="p-3.5 rounded-xl bg-[#151020] border border-amber-500/30">
            <div className="flex items-center justify-between text-xs text-[#B7B0CE] mb-1">
              <span>Streaming Subscription</span>
              <span className="text-[10px] uppercase text-[#7B8CFF]">UPI Autopay</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm line-through text-[#85809C]">₹699/mo</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-base font-bold text-amber-400">₹799/mo</span>
              <span className="text-xs text-amber-300 font-semibold ml-auto">+₹100 silent delta</span>
            </div>
          </div>

          {/* Savings Simulator */}
          <div className="p-3.5 rounded-xl bg-[#1A1428] border border-[rgba(190,150,255,0.18)]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#B7B0CE]">What-If Cumulative Savings</span>
              <div className="flex gap-1.5">
                {([1, 3, 5] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSavingsYear(yr)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      savingsYear === yr
                        ? "bg-gradient-to-r from-[#7650FF] to-[#F05BCB] text-white shadow-sm"
                        : "bg-[#151020] text-[#B7B0CE] hover:text-white border border-[rgba(190,150,255,0.16)]"
                    }`}
                  >
                    {yr}Y
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7650FF] via-[#7B8CFF] to-[#F05BCB] font-mono">
              ₹{annualSavingsMap[savingsYear].toLocaleString()}
              <span className="text-xs font-normal text-[#B7B0CE] ml-2 font-sans">
                saved over {savingsYear} year{savingsYear > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Playbook Mechanisms footer */}
        <div className="pt-3 border-t border-[rgba(190,150,255,0.14)] flex items-center justify-between text-[11px] relative z-10 text-[#B7B0CE]">
          <span className="text-[#F05BCB] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Zero-credential parsing
          </span>
          <span className="text-[#85809C]">Playbooks: UPI • Mandate • Card</span>
        </div>
      </div>
    );
  }

  // VoteChainX
  return (
    <div className="w-full h-full min-h-[340px] bg-[#0D0A18] rounded-2xl border border-[rgba(190,150,255,0.18)] p-5 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#7650FF]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(190,150,255,0.14)] relative z-10 text-xs">
        <div className="flex items-center gap-2 text-[#7650FF]">
          <Lock className="w-4 h-4" />
          <span className="font-semibold tracking-wider text-[#F7F5FF]">SOLIDITY • EIP-2771 RELAYER</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#F05BCB]/15 text-[#F05BCB] border border-[#F05BCB]/30 flex items-center gap-1 font-semibold">
          <Sparkles className="w-3 h-3" />
          1st Place Hackathon
        </span>
      </div>

      {/* Cryptographic Verification Architecture */}
      <div className="my-auto py-3 space-y-3 relative z-10">
        <div className="p-3.5 rounded-xl bg-[#151020] border border-[rgba(190,150,255,0.16)] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#B7B0CE]">Gasless Meta-Tx Relayer</span>
            <span className="text-[#7650FF] font-semibold">EIP-2771</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#7650FF] via-[#7B8CFF] to-[#F05BCB] w-full" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#85809C]">
            <span>Keccak-256 Digest</span>
            <span>ECDSA Verification OK</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2.5 rounded-xl bg-[#1A1428] border border-[rgba(190,150,255,0.16)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#7650FF] shrink-0" />
            <div>
              <div className="font-bold text-[#F7F5FF]">ReentrancyGuard</div>
              <div className="text-[#85809C] text-[9px]">Zero exploit surface</div>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#1A1428] border border-[rgba(190,150,255,0.16)] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#7B8CFF] shrink-0" />
            <div>
              <div className="font-bold text-[#F7F5FF]">Double-Vote Guard</div>
              <div className="text-[#85809C] text-[9px]">Voter Anonymity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[rgba(190,150,255,0.14)] flex items-center justify-between text-[11px] relative z-10 text-[#B7B0CE]">
        <span className="text-[#7650FF] flex items-center gap-1">
          <RefreshCw className="w-3.5 h-3.5" />
          Offline-First Sync Engine
        </span>
        <span className="text-[#85809C]">Ethereum EVM</span>
      </div>
    </div>
  );
}
