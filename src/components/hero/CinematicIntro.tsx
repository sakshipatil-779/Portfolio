"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FastForward, Volume2, VolumeX } from "lucide-react";
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

// Empirically calibrated keyframes tracking the laptop screen from the moment the lid opens (6.5s)
// to full viewport zoom (9.48s), completely masking the baked-in cartoon website.
const KEYFRAMES: Keyframe[] = [
  { t: 0.0, x: 42.24, y: 47.41, w: 22.19, h: 26.67, radius: 4, opacity: 0 },
  { t: 6.42, x: 42.24, y: 47.41, w: 22.19, h: 26.67, radius: 4, opacity: 0 },
  // Instant mask as lid opens at 6.5s
  { t: 6.50, x: 42.24, y: 47.41, w: 22.19, h: 26.67, radius: 4, opacity: 1.0 },
  { t: 7.40, x: 40.47, y: 44.81, w: 25.73, h: 29.35, radius: 4, opacity: 1.0 },
  { t: 7.80, x: 38.54, y: 41.94, w: 29.43, h: 33.52, radius: 4, opacity: 1.0 },
  { t: 8.10, x: 34.50, y: 36.50, w: 37.50, h: 42.00, radius: 3, opacity: 1.0 },
  { t: 8.40, x: 27.08, y: 27.78, w: 50.00, h: 53.70, radius: 2.5, opacity: 1.0 },
  { t: 8.70, x: 17.34, y: 17.59, w: 65.31, h: 72.22, radius: 2, opacity: 1.0 },
  { t: 9.00, x: 9.38, y: 9.26, w: 80.73, h: 84.26, radius: 1.5, opacity: 1.0 },
  { t: 9.25, x: 4.17, y: 3.70, w: 91.67, h: 92.59, radius: 1, opacity: 1.0 },
  { t: 9.48, x: 0.0, y: 0.0, w: 100.0, h: 100.0, radius: 0, opacity: 1.0 },
  { t: 9.60, x: 0.0, y: 0.0, w: 100.0, h: 100.0, radius: 0, opacity: 1.0 },
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
    x: 42.24,
    y: 47.41,
    w: 22.19,
    h: 26.67,
    radius: 4,
    opacity: 0,
  });

  const [videoBox, setVideoBox] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const [isMuted, setIsMuted] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // Skip intro immediately if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [prefersReducedMotion, onComplete]);

  // Compute exact rendered video box (object-fit: contain at 16:9)
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

    // Fade out audio gracefully if playing
    const video = videoRef.current;
    if (video && !video.muted) {
      const fadeInterval = setInterval(() => {
        if (video.volume > 0.15) {
          video.volume = Math.max(0, video.volume - 0.2);
        } else {
          clearInterval(fadeInterval);
        }
      }, 50);
    }

    setTimeout(() => {
      onComplete();
    }, 320);
  }, [isFadingOut, onComplete]);

  // Handle Autoplay & Audio Initiation
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted autoplay with full volume as requested
    video.muted = false;
    video.volume = 1.0;
    video.playbackRate = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setShowAudioPrompt(false);
        })
        .catch(() => {
          // Browser policy blocked unmuted autoplay -> fall back to muted autoplay
          video.muted = true;
          setIsMuted(true);
          setShowAudioPrompt(true);
          video.play().catch(console.error);
        });
    }

    let animationFrameId: number;

    const tick = () => {
      if (video && !video.paused) {
        const currentTime = video.currentTime;
        const state = interpolateKeyframes(currentTime);
        setOverlayState(state);

        // When zoom reaches full viewport coverage (9.48s - 9.53s)
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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      setShowAudioPrompt(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleSkip = () => {
    finishIntro();
  };

  // Convert percentage coordinates into rendered pixels relative to the video box
  const overlayLeft = videoBox.left + (overlayState.x / 100) * videoBox.width;
  const overlayTop = videoBox.top + (overlayState.y / 100) * videoBox.height;
  const overlayWidth = (overlayState.w / 100) * videoBox.width;
  const overlayHeight = (overlayState.h / 100) * videoBox.height;

  // Real-time scale ratio for the 1920x1080 live site canvas
  const scale = overlayWidth / 1920;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 w-screen h-[100svh] min-h-[100svh] overflow-hidden flex items-center justify-center select-none transition-opacity duration-300 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(circle at 50% 50%, #0d1a33 0%, #050d1e 100%)",
        backgroundColor: "#050D1E",
      }}
    >
      {/* Original Unaltered MP4 Video */}
      <video
        ref={videoRef}
        src="/videos/portfolio-intro.mp4"
        autoPlay
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

      {/* Real Live Next.js Website Surface Overlaid on Laptop Screen */}
      {videoBox.width > 0 && (
        <div
          className="absolute overflow-hidden origin-top-left pointer-events-none transition-opacity duration-150"
          style={{
            left: `${overlayLeft}px`,
            top: `${overlayTop}px`,
            width: `${overlayWidth}px`,
            height: `${overlayHeight}px`,
            borderRadius: `${overlayState.radius}px`,
            opacity: overlayState.opacity,
            boxShadow:
              overlayState.opacity > 0.05
                ? "inset 0 0 35px rgba(99, 102, 241, 0.3), 0 0 30px rgba(0, 0, 0, 0.85)"
                : "none",
            backgroundColor: "#07090D",
          }}
        >
          {/* Exact live website rendered via internal /screen route */}
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

      {/* Floating Control Bar: Audio Toggle & Skip Intro */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 flex items-center gap-2.5">
        {/* Sound Toggle Button */}
        <button
          onClick={toggleSound}
          className="px-3.5 py-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-xs font-mono text-slate-300 hover:text-white border border-white/10 hover:border-indigo-400/50 backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer active:scale-95"
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="hidden sm:inline">Sound On</span>
            </>
          )}
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-xs font-mono text-slate-300 hover:text-white border border-white/10 hover:border-indigo-400/50 backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer active:scale-95"
          aria-label="Skip cinematic intro"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-indigo-400" />
        </button>
      </div>

      {/* Interactive Unmute Banner if Browser Blocked Autoplay Audio */}
      {showAudioPrompt && isMuted && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <button
            onClick={toggleSound}
            className="px-5 py-2.5 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_4px_25px_rgba(99,102,241,0.5)] border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-white" />
            <span>Click to Enable Intro Audio</span>
          </button>
        </div>
      )}
    </div>
  );
}
