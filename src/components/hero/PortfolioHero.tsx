"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, GraduationCap, Code2, ArrowDown, FileText, Download } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { registerGSAP } from "@/lib/gsap";

interface PortfolioHeroProps {
  isEmbedded?: boolean;
}

export function PortfolioHero({ isEmbedded = false }: PortfolioHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEmbedded) return;
    const { gsap, ScrollTrigger } = registerGSAP();
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Subtle 3D Depth Scroll Away Effect
      // Photo frame moves backward into depth and text drifts upward naturally
      if (photoFrameRef.current) {
        gsap.to(photoFrameRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          z: -120,
          scale: 0.94,
          opacity: 0.6,
          y: 45,
          ease: "none",
        });
      }

      if (textColRef.current) {
        gsap.to(textColRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: -50,
          opacity: 0.75,
          ease: "none",
        });
      }

      // Parallax on decorative ambient glows
      if (glow1Ref.current && glow2Ref.current) {
        gsap.to(glow1Ref.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
          y: -100,
          x: -30,
          ease: "none",
        });

        gsap.to(glow2Ref.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
          y: -80,
          x: 30,
          ease: "none",
        });
      }

      // 2. Desktop Subtle Interactive 3D Cursor Tilt
      const heroEl = heroRef.current;
      const frameEl = photoFrameRef.current;
      if (!isTouch && heroEl && frameEl) {
        gsap.set(frameEl, {
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        });

        const onMouseMove = (e: MouseEvent) => {
          const rect = frameEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const normX = (e.clientX - centerX) / (window.innerWidth / 2);
          const normY = (e.clientY - centerY) / (window.innerHeight / 2);

          const maxTilt = 4.5; // Very subtle, professional
          const rotX = -normY * maxTilt;
          const rotY = normX * maxTilt;

          gsap.to(frameEl, {
            rotateX: rotX,
            rotateY: rotY,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onMouseLeave = () => {
          gsap.to(frameEl, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        heroEl.addEventListener("mousemove", onMouseMove);
        heroEl.addEventListener("mouseleave", onMouseLeave);

        return () => {
          heroEl.removeEventListener("mousemove", onMouseMove);
          heroEl.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isEmbedded]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#15110E] overflow-hidden flex flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-24 select-none perspective-1200"
    >
      {/* Warm Copper & Amber Atmospheric Ambient Gradients with subtle parallax */}
      <div
        ref={glow1Ref}
        className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-gradient-to-tr from-[#B87345]/20 via-[#D18A54]/15 to-[#E5A96E]/10 rounded-full blur-[130px] pointer-events-none will-change-transform"
      />
      <div
        ref={glow2Ref}
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-[#D18A54]/15 via-[#8C532B]/20 to-[#E5A96E]/15 rounded-full blur-[140px] pointer-events-none will-change-transform"
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-[#B87345]/15 via-[#282017]/30 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle modern grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(209,138,84,0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline, Bio & Primary CTAs */}
          <div
            ref={textColRef}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 will-change-transform"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#282017]/90 border border-[rgba(209,138,84,0.25)] shadow-[0_0_20px_rgba(209,138,84,0.15)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium tracking-wide text-[#C8B6A5]">
                Available for Software Engineering Roles
              </span>
            </div>

            {/* Main Typographic Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-[#F5EDE4] font-sans leading-[1.08]">
                Hi, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87345] via-[#E5A96E] to-[#F5EDE4]">
                  Sakshi Patil
                </span>
                <span className="text-[#D18A54]">.</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#C8B6A5] font-sans">
                Computer Engineer & Full-Stack Developer
              </p>
            </div>

            {/* Factual Narrative Bio */}
            <p className="text-base sm:text-lg text-[#C8B6A5] max-w-2xl font-sans leading-relaxed">
              Third-year Computer Engineering undergraduate at{" "}
              <span className="text-[#F5EDE4] font-medium">MET&apos;s Institute of Engineering, Nashik</span>{" "}
              (Savitribai Phule Pune University).
              Passionate about building high-performance web applications, federated machine learning systems,
              and secure blockchain solutions with rigorous computer science fundamentals.
            </p>

            {/* Key Skill Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {["Java & DSA", "Next.js & React", "TypeScript", "Python / ML", "Solidity"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium text-[#C8B6A5] bg-[#282017] border border-[rgba(209,138,84,0.20)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Call-to-action Buttons & Resume Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#B87345] via-[#D18A54] to-[#E5A96E] text-[#15110E] font-bold text-sm shadow-[0_4px_25px_rgba(209,138,84,0.35)] hover:shadow-[0_6px_30px_rgba(209,138,84,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {/* View Resume Action */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#282017] text-[#C8B6A5] border border-[rgba(209,138,84,0.25)] hover:border-[#D18A54] hover:text-[#F5EDE4] hover:bg-[#33271D] font-medium text-sm transition-all duration-300 active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 text-[#D18A54]" />
                <span>View Resume</span>
              </a>

              {/* Download Resume Action */}
              <a
                href="/resume.pdf"
                download="Sakshi_Patil_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#282017] text-[#C8B6A5] border border-[rgba(209,138,84,0.25)] hover:border-[#D18A54] hover:text-[#F5EDE4] hover:bg-[#33271D] font-medium text-sm transition-all duration-300 active:scale-[0.98]"
                title="Download Sakshi Patil Resume"
              >
                <Download className="w-4 h-4 text-[#E5A96E]" />
                <span>Download Resume</span>
              </a>

              {/* Social Connect Icons */}
              <div className="flex items-center gap-2.5 ml-0 sm:ml-2">
                <a
                  href={PERSONAL_INFO.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-full bg-[#282017] hover:bg-[#33271D] text-[#C8B6A5] hover:text-[#F5EDE4] border border-[rgba(209,138,84,0.20)] hover:border-[#D18A54] transition-all hover:scale-105"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-full bg-[#282017] hover:bg-[#33271D] text-[#C8B6A5] hover:text-[#F5EDE4] border border-[rgba(209,138,84,0.20)] hover:border-[#D18A54] transition-all hover:scale-105"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Sakshi's REAL Photo in Aesthetic Clean Glassmorphic Frame with 3D Depth */}
          <div
            ref={photoWrapperRef}
            className="lg:col-span-5 flex items-center justify-center relative perspective-1200"
          >
            {/* Glassmorphic Photo Container with 3D Layered Construction */}
            <div
              ref={photoFrameRef}
              className="relative w-full max-w-[420px] rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#33271D]/90 to-[#282017]/90 border border-[rgba(209,138,84,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl preserve-3d will-change-transform"
            >
              {/* Soft Warm Backlight Aura Layered in Depth */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#B87345]/20 via-[#D18A54]/15 to-[#E5A96E]/20 rounded-3xl blur-2xl transform scale-95 pointer-events-none"
                style={{ transform: "translateZ(-20px)" }}
              />

              {/* Profile Image Viewport */}
              <div
                className="relative w-full aspect-[1/1.05] rounded-2xl overflow-hidden bg-[#1D1712] flex items-center justify-center"
                style={{ transform: "translateZ(0px)" }}
              >
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

              {/* Floating Metric Badges in 3D Space */}
              {/* Badge 1: CGPA */}
              <div
                className="absolute -top-3 -right-3 sm:-right-4 px-3.5 py-1.5 rounded-full bg-[#282017]/95 border border-[rgba(209,138,84,0.35)] shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center gap-2"
                style={{ transform: "translateZ(30px)" }}
              >
                <Award className="w-4 h-4 text-[#D18A54]" />
                <span className="text-xs font-mono font-bold text-[#F5EDE4]">8.31 CGPA</span>
              </div>

              {/* Badge 2: Institute */}
              <div
                className="absolute -bottom-3 -left-2 sm:-left-3 px-3.5 py-1.5 rounded-full bg-[#282017]/95 border border-[rgba(209,138,84,0.35)] shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center gap-2"
                style={{ transform: "translateZ(25px)" }}
              >
                <GraduationCap className="w-4 h-4 text-[#E5A96E]" />
                <span className="text-xs font-mono font-medium text-[#C8B6A5]">MET&apos;s IOE Nashik</span>
              </div>

              {/* Badge 3: Class */}
              <div
                className="absolute -bottom-3 -right-2 sm:-right-3 px-3.5 py-1.5 rounded-full bg-[#282017]/95 border border-[rgba(209,138,84,0.35)] shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center gap-1.5"
                style={{ transform: "translateZ(30px)" }}
              >
                <Code2 className="w-3.5 h-3.5 text-[#D18A54]" />
                <span className="text-xs font-mono font-medium text-[#C8B6A5]">Class of 2028</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      {!isEmbedded && (
        <div className="relative z-10 text-center flex flex-col items-center justify-center gap-1.5 mt-8 sm:mt-12 text-xs font-mono text-[#9B8979]">
          <span className="tracking-widest uppercase text-[10px]">Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#D18A54] animate-bounce" />
        </div>
      )}
    </section>
  );
}
