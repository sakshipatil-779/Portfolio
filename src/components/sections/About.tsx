"use client";

import React, { useRef, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, BookOpen, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { registerGSAP } from "@/lib/gsap";
import { TiltCard } from "@/components/ui/TiltCard";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statCard1Ref = useRef<HTMLDivElement>(null);
  const statCard2Ref = useRef<HTMLDivElement>(null);
  const matrixCardRef = useRef<HTMLDivElement>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Name: <Sparkles className="w-4 h-4 text-[#D18A54]" />,
    Degree: <BookOpen className="w-4 h-4 text-[#E5A96E]" />,
    Institute: <GraduationCap className="w-4 h-4 text-[#D18A54]" />,
    University: <GraduationCap className="w-4 h-4 text-[#E5A96E]" />,
    "Academic Duration": <MapPin className="w-4 h-4 text-[#E5A96E]" />,
    CGPA: <Award className="w-4 h-4 text-[#D18A54]" />,
  };

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Heading reveal with subtle 3D lift
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35, z: -20 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 2. Editorial bio paragraphs reveal
      if (bioRef.current) {
        const paragraphs = bioRef.current.querySelectorAll("p");
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 3. Stat cards reveal with staggered dimensional lift
      const statCards = [statCard1Ref.current, statCard2Ref.current].filter(Boolean);
      if (statCards.length > 0) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 30, z: -30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statCards[0],
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 4. Right column credentials matrix reveal with depth
      if (matrixCardRef.current) {
        gsap.fromTo(
          matrixCardRef.current,
          { opacity: 0, y: 40, z: -40, rotateX: 4 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: matrixCardRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 bg-[#15110E] overflow-hidden perspective-1200"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#B87345]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E5A96E]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="ABOUT ME"
            title={PERSONAL_INFO.aboutTitle}
            description="Combining core computer science fundamentals with modern systems engineering."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Editorial Bio */}
          <div className="lg:col-span-7 space-y-6 text-[#C8B6A5] text-base sm:text-lg leading-relaxed font-sans">
            <div ref={bioRef} className="space-y-6">
              {PERSONAL_INFO.bioParagraphs.map((paragraph, index) => (
                <p key={index} className="text-[#F5EDE4]/90 will-change-transform">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-6 border-t border-[rgba(209,138,84,0.16)] grid grid-cols-2 gap-4">
              <div ref={statCard1Ref} className="will-change-transform">
                <TiltCard maxTilt={5} depth={10}>
                  <div className="copper-glow-card p-4 rounded-2xl shadow-lg">
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87345] to-[#E5A96E]">
                      8.31
                    </div>
                    <div className="text-xs uppercase font-mono tracking-wider text-[#C8B6A5] mt-1">
                      Cumulative CGPA
                    </div>
                  </div>
                </TiltCard>
              </div>

              <div ref={statCard2Ref} className="will-change-transform">
                <TiltCard maxTilt={5} depth={10}>
                  <div className="copper-glow-card p-4 rounded-2xl shadow-lg">
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E5A96E] to-[#B87345]">
                      2024–2028
                    </div>
                    <div className="text-xs uppercase font-mono tracking-wider text-[#C8B6A5] mt-1">
                      Class of 2028
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>

          {/* Right Column: Factual Specification Matrix */}
          <div ref={matrixCardRef} className="lg:col-span-5 will-change-transform">
            <TiltCard maxTilt={5} depth={12}>
              <div className="copper-glow-card rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D18A54]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-6 border-b border-[rgba(209,138,84,0.16)]">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E5A96E] font-semibold">
                    ENGINEERING CREDENTIALS
                  </span>
                  <span className="font-mono text-[11px] text-[#9B8979]">
                    VERIFIED RECORD
                  </span>
                </div>

                <div className="divide-y divide-[rgba(209,138,84,0.12)] mt-2">
                  {PERSONAL_INFO.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="py-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-center gap-2 text-xs uppercase font-mono text-[#C8B6A5] shrink-0">
                        {iconMap[fact.label] || <Sparkles className="w-4 h-4 text-[#D18A54]" />}
                        <span>{fact.label}</span>
                      </div>
                      <div className="text-sm font-medium text-[#F5EDE4] text-right">
                        {fact.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
