"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FastForward, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CinematicIntroProps {
  onComplete: () => void;
}

interface Keyframe {
  t: number;
  x: number;
  y: number;
  w: number;
  h: number;
  radius: number;
  opacity: number;
}

const KEYFRAMES: Keyframe[] = [
  { t: 0.0, x: 42.0, y: 46.5, w: 23.5, h: 26.5, radius: 6, opacity: 0 },
  { t: 7.2, x: 42.0, y: 46.5, w: 23.5, h: 26.5, radius: 6, opacity: 0 },
  { t: 7.45, x: 40.5, y: 45.0, w: 25.5, h: 29.0, radius: 6, opacity: 0.85 },
  { t: 7.8, x: 38.5, y: 42.0, w: 29.5, h: 33.5, radius: 6, opacity: 1.0 },
  { t: 8.1, x: 34.5, y: 35.0, w: 37.5, h: 46.5, radius: 5, opacity: 1.0 },
  { t: 8.4, x: 27.0, y: 28.0, w: 50.0, h: 54.0, radius: 4, opacity: 1.0 },
  { t: 8.7, x: 17.5, y: 18.5, w: 65.0, h: 74.0, radius: 3, opacity: 1.0 },
  { t: 9.0, x: 9.5, y: 9.5, w: 81.0, h: 84.0, radius: 2, opacity: 1.0 },
  { t: 9.25, x: 4.5, y: 4.0, w: 91.0, h: 93.0, radius: 1, opacity: 1.0 },
  { t: 9.48, x: 0.0, y: 0.0, w: 100.0, h: 100.0, radius: 0, opacity: 1.0 },
  { t: 9.65, x: 0.0, y: 0.0, w: 100.0, h: 100.0, radius: 0, opacity: 1.0 },
];

function interpolateKeyframes(time: number): {
  x: number;
  y: number;
  w: number;
  h: number;
  radius: number;
  opacity: number;
} {
  if (time <= KEYFRAMES[0].t) {
    return { ...KEYFRAMES[0] };
  }
  const last = KEYFRAMES[KEYFRAMES.length - 1];
  if (time >= last.t) {
    return { ...last };
  }

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const k1 = KEYFRAMES[i];
    const k2 = KEYFRAMES[i + 1];
    if (time >= k1.t && time <= k2.t) {
      const alpha = (time - k1.t) / (k2.t - k1.t);
      // Smooth ease
      const ease = alpha * alpha * (3 - 2 * alpha);
      return {
        x: k1.x + (k2.x - k1.x) * ease,
        y: k1.y + (k2.y - k1.y) * ease,
        w: k1.w + (k2.w - k1.w) * ease,
        h: k1.h + (k2.h - k1.h) * ease,
        radius: k1.radius + (k2.radius - k1.radius) * ease,
        opacity: k1.opacity + (k2.opacity - k1.opacity) * ease,
      };
    }
  }

  return { ...last };
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [overlayState, setOverlayState] = useState({
    x: 42,
    y: 46.5,
    w: 23.5,
    h: 26.5,
    radius: 6,
    opacity: 0,
  });

  const [videoBox, setVideoBox] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, skip intro immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [prefersReducedMotion, onComplete]);

  // Compute exact rendered video dimensions inside viewport (object-fit: contain at 16:9)
  const updateVideoBox = useCallback(() => {
    if (typeof window === "undefined") return;
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const targetAspect = 16 / 9;
    const winAspect = winW / winH;

    let renderW = winW;
    let renderH = winH;
    let left = 0;
    let top = 0;

    if (winAspect > targetAspect) {
      // Window is wider than 16:9 (pillarbox sides)
      renderH = winH;
      renderW = winH * targetAspect;
      left = (winW - renderW) / 2;
      top = 0;
    } else {
      // Window is taller than 16:9 (letterbox top/bottom)
      renderW = winW;
      renderH = winW / targetAspect;
      left = 0;
      top = (winH - renderH) / 2;
    }

    setVideoBox({ width: renderW, height: renderH, left, top });
  }, []);

  useEffect(() => {
    updateVideoBox();
    window.addEventListener("resize", updateVideoBox);
    return () => window.removeEventListener("resize", updateVideoBox);
  }, [updateVideoBox]);

  const finishIntro = useCallback(() => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  }, [isFadingOut, onComplete]);

  // Synchronized animation loop tracking video.currentTime
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsAutoplayBlocked(true);
      });
    }

    let animationFrameId: number;

    const tick = () => {
      if (video && !video.paused) {
        const currentTime = video.currentTime;
        const state = interpolateKeyframes(currentTime);
        setOverlayState(state);

        // When zoom expands to 100% viewport (~9.48s - 9.53s)
        if (currentTime >= 9.48) {
          finishIntro();
          return;
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [finishIntro]);

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (video) {
      setIsAutoplayBlocked(false);
      video.play().catch(console.error);
    }
  };

  const handleSkip = () => {
    finishIntro();
  };

  // Convert percentage coordinates to pixel values relative to the rendered video box
  const overlayLeft = videoBox.left + (overlayState.x / 100) * videoBox.width;
  const overlayTop = videoBox.top + (overlayState.y / 100) * videoBox.height;
  const overlayWidth = (overlayState.w / 100) * videoBox.width;
  const overlayHeight = (overlayState.h / 100) * videoBox.height;

  // Scale ratio for the 1920x1080 embedded portfolio content inside the laptop screen
  const scale = overlayWidth / 1920;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 w-screen h-[100svh] min-h-[100svh] bg-black overflow-hidden flex items-center justify-center select-none transition-opacity duration-300 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#000000" }}
    >
      {/* Original Unaltered MP4 Video */}
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
          backgroundColor: "#000000",
        }}
      />

      {/* Live Next.js Portfolio Surface Positioned Over Laptop Display */}
      {videoBox.width > 0 && (
        <div
          className="absolute overflow-hidden origin-top-left pointer-events-none transition-opacity duration-200"
          style={{
            left: `${overlayLeft}px`,
            top: `${overlayTop}px`,
            width: `${overlayWidth}px`,
            height: `${overlayHeight}px`,
            borderRadius: `${overlayState.radius}px`,
            opacity: overlayState.opacity,
            boxShadow:
              overlayState.opacity > 0.1
                ? "inset 0 0 40px rgba(105, 229, 220, 0.25), 0 0 30px rgba(0, 0, 0, 0.8)"
                : "none",
            backgroundColor: "#07090D",
          }}
        >
          {/* Iframe with exact real website surface */}
          <iframe
            src="/screen"
            title="Sakshi Patil Portfolio Live Screen"
            className="border-0 pointer-events-none origin-top-left"
            style={{
              width: "1920px",
              height: "1080px",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          />
        </div>
      )}

      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 px-4 py-2 rounded-full bg-[#121923]/80 hover:bg-[#121923] text-xs font-mono text-[#A0AAB8] hover:text-[#69E5DC] border border-white/10 hover:border-[#69E5DC]/40 backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer"
        aria-label="Skip cinematic intro"
      >
        <span>Skip Intro</span>
        <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#69E5DC]" />
      </button>

      {/* Autoplay fallback button */}
      {isAutoplayBlocked && (
        <div className="absolute inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
          <button
            onClick={handleManualPlay}
            className="px-6 py-3.5 rounded-xl bg-[#69E5DC] text-[#07090D] font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(105,229,220,0.4)] hover:shadow-[0_0_40px_rgba(105,229,220,0.6)] flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Enter Portfolio</span>
          </button>
        </div>
      )}
    </div>
  );
}
