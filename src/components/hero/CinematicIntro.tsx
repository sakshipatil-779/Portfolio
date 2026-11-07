"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FastForward, Volume2, VolumeX, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, skip intro immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [prefersReducedMotion, onComplete]);

  // Attempt autoplay with original audio on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Preserve original audio: attempt unmuted playback at full volume
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsBlocked(false);
          setIsMuted(false);
        })
        .catch(() => {
          // Browser policy blocked unmuted audio autoplay
          // Per strict instructions: never silently mute the video.
          // Instead, pause and display the "Play Intro with Sound" button.
          video.pause();
          setIsPlaying(false);
          setIsBlocked(true);
        });
    }
  }, []);

  // Handle user clicking "Play Intro with Sound"
  const handlePlayWithSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsBlocked(false);
        setIsMuted(false);
      })
      .catch((err) => {
        console.error("Playback error:", err);
      });
  };

  // Toggle mute / unmute during playback
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  // End of playback transition: keep the final frame painted, smoothly crossfade to live portfolio
  const handleEnded = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const video = videoRef.current;
    if (video) {
      // Pause video on its final frame so it remains visible during the transition
      video.pause();

      // Fade out volume if unmuted
      if (!video.muted) {
        const fadeInterval = setInterval(() => {
          if (video.volume > 0.15) {
            video.volume = Math.max(0, video.volume - 0.2);
          } else {
            clearInterval(fadeInterval);
          }
        }, 40);
      }
    }

    // After 600ms smooth crossfade, complete the transition
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [isTransitioning, onComplete]);

  // Handle user clicking "Skip Intro"
  const handleSkip = () => {
    handleEnded();
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-screen h-[100svh] min-h-[100svh] overflow-hidden flex items-center justify-center select-none transition-opacity duration-600 ease-in-out ${
        isTransitioning ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      style={{
        background: "radial-gradient(circle at 50% 50%, #0d1a33 0%, #050d1e 100%)",
        backgroundColor: "#050D1E",
      }}
    >
      {/* Pristine Fullscreen Cinematic MP4 Video */}
      <video
        ref={videoRef}
        src="/videos/portfolio-intro.mp4"
        playsInline
        preload="auto"
        controls={false}
        onEnded={handleEnded}
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

      {/* Play Intro with Sound Overlay (Shown when unmuted autoplay is blocked by browser policy) */}
      {isBlocked && !isPlaying && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-300">
            {/* Animated Glow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151020]/95 border border-[rgba(190,150,255,0.25)] text-xs font-mono text-[#B7B0CE] shadow-[0_0_25px_rgba(118,80,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#7650FF] animate-pulse" />
              <span>Sakshi Patil • Cinematic Portfolio</span>
            </div>

            {/* Play Button */}
            <button
              onClick={handlePlayWithSound}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#7650FF] via-[#9055FF] to-[#F05BCB] text-[#F7F5FF] font-semibold text-base sm:text-lg shadow-[0_6px_35px_rgba(118,80,255,0.45)] hover:shadow-[0_8px_45px_rgba(240,91,203,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-4 h-4 fill-white text-white ml-0.5" />
              </div>
              <span>Play Intro with Sound</span>
            </button>

            <p className="text-xs sm:text-sm text-[#B7B0CE] max-w-xs font-sans leading-relaxed">
              Click to start the cinematic opening experience with original sound.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
