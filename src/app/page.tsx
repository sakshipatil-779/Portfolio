"use client";

import React from "react";
import { CinematicIntro } from "@/components/hero/CinematicIntro";
import { LivePortfolioView } from "@/components/portfolio/LivePortfolioView";

export default function Home() {
  return (
    <CinematicIntro>
      <LivePortfolioView isEmbedded={false} />
    </CinematicIntro>
  );
}
