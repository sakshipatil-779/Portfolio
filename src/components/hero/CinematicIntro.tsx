"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FastForward } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, skip intro immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [prefersReducedMotion, onComplete]);

  const finishIntro = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    // Smooth 350ms crossfade to live portfolio
    setTimeout(() => {
      onComplete();
    }, 350);
  }, [isTransitioning, onComplete]);

  // Guaranteed Muted Autoplay (Always Muted as Requested)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay notice:", err);
      });
    }

    // Safety fallback: if video stalls or reaches ~10.1s, complete transition
    const handleTimeUpdate = () => {
      if (video.duration > 0 && video.currentTime >= video.duration - 0.1) {
        finishIntro();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [finishIntro]);

  const handleSkip = () => {
    finishIntro();
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 w-screen h-[100svh] min-h-[100svh] overflow-hidden flex items-center justify-center select-none transition-opacity duration-350 ease-in-out ${
        isTransitioning ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      style={{
        background: "radial-gradient(circle at 50% 50%, #0d1a33 0%, #050d1e 100%)",
        backgroundColor: "#050D1E",
      }}
    >
      {/* Pristine Fullscreen Cinematic Video (Always Muted) */}
      {/* The laptop display directly contains the actual homepage in 3D perspective with zero sticker overlay */}
      <video
        ref={videoRef}
        src="/videos/portfolio-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        onEnded={finishIntro}
        className="w-full h-full max-w-full max-h-full object-contain pointer-events-none"
        style={{
          objectFit: "contain",
          aspectRatio: "16 / 9",
          backgroundColor: "#050D1E",
        }}
      />

      {/* Floating Skip Intro Button */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 pointer-events-auto">
        <button
          onClick={handleSkip}
          className="px-4 py-2 rounded-full bg-[#151020]/90 hover:bg-[#1A1428] text-xs font-mono text-[#B7B0CE] hover:text-[#F7F5FF] border border-[rgba(190,150,255,0.2)] hover:border-[#7650FF] backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer active:scale-95"
          aria-label="Skip cinematic intro"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#F05BCB]" />
        </button>
      </div>
    </div>
  );
}
