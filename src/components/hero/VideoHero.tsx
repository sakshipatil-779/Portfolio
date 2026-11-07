"use client";

import React, { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay policy or user gesture requirement fallback
        console.warn("Autoplay deferred:", err);
      });
    }
  }, [prefersReducedMotion]);

  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      // Preserve final frame cleanly
      video.pause();
    }
  };

  return (
    <section
      id="hero"
      className="relative w-screen h-[100svh] min-h-[100svh] bg-black overflow-hidden flex items-center justify-center p-0 m-0 select-none"
      style={{
        width: "100vw",
        height: "100svh",
        backgroundColor: "#000000",
      }}
      aria-label="Cinematic Portfolio Intro"
    >
      <video
        ref={videoRef}
        src="/videos/Developer_opening_laptop_at_desk_25bbb7fc_1080p.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        onEnded={handleEnded}
        className="w-full h-full max-w-full max-h-full object-contain pointer-events-none"
        style={{
          objectFit: "contain",
          aspectRatio: "16 / 9",
          backgroundColor: "#000000",
        }}
      />
    </section>
  );
}

