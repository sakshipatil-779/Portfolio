"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FastForward, Volume2, VolumeX } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);

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

  // Attempt unmuted playback as requested; fallback to muted + gesture if browser restricts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.0;
    video.volume = 1.0;
    video.muted = false;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Unmuted autoplay succeeded
          setIsMuted(false);
          setAudioBlocked(false);
        })
        .catch((err) => {
          console.warn("Unmuted autoplay restricted by browser policy. Starting muted:", err);
          // Browser requires user gesture for unmuted audio
          video.muted = true;
          setIsMuted(true);
          setAudioBlocked(true);
          video.play().catch(() => {});
        });
    }

    // Safety fallback: if video reaches near end, complete transition
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

  // Any user click anywhere on screen immediately unmutes the video
  const handleUserInteraction = () => {
    const video = videoRef.current;
    if (video && video.muted) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      setAudioBlocked(false);
    }
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted) {
      video.volume = 1.0;
      setAudioBlocked(false);
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    finishIntro();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleUserInteraction}
      className={`fixed inset-0 z-50 w-screen h-[100svh] min-h-[100svh] overflow-hidden flex items-center justify-center select-none transition-opacity duration-350 ease-in-out cursor-pointer ${
        isTransitioning ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      style={{
        background: "radial-gradient(circle at 50% 50%, #0d1a33 0%, #050d1e 100%)",
        backgroundColor: "#050D1E",
      }}
    >
      {/* Pristine Fullscreen Animated Landing Video (Unmuted) */}
      <video
        ref={videoRef}
        src="/videos/Developer_opening_laptop_at_desk_25bbb7fc_1080p.mp4"
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

      {/* Floating Action Controls in Top Right */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 flex items-center gap-2.5 pointer-events-auto">
        {/* Sound Toggle Button */}
        <button
          onClick={handleToggleMute}
          className="px-3.5 py-2 rounded-full bg-[#151020]/90 hover:bg-[#1A1428] text-xs font-mono text-[#B7B0CE] hover:text-[#F7F5FF] border border-[rgba(190,150,255,0.2)] hover:border-[#7650FF] backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer active:scale-95"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#B7B0CE] group-hover:text-[#F05BCB]" />
              <span>Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#F05BCB] animate-pulse" />
              <span className="text-[#F7F5FF]">Sound On</span>
            </>
          )}
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="px-4 py-2 rounded-full bg-[#151020]/90 hover:bg-[#1A1428] text-xs font-mono text-[#B7B0CE] hover:text-[#F7F5FF] border border-[rgba(190,150,255,0.2)] hover:border-[#7650FF] backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer active:scale-95"
          aria-label="Skip cinematic intro"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#F05BCB]" />
        </button>
      </div>

      {/* Subtle Unmute Prompt Pill if Browser Autoplay Policy required a gesture */}
      {audioBlocked && isMuted && (
        <div
          onClick={handleToggleMute}
          className="fixed bottom-8 sm:bottom-10 z-50 cursor-pointer px-5 py-2.5 rounded-full bg-[#151020]/95 hover:bg-[#1A1428] border border-[#7650FF]/60 text-xs font-mono text-[#F7F5FF] backdrop-blur-md shadow-2xl flex items-center gap-2.5 animate-bounce transition-all hover:scale-105 pointer-events-auto"
        >
          <Volume2 className="w-4 h-4 text-[#F05BCB]" />
          <span>Click anywhere to enable sound</span>
        </div>
      )}
    </div>
  );
}
