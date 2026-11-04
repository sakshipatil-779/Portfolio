"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BootSequenceProps {
  progress: number; // 0 to 1
  className?: string;
}

export function BootSequence({ progress, className }: BootSequenceProps) {
  // Phase breakdown based on scroll progress:
  // 0.0 - 0.25: Screen black / powering on
  // 0.25 - 0.55: Boot sequence / Monogram + loading bar
  // 0.55 - 1.0: Welcome desktop / Sakshi's World

  const isPowerOn = progress > 0.12;
  const showBootLogo = progress >= 0.22 && progress < 0.6;
  const showWelcome = progress >= 0.58;

  // Boot progress percentage (0 to 100% during 0.22 to 0.58)
  const bootPercent = Math.min(
    100,
    Math.max(0, Math.round(((progress - 0.22) / (0.58 - 0.22)) * 100))
  );

  return (
    <div
      className={cn(
        "w-full h-full bg-[#05070A] rounded-[4px] relative overflow-hidden flex flex-col justify-between p-3 sm:p-5 select-none transition-opacity duration-500 font-sans",
        isPowerOn ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        boxShadow: isPowerOn
          ? "inset 0 0 40px rgba(105, 229, 220, 0.15), 0 0 30px rgba(105, 229, 220, 0.2)"
          : "none",
      }}
    >
      {/* Screen scanline & subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(105,229,220,0.12),transparent_70%)] pointer-events-none" />

      {/* Screen Top Status Bar */}
      <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-[#A0AAB8]/70 border-b border-white/[0.06] pb-1.5 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#69E5DC]" />
          <span>SP_OS v28.1</span>
        </div>
        <div className="flex items-center gap-2">
          <span>ETH_NET</span>
          <span>FLOWER_FED</span>
          <span className="text-[#69E5DC]">100%</span>
        </div>
      </div>

      {/* Center Display Area */}
      <div className="my-auto text-center relative z-10 px-2">
        {/* Phase 1: Booting Monogram & Loading Bar */}
        {showBootLogo && (
          <div className="space-y-4 max-w-[220px] mx-auto animate-fadeIn">
            {/* Elegant SP Monogram */}
            <div className="relative inline-flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#0D1118] border border-[#69E5DC]/40 shadow-[0_0_25px_rgba(105,229,220,0.35)] flex items-center justify-center">
                <span className="font-mono text-xl sm:text-2xl font-black text-[#69E5DC] tracking-tighter">
                  SP<span className="text-white">.</span>
                </span>
              </div>
              <div className="absolute inset-0 rounded-2xl border border-[#69E5DC]/30 animate-ping pointer-events-none" />
            </div>

            {/* Booting Progress Bar */}
            <div className="space-y-1.5">
              <div className="h-1 sm:h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#69E5DC] to-[#8B9CFF] transition-all duration-150 ease-out"
                  style={{ width: `${bootPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[8px] sm:text-[9px] font-mono text-[#A0AAB8]">
                <span>INITIALIZING SYSTEM...</span>
                <span>{bootPercent}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Full Welcome Screen */}
        {showWelcome && (
          <div className="space-y-2 sm:space-y-3 animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-mono uppercase tracking-widest text-[#69E5DC] bg-[#69E5DC]/10 border border-[#69E5DC]/25">
              <span className="w-1 h-1 rounded-full bg-[#69E5DC] animate-ping" />
              <span>SYSTEM ONLINE</span>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs font-mono tracking-widest text-[#A0AAB8] uppercase">
                WELCOME TO
              </p>
              <h1 className="text-base sm:text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F7FA] to-[#69E5DC]">
                SAKSHI&apos;S WORLD.
              </h1>
            </div>

            <p className="text-[9px] sm:text-xs text-[#A0AAB8] max-w-xs mx-auto leading-tight font-sans">
              Computer Engineer | Full-Stack Developer | Technology Enthusiast
            </p>
          </div>
        )}
      </div>

      {/* Screen Bottom Dock / Status */}
      <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#A0AAB8]/50 border-t border-white/[0.06] pt-1.5 relative z-10">
        <span>MET&apos;s IOE NASHIK</span>
        <span>CLASS OF 2028</span>
      </div>
    </div>
  );
}

