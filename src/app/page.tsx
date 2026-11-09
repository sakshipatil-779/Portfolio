"use client";

import React, { useState } from "react";
import { CinematicIntro } from "@/components/hero/CinematicIntro";
import { LivePortfolioView } from "@/components/portfolio/LivePortfolioView";
import { registerGSAP } from "@/lib/gsap";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    const { ScrollTrigger } = registerGSAP();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <>
      {/* Fullscreen Landing Cinematic Video Intro */}
      {!introComplete && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Actual Live Portfolio Website (Fully pre-rendered in background for zero flicker) */}
      <LivePortfolioView />
    </>
  );
}
