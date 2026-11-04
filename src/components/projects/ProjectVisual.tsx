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
      <div className="w-full h-full min-h-[340px] bg-[#07090D] rounded-xl border border-white/10 p-5 flex flex-col justify-between font-mono relative overflow-hidden select-none">
        {/* Subtle grid and ambient backdrop */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#69E5DC]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header HUD */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] relative z-10 text-xs">
          <div className="flex items-center gap-2 text-[#69E5DC]">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="font-semibold tracking-wider">FLOWER FEDAVG ENGINE</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#A0AAB8]">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Round 5/5</span>
            <span className="text-[#69E5DC] font-semibold">ε ≈ 2.21 DP-SGD</span>
          </div>
        </div>

        {/* Central Architecture Topology */}
        <div className="my-auto py-6 relative z-10 flex flex-col items-center justify-center">
          {/* Central Aggregator */}
          <div className="relative mb-6">
            <div className="px-4 py-2.5 rounded-lg bg-[#121923] border border-[#69E5DC]/50 shadow-[0_0_20px_rgba(105,229,220,0.2)] text-center">
              <div className="text-[10px] text-[#69E5DC] font-bold tracking-widest uppercase">
                Global Aggregation Server
              </div>
              <div className="text-xs text-[#F5F7FA] font-medium mt-0.5">
                PyTorch Shared Model Parameters
              </div>
            </div>
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-lg border border-[#69E5DC]/30 animate-ping pointer-events-none" />
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
                className="p-2.5 rounded-lg bg-[#0D1118] border border-white/10 text-center relative hover:border-[#69E5DC]/40 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#69E5DC] mx-auto mb-1.5" />
                <div className="text-[10px] text-[#F5F7FA] font-bold">{node.id}</div>
                <div className="text-[9px] text-[#A0AAB8] mt-0.5">{node.samples}</div>
                <div className="text-[8px] text-[#69E5DC]/80 mt-1 uppercase">Local Isolation</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Audit Status */}
        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] relative z-10 text-[#A0AAB8]">
          <span className="flex items-center gap-1.5 text-white/90">
            <ShieldCheck className="w-3.5 h-3.5 text-[#69E5DC]" />
            Human Underwriter Sign-off Required
          </span>
          <span className="font-mono text-[10px] text-white/50">900 Holdout Benchmark</span>
        </div>
      </div>
    );
  }

  if (type === "payscope") {
    const annualSavingsMap = { 1: 1200, 3: 3600, 5: 6000 };

    return (
      <div className="w-full h-full min-h-[340px] bg-[#07090D] rounded-xl border border-white/10 p-5 flex flex-col justify-between font-mono relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#8B9CFF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Alert */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] relative z-10 text-xs">
          <div className="flex items-center gap-2 text-[#8B9CFF]">
            <Network className="w-4 h-4" />
            <span className="font-semibold tracking-wider">NEO4J CADENCE DETECTOR</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Price Creep Detected
          </span>
        </div>

        {/* Price Creep Detection Box */}
        <div className="my-auto py-3 space-y-3 relative z-10">
          <div className="p-3 rounded-lg bg-[#0D1118] border border-amber-500/30">
            <div className="flex items-center justify-between text-xs text-[#A0AAB8] mb-1">
              <span>Streaming Subscription</span>
              <span className="text-[10px] uppercase text-[#8B9CFF]">UPI Autopay</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm line-through text-[#A0AAB8]">₹699/mo</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-base font-bold text-amber-400">₹799/mo</span>
              <span className="text-xs text-amber-300 font-semibold ml-auto">+₹100 silent delta</span>
            </div>
          </div>

          {/* Savings Simulator */}
          <div className="p-3 rounded-lg bg-[#121923] border border-white/10">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#A0AAB8]">What-If Cumulative Savings</span>
              <div className="flex gap-1">
                {([1, 3, 5] as const).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSavingsYear(yr)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                      savingsYear === yr
                        ? "bg-[#69E5DC] text-[#07090D]"
                        : "bg-white/5 text-[#A0AAB8] hover:text-white"
                    }`}
                  >
                    {yr}Y
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xl font-bold text-[#69E5DC] font-mono">
              ₹{annualSavingsMap[savingsYear].toLocaleString()}
              <span className="text-xs font-normal text-[#A0AAB8] ml-2 font-sans">
                saved over {savingsYear} year{savingsYear > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Playbook Mechanisms footer */}
        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] relative z-10 text-[#A0AAB8]">
          <span className="text-[#69E5DC] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Zero-credential parsing
          </span>
          <span className="text-white/60">Playbooks: UPI • Mandate • Card</span>
        </div>
      </div>
    );
  }

  // VoteChainX
  return (
    <div className="w-full h-full min-h-[340px] bg-[#07090D] rounded-xl border border-white/10 p-5 flex flex-col justify-between font-mono relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#69E5DC]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] relative z-10 text-xs">
        <div className="flex items-center gap-2 text-[#69E5DC]">
          <Lock className="w-4 h-4" />
          <span className="font-semibold tracking-wider">SOLIDITY • EIP-2771 RELAYER</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] bg-[#69E5DC]/15 text-[#69E5DC] border border-[#69E5DC]/30 flex items-center gap-1 font-semibold">
          <Sparkles className="w-3 h-3" />
          1st Place Hackathon
        </span>
      </div>

      {/* Cryptographic Verification Architecture */}
      <div className="my-auto py-3 space-y-3 relative z-10">
        <div className="p-3 rounded-lg bg-[#0D1118] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#A0AAB8]">Gasless Meta-Tx Relayer</span>
            <span className="text-[#69E5DC] font-semibold">EIP-2771</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#69E5DC] to-[#8B9CFF] w-full" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#A0AAB8]/70">
            <span>Keccak-256 Digest</span>
            <span>ECDSA Verification OK</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2.5 rounded-lg bg-[#121923] border border-white/10 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#69E5DC] shrink-0" />
            <div>
              <div className="font-bold text-white">ReentrancyGuard</div>
              <div className="text-[#A0AAB8] text-[9px]">Zero exploit surface</div>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#121923] border border-white/10 flex items-center gap-2">
            <Database className="w-4 h-4 text-[#8B9CFF] shrink-0" />
            <div>
              <div className="font-bold text-white">Double-Vote Guard</div>
              <div className="text-[#A0AAB8] text-[9px]">Voter Anonymity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] relative z-10 text-[#A0AAB8]">
        <span className="text-[#69E5DC] flex items-center gap-1">
          <RefreshCw className="w-3.5 h-3.5" />
          Offline-First Sync Engine
        </span>
        <span className="text-white/60">Ethereum EVM</span>
      </div>
    </div>
  );
}

