"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FastForward, Volume2, VolumeX } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CinematicIntroProps {
  children: React.ReactNode;
  onComplete?: () => void;
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

// Empirically calibrated keyframes tracking the laptop screen from the exact moment
// the laptop lid opens at 6.15s through full viewport zoom at 9.48s.
// At 6.15s, opacity is immediately 1.0, completely covering the baked-in fake AI website
// from the very first visible frame.
const KEYFRAMES: Keyframe[] = [
  { t: 0.0, x: 39.22, y: 49.63, w: 17.86, h: 22.59, radius: 4, opacity: 0 },
  { t: 6.12, x: 39.22, y: 49.63, w: 17.86, h: 22.59, radius: 4, opacity: 0 },
  // Instant opaque mask at 6.15s as the lid opens - zero frames of fake website visible
  { t: 6.15, x: 39.22, y: 49.63, w: 17.86, h: 22.59, radius: 4, opacity: 1.0 },
  { t: 6.30, x: 40.73, y: 47.78, w: 22.60, h: 24.07, radius: 4, opacity: 1.0 },
  { t: 6.50, x: 41.72, y: 47.41, w: 22.45, h: 26.50, radius: 4, opacity: 1.0 },
  { t: 7.00, x: 41.88, y: 47.41, w: 22.81, h: 26.60, radius: 4, opacity: 1.0 },
  { t: 7.40, x: 40.16, y: 44.81, w: 26.15, h: 28.80, radius: 4, opacity: 1.0 },
  { t: 7.80, x: 38.54, y: 41.94, w: 29.50, h: 33.52, radius: 4, opacity: 1.0 },
  { t: 8.10, x: 34.50, y: 36.50, w: 37.50, h: 42.00, radius: 3, opacity: 1.0 },
  { t: 8.40, x: 27.08, y: 27.78, w: 50.00, h: 53.70, radius: 2.5, opacity: 1.0 },
  { t: 8.70, x: 17.34, y: 17.59, w: 65.31, h: 72.22, radius: 2, opacity: 1.0 },
  { t: 9.00, x: 9.38, y: 9.26, w: 80.73, h: 84.26, radius: 1.5, opacity: 1.0 },
  { t: 9.25, x: 4.17, y: 3.70, w: 91.67, h: 92.59, radius: 1, opacity: 1.0 },
  { t: 9.46, x: 0.0, y: 0.0, w: 100.0, h: 100.0, radius: 0, opacity: 1.0 },
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

export function CinematicIntro({ children, onComplete }: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);

  const [screenBox, setScreenBox] = useState({
    x: 39.22,
    y: 49.63,
    w: 17.86,
    h: 22.59,
    radius: 4,
    opacity: 0,
  });

  const [videoBox, setVideoBox] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, skip intro immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsIntroActive(false);
      onComplete?.();
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
      renderH = winH;
      renderW = winH * targetAspect;
      left = (winW - renderW) / 2;
      top = 0;
    } else {
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

    // Gracefully fade out video volume
    const video = videoRef.current;
    if (video && !video.muted) {
      const fadeInterval = setInterval(() => {
        if (video.volume > 0.15) {
          video.volume = Math.max(0, video.volume - 0.2);
        } else {
          clearInterval(fadeInterval);
        }
      }, 40);
    }

    // After 250ms smooth transition, deactivate intro mode
    // The persistent DOM instance remains seamlessly in place
    setTimeout(() => {
      setIsIntroActive(false);
      onComplete?.();
    }, 250);
  }, [isFadingOut, onComplete]);

  // Handle Autoplay, Audio & High-Precision Video Tracking
  useEffect(() => {
    if (!isIntroActive) return;

    const video = videoRef.current;
    if (!video) return;

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
          // Autoplay policy prevented unmuted audio: start visual playback muted
          // and surface the Click to Enable Sound prompt
          video.muted = true;
          setIsMuted(true);
          setShowAudioPrompt(true);
          video.play().catch(console.error);
        });
    }

    let isRunning = true;
    let animId: number;

    const updatePosition = (currentTime: number) => {
      const state = interpolateKeyframes(currentTime);
      setScreenBox(state);

      // Once zoom expands to fill full viewport at ~9.48s
      if (currentTime >= 9.48) {
        finishIntro();
      }
    };

    // Prefer requestVideoFrameCallback for exact decoder frame synchronization
    if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
      const handleVideoFrame = (now: number, metadata: VideoFrameCallbackMetadata) => {
        if (!isRunning) return;
        updatePosition(metadata.mediaTime);
        if (isRunning && !video.paused) {
          video.requestVideoFrameCallback(handleVideoFrame);
        }
      };
      video.requestVideoFrameCallback(handleVideoFrame);
    } else {
      // Fallback to requestAnimationFrame
      const tick = () => {
        if (!isRunning) return;
        if (video && !video.paused) {
          updatePosition(video.currentTime);
        }
        animId = requestAnimationFrame(tick);
      };
      animId = requestAnimationFrame(tick);
    }

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isIntroActive, finishIntro]);

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
  const overlayLeft = videoBox.left + (screenBox.x / 100) * videoBox.width;
  const overlayTop = videoBox.top + (screenBox.y / 100) * videoBox.height;
  const overlayWidth = (screenBox.w / 100) * videoBox.width;
  const overlayHeight = (screenBox.h / 100) * videoBox.height;

  // Real-time scale ratio for the persistent live site canvas inside the laptop display
  const scale = overlayWidth / 1920;

  return (
    <>
      {/* Video Layer Container */}
      {isIntroActive && (
        <div
          ref={containerRef}
          className={`fixed inset-0 z-30 w-screen h-[100svh] min-h-[100svh] overflow-hidden flex items-center justify-center select-none transition-opacity duration-300 pointer-events-none ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background: "radial-gradient(circle at 50% 50%, #0d1a33 0%, #050d1e 100%)",
            backgroundColor: "#050D1E",
          }}
        >
          {/* Unaltered Cinematic MP4 Video */}
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

          {/* Floating Controls: Sound Toggle & Skip Intro */}
          <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 flex items-center gap-2.5 pointer-events-auto">
            <button
              onClick={toggleSound}
              className="px-3.5 py-2 rounded-full bg-[#151020]/90 hover:bg-[#1A1428] text-xs font-mono text-[#B7B0CE] hover:text-[#F7F5FF] border border-[rgba(190,150,255,0.2)] hover:border-[#7650FF] backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer active:scale-95"
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#7650FF] animate-pulse" />
                  <span className="hidden sm:inline">Sound On</span>
                </>
              )}
            </button>

            <button
              onClick={handleSkip}
              className="px-4 py-2 rounded-full bg-[#151020]/90 hover:bg-[#1A1428] text-xs font-mono text-[#B7B0CE] hover:text-[#F7F5FF] border border-[rgba(190,150,255,0.2)] hover:border-[#7650FF] backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer active:scale-95"
              aria-label="Skip cinematic intro"
            >
              <span>Skip Intro</span>
              <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#F05BCB]" />
            </button>
          </div>

          {/* Interactive Unmute Banner if Browser Blocked Autoplay Audio */}
          {showAudioPrompt && isMuted && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-auto">
              <button
                onClick={toggleSound}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7650FF] to-[#F05BCB] text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_4px_25px_rgba(118,80,255,0.5)] border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-white" />
                <span>Click to Enable Intro Audio</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* SINGLE PERSISTENT LIVE PORTFOLIO DOM INSTANCE */}
      {/* Before lid opens (0.0s - 6.12s): fully rendered in DOM with opacity 0 */}
      {/* At 6.15s: opacity 1.0, accurately fitted over laptop display */}
      {/* From 6.15s - 9.48s: zooms continuously with camera */}
      {/* At 9.48s: fills 100% viewport */}
      {/* After 9.50s: transitions to normal static document flow with zero remount */}
      <div
        id="persistent-portfolio-surface"
        className={
          isIntroActive
            ? "fixed origin-top-left overflow-hidden pointer-events-none select-none transition-opacity duration-150"
            : "relative w-full min-h-screen overflow-visible pointer-events-auto"
        }
        style={
          isIntroActive
            ? {
                left: `${overlayLeft}px`,
                top: `${overlayTop}px`,
                width: `${overlayWidth}px`,
                height: `${overlayHeight}px`,
                borderRadius: `${screenBox.radius}px`,
                opacity: screenBox.opacity,
                zIndex: 35,
                backgroundColor: "#07070D",
                boxShadow:
                  screenBox.opacity > 0.05
                    ? "inset 0 0 35px rgba(118, 80, 255, 0.35), 0 0 40px rgba(0, 0, 0, 0.9)"
                    : "none",
              }
            : {
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                zIndex: 1,
              }
        }
      >
        <div
          style={
            isIntroActive
              ? {
                  width: "1920px",
                  minHeight: "1080px",
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }
              : {
                  width: "100%",
                  transform: "none",
                }
          }
        >
          {children}
        </div>
      </div>
    </>
  );
}
