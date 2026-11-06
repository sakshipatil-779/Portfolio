"use client";

import React from "react";
import { Sparkles, ArrowDown, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PortfolioHeroProps {
  isEmbedded?: boolean;
}

export function PortfolioHero({ isEmbedded = false }: PortfolioHeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] lg:min-h-screen bg-[#07090D] overflow-hidden flex flex-col justify-between py-24 sm:py-32 select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(105,229,220,0.1),rgba(139,156,255,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Top subtle terminal indicator */}
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121923]/80 border border-white/10 text-xs font-mono tracking-widest text-[#69E5DC] backdrop-blur-md shadow-lg">
          <Terminal className="w-3.5 h-3.5 text-[#69E5DC] animate-pulse" />
          <span>SYSTEM ONLINE • SP_OS v28.1</span>
        </div>
      </div>

      {/* Main Hero Typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#69E5DC] bg-[#69E5DC]/10 border border-[#69E5DC]/25 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PORTFOLIO INITIALIZED</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F5F7FA] font-sans">
          WELCOME TO{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#69E5DC] via-[#F5F7FA] to-[#8B9CFF]">
            SAKSHI&apos;S WORLD.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl md:text-2xl text-[#A0AAB8] font-medium max-w-3xl mx-auto font-sans leading-relaxed">
          Computer Engineer | Full-Stack Developer | Technology Enthusiast
        </p>

        {!isEmbedded && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="#projects" variant="primary" size="lg">
              Explore Projects
            </Button>
            <Button href="#about" variant="secondary" size="lg">
              About Engineering
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Scroll Prompt */}
      {!isEmbedded && (
        <div className="relative z-10 text-center flex flex-col items-center justify-center gap-2 text-xs font-mono text-[#A0AAB8]/60">
          <span className="tracking-widest uppercase text-[10px]">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 text-[#69E5DC] animate-bounce" />
        </div>
      )}
    </section>
  );
}
