"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, GraduationCap, Code2, ArrowDown } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface PortfolioHeroProps {
  isEmbedded?: boolean;
}

export function PortfolioHero({ isEmbedded = false }: PortfolioHeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#07070D] overflow-hidden flex flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-24 select-none"
    >
      {/* Rich Multi-tone Atmospheric Ambient Gradients: Purple (#7650FF), Blue (#7B8CFF), Pink (#F05BCB) */}
      <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-gradient-to-tr from-[#7650FF]/25 via-[#7B8CFF]/20 to-[#F05BCB]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-[#7B8CFF]/20 via-[#7650FF]/15 to-[#F05BCB]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-[#F05BCB]/10 via-[#7650FF]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle modern grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(190,150,255,0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline, Bio & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#151020]/90 border border-[rgba(190,150,255,0.2)] shadow-[0_0_20px_rgba(118,80,255,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium tracking-wide text-[#B7B0CE]">
                Available for Software Engineering Roles
              </span>
            </div>

            {/* Main Typographic Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-[#F7F5FF] font-sans leading-[1.08]">
                Hi, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7650FF] via-[#B7B0CE] to-[#F05BCB]">
                  Sakshi Patil
                </span>
                <span className="text-[#F05BCB]">.</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#B7B0CE] font-sans">
                Computer Engineer & Full-Stack Developer
              </p>
            </div>

            {/* Factual Narrative Bio */}
            <p className="text-base sm:text-lg text-[#B7B0CE] max-w-2xl font-sans leading-relaxed">
              Third-year Computer Engineering undergraduate at{" "}
              <span className="text-[#F7F5FF] font-medium">MET&apos;s Institute of Engineering, Nashik</span>.
              Passionate about building high-performance web applications, federated machine learning systems,
              and secure blockchain solutions with rigorous computer science fundamentals.
            </p>

            {/* Key Skill Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {["Java & DSA", "Next.js & React", "TypeScript", "Python / ML", "Solidity"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium text-[#B7B0CE] bg-[#151020] border border-[rgba(190,150,255,0.16)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Call-to-action Buttons & Social Links */}
            {!isEmbedded && (
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#7650FF] via-[#9055FF] to-[#F05BCB] text-[#F7F5FF] font-semibold text-sm shadow-[0_4px_25px_rgba(118,80,255,0.35)] hover:shadow-[0_6px_30px_rgba(240,91,203,0.45)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#151020] text-[#B7B0CE] border border-[rgba(190,150,255,0.2)] hover:border-[#7650FF] hover:text-[#F7F5FF] font-medium text-sm transition-all duration-300 hover:bg-[#1A1428] active:scale-[0.98]"
                >
                  <span>About Me</span>
                </Link>

                {/* Social Connect Icons */}
                <div className="flex items-center gap-2.5 ml-0 sm:ml-2">
                  <a
                    href={PERSONAL_INFO.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-2.5 rounded-full bg-[#151020] hover:bg-[#1A1428] text-[#B7B0CE] hover:text-[#F7F5FF] border border-[rgba(190,150,255,0.16)] hover:border-[#7650FF] transition-all hover:scale-105"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={PERSONAL_INFO.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2.5 rounded-full bg-[#151020] hover:bg-[#1A1428] text-[#B7B0CE] hover:text-[#F7F5FF] border border-[rgba(190,150,255,0.16)] hover:border-[#7650FF] transition-all hover:scale-105"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sakshi's REAL Photo in Aesthetic Clean Glassmorphic Frame */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            {/* Soft Backlight Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7650FF]/25 via-[#7B8CFF]/20 to-[#F05BCB]/25 rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

            {/* Glassmorphic Photo Container */}
            <div className="relative w-full max-w-[420px] rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#1A1428]/90 to-[#151020]/90 border border-[rgba(190,150,255,0.22)] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              {/* Profile Image Viewport */}
              <div className="relative w-full aspect-[1/1.05] rounded-2xl overflow-hidden bg-[#0D0A18] flex items-center justify-center">
                <Image
                  src="/images/profile.jpeg"
                  alt="Sakshi Patil"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ objectFit: "contain" }}
                  className="rounded-2xl select-none"
                />
              </div>

              {/* Floating Metric Badges */}
              {/* Badge 1: CGPA */}
              <div className="absolute -top-3 -right-3 sm:-right-4 px-3.5 py-1.5 rounded-full bg-[#151020]/95 border border-[rgba(190,150,255,0.3)] shadow-lg backdrop-blur-md flex items-center gap-2">
                <Award className="w-4 h-4 text-[#7650FF]" />
                <span className="text-xs font-mono font-bold text-[#F7F5FF]">8.31 CGPA</span>
              </div>

              {/* Badge 2: Institute */}
              <div className="absolute -bottom-3 -left-2 sm:-left-3 px-3.5 py-1.5 rounded-full bg-[#151020]/95 border border-[rgba(190,150,255,0.3)] shadow-lg backdrop-blur-md flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#7B8CFF]" />
                <span className="text-xs font-mono font-medium text-[#B7B0CE]">MET&apos;s IOE Nashik</span>
              </div>

              {/* Badge 3: Class */}
              <div className="absolute -bottom-3 -right-2 sm:-right-3 px-3.5 py-1.5 rounded-full bg-[#151020]/95 border border-[rgba(190,150,255,0.3)] shadow-lg backdrop-blur-md flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#F05BCB]" />
                <span className="text-xs font-mono font-medium text-[#B7B0CE]">Class of 2028</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      {!isEmbedded && (
        <div className="relative z-10 text-center flex flex-col items-center justify-center gap-1.5 mt-8 sm:mt-12 text-xs font-mono text-[#85809C]">
          <span className="tracking-widest uppercase text-[10px]">Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#7650FF] animate-bounce" />
        </div>
      )}
    </section>
  );
}
