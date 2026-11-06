"use client";

import React, { useState } from "react";
import { CinematicIntro } from "@/components/hero/CinematicIntro";
import { LivePortfolioView } from "@/components/portfolio/LivePortfolioView";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Cinematic Video Intro → Seamless Zoom Transition */}
      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main Interactive Live Portfolio Website */}
      <LivePortfolioView isEmbedded={false} />
    </>
  );
}
