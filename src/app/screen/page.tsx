"use client";

import React from "react";
import { LivePortfolioView } from "@/components/portfolio/LivePortfolioView";

export default function ScreenPage() {
  return (
    <div className="w-[1920px] min-h-[1080px] bg-[#15110E] overflow-hidden select-none pointer-events-none origin-top-left">
      <LivePortfolioView isEmbedded={true} />
    </div>
  );
}
