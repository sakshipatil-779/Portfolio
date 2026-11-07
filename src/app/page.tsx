"use client";

import React, { useState } from "react";
import { CinematicIntro } from "@/components/hero/CinematicIntro";
import { LivePortfolioView } from "@/components/portfolio/LivePortfolioView";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Fullscreen Landing Cinematic Video Intro */}
      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}

      {/* Actual Live Portfolio Website (Fully pre-rendered in background for zero flicker) */}
      <LivePortfolioView />
    </>
  );
}
