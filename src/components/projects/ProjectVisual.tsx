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
      <div className="w-full h-full min-h-[340px] bg-[#1D1712] rounded-2xl border border-[rgba(209,138,84,0.20)] p-5 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl">
        {/* Subtle grid and ambient backdrop */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#B87345]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header HUD */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(209,138,84,0.15)] relative z-10 text-xs">
          <div className="flex items-center gap-2 text-[#D18A54]">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="font-semibold tracking-wider text-[#F5EDE4]">FLOWER FEDAVG ENGINE</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#C8B6A5]">
            <span className="px-2 py-0.5 rounded-full bg-[#282017] border border-[rgba(209,138,84,0.2)]">Round 5/5</span>
            <span className="text-[#E5A96E] font-semibold">ε ≈ 2.21 DP-SGD</span>
          </div>
        </div>

        {/* Central Architecture Topology */}
        <div className="my-auto py-6 relative z-10 flex flex-col items-center justify-center">
          {/* Central Aggregator */}
          <div className="relative mb-6">
            <div className="px-4 py-2.5 rounded-xl bg-[#33271D] border border-[#D18A54]/50 shadow-[0_0_20px_rgba(209,138,84,0.25)] text-center">
              <div className="text-[10px] text-[#D18A54] font-bold tracking-widest uppercase">
                Global Aggregation Server
              </div>
              <div className="text-xs text-[#F5EDE4] font-medium mt-0.5">
                PyTorch Shared Model Parameters
              </div>
            </div>
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-xl border border-[#D18A54]/30 animate-ping pointer-events-none" />
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
                className="p-2.5 rounded-xl bg-[#282017] border border-[rgba(209,138,84,0.20)] text-center relative hover:border-[#D18A54] transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#D18A54] mx-auto mb-1.5" />
                <div className="text-[10px] text-[#F5EDE4] font-bold">{node.id}</div>
                <div className="text-[9px] text-[#C8B6A5] mt-0.5">{node.samples}</div>
                <div className="text-[8px] text-[#E5A96E] mt-1 uppercase">Local Isolation</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Audit Status */}
        <div className="pt-3 border-t border-[rgba(209,138,84,0.15)] flex items-center justify-between text-[11px] relative z-10 text-[#C8B6A5]">
          <span className="flex items-center gap-1.5 text-[#F5EDE4]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D18A54]" />
            Human Underwriter Sign-off Required
          </span>
          <span className="font-mono text-[10px] text-[#9B8979]">900 Holdout Benchmark</span>
        </div>
      </div>
    );
  }

  if (type === "payscope") {
    const annualSavingsMap = { 1: 1200, 3: 3600, 5: 6000 };

    return (
      <div className="w-full h-full min-h-[340px] bg-[#1D1712] rounded-2xl border border-[rgba(209,138,84,0.20)] p-5 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#E5A96E]/12 rounded-full blur-3xl pointer-events-none" />

        {/* Header Alert */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(209,138,84,0.15)] relative z-10 text-xs">
          <div className="flex items-center gap-2 text-[#D18A54]">
            <Network className="w-4 h-4" />
            <span className="font-semibold tracking-wider text-[#F5EDE4]">NEO4J CADENCE DETECTOR</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#B87345]/20 text-[#E5A96E] border border-[#B87345]/40 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A96E] animate-pulse" />
            Price Creep Detected
          </span>
        </div>

        {/* Price Creep Detection Box */}
        <div className="my-auto py-3 space-y-3 relative z-10">
          <div className="p-3.5 rounded-xl bg-[#282017] border border-[#B87345]/40">
            <div className="flex items-center justify-between text-xs text-[#C8B6A5] mb-1">
              <span>Streaming Subscription</span>
              <span className="text-[10px] uppercase text-[#D18A54]">UPI Autopay</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm line-through text-[#9B8979]">₹699/mo</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5A96E]" />
              <span className="text-base font-bold text-[#E5A96E]">₹799/mo</span>
              <span className="text-xs text-[#F5EDE4] font-semibold ml-auto">+₹100 silent delta</span>
            </div>
          </div>

          {/* Savings Simulator */}
          <div className="p-3.5 rounded-xl bg-[#33271D] border border-[rgba(209,138,84,0.22)]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#C8B6A5]">What-If Cumulative Savings</span>
              <div className="flex gap-1.5">
                {([1, 3, 5] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSavingsYear(yr)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      savingsYear === yr
                        ? "bg-gradient-to-r from-[#B87345] to-[#E5A96E] text-[#15110E] shadow-sm"
                        : "bg-[#282017] text-[#C8B6A5] hover:text-[#F5EDE4] border border-[rgba(209,138,84,0.20)]"
                    }`}
                  >
                    {yr}Y
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87345] via-[#D18A54] to-[#E5A96E] font-mono">
              ₹{annualSavingsMap[savingsYear].toLocaleString()}
              <span className="text-xs font-normal text-[#C8B6A5] ml-2 font-sans">
                saved over {savingsYear} year{savingsYear > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Playbook Mechanisms footer */}
        <div className="pt-3 border-t border-[rgba(209,138,84,0.15)] flex items-center justify-between text-[11px] relative z-10 text-[#C8B6A5]">
          <span className="text-[#E5A96E] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Zero-credential parsing
          </span>
          <span className="text-[#9B8979]">Playbooks: UPI • Mandate • Card</span>
        </div>
      </div>
    );
  }

  // VoteChainX
  return (
    <div className="w-full h-full min-h-[340px] bg-[#1D1712] rounded-2xl border border-[rgba(209,138,84,0.20)] p-5 flex flex-col justify-between font-mono relative overflow-hidden select-none shadow-xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#B87345]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(209,138,84,0.15)] relative z-10 text-xs">
        <div className="flex items-center gap-2 text-[#D18A54]">
          <Lock className="w-4 h-4" />
          <span className="font-semibold tracking-wider text-[#F5EDE4]">SOLIDITY • EIP-2771 RELAYER</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#B87345]/20 text-[#E5A96E] border border-[#B87345]/40 flex items-center gap-1 font-semibold">
          <Sparkles className="w-3 h-3 text-[#D18A54]" />
          1st Place Hackathon
        </span>
      </div>

      {/* Cryptographic Verification Architecture */}
      <div className="my-auto py-3 space-y-3 relative z-10">
        <div className="p-3.5 rounded-xl bg-[#282017] border border-[rgba(209,138,84,0.20)] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#C8B6A5]">Gasless Meta-Tx Relayer</span>
            <span className="text-[#D18A54] font-semibold">EIP-2771</span>
          </div>
          <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#B87345] via-[#D18A54] to-[#E5A96E] w-full" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#9B8979]">
            <span>Keccak-256 Digest</span>
            <span className="text-[#E5A96E]">ECDSA Verification OK</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2.5 rounded-xl bg-[#33271D] border border-[rgba(209,138,84,0.20)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D18A54] shrink-0" />
            <div>
              <div className="font-bold text-[#F5EDE4]">ReentrancyGuard</div>
              <div className="text-[#9B8979] text-[9px]">Zero exploit surface</div>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#33271D] border border-[rgba(209,138,84,0.20)] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#E5A96E] shrink-0" />
            <div>
              <div className="font-bold text-[#F5EDE4]">Double-Vote Guard</div>
              <div className="text-[#9B8979] text-[9px]">Voter Anonymity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[rgba(209,138,84,0.15)] flex items-center justify-between text-[11px] relative z-10 text-[#C8B6A5]">
        <span className="text-[#D18A54] flex items-center gap-1">
          <RefreshCw className="w-3.5 h-3.5" />
          Offline-First Sync Engine
        </span>
        <span className="text-[#9B8979]">Ethereum EVM</span>
      </div>
    </div>
  );
}
