"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioHero } from "@/components/hero/PortfolioHero";
import { CinematicBackground } from "@/components/ui/CinematicBackground";
import { CinematicShowcase } from "@/components/showcase/CinematicShowcase";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { ExtraCurricular } from "@/components/sections/ExtraCurricular";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { registerGSAP } from "@/lib/gsap";

interface LivePortfolioViewProps {
  isEmbedded?: boolean;
}

export function LivePortfolioView({ isEmbedded = false }: LivePortfolioViewProps) {
  useEffect(() => {
    const { ScrollTrigger } = registerGSAP();
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-[#F5EDE4] relative selection:bg-[#D9A441]/30 selection:text-[#F5EDE4]">
      {/* Dynamic Golden Ribbons & Ambient Embers Canvas Background */}
      <CinematicBackground />

      {/* Persistent Navigation */}
      <Navbar forceVisible={isEmbedded} />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        <PortfolioHero isEmbedded={isEmbedded} />
        <CinematicShowcase />
        <Projects />
        <Education />
        <Certifications />
        <ExtraCurricular />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
