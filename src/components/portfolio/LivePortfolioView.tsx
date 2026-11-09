"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioHero } from "@/components/hero/PortfolioHero";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
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
    <div className="min-h-screen bg-[#15110E] text-[#F5EDE4] relative selection:bg-[#B87345]/30 selection:text-[#F5EDE4]">
      <Navbar forceVisible={isEmbedded} />

      <main className="relative">
        <PortfolioHero isEmbedded={isEmbedded} />
        <About />
        <Achievements />
        <Projects />
        <Skills />
        <Certifications />
        <ExtraCurricular />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
