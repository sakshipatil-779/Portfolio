"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LaptopCssFallback } from "./LaptopCssFallback";
import { ChevronDown, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Dynamically import Three.js scene with ssr: false for client-only rendering
const LaptopScene = dynamic(
  () => import("./LaptopScene").then((mod) => mod.LaptopScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#69E5DC] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Detect WebGL capability safely
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Set up GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // If user prefers reduced motion, set progress directly to 1 (fully booted)
    if (prefersReducedMotion) {
      setScrollProgress(1);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=170%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            setScrollProgress(self.progress);
          });
        },
      });
    }, container);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  // Derived animation thresholds
  const showPrompt = scrollProgress < 0.18;
  const showHeroOverlay = scrollProgress > 0.55;

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[640px] bg-[#07090D] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Studio Ambient Backlighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(105,229,220,0.08),rgba(139,156,255,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Top Floating Prompt: "SCROLL DOWN TO BOOT THE SYSTEM" */}
      <div
        ref={promptRef}
        className="relative z-20 pt-24 sm:pt-28 text-center transition-all duration-500 ease-out pointer-events-none"
        style={{
          opacity: showPrompt ? 1 : 0,
          transform: `translateY(${showPrompt ? "0px" : "-20px"})`,
        }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121923]/80 border border-white/10 text-xs font-mono tracking-widest text-[#69E5DC] backdrop-blur-md shadow-lg">
          <Terminal className="w-3.5 h-3.5 text-[#69E5DC] animate-pulse" />
          <span>SCROLL DOWN TO BOOT THE SYSTEM</span>
        </div>
      </div>

      {/* Center 3D Cinematic Laptop Experience */}
      <div className="relative z-10 w-full flex-1 max-w-5xl mx-auto flex items-center justify-center px-4">
        {hasWebGL === null ? (
          <div className="w-8 h-8 rounded-full border-2 border-[#69E5DC] border-t-transparent animate-spin" />
        ) : hasWebGL ? (
          <LaptopScene progress={scrollProgress} />
        ) : (
          <LaptopCssFallback progress={scrollProgress} />
        )}
      </div>

      {/* Floating Staggered Welcome Reveal Overlay (Once laptop is open and system is booted) */}
      <div
        ref={headlineRef}
        className="absolute inset-x-0 bottom-12 sm:bottom-16 z-20 text-center px-4 transition-all duration-700 ease-out"
        style={{
          opacity: showHeroOverlay ? 1 : 0,
          transform: `translateY(${showHeroOverlay ? "0px" : "30px"})`,
          pointerEvents: showHeroOverlay ? "auto" : "none",
        }}
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#69E5DC] bg-[#69E5DC]/10 border border-[#69E5DC]/25 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO INITIALIZED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F7FA]">
            WELCOME TO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#69E5DC] via-white to-[#8B9CFF]">
              SAKSHI&apos;S WORLD.
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#A0AAB8] font-medium max-w-2xl mx-auto font-sans leading-relaxed">
            Computer Engineer | Full-Stack Developer | Technology Enthusiast
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button href="#projects" variant="primary" size="md">
              Explore Projects
            </Button>
            <Button href="#about" variant="secondary" size="md">
              About Engineering
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Animated Scroll Indicator (Active when system is unbooted) */}
      <div
        className="relative z-20 pb-8 flex flex-col items-center justify-center gap-1 text-xs font-mono text-[#A0AAB8]/70 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: showPrompt ? 1 : 0 }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-[#69E5DC] animate-bounce" />
      </div>
    </div>
  );
}
