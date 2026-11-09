"use client";

import React, { useRef, useEffect } from "react";
import { EDUCATION_DATA } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { registerGSAP } from "@/lib/gsap";
import { TiltCard } from "@/components/ui/TiltCard";

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
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

      // Progressive 3D Timeline Line Growth
      if (lineRef.current && timelineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.8,
            },
          }
        );
      }

      // Staggered reveal for timeline nodes and cards
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".education-timeline-item");
        items.forEach((item) => {
          const card = item.querySelector(".education-card");
          const marker = item.querySelector(".timeline-marker");

          if (card) {
            gsap.fromTo(
              card,
              { opacity: 0, x: 35, z: -30 },
              {
                opacity: 1,
                x: 0,
                z: 0,
                duration: 0.85,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 82%",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
          }

          if (marker) {
            gsap.fromTo(
              marker,
              { scale: 0.8, boxShadow: "0 0 0px rgba(209,138,84,0)" },
              {
                scale: 1,
                boxShadow: "0 0 15px rgba(209,138,84,0.6)",
                duration: 0.5,
                ease: "back.out(2)",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 sm:py-32 bg-[#15110E] overflow-hidden perspective-1200"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#B87345]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E5A96E]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="EDUCATION"
            title="Academic Foundation."
            description="A consistent trajectory of academic diligence and formal computer engineering training."
          />
        </div>

        <div ref={timelineRef} className="max-w-3xl mx-auto relative mt-12 sm:mt-16">
          {/* Vertical Progressive 3D Timeline Guide Line */}
          <div
            ref={lineRef}
            className="absolute top-4 bottom-4 left-4 sm:left-8 w-[2px] bg-gradient-to-b from-[#B87345] via-[#D18A54] to-[#E5A96E]/40 will-change-transform"
          />

          <div className="space-y-8 sm:space-y-12">
            {EDUCATION_DATA.map((edu, index) => (
              <div
                key={index}
                className="education-timeline-item relative pl-12 sm:pl-20 group"
              >
                {/* Timeline node marker with warm copper illumination */}
                <div className="timeline-marker absolute left-2.5 sm:left-6.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#15110E] border-2 border-[#D18A54] flex items-center justify-center transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5A96E]" />
                </div>

                {/* Card Container with 3D Depth */}
                <div className="education-card will-change-transform">
                  <TiltCard maxTilt={4} depth={10} scale={1.012}>
                    <div className="copper-glow-card rounded-3xl p-6 sm:p-7 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs text-[#D18A54] flex items-center gap-1.5 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.period}
                        </span>
                        {edu.status && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#B87345]/15 text-[#E5A96E] border border-[#B87345]/30 font-medium">
                            {edu.status}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#F5EDE4]">
                        {edu.degree}
                      </h3>

                      <p className="text-sm sm:text-base text-[#C8B6A5] mt-1 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#D18A54] shrink-0" />
                        <span>{edu.institution}</span>
                      </p>

                      {/* Savitribai Phule Pune University directly below institute */}
                      {edu.university && (
                        <p className="text-xs sm:text-sm text-[#E5A96E] mt-0.5 ml-6 font-mono font-medium">
                          {edu.university}
                        </p>
                      )}

                      <div className="mt-4 pt-4 border-t border-[rgba(209,138,84,0.15)] flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#D18A54]" />
                        <span className="text-xs font-mono uppercase text-[#C8B6A5]">
                          {edu.gradeLabel}:
                        </span>
                        <span className="text-sm font-mono font-bold text-[#F5EDE4]">
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
