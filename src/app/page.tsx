"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoHero } from "@/components/hero/VideoHero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07090D] text-[#F5F7FA] relative selection:bg-[#69E5DC]/25 selection:text-[#F5F7FA]">
      <Navbar />

      <main className="relative">
        <VideoHero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
